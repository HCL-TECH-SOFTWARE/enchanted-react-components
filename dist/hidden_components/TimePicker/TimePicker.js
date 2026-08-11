"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const react_1 = __importDefault(require("react"));
const dayjs_1 = __importDefault(require("dayjs"));
const TimePicker_1 = require("@mui/x-date-pickers/TimePicker");
const TextField_1 = __importDefault(require("../../TextField"));
const DEFAULT_FORMAT = 'hh:mm';
const TimePicker = (_a) => {
    var props = __rest(_a, []);
    const formatValue = (value, format) => {
        return value.format(format);
    };
    const getTextFieldProps = (muiTextFieldProps) => {
        let error = false;
        if (props.value !== null) {
            const day = props.value;
            if (!Number.isNaN(day.day()) && !Number.isNaN(day.month()) && !Number.isNaN(day.year())) {
                const valid = (0, dayjs_1.default)(day, props.format, true).isValid();
                error = !valid;
            }
        }
        const textFieldProps = Object.assign(Object.assign({}, muiTextFieldProps), { inputRef: muiTextFieldProps.inputRef, label: props.label, helperText: props.helperText, helperIconTooltip: props.helperIconTooltip, required: props.required, disabled: props.disabled, margin: props.margin, color: props.color, size: props.size, autoComplete: 'off', error: props.error || error, fullWidth: props.fullWidth, unitLabel: props.unitLabel, hiddenLabel: props.hiddenLabel, nonEdit: props.nonEdit, value: props.value !== null ? `${formatValue(props.value, props.format || DEFAULT_FORMAT)}` : '', actionProps: props.actionProps, InputProps: Object.assign({}, muiTextFieldProps.InputProps), inputProps: Object.assign(Object.assign({}, muiTextFieldProps.inputProps), { placeholder: props.format }) });
        return textFieldProps;
    };
    return (react_1.default.createElement(TimePicker_1.TimePicker, Object.assign({}, props, { renderInput: (params) => {
            const textFieldProps = getTextFieldProps(params);
            return (react_1.default.createElement(TextField_1.default, Object.assign({}, textFieldProps)));
        } })));
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
__exportStar(require("@mui/x-date-pickers/TimePicker"), exports);
exports.default = TimePicker;
