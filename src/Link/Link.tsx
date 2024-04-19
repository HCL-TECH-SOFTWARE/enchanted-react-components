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

/**
 * @typedef LinkProps
 * @type {object}
 * @property {string} disabled - If `true`, the component is disabled.
 */
export type LinkProps = MuiLinkProps & {
  disabled?: boolean,
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
        root: ({ theme }) => {
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
              color: theme.palette.primary.dark,
              textDecorationColor: theme.palette.primary.dark,
            },
            '&.Mui-focusVisible': {
              border: `${theme.palette.primary.main} 1px solid`,
              outline: 'none',
              borderRadius: '2px',
              '&:hover': {
                color: theme.palette.primary.dark,
                textDecorationColor: theme.palette.primary.dark,
              },
            },
            paddingLeft: '2px',
            paddingRight: '2px',
            display: 'inline-block',
            border: 'transparent 1px solid',
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

const Link = ({ ...props }: LinkProps) => {
  return (
    <MuiLink {...props} />
  );
};

Link.defaultProps = {
  disabled: false,
};

export default Link;
