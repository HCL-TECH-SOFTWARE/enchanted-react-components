import React from 'react';
import { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import { Components, Theme } from '@mui/material';
export declare enum DialogSizes {
    EXTRA_SMALL = "XS",
    SMALL = "SM",
    MEDIUM = "MD",
    LARGE = "LG",
    EXTRA_LARGE = "XL"
}
export declare enum DialogTestIds {
    DIALOG_TITLE = "dialogTitle",
    DIALOG_CONTENT = "dialogContent",
    DIALOG_ACTIONS = "dialogActions",
    DIALOG_CLOSE_ICON = "dialogCloseIcon"
}
export declare const getMuiDialogThemeOverrides: () => Components<Omit<Theme, 'components'>>;
/**
 * @typedef DialogProps
 * @type {object}
 * @property {React.ReactNode} headerChildren - Node to render inside DialogTitle
 * @property {React.ReactNode} contentChildren - Node to render inside DialogContent
 * @property {React.ReactNode} footerChildren - Node to render inside DialogActions
 * @property {DialogSizes} size - Sets min-width and max-width of Dialog
 * @property {boolean} withPadding - Adds default padding of 12px all around DialogContent if set to `true`
 * @property {Function} onClose - Callback fired when the component requests to be closed.
 * @property {Function} hideHeader - Toggles header or DialogTitle, if `true`, then it is hidden
 * @property {Function} hideFooter - Toggles footer or DialogActions, if `true`, then it is hidden
 */
export type DialogProps = MuiDialogProps & {
    headerChildren?: React.ReactNode;
    contentChildren?: React.ReactNode;
    footerChildren?: React.ReactNode;
    size?: DialogSizes;
    withPadding?: boolean;
    onClose: Function;
    hideHeader?: boolean;
    hideFooter?: boolean;
    closeIconToolTip?: string;
};
declare const Dialog: {
    ({ ...props }: DialogProps): React.JSX.Element;
    defaultProps: {
        'aria-labelledby': string;
        'aria-describedby': string;
        size: DialogSizes;
        withPadding: boolean;
        onClose: () => void;
        hideHeader: boolean;
        hideFooter: boolean;
        closeIconToolTip: string;
    };
};
export * from '@mui/material/Dialog';
export default Dialog;
