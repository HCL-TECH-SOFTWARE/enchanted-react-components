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
import Divider, { DividerTypes } from '../../../Divider/Divider';
import { createLtrTheme, ensureToGetColor } from '../../../theme';
import { ColorNames, Colors } from '../../../colors';

afterEach(cleanup);

describe('Divider unit test', () => {
  it('Render primary type divider', () => {
    render(<ThemeProvider theme={createLtrTheme()}><Divider type={DividerTypes.PRIMARY} /></ThemeProvider>);
    expect(screen.findByTestId('Divider')).toBeTruthy();
    const anchor = screen.getByTestId('Divider');
    const style = window.getComputedStyle(anchor);
    expect(style.borderColor).toBe(ensureToGetColor(Colors.get(ColorNames.BLACK32P)));
  });
  it('Render secondary type divider', () => {
    render(<ThemeProvider theme={createLtrTheme()}><Divider type={DividerTypes.SECONDARY} /></ThemeProvider>);
    expect(screen.findByTestId('Divider')).toBeTruthy();
    const anchor = screen.getByTestId('Divider');
    const style = window.getComputedStyle(anchor);
    expect(style.borderColor).toBe(ensureToGetColor(Colors.get(ColorNames.BLACK20P)));
  });
  it('Render with margin type divider', () => {
    render(<ThemeProvider theme={createLtrTheme()}><Divider type={DividerTypes.WITHMARGIN} /></ThemeProvider>);
    expect(screen.findByTestId('Divider')).toBeTruthy();
    const anchor = screen.getByTestId('Divider');
    const style = window.getComputedStyle(anchor);
    expect(style.borderColor).toBe(ensureToGetColor(Colors.get(ColorNames.BLACK32P)));
    expect(style.marginTop).toBe('4px');
    expect(style.marginBottom).toBe('4px');
  });
});
