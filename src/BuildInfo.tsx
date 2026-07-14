import React from "react"
import { Text } from "ink"
import { colors } from "@kud/ink-ui"
import { buildStatusToken, fmtDuration, type JenkinsBuild } from "@kud/jenkins"
import { statusColor } from "./status.js"

// One-line build metadata: "#num  STATE  dur  started-at". A null build renders
// a muted placeholder, so callers can pass the current selection directly.
export const BuildInfo = ({ build }: { build: JenkinsBuild | null }) => {
  if (!build) return <Text color={colors.muted}>Select a build</Text>
  const token = buildStatusToken(build)
  const started =
    typeof build.timestamp === "number"
      ? new Date(build.timestamp).toLocaleString()
      : ""
  return (
    <Text wrap="truncate-end">
      <Text bold>#{build.number}</Text>
      {"  "}
      <Text color={statusColor[token]}>{token.toUpperCase()}</Text>
      {"  "}
      <Text color={colors.info}>{fmtDuration(build)}</Text>
      {"  "}
      <Text color={colors.muted}>{started}</Text>
    </Text>
  )
}
