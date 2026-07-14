import React from "react"
import { Box, Text } from "ink"

export type LogViewProps = {
  // Already-windowed lines (the caller owns scroll/window); may contain ANSI.
  lines: string[]
  width?: number
}

// A dumb log viewport. It only lays out the lines it's given — windowing,
// scrolling, search and colouring stay with the caller, so it drops into a shell
// that owns rich log navigation (the CLI) just as easily as a simple one.
// truncate-end clips wide lines rather than wrapping them into neighbours.
export const LogView = ({ lines, width }: LogViewProps) => (
  <Box flexDirection="column" width={width} overflow="hidden">
    {lines.map((line, i) => (
      <Text key={i} wrap="truncate-end">
        {line.length ? line : " "}
      </Text>
    ))}
  </Box>
)
