/* ======================================================================== *
 * Copyright 2024 HCL America Inc.                                          *
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

import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import Select, { SelectChangeEvent } from './Select';
import MenuItem from '../Menu/MenuItem';
import ListItemText from '../hidden_components/List/ListItemText';

export default {
  title: 'Inputs/SelectSingle',
  component: Select,
  argTypes: {
    multiple: {
      control: false,
      description: 'Is use for a special configuration to select multiple items.',
      defaultValue: { summary: false },
    },
    displayEmpty: {
      control: false,
      description:
        'If the property `multiple` is `true` we can hide the placeholder with this property. Is `displayEmpty=true` the placeholder will be displayed.',
      defaultValue: { summary: false },
    },
  },
} as Meta<typeof Select>;

const Template: StoryFn<typeof Select> = (args) => {
  const [value, setValue] = React.useState(args.value ? args.value : 'None');

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setValue(event.target.value as string);
  };

  return (
    <Select {...args} value={value} onChange={handleChange}>
      <MenuItem key="None" value="None" disabled>
        <em>{args.placeholder}</em>
      </MenuItem>
      <MenuItem key="10" size="small" value="Ten">
        <ListItemText
          primary="Ten"
          tooltip="Ten"
        />
      </MenuItem>
      <MenuItem key="20" size="small" value="Twenty - long text, long text, long text, long text">
        <ListItemText
          primary="Twenty - long text, long text, long text, long text"
          tooltip="Twenty - long text, long text, long text, long text"
        />
      </MenuItem>
      <MenuItem key="30" size="small" value="Thirty">
        <ListItemText
          primary="Thirty"
          tooltip="Thirty"
        />
      </MenuItem>
    </Select>
  );
};

export const ExampleSingleSelect = {
  render: Template,
  args: {
    ...Select.defaultProps,
    label: 'Label',
    helperText: 'Some important text',
    helperIconTooltip: 'Some information about that component.',
    placeholder: 'Placeholder',
    required: true,
    error: false,
    nonEdit: false,
    multiple: false,
    displayEmpty: false,
    actionProps: [
      {
        href: '#',
        label: 'Action',
      },
      {
        href: '#',
        label: 'Action',
      },
    ],
  },
};

export const ExampleSingleSelectOpen = {
  render: Template,
  args: {
    ...ExampleSingleSelect.args,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
  },
};

export const ExampleSingleSelectError = {
  render: Template,
  args: {
    ...ExampleSingleSelect.args,
    error: true,
  },
};

export const ExampleSingleSelectDisabled = {
  render: Template,
  args: {
    ...ExampleSingleSelect.args,
    disabled: true,
  },
};

export const ExampleSingleSelectNonEdit = {
  render: Template,
  args: {
    ...ExampleSingleSelect.args,
    nonEdit: true,
    value: 'Thirty',
  },
};

export const ExampleSingleSelectFullWidth = {
  render: Template,
  args: {
    ...ExampleSingleSelect.args,
    fullWidth: true,
  },
};
