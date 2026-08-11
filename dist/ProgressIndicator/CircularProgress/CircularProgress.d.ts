import React from 'react';
import { CircularProgressProps as MuiCircularProgressProps } from '@mui/material/CircularProgress';
import { Components, Theme } from '@mui/material';
export declare enum CircularProgressVariants {
    DETERMINATE = "determinate",
    INDETERMINATE = "indeterminate"
}
export declare enum CircularProgressTestIds {
    PROGRESS_ROOT = "progressRoot",
    PROGRESS_TRAIL = "progressTrail",
    PROGRESS_CIRCLE = "progressCircle",
    PROGRESS_LABEL = "progressLabel"
}
/**
 * @typedef CircularProgressProps
 * @type {object}
 * @property {boolean} showprogress - Toggles showprogress state to enable/disable progress text inside progress in case of 'determinate' variant
 */
export type CircularProgressProps = MuiCircularProgressProps & {
    showprogress?: boolean | 0 | 1;
    withbackdrop?: boolean | 0 | 1;
};
export declare const getMuiCircularProgressThemeOverrides: () => Components<Omit<Theme, 'components'>>;
declare const CircularProgress: {
    ({ withbackdrop, ...props }: CircularProgressProps): React.JSX.Element;
    defaultProps: CircularProgressProps;
};
export * from '@mui/material/CircularProgress';
export default CircularProgress;
