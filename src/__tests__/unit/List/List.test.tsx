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
  act, screen,
  cleanup, render,
  waitFor,
} from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import userEvent from '@testing-library/user-event';
import {
  ThemeDirectionType, ThemeModeType, createEnchantedTheme, ensureToGetColor,
} from '../../../theme';
import ListItem from '../../../List/ListItem';
import List from '../../../List/List';
import ListItemText from '../../../List/ListItemText';
import ListItemButton, { ListSizes } from '../../../List/ListItemButton';
import { ColorNames, Colors } from '../../../colors';

afterEach(cleanup);

describe('List Component', () => {
  test('renders with default props', () => {
    const { getByTestId } = render(<ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}><List data-testid="list" /></ThemeProvider>);
    const list = getByTestId('list');
    expect(list).not.toBeNull();
  });
});

describe('ListItem Component', () => {
  it('should render without crashing', () => {
    const { getByText } = render(<ListItem>list item</ListItem>);
    expect(getByText(/list item/i)).not.toBeNull();
  });

  it('renders List and ListItem components with props', async () => {
    const { getByTestId, queryByText } = render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <List>
          <ListItem>
            <ListItemButton data-testid="list-item-button">
              <ListItemText
                primary="primary text"
                secondary="secondary text"
                data-testid="list-item-text"
              />
            </ListItemButton>
          </ListItem>
        </List>
      </ThemeProvider>,
    );
    expect(getByTestId('list-item-text')).toBeTruthy();
    const primaryText = queryByText('primary text');
    expect(primaryText).not.toBeNull();
    const listItemButton = getByTestId('list-item-button');

    await waitFor(() => {
      const style = window.getComputedStyle(listItemButton);
      expect(style.border).toBe('0px');
      expect(style.padding).toBe('6px 8px');
    });
  });

  it('should check focus style', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <ListItemButton data-testid="list-item-button" tabIndex={0}>
          <ListItemText
            primary="primary text"
            secondary="secondary text"
            data-testid="list-item-text"
          />
        </ListItemButton>
      </ThemeProvider>,
    );
    const listItemButton = screen.getByTestId('list-item-button');
    await act(async () => {
      await user.tab();
    });

    await waitFor(() => {
      const style = window.getComputedStyle(listItemButton);
      expect(style.boxShadow).toBe(`0 0 0 1px ${(ensureToGetColor(Colors.get(ColorNames.HCLSOFTWAREBLUE07)))} inset`);
    });
  });

  it('should check size variant', async () => {
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <ListItemButton data-testid="list-item-button" size={ListSizes.MEDIUM}>
          <ListItemText
            primary="primary text"
            secondary="secondary text"
            data-testid="list-item-text"
          />
        </ListItemButton>
      </ThemeProvider>,
    );
    const listItemButton = screen.getByTestId('list-item-button');

    await waitFor(() => {
      const style = window.getComputedStyle(listItemButton);
      expect(style.padding).toBe('6px 12px');
    });
  });
});
