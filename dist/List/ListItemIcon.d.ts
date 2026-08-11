import React from 'react';
import { ListItemIconProps } from '@mui/material/ListItemIcon';
import { Components, Theme } from '@mui/material';
export declare const getMuiListItemIconThemeOverrides: () => Components<Omit<Theme, 'components'>>;
declare const ListItemIcon: ({ ...props }: ListItemIconProps) => React.JSX.Element;
export * from '@mui/material/ListItemIcon';
export default ListItemIcon;
