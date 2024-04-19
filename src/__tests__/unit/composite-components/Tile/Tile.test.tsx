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
  render, screen, cleanup, fireEvent, waitFor,
} from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import userEvent from '@testing-library/user-event';
import { createLtrTheme } from '../../../../theme';
import Tile from '../../../../composite_components/Tile/Tile';
import { getItemActions } from '../../../../composite_components/Tile/TileData';
import { TileActionTestIds } from '../../../../composite_components/Tile/TileActionMenu';

afterEach(cleanup);

describe('Tile component', () => {
  const itemClickedAction = jest.fn();
  const title = 'Test Title';
  const subtitle = 'Test Subtitle';
  const imageUrl = 'https://example.com/image.jpg';
  const overflowTooltip = 'More Actions';
  it('Should render the ImageListItemBar with the correct title', () => {
    render(
      <ThemeProvider theme={createLtrTheme()}>
        <Tile
          title={title}
          subTitle={subtitle}
          itemId="3"
          hideAvatarIfImageIsLoaded={false}
          imageUrl={imageUrl}
          itemClickedAction={itemClickedAction}
          tileActions={getItemActions(false)}
          overflowTooltip="More Actions"
          hasCheckBox
        />
      </ThemeProvider>,
    );
    expect(screen.getByText(title).textContent).toBe(title);
  });

  it('Should render the ImageListItemBar with the correct SubTitle', () => {
    render(
      <ThemeProvider theme={createLtrTheme()}>
        <Tile
          title={title}
          subTitle={subtitle}
          itemId="3"
          hideAvatarIfImageIsLoaded={false}
          imageUrl={imageUrl}
          itemClickedAction={itemClickedAction}
          tileActions={getItemActions(false)}
          overflowTooltip="More Actions"
          hasCheckBox
        />
      </ThemeProvider>,
    );
    expect(screen.getByText(subtitle).textContent).toBe(subtitle);
  });

  it('Should render the correct Image', () => {
    render(
      <ThemeProvider theme={createLtrTheme()}>
        <Tile
          title={title}
          subTitle={subtitle}
          itemId="3"
          hideAvatarIfImageIsLoaded={false}
          imageUrl={imageUrl}
          itemClickedAction={itemClickedAction}
          tileActions={getItemActions(false)}
          overflowTooltip="More Actions"
          hasCheckBox
        />
      </ThemeProvider>,
    );
    expect(screen.getAllByRole('img')[0].getAttribute('src')).toBe(imageUrl);
  });

  it('Should call itemClickedAction when clicked', () => {
    render(
      <ThemeProvider theme={createLtrTheme()}>
        <Tile
          title={title}
          subTitle={subtitle}
          itemId="3"
          hideAvatarIfImageIsLoaded={false}
          imageUrl={imageUrl}
          itemClickedAction={itemClickedAction}
          tileActions={getItemActions(false)}
          overflowTooltip={overflowTooltip}
          hasCheckBox
        />
      </ThemeProvider>,
    );
    screen.getByRole('listitem').click();
    expect(itemClickedAction).toHaveBeenCalled();
  });

  it('Should render the checkbox', () => {
    render(
      <ThemeProvider theme={createLtrTheme()}>
        <Tile
          title={title}
          subTitle={subtitle}
          itemId="3"
          hideAvatarIfImageIsLoaded={false}
          imageUrl={imageUrl}
          itemClickedAction={itemClickedAction}
          tileActions={getItemActions(false)}
          overflowTooltip={overflowTooltip}
          hasCheckBox
        />
      </ThemeProvider>,
    );
    // Check for the checkbox by role
    expect(screen.getByRole('checkbox')).not.toBeNull();
  });

  it('Should render the overflow icon when there are more than 2 actions', () => {
    render(
      <ThemeProvider theme={createLtrTheme()}>
        <Tile
          title={title}
          subTitle={subtitle}
          itemId="3"
          hideAvatarIfImageIsLoaded={false}
          imageUrl={imageUrl}
          itemClickedAction={itemClickedAction}
          tileActions={getItemActions(false)}
          overflowTooltip={overflowTooltip}
          hasCheckBox
        />
      </ThemeProvider>,
    );
    expect(screen.getByTestId(TileActionTestIds.TILE_ACTION_OVERFLOW)).not.toBeNull();
  });

  it('Should render the overflow icon tooltip when there are more than 2 actions', async () => {
    render(
      <ThemeProvider theme={createLtrTheme()}>
        <Tile
          title={title}
          itemId="3"
          subTitle={subtitle}
          hideAvatarIfImageIsLoaded={false}
          imageUrl={imageUrl}
          itemClickedAction={itemClickedAction}
          tileActions={getItemActions(false)}
          overflowTooltip={overflowTooltip}
          hasCheckBox
        />
      </ThemeProvider>,
    );

    // Hover over the overflow icon to make the tooltip appear
    userEvent.hover(screen.getByTestId(TileActionTestIds.TILE_ACTION_OVERFLOW));

    // Now check for the tooltip text
    expect((await screen.findByText(overflowTooltip)).textContent).toBe('More Actions');
  });

  it('shows tooltip on title hover', async () => {
    render(
      <ThemeProvider theme={createLtrTheme()}>
        <Tile
          title={title}
          itemId="3"
          subTitle={subtitle}
          hideAvatarIfImageIsLoaded={false}
          imageUrl={imageUrl}
          itemClickedAction={itemClickedAction}
          tileActions={getItemActions(false)}
          overflowTooltip={overflowTooltip}
          hasCheckBox
        />
      </ThemeProvider>,
    );

    // Hover over the title
    userEvent.hover(screen.getByText(title));

    // Check that the tooltip is displayed
    expect(screen.getByText(title).textContent).toBe(title);
  });

  it('renders menu and menu items when overflow icon is clicked', async () => {
    render(
      <ThemeProvider theme={createLtrTheme()}>
        <Tile
          title={title}
          itemId="3"
          subTitle={subtitle}
          hideAvatarIfImageIsLoaded={false}
          imageUrl={imageUrl}
          itemClickedAction={itemClickedAction}
          tileActions={getItemActions(false)}
          overflowTooltip={overflowTooltip}
          hasCheckBox
        />
      </ThemeProvider>,
    );

    // Find the overflow icon button and click it
    const overflowIconButton = screen.getByTestId(TileActionTestIds.TILE_ACTION_OVERFLOW);
    fireEvent.click(overflowIconButton);

    // Wait for the menu to be displayed
    const menu = await screen.findByTestId(TileActionTestIds.TILE_ACTION_MENU);
    await waitFor(() => { expect(menu).not.toBeNull(); });
  });

  it('renders menu and menu items when overflow icon is clicked', async () => {
    render(
      <ThemeProvider theme={createLtrTheme()}>
        <Tile
          title={title}
          itemId="3"
          subTitle={subtitle}
          hideAvatarIfImageIsLoaded={false}
          imageUrl={imageUrl}
          itemClickedAction={itemClickedAction}
          tileActions={getItemActions(false)}
          overflowTooltip={overflowTooltip}
          hasCheckBox
        />
      </ThemeProvider>,
    );

    // Find the overflow icon button and click it
    const overflowIconButton = screen.getByTestId(TileActionTestIds.TILE_ACTION_OVERFLOW);
    fireEvent.click(overflowIconButton);

    // Wait for the menu to be displayed
    const menu = await screen.findByTestId(TileActionTestIds.TILE_ACTION_MENU);
    await waitFor(() => { expect(menu).not.toBeNull(); });

    // Check that the menu items are displayed
    const menuItems = await screen.findAllByRole('menuitem');
    expect(menuItems.length).toBe(getItemActions(false).length - 1);
  });

  it('renders all the menu items which is passed as props', async () => {
    render(
      <ThemeProvider theme={createLtrTheme()}>
        <Tile
          title={title}
          itemId="3"
          subTitle={subtitle}
          hideAvatarIfImageIsLoaded={false}
          imageUrl={imageUrl}
          itemClickedAction={itemClickedAction}
          tileActions={getItemActions(false)}
          overflowTooltip={overflowTooltip}
          hasCheckBox
        />
      </ThemeProvider>,
    );

    // Find the overflow icon button and click it
    const overflowIconButton = screen.getByTestId(TileActionTestIds.TILE_ACTION_OVERFLOW);
    fireEvent.click(overflowIconButton);

    // Wait for the menu to be displayed
    const menu = await screen.findByTestId(TileActionTestIds.TILE_ACTION_MENU);
    await waitFor(() => { expect(menu).not.toBeNull(); });

    // Check that the menu items are displayed
    const menuItems = await screen.findAllByRole('menuitem');
    expect(menuItems.length).toBe(getItemActions(false).length - 1);

    // Check the text of each menu item
    const AllItemActionTexts = getItemActions(false).map((action) => { return action.title; });
    const expectedMenuItemTexts = AllItemActionTexts.slice(1);
    expectedMenuItemTexts.forEach((text) => {
      expect(screen.getByText(text)).not.toBeNull();
    });
  });
});
