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

import Autocomplete from './Autocomplete';
import { top100Films } from './data';
import MenuItem from '../Menu/MenuItem';
import ListItemText from '../hidden_components/List/ListItemText';

export default {
  title: 'Inputs/Autocomplete',
  component: Autocomplete,
  argTypes: {
    size: {
      control: 'radio',
      table: {
        defaultValue: {
          summary: 'medium',
        },
      },
      description: 'The size of the component.',
    },
    label: {
      table: {
        defaultValue: {
          summary: 'Label',
        },
      },
      description: 'Label for autocomplete component',
    },
    helperText: {
      table: {
        defaultValue: {
          summary: 'Helper text',
        },
      },
      description: 'The helper text content.',
    },
    helperIconTooltip: {
      table: {
        defaultValue: {
          summary: 'Some information about that component.',
        },
      },
      description: 'Tooltip text hovering on  ? mark for autocomplete component',
    },
    placeholder: {
      table: {
        defaultValue: {
          summary: 'Placeholder',
        },
      },
      description: 'Default text for autocomplete',
    },
    required: {
      control: 'boolean',
      table: {
        defaultValue: {
          summary: true,
        },
      },
      description: 'Indicates that autocomplete is required field if it is true',
    },
    disabled: {
      control: 'boolean',
      table: {
        defaultValue: {
          summary: false,
        },
      },
      description: 'If `true`, the component is disabled.',
    },
    error: {
      control: 'boolean',
      table: {
        defaultValue: {
          summary: false,
        },
      },
      description:
        'Indicates the combobox value is invalid. May also be passed in via arg textFieldProps.',
    },
    fullWidth: {
      control: 'boolean',
      table: {
        defaultValue: {
          summary: false,
        },
      },
      description: 'If `true`, the input will take up the full width of its container.',
    },
    focused: {
      control: 'boolean',
      table: {
        defaultValue: {
          summary: false,
        },
      },
      description: 'If `true`, the component is displayed in focused state.',
    },
    autoFocus: {
      control: 'boolean',
      table: {
        defaultValue: {
          summary: false,
        },
      },
      description: 'if `true` enables auto focus for autocomplete components',
    },
    hiddenLabel: {
      control: 'boolean',
      table: {
        defaultValue: {
          summary: false,
        },
      },
      description:
        'If `true`, the label is hidden. This is used to increase density for a FilledInput. Be sure to add aria-label to the input element.',
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
    options: {
      description: 'Array of options.',
    },
  },
} as Meta<typeof Autocomplete>;

interface Movie {
  label: string;
  year: number;
}

const Template: StoryFn<typeof Autocomplete> = (args) => {
  const [value, setValue] = React.useState(args.value ? args.value : null);
  return (
    <Autocomplete
      value={value}
      autoHighlight
      onChange={(event, newValue) => {
        setValue(newValue as string);
      }}
      renderOption={(props, option, state) => {
        return (
          <MenuItem
            disableGutters
            cascading={false}
            selected={state.selected}
            size="small"
            {...props}
          >
            <ListItemText tooltip={(option as Movie).label} primary={(option as Movie).label} />
          </MenuItem>
        );
      }}
      {...args}
    />
  );
};

export const ExampleAutocomplete = {
  render: Template,
  args: {
    ...Autocomplete.defaultProps,
    size: 'medium',
    label: 'Label',
    helperText: 'Helper text',
    helperIconTooltip: 'Some information about that component.',
    placeholder: 'Placeholder',
    required: true,
    disabled: false,
    error: false,
    fullWidth: false,
    focused: false,
    autoFocus: false,
    hiddenLabel: false,
    nonEdit: false,
    actionProps: [
      // In component, this will render only max 2 action links at least until Figma design for action link variants is finalized
      {
        href: '#',
        label: 'Action',
      },
      {
        href: '#',
        label: 'Action',
      },
      {
        href: '#',
        label: 'Action',
      },
      {
        href: '#',
        label: 'Action',
      },
    ],
    options: top100Films,
    sx: { minWidth: '240px' },
  },
};

export const ExampleAutocompleteOpen = {
  render: Template,
  args: {
    ...ExampleAutocomplete.args,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
  },
};

export const ExampleAutocompleteError = {
  render: Template,
  args: {
    ...ExampleAutocomplete.args,
    error: true,
  },
};

export const ExampleAutocompleteDisabled = {
  render: Template,
  args: {
    ...ExampleAutocomplete.args,
    disabled: true,
  },
};

export const ExampleAutocompleteNonEdit = {
  render: Template,
  args: {
    ...ExampleAutocomplete.args,
    nonEdit: true,
    value: top100Films[0].label,
  },
};

export const ExampleAutocompleteFullWidth = {
  render: Template,
  args: {
    ...ExampleAutocomplete.args,
    fullWidth: true,
  },
};
