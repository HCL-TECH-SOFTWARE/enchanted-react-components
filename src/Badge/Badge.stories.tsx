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
import MailIcon from '@hcl-software/enchanted-icons/dist/carbon/es/email';
import { Grid } from '@mui/material';

import Badge from './Badge';
import Typography from '../Typography';

export default {
  title: 'Data display/Badge',
  component: Badge,
  argTypes: {
    badgeContent: {
      description: 'The badgeContent of the Badge.',
      if: { arg: 'interactive' },
    },
    color: {
      description: 'https://mui.com/material-ui/api/badge/#badge-prop-color',
      if: { arg: 'interactive' },
    },
    overlap: {
      description: 'overlap of Badge component.',
      options: ['circular', 'rectangular'],
      control: { type: 'radio' },
      if: { arg: 'interactive' },
    },
    variant: {
      description: 'Variant of Badge component.',
      options: ['dot', 'standard'],
      control: { type: 'radio' },
      if: { arg: 'interactive' },
    },
    ref: {
      description: 'https://mui.com/material-ui/api/badge/',
      control: false,
    },
    anchorOrigin: {
      description: 'https://mui.com/material-ui/api/badge/#badge-prop-anchorOrigin',
      control: false,
    },
    classes: {
      description: 'https://mui.com/material-ui/api/badge/#badge-prop-classes',
      control: false,
    },
    sx: {
      description: 'sx of Badge component.',
      control: false,
    },
  },
} as Meta<typeof Badge>;

const VisualTestTemplate: StoryFn<typeof Badge> = (args) => {
  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
          Badge Circular Overlap
        </Typography>
      </Grid>
      <Grid item>
        <Badge
          overlap="circular"
        >
          <MailIcon color="action" />
        </Badge>
      </Grid>
      <Grid item>
        <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
          Badge Rectangular Overlap
        </Typography>
      </Grid>
      <Grid item>
        <Badge
          overlap="rectangular"
        >
          <MailIcon color="action" />
        </Badge>
      </Grid>
      <Grid item>
        <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
          Badge Dot
        </Typography>
      </Grid>
      <Grid item>
        <Badge
          variant="dot"
        >
          <MailIcon color="action" />
        </Badge>
      </Grid>
      <Grid item>
        <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
          Badge Standard
        </Typography>
      </Grid>
      <Grid item>
        <Badge
          variant="standard"
        >
          <MailIcon color="action" />
        </Badge>
      </Grid>
    </Grid>
  );
};

const InteractiveExampleTemplate: StoryFn<typeof Badge> = (args) => { return <Badge {...args}><MailIcon color="action" /></Badge>; };

export const InteractiveExample = InteractiveExampleTemplate.bind({});
InteractiveExample.parameters = {
  options: { showPanel: true },
};
InteractiveExample.args = {
  ...Badge.defaultProps,
  // @ts-ignore - this attribute is need to disable all controls in the InteractiveExample, but this attribute is not part of the BadgeProps
  interactive: true,
  badgeContent: 4,
};

export const VisualTest = VisualTestTemplate.bind({});
VisualTest.parameters = {
  options: { showPanel: false },
};
VisualTest.args = {
  badgeContent: 4,
};
