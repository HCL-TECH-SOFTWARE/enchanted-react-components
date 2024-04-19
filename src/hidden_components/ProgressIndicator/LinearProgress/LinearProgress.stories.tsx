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
import {
  StoryFn,
  Meta,
} from '@storybook/react';

import LinearProgress from './LinearProgress';

// Agreed with UIUX to simply hide LinearProgress from Storybook since no Figma design yet but we might include in the future
export default {
  title: 'Feedback/ProgressIndicator/LinearProgress',
  component: LinearProgress,
} as Meta<typeof LinearProgress>;

const Template: StoryFn<typeof LinearProgress> = (args) => {
  return <LinearProgress {...args} />;
};

export const ExampleLinearProgress = {
  render: Template,

  args: {
    ...LinearProgress.defaultProps,
  },
};
