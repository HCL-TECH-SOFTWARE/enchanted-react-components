# Testing Guide

Unit and component testing for the Enchanted React library built on Base UI. Package manifests and configuration (`package.json`, `vite.config.ts`, `src/__tests__/setup.ts`) are the source of truth for versions, scripts, and settings; verify them before relying on examples here. Related guides: [COMPONENT-GUIDE.md](COMPONENT-GUIDE.md), [REPO-SETUP-GUIDE.md](REPO-SETUP-GUIDE.md), [FIGMA-CODE-CONNECT-GUIDE.md](FIGMA-CODE-CONNECT-GUIDE.md).

## Instructions for AI agents

This guide is mostly used by AI agents to generate unit tests and visual (Storybook/Chromatic) tests. Follow these rules before writing any test or variant story.

### Approval gate: ask first

**Only generate tests for a component that is already approved.** Do not infer approval. [ENCHANTED.md](../ENCHANTED.md#first-release-scope) states that the component set is a proposal and scope approval is pending, and the presence of a component, a Figma link, or an existing prototype does not mean it is approved.

Before generating or substantially changing any unit test file or variant stories for a component, you MUST ask the user, and wait for the answer:

> "Is the `<Component>` component already approved for testing? (If it is not approved, I will not generate unit or visual tests for it.)"

- **Yes:** proceed with the workflow below. Note the user's confirmation in your report.
- **No, unsure, or no answer:** do not create or modify tests or variant stories for that component. Say that you stopped because approval is not confirmed, and offer to continue once it is.
- Ask once per component per task. A confirmation for one component does not extend to another, and it does not carry over to a later, unrelated task.
- If asked to generate tests for several components, ask about each one (a single message listing them is fine) and generate only for those the user confirms.
- If the user's request already states that the component is approved, you may treat that as the confirmation and say so; do not ask again.

The gate does not block these:
- Running the existing test suite or Chromatic checks and reporting results.
- Fixing a test that is failing because of a tooling or configuration problem, without changing what the test asserts.
- Scaffold-only work, which keeps only the `Default` story, as in [COMPONENT-GUIDE.md](COMPONENT-GUIDE.md#component-scope-and-scaffolding).

### Workflow once approval is confirmed

1. Read the component source, its `<Component>Props` interface and const objects, and neighboring tests and stories. Reuse their patterns. Ignore `*.figma.ts` files: they are Code Connect mappings and are not a source for tests or stories.
2. Write the unit test file as `src/__tests__/unit/components/<Component>.test.tsx` covering the minimum set in section 8, including the axe check (sections 3 and 5).
3. Write the stories required by section 10.1, following [STORYBOOK-GUIDE.md](STORYBOOK-GUIDE.md) for structure and naming. Where the two guides differ, the Storybook guide wins.
4. Run `npm run lint`, `npm run typecheck`, and `npm test`. Fix failures caused by your changes.
5. Report what you added; which checks ran and their results, including the coverage numbers for the four metrics (section 8); which prop values or variants you left uncovered and why; and which checks are still pending for a person. Chromatic review, the Accessibility panel, and the manual keyboard, screen reader, and cross-browser checks (section 11) are pending unless you or the user actually ran them. You cannot run the manual checks yourself, so end your report with a clearly labeled **Pending manual checks** list that reminds the user these are still to be done and names what to check. Do not claim visual verification, or any check you did not run.

Do not invent props, variants, expected values, or behavior that the component source does not define. If something needed for a test is unclear (for example an undocumented state), ask the user instead of guessing.

## 1. Status of this guide

| Area | Status |
|---|---|
| Vitest + jsdom + React Testing Library + user-event + jest-dom | **Current.** Recorded as approved tooling in [REPO-SETUP-GUIDE.md](REPO-SETUP-GUIDE.md) and used by the existing Button test (`src/__tests__/unit/components/Button.test.tsx`). Confirm each package is in `package.json` and `package-lock.json` before relying on it. |
| `vitest-axe` accessibility assertions | **Adopted.** Every component test file includes an axe check. Wiring steps are in section 3. Confirm `vitest-axe` is in the manifests first; if it is not, see the dependency rule in section 3. |
| Coverage with `@vitest/coverage-v8` | **Adopted.** `npm test` runs with coverage. The minimum is 80% per file (section 8) and `npm test` fails below it. Requires `@vitest/coverage-v8` in the manifests (section 3). |
| `@storybook/addon-a11y` per-story accessibility checks | **Current.** Listed as installed in [REPO-SETUP-GUIDE.md](REPO-SETUP-GUIDE.md) and approved in [ENCHANTED.md](../ENCHANTED.md). It reports violations in the Accessibility panel but does not fail CI. Rules are in section 11.1. |
| `@storybook/addon-vitest` (runs stories and `play` functions as tests) | **Planned, not installed or approved.** 10.6.3 at the time of writing; its version follows Storybook. Adopting it needs explicit approval, new dependencies, a browser download in CI, and updates to REPO-SETUP-GUIDE.md and `test.yml`. Until then `play` functions run in the Storybook UI and before each Chromatic snapshot, not in `npm test`. See section 11.1. |
| Visual regression with Storybook + Chromatic | **Current tooling, partial coverage.** Chromatic runs in CI, but existing stories are only `Default`. Section 10 defines the required variant coverage. |

Versions at the time of writing (check `package.json`): `vitest` 5.0.5, `jsdom` 30.1.3, `@testing-library/react` 16.3.3, `@testing-library/user-event` 14.6.8, `@testing-library/jest-dom` 7.0.1, `@base-ui/react` 1.9.0. `@vitest/coverage-v8` must match the `vitest` version exactly (5.0.5 at the time of writing), and `vitest-axe` was 0.1.0 (peer range `vitest >=0.16.0`). Take the pinned versions from `package.json` and `package-lock.json`; do not change them without approval.

**Known risk, accepted: `vitest-axe`.** The team knowingly accepts this risk for now (recorded in [ENCHANTED.md](../ENCHANTED.md#confirmed-decisions)); the planned next step is `@storybook/addon-vitest` (section 11.1), and the fallback if `vitest-axe` breaks first is `axe-core` with a small custom matcher. Neither is installed or approved yet. The npm registry shows 0.1.0 as the latest release, last modified 2025-01-22 (checked 2026-10-23). Its peer range (`vitest >=0.16.0`) allows Vitest 5, but compatibility with Vitest 5.0.5 is declared, not verified by a passing run recorded in this guide. The maintained alternative, `jest-axe` (11.0.0), is built for Jest, so neither is clearly better. If `vitest-axe` breaks on a Vitest upgrade, fix or replace it only with explicit approval (AGENTS.md hard rule 1); do not swap libraries on your own. Run `npm test` and confirm the axe tests pass before relying on this check.

## 2. Strategy

Test the **wrapper component's contract**, not Base UI internals. Base UI tests its own behavior; you test that the Enchanted component:

1. Renders the right roles, labels, and accessible names/descriptions.
2. Maps each Figma property to its typed prop and applies the Figma defaults (see [COMPONENT-GUIDE.md](COMPONENT-GUIDE.md#implementing-a-component-from-figma)).
3. Exposes state through the documented `data-*` attributes or classes.
4. Forwards supported props, `ref`, and `className` to the primitive.
5. Supports controlled and uncontrolled usage where the primitive does.
6. Has no automated accessibility violations (`vitest-axe`).
7. Works without `ThemeProvider`.

All tests run in jsdom, which has no layout engine. Do not assert positions or sizes; leave those to Storybook and Chromatic, where every component variant is covered by a story (section 10).

## 3. Setup

**Dependencies.** The examples need `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `vitest-axe`, and `@vitest/coverage-v8`. Check that each is in `package.json` and `package-lock.json`. If any is missing, **stop and ask the user**: [AGENTS.md](../AGENTS.md) hard rule 1 forbids adding or installing dependencies without approval, and approved additions are recorded in [ENCHANTED.md](../ENCHANTED.md). Do not run `npm install` to add them, and restore the tree with `npm ci` only.

Configuration lives in `vite.config.ts`:

```ts
test: {
  environment: 'jsdom',
  include: ['src/**/*.test.{ts,tsx}'],
  setupFiles: ['src/__tests__/setup.ts'],
  passWithNoTests: false,
  coverage: {
    provider: 'v8',
    include: ['src/**/*.{ts,tsx}'],
    exclude: [
      'src/**/*.test.{ts,tsx}',
      'src/**/__tests__/**',
      'src/**/*.stories.tsx',
      'src/**/*.figma.ts',
      'src/**/index.ts',
    ],
    reporter: ['text', 'lcov'],
    // Minimum is 80% per file (section 8); `npm test` fails below it.
    thresholds: { perFile: true, statements: 80, branches: 80, functions: 80, lines: 80 },
  },
},
```

`src/__tests__/setup.ts` registers jest-dom and axe matchers and cleans up after each test:

```ts
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, expect } from 'vitest';
import * as axeMatchers from 'vitest-axe/matchers';

expect.extend(axeMatchers);

// Vitest globals are off, so Testing Library cannot register its own cleanup.
afterEach(cleanup);
```

`toHaveNoViolations` also needs its TypeScript declaration. Add `import 'vitest-axe/extend-expect';` to `src/__tests__/setup.ts` if `npm run typecheck` does not recognize the matcher, and confirm the exact import against the installed `vitest-axe` version.

`package.json` script:

```json
"test": "vitest run --coverage"
```

- `npm test` therefore always prints a coverage summary and writes `coverage/lcov.info`. Add `coverage/` to `.gitignore`.
- To run a single file quickly without coverage, use `npx vitest run <path>`.
- Vitest globals are **off**. Import `describe`, `it`, `expect`, and `vi` from `vitest` in every test file. Do not add `globals: true` or `vitest/globals` to `tsconfig.json`.
- `tsconfig.json` includes `src`, so tests under `src/__tests__` are type-checked by `npm run typecheck`.
- CI (`.github/workflows/test.yml`) already runs `npm test`, so it picks up coverage with no workflow change. [REPO-SETUP-GUIDE.md](REPO-SETUP-GUIDE.md) already lists this tooling; update it only if the approved set changes.

### jsdom gaps (add on demand)

Positioned popups can hit jsdom gaps such as `ResizeObserver`, `matchMedia`, or `Element.prototype.scrollIntoView`. None are stubbed today. If a test fails with `ResizeObserver is not defined` (or similar), add the smallest stub for that API to `src/__tests__/setup.ts` and note why:

```ts
globalThis.ResizeObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
```

## 4. File layout and naming

```text
src/
  __tests__/
    unit/
      components/
        <Component>.test.tsx
      theme/
        ThemeProvider.test.tsx
  components/
    <Component>/
      <Component>.tsx
```

- One test file per component, `src/__tests__/unit/components/<Component>.test.tsx`, for the component in `src/components/<Component>/`. Keep tests under `src/__tests__`, not beside component source.
- One top-level `describe('<Component>')` per file. Test names state behavior ("disables the button", not "handles disabled").
- Import the component from its barrel with a relative path, as existing tests do:

```tsx
import { Button, ButtonVariant } from '../../../components/Button';
```

- Import public const objects (`ButtonVariant`, `ButtonColor`, ...) instead of repeating string literals, so tests follow the enum-like rule in [COMPONENT-GUIDE.md](COMPONENT-GUIDE.md#enum-like-values).
- The only shared test helper is `src/__tests__/axe.ts` (the configured `axe`, see section 5). Otherwise there is no test-utils module: import `render` and `screen` from `@testing-library/react` and call `userEvent.setup()` where needed. If a shared helper becomes worthwhile (for example a `ThemeProvider` wrapper), add it under `src/__tests__/` and update this guide.

## 5. Test anatomy

Based on the existing Button tests (first-release components: Button, TextField, IconButton, SelectSingle, Checkbox, Dialog; see [ENCHANTED.md](../ENCHANTED.md)):

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import {
  Button,
  ButtonColor,
  ButtonDisabled,
  ButtonSize,
  ButtonVariant,
} from '../../../components/Button';

describe('Button', () => {
  it('renders its label as a button with Figma defaults', () => {
    render(<Button label="Save" />);
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toHaveAttribute('data-variant', ButtonVariant.Contained);
    expect(button).toHaveAttribute('data-color', ButtonColor.Primary);
    expect(button).toHaveAttribute('data-size', ButtonSize.Medium);
  });

  it('calls onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button label="Save" onClick={onClick} />);
    await user.click(screen.getByRole('button', { name: 'Save' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button disabled={ButtonDisabled.True} label="Save" onClick={onClick} />);
    await user.click(screen.getByRole('button', { name: 'Save' }));
    expect(onClick).not.toHaveBeenCalled();
  });
});
```

### Accessibility

Every component test file includes an automated axe check, and specific accessibility behavior is asserted through the accessibility tree:

```tsx
import { axe } from '../../axe';

it('has no accessibility violations', async () => {
  const { container } = render(<Button label="Save" />);
  expect(await axe(container)).toHaveNoViolations();
});

it('exposes the accessible name and required state of a text field', () => {
  render(
    <>
      <label htmlFor="email">Email</label>
      <TextField id="email" required />
    </>,
  );
  expect(screen.getByLabelText('Email')).toBeRequired();
});
```

- Run axe on each meaningful state, not only the default (for example disabled, invalid, and open popup). For portaled popups, pass `document.body` instead of `container`.
- Import `axe` from `src/__tests__/axe.ts`, not from `vitest-axe`. That module configures axe with the `color-contrast` rule turned off, because jsdom has no canvas or layout: with the rule on it prints `Not implemented: HTMLCanvasElement.getContext` and checks nothing. Do not re-enable it or add other rule exclusions without a recorded reason.
- axe in jsdom cannot evaluate color contrast or layout-dependent rules. Treat a passing axe run as a baseline, not proof of accessibility; contrast and focus visibility are reviewed in Storybook and Chromatic.
- Do not silence a violation by disabling its rule. If a rule is a false positive for a specific component, disable it for that test only and explain why in a comment.

## 6. Component and Base UI patterns

### 6.1 Query by role or label, never by internals
Base UI parts render real ARIA roles. Use `getByRole` with `name`, or `getByLabelText`. Avoid class names (CSS modules hash them) and DOM nesting.

### 6.2 Figma properties and public `data-*` attributes
Each Figma property that became a prop needs a test for its default and at least one non-default value (see [FIGMA-CODE-CONNECT-GUIDE.md](FIGMA-CODE-CONNECT-GUIDE.md)). Where a component reflects a prop as a `data-*` attribute (for example `data-variant`, `data-color`, `data-selected`), that attribute is public contract for styling and may be asserted. Also test visibility properties (`showLabel={false}` removes the label) and slot props (`startIcon`, `endIcon`) render only when requested. Interaction states (hover, focus) are CSS states, not props, and are not tested here.

### 6.3 Portals and popups
Popups (SelectSingle's list, Dialog, and any future Popover, Menu, or Tooltip) render in a portal on `document.body`. Always query with `screen`, never `container`. Use `findBy*` or `waitFor` for anything that mounts or unmounts, because exit transitions can delay removal:

```tsx
await user.click(screen.getByRole('combobox', { name: 'Fruit' }));
expect(await screen.findByRole('listbox')).toBeVisible();
await user.keyboard('{Escape}');
await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
```

Confirm role names against the installed Base UI version; they come from Base UI, not from this guide.

### 6.4 Animations
Vitest does not process CSS by default, so transitions do not run in jsdom and most tests need no special handling. If a test depends on an exit animation, use `waitFor` rather than disabling it.

### 6.5 Keyboard interaction
Use `user.tab()` and `user.keyboard()`. Cover the WAI-ARIA behavior the component promises:

```tsx
await user.tab();
expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveFocus();
await user.keyboard('{ArrowDown}');
```

### 6.6 Controlled vs uncontrolled
Test both when the primitive supports both. For a controlled component, assert the callback fires and that the UI does not change until the parent updates the prop. Assert on the first callback argument; Base UI passes extra event-detail arguments whose shape depends on the installed version.

### 6.7 Ref, className, and prop forwarding
Verify the wrapper passes `ref`, `className`, `data-*`, and other supported primitive props through, per the props-interface rule in [COMPONENT-GUIDE.md](COMPONENT-GUIDE.md#typescript-and-react). Preserve existing ref behavior when modifying a component.

### 6.8 The `render` prop
Base UI primitives accept a `render` prop for polymorphism. Test it only on components that deliberately support it. Do **not** test or document rendering a link through `Button`: [COMPONENT-GUIDE.md](COMPONENT-GUIDE.md#example-base-ui-button) states that Base UI Button enforces button semantics and must not render links.

### 6.9 Forms
Test native form participation with `FormData` for components that submit values (for example TextField with a `name`):

```tsx
const { container } = render(<form><TextField name="email" defaultValue="a@b.c" /></form>);
expect(new FormData(container.querySelector('form')!).get('email')).toBe('a@b.c');
```

### 6.10 ThemeProvider
Components must work without `ThemeProvider`, so test them bare by default. Add a provider only in tests about theme behavior (`data-theme`, `dir`).

## 7. Mocking rules

- Mock only network and time (`vi.useFakeTimers()`, MSW if adopted). Never mock Base UI.
- With fake timers: `userEvent.setup({ advanceTimers: vi.advanceTimersByTime })`.
- Avoid DOM-tree snapshot tests; they break on harmless markup changes. Visual regressions are Chromatic's job.
- Do not commit focused or disabled tests (`.only`, `.skip`), as required by [COMPONENT-GUIDE.md](COMPONENT-GUIDE.md#typescript-and-react).

## 8. Conventions checklist

Per component, the minimum set is:

- [ ] Renders by role or label with an accessible name.
- [ ] Figma defaults and each mapped property (default plus a non-default value).
- [ ] Disabled and error states, including `aria-*` attributes.
- [ ] `axe` reports no violations (default state plus other meaningful states).
- [ ] Keyboard interaction the component promises.
- [ ] Controlled and uncontrolled usage, where supported.
- [ ] `ref` / `className` / prop forwarding.
- [ ] Open/close behavior, queried through `screen` (popup components only).
- [ ] Works without `ThemeProvider`.
- [ ] The Accessibility panel shows no violations for each new or changed story in light and dark (section 11.1).
- [ ] Stories follow [STORYBOOK-GUIDE.md](STORYBOOK-GUIDE.md) and cover every VARIANT value, plus use-case stories for slots, content extremes, and behavior, for Chromatic (section 10.1).

General rules:

- Prefer `userEvent` over `fireEvent`, and `findBy*` over fixed sleeps. `await` every `user.*` call.
- Use the same `<Component>Props` types and const objects the public API exports; do not cast around them.
- **Minimum coverage: 80% per component** for statements, branches, functions, and lines. It applies to each component's own source files under `src/components/<Component>/` (excluding tests, stories, `*.figma.ts`, and `index.ts` barrels, as `coverage.exclude` in `vite.config.ts` defines, section 3), not to the repository as a whole. Read the per-file rows of the report from `npm test`, add tests until the component meets all four numbers, and say in your report what they were. Do not report the component as done otherwise.
- **The approval gate wins over coverage.** Components the user has not confirmed for testing have no required coverage yet; do not write tests for them to raise any number.
- **Enforcement.** `vite.config.ts` sets `coverage.thresholds` with `perFile: true` and 80% for statements, branches, functions, and lines, so `npm test` and CI fail when any file that `coverage.include` covers (everything under `src/` except the excluded patterns) is below it. This includes shared infrastructure such as `src/theme/ThemeProvider.tsx`, which has its own test in `src/__tests__/unit/theme/`. **Consequence for scaffolds:** Vitest reports every included file, tested or not, so a new component scaffold with no tests fails the threshold. Add the component together with its tests after approval (the approval gate above still applies); do not add tests only to raise a number, and do not exclude files to pass. If a scaffold must land before approval, agree with the team first on how to handle it (for example a temporary, reviewed `coverage.exclude` entry).
- Coverage is a measure of what ran, not of what was verified. Do not write tests just to raise the number, and do not exclude code from coverage to meet the minimum. If code cannot reasonably be tested in jsdom (for example layout) and the minimum is not met, say so in your report and ask the user how to proceed, instead of adding a weak test or lowering the bar.
- Coverage from unit tests does not include Storybook or Chromatic.
- CI runs `npm test` (with coverage) in `.github/workflows/test.yml` on pull requests and manual dispatch.
- Run `npm run lint`, `npm run typecheck`, and `npm test` before reporting a change done, and report any check you could not run.

## 9. Common failures

| Symptom | Likely cause | Verify | Fix |
|---|---|---|---|
| `ResizeObserver is not defined` | jsdom gap | Stack trace names a positioner or popup | Add a minimal stub to `src/__tests__/setup.ts` (section 3) |
| Popup content not found | Queried via `container` | Element exists in `document.body` | Use `screen` |
| `act(...)` warnings | State updates after the test ended | Missing `await` on `user.*` | `await` all user-event calls; use `findBy*` |
| Popup "still in document" after close | Exit transition pending | Passes with `waitFor` | Use `waitFor` or `waitForElementToBeRemoved` |
| `toBeInTheDocument is not a function` | jest-dom not registered | `setupFiles` missing or wrong path | Check `src/__tests__/setup.ts` import and `vite.config.ts` |
| `toHaveNoViolations is not a function` | axe matchers not registered | `expect.extend(axeMatchers)` missing from setup | Add it to `src/__tests__/setup.ts` (section 3) |
| TypeScript: `toHaveNoViolations` does not exist on `Assertion` | Matcher types not loaded | `npm run typecheck` error | Add the `vitest-axe/extend-expect` import (section 3) |
| `Failed to resolve @vitest/coverage-v8` or version mismatch error | Coverage package not installed or not the same version as `vitest` | Compare both versions in `package.json` | Pin `@vitest/coverage-v8` to the exact `vitest` version |
| `describe is not defined` | Vitest globals are off | Missing import | `import { describe, it, expect } from 'vitest'` |
| Duplicate DOM between tests | Cleanup not running | `afterEach(cleanup)` missing from setup | Restore it in `src/__tests__/setup.ts` |
| Position or size assertions fail | jsdom has no layout; `getBoundingClientRect` returns zeros | Values are all 0 | Do not assert layout in unit tests; use Storybook/Chromatic |

## 10. Visual testing with Chromatic

Unit tests cannot see rendering (jsdom has no layout or CSS). Visual regression is covered by Storybook stories published to Chromatic, which snapshots stories (every story on a full run, or only the affected ones if TurboSnap is enabled, see 10.5) and flags pixel differences for review. In this repo:

- `npm run chromatic` builds Storybook and publishes it (`chromatic` and `storybook` packages, see `package.json`).
- `.github/workflows/chromatic.yml` runs on pull requests and manual dispatch, and aborts with an error when the `CHROMATIC_ENCHANTED_PROJECT_TOKEN` secret is not set. Never commit the token.
- `.storybook/preview.tsx` wraps every story in `ThemeProvider` and exposes Theme (light/dark) and Direction (LTR/RTL) globals, defaulting to light and LTR.

A story is a snapshot, so **a variant without a story is not visually tested.** How to write, name, and structure stories is defined in [STORYBOOK-GUIDE.md](STORYBOOK-GUIDE.md); this section covers only what must be visually tested and how Chromatic reviews it.

### 10.1 Coverage rule: every variant of every component

[STORYBOOK-GUIDE.md](STORYBOOK-GUIDE.md) wins wherever it and this guide differ on story structure. Every component must have stories covering all of the following, in the order and with the names that guide defines. Use the component's `<Component>Props` interface and exported const objects (the VARIANT properties that became props) as the checklist; `*.figma.ts` files are not a source for tests.

| Coverage | Story type ([STORYBOOK-GUIDE.md](STORYBOOK-GUIDE.md#required-stories)) | What to include |
|---|---|---|
| Default | `Default` | Only required props. |
| Every value of every enum-like prop | One axis story per VARIANT prop (`Variants`, `Colors`, `Sizes`) | Every value of the exported const object side by side, one axis per story. Never render two axes in one story. |
| Boolean, visibility, and slot props | Use-case stories named for intent (`WithStartIcon`, `Selected`, `Disabled`) | Only where the story shows something the axis stories do not. |
| Content extremes | Use-case stories | Long text that wraps or truncates, empty/no-content, and long option lists, where the component's behavior or layout depends on them. |
| Combinations of axes | Optional `AllVariants` (tag `visual`, last) | The only story that may combine axes. Skip it for components with only a few variants. |
| Interaction states | No story | Hover, focus, and pressed are CSS states, not props, so they get no story; Chromatic review covers them (see 10.2). |
| Themes and directions | Every story | Each story must render without errors in light, dark, LTR, and RTL (see 10.3). |

Record which variants were intentionally left uncovered and why.

### 10.2 Interaction states

Hover, focus, and pressed are CSS states, not props. Following [STORYBOOK-GUIDE.md](STORYBOOK-GUIDE.md#axis-stories), they get no story of their own and are checked in Chromatic review. Behavior that a user performs (selecting, typing, opening a popup, keyboard use) belongs in a use-case story with a `play` function that asserts with accessible queries. Chromatic captures that story after `play` finishes, so keep it deterministic and wait for the state you need before it ends.

A pseudo-states addon that forces `:hover`, `:focus-visible`, and `:active` is not installed. Adding a Storybook addon needs explicit approval and an update to [REPO-SETUP-GUIDE.md](REPO-SETUP-GUIDE.md).

Verify the exact `play` and Chromatic behavior against the Storybook and Chromatic docs for the installed versions before relying on it.

### 10.3 Themes and directions

Per [STORYBOOK-GUIDE.md](STORYBOOK-GUIDE.md), every story must render without errors in light, dark, LTR, and RTL, and stories never set `data-theme` or `dir` themselves; the Theme and Direction toolbars do that. Check all four combinations for every story with those toolbars before opening a pull request.

Chromatic can also snapshot a story in several of these combinations through **modes**, which apply Storybook globals (`theme`, `direction`) per snapshot. Each additional mode multiplies the snapshot count, so decide deliberately which stories get them:

- Apply all four combinations (light/LTR, light/RTL, dark/LTR, dark/RTL) to the `AllVariants` story, when it exists, and to use-case stories that exercise adornments, icons, or text wrapping, since those are what break in RTL and dark mode.
- Leave simple state stories (for example `Disabled`) in the default snapshot mode unless they have theme-specific styling. This limits what Chromatic snapshots, not what must render correctly.
- Define the modes once (for example in `.storybook/modes.ts`) and reference them from `parameters.chromatic.modes`. Modes are not configured in the repo today; add them as a separate, reviewed change, and confirm the configuration shape against the Chromatic documentation for the installed version.

### 10.4 Stability and cost controls

- Chromatic bills per snapshot (stories × modes). Cover all variants, but do not duplicate near-identical stories or add modes to stories that do not need them.
- Exclude a story from snapshots only with a reason in a comment, using `parameters: { chromatic: { disableSnapshot: true } }` (for example a controls-only playground).
- Remove flakiness at the source: fixed data, no animations running at capture time (Chromatic can pause CSS animations; confirm current options in its docs), and fonts and images that load deterministically.
- The `chromatic` script does not use `--exit-zero-on-changes` (confirm in `package.json`), and `.github/workflows/chromatic.yml` does not call it: it uses `chromaui/action@v18`, which does not set `exitZeroOnChanges` either. Chromatic's default is to exit non-zero when it finds visual changes, so a changed snapshot can fail the CI job until a reviewer accepts or rejects it in Chromatic; confirm the exact exit behavior against the Chromatic documentation for the installed version. Do not accept a diff you cannot explain.

### 10.5 TurboSnap

TurboSnap (`chromatic --only-changed`) is a Chromatic option that snapshots only the stories the changed files can affect and reuses the baseline for the rest, which can cut snapshot cost. It uses git history and the dependency data of the Storybook build.

- **Status: enabled for pull requests only.** `.github/workflows/chromatic.yml` passes `onlyChanged: true` and `externals: 'tokens/**'` to `chromaui/action@v18`. `.github/workflows/chromatic-baseline.yaml` does not use TurboSnap, so every push to `main` snapshots all stories. Both workflows check out the full git history (`fetch-depth: 0`). The `chromatic` script in `package.json` is still plain `chromatic`, so a local `npm run chromatic` runs without `--only-changed`. Changing the CI options is a team decision; do not change them as part of an unrelated task.
- **Measure before relying on it.** Compare the snapshot count with a full run to see what it saves. For a small library the saving may be small.
- **Limits to know** (confirm each against the Chromatic documentation):
  - TurboSnap only sees files the Storybook bundle imports. `tokens/*.tokens.json` is read by `npm run tokens:build` and never imported, so a token change would not re-snapshot anything. The workflows pass the token sources as externals (`tokens/**`) so a token change triggers a full run. `scripts/build-tokens.mjs` is not imported either; add it as a second external if a generator change should also trigger a full run.
  - A change to dependencies (`package.json`, the lockfile) or to the Storybook configuration re-snapshots everything.
  - It needs the full git history. A shallow clone or a rebased branch can break the baseline; Chromatic has flags for the rebase case.
  - The baseline workflow runs the full set (without the flag) on every push to `main`, so baselines stay complete. It uses `autoAcceptChanges`, so the full run updates the baseline without review.
- If TurboSnap is enabled, "no changes reported" means no affected story changed, not that every story was re-checked. Do not report a component visually verified from a TurboSnap run alone unless its stories were among those captured.

### 10.6 Review workflow

1. Add or update the component's stories in the same change as the component, per [COMPONENT-GUIDE.md](COMPONENT-GUIDE.md#tests-and-storybook). Open the Accessibility panel for each story in light and dark (section 11.1).
2. Run `npm run storybook` and check every story, in light/dark and LTR/RTL, before opening a pull request.
3. Open the pull request. The Chromatic workflow publishes the build and reports changed stories (it skips with a log message if the token secret is unavailable, which means the visual check did not run).
4. A reviewer examines each changed snapshot in Chromatic and accepts only intended changes. Treat an unexpected diff as a bug.
5. Do not report a component visually verified unless the Chromatic build ran and its changes were reviewed.

## 11. Browser and accessibility checks

[WORKLOAD.md](../WORKLOAD.md) requires browser-matrix checks and accessibility checks against an agreed WCAG target. Browser compatibility is checked with Chromatic plus manual testing (section 11.2). Both decisions are recorded in [ENCHANTED.md](../ENCHANTED.md#confirmed-decisions); that file is the source of truth, so re-read it before relying on this table.

| Decision | Status |
|---|---|
| WCAG target | **WCAG 2.2 Level AA** |
| Supported browsers | **The latest stable version of each of Chrome, Edge, Firefox, and Safari**, checked with Chromatic and manual local testing. |
| Screen reader and browser pairs for manual checks | **VoiceOver + Safari (macOS)** and **NVDA + Chrome (Windows)** |

Do not claim support for any other browser, or any other WCAG version or level.

### 11.1 Accessibility checks, from cheapest to most manual

| Check | Where | What it covers | Limits |
|---|---|---|---|
| `vitest-axe` assertion | Unit test (sections 3 and 5) | Automated rules on the rendered DOM, in each meaningful state. | jsdom cannot evaluate color contrast or layout-dependent rules. |
| Storybook accessibility checks | `@storybook/addon-a11y`, per story, in `npm run storybook` | axe-core in the browser with real styles, so it can report color contrast, in both light and dark. | Automated rules only; a pass is not proof of conformance. It reports but does not fail CI (see below). |
| Keyboard check | Manual, in Storybook | Tab order, visible focus, and the WAI-ARIA keys the component promises. | Not automated; note what you checked. |
| Screen reader check | Manual | Accessible names, roles, and state announcements. | Use VoiceOver + Safari on macOS and NVDA + Chrome on Windows. State which pair you used and its versions; if you could not run one (for example no Windows machine), say so. |

Automated checks find only part of the possible issues. Do not report a component as meeting WCAG 2.2 AA from automated results alone. Report each violation as resolved or as explicitly accepted by a named reviewer, as WORKLOAD.md requires.

**Accessibility panel rules:**

- Open the panel for every story you add or change, in light and dark, and fix each violation in the component. A story's panel must show no violations.
- Do not silence a rule to make a story pass. If a rule is a false positive for one story, disable it for that story only through `parameters.a11y` and explain why in a comment.
- A clean panel is a baseline. Keyboard use, focus order, and screen-reader names still need review.
- `@storybook/addon-vitest` would run stories, including `play` functions, as Vitest tests in a real browser, and with `parameters.a11y.test: 'error'` could fail on accessibility violations. It is **planned, not installed**: it needs new dependencies, a browser download in CI, and changes to REPO-SETUP-GUIDE.md and `test.yml`, so do not add it without explicit approval. Until then `play` functions run in the Storybook UI and before each Chromatic snapshot, not in `npm test`.

**Screen reader coverage:** only these two pairs are required. A pass in one pair says nothing about the other, and the Edge and Firefox browsers get no screen reader check. Do not claim screen reader support for any other pair (for example JAWS, TalkBack, or VoiceOver on iOS).

### 11.2 Cross-browser checks

Browser compatibility is checked with Chromatic, as [WORKLOAD.md](../WORKLOAD.md) states, plus manual testing on a local machine for what snapshots cannot show.

- The supported browsers are the latest stable version of each of Chrome, Edge, Firefox, and Safari. Do not claim support for any other browser or an older version.
- **Chromatic (visual):** which browsers Chromatic snapshots is set in its project settings or configuration, not in this repository today. Confirm in the Chromatic documentation for the installed version that it covers all four browsers, how to enable each, and how the latest stable version is chosen, then record the configuration in [REPO-SETUP-GUIDE.md](REPO-SETUP-GUIDE.md). Each added browser multiplies snapshot cost (see 10.4), and TurboSnap (10.5) limits which stories are captured. Until a browser is configured, do not report it as covered by Chromatic.
- **Manual (local):** Chromatic snapshots do not exercise keyboard use, focus behavior, screen readers, or real input. Run `npm run storybook`, open the component in each browser you are claiming, and go through the stories in light, dark, LTR, and RTL, including the accessibility panel. Record the browser, its version, and the operating system. Safari is available only on Apple platforms, so a tester without one must say Safari was not checked locally.
- Report only the browsers and versions that were actually checked, and say whether each was checked in Chromatic, manually, or both. Do not report the full matrix as verified unless every browser in it was.
- jsdom unit tests do not represent any real browser. Do not use them to claim browser support.

### 11.3 Reporting

State which of these checks ran: axe in unit tests, the Storybook accessibility panel, manual keyboard, screen reader, and cross-browser checks, and the Chromatic build, and in which browser and version. For any check that did not run, say so. Do not claim cross-browser or WCAG 2.2 AA verification that was not performed.

**For AI agents:** you cannot open the Accessibility panel in a real browser, use a screen reader, or test in Safari, Edge, or Firefox. Write the stories and tests, then end your report with a **Pending manual checks** list that reminds the user these checks are still to be done, naming the components, stories, browsers, and screen reader pairs to check. Never state that they passed, and do not omit the reminder when everything else passed.

## Sources

- [Vitest documentation](https://vitest.dev/)
- [Testing Library: React](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library: user-event](https://testing-library.com/docs/user-event/intro)
- [jest-dom](https://github.com/testing-library/jest-dom)
- [vitest-axe](https://github.com/chaance/vitest-axe)
- [Vitest: Coverage](https://vitest.dev/guide/coverage)
- [Chromatic documentation](https://www.chromatic.com/docs/)
- [Storybook: Interaction tests (play functions)](https://storybook.js.org/docs/writing-tests/interaction-testing)
- [Base UI documentation](https://base-ui.com/)
