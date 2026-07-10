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
import React, { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Box } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import Calendar from './Calendar';
import { CalendarItem } from './types';

export default {
  title: 'Data Display/Calendar',
  component: Calendar,
  argTypes: {
    view: {
      if: { arg: 'interactive' },
      description: 'Calendar view mode. Controls whether the calendar displays a full month grid or a single week view.',
      options: ['month', 'week'],
      control: { type: 'radio' },
      table: {
        defaultValue: { summary: 'month' },
      },
    },
    showWeekend: {
      if: { arg: 'interactive' },
      description: 'If true, weekend days (Saturday and Sunday) are displayed in the calendar. When false, only weekdays (Monday-Friday) are shown.',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: true },
      },
    },
    disabled: {
      if: { arg: 'interactive' },
      description: 'If true, disables all user interactions including navigation, date selection, and item clicks.',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: false },
      },
    },
    responsive: {
      if: { arg: 'interactive' },
      description: 'If true, enables responsive layout that adapts to container width. When false, uses fixed dimensions.',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: false },
      },
    },
    locale: {
      if: { arg: 'interactive' },
      description: 'Locale string for date formatting (e.g., "en", "fr", "de"). Affects day names and date display format.',
      control: { type: 'select' },
      options: ['en', 'fr', 'de', 'es', 'it', 'ja', 'zh', 'pt', 'ru', 'ar'],
      table: {
        defaultValue: { summary: 'en' },
      },
    },
    width: {
      if: { arg: 'interactive' },
      description: 'Custom width for the calendar. Can be a number (pixels) or string (e.g., "100%", "500px").',
      control: { type: 'text' },
      table: {
        defaultValue: { summary: '841px (or 100% if responsive)' },
      },
    },
    height: {
      if: { arg: 'interactive' },
      description: 'Custom height for the calendar. Can be a number (pixels) or string (e.g., "auto", "600px").',
      control: { type: 'text' },
      table: {
        defaultValue: { summary: '805px (or auto if responsive)' },
      },
    },
    weekStartsOn: {
      if: { arg: 'interactive' },
      description: 'Defines which day the week starts on. 0 = Sunday, 1 = Monday.',
      control: { type: 'radio' },
      options: [0, 1],
      table: {
        defaultValue: { summary: 1 },
      },
    },
    showItems: {
      if: { arg: 'interactive' },
      description: 'Toggle to show or hide calendar items in the interactive example.',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: true },
      },
    },
    items: {
      description: 'Array of calendar items to display. Each item must have id, title, date, color, and variant properties.',
      table: { disable: true },
    },
    currentDate: {
      description: 'The currently displayed date. Can be a Date object or Dayjs instance. Controls which month/week is shown.',
      table: { disable: true },
    },
    onDateChange: {
      description: 'Callback fired when a date is selected or navigation occurs. Receives the new Dayjs date as parameter.',
      table: { disable: true },
    },
    onItemClick: {
      description: 'Callback fired when a calendar item is clicked. Receives the clicked CalendarItem as parameter.',
      table: { disable: true },
    },
    onNavigate: {
      description: "Callback fired when navigating between months/weeks. Receives direction ('prev' or 'next') as parameter.",
      table: { disable: true },
    },
    labels: {
      if: { arg: 'interactive' },
      description: 'Custom labels for accessibility and localization. Includes weekday names, date formats, and time preposition. '
        + 'Example: { calendar: "Calendar", weekdaysShort: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], '
        + 'dateFormat: "MMMM YYYY", dateFormatLong: "MMMM D, YYYY", timePreposition: "at", dayFormat: "D", dayAbbreviationFormat: "ddd" }',
      control: { type: 'object' },
      table: {
        defaultValue: {
          summary: '{ calendar: "Calendar", weekdaysShort: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], dateFormat: "MMMM YYYY", ... }',
        },
      },
    },
    customStyles: {
      description: 'Custom CSS styles to apply to the calendar container. Can be a CSSProperties object or nested style object.',
      table: { disable: true },
    },
  },
} as Meta<typeof Calendar>;

const generateSampleItems = (baseDate: Dayjs): CalendarItem[] => {
  const items: CalendarItem[] = [];
  const colors: CalendarItem['color'][] = ['neutral', 'red', 'orange', 'blue', 'green'];

  for (let i = 0; i < 30; i += 1) {
    const date = baseDate.add(Math.floor(Math.random() * 30) - 15, 'day');
    const colorIndex = Math.floor(Math.random() * colors.length);
    const hasTime = Math.random() > 0.5;

    items.push({
      id: `item-${i}`,
      title: `${Math.floor(Math.random() * 20)} ${['Expire pending', 'Publish pending', 'Review needed', 'Draft saved'][Math.floor(Math.random() * 4)]}`,
      date: date.toDate(),
      time: hasTime ? `${Math.floor(Math.random() * 12) + 1}:${['00', '15', '30', '45'][Math.floor(Math.random() * 4)]} ${Math.random() > 0.5 ? 'AM' : 'PM'}` : undefined,
      color: colors[colorIndex],
      variant: Math.random() > 0.5 ? 'block' : 'text',
    });
  }

  return items;
};

interface ExtendedCalendarArgs {
  interactive?: boolean;
  view?: 'month' | 'week';
  showWeekend?: boolean;
  disabled?: boolean;
  responsive?: boolean;
  locale?: string;
  width?: string | number;
  height?: string | number;
  showItems?: boolean;
}

const InteractiveTemplate: StoryFn<ExtendedCalendarArgs> = (args) => {
  const {
    view = 'month',
    showWeekend = true,
    disabled = false,
    responsive = false,
    locale = 'en',
    width,
    height,
    showItems = true,
  } = args;
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [items] = useState<CalendarItem[]>(() => { return generateSampleItems(dayjs()); });
  const displayItems = showItems ? items : [];

  return (
    <Calendar
      view={view}
      showWeekend={showWeekend}
      disabled={disabled}
      responsive={responsive}
      locale={locale}
      width={width}
      height={height}
      currentDate={currentDate}
      items={displayItems}
      onDateChange={(date) => {
        setCurrentDate(date);
      }}
    />
  );
};

export const InteractiveExample = {
  render: InteractiveTemplate,
  args: {
    interactive: true,
    view: 'month',
    showWeekend: true,
    disabled: false,
    responsive: false,
    locale: 'en',
    width: undefined,
    height: undefined,
    showItems: true,
  },
};

const VisualTestTemplate: StoryFn<object> = () => {
  const baseDate = dayjs();

  const monthItems: CalendarItem[] = [
    {
      id: '1',
      title: 'Neutral item',
      date: baseDate.add(1, 'day').toDate(),
      color: 'neutral',
      variant: 'text',
    },
    {
      id: '2',
      title: 'Red item',
      date: baseDate.add(2, 'day').toDate(),
      color: 'red',
      variant: 'text',
    },
    {
      id: '3',
      title: 'Orange item',
      date: baseDate.add(3, 'day').toDate(),
      color: 'orange',
      variant: 'text',
    },
    {
      id: '4',
      title: 'Blue item',
      date: baseDate.add(4, 'day').toDate(),
      color: 'blue',
      variant: 'text',
    },
    {
      id: '5',
      title: 'Green item',
      date: baseDate.add(5, 'day').toDate(),
      color: 'green',
      variant: 'text',
    },
  ];

  const weekItems: CalendarItem[] = [
    {
      id: '1',
      title: 'Morning Meeting',
      date: baseDate.toDate(),
      time: '9:00 AM',
      color: 'blue',
      variant: 'block',
    },
    {
      id: '2',
      title: 'Lunch Break',
      date: baseDate.toDate(),
      time: '12:00 PM',
      color: 'green',
      variant: 'block',
    },
    {
      id: '3',
      title: 'Project Review',
      date: baseDate.add(1, 'day').toDate(),
      time: '2:00 PM',
      color: 'orange',
      variant: 'block',
    },
    {
      id: '4',
      title: 'Team Standup',
      date: baseDate.add(2, 'day').toDate(),
      time: '10:00 AM',
      color: 'blue',
      variant: 'block',
    },
    {
      id: '5',
      title: 'Deadline',
      date: baseDate.add(3, 'day').toDate(),
      time: '5:00 PM',
      color: 'red',
      variant: 'block',
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        p: 2,
      }}
    >
      <Box>
        <Box sx={{ mb: 1, typography: 'caption', color: 'text.secondary' }}>
          View=Month · ShowWeekend=True · Disabled=False
        </Box>
        <Calendar
          view="month"
          currentDate={baseDate}
          items={monthItems}
          showWeekend
        />
      </Box>

      <Box>
        <Box sx={{ mb: 1, typography: 'caption', color: 'text.secondary' }}>
          View=Week · ShowWeekend=True · Disabled=False
        </Box>
        <Calendar
          view="week"
          currentDate={baseDate}
          items={weekItems}
          showWeekend
        />
      </Box>

      <Box>
        <Box sx={{ mb: 1, typography: 'caption', color: 'text.secondary' }}>
          View=Week · ShowWeekend=False · Disabled=False
        </Box>
        <Calendar
          view="week"
          currentDate={baseDate}
          items={weekItems}
          showWeekend={false}
        />
      </Box>

      <Box>
        <Box sx={{ mb: 1, typography: 'caption', color: 'text.secondary' }}>
          View=Month · Disabled=True
        </Box>
        <Calendar
          view="month"
          currentDate={baseDate}
          items={monthItems}
          disabled
        />
      </Box>
    </Box>
  );
};

export const VisualTest = VisualTestTemplate.bind({});
VisualTest.parameters = { controls: { disable: true } };
