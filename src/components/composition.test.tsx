import React from "react"
import { test, expect } from "vitest"
import { render } from "ink-testing-library"
import { Box, Text } from "ink"
import { BuildList } from "./build-list.js"
import type { JenkinsBuild } from "@kud/jenkins"

// The composition proof: <BuildList> renders as ONE pane inside a larger layout,
// beside unrelated content. This is precisely what shelling out to a full-screen
// `jenkins -i` cannot give you — a Jenkins build list living next to your PRs in
// a single screen. It is the whole reason @kud/jenkins-ink exists as a library
// rather than staying inside the CLI.
test("BuildList composes as an embedded pane beside other content", () => {
  const builds: JenkinsBuild[] = [
    {
      number: 7,
      result: "SUCCESS",
      duration: 30000,
      timestamp: 1_700_000_000_000,
    },
    { number: 6, building: true, timestamp: 1_700_000_000_000 },
  ]

  const Dashboard = () => (
    <Box>
      <Box flexDirection="column" width={40}>
        <Text bold>CI</Text>
        <BuildList builds={builds} selected={0} rows={5} />
      </Box>
      <Box flexDirection="column" width={40}>
        <Text bold>Reviews</Text>
        <Text>PR #123 — needs review</Text>
      </Box>
    </Box>
  )

  const frame = render(<Dashboard />).lastFrame() ?? ""
  // Both panes coexist on one screen: the Jenkins build list AND the reviews pane.
  expect(frame).toContain("CI")
  expect(frame).toContain("#7")
  expect(frame).toContain("SUCCESS")
  expect(frame).toContain("Reviews")
  expect(frame).toContain("PR #123")
})
