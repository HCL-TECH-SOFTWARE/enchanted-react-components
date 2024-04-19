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
import Avatar, { AvatarTypes } from '../../../Avatar/Avatar';
import { createLtrTheme, ensureToGetColor } from '../../../theme';
import { ColorNames, Colors } from '../../../colors';

afterEach(cleanup);

describe('Avatar', () => {
  it('Render circular variant as default', () => {
    render(<Avatar variant="circular" />);
    expect(screen.findByTestId('Avatar')).toBeTruthy();
  });

  it('Render rounded variant', () => {
    render(<Avatar variant="rounded" />);
    expect(screen.findByLabelText('Avatar')).toBeTruthy();
  });

  it('Render image type', () => {
    render(<Avatar type={AvatarTypes.IMAGE} />);
    expect(screen.findByLabelText('Avatar')).toBeTruthy();
  });

  it('Render letter type', () => {
    render(<Avatar type={AvatarTypes.LETTER} />);
    expect(screen.findByLabelText('Avatar')).toBeTruthy();
  });

  it('Render letter type', () => {
    render(<Avatar type={AvatarTypes.ICON} />);
    expect(screen.findByLabelText('Avatar')).toBeTruthy();
  });

  it('Avatar default style', () => {
    render(<ThemeProvider theme={createLtrTheme()}><Avatar data-testid="test" variant="rounded" /></ThemeProvider>);
    const anchor = screen.getByTestId('test');
    const style = window.getComputedStyle(anchor);
    expect(style.color).toBe('rgb(246, 246, 246)');
    expect(style.backgroundColor).toBe('rgb(246, 246, 246)');
    expect(style.display).toBe('flex');
    expect(style.width).toBe('24px');
    expect(style.height).toBe('24px');
    expect(style.padding).toBe('3px');
    expect(style.border).toBe(`1px solid ${ensureToGetColor(Colors.get(ColorNames.BLACK20P))}`);
  });
});
