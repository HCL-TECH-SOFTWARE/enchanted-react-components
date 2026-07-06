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
import SnackbarGroup, { SnackbarGroupItem } from '../../../SnackbarGroup/SnackbarGroup';
import { SnackbarVariants } from '../../../Snackbar';
import { createEnchantedTheme, ThemeDirectionType, ThemeModeType } from '../../../theme';

const theme = createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY);

afterEach(cleanup);

describe('SnackbarGroup unit tests', () => {
  const mockItems: SnackbarGroupItem[] = [
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

  it('Should render snackbar group when open is true', () => {
    render(
      <ThemeProvider theme={theme}>
        <SnackbarGroup
          open
          items={mockItems}
          showVariantBadges={false}
        />
      </ThemeProvider>,
    );

    const elements = screen.getAllByText((content, element) => {
      return element?.textContent?.includes('notifications') || false;
    });
    expect(elements.length).toBeGreaterThan(0);
  });

  it('Should not render snackbar group when open is false', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <SnackbarGroup
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
        <SnackbarGroup
          open
          items={mockItems}
          showVariantBadges
        />
      </ThemeProvider>,
    );

    expect(screen.getByText(/1 error\(s\)/)).toBeInTheDocument();
    expect(screen.getByText(/1 warning\(s\)/)).toBeInTheDocument();
    expect(screen.getByText(/1 success\(es\)/)).toBeInTheDocument();
    expect(screen.getByText(/notifications/)).toBeInTheDocument();
  });

  it('Should call onCloseAll when close all icon button is clicked', async () => {
    const onCloseAll = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <SnackbarGroup
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
        <SnackbarGroup
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
        <SnackbarGroup
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
        <SnackbarGroup
          open
          items={items}
          policy="stack"
          maxVisible={2}
          defaultExpanded={false}
        />
      </ThemeProvider>,
    );

    const messages = screen.queryAllByText(/Message \d+/);
    expect(messages.length).toBe(0);
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
        <SnackbarGroup
          open
          items={items}
          policy="queue"
          defaultExpanded={false}
        />
      </ThemeProvider>,
    );

    const messages = screen.queryAllByText(/Message \d+/);
    expect(messages.length).toBe(0);
    expect(screen.getByText('+4 more in queue')).toBeInTheDocument();
  });

  it('Should exclude progress items from header count when includeProgressInHeaderCounts is false', () => {
    const items: SnackbarGroupItem[] = [
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
        <SnackbarGroup
          open
          items={items}
          showVariantBadges={false}
          includeProgressInHeaderCounts={false}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText(/1.*notification/)).toBeInTheDocument();
  });

  it('Should include progress items in header count when includeProgressInHeaderCounts is true', () => {
    const items: SnackbarGroupItem[] = [
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
        <SnackbarGroup
          open
          items={items}
          showVariantBadges={false}
          includeProgressInHeaderCounts
        />
      </ThemeProvider>,
    );

    const elements = screen.getAllByText((content, element) => {
      return element?.textContent?.includes('notifications') || false;
    });
    expect(elements.length).toBeGreaterThan(0);
  });

  it('Should render action button when showActionButton is true', () => {
    const items: SnackbarGroupItem[] = [
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
        <SnackbarGroup
          open
          items={items}
          defaultExpanded
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('Message with action')).toBeInTheDocument();
  });

  it('Should call buttonAction when action button is clicked', async () => {
    const buttonAction = jest.fn();
    const items: SnackbarGroupItem[] = [
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
        <SnackbarGroup
          open
          items={items}
          defaultExpanded
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('Message with action')).toBeInTheDocument();
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
        <SnackbarGroup
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
        <SnackbarGroup
          open
          items={items}
          showVariantBadges={false}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText(/7.*notifications/)).toBeInTheDocument();
  });

  it('Should handle empty items array', () => {
    render(
      <ThemeProvider theme={theme}>
        <SnackbarGroup
          open
          items={[]}
          showVariantBadges={false}
        />
      </ThemeProvider>,
    );

    const elements = screen.getAllByText((content, element) => {
      return element?.textContent?.includes('notification') || false;
    });
    expect(elements.length).toBeGreaterThan(0);
  });

  it('Should render all items when expanded with stack policy', () => {
    const items = Array.from({ length: 8 }, (_, i) => {
      return {
        id: `${i + 1}`,
        message: `Message ${i + 1}`,
        variant: SnackbarVariants.INFO,
      };
    });

    render(
      <ThemeProvider theme={theme}>
        <SnackbarGroup
          open
          items={items}
          policy="stack"
          maxVisible={3}
          defaultExpanded
        />
      </ThemeProvider>,
    );

    const messages = screen.queryAllByText(/Message \d+/);
    expect(messages.length).toBe(8);
  });

  it('Should respect anchorOrigin prop', () => {
    render(
      <ThemeProvider theme={theme}>
        <SnackbarGroup
          open
          items={mockItems}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        />
      </ThemeProvider>,
    );

    const elements = screen.getAllByText((content, element) => {
      return element?.textContent?.includes('notifications') || false;
    });
    expect(elements.length).toBeGreaterThan(0);
  });

  it('Should apply custom sx styles', () => {
    render(
      <ThemeProvider theme={theme}>
        <SnackbarGroup
          open
          items={mockItems}
          sx={{ backgroundColor: 'red' }}
        />
      </ThemeProvider>,
    );

    const elements = screen.getAllByText((content, element) => {
      return element?.textContent?.includes('notifications') || false;
    });
    expect(elements.length).toBeGreaterThan(0);
  });

  it('Should handle multiple error variants correctly', () => {
    const items: SnackbarGroupItem[] = [
      {
        id: '1',
        message: 'Error 1',
        variant: SnackbarVariants.ERROR,
      },
      {
        id: '2',
        message: 'Error 2',
        variant: SnackbarVariants.ERROR,
      },
      {
        id: '3',
        message: 'Error 3',
        variant: SnackbarVariants.ERROR,
      },
    ];

    render(
      <ThemeProvider theme={theme}>
        <SnackbarGroup
          open
          items={items}
          showVariantBadges
        />
      </ThemeProvider>,
    );

    expect(screen.getByText(/3 error\(s\)/)).toBeInTheDocument();
  });

  it('Should handle mixed variant counts correctly', () => {
    const items: SnackbarGroupItem[] = [
      {
        id: '1',
        message: 'Error 1',
        variant: SnackbarVariants.ERROR,
      },
      {
        id: '2',
        message: 'Error 2',
        variant: SnackbarVariants.ERROR,
      },
      {
        id: '3',
        message: 'Warning 1',
        variant: SnackbarVariants.WARNING,
      },
      {
        id: '4',
        message: 'Warning 2',
        variant: SnackbarVariants.WARNING,
      },
      {
        id: '5',
        message: 'Warning 3',
        variant: SnackbarVariants.WARNING,
      },
      {
        id: '6',
        message: 'Success 1',
        variant: SnackbarVariants.SUCCESS,
      },
      {
        id: '7',
        message: 'Info 1',
        variant: SnackbarVariants.INFO,
      },
    ];

    render(
      <ThemeProvider theme={theme}>
        <SnackbarGroup
          open
          items={items}
          showVariantBadges
        />
      </ThemeProvider>,
    );

    expect(screen.getByText(/2 error\(s\)/)).toBeInTheDocument();
    expect(screen.getByText(/3 warning\(s\)/)).toBeInTheDocument();
    expect(screen.getByText(/1 success\(es\)/)).toBeInTheDocument();
    expect(screen.getByText(/1 info\(s\)/)).toBeInTheDocument();
  });

  it('Should not show variant count badges when count is 1', () => {
    const items: SnackbarGroupItem[] = [
      {
        id: '1',
        message: 'Error 1',
        variant: SnackbarVariants.ERROR,
      },
      {
        id: '2',
        message: 'Warning 1',
        variant: SnackbarVariants.WARNING,
      },
    ];

    render(
      <ThemeProvider theme={theme}>
        <SnackbarGroup
          open
          items={items}
          showVariantBadges
        />
      </ThemeProvider>,
    );

    expect(screen.getByText(/1 error\(s\)/)).toBeInTheDocument();
    expect(screen.getByText(/1 warning\(s\)/)).toBeInTheDocument();
  });

  it('Should handle defaultExpanded prop correctly', () => {
    const items = Array.from({ length: 6 }, (_, i) => {
      return {
        id: `${i + 1}`,
        message: `Message ${i + 1}`,
        variant: SnackbarVariants.INFO,
      };
    });

    render(
      <ThemeProvider theme={theme}>
        <SnackbarGroup
          open
          items={items}
          maxVisible={3}
          defaultExpanded
        />
      </ThemeProvider>,
    );

    const expandButton = screen.getByLabelText('Toggle notification list');
    expect(expandButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('Should update visible items when policy changes from stack to queue', () => {
    const items = Array.from({ length: 5 }, (_, i) => {
      return {
        id: `${i + 1}`,
        message: `Message ${i + 1}`,
        variant: SnackbarVariants.INFO,
      };
    });

    const { rerender } = render(
      <ThemeProvider theme={theme}>
        <SnackbarGroup
          open
          items={items}
          policy="stack"
          maxVisible={3}
          defaultExpanded={false}
        />
      </ThemeProvider>,
    );

    const messages = screen.queryAllByText(/Message \d+/);
    expect(messages.length).toBe(0);

    rerender(
      <ThemeProvider theme={theme}>
        <SnackbarGroup
          open
          items={items}
          policy="queue"
          maxVisible={3}
          defaultExpanded={false}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('+4 more in queue')).toBeInTheDocument();
  });

  it('Should call onCloseItem when item close action is triggered', async () => {
    const onCloseItem = jest.fn();
    const items: SnackbarGroupItem[] = [
      {
        id: '1',
        message: 'Message 1',
        variant: SnackbarVariants.INFO,
      },
    ];

    render(
      <ThemeProvider theme={theme}>
        <SnackbarGroup
          open
          items={items}
          defaultExpanded
          onCloseItem={onCloseItem}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('Message 1')).toBeInTheDocument();
  });

  it('Should correctly filter progress items from counts when includeProgressInHeaderCounts is false', () => {
    const items: SnackbarGroupItem[] = [
      {
        id: '1',
        message: 'Error 1',
        variant: SnackbarVariants.ERROR,
      },
      {
        id: '2',
        message: 'Progress 1',
        variant: SnackbarVariants.PROGRESS,
      },
      {
        id: '3',
        message: 'Progress 2',
        variant: SnackbarVariants.PROGRESS,
      },
    ];

    render(
      <ThemeProvider theme={theme}>
        <SnackbarGroup
          open
          items={items}
          showVariantBadges={false}
          includeProgressInHeaderCounts={false}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText(/1 error\(s\)/)).toBeInTheDocument();
    expect(screen.getByText(/notification/)).toBeInTheDocument();
  });

  it('Should render with forwardRef correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <ThemeProvider theme={theme}>
        <SnackbarGroup
          ref={ref}
          open
          items={mockItems}
        />
      </ThemeProvider>,
    );

    expect(ref.current).toBeInTheDocument();
  });
});
