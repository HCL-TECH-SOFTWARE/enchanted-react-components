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
  GridColumnMenuContainer, GridColumnMenuProps as MuiGridColumnMenuProps, GridColumnVisibilityModel, useGridApiContext, GridPreferencePanelsValue,
} from '@mui/x-data-grid';
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
  currentColumn, onSortModelChange, onColumnVisibilityModelChange, columnVisibilityModel, ...rest
}: GridColumnMenuProps) => {
  const apiContext = useGridApiContext();

  const handleSortModelChange = (value: string) => {
    onSortModelChange([{ field: currentColumn.field, sort: value }]);
  };

  const handleHideColumn = () => {
    onColumnVisibilityModelChange({ ...columnVisibilityModel, [currentColumn.field]: false });
  };

  return (
    <GridColumnMenuContainer currentColumn={currentColumn} {...rest}>
      <MenuItem onClick={() => { handleSortModelChange('asc'); }}>
        <ArrowUp />
        {' '}
        Ascending
      </MenuItem>
      <MenuItem onClick={() => { handleSortModelChange('desc'); }}>
        <ArrowDown />
        {' '}
        Descending
      </MenuItem>
      <Divider />
      <MenuItem onClick={() => { handleHideColumn(); }}>
        <ViewIcon />
        {' '}
        Hide column
      </MenuItem>
      <MenuItem onClick={() => { apiContext.current.showPreferences(GridPreferencePanelsValue.columns); }}>
        <ColumnIcon />
        {' '}
        Manage columns
      </MenuItem>
    </GridColumnMenuContainer>
  );
};
