import React from 'react';
import { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { Components, Theme } from '@mui/material';
export declare enum LinkType {
    PRIMARY = "primary",
    NEUTRAL_PRIMARY = "neutralPrimary",
    NEUTRAL_SECONDARY = "neutralSecondary"
}
/**
 * @typedef LinkProps
 * @type {object}
 * @property {string} disabled - If `true`, the component is disabled.
 * @property {string} spacing - If `true`, the component has padding.
 * @property {string} type - The color of the component.
 */
export type LinkProps = MuiLinkProps & {
    disabled?: boolean;
    spacing?: boolean;
    type?: LinkType;
    hoverBackground?: boolean;
};
/**
 * Override out of the box styling from mui to align with designer theme
 * @returns override Link component styles and prop
 */
export declare const getMuiLinkThemeOverrides: () => Components<Omit<Theme, 'components'>>;
declare const Link: {
    ({ hoverBackground, spacing, ...props }: LinkProps): React.JSX.Element;
    defaultProps: {
        disabled: boolean;
        type: LinkType;
        spacing: boolean;
        hoverBackground: boolean;
        underline: string;
    };
};
export default Link;
