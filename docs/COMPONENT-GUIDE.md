# Component Guide

Use this guide as instructions for the initial implementation of components and for later AI-generated changes. Verify repository configuration and source before relying on examples here; when verified local conventions differ, follow the local conventions and update this guide if the difference establishes a reusable project rule.

## Dependency Policy

Use platform APIs and dependencies already recorded in the package manifests. Do not add, install, or use other third-party libraries or tools without explicit approval and an update to [ENCHANTED.md](../ENCHANTED.md). If a request appears to require an unapproved dependency or integration, stop and ask before proceeding.

## AI Implementation Workflow

1. Before the first component implementation, inspect the package manifest, TypeScript and lint configuration, source tree, public entry points, and available test or Storybook setup. Confirm the framework, libraries, file locations, and commands instead of assuming this guide's examples describe the current checkout.
2. If a comparable component exists, use it as the primary pattern. If this is the first component of its kind, use the verified project configuration and the applicable guidance below to establish the smallest consistent implementation pattern. Avoid introducing a new architecture or dependency just to complete one component.
3. For future implementations and modifications, reuse the established component structure, APIs, styling, exports, tests, and stories. Preserve existing behavior and public APIs unless the request explicitly changes them; do not duplicate or replace established patterns without a concrete need.
4. Make only the files and changes required by the request and project conventions. The scaffold restrictions in this step and in [Component Scope and Scaffolding](#component-scope-and-scaffolding) apply only to initial scaffolding. Once a component has a confirmed Figma design and the user asks for it to be implemented, follow [Implementing a Component from Figma](#implementing-a-component-from-figma) instead. When asked for a component scaffold, use its corresponding Base UI primitive when one exists; do not invent wrapper props, behavior, or styling, and leave `Component.shadow.scss` empty. Generate component styles only through Figma MCP from a confirmed Figma design, writing the result to `Component.shadow.scss` (see [Style Isolation](#theme-provider-boundary)). For a component without a matching primitive, create only the minimal scaffold and exports. For functional changes, add or update focused tests and stories as appropriate, including relevant accessibility states, subject to the testing approval gate in [Tests and Storybook](#tests-and-storybook).
5. Run the narrowest relevant validation command available in the repository. Report what changed and which checks passed or could not be run; never claim unrun checks passed.

## Component Scope and Scaffolding

Use the First-Release Scope table in [ENCHANTED.md](../ENCHANTED.md#first-release-scope) as the source of truth for the proposed component set; its entries are candidates, not approved release scope. Use [REPO-SETUP-GUIDE.md](REPO-SETUP-GUIDE.md) as the source of truth for project structure and tooling. Component specifications and APIs are still deferred.

When a user asks to start, initialize, or scaffold the initial components, read the First-Release Scope table in [ENCHANTED.md](../ENCHANTED.md#first-release-scope) and scaffold every row in the same pass; do not scaffold only the single component mentioned in the request. Also scaffold the shared `ThemeProvider` under `src/theme/` in that same pass, together with its style boundary (`useShadowRoot`, `BoundaryContext`, and `boundaryStyles`) as [Style Isolation](#theme-provider-boundary) defines. Reuse existing scaffolds and exports, and map display names to consistent PascalCase identifiers (for example, `Data Grid` maps to `DataGrid`). This instruction authorizes minimal component scaffolds that use matching Base UI primitives when available, plus a provider scaffold supporting light and dark modes and configurable LTR/RTL direction. It does not approve release scope or authorize additional wrapper APIs, styling, or behavior; functional implementations still require an approved specification or an explicit request. Check for existing files and exports before adding anything.

For each missing component in that table, create `src/components/<Component>/` with a `Component.tsx` named arrow component, an exported `<Component>Props` interface, an `index.ts` barrel export for both the component and its props interface, an empty `Component.shadow.scss` file (imported with `?inline` in `src/theme/boundaryStyles.ts`), and a `Component.stories.tsx` with Storybook metadata and one `Default` story. This props interface is mandatory even when the component has no props. When a corresponding Base UI primitive exists, derive the interface from that primitive's public props and forward those props to the primitive; do not replace an available primitive with a `null` placeholder. When no matching primitive exists, define a no-props interface extending `Record<string, never>`, type the component with that interface, and it may return `null`; its source must include a concise comment stating that Base UI has no matching primitive for it (for example, `// Base UI does not provide a matching primitive for this component.`). Do not add wrapper-owned props, styling rules, state, handlers, interactions, or behavior beyond what is required to use the primitive. Add tests and functional stories only after the component specification is approved and the user confirms approval for testing (see [Tests and Storybook](#tests-and-storybook)).

The restrictions above (no wrapper props, styling, state, or behavior; empty `Component.shadow.scss`; `null` placeholders) describe the scaffold only. They keep an unapproved API from being invented before a design exists, and they stop applying once the component is implemented from Figma.

Minimal story pattern for a scaffold. Replace `<Group>` with the name of the Figma page that holds the component (for example `Inputs` or `Feedback`); the title must follow `Components/<Group>/<Component>` from the start, as [STORYBOOK-GUIDE.md](STORYBOOK-GUIDE.md#titles) defines. `__tests__/unit/storybook/titles.test.ts` fails on any other shape. Once a component is implemented, restructure its stories as that guide defines the rest:

```tsx
/* ======================================================================== *
 * Copyright 2026 HCL America Inc.                                          *
 * Licensed under the Apache License, Version 2.0 (the "License");          *
 * you may not use this file except in compliance with the License.         *
 * You may obtain a copy of the License at                                  *
 *                                                                          *
 * http://www.apache.org/licenses/LICENSE-2.0                               *
 *                                                                          *
 * Unless required by applicable law or agreed to in writing, software      *
 * distributed under the License is distributed on an "AS IS" BASIS,        *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 * See the License for the specific language governing permissions and      *
 * limitations under the License.                                           *
 * ======================================================================== */

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Component } from './Component';

const meta = {
  title: 'Components/<Group>/Component',
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
```

## Implementing a Component from Figma

Use this phase after the scaffold exists, when the user asks for a component to be implemented and its Figma design is confirmed in the First-Release Scope table in [ENCHANTED.md](../ENCHANTED.md#first-release-scope). Verify the link points at the intended component set first; a mismatched link is a design-source problem to resolve before implementing.

- **Props follow Figma.** Implement each Figma component property as a typed React prop, as [FIGMA-CODE-CONNECT-GUIDE.md](FIGMA-CODE-CONNECT-GUIDE.md) requires: `VARIANT` as a const-object union, `BOOLEAN` as a `boolean` or as the presence of a slot, `TEXT` as `children` or a string, and `INSTANCE_SWAP` as a `ReactNode`. Hover, focus, and other interaction states are CSS states, not props. Do not add props that have no Figma property or documented need, and record any Figma property left unmapped, with the reason.
- **Build on the primitive.** Keep using the matching Base UI primitive when one exists, derive props from its public types, and pass through its other props.
- **Styles come from Figma.** Fill `Component.shadow.scss` with exact values read through Figma MCP, with the Figma token name in a comment. Do not invent values or assume standard colors. Use component-prefixed class names and register the stylesheet in `boundaryStyles.ts` (see [Style Isolation](#theme-provider-boundary)).
- **Complete the set.** Update the stories, add Vitest tests (only once the testing approval gate is satisfied; see [Tests and Storybook](#tests-and-storybook)), update the `<Component>.figma.ts` mapping with the exact Figma property names, and export the component and its public prop types from `index.ts`.

## Project Structure

- This is a TypeScript React component library using SCSS and Storybook. Base UI is the selected primitive library for components that are still to be built; no functional component implementations are in place yet. Base UI provides accessible, unstyled primitives, and component styling belongs to the library's SCSS and design-token system.
- Production code belongs under `src/`. Components belong in `src/components/<Component>/` with a matching `.tsx` implementation, `.scss` stylesheet, `.stories.tsx` story, and `index.ts` barrel. Once components exist, follow the neighboring component's structure.
- The shared theme provider belongs under `src/theme/` and is scaffolded with the initial component set. It must support both light and dark theme modes by scoping the active mode with a stable DOM attribute such as `data-theme="light"` or `data-theme="dark"`. It also accepts an optional `direction` configuration of `"ltr"` or `"rtl"`, defaults to `"ltr"`, and applies it through the native `dir` attribute. It also accepts `shadowRootType` (default `ShadowRootType.Open`), which chooses whether and how its children render into a shadow-root style boundary; see [Style Isolation](#theme-provider-boundary). Keep mode selection, its default, and persistence behavior deferred until a theme-provider specification is approved.
- A component's Figma Code Connect mapping belongs in `<Component>.figma.ts` in the same directory. Add it when the component has a confirmed Figma link in the First-Release Scope table; omit it in scaffold-only work. See [FIGMA-CODE-CONNECT-SETUP.md](FIGMA-CODE-CONNECT-SETUP.md) for setup and [FIGMA-CODE-CONNECT-USAGE.md](FIGMA-CODE-CONNECT-USAGE.md) for the mapping workflow.

Typical component layout:

```text
src/
  __tests__/
    unit/
      components/
        <Component>.test.tsx
  components/
    <Component>/
      <Component>.tsx
      <Component>.shadow.scss
      <Component>.stories.tsx
      <Component>.figma.ts
      index.ts

```

- Unit tests live in `src/__tests__/unit/components/<Component>.test.tsx`, one file per component. Do not use `<Component>.figma.ts` as a source for tests; see [TESTING-GUIDE.md](TESTING-GUIDE.md).
- Preserve the package's public exports and existing import paths. When adding a public component or symbol, update the relevant barrel exports, including the package entry point when appropriate.
- Every component publicly exports its own `<Component>Props` interface from its component file and barrel. Keep the interface in sync with the component signature.

## TypeScript and React

- Use TypeScript for source and Storybook files (`.ts` and `.tsx`). Strict type checking is enabled; model props and callbacks explicitly and do not introduce `any`.
- Every component MUST declare and export a component-specific `<Component>Props` interface, use it to type the component's props, and re-export it from the component's `index.ts` barrel. This applies to scaffolded and functional components, including components with no props; for those, use an interface extending `Record<string, never>` so unsupported props are rejected.
- Build on the relevant Base UI primitive when one exists and fits the component's semantics. Define the component props interface by extending `ComponentProps<typeof BasePrimitive>` imported from React (alias the import if needed to avoid colliding with the component-specific interface name), and forward the received props to the primitive. When a component is implemented from Figma, add its Figma-derived props to this interface (see [Implementing a Component from Figma](#implementing-a-component-from-figma)) and consume styling-only props before forwarding the rest, so they never reach the primitive or the DOM. Do not make the interface optional or rely only on an inferred component signature. For enum-like values, follow the `const` object guidance below instead of adding a TypeScript `enum`.
- Define named function components as arrow functions. Follow the installed Base UI and React versions for ref handling. Preserve controlled/uncontrolled behavior and pass through supported primitive props unless the wrapper intentionally changes them.
- Use descriptive names and avoid shadowing, unused values, `console` calls, and focused or disabled tests. Do not add, install, or use a third-party dependency or tool that is not already approved in the package manifests.
- Document every public API with TSDoc and keep inline comments for non-obvious behavior only. The required content is in [Code Documentation](#code-documentation).

### Enum-Like Values

For every fixed set of values in a public API, you MUST define and export a `const` object with `as const`, then derive and export its union type from that object. This applies to component variants, colors, sizes, theme modes, directions, and similar finite options. Do not declare these values as inline literal unions or TypeScript `enum`s; use the exported object for defaults and option lists so the runtime values and types stay in sync. Keep boolean props and other non-enum values as their appropriate primitive types.

```ts
export const Status = {
  Pending: "PENDING",
  Shipped: "SHIPPED",
  Delivered: "DELIVERED",
} as const;

export type StatusType = typeof Status[keyof typeof Status];
```

`StatusType` is the union `'PENDING' | 'SHIPPED' | 'DELIVERED'`. Use the object to access a value, such as `Status.Pending`, and use `StatusType` to type values that may be any of the statuses.

## Code Documentation

TSDoc on public APIs is **required**, not optional. It is the single source of truth for the Storybook docs page and the Storybook MCP manifest (see [STORYBOOK-GUIDE.md](STORYBOOK-GUIDE.md)), and it ships in the generated `.d.ts` files, so consumers see it in their editor.

**What to document.** Everything exported from a component folder, from `src/index.ts`, `src/theme/`, or `src/utils/`:

| Item | Required content |
|---|---|
| Component | What it is and when to use it (one sentence each), the alternative ("For icon-only actions, use IconButton"), how it is styled and customized, and an `@example`. Say which Base UI primitive it builds on and that its props are passed through. |
| `<Component>Props` | A comment on the interface that names the primitive it extends. |
| Each prop | What it does, the allowed values for non-trivial props, `@default` for every prop with a default, and the Figma property it maps to when the name differs. Document behavior a prop does **not** have when a consumer could expect it (for example, a visual-only `selected` that does not set `aria-pressed`). |
| `as const` object and derived type | A comment on the object, a one-line comment on each member saying when to use it, and a comment on the union type. |
| Function or hook | `@param`, `@returns`, `@throws` when it throws, and an `@example` when usage is not obvious. |
| Build scripts (`scripts/*.mjs`) | JSDoc with types on every function (`@param`, `@returns`, `@throws`), because they are not type-checked. |
| Stories | A JSDoc comment on every story, as [STORYBOOK-GUIDE.md](STORYBOOK-GUIDE.md) requires. |

**Rules**

- Write for the consumer of the library, not for the maintainer. Do not restate the type or the name ("The variant"). Say what it changes.
- Use `{@link Symbol}` to refer to other exports, and backticks for props, values, and attributes.
- Describe behavior the code has, and nothing more. Do not document planned or assumed behavior, and update the comment in the same change that alters the behavior.
- Inline `//` comments explain **why**, never what: a workaround, a non-obvious constraint, a design decision, or a link between code and the design. Do not comment obvious code.
- Do not add a comment to a barrel `index.ts` that only re-exports.
- Do not add a documentation or lint dependency to enforce this. Reviewers check it with the [Code Review Checklist](#code-review-checklist).

```tsx
/** Visual emphasis of a {@link Button}. Maps to the Figma `variant` property. */
export const ButtonVariant = {
  /** Filled background. Use for the primary action of a view. */
  Contained: 'contained',
  /** Stroke without a fill. Use for secondary actions. */
  Outlined: 'outlined',
} as const;

/** Union of the {@link ButtonVariant} values. */
export type ButtonVariantType = (typeof ButtonVariant)[keyof typeof ButtonVariant];

/** Props of the {@link Button}. Extends the Base UI `Button` props, which are passed through. */
export interface ButtonProps extends ReactComponentProps<typeof BaseButton> {
  /**
   * Visual emphasis. Figma `variant`.
   * @default ButtonVariant.Contained
   */
  variant?: ButtonVariantType;
}

/**
 * Triggers an action with a single click. For icon-only actions, use IconButton.
 *
 * @example
 * ```tsx
 * <Button variant={ButtonVariant.Outlined}>Save</Button>
 * ```
 */
export const Button = ({ variant = ButtonVariant.Contained, ...props }: ButtonProps) => (
  <BaseButton
    {...props}
    className="buttonRoot"
    // React's DOM types have no `part` attribute, so it is passed through a spread.
    {...{ part: 'root' }}
    data-variant={variant}
  />
);
```

## Styling and Design Tokens

- Do not invent component styling or CSS values. Generate component styles only from a confirmed Figma design and write them into `Component.shadow.scss`. Every design-system value MUST map to an approved DTCG 2025.10 token; do not copy raw Figma values into SCSS or substitute hard-coded values. If a required token is missing, leave the affected styles unimplemented and record the missing token. If the confirmed design or approved tokens are unavailable, leave the stylesheet empty. Follow [DESIGN-TOKENS-GUIDE.md](DESIGN-TOKENS-GUIDE.md).
- **Style isolation (required).** Component styles live in `<Component>.shadow.scss` and are injected by `ThemeProvider` into its shadow-root boundary, so page CSS does not reach them. Consumers override through tokens, the inline `style` prop, or `::part(root)`. The rules are in [Style Isolation](#theme-provider-boundary) and [CUSTOMIZATION-GUIDE.md](CUSTOMIZATION-GUIDE.md).
- Keep styling compatible with the theme's supported modes and text directions. Use the theme and established RTL-aware utilities rather than assuming left-to-right layout.
- Include a `ThemeProvider` scaffold as shared library infrastructure during initial component setup. It must support both light and dark modes and scope the active theme using a stable DOM attribute such as `data-theme="light"` or `data-theme="dark"`. It must accept an optional `direction` prop with values `"ltr"` or `"rtl"`, defaulting to `"ltr"`, and apply it to the provider scope using the native `dir` attribute. Mode selection, its default, and persistence behavior remain unspecified until approved.
- Storybook's `.storybook/preview.tsx` wraps every story in `ThemeProvider` and exposes global toolbar controls for light/dark theme, LTR/RTL direction, and the shadow root type (none/open/closed). The initial Storybook globals are light, LTR, and open; keep the preview mapping aligned with the provider API. Stories therefore render inside the style boundary.
- Theme-specific DTCG token values must be exposed as CSS custom properties at the theme scope; components consume those properties rather than resolve design values in JavaScript. Do not invent token values or manually duplicate token values in SCSS.
- Light and dark styling stay in the stylesheet and token layer, and provider changes update the theme attribute without remounting components. A component's styles and tokens come from the provider, so a component rendered without a `ThemeProvider` is unstyled; unit tests render it without one or with `shadowRootType={ShadowRootType.None}`.
- Preserve accessibility semantics, keyboard interaction, focus visibility, and disabled/error states when changing controls.

## Style Isolation: the ThemeProvider Boundary

<a id="theme-provider-boundary"></a>Component styles are isolated from the page's CSS and are not overridden unless a consumer does so deliberately. `ThemeProvider` provides this isolation: it renders its children into a shadow root, called the **boundary**, and component styles are injected into that root. The boundary is an open shadow root by default, and `shadowRootType` can make it closed or turn it off. This is the required default. The `@layer enchanted.components` cascade layer is kept inside the stylesheets, because it is what lets consumers override with plain CSS when `shadowRootType={ShadowRootType.None}`.

> **Status: proof of concept.** The behavior described here follows from the shadow DOM and React 19 rules and has been checked with typecheck, lint, and builds. It has not yet been verified across browsers, so confirm it in Storybook and Chromatic before relying on it.

### What to scaffold at initialization

Create these in the same pass as the initial components and `ThemeProvider` (see [Component Scope and Scaffolding](#component-scope-and-scaffolding)). Each file begins with the [copyright header](#copyright-header).

| File | Purpose |
|---|---|
| `src/utils/useShadowRoot.ts` | Hook `useShadowRoot<T>(mode)` returning `[root, ref]`. The ref attaches a shadow root of the given mode to its element and reuses a root it already created, because `attachShadow` throws when called twice (React StrictMode re-runs ref callbacks). Keep the created root in a `WeakMap` keyed by the host, not in `host.shadowRoot`, which is always `null` for a closed root. `root` is `null` until the host has mounted. |
| `src/theme/BoundaryContext.ts` | `BoundaryContext` holding the boundary's `ShadowRoot` (or `null`), and the `useBoundary()` hook. Components and portals read it to find the boundary. |
| `src/theme/boundaryStyles.ts` | Exports `boundaryStyles`, the concatenated CSS of every component, built from `import x from '../components/<Component>/<Component>.shadow.scss?inline'`. Add one import per component that has styles. |
| `src/theme/ThemeProvider.tsx` | The provider with the `shadowRootType` prop, and the `ShadowRootType` constant (below). |
| `src/components/<Component>/<Component>.shadow.scss` | The component's styles (see [Component styles](#boundary-component-styles)). |

### ThemeProvider behavior

`ThemeProvider` accepts `mode`, `direction`, and `shadowRootType?: ShadowRootType`. `ShadowRootType` is an `as const` object with a derived union type, and its values match the platform's `ShadowRootMode` for `open` and `closed`:

```ts
export const ShadowRootType = { None: 'none', Open: 'open', Closed: 'closed' } as const;
export type ShadowRootType = (typeof ShadowRootType)[keyof typeof ShadowRootType];
```

`shadowRootType` defaults to `ShadowRootType.Open`.

- **`ShadowRootType.Open` (default) and `ShadowRootType.Closed`:** render a host `<div data-theme={mode} dir={direction}>` and attach a shadow root of that mode with `useShadowRoot`. Into that root it portals `<style>{boundaryStyles}</style>` and the children wrapped in `<BoundaryContext value={root}>`. The host carries `data-theme` and `dir`, so the token custom properties and the text direction inherit through the boundary and are not repeated inside it. Nothing renders until the host has mounted. A closed root cannot be reached through `host.shadowRoot`, so consumers and tests cannot query into it, and Playwright's shadow piercing does not work on it; `::part(root)`, tokens, and inline `style` still work. Closed mode discourages access and is not a security boundary, because the provider and browser DevTools can still reach the root.
- **`ShadowRootType.None`:** renders the plain `<div data-theme dir>` and, inside it, `<style href="enchanted-styles" precedence="enchanted">{boundaryStyles}</style>`. React 19 hoists that tag to the document head and renders it once, however many providers there are. Use it where isolation is not wanted, and in unit tests that query the DOM.
- **Changing the type at runtime:** `attachShadow` cannot change the mode of an element that already has a root. Put `key={shadowRootType}` on the host so the provider remounts its subtree when the type changes.
- Without any `ThemeProvider`, a component has neither the tokens nor its styles.

### Component styles

<a id="boundary-component-styles"></a>
- Write styles in `<Component>.shadow.scss`. Use the `.shadow.scss` name, not `.module.scss`: Vite hashes the class names in a `.module.scss` file as a CSS Module, which would no longer match the plain class names used here. Wrap every rule, with no exceptions, in `@layer enchanted.components { ... }`: base, variants, states, and sizes. Inside a shadow root the layer only orders the library's own rules, but with `shadowRootType={ShadowRootType.None}` the styles sit in the document, where unlayered consumer CSS always beats layered CSS regardless of specificity or load order. Do not use `!important` and do not raise selector specificity to win against consumer CSS.
- Use plain class names that start with the component name (`buttonRoot`, `buttonLabel`, `textFieldSurface`). The same stylesheet is used inside the shadow root and, with `shadowRootType={ShadowRootType.None}`, in the document, so a generic name such as `root` would collide with the page's classes.
- In the component, write the class names as strings (`className={cn('buttonRoot', className)}`). Do not import styles into the `.tsx` file. Register the stylesheet in `boundaryStyles.ts`, or the component is unstyled.
- Every value still comes from an approved token (`var(--color-...)`), as [DESIGN-TOKENS-GUIDE.md](DESIGN-TOKENS-GUIDE.md) requires. Tokens are not defined inside the shadow root; they inherit from the provider host.
- Put `part="root"` on the component's root element so consumers can reach it with `::part(root)`. Expose further parts only when a design needs them: every part is public API.

### Overriding from a consumer

| Need | Use | Notes |
|---|---|---|
| Re-theme an app or a region | Set the `--color-*` tokens on the `ThemeProvider` (`style` or a page rule on its host) or on a wrapper element inside it | The tokens inherit through the boundary. Tokens set on an ancestor of the provider have no effect, because the provider host declares its own. |
| Change one instance | The component's inline `style` prop | Avoid `background` and the component's own custom properties inline, since an inline value also beats the hover paint. |
| Restyle every instance in a provider | `.host::part(root) { ... }` in a page stylesheet | The selector must match the provider's host element. It applies to all matching parts inside that provider. |
| No isolation wanted | `shadowRootType={ShadowRootType.None}` and normal CSS | The component classes are ordinary document classes. |

Not available inside a boundary: global selectors from the page (`.page button { ... }`), and `className` rules in page CSS, because the element is inside the shadow root.

### Known limitations

- **Forms and labels:** a `<form>`, `<label htmlFor>`, `aria-labelledby`, or `aria-describedby` and the control it refers to must be inside the same boundary. A control inside the boundary is not associated with a form or label outside it.
- **Portals:** Base UI renders popups (Popover, Select, Dialog, Menu) into `document.body` by default, outside the boundary, where they lose their styles. Pass `container` to the portal from `useBoundary()`. This is not wired up yet.
- **Content inside the boundary loses the page's CSS:** a consumer's own elements placed inside `ThemeProvider` are not styled by their page stylesheets. Only inline styles and tokens reach them.
- **Events and focus:** code outside the boundary sees the host in `event.target` and `document.activeElement`. Events that are not `composed`, such as `change`, do not leave the boundary.
- **Tests:** Testing Library queries on `document` cannot see inside a shadow root. Render components without a provider, or inside `<ThemeProvider shadowRootType={ShadowRootType.None}>`, in unit tests ([TESTING-GUIDE.md](TESTING-GUIDE.md)).
- **Server rendering:** the shadow root exists only in the browser, so a provider with an open or closed root renders an empty host on the server and its children appear after hydration.
- **Fonts:** `@font-face` rules must be loaded in the main document.

## Copyright Header

Every source file in the repository (`.ts`, `.tsx`, `.scss`, `.js`, `.mjs`, and `.figma.ts`) **must** begin with the following Apache 2.0 copyright header. Place it as the very first content in the file, before any imports or code. For TypeScript, JavaScript, and SCSS files use the block-comment form:

```
/* ======================================================================== *
 * Copyright 2026 HCL America Inc.                                          *
 * Licensed under the Apache License, Version 2.0 (the "License");          *
 * you may not use this file except in compliance with the License.         *
 * You may obtain a copy of the License at                                  *
 *                                                                          *
 * http://www.apache.org/licenses/LICENSE-2.0                               *
 *                                                                          *
 * Unless required by applicable law or agreed to in writing, software      *
 * distributed under the License is distributed on an "AS IS" BASIS,        *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 * See the License for the specific language governing permissions and      *
 * limitations under the License.                                           *
 * ======================================================================== */
```

### Rules

- **New files:** Always add the header. No exceptions.
- **Existing files:** Preserve the header when editing. Do not remove or alter it.
- **Placement:** The header must be the first content in the file. A single blank line separates it from the first import or code statement.
- **Scope:** This applies to all source files: components (`.tsx`), barrels (`index.ts`), stories (`.stories.tsx`), tests (`.test.tsx`), stylesheets (`.shadow.scss`), Code Connect templates (`.figma.ts`), shared utilities, theme files, and build scripts.
- **JSON files** (such as `.tokens.json`, `package.json`, `tsconfig.json`) do **not** get the header because JSON does not support comments.

## Formatting and Imports

- Follow the repository's flat ESLint configuration in `eslint.config.js` and any repository overrides. Read that file before relying on a specific rule; it is the source of truth, and this guide does not restate its rule set. Explicit `any` is disallowed. Use `@storybook/react-vite` for Storybook types and extensionless specifiers for TypeScript sibling imports, consistent with the project's Vite and TypeScript Bundler configuration.
- Use a concise arrow body when the component or function is a single expression, and a block body when it needs statements.
- Use the existing import grouping and formatting of nearby files. Do not reformat unrelated code.
- Preserve existing copyright headers when editing files. Do not remove, alter, or omit the Apache 2.0 header. See [Copyright Header](#copyright-header) for the required text.

## Tests and Storybook

- **Precedence:** [TESTING-GUIDE.md](TESTING-GUIDE.md) wins over any instruction in this guide to add, update, or require tests or variant stories. Every such instruction here is conditional on the testing approval gate in its [AI agent instructions](TESTING-GUIDE.md#instructions-for-ai-agents). If the user has not confirmed that the component is approved for testing, implement the component without new or changed tests or variant stories, keep only the `Default` story, and say in your report that testing was skipped because approval was not confirmed. Do not treat a request to implement a component from Figma as that confirmation.
- Follow [TESTING-GUIDE.md](TESTING-GUIDE.md) for unit tests, accessibility checks, and Chromatic variant stories. Generate tests and variant stories only for a component the user confirms is approved; ask the user before generating them (see its [AI agent instructions](TESTING-GUIDE.md#instructions-for-ai-agents)).
- Once the gate is satisfied, add or update focused Vitest tests for behavior changes. Use React Testing Library; prefer accessible queries such as roles and labels, and use `userEvent` for user interactions where practical. Reuse established test helpers and providers.
- Cover meaningful states and callbacks, including accessibility-relevant interaction where applicable. Avoid tests coupled to implementation details unless the component's Base UI integration requires them.
- Add or update the component's Storybook stories for user-visible states, following [STORYBOOK-GUIDE.md](STORYBOOK-GUIDE.md): a `Default` story, one story per Figma variant axis, use-case stories, and JSDoc on every story. Keep story controls aligned with the public props.

## Example: Base UI Button

Use the matching Base UI primitive as the minimal scaffold. Every component still declares and exports its own props interface; derive it from the primitive so its supported props are preserved. The scaffold adds no wrapper-owned props.

```tsx
/* ======================================================================== *
 * Copyright 2026 HCL America Inc.                                          *
 * Licensed under the Apache License, Version 2.0 (the "License");          *
 * you may not use this file except in compliance with the License.         *
 * You may obtain a copy of the License at                                  *
 *                                                                          *
 * http://www.apache.org/licenses/LICENSE-2.0                               *
 *                                                                          *
 * Unless required by applicable law or agreed to in writing, software      *
 * distributed under the License is distributed on an "AS IS" BASIS,        *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 * See the License for the specific language governing permissions and      *
 * limitations under the License.                                           *
 * ======================================================================== */

import type { ComponentProps as ReactComponentProps } from 'react';
import { Button as BaseButton } from '@base-ui/react/button';

export interface ButtonProps extends ReactComponentProps<typeof BaseButton> {}

export const Button = (props: ButtonProps) => <BaseButton {...props} />;
```

For a component with no matching Base UI primitive and no supported props, declare `export interface ComponentProps extends Record<string, never> {}` and type its component with that interface. Re-export the interface from the component barrel alongside the component.

During component scaffolding, leave `Button.shadow.scss` empty. Generate its styles only with Figma MCP from the confirmed Button design, and write the generated styles to `Button.shadow.scss`.

Once the component is implemented from Figma, each Figma property becomes a typed prop on that interface. For example, the Figma `variant` VARIANT property becomes a const object, a derived union type, and an optional prop. Styling-only props are consumed in the component and applied through the component's class names and `data-*` attributes; they are not forwarded to the primitive. The example shows one property only; implement every Figma property, or record why it is left out.

```tsx
/* ======================================================================== *
 * Copyright 2026 HCL America Inc.                                          *
 * Licensed under the Apache License, Version 2.0 (the "License");          *
 * you may not use this file except in compliance with the License.         *
 * You may obtain a copy of the License at                                  *
 *                                                                          *
 * http://www.apache.org/licenses/LICENSE-2.0                               *
 *                                                                          *
 * Unless required by applicable law or agreed to in writing, software      *
 * distributed under the License is distributed on an "AS IS" BASIS,        *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 * See the License for the specific language governing permissions and      *
 * limitations under the License.                                           *
 * ======================================================================== */

import type { ComponentProps as ReactComponentProps } from 'react';
import { Button as BaseButton } from '@base-ui/react/button';

/** Visual emphasis of a {@link Button}. Maps to the Figma `variant` property. */
export const ButtonVariant = {
  /** Filled background. Use for the primary action of a view. */
  Contained: 'contained',
  /** Stroke without a fill. Use for secondary actions. */
  Outlined: 'outlined',
  /** No fill and no stroke. Use for low-emphasis actions. */
  Text: 'text',
} as const;

/** Union of the {@link ButtonVariant} values. */
export type ButtonVariantType = typeof ButtonVariant[keyof typeof ButtonVariant];

/** Props of the {@link Button}. Extends the Base UI `Button` props, which are passed through. */
export interface ButtonProps extends ReactComponentProps<typeof BaseButton> {
  /**
   * Visual emphasis. Figma `variant`.
   * @default ButtonVariant.Contained
   */
  variant?: ButtonVariantType;
}

/**
 * Triggers an action with a single click. For icon-only actions, use IconButton.
 *
 * @example
 * ```tsx
 * <Button variant={ButtonVariant.Outlined}>Save</Button>
 * ```
 */
export const Button = ({ variant = ButtonVariant.Contained, ...props }: ButtonProps) => (
  <BaseButton
    {...props}
    className="buttonRoot"
    // React's DOM types have no `part` attribute, so it is passed through a spread.
    {...{ part: 'root' }}
    data-variant={variant}
  />
);
```

Base UI enforces button semantics: set `type="submit"` explicitly for submit buttons, and do not render links through this component.

## Code Review Checklist

Apply this checklist to newly added or modified code; do not refactor unrelated legacy code solely to satisfy it.

- [ ] Every source file begins with the Apache 2.0 copyright header ([Copyright Header](#copyright-header)).
- [ ] All design-system colors, spacing, typography, and other values in SCSS map to approved DTCG 2025.10 tokens; none are hard-coded or duplicated.
- [ ] Base UI primitives use direct imports from their public component entry points.
- [ ] Every export has TSDoc as [Code Documentation](#code-documentation) requires: component description with `@example`, a comment on every prop with `@default`, a comment on every `as const` member, and `@param`/`@returns` on functions. Inline comments explain why, not what.
- [ ] Every component declares and exports its own `<Component>Props` interface, uses it in the component signature, and re-exports it from its barrel.
- [ ] New components avoid `React.FC` and manual `React.forwardRef`; preserve existing public ref behavior when modifying a component.
- [ ] Every Figma component property is implemented as a typed prop, or its omission is recorded with a reason. Interaction states such as hover and focus are CSS, not props.
- [ ] The `<Component>.figma.ts` template uses the exact Figma property names and maps every implemented prop.
- [ ] Styles live in `<Component>.shadow.scss` with component-prefixed class names, are registered in `src/theme/boundaryStyles.ts`, with every rule inside `@layer enchanted.components { ... }`, and use no `!important`. The root element has `part="root"` ([Style Isolation](#theme-provider-boundary), [CUSTOMIZATION-GUIDE.md](CUSTOMIZATION-GUIDE.md)).
- [ ] Styling-only values are applied through SCSS classes and do not leak onto DOM elements.
- [ ] Stories follow [STORYBOOK-GUIDE.md](STORYBOOK-GUIDE.md): `Default` first, one story per variant axis, JSDoc on every story.
- [ ] Accessibility is maintained with semantic elements, Base UI interaction behavior, and appropriate `aria-*` attributes.

## Documentation and Validation

- Update user-facing documentation and the changelog for changes that warrant them, as required by `CONTRIBUTING.md`.
- Run the narrowest relevant checks, then broader checks when practical:
  - `npm run lint`
  - `npm run build`
  - `npm test` for the configured Vitest suite
- Report checks that could not be run and any remaining failures; do not claim a check passed unless it was run.