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

  it('Render calendar displays month and year in header', () => {
    renderWithProviders(
      <Calendar view="month" currentDate={dayjs('2024-01-15').toDate()} items={[]} />,
    );
    expect(screen.getByText('January 2024')).toBeInTheDocument();
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

  it('Render calendar navigation buttons work correctly', () => {
    const handleNavigate = jest.fn();
    renderWithProviders(
      <Calendar
        view="month"
        currentDate={dayjs('2024-01-15').toDate()}
        items={[]}
        onNavigate={handleNavigate}
      />,
    );

    const prevButton = screen.getByLabelText('Previous month');
    const nextButton = screen.getByLabelText('Next month');

    fireEvent.click(prevButton);
    expect(handleNavigate).toHaveBeenCalledWith('prev');

    fireEvent.click(nextButton);
    expect(handleNavigate).toHaveBeenCalledWith('next');
  });

  it('Render calendar with disabled prop disables interactions', () => {
    const handleDateChange = jest.fn();
    renderWithProviders(
      <Calendar
        view="month"
        currentDate={dayjs('2024-01-15').toDate()}
        items={[]}
        disabled
        onDateChange={handleDateChange}
      />,
    );

    const prevButton = screen.getByLabelText('Previous month');
    expect(prevButton).toBeDisabled();
  });
});

describe('Calendar - Week View', () => {
  it('Render calendar with week view', () => {
    renderWithProviders(
      <Calendar view="week" currentDate={dayjs('2024-01-15').toDate()} items={[]} />,
    );
    expect(screen.getByRole('region', { name: 'Calendar' })).toBeInTheDocument();
  });

  it('Render calendar displays week date range in header', () => {
    renderWithProviders(
      <Calendar view="week" currentDate={dayjs('2024-01-15').toDate()} items={[]} />,
    );
    const header = screen.getByRole('heading', { level: 2 });
    expect(header.textContent).toContain('Jan');
    expect(header.textContent).toContain('2024');
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

  it('Render calendar navigation works in week view', () => {
    const handleNavigate = jest.fn();
    renderWithProviders(
      <Calendar
        view="week"
        currentDate={dayjs('2024-01-15').toDate()}
        items={[]}
        onNavigate={handleNavigate}
      />,
    );

    const prevButton = screen.getByLabelText('Previous week');
    const nextButton = screen.getByLabelText('Next week');

    fireEvent.click(prevButton);
    expect(handleNavigate).toHaveBeenCalledWith('prev');

    fireEvent.click(nextButton);
    expect(handleNavigate).toHaveBeenCalledWith('next');
  });
});

describe('Calendar - Accessibility', () => {
  it('Render calendar has proper ARIA labels', () => {
    renderWithProviders(
      <Calendar view="month" currentDate={dayjs('2024-01-15').toDate()} items={[]} />,
    );
    expect(screen.getByRole('region', { name: 'Calendar' })).toBeInTheDocument();
    expect(screen.getByLabelText('Previous month')).toBeInTheDocument();
    expect(screen.getByLabelText('Next month')).toBeInTheDocument();
  });

  it('Render calendar items have proper ARIA labels', () => {
    renderWithProviders(
      <Calendar view="month" currentDate={dayjs('2024-01-15').toDate()} items={sampleItems} />,
    );
    expect(screen.getByLabelText('5 Expire pending')).toBeInTheDocument();
  });

  it('Render calendar supports keyboard navigation on navigation buttons', () => {
    const handleNavigate = jest.fn();
    renderWithProviders(
      <Calendar
        view="month"
        currentDate={dayjs('2024-01-15').toDate()}
        items={[]}
        onNavigate={handleNavigate}
      />,
    );

    const prevButton = screen.getByLabelText('Previous month');

    fireEvent.keyDown(prevButton, { key: 'Enter' });
    expect(handleNavigate).toHaveBeenCalledWith('prev');
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
