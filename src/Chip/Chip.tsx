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
import React, { ImgHTMLAttributes } from 'react';
import { Components, Theme } from '@mui/material';
import MuiChip, { ChipProps as MuiChipProps } from '@mui/material/Chip';
import Avatar, { AvatarTypes } from '../Avatar';

export enum ChipVariants {
  CONTAINED = 'filled',
  OUTLINED = 'outlined',
}

export enum ChipTestIds {
  CHIP_ROOT = 'ChipRoot',
}

/**
 * @typedef ChipProps
 * @type {object}
 * @property {AvatarTypes} leadingavatartype - Types of Avatar that can be set as image, letter or icon
 * @property {React.ReactNode} leadingIcon - Types of Avatar that can be set as image, letter or icon
 * @property {string} leadingImage - Types of Avatar that can be set as image, letter or icon
 * @property {string} leadingImageAlt - Types of Avatar that can be set as image, letter or icon
 * @property {ImgHTMLAttributes<HTMLImageElement>} leadingImageProps - Types of Avatar that can be set as image, letter or icon
 * @property {string} leadingLetter - Types of Avatar that can be set as image, letter or icon
 * @property {React.ReactNode} trailingIcon - Types of Avatar that can be set as image, letter or icon
 * @property {Function} onDeleteFunc - Callback fired when trailing icon is clicked. If undefined, it will hide trailing icon
 * @property {boolean} hideTrailingIcon - Toggles visibility of trailing icon, only for Storybook use
 * @property {boolean} selected - Toggles selected state for Storybook use only - adds same styles as :active state
 * @property {boolean} focus - Toggles focus state for Storybook use only - adds same styles as :focus state
 */
export type ChipProps = MuiChipProps & {
  leadingavatartype?: AvatarTypes | 'none', // none is layman's term for undefined in Storybook control as requested by UIUX
  leadingIcon?: React.ReactNode,
  leadingImage?: string,
  leadingImageAlt?: string,
  leadingImageProps?: ImgHTMLAttributes<HTMLImageElement>,
  leadingLetter?: string,
  trailingIcon?: React.ReactElement,
  onDeleteFunc?: Function,
  // Storybook controls-related props
  hideTrailingIcon?: boolean, // By default, MuiChip hides trailing icon if onDelete is undefined
  selected?: boolean,
  focus?: boolean | 0 | 1,
}

const Chip = ({ ...props }: ChipProps) => {
  const {
    leadingIcon, leadingImage, leadingImageAlt, leadingImageProps, leadingLetter,
    trailingIcon, onDeleteFunc, hideTrailingIcon,
    icon, ...rest
  } = props;

  const renderLeadingIcon = () => {
    switch (props.leadingavatartype) {
      case AvatarTypes.ICON: {
        if (leadingIcon || icon) {
          return <Avatar type={props.leadingavatartype} iconImage={leadingIcon || icon} />;
        }
        break;
      }
      case AvatarTypes.LETTER: {
        if (leadingLetter) {
          return <Avatar type={props.leadingavatartype} letter={leadingLetter} />;
        }
        break;
      }
      case AvatarTypes.IMAGE: {
        if (leadingImage) {
          return <Avatar type={props.leadingavatartype} imageSource={leadingImage} imageAltProps={leadingImageAlt} imageProps={leadingImageProps} />;
        }
        break;
      }
      case 'none':
      default:
        break;
    }
    return undefined;
  };

  return (
    <MuiChip
      {...rest}
      avatar={renderLeadingIcon()}
      deleteIcon={trailingIcon}
      onDelete={
        onDeleteFunc && !hideTrailingIcon
          ? () => { onDeleteFunc(); }
          : undefined // undefined is acceptable for MuiChip, it hides the trailing icon as per doc
      }
      data-testid={ChipTestIds.CHIP_ROOT}
    />
  );
};

export const getMuiChipThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiChip: {
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          const leadingLetter: string = ownerState.avatar?.props.letter as string;
          return ({
            height: '24px',
            padding: '4px',
            border: '1px solid transparent',
            ...ownerState.variant === ChipVariants.CONTAINED && {
              backgroundColor: theme.palette.action.activeOpacity,
              '&.Mui-focusVisible': {
                backgroundColor: theme.palette.action.hover,
              },
              ...ownerState.disabled && {
                backgroundColor: theme.palette.action.disabledBackground,
              },
              ...ownerState.focus === 1 && {
                border: `2px solid ${theme.palette.action.focus}`,
                padding: '3px',
              },
            },
            ...ownerState.variant === ChipVariants.OUTLINED && {
              backgroundColor: 'transparent',
              border: `1px solid ${theme.palette.border.tertiary}`,
              '&.Mui-focusVisible': {
                backgroundColor: 'transparent',
              },
              ...ownerState.disabled && {
                border: `1px solid ${theme.palette.action.disabledOpacityModified}`,
              },
              ...ownerState.focus === 1 && {
                border: `2px solid ${theme.palette.action.focus}`,
                padding: '3px',
              },
            },
            '&:focus': {
              border: `2px solid ${theme.palette.action.focus}`,
              padding: '3px',
            },
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
              '&:active': {
                backgroundColor: theme.palette.action.selectedOpacityModified, // on select, override hover bg color with blueish one
              },
            },
            ...ownerState.selected === true && { // mimics :active styles above for Storybook control
              backgroundColor: theme.palette.action.selectedOpacityModified,
              border: `1px solid ${theme.palette.action.selected}`,
              '&:hover': {
                backgroundColor: theme.palette.background.primary,
                border: `1px solid ${theme.palette.primary.dark}`,
                padding: '4px',
                '.MuiChip-label': {
                  color: theme.palette.primary.dark,
                },
              },
              ...ownerState.focus === 1 && {
                border: `2px solid ${theme.palette.action.focus}`,
                padding: '3px',
              },
            },
            '&.Mui-disabled': {
              opacity: 'unset', // override MUI's default disabled opacity to follow Figma color token
              backgroundColor: theme.palette.action.disabledBackground,
            },
            '&:active': {
              backgroundColor: theme.palette.action.selectedOpacityModified,
              outline: `1px solid ${theme.palette.action.selected}`,
              '&:focus': {
                outline: 'none', // focus should take care of the 2px so it doesn't total up to 3
              },
              '.MuiChip-label': {
                color: theme.palette.action.selected,
              },
            },
            '.MuiChip-label': { // styles the text within the chip
              padding: '0 8px',
              color: theme.palette.text.primary,
              ...theme.typography.body2,
              ...ownerState.disabled && {
                color: theme.palette.text.disabled,
              },
              ...ownerState.selected === true && { // mimics :active styles above for Storybook control
                color: theme.palette.action.selected,
              },
            },
            '.MuiAvatar-root': { // styles the leading icon and overrides Enchanted Avatar's own overrrides
              '&.MuiChip-avatar': {
                border: 'none',
                margin: 0,
                color: theme.palette.action.active,
                '&.MuiChip-avatarMedium': {
                  height: '16px',
                  width: '16px',
                  ...ownerState.leadingavatartype === AvatarTypes.IMAGE && {
                    img: {
                      height: '16px',
                      width: '16px',
                      ...ownerState.disabled === true && {
                        opacity: '0.38',
                      },
                    },
                  },
                  ...ownerState.leadingavatartype === AvatarTypes.ICON && {
                    '.MuiSvgIcon-root': {
                      height: '16px',
                      width: '16px',
                    },
                  },
                },
              },
              '.MuiTypography-root': {
                // DXQ-35439 - As per new chip V2.1, in case of 2 letters in Avatar inside Chip, font size should be 6.67px and line height should be 9.33px
                // styles the letter inside avatar if type is letter
                fontSize: (leadingLetter && leadingLetter.length > 1) ? '6.66px' : '10px',
                lineHeight: (leadingLetter && leadingLetter.length > 1) ? '9.33px' : '14px',
                ...ownerState.disabled === true && {
                  opacity: '0.38',
                },
              },
              '.MuiSvgIcon-root': {
                fill: theme.palette.action.active,
                ...ownerState.disabled && {
                  fill: theme.palette.action.disabled,
                },
              },
              ...ownerState.leadingavatartype === AvatarTypes.ICON && {
                backgroundColor: 'transparent',
              },
              ...ownerState.leadingavatartype === AvatarTypes.LETTER && {
                backgroundColor: theme.palette.action.activeOpacity,
              },
            },
            '.MuiChip-deleteIcon': { // should style any trailing icon regardless of actual icon
              margin: 0,
              height: '16px',
              width: '16px',
              color: theme.palette.action.active,
              ...ownerState.disabled && {
                color: theme.palette.action.disabled,
              },
            },
          });
        },
      },
    },
  };
};

Chip.defaultProps = {
  color: 'default',
  clickable: false,
  disabled: false,
  variant: ChipVariants.CONTAINED,
  onDeleteFunc: undefined,
  hideTrailingIcon: false,
  leadingavatartype: 'none',
  selected: false,
  focus: 0,
};

export * from '@mui/material/Chip';
export default Chip;
