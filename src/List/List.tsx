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

const List = React.forwardRef<HTMLUListElement, ListProps>(
  (props: ListProps, ref: React.Ref<HTMLUListElement>) => {
    return <MuiList ref={ref} {...props} />;
  },
);

List.defaultProps = {
  dense: true,
  disablePadding: true,
};

export * from '@mui/material/List';
export default List;
