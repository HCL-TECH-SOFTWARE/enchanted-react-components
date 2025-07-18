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

import Breadcrumbs from '../../../Breadcrumbs';
import {
  ThemeDirectionType, ThemeModeType, createEnchantedTheme, ensureToGetColor,
} from '../../../theme';
import Link from '../../../Link';
import { ColorNames, Colors } from '../../../colors';
import BadgeFilterButton from '../../../Breadcrumbs/BadgeFilterButton';

afterEach(cleanup);

describe('Breadcrumbs', () => {
  it('Breadcrumbs default style', () => {
    render(<ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}><Breadcrumbs data-testid="test"><Link>Search</Link></Breadcrumbs></ThemeProvider>);

    const link = screen.getByTestId('test');
    const style = window.getComputedStyle(link);
    expect(style.color).toBe('rgba(0, 0, 0, 0.6)');
    expect(style.paddingBottom).toBe('2px');
    expect(style.paddingTop).toBe('2px');
  });

  it('Breadcrumbs disable style', () => {
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <Breadcrumbs data-testid="test" disabled><Link>Search</Link></Breadcrumbs>
      </ThemeProvider>,
    );

    const link = screen.getByTestId('test');
    const style = window.getComputedStyle(link);
    expect(style.pointerEvents).toBe('none');
    expect(style.textDecorationColor).toBe(ensureToGetColor(Colors.get(ColorNames.BLACK38P)));
    expect(style.textDecoration).toBe('none');
  });

  it('Breadcrumbs focus style', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <Breadcrumbs data-testid="test"><Link tabIndex={0}>Search</Link></Breadcrumbs>
      </ThemeProvider>,
    );

    const anchor = screen.getByText('Search');
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

describe('BadgeFilterButton', () => {
  it('toggles badge dot visibility when filter button is clicked', async () => {
    const { container } = render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <BadgeFilterButton />
      </ThemeProvider>,
    );
    const filterButton = screen.getByTestId('testFilterButton');

    const badgeDot = container.querySelector('.MuiBadge-dot');

    // Initially invisible
    expect(badgeDot).not.toBeNull();
    expect(badgeDot && badgeDot.classList.contains('MuiBadge-invisible')).toBe(true);

    // Click to show badge
    await userEvent.click(filterButton);
    expect(badgeDot && badgeDot.classList.contains('MuiBadge-invisible')).toBe(false);

    // Click again to hide badge
    await userEvent.click(filterButton);
    expect(badgeDot && badgeDot.classList.contains('MuiBadge-invisible')).toBe(true);
  });
});
