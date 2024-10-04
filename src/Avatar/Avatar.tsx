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
import MuiAvatar, { AvatarProps as MuiAvatarProps } from '@mui/material/Avatar';
import { Components, Theme } from '@mui/material';

import Typography from '../Typography';
import {
  blue, green, indigo, lime, pink, teal, yellow, red, orange, purple, neutralGrey,
} from '../colors';

// Disable 'square' variant as this is not required in Figma Design
declare module '@mui/material/Avatar' {
  interface AvatarPropsVariantOverrides {
    square: false;
  }
}

// Props for Avatar types
export enum AvatarTypes {
  IMAGE = 'image',
  LETTER = 'letter',
  ICON = 'icon',
}

// Props for Avatar colors while avatar type selected as icon type
export enum AvatarColors {
  DEFAULT = 'default',
  RED = 'red',
  ORANGE = 'orange',
  YELLOW = 'yellow',
  LIME = 'lime',
  GREEN = 'green',
  TEAL = 'teal',
  BLUE = 'blue',
  INDIGO = 'indigo',
  PURPLE = 'purple',
  PINK = 'pink',
}

export type AvatarProps = MuiAvatarProps & {
  type: AvatarTypes, // Types of Avatar that can be set as image, letter or icon.
  color?: AvatarColors, // Color of Avatar when it's type set to icon or letter.
  iconImage?: React.ReactNode; // Set Avatar icon image e.g. folder etc.
  imageSource?: string, // Set image source of Avatar when it's type set to image.
  letter?: string, // Set letter typography when type of Avatar set to letter.
  imageAltProps?: string, // Set alt attribute of Avatar
  imageProps?: ImgHTMLAttributes<HTMLImageElement>, // image props to set other props like hover, loading etc.
}

export enum AvatarTestIds {
  AVATAR_ICON = 'avatarIcon',
  AVATAR_LETTER = 'avatarLetter',
  AVATAR_IMAGE = 'avatarImage',
}

const Avatar = ({ ...props }: AvatarProps) => {
  const {
    type, iconImage, imageSource, letter, imageAltProps, imageProps, ...rest // Do not put trailing comma here
  } = props;

  const getIconAvatar = () => {
    return (
      <>
        {iconImage}
      </>
    );
  };

  const getImageAvatar = () => {
    return (
      <>
        {imageSource ? <img src={imageSource} alt={imageAltProps} data-testid={AvatarTestIds.AVATAR_IMAGE} {...imageProps} /> : null}
      </>
    );
  };

  // To format typography inputs for showing inside Avatar
  const getFormattedLetter = () => {
    let letterText = '';
    if (letter != null && letter.length >= 1) {
      letterText = letter.substring(0, 2);
    }
    return letterText.toUpperCase();
  };

  const getLetterAvatar = () => {
    return (
      <>
        {letter
          ? (
            <Typography variant="caption" data-testid={AvatarTestIds.AVATAR_LETTER}>
              {
                getFormattedLetter()
              }
            </Typography>
          )
          : null}
      </>
    );
  };

  /**
   * Gets child icon for Avatar based on the type of Avatar
   * @param avatarType Optional parameter to determine the type of Avatar
   * @returns A component of icon
   */
  const getChildIcon = (): JSX.Element => {
    switch (type) {
      case AvatarTypes.IMAGE: return getImageAvatar();
      case AvatarTypes.LETTER: return getLetterAvatar();
      case AvatarTypes.ICON: return getIconAvatar();
      default: return (<MuiAvatar />);
    }
  };

  return (
    <MuiAvatar {...rest}>
      {getChildIcon()}
    </MuiAvatar>
  );
};

/**
 * Override out of the box styling from mui to align with designer theme
 * @returns override Checkbox component styles and prop
 */
export const getMuiAvatarThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiAvatar: {
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          return ({
            '&.MuiAvatar-root': {
              height: '24px',
              width: '24px',
              boxSizing: 'border-box',
              border: `1px solid ${theme.palette.border.secondary}`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              ...ownerState.variant === 'rounded' && {
                padding: '3px',
                borderRadius: '2px',
              },
            },
            '& .MuiSvgIcon-root': {
              height: '16px',
              width: '16px',
              ...(ownerState.color === 'default' && {
                color: neutralGrey.NG800,
                fill: neutralGrey.NG800,
              }),
              ...(ownerState.color === 'red' && {
                color: red.RED800,
                fill: red.RED800,
              }),
              ...(ownerState.color === 'orange' && {
                color: orange.ORANGE800,
                fill: orange.ORANGE800,
              }),
              ...(ownerState.color === 'yellow' && {
                color: yellow.YELLOW800,
                fill: yellow.YELLOW800,
              }),
              ...(ownerState.color === 'lime' && {
                color: lime.LIME800,
                fill: lime.LIME800,
              }),
              ...(ownerState.color === 'green' && {
                color: green.GREEN800,
                fill: green.GREEN800,
              }),
              ...(ownerState.color === 'teal' && {
                color: teal.TEAL800,
                fill: teal.TEAL800,
              }),
              ...(ownerState.color === 'blue' && {
                color: blue.BLUE800,
                fill: blue.BLUE800,
              }),
              ...(ownerState.color === 'indigo' && {
                color: indigo.INDIGO800,
                fill: indigo.INDIGO800,
              }),
              ...(ownerState.color === 'purple' && {
                color: purple.PURPLE800,
                fill: purple.PURPLE800,
              }),
              ...(ownerState.color === 'pink' && {
                color: pink.PINK800,
                fill: pink.PINK800,
              }),
            },
            ...(ownerState.color === 'default' && {
              backgroundColor: neutralGrey.NG100,
              '.MuiTypography-root': {
                color: neutralGrey.NG800,
              },
            }),
            ...(ownerState.color === 'red' && {
              backgroundColor: red.RED100,
              '.MuiTypography-root': {
                color: red.RED800,
              },
            }),
            ...(ownerState.color === 'orange' && {
              backgroundColor: orange.ORANGE100,
              '.MuiTypography-root': {
                color: orange.ORANGE800,
              },
            }),
            ...(ownerState.color === 'yellow' && {
              backgroundColor: yellow.YELLOW100,
              '.MuiTypography-root': {
                color: yellow.YELLOW800,
              },
            }),
            ...(ownerState.color === 'lime' && {
              backgroundColor: lime.LIME100,
              '.MuiTypography-root': {
                color: lime.LIME800,
              },
            }),
            ...(ownerState.color === 'green' && {
              backgroundColor: green.GREEN100,
              '.MuiTypography-root': {
                color: green.GREEN800,
              },
            }),
            ...(ownerState.color === 'teal' && {
              backgroundColor: teal.TEAL100,
              '.MuiTypography-root': {
                color: teal.TEAL800,
              },
            }),
            ...(ownerState.color === 'blue' && {
              backgroundColor: blue.BLUE100,
              '.MuiTypography-root': {
                color: blue.BLUE800,
              },
            }),
            ...(ownerState.color === 'indigo' && {
              backgroundColor: indigo.INDIGO100,
              '.MuiTypography-root': {
                color: indigo.INDIGO800,
              },
            }),
            ...(ownerState.color === 'purple' && {
              backgroundColor: purple.PURPLE100,
              '.MuiTypography-root': {
                color: purple.PURPLE800,
              },
            }),
            ...(ownerState.color === 'pink' && {
              backgroundColor: pink.PINK100,
              '.MuiTypography-root': {
                color: pink.PINK800,
              },
            }),
            img: {
              height: '24px',
              width: '24px',
            },
          });
        },
      },
    },
  };
};

const defaultProps: AvatarProps = {
  variant: 'circular',
  type: AvatarTypes.ICON,
  color: AvatarColors.DEFAULT,
};

Avatar.defaultProps = defaultProps;

export * from '@mui/material/Avatar';
export default Avatar;
