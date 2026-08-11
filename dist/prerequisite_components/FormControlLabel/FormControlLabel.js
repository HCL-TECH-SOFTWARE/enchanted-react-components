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
exports.getMuiFormControlLabelThemeOverrides = void 0;
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
const FormControlLabel_1 = __importDefault(require("@mui/material/FormControlLabel"));
/**
 * Override out of the box styling from mui to align with designer theme
 * @returns override FormControlLabel component styles and prop
 */
const getMuiFormControlLabelThemeOverrides = () => {
    return {
        MuiFormControlLabel: {
            styleOverrides: {
                root: ({ theme }) => {
                    return ({
                        marginLeft: 'unset',
                        marginRight: 'unset',
                        // below MuiFormControlLabel override only applicable for Checkbox to make sure Checkbox is parent component
                        '.MuiCheckbox-root + .MuiTypography-root': Object.assign({}, theme.typography.body2),
                        // below MuiFormControlLabel override only applicable for Radio to make sure Radio is parent component
                        '.MuiRadio-root + .MuiTypography-root': Object.assign({}, theme.typography.body2),
                        // below MuiFormControlLabel override only applicable for Switch to make sure Switch is parent component
                        '.MuiSwitch-root + .MuiTypography-root': Object.assign({}, theme.typography.body2),
                    });
                },
            },
        },
    };
};
exports.getMuiFormControlLabelThemeOverrides = getMuiFormControlLabelThemeOverrides;
const FormControlLabel = (_a) => {
    var props = __rest(_a, []);
    return react_1.default.createElement(FormControlLabel_1.default, Object.assign({}, props));
};
FormControlLabel.defaultProps = {};
__exportStar(require("@mui/material/FormControlLabel"), exports);
exports.default = FormControlLabel;
