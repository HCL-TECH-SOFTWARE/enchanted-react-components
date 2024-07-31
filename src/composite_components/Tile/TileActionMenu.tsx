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

import React, { ReactElement } from 'react';
import IconOverflowMenuHorizontal from '@hcl-software/enchanted-icons/dist/carbon/es/overflow-menu--horizontal';
import ListItemText from '../../List/ListItemText';
import Menu, { MenuSizes } from '../../Menu';
import ListItemIcon from '../../List/ListItemIcon';
import { IActions } from './TileData';
import Tooltip from '../../Tooltip';
import IconButton from '../../IconButton';
import MenuItem from '../../Menu/MenuItem';
import Divider from '../../Divider';

export interface ITileActionMenuProps {
  itemId: string;
  actionList: IActions[],
  overflowTooltip?: string;
  menuSize?: string;
  disabled?: boolean;
  hasThumbnail?: boolean;
}

export enum TileActionTestIds {
  TILE_ACTION_MENU = 'basic-menu',
  TILE_ACTION_OVERFLOW = 'tile-action-menu',
}

const TileActionMenu: React.FC<ITileActionMenuProps> = (props: ITileActionMenuProps) => {
  const {
    itemId, actionList, overflowTooltip, disabled, hasThumbnail,
  } = props;
  const overflowIconTitle = overflowTooltip;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const definedSize = props.menuSize === MenuSizes.MEDIUM ? 'medium' : 'small';

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    setAnchorEl(null);
    event.stopPropagation();
  };

  const returnMenuItem = (action: IActions): React.ReactNode | undefined => {
    if (action) {
      return (
        [
          <MenuItem
            key={action.key}
            size={props.menuSize}
            onClick={(e) => {
              setAnchorEl(null);
              return action.handler(e, itemId);
            }}
          >
            <ListItemIcon>
              {React.cloneElement(action.iconObject as ReactElement, { fontSize: definedSize })}
            </ListItemIcon>
            <ListItemText primary={action.title} />
          </MenuItem>,
          (action.showDivider) && <Divider key="divider" type="secondary" />,
        ]
      );
    }
    return undefined;
  };

  return (
    <>
      <Tooltip title={overflowIconTitle}>
        <IconButton
          data-testid={TileActionTestIds.TILE_ACTION_OVERFLOW}
          aria-controls="fade-menu"
          aria-haspopup="true"
          onClick={handleClick}
          disabled={disabled}
        >
          <IconOverflowMenuHorizontal />
        </IconButton>
      </Tooltip>
      <Menu
        PaperProps={{ sx: { width: '240px', padding: '0px' } }}
        id="basic-menu"
        data-testid={TileActionTestIds.TILE_ACTION_MENU}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        size={definedSize}
      >
        {actionList.map((action: IActions, index: number) => {
          if (hasThumbnail === false) {
            return (returnMenuItem(action));
          }
          if (index >= 1) {
            return (returnMenuItem(action));
          }
          return null;
        })}
      </Menu>
    </>
  );
};

export default TileActionMenu;
