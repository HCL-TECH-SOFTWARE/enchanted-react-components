/* ======================================================================== *
 * Copyright 2025 HCL America Inc.                                          *
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

import React, { forwardRef } from 'react';
import MuiList, { ListProps } from '@mui/material/List';
import { Components, Theme } from '@mui/material';

export const getMuiListThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiList: {
      styleOverrides: {
        root: () => {
          return ({
          });
        },
      },
    },
  };
};

const List = forwardRef<HTMLUListElement, ListProps>((props, ref) => {
  return <MuiList {...props} ref={ref} />;
});

List.defaultProps = {
  dense: true,
  disablePadding: true,
};

export * from '@mui/material/List';
export default List;
