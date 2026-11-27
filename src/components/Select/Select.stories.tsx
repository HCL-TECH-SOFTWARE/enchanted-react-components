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

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select, SelectSize } from './Select';
import type { SelectOption, SelectProps } from './Select';
import { SelectItem } from './SelectItem';

/**
 * Values of an `as const` object. Storybook's docgen plugin adds `displayName` (a string) and
 * `__docgenInfo` (an object) to these exports, and `Object.values` would return both as extra values.
 */
const values = <T extends Record<string, string>>(options: T): T[keyof T][] =>
  Object.entries(options)
    .filter(([key]) => key !== 'displayName' && key !== '__docgenInfo')
    .map(([, value]) => value as T[keyof T]);

/** The Figma frame width (240px), built from a spacing token so the story hard-codes no length. */
const fieldWidth = 'calc(var(--padding-md) * 20)';

const options: SelectOption[] = [
  { value: 'item-1', label: 'Item 1' },
  { value: 'item-2', label: 'Item 2' },
  { value: 'item-3', label: 'Item 3' },
  { value: 'item-4', label: 'Item 4' },
];

/** Lays fields out in a wrapping row with space between them. */
const Row = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 'calc(var(--padding-sm) * 2)' }}>
    {children}
  </div>
);

/**
 * Paints the dark inverse canvas behind the Inverse story. In the canvas it fills the whole preview page;
 * in the docs page it only fills a box around the story, so the other stories stay on the normal page.
 * The token is the same near-black in light and dark mode, so the story reads in both.
 */
const InverseBackground = ({ fullPage, children }: { fullPage: boolean; children: ReactNode }) => {
  // No dependency list on purpose: the preview repaints `body` when the theme changes, so this reapplies after it.
  useEffect(() => {
    if (!fullPage) return undefined;
    const { body } = document;
    const previous = body.style.background;
    body.style.background = 'var(--color-background-canvas-inverse)';
    return () => {
      body.style.background = previous;
    };
  });
  return fullPage ? (
    <>{children}</>
  ) : (
    <div
      style={{
        display: 'inline-flex',
        padding: 'calc(var(--padding-sm) * 3)',
        borderRadius: 'var(--corner-radius-md)',
        background: 'var(--color-background-canvas-inverse)',
      }}
    >
      {children}
    </div>
  );
};

const meta = {
  title: 'Components/Inputs/Select',
  component: Select,
  tags: ['autodocs'],
  args: { label: 'Label', placeholder: 'Placeholder', options, style: { width: fieldWidth } },
  argTypes: {
    size: { control: 'select', options: values(SelectSize) },
    // Option lists, slots and objects are structured data, which has no useful control.
    options: { control: false },
    menu: { control: false },
    labelProps: { control: false },
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A labelled, empty select with four options. Start here: every other story changes one thing about it. */
export const Default: Story = {};

/** `medium` is the default; `small` suits dense layouts such as table cells and toolbars. Figma `size`. */
export const Sizes: Story = {
  render: (args) => (
    <Row>
      {values(SelectSize).map((size) => (
        <Select key={size} {...args} size={size} label={size} />
      ))}
    </Row>
  ),
};

/** `defaultValue` (or `value`) chooses an option, whose label then shows in the trigger. */
export const Filled: Story = { args: { defaultValue: 'item-2' } };

/** `defaultOpen` shows the popup list; the caret points up while it is open. Figma `open`. */
export const Open: Story = { args: { defaultOpen: true, defaultValue: 'item-2' } };

/** `invalid` switches to error colors, adds the warning icon and shows the `errorMessage`. Figma `invalid`. */
export const Invalid: Story = { args: { invalid: true, errorMessage: 'Error message' } };

/** `disabled` blocks interaction and dims the field and label. Figma `disabled`. */
export const Disabled: Story = { args: { disabled: true } };

/** `readOnly` shows the chosen option as plain text, without a border, fill or caret. Figma `readOnly`. */
export const ReadOnly: Story = { args: { readOnly: true, defaultValue: 'item-2' } };

/** `required` adds the asterisk after the label and marks the select required. */
export const Required: Story = { args: { required: true } };

/** Use `inverse` on a dark or colored background, where the default colors would not stay readable. Figma `inverse`. */
export const Inverse: Story = {
  args: { inverse: true, helperText: 'This is a helper text.' },
  decorators: [
    (Story, { viewMode }) => (
      <InverseBackground fullPage={viewMode === 'story'}>
        <Story />
      </InverseBackground>
    ),
  ],
};

/** Supporting text under the field, for context the label alone cannot give. Figma `helperText`. */
export const WithHelperText: Story = { args: { helperText: 'This is a helper text.' } };

/** `menu` replaces the list built from `options` with your own `SelectItem`s, for example to disable one. Figma `menu`. */
export const WithMenu: Story = {
  args: {
    menu: (
      <>
        <SelectItem value="item-1">Item 1</SelectItem>
        <SelectItem value="item-2" disabled>
          Item 2 (disabled)
        </SelectItem>
        <SelectItem value="item-3">Item 3</SelectItem>
      </>
    ),
  },
};

/** Controlled use: the parent owns `value` and updates it from `onValueChange`. */
export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>('item-1');
    return (
      <Select
        {...args}
        value={value}
        onValueChange={setValue}
        helperText={`Chosen: ${options.find((option) => option.value === value)?.label ?? 'none'}`}
      />
    );
  },
};

const states: Array<{ name: string; props: Partial<SelectProps> }> = [
  { name: 'Default', props: {} },
  { name: 'Filled', props: { defaultValue: 'item-2' } },
  { name: 'Invalid', props: { invalid: true, errorMessage: 'Error message' } },
  { name: 'Invalid filled', props: { invalid: true, errorMessage: 'Error message', defaultValue: 'item-2' } },
  { name: 'Disabled', props: { disabled: true } },
  { name: 'Disabled filled', props: { disabled: true, defaultValue: 'item-2' } },
  { name: 'Read only', props: { readOnly: true, defaultValue: 'item-2' } },
];

const columns: Array<{ name: string; props: Partial<SelectProps> }> = [
  { name: 'Medium', props: { size: SelectSize.Medium } },
  { name: 'Small', props: { size: SelectSize.Small } },
];

const Matrix = ({ inverse, args }: { inverse: boolean; args: Partial<SelectProps> }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns.length}, ${fieldWidth})`,
      gap: 'calc(var(--padding-sm) * 3) calc(var(--padding-sm) * 2)',
      alignItems: 'start',
    }}
  >
    {states.map((state) =>
      columns.map((column) => (
        <Select
          key={`${state.name}-${column.name}`}
          {...args}
          {...column.props}
          {...state.props}
          inverse={inverse}
          label={`${state.name}, ${column.name}`}
        />
      )),
    )}
  </div>
);

/**
 * Every state and size, in the default and inverse colors, for visual regression review. Not
 * documentation: learn from the stories above. The open popup, hover and focus are checked by hand.
 */
export const AllVariants: Story = {
  tags: ['visual'],
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(var(--padding-sm) * 4)' }}>
      <Matrix inverse={false} args={args} />
      <div style={{ padding: 'calc(var(--padding-sm) * 3)', background: 'var(--color-background-canvas-inverse)' }}>
        <Matrix inverse args={args} />
      </div>
    </div>
  ),
};
