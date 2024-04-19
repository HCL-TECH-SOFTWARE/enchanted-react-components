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
import MuiSwitch, { SwitchProps } from '@mui/material/Switch';
import { Components, Theme } from '@mui/material/styles';

const Switch = ({ ...props }: SwitchProps) => {
  return <MuiSwitch {...props} />;
};

Switch.defaultProps = {
  centerRipple: false,
  disableTouchRipple: false,
  focusRipple: false,
  disabled: false,
};

export const getMuiSwitchThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiSwitch: {
      styleOverrides: {
        root: ({ theme }) => {
          return ({
            '&.MuiSwitch-root': {
              width: '38px',
              height: '22px',
              padding: '3px',
              borderRadius: '30px',
              marginRight: '4px',
            },
            '&:active': {
              '& .MuiSwitch-thumb': {
                width: '15px',
              },
              '& .MuiSwitch-switchBase.Mui-checked:not(.Mui-disabled)': {
                transform: 'translateX(9px)',
              },
            },
            '& .MuiSwitch-switchBase': {
              padding: '5px',
              '&:hover': {
                backgroundColor: 'transparent', // Disable default hover while unchecked as per switch in Figma
              },
              '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: theme.palette.background.paper,
                '& + .MuiSwitch-track': {
                  opacity: 1,
                  backgroundColor: theme.palette.primary.main,
                },
                '&:hover': {
                  backgroundColor: 'transparent', // Disable default hover while checked as per switch in Figma
                  '& + .MuiSwitch-track': {
                    backgroundColor: theme.palette.primary.dark,
                  },
                },
              },
              '&.Mui-disabled': {
                '& + .MuiSwitch-track': {
                  backgroundColor: theme.palette.action.disabled,
                  opacity: 1,
                },
                '& .MuiSwitch-thumb': {
                  color: theme.palette.background.paper,
                },
              },
            },
            '& .MuiSwitch-thumb:not(.Mui-disabled)': {
              width: '12px',
              height: '12px',
              borderRadius: '6px',
              transition: theme.transitions.create(['width'], {
                duration: 200,
              }),
            },
            '& .MuiSwitch-track': {
              opacity: 1,
              backgroundColor: theme.palette.action.active,
              boxSizing: 'border-box',
              borderRadius: '30px',
            },
            '&.MuiSwitch-root:hover': {
              backgroundColor: theme.palette.action.hover,
            },
            '&.MuiSwitch-root:focus-within': {
              outline: `1px solid ${theme.palette.primary.main}`,
            },
          });
        },
      },
    },
  };
};

export * from '@mui/material/Switch';
export default Switch;
