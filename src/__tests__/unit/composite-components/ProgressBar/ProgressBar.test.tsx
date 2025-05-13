/* ======================================================================== *
 * Copyright 2024, 2025 HCL America Inc.                                    *
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
  render, screen, cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@emotion/react';
import ProgressBar, {
  EnumUploadStatus, IProgressState, Literals, ProgressBarLocalization, ProgressItemType,
} from '../../../../composite_components/ProgressBar/ProgressBar';
import { createEnchantedTheme, ThemeDirectionType, ThemeModeType } from '../../../../theme';

const mockProps = {
  totalPercentage: 50,
  uploadStatus: 'Uploading 1 of 5 items...',
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
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <ProgressBar {...mockProps} />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('upload-progress-container')).not.toBeNull();
  });

  it('displays the correct upload status', () => {
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <ProgressBar {...mockProps} />
      </ThemeProvider>,
    );
    expect(screen.getByText('Uploading 1 of 5 items...')).not.toBeNull();
  });

  it('calls cancelAll handler when cancel all button is clicked', async () => {
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <ProgressBar {...mockProps} />
      </ThemeProvider>,
    );

    // click the cancel all button
    const cancelAllButton = screen.getByText(mockProps.stringLiterals.cancelAllLabel!);
    await userEvent.click(cancelAllButton);

    expect(mockProps.cancelAll).toHaveBeenCalledTimes(1);
  });
  it('does not call cancelAll when cancelAllDisabled prop is true', async () => {
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <ProgressBar {...mockProps} cancelAllDisabled />
      </ThemeProvider>,
    );

    // click the cancel all button
    const cancelAllButton = screen.getByText(mockProps.stringLiterals.cancelAllLabel!);
    await userEvent.click(cancelAllButton);

    expect(mockProps.cancelAll).not.toHaveBeenCalled();
  });

  it('disables cancelAll button when all uploads are completed, failed orcancelled', async () => {
    const completedFiles = [
      {
        progress: 100,
        size: 100,
        name: 'file1.txt',
        collectionId: '123',
        status: EnumUploadStatus.SUCCESS,
        message: 'Completed',
        type: ProgressItemType.File,
      },
    ];

    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <ProgressBar {...mockProps} uploadedFile={completedFiles} />
      </ThemeProvider>,
    );

    const cancelAllButton = screen.getByText(mockProps.stringLiterals.cancelAllLabel!);
    expect(cancelAllButton).toBeDisabled();
  });

  it('calls cancelAll and disables the button when Cancel All is clicked', async () => {
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <ProgressBar {...mockProps} />
      </ThemeProvider>,
    );

    const cancelAllButton = screen.getByText(mockProps.stringLiterals.cancelAllLabel!);
    await userEvent.click(cancelAllButton);

    expect(mockProps.cancelAll).toHaveBeenCalledTimes(1);
    expect(cancelAllButton).toBeDisabled();
  });

  it('does not call cancelAll when all uploads being completed', async () => {
    const completedFiles = [
      {
        progress: 100,
        size: 100,
        name: 'file1.txt',
        collectionId: '123',
        status: EnumUploadStatus.SUCCESS,
        message: 'Completed',
        type: ProgressItemType.File,
      },
    ];

    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <ProgressBar {...mockProps} uploadedFile={completedFiles} />
      </ThemeProvider>,
    );

    const cancelAllButton = screen.getByText(mockProps.stringLiterals.cancelAllLabel!);
    await userEvent.click(cancelAllButton);

    expect(mockProps.cancelAll).not.toHaveBeenCalled();
  });
});
