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
import IconButton, { IconButtonSizes, IconButtonVariants } from './IconButton';
import Typography from '../Typography';
import Divider from '../Divider';

export default {
  title: 'Data display/IconButton',
  component: IconButton,
  argTypes: {
    size: {
      if: { arg: 'interactive' },
      description: 'The size of the component',
      options: [IconButtonSizes.SMALL, IconButtonSizes.MEDIUM], // As requested by UIUX, hide Large control from Storybook for now
      control: { type: 'radio' },
      table: {
        defaultValue: {
          summary: 'small',
        },
      },
    },
    variant: {
      if: { arg: 'interactive' },
      description: 'Adds padding to the button',
      table: {
        defaultValue: {
          summary: 'without padding',
        },
      },
    },
    color: {
      if: { arg: 'interactive' },
      options: ['default'],
      control: { type: 'radio' },
      description: 'The color of the component.',
    },
    selected: {
      description: 'Set IconButton as selected.',
      if: { arg: 'interactive' },
    },
    showendicon: {
      description: 'Show endIcon if set to true.',
      if: { arg: 'interactive' },
    },
    label: {
      description: 'Label of the IconButton',
      if: { arg: 'interactive' },
    },
    tabIndex: {
      description: 'The tabIndex of the IconButton.',
      if: { arg: 'interactive' },
    },
    disabled: {
      description: 'The disabled of the IconButton.',
      if: { arg: 'interactive' },
    },
    centerRipple: {
      description: 'The centerRipple of the IconButton.',
      if: { arg: 'interactive' },
    },
    disableRipple: {
      description: 'The disableRipple of the IconButton.',
      if: { arg: 'interactive' },
    },
    disableTouchRipple: {
      description: 'The disableTouchRipple of the IconButton.',
      if: { arg: 'interactive' },
    },
    focusRipple: {
      description: 'The focusRipple of the IconButton.',
      if: { arg: 'interactive' },
    },
    disableFocusRipple: {
      description: 'The disableFocusRipple of the IconButton.',
      if: { arg: 'interactive' },
    },
    edge: {
      if: { arg: 'interactive' },
      description: 'The edge of the IconButton.',
      options: ['false', 'end', 'start'],
      control: { type: 'radio' },
      table: {
        disable: true,
        defaultValue: {
          summary: 'primary',
        },
      },
    },
    children: {
      description: 'https://mui.com/material-ui/api/icon-button/#icon-button-prop-children',
      control: false,
    },
    classes: {
      description: 'https://mui.com/material-ui/api/icon-button/#icon-button-prop-classes',
      control: false,
    },
    sx: {
      description: 'https://mui.com/material-ui/api/icon-button/#icon-button-prop-sx',
      control: false,
    },
    ref: {
      description: 'https://mui.com/material-ui/api/icon-button/',
      control: false,
    },
    action: {
      description: 'https://mui.com/material-ui/api/icon-button/',
      control: false,
    },
    focusVisibleClassName: {
      description: 'https://mui.com/material-ui/api/button-base/#button-base-prop-focusVisibleClassName',
      control: false,
    },
    LinkComponent: {
      description: 'https://mui.com/material-ui/api/button-base/#button-base-prop-LinkComponent',
      control: false,
    },
    onFocusVisible: {
      description: 'https://mui.com/material-ui/api/button-base/#button-base-prop-onFocusVisible',
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
  },
} as Meta<typeof IconButton>;

const VisualTestTemplate: StoryFn<typeof IconButton> = (args) => {
  return (
    <Grid container spacing={30}>
      <Grid item>
        <Grid container direction="column">
          <Grid item paddingBottom={0}>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              IconButton small With Padding
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
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITH_PADDING}
                >
                  <IconAdd />
                </IconButton>
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
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITH_PADDING}
                  className="force-to-focus"
                >
                  <IconAdd />
                </IconButton>
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
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITH_PADDING}
                  className="force-to-focusHover"
                >
                  <IconAdd />
                </IconButton>
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
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITH_PADDING}
                  disabled
                >
                  <IconAdd />
                </IconButton>
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
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITH_PADDING}
                  selected
                >
                  <IconAdd />
                </IconButton>
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
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITH_PADDING}
                  selected
                  className="force-to-focus"
                >
                  <IconAdd />
                </IconButton>
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
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITH_PADDING}
                  selected
                  className="force-to-focusHover"
                >
                  <IconAdd />
                </IconButton>
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
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITH_PADDING}
                  selected
                  disabled
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Active with End Icon
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITH_PADDING}
                  showendicon
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Focus with End Icon
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITH_PADDING}
                  showendicon
                  className="force-to-focus"
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Hover & Focus with End Icon
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITH_PADDING}
                  showendicon
                  className="force-to-focusHover"
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Disabled with End Icon
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITH_PADDING}
                  showendicon
                  disabled
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected with End Icon
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITH_PADDING}
                  showendicon
                  selected
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected & Focus with End Icon
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITH_PADDING}
                  showendicon
                  selected
                  className="force-to-focus"
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected Hover & Focus with End Icon
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITH_PADDING}
                  showendicon
                  selected
                  className="force-to-focusHover"
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected Disabled with End Icon
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITH_PADDING}
                  showendicon
                  selected
                  disabled
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Active with Label
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITH_PADDING}
                  label="Label"
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Focus with Label
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITH_PADDING}
                  label="Label"
                  className="force-to-focus"
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Hover & Focus with Label
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITH_PADDING}
                  label="Label"
                  className="force-to-focusHover"
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Disabled with Label
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITH_PADDING}
                  label="Label"
                  disabled
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected with Label
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITH_PADDING}
                  label="Label"
                  selected
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected & Focus with Label
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITH_PADDING}
                  label="Label"
                  selected
                  className="force-to-focus"
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected Hover & Focus with Label
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITH_PADDING}
                  label="Label"
                  selected
                  className="force-to-focusHover"
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected Disabled with Label
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITH_PADDING}
                  label="Label"
                  selected
                  disabled
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item paddingTop={5}>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              IconButton small Without Padding
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
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                >
                  <IconAdd />
                </IconButton>
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
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  className="force-to-focus"
                  variant={IconButtonVariants.WITHOUT_PADDING}
                >
                  <IconAdd />
                </IconButton>
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
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  className="force-to-focusHover"
                  variant={IconButtonVariants.WITHOUT_PADDING}
                >
                  <IconAdd />
                </IconButton>
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
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  disabled
                >
                  <IconAdd />
                </IconButton>
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
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  selected
                >
                  <IconAdd />
                </IconButton>
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
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  selected
                  className="force-to-focus"
                >
                  <IconAdd />
                </IconButton>
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
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  selected
                  className="force-to-focusHover"
                >
                  <IconAdd />
                </IconButton>
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
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  selected
                  disabled
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Active with End Icon
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  showendicon
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Focus with End Icon
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  className="force-to-focus"
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  showendicon
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Hover & Focus with End Icon
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  className="force-to-focusHover"
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  showendicon
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Disabled with End Icon
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  showendicon
                  disabled
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected with End Icon
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  showendicon
                  selected
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected & Focus with End Icon
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  showendicon
                  selected
                  className="force-to-focus"
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected Hover & Focus with End Icon
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  showendicon
                  selected
                  className="force-to-focusHover"
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected Disabled with End Icon
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  showendicon
                  selected
                  disabled
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Active with Label
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  label="Label"
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Focus with Label
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  className="force-to-focus"
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  label="Label"
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Hover & Focus with Label
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  className="force-to-focusHover"
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  label="Label"
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Disabled with Label
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  label="Label"
                  disabled
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected with Label
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  label="Label"
                  selected
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected & Focus with Label
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  label="Label"
                  selected
                  className="force-to-focus"
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected Hover & Focus with Label
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  label="Label"
                  selected
                  className="force-to-focusHover"
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected Disabled with Label
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.SMALL}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  label="Label"
                  selected
                  disabled
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column">
          <Grid item paddingBottom={0}>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              IconButton medium With Padding
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
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITH_PADDING}
                >
                  <IconAdd />
                </IconButton>
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
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITH_PADDING}
                  className="force-to-focus"
                >
                  <IconAdd />
                </IconButton>
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
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITH_PADDING}
                  className="force-to-focusHover"
                >
                  <IconAdd />
                </IconButton>
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
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITH_PADDING}
                  disabled
                >
                  <IconAdd />
                </IconButton>
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
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITH_PADDING}
                  selected
                >
                  <IconAdd />
                </IconButton>
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
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITH_PADDING}
                  selected
                  className="force-to-focus"
                >
                  <IconAdd />
                </IconButton>
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
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITH_PADDING}
                  selected
                  className="force-to-focusHover"
                >
                  <IconAdd />
                </IconButton>
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
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITH_PADDING}
                  selected
                  disabled
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Active with End Icon
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITH_PADDING}
                  showendicon
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Focus with End Icon
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITH_PADDING}
                  showendicon
                  className="force-to-focus"
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Hover & Focus with End Icon
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITH_PADDING}
                  showendicon
                  className="force-to-focusHover"
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Disabled with End Icon
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITH_PADDING}
                  showendicon
                  disabled
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected with End Icon
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITH_PADDING}
                  showendicon
                  selected
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected & Focus with End Icon
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITH_PADDING}
                  showendicon
                  selected
                  className="force-to-focus"
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected Hover & Focus with End Icon
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITH_PADDING}
                  showendicon
                  selected
                  className="force-to-focusHover"
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected Disabled with End Icon
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITH_PADDING}
                  showendicon
                  selected
                  disabled
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Active with Label
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITH_PADDING}
                  label="Label"
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Focus with Label
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITH_PADDING}
                  label="Label"
                  className="force-to-focus"
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Hover & Focus with Label
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITH_PADDING}
                  label="Label"
                  className="force-to-focusHover"
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Disabled with Label
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITH_PADDING}
                  label="Label"
                  disabled
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected with Label
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITH_PADDING}
                  label="Label"
                  selected
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected & Focus with Label
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITH_PADDING}
                  label="Label"
                  selected
                  className="force-to-focus"
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected Hover & Focus with Label
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITH_PADDING}
                  label="Label"
                  selected
                  className="force-to-focusHover"
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected Disabled with Label
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITH_PADDING}
                  label="Label"
                  selected
                  disabled
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item paddingTop={3}>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              IconButton medium Without Padding
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
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                >
                  <IconAdd />
                </IconButton>
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
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  className="force-to-focus"
                  variant={IconButtonVariants.WITHOUT_PADDING}
                >
                  <IconAdd />
                </IconButton>
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
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  className="force-to-focusHover"
                  variant={IconButtonVariants.WITHOUT_PADDING}
                >
                  <IconAdd />
                </IconButton>
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
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  disabled
                >
                  <IconAdd />
                </IconButton>
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
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  selected
                >
                  <IconAdd />
                </IconButton>
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
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  selected
                  className="force-to-focus"
                >
                  <IconAdd />
                </IconButton>
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
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  selected
                  className="force-to-focusHover"
                >
                  <IconAdd />
                </IconButton>
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
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  selected
                  disabled
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Active with End Icon
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  showendicon
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Focus with End Icon
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  showendicon
                  className="force-to-focus"
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Hover & Focus with End Icon
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  showendicon
                  className="force-to-focusHover"
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Disabled with End Icon
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  showendicon
                  disabled
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected with End Icon
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  showendicon
                  selected
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected & Focus with End Icon
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  showendicon
                  selected
                  className="force-to-focus"
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected Hover & Focus with End Icon
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  showendicon
                  selected
                  className="force-to-focusHover"
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected Disabled with End Icon
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  showendicon
                  selected
                  disabled
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Active with Label
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  label="Label"
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Focus with Label
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  label="Label"
                  className="force-to-focus"
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Hover & Focus with Label
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  label="Label"
                  className="force-to-focusHover"
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Disabled with Label
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  label="Label"
                  disabled
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected with Label
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  label="Label"
                  selected
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected & Focus with Label
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  label="Label"
                  selected
                  className="force-to-focus"
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected Hover & Focus with Label
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  label="Label"
                  selected
                  className="force-to-focusHover"
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Selected Disabled with Label
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={3} paddingBottom={2}>
                <IconButton
                  value="default"
                  size={IconButtonSizes.MEDIUM}
                  variant={IconButtonVariants.WITHOUT_PADDING}
                  label="Label"
                  selected
                  disabled
                >
                  <IconAdd />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const InteractiveExampleTemplate: StoryFn<typeof IconButton> = (args) => {
  return (
    <IconButton
      {...args}
    >
      <IconAdd />
    </IconButton>
  );
};

export const InteractiveExample = InteractiveExampleTemplate.bind({});
InteractiveExample.parameters = {
  options: { showPanel: true },
};
InteractiveExample.args = {
  ...IconButton.defaultProps,
  // @ts-ignore - this attribute is need to disable all controls in the InteractiveExample, but this attribute is not part of the IconButtonProps
  interactive: true,
};

export const VisualTest = VisualTestTemplate.bind({});
VisualTest.parameters = {
  options: { showPanel: false },
};
VisualTest.args = {
};
