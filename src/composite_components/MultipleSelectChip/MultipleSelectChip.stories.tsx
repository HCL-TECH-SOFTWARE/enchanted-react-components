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
import CloseIcon from '@hcl-software/enchanted-icons/dist/carbon/es/close';
import CheckmarkIcon from '@hcl-software/enchanted-icons/dist/carbon/es/checkmark';

import Chip from '../../Chip/Chip';
import MultipleSelectChip from './MultipleSelectChip';
import MenuItem from '../../Menu/MenuItem';
import ListItemIcon from '../../hidden_components/List/ListItemIcon';
import ListItemText from '../../hidden_components/List/ListItemText';
import { IFilm, top100Films } from '../../Autocomplete/data';

interface IChip {
  label: string;
  year: number;
}

export default {
  title: 'Inputs/MultipleSelectChip',
  component: MultipleSelectChip,
  argTypes: {
    error: {
      control: 'boolean',
      table: {
        defaultValue: {
          summary: false,
        },
      },
      description:
        'Indicates the combobox value is invalid.',
    },
    emptyOptions: {
      control: 'boolean',
      description:
        'Adds freeSolo and empty options array to the MultiSelectChip which would allow it to accept free undetermined values (e.g. any word or phrase)',
    },
    helperIconTooltip: {
      table: {
        defaultValue: {
          summary: 'Some information about that component.',
        },
      },
      description: 'Tooltip text hovering on ? mark for MultiSelectChip component',
    },
    required: {
      control: 'boolean',
      table: {
        defaultValue: {
          summary: true,
        },
      },
      description: 'Indicates that multiSelectchip is required field if it is true',
    },
    label: {
      table: {
        defaultValue: {
          summary: 'Label',
        },
      },
      description: 'Label for MultiSelectChip component',
    },
    helperText: {
      table: {
        defaultValue: {
          summary: 'Helper text',
        },
      },
      description: 'The helper text content.',
    },
    sx: {
      description: 'The system prop that allows defining system overrides as well as additional CSS styles.',
    },
    placeholder: {
      description: 'The short hint displayed in the input before the user enters a value.',
      table: {
        defaultValue: {
          summary: 'Placeholder',
        },
      },
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
    actionProps: {
      description: 'Contains the action props and key-value',
    },
    disabled: {
      description: 'If true, the component is disabled.',
    },
    fullWidth: {
      description: 'If true, the input will take up the full width of its container.',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    filterSelectedOptions: {
      description: 'If true, hide the selected options from the list box.',
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    options: {
      description: 'Array of options.',
    },
    id: {
      description: 'Id of the component.',
      table: {
        defaultValue: {
          summary: 'id',
        },
      },
    },
    clearIcon: {
      control: false,
      description:
        'The clear Icon used to clear chips.',
    },
    endAdornmentAction: {
      control: false,
      description: 'End Adornment Action of the component.',
    },
    renderNonEditInput: {
      control: false,
      description: 'Render the component Non Edittable Input',
    },
    ref: {
      control: false,
      description: 'https://mui.com/material-ui/api/chip/',
    },
    getOptionLabel: {
      control: false,
      description: 'https://mui.com/material-ui/api/chip/',
    },
    autoFocus: {
      control: false,
      table: {
        defaultValue: {
          summary: false,
        },
      },
      description: 'https://mui.com/material-ui/api/chip/',
    },
  },
} as Meta<typeof MultipleSelectChip>;

const Template: StoryFn<typeof MultipleSelectChip> = (args) => {
  const [value, setValue] = React.useState([top100Films[13], top100Films[10], top100Films[2]]);
  return (
    <MultipleSelectChip
      {...args}
      value={value}
      options={top100Films}
      onChange={(event, newValue) => {
        setValue([...(newValue as IChip[])]);
      }}
      getOptionLabel={(option) => {
        return (option as IChip).label;
      }}
      filterSelectedOptions={false}
      disableCloseOnSelect
      renderOption={(props, option, state) => {
        return (
          <MenuItem
            disableGutters
            cascading={false}
            selected={state.selected}
            size="small"
            {...props}
          >
            {state.selected && (
              <ListItemIcon>
                <CheckmarkIcon fontSize="small" />
              </ListItemIcon>
            )}
            <ListItemText primary={(option as IChip).label} tooltip={(option as IChip).label} inset={!state.selected} />
          </MenuItem>
        );
      }}
      renderTags={(tagValue, getTagProps) => {
        return tagValue.map((option, index) => {
          return (
            <Chip
              trailingIcon={<CloseIcon />}
              onDeleteFunc={() => {
                setValue([
                  ...value.filter((valueItem) => {
                    return value.indexOf(valueItem) !== index;
                  }),
                ]);
              }}
              hideTrailingIcon={false}
              size="small"
              variant="filled"
              label={typeof option === 'string' ? option : (option as IChip).label}
              {...getTagProps({ index })}
            />
          );
        });
      }}
      renderNonEditInput={() => {
        return value.map((option, index) => {
          return (
            <Chip
              key={(option as IChip).label}
              trailingIcon={<CloseIcon />}
              onDeleteFunc={() => {
                setValue([
                  ...value.filter((valueItem) => {
                    return value.indexOf(valueItem) !== index;
                  }),
                ]);
              }}
              disabled={args.disabled}
              hideTrailingIcon
              size="small"
              variant="filled"
              label={(option as IChip).label}
            />
          );
        });
      }}
    />
  );
};

export const ExampleMultipleSelectChip = {
  render: Template,

  args: {
    ...MultipleSelectChip.defaultProps,
    size: 'medium',
    label: 'Example label',
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
      {
        href: '#',
        label: 'Action',
      },
      {
        href: '#',
        label: 'Action',
      },
    ],
    id: 'tags-outlined',
    filterSelectedOptions: true,
    options: top100Films,
    sx: {},
    getOptionLabel: (option: IFilm) => {
      return (option as IFilm).label;
    },
    emptyOptions: false,
  },
};

export const ExampleMultipleSelectChipError = {
  render: Template,

  args: {
    ...ExampleMultipleSelectChip.args,
    error: true,
  },
};

export const ExampleMultipleSelectChipDisabled = {
  render: Template,

  args: {
    ...ExampleMultipleSelectChip.args,
    disabled: true,
  },
};

export const ExampleMultipleSelectChipNonEdit = {
  render: Template,

  args: {
    ...ExampleMultipleSelectChip.args,
    nonEdit: true,
  },
};

export const ExampleMultipleSelectChipFullWidth = {
  render: Template,

  args: {
    ...ExampleMultipleSelectChip.args,
    fullWidth: true,
  },
};
