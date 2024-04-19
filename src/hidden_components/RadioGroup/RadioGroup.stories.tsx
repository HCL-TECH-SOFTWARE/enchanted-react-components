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
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import FormControlLabel from '../../prerequisite_components/FormControlLabel';
import RadioGroup from './RadioGroup';
import Radio from '../../Radio';

export default {
  title: 'Inputs/RadioGroup',
  component: RadioGroup,
} as Meta<typeof RadioGroup>;

const Template: StoryFn<typeof RadioGroup> = (args) => {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup {...args}>
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>
  );
};

export const ExampleRadioGroup = {
  render: Template,

  args: {
    ...RadioGroup.defaultProps,
    'aria-labelledby': 'demo-radio-buttons-group-label',
    defaultValue: 'female',
    name: 'radio-buttons-group',
  },
};
