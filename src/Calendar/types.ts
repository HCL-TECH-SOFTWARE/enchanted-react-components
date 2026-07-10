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
import { Dayjs } from 'dayjs';

export type CalendarView = 'month' | 'week';

export type CalendarItemColor = 'neutral' | 'red' | 'orange' | 'blue' | 'green';

export type CalendarItemVariant = 'block' | 'text';

export interface CalendarItem {
  id: string;
  title: string;
  date: Date | Dayjs;
  time?: string;
  color: CalendarItemColor;
  variant: CalendarItemVariant;
  onClick?: (item: CalendarItem) => void;
}

export interface CalendarItemColors {
  iconBackground: string;
  background: string;
  border: string;
  text: string;
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
