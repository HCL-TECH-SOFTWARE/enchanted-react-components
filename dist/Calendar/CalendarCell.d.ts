import React, { KeyboardEvent } from 'react';
import { Dayjs } from 'dayjs';
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
declare const CalendarCell: React.FC<CalendarCellProps>;
export default CalendarCell;
