/* ======================================================================== *
 * Copyright 2026 HCL America Inc.                                          *
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
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@emotion/react';
import { createEnchantedTheme, ThemeDirectionType, ThemeModeType } from '../../../../theme';
import TileActionMenu, { ITileActionMenuProps } from '../../../../composite_components/Tile/TileActionMenu';

const defaultProps: ITileActionMenuProps = {
  itemId: 'test-id',
  actionList: [],
  isTrash: false,
};

describe('TileActionMenu', () => {
  it('should not render info icon when isTrash is false', () => {
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <TileActionMenu {...defaultProps} isTrash={false} />
      </ThemeProvider>,
    );
    expect(screen.queryByTestId('tile-action-info')).not.toBeInTheDocument();
  });

  it('should render info icon when isTrash is true', () => {
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <TileActionMenu {...defaultProps} isTrash />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('tile-action-info')).toBeInTheDocument();
  });
});
