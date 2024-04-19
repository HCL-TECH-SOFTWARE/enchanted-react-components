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
import MuiBadge, { BadgeProps } from '@mui/material/Badge';

const Badge = ({ ...props }: BadgeProps) => {
  return <MuiBadge {...props} />;
};

const defaultProps: BadgeProps = {
  color: 'primary',
  overlap: 'rectangular',
  variant: 'standard',
};

Badge.defaultProps = defaultProps;

export * from '@mui/material/Badge';
export default Badge;
