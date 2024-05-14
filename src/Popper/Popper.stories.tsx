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
      description: 'https://mui.com/material-ui/react-popper/',
      control: false,
    },
    headerChildren: {
      description: 'https://mui.com/material-ui/react-popper/',
      control: false,
    },
    contentChildren: {
      description: 'components inside the content body of popper',
      control: false,
    },
    subHeaderChildren: {
      description: 'components inside the header of popper',
      control: false,
    },
    ref: {
      description: 'https://mui.com/material-ui/react-popper/',
      control: false,
    },
    component: {
      description: 'https://mui.com/material-ui/react-popper/',
      control: false,
    },
    sx: {
      description: 'https://mui.com/material-ui/react-popper/',
      control: false,
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
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setOpen((previousOpen) => {
      return !previousOpen;
    });
  };
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
