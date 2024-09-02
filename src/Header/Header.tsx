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
import { omit } from 'lodash';
import { v4 as uuid } from 'uuid';
import { styled } from '@mui/material/styles';
import ArrowLeft from '@hcl-software/enchanted-icons/dist/carbon/es/arrow--left';
import ArrowRight from '@hcl-software/enchanted-icons/dist/carbon/es/arrow--right';
import { Theme, useTheme } from '@mui/material';
import Grid, { GridProps as MuiGridProps } from '@mui/material/Grid';
import Container, { ContainerProps as MuiContainerProps } from '@mui/material/Container';
import Typography from '../Typography';
import IconButton, { IconButtonSizes } from '../IconButton';
import Divider, { DividerTypes } from '../Divider';
import { TYPOGRAPHY, ThemeDirectionType } from '../theme';
import Tooltip from '../Tooltip/Tooltip';

export enum HeaderDemo {
  CC = 'CC',
  DAM = 'DAM',
  CR = 'CR',
}

export enum HeaderPageVariant {
  OVERVIEW_PAGE = 'OVERVIEW_PAGE',
  ITEM_PAGE = 'ITEM_PAGE',
  SEARCH_RESULT_PAGE = 'SEARCH_RESULT_PAGE',
  UPDATES_PAGE = 'UPDATES_PAGE',
}

export enum HeaderTestIds {
  HEADER_CONTAINER = 'headerContainer',
  HEADER_START_SECTION = 'headerStartSection',
  HEADER_MIDDLE_SECTION = 'headerMiddleSection',
  HEADER_END_SECTION = 'headerEndSection',
  HEADER_BACK_BUTTON = 'headerBackButton',
  HEADER_START_TITLE = 'headerStartTitle',
  HEADER_START_SUBTITLE = 'headerStartSubtitle',
  HEADER_FAVORITES_TOGGLE = 'headerFavoritesToggle'
}

export interface IHeaderStartSection {
  hamburgerSpace?: boolean;
  title?: string,
  withBackButton?: boolean,
  avatar?: React.ReactNode,
  subtitle?: string,
  favoritesToggleIcon?: React.ReactNode,
  backIconToolTip?: string,
}

export interface HeaderProps extends MuiContainerProps {
  startSection: IHeaderStartSection, // handles the rendering of the children components in the left section of the header
  hideMiddleSection?: boolean, // storybook control for toggling middleSection, rendering still depends on number of elements inside middleSection prop
  hamburgerSpace?: boolean, // storybook control for toggling display of allotted space for a hamburger menu at the start of the startSection
  middleSection?: Array<React.ReactNode>, // array containing the children components in the middle section of the header
  endSection?: Array<React.ReactNode>, // handles the rendering of the children components in the right section of the header
  headerPageVariant?: HeaderPageVariant,
  headerDemoSample?: HeaderDemo,
  onClickBackButton: Function, // handles the function call when the back button is clicked.
  onClickFavoritesToggle: Function, // handles the function call when the favorites button is clicked.
}

const MuiContainer = styled(Container)<MuiContainerProps>((theme) => {
  return {
    backgroundColor: theme.theme.palette.common.white,
    position: 'relative',
    top: '0px',
    right: '0px',
    left: '0px',
    padding: '0px !important',
    margin: '0px !important',
    maxWidth: 'unset !important',
  };
});

const MuiGrid = styled(Grid)<MuiGridProps>((theme) => {
  return {
    minWidth: '0',
    minHeight: '54px',
    '&.MuiGrid-container': {
      margin: '0px',
      display: 'flex',
      minWidth: '0',
      justifyContent: 'space-between',
      width: '100%',
    },
    '&.MuiGrid-root': {
      justifyContent: 'end',
    },
  };
});

const StartSectionGridStyled = styled(Grid)((theme) => {
  return {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'nowrap',
    overflow: 'hidden',
    gap: '12px',
    '&.MuiGrid-root': {
      justifyContent: 'start',
      paddingRight: '6px',
      paddingTop: '0px',
    },
    '[data-testid=headerFavoritesToggle]': {
      '.MuiSvgIcon-root': {
        '&[data-mui-test=star--filledIcon]': {
          color: theme.theme.palette.primary.main,
        },
      },
    },
    '.MuiTypography-root': {
      alignItems: 'center',
      display: 'flex',
      minWidth: '0',
      '&[data-testid=headerStartSubtitle]': {
        paddingLeft: '0px',
        width: '85px',
      },
      '&[data-testid=headerStartTitle]': {
        display: 'block',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      },
    },
    '.MuiIconButton-root': {
      alignItems: 'center',
      display: 'flex',
      minWidth: '0',
    },
  };
});

const MiddleSectionGridStyled = styled(Grid)((theme) => {
  return {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    gap: '12px',
    '&.MuiGrid-root': {
      justifyContent: 'center',
      paddingLeft: '6px',
      paddingRight: '6px',
      paddingTop: '0px',
    },
  };
});

const EndSectionGridStyled = styled(Grid)((theme) => {
  return {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    paddingRight: '12px',
    gap: '12px',
    '.MuiSvgIcon-root': {
      fontSize: '16px',
    },
    '&[data-testid=headerEndSection]': {
      '&.MuiGrid-root': {
        justifyContent: 'end',
        paddingLeft: '6px',
        paddingTop: '0px',
      },
      '& .MuiSwitch-root': {
        '& .MuiButtonBase-root': {
          marginLeft: 0, // fix for affected button inside Switch from .MuiButtonBase-root style before this block
        },
      },
    },
  };
});

const Header = ({ ...props }: HeaderProps) => {
  const theme = useTheme();
  const {
    startSection, middleSection, endSection, hideMiddleSection, onClickBackButton, onClickFavoritesToggle,
  } = props;
  const withMiddleSection = middleSection && middleSection.length > 0 && hideMiddleSection !== true;
  const hamburgerSpace = (startSection.hamburgerSpace !== undefined && startSection.hamburgerSpace);
  const muiContainerProps: MuiContainerProps = omit(props, [
    'startSection', 'middleSection', 'endSection', 'hideMiddleSection', 'onClickBackButton', 'onClickFavoritesToggle', 'hamburgerSpace',
    'headerDemoSample', 'headerPageVariant',
  ]);

  const headerTitleRef = useRef<HTMLElement>(null);
  const [isOverflowed, setIsOverflow] = useState(false);
  // This function checks if the header title is too long and enables the tooltip when it overflows
  const compareSize = () => {
    if (headerTitleRef.current) {
      setIsOverflow(headerTitleRef.current.scrollWidth > headerTitleRef.current.clientWidth);
    }
  };

  useEffect(() => {
    compareSize();
    window.addEventListener('resize', compareSize);
    return () => {
      window.removeEventListener('resize', compareSize);
    };
  }, [startSection.title]);

  return (
    <MuiContainer {...muiContainerProps}>
      <MuiGrid
        container
        spacing={2}
        data-testid={HeaderTestIds.HEADER_CONTAINER}
      >
        <StartSectionGridStyled
          item
          xs={4}
          sx={{ '&.MuiGrid-root': { paddingLeft: hamburgerSpace ? '68px' : '12px' } }}
          data-testid={HeaderTestIds.HEADER_START_SECTION}
        >
          {(startSection?.withBackButton !== undefined && startSection.withBackButton && startSection?.avatar !== undefined)
            && (
              <Tooltip title={startSection.backIconToolTip}>
                <IconButton
                  onClick={() => { onClickBackButton(); }}
                  data-testid={HeaderTestIds.HEADER_BACK_BUTTON}
                >
                  { theme.direction === ThemeDirectionType.RTL ? <ArrowRight /> : <ArrowLeft /> }
                </IconButton>
              </Tooltip>
            )}
          {(startSection?.withBackButton !== undefined && startSection.withBackButton && startSection?.avatar === undefined)
            && (
              <Tooltip title={startSection.backIconToolTip}>
                <IconButton
                  onClick={() => { onClickBackButton(); }}
                  data-testid={HeaderTestIds.HEADER_BACK_BUTTON}
                >
                  { theme.direction === ThemeDirectionType.RTL ? <ArrowRight /> : <ArrowLeft /> }
                </IconButton>
              </Tooltip>
            )}
          {startSection?.avatar !== undefined && startSection.avatar}
          {startSection?.title !== undefined
            && (
              <Tooltip
                tooltipsize="small"
                placement="bottom"
                title={startSection.title}
                disableHoverListener={!isOverflowed}
              >
                <Typography
                  ref={headerTitleRef}
                  sx={{
                    paddingLeft: (startSection?.withBackButton || startSection?.avatar) ? '0px' : '4px',
                    margin: '-4px',
                    ...TYPOGRAPHY.subtitle1,
                  }}
                  data-testid={HeaderTestIds.HEADER_START_TITLE}
                >
                  {startSection.title}
                </Typography>
              </Tooltip>
            )}
          {startSection?.subtitle !== undefined
            && (
              <Typography
                sx={{
                  ...TYPOGRAPHY.caption,
                  height: '14px',
                  color: (scopedTheme: Theme) => { return scopedTheme.palette.text.secondary; },
                }}
                data-testid={HeaderTestIds.HEADER_START_SUBTITLE}
              >
                {startSection.subtitle}
              </Typography>
            )}
          {(startSection?.favoritesToggleIcon && React.isValidElement(startSection.favoritesToggleIcon))
            && (
              <IconButton
                size={IconButtonSizes.SMALL}
                onClick={() => { onClickFavoritesToggle(); }}
                data-testid={HeaderTestIds.HEADER_FAVORITES_TOGGLE}
              >
                {startSection.favoritesToggleIcon}
              </IconButton>
            )}
        </StartSectionGridStyled>
        {
          withMiddleSection && (
            <MiddleSectionGridStyled
              item
              xs={4}
              data-testid={HeaderTestIds.HEADER_MIDDLE_SECTION}
            >
              {
                middleSection?.map((eachIcon, index) => {
                  return React.isValidElement(eachIcon) ? <React.Fragment key={uuid()}>{eachIcon}</React.Fragment> : null;
                })
              }
            </MiddleSectionGridStyled>
          )
        }
        <EndSectionGridStyled
          item
          xs={withMiddleSection ? 4 : 8}
          data-testid={HeaderTestIds.HEADER_END_SECTION}
        >
          {
            endSection?.map((eachElement, index) => {
              return React.isValidElement(eachElement) ? <React.Fragment key={uuid()}>{eachElement}</React.Fragment> : null;
            })
          }
        </EndSectionGridStyled>
      </MuiGrid>
      <Divider
        type={DividerTypes.PRIMARY}
        sx={{
          alignItems: 'center',
          display: 'flex',
          minWidth: '0',
        }}
      />
    </MuiContainer>
  );
};

Header.defaultProps = {
  hideMiddleSection: false,
  startSection: [],
  middleSection: [],
  endSection: [],
  /* eslint-why user defined functions, defaults only put in place to prevent tsc could be undefined warning */
  /* eslint-disable no-empty-function */
  onClickBackButton: () => { },
  onClickFavoritesToggle: () => { },
  /* eslint-enable no-empty-function */
};

export * from '@mui/material/AppBar';
export default Header;
