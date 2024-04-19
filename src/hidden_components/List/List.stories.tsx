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

import DraftsIcon from '@hcl-software/enchanted-icons/dist/carbon/es/license--draft';

import List from './List';
import ListItem from './ListItem';
import ListItemButton from './ListItemButton';
import ListItemIcon from './ListItemIcon';
import ListItemText from './ListItemText';
import ListItemAvatar from './ListItemAvatar';
import Avatar, { AvatarColors, AvatarTypes } from '../../Avatar';

export default {
  title: 'Data display/List',
  component: List,
} as Meta<typeof List>;

const InteractiveExampleTemplate: StoryFn<typeof List> = (args) => {
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
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="List item text with icon" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <DraftsIcon />
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
            <DraftsIcon />
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
            <DraftsIcon />
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
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemAvatar>
            <Avatar letter="D" color={AvatarColors.DEFAULT} variant="circular" type={AvatarTypes.LETTER} />
          </ListItemAvatar>
          <ListItemText primary="List item text with icon and avatar" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemAvatar>
            <Avatar letter="D" color={AvatarColors.DEFAULT} variant="circular" type={AvatarTypes.LETTER} />
          </ListItemAvatar>
          <ListItemText
            primary="List item text with icon and avatar"
            secondary="and with secondary text"
          />
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
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="List item text with icon" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <DraftsIcon />
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
            <DraftsIcon />
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
            <DraftsIcon />
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
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemAvatar>
            <Avatar letter="D" color={AvatarColors.DEFAULT} variant="circular" type={AvatarTypes.LETTER} />
          </ListItemAvatar>
          <ListItemText primary="List item text with icon and avatar" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemAvatar>
            <Avatar letter="D" color={AvatarColors.DEFAULT} variant="circular" type={AvatarTypes.LETTER} />
          </ListItemAvatar>
          <ListItemText
            primary="List item text with icon and avatar"
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
