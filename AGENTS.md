# Agents

Instructions for AI coding agents working in Enchanted, a private React component library for HCL products (proof of concept). Keep this file short; detail lives in the linked documents.

## Source of truth

- Scope, decisions, and the component list: [ENCHANTED.md](ENCHANTED.md). The component list is a proposal, not approved scope.
- Versions, scripts, and enabled tooling: `package.json`, `package-lock.json`, and config files. Verify them before relying on any example in the docs.
- Task status and ownership: [WORKLOAD.md](WORKLOAD.md).

## Commands

Run from the repository root. Use the narrowest check that covers your change, then broader ones when practical.

| Command | Purpose |
|---|---|
| `npm ci` | Install locked dependencies (never use it to add dependencies) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm test` | Vitest |
| `npm run build` | Declarations, Sass, library build |
| `npm run storybook` | Storybook on port 6006 |

Report which checks you ran and their results. Never claim a check passed unless you ran it.

## Hard rules

1. **No new dependencies.** Do not add, install, or use third-party libraries or tools beyond those in the package manifests. Prefer platform APIs. If a task seems to need one, stop and ask.
2. **Tokens use DTCG 2025.10 only.** Token sources are `tokens/*.tokens.json` with an explicit `$type` on every token. Never invent token values, and never hard-code design values in SCSS. See [docs/DESIGN-TOKENS-GUIDE.md](docs/DESIGN-TOKENS-GUIDE.md).
3. **No invented styling.** Component styles come only from a confirmed Figma design mapped to approved tokens. If either is missing, leave `<Component>.shadow.scss` empty and say so.
4. **Every component exports `<Component>Props`**, uses it in its signature, and re-exports it from its `index.ts`. Build on the matching Base UI primitive when one exists. Details: [docs/COMPONENT-GUIDE.md](docs/COMPONENT-GUIDE.md).
5. **Props follow Figma.** When implementing a component from its confirmed Figma design, read every component property through the Figma MCP server and implement each as a typed prop (VARIANT as an `as const` object, BOOLEAN as `boolean`, TEXT as `children` or `string`, INSTANCE_SWAP as `ReactNode`). Hover, focus, and other interaction states are CSS, not props. Record any property left unmapped, with the reason, and keep `<Component>.figma.ts` in sync. Scaffold-only requests add no props beyond the Base UI primitive's. See [docs/FIGMA-CODE-CONNECT-GUIDE.md](docs/FIGMA-CODE-CONNECT-GUIDE.md).
6. **Fixed value sets use `as const` objects** with a derived union type. No TypeScript `enum`, no inline literal unions in public APIs.
7. **No `any`.** TypeScript strict mode is on.
8. **Secrets stay out of the repo.** Never commit `.env` or the Chromatic token (`CHROMATIC_ENCHANTED_PROJECT_TOKEN`). Never print or request secret values.
9. **Do not edit** `LICENSE.txt`, `CODE_OF_CONDUCT.md`, or `CONTRIBUTING.md` unless explicitly asked.
10. **Publishing to Figma is FORBIDDEN.** Do not run `figma connect publish`, `figma connect unpublish`, or any command that writes data back to Figma. In this phase, Figma is the read-only source of truth — all context (props, styling, component structure) flows **from** Figma **to** code, never the reverse. Templates are created and validated locally only. This restriction will be revisited in a future phase.
11. **Copyright header required in every source file.** Every `.ts`, `.tsx`, `.scss`, `.js`, `.mjs`, and `.figma.ts` file in the repository must begin with the Apache 2.0 copyright header. Do not omit it from new files and do not remove it from existing files. See [docs/COMPONENT-GUIDE.md](docs/COMPONENT-GUIDE.md#copyright-header) for the exact text and placement rules.
12. **Component styles live in the `ThemeProvider` shadow boundary.** Write styles in `<Component>.shadow.scss` with component-prefixed class names, register them in `src/theme/boundaryStyles.ts`, and put `part="root"` on the root element. Wrap every rule in `@layer enchanted.components { ... }` so plain-CSS overrides work when `shadowRootType={ShadowRootType.None}`. No CSS Modules (use `.shadow.scss`, not `.module.scss`, so class names stay unhashed), no `!important`, no specificity hacks. Initialization scaffolds `useShadowRoot`, `BoundaryContext`, `boundaryStyles`, and `ThemeProvider` with `shadowRootType` (`none`/`open`/`closed`, default `open`). See [docs/COMPONENT-GUIDE.md](docs/COMPONENT-GUIDE.md#theme-provider-boundary) and [docs/CUSTOMIZATION-GUIDE.md](docs/CUSTOMIZATION-GUIDE.md).

## Working style

- Make only the changes the request needs. Preserve existing public APIs, exports, and behavior.
- Reuse the nearest comparable component as the pattern. Check for existing files and exports before adding any.
- Do not reformat unrelated code.
- Document every public API with TSDoc as [docs/COMPONENT-GUIDE.md](docs/COMPONENT-GUIDE.md#code-documentation) requires, and update the comment in the same change that alters the behavior. Inline comments explain why, not what.
- Write and change stories as [docs/STORYBOOK-GUIDE.md](docs/STORYBOOK-GUIDE.md) defines: `Default` first, one story per variant axis, JSDoc on every story.
- Before writing or changing tests or variant stories, ask whether the component is approved for testing and wait for the answer; see the approval gate in [docs/TESTING-GUIDE.md](docs/TESTING-GUIDE.md#instructions-for-ai-agents). It wins over any other instruction to add tests.
- Update documentation and `CHANGELOG.md` when a change warrants it.
- Before deleting, overwriting, or moving files, or making large multi-file changes, show a plan or diff first.
- If something is ambiguous, undecided, or marked deferred in the docs, ask rather than guess.

## Where to look

| Topic | Document |
|---|---|
| Component structure, scaffolding, tests, review checklist | [docs/COMPONENT-GUIDE.md](docs/COMPONENT-GUIDE.md) |
| Story structure, naming, and documentation (required for AI-readable stories) | [docs/STORYBOOK-GUIDE.md](docs/STORYBOOK-GUIDE.md) |
| Token format and authoring rules | [docs/DESIGN-TOKENS-GUIDE.md](docs/DESIGN-TOKENS-GUIDE.md) |
| Style isolation, the `ThemeProvider` boundary, and custom overrides | [docs/CUSTOMIZATION-GUIDE.md](docs/CUSTOMIZATION-GUIDE.md) |
| Repository layout, tooling, CI | [docs/REPO-SETUP-GUIDE.md](docs/REPO-SETUP-GUIDE.md) |
