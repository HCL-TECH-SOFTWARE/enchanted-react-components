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
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import DirectionStyleProvider from '../../src/DirectionStyleProvider';
import { ThemeDirectionType, ThemeModeType, createEnchantedTheme } from '../../src/theme';


export const withThemeProvider = (Story, context) => {
  const themeDirection = context.globals.themeDirection || ThemeDirectionType.RTL;
  const themeMode = context.globals.theme || ThemeModeType.LIGHT_NEUTRAL_GREY;
  let enchantedTheme = createEnchantedTheme(themeDirection, themeMode);
  document.documentElement.removeAttribute("dir");
  if (themeDirection === ThemeDirectionType.RTL) {
    document.documentElement.setAttribute("dir", "rtl");
  }
  return (
    <DirectionStyleProvider direction={themeDirection}>
      <ThemeProvider theme={enchantedTheme}>
        <div dir={themeDirection}>
          <CssBaseline />
          <Story {...context} />
        </div>
      </ThemeProvider>
    </DirectionStyleProvider>
  )
}
