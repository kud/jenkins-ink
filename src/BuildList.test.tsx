import React from "react"
import { test, expect } from "vitest"
import { render } from "ink-testing-library"
import { BuildList } from "./BuildList.js"
import { JobList } from "./JobList.js"
import { BuildInfo } from "./BuildInfo.js"
import type { JenkinsBuild, JenkinsJob } from "@kud/jenkins"

const builds: JenkinsBuild[] = [
  {
    number: 3,
    result: "SUCCESS",
    duration: 42000,
    timestamp: 1_700_000_000_000,
  },
  {
    number: 2,
    result: "FAILURE",
    duration: 12000,
    timestamp: 1_700_000_000_000,
  },
  { number: 1, building: true, timestamp: Date.now() - 5000 },
]

test("BuildList renders one row per build with number and status", () => {
  const { lastFrame } = render(
    <BuildList builds={builds} selected={0} rows={10} />,
  )
  const frame = lastFrame() ?? ""
  expect(frame).toContain("#3")
  expect(frame).toContain("SUCCESS")
  expect(frame).toContain("FAILURE")
  expect(frame).toContain("RUNNING")
})

test("BuildList marks the selected row with the active marker", () => {
  const { lastFrame } = render(
    <BuildList builds={builds} selected={1} rows={10} />,
  )
  const active = (lastFrame() ?? "").split("\n").find((l) => l.includes("❯"))
  expect(active).toContain("#2")
})

test("BuildList shows empty text when there are no builds", () => {
  const { lastFrame } = render(<BuildList builds={[]} selected={0} rows={10} />)
  expect(lastFrame()).toContain("No builds")
})

test("JobList colours a folder differently from a job and flags errors", () => {
  const jobs: JenkinsJob[] = [
    { name: "app", fullName: "app", color: "blue" },
    { name: "folder", fullName: "folder" },
    { name: "broken", fullName: "broken", error: "boom" },
  ]
  const { lastFrame } = render(<JobList jobs={jobs} selected={0} rows={10} />)
  const frame = lastFrame() ?? ""
  expect(frame).toContain("app")
  expect(frame).toContain("ERROR")
})

test("BuildInfo renders a placeholder for a null build", () => {
  const { lastFrame } = render(<BuildInfo build={null} />)
  expect(lastFrame()).toContain("Select a build")
})
