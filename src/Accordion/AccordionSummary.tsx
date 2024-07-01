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
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';

const StyledAccordionSummary = styled(MuiAccordionSummary)(({ theme, disabled }) => {
  return {
    '& .MuiBox-root:nth-of-type(1)': {
      display: 'flex',
      alignItems: 'center',
    },
    '& .MuiBox-root:nth-of-type(2)': {
      display: 'flex',
      flexDirection: 'column',
    },
    minHeight: '32px',
    padding: '4px 6px 4px 8px',
    '& .MuiAccordionSummary-content': {
      margin: '0px',
      '&.Mui-expanded': {
        margin: '0px',
      },
    },
    '.MuiTypography-root': {
      ...(disabled && {
        color: theme.palette.text.disabled,
      }),
    },
    '.MuiTypography-body2': {
      color: theme.palette.text.primary,
    },
    '.MuiTypography-caption': {
      color: theme.palette.text.secondary,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focusVisible:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '.MuiCheckbox-root': {
      padding: '0px',
      marginRight: '8px',
    },
    '& .MuiCheckbox-root.Mui-focusVisible': {
      margin: '0px 8px 0px 0px',
    },
    '&:first-of-type': {
      borderTopLeftRadius: '4px',
      borderTopRightRadius: '4px',
    },
    '&:last-of-type': {
      borderBottomLeftRadius: '4px',
      borderBottomRightRadius: '4px',
    },
  };
});

const AccordionSummary = ({ ...props }: AccordionSummaryProps) => {
  return <StyledAccordionSummary {...props} />;
};

AccordionSummary.defaultProps = {
};

export * from '@mui/material/AccordionSummary';
export default AccordionSummary;
