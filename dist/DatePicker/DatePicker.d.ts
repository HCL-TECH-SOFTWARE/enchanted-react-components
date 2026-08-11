import React from 'react';
import { DatePickerProps as MuiDatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { SvgIconProps } from '@mui/material';
import { ActionProps } from '../prerequisite_components/InputLabelAndAction/InputLabelAndAction';
export interface DatePickerProps<TInputDate, TDate> extends Omit<MuiDatePickerProps<TInputDate, TDate>, 'renderInput'> {
    label?: string;
    helperText?: string;
    enableHelpHoverEffect?: boolean;
    helperIconTooltip?: string;
    format?: string;
    margin?: 'none' | 'dense';
    color?: 'primary';
    size?: 'medium';
    unitLabel?: string;
    required?: boolean;
    disabled?: boolean;
    hiddenLabel?: boolean;
    nonEdit?: boolean;
    error?: boolean;
    fullWidth?: boolean;
    actionProps?: ActionProps[];
    customStyles?: React.CSSProperties | {
        [key: string]: React.CSSProperties;
    };
    customIcon?: React.ComponentType<SvgIconProps> | undefined;
    /**
     * If true, renders a static date picker without input field. Useful for embedded calendar views
     */
    staticMode?: boolean;
}
/**
 * Default prop values for DatePicker.
 * Exported for use in Storybook argTypes and story args.
 */
export declare const DatePickerDefaults: {
    margin: "none";
    color: "primary";
    size: "medium";
    label: string;
    helperText: string;
    enableHelpHoverEffect: boolean;
    helperIconTooltip: string;
    format: string;
    unitLabel: string;
    required: boolean;
    disabled: boolean;
    fullWidth: boolean;
    hiddenLabel: boolean;
    nonEdit: boolean;
    showDaysOutsideCurrentMonth: boolean;
    error: boolean;
    staticMode: boolean;
};
declare const DatePicker: <TInputDate, TDate>({ customStyles, staticMode, margin, color, size, label, helperText, enableHelpHoverEffect, helperIconTooltip, format, unitLabel, required, disabled, fullWidth, hiddenLabel, nonEdit, error, actionProps, customIcon, value, onViewChange, onAccept, ...muiProps }: DatePickerProps<TInputDate, TDate>) => React.JSX.Element;
export * from '@mui/x-date-pickers/DatePicker';
export default DatePicker;
