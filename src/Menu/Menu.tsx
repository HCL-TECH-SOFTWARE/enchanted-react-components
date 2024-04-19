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
import MuiMenu, { MenuProps as MuiMenuProps } from '@mui/material/Menu';
import { Components, Theme } from '@mui/material';

/**
 * @typedef MenuProps
 * @type {object}
 * @property {boolean} showFooterAction - Enabling action button in menu footer
 * @property {boolean} showDivider - Show divider after menuitem
 * @property {boolean} showIcon - Render icon in menu item
 * @property {boolean} showCheck - Render check in menu item
 * @property {boolean} showHint - Renders snackbar buttons as disabled
 * @property {boolean} selected - Select menu item
 * @property {boolean} disabled - Disable menu item
 * @property {boolean} size - Renders small and medium size of icons and text
 * @property {string} footerActionButtonText - Text to show inside action Button.
 */
export type MenuProps = MuiMenuProps & {
  showFooterAction?: boolean,
  showDivider?: boolean,
  showIcon?: boolean,
  showCheck?: boolean,
  showHint?: boolean,
  showCascading?: boolean,
  selected?: boolean,
  disabled?: boolean,
  size: string,
  footerActionButtonText?: string,
}

export enum MenuSizes {
  SMALL = 'small',
  MEDIUM = 'medium',
}

const Menu = ({ ...props }: MenuProps) => {
  return <MuiMenu {...props} elevation={2} />;
};

/**
 * @returns override Menu component styles and props
 */
export const getMuiMenuThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiMenu: {
      styleOverrides: {
        list: ({ theme }) => {
          return {
            '&.MuiMenu-list': {
              paddingTop: '4px',
              paddingBottom: '4px',
              '.MuiButtonBase-root': {
                '.MuiButtonBase-root': {
                  ...theme.typography.subtitle1,
                },
              },
            },
            // By default .MuiMenuItem-root+.MuiDivider-root is set to 8 px, we had to set it 4 px from top and bottom as per design
            '.MuiMenuItem-root+.MuiDivider-root': {
              marginTop: '4px',
              marginBottom: '4px',
            },
          };
        },
      },
    },
  };
};

export * from '@mui/material/Menu';
export default Menu;
