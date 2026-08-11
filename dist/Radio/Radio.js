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
exports.getMuiRadioThemeOverrides = void 0;
const react_1 = __importDefault(require("react"));
const Radio_1 = __importDefault(require("@mui/material/Radio"));
const Radio = (_a) => {
    var props = __rest(_a, []);
    return react_1.default.createElement(Radio_1.default, Object.assign({}, props));
};
const getMuiRadioThemeOverrides = () => {
    return {
        MuiRadio: {
            styleOverrides: {
                root: ({ theme }) => {
                    return ({
                        border: 'transparent 1px solid',
                        marginRight: '4px',
                        '&:hover': {
                            backgroundColor: theme.palette.action.hover,
                        },
                        padding: '4px',
                        '& .MuiSvgIcon-root': {
                            height: '16px',
                            width: '16px',
                        },
                        '&.Mui-focusVisible': {
                            input: {
                                '&:focus': {
                                    outline: 'none',
                                },
                                '&:hover': {
                                    backgroundColor: theme.palette.action.hover,
                                },
                            },
                            border: `1px solid ${theme.palette.primary.main}`,
                            width: '26px',
                            height: '26px',
                        },
                    });
                },
            },
        },
    };
};
exports.getMuiRadioThemeOverrides = getMuiRadioThemeOverrides;
Radio.defaultProps = {
    disableRipple: true,
    disabled: false,
    required: false,
};
__exportStar(require("@mui/material/Radio"), exports);
exports.default = Radio;
