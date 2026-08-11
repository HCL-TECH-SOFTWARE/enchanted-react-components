import React from 'react';
import { SnackbarVariants } from '../Snackbar/Snackbar';
interface ThemeColors {
    background: string;
    text: string;
    textTertiary: string;
    iconColor: string;
}
interface VariantCounts {
    [SnackbarVariants.ERROR]: number;
    [SnackbarVariants.WARNING]: number;
    [SnackbarVariants.SUCCESS]: number;
    [SnackbarVariants.INFO]: number;
}
interface SnackbarGroupHeaderProps {
    variantCounts: VariantCounts;
    totalCount: number;
    showVariantBadges: boolean;
    hasOverflow: boolean;
    expanded: boolean;
    colors: ThemeColors;
    onExpandChange: (expanded: boolean) => void;
    onCloseAll?: () => void;
}
declare const SnackbarGroupHeader: React.ForwardRefExoticComponent<SnackbarGroupHeaderProps & React.RefAttributes<HTMLDivElement>>;
export default SnackbarGroupHeader;
