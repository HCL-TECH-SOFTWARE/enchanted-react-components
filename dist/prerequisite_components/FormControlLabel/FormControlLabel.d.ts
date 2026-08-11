import React from 'react';
import { Components, Theme } from '@mui/material';
import { FormControlLabelProps } from '@mui/material/FormControlLabel';
/**
 * Override out of the box styling from mui to align with designer theme
 * @returns override FormControlLabel component styles and prop
 */
export declare const getMuiFormControlLabelThemeOverrides: () => Components<Omit<Theme, 'components'>>;
declare const FormControlLabel: {
    ({ ...props }: FormControlLabelProps): React.JSX.Element;
    defaultProps: {};
};
export * from '@mui/material/FormControlLabel';
export default FormControlLabel;
