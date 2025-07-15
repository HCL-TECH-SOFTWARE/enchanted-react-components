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
import MuiPaper, { PaperProps } from '@mui/material/Paper';
import { Components, Theme } from '@mui/material';

const Paper = React.forwardRef<HTMLDivElement, PaperProps>(
  (props: PaperProps, ref: React.Ref<HTMLDivElement>) => {
    return <MuiPaper ref={ref} {...props} />;
  },
);

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    nopadding: true;
  }
}

export const getMuiPaperThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiPaper: {
      variants: [
        {
          props: { variant: 'nopadding' },
          style: {
            padding: '0px',
          },
        },
      ],
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          return ({
            '&.MuiPaper-root': {
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: theme.palette.background.paper,
            },
            ...ownerState.variant === 'elevation' && {
              boxShadow: (ownerState.elevation !== undefined && theme.shadows[ownerState.elevation]) || theme.shadows[2],
              padding: '8px',
            },
            ...ownerState.variant === 'outlined' && {
              border: `1px solid ${theme.palette.border.primary}`,
              padding: '8px',
            },
          });
        },
      },

    },
  };
};

const defaultProps: PaperProps = {
  variant: 'outlined',
  square: false,
  elevation: 0,
};

Paper.defaultProps = defaultProps;

export default Paper;
