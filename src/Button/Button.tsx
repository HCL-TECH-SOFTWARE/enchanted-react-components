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
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { Components, Theme } from '@mui/material';

declare module '@mui/material/Button' {
  interface ButtonPropsSizeOverrides {
    neutral: true;
  }
}

export enum ButtonVariants {
  CONTAINED = 'contained',
  OUTLINED = 'outlined',
  TEXT = 'text',
}

export enum ButtonTestIds {
  CONTAINED = 'Contained',
  OUTLINED = 'Outlined',
  TEXT = 'Text',
}

/**
 * @typedef ButtonProps
 * @type {object}
 * @property {boolean} hover - toggles hover appearance for visual test
 */
export type ButtonProps = MuiButtonProps & {
  hover?: boolean,
  inversecolors?: boolean | 0 | 1,
}

const Button = React.forwardRef(({ ...props }: ButtonProps, forwardRef) => {
  props.inversecolors = props.inversecolors ? 1 : 0;
  return (
    <MuiButton
      id={props.variant}
      variant={props.variant}
      sx={(theme) => {
        const inverseColor = props.inversecolors && props.variant === 'contained' ? theme.palette.text.primary : theme.palette.action.selectedInverse;
        return {
          color: props.inversecolors ? inverseColor : '',
        };
      }}
      {...props}
      ref={forwardRef as ((instance: HTMLButtonElement | null) => void)}
    />
  );
}) as React.FC<ButtonProps>;

Button.defaultProps = {
  variant: ButtonVariants.CONTAINED,
  disableElevation: true,
  disableFocusRipple: true,
  fullWidth: false,
  centerRipple: false,
  disableRipple: false,
  disableTouchRipple: false,
  focusRipple: false,
  tabIndex: 0,
  inversecolors: false,
};

export const getMuiButtonThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          return ({
            borderRadius: '2px',
            padding: '6px 12px',
            ...theme.typography.subtitle2,
            textTransform: 'none',
            maxHeight: '28px',
            boxSizing: 'border-box',
            lineHeight: '17px',
            '&.Mui-focusVisible, &.force-to-focus': {
              outline: `${ownerState.inversecolors ? theme.palette.action.selectedInverse : theme.palette.action.selected} 1px solid`,
              outlineOffset: '2px',
            },
            '& .MuiButtonBase-root:disabled': {
              cursor: 0,
              pointerEvent: 'auto',
            },
            '& .MuiSvgIcon-root': {
              height: '16px',
              width: '16px',
              borderRadius: '2px',
              variant: 'contained',
              disabled: false,
              color: 'primary',

            },
            '& .MuiButton-endIcon': {
              marginLeft: '4px',
            },
            '& .MuiButton-startIcon': {
              marginRight: '4px',
            },
            ...(ownerState.variant === 'contained'
             && ownerState.color === 'primary' && {
              backgroundColor: ownerState.inversecolors ? theme.palette.action.selectedInverse : theme.palette.action.selected,
              '&:hover': {
                backgroundColor: ownerState.inversecolors ? theme.palette.primary.darkInverse : theme.palette.primary.dark,
              },
              '&.force-to-focusHover': {
                outline: `${ownerState.inversecolors ? theme.palette.action.selectedInverse : theme.palette.action.selected} 1px solid`,
                outlineOffset: '2px',
                backgroundColor: ownerState.inversecolors ? theme.palette.primary.darkInverse : theme.palette.primary.dark,
              },
            }),
            ...(ownerState.variant === 'outlined'
            && ownerState.color === 'primary' && {
              backgroundColor: ownerState.inversecolors ? 'inherit' : theme.palette.background.paper,
              borderColor: ownerState.inversecolors ? theme.palette.action.selectedInverse : theme.palette.action.selected,
              '&:hover': {
                backgroundColor: ownerState.inversecolors ? theme.palette.action.hoverInverse : theme.palette.action.hover,
                borderColor: ownerState.inversecolors ? theme.palette.action.selectedInverse : theme.palette.action.selected,
              },
              '&.force-to-focusHover': {
                outline: `${ownerState.inversecolors ? theme.palette.action.selectedInverse : theme.palette.action.selected} 1px solid`,
                outlineOffset: '2px',
                backgroundColor: ownerState.inversecolors ? theme.palette.action.hoverInverse : theme.palette.action.hover,
              },
            }),
            ...(ownerState.variant === 'text'
            && ownerState.color === 'primary' && {
              backgroundColor: ownerState.inversecolors ? 'inherit' : theme.palette.background.paper,
              '&:hover': {
                backgroundColor: ownerState.inversecolors ? theme.palette.action.hoverInverse : theme.palette.action.hover,
              },
              '&.force-to-focusHover': {
                outline: `${ownerState.inversecolors ? theme.palette.action.selectedInverse : theme.palette.action.selected} 1px solid`,
                outlineOffset: '2px',
                backgroundColor: ownerState.inversecolors ? theme.palette.action.hoverInverse : theme.palette.action.hover,
              },
            }),
            // Apply dimension styles for all neutral buttons
            ...(ownerState.size === 'neutral' && {
              height: '20px',
              width: 'auto',
              minWidth: 'auto',
              padding: '0 4px',
              fontWeight: 'normal',
            }),

            // neutral + Contained variant styling for primary color
            ...(ownerState.size === 'neutral' && ownerState.variant === 'contained' && (!ownerState.color || ownerState.color === 'primary') && {
              color: theme.palette.text.secondary,
              backgroundColor: theme.palette.action.disabledOpacityModified,
              border: 'none',

              '&:hover': {
                backgroundColor: theme.palette.action.disableOpacityHover,
                color: theme.palette.text.primary,
              },

              '&.Mui-focusVisible, &.force-to-focus': {
                backgroundColor: theme.palette.action.disabledOpacityModified,
                color: theme.palette.text.secondary,
                outline: `${theme.palette.action.selected} 1px solid`,
                outlineOffset: '2px',
              },

              '&.force-to-focusHover': {
                backgroundColor: theme.palette.action.disableOpacityHover,
                color: theme.palette.text.primary,
                outline: `${theme.palette.action.selected} 1px solid`,
                outlineOffset: '2px',
              },

              '&.Mui-disabled': {
                backgroundColor: theme.palette.action.disabledBackground,
                color: theme.palette.text.disabled,
              },
            }),

            // neutral + Outlined variant styling for primary color
            ...(ownerState.size === 'neutral' && ownerState.variant === 'outlined' && (!ownerState.color || ownerState.color === 'primary') && {
              color: theme.palette.text.secondary,
              backgroundColor: 'transparent',
              borderColor: theme.palette.text.secondary,

              '&:hover': {
                backgroundColor: theme.palette.action.hover,
                color: theme.palette.text.primary,
                borderColor: theme.palette.text.primary,
              },

              '&.Mui-focusVisible, &.force-to-focus': {
                backgroundColor: 'transparent',
                color: theme.palette.text.secondary,
                borderColor: theme.palette.text.secondary,
                outline: `${theme.palette.action.selected} 1px solid`,
                outlineOffset: '2px',
              },

              '&.force-to-focusHover': {
                backgroundColor: theme.palette.action.hover,
                color: theme.palette.text.primary,
                borderColor: theme.palette.text.primary,
                outline: `${theme.palette.action.selected} 1px solid`,
                outlineOffset: '2px',
              },

              '&.Mui-disabled': {
                backgroundColor: 'transparent',
                color: theme.palette.action.disabledBackground,
                borderColor: theme.palette.action.disabledBackground,
              },
            }),

            // non-primary colors for neutral size Contained buttons
            ...(ownerState.size === 'neutral' && ownerState.variant === 'contained' && ownerState.color && ownerState.color !== 'primary' && {
              color: theme.palette.action.selected,
              backgroundColor: theme.palette.action.selectedOpacityModified,
              border: 'none',

              '&:hover': {
                backgroundColor: theme.palette.action.selectedOpacityHover,
              },

              '&.Mui-focusVisible, &.force-to-focus': {
                backgroundColor: theme.palette.action.selectedOpacityModified,
                outline: `${theme.palette.action.selected} 1px solid`,
                outlineOffset: '2px',
              },

              '&.force-to-focusHover': {
                backgroundColor: theme.palette.action.selectedOpacityHover,
                outline: `${theme.palette.action.selected} 1px solid`,
                outlineOffset: '2px',
              },
            }),

            // non-primary colors for neutral size Outlined buttons
            ...(ownerState.size === 'neutral' && ownerState.variant === 'outlined' && ownerState.color && ownerState.color !== 'primary' && {
              color: theme.palette.action.selected,
              backgroundColor: theme.palette.action.selectedOpacityModified,
              borderColor: theme.palette.action.selected,

              '&:hover': {
                backgroundColor: theme.palette.action.selectedOpacityHover,
                borderColor: theme.palette.action.selected,
              },

              '&.Mui-focusVisible, &.force-to-focus': {
                backgroundColor: theme.palette.action.selectedOpacityModified,
                outline: `${theme.palette.action.selected} 1px solid`,
                outlineOffset: '2px',
              },

              '&.force-to-focusHover': {
                backgroundColor: theme.palette.action.selectedOpacityHover,
                outline: `${theme.palette.action.selected} 1px solid`,
                outlineOffset: '2px',
              },

              '&.Mui-disabled': {
                backgroundColor: theme.palette.action.disabledBackground,
              },
            }),
          });
        },
      },
    },
  };
};
export * from '@mui/material/Button';
export default Button;
