/* ======================================================================== *
 * Copyright 2024, 2026 HCL America Inc.                                    *
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
import IconInformation from '@hcl-software/enchanted-icons/dist/carbon/es/information';
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
  isTrash?: boolean; // Show info icon only in trash view
  trashInfoTooltip?: string;
}

export enum TileActionTestIds {
  TILE_ACTION_MENU = 'basic-menu',
  TILE_ACTION_OVERFLOW = 'tile-action-menu',
}

const TileActionMenu: React.FC<ITileActionMenuProps> = (props: ITileActionMenuProps) => {
  const {
    itemId, actionList, overflowTooltip, disabled, hasThumbnail, isTrash,
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
    <div
      style={{
        // Actions container
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 0,
        gap: 8,
        width: 48,
        height: 16,
        flex: 'none',
        order: 2,
        flexGrow: 0,
      }}
    >
      {/* Info icon for collection tiles in trash view */}
      {isTrash && !hasThumbnail && (
        <Tooltip
          title={props.trashInfoTooltip || ''}
          componentsProps={{
            tooltip: {
              sx: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                padding: '5px 8px',
                gap: '10px',
                background: 'rgba(56, 56, 56, 1)',
                borderRadius: '2px',
                maxWidth: '300px',
                fontSize: '12px',
                lineHeight: '16px',
                color: 'rgba(255, 255, 255, 0.93)',
              },

            },
          }}
        >
          <IconButton
            data-testid="tile-action-info"
            aria-label={props.trashInfoTooltip || ''}
            size="small"
            tabIndex={0}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2px',
              isolation: 'isolate',
              width: '20px',
              height: '20px',
              flex: 'none',
              order: 0,
              flexGrow: 0,
            }}
          >
            <IconInformation />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title={overflowIconTitle}>
        <IconButton
          data-testid={TileActionTestIds.TILE_ACTION_OVERFLOW}
          aria-controls="fade-menu"
          aria-haspopup="true"
          onClick={handleClick}
          disabled={disabled}
          size="small"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2px',
            isolation: 'isolate',
            width: '20px',
            height: '20px',
            borderRadius: '2px',
            flex: 'none',
            order: 0,
            flexGrow: 0,
          }}
        >
          <IconOverflowMenuHorizontal />
        </IconButton>
      </Tooltip>
      <Menu
        PaperProps={{ sx: { padding: '0px' } }}
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
    </div>
  );
};

export default TileActionMenu;
