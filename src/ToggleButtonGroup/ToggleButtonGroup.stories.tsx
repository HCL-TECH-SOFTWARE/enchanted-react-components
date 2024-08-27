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
import IconAdd from '@hcl-software/enchanted-icons/dist/carbon/es/add';
import { Grid } from '@mui/material';

import ToggleButtonGroup, { ToggleButtonGroupSizes } from './ToggleButtonGroup';
import Typography from '../Typography';
import Divider from '../Divider';
import ToggleButton from '../ToggleButton/ToggleButton';

export default {
  title: 'Inputs/ToggleButtonGroup',
  component: ToggleButtonGroup,
  argTypes: {
    size: {
      if: { arg: 'interactive' },
      description: 'The size of the component',
      options: [ToggleButtonGroupSizes.SMALL, ToggleButtonGroupSizes.MEDIUM],
      control: { type: 'radio' },
      table: {
        defaultValue: {
          summary: 'small',
        },
      },
    },
    disabled: {
      if: { arg: 'interactive' },
      description: 'Disables the ToggleButton',
    },
    exclusive: {
      if: { arg: 'interactive' },
      description: 'If value is exclusive or not',
    },
    orientation: {
      description: 'Orientation',
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
    },
    color: {
      table: {
        disable: true,
      },
      description: 'The color of the component.',
    },
    value: {
      description: 'https://mui.com/material-ui/api/toggle-button-group/#toggle-button-group-prop-value',
      control: false,
    },
    fullWidth: {
      description: 'https://mui.com/material-ui/api/toggle-button-group/#toggle-button-group-prop-fullWidth',
      table: {
        disable: true,
      },
    },
    children: {
      description: 'https://mui.com/material-ui/api/toggle-button-group/#toggle-button-group-prop-children',
      control: false,
    },
    classes: {
      description: 'https://mui.com/material-ui/api/toggle-button-group/#toggle-button-group-prop-classes',
      control: false,
    },
    onChange: {
      description: 'https://mui.com/material-ui/api/toggle-button-group/#toggle-button-group-prop-onChange',
      control: false,
    },
    sx: {
      description: 'https://mui.com/material-ui/api/toggle-button-group/#toggle-button-group-prop-sx',
      control: false,
    },
    ref: {
      control: false,
      description: 'https://mui.com/material-ui/api/toggle-button-group/',
    },
  },
} as Meta<typeof ToggleButtonGroup>;

const VisualTestTemplate: StoryFn<typeof ToggleButtonGroup> = (args) => {
  return (
    <Grid container spacing={30}>
      <Grid item>
        <Grid container direction="column">
          <Grid item paddingBottom={0}>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              ToggleButtonGroup small
            </Typography>
          </Grid>
          <Divider />
          <Grid item paddingTop={1}>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Active
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButtonGroup
                  size={ToggleButtonGroupSizes.SMALL}
                >
                  <ToggleButton
                    value="default1"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default2"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default3"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default4"
                  >
                    <IconAdd />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </Grid>
          <Grid item paddingTop={1}>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected 1st button
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButtonGroup
                  size={ToggleButtonGroupSizes.SMALL}
                  value="default1"
                >
                  <ToggleButton
                    value="default1"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default2"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default3"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default4"
                  >
                    <IconAdd />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </Grid>
          <Grid item paddingTop={1}>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected 2nd button
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButtonGroup
                  size={ToggleButtonGroupSizes.SMALL}
                  value="default2"
                >
                  <ToggleButton
                    value="default1"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default2"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default3"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default4"
                  >
                    <IconAdd />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </Grid>
          <Grid item paddingTop={1}>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected 3rd button
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButtonGroup
                  size={ToggleButtonGroupSizes.SMALL}
                  value="default3"
                >
                  <ToggleButton
                    value="default1"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default2"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default3"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default4"
                  >
                    <IconAdd />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </Grid>
          <Grid item paddingTop={1}>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected 4th button
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButtonGroup
                  size={ToggleButtonGroupSizes.SMALL}
                  value="default4"
                >
                  <ToggleButton
                    value="default1"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default2"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default3"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default4"
                  >
                    <IconAdd />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </Grid>
          <Grid item paddingTop={1}>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Disabled
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButtonGroup
                  size={ToggleButtonGroupSizes.SMALL}
                  disabled
                >
                  <ToggleButton
                    value="default1"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default2"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default3"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default4"
                  >
                    <IconAdd />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column">
          <Grid item paddingBottom={0}>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              ToggleButtonGroup medium
            </Typography>
          </Grid>
          <Divider />
          <Grid item paddingTop={1}>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Active
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButtonGroup
                  size={ToggleButtonGroupSizes.MEDIUM}
                >
                  <ToggleButton
                    value="default1"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default2"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default3"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default4"
                  >
                    <IconAdd />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </Grid>
          <Grid item paddingTop={1}>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected 1st button
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButtonGroup
                  size={ToggleButtonGroupSizes.MEDIUM}
                  value="default1"
                >
                  <ToggleButton
                    value="default1"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default2"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default3"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default4"
                  >
                    <IconAdd />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </Grid>
          <Grid item paddingTop={1}>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected 2nd button
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButtonGroup
                  size={ToggleButtonGroupSizes.MEDIUM}
                  value="default2"
                >
                  <ToggleButton
                    value="default1"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default2"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default3"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default4"
                  >
                    <IconAdd />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </Grid>
          <Grid item paddingTop={1}>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected 3rd button
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButtonGroup
                  size={ToggleButtonGroupSizes.MEDIUM}
                  value="default3"
                >
                  <ToggleButton
                    value="default1"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default2"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default3"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default4"
                  >
                    <IconAdd />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </Grid>
          <Grid item paddingTop={1}>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected 4th button
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButtonGroup
                  size={ToggleButtonGroupSizes.MEDIUM}
                  value="default4"
                >
                  <ToggleButton
                    value="default1"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default2"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default3"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default4"
                  >
                    <IconAdd />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </Grid>
          <Grid item paddingTop={1}>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Disabled
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButtonGroup
                  size={ToggleButtonGroupSizes.MEDIUM}
                  disabled
                >
                  <ToggleButton
                    value="default1"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default2"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default3"
                  >
                    <IconAdd />
                  </ToggleButton>
                  <ToggleButton
                    value="default4"
                  >
                    <IconAdd />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const InteractiveExampleTemplate: StoryFn<typeof ToggleButtonGroup> = (args) => {
  return (
    <ToggleButtonGroup
      {...args}
    >
      <ToggleButton
        value="sample"
      >
        <IconAdd />
      </ToggleButton>
      <ToggleButton
        value="sample2"
      >
        <IconAdd />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export const InteractiveExample = InteractiveExampleTemplate.bind({});
InteractiveExample.parameters = {
  options: { showPanel: true },
};
InteractiveExample.args = {
  ...ToggleButtonGroup.defaultProps,
  // @ts-ignore - this attribute is need to disable all controls in the InteractiveExample, but this attribute is not part of the IconButtonProps
  interactive: true,
};

export const VisualTest = VisualTestTemplate.bind({});
VisualTest.parameters = {
  options: { showPanel: false },
};
VisualTest.args = {
};
