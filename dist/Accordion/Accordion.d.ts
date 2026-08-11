import React from 'react';
import { AccordionProps } from '@mui/material/Accordion';
export declare enum AccordionTypes {
    OUTLINED = "outlined",
    NO_OUTLINE = "no-outline"
}
export type AccordionPropsAll = AccordionProps & {
    showCheckBox?: boolean;
    disabled?: boolean;
    isfocused?: boolean;
    hasNested?: boolean;
    hasDivider?: boolean;
    showSecondaryText?: boolean;
    type: AccordionTypes;
    square?: boolean;
};
declare const Accordion: {
    ({ ...props }: AccordionPropsAll): React.JSX.Element;
    defaultProps: AccordionPropsAll;
};
export * from '@mui/material/Accordion';
export default Accordion;
