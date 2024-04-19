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
import ButtonGroup from './ButtonGroup';
import Button from '../../Button';
import Typography from '../../Typography';

export default {
  title: 'Inputs/ButtonGroup',
  component: ButtonGroup,
  argTypes: {
    ref: {
      description: 'ref of ButtonGroup component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    sx: {
      description: 'sx of ButtonGroup component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    variant: {
      description: 'Variant of ButtonGroup component.',
      options: ['text', 'outlined', 'contained'],
      control: { type: 'radio' },
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    size: {
      description: 'Sizes of ButtonGroup component.',
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    orientation: {
      description: 'Orientation of ButtonGroup component.',
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    fullWidth: {
      description: 'fullWidth of ButtonGroup component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    disableRipple: {
      description: 'disableRipple of ButtonGroup component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    disableFocusRipple: {
      description: 'disableFocusRipple of ButtonGroup component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    disableElevation: {
      description: 'disableFocusRipple of ButtonGroup component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    disabled: {
      description: 'disabled of ButtonGroup component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    color: {
      description: 'color of ButtonGroup component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    classes: {
      description: 'classes of ButtonGroup component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    children: {
      description: 'children of ButtonGroup component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
  },
} as Meta<typeof ButtonGroup>;

const VisualTestTemplate: StoryFn<typeof ButtonGroup> = (args) => {
  return (
    <>
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        ButtonGroup Horizontal
      </Typography>
      <Grid container>
        <ButtonGroup
          orientation="horizontal"
        >
          <Button variant={args.variant} id="1">One</Button>
          <Button variant={args.variant} id="2">Two</Button>
          <Button variant={args.variant} id="3">Three</Button>
        </ButtonGroup>
      </Grid>
      &nbsp;
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        ButtonGroup Vertical
      </Typography>
      <Grid container>
        <ButtonGroup
          orientation="vertical"
        >
          <Button variant={args.variant} id="1">One</Button>
          <Button variant={args.variant} id="2">Two</Button>
          <Button variant={args.variant} id="3">Three</Button>
        </ButtonGroup>
      </Grid>
      &nbsp;
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        ButtonGroup Horizontal Disabled
      </Typography>
      <Grid container>
        <ButtonGroup
          orientation="horizontal"
          disabled
        >
          <Button variant={args.variant} id="1">One</Button>
          <Button variant={args.variant} id="2">Two</Button>
          <Button variant={args.variant} id="3">Three</Button>
        </ButtonGroup>
      </Grid>
      &nbsp;
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        ButtonGroup Vertical Disabled
      </Typography>
      <Grid container>
        <ButtonGroup
          orientation="vertical"
          disabled
        >
          <Button variant={args.variant} id="1">One</Button>
          <Button variant={args.variant} id="2">Two</Button>
          <Button variant={args.variant} id="3">Three</Button>
        </ButtonGroup>
      </Grid>
      &nbsp;
    </>
  );
};

const InteractiveExampleTemplate: StoryFn<typeof ButtonGroup> = (args) => {
  return (
    <Grid container>
      <ButtonGroup
        {...args}
      >
        <Button variant={args.variant} id="1">One</Button>
        <Button variant={args.variant} id="2">Two</Button>
        <Button variant={args.variant} id="3">Three</Button>
      </ButtonGroup>
    </Grid>
  );
};

export const InteractiveExample = InteractiveExampleTemplate.bind({});
InteractiveExample.parameters = {
  options: { showPanel: true },
};
InteractiveExample.args = {
  ...ButtonGroup.defaultProps,
  // @ts-ignore - this attribute is need to disable all controls in the InteractiveExample, but this attribute is not part of the ButtonGroupProps
  interactive: true,
};

export const VisualTest = VisualTestTemplate.bind({});
VisualTest.parameters = {
  options: { showPanel: false },
};
VisualTest.args = {
};
