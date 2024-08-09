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

import React, { ReactNode } from 'react';
import MuiAccordionSummary, { AccordionSummaryProps as MuiAccordionSummaryProps } from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';

interface AccordionSummaryProps extends MuiAccordionSummaryProps {
  hoveractions?: ReactNode;
}

const StyledHoverActions = styled('div')(({ theme }) => {
  return {
    position: 'absolute',
    top: '50%',
    right: '0px',
    transform: 'translateY(-50%)', // Center the button vertically
    visibility: 'hidden',
    opacity: '0',
    transition: 'opacity 0.3s ease',
  };
});

const StyledAccordionSummary = styled(MuiAccordionSummary)(({ theme, disabled }) => {
  return {
    '& .MuiBox-root:nth-of-type(1)': {
      display: 'flex',
      alignItems: 'center',
      '& .MuiBox-root': {
        flexDirection: 'column',
      },
    },
    minHeight: 'auto',
    padding: theme.spacing(1, 0.75, 0.5, 1),
    '& .MuiAccordionSummary-content': {
      position: 'relative',
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
      padding: '4px 0px',
      marginRight: '8px',
    },
    '& .MuiCheckbox-root.Mui-focusVisible': {
      margin: '0px 8px 0px 0px',
    },
    '&:last-of-type': {
      borderBottomLeftRadius: '4px',
      borderBottomRightRadius: '4px',
    },
    '&:hover .hover-actions, &:focus-within .hover-actions': {
      visibility: 'visible',
      opacity: '1',
    },
    '& .hover-actions': {
      '.MuiButtonBase-root': {
        marginLeft: '8px',
      },
      '.MuiButtonBase-root:first-of-type': {
        marginLeft: '0',
      },
    },
  };
});

const AccordionSummary = ({ ...props }: AccordionSummaryProps) => {
  return (
    <StyledAccordionSummary {...props}>
      {props.children}
      {props.hoveractions
      && <StyledHoverActions className="hover-actions">{props.hoveractions}</StyledHoverActions>}
    </StyledAccordionSummary>
  );
};

AccordionSummary.defaultProps = {
};

export * from '@mui/material/AccordionSummary';
export default AccordionSummary;
