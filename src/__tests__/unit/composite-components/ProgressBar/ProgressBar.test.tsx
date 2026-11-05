/* ======================================================================== *
 * Copyright 2024, 2026 HCL America Inc.                                    *
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
import '@testing-library/jest-dom';
import {
  render, screen, cleanup, fireEvent,
} from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import ProgressBar, {
  EnumUploadStatus, IProgressState, Literals, ProgressBarLocalization, ProgressItemType, UploadBarStatus,
} from '../../../../composite_components/ProgressBar/ProgressBar';
import { createEnchantedTheme, ThemeDirectionType, ThemeModeType } from '../../../../theme';

const theme = createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY);

const mockProps = {
  totalPercentage: 50,
  uploadStatus: 'Uploading 1 of 5 items...',
  overallStatus: UploadBarStatus.SUCCESS,
  totalSize: '50MB',
  totalTime: '10 minutes',
  stringLiterals: {
    learnMoreLabel: 'Learn More',
    totalSizeLabel: 'Total Size',
    cancelLabel: 'Cancel',
    cancelAllLabel: 'Cancel All',
    pauseButtonLabel: 'Pause',
  } as Literals,
  uploadedFile: [
    {
      progress: 50,
      size: 100,
      name: 'file1.txt',
      collectionId: '123',
      status: EnumUploadStatus.PROGRESS,
      message: 'Uploading',
      type: ProgressItemType.File,
      showLearnMore: true,
    },
  ] as IProgressState[],
  translation: {
    closeButtonTooltip: 'Close',
    expandTooltip: 'Expand',
    collapseTooltip: 'Collapse',
    navigateButtonTooltip: 'Navigate',
    retryButtonTooltip: 'Retry',
    errorButtonTooltip: 'Error',
  } as ProgressBarLocalization,
  closeModal: jest.fn(),
  cancelAll: jest.fn(),
  retryUploadItem: jest.fn(),
  cancelItem: jest.fn(),
  navigateFolder: jest.fn(),
  learnMoreOnFailure: jest.fn(),
  pauseButton: jest.fn(),
};

afterEach(cleanup);

describe('ProgressBar Component', () => {
  it('renders without crashing', () => {
    render(
      <ThemeProvider theme={theme}>
        <ProgressBar {...mockProps} isCancelAllDisabled />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('upload-progress-container')).not.toBeNull();
  });

  it('displays the correct upload status', () => {
    render(
      <ThemeProvider theme={theme}>
        <ProgressBar {...mockProps} isCancelAllDisabled />
      </ThemeProvider>,
    );
    expect(screen.getByText('Uploading 1 of 5 items...')).not.toBeNull();
  });

  describe('expanded state', () => {
    it('is collapsed by default and the user can expand and collapse it', () => {
      render(
        <ThemeProvider theme={theme}>
          <ProgressBar {...mockProps} isCancelAllDisabled />
        </ThemeProvider>,
      );
      expect(screen.getByTestId('expandIconButton')).toBeInTheDocument();
      expect(screen.queryByText('file1.txt')).toBeNull();

      fireEvent.click(screen.getByTestId('expandIconButton'));
      expect(screen.getByTestId('collapseIconButton')).toBeInTheDocument();
      expect(screen.getByText('file1.txt')).toBeInTheDocument();
      expect(screen.getByText('Total Size:')).toBeInTheDocument();

      fireEvent.click(screen.getByTestId('collapseIconButton'));
      expect(screen.getByTestId('expandIconButton')).toBeInTheDocument();
      expect(screen.queryByText('file1.txt')).toBeNull();
    });

    it('calls onExpandedChange when the user toggles while uncontrolled', () => {
      const onExpandedChange = jest.fn();
      render(
        <ThemeProvider theme={theme}>
          <ProgressBar {...mockProps} isCancelAllDisabled onExpandedChange={onExpandedChange} />
        </ThemeProvider>,
      );
      fireEvent.click(screen.getByTestId('expandIconButton'));
      expect(onExpandedChange).toHaveBeenCalledWith(true);
      fireEvent.click(screen.getByTestId('collapseIconButton'));
      expect(onExpandedChange).toHaveBeenCalledWith(false);
    });

    it('renders expanded when expanded is true', () => {
      render(
        <ThemeProvider theme={theme}>
          <ProgressBar {...mockProps} isCancelAllDisabled expanded />
        </ThemeProvider>,
      );
      expect(screen.getByTestId('collapseIconButton')).toBeInTheDocument();
      expect(screen.getByText('file1.txt')).toBeInTheDocument();
    });

    it('renders collapsed when expanded is false', () => {
      render(
        <ThemeProvider theme={theme}>
          <ProgressBar {...mockProps} isCancelAllDisabled expanded={false} />
        </ThemeProvider>,
      );
      expect(screen.getByTestId('expandIconButton')).toBeInTheDocument();
      expect(screen.queryByText('file1.txt')).toBeNull();
    });

    it('reports the toggle but does not change its own state when controlled', () => {
      const onExpandedChange = jest.fn();
      render(
        <ThemeProvider theme={theme}>
          <ProgressBar {...mockProps} isCancelAllDisabled expanded={false} onExpandedChange={onExpandedChange} />
        </ThemeProvider>,
      );
      fireEvent.click(screen.getByTestId('expandIconButton'));
      expect(onExpandedChange).toHaveBeenCalledWith(true);
      // The parent has not updated the prop, so it stays collapsed
      expect(screen.getByTestId('expandIconButton')).toBeInTheDocument();
      expect(screen.queryByText('file1.txt')).toBeNull();
    });

    it('follows the expanded prop when the parent changes it', () => {
      const { rerender } = render(
        <ThemeProvider theme={theme}>
          <ProgressBar {...mockProps} isCancelAllDisabled expanded={false} />
        </ThemeProvider>,
      );
      expect(screen.queryByText('file1.txt')).toBeNull();

      rerender(
        <ThemeProvider theme={theme}>
          <ProgressBar {...mockProps} isCancelAllDisabled expanded />
        </ThemeProvider>,
      );
      expect(screen.getByText('file1.txt')).toBeInTheDocument();
    });
  });

  describe('overall status', () => {
    it.each([
      [UploadBarStatus.SUCCESS, 100, 'checkmark--outlineIcon'],
      [UploadBarStatus.WARNING, 100, 'warning--altIcon'],
      [UploadBarStatus.ERROR, 0, 'warningIcon'],
    ])('shows the matching header icon for %s once finished', (overallStatus, totalPercentage, iconName) => {
      render(
        <ThemeProvider theme={theme}>
          <ProgressBar
            {...mockProps}
            isCancelAllDisabled
            totalPercentage={totalPercentage}
            overallStatus={overallStatus}
          />
        </ThemeProvider>,
      );
      expect(screen.getByTestId('wrapper').querySelector(`[data-mui-test="${iconName}"]`)).not.toBeNull();
    });
  });
});
