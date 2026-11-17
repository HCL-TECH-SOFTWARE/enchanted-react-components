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
import { Checkbox, CheckboxVariant } from './Checkbox';

const meta = {
  title: 'Components/Inputs/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { children: 'Label' },
  argTypes: {
    variant: { control: 'select', options: Object.values(CheckboxVariant) },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A single unchecked checkbox with a label. Start here: every other story changes one thing about it. */
export const Default: Story = {};

/** `with-padding` for standalone checkboxes and form rows, `without-padding` where the parent supplies the spacing. */
export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--padding-s)' }}>
      {Object.values(CheckboxVariant).map((variant) => (
        <Checkbox key={variant} {...args} variant={variant}>
          {variant}
        </Checkbox>
      ))}
    </div>
  ),
};

/** Use for an option that is selected. Toggle it to see the checked and unchecked icons. */
export const Checked: Story = { args: { defaultChecked: true } };

/** Use when a parent checkbox controls a group that is only partly selected. */
export const Indeterminate: Story = { args: { indeterminate: true } };

/** Use when the option cannot currently be changed. Shown unchecked and checked. */
export const Disabled: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--padding-s)' }}>
      <Checkbox {...args} disabled>
        Disabled
      </Checkbox>
      <Checkbox {...args} disabled defaultChecked>
        Disabled and checked
      </Checkbox>
    </div>
  ),
};

/** Use to flag an invalid selection, with an error message that explains how to fix it. */
export const WithError: Story = {
  args: { error: true, errorMessage: 'Accept the terms to continue.' },
};

/** Use to add guidance under the label. */
export const WithHelperText: Story = {
  args: { showHelperText: true, helperText: 'We email you once a week.' },
};

/** Use when the checkbox sits next to its own visible text, such as a table row selector. */
export const WithoutLabel: Story = {
  args: { showLabel: false, 'aria-label': 'Select row' },
};

/** Long text wraps next to the box without moving it. */
export const LongLabel: Story = {
  args: {
    children:
      'I agree to the terms and conditions and I understand how my data is processed and stored.',
    showHelperText: true,
    helperText: 'You can change this later in your account settings, under Privacy and notifications.',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '20rem' }}>
        <Story />
      </div>
    ),
  ],
};

/** Clicking the label or pressing Space toggles the checkbox. */
export const Interactive: Story = {
  play: async ({ canvasElement }) => {
    // The ThemeProvider boundary may be a shadow root, so search inside it when present.
    const host = canvasElement.querySelector('[data-theme]');
    const scope = (host?.shadowRoot ?? canvasElement) as unknown as HTMLElement;
    const checkbox = within(scope).getByRole('checkbox', { name: 'Label' });
    await expect(checkbox).toHaveAttribute('aria-checked', 'false');
    await userEvent.click(within(scope).getByText('Label'));
    await expect(checkbox).toHaveAttribute('aria-checked', 'true');
  },
};
