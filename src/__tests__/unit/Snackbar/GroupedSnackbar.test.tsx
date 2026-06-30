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
import {
  render, screen, fireEvent, waitFor, cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@emotion/react';
import GroupedSnackbar, { GroupedSnackbarItem } from '../../../Snackbar/GroupedSnackbar';
import { SnackbarVariants } from '../../../Snackbar';
import { createEnchantedTheme, ThemeDirectionType, ThemeModeType } from '../../../theme';

const theme = createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY);

afterEach(cleanup);

describe('GroupedSnackbar unit tests', () => {
  const mockItems: GroupedSnackbarItem[] = [
    {
      id: '1',
      message: 'Error message 1',
      variant: SnackbarVariants.ERROR,
    },
    {
      id: '2',
      message: 'Warning message 1',
      variant: SnackbarVariants.WARNING,
    },
    {
      id: '3',
      message: 'Success message 1',
      variant: SnackbarVariants.SUCCESS,
    },
  ];

  it('Should render grouped snackbar when open is true', () => {
    render(
      <ThemeProvider theme={theme}>
        <GroupedSnackbar
          open
          items={mockItems}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('3 notifications')).toBeInTheDocument();
  });

  it('Should not render grouped snackbar when open is false', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <GroupedSnackbar
          open={false}
          items={mockItems}
        />
      </ThemeProvider>,
    );

    const snackbar = container.querySelector('[role="alert"]');
    expect(snackbar).not.toBeInTheDocument();
  });

  it('Should display correct variant counts in header', () => {
    render(
      <ThemeProvider theme={theme}>
        <GroupedSnackbar
          open
          items={mockItems}
          showHeaderCounts
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('3 notifications')).toBeInTheDocument();
  });


  it('Should call onCloseAll when close all icon button is clicked', async () => {
    const onCloseAll = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <GroupedSnackbar
          open
          items={mockItems}
          onCloseAll={onCloseAll}
        />
      </ThemeProvider>,
    );

    const closeAllButton = screen.getByLabelText('Close all notifications');
    fireEvent.click(closeAllButton);

    await waitFor(() => {
      expect(onCloseAll).toHaveBeenCalled();
    });
  });

  it('Should expand and collapse when expand button is clicked', async () => {
    const items = Array.from({ length: 6 }, (_, i) => {
      return {
        id: `${i + 1}`,
        message: `Message ${i + 1}`,
        variant: SnackbarVariants.INFO,
      };
    });

    render(
      <ThemeProvider theme={theme}>
        <GroupedSnackbar
          open
          items={items}
          maxVisible={5}
          defaultExpanded={false}
        />
      </ThemeProvider>,
    );

    const expandButton = screen.getByLabelText('Toggle notification list');
    expect(expandButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(expandButton);

    await waitFor(() => {
      expect(expandButton).toHaveAttribute('aria-expanded', 'true');
    });
  });

  it('Should call onExpandChange callback when expand state changes', async () => {
    const onExpandChange = jest.fn();
    const items = Array.from({ length: 6 }, (_, i) => {
      return {
        id: `${i + 1}`,
        message: `Message ${i + 1}`,
        variant: SnackbarVariants.INFO,
      };
    });

    render(
      <ThemeProvider theme={theme}>
        <GroupedSnackbar
          open
          items={items}
          maxVisible={5}
          onExpandChange={onExpandChange}
        />
      </ThemeProvider>,
    );

    const expandButton = screen.getByLabelText('Toggle notification list');
    fireEvent.click(expandButton);

    await waitFor(() => {
      expect(onExpandChange).toHaveBeenCalledWith(true);
    });
  });

  it('Should respect maxVisible prop in stack policy', () => {
    const items = Array.from({ length: 10 }, (_, i) => {
      return {
        id: `${i + 1}`,
        message: `Message ${i + 1}`,
        variant: SnackbarVariants.INFO,
      };
    });

    render(
      <ThemeProvider theme={theme}>
        <GroupedSnackbar
          open
          items={items}
          policy="stack"
          maxVisible={2}
          defaultExpanded
        />
      </ThemeProvider>,
    );

    const messages = screen.getAllByText(/Message \d+/);
    expect(messages.length).toBeLessThanOrEqual(3);
  });

  it('Should show only first item in queue policy', () => {
    const items = Array.from({ length: 5 }, (_, i) => {
      return {
        id: `${i + 1}`,
        message: `Message ${i + 1}`,
        variant: SnackbarVariants.INFO,
      };
    });

    render(
      <ThemeProvider theme={theme}>
        <GroupedSnackbar
          open
          items={items}
          policy="queue"
          defaultExpanded
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('Message 1')).toBeInTheDocument();
    expect(screen.queryByText('Message 2')).not.toBeInTheDocument();
    expect(screen.getByText('+4 more in queue')).toBeInTheDocument();
  });

  it('Should exclude progress items from header count when includeProgressInHeaderCounts is false', () => {
    const items: GroupedSnackbarItem[] = [
      {
        id: '1',
        message: 'Success message',
        variant: SnackbarVariants.SUCCESS,
      },
      {
        id: '2',
        message: 'Progress message',
        variant: SnackbarVariants.PROGRESS,
      },
    ];

    render(
      <ThemeProvider theme={theme}>
        <GroupedSnackbar
          open
          items={items}
          showHeaderCounts
          includeProgressInHeaderCounts={false}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('1 notification')).toBeInTheDocument();
  });

  it('Should include progress items in header count when includeProgressInHeaderCounts is true', () => {
    const items: GroupedSnackbarItem[] = [
      {
        id: '1',
        message: 'Success message',
        variant: SnackbarVariants.SUCCESS,
      },
      {
        id: '2',
        message: 'Progress message',
        variant: SnackbarVariants.PROGRESS,
      },
    ];

    render(
      <ThemeProvider theme={theme}>
        <GroupedSnackbar
          open
          items={items}
          showHeaderCounts
          includeProgressInHeaderCounts
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('2 notifications')).toBeInTheDocument();
  });

  it('Should render action button when showActionButton is true', () => {
    const items: GroupedSnackbarItem[] = [
      {
        id: '1',
        message: 'Message with action',
        variant: SnackbarVariants.INFO,
        buttonText: 'Retry',
        showActionButton: true,
        buttonAction: jest.fn(),
      },
    ];

    render(
      <ThemeProvider theme={theme}>
        <GroupedSnackbar
          open
          items={items}
          defaultExpanded
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('Retry')).toBeInTheDocument();
  });

  it('Should call buttonAction when action button is clicked', async () => {
    const buttonAction = jest.fn();
    const items: GroupedSnackbarItem[] = [
      {
        id: '1',
        message: 'Message with action',
        variant: SnackbarVariants.INFO,
        buttonText: 'Retry',
        showActionButton: true,
        buttonAction,
      },
    ];

    render(
      <ThemeProvider theme={theme}>
        <GroupedSnackbar
          open
          items={items}
          defaultExpanded
        />
      </ThemeProvider>,
    );

    const actionButton = screen.getByText('Retry');
    fireEvent.click(actionButton);

    await waitFor(() => {
      expect(buttonAction).toHaveBeenCalled();
    });
  });

  it('Should not show expand button when items count is less than maxVisible', () => {
    const items = Array.from({ length: 3 }, (_, i) => {
      return {
        id: `${i + 1}`,
        message: `Message ${i + 1}`,
        variant: SnackbarVariants.INFO,
      };
    });

    render(
      <ThemeProvider theme={theme}>
        <GroupedSnackbar
          open
          items={items}
          maxVisible={5}
        />
      </ThemeProvider>,
    );

    expect(screen.queryByLabelText('Toggle notification list')).not.toBeInTheDocument();
  });

  it('Should display correct total notification count', () => {
    const items = Array.from({ length: 7 }, (_, i) => {
      return {
        id: `${i + 1}`,
        message: `Message ${i + 1}`,
        variant: SnackbarVariants.INFO,
      };
    });

    render(
      <ThemeProvider theme={theme}>
        <GroupedSnackbar
          open
          items={items}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('7 notifications')).toBeInTheDocument();
  });

  it('Should handle empty items array', () => {
    render(
      <ThemeProvider theme={theme}>
        <GroupedSnackbar
          open
          items={[]}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('0 notifications')).toBeInTheDocument();
  });
});
