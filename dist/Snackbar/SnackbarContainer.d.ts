/// <reference types="react" />
export declare enum SnackbarContainerPosition {
    LEFT = "left",
    RIGHT = "right"
}
export interface SnackbarContainerProps {
    position?: SnackbarContainerPosition;
}
declare const SnackbarContainer: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material/styles").Theme> & SnackbarContainerProps, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export default SnackbarContainer;
