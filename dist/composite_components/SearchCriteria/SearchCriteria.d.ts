import * as React from 'react';
import { GridProps } from '@mui/material/Grid';
import { ButtonProps as MuiButtonProps } from '../../Button/Button';
import { TypographyProps } from '../../Typography';
/**
* Props for Drawer Footer Button it extends ButtonProps
*
* @interface FooterButtonProps
* @member label label of the button
*/
export interface FooterButtonProps extends MuiButtonProps {
    label?: string;
}
export interface InternalBackdropProps extends GridProps {
    open?: boolean;
}
/**
* Props for SearchCriteria
*
* @interface SearchCriteriaProps
* @member {React.ReactNode} children The content of the component.
* @member {boolean} open If true, the search criteria will transition in.
* @member {string} label Label for the Search Criteria header.
* @member {TypographyProps} labelProps Label properties for Label in header.
* @member {string} helperIconTooltip Help text for Search Criteria.
* @member {FooterButtonProps[]} footerButtonProps List of button props to render in the footer.
* @member {string | React.ReactNode} secondaryText Label of the Typography it can be string and ReactNode for secondary text in search criteria summary
* @member {TypographyProps} secondaryTextProps Label properties for Secondary text in header.
* @member {string} expandButtonLabel Label of the Button for expanding Search Criteria
* @member {MuiButtonProps} expandButtonProps Props of the Button for expanding Search Criteria
* @member {string} collapseButtonLabel Label of the Button for collapsing Search Criteria
* @member {MuiButtonProps} collapseButtonProps Props of the Button for collapsing Search Criteria
* @member {Function} handleExpand Call this function when we expand Search Criteria
* @member {Function} handleCollapse Call this function when we collapse Search Criteria
*/
export interface SearchCriteriaProps {
    children: React.ReactNode;
    open: boolean;
    label: string;
    labelProps?: TypographyProps;
    helperIconTooltip?: string;
    footerButtonProps?: FooterButtonProps[];
    secondaryText?: string | React.ReactNode;
    secondaryTextProps?: TypographyProps;
    expandButtonProps?: MuiButtonProps;
    expandButtonLabel?: string;
    collapseButtonProps?: MuiButtonProps;
    collapseButtonLabel?: string;
    handleExpand: Function;
    handleCollapse: Function;
}
/**
 * Renders a drawer that opens from the top on the parent div and is used for containers of search parameters.
 * Note: Please add style positon: 'relative' to the parent of this component to position this relative component to the parent and not to the browser.
 * Demo:
 * https://opensource.hcltechsw.com/enchanted-react-components/?path=/story/surfaces-searchcriteria--interactive-example
 */
declare const SearchCriteria: React.FC<SearchCriteriaProps>;
export default SearchCriteria;
