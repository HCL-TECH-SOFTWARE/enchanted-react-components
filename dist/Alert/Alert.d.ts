import React from 'react';
import { AlertProps as MuiAlertProps } from '@mui/material/Alert';
import { Components, Theme } from '@mui/material';
declare module '@mui/material/Alert' {
    interface AlertPropsVariantOverrides {
        contained: true;
    }
}
export declare enum AlertVariants {
    CONTAINED = "contained",
    OUTLINED = "outlined"
}
export declare enum AlertSeverity {
    WARNING = "warning",
    SUCCESS = "success",
    ERROR = "error",
    INFORMATION = "info"
}
export declare const getMuiAlertThemeOverrides: () => Components<Omit<Theme, 'components'>>;
export type AlertProps = Omit<MuiAlertProps, 'elevation' | 'square'> & {
    message: string;
    width: number;
};
declare const Alert: {
    ({ ...props }: AlertProps): React.JSX.Element;
    defaultProps: AlertProps;
};
export * from '@mui/material/Alert';
export default Alert;
