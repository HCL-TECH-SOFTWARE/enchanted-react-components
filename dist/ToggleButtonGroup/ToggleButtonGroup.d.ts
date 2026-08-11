import React from 'react';
import { ToggleButtonGroupProps as MuiToggleButtonGroupProps } from '@mui/material/ToggleButtonGroup';
import { Components, Theme } from '@mui/material/styles';
export declare enum ToggleButtonGroupSizes {
    SMALL = "small",
    MEDIUM = "medium"
}
/**
 * @typedef ToggleButtonGroupProps
 * @type {object}
 * @property {ToggleButtonGroupSizes} size - The size of the component
 */
export interface ToggleButtonGroupProps extends MuiToggleButtonGroupProps {
    size?: ToggleButtonGroupSizes;
}
declare const ToggleButtonGroup: {
    ({ ...props }: MuiToggleButtonGroupProps): React.JSX.Element;
    defaultProps: {
        size: ToggleButtonGroupSizes;
        orientation: string;
        disabled: boolean;
        exclusive: boolean;
    };
};
export declare const getMuiToggleButtonGroupThemeOverrides: () => Components<Omit<Theme, 'components'>>;
export * from '@mui/material/ToggleButtonGroup';
export default ToggleButtonGroup;
