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
  render, screen, fireEvent, waitFor, act,
} from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import {
  EnumUploadStatus, IProgressState, Literals, ProgressBarLocalization, ProgressItemType,
} from '../../../../composite_components/ProgressBar/ProgressBar';
import ProgressItems from '../../../../composite_components/ProgressBar/ProgressItems';
import { createEnchantedTheme, ThemeDirectionType, ThemeModeType } from '../../../../theme';

const theme = createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY);

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
    cancelledLabel: 'Cancelled.',
  } as ProgressBarLocalization,
};

describe('ProgressItem Component', () => {
  test('renders ProgressItem component', () => {
    render(
      <ThemeProvider theme={theme}>
        <ProgressItems {...mockProps} />
      </ThemeProvider>,
    );
    expect(screen.getByText('testFile.jpg')).not.toBeNull();
  });

  test('renders the avatar icon correctly based on the file type', () => {
    render(
      <ThemeProvider theme={theme}>
        <ProgressItems {...mockProps} file={[{ ...mockProps.file[0], name: 'test.tif' }]} />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('TIFIcon')).not.toBeNull();
    render(
      <ThemeProvider theme={theme}>
        <ProgressItems {...mockProps} file={[{ ...mockProps.file[0], name: 'test.gif' }]} />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('GIFIcon')).not.toBeNull();
    render(
      <ThemeProvider theme={theme}>
        <ProgressItems {...mockProps} file={[{ ...mockProps.file[0], name: 'test.svg' }]} />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('SVGIcon')).not.toBeNull();
    render(
      <ThemeProvider theme={theme}>
        <ProgressItems {...mockProps} file={[{ ...mockProps.file[0], name: 'test.png' }]} />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('PNGIcon')).not.toBeNull();
    render(
      <ThemeProvider theme={theme}>
        <ProgressItems {...mockProps} file={[{ ...mockProps.file[0], name: 'test.webp' }]} />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('imageIcon')).not.toBeNull();
    render(
      <ThemeProvider theme={theme}>
        <ProgressItems {...mockProps} file={[{ ...mockProps.file[0], name: 'test.mp4' }]} />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('videoIcon')).not.toBeNull();
    render(
      <ThemeProvider theme={theme}>
        <ProgressItems {...mockProps} file={[{ ...mockProps.file[0], name: 'test.pdf' }]} />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('PDFIcon')).not.toBeNull();
    render(
      <ThemeProvider theme={theme}>
        <ProgressItems {...mockProps} file={[{ ...mockProps.file[0], name: 'test.xlsx' }]} />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('XLSIcon')).not.toBeNull();
    render(
      <ThemeProvider theme={theme}>
        <ProgressItems {...mockProps} file={[{ ...mockProps.file[0], name: 'test.docx' }]} />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('DOCIcon')).not.toBeNull();
    render(
      <ThemeProvider theme={theme}>
        <ProgressItems {...mockProps} file={[{ ...mockProps.file[0], name: 'test.ppt' }]} />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('PPTIcon')).not.toBeNull();
  });

  test('renders progress indicator correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <ProgressItems
          {...mockProps}
          file={[{ ...mockProps.file[0], status: EnumUploadStatus.SUCCESS, progress: 100 }]}
        />
      </ThemeProvider>,
    );
    expect(screen.getAllByTestId('progress-indicator')[0].querySelector('[data-mui-test="checkmark--outlineIcon"]')).not.toBeNull();

    render(
      <ThemeProvider theme={theme}>
        <ProgressItems
          {...mockProps}
          file={[{ ...mockProps.file[0], status: EnumUploadStatus.FAILURE, progress: 0 }]}
        />
      </ThemeProvider>,
    );
    expect(screen.getAllByTestId('progress-indicator')[1].querySelector('[data-mui-test="warningIcon"]')).not.toBeNull();

    render(
      <ThemeProvider theme={theme}>
        <ProgressItems
          {...mockProps}
          file={[{ ...mockProps.file[0], status: EnumUploadStatus.PROGRESS, progress: 50 }]}
        />
      </ThemeProvider>,
    );
    expect(screen.getAllByTestId('progress-indicator')[2].querySelector('[data-testid="progressRoot"]')).not.toBeNull();
  });

  test('renders hover view location icon correctly', () => {
    const mockNavigateFolder = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <ProgressItems
          {...mockProps}
          file={[{ ...mockProps.file[0], status: EnumUploadStatus.SUCCESS }]}
          navigateFolder={mockNavigateFolder}
        />
      </ThemeProvider>,
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
      <ThemeProvider theme={theme}>
        <ProgressItems
          {...mockProps}
          file={[{ ...mockProps.file[0], status: EnumUploadStatus.FAILURE }]}
          retryUploadItem={mockRetryUpload}
        />
      </ThemeProvider>,
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
      <ThemeProvider theme={theme}>
        <ProgressItems
          {...mockProps}
          file={[{ ...mockProps.file[0], status: EnumUploadStatus.PROGRESS }]}
          cancelItem={mockCancelUpload}
        />
      </ThemeProvider>,
    );
    fireEvent.mouseOver(screen.getByText('testFile.jpg'));
    expect(screen.getByTestId('cancel-upload')).not.toBeNull();
    fireEvent.click(screen.getByTestId('cancel-upload'));
    fireEvent.keyDown(screen.getByTestId('cancel-upload'), { key: 'Enter', code: 'Enter' });
    expect(mockCancelUpload).toHaveBeenCalled();
  });

  test('displays the correct file size value', () => {
    render(
      <ThemeProvider theme={theme}>
        <ProgressItems
          {...mockProps}
          file={[{ ...mockProps.file[0], size: 1024 }]}
        />
      </ThemeProvider>,
    );
    expect(screen.queryByTestId('file-size')).not.toBeNull();
    expect(screen.getByText('1 KB')).not.toBeNull();
  });

  test('does not display the file size for folder item', () => {
    render(
      <ThemeProvider theme={theme}>
        <ProgressItems
          {...mockProps}
          file={[{ ...mockProps.file[0], type: ProgressItemType.Folder }]}
        />
      </ThemeProvider>,
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

  test('displays cancelled label when item status is CANCELLED', () => {
    render(
      <ThemeProvider theme={theme}>
        <ProgressItems
          {...mockProps}
          file={[{ ...mockProps.file[0], status: EnumUploadStatus.CANCELLED }]}
          translation={mockProps.translation}
        />
      </ThemeProvider>,
    );
    expect(screen.getByText('Cancelled.')).toBeInTheDocument();
  });

  test('cancelled item disables hover and focus', () => {
    render(
      <ThemeProvider theme={theme}>
        <ProgressItems
          {...mockProps}
          file={[{ ...mockProps.file[0], status: EnumUploadStatus.CANCELLED }]}
        />
      </ThemeProvider>,
    );
    const listItemButton = screen.getByText('testFile.jpg').closest('.MuiListItemButton-root');
    expect(listItemButton).toHaveClass('disabled-hover');
    expect(listItemButton).toHaveAttribute('tabindex', '-1');
    fireEvent.mouseOver(listItemButton!);
    expect(screen.queryByTestId('cancel-upload')).toBeNull();
  });

  test('renders progress indicator with correct margin in RTL mode', () => {
    const rtlTheme = createEnchantedTheme(ThemeDirectionType.RTL, ThemeModeType.LIGHT_NEUTRAL_GREY);
    render(
      <ThemeProvider theme={rtlTheme}>
        <ProgressItems
          {...mockProps}
          direction="rtl"
        />
      </ThemeProvider>,
    );

    fireEvent.mouseOver(screen.getByText('testFile.jpg'));

    const progressIndicator = screen.getByTestId('progress-indicator');
    expect(window.getComputedStyle(progressIndicator).marginLeft).toBe('28px');
  });

  // Asset name, failure message, and learn more tooltips render via MUI Portal at body level
  // (no disablePortal) so they can extend beyond the progress bar boundary.
  // Action button tooltips (navigate, cancel, retry) use disablePortal:true and render
  // inside the list container.
  test('renders asset name tooltip via portal outside list item container', async () => {
    const { unmount } = render(
      <ThemeProvider theme={theme}>
        <ProgressItems
          {...mockProps}
          file={[{ ...mockProps.file[0], status: EnumUploadStatus.FAILURE, showLearnMore: true }]}
        />
      </ThemeProvider>,
    );

    // Trigger name tooltip via mouseEnter on the span (controlled via onOpen)
    const nameSpan = screen.getByText('testFile.jpg');
    fireEvent.mouseEnter(nameSpan);
    const nameTooltip = await screen.findByRole('tooltip');
    expect(document.body).toContainElement(nameTooltip);
    expect(nameSpan.closest('.MuiListItemButton-root')).not.toContainElement(nameTooltip);

    unmount();
  });

  test('renders learn more tooltip via portal outside list item container', async () => {
    const { unmount } = render(
      <ThemeProvider theme={theme}>
        <ProgressItems
          {...mockProps}
          file={[{ ...mockProps.file[0], status: EnumUploadStatus.FAILURE, showLearnMore: true }]}
        />
      </ThemeProvider>,
    );

    const learnMoreButton = screen.getByTestId('learn-more-button');
    fireEvent.mouseEnter(learnMoreButton);
    const learnMoreTooltip = await screen.findByRole('tooltip', { name: mockProps.literals.learnMoreLabel });
    expect(document.body).toContainElement(learnMoreTooltip);
    expect(learnMoreButton.closest('.MuiListItemButton-root')).not.toContainElement(learnMoreTooltip);

    unmount();
  });

  test('renders pending item name tooltip via portal outside list item container', async () => {
    render(
      <ThemeProvider theme={theme}>
        <ProgressItems
          {...mockProps}
          file={[{ ...mockProps.file[0], status: EnumUploadStatus.PENDING }]}
        />
      </ThemeProvider>,
    );

    const pendingText = screen.getByTestId('pending-item-text-primary');
    fireEvent.mouseEnter(pendingText);
    const pendingTooltip = await screen.findByRole('tooltip');
    expect(document.body).toContainElement(pendingTooltip);
    expect(pendingText.closest('.MuiListItemButton-root')).not.toContainElement(pendingTooltip);
  });

  test('renders action button tooltips inside the list container via disablePortal', async () => {
    render(
      <ThemeProvider theme={theme}>
        <ProgressItems
          {...mockProps}
          file={[{ ...mockProps.file[0], status: EnumUploadStatus.SUCCESS }]}
          navigateFolder={mockProps.navigateFolder}
        />
      </ThemeProvider>,
    );

    // Hover the item to show action buttons
    fireEvent.mouseOver(screen.getByText('testFile.jpg'));
    const navigateButton = screen.getByTestId('navigate-folder');

    // Trigger navigate tooltip via mouseEnter (controlled via onOpen)
    fireEvent.mouseEnter(navigateButton);
    const navigateTooltip = await screen.findByRole('tooltip', { name: mockProps.translation.navigateButtonTooltip });

    // disablePortal:true — tooltip renders inside the list, not at body level
    expect(navigateButton.closest('ul')).toContainElement(navigateTooltip);
    expect(document.body).not.toHaveAttribute('data-tooltip-portal');
  });

  // All tooltips close immediately when the list is scrolled.
  test('closes open tooltip when list is scrolled', async () => {
    render(
      <ThemeProvider theme={theme}>
        <ProgressItems
          {...mockProps}
          file={[{ ...mockProps.file[0], status: EnumUploadStatus.FAILURE, showLearnMore: true }]}
        />
      </ThemeProvider>,
    );

    // Open the name tooltip
    const nameSpan = screen.getByText('testFile.jpg');
    fireEvent.mouseEnter(nameSpan);
    await screen.findByRole('tooltip');
    expect(screen.queryByRole('tooltip')).not.toBeNull();

    // Scroll the list — tooltip should close
    const list = screen.getByRole('list');
    act(() => {
      fireEvent.scroll(list);
    });

    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).toBeNull();
    });
  });

  test('does not close tooltip when list is scrolled and no tooltip is open', () => {
    render(
      <ThemeProvider theme={theme}>
        <ProgressItems {...mockProps} />
      </ThemeProvider>,
    );

    // No tooltip open — scroll should not throw or cause side effects
    const list = screen.getByRole('list');
    expect(() => {
      fireEvent.scroll(list);
    }).not.toThrow();
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  test('only one tooltip is open at a time', async () => {
    render(
      <ThemeProvider theme={theme}>
        <ProgressItems
          {...mockProps}
          file={[
            {
              ...mockProps.file[0],
              name: 'file1.jpg',
              status: EnumUploadStatus.FAILURE,
              showLearnMore: true,
              timestamp: 1000,
            },
            {
              ...mockProps.file[0],
              name: 'file2.jpg',
              status: EnumUploadStatus.FAILURE,
              showLearnMore: true,
              timestamp: 2000,
            },
          ]}
        />
      </ThemeProvider>,
    );

    // Open first file's tooltip
    const [firstName, secondName] = screen.getAllByText(/file\d\.jpg/);
    fireEvent.mouseEnter(firstName);
    await screen.findByRole('tooltip');
    expect(screen.getAllByRole('tooltip')).toHaveLength(1);

    // Open second file's tooltip — first should close
    fireEvent.mouseLeave(firstName);
    fireEvent.mouseEnter(secondName);
    await waitFor(() => {
      const tooltips = screen.getAllByRole('tooltip');
      expect(tooltips).toHaveLength(1);
      expect(tooltips[0]).toHaveTextContent('file2.jpg');
    });
  });
});
