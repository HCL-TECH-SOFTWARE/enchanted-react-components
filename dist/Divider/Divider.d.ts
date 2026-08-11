import React from 'react';
import { DividerProps } from '@mui/material/Divider';
import { Components, Theme } from '@mui/material';
export declare enum DividerTypes {
    PRIMARY = "primary",
    SECONDARY = "secondary",
    WITHMARGIN = "withMargin",
    NOPADDING = "noPadding"
}
/**
 * @returns override Divider component styles and props
 */
export declare const getMuiDividerThemeOverrides: () => Components<Omit<Theme, 'components'>>;
declare const Divider: {
    ({ ...props }: DividerProps): React.JSX.Element;
    defaultProps: {
        type: string;
    };
};
export default Divider;
