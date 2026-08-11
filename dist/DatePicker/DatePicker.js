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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.DatePickerDefaults = void 0;
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
const react_1 = __importStar(require("react"));
const DatePicker_1 = require("@mui/x-date-pickers/DatePicker");
const StaticDatePicker_1 = require("@mui/x-date-pickers/StaticDatePicker");
const dayjs_1 = __importDefault(require("dayjs"));
const uuid_1 = require("uuid");
const PickersDay_1 = require("@mui/x-date-pickers/PickersDay");
const dot_mark_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/dot-mark"));
const calendar_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/calendar"));
const caret__down_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/caret--down"));
const SvgIcon_1 = require("@mui/material/SvgIcon");
const Paper_1 = __importDefault(require("../Paper"));
const Badge_1 = __importStar(require("../Badge/Badge"));
const TextField_1 = __importDefault(require("../TextField"));
const DEFAULT_FORMAT = 'MM/DD/YYYY';
// Shared formatter used by both static and regular date picker variants
const dayOfWeekFormatter = (day) => { return day; };
// Display mode for the static date picker
const staticWrapperAs = 'mobile';
// Number of year columns rendered in the year picker view.
// Must match `yearsInRow` used by MUI internally (set via displayStaticWrapperAs='mobile' for StaticDatePicker).
// Also used by handleYearPickerKeyDown to correct arrow-key navigation for the non-static DatePicker.
const YEARS_PER_ROW = 3;
const getDatePickerStyle = (theme, customStyles, staticMode) => {
    return Object.assign(Object.assign(Object.assign({}, theme.typography.body2), { margin: staticMode ? '0px' : '6px 0px 0px -8px', padding: '0px', height: 'auto', width: '228px', color: `1px solid ${theme.palette.background.paper}`, boxShadow: 1, '& .MuiPickerStaticWrapper-content': {
            minWidth: 'unset',
        }, '& .MuiCalendarPicker-root': {
            width: '228px',
            margin: '0px',
            height: 'auto',
            overflowY: 'hidden',
            flexGrow: 1,
        }, '& .MuiYearPicker-root': {
            maxHeight: '168px',
            overflowY: 'auto',
        }, 
        // Assumes year view displays 3 years across.
        // Requires `displayStaticWrapperAs: 'mobile'` to set
        // `yearsInRow = 3` for arrow key navigation.
        '& .PrivatePickersYear-root': {
            flexBasis: '33.33%',
        }, '& .PrivatePickersYear-yearButton': {
            width: '100%',
            maxWidth: 'unset',
        }, '& .MuiTouchRipple-root': {
            color: 'transparent',
            width: '228px',
        }, '& .MuiPickersCalendarHeader-label': Object.assign({ marginRight: '0px' }, theme.typography.subtitle2), '& .MuiPickersCalendarHeader-root': {
            padding: '24px 13px',
            margin: '4px',
            width: 'auto',
        }, '& .MuiPaper-root-MuiPickersPopper-paper .MuiCalendarPicker-viewTransitionContainer': {
            padding: '0px',
            margin: '0px',
            width: '228px',
        }, '& .MuiPickersArrowSwitcher-spacer': {
            width: '4px',
        }, '& .MuiDayPicker-weekContainer': {
            margin: '0px',
            width: '228px',
        }, '& .MuiDayPicker-weekDayLabel': Object.assign(Object.assign({}, theme.typography.body2), { color: theme.palette.text.secondary, margin: '4px 2px', width: '24px', padding: '0px', height: '16px' }), '& .MuiCalendarPicker-viewTransitionContainer': {
            width: '228px',
        }, '& .MuiDayPicker-header': Object.assign(Object.assign({}, theme.typography.body1), { width: '228px' }), '& .MuiIconButton-root': {
            [`& .${SvgIcon_1.svgIconClasses.root}`]: {
                padding: '0px',
                width: '16px',
                height: '16px',
                border: 'none',
            },
        }, '& .MuiDayPicker-monthContainer': {
            height: 'auto',
            position: 'inherit',
            width: '228px',
        }, '& .PrivatePickersSlideTransition-root MuiDayPicker-slideTransition': {
            position: 'inherit',
            width: '228px',
            margin: '4px 16px',
        }, '& .MuiPickersDay-root': Object.assign(Object.assign({ border: 'none', height: '24px', width: '24px', radius: '64px', margin: '4px 2px' }, theme.typography.body2), { '&.MuiPickersDay-today': {
                border: 'none',
                position: 'relative',
            }, '&.MuiPickersDay-dayOutsideMonth': {
                color: theme.palette.text.disabled,
            }, '&:hover': {
                backgroundColor: theme.palette.action.hover,
            }, '&:focus-visible': {
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
            }, '&.Mui-selected': {
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
            } }), '& .MuiDayPicker-slideTransition': {
            height: 'auto',
            minHeight: '140px',
            position: 'inherit',
        }, '& .MuiDialogActions-root': {
            display: '-webkit-box',
            padding: '12px 0px',
            justifyContent: 'center',
            borderTop: 'none',
        }, '& .MuiPickersArrowSwitcher-button': {
            '&:hover': {
                backgroundColor: theme.palette.action.hover,
            },
        } }), customStyles);
};
/**
 * Default prop values for DatePicker.
 * Exported for use in Storybook argTypes and story args.
 */
exports.DatePickerDefaults = {
    margin: 'none',
    color: 'primary',
    size: 'medium',
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
const DatePicker = (_a) => {
    var { customStyles = {}, staticMode = false, margin = 'none', color = 'primary', size = 'medium', label = '', helperText = '', enableHelpHoverEffect = false, helperIconTooltip = '', format = DEFAULT_FORMAT, unitLabel = '', required = false, disabled = false, fullWidth = false, hiddenLabel = false, nonEdit = false, error = false, actionProps, customIcon, value, onViewChange, onAccept } = _a, muiProps = __rest(_a, ["customStyles", "staticMode", "margin", "color", "size", "label", "helperText", "enableHelpHoverEffect", "helperIconTooltip", "format", "unitLabel", "required", "disabled", "fullWidth", "hiddenLabel", "nonEdit", "error", "actionProps", "customIcon", "value", "onViewChange", "onAccept"]);
    const popperId = (0, uuid_1.v4)();
    // Controls the active view of StaticDatePicker. Resets to 'day' on Today click since
    // MUI v5 StaticDatePicker does not reset the view automatically.
    const [staticView, setStaticView] = (0, react_1.useState)('day');
    const handleOnKeyDownLeft = (event) => {
        var _a;
        if (event.key === 'ArrowRight') {
            const element = event.target;
            if ((_a = element.nextElementSibling) === null || _a === void 0 ? void 0 : _a.nextElementSibling) {
                element.nextElementSibling.nextElementSibling.focus();
            }
        }
    };
    const handleOnKeyDownRight = (event) => {
        var _a;
        if (event.key === 'ArrowLeft') {
            const element = event.target;
            if ((_a = element.previousElementSibling) === null || _a === void 0 ? void 0 : _a.previousElementSibling) {
                element.previousElementSibling.previousElementSibling.focus();
            }
        }
    };
    const handleStaticViewChange = (0, react_1.useCallback)((newView) => {
        setStaticView(newView);
        onViewChange === null || onViewChange === void 0 ? void 0 : onViewChange(newView);
    }, [onViewChange]);
    // Today button fires onAccept — reset to 'day' view so the calendar returns from year/month view.
    const handleStaticAccept = (0, react_1.useCallback)((acceptedValue) => {
        setStaticView('day');
        onAccept === null || onAccept === void 0 ? void 0 : onAccept(acceptedValue);
    }, [onAccept]);
    const formatValue = (dateValue, dateFormat) => {
        return dateValue.format(dateFormat);
    };
    /**
     * Corrects Up/Down arrow key navigation in the year picker for the non-static DatePicker.
     * MUI v5 desktop mode hard-codes yearsInRow=4, but our CSS renders 3 columns.
     * This intercepts the event before MUI handles it and manually moves focus by 3
     * to match the visual row layout, preventing diagonal jumps.
     */
    const handleYearPickerKeyDown = (event) => {
        const target = event.target;
        if (!target.classList.contains('PrivatePickersYear-yearButton'))
            return;
        if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown')
            return;
        event.preventDefault();
        event.stopPropagation();
        const yearButtons = Array.from(document.querySelectorAll('.PrivatePickersYear-yearButton:not([disabled])'));
        const currentIndex = yearButtons.indexOf(target);
        if (currentIndex === -1)
            return;
        const nextIndex = event.key === 'ArrowDown' ? currentIndex + YEARS_PER_ROW : currentIndex - YEARS_PER_ROW;
        if (nextIndex >= 0 && nextIndex < yearButtons.length) {
            yearButtons[nextIndex].focus();
        }
    };
    const focusDialog = () => {
        window.requestAnimationFrame(() => {
            var _a;
            const dialog = (_a = document.querySelector(`#datepickerPopper-${popperId}`)) !== null && _a !== void 0 ? _a : document.querySelector('.MuiPickersPopper-root');
            if (dialog) {
                const focusableElement = dialog.querySelector('button, [tabindex]:not([tabindex="-1"])');
                if (focusableElement instanceof window.HTMLElement) {
                    focusableElement.focus();
                }
                else if (dialog instanceof window.HTMLElement) {
                    dialog.focus();
                }
            }
        });
    };
    const getTextFieldProps = (muiTextFieldProps) => {
        let hasError = false;
        if (value !== null) {
            const day = value;
            if (!Number.isNaN(day.day()) && !Number.isNaN(day.month()) && !Number.isNaN(day.year())) {
                const valid = (0, dayjs_1.default)(day, format, true).isValid();
                hasError = !valid;
            }
        }
        const textFieldProps = Object.assign(Object.assign({}, muiTextFieldProps), { inputRef: muiTextFieldProps.inputRef, label,
            helperText,
            enableHelpHoverEffect,
            helperIconTooltip,
            required,
            disabled,
            margin,
            color,
            size, autoComplete: 'off', error: error || hasError, fullWidth,
            unitLabel,
            hiddenLabel,
            nonEdit, value: value !== null ? `${formatValue(value, format || DEFAULT_FORMAT)}` : '', actionProps, InputProps: Object.assign({}, muiTextFieldProps.InputProps), inputProps: Object.assign(Object.assign({}, muiTextFieldProps.inputProps), { placeholder: format }), customIcon });
        return textFieldProps;
    };
    const renderDay = (day, _value, DayComponentProps) => {
        // MUI v5 StaticDatePicker does not fire onChange when the user clicks an
        // already-selected day.  For static mode we attach a manual click handler
        // so that re-selecting the current date still notifies the consumer.
        // The onClick is only spread in static mode so that the non-static
        // DatePicker's built-in MUI click behaviour is never overridden.
        const handleDayClick = () => {
            var _a;
            if (staticMode && DayComponentProps.selected) {
                (_a = muiProps === null || muiProps === void 0 ? void 0 : muiProps.onChange) === null || _a === void 0 ? void 0 : _a.call(muiProps, day);
            }
        };
        return (react_1.default.createElement(Badge_1.default, { key: day.toString(), overlap: "circular", variant: "standard", color: (DayComponentProps.today && DayComponentProps.selected) ? 'default' : 'primary', badgeContent: DayComponentProps.today ? react_1.default.createElement(dot_mark_1.default, { fontSize: "small" }) : undefined, anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
            }, sx: {
                [`& .${Badge_1.badgeClasses.badge}`]: {
                    right: '50%',
                    padding: '1px',
                    width: '4px',
                    height: '1px',
                    borderRadius: 'unset',
                    minWidth: '0px',
                    top: '70%',
                    [`& .${SvgIcon_1.svgIconClasses.root}`]: Object.assign(Object.assign(Object.assign({}, (DayComponentProps.today && DayComponentProps.selected) && {
                        fill: 'common.white',
                        width: '2px',
                        height: '2px',
                    }), !(DayComponentProps.today && DayComponentProps.selected) && {
                        fill: 'none',
                        width: '1px',
                        height: '1px',
                    }), { fontSize: '1px' }),
                },
            } },
            react_1.default.createElement(PickersDay_1.PickersDay, Object.assign({}, DayComponentProps, (staticMode && { onClick: handleDayClick })))));
    };
    // Static mode - render calendar without input field
    if (staticMode) {
        return (react_1.default.createElement(Paper_1.default, { variant: "elevation", sx: (theme) => { return getDatePickerStyle(theme, customStyles, true); } },
            react_1.default.createElement(StaticDatePicker_1.StaticDatePicker, Object.assign({}, muiProps, { disabled: disabled, value: value }, { view: staticView }, { onViewChange: handleStaticViewChange, onAccept: handleStaticAccept, displayStaticWrapperAs: staticWrapperAs, closeOnSelect: false, showToolbar: false, reduceAnimations: true, dayOfWeekFormatter: dayOfWeekFormatter, componentsProps: {
                    actionBar: { actions: ['today'] },
                    leftArrowButton: { onKeyDown: handleOnKeyDownLeft },
                    rightArrowButton: { onKeyDown: handleOnKeyDownRight },
                }, components: {
                    SwitchViewIcon: caret__down_1.default,
                }, renderDay: renderDay, renderInput: (_params) => { return react_1.default.createElement("span", null); } }))));
    }
    // Render regular DatePicker with input field
    return (react_1.default.createElement(DatePicker_1.DatePicker, Object.assign({}, muiProps, { disabled: disabled, value: value, reduceAnimations: true, autoFocus: false, onOpen: focusDialog, dayOfWeekFormatter: dayOfWeekFormatter, PaperProps: {
            sx: (theme) => { return getDatePickerStyle(theme, customStyles); },
            onKeyDownCapture: handleYearPickerKeyDown,
        }, PopperProps: {
            placement: 'bottom-start',
            id: `datepickerPopper-${popperId}`,
        }, componentsProps: {
            actionBar: { actions: ['today'] },
            leftArrowButton: { onKeyDown: handleOnKeyDownLeft },
            rightArrowButton: { onKeyDown: handleOnKeyDownRight },
        }, components: {
            OpenPickerIcon: calendar_1.default,
            SwitchViewIcon: caret__down_1.default,
        }, renderInput: (params) => {
            const textFieldProps = getTextFieldProps(params);
            return (react_1.default.createElement(TextField_1.default, Object.assign({}, textFieldProps)));
        }, renderDay: renderDay })));
};
__exportStar(require("@mui/x-date-pickers/DatePicker"), exports);
exports.default = DatePicker;
