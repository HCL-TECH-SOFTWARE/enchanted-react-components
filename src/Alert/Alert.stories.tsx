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
import IconRocket from '@hcl-software/enchanted-icons/dist/carbon/es/rocket';
import Close from '@hcl-software/enchanted-icons/dist/carbon/es/close';
import IconButton, { IconButtonVariants } from '../IconButton/IconButton';
import Typography from '../Typography';
import Alert, { AlertSeverity, AlertVariants } from './Alert';

export default {
  title: 'Feedback/Alert',
  component: Alert,
  argTypes: {
    variant: {
      if: { arg: 'interactive' },
      description: 'The variants for Alert.',
      options: [AlertVariants.CONTAINED, AlertVariants.OUTLINED],
      control: { type: 'radio' },
      table: {
        defaultValue: {
          summary: 'outlined',
        },
      },
    },
    severity: {
      if: { arg: 'interactive' },
      description: 'The severity for Alert.',
      options: [AlertSeverity.WARNING, AlertSeverity.SUCCESS, AlertSeverity.ERROR, AlertSeverity.INFORMATION],
      control: { type: 'radio' },
      table: {
        defaultValue: {
          summary: 'success',
        },
      },
    },
    message: {
      if: { arg: 'interactive' },
      description: 'Add message for alert, for testing only.',
      table: {
        defaultValue: {
          summary: 'Alert message',
        },
      },
    },
    width: {
      if: { arg: 'interactive' },
      description: 'To set the width of the alert component, for testing only.',
      control: { type: 'number' },
      table: {
        defaultValue: {
          summary: 240,
        },
      },
    },
    ref: {
      description: 'https://mui.com/material-ui/api/alert/',
      control: false,
    },
    children: {
      description: 'https://mui.com/material-ui/api/alert/#alert-prop-children',
      control: false,
    },
  },
} as Meta<typeof Alert>;

const VisualTestTemplate: StoryFn<typeof Alert> = (args) => {
  return (
    <Grid container spacing={10}>
      <Grid item>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Contained Warning
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Base
            </Typography>
            <Alert
              variant={AlertVariants.CONTAINED}
              severity={AlertSeverity.WARNING}
              sx={{ width: `${args.width}px` }}
            >
              {args.message}
            </Alert>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Icon-close
            </Typography>
            <Alert
              sx={{ width: `${args.width}px` }}
              variant={AlertVariants.CONTAINED}
              severity={AlertSeverity.WARNING}
              action={(
                <IconButton
                  variant={IconButtonVariants.WITH_PADDING}
                >
                  <Close />
                </IconButton>
              )}
            >
              {/* @ts-ignore for test only, to be able to change the text */}
              {args.message}
            </Alert>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Icon-chevron
            </Typography>
            <Alert
              sx={{ width: `${args.width}px` }}
              variant={AlertVariants.CONTAINED}
              severity={AlertSeverity.WARNING}
              action={(
                <IconButton
                  variant={IconButtonVariants.WITH_PADDING}
                >
                  <IconRocket />
                </IconButton>
              )}
            >
              {/* @ts-ignore for test only, to be able to change the text */}
              {args.message}
            </Alert>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Icon-chevron & close
            </Typography>
            <Alert
              // @ts-ignore for test only, to be able to width
              sx={{ width: `${args.width}px` }}
              variant={AlertVariants.CONTAINED}
              severity={AlertSeverity.WARNING}
              action={(
                <>
                  <IconButton
                    variant={IconButtonVariants.WITH_PADDING}
                  >
                    <IconRocket />
                  </IconButton>
                  <IconButton variant={IconButtonVariants.WITH_PADDING}>
                    <Close />
                  </IconButton>
                </>
              )}
            >
              {/* @ts-ignore for test only, to be able to change the text */}
              {args.message}
            </Alert>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Contained Success
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Base
            </Typography>
            <Alert
              variant={AlertVariants.CONTAINED}
              severity={AlertSeverity.SUCCESS}
              sx={{ width: `${args.width}px` }}
            >
              {args.message}
            </Alert>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Icon-close
            </Typography>
            <Alert
              sx={{ width: `${args.width}px` }}
              variant={AlertVariants.CONTAINED}
              severity={AlertSeverity.SUCCESS}
              action={(
                <IconButton
                  variant={IconButtonVariants.WITH_PADDING}
                >
                  <Close />
                </IconButton>
              )}
            >
              {/* @ts-ignore for test only, to be able to change the text */}
              {args.message}
            </Alert>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Icon-chevron
            </Typography>
            <Alert
              sx={{ width: `${args.width}px` }}
              variant={AlertVariants.CONTAINED}
              severity={AlertSeverity.SUCCESS}
              action={(
                <IconButton
                  variant={IconButtonVariants.WITH_PADDING}
                >
                  <IconRocket />
                </IconButton>
              )}
            >
              {/* @ts-ignore for test only, to be able to change the text */}
              {args.message}
            </Alert>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Icon-chevron & close
            </Typography>
            <Alert
              // @ts-ignore for test only, to be able to width
              sx={{ width: `${args.width}px` }}
              variant={AlertVariants.CONTAINED}
              severity={AlertSeverity.SUCCESS}
              action={(
                <>
                  <IconButton variant={IconButtonVariants.WITH_PADDING}>
                    <IconRocket />
                  </IconButton>
                  <IconButton variant={IconButtonVariants.WITH_PADDING}>
                    <Close />
                  </IconButton>
                </>
              )}
            >
              {/* @ts-ignore for test only, to be able to change the text */}
              {args.message}
            </Alert>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Contained Error
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Base
            </Typography>
            <Alert
              variant={AlertVariants.CONTAINED}
              severity={AlertSeverity.ERROR}
              sx={{ width: `${args.width}px` }}
            >
              {args.message}
            </Alert>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Icon-close
            </Typography>
            <Alert
              sx={{ width: `${args.width}px` }}
              variant={AlertVariants.CONTAINED}
              severity={AlertSeverity.ERROR}
              action={(
                <IconButton
                  variant={IconButtonVariants.WITH_PADDING}
                >
                  <Close />
                </IconButton>
              )}
            >
              {/* @ts-ignore for test only, to be able to change the text */}
              {args.message}
            </Alert>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Icon-chevron
            </Typography>
            <Alert
              sx={{ width: `${args.width}px` }}
              variant={AlertVariants.CONTAINED}
              severity={AlertSeverity.ERROR}
              action={(
                <IconButton
                  variant={IconButtonVariants.WITH_PADDING}
                >
                  <IconRocket />
                </IconButton>
              )}
            >
              {/* @ts-ignore for test only, to be able to change the text */}
              {args.message}
            </Alert>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Icon-chevron & close
            </Typography>
            <Alert
              // @ts-ignore for test only, to be able to width
              sx={{ width: `${args.width}px` }}
              variant={AlertVariants.CONTAINED}
              severity={AlertSeverity.ERROR}
              action={(
                <>
                  <IconButton variant={IconButtonVariants.WITH_PADDING}>
                    <IconRocket />
                  </IconButton>
                  <IconButton variant={IconButtonVariants.WITH_PADDING}>
                    <Close />
                  </IconButton>
                </>
              )}
            >
              {/* @ts-ignore for test only, to be able to change the text */}
              {args.message}
            </Alert>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Contained Info
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Base
            </Typography>
            <Alert
              variant={AlertVariants.CONTAINED}
              severity={AlertSeverity.INFORMATION}
              sx={{ width: `${args.width}px` }}
            >
              {args.message}
            </Alert>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Icon-close
            </Typography>
            <Alert
              sx={{ width: `${args.width}px` }}
              variant={AlertVariants.CONTAINED}
              severity={AlertSeverity.INFORMATION}
              action={(
                <IconButton
                  variant={IconButtonVariants.WITH_PADDING}
                >
                  <Close />
                </IconButton>
              )}
            >
              {/* @ts-ignore for test only, to be able to change the text */}
              {args.message}
            </Alert>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Icon-chevron
            </Typography>
            <Alert
              sx={{ width: `${args.width}px` }}
              variant={AlertVariants.CONTAINED}
              severity={AlertSeverity.INFORMATION}
              action={(
                <IconButton
                  variant={IconButtonVariants.WITH_PADDING}
                >
                  <IconRocket />
                </IconButton>
              )}
            >
              {/* @ts-ignore for test only, to be able to change the text */}
              {args.message}
            </Alert>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Icon-chevron & close
            </Typography>
            <Alert
              // @ts-ignore for test only, to be able to width
              sx={{ width: `${args.width}px` }}
              variant={AlertVariants.CONTAINED}
              severity={AlertSeverity.INFORMATION}
              action={(
                <>
                  <IconButton variant={IconButtonVariants.WITH_PADDING}>
                    <IconRocket />
                  </IconButton>
                  <IconButton variant={IconButtonVariants.WITH_PADDING}>
                    <Close />
                  </IconButton>
                </>
              )}
            >
              {/* @ts-ignore for test only, to be able to change the text */}
              {args.message}
            </Alert>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Outlined Warning
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Base
            </Typography>
            <Alert
              variant={AlertVariants.OUTLINED}
              severity={AlertSeverity.WARNING}
              sx={{ width: `${args.width}px` }}
            >
              {args.message}
            </Alert>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Icon-close
            </Typography>
            <Alert
              sx={{ width: `${args.width}px` }}
              variant={AlertVariants.OUTLINED}
              severity={AlertSeverity.WARNING}
              action={(
                <IconButton
                  variant={IconButtonVariants.WITH_PADDING}
                >
                  <Close />
                </IconButton>
              )}
            >
              {/* @ts-ignore for test only, to be able to change the text */}
              {args.message}
            </Alert>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Icon-chevron
            </Typography>
            <Alert
              sx={{ width: `${args.width}px` }}
              variant={AlertVariants.OUTLINED}
              severity={AlertSeverity.WARNING}
              action={(
                <IconButton
                  variant={IconButtonVariants.WITH_PADDING}
                >
                  <IconRocket />
                </IconButton>
              )}
            >
              {/* @ts-ignore for test only, to be able to change the text */}
              {args.message}
            </Alert>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Icon-chevron & close
            </Typography>
            <Alert
              // @ts-ignore for test only, to be able to width
              sx={{ width: `${args.width}px` }}
              variant={AlertVariants.OUTLINED}
              severity={AlertSeverity.WARNING}
              action={(
                <>
                  <IconButton variant={IconButtonVariants.WITH_PADDING}>
                    <IconRocket />
                  </IconButton>
                  <IconButton variant={IconButtonVariants.WITH_PADDING}>
                    <Close />
                  </IconButton>
                </>
              )}
            >
              {/* @ts-ignore for test only, to be able to change the text */}
              {args.message}
            </Alert>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Outlined Success
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Base
            </Typography>
            <Alert
              variant={AlertVariants.OUTLINED}
              severity={AlertSeverity.SUCCESS}
              sx={{ width: `${args.width}px` }}
            >
              {args.message}
            </Alert>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Icon-close
            </Typography>
            <Alert
              sx={{ width: `${args.width}px` }}
              variant={AlertVariants.OUTLINED}
              severity={AlertSeverity.SUCCESS}
              action={(
                <IconButton
                  variant={IconButtonVariants.WITH_PADDING}
                >
                  <Close />
                </IconButton>
              )}
            >
              {/* @ts-ignore for test only, to be able to change the text */}
              {args.message}
            </Alert>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Icon-chevron
            </Typography>
            <Alert
              sx={{ width: `${args.width}px` }}
              variant={AlertVariants.OUTLINED}
              severity={AlertSeverity.SUCCESS}
              action={(
                <IconButton
                  variant={IconButtonVariants.WITH_PADDING}
                >
                  <IconRocket />
                </IconButton>
              )}
            >
              {/* @ts-ignore for test only, to be able to change the text */}
              {args.message}
            </Alert>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Icon-chevron & close
            </Typography>
            <Alert
              // @ts-ignore for test only, to be able to width
              sx={{ width: `${args.width}px` }}
              variant={AlertVariants.OUTLINED}
              severity={AlertSeverity.SUCCESS}
              action={(
                <>
                  <IconButton variant={IconButtonVariants.WITH_PADDING}>
                    <IconRocket />
                  </IconButton>
                  <IconButton variant={IconButtonVariants.WITH_PADDING}>
                    <Close />
                  </IconButton>
                </>
              )}
            >
              {/* @ts-ignore for test only, to be able to change the text */}
              {args.message}
            </Alert>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Outlined Error
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Base
            </Typography>
            <Alert
              variant={AlertVariants.OUTLINED}
              severity={AlertSeverity.ERROR}
              sx={{ width: `${args.width}px` }}
            >
              {args.message}
            </Alert>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Icon-close
            </Typography>
            <Alert
              sx={{ width: `${args.width}px` }}
              variant={AlertVariants.OUTLINED}
              severity={AlertSeverity.ERROR}
              action={(
                <IconButton
                  variant={IconButtonVariants.WITH_PADDING}
                >
                  <Close />
                </IconButton>
              )}
            >
              {/* @ts-ignore for test only, to be able to change the text */}
              {args.message}
            </Alert>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Icon-chevron
            </Typography>
            <Alert
              sx={{ width: `${args.width}px` }}
              variant={AlertVariants.OUTLINED}
              severity={AlertSeverity.ERROR}
              action={(
                <IconButton
                  variant={IconButtonVariants.WITH_PADDING}
                >
                  <IconRocket />
                </IconButton>
              )}
            >
              {/* @ts-ignore for test only, to be able to change the text */}
              {args.message}
            </Alert>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Icon-chevron & close
            </Typography>
            <Alert
              // @ts-ignore for test only, to be able to width
              sx={{ width: `${args.width}px` }}
              variant={AlertVariants.OUTLINED}
              severity={AlertSeverity.ERROR}
              action={(
                <>
                  <IconButton variant={IconButtonVariants.WITH_PADDING}>
                    <IconRocket />
                  </IconButton>
                  <IconButton variant={IconButtonVariants.WITH_PADDING}>
                    <Close />
                  </IconButton>
                </>
              )}
            >
              {/* @ts-ignore for test only, to be able to change the text */}
              {args.message}
            </Alert>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Outlined Info
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Base
            </Typography>
            <Alert
              variant={AlertVariants.OUTLINED}
              severity={AlertSeverity.INFORMATION}
              sx={{ width: `${args.width}px` }}
            >
              {args.message}
            </Alert>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Icon-close
            </Typography>
            <Alert
              sx={{ width: `${args.width}px` }}
              variant={AlertVariants.OUTLINED}
              severity={AlertSeverity.INFORMATION}
              action={(
                <IconButton
                  variant={IconButtonVariants.WITH_PADDING}
                >
                  <Close />
                </IconButton>
              )}
            >
              {/* @ts-ignore for test only, to be able to change the text */}
              {args.message}
            </Alert>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Icon-chevron
            </Typography>
            <Alert
              sx={{ width: `${args.width}px` }}
              variant={AlertVariants.OUTLINED}
              severity={AlertSeverity.INFORMATION}
              action={(
                <IconButton
                  variant={IconButtonVariants.WITH_PADDING}
                >
                  <IconRocket />
                </IconButton>
              )}
            >
              {/* @ts-ignore for test only, to be able to change the text */}
              {args.message}
            </Alert>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Icon-chevron & close
            </Typography>
            <Alert
              // @ts-ignore for test only, to be able to width
              sx={{ width: `${args.width}px` }}
              variant={AlertVariants.OUTLINED}
              severity={AlertSeverity.INFORMATION}
              action={(
                <>
                  <IconButton variant={IconButtonVariants.WITH_PADDING}>
                    <IconRocket />
                  </IconButton>
                  <IconButton variant={IconButtonVariants.WITH_PADDING}>
                    <Close />
                  </IconButton>
                </>
              )}
            >
              {/* @ts-ignore for test only, to be able to change the text */}
              {args.message}
            </Alert>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const InteractiveExampleTemplate: StoryFn<typeof Alert> = (args) => {
  return (
    <Alert
      {...args}
      sx={{ width: `${args.width}px` }}
    >
      {args.message}
    </Alert>
  );
};

export const InteractiveExample = InteractiveExampleTemplate.bind({});
InteractiveExample.parameters = {
  options: { showPanel: true },
};
InteractiveExample.args = {
  ...Alert.defaultProps,
  // @ts-ignore - this attribute is need to disable all controls in the InteractiveExample, but this attribute is not part of the AlertProps
  interactive: true,
  variant: 'contained',
  severity: 'warning',

};

export const VisualTest = VisualTestTemplate.bind({});
VisualTest.parameters = {
  options: { showPanel: false },
};
VisualTest.args = {
};
