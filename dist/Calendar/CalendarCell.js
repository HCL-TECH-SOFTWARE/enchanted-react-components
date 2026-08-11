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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
// eslint-why TypeScript interfaces provide type safety
/* eslint-disable react/prop-types */
const react_1 = __importStar(require("react"));
const material_1 = require("@mui/material");
const Typography_1 = __importDefault(require("../Typography"));
const CalendarItem_1 = __importDefault(require("./CalendarItem"));
const CalendarCell = react_1.default.memo(({ date, items, view, isCurrentMonth, isToday, isSelected, isFocused = false, isLastRow = false, disabled = false, onDateClick, onItemClick, onKeyDown, dateFormatLong = 'MMMM D, YYYY', dayFormat = 'D', dayAbbreviationFormat = 'ddd', timePreposition = 'at', locale = 'en', }) => {
    const dateButtonRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (isFocused && dateButtonRef.current) {
            dateButtonRef.current.focus();
        }
    }, [isFocused]);
    const formatDate = (d, format) => {
        return d.locale(locale).format(format);
    };
    const handleDateClick = () => {
        if (!disabled && onDateClick) {
            onDateClick(date);
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleDateClick();
        }
        else if (onKeyDown) {
            onKeyDown(event, date);
        }
    };
    const getDateColor = (theme) => {
        if (disabled || !isCurrentMonth) {
            return theme.palette.text.disabled;
        }
        if (isSelected) {
            return theme.palette.text.tertiary1;
        }
        return theme.palette.text.primary;
    };
    if (view === 'week') {
        return (react_1.default.createElement(material_1.Box, { sx: {
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                minWidth: 0,
                height: '100%',
            } },
            react_1.default.createElement(material_1.Box, { sx: (theme) => {
                    return {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: theme.spacing(0.75),
                        padding: theme.spacing(0.75),
                        height: theme.spacing(8.25),
                        backgroundColor: theme.palette.background.default,
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        borderRight: `1px solid ${theme.palette.divider}`,
                    };
                } },
                react_1.default.createElement(Typography_1.default, { variant: "body2", color: "text.primary" }, formatDate(date, dayAbbreviationFormat)),
                react_1.default.createElement(material_1.Box, { ref: dateButtonRef, sx: (theme) => {
                        return {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: theme.spacing(3),
                            height: theme.spacing(3),
                            borderRadius: '50%',
                            cursor: disabled ? 'default' : 'pointer',
                            backgroundColor: isSelected ? theme.palette.primary.main : 'transparent',
                            border: isToday && !isSelected ? `1px solid ${theme.palette.text.primary}` : 'none',
                            color: isSelected ? theme.palette.common.white : theme.palette.text.primary,
                            '&:hover': !disabled && !isSelected && {
                                backgroundColor: theme.palette.action.hover,
                            },
                            '&:focus-visible': {
                                outline: `1px solid ${theme.palette.action.focus}`,
                                outlineOffset: '3px',
                            },
                        };
                    }, onClick: handleDateClick, onKeyDown: handleKeyDown, tabIndex: disabled ? -1 : 0, role: "button", "aria-label": formatDate(date, dateFormatLong), "aria-current": isToday ? 'date' : undefined, "aria-pressed": isSelected, "aria-disabled": disabled },
                    react_1.default.createElement(Typography_1.default, { variant: "body2" }, formatDate(date, dayFormat)))),
            react_1.default.createElement(material_1.Box, { sx: (theme) => {
                    return {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: theme.spacing(0.5),
                        padding: theme.spacing(0.75, 0.5),
                        flex: 1,
                        overflow: 'auto',
                        backgroundColor: theme.palette.background.paper,
                        borderRight: `1px solid ${theme.palette.divider}`,
                    };
                } }, items.map((item) => {
                return (react_1.default.createElement(CalendarItem_1.default, { key: item.id, item: item, view: view, onClick: onItemClick, disabled: disabled, timePreposition: timePreposition }));
            }))));
    }
    return (react_1.default.createElement(material_1.Box, { sx: (theme) => {
            return {
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                minWidth: 0,
                padding: '6px 4px',
                backgroundColor: theme.palette.background.paper,
                borderBottom: isLastRow ? 'none' : `1px solid ${theme.palette.divider}`,
                borderRight: `1px solid ${theme.palette.divider}`,
                overflow: 'hidden',
                '&:nth-of-type(7n)': {
                    borderRight: 'none',
                },
            };
        }, role: "gridcell", "aria-label": formatDate(date, dateFormatLong) },
        react_1.default.createElement(material_1.Box, { sx: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                padding: '4px 2px',
                width: '28px',
                height: '32px',
                flex: 'none',
            } },
            react_1.default.createElement(material_1.Box, { ref: dateButtonRef, sx: (theme) => {
                    return Object.assign({ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0px', isolation: 'isolate', width: '24px', height: '24px', border: isToday && !disabled ? `1px solid ${theme.palette.text.primary}` : 'none', borderRadius: '100px', cursor: disabled ? 'default' : 'pointer', backgroundColor: isSelected && !disabled ? theme.palette.primary.main : 'transparent', color: isSelected && !disabled ? theme.palette.common.white : getDateColor(theme), position: 'relative', flex: 'none', '&:hover': !disabled && !isSelected && {
                            backgroundColor: theme.palette.action.hover,
                        }, '&:focus-visible': {
                            border: `2px solid ${theme.palette.primary.main}`,
                            outline: 'none',
                        } }, (!isToday && isSelected && !disabled && {
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            width: '4px',
                            height: '0px',
                            left: 'calc(50% - 2px)',
                            bottom: '4px',
                            border: `1px solid ${theme.palette.primary.main}`,
                            flex: 'none',
                            zIndex: 0,
                        },
                    }));
                }, onClick: handleDateClick, onKeyDown: handleKeyDown, tabIndex: disabled ? -1 : 0, role: "button", "aria-label": formatDate(date, dateFormatLong), "aria-current": isToday ? 'date' : undefined, "aria-pressed": isSelected, "aria-disabled": disabled },
                react_1.default.createElement(Typography_1.default, { variant: "body2" }, formatDate(date, dayFormat)))),
        react_1.default.createElement(material_1.Box, { sx: (theme) => {
                return {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: theme.spacing(0.5),
                    flex: 1,
                    overflow: 'hidden',
                    width: '100%',
                };
            } }, items.map((item) => {
            return (react_1.default.createElement(CalendarItem_1.default, { key: item.id, item: item, view: view, onClick: onItemClick, disabled: disabled, timePreposition: timePreposition }));
        }))));
});
CalendarCell.displayName = 'CalendarCell';
exports.default = CalendarCell;
