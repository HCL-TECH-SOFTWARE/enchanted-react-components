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
import React, { KeyboardEvent, useState, useCallback } from 'react';
import { DatePicker as MuiDatePicker, DatePickerProps as MuiDatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { SvgIconProps, Theme } from '@mui/material';
import { StaticDatePicker as MuiStaticDatePicker, StaticDatePickerProps as MuiStaticDatePickerProps } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { v4 as uuid } from 'uuid';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import DotMark from '@hcl-software/enchanted-icons/dist/carbon/es/dot-mark';
import IconCalendar from '@hcl-software/enchanted-icons/dist/carbon/es/calendar';
import CaretDownIcon from '@hcl-software/enchanted-icons/dist/carbon/es/caret--down';
import { svgIconClasses } from '@mui/material/SvgIcon';
import Paper from '../Paper';
import Badge, { badgeClasses } from '../Badge/Badge';
import { ActionProps } from '../prerequisite_components/InputLabelAndAction/InputLabelAndAction';
import TextField, { TextFieldProps } from '../TextField';

const DEFAULT_FORMAT: string = 'MM/DD/YYYY';

// Shared formatter used by both static and regular date picker variants — returns the day abbreviation unchanged
// eslint-why dayOfWeekFormatter receives different types across MUI versions and must accept any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dayOfWeekFormatter = (date: any) => {
  if (dayjs.isDayjs(date)) {
    return date.format('dd'); // or 'ddd' for 3-letter abbreviations ("Sun", "Mon")
  }
  return typeof date === 'string' ? date.slice(0, 2) : String(date);
};

// Number of year columns rendered in the year picker view.
// Used by handleYearPickerKeyDown to correct arrow-key navigation for the non-static DatePicker.
const YEARS_PER_ROW = 3;

export interface DatePickerProps<TDate extends Dayjs = Dayjs> extends Omit<MuiDatePickerProps<TDate>, 'slots' | 'slotProps'> {
  label?: string;
  helperText?: string;
  enableHelpHoverEffect?: boolean,
  helperIconTooltip?: string;
  format?: string,
  margin?: 'none' | 'dense';
  color?: 'primary';
  size?: 'medium';
  unitLabel?: string;
  required?: boolean;
  disabled?: boolean;
  hiddenLabel?: boolean;
  nonEdit?: boolean;
  error?: boolean;
  fullWidth?: boolean,
  actionProps?: ActionProps[];
  customStyles?: React.CSSProperties | {[key:string] : React.CSSProperties };
  customIcon?: React.ComponentType<SvgIconProps> | undefined;
  /**
   * If true, renders a static date picker without input field. Useful for embedded calendar views
   */
  staticMode?: boolean;
}

type CustomPickersDayOwnProps = {
  isStaticMode?: boolean;
  // eslint-why onStaticChange callback value and context are opaque MUI internal types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onStaticChange?: ((value: any, context: any) => void) | null;
};

// Module-level day component for v7 slots API — wraps PickersDay with a Badge dot for today
// eslint-why PickersDayProps generic TDate is unknown at module level; any is required here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomPickersDay = (props: PickersDayProps<any> & CustomPickersDayOwnProps) => {
  const {
    day, isStaticMode, onStaticChange, ...dayProps
  } = props;

  const handleDayClick = () => {
    if (isStaticMode && dayProps.selected && onStaticChange) {
      onStaticChange(day, {});
    }
  };

  return (
    <Badge
      key={(day as unknown as Date).toString()}
      overlap="circular"
      variant="standard"
      color={
        (dayProps.today && dayProps.selected) ? 'default' : 'primary'
      }
      badgeContent={
        dayProps.today ? <DotMark fontSize="small" /> : undefined
      }
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      sx={{
        [`& .${badgeClasses.badge}`]: {
          right: '50%',
          padding: '1px',
          width: '4px',
          height: '1px',
          borderRadius: 'unset',
          minWidth: '0px',
          top: '70%',
          [`& .${svgIconClasses.root}`]: {
            ...(dayProps.today && dayProps.selected) && {
              fill: 'common.white',
              width: '2px',
              height: '2px',
            },
            ...!(dayProps.today && dayProps.selected) && {
              fill: 'none',
              width: '1px',
              height: '1px',
            },
            fontSize: '1px',
          },
        },
      }}
    >
      <PickersDay day={day} {...dayProps} {...(isStaticMode && { onClick: handleDayClick })} />
    </Badge>
  );
};

const getDatePickerStyle = (theme: Theme, customStyles: React.CSSProperties | { [key: string]: React.CSSProperties }, staticMode?: boolean) => {
  return {
    ...theme.typography.body2,
    margin: staticMode ? '0px' : '6px 0px 0px -8px',
    padding: '0px',
    height: 'auto',
    width: '228px',
    color: `1px solid ${theme.palette.background.paper}`,
    boxShadow: 1,
    '& .MuiDateCalendar-root': {
      width: '228px',
      margin: '0px',
      height: 'auto',
      overflowY: 'hidden',
      flexGrow: 1,
    },
    '& .MuiYearCalendar-root': {
      maxHeight: '168px',
      overflowY: 'auto',
    },
    // Assumes year view displays 3 years across.
    // Requires `displayStaticWrapperAs: 'mobile'` to set
    // `yearsInRow = 3` for arrow key navigation.
    '& .MuiPickersYear-root': {
      flexBasis: '33.33%',
    },
    '& .MuiPickersYear-yearButton': {
      width: '100%',
      maxWidth: 'unset',
    },
    '& .MuiTouchRipple-root': {
      color: 'transparent',
      width: '228px',
    },
    '& .MuiPickersCalendarHeader-label': {
      marginRight: '0px',
      ...theme.typography.subtitle2,
    },
    '& .MuiPickersCalendarHeader-root': {
      padding: '24px 13px',
      margin: '4px',
      width: 'auto',
    },
    '& .MuiPickersPopper-paper, & .MuiDateCalendar-viewTransitionContainer': {
      padding: '0px',
      margin: '0px',
      width: '228px',
    },
    '& .MuiPickersArrowSwitcher-spacer': {
      width: '4px',
    },
    '& .MuiDayCalendar-weekContainer': {
      margin: '0px',
      width: '228px',
    },
    '& .MuiDayCalendar-weekDayLabel': {
      ...theme.typography.body2,
      color: theme.palette.text.secondary,
      margin: '4px 2px',
      width: '24px',
      padding: '0px',
      height: '16px',
      lineHeight: '16px',
      overflow: 'hidden',
    },
    '& .MuiDateCalendar-viewTransitionContainer': {
      width: '228px',
    },
    '& .MuiPickersLayout-root': {
      minWidth: '228px',
    },
    '& .MuiDayCalendar-header': {
      ...theme.typography.body1,
      width: '228px',

    },
    '& .MuiIconButton-root': {
      [`& .${svgIconClasses.root}`]: {
        padding: '0px',
        width: '16px',
        height: '16px',
        border: 'none',
      },
    },
    '& .MuiDayCalendar-monthContainer': {
      height: 'auto',
      position: 'inherit',
      width: '228px',
    },
    '& .MuiPickersDay-root': {
      border: 'none',
      height: '24px',
      width: '24px',
      radius: '64px',
      margin: '4px 2px',
      ...theme.typography.body2,
      '&.MuiPickersDay-today': {
        border: 'none',
        position: 'relative',
      },
      '&.MuiPickersDay-dayOutsideMonth': {
        color: theme.palette.text.disabled,
      },
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
      '&:focus-visible': {
        backgroundColor: 'transparent',
        border: 'none',
        outline: `1px solid ${theme.palette.action.focus}`,
        outlineOffset: '3px',
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
          border: 'none',
          outline: `1px solid ${theme.palette.action.focus}`,
          outlineOffset: '3px',
        },
      },
      '&.Mui-selected': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.tertiary1,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
        '&:focus-visible': {
          backgroundColor: theme.palette.primary.main,
          border: 'none',
          outline: `1px solid ${theme.palette.action.focus}`,
          outlineOffset: '3px',
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        },
      },
    },
    '& .MuiDayCalendar-slideTransition': {
      height: 'auto',
      minHeight: '140px',
      position: 'inherit',
    },
    '& .MuiDialogActions-root': {
      display: '-webkit-box',
      padding: '12px 0px',
      justifyContent: 'center',
      borderTop: 'none',
    },
    '& .MuiPickersArrowSwitcher-button': {
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
    ...customStyles,
  };
};

/**
 * Default prop values for DatePicker.
 * Exported for use in Storybook argTypes and story args.
 */
export const DatePickerDefaults = {
  margin: 'none' as const,
  color: 'primary' as const,
  size: 'medium' as const,
  label: '',
  helperText: '',
  enableHelpHoverEffect: false,
  helperIconTooltip: '',
  format: DEFAULT_FORMAT,
  unitLabel: '',
  required: false,
  disabled: false,
  fullWidth: false,
  hiddenLabel: false,
  nonEdit: false,
  showDaysOutsideCurrentMonth: true,
  error: false,
  staticMode: false,
};

const DatePicker = <TDate extends Dayjs = Dayjs>({
  customStyles = {},
  staticMode = false,
  margin = 'none',
  color = 'primary',
  size = 'medium',
  label = '',
  helperText = '',
  enableHelpHoverEffect = false,
  helperIconTooltip = '',
  format = DEFAULT_FORMAT,
  unitLabel = '',
  required = false,
  disabled = false,
  fullWidth = false,
  hiddenLabel = false,
  nonEdit = false,
  error = false,
  actionProps,
  customIcon,
  value,
  onViewChange,
  onAccept,
  ...muiProps
}: DatePickerProps<TDate>) => {
  const popperId = uuid();
  // Controls the active view of StaticDatePicker. Resets to 'day' on Today click since
  // MUI v5 StaticDatePicker does not reset the view automatically.
  const [staticView, setStaticView] = useState<'day' | 'month' | 'year'>('day');

  const handleOnKeyDownLeft = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      const element = event.target as HTMLButtonElement;
      if (element.nextElementSibling?.nextElementSibling) {
        (element.nextElementSibling.nextElementSibling as HTMLButtonElement).focus();
      }
    }
  };

  const handleOnKeyDownRight = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      const element = event.target as HTMLButtonElement;
      if (element.previousElementSibling?.previousElementSibling) {
        (element.previousElementSibling.previousElementSibling as HTMLButtonElement).focus();
      }
    }
  };

  const handleStaticViewChange = useCallback((newView: 'day' | 'month' | 'year') => {
    setStaticView(newView);
    onViewChange?.(newView);
  }, [onViewChange]);

  // Today button fires onAccept — reset to 'day' view so the calendar returns from year/month view.
  // eslint-why handleStaticAccept context parameter is an opaque MUI internal type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleStaticAccept = useCallback((acceptedValue: TDate | null, context?: any) => {
    setStaticView('day');
    onAccept?.(acceptedValue, context);
  }, [onAccept]);

  /**
   * Corrects Up/Down arrow key navigation in the year picker for the non-static DatePicker.
   * Our CSS renders 3 columns but MUI desktop mode may use a different default.
   * This intercepts the event before MUI handles it and manually moves focus by 3.
   */
  const handleYearPickerKeyDown = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement;
    if (!target.classList.contains('MuiPickersYear-yearButton')) return;
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;

    event.preventDefault();
    event.stopPropagation();

    const yearButtons = Array.from(
      document.querySelectorAll<HTMLElement>('.MuiPickersYear-yearButton:not([disabled])'),
    );
    const currentIndex = yearButtons.indexOf(target);
    if (currentIndex === -1) return;

    const nextIndex = event.key === 'ArrowDown' ? currentIndex + YEARS_PER_ROW : currentIndex - YEARS_PER_ROW;
    if (nextIndex >= 0 && nextIndex < yearButtons.length) {
      yearButtons[nextIndex].focus();
    }
  };

  const focusDialog = () => {
    window.requestAnimationFrame(() => {
      const dialog = document.querySelector(`#datepickerPopper-${popperId}`) ?? document.querySelector('.MuiPickersPopper-root');
      if (dialog) {
        const focusableElement = dialog.querySelector('button, [tabindex]:not([tabindex="-1"])');
        if (focusableElement instanceof window.HTMLElement) {
          focusableElement.focus();
        } else if (dialog instanceof window.HTMLElement) {
          dialog.focus();
        }
      }
    });
  };

  // Compute field error state based on the current date value
  let hasError = false;
  if (value !== null && value !== undefined) {
    const day = value as unknown as Dayjs;
    if (!Number.isNaN(day.day()) && !Number.isNaN(day.month()) && !Number.isNaN(day.year())) {
      hasError = !dayjs(day, format, true).isValid();
    }
  }

  // Text field slot props for the non-static DatePicker
  const textFieldSlotProps: TextFieldProps = {
    label,
    helperText,
    enableHelpHoverEffect,
    helperIconTooltip,
    required,
    disabled,
    margin,
    color,
    size,
    autoComplete: 'off',
    error: error || hasError,
    fullWidth,
    unitLabel,
    hiddenLabel,
    nonEdit,
    // value: value !== null && value !== undefined ? `${formatValue(value as unknown as Dayjs, format || DEFAULT_FORMAT)}` : '',
    actionProps,
    inputProps: { placeholder: format },
    customIcon,
  };

  const arrowIconButtonSlotProps = {
    previousIconButton: { size: 'small' as const, onKeyDown: handleOnKeyDownLeft },
    nextIconButton: { size: 'small' as const, onKeyDown: handleOnKeyDownRight },
  };

  const calendarHeaderIconButtonSlotProps = {
    switchViewButton: { size: 'small' as const },
    ...arrowIconButtonSlotProps,
  };

  // Static mode - render calendar without input field
  if (staticMode) {
    return (
      <Paper
        variant="elevation"
        sx={(theme) => { return getDatePickerStyle(theme, customStyles, true); }}
      >
        {/* eslint-why muiProps is the full DatePicker props object cast through unknown for StaticDatePicker compatibility */}
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <MuiStaticDatePicker
          {...muiProps as unknown as MuiStaticDatePickerProps<TDate>}
          disabled={disabled}
          value={value}
          // view is forwarded to the internal DateCalendar but not typed on StaticDatePickerProps.
          {...{ view: staticView } as object}
          onViewChange={handleStaticViewChange}
          onAccept={handleStaticAccept as MuiStaticDatePickerProps<TDate>['onAccept']}
          // closeOnSelect={false}
          reduceAnimations
          dayOfWeekFormatter={dayOfWeekFormatter}
          slots={{
            switchViewIcon: CaretDownIcon,
            day: CustomPickersDay,
          }}
          slotProps={{
            actionBar: { actions: ['today'] },
            ...calendarHeaderIconButtonSlotProps,
            toolbar: { hidden: true },
            day: {
              isStaticMode: staticMode,
              onStaticChange: muiProps?.onChange,
              // eslint-why MUI slotProps day type doesn't include custom isStaticMode/onStaticChange props
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any,
          }}
        />
      </Paper>
    );
  }

  // Render regular DatePicker with input field
  return (
    <MuiDatePicker
      {...muiProps}
      disabled={disabled}
      value={value}
      format={format || DEFAULT_FORMAT}
      reduceAnimations
      autoFocus={false}
      onOpen={focusDialog}
      dayOfWeekFormatter={dayOfWeekFormatter}
      sx={{
        width: fullWidth ? '100%' : '240px',
      }}
      slots={{
        openPickerIcon: IconCalendar,
        switchViewIcon: CaretDownIcon,
        textField: TextField,
        day: CustomPickersDay,
      }}
      slotProps={{
        textField: textFieldSlotProps as object,
        popper: {
          placement: 'bottom-start',
          id: `datepickerPopper-${popperId}`,
        },
        desktopPaper: {
          sx: (theme: Theme) => { return getDatePickerStyle(theme, customStyles); },
          onKeyDownCapture: handleYearPickerKeyDown,
        },
        actionBar: { actions: ['today'] },
        openPickerButton: { size: 'small' },
        ...calendarHeaderIconButtonSlotProps,
        day: {
          isStaticMode: false,
          onStaticChange: null,
          // eslint-why MUI slotProps day type doesn't include custom isStaticMode/onStaticChange props
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
      }}
    />
  );
};

export * from '@mui/x-date-pickers/DatePicker';
export default DatePicker;
