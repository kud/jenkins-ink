import React from "react"
import { Box, Text } from "ink"
import { SelectableRow, colors } from "@kud/ink-ui"
import {
  buildStatusToken,
  fmtDuration,
  fmtAge,
  type JenkinsBuild,
} from "@kud/jenkins"
import { statusColor } from "./status.js"
import { windowSlice } from "./window.js"

export type BuildListProps = {
  builds: JenkinsBuild[]
  selected: number
  rows: number
  emptyText?: string
}

// Controlled, windowed list of builds. The parent owns the selection index and
// key input; this renders only the visible window. Each row is
// "#num  STATE  dur  age", coloured by the build's status token.
export const BuildList = ({
  builds,
  selected,
  rows,
  emptyText = "No builds",
}: BuildListProps) => {
  if (!builds.length) return <Text color={colors.muted}>{emptyText}</Text>
  const { items, offset } = windowSlice(builds, selected, rows)
  return (
    <Box flexDirection="column">
      {items.map((build, i) => {
        const idx = offset + i
        const token = buildStatusToken(build)
        return (
          <SelectableRow key={build.number} active={idx === selected}>
            <Text wrap="truncate-end">
              <Text bold>{`#${build.number}`.padEnd(7)}</Text>
              <Text color={statusColor[token]}>
                {token.toUpperCase().padEnd(9)}
              </Text>
              <Text color={colors.info}>{fmtDuration(build).padEnd(6)}</Text>
              <Text color={colors.muted}>{fmtAge(build)}</Text>
            </Text>
          </SelectableRow>
        )
      })}
    </Box>
  )
}
