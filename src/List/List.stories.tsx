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
import { useTheme } from '@mui/material';
import RocketIcon from '@hcl-software/enchanted-icons/dist/carbon/es/rocket';
import InformationIcon from '@hcl-software/enchanted-icons/dist/carbon/es/information';
import IconCheckmark from '@hcl-software/enchanted-icons/dist/carbon/es/checkmark';
import List from './List';
import ListItem from './ListItem';
import ListItemButton, { ListSizes } from './ListItemButton';
import ListItemIcon from './ListItemIcon';
import ListItemText from './ListItemText';
import ListItemAvatar from './ListItemAvatar';
import Avatar, { AvatarColors, AvatarTypes } from '../Avatar';
import IconButton, { IconButtonSizes, IconButtonVariants } from '../IconButton';
import Typography from '../Typography/Typography';

export default {
  title: 'Data display/List',
  component: List,
  argTypes: {
    size: {
      if: { arg: 'interactive' },
      description: 'The size of the component',
      options: [ListSizes.SMALL, ListSizes.MEDIUM],
      control: { type: 'radio' },
    },
    primary: {
      if: { arg: 'interactive' },
      description: 'Primary title of the component.',
      control: 'text',
      defaultValue: 'List item text with icon',
    },
    secondary: {
      if: { arg: 'interactive' },
      description: 'Primary title of the component.',
      control: 'text',
      defaultValue: 'Secondary text',
    },
    showSecondaryIcon: {
      if: { arg: 'interactive' },
      description: 'If true, the secodary icon will be visible',
      control: { type: 'boolean' },
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    showIcon: {
      if: { arg: 'interactive' },
      description: 'If true, the icon will be visible',
      control: { type: 'boolean' },
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    showAvatar: {
      if: { arg: 'interactive' },
      description: 'If true, the avatar will be visible',
      control: { type: 'boolean' },
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    showHint: {
      if: { arg: 'interactive' },
      description: 'Enabling this props will enable shortcuts in list item',
      control: { type: 'boolean' },
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    hasBorder: {
      if: { arg: 'interactive' },
      description: 'If true, list item will have bottom border',
      control: { type: 'boolean' },
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    disabled: {
      if: { arg: 'interactive' },
      description: 'If true, the list item will be disabled',
      control: { type: 'boolean' },
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    cascading: {
      if: { arg: 'interactive' },
      description: 'If true, the cascading will be visible',
      control: { type: 'boolean' },
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    selectable: {
      if: { arg: 'interactive' },
      description: 'If true, selectable list item',
      control: { type: 'boolean' },
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    selected: {
      if: { arg: 'interactive' },
      description: 'If true, selected list item',
      control: { type: 'boolean' },
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    disablePadding: { table: { disable: true } },
    dense: { table: { disable: true } },
    args: { table: { disable: true } },
  },
  args: {
    interactive: false,
    size: ListSizes.SMALL,
    primary: 'List item text',
    secondary: 'Secondary text',
    showSecondaryIcon: false,
    showIcon: true,
    showAvatar: false,
    showHint: false,
    hasBorder: false,
    disabled: false,
    cascading: false,
    selectable: false,
    selected: false,
  },
} as Meta<typeof List>;

const InteractiveExampleTemplate: StoryFn = (args) => {
  const theme = useTheme();
  const {
    size, primary, secondary, showSecondaryIcon, showAvatar, showIcon, hasBorder, cascading,
    selectable, selected, showHint,
  } = args;
  const typographyVariant = size === IconButtonSizes.SMALL ? 'body2' : 'body1';
  const primaryReactNode = <Typography variant={typographyVariant}>{ primary }</Typography>;
  const secondaryReactNode = (
    <>
      {showSecondaryIcon && <RocketIcon />}
      <Typography variant="caption">{secondary}</Typography>
    </>
  );
  const handleClick = (event) => {
    event.stopPropagation();
  };
  const secondaryActions = (
    <>
      <IconButton size={size} variant={IconButtonVariants.WITH_PADDING} onBlur={handleClick} onClick={handleClick} disabled={args.disabled} id="1">
        <RocketIcon />
      </IconButton>
      <IconButton size={size} variant={IconButtonVariants.WITH_PADDING} onBlur={handleClick} onClick={handleClick} disabled={args.disabled} id="2">
        <InformationIcon />
      </IconButton>
    </>
  );
  return (
    <List {...args}>
      <ListItem
        disablePadding
        hasBorder={hasBorder}
      >
        <ListItemButton
          cascading={cascading}
          disabled={args.disabled}
          secondaryActionButton={!showHint && secondaryActions}
          size={size}
        >
          {selectable && (
          <ListItemIcon>
            { selected ? <IconCheckmark /> : null}
          </ListItemIcon>
          )}
          {showIcon && (
          <ListItemIcon>
            <RocketIcon />
          </ListItemIcon>
          )}
          {showAvatar && (
          <ListItemAvatar>
            <Avatar letter="D" color={AvatarColors.DEFAULT} variant="circular" type={AvatarTypes.LETTER} />
          </ListItemAvatar>
          )}
          <ListItemText
            primary={primaryReactNode}
            secondary={secondaryReactNode}
            size={size}
          />
          {(showHint)
            && (
              <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                ⇧⌘⌥
              </Typography>
            )}
        </ListItemButton>
      </ListItem>
    </List>
  );
};

const VisualTestTemplate: StoryFn<typeof List> = (args) => {
  return (
    <List {...args}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemText primary="ListItemText" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemText
            primary="List item text"
            secondary="with secondary text"
          />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <RocketIcon />
          </ListItemIcon>
          <ListItemText primary="List item text with icon" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <RocketIcon />
          </ListItemIcon>
          <ListItemText
            primary="List item text with icon"
            secondary="and with secondary text"
          />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <RocketIcon />
          </ListItemIcon>
          <ListItemText
            primary="List item text with Tooltip"
            tooltip="tooltip top example text"
            tooltipPlacement="top"
            forceTooltip
          />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <RocketIcon />
          </ListItemIcon>
          <ListItemText
            primary="List item text with Tooltip"
            secondary="and with secondary text"
            tooltip="tooltip top example text"
            tooltipPlacement="top"
            forceTooltip
          />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemAvatar>
            <Avatar letter="D" color={AvatarColors.DEFAULT} variant="circular" type={AvatarTypes.LETTER} />
          </ListItemAvatar>
          <ListItemText primary="List item text without icon and with avatar" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemAvatar>
            <Avatar letter="D" color={AvatarColors.DEFAULT} variant="circular" type={AvatarTypes.LETTER} />
          </ListItemAvatar>
          <ListItemText
            primary="List item text without icon and with avatar"
            secondary="and with secondary text"
          />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export const InteractiveExample = InteractiveExampleTemplate.bind({});
InteractiveExample.args = {
  ...List.defaultProps,
  // @ts-ignore - this attribute is need to disable all controls in the InteractiveExample, but this attribute is not part of the HeaderProps
  interactive: true,
  args: {
    size: ListSizes.SMALL,
  },
};

export const VisualTest = VisualTestTemplate.bind({});
VisualTest.parameters = {
  options: { showPanel: false },
};
VisualTest.args = {
  ...List.defaultProps,
  dense: true,
  disablePadding: true,
};
