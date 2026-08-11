import React, { ReactNode } from 'react';
import { AccordionSummaryProps } from '../Accordion/AccordionSummary';
export interface PreviewAccordionSummaryProps extends AccordionSummaryProps {
    titlelink?: ReactNode;
    subtitle?: ReactNode;
    leftsection?: ReactNode;
    rightsection?: ReactNode;
}
declare const PreviewAccordionSummary: {
    ({ ...props }: PreviewAccordionSummaryProps): React.JSX.Element;
    defaultProps: {};
};
export default PreviewAccordionSummary;
