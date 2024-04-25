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

import IconRocket from '@hcl-software/enchanted-icons/dist/carbon/es/rocket';
import IconCheckmark from '@hcl-software/enchanted-icons/dist/carbon/es/checkmark';
import IconCascading from '@hcl-software/enchanted-icons/dist/carbon/es/caret--right';
import IconEnd from '@hcl-software/enchanted-icons/dist/carbon/es/caret--down';
import MenuItem from './MenuItem';
import Typography from '../Typography';
import ListItemText from '../hidden_components/List/ListItemText';
import ListItemIcon from '../hidden_components/List/ListItemIcon';
import Button, { ButtonTestIds, ButtonVariants } from '../Button';
import Menu, { MenuSizes } from './Menu';
import Divider from '../Divider';

export default {
  title: 'Navigation/Menu',
  component: Menu,
  argTypes: {
    size: {
      description: 'Sets size of menu items',
      if: { arg: 'interactive' },
      options: [MenuSizes.SMALL, MenuSizes.MEDIUM],
      control: { type: 'radio' },
      table: {
        defaultValue: {
          summary: 'medium',
        },
      },
    },
    showDivider: {
      description: 'Enabling this props will enable divider between menuitems, only for Storybook use',
      if: { arg: 'interactive' },
      table: {
        defaultValue: { summary: false },
      },
    },
    showFooterAction: {
      description: 'Enabling this props will show footer action button, only for Storybook use',
      if: { arg: 'interactive' },
      table: {
        defaultValue: { summary: false },
      },
    },
    footerActionButtonText: {
      description: 'Change footer button title, only for Storybook use',
      if: { arg: 'interactive' },
      control: 'text',
      table: {
        defaultValue: { summary: 'Footer action' },
      },
    },
    showIcon: {
      description: 'Enabling this props will enable icon in menuitems, only for Storybook use',
      if: { arg: 'interactive' },
      table: {
        defaultValue: { summary: false },
      },
    },
    showCheck: {
      description: 'Enabling this props will enable check in menuitems, only for Storybook use',
      if: { arg: 'interactive' },
      table: {
        defaultValue: { summary: false },
      },
    },
    showHint: {
      description: 'Enabling this props will enable shortcuts in menuitems, only for Storybook use',
      if: { arg: 'interactive' },
      table: {
        defaultValue: { summary: false },
      },
    },
    showCascading: {
      description: 'Enabling this props will enable nested menulist in menuitems.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: { summary: false },
      },
    },
    selected: {
      description: 'Enabling this props will make menuitem selected and then style and state can be checked.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: { summary: false },
      },
    },
    disabled: {
      description: 'Enabling this props will make menuitem disabled.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: { summary: false },
      },
    },
    footerActionFunction: {
      description: 'handles the function call in the footer',
      control: false,
    },
    ref: {
      description: 'https://mui.com/material-ui/api/menu/',
      control: false,
    },
    BackdropComponent: {
      description: 'https://mui.com/material-ui/api/menu/',
      control: false,
    },
    BackdropProps: {
      description: 'https://mui.com/material-ui/api/menu/',
      control: false,
    },
  },
} as Meta<typeof Menu>;

const VisualTestTemplate: StoryFn<typeof Menu> = (args) => {
  const {
    showHint, showFooterAction, showDivider, showIcon, showCheck, footerActionButtonText, showCascading, ...rest
  } = args;
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  // Handle close action
  const handleClose = () => {
    setAnchorEl(null);
  };
  // Handle footer button action. Here we are closing the menu on click of footer action button
  const footerActionFunction = () => {
    setAnchorEl(null);
  };
  const definedSize = args.size === MenuSizes.MEDIUM ? 'medium' : 'small';

  React.useEffect(() => {
    const button = document.querySelector('#basicButton') as HTMLElement;
    setAnchorEl(button);
  }, []);
  return (
    <div>
      <Button
        id="basicButton"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<IconEnd />}
      >
        More options
      </Button>
      <Menu
        {...rest}
        PaperProps={{ sx: { width: '240px', padding: '0px' } }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem selected={args.selected} disabled={args.disabled} size={args.size} cascading={showCascading ? 1 : 0}>
          {(showCheck)
            && (
              <ListItemIcon>
                <IconCheckmark fontSize={definedSize} />
              </ListItemIcon>
            )}
          {(showIcon)
            && (
              <ListItemIcon>
                <IconRocket fontSize={definedSize} />
              </ListItemIcon>
            )}
          <ListItemText primary="Item 1" />
          {(showHint)
            && (
              <Typography>
                ⇧⌘⌥
              </Typography>
            )}
          {(showCascading)
            && (
              <ListItemIcon>
                <IconCascading fontSize={definedSize} />
              </ListItemIcon>
            )}
        </MenuItem>
        {(showDivider)
          && (
            <Divider type="secondary" />
          )}
        <MenuItem selected={args.selected} disabled={args.disabled} size={args.size} cascading={showCascading ? 1 : 0}>
          {(showCheck)
            && (
              <ListItemIcon>
                <IconCheckmark fontSize={definedSize} />
              </ListItemIcon>
            )}
          {(showIcon)
            && (
              <ListItemIcon>
                <IconRocket fontSize={definedSize} />
              </ListItemIcon>
            )}
          <ListItemText primary="Item 2" />
          {(showHint)
            && (
              <Typography>
                ⇧⌘⌥
              </Typography>
            )}
          {(showCascading)
            && (
              <ListItemIcon>
                <IconCascading fontSize={definedSize} />
              </ListItemIcon>
            )}
        </MenuItem>
        {(showFooterAction)
          && (
            <div>
              <Divider type="secondary" />
              <MenuItem sx={{ '&.MuiButtonBase-root': { padding: '0px' } }}>
                <Button
                  disabled={args.disabled}
                  data-testid={ButtonTestIds.TEXT}
                  onClick={() => { footerActionFunction(); }}
                  variant={ButtonVariants.TEXT}
                  sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                  fullWidth
                >
                  {footerActionButtonText}
                </Button>
              </MenuItem>
            </div>
          )}
      </Menu>
    </div>
  );
};

const InteractiveExampleTemplate: StoryFn<typeof Menu> = (args) => {
  const {
    showHint, showFooterAction, showDivider, showIcon, showCheck, footerActionButtonText, showCascading, ...rest
  } = args;
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  // Handle close action
  const handleClose = () => {
    setAnchorEl(null);
  };
  // Handle footer button action. Here we are closing the menu on click of footer action button
  const footerActionFunction = () => {
    setAnchorEl(null);
  };
  const definedSize = args.size === MenuSizes.MEDIUM ? 'medium' : 'small';

  React.useEffect(() => {
    const button = document.querySelector('#basicButton') as HTMLElement;
    setAnchorEl(button);
  }, []);
  return (
    <div>
      <Button
        id="basicButton"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<IconEnd />}
      >
        More options
      </Button>
      <Menu
        {...rest}
        PaperProps={{ sx: { width: '240px', padding: '0px' } }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem selected={args.selected} disabled={args.disabled} size={args.size} cascading={showCascading ? 1 : 0}>
          {(showCheck)
            && (
              <ListItemIcon>
                <IconCheckmark fontSize={definedSize} />
              </ListItemIcon>
            )}
          {(showIcon)
            && (
              <ListItemIcon>
                <IconRocket fontSize={definedSize} />
              </ListItemIcon>
            )}
          <ListItemText primary="Item 1" />
          {(showHint)
            && (
              <Typography>
                ⇧⌘⌥
              </Typography>
            )}
          {(showCascading)
            && (
              <ListItemIcon>
                <IconCascading fontSize={definedSize} />
              </ListItemIcon>
            )}
        </MenuItem>
        {(showDivider)
          && (
            <Divider type="secondary" />
          )}
        <MenuItem selected={args.selected} disabled={args.disabled} size={args.size} cascading={showCascading ? 1 : 0}>
          {(showCheck)
            && (
              <ListItemIcon>
                <IconCheckmark fontSize={definedSize} />
              </ListItemIcon>
            )}
          {(showIcon)
            && (
              <ListItemIcon>
                <IconRocket fontSize={definedSize} />
              </ListItemIcon>
            )}
          <ListItemText primary="Item 2" />
          {(showHint)
            && (
              <Typography>
                ⇧⌘⌥
              </Typography>
            )}
          {(showCascading)
            && (
              <ListItemIcon>
                <IconCascading fontSize={definedSize} />
              </ListItemIcon>
            )}
        </MenuItem>
        {(showFooterAction)
          && (
            <div>
              <Divider type="secondary" />
              <MenuItem sx={{ '&.MuiButtonBase-root': { padding: '0px' } }}>
                <Button
                  disabled={args.disabled}
                  data-testid={ButtonTestIds.TEXT}
                  onClick={() => { footerActionFunction(); }}
                  variant={ButtonVariants.TEXT}
                  sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                  fullWidth
                >
                  {footerActionButtonText}
                </Button>
              </MenuItem>
            </div>
          )}
      </Menu>
    </div>
  );
};

export const InteractiveExample = InteractiveExampleTemplate.bind({});
InteractiveExample.parameters = {
  options: { showPanel: true },
};
InteractiveExample.args = {
  showDivider: false,
  showFooterAction: false,
  footerActionButtonText: 'Footer action',
  showIcon: false,
  showCheck: false,
  showHint: false,
  showCascading: false,
  size: 'medium',
  selected: false,
  disabled: false,
  // @ts-ignore - this attribute is need to disable all controls in the InteractiveExample, but this attribute is not part of the MenuProps
  interactive: true,
};

export const VisualTest = VisualTestTemplate.bind({});
VisualTest.parameters = {
  options: { showPanel: false },
};
VisualTest.args = {
};
