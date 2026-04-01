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
import React, { KeyboardEvent } from 'react';
import { DatePicker as MuiDatePicker, DatePickerProps as MuiDatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { SvgIconProps, Theme } from '@mui/material';
import { StaticDatePicker as MuiStaticDatePicker, StaticDatePickerProps as MuiStaticDatePickerProps } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { v4 as uuid } from 'uuid';
import { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import DotMark from '@hcl-software/enchanted-icons/dist/carbon/es/dot-mark';
import IconCalendar from '@hcl-software/enchanted-icons/dist/carbon/es/calendar';
import CaretDownIcon from '@hcl-software/enchanted-icons/dist/carbon/es/caret--down';
import Paper from '../Paper';
import Badge from '../Badge/Badge';
import { ActionProps } from '../prerequisite_components/InputLabelAndAction/InputLabelAndAction';
import TextField, { TextFieldProps } from '../TextField';

const DEFAULT_FORMAT: string = 'MM/DD/YYYY';

// Shared formatter used by both static and regular date picker variants
const dayOfWeekFormatter = (day: string) => { return day; };

// Display mode for the static date picker
const staticWrapperAs = 'desktop' as const;

// Reduce animations for both static and regular date picker variants
const shouldReduceAnimations = true;

export interface DatePickerProps<TInputDate, TDate> extends Omit<MuiDatePickerProps<TInputDate, TDate>, 'renderInput'> {
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

const getDatePickerStyle = (theme: Theme, customStyles: React.CSSProperties | { [key: string]: React.CSSProperties }, staticMode?: boolean) => {
  return {
    ...theme.typography.body2,
    margin: staticMode ? '0px' : '6px 0px 0px -8px',
    padding: '0px',
    height: 'auto',
    width: '228px',
    color: `1px solid ${theme.palette.background.paper}`,
    boxShadow: theme.shadows[1],
    '& .MuiPickerStaticWrapper-content': {
      minWidth: 'unset',
    },
    '& .MuiCalendarPicker-root': {
      width: '228px',
      margin: '0px',
      height: 'auto',
      overflowY: 'hidden',
      flexGrow: 1,
    },
    '& .MuiYearPicker-root': {
      maxHeight: '168px',
      overflowY: 'auto',
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
    '& .MuiPaper-root-MuiPickersPopper-paper .MuiCalendarPicker-viewTransitionContainer': {
      padding: '0px',
      margin: '0px',
      width: '228px',
    },
    '& .MuiPickersArrowSwitcher-spacer': {
      width: '4px',
    },
    '& .MuiDayPicker-weekContainer': {
      margin: '0px',
      width: '228px',
    },
    '& .MuiDayPicker-weekDayLabel': {
      ...theme.typography.body2,
      color: theme.palette.text.secondary,
      margin: '4px 2px',
      width: '24px',
      padding: '0px',
      height: '16px',
    },
    '& .MuiCalendarPicker-viewTransitionContainer': {
      width: '228px',
    },
    '& .MuiDayPicker-header': {
      ...theme.typography.body1,
      width: '228px',

    },
    '& .MuiIconButton-root': {
      '& .MuiSvgIcon-root': {
        padding: '0px',
        width: '16px',
        height: '16px',
        border: 'none',
      },
    },
    '& .MuiDayPicker-monthContainer': {
      height: 'auto',
      position: 'inherit',
      width: '228px',
    },
    '& .PrivatePickersSlideTransition-root MuiDayPicker-slideTransition': {
      position: 'inherit',
      width: '228px',
      margin: '4px 16px',
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
    '& .MuiDayPicker-slideTransition': {
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

const DatePicker = <TInputDate, TDate>({
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
  showDaysOutsideCurrentMonth = true,
  error = false,
  ...rest
}: DatePickerProps<TInputDate, TDate>) => {
  // Reconstruct full props for spreading to MUI components and internal access
  const props: DatePickerProps<TInputDate, TDate> = {
    customStyles,
    staticMode,
    margin,
    color,
    size,
    label,
    helperText,
    enableHelpHoverEffect,
    helperIconTooltip,
    format,
    unitLabel,
    required,
    disabled,
    fullWidth,
    hiddenLabel,
    nonEdit,
    showDaysOutsideCurrentMonth,
    error,
    ...rest,
  };
  const popperId = uuid();

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

  const formatValue = (value: Dayjs, dateFormat: string): string => {
    return value.format(dateFormat);
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

  const getTextFieldProps = (muiTextFieldProps: MuiTextFieldProps) => {
    let hasError = false;
    if (props.value !== null) {
      const day = props.value as unknown as Dayjs;
      if (!Number.isNaN(day.day()) && !Number.isNaN(day.month()) && !Number.isNaN(day.year())) {
        const valid = dayjs(day, props.format, true).isValid();
        hasError = !valid;
      }
    }
    const textFieldProps: TextFieldProps = {
      ...muiTextFieldProps as TextFieldProps,
      inputRef: muiTextFieldProps.inputRef,
      label: props.label,
      helperText: props.helperText,
      enableHelpHoverEffect: props.enableHelpHoverEffect,
      helperIconTooltip: props.helperIconTooltip,
      required: props.required,
      disabled: props.disabled,
      margin: props.margin,
      color: props.color,
      size: props.size,
      autoComplete: 'off',
      error: props.error || hasError,
      fullWidth: props.fullWidth,
      unitLabel: props.unitLabel,
      hiddenLabel: props.hiddenLabel,
      nonEdit: props.nonEdit,
      value: props.value !== null ? `${formatValue(props.value as unknown as Dayjs, props.format || DEFAULT_FORMAT)}` : '',
      actionProps: props.actionProps,
      InputProps: {
        ...muiTextFieldProps.InputProps,
      },
      inputProps: {
        ...muiTextFieldProps.inputProps,
        placeholder: props.format,
      },
      customIcon: props.customIcon,
    };
    return textFieldProps;
  };

  const renderDay = (day: TDate, _value: TDate[], DayComponentProps: PickersDayProps<TDate>) => {
    return (
      <Badge
        key={(day as unknown as Date).toString()}
        overlap="circular"
        variant="standard"
        color={
          (DayComponentProps.today && DayComponentProps.selected) ? 'default' : 'primary'
        }
        badgeContent={
          DayComponentProps.today ? <DotMark fontSize="small" /> : undefined
        }
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiBadge-badge': {
            right: '50%',
            padding: '1px',
            width: '4px',
            height: '1px',
            borderRadius: 'unset',
            minWidth: '0px',
            top: '70%',
            '& .MuiSvgIcon-root': {
              ...(DayComponentProps.today && DayComponentProps.selected) && {
                fill: (theme: Theme) => { return theme.palette.common.white; },
                width: '2px',
                height: '2px',
              },
              ...!(DayComponentProps.today && DayComponentProps.selected) && {
                fill: 'none',
                width: '1px',
                height: '1px',
              },
              fontSize: '1px',
            },
          },
        }}
      >
        <PickersDay {...DayComponentProps} />
      </Badge>
    );
  };
  // Static mode - render calendar without input field
  if (staticMode) {
    return (
      <Paper
        variant="elevation"
        sx={(theme) => { return getDatePickerStyle(theme, customStyles, true); }}
      >
        <MuiStaticDatePicker
          {...props as unknown as MuiStaticDatePickerProps<TInputDate, TDate>}
          displayStaticWrapperAs={staticWrapperAs}
          reduceAnimations={shouldReduceAnimations}
          dayOfWeekFormatter={dayOfWeekFormatter}
          componentsProps={{
            actionBar: { actions: ['today'] },
            leftArrowButton: { onKeyDown: handleOnKeyDownLeft },
            rightArrowButton: { onKeyDown: handleOnKeyDownRight },
          }}
          components={{
            SwitchViewIcon: CaretDownIcon,
          }}
          renderDay={renderDay}
          renderInput={(_params: MuiTextFieldProps) => { return <span />; }}
        />
      </Paper>
    );
  }

  // Render regular DatePicker with input field
  return (
    <MuiDatePicker
      {...props}
      reduceAnimations={shouldReduceAnimations}
      autoFocus={false}
      onOpen={focusDialog}
      dayOfWeekFormatter={dayOfWeekFormatter}
      PaperProps={{
        sx: (theme) => { return getDatePickerStyle(theme, customStyles); },
      }}
      PopperProps={{
        placement: 'bottom-start',
        id: `datepickerPopper-${popperId}`,
      }}
      componentsProps={{
        actionBar: { actions: ['today'] },
        leftArrowButton: { onKeyDown: handleOnKeyDownLeft },
        rightArrowButton: { onKeyDown: handleOnKeyDownRight },
      }}
      components={{
        OpenPickerIcon: IconCalendar,
        SwitchViewIcon: CaretDownIcon,
      }}
      renderInput={(params: MuiTextFieldProps) => {
        const textFieldProps: TextFieldProps = getTextFieldProps(params);
        return (
          <TextField {...textFieldProps} />
        );
      }}
      renderDay={renderDay}
    />
  );
};

export * from '@mui/x-date-pickers/DatePicker';
export default DatePicker;
