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
import { Components, Theme } from '@mui/material';
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

export enum IconButtonTestIds {
  ICONBUTTON_END_ICON = 'iconButtonEndIcon',
}

const StyledMainContainer = styled('div')<{ inversecolors: Boolean }>((props) => {
  const { theme, inversecolors } = props;
  return {
    flexDirection: 'column',
    justifyContent: 'center',
    display: 'inline-flex',
    alignItems: 'center',
    '&.selected': {
      color: inversecolors ? theme.palette.action.selectedInverse : theme.palette.action.selected,
      '.MuiSvgIcon-root, .MuiTypography-root': {
        color: inversecolors ? theme.palette.action.selectedInverse : theme.palette.action.selected,
      },
    },
    '&.disabled': {
      color: inversecolors ? theme.palette.action.disabledInverse : theme.palette.action.disabled,
      '.MuiSvgIcon-root, .MuiTypography-root': {
        color: inversecolors ? theme.palette.action.disabledInverse : theme.palette.action.disabled,
      },
      pointerEvents: 'none',
    },
  };
});

const StyledSubContainer = styled('div')<{ inversecolors: Boolean }>((props) => {
  const { theme, inversecolors } = props;
  return {
    flexDirection: 'row',
    justifyContent: 'center',
    display: 'inline-flex',
    alignItems: 'center',
    width: 'fit-content',
    '&:hover': {
      borderRadius: '2px',
      backgroundColor: inversecolors ? theme.palette.action.hoverInverse : theme.palette.action.hover,
    },
    '&.force-to-focusHover': {
      borderRadius: '2px',
      backgroundColor: inversecolors ? theme.palette.action.hoverInverse : theme.palette.action.hover,
    },
    '&.selected': {
      outline: `1px solid ${inversecolors ? theme.palette.action.focusInverse : theme.palette.action.focus}`,
      borderRadius: '1px',
      backgroundColor: theme.palette.action.selectedOpacityModified,
      '&:hover': {
        backgroundColor: theme.palette.action.selectedOpacityModified,
        color: inversecolors ? theme.palette.primary.darkInverse : theme.palette.primary.dark,
        outline: `1px solid ${inversecolors ? theme.palette.primary.darkInverse : theme.palette.primary.dark}`,
        '.MuiSvgIcon-root, + .MuiTypography-root': {
          color: inversecolors ? theme.palette.primary.darkInverse : theme.palette.primary.dark,
        },
      },
      '&.force-to-focusHover': {
        backgroundColor: theme.palette.action.selectedOpacityModified,
        color: inversecolors ? theme.palette.primary.darkInverse : theme.palette.primary.dark,
        outline: `1px solid ${inversecolors ? theme.palette.primary.darkInverse : theme.palette.primary.dark}`,
        '.MuiSvgIcon-root, + .MuiTypography-root': {
          color: inversecolors ? theme.palette.primary.darkInverse : theme.palette.primary.dark,
        },
      },
      '&.disabled': {
        backgroundColor: theme.palette.action.disabledOpacityModified,
        outline: `1px solid ${inversecolors ? theme.palette.border.inverseSecondary : theme.palette.border.secondary}`,
        borderRadius: '1px',
      },
    },
  };
});

export const getMuiIconButtonThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiIconButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          return ({
            color: ownerState.inversecolors ? theme.palette.action.inverse : theme.palette.action.active,
            backgroundColor: 'transparent',
            borderRadius: '2px',
            padding: 0,
            '&.Mui-focusVisible, &:focus, &.force-to-focus, &.force-to-focusHover': {
              outline: `1px solid ${ownerState.inversecolors ? theme.palette.action.focusInverse : theme.palette.action.focus}`,
              borderRadius: '3px',
              outlineOffset: '-2px',
            },
            '&:hover': {
              borderRadius: '2px',
              backgroundColor: ownerState.inversecolors ? theme.palette.action.hoverInverse : theme.palette.action.hover,
            },
            '&.force-to-focusHover': {
              borderRadius: '2px',
              backgroundColor: ownerState.inversecolors ? theme.palette.action.hoverInverse : theme.palette.action.hover,
            },
            '.MuiSvgIcon-root:not(.endIcon)': {
              margin: '0',
              padding: 0,
              outline: 'none',
              boxSizing: 'border-box',
              ...ownerState.variant === IconButtonVariants.WITH_PADDING && {
                margin: '2px',
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
 * @property {boolean} selected - Set the component as selected.
 * @property {string} label - Label of the component.
 * @property {boolean} showendicon - Show/hide the end icon.
 */
export type IconButtonProps = MuiIconButtonProps & {
  size?: string,
  variant?: IconButtonVariants,
  color?: 'default',
  selected?: boolean,
  label?: string,
  showendicon?: boolean | 0 | 1,
  inversecolors?: boolean | 0 | 1,
}

const IconButton = React.forwardRef(({ showendicon, ...props }: IconButtonProps, forwardRef) => {
  props.inversecolors = props.inversecolors ? 1 : 0;
  return (
    <StyledMainContainer
      className={`IconButtonMainContainer ${props.selected ? 'selected' : ''} ${props.disabled ? 'disabled' : ''} ${props.className}`}
      inversecolors={Boolean(props.inversecolors)}
    >
      <StyledSubContainer
        className={`${props.selected ? 'selected' : ''} ${props.disabled ? 'disabled' : ''} ${props.className}`}
        inversecolors={Boolean(props.inversecolors)}
      >
        <MuiIconButton
          {...props}
          ref={forwardRef as ((instance: HTMLButtonElement | null) => void)}
          role="button"
          aria-disabled={props.disabled}
          className={`${props.selected ? 'selected' : ''} ${props.className}`}
        >
          {props.children}
          { (showendicon === 1 || showendicon === true) && (
            <IconChevronDown
              className="endIcon"
              data-testid={IconButtonTestIds.ICONBUTTON_END_ICON}
              sx={(theme) => {
                return {
                  color: (props.inversecolors) ? theme.palette.action.inverse : theme.palette.action.active,
                  width: '12px',
                  height: '12px',
                  margin: '0',
                  padding: '0',
                  ...props.variant === IconButtonVariants.WITH_PADDING && {
                    marginLeft: '-2px',
                    ...props.size === IconButtonSizes.SMALL && {
                      marginRight: '3px',
                    },
                    ...props.size === IconButtonSizes.MEDIUM && {
                      marginRight: '4px',
                    },
                  },
                  ...props.variant === IconButtonVariants.WITHOUT_PADDING && {
                    ...props.size === IconButtonSizes.SMALL && {
                      marginRight: '2px',
                    },
                    ...props.size === IconButtonSizes.MEDIUM && {
                      marginRight: '2px',
                    },
                  },
                };
              }}
            />
          )}
        </MuiIconButton>
      </StyledSubContainer>
      {props.label && (
      <Typography
        variant="caption"
        textAlign="center"
        sx={(theme) => {
          return {
            color: (props.inversecolors) ? theme.palette.action.inverse : theme.palette.action.active,
            paddingLeft: '4px',
            paddingRight: '4px',
            marginTop: '2px',
          };
        }}
      >
        {props.label}
      </Typography>
      )}
    </StyledMainContainer>
  );
}) as React.FC<IconButtonProps>;

IconButton.defaultProps = {
  size: IconButtonSizes.MEDIUM,
  variant: IconButtonVariants.WITH_PADDING,
  color: 'default',
  selected: false,
  showendicon: false,
  label: undefined,
  disabled: false,
  inversecolors: false,
  disableFocusRipple: true,
  edge: false,
  centerRipple: true,
  disableRipple: true,
  disableTouchRipple: true,
  focusRipple: true,
  tabIndex: 0,
};

export * from '@mui/material/IconButton';
export default IconButton;
