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

import React, { useEffect, useRef, useState } from 'react';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { styled } from '@mui/material/styles';

export enum AccordionTypes {
  OUTLINED = 'outlined',
  NO_OUTLINE = 'no-outline',
}

export type AccordionPropsAll = AccordionProps & {
  showCheckBox?: boolean,
  disabled?: boolean,
  isfocused?: boolean,
  hasNested?: boolean;
  hasDivider?: boolean;
  showSecondaryText?: boolean,
  type: AccordionTypes,
  square?: boolean,
}

const StyledAccordion = styled(MuiAccordion)<AccordionPropsAll>((props) => {
  const {
    theme, variant, isfocused, hasNested, hasDivider, type,
  } = props;
  return {
    '& .MuiAccordionDetails-root': {
      ...(hasNested ? { padding: '8px 0px 8px 8px' } : { padding: '8px 8px 8px 8px' }),
    },
    '&.MuiAccordion-root': {
      '&:focus': {
        boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
        zIndex: 1,
      },
      ...(isfocused && {
        boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
        zIndex: 1,
      }),
    },
    '& .MuiAccordionSummary-expandIconWrapper': {
      marginLeft: theme.spacing(1),
    },
    '&.Mui-disabled': {
      backgroundColor: 'transparent',
    },
    padding: '0px',
    border: type === 'outlined' ? `1px solid ${theme.palette.border.secondary}` : 'none',
    '&.MuiPaper-root.MuiAccordion-root.MuiPaper-root': {
      backgroundColor: 'transparent',
    },
    '.MuiButtonBase-root.MuiAccordionSummary-root.Mui-expanded': {
      minHeight: '32px',
      backgroundColor: theme.palette.action.disabledOpacityModified,
      '&:hover': {
        backgroundColor: theme.palette.action.disableOpacityHover,
      },
    },
    '& .MuiButtonBase-root.Mui-focusVisible': {
      backgroundColor: 'transparent',
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
    '&.MuiAccordion-root.Mui-expanded': {
      margin: '0px',
    },
    '&.MuiAccordion-root:before': {
      content: variant === 'outlined' ? '""' : 'none',
    },
    '&.MuiAccordion-root .MuiAccordion-root': {
      borderTopRightRadius: '0px',
      borderBottomRightRadius: '0px',
    },
    '&:not(:last-of-type)': {
      borderBottom: (hasDivider && (type !== 'outlined')) ? `1px solid ${theme.palette.border.secondary}` : 'none',
    },
  };
});

const Accordion = ({ ...props }: AccordionPropsAll) => {
  const [isFocused, setIsFocused] = useState(false);
  const [usingKeyboard, setUsingKeyboard] = useState(false);
  const accordionRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = () => {
      setUsingKeyboard(true);
    };

    const handleMouseDown = () => {
      setUsingKeyboard(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);
  const handleFocus = (event: React.FocusEvent) => {
    if (usingKeyboard) {
      if (accordionRef.current && (accordionRef.current as HTMLElement).contains(event.relatedTarget as Node)) {
        setIsFocused(false);
      } else {
        setIsFocused(true);
      }
    }
  };
  return (
    <StyledAccordion
      ref={accordionRef}
      onFocus={handleFocus}
      onBlur={() => { return setIsFocused(false); }}
      {...props}
      isfocused={isFocused}
      hasNested={props.hasNested}
      hasDivider={props.hasDivider}
      square={props.square}
    />
  );
};

const defaultProps: AccordionPropsAll = {
  type: AccordionTypes.OUTLINED,
  children: '',
  variant: 'nopadding',
  square: false,
};

Accordion.defaultProps = defaultProps;

export * from '@mui/material/Accordion';
export default Accordion;
