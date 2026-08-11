"use strict";
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
exports.getMuiDividerThemeOverrides = exports.DividerTypes = void 0;
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
const Divider_1 = __importDefault(require("@mui/material/Divider"));
var DividerTypes;
(function (DividerTypes) {
    DividerTypes["PRIMARY"] = "primary";
    DividerTypes["SECONDARY"] = "secondary";
    DividerTypes["WITHMARGIN"] = "withMargin";
    DividerTypes["NOPADDING"] = "noPadding";
})(DividerTypes = exports.DividerTypes || (exports.DividerTypes = {}));
/**
 * @returns override Divider component styles and props
 */
const getMuiDividerThemeOverrides = () => {
    return {
        MuiDivider: {
            styleOverrides: {
                root: ({ ownerState, theme }) => {
                    return Object.assign(Object.assign(Object.assign(Object.assign({}, ownerState.type === DividerTypes.PRIMARY && {
                        borderColor: theme.palette.border.primary,
                    }), ownerState.type === DividerTypes.SECONDARY && {
                        borderColor: theme.palette.border.secondary,
                    }), ownerState.type === DividerTypes.WITHMARGIN && Object.assign(Object.assign({ borderColor: theme.palette.border.primary }, ownerState.orientation === 'vertical' && {
                        margin: '0px 4px 0px 4px',
                    }), ownerState.orientation === 'horizontal' && {
                        margin: '4px 0px 4px 0px',
                    })), ownerState.type === DividerTypes.NOPADDING && {
                        borderColor: theme.palette.border.primary,
                        padding: '0px',
                    });
                },
            },
        },
    };
};
exports.getMuiDividerThemeOverrides = getMuiDividerThemeOverrides;
const Divider = (_a) => {
    var props = __rest(_a, []);
    if (props.orientation === 'horizontal') {
        return react_1.default.createElement(Divider_1.default, Object.assign({ "data-testid": "Divider", sx: { height: '1px', width: '100%' } }, props)); // Setting width 100% of Divider in horizontal
    }
    return react_1.default.createElement(Divider_1.default, Object.assign({ "data-testid": "Divider" }, props));
};
Divider.defaultProps = {
    type: 'primary',
};
exports.default = Divider;
