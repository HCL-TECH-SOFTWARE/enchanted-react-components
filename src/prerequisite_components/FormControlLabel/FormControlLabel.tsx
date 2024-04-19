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
import { Components, Theme } from '@mui/material';
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';

/**
 * Override out of the box styling from mui to align with designer theme
 * @returns override FormControlLabel component styles and prop
 */
export const getMuiFormControlLabelThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiFormControlLabel: {
      styleOverrides: {
        root: ({ theme }) => {
          return ({
            marginLeft: 'unset',
            marginRight: 'unset',
            // below MuiFormControlLabel override only applicable for Checkbox to make sure Checkbox is parent component
            '.MuiCheckbox-root + .MuiTypography-root': {
              ...theme.typography.body2, // fallback for label but can be overriden by actual typography variant in label prop elements
            },
            // below MuiFormControlLabel override only applicable for Radio to make sure Radio is parent component
            '.MuiRadio-root + .MuiTypography-root': {
              ...theme.typography.body2, // fallback for label but can be overriden by actual typography variant in label prop elements
            },
            // below MuiFormControlLabel override only applicable for Switch to make sure Switch is parent component
            '.MuiSwitch-root + .MuiTypography-root': {
              ...theme.typography.body2, // fallback for label but can be overriden by actual typography variant in label prop elements
            },
          });
        },
      },
    },
  };
};

const FormControlLabel = ({ ...props }: FormControlLabelProps) => {
  return <MuiFormControlLabel {...props} />;
};

FormControlLabel.defaultProps = {
};

export * from '@mui/material/FormControlLabel';
export default FormControlLabel;
