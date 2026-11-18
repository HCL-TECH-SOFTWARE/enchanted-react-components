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
import { Combobox } from '@base-ui/react/combobox';
import SearchIcon from '@hcl-software/enchanted-icons-react/carbon/es/search';
import { SelectSingle, SelectSingleSize } from './SelectSingle';

// Stories render inside the ThemeProvider boundary, so the tokens are available for the layout.
const Column = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'grid', gap: 'var(--padding-s)', width: '100%', maxWidth: 'min-content' }}>{children}</div>
);

const fruits = ['Apple', 'Banana', 'Cherry', 'Pear'];

// The popup content is a Base UI list; the menu items are styled by their own component.
const menu = (
  <Combobox.List>
    {(item: string) => (
      <Combobox.Item key={item} value={item}>
        {item}
      </Combobox.Item>
    )}
  </Combobox.List>
);

const meta = {
  title: 'Components/Inputs/SelectSingle',
  component: SelectSingle,
  tags: ['autodocs'],
  args: { label: 'Label', placeholder: 'Placeholder', items: fruits, menu },
  argTypes: {
    size: { control: 'select', options: Object.values(SelectSingleSize) },
  },
} satisfies Meta<typeof SelectSingle>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A labelled select field with a menu. Typing filters the options. Start here: every other variation changes one thing about it. */
export const Default: Story = {};

/** `medium` is the default; use `small` in dense layouts such as tables and toolbars. */
export const Sizes: Story = {
  render: (args) => (
    <Column>
      {Object.values(SelectSingleSize).map((size) => (
        <SelectSingle key={size} {...args} size={size} label={size} />
      ))}
    </Column>
  ),
};

/** Pass `startAdornment` to put an icon before the input, for example a search icon when the field filters a list. */
export const WithStartAdornment: Story = {
  args: { startAdornment: <SearchIcon /> },
};

/** Adds supporting text below the field, for example how the options are ordered. */
export const WithHelperText: Story = {
  args: { helperText: 'Helper text' },
};

/** Marks the field as invalid. Use `helperText` to say what is wrong; it takes the error color. */
export const Error: Story = {
  args: { error: true, helperText: 'Error message', defaultValue: 'Apple' },
};

/** The value can be read but not changed. Use it to show a choice that the user may not edit. */
export const ReadOnly: Story = {
  args: { readOnly: true, defaultValue: 'Apple' },
};

/** Use while the field is unavailable. It ignores focus and input. */
export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Apple' },
};

/** Set `inverseColors` when the field sits on a dark surface, so its colors keep their contrast. */
export const InverseOnDark: Story = {
  args: { inverseColors: true, helperText: 'Helper text' },
  render: (args) => (
    <div style={{ padding: 'var(--padding-s)', background: 'var(--color-background-dark)' }}>
      <Column>
        <SelectSingle {...args} />
        <SelectSingle {...args} error helperText="Error message" label="Error" />
        <SelectSingle {...args} disabled label="Disabled" />
      </Column>
    </div>
  ),
};

/** Every size in each state, for visual regression review. Not documentation. */
export const AllVariants: Story = {
  tags: ['visual'],
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--padding-s)' }}>
      {Object.values(SelectSingleSize).map((size) => (
        <Column key={size}>
          <SelectSingle {...args} size={size} label="Rest" />
          <SelectSingle {...args} size={size} label="Filled" defaultValue="Apple" />
          <SelectSingle {...args} size={size} label="Error" error helperText="Error message" />
          <SelectSingle {...args} size={size} label="Read only" readOnly defaultValue="Apple" />
          <SelectSingle {...args} size={size} label="Disabled" disabled defaultValue="Apple" />
        </Column>
      ))}
    </div>
  ),
};
