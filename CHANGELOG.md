# Changelog

All notable changes to this project are documented here.

---

## 0.4.0 — 2026-08-19

### Fixes

- **A host pinned to `@kud/jenkins` 2.1.0 now compiles.** `JenkinsBody` takes a `client` prop, so its type has to agree with the client the host constructs — and this package pinned 2.0.0 exactly. With exact pins npm cannot dedupe, so a consumer that moved to 2.1.0 ended up with two copies of `JenkinsClient` in its tree and a type error on a private field, with nothing in the message to suggest the nested copy was the cause. Measured on `@kud/jenkins-cli`, where it was the whole reason the upgrade could not land. ([78ff4c1](https://github.com/kud/jenkins-ink/commit/78ff4c18f7691715be15a0621c683bc2aede491f))

> [!NOTE]
> The bug fixes in `@kud/jenkins` 2.1.0 — stray slashes in job names, and the bogus `Authorization` header on an anonymous connection — do **not** reach you by upgrading this package. Nothing here constructs a client; every request is made through the one you pass to `JenkinsBody`. Upgrade `@kud/jenkins` in your own project to get them.

<details>
<summary>Internal (1 commit)</summary>

- `Panel` in `chrome.tsx` now comes from the shared `@kud/ink-ui` implementation rather than a local copy (`@kud/ink-ui` 0.6.0 → 0.9.0). Re-exported unchanged, so `import { Panel } from "@kud/jenkins-ink"` is unaffected. ([0fb5f48](https://github.com/kud/jenkins-ink/commit/0fb5f48d40f590af8ac675a357e13492a817f05f))

</details>

---
