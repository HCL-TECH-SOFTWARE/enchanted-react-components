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

import ToggleButton, { ToggleButtonSizes, ToggleButtonVariants } from './ToggleButton';
import Typography from '../Typography';
import Divider from '../Divider';

export default {
  title: 'Inputs/ToggleButton',
  component: ToggleButton,
  parameters: { controls: { sort: 'none' } },
  argTypes: {
    size: {
      if: { arg: 'interactive' },
      description: 'The size of the component',
      options: [ToggleButtonSizes.SMALL, ToggleButtonSizes.MEDIUM],
      control: { type: 'radio' },
      table: {
        defaultValue: {
          summary: 'small',
        },
      },
    },
    variant: {
      if: { arg: 'interactive' },
      description: 'Adds padding to the component',
      table: {
        defaultValue: {
          summary: 'with padding',
        },
      },
    },
    disabled: {
      if: { arg: 'interactive' },
      description: 'Disables the ToggleButton',
    },
    selected: {
      if: { arg: 'interactive' },
      description: 'Set the togglebutton as selected',
    },
    tabIndex: {
      description: 'The tabIndex of the ToggleButton.',
      if: { arg: 'interactive' },
    },
    centerRipple: {
      description: 'The centerRipple of the ToggleButton.',
      if: { arg: 'interactive' },
    },
    disableRipple: {
      description: 'The disableRipple of the ToggleButton.',
      if: { arg: 'interactive' },
    },
    disableTouchRipple: {
      description: 'The disableTouchRipple of the ToggleButton.',
      if: { arg: 'interactive' },
    },
    focusRipple: {
      description: 'The focusRipple of the ToggleButton.',
      if: { arg: 'interactive' },
    },
    disableFocusRipple: {
      description: 'The disableFocusRipple of the ToggleButton.',
      if: { arg: 'interactive' },
    },
    color: {
      table: {
        disable: true,
      },
      description: 'The color of the component.',
    },
    value: {
      description: 'https://mui.com/material-ui/api/toggle-button/#toggle-button-prop-value',
      control: false,
    },
    fullWidth: {
      description: 'https://mui.com/material-ui/api/toggle-button/#toggle-button-prop-fullWidth',
      table: {
        disable: true,
      },
    },
    children: {
      description: 'https://mui.com/material-ui/api/toggle-button/#toggle-button-prop-children',
      control: false,
    },
    classes: {
      description: 'https://mui.com/material-ui/api/toggle-button/#toggle-button-prop-classes',
      control: false,
    },
    onChange: {
      description: 'https://mui.com/material-ui/api/toggle-button/#toggle-button-prop-onChange',
      control: false,
    },
    onClick: {
      description: 'https://mui.com/material-ui/api/toggle-button/#toggle-button-prop-onClick',
      control: false,
    },
    onFocusVisible: {
      description: 'https://mui.com/material-ui/api/button-base/#button-base-prop-onFocusVisible',
      control: false,
    },
    focusVisibleClassName: {
      description: 'https://mui.com/material-ui/api/button-base/#button-base-prop-focusVisibleClassName',
      control: false,
    },
    sx: {
      description: 'https://mui.com/material-ui/api/toggle-button/#toggle-button-prop-sx',
      control: false,
    },
    action: {
      description: 'https://mui.com/material-ui/api/button-base/#button-base-prop-action',
      control: false,
    },
    LinkComponent: {
      description: 'https://mui.com/material-ui/api/button-base/#button-base-prop-LinkComponent',
      control: false,
    },
    TouchRippleProps: {
      description: 'https://mui.com/material-ui/api/button-base/#button-base-prop-TouchRippleProps',
      control: false,
    },
    touchRippleRef: {
      description: 'https://mui.com/material-ui/api/button-base/#button-base-prop-touchRippleRef',
      control: false,
    },
    ref: {
      control: false,
      description: 'https://mui.com/material-ui/api/toggle-button/',
    },
  },
} as Meta<typeof ToggleButton>;

const VisualTestTemplate: StoryFn<typeof ToggleButton> = (args) => {
  return (
    <Grid container spacing={30}>
      <Grid item>
        <Grid container direction="column">
          <Grid item paddingBottom={0}>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              ToggleButton small With Padding
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
                <ToggleButton
                  value="default"
                  size={ToggleButtonSizes.SMALL}
                  variant={ToggleButtonVariants.WITH_PADDING}
                >
                  <IconAdd />
                </ToggleButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Focus
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButton
                  value="default"
                  size={ToggleButtonSizes.SMALL}
                  className="force-to-focus"
                >
                  <IconAdd />
                </ToggleButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Hover & Focus
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButton
                  value="default"
                  size={ToggleButtonSizes.SMALL}
                  className="force-to-focusHover"
                >
                  <IconAdd />
                </ToggleButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Disabled
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButton
                  value="default"
                  size={ToggleButtonSizes.SMALL}
                  disabled
                >
                  <IconAdd />
                </ToggleButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButton
                  value="default"
                  size={ToggleButtonSizes.SMALL}
                  selected
                >
                  <IconAdd />
                </ToggleButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected & Focus
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButton
                  value="default"
                  size={ToggleButtonSizes.SMALL}
                  selected
                  className="force-to-focus"
                >
                  <IconAdd />
                </ToggleButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected Hover & Focus
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButton
                  value="default"
                  size={ToggleButtonSizes.SMALL}
                  selected
                  className="force-to-focusHover"
                >
                  <IconAdd />
                </ToggleButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected Disabled
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButton
                  value="default"
                  size={ToggleButtonSizes.SMALL}
                  selected
                  disabled
                >
                  <IconAdd />
                </ToggleButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item paddingTop={5}>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              ToggleButton small Without Padding
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
                <ToggleButton
                  value="default"
                  size={ToggleButtonSizes.SMALL}
                  variant={ToggleButtonVariants.WITHOUT_PADDING}
                >
                  <IconAdd />
                </ToggleButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Focus
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButton
                  value="default"
                  size={ToggleButtonSizes.SMALL}
                  className="force-to-focus"
                  variant={ToggleButtonVariants.WITHOUT_PADDING}
                >
                  <IconAdd />
                </ToggleButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Hover & Focus
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButton
                  value="default"
                  size={ToggleButtonSizes.SMALL}
                  className="force-to-focusHover"
                  variant={ToggleButtonVariants.WITHOUT_PADDING}
                >
                  <IconAdd />
                </ToggleButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Disabled
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButton
                  value="default"
                  size={ToggleButtonSizes.SMALL}
                  variant={ToggleButtonVariants.WITHOUT_PADDING}
                  disabled
                >
                  <IconAdd />
                </ToggleButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButton
                  value="default"
                  size={ToggleButtonSizes.SMALL}
                  variant={ToggleButtonVariants.WITHOUT_PADDING}
                  selected
                >
                  <IconAdd />
                </ToggleButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected & Focus
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButton
                  value="default"
                  size={ToggleButtonSizes.SMALL}
                  variant={ToggleButtonVariants.WITHOUT_PADDING}
                  selected
                  className="force-to-focus"
                >
                  <IconAdd />
                </ToggleButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected Hover & Focus
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButton
                  value="default"
                  size={ToggleButtonSizes.SMALL}
                  variant={ToggleButtonVariants.WITHOUT_PADDING}
                  selected
                  className="force-to-focusHover"
                >
                  <IconAdd />
                </ToggleButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected Disabled
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButton
                  value="default"
                  size={ToggleButtonSizes.SMALL}
                  variant={ToggleButtonVariants.WITHOUT_PADDING}
                  selected
                  disabled
                >
                  <IconAdd />
                </ToggleButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column">
          <Grid item paddingBottom={0}>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              ToggleButton medium With Padding
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
                <ToggleButton
                  value="default"
                  size={ToggleButtonSizes.MEDIUM}
                  variant={ToggleButtonVariants.WITH_PADDING}
                >
                  <IconAdd />
                </ToggleButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Focus
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButton
                  value="default"
                  size={ToggleButtonSizes.MEDIUM}
                  variant={ToggleButtonVariants.WITH_PADDING}
                  className="force-to-focus"
                >
                  <IconAdd />
                </ToggleButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Hover & Focus
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButton
                  value="default"
                  size={ToggleButtonSizes.MEDIUM}
                  variant={ToggleButtonVariants.WITH_PADDING}
                  className="force-to-focusHover"
                >
                  <IconAdd />
                </ToggleButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Disabled
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButton
                  value="default"
                  size={ToggleButtonSizes.MEDIUM}
                  variant={ToggleButtonVariants.WITH_PADDING}
                  disabled
                >
                  <IconAdd />
                </ToggleButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButton
                  value="default"
                  size={ToggleButtonSizes.MEDIUM}
                  variant={ToggleButtonVariants.WITH_PADDING}
                  selected
                >
                  <IconAdd />
                </ToggleButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected & Focus
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButton
                  value="default"
                  size={ToggleButtonSizes.MEDIUM}
                  variant={ToggleButtonVariants.WITH_PADDING}
                  selected
                  className="force-to-focus"
                >
                  <IconAdd />
                </ToggleButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected Hover & Focus
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButton
                  value="default"
                  size={ToggleButtonSizes.MEDIUM}
                  variant={ToggleButtonVariants.WITH_PADDING}
                  selected
                  className="force-to-focusHover"
                >
                  <IconAdd />
                </ToggleButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected Disabled
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButton
                  value="default"
                  size={ToggleButtonSizes.MEDIUM}
                  variant={ToggleButtonVariants.WITH_PADDING}
                  selected
                  disabled
                >
                  <IconAdd />
                </ToggleButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item paddingTop={3}>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              ToggleButton medium Without Padding
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
                <ToggleButton
                  value="default"
                  size={ToggleButtonSizes.MEDIUM}
                  variant={ToggleButtonVariants.WITHOUT_PADDING}
                >
                  <IconAdd />
                </ToggleButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Focus
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButton
                  value="default"
                  size={ToggleButtonSizes.MEDIUM}
                  className="force-to-focus"
                  variant={ToggleButtonVariants.WITHOUT_PADDING}
                >
                  <IconAdd />
                </ToggleButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Hover & Focus
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButton
                  value="default"
                  size={ToggleButtonSizes.MEDIUM}
                  className="force-to-focusHover"
                  variant={ToggleButtonVariants.WITHOUT_PADDING}
                >
                  <IconAdd />
                </ToggleButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Disabled
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButton
                  value="default"
                  size={ToggleButtonSizes.MEDIUM}
                  variant={ToggleButtonVariants.WITHOUT_PADDING}
                  disabled
                >
                  <IconAdd />
                </ToggleButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButton
                  value="default"
                  size={ToggleButtonSizes.MEDIUM}
                  variant={ToggleButtonVariants.WITHOUT_PADDING}
                  selected
                >
                  <IconAdd />
                </ToggleButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected & Focus
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButton
                  value="default"
                  size={ToggleButtonSizes.MEDIUM}
                  variant={ToggleButtonVariants.WITHOUT_PADDING}
                  selected
                  className="force-to-focus"
                >
                  <IconAdd />
                </ToggleButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected Hover & Focus
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButton
                  value="default"
                  size={ToggleButtonSizes.MEDIUM}
                  variant={ToggleButtonVariants.WITHOUT_PADDING}
                  selected
                  className="force-to-focusHover"
                >
                  <IconAdd />
                </ToggleButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected Disabled
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <ToggleButton
                  value="default"
                  size={ToggleButtonSizes.MEDIUM}
                  variant={ToggleButtonVariants.WITHOUT_PADDING}
                  selected
                  disabled
                >
                  <IconAdd />
                </ToggleButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const InteractiveExampleTemplate: StoryFn<typeof ToggleButton> = (args) => {
  return (
    <ToggleButton
      {...args}
    >
      <IconAdd />
    </ToggleButton>
  );
};

export const InteractiveExample = InteractiveExampleTemplate.bind({});
InteractiveExample.parameters = {
  options: { showPanel: true },
};
InteractiveExample.args = {
  size: ToggleButtonSizes.SMALL,
  variant: ToggleButtonVariants.WITH_PADDING,
  disabled: false,
  selected: false,
  ...ToggleButton.defaultProps,
  // @ts-ignore - this attribute is need to disable all controls in the InteractiveExample, but this attribute is not part of the IconButtonProps
  interactive: true,
};

export const VisualTest = VisualTestTemplate.bind({});
VisualTest.parameters = {
  options: { showPanel: false },
};
VisualTest.args = {
};
