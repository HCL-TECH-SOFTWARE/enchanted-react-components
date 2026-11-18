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
import type { ReactNode } from 'react';
import { Checkbox, CheckboxVariant } from './Checkbox';

// Stories render inside the ThemeProvider boundary, so the tokens are available for the layout.
const Row = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--padding-s)' }}>{children}</div>
);

const meta = {
  title: 'Components/Inputs/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { label: 'Label' },
  argTypes: {
    variant: { control: 'select', options: Object.values(CheckboxVariant) },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A labelled checkbox. Start here: every other variation changes one thing about it. */
export const Default: Story = {};

/** `withPadding` adds vertical space around the box so the hit area is larger; use `withoutPadding` where the checkbox must align with other content, for example in a table cell. */
export const Variants: Story = {
  render: (args) => (
    <Row>
      {Object.values(CheckboxVariant).map((variant) => (
        <Checkbox key={variant} {...args} variant={variant} label={variant} />
      ))}
    </Row>
  ),
};

/** Starts selected. Use `checked` with `onCheckedChange` instead when your code owns the value. */
export const Checked: Story = {
  args: { defaultChecked: true },
};

/** Use for a parent option when only some of its children are selected. It is visual: the state does not change by itself. */
export const Indeterminate: Story = {
  args: { indeterminate: true },
};

/** Adds supporting text below the label, for example a hint about what the option does. */
export const WithHelperText: Story = {
  args: { helperText: 'Helper text' },
};

/** Marks the option as invalid. Pass `errorMessage` to say what is wrong; it shows only while `error` is set. */
export const Error: Story = {
  args: { error: true, errorMessage: 'Error message' },
};

/** Use while the option is unavailable. The checkbox ignores clicks and keyboard input. */
export const Disabled: Story = {
  render: (args) => (
    <Row>
      <Checkbox {...args} disabled label="Unchecked" />
      <Checkbox {...args} disabled defaultChecked label="Checked" />
      <Checkbox {...args} disabled indeterminate label="Indeterminate" />
    </Row>
  ),
};

/** Every variant in each state, for visual regression review. Not documentation. */
export const AllVariants: Story = {
  tags: ['visual'],
  render: (args) => (
    <div style={{ display: 'grid', gap: 'var(--padding-s)' }}>
      {Object.values(CheckboxVariant).map((variant) => (
        <Row key={variant}>
          <Checkbox {...args} variant={variant} label="Unchecked" />
          <Checkbox {...args} variant={variant} defaultChecked label="Checked" />
          <Checkbox {...args} variant={variant} indeterminate label="Indeterminate" />
          <Checkbox {...args} variant={variant} error errorMessage="Error message" label="Error" />
          <Checkbox {...args} variant={variant} disabled label="Disabled" />
        </Row>
      ))}
    </div>
  ),
};
