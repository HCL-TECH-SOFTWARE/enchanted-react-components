import React from 'react';
import { SelectProps as MuiSelectProps } from '@mui/material/Select';
import { Components, Theme, SvgIconProps } from '@mui/material';
import { ActionProps } from '../prerequisite_components/InputLabelAndAction';
export type SelectProps = MuiSelectProps & {
    nonEdit?: boolean;
    actionProps?: ActionProps[];
    helperText?: string;
    enableHelpHoverEffect?: boolean;
    helperIconTooltip?: string;
    margin?: 'none' | 'dense';
    color?: 'primary';
    size?: 'medium';
    unitLabel?: string;
    options?: {
        label: string;
    }[];
    hiddenLabel?: boolean;
    value?: string;
    customIcon?: React.ComponentType<SvgIconProps> | undefined;
    label?: string;
    placeholder?: string;
    children?: React.ReactNode;
};
export declare const getMuiSelectThemeOverrides: () => Components<Omit<Theme, 'components'>>;
declare const Select: React.FC<SelectProps>;
export * from '@mui/material/Select';
export default Select;
