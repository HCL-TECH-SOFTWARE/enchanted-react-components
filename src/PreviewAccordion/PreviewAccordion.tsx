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

import React from 'react';
import { styled } from '@mui/material/styles';
import Accordion, { AccordionPropsAll, AccordionTypes } from '../Accordion';

export const PreviewAccordionTypes = {
  ...AccordionTypes,
};

export type PreviewAccordionPropsAll = AccordionPropsAll & {
  hascheckbox?: boolean;
  hasicon?: boolean;
  hasavatar?: boolean;
}

const StyledAccordion = styled(Accordion)<PreviewAccordionPropsAll>((props) => {
  return {
    '& .MuiAccordionSummary-content': {
      overflow: 'hidden',
      width: '100%',
    },
    '& .MuiAccordionDetails-root': {
      padding: '8px 0px 8px 8px',
      ...(props.hascheckbox && { paddingLeft: '34px' }),
      ...(props.hasavatar && { paddingLeft: '40px' }),
      ...(props.hasicon && { paddingLeft: '36px' }),
      '.MuiGrid-root': {
        borderRadius: 'unset',
      },
    },
    '& .MuiButtonBase-root.MuiAccordionSummary-root.Mui-expanded': {
      minHeight: '32px',
      backgroundColor: 'transparent',
    },
    '& .MuiAccordionSummary-root:not(.Mui-expanded) .accordion-link-section': {
      '.MuiLink-root': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '100%',
        display: 'inline-block',
      },
    },
    '& .MuiAccordionSummary-root:not(.Mui-expanded) .sub-section': {
      maxWidth: '100%',
      display: 'flex',
      '& .MuiTypography-root': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '100%',
        display: 'inline-block',
      },
    },
    '&.Mui-disabled, & .MuiAccordionSummary-root.Mui-disabled': {
      opacity: 1,
    },
  };
});

const PreviewAccordion = ({ ...props }: PreviewAccordionPropsAll) => {
  return (
    <StyledAccordion
      {...props}
    />
  );
};

const defaultProps: PreviewAccordionPropsAll = {
  type: AccordionTypes.OUTLINED,
  children: '',
  variant: 'nopadding',
  hascheckbox: false,
  hasicon: false,
  hasavatar: false,
};

PreviewAccordion.defaultProps = defaultProps;

export * from '@mui/material/Accordion';
export default PreviewAccordion;
