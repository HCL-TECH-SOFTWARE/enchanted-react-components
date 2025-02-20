/* ======================================================================== *
 * Copyright 2025 HCL America Inc.                                          *
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
import ActionButton from './ActionButton';

export default {
  title: 'Inputs/ActionButton',
  component: ActionButton,
  argTypes: {
    label: {
      if: { arg: 'interactive' },
      control: 'text',
      description: 'The label to be displayed for the action button.',
    },
    endIcon: {
      if: { arg: 'interactive' },
      control: 'boolean',
      description: 'If true, an icon is displayed at the end of the action button.',
    },
    disabled: {
      if: { arg: 'interactive' },
      control: 'boolean',
      description: 'If true, the action button is disabled.',
    },
    handleClick: {
      if: { arg: 'interactive' },
      action: 'clicked',
      description: 'The function to be called when the action button is clicked.',
    },
  },
} as Meta<typeof ActionButton>;

const InteractiveExampleTemplate: StoryFn<typeof ActionButton> = (args) => {
  return (
    <ActionButton {...args} />
  );
};

export const InteractiveExample = InteractiveExampleTemplate.bind({});
InteractiveExample.parameters = {
  options: { showPanel: true },
};
InteractiveExample.args = {
  // @ts-ignore - this attribute is need to disable all controls in the InteractiveExample, but this attribute is not part of the ActionButtonProps
  interactive: true,
  ...ActionButton.defaultProps,
  endIcon: true,
};
