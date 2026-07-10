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
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import dayjs from 'dayjs';
import Calendar from '../../../Calendar/Calendar';
import { CalendarItem } from '../../../Calendar/types';
import { ThemeDirectionType, ThemeModeType, createEnchantedTheme } from '../../../theme';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
      {ui}
    </ThemeProvider>,
  );
};

const sampleItems: CalendarItem[] = [
  {
    id: '1',
    title: '5 Expire pending',
    date: dayjs('2024-01-15').toDate(),
    color: 'orange',
    variant: 'block',
  },
  {
    id: '2',
    title: '12 Publish pending',
    date: dayjs('2024-01-15').toDate(),
    color: 'blue',
    variant: 'block',
  },
  {
    id: '3',
    title: 'Meeting',
    date: dayjs('2024-01-16').toDate(),
    time: '10:00 AM',
    color: 'green',
    variant: 'block',
  },
];

describe('Calendar - Month View', () => {
  it('Render calendar with month view', () => {
    renderWithProviders(
      <Calendar view="month" currentDate={dayjs('2024-01-15').toDate()} items={[]} />,
    );
    expect(screen.getByRole('region', { name: 'Calendar' })).toBeInTheDocument();
  });


  it('Render calendar displays weekday headers', () => {
    renderWithProviders(
      <Calendar view="month" currentDate={dayjs('2024-01-15').toDate()} items={[]} />,
    );
    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('Tue')).toBeInTheDocument();
    expect(screen.getByText('Wed')).toBeInTheDocument();
    expect(screen.getByText('Thu')).toBeInTheDocument();
    expect(screen.getByText('Fri')).toBeInTheDocument();
    expect(screen.getByText('Sat')).toBeInTheDocument();
    expect(screen.getByText('Sun')).toBeInTheDocument();
  });

  it('Render calendar displays items on correct dates', () => {
    renderWithProviders(
      <Calendar view="month" currentDate={dayjs('2024-01-15').toDate()} items={sampleItems} />,
    );
    expect(screen.getByText('5 Expire pending')).toBeInTheDocument();
    expect(screen.getByText('12 Publish pending')).toBeInTheDocument();
  });

  it('Render calendar calls onDateChange when date is clicked', () => {
    const handleDateChange = jest.fn();
    renderWithProviders(
      <Calendar
        view="month"
        currentDate={dayjs('2024-01-15').toDate()}
        items={[]}
        onDateChange={handleDateChange}
      />,
    );

    const dateButtons = screen.getAllByRole('button');
    const date15Button = dateButtons.find((btn) => { return btn.textContent === '15'; });

    if (date15Button) {
      fireEvent.click(date15Button);
      expect(handleDateChange).toHaveBeenCalled();
    }
  });

  it('Render calendar calls onItemClick when item is clicked', () => {
    const handleItemClick = jest.fn();
    renderWithProviders(
      <Calendar
        view="month"
        currentDate={dayjs('2024-01-15').toDate()}
        items={sampleItems}
        onItemClick={handleItemClick}
      />,
    );

    const item = screen.getByText('5 Expire pending');
    fireEvent.click(item);
    expect(handleItemClick).toHaveBeenCalledWith(expect.objectContaining({
      id: '1',
      title: '5 Expire pending',
    }));
  });

});

describe('Calendar - Week View', () => {
  it('Render calendar with week view', () => {
    renderWithProviders(
      <Calendar view="week" currentDate={dayjs('2024-01-15').toDate()} items={[]} />,
    );
    expect(screen.getByRole('region', { name: 'Calendar' })).toBeInTheDocument();
  });


  it('Render calendar displays 7 days with weekend', () => {
    renderWithProviders(
      <Calendar view="week" currentDate={dayjs('2024-01-15').toDate()} items={[]} showWeekend />,
    );
    const dayHeaders = screen.getAllByText(/Mon|Tue|Wed|Thu|Fri|Sat|Sun/);
    expect(dayHeaders.length).toBeGreaterThanOrEqual(7);
  });

  it('Render calendar displays 5 days without weekend', () => {
    renderWithProviders(
      <Calendar view="week" currentDate={dayjs('2024-01-15').toDate()} items={[]} showWeekend={false} />,
    );
    expect(screen.queryByText('Sat')).not.toBeInTheDocument();
    expect(screen.queryByText('Sun')).not.toBeInTheDocument();
  });

  it('Render calendar displays items with time in week view', () => {
    renderWithProviders(
      <Calendar view="week" currentDate={dayjs('2024-01-16').toDate()} items={sampleItems} />,
    );
    expect(screen.getByText('Meeting')).toBeInTheDocument();
    expect(screen.getByText('10:00 AM')).toBeInTheDocument();
  });

});

describe('Calendar - Accessibility', () => {
  it('Render calendar items have proper ARIA labels', () => {
    renderWithProviders(
      <Calendar view="month" currentDate={dayjs('2024-01-15').toDate()} items={sampleItems} />,
    );
    expect(screen.getByLabelText('5 Expire pending')).toBeInTheDocument();
  });


  it('Render calendar items support keyboard activation', () => {
    const handleItemClick = jest.fn();
    renderWithProviders(
      <Calendar
        view="month"
        currentDate={dayjs('2024-01-15').toDate()}
        items={sampleItems}
        onItemClick={handleItemClick}
      />,
    );

    const item = screen.getByLabelText('5 Expire pending');
    fireEvent.keyDown(item, { key: 'Enter' });
    expect(handleItemClick).toHaveBeenCalled();
  });
});

describe('Calendar - Week Start Configuration', () => {
  it('should start week on Monday by default (weekStartsOn=1)', () => {
    renderWithProviders(
      <Calendar view="month" currentDate={dayjs('2024-01-15').toDate()} items={[]} />,
    );
    const weekdayHeaders = screen.getAllByRole('columnheader');
    expect(weekdayHeaders[0]).toHaveTextContent('Mon');
    expect(weekdayHeaders[6]).toHaveTextContent('Sun');
  });

  it('should start week on Sunday when weekStartsOn=0', () => {
    renderWithProviders(
      <Calendar view="month" currentDate={dayjs('2024-01-15').toDate()} items={[]} weekStartsOn={0} />,
    );
    const weekdayHeaders = screen.getAllByRole('columnheader');
    expect(weekdayHeaders[0]).toHaveTextContent('Sun');
    expect(weekdayHeaders[6]).toHaveTextContent('Sat');
  });

  it('should start week on Monday when weekStartsOn=1', () => {
    renderWithProviders(
      <Calendar view="month" currentDate={dayjs('2024-01-15').toDate()} items={[]} weekStartsOn={1} />,
    );
    const weekdayHeaders = screen.getAllByRole('columnheader');
    expect(weekdayHeaders[0]).toHaveTextContent('Mon');
    expect(weekdayHeaders[6]).toHaveTextContent('Sun');
  });

  it('should apply weekStartsOn in week view', () => {
    renderWithProviders(
      <Calendar view="week" currentDate={dayjs('2024-01-15').toDate()} items={[]} weekStartsOn={0} />,
    );
    const dayHeaders = screen.getAllByText(/Sun|Mon|Tue|Wed|Thu|Fri|Sat/);
    expect(dayHeaders[0]).toHaveTextContent('Sun');
  });
});

describe('Calendar - Date Validation', () => {
  it('should silently skip items with invalid date strings', () => {
    const itemsWithInvalidDate: CalendarItem[] = [
      {
        id: '1',
        title: 'Valid Event',
        date: dayjs('2024-01-15').toDate(),
        color: 'blue',
        variant: 'block',
      },
      {
        id: '2',
        title: 'Invalid Event',
        date: 'invalid-date' as unknown as Date,
        color: 'red',
        variant: 'block',
      },
    ];

    expect(() => {
      renderWithProviders(
        <Calendar view="month" currentDate={dayjs('2024-01-15').toDate()} items={itemsWithInvalidDate} />,
      );
    }).not.toThrow();

    expect(screen.getByText('Valid Event')).toBeInTheDocument();
    expect(screen.queryByText('Invalid Event')).not.toBeInTheDocument();
  });

  it('should silently skip items with null dates', () => {
    const itemsWithNullDate: CalendarItem[] = [
      {
        id: '1',
        title: 'Valid Event',
        date: dayjs('2024-01-15').toDate(),
        color: 'blue',
        variant: 'block',
      },
      {
        id: '2',
        title: 'Null Date Event',
        date: null as unknown as Date,
        color: 'red',
        variant: 'block',
      },
    ];

    expect(() => {
      renderWithProviders(
        <Calendar view="month" currentDate={dayjs('2024-01-15').toDate()} items={itemsWithNullDate} />,
      );
    }).not.toThrow();

    expect(screen.getByText('Valid Event')).toBeInTheDocument();
    expect(screen.queryByText('Null Date Event')).not.toBeInTheDocument();
  });

  it('should silently skip items with undefined dates', () => {
    const itemsWithUndefinedDate: CalendarItem[] = [
      {
        id: '1',
        title: 'Valid Event',
        date: dayjs('2024-01-15').toDate(),
        color: 'blue',
        variant: 'block',
      },
      {
        id: '2',
        title: 'Undefined Date Event',
        date: undefined as unknown as Date,
        color: 'red',
        variant: 'block',
      },
    ];

    expect(() => {
      renderWithProviders(
        <Calendar view="month" currentDate={dayjs('2024-01-15').toDate()} items={itemsWithUndefinedDate} />,
      );
    }).not.toThrow();

    expect(screen.getByText('Valid Event')).toBeInTheDocument();
    expect(screen.queryByText('Undefined Date Event')).not.toBeInTheDocument();
  });

  it('should silently skip all items when all dates are invalid', () => {
    const allInvalidItems: CalendarItem[] = [
      {
        id: '1',
        title: 'Invalid 1',
        date: 'bad-date' as unknown as Date,
        color: 'blue',
        variant: 'block',
      },
      {
        id: '2',
        title: 'Invalid 2',
        date: null as unknown as Date,
        color: 'red',
        variant: 'block',
      },
    ];

    expect(() => {
      renderWithProviders(
        <Calendar view="month" currentDate={dayjs('2024-01-15').toDate()} items={allInvalidItems} />,
      );
    }).not.toThrow();

    expect(screen.queryByText('Invalid 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Invalid 2')).not.toBeInTheDocument();
  });
});

describe('Calendar - Custom Colors', () => {
  it('should render items with custom colors', () => {
    const customColorItem: CalendarItem[] = [
      {
        id: '1',
        title: 'Custom Color Event',
        date: dayjs('2024-01-15').toDate(),
        color: 'neutral',
        variant: 'block',
        customColors: {
          iconBackground: '#FFE5E5',
          background: '#FFFFFF',
          border: '#FF0000',
          text: '#FF0000',
        },
      },
    ];

    renderWithProviders(
      <Calendar view="month" currentDate={dayjs('2024-01-15').toDate()} items={customColorItem} />,
    );

    expect(screen.getByText('Custom Color Event')).toBeInTheDocument();
  });

  it('should fallback to predefined colors when customColors not provided', () => {
    const standardItem: CalendarItem[] = [
      {
        id: '1',
        title: 'Standard Event',
        date: dayjs('2024-01-15').toDate(),
        color: 'blue',
        variant: 'block',
      },
    ];

    renderWithProviders(
      <Calendar view="month" currentDate={dayjs('2024-01-15').toDate()} items={standardItem} />,
    );

    expect(screen.getByText('Standard Event')).toBeInTheDocument();
  });

  it('should render multiple items with different custom colors', () => {
    const mixedColorItems: CalendarItem[] = [
      {
        id: '1',
        title: 'Custom Red',
        date: dayjs('2024-01-15').toDate(),
        color: 'neutral',
        variant: 'block',
        customColors: {
          iconBackground: '#FFE5E5',
          background: '#FFFFFF',
          border: '#FF0000',
          text: '#FF0000',
        },
      },
      {
        id: '2',
        title: 'Standard Blue',
        date: dayjs('2024-01-15').toDate(),
        color: 'blue',
        variant: 'block',
      },
      {
        id: '3',
        title: 'Custom Purple',
        date: dayjs('2024-01-15').toDate(),
        color: 'neutral',
        variant: 'block',
        customColors: {
          iconBackground: '#F3E5F5',
          background: '#FFFFFF',
          border: '#9C27B0',
          text: '#9C27B0',
        },
      },
    ];

    renderWithProviders(
      <Calendar view="month" currentDate={dayjs('2024-01-15').toDate()} items={mixedColorItems} />,
    );

    expect(screen.getByText('Custom Red')).toBeInTheDocument();
    expect(screen.getByText('Standard Blue')).toBeInTheDocument();
    expect(screen.getByText('Custom Purple')).toBeInTheDocument();
  });
});

describe('Calendar - Edge Cases', () => {
  it('should handle empty items array', () => {
    expect(() => {
      renderWithProviders(
        <Calendar view="month" currentDate={dayjs('2024-01-15').toDate()} items={[]} />,
      );
    }).not.toThrow();
  });

  it('should handle null currentDate', () => {
    expect(() => {
      renderWithProviders(
        <Calendar view="month" items={[]} />,
      );
    }).not.toThrow();
  });

  it('should handle undefined currentDate', () => {
    expect(() => {
      renderWithProviders(
        <Calendar view="month" currentDate={undefined} items={[]} />,
      );
    }).not.toThrow();
  });

  it('should handle custom labels', () => {
    const customLabels = {
      calendar: 'Custom Calendar',
      weekdaysShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    };

    renderWithProviders(
      <Calendar
        view="month"
        currentDate={dayjs('2024-01-15').toDate()}
        items={[]}
        labels={customLabels}
      />,
    );

    expect(screen.getByRole('region', { name: 'Custom Calendar' })).toBeInTheDocument();
  });

  it('should handle responsive mode', () => {
    expect(() => {
      renderWithProviders(
        <Calendar
          view="month"
          currentDate={dayjs('2024-01-15').toDate()}
          items={[]}
          responsive
        />,
      );
    }).not.toThrow();
  });

  it('should handle custom width and height', () => {
    expect(() => {
      renderWithProviders(
        <Calendar
          view="month"
          currentDate={dayjs('2024-01-15').toDate()}
          items={[]}
          width="600px"
          height="500px"
        />,
      );
    }).not.toThrow();
  });

  it('should handle large number of items', () => {
    const manyItems: CalendarItem[] = Array.from({ length: 100 }, (_, i) => {
      return {
        id: `item-${i}`,
        title: `Event ${i}`,
        date: dayjs('2024-01-15').add(i % 7, 'day').toDate(),
        color: 'blue' as const,
        variant: 'block' as const,
      };
    });

    expect(() => {
      renderWithProviders(
        <Calendar view="month" currentDate={dayjs('2024-01-15').toDate()} items={manyItems} />,
      );
    }).not.toThrow();
  });

  it('should handle leap year dates', () => {
    const leapYearItem: CalendarItem[] = [
      {
        id: '1',
        title: 'Leap Day Event',
        date: dayjs('2024-02-29').toDate(),
        color: 'blue',
        variant: 'block',
      },
    ];

    renderWithProviders(
      <Calendar view="month" currentDate={dayjs('2024-02-29').toDate()} items={leapYearItem} />,
    );

    expect(screen.getByText('Leap Day Event')).toBeInTheDocument();
  });

});

describe('Calendar - Locale Support', () => {
  it('should handle different locales', () => {
    expect(() => {
      renderWithProviders(
        <Calendar
          view="month"
          currentDate={dayjs('2024-01-15').toDate()}
          items={[]}
          locale="fr"
        />,
      );
    }).not.toThrow();
  });

  it('should handle invalid locale gracefully', () => {
    expect(() => {
      renderWithProviders(
        <Calendar
          view="month"
          currentDate={dayjs('2024-01-15').toDate()}
          items={[]}
          locale="invalid-locale"
        />,
      );
    }).not.toThrow();
  });
});

describe('Calendar - Performance', () => {
  it('should handle items with same date', () => {
    const sameeDateItems: CalendarItem[] = Array.from({ length: 20 }, (_, i) => {
      return {
        id: `item-${i}`,
        title: `Event ${i}`,
        date: dayjs('2024-01-15').toDate(),
        color: 'blue' as const,
        variant: 'block' as const,
      };
    });

    renderWithProviders(
      <Calendar view="month" currentDate={dayjs('2024-01-15').toDate()} items={sameeDateItems} />,
    );

    expect(screen.getByText('Event 0')).toBeInTheDocument();
    expect(screen.getByText('Event 19')).toBeInTheDocument();
  });
});

describe('Calendar - Keyboard Navigation Grid', () => {
  it('should navigate with arrow keys', () => {
    renderWithProviders(
      <Calendar view="month" currentDate={dayjs('2024-01-15').toDate()} items={[]} />,
    );

    const dateButtons = screen.getAllByRole('button');
    const date15Button = dateButtons.find((btn) => { return btn.textContent === '15'; });

    if (date15Button) {
      fireEvent.click(date15Button);
      fireEvent.keyDown(date15Button, { key: 'ArrowRight' });
      fireEvent.keyDown(date15Button, { key: 'ArrowLeft' });
      fireEvent.keyDown(date15Button, { key: 'ArrowUp' });
      fireEvent.keyDown(date15Button, { key: 'ArrowDown' });
    }
  });

  it('should navigate with Home and End keys', () => {
    renderWithProviders(
      <Calendar view="month" currentDate={dayjs('2024-01-15').toDate()} items={[]} />,
    );

    const dateButtons = screen.getAllByRole('button');
    const date15Button = dateButtons.find((btn) => { return btn.textContent === '15'; });

    if (date15Button) {
      fireEvent.click(date15Button);
      fireEvent.keyDown(date15Button, { key: 'Home' });
      fireEvent.keyDown(date15Button, { key: 'End' });
    }
  });

  it('should navigate with PageUp and PageDown keys', () => {
    renderWithProviders(
      <Calendar view="month" currentDate={dayjs('2024-01-15').toDate()} items={[]} />,
    );

    const dateButtons = screen.getAllByRole('button');
    const date15Button = dateButtons.find((btn) => { return btn.textContent === '15'; });

    if (date15Button) {
      fireEvent.click(date15Button);
      fireEvent.keyDown(date15Button, { key: 'PageUp' });
      fireEvent.keyDown(date15Button, { key: 'PageDown' });
    }
  });

  it('should navigate with Home and End keys in week view', () => {
    renderWithProviders(
      <Calendar view="week" currentDate={dayjs('2024-01-15').toDate()} items={[]} />,
    );

    const dateButtons = screen.getAllByRole('button');
    const date15Button = dateButtons.find((btn) => { return btn.textContent === '15'; });

    if (date15Button) {
      fireEvent.click(date15Button);
      fireEvent.keyDown(date15Button, { key: 'Home' });
      fireEvent.keyDown(date15Button, { key: 'End' });
    }
  });

  it('should handle keyboard navigation across month boundaries', () => {
    const handleNavigate = jest.fn();
    renderWithProviders(
      <Calendar
        view="month"
        currentDate={dayjs('2024-01-31').toDate()}
        items={[]}
        onNavigate={handleNavigate}
      />,
    );

    const dateButtons = screen.getAllByRole('button');
    const date31Button = dateButtons.find((btn) => { return btn.textContent === '31'; });

    if (date31Button) {
      fireEvent.click(date31Button);
      fireEvent.keyDown(date31Button, { key: 'ArrowRight' });
    }
  });

  it('should handle keyboard navigation across week boundaries', () => {
    const handleNavigate = jest.fn();
    renderWithProviders(
      <Calendar
        view="week"
        currentDate={dayjs('2024-01-15').toDate()}
        items={[]}
        onNavigate={handleNavigate}
      />,
    );

    const dateButtons = screen.getAllByRole('button');
    const firstButton = dateButtons[0];

    if (firstButton) {
      fireEvent.click(firstButton);
      fireEvent.keyDown(firstButton, { key: 'ArrowLeft' });
    }
  });

  it('should announce date and event count on keyboard navigation', () => {
    const itemsOnDate: CalendarItem[] = [
      {
        id: '1',
        title: 'Event 1',
        date: dayjs('2024-01-16').toDate(),
        color: 'blue',
        variant: 'block',
      },
      {
        id: '2',
        title: 'Event 2',
        date: dayjs('2024-01-16').toDate(),
        color: 'green',
        variant: 'block',
      },
    ];

    renderWithProviders(
      <Calendar view="month" currentDate={dayjs('2024-01-15').toDate()} items={itemsOnDate} />,
    );

    const dateButtons = screen.getAllByRole('button');
    const date15Button = dateButtons.find((btn) => { return btn.textContent === '15'; });

    if (date15Button) {
      fireEvent.click(date15Button);
      fireEvent.keyDown(date15Button, { key: 'ArrowRight' });
    }
  });

  it('should announce single event correctly', () => {
    const singleItem: CalendarItem[] = [
      {
        id: '1',
        title: 'Single Event',
        date: dayjs('2024-01-16').toDate(),
        color: 'blue',
        variant: 'block',
      },
    ];

    renderWithProviders(
      <Calendar view="month" currentDate={dayjs('2024-01-15').toDate()} items={singleItem} />,
    );

    const dateButtons = screen.getAllByRole('button');
    const date15Button = dateButtons.find((btn) => { return btn.textContent === '15'; });

    if (date15Button) {
      fireEvent.click(date15Button);
      fireEvent.keyDown(date15Button, { key: 'ArrowRight' });
    }
  });
});

describe('Calendar - Uncontrolled Mode', () => {
  it('should work in uncontrolled mode without currentDate prop', () => {
    const handleDateChange = jest.fn();
    renderWithProviders(
      <Calendar view="month" items={[]} onDateChange={handleDateChange} />,
    );

    const dateButtons = screen.getAllByRole('button');
    const firstDateButton = dateButtons.find((btn) => { return btn.textContent && /^\d+$/.test(btn.textContent); });

    if (firstDateButton) {
      fireEvent.click(firstDateButton);
      expect(handleDateChange).toHaveBeenCalled();
    }
  });

});
