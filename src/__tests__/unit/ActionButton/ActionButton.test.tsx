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

import React from 'react';
import {
  render, screen, fireEvent, cleanup,
} from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { ThemeDirectionType, ThemeModeType, createEnchantedTheme } from '../../../theme';
import ActionButton from '../../../ActionButton';

const theme = createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY);
afterEach(cleanup);

describe('ActionButton', () => {
  it('renders with label', () => {
    const label = 'Action';
    render(
      <ThemeProvider theme={theme}>
        <ActionButton label={label} />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('action-button')).not.toBeNull();
    expect(screen.getByText(label)).not.toBeNull();
  });

  it('renders with end icon', () => {
    render(
      <ThemeProvider theme={theme}>
        <ActionButton label="Action" endIcon />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('action-button').querySelector('[data-mui-test="caret--downIcon"]')).not.toBeNull();
  });

  it('handles click event', () => {
    const handleClick = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <ActionButton label="Action" handleClick={handleClick} />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByTestId('action-button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('opens link in new tab when href is provided', () => {
    const actionHref = 'https://www.hcltech.com/';
    window.open = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <ActionButton label="Action" href={actionHref} />
      </ThemeProvider>,
    );

    const actionButton = screen.getByTestId('action-button');
    expect(actionButton).not.toBeNull();
    fireEvent.click(actionButton);
    expect(window.open).toHaveBeenCalledWith(actionHref, '_blank');
  });

  it('renders with disabled state', () => {
    render(
      <ThemeProvider theme={theme}>
        <ActionButton label="Action" disabled />
      </ThemeProvider>,
    );

    const actionButton = screen.getByTestId('action-button');
    expect(actionButton.classList.contains('disabled')).toBe(true);
    expect(actionButton.getAttribute('aria-disabled')).toBe('true');
  });
});
