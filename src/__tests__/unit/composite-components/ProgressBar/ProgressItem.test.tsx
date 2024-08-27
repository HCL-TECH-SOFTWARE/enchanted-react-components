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
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import {
  EnumUploadStatus, IProgressState, Literals, ProgressBarLocalization, ProgressItemType,
} from '../../../../composite_components/ProgressBar/ProgressBar';
import ProgressItems from '../../../../composite_components/ProgressBar/ProgressItems';
import { createEnchantedTheme, ThemeDirectionType, ThemeModeType } from '../../../../theme';

const mockProps = {
  literals: {
    learnMoreLabel: 'Learn More',
    totalSizeLabel: 'Total Size',
    cancelLabel: 'Cancel',
    cancelAllLabel: 'Cancel All',
    pauseButtonLabel: 'Pause',
  } as Literals,
  file: [
    {
      progress: 50,
      size: 100,
      name: 'testFile.jpg',
      collectionId: '123',
      status: EnumUploadStatus.PROGRESS,
      message: '',
      showLearnMore: true,
    },
  ] as IProgressState[],
  retryUploadItem: jest.fn(),
  cancelItem: jest.fn(),
  navigateFolder: jest.fn(),
  learnMoreOnFailure: jest.fn(),
  translation: {
    closeButtonTooltip: 'Close',
    expandTooltip: 'Expand',
    collapseTooltip: 'Collapse',
    navigateButtonTooltip: 'Navigate',
    retryButtonTooltip: 'Retry',
    errorButtonTooltip: 'Error',
  } as ProgressBarLocalization,
};

describe('ProgressItem Component', () => {
  test('renders ProgressItem component', () => {
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <ProgressItems {...mockProps} />
      </ThemeProvider>,
    );
    expect(screen.getByText('testFile.jpg')).not.toBeNull();
  });

  test('renders the avatar icon correctly based on the file type', () => {
    render(
      <ProgressItems {...mockProps} file={[{ ...mockProps.file[0], name: 'test.tif' }]} />,
    );
    expect(screen.getByTestId('TIFIcon')).not.toBeNull();
    render(
      <ProgressItems {...mockProps} file={[{ ...mockProps.file[0], name: 'test.gif' }]} />,
    );
    expect(screen.getByTestId('GIFIcon')).not.toBeNull();
    render(
      <ProgressItems {...mockProps} file={[{ ...mockProps.file[0], name: 'test.svg' }]} />,
    );
    expect(screen.getByTestId('SVGIcon')).not.toBeNull();
    render(
      <ProgressItems {...mockProps} file={[{ ...mockProps.file[0], name: 'test.png' }]} />,
    );
    expect(screen.getByTestId('PNGIcon')).not.toBeNull();
    render(
      <ProgressItems {...mockProps} file={[{ ...mockProps.file[0], name: 'test.webp' }]} />,
    );
    expect(screen.getByTestId('imageIcon')).not.toBeNull();
    render(
      <ProgressItems {...mockProps} file={[{ ...mockProps.file[0], name: 'test.mp4' }]} />,
    );
    expect(screen.getByTestId('videoIcon')).not.toBeNull();
    render(
      <ProgressItems {...mockProps} file={[{ ...mockProps.file[0], name: 'test.pdf' }]} />,
    );
    expect(screen.getByTestId('PDFIcon')).not.toBeNull();
    render(
      <ProgressItems {...mockProps} file={[{ ...mockProps.file[0], name: 'test.xlsx' }]} />,
    );
    expect(screen.getByTestId('XLSIcon')).not.toBeNull();
    render(
      <ProgressItems {...mockProps} file={[{ ...mockProps.file[0], name: 'test.docx' }]} />,
    );
    expect(screen.getByTestId('DOCIcon')).not.toBeNull();
    render(
      <ProgressItems {...mockProps} file={[{ ...mockProps.file[0], name: 'test.ppt' }]} />,
    );
    expect(screen.getByTestId('PPTIcon')).not.toBeNull();
  });

  test('renders progress indicator correctly', () => {
    render(
      <ProgressItems
        {...mockProps}
        file={[{ ...mockProps.file[0], status: EnumUploadStatus.SUCCESS, progress: 100 }]}
      />,
    );
    expect(screen.getAllByTestId('progress-indicator')[0].querySelector('[data-mui-test="checkmark--outlineIcon"]')).not.toBeNull();

    render(
      <ProgressItems
        {...mockProps}
        file={[{ ...mockProps.file[0], status: EnumUploadStatus.FAILURE, progress: 0 }]}
      />,
    );
    expect(screen.getAllByTestId('progress-indicator')[1].querySelector('[data-mui-test="warningIcon"]')).not.toBeNull();

    render(
      <ProgressItems
        {...mockProps}
        file={[{ ...mockProps.file[0], status: EnumUploadStatus.PROGRESS, progress: 50 }]}
      />,
    );
    expect(screen.getAllByTestId('progress-indicator')[2].querySelector('[data-testid="progressRoot"]')).not.toBeNull();
  });

  test('renders hover view location icon correctly', () => {
    const mockNavigateFolder = jest.fn();
    render(
      <ProgressItems
        {...mockProps}
        file={[{ ...mockProps.file[0], status: EnumUploadStatus.SUCCESS }]}
        navigateFolder={mockNavigateFolder}
      />,
    );
    fireEvent.mouseOver(screen.getByText('testFile.jpg'));
    expect(screen.getByTestId('navigate-folder')).not.toBeNull();
    fireEvent.click(screen.getByTestId('navigate-folder'));
    fireEvent.keyDown(screen.getByTestId('navigate-folder'), { key: 'Enter', code: 'Enter' });
    expect(mockNavigateFolder).toHaveBeenCalled();
  });

  test('renders hover retry upload icon correctly', () => {
    const mockRetryUpload = jest.fn();
    render(
      <ProgressItems
        {...mockProps}
        file={[{ ...mockProps.file[0], status: EnumUploadStatus.FAILURE }]}
        retryUploadItem={mockRetryUpload}
      />,
    );
    fireEvent.mouseOver(screen.getByText('testFile.jpg'));
    expect(screen.getByTestId('retry-upload')).not.toBeNull();
    fireEvent.click(screen.getByTestId('retry-upload'));
    fireEvent.keyDown(screen.getByTestId('retry-upload'), { key: 'Enter', code: 'Enter' });
    expect(mockRetryUpload).toHaveBeenCalled();
  });

  test('renders hover pause or stop uploading icon correctly', () => {
    const mockCancelUpload = jest.fn();
    render(
      <ProgressItems
        {...mockProps}
        file={[{ ...mockProps.file[0], status: EnumUploadStatus.PROGRESS }]}
        cancelItem={mockCancelUpload}
      />,
    );
    fireEvent.mouseOver(screen.getByText('testFile.jpg'));
    expect(screen.getByTestId('cancel-upload')).not.toBeNull();
    fireEvent.click(screen.getByTestId('cancel-upload'));
    fireEvent.keyDown(screen.getByTestId('cancel-upload'), { key: 'Enter', code: 'Enter' });
    expect(mockCancelUpload).toHaveBeenCalled();
    fireEvent.mouseLeave(screen.getByText('testFile.jpg'));
    expect(screen.queryByTestId('cancel-upload')).toBeNull();
  });

  test('displays the correct file size value', () => {
    render(
      <ProgressItems
        {...mockProps}
        file={[{ ...mockProps.file[0], size: 1024 }]}
      />,
    );
    expect(screen.queryByTestId('file-size')).not.toBeNull();
    expect(screen.getByText('1 KB')).not.toBeNull();
  });

  test('does not display the file size for folder item', () => {
    render(
      <ProgressItems
        {...mockProps}
        file={[{ ...mockProps.file[0], type: ProgressItemType.Folder }]}
      />,
    );
    expect(screen.queryByTestId('file-size')).toBeNull();
  });

  test('calls learnMoreOnFailure on click and Enter key press', () => {
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <ProgressItems {...mockProps} />
      </ThemeProvider>,
    );
    const learnMoreButton = screen.getByTestId('learn-more-button');
    fireEvent.click(learnMoreButton);
    fireEvent.keyDown(learnMoreButton, { key: 'Enter', code: 'Enter' });
    expect(mockProps.learnMoreOnFailure).toHaveBeenCalled();
  });
});
