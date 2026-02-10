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

import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import CaretDownIcon from '@hcl-software/enchanted-icons/dist/carbon/es/caret--down';
import InformationIcon from '@hcl-software/enchanted-icons/dist/carbon/es/information';

import Select, { SelectChangeEvent } from './Select';
import MenuItem from '../Menu/MenuItem';
import ListItemText from '../List/ListItemText';

export default {
  title: 'Inputs/Select (Single)',
  component: Select,
  argTypes: {
    label: {
      description: 'The label of the input.',
    },
    helperText: {
      description: 'The label of the helpertext.',
    },
    placeholder: {
      description: 'The short hint displayed in the input before the user enters a value.',
    },
    required: {
      description: 'If true, the input element is required.',
    },
    disabled: {
      description: 'If true, the component is disabled.',
    },
    error: {
      description: 'If true, the input will indicate an error.',
    },
    fullWidth: {
      description: 'If true, the input will take up the full width of its container.',
    },
    helperIconTooltip: {
      table: {
        defaultValue: {
          summary: 'Some information about that component.',
        },
      },
      description: 'Tooltip text hovering on ? mark for SingleMultiple component',
    },
    unitLabel: {
      description: 'Attribute which can be used to define the unit of that component',
    },
    hiddenLabel: {
      control: 'boolean',
      table: {
        defaultValue: {
          summary: false,
        },
      },
      description:
        'If `true`, the label is hidden.',
    },
    nonEdit: {
      control: 'boolean',
      table: {
        defaultValue: {
          summary: false,
        },
      },
      description: 'If `true` value cannot be editable',
    },
    autoFocus: {
      description: 'If true, the input element is focused during the first mount.',
    },
    sx: {
      description: 'The system prop that allows defining system overrides as well as additional CSS styles.',
    },
    multiple: {
      control: false,
      description: 'https://mui.com/material-ui/api/select/#select-prop-multiple',
      defaultValue: { summary: false },
    },
    displayEmpty: {
      control: false,
      description: 'https://mui.com/material-ui/api/select/#select-prop-displayEmpty',
      defaultValue: { summary: false },
    },
    ref: {
      control: false,
      description: 'https://mui.com/material-ui/api/select/',
    },
    options: {
      control: false,
      description: 'https://mui.com/material-ui/api/select/',
    },
    customIcon: {
      description: 'This can be used to add a custom icon replacing the default information icon for helper text.',
      options: ['None', 'CaretDownIcon', 'InformationIcon'],
      control: { type: 'radio' },
      table: {
        defaultValue: {
          summary: 'None',
        },
      },
    },
  },
} as Meta<typeof Select>;

const Template: StoryFn<typeof Select> = (args) => {
  const [value, setValue] = React.useState(args.value ? args.value : 'None');

  let customIcon: React.ComponentType<React.SVGProps<SVGSVGElement>> | undefined;
  switch (args.customIcon as unknown as string) {
    case 'CaretDownIcon':
      customIcon = CaretDownIcon;
      break;
    case 'InformationIcon':
      customIcon = InformationIcon;
      break;
    default:
      customIcon = undefined;
  }

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setValue(event.target.value as string);
  };

  return (
    <Select {...args} value={value} onChange={handleChange} customIcon={customIcon}>
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
    id: 'example-single-select',
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
    customIcon: 'None',
  },
};

export const ExampleSingleSelectOpen = {
  render: Template,
  args: {
    ...ExampleSingleSelect.args,
    id: 'example-single-select-open',
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
    id: 'example-single-select-error',
    error: true,
  },
};

export const ExampleSingleSelectDisabled = {
  render: Template,
  args: {
    ...ExampleSingleSelect.args,
    id: 'example-single-select-disabled',
    disabled: true,
  },
};

export const ExampleSingleSelectNonEdit = {
  render: Template,
  args: {
    ...ExampleSingleSelect.args,
    id: 'example-single-select-nonedit',
    nonEdit: true,
    value: 'Thirty',
  },
};

export const ExampleSingleSelectFullWidth = {
  render: Template,
  args: {
    ...ExampleSingleSelect.args,
    id: 'example-single-select-fullwidth',
    fullWidth: true,
  },
};
