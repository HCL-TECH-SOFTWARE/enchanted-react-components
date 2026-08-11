import React from 'react';
import { SxProps, Theme } from '@mui/material/styles';
import { SnackbarOrigin } from '@mui/material/Snackbar';
import { SnackbarVariants } from '../Snackbar/Snackbar';
export declare const getSnackbarGroupColors: (theme: Theme) => {
    background: string;
    text: string;
    textTertiary: string;
    iconColor: string;
};
export interface SnackbarGroupItem {
    id: string;
    message: React.ReactNode;
    variant: SnackbarVariants;
    buttonText?: string;
    buttonAction?: () => void;
    showActionButton?: boolean;
    autoHideDuration?: number;
    meta?: Record<string, unknown>;
}
export type SnackbarGroupPolicy = 'stack' | 'queue';
export interface SnackbarGroupProps {
    open: boolean;
    items: SnackbarGroupItem[];
    policy?: SnackbarGroupPolicy;
    maxVisible?: number;
    defaultExpanded?: boolean;
    showVariantBadges?: boolean;
    includeProgressInHeaderCounts?: boolean;
    onCloseItem?: (id: string) => void;
    onCloseAll?: () => void;
    onExpandChange?: (expanded: boolean) => void;
    anchorOrigin?: SnackbarOrigin;
    sx?: SxProps<Theme>;
}
declare const SnackbarGroup: React.ForwardRefExoticComponent<SnackbarGroupProps & React.RefAttributes<HTMLDivElement>>;
export default SnackbarGroup;
