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
import Stack from '@mui/material/Stack';

import Skeleton from './Skeleton';

export default {
  title: 'Data display/Skeleton',
  component: Skeleton,
} as Meta<typeof Skeleton>;

const Template: StoryFn<typeof Skeleton> = (args) => {
  return (
    <Stack spacing={1}>
      <Skeleton {...args} sx={{ fontSize: '1rem' }} />
      <Skeleton {...args} width={40} height={40} />
      <Skeleton {...args} width={210} height={60} />
      <Skeleton {...args} width={210} height={60} />
    </Stack>
  );
};

export const ExampleSkeleton = Template.bind({});

ExampleSkeleton.args = {
  ...Skeleton.defaultProps,
  animation: false,
};
