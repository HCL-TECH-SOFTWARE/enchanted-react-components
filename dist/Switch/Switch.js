"use strict";
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
exports.getMuiSwitchThemeOverrides = void 0;
const react_1 = __importDefault(require("react"));
const Switch_1 = __importDefault(require("@mui/material/Switch"));
const Switch = (_a) => {
    var props = __rest(_a, []);
    return react_1.default.createElement(Switch_1.default, Object.assign({}, props));
};
Switch.defaultProps = {
    centerRipple: false,
    disableTouchRipple: false,
    focusRipple: false,
    disabled: false,
};
const getMuiSwitchThemeOverrides = () => {
    return {
        MuiSwitch: {
            styleOverrides: {
                root: ({ theme }) => {
                    return ({
                        '&.MuiSwitch-root': {
                            width: '38px',
                            height: '22px',
                            padding: '3px',
                            borderRadius: '30px',
                            marginRight: '4px',
                        },
                        '&:active': {
                            '& .MuiSwitch-thumb': {
                                width: '15px',
                            },
                            '& .MuiSwitch-switchBase.Mui-checked:not(.Mui-disabled)': {
                                transform: 'translateX(9px)',
                            },
                        },
                        '& .MuiSwitch-switchBase': {
                            padding: '5px',
                            '&:hover': {
                                backgroundColor: 'transparent', // Disable default hover while unchecked as per switch in Figma
                            },
                            '&.Mui-checked': {
                                transform: 'translateX(16px)',
                                color: theme.palette.background.paper,
                                '& + .MuiSwitch-track': {
                                    opacity: 1,
                                    backgroundColor: theme.palette.primary.main,
                                },
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    '& + .MuiSwitch-track': {
                                        backgroundColor: theme.palette.primary.dark,
                                    },
                                },
                            },
                            '&.Mui-disabled': {
                                '& + .MuiSwitch-track': {
                                    backgroundColor: theme.palette.action.disabled,
                                    opacity: 1,
                                },
                                '& .MuiSwitch-thumb': {
                                    color: theme.palette.background.paper,
                                },
                            },
                        },
                        '& .MuiSwitch-thumb:not(.Mui-disabled)': {
                            width: '12px',
                            height: '12px',
                            borderRadius: '6px',
                            transition: theme.transitions.create(['width'], {
                                duration: 200,
                            }),
                        },
                        '& .MuiSwitch-track': {
                            opacity: 1,
                            backgroundColor: theme.palette.action.active,
                            boxSizing: 'border-box',
                            borderRadius: '30px',
                        },
                        '&.MuiSwitch-root:hover': {
                            backgroundColor: theme.palette.action.hover,
                        },
                        '&.MuiSwitch-root:focus-within': {
                            outline: `1px solid ${theme.palette.primary.main}`,
                        },
                    });
                },
            },
        },
    };
};
exports.getMuiSwitchThemeOverrides = getMuiSwitchThemeOverrides;
__exportStar(require("@mui/material/Switch"), exports);
exports.default = Switch;
