import { Dayjs } from 'dayjs';
export type CalendarView = 'month' | 'week';
export type CalendarItemColor = 'neutral' | 'red' | 'orange' | 'blue' | 'green';
export type CalendarItemVariant = 'block' | 'text';
export interface CalendarItemColors {
    iconBackground: string;
    background: string;
    border: string;
    text: string;
}
export interface CalendarItem {
    id: string;
    title: string;
    date: Date | Dayjs;
    time?: string;
    color: CalendarItemColor;
    variant: CalendarItemVariant;
    onClick?: (item: CalendarItem) => void;
    customColors?: CalendarItemColors;
}
export interface CalendarLabels {
    calendar?: string;
    weekdays?: string[];
    weekdaysShort?: string[];
    dateFormat?: string;
    dateFormatLong?: string;
    timePreposition?: string;
    dayFormat?: string;
    dayAbbreviationFormat?: string;
    weekRangeFormat?: string;
    weekRangeEndFormat?: string;
}
