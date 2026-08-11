import React from 'react';
import { Theme } from '@mui/material/styles';
import { SnackbarVariants } from '../Snackbar/Snackbar';
import { SnackbarGroupItem, SnackbarGroupPolicy } from './SnackbarGroup';
interface ThemeColors {
    background: string;
    text: string;
    textTertiary: string;
    iconColor: string;
}
interface SnackbarGroupItemsProps {
    visibleItems: SnackbarGroupItem[];
    expanded: boolean;
    policy: SnackbarGroupPolicy;
    items: SnackbarGroupItem[];
    colors: ThemeColors;
}
export declare const getVariantColors: (theme: Theme) => Record<SnackbarVariants, string>;
declare const SnackbarGroupItems: React.ForwardRefExoticComponent<SnackbarGroupItemsProps & React.RefAttributes<HTMLDivElement>>;
export default SnackbarGroupItems;
