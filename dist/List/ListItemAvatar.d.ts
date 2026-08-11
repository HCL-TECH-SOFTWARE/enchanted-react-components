import React from 'react';
import { ListItemAvatarProps as MuiListItemAvatarProps } from '@mui/material/ListItemAvatar';
import { Components, Theme } from '@mui/material';
export type ListItemAvatarProps = MuiListItemAvatarProps & {};
export declare const getMuiListItemAvatarThemeOverrides: () => Components<Omit<Theme, 'components'>>;
declare const ListItemAvatar: {
    (props: ListItemAvatarProps): React.JSX.Element;
    defaultProps: {};
};
export * from '@mui/material/ListItemAvatar';
export default ListItemAvatar;
