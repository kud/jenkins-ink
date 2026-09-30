import React from "react"
import { describe, it, expect, vi } from "vitest"
import { render } from "ink-testing-library"
import type { JenkinsClient, JenkinsJob } from "@kud/jenkins"
import { JenkinsBody } from "./jenkins-body.js"

const ESC = String.fromCharCode(27)
const DOWN = `${ESC}[B`
const RETURN = "\r"
const delay = (ms = 60) => new Promise((resolve) => setTimeout(resolve, ms))

const press = async (
  stdin: { write: (s: string) => void },
  ...keys: string[]
) => {
  for (const k of keys) {
    stdin.write(k)
    await delay()
  }
}

const jobs: JenkinsJob[] = [
  { name: "api", fullName: "api", color: "blue" },
  { name: "web", fullName: "web", color: "red" },
  { name: "worker", fullName: "worker", color: "blue" },
]

// Just enough of a client for the body to load a job list and stay quiet.
const fakeClient = () =>
  ({
    searchJobsIncremental: async (
      _query: string,
      { onBatch }: { onBatch: (list: JenkinsJob[]) => void },
    ) => onBatch(jobs),
    getSpecificJobs: async () => jobs,
    listBuilds: async () => [],
    getConsoleText: async () => "",
  }) as unknown as JenkinsClient

const mount = () => {
  const onFocus = vi.fn()
  const view = render(
    <JenkinsBody
      client={fakeClient()}
      jobSearchLimit={0}
      buildsLimit={10}
      preselectJob={null}
      jobsFilter={null}
      singleJobMode={false}
      onExit={() => {}}
      onFocus={onFocus}
    />,
  )
  const lastFocus = () => onFocus.mock.calls.at(-1)?.[0]
  return { ...view, lastFocus }
}

// The jobs pane is the leftmost third of each row; the other panes can
// mention job names too (the status line does), so look only there.
const jobsPane = (frame: string | undefined) =>
  (frame ?? "")
    .split("\n")
    .map((line) => line.slice(0, 20))
    .join("\n")

describe("JenkinsBody job filter", () => {
  it("narrows the job list live as the term is typed", async () => {
    const { stdin, lastFrame, lastFocus } = mount()
    await delay()
    await press(stdin, "/", "w")
    const pane = jobsPane(lastFrame())
    expect(pane).toContain("/ w▏")
    expect(pane).toContain("web")
    expect(pane).toContain("worker")
    expect(pane).not.toContain("api")
    expect(lastFocus()).toEqual({ layer: true, typing: true })
  })

  it("keeps the filter on ↵ and hands the letters back as hotkeys", async () => {
    const { stdin, lastFrame, lastFocus } = mount()
    await delay()
    await press(stdin, "/", "w", "o", RETURN)
    expect(jobsPane(lastFrame())).toContain("/ wo")
    expect(jobsPane(lastFrame())).not.toContain("▏")
    expect(lastFocus()).toEqual({ layer: true, typing: false })
    // `?` is a hotkey again: it opens the legend rather than typing.
    await press(stdin, "?")
    expect(lastFrame()).toContain("Keyboard shortcuts")
  })

  it("resumes the kept term on `/` rather than starting over", async () => {
    const { stdin, lastFrame } = mount()
    await delay()
    await press(stdin, "/", "w", RETURN, "/", "e")
    const pane = jobsPane(lastFrame())
    expect(pane).toContain("/ we▏")
    expect(pane).toContain("web")
    expect(pane).not.toContain("worker")
  })

  it("still walks the matches with ↓ while typing", async () => {
    const { stdin, lastFrame } = mount()
    await delay()
    await press(stdin, "/", "w", DOWN)
    const active = jobsPane(lastFrame())
      .split("\n")
      .find((line) => line.includes("❯"))
    expect(active).toContain("worker")
    expect(jobsPane(lastFrame())).toContain("/ w▏")
  })

  it("clears on esc while typing", async () => {
    const { stdin, lastFrame, lastFocus } = mount()
    await delay()
    await press(stdin, "/", "w", ESC)
    const pane = jobsPane(lastFrame())
    expect(pane).not.toContain("/ ")
    expect(pane).toContain("api")
    expect(lastFocus()).toEqual({ layer: false, typing: false })
  })

  it("clears a kept filter on esc, as the bottom of the peel", async () => {
    const { stdin, lastFrame, lastFocus } = mount()
    await delay()
    await press(stdin, "/", "w", RETURN, ESC)
    const pane = jobsPane(lastFrame())
    expect(pane).not.toContain("/ ")
    expect(pane).toContain("api")
    expect(lastFocus()).toEqual({ layer: false, typing: false })
  })
})
