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
import { fn } from 'storybook/test';
import { useState } from 'react';
import { ThemeMode } from '../../theme';
import { Checkbox } from '../Checkbox';
import { CheckboxGroup, CheckboxGroupOrientation } from './CheckboxGroup';
import type { CheckboxGroupProps } from './CheckboxGroup';

const meta = {
  title: 'Components/Inputs/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs'],
  args: { label: 'Label' },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

// Four options, as in the Figma design; `invalid` is forwarded so the controls take the error color.
const Options = ({ invalid }: Pick<CheckboxGroupProps, 'invalid'>) => (
  <>
    {['1', '2', '3', '4'].map((value) => (
      <Checkbox key={value} value={value} label="Label" invalid={invalid} />
    ))}
  </>
);

const renderGroup: Story['render'] = (args) => (
  <CheckboxGroup {...args}>
    <Options invalid={args.invalid} />
  </CheckboxGroup>
);

const renderAllVariants: NonNullable<Story['render']> = (args) => (
  <div style={{ display: 'grid', gap: 'var(--gap-sm)', fontFamily: 'var(--font-family)' }}>
    {Object.values(CheckboxGroupOrientation).flatMap((orientation) =>
      [false, true].flatMap((disabled) =>
        [false, true].map((invalid) => (
          <div key={`${orientation}-${disabled}-${invalid}`}>
            <div>
              {orientation} / {disabled ? 'Disabled' : 'Enabled'} / {invalid ? 'Invalid' : 'Valid'}
            </div>
            <CheckboxGroup
              {...args}
              orientation={orientation}
              disabled={disabled}
              invalid={invalid}
              errorMessage="Error message"
              value={['2', '4']}
            >
              <Options invalid={invalid} />
            </CheckboxGroup>
          </div>
        )),
      ),
    )}
  </div>
);

/** A labelled group of four options. Start here: every other story changes one thing about it. */
export const Default: Story = { render: renderGroup };

/** `orientation` lays the checkboxes out in a column (default) or a wrapping row. Figma `orientation`. */
export const Orientation: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 48,
        alignItems: 'flex-start',
      }}
    >
      <CheckboxGroup {...args} label="Vertical" orientation={CheckboxGroupOrientation.Vertical}>
        <Options />
      </CheckboxGroup>
      <CheckboxGroup {...args} label="Horizontal" orientation={CheckboxGroupOrientation.Horizontal}>
        <Options />
      </CheckboxGroup>
    </div>
  ),
};

/** `invalid` turns the label red, adds the error icon, and shows the `errorMessage`. Figma `invalid`. */
export const Invalid: Story = {
  args: { invalid: true, errorMessage: 'Error message' },
  render: renderGroup,
};

/** `invalid` with the horizontal layout. Figma `invalid` and `orientation`. */
export const InvalidHorizontal: Story = {
  args: {
    invalid: true,
    errorMessage: 'Error message',
    orientation: CheckboxGroupOrientation.Horizontal,
  },
  render: renderGroup,
};

/** `disabled` blocks interaction on every checkbox and dims the label. Figma `disabled`. */
export const Disabled: Story = {
  args: { disabled: true },
  render: renderGroup,
};

/** `disabled` with the horizontal layout. Figma `disabled` and `orientation`. */
export const DisabledHorizontal: Story = {
  args: { disabled: true, orientation: CheckboxGroupOrientation.Horizontal },
  render: renderGroup,
};

/** `disabled` together with `invalid`: the label is dimmed, the error icon and message keep the error color. */
export const DisabledInvalid: Story = {
  args: { disabled: true, invalid: true, errorMessage: 'Error message' },
  render: renderGroup,
};

/** `disabled` and `invalid` with the horizontal layout. Figma `disabled`, `invalid` and `orientation`. */
export const DisabledInvalidHorizontal: Story = {
  args: {
    disabled: true,
    invalid: true,
    errorMessage: 'Error message',
    orientation: CheckboxGroupOrientation.Horizontal,
  },
  render: renderGroup,
};

/** Supporting text under the checkboxes. Figma `helperText` and `showHelperText`. */
export const WithHelperText: Story = {
  args: { helperText: 'This is a helper text.', showHelperText: true },
  render: renderGroup,
};

/** Error text under the checkboxes while `invalid`; `showErrorMessage={false}` hides it. Figma `errorMessage` and `showErrorMessage`. */
export const WithErrorMessage: Story = {
  args: {
    invalid: true,
    errorMessage: 'Error message',
    showErrorMessage: true,
  },
  render: renderGroup,
};

/** `required` adds the asterisk after the label. Figma FormLabel `required`. */
export const Required: Story = {
  args: { required: true },
  render: renderGroup,
};

/** `showLabel={false}` hides the label; give the group an `aria-label` so it keeps an accessible name. Figma `showLabel`. */
export const WithoutLabel: Story = {
  args: { showLabel: false, 'aria-label': 'Label' },
  render: renderGroup,
};

/** Controlled use: the parent owns `value` and updates it from `onValueChange`. */
export const Controlled: Story = {
  args: { onValueChange: fn() },
  render: (args) => {
    const [value, setValue] = useState<string[]>(['2']);
    return (
      <CheckboxGroup
        {...args}
        value={value}
        onValueChange={(next, details) => {
          setValue(next);
          args.onValueChange?.(next, details);
        }}
      >
        <Options />
      </CheckboxGroup>
    );
  },
};

/** Review the full CheckboxGroup state matrix against the light theme during visual regression checks. */
export const AllVariantsLight: Story = {
  name: 'AllVariants-Light',
  tags: ['visual'],
  globals: { theme: ThemeMode.Light },
  render: renderAllVariants,
};

/** Review the full CheckboxGroup state matrix against the dark theme during visual regression checks. */
export const AllVariantsDark: Story = {
  name: 'AllVariants-Dark',
  tags: ['visual'],
  globals: { theme: ThemeMode.Dark },
  render: renderAllVariants,
};
