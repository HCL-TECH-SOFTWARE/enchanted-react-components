import React from 'react';
import { MenuProps as MuiMenuProps } from '@mui/material/Menu';
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
    showFooterAction?: boolean;
    showDivider?: boolean;
    showIcon?: boolean;
    showCheck?: boolean;
    showHint?: boolean;
    showCascading?: boolean;
    selected?: boolean;
    disabled?: boolean;
    size: string;
    footerActionButtonText?: string;
};
export declare enum MenuSizes {
    SMALL = "small",
    MEDIUM = "medium"
}
declare const Menu: ({ ...props }: MenuProps) => React.JSX.Element;
/**
 * @returns override Menu component styles and props
 */
export declare const getMuiMenuThemeOverrides: () => Components<Omit<Theme, 'components'>>;
export * from '@mui/material/Menu';
export default Menu;
