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

import { FormControl } from '@mui/material';

import FormControlLabel from '../prerequisite_components/FormControlLabel';
import Switch from './Switch';
import Typography from '../Typography';

export default {
  title: 'Inputs/Switch',
  component: Switch,
  argTypes: {
    disabled: {
      description: 'If `true`, the component is disabled.',
      table: {
        defaultValue: { summary: false },
      },
    },
    ref: {
      control: false,
      description: 'https://mui.com/material-ui/api/switch/',
    },
    action: {
      control: false,
      description: 'https://mui.com/material-ui/api/switch/',
    },
    focusVisibleClassName: {
      control: false,
      description: 'https://mui.com/material-ui/api/button-base/#button-base-prop-focusVisibleClassName',
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
} as Meta<typeof Switch>;

const Template: StoryFn<typeof Switch> = (args) => {
  return (
    <FormControl>
      <FormControlLabel
        value="Label"
        control={<Switch {...args} />}
        label={(
          <Typography variant="body2">Label</Typography>
        )}
      />
    </FormControl>
  );
};

export const ExampleSwitch = {
  render: Template,

  args: {
    ...Switch.defaultProps,
  },
};

export const ExampleSwitchDisabled = {
  render: Template,

  args: {
    ...ExampleSwitch.args,
    disabled: true,
  },
};
