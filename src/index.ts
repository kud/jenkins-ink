// @kud/jenkins-ink — controlled Ink components for rendering Jenkins domain
// objects. Every component is presentation-only: props in, no data fetching, no
// app-level input. The consuming surface owns selection, navigation and loading,
// so these compose into a full-screen CLI or a single pane in a larger dashboard
// alike. Built on @kud/ink-ui primitives; fed by @kud/jenkins types + formatters.
export { BuildList, type BuildListProps } from "./components/build-list.js"
export { JobList, jobDot, type JobListProps } from "./components/job-list.js"
export { BuildInfo } from "./components/build-info.js"
export { LogView, type LogViewProps } from "./components/log-view.js"
export { StageTree, type StageTreeProps, type StageNode } from "./components/stage-tree.js"
export { statusColor } from "./lib/status.js"
export { windowSlice } from "./lib/window.js"
