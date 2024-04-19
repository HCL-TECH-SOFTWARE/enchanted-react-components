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
import MuiToggleButton, { ToggleButtonProps as MuiToggleButtonProps } from '@mui/material/ToggleButton';
import { Components, Theme } from '@mui/material';

export interface ToggleButtonProps extends MuiToggleButtonProps {
  size?: 'small' | 'medium';
}

const ToggleButton = ({ ...props }: ToggleButtonProps) => {
  return <MuiToggleButton {...props} />;
};

const defaultProps: ToggleButtonProps = {
  color: 'standard',
  disabled: false,
  disableFocusRipple: false,
  fullWidth: false,
  size: 'small',
  centerRipple: false,
  disableRipple: false,
  disableTouchRipple: false,
  focusRipple: false,
  tabIndex: 0,
  value: '',
};

ToggleButton.defaultProps = defaultProps;

export const getMuiToggleButtonThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiToggleButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          return {
            border: `1px solid ${theme.palette.border.secondary}`,
            padding: '0px',
            borderRadius: '2px',
            '& .MuiSvgIcon-root': {
              margin: '2px',
              padding: '3px',
              height: 22,
              ...ownerState.size === 'small' ? {
                width: 32,
              } : {
                width: 44,
              },
            },
            '&:hover': {
              '& .MuiSvgIcon-root': {
                padding: '2px',
                borderRadius: '1px',
                border: `1px solid ${theme.palette.primary.main}`,
              },
            },
            '&:focus': {
              '& .MuiSvgIcon-root': {
                padding: '2px',
                borderRadius: '1px',
                border: `1px solid ${theme.palette.primary.main}`,
              },
            },
          };
        },
      },
    },
  };
};

export * from '@mui/material/ToggleButton';
export default ToggleButton;
