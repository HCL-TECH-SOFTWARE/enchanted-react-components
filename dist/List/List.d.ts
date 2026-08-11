import React from 'react';
import { ListProps } from '@mui/material/List';
import { Components, Theme } from '@mui/material';
export declare const getMuiListThemeOverrides: () => Components<Omit<Theme, 'components'>>;
declare const List: React.ForwardRefExoticComponent<Omit<ListProps<"ul", {}>, "ref"> & React.RefAttributes<HTMLUListElement>>;
export * from '@mui/material/List';
export default List;
