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
import { createLtrTheme, ensureToGetColor } from '../../../theme';
import Menu from '../../../Menu/Menu';
import MenuItem from '../../../Menu/MenuItem';
import { ColorNames, Colors } from '../../../colors';

afterEach(cleanup);

describe('<Menu /> integration', () => {
  it('Menu should render without crash', async () => {
    const { getAllByRole } = render(
      <Menu anchorEl={document.body} open variant="menu" size="medium">
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </Menu>,
    );
    const menuitems = getAllByRole('menuitem');
    expect(menuitems[0]).toBeTruthy();
    expect(menuitems[0]).toHaveProperty('tabIndex', -1);
    expect(menuitems[1]).toHaveProperty('tabIndex', -1);
    expect(menuitems[2]).toHaveProperty('tabIndex', -1);
  });
  it('Menu item style - test default style', async () => {
    const { getAllByRole } = render(
      <ThemeProvider theme={createLtrTheme()}>
        <Menu data-testid="test" anchorEl={document.body} open variant="menu" size="medium">
          <MenuItem>Profile</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem>Logout</MenuItem>
        </Menu>
      </ThemeProvider>,
    );
    expect(screen.getByRole('menu')).not.toBeNull();
    const menuitems = getAllByRole('menuitem');
    const menuItemStyle = window.getComputedStyle(menuitems[0]);
    expect(menuItemStyle.display).toBe('flex');
    expect(menuItemStyle.backgroundColor).toBe('transparent');
    expect(menuItemStyle.paddingTop).toBe('5px');
    expect(menuItemStyle.paddingBottom).toBe('5px');
    expect(menuItemStyle.paddingLeft).toBe('0px');
    expect(menuItemStyle.paddingRight).toBe('0px');
    expect(menuItemStyle.minHeight).toBe('36px');
    expect(menuItemStyle.borderWidth).toBe('1px');
    expect(menuItemStyle.border).toBe(`1px solid ${(ensureToGetColor(Colors.get(ColorNames.HCLSOFTWAREBLUE07))).toLowerCase()}`);
  });
});
