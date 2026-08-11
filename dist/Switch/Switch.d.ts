import React from 'react';
import { SwitchProps } from '@mui/material/Switch';
import { Components, Theme } from '@mui/material/styles';
declare const Switch: {
    ({ ...props }: SwitchProps): React.JSX.Element;
    defaultProps: {
        centerRipple: boolean;
        disableTouchRipple: boolean;
        focusRipple: boolean;
        disabled: boolean;
    };
};
export declare const getMuiSwitchThemeOverrides: () => Components<Omit<Theme, 'components'>>;
export * from '@mui/material/Switch';
export default Switch;
