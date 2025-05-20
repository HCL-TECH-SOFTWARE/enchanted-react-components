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
  render, screen, cleanup, fireEvent,
} from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { ThemeDirectionType, ThemeModeType, createEnchantedTheme } from '../../../theme';

import UnitSelector from '../../../prerequisite_components/UnitSelector/UnitSelector';

const unitsWithoutFreeform = ['px', 'rem', 'em', '%'];
const unitsWithFreeform = ['px', 'rem', '%', 'Freeform'];
const onUnitChange = jest.fn();

afterEach(cleanup);

describe('UnitSelector', () => {
  it('Render without errrors', () => {
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <UnitSelector
          units={unitsWithoutFreeform}
          selectedUnit="px"
          onUnitChange={onUnitChange}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('px')).not.toBeNull();
  });

  it('Render with the selected unit', () => {
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <UnitSelector
          units={unitsWithoutFreeform}
          selectedUnit="%"
          onUnitChange={onUnitChange}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('%')).not.toBeNull();
  });

  it('Render "ff" when Freeform is the selected unit', () => {
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <UnitSelector
          units={unitsWithFreeform}
          selectedUnit="Freeform"
          onUnitChange={onUnitChange}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('ff')).not.toBeNull();
  });

  it('Render with the first unit if selectedUnit is not in the units array', () => {
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <UnitSelector
          units={unitsWithoutFreeform}
          selectedUnit="invalid_unit"
          onUnitChange={onUnitChange}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('px')).not.toBeNull();
  });

  it('Render and opens the menu when button is clicked', () => {
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <UnitSelector
          units={unitsWithoutFreeform}
          selectedUnit="px"
          onUnitChange={onUnitChange}
        />
      </ThemeProvider>,
    );

    const button = screen.getByText('px');
    fireEvent.click(button);

    expect(screen.getByText('rem')).not.toBeNull();
    expect(screen.getByText('%')).not.toBeNull();
  });

  it('Render and displays all provided units in the menu', () => {
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <UnitSelector
          units={unitsWithFreeform}
          selectedUnit="px"
          onUnitChange={onUnitChange}
        />
      </ThemeProvider>,
    );

    const button = screen.getByText('px');
    fireEvent.click(button);

    unitsWithFreeform.forEach((unit) => {
      expect(screen.getAllByText(unit)).not.toBeNull();
    });
  });

  it('Render and calls onUnitChange with the correct unit when menu item is clicked', () => {
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <UnitSelector
          units={unitsWithFreeform}
          selectedUnit="px"
          onUnitChange={onUnitChange}
        />
      </ThemeProvider>,
    );

    const button = screen.getByText('px');
    fireEvent.click(button);

    const remOption = screen.getByText('rem');
    fireEvent.click(remOption);

    expect(onUnitChange).toHaveBeenCalledWith('rem');
  });
});
