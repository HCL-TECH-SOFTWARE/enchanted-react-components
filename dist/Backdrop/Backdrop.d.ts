import React from 'react';
import { Components, Theme } from '@mui/material';
import { BackdropProps } from '@mui/material/Backdrop';
export declare enum BackdropTestIds {
    BACKDROP_ROOT = "backdropRoot"
}
export declare const getMuiBackdropThemeOverrides: () => Components<Omit<Theme, 'components'>>;
declare const Backdrop: {
    ({ ...props }: BackdropProps): React.JSX.Element;
    defaultProps: {
        invisible: boolean;
    };
};
export * from '@mui/material/Backdrop';
export default Backdrop;
