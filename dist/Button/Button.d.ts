import React from 'react';
import { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { Components, Theme } from '@mui/material';
declare module '@mui/material/Button' {
    interface ButtonPropsSizeOverrides {
        neutral: true;
    }
}
export declare enum ButtonVariants {
    CONTAINED = "contained",
    OUTLINED = "outlined",
    TEXT = "text"
}
export declare enum ButtonTestIds {
    CONTAINED = "Contained",
    OUTLINED = "Outlined",
    TEXT = "Text"
}
/**
 * @typedef ButtonProps
 * @type {object}
 * @property {boolean} hover - toggles hover appearance for visual test
 */
export type ButtonProps = MuiButtonProps & {
    hover?: boolean;
    inversecolors?: boolean | 0 | 1;
};
declare const Button: React.FC<ButtonProps>;
export declare const getMuiButtonThemeOverrides: () => Components<Omit<Theme, 'components'>>;
export * from '@mui/material/Button';
export default Button;
