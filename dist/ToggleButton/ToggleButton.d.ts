import React from 'react';
import { ToggleButtonProps as MuiToggleButtonProps } from '@mui/material/ToggleButton';
import { Components, Theme } from '@mui/material/styles';
export declare enum ToggleButtonVariants {
    WITHOUT_PADDING = "without padding",
    WITH_PADDING = "with padding"
}
export declare enum ToggleButtonSizes {
    SMALL = "small",
    MEDIUM = "medium"
}
/**
 * @typedef ToggleButtonProps
 * @type {object}
 * @property {ToggleButtonSizes} size - The size of the component
 * @property {ToggleButtonVariants} variant - Adds padding around icon svg
 */
export interface ToggleButtonProps extends MuiToggleButtonProps {
    size?: ToggleButtonSizes;
    variant?: ToggleButtonVariants;
}
declare const ToggleButton: React.FC<ToggleButtonProps>;
export declare const getMuiToggleButtonThemeOverrides: () => Components<Omit<Theme, 'components'>>;
export default ToggleButton;
