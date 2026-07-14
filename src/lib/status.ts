import { colors } from "@kud/ink-ui"
import type { BuildStatusToken } from "@kud/jenkins"

// The Ink layer's colour vocabulary: map the surface-agnostic status token
// (decided once, in @kud/jenkins) to an ink-ui colour. A future
// @kud/jenkins-opentui would map the same tokens to its own palette. ink-ui has
// no magenta, so `unstable` takes accent/orange and `aborted` info/cyan, which
// keeps the CLI's familiar colouring intact.
export const statusColor: Record<BuildStatusToken, string> = {
  running: colors.warning,
  success: colors.success,
  failure: colors.error,
  unstable: colors.accent,
  aborted: colors.info,
  unknown: colors.muted,
}
