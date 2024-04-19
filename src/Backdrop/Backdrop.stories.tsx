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
import { Theme } from '@mui/material';

import Backdrop from './Backdrop';

export default {
  title: 'Feedback/Backdrop',
  component: Backdrop,
  parameters: {
    docs: {
      story: { height: '300px', inline: true },
    },
  },
} as Meta<typeof Backdrop>;

const Template: StoryFn<typeof Backdrop> = (args) => {
  return <Backdrop {...args}>Example Backdrop</Backdrop>;
};

export const ExampleBackdrop = {
  render: Template,

  args: {
    ...Backdrop.defaultProps,
    open: true,
    sx: {
      color: (theme: Theme) => {
        return theme.palette.common.white;
      }, // Color for rendering text label `Example Backdrop` inside story only
    },
  },
};
