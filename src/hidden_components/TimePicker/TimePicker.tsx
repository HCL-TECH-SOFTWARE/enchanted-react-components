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
import { TimePicker as MuiTimePicker, TimePickerProps as MuiTimePickerProps } from '@mui/x-date-pickers/TimePicker';
import { Dayjs } from 'dayjs';
import TextField from '../../TextField';
import { ActionProps } from '../../prerequisite_components/InputLabelAndAction/InputLabelAndAction';
// eslint-why MUI TimePicker requires any for the date adapter generic type parameters
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface TimePickerProps<TDate extends Dayjs = Dayjs> extends Omit<MuiTimePickerProps<TDate>, 'slots' | 'slotProps'> {
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
// eslint-why MUI TimePicker requires any for the date adapter generic type parameters
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TimePicker = <TDate extends Dayjs = Dayjs>({ ...props }: TimePickerProps<TDate>) => {
  // eslint-why MUI TimePicker requires any for the date adapter generic type parameters
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const textFieldSlotProps = {
    label: props.label,
    helperText: props.helperText,
    helperIconTooltip: props.helperIconTooltip,
    required: props.required,
    disabled: props.disabled,
    margin: props.margin,
    color: props.color,
    size: props.size,
    autoComplete: 'off',
    error: props.error,
    fullWidth: props.fullWidth,
    unitLabel: props.unitLabel,
    hiddenLabel: props.hiddenLabel,
    nonEdit: props.nonEdit,
    actionProps: props.actionProps,
    inputProps: { placeholder: props.format },
  };
  // eslint-why MUI TimePicker requires any for the date adapter generic type parameters
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const spreadProps = props as any;
  return (
    <MuiTimePicker
      {...spreadProps}
      slots={{ textField: TextField }}
      slotProps={{ textField: textFieldSlotProps as object }}
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
