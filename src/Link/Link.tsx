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
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import {
  Components, Theme,
} from '@mui/material';

export enum LinkType {
  PRIMARY = 'primary',
  NEUTRAL_PRIMARY = 'neutralPrimary',
  NEUTRAL_SECONDARY = 'neutralSecondary',
}

/**
 * @typedef LinkProps
 * @type {object}
 * @property {string} disabled - If `true`, the component is disabled.
 * @property {string} spacing - If `true`, the component has padding.
 * @property {string} type - The color of the component.
 */
export type LinkProps = MuiLinkProps & {
  disabled?: boolean,
  spacing?: boolean,
  type?: LinkType,
  hoverBackground?: boolean,
}

/**
 * Override out of the box styling from mui to align with designer theme
 * @returns override Link component styles and prop
 */
export const getMuiLinkThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiLink: {
      defaultProps: {
        align: 'inherit',
        gutterBottom: false,
        noWrap: false,
        paragraph: false,
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          return {
            '&[disabled]': {
              color: theme.palette.text.disabled,
              cursor: 'default',
              pointerEvents: 'none',
              outline: 'none',
              border: 'transparent 1px solid',
              textDecorationColor: theme.palette.text.disabled,
              '&:focus': {
                border: 'transparent 1px solid',
              },
            },
            '&:hover': {
              color: theme.palette.primary.main,
              textDecorationColor: theme.palette.primary.main,
              ...ownerState.hoverBackground === true && {
                background: theme.palette.action.hover,
                borderRadius: '2px',
              },
              ...ownerState.hoverBackground === false && {
                background: 'none',
              },
            },
            '&.force-to-hover': {
              color: theme.palette.primary.main,
              textDecorationColor: theme.palette.primary.main,
              background: theme.palette.action.hover,
              borderRadius: '2px',
            },
            '&.force-to-focus': {
              border: `${theme.palette.primary.main} 1px solid`,
              outline: 'none',
              borderRadius: '2px',
            },
            '&.Mui-focusVisible': {
              border: `${theme.palette.primary.main} 1px solid`,
              outline: 'none',
              borderRadius: '2px',
              '&:hover': {
                color: theme.palette.primary.main,
                textDecorationColor: theme.palette.primary.main,
                borderRadius: '2px',
              },
            },
            ...ownerState.spacing === true && {
              margin: '0px 3px 0px 3px',
            },
            padding: '1px 3px 1px 3px',
            display: 'inline-block',
            border: 'transparent 1px solid',
            ...ownerState.type === LinkType.PRIMARY && {
              color: theme.palette.primary.main,
            },
            ...ownerState.type === LinkType.NEUTRAL_SECONDARY && {
              color: theme.palette.text.secondary,
            },
            ...ownerState.type === LinkType.NEUTRAL_PRIMARY && {
              color: theme.palette.text.primary,
            },
          };
        },
        underlineAlways: ({ theme }) => {
          return {
            textDecoration: 'underline',
            textDecorationColor: theme.palette.primary.main,
          };
        },
      },
    },
  };
};

const Link = ({ hoverBackground, spacing, ...props }: LinkProps) => {
  // Remove custom props (hoverBackground, spacing) from props passed to MuiLink
  // to prevent React warnings about non-standard DOM attributes
  return (
    <MuiLink {...props} />
  );
};

Link.defaultProps = {
  disabled: false,
  type: LinkType.PRIMARY,
  spacing: false,
  hoverBackground: true,
  underline: 'hover',
};

export default Link;
