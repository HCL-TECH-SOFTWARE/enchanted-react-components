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
import MuiMenuItem, { MenuItemProps as MuiMenuItemProps } from '@mui/material/MenuItem';

import {
  Components, Theme,
} from '@mui/material';

export type MenuItemProps = MuiMenuItemProps & {
  cascading?: boolean | 0 | 1,
}

export const getMuiMenuItemThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiMenuItem: {
      styleOverrides: {
        // Those adjustments are needed for the Select menu overlay comp
        root: ({ ownerState, theme }) => {
          return {
            // The placeholder item, should not showed inside of the menu list
            '&.Mui-disabled:has(em)': {
              display: 'none',
            },
            // All the adjustment from this line has done for updating menu component as per design requirement
            display: 'flex', // Changed display to flex for arranging items in single line inside menu item. Eaerlier it was block
            '&.MuiMenuItem-root': {
              border: '1px solid transparent', // Added 1px transparent border to resolve flickering issue while focusing
              paddingLeft: '0px',
              paddingRight: '0px',
              ...(ownerState.size === 'medium' && {
                paddingTop: '5px',
                paddingBottom: '5px',
                minHeight: '36px',
              }),
              ...(ownerState.size === 'small' && {
                paddingTop: '3px',
                paddingBottom: '3px',
                minHeight: '28px',
              }),
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
              '&.Mui-focusVisible': {
                border: `1px solid ${theme.palette.primary.main}`,
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              },
              '&.MuiButtonBase-root.MuiMenuItem-root.MuiMenuItem-root.Mui-selected': {
                backgroundColor: `${theme.palette.action.activeOpacity}`,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
                '&.Mui-focusVisible': {
                  border: `1px solid ${theme.palette.primary.main}`,
                  backgroundColor: 'transparent',
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                },
              },
            },
            '.MuiListItemIcon-root': {
              marginLeft: '8px',
              ...(ownerState.size === 'medium' && {
                minWidth: '24px',
              }),
              ...(ownerState.size === 'small' && {
                minWidth: '20px',
              }),
            },
            '.MuiListItemText-root': {
              ...(ownerState.size === 'medium' && {
                marginLeft: '16px',
              }),
              ...(ownerState.size === 'small' && {
                marginLeft: '8px',
              }),
              marginRight: '8px',
              '.MuiTypography-root': {
                display: 'block',
                ...(ownerState.size === 'small' && {
                  paddingTop: '2.5px',
                }),
              },
            },
            '.MuiTypography-root': {
              display: 'flex',
              alignItems: 'center',
              marginLeft: '8px',
              color: theme.palette.text.primary,
              ...(ownerState.size === 'medium' && {
                ...theme.typography.body1,
                minHeight: '24px',
              }),
              ...(ownerState.size === 'small' && {
                ...theme.typography.body2,
                minHeight: '20px',
                marginRight: '4px',
              }),
              ...(ownerState.disabled && {
                color: theme.palette.text.disabled,
              }),
            },
            '.MuiListItemText-root + .MuiTypography-root': {
              color: theme.palette.text.secondary,
              ...(ownerState.disabled && {
                color: theme.palette.text.disabled,
              }),
              ...(ownerState.size === 'medium' && {
                marginRight: ownerState.cascading ? '0px' : '8px',
              }),
              ...(ownerState.size === 'small' && {
                marginRight: '4px',
              }),
            },
            '.MuiTypography-root + .MuiListItemIcon-root': {
              ...(ownerState.size === 'medium' && {
                marginRight: '8px',
                marginLeft: '0px',
              }),
              ...(ownerState.size === 'small' && {
                marginRight: '4px',
                marginLeft: '0px',
              }),
            },
            '.MuiListItemText-root + .MuiListItemIcon-root': {
              ...(ownerState.size === 'medium' && {
                marginRight: '8px',
              }),
              ...(ownerState.size === 'small' && {
                marginRight: '4px',
              }),
            },
            '.MuiListItemText-inset ': {
              paddingLeft: '28px',
            },
          };
        },
      },
    },
  };
};

const MenuItem = ({ ...props }: MenuItemProps) => {
  return <MuiMenuItem {...props} />;
};

MenuItem.defaultProps = {
  size: 'medium', // By default size is medium
  disabled: false,
};

export * from '@mui/material/MenuItem';
export default MenuItem;
