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
import MuiToggleButton, { ToggleButtonProps as MuiToggleButtonProps } from '@mui/material/ToggleButton';
import { Components, Theme } from '@mui/material/styles';

export enum ToggleButtonVariants {
  WITHOUT_PADDING = 'without padding',
  WITH_PADDING = 'with padding',
}

export enum ToggleButtonSizes {
  SMALL = 'small',
  MEDIUM = 'medium',
}

/**
 * @typedef ToggleButtonProps
 * @type {object}
 * @property {ToggleButtonSizes} size - The size of the component
 * @property {ToggleButtonVariants} variant - Adds padding around icon svg
 */
export interface ToggleButtonProps extends MuiToggleButtonProps {
  size?: ToggleButtonSizes,
  variant?: ToggleButtonVariants,
}

const ToggleButton = React.forwardRef(({ ...props }: ToggleButtonProps, forwardRef) => {
  return <MuiToggleButton {...props} ref={forwardRef as ((instance: HTMLButtonElement | null) => void)} aria-disabled={props.disabled} />;
}) as React.FC<ToggleButtonProps>;

ToggleButton.defaultProps = {
  variant: ToggleButtonVariants.WITH_PADDING,
  disabled: false,
  disableFocusRipple: true,
  disableRipple: true,
  centerRipple: false,
  disableTouchRipple: false,
  focusRipple: false,
  tabIndex: 0,
};

export const getMuiToggleButtonThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiToggleButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          return ({
            border: `1px solid ${theme.palette.border.secondary}`,
            padding: '0px',
            borderRadius: '2px',
            '.MuiSvgIcon-root': { // default state
              ...ownerState.variant === ToggleButtonVariants.WITHOUT_PADDING && {
                margin: '1px',
                padding: '0px',
                ...ownerState.size === ToggleButtonSizes.SMALL && {
                  height: '16px',
                  width: '16px',
                },
                ...ownerState.size === ToggleButtonSizes.MEDIUM && {
                  height: '20px',
                  width: '20px',
                },
              },
              ...ownerState.variant === ToggleButtonVariants.WITH_PADDING && {
                margin: '3px',
                padding: '0px',
                ...ownerState.size === ToggleButtonSizes.SMALL && {
                  height: '16px',
                  width: '16px',
                },
                ...ownerState.size === ToggleButtonSizes.MEDIUM && {
                  height: '20px',
                  width: '20px',
                },
              },
            },
            '&.Mui-selected': {
              border: `1px solid ${theme.palette.action.focus}`,
              backgroundColor: theme.palette.action.selectedOpacityModified,
              color: theme.palette.action.focus,
              '&:hover': {
                backgroundColor: theme.palette.action.selectedOpacityHover,
                color: theme.palette.primary.dark,
              },
              '&.force-to-focusHover': {
                outlineOffset: '2px',
                outline: `1px solid ${theme.palette.action.focus}`,
                backgroundColor: theme.palette.action.selectedOpacityHover,
                color: theme.palette.primary.dark,
                borderRadius: '2px',
              },
            },
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
            '&.force-to-focusHover': {
              outlineOffset: '2px',
              outline: `1px solid ${theme.palette.action.focus}`,
              backgroundColor: theme.palette.action.hover,
              borderRadius: '2px',
            },
            '&:focus, &.force-to-focus': {
              outlineOffset: '2px',
              outline: `1px solid ${theme.palette.action.focus}`,
            },
            '&.Mui-disabled': {
              color: theme.palette.action.disabled,
              '&.Mui-selected': {
                border: `1px solid ${theme.palette.border.secondary}`,
                backgroundColor: theme.palette.action.disabledOpacityModified,
              },
            },
          });
        },
      },
    },
  };
};

export default ToggleButton;
