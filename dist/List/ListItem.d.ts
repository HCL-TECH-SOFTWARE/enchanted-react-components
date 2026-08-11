import React from 'react';
import { ListItemProps as MuiListItemProps } from '@mui/material/ListItem';
import { Components, Theme } from '@mui/material';
interface ListItemProps extends MuiListItemProps {
    hasBorder?: boolean;
}
export declare const getMuiListItemThemeOverrides: () => Components<Omit<Theme, 'components'>>;
declare const ListItem: React.ForwardRefExoticComponent<Omit<ListItemProps, "ref"> & React.RefAttributes<HTMLLIElement>>;
export * from '@mui/material/ListItem';
export default ListItem;
