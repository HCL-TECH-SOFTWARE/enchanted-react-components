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
import * as React from 'react';

import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ThemeDirectionType } from '../theme';

export interface DirectionStyleProviderProps {
  children: React.ReactNode;
  direction: ThemeDirectionType;
}
/** @deprecated use StyleProvider instead */
const DirectionStyleProvider: React.FC<DirectionStyleProviderProps> = (props: DirectionStyleProviderProps) => {
  const isRtlDirection = props.direction === ThemeDirectionType.RTL;
  // Create rtl cache
  const cacheRtl = createCache({
    key: 'emui',
    stylisPlugins: [prefixer, rtlPlugin],
  });

  if (isRtlDirection) {
    return (
      <CacheProvider value={cacheRtl}>
        {props.children}
      </CacheProvider>
    );
  }
  return (
    <>
      {props.children}
    </>
  );
};

export default DirectionStyleProvider;
