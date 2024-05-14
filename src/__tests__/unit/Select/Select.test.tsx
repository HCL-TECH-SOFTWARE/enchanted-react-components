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
  configure, cleanup, render, screen,
} from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { ThemeDirectionType, ThemeModeType, createEnchantedTheme } from '../../../theme';
import Select from '../../../Select/Select';
import MenuItem from '../../../Menu/MenuItem';

afterEach(cleanup);

const placeholder = 'Placeholder test message';

describe('Select', () => {
  it('Render with placeholder messages', () => {
    render(
      <Select value="none">
        <MenuItem value="none" disabled><em>{placeholder}</em></MenuItem>
        <MenuItem value="10">Ten</MenuItem>
        <MenuItem value="20">Twenty - long text, long text, long text</MenuItem>
        <MenuItem value="30">Thirty</MenuItem>
      </Select>,
    );

    // getByPlaceholderText method is here not possible, the placeholder is display by a simple div
    // and not via an input field
    expect(screen.getByText(placeholder)).not.toBeNull();
  });
  it('Render with label messages', () => {
    const label = 'Label test message';
    render(
      <Select label={label} value="none">
        <MenuItem value="none" disabled><em>{placeholder}</em></MenuItem>
        <MenuItem value="10">Ten</MenuItem>
        <MenuItem value="20">Twenty - long text, long text, long text</MenuItem>
        <MenuItem value="30">Thirty</MenuItem>
      </Select>,
    );

    expect(screen.getByText(label)).not.toBeNull();
  });

  it('Render with required start', () => {
    const requiredStar = '*';
    render(
      <Select required value="none">
        <MenuItem value="none" disabled><em>{placeholder}</em></MenuItem>
        <MenuItem value="10">Ten</MenuItem>
        <MenuItem value="20">Twenty - long text, long text, long text</MenuItem>
        <MenuItem value="30">Thirty</MenuItem>
      </Select>,
    );

    expect(screen.getByText(requiredStar)).not.toBeNull();
  });

  it('Render with helper text messages', () => {
    const helperText = 'Helper test message';
    render(
      <Select helperText={helperText} value="none">
        <MenuItem value="none" disabled><em>{placeholder}</em></MenuItem>
        <MenuItem value="10">Ten</MenuItem>
        <MenuItem value="20">Twenty - long text, long text, long text</MenuItem>
        <MenuItem value="30">Thirty</MenuItem>
      </Select>,
    );

    expect(screen.getByText(helperText)).not.toBeNull();
  });

  it('Render with action link', () => {
    const actionLabel = 'Action';
    const actionHref = 'https://www.hcltech.com/';

    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <Select actionProps={[{ href: actionHref, label: actionLabel }]} value="none">
          <MenuItem value="none" disabled><em>{placeholder}</em></MenuItem>
          <MenuItem value="10">Ten</MenuItem>
          <MenuItem value="20">Twenty - long text, long text, long text</MenuItem>
          <MenuItem value="30">Thirty</MenuItem>
        </Select>
      </ThemeProvider>,
    );

    expect(screen.getByText(actionLabel)).not.toBeNull();
    expect(screen.getByText(actionLabel).getAttribute('href')).toBe(actionHref);
  });

  it('Render with a unit label', () => {
    const unitLabel = 'kg';
    render(
      <Select unitLabel={unitLabel} value="none">
        <MenuItem value="none" disabled><em>{placeholder}</em></MenuItem>
        <MenuItem value="10">Ten</MenuItem>
        <MenuItem value="20">Twenty - long text, long text, long text</MenuItem>
        <MenuItem value="30">Thirty</MenuItem>
      </Select>,
    );

    expect(screen.getByText(unitLabel)).not.toBeNull();
  });

  it('Render with error state', () => {
    configure({ testIdAttribute: 'data-mui-test' });
    const { container } = render(
      <Select error value="none">
        <MenuItem value="none" disabled><em>{placeholder}</em></MenuItem>
        <MenuItem value="10">Ten</MenuItem>
        <MenuItem value="20">Twenty - long text, long text, long text</MenuItem>
        <MenuItem value="30">Thirty</MenuItem>
      </Select>,
    );

    expect(screen.getByTestId('warningIcon')).not.toBeNull();
    expect(container.querySelector('.Mui-error')).not.toBeNull();
  });

  it('Render with disabled state', () => {
    const { container } = render(
      <Select disabled value="none">
        <MenuItem value="none" disabled><em>{placeholder}</em></MenuItem>
        <MenuItem value="10">Ten</MenuItem>
        <MenuItem value="20">Twenty - long text, long text, long text</MenuItem>
        <MenuItem value="30">Thirty</MenuItem>
      </Select>,
    );

    expect(container.querySelector('.Mui-disabled')).not.toBeNull();
  });

  it('Render with non edit state', () => {
    const exampleValue = '10';
    render(
      <Select nonEdit value={exampleValue}>
        <MenuItem value="none" disabled><em>{placeholder}</em></MenuItem>
        <MenuItem value={exampleValue}>Ten</MenuItem>
        <MenuItem value="20">Twenty - long text, long text, long text</MenuItem>
        <MenuItem value="30">Thirty</MenuItem>
      </Select>,
    );
    expect(screen.getByText(exampleValue)).not.toBeNull();
  });
});
