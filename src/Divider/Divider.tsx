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
import MuiDivider, { DividerProps } from '@mui/material/Divider';
import {
  Components, Theme,
} from '@mui/material';

export enum DividerTypes {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  WITHMARGIN = 'withMargin',
  NOPADDING= 'noPadding',
}

/**
 * @returns override Divider component styles and props
 */
export const getMuiDividerThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiDivider: {
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          return {
            ...ownerState.type === DividerTypes.PRIMARY && {
              borderColor: theme.palette.border.primary,
            },
            ...ownerState.type === DividerTypes.SECONDARY && {
              borderColor: theme.palette.border.secondary,
            },
            ...ownerState.type === DividerTypes.WITHMARGIN && {
              borderColor: theme.palette.border.primary,
              ...ownerState.orientation === 'vertical' && {
                margin: '0px 4px 0px 4px',
              },
              ...ownerState.orientation === 'horizontal' && {
                margin: '4px 0px 4px 0px',
              },
            },
            ...ownerState.type === DividerTypes.NOPADDING && {
              borderColor: theme.palette.border.primary,
              padding: '0px',
            },
          };
        },
      },
    },
  };
};

const Divider = ({ ...props }: DividerProps) => {
  if (props.orientation === 'horizontal') {
    return <MuiDivider data-testid="Divider" sx={{ height: '1px', width: '100%' }} {...props} />; // Setting width 100% of Divider in horizontal
  }
  return <MuiDivider data-testid="Divider" {...props} />;
};

Divider.defaultProps = {
  type: 'primary',
};

export default Divider;
