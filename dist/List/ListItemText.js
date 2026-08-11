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
exports.getMuiListItemTextThemeOverrides = void 0;
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const ListItemText_1 = __importDefault(require("@mui/material/ListItemText"));
const Tooltip_1 = __importDefault(require("../Tooltip"));
const domUtils_1 = require("../utils/domUtils");
const getMuiListItemTextThemeOverrides = () => {
    return {
        MuiListItemText: {
            styleOverrides: {
                root: ({ ownerState, theme }) => {
                    return {
                        margin: '0',
                        '&.list-item-text-truncate .MuiTypography-root': {
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        },
                    };
                },
            },
        },
    };
};
exports.getMuiListItemTextThemeOverrides = getMuiListItemTextThemeOverrides;
const ListItemText = (_a) => {
    var { tooltip, tooltipPlacement, forceTooltip, secondaryTooltip, secondaryTooltipPlacement } = _a, props = __rest(_a, ["tooltip", "tooltipPlacement", "forceTooltip", "secondaryTooltip", "secondaryTooltipPlacement"]);
    const listRef = react_1.default.useRef(null);
    const [tooltipValue, setTooltipValue] = react_1.default.useState('');
    const [secondaryTooltipValue, setSecondaryTooltipValue] = react_1.default.useState('');
    react_1.default.useEffect(() => {
        if (forceTooltip) {
            setTooltipValue(tooltip);
            setSecondaryTooltipValue(secondaryTooltip);
        }
        else if (listRef && listRef.current) {
            const isOver = (0, domUtils_1.isOverflown)(listRef.current);
            if (isOver) {
                setTooltipValue(tooltip);
                setSecondaryTooltipValue(secondaryTooltip);
            }
            else {
                setTooltipValue('');
                setSecondaryTooltipValue('');
            }
        }
    }, [listRef, tooltip, forceTooltip]);
    let primaryReactNode = props.primary;
    let secondaryReactNode = props.secondary && props.secondary;
    if (tooltipValue) {
        primaryReactNode = (react_1.default.createElement(Tooltip_1.default, { title: tooltipValue, placement: tooltipPlacement },
            react_1.default.createElement(material_1.Grid, { container: true },
                react_1.default.createElement(material_1.Grid, { item: true, sx: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, primaryReactNode))));
    }
    if (secondaryTooltipValue) {
        secondaryReactNode = (react_1.default.createElement(Tooltip_1.default, { title: secondaryTooltipValue, placement: secondaryTooltipPlacement },
            react_1.default.createElement(material_1.Grid, { container: true },
                react_1.default.createElement(material_1.Grid, { item: true, sx: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, secondaryReactNode))));
    }
    return (react_1.default.createElement(ListItemText_1.default, Object.assign({ className: `${tooltip ? '' : 'list-item-text-truncate'}`, ref: listRef }, props, { primary: primaryReactNode, secondary: secondaryReactNode })));
};
ListItemText.defaultProps = {
    tooltipPlacement: 'right',
    secondaryTooltipPlacement: 'right',
    forceTooltip: false,
};
__exportStar(require("@mui/material/ListItemText"), exports);
exports.default = ListItemText;
