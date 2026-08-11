import React from 'react';
import { MenuItemProps as MuiMenuItemProps } from '@mui/material/MenuItem';
import { Components, Theme } from '@mui/material';
export type MenuItemProps = MuiMenuItemProps & {
    cascading?: boolean | 0 | 1;
};
export declare const getMuiMenuItemThemeOverrides: () => Components<Omit<Theme, 'components'>>;
declare const MenuItem: {
    ({ ...props }: MenuItemProps): React.JSX.Element;
    defaultProps: {
        size: string;
        disabled: boolean;
    };
};
export * from '@mui/material/MenuItem';
export default MenuItem;
