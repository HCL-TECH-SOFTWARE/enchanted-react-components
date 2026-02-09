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
import CaretDownIcon from '@hcl-software/enchanted-icons/dist/carbon/es/caret--down';
import InformationIcon from '@hcl-software/enchanted-icons/dist/carbon/es/information';

import InputAdornment from '@mui/material/InputAdornment';
import { Box } from '@mui/material';
import TextField from './TextField';
import Button from '../Button';

import UnitSelector from '../prerequisite_components/UnitSelector/UnitSelector';

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
      options: ['primary'],
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
    id: {
      description: 'Attribute to set the id.',
      table: {
        defaultValue: { summary: TextField.defaultProps?.id },
      },
    },
    helperText: {
      description: 'Attribute to set the helper text.',
      table: {
        defaultValue: { summary: TextField.defaultProps?.helperText },
      },
    },
    enableHelpHoverEffect: {
      control: 'boolean',
      table: {
        defaultValue: { summary: false },
      },
      description: 'If true, the helper icon displays a gray background when hovered.',
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
    sx: {
      description: 'The system prop that allows defining system overrides as well as additional CSS styles.',
    },
    fullWidth: {
      description: 'If true, the input will take up the full width of its container.',
    },
    autoFocus: {
      description: 'If true, the input element is focused during the first mount.',
    },
    multiline: {
      description: 'If true, a textarea element is rendered instead of an input.',
    },
    endAdornmentAction: {
      control: false,
      description: 'This can be used to add a prefix, a suffix, or an action to an input.',
    },
    actionProps: {
      control: false,
      description: 'Attribute to define the action href and label.',
    },
    renderNonEditInput: {
      control: false,
      description: 'https://mui.com/material-ui/api/text-field/',
    },
    ref: {
      control: false,
      description: 'https://mui.com/material-ui/api/text-field/',
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
} as Meta<typeof TextField>;

const Template: StoryFn<typeof TextField> = (args) => {
  const [value, setValue] = React.useState(args.value ? args.value : '');

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

  return (
    <TextField
      {...args}
      value={value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
      }}
      customIcon={customIcon}
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
    id: 'input-id',
    helperText: 'Some important text',
    enableHelpHoverEffect: false,
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
    customIcon: 'None',
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

export const ExampleTextFieldWithUnitSelector = {
  render: () => {
    const [widthValue, setWidthValue] = React.useState('');
    const [widthUnit, setWidthUnit] = React.useState('px');
    const [widthFocused, setWidthFocused] = React.useState(false);

    const [heightValue, setHeightValue] = React.useState('');
    const [heightUnit, setHeightUnit] = React.useState('px');
    const [heightFocused, setHeightFocused] = React.useState(false);

    const units = ['px', '%', 'em', 'rem', 'vw', 'Freeform'];

    const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setWidthValue(event.target.value);
    };

    const handleWidthUnitChange = (newUnit: string) => {
      setWidthUnit(newUnit);
    };

    const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setHeightValue(event.target.value);
    };

    const handleHeightUnitChange = (newUnit: string) => {
      setHeightUnit(newUnit);
    };

    return (
      <Box sx={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <TextField
          label="Width"
          value={widthValue}
          onChange={handleWidthChange}
          type={widthUnit === 'Freeform' ? 'text' : 'number'}
          placeholder="Placeholder"
          sx={{ width: '200px' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <UnitSelector
                  units={units}
                  selectedUnit={widthUnit}
                  onUnitChange={handleWidthUnitChange}
                  active={widthFocused}
                />
              </InputAdornment>
            ),
            onFocus: () => { return setWidthFocused(true); },
            onBlur: () => { return setWidthFocused(false); },
          }}
        />

        <TextField
          label="Height"
          value={heightValue}
          onChange={handleHeightChange}
          type={heightUnit === 'Freeform' ? 'text' : 'number'}
          placeholder="Placeholder"
          sx={{ width: '200px' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <UnitSelector
                  units={units}
                  selectedUnit={heightUnit}
                  onUnitChange={handleHeightUnitChange}
                  active={heightFocused}
                />
              </InputAdornment>
            ),
            onFocus: () => { return setHeightFocused(true); },
            onBlur: () => { return setHeightFocused(false); },
          }}
        />
      </Box>
    );
  },
};
