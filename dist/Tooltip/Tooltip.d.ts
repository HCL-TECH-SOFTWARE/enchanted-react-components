import React from 'react';
import { TooltipProps as MuiTooltipProps } from '@mui/material/Tooltip';
import { Components, Theme } from '@mui/material';
export declare enum TooltipSizes {
    SMALL = "small",
    MEDIUM = "medium"
}
export declare enum TooltipTypes {
    SINGLELINE = "singleLine",
    MULTILINE = "multiLine"
}
export declare enum TooltipPlacement {
    TOPSTART = "top-start",
    TOP = "top",
    TOPEND = "top-end",
    RIGHTSTART = "right-start",
    RIGHT = "right",
    RIGHTEND = "right-end",
    BOTTOMEND = "bottom-end",
    BOTTOM = "bottom",
    BOTTOMSTART = "bottom-start",
    LEFTEND = "left-end",
    LEFT = "left",
    LEFTSTART = "left-start"
}
export type TooltipProps = MuiTooltipProps & {
    title?: React.ReactNode;
    type?: string;
    maxwidth?: number;
    tooltipsize?: string;
    placement?: string;
};
declare const Tooltip: ({ ...props }: TooltipProps) => React.JSX.Element;
/**
 * @returns override Tooltip component styles and props
 */
export declare const getMuiTooltipThemeOverrides: () => Components<Omit<Theme, 'components'>>;
export * from '@mui/material/Tooltip';
export default Tooltip;
