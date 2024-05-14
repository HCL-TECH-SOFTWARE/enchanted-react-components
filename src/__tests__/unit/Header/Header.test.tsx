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
  render, screen, fireEvent, waitFor, cleanup,
} from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { ThemeDirectionType, ThemeModeType, createEnchantedTheme } from '../../../theme';
import Header, { HeaderTestIds } from '../../../Header';
import { sampleDigitalAssetManagerItemPage, sampleDigitalAssetManagerOverview } from '../../../Header/sampleHeaderConfig';

afterEach(cleanup);

describe('Header', () => {
  it('Render base Header', () => {
    render(<ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}><Header /></ThemeProvider>);
    expect(screen.getByTestId(HeaderTestIds.HEADER_CONTAINER)).toBeTruthy();
  });

  it('Render Header with complete start section, middle section, and end section - Item Page', async () => {
    const mockBackBtnFn = jest.fn();
    const mockFavoritesToggleFn = jest.fn();

    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <Header {...sampleDigitalAssetManagerItemPage} onClickBackButton={mockBackBtnFn} onClickFavoritesToggle={mockFavoritesToggleFn} />
      </ThemeProvider>,
    );
    expect(screen.getByTestId(HeaderTestIds.HEADER_START_SECTION)).toBeTruthy();
    expect(screen.getByTestId(HeaderTestIds.HEADER_MIDDLE_SECTION)).toBeTruthy();
    expect(screen.getByTestId(HeaderTestIds.HEADER_END_SECTION)).toBeTruthy();

    expect(screen.getByTestId(HeaderTestIds.HEADER_START_TITLE)).toBeTruthy();

    const backButton = screen.getByTestId(HeaderTestIds.HEADER_BACK_BUTTON);
    fireEvent.click(backButton);
    await waitFor(() => {
      expect(mockBackBtnFn).toHaveBeenCalled();
    });

    const favoritesToggle = screen.getByTestId(HeaderTestIds.HEADER_FAVORITES_TOGGLE);
    fireEvent.click(favoritesToggle);
    await waitFor(() => {
      expect(mockFavoritesToggleFn).toHaveBeenCalled();
    });

    const startSection = screen.getByTestId(HeaderTestIds.HEADER_START_SECTION);
    expect(startSection.getElementsByClassName('MuiAvatar-root').length).toEqual(1);
    expect(startSection.getElementsByClassName('MuiSvgIcon-root').length).toEqual(3); // 3rd icon in addition to back button svg and avatar svg

    const middleSection = screen.getByTestId(HeaderTestIds.HEADER_MIDDLE_SECTION);
    expect(middleSection.childElementCount).toEqual(sampleDigitalAssetManagerItemPage.middleSection?.length);

    const endSection = screen.getByTestId(HeaderTestIds.HEADER_END_SECTION);
    expect(endSection.childElementCount).toEqual(sampleDigitalAssetManagerItemPage.endSection?.length);
  });

  it('Render Header without middle section and without back button, avatar, icon button on start section - Overview Page', async () => {
    render(<ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}><Header {...sampleDigitalAssetManagerOverview} /></ThemeProvider>);
    expect(screen.getByTestId(HeaderTestIds.HEADER_START_SECTION)).toBeTruthy();
    expect(screen.getByTestId(HeaderTestIds.HEADER_END_SECTION)).toBeTruthy();

    expect(screen.getByTestId(HeaderTestIds.HEADER_START_TITLE)).toBeTruthy();
    expect(screen.getByTestId(HeaderTestIds.HEADER_START_SUBTITLE)).toBeTruthy();

    try {
      expect(screen.getByTestId(HeaderTestIds.HEADER_MIDDLE_SECTION)).toBeNull();
    } catch (err) {
      expect((err as Error).message).toContain(`Unable to find an element by: [data-testid="${HeaderTestIds.HEADER_MIDDLE_SECTION}"]`);
    }

    try {
      expect(screen.getByTestId(HeaderTestIds.HEADER_BACK_BUTTON)).toBeNull();
    } catch (err) {
      expect((err as Error).message).toContain(`Unable to find an element by: [data-testid="${HeaderTestIds.HEADER_BACK_BUTTON}"]`);
    }

    const startSection = screen.getByTestId(HeaderTestIds.HEADER_START_SECTION);
    expect(startSection.getElementsByClassName('MuiAvatar-root').length).toEqual(0);
    expect(startSection.getElementsByClassName('MuiSvgIcon-root').length).toEqual(0);

    const endSection = screen.getByTestId(HeaderTestIds.HEADER_END_SECTION);
    expect(endSection.childElementCount).toEqual(sampleDigitalAssetManagerOverview.endSection?.length);
  });

  it('Render Header with filtered out invalid elements thrown in middle section and end section', async () => {
    const dirtyConfig = { ...sampleDigitalAssetManagerItemPage };

    /* eslint-why need to push invalid elements to array */
    /* eslint-disable no-unused-expressions */
    dirtyConfig.middleSection?.push('plain text');
    dirtyConfig.endSection?.push('plain text');
    /* eslint-enable no-unused-expressions */

    render(<ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}><Header {...dirtyConfig} /></ThemeProvider>);

    expect(screen.getByTestId(HeaderTestIds.HEADER_START_SECTION)).toBeTruthy();

    const middleSection = screen.getByTestId(HeaderTestIds.HEADER_MIDDLE_SECTION);
    expect(middleSection.childElementCount).toEqual((dirtyConfig.middleSection || []).length - 1);

    const endSection = screen.getByTestId(HeaderTestIds.HEADER_END_SECTION);
    expect(endSection.childElementCount).toEqual((dirtyConfig.endSection || []).length - 1);
  });

  it('Render Header with hidden middle section even if there are valid elements in middle section config', async () => {
    const modifiedConfig = { ...sampleDigitalAssetManagerItemPage };
    modifiedConfig.hideMiddleSection = true;

    render(<ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}><Header {...modifiedConfig} /></ThemeProvider>);

    expect(screen.getByTestId(HeaderTestIds.HEADER_START_SECTION)).toBeTruthy();
    expect(screen.getByTestId(HeaderTestIds.HEADER_END_SECTION)).toBeTruthy();

    try {
      expect(screen.getByTestId(HeaderTestIds.HEADER_MIDDLE_SECTION)).toBeNull();
    } catch (err) {
      expect((err as Error).message).toContain(`Unable to find an element by: [data-testid="${HeaderTestIds.HEADER_MIDDLE_SECTION}"]`);
    }
  });

  it('renders with provided sx property', () => {
    render(<ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}><Header sx={{ minHeight: '64px' }} data-testid="header" /></ThemeProvider>);
    const headerContainer = screen.getByTestId('header');
    const style = window.getComputedStyle(headerContainer);
    expect(style.minHeight).toBe('64px');
  });

  it('renders with Tooltip when title is long', () => {
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <Header startSection={{ title: '1234567890123456789012345678901234567890123456789012345678901234567890' }} data-testid="header" />
      </ThemeProvider>,
    );
    const headerContainer = screen.getByTestId('header');
    fireEvent.mouseOver(headerContainer); // To hover element and show tooltip
    expect(screen.findByRole('tooltip')).not.toBeNull();
  });
});
