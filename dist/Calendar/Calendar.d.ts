import React from 'react';
import { Dayjs } from 'dayjs';
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
    customStyles?: React.CSSProperties | {
        [key: string]: React.CSSProperties;
    };
    labels?: CalendarLabels;
    width?: string | number;
    height?: string | number;
    responsive?: boolean;
    weekStartsOn?: 0 | 1;
}
declare const Calendar: ({ view, items, currentDate, onDateChange, onItemClick, onNavigate, showWeekend, locale, disabled, customStyles, labels, width, height, responsive, weekStartsOn, }: CalendarProps) => React.JSX.Element;
export default Calendar;
