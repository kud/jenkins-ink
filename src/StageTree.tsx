import React from "react"
import { Box, Text } from "ink"
import { SelectableRow, colors } from "@kud/ink-ui"
import { LogView } from "./LogView.js"
import { windowSlice } from "./window.js"

// Jenkins wfapi node status → colour ("SUCCESS" / "FAILED" / "IN_PROGRESS" /
// "ABORTED" / …). Kept local to the presentation layer; the wfapi shapes are
// untyped `any` on the core client.
const nodeColor = (status?: string): string => {
  switch ((status || "").toUpperCase()) {
    case "SUCCESS":
      return colors.success
    case "FAILED":
    case "FAILURE":
      return colors.error
    case "UNSTABLE":
      return colors.accent
    case "IN_PROGRESS":
    case "RUNNING":
      return colors.warning
    case "ABORTED":
      return colors.info
    default:
      return colors.muted
  }
}

export type StageNode = {
  id?: string
  name?: string
  status?: string
  durationMillis?: number
}

export type StageTreeProps = {
  level: "stages" | "steps" | "log"
  stages: StageNode[]
  steps: StageNode[]
  stepLog: string[]
  selected: number
  rows: number
}

const NodeList = ({
  nodes,
  selected,
  rows,
  emptyText,
}: {
  nodes: StageNode[]
  selected: number
  rows: number
  emptyText: string
}) => {
  if (!nodes.length) return <Text color={colors.muted}>{emptyText}</Text>
  const { items, offset } = windowSlice(nodes, selected, rows)
  return (
    <Box flexDirection="column">
      {items.map((node, i) => {
        const idx = offset + i
        return (
          <SelectableRow key={node.id || idx} active={idx === selected}>
            <Text wrap="truncate-end">
              <Text color={nodeColor(node.status)}>● </Text>
              <Text>{node.name || "(unnamed)"}</Text>
            </Text>
          </SelectableRow>
        )
      })}
    </Box>
  )
}

// Controlled pipeline drill-down: stages → steps → step log. The parent owns the
// current level, the selection index, and all data loading; this only renders
// the level it's told to. Matches the CLI's stages overlay, minus the shell.
export const StageTree = ({
  level,
  stages,
  steps,
  stepLog,
  selected,
  rows,
}: StageTreeProps) => {
  if (level === "log") return <LogView lines={stepLog} />
  if (level === "steps")
    return (
      <NodeList
        nodes={steps}
        selected={selected}
        rows={rows}
        emptyText="No steps"
      />
    )
  return (
    <NodeList
      nodes={stages}
      selected={selected}
      rows={rows}
      emptyText="No stages (not a pipeline build?)"
    />
  )
}
