# Repository Setup Guide

## Purpose

This guide describes the decisions, structure, and conventions of the Enchanted component-library project. The project scope and roadmap are maintained in [ENCHANTED.md](../ENCHANTED.md).

Package manifests and configuration files are the source of truth for versions, scripts, and enabled tools. Entries marked planned or deferred are intentionally not implemented yet.

## Dependency Policy

Do not add, install, or use third-party libraries or tools beyond those already recorded in the package manifests. Prefer platform APIs and existing project capabilities. Any exception requires explicit approval and an update to [ENCHANTED.md](../ENCHANTED.md) before implementation. `npm ci` restores only the lockfile-pinned dependency tree; do not use it to introduce dependencies.

## Confirmed Setup Decisions

- **UI platform:** React with TypeScript.
- **Component foundation:** Base UI (`@base-ui/react`) is selected for future components. Component scope and APIs are deferred until approved. `ENCHANTED.md` is the source of truth for component candidates; no components are part of this setup.
- **Component baseline:** When component specifications are available, define accessible APIs. All design-system values in component styles must come from approved DTCG tokens; do not use theme-neutral literals as substitutes or invent token values. Until approved tokens are available, keep component styles empty.
- **Development and library build:** Vite.
- **Package output:** ESM only. The library entry point is `src/index.ts`; generated JavaScript, declarations, and styles are emitted under `dist/`.
- **Testing:** Vitest with Testing Library (React Testing Library, user-event, jest-dom) and jsdom for unit and component tests, `vitest-axe` for automated accessibility checks, and `@vitest/coverage-v8` for coverage. WebdriverIO and browser-based test runners are not part of the setup. Conventions are in [TESTING-GUIDE.md](TESTING-GUIDE.md).
- **Component documentation and visual review:** Storybook and Chromatic. Chromatic runs require a project token supplied through the environment; never commit the token.
- **Styles and tokens:** Sass/SCSS consumes tokens authored in the required DTCG Design Tokens Format Module 2025.10. Use `.tokens.json` files and maintain corresponding light and dark theme sources. Transformation runs through the first-party `scripts/build-tokens.mjs` (`npm run tokens:build`); do not add a third-party generator or invent token values. Pull the tokens a component needs before styling it, and leave styles unimplemented when no approved token covers a value. See [DESIGN-TOKENS-GUIDE.md](DESIGN-TOKENS-GUIDE.md).
- **Storybook addons:** `@storybook/addon-docs` (autodocs and MDX), `@storybook/addon-a11y` (axe checks per story), and `@storybook/addon-mcp` (exposes the component manifest to AI agents). Their versions follow Storybook. Do not add other addons without explicit approval; `@storybook/addon-vitest` is planned for when stories have `play` functions.
- **Storybook MCP:** while `npm run storybook` runs, the addon serves an MCP endpoint at `http://localhost:6006/mcp`. Register it per user, not in the repository, for example with `npx mcp-add --type http --url "http://localhost:6006/mcp" --scope user`. It is a preview feature and only supports React.
- **Storybook theming:** `.storybook/preview.tsx` wraps all stories with the shared `ThemeProvider`. Its Theme and Direction toolbar controls select light/dark and LTR/RTL respectively, defaulting to light and LTR.
- **Package:** Private internal package named `@hcl-software/enchanted-react-components`, marked `Apache-2.0` and not configured for publication. The manifest author is Hanjo Hagemeier <hanjo.hagemeier@hcl.com>; contributors are Angelo rick Asoy <angelorick.asoy@hcl.com> and Satish Kumar <kumarsati@hcl.com>.
- **Runtime:** Node.js 24 LTS with npm. The current setup environment uses npm 11.19.0.
- **Dependency versions:** Use only versions already recorded in `package.json` and `package-lock.json`; do not add or update dependencies without explicit approval.
- **Figma:** The remote Figma MCP server (`https://mcp.figma.com/mcp`) and `@figma/code-connect` (a development dependency) are the approved Figma integrations. MCP is configured in `.vscode/mcp.json` (VS Code) and `.mcp.json` (Claude Code); each user authenticates with their own Figma account through the MCP client, so neither file holds a credential. The separate `FIGMA_ACCESS_TOKEN` in the ignored `.env` is for the Code Connect CLI only and is not valid for MCP. Code Connect templates (`<Component>.figma.ts`) live next to each component and are configured in `figma.config.json`. Never store tokens or credentials in the repository. Publishing mappings to Figma is forbidden in this phase; see [FIGMA-CODE-CONNECT-SETUP.md](FIGMA-CODE-CONNECT-SETUP.md) for setup and [FIGMA-CODE-CONNECT-USAGE.md](FIGMA-CODE-CONNECT-USAGE.md) for authoring.
- **Module federation:** Out of scope for this repository.
- **CI:** Use four separate GitHub Actions workflows for pull requests: build, lint, test, and Chromatic. Each runs for pull requests and can be started manually with `workflow_dispatch`; pushes alone do not trigger them. A fifth workflow, the Chromatic baseline, runs on pushes to `main`. Both Chromatic workflows abort with an error when the `CHROMATIC_ENCHANTED_PROJECT_TOKEN` secret is not set; they do not skip publishing silently.

Keep package versions and scripts synchronized with the manifest and configuration. Do not claim a check passes until it has been run.

## Repository Structure

| Path | Responsibility | Status |
|---|---|---|
| `ENCHANTED.md` | Project scope and prioritized roadmap | Present |
| `README.md` | Project overview, getting started, and common commands | Present |
| `CHANGELOG.md` | Release history and changes under development | Present |
| `CODE_OF_CONDUCT.md` | Community participation standards and enforcement information | Present |
| `CONTRIBUTING.md` | Contributor roles and guidance for issues, development, and pull requests | Present |
| `LICENSE.txt` | Apache License 2.0 terms | Present |
| `package.json` | Private package metadata, dependencies, and local commands | Present |
| `package-lock.json` | Locked dependency tree for reproducible installs | Present |
| `.nvmrc` | Required Node.js major version | Present |
| `vite.config.ts` | ESM library build and Vitest configuration | Present |
| `eslint.config.js` | ESLint flat configuration | Present |
| `tsconfig.json` | Strict TypeScript typecheck configuration | Present |
| `tsconfig.build.json` | Declaration-only TypeScript library build configuration | Present |
| `src/index.ts` | Public library entry point; no components exported yet | Present |
| `docs/` | Focused project and contributor guides | Present |
| `src/` | Library source and public entry point | Present |
| `src/components/` | Reusable UI components | Candidate scaffolds present; functional implementation awaits approved scope and specifications |
| `src/components/<Component>/` | React component, colocated Storybook stories, and styles | Candidate scaffolds present; functional implementation awaits approved scope and specifications |
| `src/theme/` | Shared theme provider | Initial scaffold supports light and dark modes; API, mode selection, default, persistence, and token values await approved specifications |
| `src/utils/` | Small shared helpers, such as class name merging | Present |
| `src/types/` | Shared type definitions, if needed | Planned |
| `tokens/` | DTCG 2025.10 `.tokens.json` sources for light and dark themes | Present: `light.tokens.json` and `dark.tokens.json` from the Figma `Theme` collection; see [DESIGN-TOKENS-GUIDE.md](DESIGN-TOKENS-GUIDE.md) |
| `src/styles/` | SCSS source; `_tokens.generated.scss` is produced by `npm run tokens:build` and git-ignored | Present |
| `src/__tests__/` | Shared Vitest setup (`setup.ts`: jest-dom and axe matchers); see [TESTING-GUIDE.md](TESTING-GUIDE.md) | Present |
| `src/__tests__/unit/components/` | Unit and component tests, one `<Component>.test.tsx` per component | Present; additional component tests await component specifications |
| `.storybook/` | Storybook configuration | Present |
| `.storybook/preview.tsx` | Shared SCSS import, global theme/direction toolbars, and `ThemeProvider` decorator | Present |
| `src/Library.stories.tsx` | Storybook overview for the empty library scaffold | Present; component stories await approved specifications |
| `.chromatic/` | Optional Chromatic settings; secrets remain in environment | Optional |
| `.github/workflows/` | GitHub Actions quality, visual-review, and Chromatic baseline workflows | Present |
| `.vscode/mcp.json` | Figma MCP configuration for VS Code | Present |
| `.mcp.json` | Figma MCP configuration for Claude Code | Present |
| `figma.config.json` | Code Connect discovery and label configuration | Present |

## Prerequisites

- [Node.js](https://nodejs.org/) 24 LTS and [npm](https://www.npmjs.com/) 11.19.0 are required to install and run the JavaScript tooling. Node 24 is recorded in `.nvmrc` and the package engine constraint; npm 11.19.0 is pinned by the package manifest's `packageManager` field.

## Selected Tooling

- [TypeScript](https://www.typescriptlang.org/) for typed source code.
- [Vite](https://vite.dev/guide/) for development and build tooling.
- [React](https://react.dev/) and [Base UI](https://base-ui.com/) for the component library.
- [Vitest](https://vitest.dev/), [Testing Library](https://testing-library.com/), and [jsdom](https://github.com/jsdom/jsdom) for unit and component tests.
- [vitest-axe](https://github.com/chaance/vitest-axe) for automated accessibility assertions in component tests.
- [`@vitest/coverage-v8`](https://vitest.dev/guide/coverage) for test coverage reports.
- [Sass](https://sass-lang.com/) for SCSS.
- [Design Tokens Format Module 2025.10](https://www.designtokens.org/tr/2025.10/format/#abstract) is mandatory for light and dark token source files; a transformation tool is intentionally deferred.
- [Storybook](https://storybook.js.org/) for component documentation and local review.
- [Chromatic](https://www.chromatic.com/) for hosted visual review; a project token is required to publish builds.

Exact versions and scripts are recorded in `package.json` and `package-lock.json`. Browser automation with WebdriverIO is not included in this setup.

## Local Commands

Run these commands from the repository root:

| Command | Purpose |
|---|---|
| `npm ci` | Install locked dependencies |
| `npm run tokens:build` | Generate CSS custom properties from `tokens/` (runs automatically before build and Storybook) |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Check TypeScript |
| `npm test` | Run Vitest with coverage (text summary and `coverage/lcov.info`) |
| `npm run build` | Emit declarations, compile Sass, and build the library |
| `npm run storybook` | Start Storybook on port 6006 |
| `npm run build-storybook` | Build Storybook |
| `npm run chromatic` | Publish the Storybook build; requires `CHROMATIC_ENCHANTED_PROJECT_TOKEN` |

Vitest is configured to run tests matching `src/**/*.test.{ts,tsx}` (kept under `src/__tests__/`) and to fail when it finds no tests, so a broken test glob cannot pass CI silently (`passWithNoTests: false`). `npm test` runs with coverage. The minimum coverage is 80% per file for statements, branches, functions, and lines, and `npm test` fails below it (see [TESTING-GUIDE.md](TESTING-GUIDE.md)). Component tests, including an axe accessibility check, are added with component implementations after their specifications are approved; see [TESTING-GUIDE.md](TESTING-GUIDE.md).

GitHub Actions uses five workflows under `.github/workflows/`:

| Workflow | Triggers | Responsibility |
|---|---|---|
| `build.yml` | Pull request; manual (`workflow_dispatch`) | Install dependencies, typecheck, and build the package |
| `lint.yml` | Pull request; manual (`workflow_dispatch`) | Install dependencies and run ESLint |
| `test.yml` | Pull request; manual (`workflow_dispatch`) | Install dependencies and run Vitest |
| `chromatic.yml` | Pull request; manual (`workflow_dispatch`) | Install dependencies and publish visual review with `chromaui/action@v18` (`onlyChanged`, `externals: 'tokens/**'`, `exitOnceUploaded: false`, `skip: "dependabot/**"`); aborts with an error when `CHROMATIC_ENCHANTED_PROJECT_TOKEN` is not set |
| `chromatic-baseline.yaml` | Push to `main` | Update the Chromatic baseline (`autoAcceptChanges`; no TurboSnap, so every story is snapshotted); aborts with an error when `CHROMATIC_ENCHANTED_PROJECT_TOKEN` is not set |

The build, lint, test, and Chromatic workflows do not run on pushes alone. Each of them uses the Node version in `.nvmrc`, installs npm 11.19.0, and installs dependencies with `npm ci`. Both Chromatic workflows use the `chromaui/action` GitHub Action instead of `npm run chromatic`; the action builds Storybook (`build-storybook`, which first runs `tokens:build`) and publishes it. Both check out the full git history (`fetch-depth: 0`); the pull request workflow needs it for TurboSnap, and the baseline workflow does not use TurboSnap. The baseline workflow runs only on pushes to `main`, uses Node 24.x, and accepts changes automatically.

The token is supplied through the `CHROMATIC_ENCHANTED_PROJECT_TOKEN` GitHub Actions secret; it is never stored in the repository. Both Chromatic workflows check the secret and fail the run with the error `CHROMATIC_ENCHANTED_PROJECT_TOKEN is not set. Aborting workflow.` when it is empty, so a missing secret is visible instead of silently skipping visual review. GitHub does not pass repository secrets to pull requests from forks or to Dependabot, so the Chromatic check fails on those pull requests until a maintainer runs the workflow manually with `workflow_dispatch` from a branch in this repository.

## VS Code and Figma

Components are styled from confirmed Figma designs through the remote Figma MCP server. The server needs a Figma account with access to the design file and, for VS Code, GitHub Copilot.

- **VS Code:** open the command palette, run `MCP: List Servers`, start `figma`, and sign in through the browser window. The `figma.figma-vscode-extension` is optional.
- **Claude Code:** approve the project-scoped `.mcp.json` server when prompted, then authenticate with `/mcp`.

MCP authentication is an OAuth browser sign-in handled by the MCP client; it never uses a personal access token, and `.vscode/mcp.json` and `.mcp.json` contain no credential. The `FIGMA_ACCESS_TOKEN` in the ignored `.env` is a separate credential used only by the Code Connect CLI and REST style validation — the Figma MCP endpoint rejects it. This section is the authority for Figma authentication; [FIGMA-CODE-CONNECT-SETUP.md](FIGMA-CODE-CONNECT-SETUP.md) follows it and must not contradict it.

Do not install other Figma extensions or MCP servers, or add other Figma tooling, without explicit approval and an update to this guide and [ENCHANTED.md](../ENCHANTED.md). Never commit Figma tokens or credentials; keep `FIGMA_ACCESS_TOKEN` in an ignored `.env` (see `.env.example`).

## Setup Automation

The setup configures a private package manifest, a locked dependency tree, TypeScript/Vite/Sass tooling, Vitest, Storybook, ESLint, and GitHub Actions. The library build emits ESM only. Component implementation is deferred until first-release scope and specifications are approved. Do not introduce additional third-party dependencies or tools. No third-party token generator is added; token transformation uses the first-party `scripts/build-tokens.mjs`, and the Figma MCP and Code Connect configuration are the only Figma tooling. `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, and `LICENSE.txt` are static files: setup automation must not modify, delete, regenerate, or otherwise write to them. Changes to these governance and legal documents are outside the setup process.

Keep generated configuration deterministic and reviewable. Validate changes with the repository commands above, and update the README and this guide whenever package scripts or setup decisions change.

## Setup Guide Maintenance

When setup decisions or package scripts change, update this guide with verified prerequisites and commands. Confirm that documented paths exist and that commands work from the repository root. For broader project context and remaining work, see [ENCHANTED.md](../ENCHANTED.md).
