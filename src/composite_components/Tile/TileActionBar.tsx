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

import React from 'react';
import { Box } from '@mui/material';
import TileActionMenu from './TileActionMenu';
import { IActions } from './TileData';
import Tooltip from '../../Tooltip';
import IconButton from '../../IconButton';

export interface ITileActionBarProps {
  itemId: string;
  actionList?: IActions[],
  overflowTooltip?: string;
  menuSize?: string;
  disabled?: boolean;
  hasThumbnail?: boolean;
  isTrash?: boolean;
  trashInfoTooltip?: string;
}

const TileActionBar: React.FC<ITileActionBarProps> = (props: ITileActionBarProps) => {
  const {
    itemId, actionList, overflowTooltip, menuSize, disabled, hasThumbnail,
  } = props;

  const returnActionIcon = (index: number): React.ReactNode | undefined => {
    if ((index >= 0) && actionList && actionList.length > index) {
      return (
        <Box mr={index === 0 && actionList.length > 1 ? 0.5 : 0}>
          <Tooltip title={actionList[index].toolTip}>
            <IconButton
              data-testid={actionList[index].title}
              aria-label={actionList[index].toolTip}
              disabled={disabled}
              id={itemId}
              sx={{
                ...actionList[index].color && { color: actionList[index].color },
              }}
              onClick={(e) => { return actionList[index].handler(e, itemId); }}
              onKeyDown={(event: React.KeyboardEvent<HTMLElement>) => { if (event.key === 'Enter') event.stopPropagation(); }}
            >
              {actionList[index].iconObject}
            </IconButton>
          </Tooltip>
        </Box>
      );
    }
    return undefined;
  };

  return (
    <>
      {hasThumbnail && (actionList) && (
      <>
        {returnActionIcon(0)}
        {(actionList.length === 2) && (
          returnActionIcon(1)
        )}
        {(actionList.length > 2) && (
        <TileActionMenu
          itemId={itemId}
          actionList={actionList}
          overflowTooltip={overflowTooltip}
          menuSize={menuSize}
          disabled={disabled}
          hasThumbnail={hasThumbnail}
          isTrash={props.isTrash}
          trashInfoTooltip={props.trashInfoTooltip}
        />
        )}
      </>
      )}
      {(!hasThumbnail && actionList) && (
      <TileActionMenu
        itemId={itemId}
        actionList={actionList}
        overflowTooltip={overflowTooltip}
        menuSize={menuSize}
        disabled={disabled}
        hasThumbnail={hasThumbnail}
        isTrash={props.isTrash}
        trashInfoTooltip={props.trashInfoTooltip}
      />
      )}
    </>
  );
};

export default TileActionBar;
