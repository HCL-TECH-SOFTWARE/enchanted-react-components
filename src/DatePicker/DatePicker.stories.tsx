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

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import DatePicker from './DatePicker';
import PickersLocalizationProvider, {
  SUPPORTED_LOCALE,
} from '../PickersLocalizationProvider/PickersLocalizationProvider';

export default {
  title: 'Inputs/DatePicker',
  component: DatePicker,
  argTypes: {
    margin: {
      description:
        'If dense or normal, will adjust vertical spacing of this and contained components. "none" "dense"',
      options: ['dense', 'none'],
      control: { type: 'radio' },
      table: {
        defaultValue: { summary: DatePicker.defaultProps.margin },
      },
    },
    color: {
      description:
        'The color of the component. It supports both default and custom theme colors, which can be added as shown in the palette customization guide.',
      options: ['primary'],
      control: { type: 'radio' },
      table: {
        defaultValue: { summary: DatePicker.defaultProps.color },
      },
    },
    size: {
      description: 'Attribute to set the size.',
      options: ['medium'],
      control: { type: 'radio' },
      table: {
        defaultValue: { summary: DatePicker.defaultProps.size },
      },
    },
    label: {
      description: 'Attribute to set the label.',
      table: {
        defaultValue: { summary: DatePicker.defaultProps.label },
      },
    },
    helperText: {
      description: 'Attribute to set the helper text.',
      table: {
        defaultValue: { summary: DatePicker.defaultProps.helperText },
      },
    },
    helperIconTooltip: {
      description: 'Attribute to set t of the tooltip for the helper icon.',
      table: {
        defaultValue: { summary: DatePicker.defaultProps.helperIconTooltip },
      },
    },
    unitLabel: {
      description: 'Attribute which can be used to define the unit of that component',
      table: {
        defaultValue: { summary: DatePicker.defaultProps.hiddenLabel },
      },
    },
    format: {
      description: 'Attribute which is used to verified the date.',
      table: {
        defaultValue: { summary: DatePicker.defaultProps.format },
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
        defaultValue: { summary: DatePicker.defaultProps.hiddenLabel },
      },
    },
    nonEdit: {
      description: 'If `true`, the component is only ready. No interactions are possible..',
      table: {
        defaultValue: { summary: DatePicker.defaultProps.nonEdit },
      },
    },
    disabled: {
      description: 'If `true`, the component is disabled.',
      table: {
        defaultValue: { summary: DatePicker.defaultProps.disabled },
      },
    },
    required: {
      description: 'If `true`, the `input` element is required.',
      table: {
        defaultValue: { summary: DatePicker.defaultProps.required },
      },
    },
    actionProps: {
      description: 'Attribute to define the action href and label.',
      table: {
        defaultValue: { summary: '' },
      },
    },
    adapterLocale: {
      description: 'The adapterLocale is used for the translation via PickersLocalizationProvider.',
      options: SUPPORTED_LOCALE,
      control: { type: 'radio' },
      table: {
        defaultValue: { summary: 'en' },
      },
    },
  },
} as Meta<typeof DatePicker>;

const Template: StoryFn<typeof DatePicker> = (args) => {
  const [value, setValue] = React.useState<Dayjs | null>(args.value ? dayjs(args.value as string, DatePicker.defaultProps.format) : null);
  // @ts-ignore - The adapterLocale control it's not a property of the DatePicker but it is need for PickersLocalizationProvider.
  const { adapterLocale } = args;
  return (
    <PickersLocalizationProvider adapterLocale={adapterLocale} dateAdapter={AdapterDayjs}>
      <DatePicker
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue as Dayjs | null);
        }}
      />
    </PickersLocalizationProvider>
  );
};

export const ExampleDatePicker = {
  render: Template,
  args: {
    ...DatePicker.defaultProps,
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

export const ExampleDatePickerOpen = {
  render: Template,
  args: {
    ...ExampleDatePicker.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
  },
};

export const ExampleDatePickerError = {
  render: Template,
  args: {
    ...ExampleDatePicker.args,
    error: true,
  },
};

export const ExampleDatePickerDisabled = {
  render: Template,
  args: {
    ...ExampleDatePicker.args,
    disabled: true,
  },
};

export const ExampleDatePickerNonEdit = {
  render: Template,
  args: {
    ...ExampleDatePicker.args,
    nonEdit: true,
    value: '01/01/2024',
  },
};

export const ExampleDatePickerFullWidth = {
  render: Template,
  args: {
    ...ExampleDatePicker.args,
    fullWidth: true,
  },
};
