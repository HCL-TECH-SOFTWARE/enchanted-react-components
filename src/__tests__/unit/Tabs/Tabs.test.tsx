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
  render, cleanup, fireEvent,
} from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { createLtrTheme } from '../../../theme';
import Tabs from '../../../Tabs/Tabs';
import Tab from '../../../Tabs/Tab';

afterEach(cleanup);

describe('Tabs component', () => {
  it('Tab should render without crash', async () => {
    const { getAllByRole } = render(
      <ThemeProvider theme={createLtrTheme()}>
        <Tabs data-testid="tabs">
          <Tab />
          <Tab />
        </Tabs>
      </ThemeProvider>,
    );
    const tab = getAllByRole('tab');
    expect(tab[0]).toBeTruthy();
    expect(tab[0]).toHaveProperty('tabIndex', 0);
    expect(tab[1]).toHaveProperty('tabIndex', -1);
  });

  it('renders the correct number of tabs', () => {
    const { getAllByRole } = render(
      <ThemeProvider theme={createLtrTheme()}>
        <Tabs data-testid="tabs">
          <Tab />
          <Tab />
        </Tabs>
      </ThemeProvider>,
    );
    expect(getAllByRole('tab')).toHaveLength(2);
  });

  it('calls onChange with the correct arguments when a tab is clicked', () => {
    const handleChange = jest.fn();
    const { getAllByRole } = render(
      <ThemeProvider theme={createLtrTheme()}>
        <Tabs data-testid="tabs" onChange={handleChange}>
          <Tab onChange={handleChange} />
          <Tab onChange={handleChange} />
        </Tabs>
      </ThemeProvider>,
    );
    fireEvent.click(getAllByRole('tab')[1]);
    expect(handleChange).toHaveBeenCalledWith(expect.anything(), 1);
  });

  it('has the correct padding on vertical orientation', () => {
    const { getAllByRole } = render(
      <ThemeProvider theme={createLtrTheme()}>
        <Tabs data-testid="tabs">
          <Tab />
          <Tab />
        </Tabs>
      </ThemeProvider>,
    );
    const tab = getAllByRole('tab');
    const tabStyle = window.getComputedStyle(tab[0]);
    expect(tabStyle.paddingTop).toBe('10px');
    expect(tabStyle.paddingBottom).toBe('10px');
    expect(tabStyle.paddingLeft).toBe('10px');
    expect(tabStyle.paddingRight).toBe('10px');
    expect(tabStyle.minHeight).toBe('30px');
  });

  it('has the correct padding on horizontal orientation', () => {
    const { getAllByRole } = render(
      <ThemeProvider theme={createLtrTheme()}>
        <Tabs data-testid="tabs" orientation="horizontal">
          <Tab orientation="horizontal" />
          <Tab />
        </Tabs>
      </ThemeProvider>,
    );
    const tab = getAllByRole('tab');
    const tabStyle = window.getComputedStyle(tab[0]);
    expect(tabStyle.paddingTop).toBe('6px');
    expect(tabStyle.paddingBottom).toBe('6px');
    expect(tabStyle.paddingLeft).toBe('8px');
    expect(tabStyle.paddingRight).toBe('8px');
    expect(tabStyle.minHeight).toBe('30px');
  });
});
