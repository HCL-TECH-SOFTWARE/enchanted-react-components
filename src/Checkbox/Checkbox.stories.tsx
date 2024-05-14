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
import { FormControl, FormGroup, FormHelperText } from '@mui/material';

import FormControlLabel from '../prerequisite_components/FormControlLabel';
import Checkbox, { CheckboxVariants } from './Checkbox';
import Typography from '../Typography';

export default {
  title: 'Inputs/Checkbox',
  component: Checkbox,
  argTypes: {
    variant: {
      description: 'Determines if the checkbox has padding or not.',
    },
    disabled: {
      description: 'If `true`, the component is disabled.',
      table: {
        defaultValue: { summary: false },
      },
    },
    indeterminate: {
      description:
        'If `true`, the component appears indeterminate. This does not set the native input element to indeterminate due to inconsistent behavior across browsers.',
      table: {
        defaultValue: { summary: false },
      },
    },
    required: {
      description: 'If `true`, the `input` element is required.',
      control: false,
      table: {
        defaultValue: { summary: false },
      },
    },
    disableRipple: {
      description: 'If `true`, the ripple effect is disabled.',
      control: false,
      table: {
        defaultValue: { summary: true },
      },
    },
    centerRipple: {
      description: 'https://mui.com/material-ui/api/button-base/#button-base-prop-centerRipple',
      control: false,
    },
    disableTouchRipple: {
      description: 'https://mui.com/material-ui/api/button-base/#button-base-prop-disableTouchRipple',
      control: false,
    },
    focusRipple: {
      description: 'https://mui.com/material-ui/api/button-base/#button-base-prop-focusRipple',
      control: false,
    },
    focusVisibleClassName: {
      description: 'https://mui.com/material-ui/api/button-base/#button-base-prop-focusVisibleClassName',
      control: false,
    },
    ref: {
      control: false,
      description: 'https://mui.com/material-ui/api/checkbox/',
    },
    action: {
      control: false,
      description: 'https://mui.com/material-ui/api/checkbox/',
    },
    LinkComponent: {
      control: false,
      description: 'https://mui.com/material-ui/api/button-base/#button-base-prop-LinkComponent',
    },
    onFocusVisible: {
      control: false,
      description: 'https://mui.com/material-ui/api/button-base/#button-base-prop-onFocusVisible',
    },
    TouchRippleProps: {
      control: false,
      description: 'https://mui.com/material-ui/api/button-base/#button-base-prop-TouchRippleProps',
    },
    touchRippleRef: {
      control: false,
      description: 'https://mui.com/material-ui/api/button-base/#button-base-prop-touchRippleRef',
    },
  },
} as Meta<typeof Checkbox>;

const Template: StoryFn<typeof Checkbox> = (args) => {
  return (
    <FormControl>
      <FormGroup
        // to implement the design using FormHelperText below based on the focusVisible and disabled state of its previous element sibling's descendant:
        // a relatively new feature in CSS or CSS selector has been used which may not be supported by older browsers
        // previously, CSS was uni-directional, checking from parent down to children, but now we're checking the state of the children to affect its parent/parent's sibling
        sx={{
          '&:has( .MuiCheckbox-root.Mui-focusVisible)': {
            '& + .MuiFormHelperText-root': {
              marginTop: args.variant === CheckboxVariants.WITHOUT_PADDING ? '-5px' : '-9px',
            },
          },
          '&:has( .MuiCheckbox-root.Mui-disabled)': {
            '& + .MuiFormHelperText-root': {
              color: (theme) => { return theme.palette.text.disabled; },
            },
          },
        }}
      >
        <FormControlLabel
          value="Label"
          control={<Checkbox {...args} />}
          label={(
            <Typography variant="body2">Label</Typography>
          )}
        />
      </FormGroup>
      <FormHelperText
        sx={{
          marginLeft: args.variant === CheckboxVariants.WITHOUT_PADDING ? '30px' : '34px',
          marginTop: '-5px',
        }}
      >
        Helper text
      </FormHelperText>
    </FormControl>
  );
};

export const ExampleCheckbox = {
  render: Template,

  args: {
    ...Checkbox.defaultProps,
    required: true,
    centerRipple: false,
    disableTouchRipple: false,
    focusRipple: false,
    focusVisibleClassName: 'Example Class Name',
  },
};

export const ExampleCheckboxDisabled = {
  render: Template,

  args: {
    ...ExampleCheckbox.args,
    disabled: true,
  },
};

export const ExampleCheckboxIndeterminate = {
  render: Template,

  args: {
    ...ExampleCheckbox.args,
    indeterminate: true,
  },
};
