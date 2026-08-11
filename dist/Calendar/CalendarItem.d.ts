import React from 'react';
import { CalendarItem as CalendarItemType, CalendarView } from './types';
interface CalendarItemProps {
    item: CalendarItemType;
    view: CalendarView;
    onClick?: (item: CalendarItemType) => void;
    disabled?: boolean;
    timePreposition?: string;
}
declare const CalendarItem: React.FC<CalendarItemProps>;
export default CalendarItem;
