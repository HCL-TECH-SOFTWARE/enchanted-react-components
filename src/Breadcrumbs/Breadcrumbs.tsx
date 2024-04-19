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
import MuiBreadcrumbs, { BreadcrumbsProps as MuiBreadcrumbsProps } from '@mui/material/Breadcrumbs';
import { Components, Theme } from '@mui/material';
import IconChevronRight from '@hcl-software/enchanted-icons/dist/carbon/es/chevron--right';

/**
 * @typedef BreadcrumbsProps
 * @type {object}
 * @property {string} disabled - If `true`, the component is disabled.
 */
export type BreadcrumbsProps = MuiBreadcrumbsProps & {
  disabled?: boolean,
}

/**
 * Override out of the box styling from mui to align with designer theme
 * @returns override Breadcrumbs component styles and prop
 */
export const getMuiBreadcrumbsThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiBreadcrumbs: {
      defaultProps: {
        separator: <IconChevronRight />,
        maxItems: 8,
        itemsAfterCollapse: 1,
        itemsBeforeCollapse: 1,
      },
      styleOverrides: {
        root: ({ theme }) => {
          return {
            paddingTop: '2px',
            paddingBottom: '2px',
            '&[disabled]': {
              cursor: 'default',
              pointerEvents: 'none',
              textDecorationColor: theme.palette.text.disabled,
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'none',
              },
              li: {
                a: {
                  outline: 'none',
                  borderColor: 'transparent',
                  color: theme.palette.text.disabled,
                },
              },
            },
            li: {
              lineHeight: '16px',
              svg: {
                height: '16px',
                width: '16px',
                display: 'inline-block',
                verticalAlign: 'middle',
                marginBottom: '1px',
                marginTop: '-1px',
              },
              a: {
                color: theme.palette.text.secondary,
                textAlign: 'center',
                ...theme.typography.body2,
                lineHeight: '16px',
                textDecoration: 'none',
                padding: '1px 2px 1px 2px',
                borderRadius: '2px',
                display: 'inline',
                '&:hover': {
                  color: theme.palette.text.secondary,
                  backgroundColor: theme.palette.action.hover,
                  textDecoration: 'underline',
                  textDecorationColor: theme.palette.text.secondary,
                },
                '&:focus': {
                  outlineColor: theme.palette.primary.main,
                  outlineWidth: '1px',
                  textDecoration: 'none',
                  '&:hover': {
                    color: theme.palette.text.secondary,
                    textDecoration: 'underline',
                    textDecorationColor: theme.palette.text.secondary,
                  },
                },
              },
              p: {
                ...theme.typography.body2,
              },
            },
            '& .MuiBreadcrumbs-separator': {
              margin: '0',
              svg: {
                margin: '0 2px 0 2px',
                height: '16px',
                width: '16px',
                display: 'inline-block',
                verticalAlign: 'middle',
              },
            },
          };
        },
      },
    },
  };
};

const Breadcrumbs = ({ ...props }: BreadcrumbsProps) => {
  return <MuiBreadcrumbs {...props} />;
};

Breadcrumbs.defaultProps = {
  disabled: false,
};

export default Breadcrumbs;
