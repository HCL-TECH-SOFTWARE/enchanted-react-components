import React from 'react';
import { Components, Theme } from '@mui/material';
import { IconButtonProps as MuiIconButtonProps } from '@mui/material/IconButton';
export declare enum IconButtonVariants {
    WITHOUT_PADDING = "without padding",
    WITH_PADDING = "with padding"
}
export declare enum IconButtonSizes {
    SMALL = "small",
    MEDIUM = "medium"
}
export declare enum IconButtonTestIds {
    ICONBUTTON_END_ICON = "iconButtonEndIcon"
}
export declare const getMuiIconButtonThemeOverrides: () => Components<Omit<Theme, 'components'>>;
/**
 * @typedef IconButtonProps
 * @type {object}
 * @property {IconButtonSizes} size - The size of the component
 * @property {IconButtonVariants} variant - Adds padding around icon svg
 * @property {string} color - The color of the component.
 * @property {boolean} selected - Set the component as selected.
 * @property {string} label - Label of the component.
 * @property {boolean} showendicon - Show/hide the end icon.
 */
export type IconButtonProps = MuiIconButtonProps & {
    size?: string;
    variant?: IconButtonVariants;
    color?: 'default';
    selected?: boolean;
    label?: string;
    showendicon?: boolean | 0 | 1;
    inversecolors?: boolean | 0 | 1;
};
declare const IconButton: React.FC<IconButtonProps>;
export * from '@mui/material/IconButton';
export default IconButton;
