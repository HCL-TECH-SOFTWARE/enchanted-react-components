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
import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { TimePicker as MuiTimePicker, TimePickerProps as MuiTimePickerProps } from '@mui/x-date-pickers/TimePicker';
import { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import TextField, { TextFieldProps } from '../../TextField';
import { ActionProps } from '../../prerequisite_components/InputLabelAndAction/InputLabelAndAction';

export interface TimePickerProps<TInputDate, TDate> extends Omit<MuiTimePickerProps<TInputDate, TDate>, 'renderInput'> {
  label?: string;
  helperText?: string;
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
}

const DEFAULT_FORMAT: string = 'hh:mm';

const TimePicker = <TInputDate, TDate>({ ...props }: TimePickerProps<TInputDate, TDate>) => {
  const formatValue = (value: Dayjs, format: string): string => {
    return value.format(format);
  };

  const getTextFieldProps = (muiTextFieldProps: MuiTextFieldProps) => {
    let error = false;
    if (props.value !== null) {
      const day = props.value as unknown as Dayjs;
      if (!Number.isNaN(day.day()) && !Number.isNaN(day.month()) && !Number.isNaN(day.year())) {
        const valid = dayjs(day, props.format, true).isValid();
        error = !valid;
      }
    }
    const textFieldProps: TextFieldProps = {
      ...muiTextFieldProps as TextFieldProps,
      inputRef: muiTextFieldProps.inputRef,
      label: props.label,
      helperText: props.helperText,
      helperIconTooltip: props.helperIconTooltip,
      required: props.required,
      disabled: props.disabled,
      margin: props.margin,
      color: props.color,
      size: props.size,
      autoComplete: 'off',
      error: props.error || error,
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
    };
    return textFieldProps;
  };

  return (
    <MuiTimePicker
      {...props}
      renderInput={(params: MuiTextFieldProps) => {
        const textFieldProps: TextFieldProps = getTextFieldProps(params);
        return (
          <TextField {...textFieldProps} />
        );
      }}
    />
  );
};

TimePicker.defaultProps = {
  margin: 'none',
  color: 'primary',
  size: 'medium',
  label: '',
  helperText: '',
  helperIconTooltip: '',
  format: DEFAULT_FORMAT,
  unitLabel: '',
  required: false,
  disabled: false,
  fullWidth: false,
  hiddenLabel: false,
  nonEdit: false,
  error: false,
};

export * from '@mui/x-date-pickers/TimePicker';
export default TimePicker;
