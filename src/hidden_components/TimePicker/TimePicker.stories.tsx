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

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

import TimePicker from './TimePicker';

export default {
  title: 'Inputs/TimePicker',
  component: TimePicker,
  argTypes: {
    margin: {
      description:
        'If dense or normal, will adjust vertical spacing of this and contained components. "none" "dense"',
      options: ['dense', 'none'],
      control: { type: 'radio' },
      table: {
        defaultValue: { summary: TimePicker.defaultProps.margin },
      },
    },
    color: {
      description:
        'The color of the component. It supports both default and custom theme colors, which can be added as shown in the palette customization guide.',
      options: ['primary'],
      control: { type: 'radio' },
      table: {
        defaultValue: { summary: TimePicker.defaultProps.color },
      },
    },
    size: {
      description: 'Attribute to set the size.',
      options: ['medium'],
      control: { type: 'radio' },
      table: {
        defaultValue: { summary: TimePicker.defaultProps.size },
      },
    },
    label: {
      description: 'Attribute to set the label.',
      table: {
        defaultValue: { summary: TimePicker.defaultProps.label },
      },
    },
    helperText: {
      description: 'Attribute to set the helper text.',
      table: {
        defaultValue: { summary: TimePicker.defaultProps.helperText },
      },
    },
    helperIconTooltip: {
      description: 'Attribute to set t of the tooltip for the helper icon.',
      table: {
        defaultValue: { summary: TimePicker.defaultProps.helperIconTooltip },
      },
    },
    unitLabel: {
      description: 'Attribute which can be used to define the unit of that component',
      table: {
        defaultValue: { summary: TimePicker.defaultProps.hiddenLabel },
      },
    },
    format: {
      description: 'Attribute which is used to verified the date.',
      table: {
        defaultValue: { summary: TimePicker.defaultProps.format },
      },
      control: false,
    },
    error: {
      description: 'If `true`, the error state will be enabled.',
      table: {
        disable: true,
      },
    },
    hiddenLabel: {
      description: 'If `true`, the label will hide.',
      table: {
        defaultValue: { summary: TimePicker.defaultProps.hiddenLabel },
      },
    },
    nonEdit: {
      description: 'If `true`, the component is only ready. No interactions are possible..',
      table: {
        defaultValue: { summary: TimePicker.defaultProps.nonEdit },
      },
    },
    disabled: {
      description: 'If `true`, the component is disabled.',
      table: {
        defaultValue: { summary: TimePicker.defaultProps.disabled },
      },
    },
    required: {
      description: 'If `true`, the `input` element is required.',
      table: {
        defaultValue: { summary: TimePicker.defaultProps.required },
      },
    },
    actionProps: {
      description: 'Attribute to define the action href and label.',
      table: {
        defaultValue: { summary: '' },
      },
    },
  },
} as Meta<typeof TimePicker>;

const Template: StoryFn<typeof TimePicker> = (args) => {
  const [value, setValue] = React.useState<Dayjs | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue as Dayjs | null);
        }}
      />
    </LocalizationProvider>
  );
};

export const ExampleTimePicker = {
  render: Template,

  args: {
    ...TimePicker.defaultProps,
    label: 'Label',
    helperText: 'Some important text',
    helperIconTooltip: 'Some information about that component.',
    required: true,
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
    InputProps: {
      sx: { minWidth: '240px' },
    },
  },
};

export const ExampleTimePickerError = {
  render: Template,

  args: {
    ...ExampleTimePicker.args,
    error: true,
  },
};

export const ExampleTimePickerDisabled = {
  render: Template,

  args: {
    ...ExampleTimePicker.args,
    disabled: true,
  },
};

export const ExampleTimePickerNonEdit = {
  render: Template,

  args: {
    ...ExampleTimePicker.args,
    nonEdit: true,
  },
};

export const ExampleTimePickerFullWidth = {
  render: Template,

  args: {
    ...ExampleTimePicker.args,
    fullWidth: true,
  },
};
