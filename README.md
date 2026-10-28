# @hcl-software/enchanted-react-components

Private internal React component library for HCL products. The repository contains the library scaffold and documentation setup. The components are unstyled scaffolds on Base UI primitives; styles and props follow once designs and tokens are confirmed.

## Requirements

- Node.js 24 LTS (`.nvmrc`)
- npm 11.19.0 or compatible npm 11 release

## Getting Started

```sh
npm ci
npm run storybook
```

Storybook is available at `http://localhost:6006` and currently contains the project overview. There are no component stories until components are added.

## Commands

| Command | Purpose |
|---|---|
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Check TypeScript types |
| `npm test` | Run Vitest tests |
| `npm run build` | Emit declarations, compile Sass, and build the library |
| `npm run storybook` | Start Storybook locally |
| `npm run build-storybook` | Build Storybook for review |
| `npm run chromatic` | Publish Storybook for Chromatic visual review |

Set `CHROMATIC_ENCHANTED_PROJECT_TOKEN` in the environment before running Chromatic. Never commit this token. In GitHub Actions the token comes from the `CHROMATIC_ENCHANTED_PROJECT_TOKEN` repository secret; the Chromatic workflows abort with an error when it is not set (see [the repository setup guide](docs/REPO-SETUP-GUIDE.md)).

## Package Policy

The package is named `@hcl-software/enchanted-react-components`, is marked `Apache-2.0` and `private`, and is not configured for publication. Base UI and React are peer dependencies for future library consumers and are included as development dependencies for local setup. Do not add, install, or use third-party libraries or tools beyond those already recorded in the package manifests. Prefer platform APIs and existing project capabilities; any exception requires explicit approval and an update to [ENCHANTED.md](ENCHANTED.md).

See [ENCHANTED.md](ENCHANTED.md) for project scope and [docs/](docs/) for focused guides, including the required [DTCG token format](docs/DESIGN-TOKENS-GUIDE.md). The setup guide records selected tools and repository conventions.