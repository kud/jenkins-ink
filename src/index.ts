// @kud/jenkins-ink — controlled Ink components for rendering Jenkins domain
// objects. Every component is presentation-only: props in, no data fetching, no
// app-level input. The consuming surface owns selection, navigation and loading,
// so these compose into a full-screen CLI or a single pane in a larger dashboard
// alike. Built on @kud/ink-ui primitives; fed by @kud/jenkins types + formatters.
export { BuildList, type BuildListProps } from "./BuildList.js"
export { JobList, jobDot, type JobListProps } from "./JobList.js"
export { BuildInfo } from "./BuildInfo.js"
export { LogView, type LogViewProps } from "./LogView.js"
export { StageTree, type StageTreeProps, type StageNode } from "./StageTree.js"
export { statusColor } from "./status.js"
export { windowSlice } from "./window.js"
