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
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { useState } from 'react';
import { ThemeMode } from '../../theme';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Inputs/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { label: 'Label' },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

// Stories render inside the ThemeProvider boundary, so `within(canvasElement)` cannot see the checkbox:
// with an open shadow root it lives under `host.shadowRoot`, and with `none` directly under the host.
// A closed root cannot be queried at all, so the play functions skip their checks in that mode.
const findCheckbox = async (canvasElement: HTMLElement): Promise<HTMLElement | null> => {
  const host = canvasElement.firstElementChild as HTMLElement | null;
  if (!host) return null;
  await waitFor(() => expect(host.shadowRoot ?? host.firstElementChild).not.toBeNull(), { timeout: 1000 }).catch(
    () => undefined,
  );
  const root = host.shadowRoot ?? host;
  if (!host.shadowRoot && !host.firstElementChild) return null;
  return within(root as unknown as HTMLElement).findByRole('checkbox');
};

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--gap-xxs)', alignItems: 'flex-start' }}>{children}</div>
);

const renderAllVariants: NonNullable<Story['render']> = (args) => (
  <div style={{ display: 'grid', gap: 'var(--gap-sm)', fontFamily: 'var(--font-family)' }}>
    {[false, true].flatMap((invalid) =>
      [false, true].map((disabled) => (
        <div key={`${invalid}-${disabled}`}>
          <Row>
            <Checkbox {...args} invalid={invalid} disabled={disabled} errorMessage="Error message" label="Unchecked" />
            <Checkbox {...args} invalid={invalid} disabled={disabled} errorMessage="Error message" label="Checked" checked />
            <Checkbox
              {...args}
              invalid={invalid}
              disabled={disabled}
              errorMessage="Error message"
              label="Indeterminate"
              indeterminate
            />
            <Checkbox
              {...args}
              invalid={invalid}
              disabled={disabled}
              errorMessage="Error message"
              label="Required"
              required
            />
          </Row>
        </div>
      )),
    )}
  </div>
);

/** A single labelled option the user can switch on or off. Start here: every other story changes one thing about it. */
export const Default: Story = {};

/** Use this comparison when reviewing the selected and unselected appearances. Figma `checked`. */
export const Checked: Story = {
  render: (args) => (
    <Row>
      <Checkbox {...args} label="Unchecked" checked={false} />
      <Checkbox {...args} label="Checked" checked />
    </Row>
  ),
};

/** Use this comparison for a parent option whose children may be partly selected. Figma `indeterminate`. */
export const Indeterminate: Story = {
  render: (args) => (
    <Row>
      <Checkbox {...args} label="Not indeterminate" indeterminate={false} />
      <Checkbox {...args} label="Indeterminate" indeterminate />
    </Row>
  ),
};

/** Use this comparison to review validation styling and its error message. Figma `invalid`. */
export const Invalid: Story = {
  args: { errorMessage: 'Error message' },
  render: (args) => (
    <Row>
      <Checkbox {...args} label="Not invalid" invalid={false} />
      <Checkbox {...args} label="Invalid" invalid />
    </Row>
  ),
};

/** Use this comparison to review the available and unavailable control states. Figma `disabled`. */
export const Disabled: Story = {
  render: (args) => (
    <Row>
      <Checkbox {...args} label="Enabled" disabled={false} />
      <Checkbox {...args} label="Disabled" disabled />
    </Row>
  ),
};

/** Use this comparison when choosing between standard and dense table-cell layouts. Figma `disablePadding`. */
export const DisablePadding: Story = {
  render: (args) => (
    <Row>
      <Checkbox {...args} label="With padding" disablePadding={false} />
      <Checkbox {...args} label="Without padding" disablePadding />
    </Row>
  ),
};

/** Use helper text when an option needs context beyond its short label. Figma `helperText` and `showHelperText`. */
export const WithHelperText: Story = {
  args: { helperText: 'Helper text' },
};

/** Suppress the message when invalid styling should remain without inline error copy. Figma `showErrorMessage`. */
export const WithoutErrorMessage: Story = {
  args: { invalid: true, errorMessage: 'Error message', showErrorMessage: false },
};

/** Use this when the form must receive a selection before submission. Figma `required`. */
export const Required: Story = {
  args: { required: true },
};

/** Use a visually hidden label only when another accessible name is provided. Figma `showLabel`. */
export const WithoutLabel: Story = {
  args: { showLabel: false, 'aria-label': 'Label' },
};

/** Shows the focus ring on the focused control. Tab to a checkbox to see the same ring; it turns red while `invalid`. */
export const Focused: Story = {
  play: async ({ canvasElement }) => {
    const checkbox = await findCheckbox(canvasElement);
    if (!checkbox) return;
    // user-event's Tab does not cross shadow roots, so focus the control directly.
    checkbox.focus();
    await expect(checkbox.getRootNode()).toHaveProperty('activeElement', checkbox);
  },
};

/** Use controlled state when the parent must coordinate this selection with other form state. */
export const Controlled: Story = {
  args: { onCheckedChange: fn() },
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        {...args}
        checked={checked}
        onCheckedChange={(value, event) => {
          setChecked(value);
          args.onCheckedChange?.(value, event);
        }}
      />
    );
  },
  play: async ({ canvasElement, args }) => {
    const checkbox = await findCheckbox(canvasElement);
    if (!checkbox) return;
    await userEvent.click(checkbox);
    await expect(args.onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
    await expect(checkbox).toBeChecked();
  },
};

/** Review the full Checkbox state matrix against the light theme during visual regression checks. */
export const AllVariantsLight: Story = {
  name: 'AllVariants-Light',
  tags: ['visual'],
  globals: { theme: ThemeMode.Light },
  render: renderAllVariants,
};

/** Review the full Checkbox state matrix against the dark theme during visual regression checks. */
export const AllVariantsDark: Story = {
  name: 'AllVariants-Dark',
  tags: ['visual'],
  globals: { theme: ThemeMode.Dark },
  render: renderAllVariants,
};

