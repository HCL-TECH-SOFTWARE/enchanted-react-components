import React from 'react';
import { BreadcrumbsProps as MuiBreadcrumbsProps } from '@mui/material/Breadcrumbs';
import { Components, Theme } from '@mui/material';
/**
 * @typedef BreadcrumbsProps
 * @type {object}
 * @property {string} disabled - If `true`, the component is disabled.
 */
export type BreadcrumbsProps = MuiBreadcrumbsProps & {
    disabled?: boolean;
};
/**
 * Override out of the box styling from mui to align with designer theme
 * @returns override Breadcrumbs component styles and prop
 */
export declare const getMuiBreadcrumbsThemeOverrides: () => Components<Omit<Theme, 'components'>>;
declare const Breadcrumbs: {
    ({ ...props }: BreadcrumbsProps): React.JSX.Element;
    defaultProps: {
        disabled: boolean;
    };
};
export default Breadcrumbs;
