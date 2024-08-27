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
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import {
  Literals, ProgressBarLocalization,
} from '../../../../composite_components/ProgressBar/ProgressBar';
import ProgressHeader from '../../../../composite_components/ProgressBar/ProgressHeader';
import { createEnchantedTheme, ThemeDirectionType, ThemeModeType } from '../../../../theme';

const mockProps = {
  totalPercentage: 50,
  uploadStatus: 'Uploading 1 of 5 items...',
  closeModal: jest.fn(),
  stringLiterals: {
    learnMoreLabel: 'Learn More',
    totalSizeLabel: 'Total Size',
    cancelLabel: 'Cancel',
    cancelAllLabel: 'Cancel All',
    pauseButtonLabel: 'Pause',
  } as Literals,
  cancelAll: jest.fn(),
  pauseButton: jest.fn(),
  translation: {
    collapseTooltip: 'Collapse',
    expandTooltip: 'Expand',
    closeButtonTooltip: 'Close',
  } as ProgressBarLocalization,
  expanded: false,
  toggleButtonClick: jest.fn(),
};

describe('ProgressHeader', () => {
  it('renders the ProgressHeader component with uploadStatus', () => {
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <ProgressHeader {...mockProps} />
      </ThemeProvider>,
    );
    expect(screen.getByText('Uploading 1 of 5 items...')).not.toBeNull();
  });

  it('renders the correct icon based on totalPercentage', () => {
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <ProgressHeader {...mockProps} totalPercentage={0} />
      </ThemeProvider>,
    );
    expect(screen.getAllByTestId('wrapper')[0].querySelector('[data-mui-test="warningIcon"]')).not.toBeNull();

    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <ProgressHeader {...mockProps} totalPercentage={100} />
      </ThemeProvider>,
    );
    expect(screen.getAllByTestId('wrapper')[1].querySelector('[data-mui-test="checkmark--outlineIcon"]')).not.toBeNull();
  });

  it('renders pause and cancel buttons when provided', () => {
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <ProgressHeader {...mockProps} pauseButton={jest.fn()} cancelAll={jest.fn()} />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('pauseButton')).not.toBeNull();
    expect(screen.getByTestId('cancelAllButton')).not.toBeNull();
  });

  it('calls pauseButton when the pause button is clicked', () => {
    const pauseButtonMock = jest.fn();
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <ProgressHeader {...mockProps} pauseButton={pauseButtonMock} />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByTestId('pauseButton'));
    expect(pauseButtonMock).toHaveBeenCalled();
  });

  it('calls cancelAll when the cancel all button is clicked', () => {
    const cancelAllMock = jest.fn();
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <ProgressHeader {...mockProps} cancelAll={cancelAllMock} />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByTestId('cancelAllButton'));
    expect(cancelAllMock).toHaveBeenCalled();
  });

  it('checks the toggle button clicked', () => {
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <ProgressHeader {...mockProps} />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('expandIconButton').querySelector('[data-mui-test="chevron--downIcon"]')).not.toBeNull();
    fireEvent.keyDown(screen.getByTestId('expandIconButton'), { key: 'Enter', code: 'Enter' });
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <ProgressHeader {...mockProps} expanded />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('collapseIconButton').querySelector('[data-mui-test="chevron--upIcon"]')).not.toBeNull();
    fireEvent.keyDown(screen.getByTestId('collapseIconButton'), { key: 'Enter', code: 'Enter' });
  });

  it('calls closeModal when the close button is clicked', () => {
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <ProgressHeader {...mockProps} />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByTestId('close-button'));
    fireEvent.keyDown(screen.getByTestId('close-button'), { key: 'Enter', code: 'Enter' });
    expect(mockProps.closeModal).toHaveBeenCalled();
  });
});
