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
import { Box, Components, Theme } from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiIconButton, { IconButtonProps as MuiIconButtonProps } from '@mui/material/IconButton';
import IconChevronDown from '@hcl-software/enchanted-icons/dist/carbon/es/chevron--down';
import Typography from '../Typography';

export enum IconButtonVariants {
  WITHOUT_PADDING = 'without padding',
  WITH_PADDING = 'with padding',
}

export enum IconButtonSizes {
  SMALL = 'small',
  MEDIUM = 'medium',
}

const StyledIconButtonContainer = styled(Box)((theme) => {
  return {
    '&:hover': {
      borderRadius: '2px',
      backgroundColor: theme.theme.palette.action.hover,
    },
  };
});

const StyledChevronDown = styled(Box)((theme) => {
  return {
    color: theme.theme.palette.action.active,
    // width: '12px',
    // height: '12px',
  };
});

export const getMuiIconButtonThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiIconButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          return ({
            color: theme.palette.action.active,
            backgroundColor: 'transparent',
            borderRadius: '2px',
            padding: 0,
            '&:focus': {
              '.MuiSvgIcon-root': {
                border: `1px solid ${theme.palette.action.focus}`,
                borderRadius: '3px',
                ...ownerState.variant === IconButtonVariants.WITHOUT_PADDING && {
                  margin: '2px',
                  padding: '1px',
                  ...ownerState.size === IconButtonSizes.SMALL && {
                    height: '20px',
                    width: '20px',
                  },
                  ...ownerState.size === IconButtonSizes.MEDIUM && {
                    height: '24px',
                    width: '24px',
                  },
                },
                ...ownerState.variant === IconButtonVariants.WITH_PADDING && {
                  margin: '2px',
                  padding: '3px',
                  ...ownerState.size === IconButtonSizes.SMALL && {
                    height: '24px',
                    width: '24px',
                  },
                  ...ownerState.size === IconButtonSizes.MEDIUM && {
                    height: '28px',
                    width: '28px',
                  },
                },
              },
            },
            '&:hover': {
              // borderRadius: '2px',
              // backgroundColor: theme.palette.action.hover,
            },
            '.MuiSvgIcon-root': { // default state
              margin: '4px',
              padding: 0,
              outline: 'none',
              boxSizing: 'border-box',
              ...ownerState.variant === IconButtonVariants.WITH_PADDING && {
                margin: '6px',
              },
              ...ownerState.size === IconButtonSizes.SMALL && {
                height: '16px',
                width: '16px',
              },
              ...ownerState.size === IconButtonSizes.MEDIUM && {
                height: '20px',
                width: '20px',
              },
            },
          });
        },
      },
    },
  };
};

/**
 * @typedef IconButtonProps
 * @type {object}
 * @property {IconButtonSizes} size - The size of the component
 * @property {IconButtonVariants} variant - Adds padding around icon svg
 * @property {string} color - The color of the component.
 */
export type IconButtonProps = MuiIconButtonProps & {
  size?: string,
  variant?: IconButtonVariants,
  color?: 'default',
  selected?: boolean,
  label?: string,
  showEndIcon?: boolean,
}

const IconButton = React.forwardRef(({ ...props }: IconButtonProps, forwardRef) => {
  // const handleOnClick = () => {
  //   console.log('handleOnClick');
  // };

  return (
    <StyledIconButtonContainer
      sx={{
        flexDirection: 'column',
        justifyContent: 'center',
        display: 'inline-flex',
      }}
    >
      <Box
        sx={{
          flexDirection: 'row',
          justifyContent: 'center',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <MuiIconButton {...props} ref={forwardRef as ((instance: HTMLButtonElement | null) => void)} role="button" aria-disabled={props.disabled} />
        { props.showEndIcon ? (
          <StyledChevronDown>
            <IconChevronDown
              sx={(theme) => {
                return {
                  color: theme.palette.action.active,
                  width: '12px',
                  height: '12px',
                };
              }}
            />
          </StyledChevronDown>
        ) : null}
      </Box>
      <Typography
        variant="caption"
      >
        {props.label}
      </Typography>
    </StyledIconButtonContainer>
  );
}) as React.FC<IconButtonProps>;

IconButton.defaultProps = {
  size: IconButtonSizes.SMALL,
  variant: IconButtonVariants.WITHOUT_PADDING,
  color: 'default',
  selected: false,
  disabled: false,
  disableFocusRipple: false,
  edge: false,
  centerRipple: false,
  disableRipple: false,
  disableTouchRipple: false,
  focusRipple: false,
  tabIndex: 0,
};

export * from '@mui/material/IconButton';
export default IconButton;
