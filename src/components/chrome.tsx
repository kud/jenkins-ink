import { Box, Text } from "ink"
import type { ReactNode } from "react"

// Full-width bottom bar: context on the left, state chips + hints on the right.
export const StatusBar = ({
  left,
  right,
  width,
}: {
  left: string
  right: string
  width: number
}) => (
  <Box
    width={width}
    borderStyle="round"
    borderColor="green"
    height={3}
    paddingX={1}
    justifyContent="space-between"
  >
    <Text wrap="truncate">{left}</Text>
    {right ? <Text wrap="truncate">{right}</Text> : null}
  </Box>
)

// A centred overlay that replaces the body (help / artifacts). Simpler and more
// robust in Ink than a floating popup, and reads the same to the user.
export const Overlay = ({
  title,
  color,
  width,
  height,
  children,
}: {
  title: string
  color: string
  width: number
  height: number
  children: ReactNode
}) => (
  <Box
    width={width}
    height={height}
    justifyContent="center"
    alignItems="center"
  >
    <Box
      flexDirection="column"
      borderStyle="round"
      borderColor={color}
      paddingX={1}
      width={Math.min(width - 4, 100)}
    >
      <Text color={color} bold>
        {title}
      </Text>
      {children}
    </Box>
  </Box>
)
