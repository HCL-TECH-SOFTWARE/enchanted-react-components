import React from 'react';
import { SnackbarProps as MuiSnackbarProps } from '@mui/material/Snackbar';
import { Components, Theme } from '@mui/material';
import { CircularProgressVariants } from '../ProgressIndicator/CircularProgress';
export declare enum SnackbarVariants {
    WARNING = "warning",
    INFO = "information",
    ERROR = "error",
    SUCCESS = "success",
    PROGRESS = "progress"
}
export declare enum SnackbarTestIds {
    SNACKBAR_ICON = "snackbarIcon",
    SNACKBAR_MESSAGE = "snackbarMessage",
    SNACKBAR_CLOSE = "snackbarClose",
    SNACKBAR_BUTTON = "snackbarButton",
    SNACKBAR_PLACEHOLDER_ICON = "snackbarPlaceholderIcon"
}
export declare const getMuiSnackbarThemeOverrides: () => Components<Omit<Theme, 'components'>>;
/**
 * @typedef SnackbarProps
 * @type {object}
 * @property {SnackbarVariants} variant - The variant to use that will determine leading icon in snackbar.
 * @property {boolean} disabledSnackbar - Renders snackbar buttons as disabled
 * @property {string} buttonText - Text to show inside action Button. If empty string or no corresponding buttonAction function, it will hide itself.
 * @property {Function} buttonAction - Callback fired when action Button is clicked.
 * @property {Function} onClose - Callback fired when the component requests to be closed.
 * @property {JSX.Element} placeholderIcon - The icon button shown that provides additional functionality or action to the snackbar.
 * @property {Function} placeholderIconAction - Callback fired when placeholder icon button is clicked.
 * @property {boolean} showPlaceholderIcon - Used to toggle visibility of placeholder icon.
 * @property {CircularProgressVariants} progressVariant - This will only affect component when the variant is in progress. Choose what variant of CircularProgress to use.
 * @property {boolean} progressValue - The value of the progress indicator for the determinate variant. Value between 0 and 100.
 */
export type SnackbarProps = MuiSnackbarProps & {
    variant: SnackbarVariants;
    disabledSnackbar: boolean;
    buttonText?: string;
    buttonTextToolTip?: string;
    buttonAction: Function;
    onClose: Function;
    placeholderIcon?: JSX.Element;
    placeholderIconAction: Function;
    showPlaceholderIcon?: boolean;
    progressVariant?: CircularProgressVariants;
    progressValue?: number;
    closeIconToolTip?: string;
};
declare const Snackbar: {
    ({ ...props }: SnackbarProps): React.JSX.Element;
    defaultProps: {
        variant: SnackbarVariants;
        disabledSnackbar: boolean;
        progressVariant: CircularProgressVariants;
        progressValue: number;
        buttonAction: () => void;
        placeholderIconAction: () => void;
        onClose: () => void;
        showPlaceholderIcon: boolean;
        closeIconToolTip: string;
    };
};
export * from '@mui/material/Snackbar';
export default Snackbar;
