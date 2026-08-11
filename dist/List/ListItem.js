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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMuiListItemThemeOverrides = void 0;
const react_1 = __importDefault(require("react"));
const ListItem_1 = __importDefault(require("@mui/material/ListItem"));
const getMuiListItemThemeOverrides = () => {
    return {
        MuiListItem: {
            styleOverrides: {
                root: ({ ownerState, theme }) => {
                    const borderStyle = ownerState.hasBorder ? {
                        borderBottom: `1px solid ${theme.palette.border.secondary}`,
                        paddingBottom: '4px',
                        marginBottom: '4px',
                    } : {};
                    return Object.assign({}, borderStyle);
                },
            },
        },
    };
};
exports.getMuiListItemThemeOverrides = getMuiListItemThemeOverrides;
const ListItem = react_1.default.forwardRef((props, ref) => {
    return react_1.default.createElement(ListItem_1.default, Object.assign({ ref: ref }, props));
});
ListItem.defaultProps = {
    hasBorder: false,
};
__exportStar(require("@mui/material/ListItem"), exports);
exports.default = ListItem;
