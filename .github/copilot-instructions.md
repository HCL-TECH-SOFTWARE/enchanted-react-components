# Copilot instructions

The canonical instructions for AI agents are in [AGENTS.md](../AGENTS.md). Read it first; it wins if this file ever differs. This file repeats only the rules that must never be missed.

- Do not add, install, or use third-party libraries or tools beyond those in `package.json`. If a task seems to need one, stop and ask.
- Token sources are DTCG 2025.10 `*.tokens.json` files with an explicit `$type` on every token. Never invent token values or hard-code design values in SCSS.
- Generate component styles only from a confirmed Figma design and approved tokens. Otherwise leave `<Component>.shadow.scss` empty.
- Every component declares and exports `<Component>Props`, re-exports it from its `index.ts`, and builds on the matching Base UI primitive when one exists.
- Use `as const` objects with a derived union type for fixed value sets. No `enum`, no `any`.
- Write component styles in `<Component>.shadow.scss` with component-prefixed class names, register them in `src/theme/boundaryStyles.ts`, and add `part="root"` to the root element. They run inside the `ThemeProvider` shadow boundary. Wrap every rule in `@layer enchanted.components { ... }` so plain-CSS overrides work when `shadowRootType={ShadowRootType.None}`. No CSS Modules (use `.shadow.scss`, not `.module.scss`, so class names stay unhashed), no `!important`, no specificity hacks.
- Document every public API with TSDoc (description, `@example` for components, a comment and `@default` on every prop, a comment on every `as const` member, `@param`/`@returns` on functions). See the component guide, section Code Documentation.
- Never commit or print secrets (`.env`, `CHROMATIC_ENCHANTED_PROJECT_TOKEN`).
- Run the narrowest relevant check (`npm run lint`, `npm run typecheck`, `npm test`, `npm run build`) and report only what you actually ran.

Details: [component guide](../docs/COMPONENT-GUIDE.md), [design tokens guide](../docs/DESIGN-TOKENS-GUIDE.md), [repo setup guide](../docs/REPO-SETUP-GUIDE.md).
