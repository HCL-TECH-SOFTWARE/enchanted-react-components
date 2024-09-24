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

import React, {
  ReactNode, useEffect, useRef, useState,
} from 'react';
import { styled } from '@mui/material/styles';
import AccordionSummary, { AccordionSummaryProps } from '../Accordion/AccordionSummary';

interface StyledMiddleSectionProps {
  sectionWidth: string | number;
}

const StyledMiddleSection = styled('div')<StyledMiddleSectionProps>(({ theme, sectionWidth }) => {
  return {
    display: 'flex',
    alignItems: 'left',
    flexDirection: 'column',
    overflow: 'hidden',
    maxWidth: '100%',
    justifyContent: 'center',
  };
});

const StyledSubSection = styled('div')(() => {
  return {
    lineHeight: '0.9',
    maxWidth: '100%',
    display: 'flex',
  };
});

const StyledLeftSection = styled('div')(() => {
  return {
    flex: '0 0 auto',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  };
});

const StyledRightSection = styled('div')(() => {
  return {
    marginLeft: 'auto',
    flex: '0 0 auto',
    alignItems: 'center',
    display: 'flex',
  };
});

export interface PreviewAccordionSummaryProps extends AccordionSummaryProps {
  titlelink?: ReactNode;
  subtitle?: ReactNode;
  leftsection?: ReactNode;
  rightsection?: ReactNode;
}

const StyledAccordionSummary = styled(AccordionSummary)(({ theme, hoveractions }) => {
  return {
    '&.MuiAccordionSummary-root': {
      padding: '4px 6px 4px 8px',
    },
    '& .MuiBox-root:nth-of-type(1)': {
      display: 'flex',
      alignItems: 'center',
      '& .MuiBox-root': {
        display: 'block',
        paddingRight: hoveractions ? '50px' : '0px',
      },
      '& .MuiTypography-root': {
        display: 'block',
      },
    },
    '.MuiCheckbox-root': {
      padding: '4px 0px',
      marginRight: '8px',
      height: '20px',
    },
    '& .accordion-left-section >.MuiSvgIcon-root': {
      height: '20px',
      width: '20px',
      marginRight: '8px',
      color: theme.palette.action.active,
    },
    '& .MuiCheckbox-root.Mui-focusVisible': {
      margin: '0px 8px 0px 0px',
    },
    '& .MuiLink-root': {
      padding: '0px',
    },
    '& .MuiAvatar-root': {
      marginRight: '8px',
    },
    '& .accordion-right-section': {
      '.MuiButton-root': {
        marginLeft: '8px',
      },
      '.IconButtonMainContainer': {
        marginLeft: '8px',
      },
    },
  };
});

const PreviewAccordionSummary = ({ ...props }: PreviewAccordionSummaryProps) => {
  const linkSectionRef = useRef<HTMLDivElement>(null);
  const [sectionWidth, setSectionWidth] = useState<number | string>(0);
  const [calculateSectionWidth, setCalculateSectionWidth] = useState<boolean>(false);

  useEffect(() => {
    const updateWidth = () => {
      if (linkSectionRef.current) {
        const width = linkSectionRef.current.offsetWidth;
        setSectionWidth(width);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, [calculateSectionWidth]);

  useEffect(() => {
    setSectionWidth('auto');
    setCalculateSectionWidth(true);
  }, [props.leftsection, props.rightsection]);

  return (
    <StyledAccordionSummary {...props}>
      <StyledLeftSection className="accordion-left-section">
        {props.leftsection}
      </StyledLeftSection>
      {props.titlelink && (
        <StyledMiddleSection sectionWidth={sectionWidth} ref={linkSectionRef} className="accordion-link-section">
          {props.titlelink && props.titlelink}
          {props.subtitle && <StyledSubSection className="sub-section">{props.subtitle}</StyledSubSection>}
        </StyledMiddleSection>
      )}
      <StyledRightSection className="accordion-right-section">
        {props.rightsection}
      </StyledRightSection>
    </StyledAccordionSummary>
  );
};

PreviewAccordionSummary.defaultProps = {
};

export default PreviewAccordionSummary;
