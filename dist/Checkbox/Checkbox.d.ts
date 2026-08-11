import React from 'react';
import { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox';
import { Components, Theme } from '@mui/material';
export declare enum CheckboxVariants {
    WITHOUT_PADDING = "without padding",
    WITH_PADDING = "with padding"
}
/**
 * Override out of the box styling from mui to align with designer theme
 * @returns override Checkbox component styles and prop
 */
export declare const getMuiCheckboxThemeOverrides: () => Components<Omit<Theme, 'components'>>;
/**
 * @typedef CheckboxProps
 * @type {object}
 * @property {CheckboxVariants} variant - Adds padding around icon svg
 */
export type CheckboxProps = MuiCheckboxProps & {
    variant?: CheckboxVariants;
};
declare const Checkbox: React.FC<CheckboxProps>;
export default Checkbox;
