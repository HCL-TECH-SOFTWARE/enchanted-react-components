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

import IconStart from '@hcl-software/enchanted-icons/dist/carbon/es/add';
import IconEnd from '@hcl-software/enchanted-icons/dist/carbon/es/caret--down';
import Typography from '../Typography';
import Divider from '../Divider';
import Button, { ButtonVariants } from './Button';

export default {
  title: 'Inputs/Button',
  component: Button,
  argTypes: {
    onClick: {
      if: { arg: 'interactive' },
      action: 'clicked',
    },
    startIcon: {
      description: 'startIcon of Button component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    href: {
      description: 'href of Button component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    endIcon: {
      description: 'endIcon of Button component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    disableFocusRipple: {
      description: 'disableFocusRipple of Button component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    disableElevation: {
      description: 'disableElevation of Button component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    touchRippleRef: {
      description: 'touchRippleRef of Button component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    TouchRippleProps: {
      description: 'TouchRippleProps of Button component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    onFocusVisible: {
      description: 'onFocusVisible of Button component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    LinkComponent: {
      description: 'LinkComponent of Button component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    focusVisibleClassName: {
      description: 'focusVisibleClassName of Button component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    focusRipple: {
      description: 'focusRipple of Button component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    disableTouchRipple: {
      description: 'disableTouchRipple of Button component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    disableRipple: {
      description: 'disableRipple of Button component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    centerRipple: {
      description: 'centerRipple of Button component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    size: {
      description: 'Sizes of Button component.',
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    fullWidth: {
      description: 'fullWidth of Button component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    action: {
      description: 'action of Button component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    disabled: {
      description: 'disabled of Button component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    color: {
      description: 'color of Button component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    tabIndex: {
      description: 'tabIndex of Button component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    variant: {
      description: 'variant of Button component.',
      options: ['text', 'outlined', 'contained'],
      control: { type: 'radio' },
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    sx: {
      description: 'sx of Button component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    children: {
      description: 'children of Button component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    classes: {
      description: 'classes of Button component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
  },
} as Meta<typeof Button>;

const VisualTestTemplate: StoryFn<typeof Button> = (args) => {
  return (
    <Grid container spacing={30}>
      <Grid item>
        <Grid container direction="column">
          <Grid item paddingBottom={0}>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Button small Contained
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
                <Button
                  variant={ButtonVariants.CONTAINED}
                  size="small"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  startIcon={<IconStart />}
                  variant={ButtonVariants.CONTAINED}
                  size="small"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  endIcon={<IconEnd />}
                  variant={ButtonVariants.CONTAINED}
                  size="small"
                >
                  Button
                </Button>
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
                <Button
                  variant={ButtonVariants.CONTAINED}
                  size="small"
                  className="force-to-focus"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  startIcon={<IconStart />}
                  variant={ButtonVariants.CONTAINED}
                  size="small"
                  className="force-to-focus"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  endIcon={<IconEnd />}
                  variant={ButtonVariants.CONTAINED}
                  size="small"
                  className="force-to-focus"
                >
                  Button
                </Button>
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
                <Button
                  variant={ButtonVariants.CONTAINED}
                  size="small"
                  disabled
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  startIcon={<IconStart />}
                  variant={ButtonVariants.CONTAINED}
                  size="small"
                  disabled
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  endIcon={<IconEnd />}
                  variant={ButtonVariants.CONTAINED}
                  size="small"
                  disabled
                >
                  Button
                </Button>
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
                <Button
                  variant={ButtonVariants.CONTAINED}
                  size="small"
                  className="force-to-focusHover"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  startIcon={<IconStart />}
                  variant={ButtonVariants.CONTAINED}
                  size="small"
                  className="force-to-focusHover"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  endIcon={<IconEnd />}
                  variant={ButtonVariants.CONTAINED}
                  size="small"
                  className="force-to-focusHover"
                >
                  Button
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item paddingTop={3}>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Button small Outlined
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
                <Button
                  variant={ButtonVariants.OUTLINED}
                  size="small"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  startIcon={<IconStart />}
                  variant={ButtonVariants.OUTLINED}
                  size="small"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  endIcon={<IconEnd />}
                  variant={ButtonVariants.OUTLINED}
                  size="small"
                >
                  Button
                </Button>
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
                <Button
                  variant={ButtonVariants.OUTLINED}
                  size="small"
                  className="force-to-focus"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  startIcon={<IconStart />}
                  variant={ButtonVariants.OUTLINED}
                  size="small"
                  className="force-to-focus"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  endIcon={<IconEnd />}
                  variant={ButtonVariants.OUTLINED}
                  size="small"
                  className="force-to-focus"
                >
                  Button
                </Button>
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
                <Button
                  variant={ButtonVariants.OUTLINED}
                  size="small"
                  disabled
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  startIcon={<IconStart />}
                  variant={ButtonVariants.OUTLINED}
                  size="small"
                  disabled
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  endIcon={<IconEnd />}
                  variant={ButtonVariants.OUTLINED}
                  size="small"
                  disabled
                >
                  Button
                </Button>
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
                <Button
                  variant={ButtonVariants.OUTLINED}
                  size="small"
                  className="force-to-focusHover"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  startIcon={<IconStart />}
                  variant={ButtonVariants.OUTLINED}
                  size="small"
                  className="force-to-focusHover"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  endIcon={<IconEnd />}
                  variant={ButtonVariants.OUTLINED}
                  size="small"
                  className="force-to-focusHover"
                >
                  Button
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item paddingTop={3}>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Button small Text
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
                <Button
                  variant={ButtonVariants.TEXT}
                  size="small"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  startIcon={<IconStart />}
                  variant={ButtonVariants.TEXT}
                  size="small"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  endIcon={<IconEnd />}
                  variant={ButtonVariants.TEXT}
                  size="small"
                >
                  Button
                </Button>
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
                <Button
                  variant={ButtonVariants.TEXT}
                  size="small"
                  className="force-to-focus"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  startIcon={<IconStart />}
                  variant={ButtonVariants.TEXT}
                  size="small"
                  className="force-to-focus"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  endIcon={<IconEnd />}
                  variant={ButtonVariants.TEXT}
                  size="small"
                  className="force-to-focus"
                >
                  Button
                </Button>
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
                <Button
                  variant={ButtonVariants.TEXT}
                  size="small"
                  disabled
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  startIcon={<IconStart />}
                  variant={ButtonVariants.TEXT}
                  size="small"
                  disabled
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  endIcon={<IconEnd />}
                  variant={ButtonVariants.TEXT}
                  size="small"
                  disabled
                >
                  Button
                </Button>
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
                <Button
                  variant={ButtonVariants.TEXT}
                  size="small"
                  className="force-to-focusHover"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  startIcon={<IconStart />}
                  variant={ButtonVariants.TEXT}
                  size="small"
                  className="force-to-focusHover"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  endIcon={<IconEnd />}
                  variant={ButtonVariants.TEXT}
                  size="small"
                  className="force-to-focusHover"
                >
                  Button
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column">
          <Grid item paddingBottom={0}>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Button medium Contained
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
                <Button
                  variant={ButtonVariants.CONTAINED}
                  size="medium"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  startIcon={<IconStart />}
                  variant={ButtonVariants.CONTAINED}
                  size="medium"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  endIcon={<IconEnd />}
                  variant={ButtonVariants.CONTAINED}
                  size="medium"
                >
                  Button
                </Button>
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
                <Button
                  variant={ButtonVariants.CONTAINED}
                  size="medium"
                  className="force-to-focus"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  startIcon={<IconStart />}
                  variant={ButtonVariants.CONTAINED}
                  size="medium"
                  className="force-to-focus"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  endIcon={<IconEnd />}
                  variant={ButtonVariants.CONTAINED}
                  size="medium"
                  className="force-to-focus"
                >
                  Button
                </Button>
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
                <Button
                  variant={ButtonVariants.CONTAINED}
                  size="medium"
                  disabled
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  startIcon={<IconStart />}
                  variant={ButtonVariants.CONTAINED}
                  size="medium"
                  disabled
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  endIcon={<IconEnd />}
                  variant={ButtonVariants.CONTAINED}
                  size="medium"
                  disabled
                >
                  Button
                </Button>
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
                <Button
                  variant={ButtonVariants.CONTAINED}
                  size="medium"
                  className="force-to-focusHover"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  startIcon={<IconStart />}
                  variant={ButtonVariants.CONTAINED}
                  size="medium"
                  className="force-to-focusHover"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  endIcon={<IconEnd />}
                  variant={ButtonVariants.CONTAINED}
                  size="medium"
                  className="force-to-focusHover"
                >
                  Button
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item paddingTop={3}>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Button medium Outlined
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
                <Button
                  variant={ButtonVariants.OUTLINED}
                  size="medium"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  startIcon={<IconStart />}
                  variant={ButtonVariants.OUTLINED}
                  size="medium"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  endIcon={<IconEnd />}
                  variant={ButtonVariants.OUTLINED}
                  size="medium"
                >
                  Button
                </Button>
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
                <Button
                  variant={ButtonVariants.OUTLINED}
                  size="medium"
                  className="force-to-focus"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  startIcon={<IconStart />}
                  variant={ButtonVariants.OUTLINED}
                  size="medium"
                  className="force-to-focus"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  endIcon={<IconEnd />}
                  variant={ButtonVariants.OUTLINED}
                  size="medium"
                  className="force-to-focus"
                >
                  Button
                </Button>
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
                <Button
                  variant={ButtonVariants.OUTLINED}
                  size="medium"
                  disabled
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  startIcon={<IconStart />}
                  variant={ButtonVariants.OUTLINED}
                  size="medium"
                  disabled
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  endIcon={<IconEnd />}
                  variant={ButtonVariants.OUTLINED}
                  size="medium"
                  disabled
                >
                  Button
                </Button>
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
                <Button
                  variant={ButtonVariants.OUTLINED}
                  size="medium"
                  className="force-to-focusHover"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  startIcon={<IconStart />}
                  variant={ButtonVariants.OUTLINED}
                  size="medium"
                  className="force-to-focusHover"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  endIcon={<IconEnd />}
                  variant={ButtonVariants.OUTLINED}
                  size="medium"
                  className="force-to-focusHover"
                >
                  Button
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item paddingTop={3}>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Button medium Text
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
                <Button
                  variant={ButtonVariants.TEXT}
                  size="medium"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  startIcon={<IconStart />}
                  variant={ButtonVariants.TEXT}
                  size="medium"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  endIcon={<IconEnd />}
                  variant={ButtonVariants.TEXT}
                  size="medium"
                >
                  Button
                </Button>
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
                <Button
                  variant={ButtonVariants.TEXT}
                  size="medium"
                  className="force-to-focus"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  startIcon={<IconStart />}
                  variant={ButtonVariants.TEXT}
                  size="medium"
                  className="force-to-focus"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  endIcon={<IconEnd />}
                  variant={ButtonVariants.TEXT}
                  size="medium"
                  className="force-to-focus"
                >
                  Button
                </Button>
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
                <Button
                  variant={ButtonVariants.TEXT}
                  size="medium"
                  disabled
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  startIcon={<IconStart />}
                  variant={ButtonVariants.TEXT}
                  size="medium"
                  disabled
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  endIcon={<IconEnd />}
                  variant={ButtonVariants.TEXT}
                  size="medium"
                  disabled
                >
                  Button
                </Button>
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
                <Button
                  variant={ButtonVariants.TEXT}
                  size="medium"
                  className="force-to-focusHover"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  startIcon={<IconStart />}
                  variant={ButtonVariants.TEXT}
                  size="medium"
                  className="force-to-focusHover"
                >
                  Button
                </Button>
              </Grid>
              <Grid item xs={4} paddingBottom={2}>
                <Button
                  endIcon={<IconEnd />}
                  variant={ButtonVariants.TEXT}
                  size="medium"
                  className="force-to-focusHover"
                >
                  Button
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const InteractiveExampleTemplate: StoryFn<typeof Button> = (args) => {
  return (
    <Grid container spacing={2} paddingBottom={5}>
      <Grid item xs={2}>
        <Button {...args}>Button</Button>
      </Grid>
      <Grid item xs={2}>
        <Button startIcon={<IconStart />} {...args}>Button</Button>
      </Grid>
      <Grid item xs={2}>
        <Button endIcon={<IconEnd />} {...args}>Button</Button>
      </Grid>
    </Grid>
  );
};

export const InteractiveExample = InteractiveExampleTemplate.bind({});
InteractiveExample.parameters = {
  options: { showPanel: true },
};
InteractiveExample.args = {
  ...Button.defaultProps,
  variant: ButtonVariants.TEXT,
  // @ts-ignore - this attribute is need to disable all controls in the InteractiveExample, but this attribute is not part of the ButtonProps
  interactive: true,
};

export const VisualTest = VisualTestTemplate.bind({});
VisualTest.parameters = {
  options: { showPanel: false },
};
VisualTest.args = {
};
