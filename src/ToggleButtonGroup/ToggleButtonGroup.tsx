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

import React, { useRef } from 'react';
import MuiToggleButtonGroup, { ToggleButtonGroupProps as MuiToggleButtonGroupProps } from '@mui/material/ToggleButtonGroup';
import { Components, Theme } from '@mui/material/styles';

export enum ToggleButtonGroupSizes {
  SMALL = 'small',
  MEDIUM = 'medium',
}

/**
 * @typedef ToggleButtonGroupProps
 * @type {object}
 * @property {ToggleButtonGroupSizes} size - The size of the component
 */
export interface ToggleButtonGroupProps extends MuiToggleButtonGroupProps {
  size?: ToggleButtonGroupSizes,
}

const ToggleButtonGroup = ({ ...props }: MuiToggleButtonGroupProps) => {
  const tbGroupRef = useRef<HTMLButtonElement | null>(null);

  return (
    <MuiToggleButtonGroup
      {...props}
      ref={tbGroupRef}
      aria-disabled={props.disabled}
    />
  );
};

ToggleButtonGroup.defaultProps = {
  size: ToggleButtonGroupSizes.SMALL,
  orientation: 'horizontal',
  disabled: false,
  exclusive: true,
};

export const getMuiToggleButtonGroupThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          return ({
            '.Mui-selected.MuiToggleButtonGroup-grouped:not(:first-of-type)': {
              marginLeft: '-1px',
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderLeft: `1px solid ${theme.palette.action.focus}`,
              '&.Mui-disabled': {
                border: `1px solid ${theme.palette.border.secondary}`,
              },
            },
          });
        },
      },
    },
  };
};

export * from '@mui/material/ToggleButtonGroup';
export default ToggleButtonGroup;
