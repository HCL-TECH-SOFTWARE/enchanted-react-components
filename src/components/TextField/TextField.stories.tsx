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

import { useState } from 'react';
import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchIcon from '@hcl-software/enchanted-icons-react/carbon/es/search';
import { TextField, TextFieldSize } from './TextField';
import type { TextFieldProps } from './TextField';

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

/** Lays fields out in a wrapping row with space between them. */
const Row = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 'calc(var(--padding-sm) * 2)' }}>
    {children}
  </div>
);

const meta = {
  title: 'Components/Inputs/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: { label: 'Label', placeholder: 'Placeholder', style: { width: fieldWidth } },
  argTypes: {
    size: { control: 'select', options: values(TextFieldSize) },
    // A ref is an object or function, so a control would pass a plain value as the ref and break the story.
    ref: { control: false },
    // These only apply to a textarea, so their controls appear once `multiline` is on.
    showDragHandle: { if: { arg: 'multiline' } },
    rows: { if: { arg: 'multiline' } },
    // Slots are ReactNode props, which have no useful control.
    endAdornment: { control: false },
    contentTop: { control: false },
    contentBottom: { control: false },
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A labelled, empty single-line field. Start here: every other story changes one thing about it. */
export const Default: Story = {};

/** `medium` is the default; `small` suits dense layouts such as table cells and toolbars. Figma `size`. */
export const Sizes: Story = {
  render: (args) => (
    <Row>
      {values(TextFieldSize).map((size) => (
        <TextField key={size} {...args} size={size} label={size} />
      ))}
    </Row>
  ),
};

/** `multiline` renders a textarea for longer text; it grows as the user types. Figma `multiline`. */
export const Multiline: Story = {
  render: (args) => (
    <Row>
      <TextField {...args} label="Single line" multiline={false} />
      <TextField {...args} label="Multiline" multiline defaultValue={'A longer text\nthat spans\nseveral lines.'} />
    </Row>
  ),
};

/**
 * `showClearIcon` shows an × button while the field is focused and has a value; clicking it empties the field and
 * keeps focus there. The field starts focused with a value so the button is visible. Clicking in the Controls panel
 * moves focus out of the field and hides the button, so click back into the field after changing a control.
 * `clearLabel` is the button's accessible name, not visible text. Figma `showClearIcon`.
 */
export const WithClearButton: Story = { args: { defaultValue: 'Input text', autoFocus: true } };

/** `defaultValue` (or `value`) fills the field. Hover and focus the field to see its states, and the clear button while focused. */
export const Filled: Story = { args: { defaultValue: 'Input text' } };

/** `invalid` switches to error colors, adds the warning icon and shows the `errorMessage`. Figma `invalid`. */
export const Invalid: Story = { args: { invalid: true, errorMessage: 'Error message' } };

/** `disabled` blocks interaction and dims the field, label and helper text. Figma `disabled`. */
export const Disabled: Story = { args: { disabled: true } };

/** `readOnly` shows a value the user can select but not change, without a border or fill. Figma `readOnly`. */
export const ReadOnly: Story = { args: { readOnly: true, defaultValue: 'Input text' } };

/** `required` adds the asterisk after the label and marks the input required. */
export const Required: Story = { args: { required: true } };

/** Supporting text under the field, for context the label alone cannot give. Figma `helperText`. */
export const WithHelperText: Story = { args: { helperText: 'This is a helper text.' } };

/** A short unit after the value, such as `px` or `kg`. Figma `unitLabel`. */
export const WithUnitLabel: Story = { args: { unitLabel: 'px', defaultValue: '16' } };

/** `endAdornment` puts a control or icon at the end of the field, such as a search or visibility toggle. Figma `endAdornment`. */
export const WithEndAdornment: Story = { args: { endAdornment: <SearchIcon aria-hidden /> } };

/** `contentTop` adds content above the input row, inside the border, such as selected tags. Figma `contentTop`. */
export const WithContentTop: Story = { args: { multiline: true, contentTop: <span>Content above</span> } };

/** `contentBottom` adds content below the input row, inside the border, such as a character count. Figma `contentBottom`. */
export const WithContentBottom: Story = { args: { multiline: true, contentBottom: <span>Content below</span> } };

/** `showDragHandle` lets the user resize a multiline field vertically by dragging its corner. Figma `showDragHandle`. */
export const WithDragHandle: Story = { args: { multiline: true, showDragHandle: true } };

/** Controlled use: the parent owns `value` and updates it from `onValueChange`. */
export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState('Input text');
    return <TextField {...args} value={value} onValueChange={setValue} helperText={`${value.length} characters`} />;
  },
};

const states: Array<{ name: string; props: Partial<TextFieldProps> }> = [
  { name: 'Default', props: {} },
  { name: 'Filled', props: { defaultValue: 'Input text' } },
  { name: 'Invalid', props: { invalid: true, errorMessage: 'Error message' } },
  { name: 'Invalid filled', props: { invalid: true, errorMessage: 'Error message', defaultValue: 'Input text' } },
  { name: 'Disabled', props: { disabled: true } },
  { name: 'Disabled filled', props: { disabled: true, defaultValue: 'Input text' } },
  { name: 'Read only', props: { readOnly: true, defaultValue: 'Input text' } },
];

const columns: Array<{ name: string; props: Partial<TextFieldProps> }> = [
  { name: 'Medium', props: { size: TextFieldSize.Medium } },
  { name: 'Small', props: { size: TextFieldSize.Small } },
  { name: 'Medium multiline', props: { size: TextFieldSize.Medium, multiline: true } },
  { name: 'Small multiline', props: { size: TextFieldSize.Small, multiline: true } },
];

const Matrix = ({ inverse, args }: { inverse: boolean; args: Partial<TextFieldProps> }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns.length}, ${fieldWidth})`,
      gap: 'calc(var(--padding-sm) * 3) calc(var(--padding-sm) * 2)',
    }}
  >
    {states.map((state) =>
      columns.map((column) => (
        <TextField
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
 * Every state, size and line mode, in the default and inverse colors, for visual regression review. Not
 * documentation: learn from the stories above. Hover and focus are checked by hand with the pointer and keyboard.
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
