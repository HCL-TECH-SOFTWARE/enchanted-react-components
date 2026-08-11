"use strict";
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
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const Typography_1 = __importDefault(require("../Typography"));
const getItemColors = (color, theme, customColors) => {
    var _a;
    if (customColors) {
        return customColors;
    }
    const colorMap = {
        neutral: {
            iconBackground: theme.palette.background.default,
            background: theme.palette.background.paper,
            border: ((_a = theme.palette.border) === null || _a === void 0 ? void 0 : _a.tertiary) || theme.palette.text.primary,
            text: theme.palette.text.primary,
        },
        red: {
            iconBackground: theme.palette.background.error,
            background: theme.palette.background.paper,
            border: theme.palette.error.main,
            text: theme.palette.error.main,
        },
        orange: {
            iconBackground: theme.palette.background.warning,
            background: theme.palette.background.paper,
            border: theme.palette.warning.main,
            text: theme.palette.warning.main,
        },
        blue: {
            iconBackground: theme.palette.background.info,
            background: theme.palette.background.paper,
            border: theme.palette.info.main,
            text: theme.palette.info.main,
        },
        green: {
            iconBackground: theme.palette.background.success,
            background: theme.palette.background.paper,
            border: theme.palette.success.main,
            text: theme.palette.success.main,
        },
    };
    return colorMap[color];
};
const CalendarItem = react_1.default.memo(({ item, view, onClick, disabled = false, timePreposition = 'at', }) => {
    const handleClick = () => {
        if (!disabled && onClick) {
            onClick(item);
        }
        if (!disabled && item.onClick) {
            item.onClick(item);
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleClick();
        }
    };
    if (view === 'month') {
        return (react_1.default.createElement(material_1.Box, { sx: (theme) => {
                return {
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing(0.5),
                    padding: theme.spacing(0.25),
                    borderRadius: '4px',
                    backgroundColor: theme.palette.background.paper,
                    cursor: disabled ? 'default' : 'pointer',
                    overflow: 'hidden',
                    width: '100%',
                    opacity: disabled ? 0.38 : 1,
                    '&:hover': !disabled && {
                        backgroundColor: theme.palette.action.hover,
                    },
                    '&:focus-visible': {
                        border: `2px solid ${theme.palette.action.focus}`,
                        padding: '1px',
                    },
                };
            }, onClick: handleClick, onKeyDown: handleKeyDown, tabIndex: disabled ? -1 : 0, role: "button", "aria-label": `${item.title}${item.time ? ` ${timePreposition} ${item.time}` : ''}`, "aria-disabled": disabled },
            react_1.default.createElement(material_1.Box, { sx: (theme) => {
                    const colors = getItemColors(disabled ? 'neutral' : item.color, theme, disabled ? undefined : item.customColors);
                    return {
                        width: theme.spacing(1),
                        height: theme.spacing(1),
                        borderRadius: '50%',
                        backgroundColor: colors.iconBackground,
                        border: `1px solid ${colors.border}`,
                        flexShrink: 0,
                    };
                }, "aria-hidden": "true" }),
            react_1.default.createElement(material_1.Box, { sx: (theme) => {
                    return {
                        display: 'flex',
                        alignItems: 'center',
                        flex: 1,
                        minWidth: 0,
                        height: theme.spacing(2),
                        overflow: 'hidden',
                        position: 'relative',
                    };
                } },
                react_1.default.createElement(Typography_1.default, { variant: "body2", sx: {
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        flex: 1,
                    } }, item.title))));
    }
    return (react_1.default.createElement(material_1.Box, { sx: (theme) => {
            const colors = getItemColors(disabled ? 'neutral' : item.color, theme, disabled ? undefined : item.customColors);
            return {
                display: 'flex',
                flexDirection: 'column',
                padding: theme.spacing(0.25),
                borderRadius: '4px',
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${colors.border}`,
                cursor: disabled ? 'default' : 'pointer',
                overflow: 'hidden',
                width: '100%',
                opacity: disabled ? 0.38 : 1,
                '&:hover': !disabled && {
                    backgroundColor: theme.palette.action.hover,
                },
                '&:focus-visible': {
                    border: `2px solid ${theme.palette.action.focus}`,
                    padding: '1px',
                },
            };
        }, onClick: handleClick, onKeyDown: handleKeyDown, tabIndex: disabled ? -1 : 0, role: "button", "aria-label": `${item.title}${item.time ? ` ${timePreposition} ${item.time}` : ''}`, "aria-disabled": disabled },
        react_1.default.createElement(material_1.Box, { sx: (theme) => {
                return {
                    display: 'flex',
                    flexDirection: 'column',
                    padding: theme.spacing(0.25),
                    overflow: 'hidden',
                    width: '100%',
                };
            } },
            react_1.default.createElement(material_1.Box, { sx: {
                    display: 'flex',
                    alignItems: 'center',
                    overflow: 'hidden',
                    position: 'relative',
                    width: '100%',
                } },
                react_1.default.createElement(Typography_1.default, { variant: "body2", sx: (theme) => {
                        const colors = getItemColors(disabled ? 'neutral' : item.color, theme, disabled ? undefined : item.customColors);
                        return {
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            flex: 1,
                            color: colors.text,
                        };
                    } }, item.title)),
            item.time && (react_1.default.createElement(material_1.Box, { sx: {
                    display: 'flex',
                    alignItems: 'center',
                    overflow: 'hidden',
                    width: '100%',
                } },
                react_1.default.createElement(Typography_1.default, { variant: "body2", sx: (theme) => {
                        const colors = getItemColors(disabled ? 'neutral' : item.color, theme, disabled ? undefined : item.customColors);
                        return {
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            color: colors.text,
                        };
                    } }, item.time))))));
});
CalendarItem.displayName = 'CalendarItem';
exports.default = CalendarItem;
