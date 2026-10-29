# Enchanted

## Purpose and Scope

Enchanted is a reusable React component library for HCL products, initially focused on AXP. This repository is a private proof of concept; the final repository has not been selected.

## Confirmed Decisions

- **Technology:** React, TypeScript, Base UI, and Sass/SCSS.
- **Package:** Private, marked `Apache-2.0`, and not configured for publication.
- **Documentation and visual review:** Storybook for component documentation and Chromatic for visual review. Storybook runs with the `@storybook/addon-docs`, `@storybook/addon-a11y`, and `@storybook/addon-mcp` addons; any further addon needs explicit approval. Story structure is defined in [STORYBOOK-GUIDE.md](docs/STORYBOOK-GUIDE.md). Supply the Chromatic project token through the environment; never commit it.
- **Theming direction:** Support light and dark themes using tokens that conform to the [DTCG Design Tokens Format Module 2025.10](https://www.designtokens.org/tr/2025.10/format/#abstract). This format is mandatory for every token source file; approved values and the token transformation workflow remain undecided. See [DESIGN-TOKENS-GUIDE.md](docs/DESIGN-TOKENS-GUIDE.md).
- **Dependencies:** Do not add, install, or use third-party libraries or tools beyond those already recorded in the package manifests. Prefer platform APIs and existing project capabilities. Any exception requires explicit approval and an update to this decision before implementation.
- **Figma:** Use the remote Figma MCP server (`https://mcp.figma.com/mcp`) to read confirmed designs and `@figma/code-connect` (development dependency) for Code Connect templates; see [REPO-SETUP-GUIDE.md](docs/REPO-SETUP-GUIDE.md#vs-code-and-figma) and [FIGMA-CODE-CONNECT-GUIDE.md](docs/FIGMA-CODE-CONNECT-GUIDE.md). Do not publish mappings until the matching component APIs are implemented and reviewed.
- **Accessibility target:** WCAG 2.2 Level AA, the industry standard for an open source component library. Automated checks (`vitest-axe`, `@storybook/addon-a11y`) find only part of the possible issues, so conformance also needs manual keyboard and screen reader checks. See [TESTING-GUIDE.md](docs/TESTING-GUIDE.md#11-browser-and-accessibility-checks).
- **Supported browsers:** The latest stable version of each of Chrome, Edge, Firefox, and Safari. Browser compatibility is checked with Chromatic, as [WORKLOAD.md](WORKLOAD.md) states, and with manual testing on local machines for what snapshots cannot show. Screen reader checks use VoiceOver with Safari on macOS and NVDA with Chrome on Windows.
- **Accessibility testing tools (current):** `vitest-axe` for unit-level axe checks, `@storybook/addon-a11y` for per-story checks, and manual keyboard and screen reader checks. The team knowingly accepts the maintenance risk of `vitest-axe` (latest release 0.1.0, last modified 2025-01-22; not confirmed against Vitest 5 by a recorded run). `@storybook/addon-vitest` with `a11y.test: 'error'` is the planned next step and is not approved or installed; it needs explicit approval and updates to the setup docs when adopted. If `vitest-axe` breaks first, the fallback is `axe-core` with a small custom matcher, which also needs approval.
- **Minimum test coverage:** 80% per file for statements, branches, functions, and lines, not for the repository as a whole. `npm test` enforces it with `coverage.thresholds` (`perFile`), so a file below it fails CI; new components have to ship with tests that meet it. See [TESTING-GUIDE.md](docs/TESTING-GUIDE.md).
- **Module federation:** Out of scope for this repository.

## First-Release Scope

This table is the source of truth for the proposed first-release component set, not an approved release commitment. Agree and record the approved set here before functional implementation begins. Keep the table current; other documents must reference it instead of maintaining their own component list.

| Name | Base UI Link | Figma Link |
| --- | --- | --- |
| Button | [Base UI Button](https://base-ui.com/react/components/button) | [Button Figma](https://www.figma.com/design/hSgxFly4e92zns5LJXAsNB/HCLED-Components-V3--POC-?node-id=1338-465763&m=dev) |
| TextField | [Base UI Input](https://base-ui.com/react/components/input) | [TextField Figma](https://www.figma.com/design/hSgxFly4e92zns5LJXAsNB/HCLED-Components-V3--POC-?node-id=1418-23335&m=dev) |
| IconButton | [Base UI Button](https://base-ui.com/react/components/button) | [IconButton Figma](https://www.figma.com/design/hSgxFly4e92zns5LJXAsNB/HCLED-Components-V3--POC-?node-id=1322-451818&m=dev) |
| SelectSingle | [Base UI Autocomplete](https://base-ui.com/react/components/autocomplete) | [SelectSingle (Autocomplete) Figma](https://www.figma.com/design/hSgxFly4e92zns5LJXAsNB/HCLED-Components-V3--POC-?node-id=22891-19922&m=dev) |
| Checkbox | [Base UI Checkbox](https://base-ui.com/react/components/checkbox) | [Checkbox Figma](https://www.figma.com/design/hSgxFly4e92zns5LJXAsNB/HCLED-Components-V3--POC-?node-id=1338-466326&m=dev) |
| Dialog | [Base UI Dialog](https://base-ui.com/react/components/dialog) | [Dialog Figma](https://www.figma.com/design/hSgxFly4e92zns5LJXAsNB/HCLED-Components-V3--POC-?node-id=1495-91831&m=dev) |

Component specifications and APIs are still deferred. Add the Figma links when the design sources are confirmed.

## Documentation Ownership

- This file records project scope and decisions. Track task status, ownership, and sequence in [WORKLOAD.md](./WORKLOAD.md).
- Keep setup and consumer instructions in [README.md](./README.md), and contributor guidance in focused documents under `docs/`.
- Keep AI-specific conventions in [AGENTS.md](./AGENTS.md) and applicable instruction files. Update them when project conventions or required workflows change.
- Treat package manifests and configuration as the source of truth for versions, scripts, and enabled tooling. In documentation, distinguish current, planned, and undecided capabilities.

## References

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Base UI](https://base-ui.com/)
- [Sass](https://sass-lang.com/)
- [Storybook](https://storybook.js.org/)
- [Chromatic](https://www.chromatic.com/)
- [Design Tokens Format Module](https://www.designtokens.org/tr/2025.10/format/#abstract)
