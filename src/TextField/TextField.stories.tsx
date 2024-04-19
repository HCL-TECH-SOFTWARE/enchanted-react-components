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
import CaretDownIcon from '@hcl-software/enchanted-icons/dist/carbon/es/caret--down';

import TextField from './TextField';
import Button from '../Button';

export default {
  title: 'Inputs/TextField',
  component: TextField,
  argTypes: {
    margin: {
      description:
        'If dense or normal, will adjust vertical spacing of this and contained components. "none" "dense"',
      options: ['dense', 'none'],
      control: { type: 'radio' },
      table: {
        defaultValue: { summary: TextField.defaultProps?.margin },
      },
    },
    color: {
      description:
        'The color of the component. It supports both default and custom theme colors, which can be added as shown in the palette customization guide.',
      options: ['primary', 'secondary', 'warning', 'info', 'success'],
      control: { type: 'radio' },
      table: {
        defaultValue: { summary: TextField.defaultProps?.color },
      },
    },
    size: {
      description: 'Attribute to set the size.',
      options: ['medium'],
      control: { type: 'radio' },
      table: {
        defaultValue: { summary: TextField.defaultProps?.size },
      },
    },
    label: {
      description: 'Attribute to set the label.',
      table: {
        defaultValue: { summary: TextField.defaultProps?.label },
      },
    },
    helperText: {
      description: 'Attribute to set the helper text.',
      table: {
        defaultValue: { summary: TextField.defaultProps?.helperText },
      },
    },
    helperIconTooltip: {
      description: 'Attribute to set t of the tooltip for the helper icon.',
      table: {
        defaultValue: { summary: TextField.defaultProps?.helperIconTooltip },
      },
    },
    unitLabel: {
      description: 'Attribute which can be used to define the unit of that component',
      table: {
        defaultValue: { summary: TextField.defaultProps?.hiddenLabel },
      },
    },
    placeholder: {
      description: 'Attribute which is used to define the placeholder value.',
      table: {
        defaultValue: { summary: TextField.defaultProps?.placeholder },
      },
    },
    error: {
      description: 'If `true`, the error state will be enabled.',
      table: {
        disable: TextField.defaultProps?.error,
      },
    },
    hiddenLabel: {
      description: 'If `true`, the label will hide.',
      table: {
        defaultValue: { summary: TextField.defaultProps?.hiddenLabel },
      },
    },
    nonEdit: {
      description: 'If `true`, the component is only ready. No interactions are possible..',
      table: {
        defaultValue: { summary: TextField.defaultProps?.nonEdit },
      },
    },
    disabled: {
      description: 'If `true`, the component is disabled.',
      table: {
        defaultValue: { summary: TextField.defaultProps?.disabled },
      },
    },
    required: {
      description: 'If `true`, the `input` element is required.',
      table: {
        defaultValue: { summary: TextField.defaultProps?.required },
      },
    },
    actionProps: {
      description: 'Attribute to define the action href and label.',
      table: {
        defaultValue: { summary: '' },
      },
    },
  },
} as Meta<typeof TextField>;

const Template: StoryFn<typeof TextField> = (args) => {
  const [value, setValue] = React.useState(args.value ? args.value : '');
  return (
    <TextField
      {...args}
      value={value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
      }}
    />
  );
};

export const ExampleTextField = {
  render: Template,
  args: {
    ...TextField.defaultProps,
    margin: 'none',
    color: 'primary',
    size: 'medium',
    label: 'Label',
    helperText: 'Some important text',
    helperIconTooltip: 'Some information about that component.',
    placeholder: 'Placeholder',
    unitLabel: 'kg',
    required: true,
    disabled: false,
    error: false,
    fullWidth: false,
    multiline: false,
    focused: false,
    autoFocus: false,
    hiddenLabel: false,
    nonEdit: false,
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
    endAdornmentAction: (
      <Button variant="text" color="inherit">
        <CaretDownIcon color="action" />
      </Button>
    ),
    sx: { minWidth: '240px' },
  },
};

export const ExampleTextFieldError = {
  render: Template,
  args: {
    ...ExampleTextField.args,
    error: true,
  },
};

export const ExampleTextFieldDisabled = {
  render: Template,
  args: {
    ...ExampleTextField.args,
    disabled: true,
  },
};

export const ExampleTextFieldNonEdit = {
  render: Template,
  args: {
    ...ExampleTextField.args,
    nonEdit: true,
    value: 'NonEdit example value',
  },
};

export const ExampleTextFieldFullWidth = {
  render: Template,
  args: {
    ...ExampleTextField.args,
    fullWidth: true,
  },
};
