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
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import {
  Literals, ProgressBarLocalization, UploadBarStatus,
} from '../../../../composite_components/ProgressBar/ProgressBar';
import ProgressHeader from '../../../../composite_components/ProgressBar/ProgressHeader';
import { createEnchantedTheme, ThemeDirectionType, ThemeModeType } from '../../../../theme';

const theme = createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY);

const mockProps = {
  totalPercentage: 50,
  uploadStatus: 'Uploading 1 of 5 items...',
  overallStatus: UploadBarStatus.SUCCESS,
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
  isCancelAllDisabled: false,
};

type HeaderProps = Partial<React.ComponentProps<typeof ProgressHeader>>;

const headerUi = (props: HeaderProps = {}) => {
  return (
    <ThemeProvider theme={theme}>
      <ProgressHeader {...mockProps} {...props} />
    </ThemeProvider>
  );
};

const renderHeader = (props: HeaderProps = {}) => { return render(headerUi(props)); };

const getLeadingIcon = (iconName: string) => {
  return screen.getByTestId('wrapper').querySelector(`[data-mui-test="${iconName}"]`);
};

describe('ProgressHeader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the ProgressHeader component with uploadStatus', () => {
    renderHeader();
    expect(screen.getByText('Uploading 1 of 5 items...')).not.toBeNull();
  });

  describe('leading status icon', () => {
    it('renders the progress spinner while the upload is in progress', () => {
      renderHeader({ totalPercentage: 50 });
      expect(screen.getByTestId('wrapper').querySelector('[data-testid="progressRoot"]')).not.toBeNull();
      expect(getLeadingIcon('checkmark--outlineIcon')).toBeNull();
      expect(getLeadingIcon('warning--altIcon')).toBeNull();
      expect(getLeadingIcon('warningIcon')).toBeNull();
    });

    it('keeps showing the spinner while in progress regardless of overallStatus', () => {
      renderHeader({ totalPercentage: 50, overallStatus: UploadBarStatus.WARNING });
      expect(screen.getByTestId('wrapper').querySelector('[data-testid="progressRoot"]')).not.toBeNull();
      expect(getLeadingIcon('warning--altIcon')).toBeNull();
    });

    it('renders the success icon when the upload finished successfully', () => {
      renderHeader({ totalPercentage: 100, overallStatus: UploadBarStatus.SUCCESS });
      expect(getLeadingIcon('checkmark--outlineIcon')).not.toBeNull();
      expect(getLeadingIcon('warning--altIcon')).toBeNull();
      expect(getLeadingIcon('warningIcon')).toBeNull();
    });

    it('renders the mixed (warning) icon when the upload partially succeeded', () => {
      renderHeader({ totalPercentage: 100, overallStatus: UploadBarStatus.WARNING });
      expect(getLeadingIcon('warning--altIcon')).not.toBeNull();
      expect(getLeadingIcon('checkmark--outlineIcon')).toBeNull();
      expect(getLeadingIcon('warningIcon')).toBeNull();
    });

    it('renders the error icon when every upload failed', () => {
      renderHeader({ totalPercentage: 0, overallStatus: UploadBarStatus.ERROR });
      expect(getLeadingIcon('warningIcon')).not.toBeNull();
      expect(getLeadingIcon('checkmark--outlineIcon')).toBeNull();
      expect(getLeadingIcon('warning--altIcon')).toBeNull();
    });
  });

  it('renders pause and cancel buttons when provided', () => {
    renderHeader({ pauseButton: jest.fn(), cancelAll: jest.fn() });
    expect(screen.getByTestId('pauseButton')).not.toBeNull();
    expect(screen.getByTestId('cancelAllButton')).not.toBeNull();
  });

  it('calls pauseButton when the pause button is clicked', () => {
    const pauseButtonMock = jest.fn();
    renderHeader({ pauseButton: pauseButtonMock });
    fireEvent.click(screen.getByTestId('pauseButton'));
    expect(pauseButtonMock).toHaveBeenCalled();
  });

  it('calls cancelAll when the cancel all button is clicked', () => {
    const cancelAllMock = jest.fn();
    renderHeader({ cancelAll: cancelAllMock });
    fireEvent.click(screen.getByTestId('cancelAllButton'));
    expect(cancelAllMock).toHaveBeenCalled();
  });

  describe('expand and collapse chevron', () => {
    it('shows the arrow-up chevron when collapsed', () => {
      renderHeader({ expanded: false });
      expect(screen.getByTestId('expandIconButton').querySelector('[data-mui-test="chevron--upIcon"]')).not.toBeNull();
      expect(screen.getByTestId('expandIconButton').querySelector('[data-mui-test="chevron--downIcon"]')).toBeNull();
      expect(screen.queryByTestId('collapseIconButton')).toBeNull();
    });

    it('shows the arrow-down chevron when expanded', () => {
      renderHeader({ expanded: true });
      expect(screen.getByTestId('collapseIconButton').querySelector('[data-mui-test="chevron--downIcon"]')).not.toBeNull();
      expect(screen.getByTestId('collapseIconButton').querySelector('[data-mui-test="chevron--upIcon"]')).toBeNull();
      expect(screen.queryByTestId('expandIconButton')).toBeNull();
    });

    it('calls toggleButtonClick when the expand button is clicked or Enter is pressed', () => {
      renderHeader({ expanded: false });
      fireEvent.click(screen.getByTestId('expandIconButton'));
      expect(mockProps.toggleButtonClick).toHaveBeenCalledTimes(1);
      fireEvent.keyDown(screen.getByTestId('expandIconButton'), { key: 'Enter', code: 'Enter' });
      expect(mockProps.toggleButtonClick).toHaveBeenCalledTimes(2);
    });

    it('calls toggleButtonClick when the collapse button is clicked or Enter is pressed', () => {
      renderHeader({ expanded: true });
      fireEvent.click(screen.getByTestId('collapseIconButton'));
      expect(mockProps.toggleButtonClick).toHaveBeenCalledTimes(1);
      fireEvent.keyDown(screen.getByTestId('collapseIconButton'), { key: 'Enter', code: 'Enter' });
      expect(mockProps.toggleButtonClick).toHaveBeenCalledTimes(2);
    });
  });

  it('calls closeModal when the close button is clicked', () => {
    renderHeader();
    fireEvent.click(screen.getByTestId('close-button'));
    fireEvent.keyDown(screen.getByTestId('close-button'), { key: 'Enter', code: 'Enter' });
    expect(mockProps.closeModal).toHaveBeenCalled();
  });

  it('renders the "Cancel All" button when cancelAll prop is provided', () => {
    const cancelAllMock = jest.fn();
    renderHeader({ cancelAll: cancelAllMock });
    expect(screen.getByText('Cancel All')).not.toBeNull();
    fireEvent.click(screen.getByText('Cancel All'));
    expect(cancelAllMock).toHaveBeenCalled();
  });

  describe('focus handling', () => {
    it('moves focus to the collapse button after the user expands the bar', () => {
      const { rerender } = renderHeader({ expanded: false });
      fireEvent.click(screen.getByTestId('expandIconButton'));
      rerender(headerUi({ expanded: true }));
      expect(screen.getByTestId('collapseIconButton')).toHaveFocus();
    });

    it('moves focus to the expand button after the user collapses the bar', () => {
      const { rerender } = renderHeader({ expanded: true });
      fireEvent.click(screen.getByTestId('collapseIconButton'));
      rerender(headerUi({ expanded: false }));
      expect(screen.getByTestId('expandIconButton')).toHaveFocus();
    });

    it('does not move focus on the initial render', () => {
      renderHeader({ expanded: true });
      expect(screen.getByTestId('collapseIconButton')).not.toHaveFocus();
    });

    it('does not move focus when expanded changes without a user toggle', () => {
      const { rerender } = renderHeader({ expanded: false });
      rerender(headerUi({ expanded: true }));
      expect(screen.getByTestId('collapseIconButton')).not.toHaveFocus();
      rerender(headerUi({ expanded: false }));
      expect(screen.getByTestId('expandIconButton')).not.toHaveFocus();
    });
  });
});
