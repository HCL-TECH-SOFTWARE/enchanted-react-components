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
import RocketIcon from '@hcl-software/enchanted-icons/dist/carbon/es/rocket';

import ToggleButton from './ToggleButton';

export default {
  title: 'Inputs/ToggleButton',
  component: ToggleButton,
} as Meta<typeof ToggleButton>;

const Template: StoryFn<typeof ToggleButton> = (args) => {
  const [selected, setSelected] = React.useState(false);

  return (
    <ToggleButton
      {...args}
      selected={args.selected || selected}
      onChange={() => {
        setSelected(!selected);
      }}
    >
      <RocketIcon />
    </ToggleButton>
  );
};

export const ExampleToggleButton = {
  render: Template,

  args: {
    ...ToggleButton.defaultProps,
  },
};

export const ExampleToggleButtonMedium = {
  render: Template,

  args: {
    ...ExampleToggleButton.args,
    size: 'medium',
  },
};

export const ExampleToggleButtonSelect = {
  render: Template,

  args: {
    ...ExampleToggleButton.args,
    selected: true,
  },
};

export const ExampleToggleButtonDisabled = {
  render: Template,

  args: {
    ...ExampleToggleButton.args,
    disabled: true,
  },
};
