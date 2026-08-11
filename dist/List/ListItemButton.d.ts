import React, { ReactNode } from 'react';
import { ListItemButtonProps as MuiListItemButtonProps } from '@mui/material/ListItemButton';
import { Components, Theme } from '@mui/material';
export declare enum ListSizes {
    SMALL = "small",
    MEDIUM = "medium"
}
interface ListItemButtonProps extends MuiListItemButtonProps {
    secondaryActionButton?: ReactNode;
    cascading?: boolean;
    size?: ListSizes;
    disabledHover?: boolean;
}
export declare const getMuiListItemButtonThemeOverrides: () => Components<Omit<Theme, 'components'>>;
declare const ListItemButton: {
    ({ disabledHover, ...props }: ListItemButtonProps): React.JSX.Element;
    defaultProps: {
        cascading: boolean;
        size: ListSizes;
    };
};
export * from '@mui/material/ListItemButton';
export default ListItemButton;
