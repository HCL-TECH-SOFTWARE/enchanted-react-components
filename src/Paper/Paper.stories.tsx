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
import Paper from './Paper';
import PlaceholderArea from '../utils/PlaceholderArea';
import Typography from '../Typography';

export default {
  title: 'Surfaces/Paper',
  component: Paper,
  argTypes: {
    elevation: {
      description: 'The elevation of the Paper component.',
      if: { arg: 'interactive' },
    },
    square: {
      description: 'The square of the Paper component.',
      if: { arg: 'interactive' },
    },
    variant: {
      if: { arg: 'interactive' },
      description: 'The variant of the IconButton.',
      options: ['elevation', 'outlined', 'nopadding'],
      control: { type: 'radio' },
      table: {
        defaultValue: {
          summary: 'primary',
        },
      },
    },
    sx: {
      description: 'https://mui.com/material-ui/react-paper/',
      control: false,
    },
    children: {
      description: 'https://mui.com/material-ui/react-paper/',
      control: false,
    },
    classes: {
      description: 'https://mui.com/material-ui/react-paper/',
      control: false,
    },
    ref: {
      description: 'https://mui.com/material-ui/react-paper/',
      control: false,
    },
  },
} as Meta<typeof Paper>;

const VisualTestTemplate: StoryFn<typeof Paper> = (args) => {
  return (
    <>
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        Paper Variant Elevation
      </Typography>
      <Paper
        sx={{ width: '200px' }}
        variant="elevation"
      >
        <PlaceholderArea height="112px" />
      </Paper>
      &nbsp;
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        Paper Variant Outlined
      </Typography>
      <Paper
        sx={{ width: '200px' }}
        variant="outlined"
      >
        <PlaceholderArea height="112px" />
      </Paper>
      &nbsp;
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        Paper Variant No Padding
      </Typography>
      <Paper
        sx={{ width: '200px' }}
        variant="nopadding"
      >
        <PlaceholderArea height="112px" />
      </Paper>
      &nbsp;
    </>
  );
};

const InteractiveExampleTemplate: StoryFn<typeof Paper> = (args) => {
  return (
    <Paper sx={{ width: '200px' }} {...args}>
      <PlaceholderArea height="112px" />
    </Paper>
  );
};

export const InteractiveExample = InteractiveExampleTemplate.bind({});
InteractiveExample.parameters = {
  options: { showPanel: true },
};
InteractiveExample.args = {
  ...Paper.defaultProps,
  // @ts-ignore - this attribute is need to disable all controls in the InteractiveExample, but this attribute is not part of the PaperProps
  interactive: true,
};

export const VisualTest = VisualTestTemplate.bind({});
VisualTest.parameters = {
  options: { showPanel: false },
};
VisualTest.args = {
};
