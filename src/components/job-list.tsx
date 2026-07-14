import React from "react"
import { Box, Text } from "ink"
import { SelectableRow, colors } from "@kud/ink-ui"
import type { JenkinsJob } from "@kud/jenkins"
import { windowSlice } from "../lib/window.js"

// A job's status dot from its Jenkins `color` (its last build's health):
// blue = success, red = failure, yellow = unstable, *_anime = running now,
// aborted/disabled = idle, no colour = a folder to drill into.
export const jobDot = (color?: string): { glyph: string; color: string } => {
  const c = (color || "").toLowerCase()
  if (!c) return { glyph: "▸", color: colors.muted }
  if (c.includes("anime")) return { glyph: "◐", color: colors.info }
  if (c.startsWith("blue")) return { glyph: "●", color: colors.success }
  if (c.startsWith("red")) return { glyph: "●", color: colors.error }
  if (c.startsWith("yellow")) return { glyph: "●", color: colors.warning }
  if (c.startsWith("aborted")) return { glyph: "●", color: colors.muted }
  return { glyph: "○", color: colors.muted }
}

export type JobListProps = {
  jobs: JenkinsJob[]
  selected: number
  rows: number
  emptyText?: string
}

// Controlled, windowed list of jobs. Parent owns selection/input.
export const JobList = ({
  jobs,
  selected,
  rows,
  emptyText = "No jobs",
}: JobListProps) => {
  if (!jobs.length) return <Text color={colors.muted}>{emptyText}</Text>
  const { items, offset } = windowSlice(jobs, selected, rows)
  return (
    <Box flexDirection="column">
      {items.map((job, i) => {
        const idx = offset + i
        const name = job.fullName || job.name || ""
        const dot = jobDot(job.color)
        return (
          <SelectableRow key={name || idx} active={idx === selected}>
            <Text wrap="truncate-end">
              <Text color={dot.color}>{dot.glyph} </Text>
              {job.error ? (
                <Text color={colors.error}>{name} — ERROR</Text>
              ) : (
                <Text>{name}</Text>
              )}
            </Text>
          </SelectableRow>
        )
      })}
    </Box>
  )
}
