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
import { Grid } from '@mui/material';
import Divider, { DividerTypes } from './Divider';
import Typography from '../Typography';

export default {
  title: 'Data display/Divider',
  component: Divider,
  argTypes: {
    type: {
      if: { arg: 'interactive' },
      description: 'The type of the Divider. It can be primary, secondary or with margin.',
      options: [DividerTypes.PRIMARY, DividerTypes.SECONDARY, DividerTypes.WITHMARGIN],
      control: { type: 'radio' },
      table: {
        defaultValue: {
          summary: 'primary',
        },
      },
    },
    orientation: {
      if: { arg: 'interactive' },
      description: 'The orientation of the Divider.',
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
      table: {
        defaultValue: {
          summary: 'horizontal',
        },
      },
    },
    // light is the property we want to remove from the UI
    light: {
      control: false,
      description: 'https://mui.com/material-ui/api/divider/#divider-prop-light',
    },
    // absolute is the property we want to remove from the UI
    absolute: {
      control: false,
      description: 'https://mui.com/material-ui/api/divider/#divider-prop-absolute',
    },
    // flexItem is the property we want to remove from the UI
    flexItem: {
      control: false,
      description: 'https://mui.com/material-ui/api/divider/#divider-prop-flexItem',
    },
    // textAlign is the property we want to remove from the UI
    textAlign: {
      control: false,
      description: 'https://mui.com/material-ui/api/divider/#divider-prop-textAlign',
    },
    // variant is the property we want to remove from the UI
    variant: {
      control: false,
      description: 'https://mui.com/material-ui/api/divider/#divider-prop-variant',
    },
    children: {
      control: false,
      description: 'https://mui.com/material-ui/api/divider/#divider-prop-children',
    },
    classes: {
      control: false,
      description: 'https://mui.com/material-ui/api/divider/#divider-prop-classes',
    },
    sx: {
      control: false,
      description: 'https://mui.com/material-ui/api/divider/#divider-prop-sx',
    },
    ref: {
      description: 'https://mui.com/material-ui/api/divider/',
      control: false,
    },
  },
} as Meta<typeof Divider>;

const VisualTestTemplate: StoryFn<typeof Divider> = (args) => {
  return (
    <>
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        Divider Horizontal
      </Typography>
      <Grid
        container
        sx={{ height: '0' }} // Setting height of container in vertical orientation as divider takes container height in vertical
      >
        <Divider
          orientation="horizontal"
        />
      </Grid>
      &nbsp;
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        Divider Vertical
      </Typography>
      <Grid
        container
        sx={{ height: '95vh' }} // Setting height of container in vertical orientation as divider takes container height in vertical
      >
        <Divider
          orientation="vertical"
        />
      </Grid>
      &nbsp;
    </>
  );
};

const InteractiveExampleTemplate: StoryFn<typeof Divider> = (args) => {
  return (
    <Grid
      container
      sx={{ height: args.orientation === 'vertical' ? '95vh' : '0' }} // Setting height of container in vertical orientation as divider takes container height in vertical
    >
      <Divider
        {...args}
      />
    </Grid>
  );
};

export const InteractiveExample = InteractiveExampleTemplate.bind({});
InteractiveExample.parameters = {
  options: { showPanel: true },
};
InteractiveExample.args = {
  ...Divider.defaultProps,
  // @ts-ignore - this attribute is need to disable all controls in the InteractiveExample, but this attribute is not part of the DividerProps
  interactive: true,
  orientation: 'horizontal',
};
export const VisualTest = VisualTestTemplate.bind({});
VisualTest.parameters = {
  options: { showPanel: false },
};
VisualTest.args = {
};
