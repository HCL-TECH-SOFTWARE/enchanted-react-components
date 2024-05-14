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
import {
  render, screen, cleanup,
} from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import Paper from '../../../Paper/Paper';
import { ThemeDirectionType, ThemeModeType, createEnchantedTheme } from '../../../theme';

afterEach(cleanup);

describe('Paper', () => {
  it('Render Default variant as outlined variant', () => {
    render(<ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}><Paper variant="outlined" /></ThemeProvider>);
    expect(screen.findByLabelText('Paper')).toBeTruthy();
  });

  it('Render elevation variant', () => {
    render(<ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}><Paper variant="elevation" /></ThemeProvider>);
    expect(screen.findByLabelText('Paper')).toBeTruthy();
  });

  it('Render nopadding variant', () => {
    render(<ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}><Paper variant="nopadding" /></ThemeProvider>);
    expect(screen.findByLabelText('Paper')).toBeTruthy();
  });
});
