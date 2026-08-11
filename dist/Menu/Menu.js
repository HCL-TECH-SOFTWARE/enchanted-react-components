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
exports.getMuiMenuThemeOverrides = exports.MenuSizes = void 0;
const react_1 = __importDefault(require("react"));
const Menu_1 = __importDefault(require("@mui/material/Menu"));
var MenuSizes;
(function (MenuSizes) {
    MenuSizes["SMALL"] = "small";
    MenuSizes["MEDIUM"] = "medium";
})(MenuSizes = exports.MenuSizes || (exports.MenuSizes = {}));
const Menu = (_a) => {
    var props = __rest(_a, []);
    return react_1.default.createElement(Menu_1.default, Object.assign({}, props, { elevation: 2 }));
};
/**
 * @returns override Menu component styles and props
 */
const getMuiMenuThemeOverrides = () => {
    return {
        MuiMenu: {
            styleOverrides: {
                list: ({ theme }) => {
                    return {
                        '&.MuiMenu-list': {
                            paddingTop: '4px',
                            paddingBottom: '4px',
                            '.MuiButtonBase-root': {
                                '.MuiButtonBase-root': Object.assign({}, theme.typography.subtitle1),
                            },
                        },
                        // By default .MuiMenuItem-root+.MuiDivider-root is set to 8 px, we had to set it 4 px from top and bottom as per design
                        '.MuiMenuItem-root+.MuiDivider-root': {
                            marginTop: '4px',
                            marginBottom: '4px',
                        },
                    };
                },
            },
        },
    };
};
exports.getMuiMenuThemeOverrides = getMuiMenuThemeOverrides;
__exportStar(require("@mui/material/Menu"), exports);
exports.default = Menu;
