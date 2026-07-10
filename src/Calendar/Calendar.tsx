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
import React, {
  useState, useCallback, useMemo, KeyboardEvent,
} from 'react';
import { Box, Theme } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import Paper from '../Paper';
import Typography from '../Typography';
import CalendarCell from './CalendarCell';
import { CalendarItem, CalendarView, CalendarLabels } from './types';

export interface CalendarProps {
  view?: CalendarView;
  items?: CalendarItem[];
  currentDate?: Date | Dayjs;
  onDateChange?: (date: Dayjs) => void;
  onItemClick?: (item: CalendarItem) => void;
  onNavigate?: (direction: 'prev' | 'next') => void;
  showWeekend?: boolean;
  locale?: string;
  disabled?: boolean;
  customStyles?: React.CSSProperties | { [key: string]: React.CSSProperties };
  labels?: CalendarLabels;
  width?: string | number;
  height?: string | number;
  responsive?: boolean;
}

const DEFAULT_LABELS: Required<CalendarLabels> = {
  calendar: 'Calendar',
  weekdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  weekdaysShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  dateFormat: 'MMMM YYYY',
  dateFormatLong: 'MMMM D, YYYY',
  timePreposition: 'at',
  dayFormat: 'D',
  dayAbbreviationFormat: 'ddd',
  weekRangeFormat: 'MMM D',
  weekRangeEndFormat: 'MMM D, YYYY',
};

const getCalendarStyle = (
  theme: Theme,
  customStyles: React.CSSProperties | { [key: string]: React.CSSProperties },
  view: CalendarView,
  width?: string | number,
  height?: string | number,
  responsive?: boolean,
) => {
  const baseStyles: React.CSSProperties = {
    width: width || (responsive ? '100%' : '841px'),
    height: height || (responsive ? 'auto' : '805px'),
    minHeight: responsive ? '400px' : undefined,
    maxWidth: responsive ? '100%' : undefined,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '4px',
    padding: '0px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: view === 'month' ? 'column' : 'row',
    ...customStyles,
  };

  return baseStyles;
};

const Calendar = ({
  view = 'month',
  items = [],
  currentDate,
  onDateChange,
  onItemClick,
  onNavigate,
  showWeekend = true,
  locale = 'en',
  disabled = false,
  customStyles = {},
  labels,
  width,
  height,
  responsive = false,
}: CalendarProps) => {
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };
  const [internalDate, setInternalDate] = useState<Dayjs>(() => {
    return currentDate ? dayjs(currentDate) : dayjs();
  });
  const [focusedDate, setFocusedDate] = useState<Dayjs | null>(null);
  const [announcement, setAnnouncement] = useState<string>('');

  const activeDate = currentDate ? dayjs(currentDate) : internalDate;

  const handleNavigate = useCallback((direction: 'prev' | 'next') => {
    const newDate = direction === 'prev'
      ? activeDate.subtract(1, view === 'month' ? 'month' : 'week')
      : activeDate.add(1, view === 'month' ? 'month' : 'week');

    if (!currentDate) {
      setInternalDate(newDate);
    }

    const formattedDate = newDate.locale(locale).format(mergedLabels.dateFormat);
    setAnnouncement(`Navigated to ${formattedDate}`);

    onNavigate?.(direction);
    onDateChange?.(newDate);
  }, [activeDate, currentDate, onDateChange, onNavigate, view, locale, mergedLabels.dateFormat]);

  const weekdays = useMemo(() => {
    const days = mergedLabels.weekdaysShort;
    return showWeekend ? days : days.slice(0, 5);
  }, [showWeekend, mergedLabels.weekdaysShort]);

  const calendarDays = useMemo(() => {
    if (view === 'week') {
      const startOfWeek = activeDate.startOf('week').add(1, 'day');
      const days: Dayjs[] = [];
      const daysToShow = showWeekend ? 7 : 5;

      for (let i = 0; i < daysToShow; i += 1) {
        days.push(startOfWeek.add(i, 'day'));
      }
      return days;
    }

    const startOfMonth = activeDate.startOf('month');
    const endOfMonth = activeDate.endOf('month');
    const startDate = startOfMonth.startOf('week').add(1, 'day');
    const endDate = endOfMonth.endOf('week').add(1, 'day');

    const days: Dayjs[] = [];
    let currentDay = startDate;

    while (currentDay.isBefore(endDate) || currentDay.isSame(endDate, 'day')) {
      days.push(currentDay);
      currentDay = currentDay.add(1, 'day');
    }

    return days;
  }, [activeDate, view, showWeekend]);

  const itemsByDate = useMemo(() => {
    const map = new Map<string, CalendarItem[]>();
    items.forEach((item) => {
      const dateKey = dayjs(item.date).format('YYYY-MM-DD');
      if (!map.has(dateKey)) {
        map.set(dateKey, []);
      }
      map.get(dateKey)!.push(item);
    });
    return map;
  }, [items]);

  const getItemsForDate = useCallback((date: Dayjs): CalendarItem[] => {
    return itemsByDate.get(date.format('YYYY-MM-DD')) || [];
  }, [itemsByDate]);

  const handleGridKeyDown = useCallback((event: KeyboardEvent, dateParam: Dayjs) => {
    let newFocusDate: Dayjs | null = null;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        newFocusDate = dateParam.subtract(1, 'day');
        break;
      case 'ArrowRight':
        event.preventDefault();
        newFocusDate = dateParam.add(1, 'day');
        break;
      case 'ArrowUp':
        event.preventDefault();
        newFocusDate = dateParam.subtract(1, 'week');
        break;
      case 'ArrowDown':
        event.preventDefault();
        newFocusDate = dateParam.add(1, 'week');
        break;
      case 'Home':
        event.preventDefault();
        newFocusDate = view === 'month' ? dateParam.startOf('month') : dateParam.startOf('week').add(1, 'day');
        break;
      case 'End':
        event.preventDefault();
        newFocusDate = view === 'month' ? dateParam.endOf('month') : dateParam.endOf('week').add(1, 'day');
        break;
      case 'PageUp':
        event.preventDefault();
        newFocusDate = dateParam.subtract(1, view === 'month' ? 'month' : 'week');
        break;
      case 'PageDown':
        event.preventDefault();
        newFocusDate = dateParam.add(1, view === 'month' ? 'month' : 'week');
        break;
      default:
        return;
    }

    if (newFocusDate) {
      setFocusedDate(newFocusDate);

      const formattedDate = newFocusDate.locale(locale).format(mergedLabels.dateFormatLong);
      const itemCount = itemsByDate.get(newFocusDate.format('YYYY-MM-DD'))?.length || 0;
      const itemText = itemCount === 1 ? '1 event' : `${itemCount} events`;
      setAnnouncement(`${formattedDate}, ${itemText}`);

      if (view === 'month' && newFocusDate.month() !== activeDate.month()) {
        handleNavigate(newFocusDate.isAfter(activeDate) ? 'next' : 'prev');
      } else if (view === 'week' && !calendarDays.some((day) => { return day.isSame(newFocusDate, 'day'); })) {
        handleNavigate(newFocusDate.isAfter(activeDate) ? 'next' : 'prev');
      }
    }
  }, [view, activeDate, handleNavigate, calendarDays, locale, mergedLabels.dateFormatLong, itemsByDate]);

  const renderMonthView = () => {
    const weeks: Dayjs[][] = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      weeks.push(calendarDays.slice(i, i + 7));
    }

    return (
      <Box
        sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}
        role="grid"
        aria-readonly="true"
      >
        {weeks.map((week, weekIndex) => {
          const weekKey = week[0]?.format('YYYY-MM-DD') || 'week';
          const isLastWeek = weekIndex === weeks.length - 1;
          return (
            <Box
              key={weekKey}
              sx={{
                display: 'flex',
                flex: 1,
                minHeight: 0,
              }}
              role="row"
            >
              {week.map((day) => {
                const dayItems = getItemsForDate(day);
                const isCurrentMonth = day.month() === activeDate.month();
                const isToday = day.isSame(dayjs(), 'day');
                const isSelected = day.isSame(activeDate, 'day');

                return (
                  <CalendarCell
                    key={day.format('YYYY-MM-DD')}
                    date={day}
                    items={dayItems}
                    view="month"
                    isCurrentMonth={isCurrentMonth}
                    isToday={isToday}
                    isSelected={isSelected}
                    isFocused={focusedDate?.isSame(day, 'day')}
                    isLastRow={isLastWeek}
                    disabled={disabled}
                    onDateClick={onDateChange}
                    onItemClick={onItemClick}
                    onKeyDown={handleGridKeyDown}
                    dateFormatLong={mergedLabels.dateFormatLong}
                    dayFormat={mergedLabels.dayFormat}
                    dayAbbreviationFormat={mergedLabels.dayAbbreviationFormat}
                    timePreposition={mergedLabels.timePreposition}
                    locale={locale}
                  />
                );
              })}
            </Box>
          );
        })}
      </Box>
    );
  };

  const renderWeekView = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          overflow: 'hidden',
        }}
      >
        {calendarDays.map((day) => {
          const dayItems = getItemsForDate(day);
          const isToday = day.isSame(dayjs(), 'day');
          const isSelected = day.isSame(activeDate, 'day');

          return (
            <CalendarCell
              key={day.format('YYYY-MM-DD')}
              date={day}
              items={dayItems}
              view="week"
              isCurrentMonth
              isToday={isToday}
              isSelected={isSelected}
              isFocused={focusedDate?.isSame(day, 'day')}
              disabled={disabled}
              onDateClick={onDateChange}
              onItemClick={onItemClick}
              onKeyDown={handleGridKeyDown}
              dateFormatLong={mergedLabels.dateFormatLong}
              dayFormat={mergedLabels.dayFormat}
              dayAbbreviationFormat={mergedLabels.dayAbbreviationFormat}
              timePreposition={mergedLabels.timePreposition}
              locale={locale}
            />
          );
        })}
      </Box>
    );
  };

  return (
    <Paper
      variant="outlined"
      sx={(theme) => { return getCalendarStyle(theme, customStyles, view, width, height, responsive); }}
      role="region"
      aria-label={mergedLabels.calendar}
    >
      {view === 'month' && (
        <Box
          sx={(theme) => {
            return {
              display: 'flex',
              backgroundColor: theme.palette.background.default,
              borderBottom: `1px solid ${theme.palette.divider}`,
            };
          }}
          role="row"
        >
          {weekdays.map((day: string) => {
            return (
              <Box
                key={day}
                sx={(theme) => {
                  return {
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: theme.spacing(3.5),
                    padding: theme.spacing(0.75),
                    borderRight: `1px solid ${theme.palette.divider}`,
                    '&:last-child': {
                      borderRight: 'none',
                    },
                  };
                }}
                role="columnheader"
              >
                <Typography variant="body2" color="text.primary">
                  {day}
                </Typography>
              </Box>
            );
          })}
        </Box>
      )}

      {view === 'month' ? renderMonthView() : renderWeekView()}

      <Box
        role="status"
        aria-live="polite"
        aria-atomic="true"
        sx={{
          position: 'absolute',
          left: '-10000px',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
        }}
      >
        {announcement}
      </Box>
    </Paper>
  );
};

export default Calendar;
