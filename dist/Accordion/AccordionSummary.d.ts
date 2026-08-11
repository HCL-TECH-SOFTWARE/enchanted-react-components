import React, { ReactNode } from 'react';
import { AccordionSummaryProps as MuiAccordionSummaryProps } from '@mui/material/AccordionSummary';
export interface AccordionSummaryProps extends MuiAccordionSummaryProps {
    hoveractions?: ReactNode;
}
declare const AccordionSummary: {
    ({ ...props }: AccordionSummaryProps): React.JSX.Element;
    defaultProps: {};
};
export * from '@mui/material/AccordionSummary';
export default AccordionSummary;
