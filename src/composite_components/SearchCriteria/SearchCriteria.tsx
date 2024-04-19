/* ======================================================================== *
 * Copyright 2024 HCL America Inc.                                          *
 * Licensed under the Apache License, Version 2.0 (the "License");          *
 * you may not use this file except in compliance with the License.         *
 * You may obtain a copy of the License at                                  *
 *                                                                          *
 * http://www.apache.org/licenses/LICENSE-2.0                               *
 *                                                                          *
 * Unless required by applicable law or agreed to in writing, software      *
 * distributed under the License is distributed on an "AS IS" BASIS,        *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 * See the License for the specific language governing permissions and      *
 * limitations under the License.                                           *
 * ======================================================================== */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Theme } from '@mui/material';
import Grid, { GridProps } from '@mui/material/Grid';
import HelpIcon from '@hcl-software/enchanted-icons/dist/carbon/es/help';
import Toolbar, { ToolbarProps } from '@mui/material/Toolbar';
import Collapse from '@mui/material/Collapse';

import Button, { ButtonProps as MuiButtonProps } from '../../Button/Button';
import Typography, { TypographyProps } from '../../Typography';
import Tooltip from '../../Tooltip';
import Divider from '../../Divider';

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
* Drawer Footer Grid styling
*/
const DrawerFooter = styled(Grid)(() => {
  return {
    marginTop: '12px',
  };
});

/**
* Help Text Icon styling
*/
const InternalHelpIcon = styled(HelpIcon)((theme) => {
  return {
    ...theme.theme.typography.body2,
    marginLeft: '4px',
    height: '16px',
    width: '16px',
    marginTop: '4px',
  };
});

// Since the trigger button to open a backdrop is also inside the component, using the MUI / Enchanted Backdrop is impossible.
// We have implemented a pseudo-backdrop inside SearchCriteria (Current use case: Content Reporting)
/**
* Grid styling for the backdrop
*/
const InternalBackdrop = styled(Grid)<InternalBackdropProps>((props) => {
  return {
    left: '0',
    top: '0',
    height: `${props.open ? '100%' : ''}`,
    width: '100%',
    zIndex: '2',
  };
});

/**
* Drawer Footer Grid styling
*/
const InternalGridDrawer = styled('div')((theme) => {
  return {
    outline: 'none',
    backgroundColor: theme.theme.palette.background.paper,
    width: '100%',
    left: '0',
    top: '0',
    display: 'block',
    maxHeight: 'inherit',
    boxShadow: theme.theme.shadows[1],
  };
});

/**
* Typhography styling for Label Text
*/
const SearchCriteriaLabel = styled('div')((theme) => {
  return {
    flexBasis: 'fit-content',
    alignSelf: 'flex-start',
    whiteSpace: 'nowrap',
    paddingTop: '3px',
  };
});

/**
* Typhography styling for Label Text
*/
const SearchCriteriaFiller = styled('div')((theme) => {
  return {
    flexGrow: 1,
    flexShrink: 0,
  };
});

/**
* Typhography styling for Secondary Text
*/
const SearchCriteriaSecondaryLabel = styled('div')((theme) => {
  return {
    marginLeft: '12px',
    marginRight: '12px',
    color: theme.theme.palette.text.secondary,
    flexBasis: 'fit-content',
    paddingTop: '6px',
    paddingBottom: '6px',
    alignSelf: 'flex-start',
  };
});

/**
* Div styling for View Button
*/
const SearchCriteriaViewButtonDiv = styled('div')((theme) => {
  return {
    alignSelf: 'flex-start',
  };
});

/**
* Toolbar styling for header
*/
const SearchCriteriaSummary = styled(Toolbar)<ToolbarProps>((theme) => {
  return {
    color: theme.theme.palette.text.secondary,
    display: 'flex',
    justifyContent: 'space-between',
    '&.MuiToolbar-root': {
      minHeight: '28px',
      padding: '4px 12px',
      alignItems: 'flex-start',
      maxHeight: 'inherit',
    },
  };
});

/**
* Button styling for header button
*/
const SearchCriteriaViewButton = styled(Button)<MuiButtonProps>(() => {
  return {
    right: '4px',
    marginLeft: '12px',
    whiteSpace: 'nowrap',
  };
});

/**
 * Renders a drawer that opens from the top on the parent div and is used for containers of search parameters.
 * Note: Please add style positon: 'relative' to the parent of this component to position this relative component to the parent and not to the browser.
 * Demo:
 * https://pages.git.cwp.pnp-hcl.com/websphere-portal-incubator/enchanted-material-ui-core/?path=/story/surfaces-searchcriteria--example-search-criteria
 */
const SearchCriteria: React.FC<SearchCriteriaProps> = ({
  footerButtonProps,
  label,
  helperIconTooltip,
  labelProps,
  secondaryText,
  secondaryTextProps,
  expandButtonProps,
  expandButtonLabel,
  open,
  handleExpand,
  collapseButtonProps,
  collapseButtonLabel,
  handleCollapse,
  ...props
}: SearchCriteriaProps) => {
  const [position, setPosition] = React.useState(true);

  const handleStartPosition = () => {
    setPosition(false);
  };
  const handleEndPosition = () => {
    setPosition(true);
  };

  return (
    <>
      {open && <Grid sx={{ height: '52px' }} />}
      {!position && <Grid sx={{ height: '52px' }} />}
      <InternalBackdrop
        sx={{
          background: (theme: Theme) => { return (open ? theme.palette.background.overlay : ''); },
          position: `${open ? 'absolute' : `${position ? 'sticky' : 'absolute'}`}`,
        }}
        open={open}
      >
        <InternalGridDrawer>
          <SearchCriteriaSummary>
            <SearchCriteriaLabel>
              <Typography
                variant="subtitle1"
                color={open ? 'text.primary' : 'text.secondary'}
                {...labelProps}
              >
                {label}
              </Typography>
            </SearchCriteriaLabel>
            {secondaryText && !open && (
            <SearchCriteriaSecondaryLabel>
              {typeof secondaryText === 'string' ? (
                <Typography variant="body2" {...secondaryTextProps}>{secondaryText}</Typography>
              ) : <>{secondaryText}</>}
            </SearchCriteriaSecondaryLabel>
            )}
            {open && helperIconTooltip ? <Tooltip title={helperIconTooltip}><InternalHelpIcon color="action" /></Tooltip> : ''}
            <SearchCriteriaFiller />
            {!open && (
            <SearchCriteriaViewButtonDiv>
              <SearchCriteriaViewButton
                variant="text"
                onClick={() => { return handleExpand(); }}
                {...expandButtonProps}
              >
                {expandButtonLabel}
              </SearchCriteriaViewButton>
            </SearchCriteriaViewButtonDiv>
            )}
          </SearchCriteriaSummary>
          <Collapse
            in={open}
            onExit={handleStartPosition}
            onExited={handleEndPosition}
            timeout={{
              enter: 500,
              exit: 500,
            }}
          >
            <Grid>
              <Grid sx={{ margin: '0 12px 10px 12px' }}>{props.children}</Grid>
              <DrawerFooter>
                <Divider />
                <Grid sx={{ height: '45px', padding: '8px 12px 8px 0', float: 'right' }}>
                  <Button variant="text" sx={{ marginLeft: '12px' }} onClick={() => { return handleCollapse(); }} {...collapseButtonProps}>
                    {collapseButtonLabel}
                  </Button>
                  {footerButtonProps && footerButtonProps.map((buttonProps) => {
                    return (
                      <Button sx={{ marginLeft: '12px' }} key={buttonProps.key} {...buttonProps}>
                        {buttonProps.label}
                        {buttonProps.children}
                      </Button>
                    );
                  })}
                </Grid>
              </DrawerFooter>
            </Grid>
          </Collapse>
        </InternalGridDrawer>
      </InternalBackdrop>
    </>
  );
};

SearchCriteria.defaultProps = { };

export default SearchCriteria;
