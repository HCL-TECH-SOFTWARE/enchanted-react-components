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
import Popper, { PopperTestIds } from '../../../Popper';
import Typography from '../../../Typography';
import { createEnchantedTheme, ThemeDirectionType, ThemeModeType } from '../../../theme';

afterEach(cleanup);

describe('Popper', () => {
  it('Render Popper open without crashing', () => {
    render(<Popper open={false} />);
    expect(screen.findByLabelText('Popper')).toBeTruthy();
  });

  it('Render base variant with sub header', () => {
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <Popper
          open
          headerChildren={<Typography variant="body1">Label</Typography>}
          contentChildren={<Typography variant="body1">Sample Content</Typography>}
          hideSubHeader={false}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('Label')).not.toBeNull();
    expect(screen.getByText('Sample Content')).not.toBeNull();
    expect(screen.getByTestId(PopperTestIds.POPPER_TITLE)).not.toBeNull();
  });

  it('Render Popper then close', async () => {
    const mockFn = jest.fn();
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <Popper
          open
          onClose={mockFn}
          headerChildren={<Typography variant="body1">Label</Typography>}
        />
      </ThemeProvider>,
    );

    const element = screen.getByTestId(PopperTestIds.POPPER_CLOSE_ICON);
    fireEvent.click(element);
    await waitFor(() => { expect(mockFn).toHaveBeenCalled(); });
  });
});
