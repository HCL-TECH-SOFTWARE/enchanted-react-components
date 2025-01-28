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
import * as React from 'react';

import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import CssBaseline from '@mui/material/CssBaseline';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import createCache from '@emotion/cache';
import {
  ThemeDirectionType,
  ThemeModeType,
  ThemeCssBaselineType,
  createEnchantedTheme,
} from '../theme';

export interface StyleProviderProps {
  children: React.ReactNode;
  /**
   * Optional - The theme direction to apply. Default is ThemeDirectionType.LTR.
   */
  direction?: ThemeDirectionType;
  /**
   * Optional - The theme mode to apply. Default is ThemeModeType.LIGHT_NEUTRAL_GREY.
   */
  mode?: ThemeModeType;
  /**
   * Optional - The CSS baseline to apply. Default is ThemeCssBaselineType.GLOBAL.
   * Note: Use for special cases only.
   */
  cssBaseline?: ThemeCssBaselineType;
  /**
   * Optional - The nonce attribute to add to the style tag for Content Security Policy (CSP) support.
   */
  nonce?: string;
  /**
   * Optional - Customizations to apply to the Enchanted theme.
   * Note: Use for special cases only.
   */
  themeOverrides?: object;
}

// Extend the Window interface to include styleNonce
// TODO - is this really the way to access a global with TypeScript??
declare global {
  interface Window {
    styleNonce?: string;
  }
}

const StyleProvider: React.FC<StyleProviderProps> = (props: StyleProviderProps) => {
  // look for <html dir="rtl">
  const htmlPageDirection = document.documentElement.getAttribute('dir') === 'rtl' ? ThemeDirectionType.RTL : ThemeDirectionType.LTR;
  const direction: ThemeDirectionType = props.direction || htmlPageDirection;
  const themeMode = props.mode || ThemeModeType.LIGHT_NEUTRAL_GREY;
  const cssBaselineType = props.cssBaseline || ThemeCssBaselineType.GLOBAL;

  // Create Emotion cache
  const cacheProps = {
    key: 'emui',
    stylisPlugins: [prefixer],
    nonce: '',
  };
  if (props.nonce) {
    cacheProps.nonce = props.nonce;
  } else if (typeof window !== 'undefined' && typeof window.styleNonce === 'string') {
    cacheProps.nonce = window.styleNonce;
  }
  if (direction === ThemeDirectionType.RTL) {
    cacheProps.stylisPlugins.push(rtlPlugin);
  }
  const cache = createCache(cacheProps);

  const enchantedTheme = createEnchantedTheme(direction, themeMode, props.themeOverrides);

  let cssBaseline;
  switch (cssBaselineType) {
    case ThemeCssBaselineType.SCOPED:
      cssBaseline = (
        <ScopedCssBaseline>
          {props.children}
        </ScopedCssBaseline>
      );
      break;
    case ThemeCssBaselineType.NONE:
      // no CSS baseline (consuming project is responsible for "reset" styles)
      cssBaseline = <>{props.children}</>;
      break;
    default:
      cssBaseline = (
        <>
          <CssBaseline />
          {props.children}
        </>
      );
      break;
  }

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={enchantedTheme}>
        <div dir={direction}>
          {cssBaseline}
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default StyleProvider;
