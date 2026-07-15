// @kud/jenkins-ink — controlled Ink components for rendering Jenkins domain
// objects. Every component is presentation-only: props in, no data fetching, no
// app-level input. The consuming surface owns selection, navigation and loading,
// so these compose into a full-screen CLI or a single pane in a larger dashboard
// alike. Built on @kud/ink-ui primitives; fed by @kud/jenkins types + formatters.
export { BuildList, type BuildListProps } from "./components/build-list.js"
export { JobList, jobDot, type JobListProps } from "./components/job-list.js"
export { BuildInfo } from "./components/build-info.js"
export { LogView, type LogViewProps } from "./components/log-view.js"
export {
  StageTree,
  type StageTreeProps,
  type StageNode,
} from "./components/stage-tree.js"
export { statusColor } from "./lib/status.js"
export { windowSlice } from "./lib/window.js"
// The assembled interactive UI — the full jobs│builds│logs grid + navigation.
// Embeddable: it does not own the terminal or call render(); it reports quit via
// the required `onExit` callback, so a host (the CLI, a cockpit dashboard) mounts
// it as one component and owns the terminal lifecycle itself.
export { JenkinsBody, type JenkinsBodyProps } from "./jenkins-body.js"
export { StatusBar, Overlay } from "./components/chrome.js"
export { Panel } from "@kud/ink-ui"
