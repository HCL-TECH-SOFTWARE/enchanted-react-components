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
import Button from '@hcl-software/enchanted-icons/dist/carbon/es/column';
import { debounce } from '@mui/material';

import IconButton from '../IconButton';
import Typography from '../Typography';
import Popper from './Popper';

export default {
  title: 'Navigation/Popper',
  component: Popper,
  parameters: {
    docs: {
      story: { height: '550px', inline: false },
    },
  },
  argTypes: {
    hideSubHeader: {
      description: 'Show / Hide the subheader ',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    onClose: {
      description: 'Callback fired when the component requests to be closed.',
      if: { arg: 'interactive' },
    },
    headerChildren: {
      description: 'Header content for the popper component',
      if: { arg: 'interactive' },
    },
    contentChildren: {
      description: 'Body content for the popper component',
      if: { arg: 'interactive' },
    },
    subHeaderChildren: {
      description: 'Subheader content for the popper component',
      if: { arg: 'interactive' },
    },
    ref: {
      description: 'ref of Popper component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    component: {
      description: 'component of Menu component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    sx: {
      description: 'sx of Menu component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
  },
} as Meta<typeof Popper>;

const VisualTestTemplate: StoryFn<typeof Popper> = (args) => {
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = debounce((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => {
      return !previousOpen;
    });
  }, 500);

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <Button />
      </IconButton>
      <Popper
        style={{ position: 'relative' }}
        id={id}
        anchorEl={anchorEl}
        transition
        open={open}
        onClose={handleClose}
        placement="bottom"
        headerChildren={(
          <Typography variant="body1">Label</Typography>
        )}
        hideSubHeader={false}
      />
    </>
  );
};

const InteractiveExampleTemplate: StoryFn<typeof Popper> = (args) => {
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = debounce((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => {
      return !previousOpen;
    });
  }, 500);

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <Button />
      </IconButton>
      <Popper
        style={{ position: 'relative' }}
        {...args}
        id={id}
        anchorEl={anchorEl}
        transition
        open={open}
        onClose={handleClose}
        placement="bottom"
      />
    </>
  );
};

export const InteractiveExample = InteractiveExampleTemplate.bind({});
InteractiveExample.parameters = {
  options: { showPanel: true },
};
InteractiveExample.args = {
  ...Popper.defaultProps,
  headerChildren: (
    <Typography variant="body1">Label</Typography>
  ),
  hideSubHeader: false,
  // @ts-ignore - this attribute is need to disable all controls in the InteractiveExample, but this attribute is not part of the PopperProps
  interactive: true,
};

export const VisualTest = VisualTestTemplate.bind({});
VisualTest.parameters = {
  options: { showPanel: false },
};
VisualTest.args = {
};
