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
import MuiButtonGroup, { ButtonGroupProps } from '@mui/material/ButtonGroup';

const ButtonGroup = ({ ...props }: ButtonGroupProps) => {
  return <MuiButtonGroup {...props} />;
};

const defaultProps: ButtonGroupProps = {
  variant: 'contained',
  color: 'primary',
  disabled: false,
  disableElevation: false,
  disableFocusRipple: false,
  disableRipple: false,
  fullWidth: false,
  orientation: 'horizontal',
  size: 'small',
};

ButtonGroup.defaultProps = defaultProps;

export * from '@mui/material/ButtonGroup';
export default ButtonGroup;
