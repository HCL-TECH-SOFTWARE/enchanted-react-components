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
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/dom';
import { createLtrTheme, ensureToGetColor } from '../../../theme';
import Checkbox from '../../../Checkbox/Checkbox';
import { ColorNames, Colors } from '../../../colors';

afterEach(cleanup);

describe('Checkbox', () => {
  it('Checkbox default style', () => {
    render(<ThemeProvider theme={createLtrTheme()}><Checkbox data-testid="Checkbox" /></ThemeProvider>);

    const anchor = screen.getByTestId('Checkbox');
    const style = window.getComputedStyle(anchor);
    expect(style.color).toBe('rgba(0, 0, 0, 0.6)');
    expect(style.backgroundColor).toBe('rgba(0, 0, 0, 0.07)');
  });

  it('Checkbox disable style', () => {
    render(<ThemeProvider theme={createLtrTheme()}><Checkbox data-testid="Checkbox" disabled /></ThemeProvider>);

    const anchor = screen.getByTestId('Checkbox');
    const style = window.getComputedStyle(anchor);
    expect(style.color).toBe('rgba(0, 0, 0, 0.38)');
    expect(style.pointerEvents).toBe('none');
  });

  it('Checkbox focus style', async () => {
    const user = userEvent.tab;
    render(<ThemeProvider theme={createLtrTheme()}><Checkbox data-testid="Checkbox" tabIndex={0} /></ThemeProvider>);

    const anchor = screen.getByTestId('Checkbox');
    await user();

    await waitFor(() => {
      const style = window.getComputedStyle(anchor);
      expect(style.border).toBe(`1px solid ${(ensureToGetColor(Colors.get(ColorNames.HCLSOFTWAREBLUE07))).toLowerCase()}`);
      expect(style.borderRadius).toBe('2px');
    });
  });
});
