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

import IntroductionPage from './IntroductionPage';

export default {
  title: 'Introduction',
  component: IntroductionPage,
} as Meta<typeof IntroductionPage>;

// eslint-why - ...
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: StoryFn<typeof IntroductionPage> = (args) => {
  return <IntroductionPage {...args} />;
};

export const Introduction = {
  render: Template,
};
