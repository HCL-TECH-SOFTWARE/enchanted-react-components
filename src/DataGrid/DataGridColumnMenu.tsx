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
import {
  GridColumnMenuProps as MuiGridColumnMenuProps, GridColumnVisibilityModel, useGridApiContext, GridPreferencePanelsValue,
} from '@mui/x-data-grid';
import { Paper } from '@mui/material';
import ArrowUp from '@hcl-software/enchanted-icons/dist/carbon/es/arrow--up';
import ArrowDown from '@hcl-software/enchanted-icons/dist/carbon/es/arrow--down';
import ColumnIcon from '@hcl-software/enchanted-icons/dist/carbon/es/column';
import ViewIcon from '@hcl-software/enchanted-icons/dist/carbon/es/view';
import Divider from '../Divider';
import MenuItem from '../Menu/MenuItem';

type GridColumnMenuProps = MuiGridColumnMenuProps & {
  onSortModelChange: Function,
  onColumnVisibilityModelChange: Function,
  columnVisibilityModel: GridColumnVisibilityModel,
}

export const ExtendedGridColumnMenu = ({
  colDef, onSortModelChange, onColumnVisibilityModelChange, columnVisibilityModel, hideMenu,
}: GridColumnMenuProps) => {
  const apiContext = useGridApiContext();

  const handleSortModelChange = (
  value: 'asc' | 'desc',
  event: React.MouseEvent<HTMLElement>
) => {
  onSortModelChange([{ field: colDef.field, sort: value }]);
  hideMenu?.(event);
};

const handleHideColumn = (event: React.MouseEvent<HTMLElement>) => {
  onColumnVisibilityModelChange({ ...columnVisibilityModel, [colDef.field]: false });
  hideMenu?.(event);
};

const handleManageColumns = (event: React.MouseEvent<HTMLElement>) => {
  apiContext.current.showPreferences(GridPreferencePanelsValue.columns);
  hideMenu?.(event);
};

  return (
    <Paper elevation={3}>
      <MenuItem onClick={(event) => handleSortModelChange('asc', event)}>
        <ArrowUp />
        {' '}
        Ascending
      </MenuItem>
      <MenuItem onClick={(event) => handleSortModelChange('desc', event)}>
        <ArrowDown />
        {' '}
        Descending
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleHideColumn}>
        <ViewIcon />
        {' '}
        Hide column
      </MenuItem>
      <MenuItem onClick={handleManageColumns}>
        <ColumnIcon />
        {' '}
        Manage columns
      </MenuItem>
    </Paper>
  );
};
