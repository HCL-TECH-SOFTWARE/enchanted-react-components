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
  act,
  cleanup, render, screen,
} from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/dom';

import Link from '../../../Link';
import {
  ThemeDirectionType, ThemeModeType, createEnchantedTheme, ensureToGetColor,
} from '../../../theme';
import { ColorNames, Colors } from '../../../colors';

afterEach(cleanup);

describe('Link', () => {
  it('link default style', () => {
    render(<ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}><Link>Link</Link></ThemeProvider>);

    const anchor = screen.getByText('Link');
    const style = window.getComputedStyle(anchor);
    expect(style.color).toBe('rgb(5, 80, 220)');
    expect(style.textDecoration).toBe('underline');
  });

  it('link disable style', () => {
    render(<ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}><Link disabled>Link</Link></ThemeProvider>);

    const anchor = screen.getByText('Link');
    const style = window.getComputedStyle(anchor);
    expect(style.color).toBe('rgb(5, 80, 220)');
    expect(style.pointerEvents).toBe('none');
  });

  it('link focus style', async () => {
    const user = userEvent.setup();
    render(<ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}><Link tabIndex={0}>Link</Link></ThemeProvider>);

    const anchor = screen.getByText('Link');
    await act(async () => {
      await user.tab();
    });

    await waitFor(() => {
      const style = window.getComputedStyle(anchor);
      expect(style.border).toBe(`1px solid ${(ensureToGetColor(Colors.get(ColorNames.HCLSOFTWAREBLUE07))).toLowerCase()}`);
      expect(style.borderRadius).toBe('2px');
    });
  });
});
