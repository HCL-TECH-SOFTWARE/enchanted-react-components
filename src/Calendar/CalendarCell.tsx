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
// eslint-why TypeScript interfaces provide type safety
/* eslint-disable react/prop-types */
import React, { KeyboardEvent, useRef, useEffect } from 'react';
import { Box, Theme } from '@mui/material';
import { Dayjs } from 'dayjs';
import Typography from '../Typography';
import CalendarItem from './CalendarItem';
import { CalendarItem as CalendarItemType, CalendarView } from './types';

interface CalendarCellProps {
  date: Dayjs;
  items: CalendarItemType[];
  view: CalendarView;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isFocused?: boolean;
  isLastRow?: boolean;
  disabled?: boolean;
  onDateClick?: (date: Dayjs) => void;
  onItemClick?: (item: CalendarItemType) => void;
  onKeyDown?: (event: KeyboardEvent, date: Dayjs) => void;
  dateFormatLong?: string;
  dayFormat?: string;
  dayAbbreviationFormat?: string;
  timePreposition?: string;
  locale?: string;
}

const CalendarCell: React.FC<CalendarCellProps> = React.memo(({
  date,
  items,
  view,
  isCurrentMonth,
  isToday,
  isSelected,
  isFocused = false,
  isLastRow = false,
  disabled = false,
  onDateClick,
  onItemClick,
  onKeyDown,
  dateFormatLong = 'MMMM D, YYYY',
  dayFormat = 'D',
  dayAbbreviationFormat = 'ddd',
  timePreposition = 'at',
  locale = 'en',
}) => {
  const dateButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFocused && dateButtonRef.current) {
      dateButtonRef.current.focus();
    }
  }, [isFocused]);

  const formatDate = (d: Dayjs, format: string) => {
    return d.locale(locale).format(format);
  };
  const handleDateClick = () => {
    if (!disabled && onDateClick) {
      onDateClick(date);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleDateClick();
    } else if (onKeyDown) {
      onKeyDown(event, date);
    }
  };

  const getDateColor = (theme: Theme) => {
    if (!isCurrentMonth) {
      return theme.palette.text.disabled;
    }
    if (isSelected) {
      return theme.palette.text.tertiary1;
    }
    return theme.palette.text.primary;
  };

  if (view === 'week') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minWidth: 0,
          height: '100%',
        }}
      >
        <Box
          sx={(theme) => {
            return {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: theme.spacing(0.75),
              padding: theme.spacing(0.75),
              height: theme.spacing(8.25),
              backgroundColor: theme.palette.background.default,
              borderBottom: `1px solid ${theme.palette.divider}`,
              borderRight: `1px solid ${theme.palette.divider}`,
            };
          }}
        >
          <Typography variant="body2" color="text.primary">
            {formatDate(date, dayAbbreviationFormat)}
          </Typography>
          <Box
            ref={dateButtonRef}
            sx={(theme) => {
              return {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: theme.spacing(3),
                height: theme.spacing(3),
                borderRadius: '50%',
                cursor: disabled ? 'default' : 'pointer',
                backgroundColor: isSelected ? theme.palette.primary.main : 'transparent',
                border: isToday && !isSelected ? `1px solid ${theme.palette.text.primary}` : 'none',
                color: isSelected ? theme.palette.common.white : theme.palette.text.primary,
                '&:hover': !disabled && !isSelected && {
                  backgroundColor: theme.palette.action.hover,
                },
                '&:focus-visible': {
                  outline: `1px solid ${theme.palette.action.focus}`,
                  outlineOffset: '3px',
                },
              };
            }}
            onClick={handleDateClick}
            onKeyDown={handleKeyDown}
            tabIndex={disabled ? -1 : 0}
            role="button"
            aria-label={formatDate(date, dateFormatLong)}
            aria-current={isToday ? 'date' : undefined}
            aria-pressed={isSelected}
            aria-disabled={disabled}
          >
            <Typography variant="body2">
              {formatDate(date, dayFormat)}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={(theme) => {
            return {
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing(0.5),
              padding: theme.spacing(0.75, 0.5),
              flex: 1,
              overflow: 'auto',
              backgroundColor: theme.palette.background.paper,
              borderRight: `1px solid ${theme.palette.divider}`,
            };
          }}
        >
          {items.map((item) => {
            return (
              <CalendarItem
                key={item.id}
                item={item}
                view={view}
                onClick={onItemClick}
                disabled={disabled}
                timePreposition={timePreposition}
              />
            );
          })}
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={(theme) => {
        return {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minWidth: 0,
          padding: '6px 4px',
          backgroundColor: theme.palette.background.paper,
          borderBottom: isLastRow ? 'none' : `1px solid ${theme.palette.divider}`,
          borderRight: `1px solid ${theme.palette.divider}`,
          overflow: 'hidden',
          '&:nth-of-type(7n)': {
            borderRight: 'none',
          },
        };
      }}
      role="gridcell"
      aria-label={formatDate(date, dateFormatLong)}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          padding: '4px 2px',
          width: '28px',
          height: '32px',
          flex: 'none',
        }}
      >
        <Box
          ref={dateButtonRef}
          sx={(theme) => {
            return {
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0px',
              isolation: 'isolate',
              width: '24px',
              height: '24px',
              border: isToday ? `1px solid ${theme.palette.text.primary}` : 'none',
              borderRadius: '100px',
              cursor: disabled ? 'default' : 'pointer',
              backgroundColor: isSelected ? theme.palette.primary.main : 'transparent',
              color: isSelected ? theme.palette.common.white : getDateColor(theme),
              position: 'relative',
              flex: 'none',
              '&:hover': !disabled && !isSelected && {
                backgroundColor: theme.palette.action.hover,
              },
              '&:focus-visible': {
                border: `2px solid ${theme.palette.primary.main}`,
                outline: 'none',
              },
              ...(!isToday && isSelected && {
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '4px',
                  height: '0px',
                  left: 'calc(50% - 2px)',
                  bottom: '4px',
                  border: `1px solid ${theme.palette.primary.main}`,
                  flex: 'none',
                  zIndex: 0,
                },
              }),
            };
          }}
          onClick={handleDateClick}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="button"
          aria-label={formatDate(date, dateFormatLong)}
          aria-current={isToday ? 'date' : undefined}
          aria-pressed={isSelected}
          aria-disabled={disabled}
        >
          <Typography
            variant="body2"
            sx={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '16px',
              flex: 'none',
              zIndex: 2,
            }}
          >
            {formatDate(date, dayFormat)}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={(theme) => {
          return {
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing(0.5),
            flex: 1,
            overflow: 'hidden',
            width: '100%',
          };
        }}
      >
        {items.map((item) => {
          return (
            <CalendarItem
              key={item.id}
              item={item}
              view={view}
              onClick={onItemClick}
              disabled={disabled}
              timePreposition={timePreposition}
            />
          );
        })}
      </Box>
    </Box>
  );
});

CalendarCell.displayName = 'CalendarCell';

export default CalendarCell;
