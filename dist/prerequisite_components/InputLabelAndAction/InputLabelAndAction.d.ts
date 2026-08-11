import React, { ReactNode } from 'react';
import { InputLabelProps as MuiInputLabelProps } from '@mui/material/InputLabel';
import { Theme, SvgIconProps } from '@mui/material';
import { TooltipPlacement } from '../../Tooltip';
export interface ActionProps {
    href?: string;
    label: string;
    endIcon?: boolean;
    handleClick?(event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>): void;
    disabled?: boolean;
    tooltip?: string;
}
export interface InputLabelAndActionProps extends MuiInputLabelProps {
    actionProps?: ActionProps[];
    helperIconTooltip?: string;
    tooltipPlacement?: TooltipPlacement;
    hiddenLabel?: boolean;
    label?: ReactNode | string;
    isFocus?: boolean;
    fullWidth?: boolean;
    enableHelpHoverEffect?: boolean;
    customIcon?: React.ComponentType<SvgIconProps>;
}
export declare const labelFocus: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<Theme>, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const MuiInputHelpIcon: import("@emotion/styled").StyledComponent<import("@mui/material").SvgIconOwnProps & import("@mui/material/OverridableComponent").CommonProps & Omit<Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
    ref?: ((instance: SVGSVGElement | null) => void) | React.RefObject<SVGSVGElement> | null | undefined;
}, "className" | "style" | "classes" | "color" | "fontSize" | "shapeRendering" | "children" | "sx" | "viewBox" | "htmlColor" | "inheritViewBox" | "titleAccess"> & {
    component?: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
} & import("@mui/system").MUIStyledCommonProps<Theme> & {
    enableHelpHoverEffect?: boolean | undefined;
}, {}, {}>;
export declare const StyledInputLabel: import("@emotion/styled").StyledComponent<import("@mui/material").InputLabelOwnProps & Pick<import("@mui/material").FormLabelOwnProps, "color" | "filled"> & import("@mui/material/OverridableComponent").CommonProps & Omit<Omit<React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>, "ref"> & {
    ref?: ((instance: HTMLLabelElement | null) => void) | React.RefObject<HTMLLabelElement> | null | undefined;
}, "className" | "style" | "classes" | "color" | "margin" | "children" | "sx" | "variant" | "disabled" | "required" | "size" | "filled" | "error" | "focused" | "disableAnimation" | "shrink"> & import("@mui/system").MUIStyledCommonProps<Theme>, {}, {}>;
export declare const MuiGrid: import("@emotion/styled").StyledComponent<import("@mui/material").GridOwnProps & import("@mui/material/OverridableComponent").CommonProps & Omit<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null | undefined;
}, "className" | "style" | "classes" | "border" | "borderTop" | "borderRight" | "borderBottom" | "borderLeft" | "borderColor" | "borderRadius" | "display" | "displayPrint" | "overflow" | "textOverflow" | "visibility" | "whiteSpace" | "flexBasis" | "flexDirection" | "flexWrap" | "justifyContent" | "alignItems" | "alignContent" | "order" | "flex" | "flexGrow" | "flexShrink" | "alignSelf" | "justifyItems" | "justifySelf" | "gap" | "columnGap" | "rowGap" | "gridColumn" | "gridRow" | "gridAutoFlow" | "gridAutoColumns" | "gridAutoRows" | "gridTemplateColumns" | "gridTemplateRows" | "gridTemplateAreas" | "gridArea" | "bgcolor" | "color" | "zIndex" | "position" | "top" | "right" | "bottom" | "left" | "boxShadow" | "width" | "maxWidth" | "minWidth" | "height" | "maxHeight" | "minHeight" | "boxSizing" | "m" | "mt" | "mr" | "mb" | "ml" | "mx" | "my" | "p" | "pt" | "pr" | "pb" | "pl" | "px" | "py" | "margin" | "marginTop" | "marginRight" | "marginBottom" | "marginLeft" | "marginX" | "marginY" | "marginInline" | "marginInlineStart" | "marginInlineEnd" | "marginBlock" | "marginBlockStart" | "marginBlockEnd" | "padding" | "paddingTop" | "paddingRight" | "paddingBottom" | "paddingLeft" | "paddingX" | "paddingY" | "paddingInline" | "paddingInlineStart" | "paddingInlineEnd" | "paddingBlock" | "paddingBlockStart" | "paddingBlockEnd" | "typography" | "fontFamily" | "fontSize" | "fontStyle" | "fontWeight" | "letterSpacing" | "lineHeight" | "textAlign" | "textTransform" | "direction" | "columns" | "container" | "children" | "sx" | "wrap" | "spacing" | "xs" | "sm" | "md" | "lg" | "xl" | "columnSpacing" | "item" | "rowSpacing" | "zeroMinWidth"> & import("@mui/system").MUIStyledCommonProps<Theme> & {
    component?: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
}, {}, {}>;
export declare const StyledSpan: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<Theme>, React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, {}>;
declare const InputLabelAndAction: React.FC<InputLabelAndActionProps>;
export default InputLabelAndAction;
