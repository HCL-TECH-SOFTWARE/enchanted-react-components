# Storybook Guide

Stories are the primary documentation of the component library for people and for AI. A story shows one concept, explains why it exists, and runs as a test. This guide defines how stories are organized so an AI can learn what a component offers and use the library to build new UIs.

Storybook's MCP support (a preview feature for React) builds a manifest from the stories. For each component it exposes the props, the first three stories in full, and only an index of the remaining stories. Write every story file with that in mind: the first stories carry the most information, names are predictable, and every prop and story explains itself. [@storybook/addon-mcp](https://storybook.js.org/docs/ai/mcp/overview) is a new dependency and needs explicit approval before it is added; the structure below is useful without it.

## Principles

1. **One concept per story.** A story answers one question, such as "what does the default look like?" or "what are all the colors?".
2. **Explain the why.** Every story has a one or two sentence JSDoc comment on the exported story saying when to use it, not only what it shows. Reuse the guidance from the Figma component description.
3. **Variation by axis, not by combination.** Never create a story per combination of props. Create one story per axis of variation, which renders every value of that axis.
4. **Predictable names.** The same story names appear in every component, so an AI can find them without searching.
5. **Args first.** Prefer `args` over a custom `render`, so controls, docs, and the manifest show real props. Use `render` only for matrices and compositions.
6. **Stories are tests.** A story must render without errors in light and dark themes, in LTR and RTL, and with each shadow root type (none, open, closed). Add a `play` function for any story that demonstrates behavior.

## Story File Layout

One `<Component>.stories.tsx` file next to the component, with a default export for the metadata and named exports for the stories.

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
import { Button, ButtonColor, ButtonSize, ButtonVariant } from './Button';

const meta = {
  title: 'Components/Inputs/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Button' },
  argTypes: {
    variant: { control: 'select', options: Object.values(ButtonVariant) },
    color: { control: 'select', options: Object.values(ButtonColor) },
    size: { control: 'select', options: Object.values(ButtonSize) },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The primary action in a view. Start here: every other story changes one thing about it. */
export const Default: Story = {};

/** `contained` for the primary action, `outlined` for secondary actions, `text` for low emphasis. */
export const Variants: Story = {
  render: (args) => (
    <>
      {Object.values(ButtonVariant).map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </>
  ),
};
```

The example shows the target structure. Props such as `variant` exist once the component is implemented from Figma; see [COMPONENT-GUIDE.md](COMPONENT-GUIDE.md).

### Titles

- Use `Components/<Group>/<Component>`. `<Group>` is the name of the Figma page that holds the component (for example `Inputs`, `Data display`, `Navigation`), so design and code share one structure.
- Cross-component stories use `Patterns/<Name>`. MDX documentation uses `Guides/<Name>`.

### Metadata

- Always set `component` and `tags: ['autodocs']`.
- Put prop descriptions, defaults, and "when to use" guidance in **JSDoc on the component and on its props interface** (the required content is in [COMPONENT-GUIDE.md](COMPONENT-GUIDE.md#code-documentation)). This is the single source of truth. Do not repeat descriptions in `argTypes`.
- Use `argTypes` only for what inference cannot provide: `control` types and `options`. Derive options from the exported const objects, as in the example. Never copy value lists into stories.
- Set shared `args` (such as `children`) in the metadata so each story only states what it changes.

## Required Stories

Keep this order. Storybook's manifest shows the first three stories in full, so the most useful ones come first.

| Order | Story | When it is required | Purpose |
| --- | --- | --- | --- |
| 1 | `Default` | Always | The smallest, most common use. Contains no non-default props unless the component requires them. |
| 2 | One story per axis | One for every VARIANT property of the Figma component that is a prop | Renders every value of one axis side by side. Named after the axis, such as `Variants`, `Colors`, `Sizes`. |
| 3 | Use-case stories | One for each distinct use or behavior | Named for the intent: `WithIcons`, `WithHelperText`, `Selected`, `Disabled`, `InverseOnDark`, `Controlled`. |
| Last | `AllVariants` | Optional | A matrix of every combination for visual regression. See below. |

### Axis stories

- One story per axis. Do not render two axes in one story.
- Render the values from the exported const object, so a new value appears automatically.
- Use the Figma property name for the story name when it reads well (`Sizes` for `size`).
- Interaction states such as hover and focus are CSS, not props, so they get no axis story. The visual review covers them.

### Use-case stories

- Name the intent, not the prop: `WithStartIcon`, not `StartIconTrue`.
- Include the story only if it shows something the axis stories do not, such as slots, content, or behavior.
- Add a `play` function for behavior (selection, typing, opening, keyboard use), and assert with accessible queries.

### The matrix story

- `AllVariants` exists for visual regression review in Chromatic. It is not documentation: it has no explanation per variant and is too large to learn from.
- Give it the tag `visual` so tooling can filter it, and place it last.
- Skip it for components with only a few variants. The axis stories already cover them.

## Writing Good Descriptions

- Component JSDoc: one sentence on what it is, one on when to use it, and a pointer to the alternative ("For icon-only actions, use IconButton").
- Prop JSDoc: what it does, the allowed values for non-trivial props, and the default. State which Figma property it maps to when the name differs.
- Story JSDoc: when to use the story's variation. Do not describe the code.
- Do not leave a story without a JSDoc comment. An undocumented story is invisible to an AI that reads the manifest.

## Patterns and Guides

Per-component stories do not teach how to build a screen. Add:

- **`Patterns/` stories** for realistic compositions, such as a form built from TextField and Buttons, or a dialog with its actions. They use only exported components and show correct spacing, order, and accessibility.
- **MDX guides** under `Guides/`:
  - Getting started: the import path, `ThemeProvider`, the token styles, and the light, dark, and RTL setup.
  - Choosing a component: a decision table (for example Button vs IconButton) with do and don't rules.
  - Accessibility: labelling, keyboard use, and focus rules shared across components.
  - Theming and tokens: how components consume the CSS custom properties.
- Give each MDX page a summary in its `Meta`, so it is included in the manifest.

## Theming and Setup

- `.storybook/preview.tsx` wraps every story in `ThemeProvider` and exposes the Theme, Direction, and Shadow root toolbars. Do not wrap a story in `ThemeProvider` again, and do not set `data-theme` or `dir` in a story. The one exception is an `Overrides` story, which nests a `ThemeProvider` per case so each case has its own host element for `::part(root)` and token overrides (see [CUSTOMIZATION-GUIDE.md](CUSTOMIZATION-GUIDE.md)).
- Stories render inside the `ThemeProvider` shadow-root style boundary (`shadowRootType` defaults to `ShadowRootType.Open`). Controls such as forms, labels, and portals behave as the [known limitations](COMPONENT-GUIDE.md#theme-provider-boundary) describe.
- **Shadow root toolbar.** `.storybook/preview.tsx` defines a global `shadowRootType` toolbar with the values `none`, `open`, and `closed`, defaulting to `open`. Import the `ShadowRootType` `as const` object from the provider and pass the global straight to `ThemeProvider` as `shadowRootType`; do not define a second copy of the values. Use it to compare the modes of the [style boundary](COMPONENT-GUIDE.md#theme-provider-boundary): `open` and `closed` render the story inside a shadow root, `none` adds the same styles to the document so page CSS can reach the components. Expect the story to remount when the type changes, because the provider renders its children in a different place.
- Do not read the Shadow root global in a story or set `shadowRootType` on a nested `ThemeProvider` to pick a type. The `Overrides` story is the exception: its cases each set `shadowRootType` explicitly, because it exists to compare modes.
- Stories must not hard-code colors, spacing, or typography. Use the component's own props and the token custom properties.
- Do not import component internals. A story imports only what a consumer would import from the public entry point, plus the component's own files.

## Review Checklist

- [ ] The story file begins with the Apache 2.0 copyright header ([COMPONENT-GUIDE.md](COMPONENT-GUIDE.md#copyright-header)).
- [ ] A `Default` story is first, and every story has a JSDoc comment that says when to use it.
- [ ] Each VARIANT property of the Figma component has its own axis story that renders all its values.
- [ ] No story renders a combination of axes except the optional `AllVariants` matrix.
- [ ] Story names follow the vocabulary in this guide and describe intent.
- [ ] Prop descriptions live in JSDoc, and `argTypes` only add `control` and `options` from the exported const objects.
- [ ] Behavior stories have a `play` function with accessible queries.
- [ ] The title follows `Components/<Group>/<Component>`, with the Figma page as the group.
- [ ] The `.figma.ts` template and the stories use the same prop names and values.
- [ ] The story file lints, typechecks, and renders in light, dark, LTR, and RTL.
