# Copilot instructions

The canonical instructions for AI agents are in [AGENTS.md](../AGENTS.md). Read it first; it wins if this file ever differs. This file repeats only the rules that must never be missed.

- Do not add, install, or use third-party libraries or tools beyond those in `package.json`. If a task seems to need one, stop and ask.
- Token sources are DTCG 2025.10 `*.tokens.json` files with an explicit `$type` on every token. Never invent token values or hard-code design values in SCSS.
- Generate component styles only from a confirmed Figma design and approved tokens. Otherwise leave `<Component>.module.scss` empty.
- Every component declares and exports `<Component>Props`, re-exports it from its `index.ts`, and builds on the matching Base UI primitive when one exists.
- Use `as const` objects with a derived union type for fixed value sets. No `enum`, no `any`.
- Never commit or print secrets (`.env`, `CHROMATIC_ENCHANTED_PROJECT_TOKEN`).
- Run the narrowest relevant check (`npm run lint`, `npm run typecheck`, `npm test`, `npm run build`) and report only what you actually ran.

Details: [component guide](../docs/COMPONENT-GUIDE.md), [design tokens guide](../docs/DESIGN-TOKENS-GUIDE.md), [repo setup guide](../docs/REPO-SETUP-GUIDE.md).
