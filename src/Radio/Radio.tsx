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
import MuiRadio, { RadioProps } from '@mui/material/Radio';
import { Components, Theme } from '@mui/material';

const Radio = ({ ...props }: RadioProps) => {
  return <MuiRadio {...props} />;
};

export const getMuiRadioThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiRadio: {
      styleOverrides: {
        root: ({ theme }) => {
          return ({
            border: 'transparent 1px solid',
            marginRight: '4px',
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
            padding: '4px',
            '& .MuiSvgIcon-root': {
              height: '16px',
              width: '16px',
            },
            '&.Mui-focusVisible': {
              input: {
                '&:focus': {
                  outline: 'none',
                },
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              },
              border: `1px solid ${theme.palette.primary.main}`,
              width: '26px',
              height: '26px',
            },
          });
        },
      },
    },
  };
};

Radio.defaultProps = {
  disableRipple: true,
  disabled: false,
  required: false,
};

export * from '@mui/material/Radio';
export default Radio;
