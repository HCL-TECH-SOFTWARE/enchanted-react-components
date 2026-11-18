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
import SearchIcon from '@hcl-software/enchanted-icons-react/carbon/es/search';
import { IconButton, IconButtonVariant } from '../IconButton';
import { TextField, TextFieldSize } from './TextField';

// Stories render inside the ThemeProvider boundary, so the tokens are available for the layout.
const Column = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'grid', gap: 'var(--padding-s)', width: '100%', maxWidth: 'min-content' }}>{children}</div>
);

// The search button of the adornment stories; `inverseColors` follows the field it sits in.
const SearchButton = ({ inverseColors }: { inverseColors?: boolean }) => (
  <IconButton
    icon={<SearchIcon />}
    variant={IconButtonVariant.WithoutPadding}
    inverseColors={inverseColors}
    aria-label="Search"
  />
);

const meta = {
  title: 'Components/Inputs/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: { label: 'Label', placeholder: 'Placeholder' },
  argTypes: {
    size: { control: 'select', options: Object.values(TextFieldSize) },
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A labelled single-line text field. Start here: every other variation changes one thing about it. */
export const Default: Story = {};

/** `medium` is the default; use `small` in dense layouts such as tables and toolbars. */
export const Sizes: Story = {
  render: (args) => (
    <Column>
      {Object.values(TextFieldSize).map((size) => (
        <TextField key={size} {...args} size={size} label={size} />
      ))}
    </Column>
  ),
};

/** Renders a `textarea` for text that runs over several lines. */
export const Multiline: Story = {
  args: { multiline: true },
};

/** Adds supporting text below the field, for example the format you expect. */
export const WithHelperText: Story = {
  args: { helperText: 'Helper text' },
};

/** Shows the unit of the value after the text, for example `px`. */
export const WithUnitLabel: Story = {
  args: { unitLabel: 'px', defaultValue: '16' },
};

/**
 * Pass `inputAdornment` for an action at the end of the field, such as a search button. The
 * adornment is your own component, so give it the same `inverseColors` as the field.
 */
export const WithInputAdornment: Story = {
  render: (args) => <TextField {...args} inputAdornment={<SearchButton inverseColors={args.inverseColors} />} />,
};

/** Pass `contentTop` and `contentBottom` for freeform content above and below the input, such as a toolbar or a counter. */
export const WithContentTopAndBottom: Story = {
  args: { contentTop: 'Content top', contentBottom: 'Content bottom' },
};

/** Marks the field as invalid. Use `helperText` to say what is wrong; it takes the error color. */
export const Error: Story = {
  args: { error: true, helperText: 'Error message', defaultValue: 'Input text' },
};

/** The value can be selected and copied but not changed. Use it to show a value that the user may not edit. */
export const ReadOnly: Story = {
  args: { readOnly: true, defaultValue: 'Input text' },
};

/** Use while the field is unavailable. It ignores focus and input. */
export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Input text' },
};

/** Set `inverseColors` when the field sits on a dark surface, so its colors keep their contrast. */
export const InverseOnDark: Story = {
  args: { inverseColors: true, helperText: 'Helper text' },
  render: (args) => (
    <div style={{ padding: 'var(--padding-s)', background: 'var(--color-background-dark)' }}>
      <Column>
        <TextField {...args} inputAdornment={<SearchButton inverseColors />} />
        <TextField {...args} error helperText="Error message" label="Error" />
        <TextField {...args} disabled label="Disabled" />
      </Column>
    </div>
  ),
};

/** Every size in each state, for visual regression review. Not documentation. */
export const AllVariants: Story = {
  tags: ['visual'],
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--padding-s)' }}>
      {Object.values(TextFieldSize).map((size) => (
        <Column key={size}>
          <TextField {...args} size={size} label="Rest" />
          <TextField {...args} size={size} label="Filled" defaultValue="Input text" />
          <TextField {...args} size={size} label="Error" error helperText="Error message" />
          <TextField {...args} size={size} label="Read only" readOnly defaultValue="Input text" />
          <TextField {...args} size={size} label="Disabled" disabled defaultValue="Input text" />
        </Column>
      ))}
    </div>
  ),
};
