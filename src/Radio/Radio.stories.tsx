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
import Radio from './Radio';
import Typography from '../Typography';

export default {
  title: 'Inputs/Radio',
  component: Radio,
  argTypes: {
    disableRipple: {
      description: 'If `true`, the ripple effect is disabled.',
      table: {
        defaultValue: { summary: true },
      },
    },
    disabled: {
      description: 'If `true`, the component is disabled.',
      table: {
        defaultValue: { summary: false },
      },
    },
    checked: {
      description: 'If `true`, the component is checked.',
      table: {
        defaultValue: { summary: false },
      },
    },
    required: {
      description: 'If `true`, the `input` element is required.',
      table: {
        defaultValue: { summary: false },
      },
    },
  },
} as Meta<typeof Radio>;

const Template: StoryFn<typeof Radio> = (args) => {
  return (
    <FormControl>
      <FormControlLabel
        value="Label"
        control={<Radio {...args} />}
        label={(
          <Typography variant="body2">Label</Typography>
        )}
      />
    </FormControl>
  );
};

export const ExampleRadio = {
  render: Template,

  args: {
    ...Radio.defaultProps,
  },
};

export const ExampleRadioDisabled = {
  render: Template,

  args: {
    ...ExampleRadio.args,
    disabled: true,
  },
};
