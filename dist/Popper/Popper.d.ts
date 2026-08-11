import React from 'react';
import { PopperProps as MuiPopperProps } from '@mui/material/Popper';
export declare enum PopperTestIds {
    POPPER_TITLE = "popperTitle",
    POPPER_CONTENT = "popperContent",
    POPPER_CLOSE_ICON = "popperCloseIcon"
}
export type PopperProps = MuiPopperProps & {
    headerChildren?: React.ReactNode;
    contentChildren?: React.ReactNode;
    subHeaderChildren?: React.ReactNode;
    onClose: Function;
    hideSubHeader?: boolean;
    closeIconTooltip?: string;
};
declare const Popper: {
    ({ ...props }: PopperProps): React.JSX.Element;
    defaultProps: {
        onClose: () => void;
        hideSubHeader: boolean;
    };
};
export * from '@mui/material/Popper';
export default Popper;
