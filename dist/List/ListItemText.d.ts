import React from 'react';
import { Components, Theme } from '@mui/material';
import { ListItemTextProps as MuiListItemTextProps } from '@mui/material/ListItemText';
export type ListItemTextProps = MuiListItemTextProps & {
    tooltip?: string;
    tooltipPlacement?: 'top' | 'right' | 'bottom' | 'left' | 'bottom-end' | 'bottom-start' | 'left-end' | 'left-start' | 'right-end' | 'right-start' | 'top-end' | 'top-start';
    forceTooltip: boolean;
    secondaryTooltip?: string;
    secondaryTooltipPlacement?: 'top' | 'right' | 'bottom' | 'left' | 'bottom-end' | 'bottom-start' | 'left-end' | 'left-start' | 'right-end' | 'right-start' | 'top-end' | 'top-start';
};
export declare const getMuiListItemTextThemeOverrides: () => Components<Omit<Theme, 'components'>>;
declare const ListItemText: {
    ({ tooltip, tooltipPlacement, forceTooltip, secondaryTooltip, secondaryTooltipPlacement, ...props }: ListItemTextProps): React.JSX.Element;
    defaultProps: {
        tooltipPlacement: string;
        secondaryTooltipPlacement: string;
        forceTooltip: boolean;
    };
};
export * from '@mui/material/ListItemText';
export default ListItemText;
