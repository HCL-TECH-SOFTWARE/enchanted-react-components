import React from 'react';
import { ListItemSecondaryActionProps } from '@mui/material/ListItemSecondaryAction';
import { Components, Theme } from '@mui/material';
export declare const getMuiListItemSecondaryActionThemeOverrides: () => Components<Omit<Theme, 'components'>>;
declare const ListItemSecondaryAction: {
    (props: ListItemSecondaryActionProps): React.JSX.Element;
    defaultProps: {};
};
export * from '@mui/material/ListItemAvatar';
export default ListItemSecondaryAction;
