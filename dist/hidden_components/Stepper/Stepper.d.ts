import React from 'react';
import { StepperProps } from '@mui/material/Stepper';
declare const Stepper: {
    ({ ...props }: StepperProps): React.JSX.Element;
    defaultProps: StepperProps<"div", {
        component?: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
    }>;
};
export * from '@mui/material/Stepper';
export default Stepper;
