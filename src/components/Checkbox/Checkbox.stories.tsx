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
import { expect, userEvent, within } from 'storybook/test';
import { useState } from 'react';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Inputs/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { label: 'Label' },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>{children}</div>
);

/** A single labelled option the user can switch on or off. Start here: every other story changes one thing about it. */
export const Default: Story = {};

/** `checked` on and off. Use `defaultChecked` for an uncontrolled starting value. Figma `checked`. */
export const Checked: Story = {
  render: (args) => (
    <Row>
      <Checkbox {...args} label="Unchecked" checked={false} />
      <Checkbox {...args} label="Checked" checked />
    </Row>
  ),
};

/** `indeterminate` marks a parent whose children are partly selected. Figma `indeterminate`. */
export const Indeterminate: Story = {
  render: (args) => (
    <Row>
      <Checkbox {...args} label="Not indeterminate" indeterminate={false} />
      <Checkbox {...args} label="Indeterminate" indeterminate />
    </Row>
  ),
};

/** `invalid` switches to error colors and shows the `errorMessage`, in unchecked, checked, and indeterminate states. Figma `invalid`. */
export const Invalid: Story = {
  args: { invalid: true, errorMessage: 'Error message' },
  render: (args) => (
    <Row>
      <Checkbox {...args} label="Unchecked" checked={false} />
      <Checkbox {...args} label="Checked" checked />
      <Checkbox {...args} label="Indeterminate" indeterminate />
    </Row>
  ),
};

/** `disabled` blocks interaction and dims the control and label, in each selection state. Figma `disabled`. */
export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <Row>
      <Checkbox {...args} label="Unchecked" checked={false} />
      <Checkbox {...args} label="Checked" checked />
      <Checkbox {...args} label="Indeterminate" indeterminate />
    </Row>
  ),
};

/** `disablePadding` removes the outer 6px padding for dense layouts such as table cells. Figma `disablePadding`. */
export const DisablePadding: Story = {
  render: (args) => (
    <Row>
      <Checkbox {...args} label="With padding" disablePadding={false} />
      <Checkbox {...args} label="Without padding" disablePadding />
    </Row>
  ),
};

/** Supporting text under the label, for context the label alone cannot give. Figma `helperText` and `showHelperText`. */
export const WithHelperText: Story = {
  args: { helperText: 'Helper text' },
};

/** Error text under the label while `invalid`; `showErrorMessage={false}` hides it. Figma `errorMessage` and `showErrorMessage`. */
export const WithErrorMessage: Story = {
  args: { invalid: true, errorMessage: 'Error message' },
};

/** `required` adds the asterisk after the label and marks the input required. Figma `required`. */
export const Required: Story = {
  args: { required: true },
};

/** `showLabel={false}` hides the text; give the control an `aria-label` so it keeps an accessible name. Figma `showLabel`. */
export const WithoutLabel: Story = {
  args: { showLabel: false, 'aria-label': 'Label' },
};

/** Keyboard focus shows the focus ring (Tab to reach it). The ring turns red while `invalid`. */
export const Focused: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.tab();
    await expect(within(canvasElement).getByRole('checkbox')).toHaveFocus();
  },
};

/** Controlled use: the parent owns `checked` and updates it from `onCheckedChange`. */
export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return <Checkbox {...args} checked={checked} onCheckedChange={setChecked} />;
  },
  play: async ({ canvasElement }) => {
    const checkbox = within(canvasElement).getByRole('checkbox');
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
  },
};

/**
 * Every combination of selection, `invalid`, and `disabled` for visual regression review. Not documentation:
 * use the axis stories to learn the props. Hover and active are checked by hand with the pointer.
 */
export const AllVariants: Story = {
  tags: ['visual'],
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, max-content)', gap: 16 }}>
      {[false, true].map((invalid) =>
        [false, true].map((disabled) => (
          <div key={`${invalid}-${disabled}`} style={{ display: 'contents' }}>
            <Checkbox {...args} invalid={invalid} disabled={disabled} errorMessage="Error message" label="Unchecked" />
            <Checkbox {...args} invalid={invalid} disabled={disabled} errorMessage="Error message" label="Checked" checked />
            <Checkbox {...args} invalid={invalid} disabled={disabled} errorMessage="Error message" label="Indeterminate" indeterminate />
            <Checkbox {...args} invalid={invalid} disabled={disabled} errorMessage="Error message" label="Required" required />
          </div>
        )),
      )}
    </div>
  ),
};
