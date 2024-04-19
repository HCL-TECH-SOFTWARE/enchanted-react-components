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
import IconButton, { IconButtonSizes, IconButtonVariants } from './IconButton';
import Typography from '../Typography';

export default {
  title: 'Data display/IconButton',
  component: IconButton,
  argTypes: {
    onClick: {
      if: { arg: 'interactive' },
      action: 'clicked',
    },
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
    },
    children: {
      description: 'The children of the IconButton.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    classes: {
      description: 'The classes of the IconButton.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    sx: {
      description: 'The sx of the IconButton.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    tabIndex: {
      description: 'The tabIndex of the IconButton.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    disabled: {
      description: 'The disabled of the IconButton.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    action: {
      description: 'The action of the IconButton.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    centerRipple: {
      description: 'The centerRipple of the IconButton.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    disableRipple: {
      description: 'The disableRipple of the IconButton.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    disableTouchRipple: {
      description: 'The disableTouchRipple of the IconButton.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    focusRipple: {
      description: 'The focusRipple of the IconButton.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    focusVisibleClassName: {
      description: 'The focusVisibleClassName of the IconButton.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    LinkComponent: {
      description: 'The LinkComponent of the IconButton.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    onFocusVisible: {
      description: 'The onFocusVisible of the IconButton.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    TouchRippleProps: {
      description: 'The TouchRippleProps of the IconButton.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    touchRippleRef: {
      description: 'The touchRippleRef of the IconButton.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    disableFocusRipple: {
      description: 'The disableFocusRipple of the IconButton.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    edge: {
      if: { arg: 'interactive' },
      description: 'The edge of the IconButton.',
      options: ['false', 'end', 'start'],
      control: { type: 'radio' },
      table: {
        defaultValue: {
          summary: 'primary',
        },
      },
    },
  },
} as Meta<typeof IconButton>;

const VisualTestTemplate: StoryFn<typeof IconButton> = (args) => {
  return (
    <>
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        Icon Button Default
      </Typography>
      <IconButton>
        <IconAdd />
      </IconButton>
      &nbsp;
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        Icon Button Small
      </Typography>
      <IconButton
        size="small"
      >
        <IconAdd />
      </IconButton>
      &nbsp;
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        Icon Button Medium
      </Typography>
      <IconButton
        size="medium"
      >
        <IconAdd />
      </IconButton>
      &nbsp;
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        Icon Button without Padding
      </Typography>
      <IconButton
        variant={IconButtonVariants.WITHOUT_PADDING}
      >
        <IconAdd />
      </IconButton>
      &nbsp;
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        Icon Button with Padding
      </Typography>
      <IconButton
        variant={IconButtonVariants.WITH_PADDING}
      >
        <IconAdd />
      </IconButton>
      &nbsp;
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        Icon Button Disabled
      </Typography>
      <IconButton
        disabled
      >
        <IconAdd />
      </IconButton>
      &nbsp;
    </>
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
