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
import MuiListItem, { ListItemProps as MuiListItemProps } from '@mui/material/ListItem';

import { Components, Theme } from '@mui/material';

interface ListItemProps extends MuiListItemProps {
  hasBorder?: boolean;
}

export const getMuiListItemThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiListItem: {
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          const borderStyle = ownerState.hasBorder ? {
            borderBottom: `1px solid ${theme.palette.border.secondary}`,
            paddingBottom: '4px',
            marginBottom: '4px',
          } : {};
          return {
            ...borderStyle,
          };
        },
      },
    },
  };
};

const ListItem = ({ ...props }: ListItemProps) => {
  return (
    <MuiListItem
      {...props}
    />
  );
};

ListItem.defaultProps = {
  hasBorder: false,
};

export * from '@mui/material/ListItem';
export default ListItem;
