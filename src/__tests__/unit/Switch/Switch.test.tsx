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
  cleanup, render, screen,
} from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import Switch from '../../../Switch/Switch';
import { createEnchantedTheme, ThemeDirectionType, ThemeModeType } from '../../../theme';

afterEach(cleanup);

describe('Switch', () => {
  it('Switch default style', () => {
    render(<ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}><Switch data-testid="Switch" /></ThemeProvider>);
    const anchor = screen.getByTestId('Switch');
    const style = window.getComputedStyle(anchor);
    expect(style.color).toBe('rgb(255, 255, 255)');
  });
  it('Switch checked style', () => {
    render(<ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}><Switch data-testid="Switch" checked /></ThemeProvider>);
    const anchor = screen.getByTestId('Switch');
    const style = window.getComputedStyle(anchor);
    expect(style.color).toBe('rgb(5, 80, 220)');
  });
  it('Switch disable style', () => {
    render(<ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}><Switch data-testid="Switch" disabled /></ThemeProvider>);
    const anchor = screen.getByTestId('Switch');
    const style = window.getComputedStyle(anchor);
    expect(style.pointerEvents).toBe('none');
  });
});
