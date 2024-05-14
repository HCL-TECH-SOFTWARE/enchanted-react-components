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

import { createLtrTheme } from '../../../theme';
import ListItemText from '../../../hidden_components/List/ListItemText';
import MenuItem from '../../../Menu/MenuItem';

afterEach(cleanup);

describe('ListItemText', () => {
  it('ListItemText should render without crash', async () => {
    const test = 'sample value';
    render(<ThemeProvider theme={createLtrTheme()}><ListItemText>{test}</ListItemText></ThemeProvider>);
    expect(screen.getByText(test)).not.toBeNull();
  });

  it('ListItemText should render indention', async () => {
    const test = 'sample value';
    render(
      <ThemeProvider theme={createLtrTheme()}>
        <MenuItem size="small">
          <ListItemText primary={test} inset />
        </MenuItem>
      </ThemeProvider>,
    );
    const listText = screen.getByRole('menuitem');
    expect(listText.firstElementChild?.classList[1]).toBe('MuiListItemText-inset');
  });
});
