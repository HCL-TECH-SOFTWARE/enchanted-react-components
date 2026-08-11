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
exports.getMuiTooltipThemeOverrides = exports.TooltipPlacement = exports.TooltipTypes = exports.TooltipSizes = void 0;
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
const Tooltip_1 = __importDefault(require("@mui/material/Tooltip"));
var TooltipSizes;
(function (TooltipSizes) {
    TooltipSizes["SMALL"] = "small";
    TooltipSizes["MEDIUM"] = "medium";
})(TooltipSizes = exports.TooltipSizes || (exports.TooltipSizes = {}));
var TooltipTypes;
(function (TooltipTypes) {
    TooltipTypes["SINGLELINE"] = "singleLine";
    TooltipTypes["MULTILINE"] = "multiLine";
})(TooltipTypes = exports.TooltipTypes || (exports.TooltipTypes = {}));
var TooltipPlacement;
(function (TooltipPlacement) {
    TooltipPlacement["TOPSTART"] = "top-start";
    TooltipPlacement["TOP"] = "top";
    TooltipPlacement["TOPEND"] = "top-end";
    TooltipPlacement["RIGHTSTART"] = "right-start";
    TooltipPlacement["RIGHT"] = "right";
    TooltipPlacement["RIGHTEND"] = "right-end";
    TooltipPlacement["BOTTOMEND"] = "bottom-end";
    TooltipPlacement["BOTTOM"] = "bottom";
    TooltipPlacement["BOTTOMSTART"] = "bottom-start";
    TooltipPlacement["LEFTEND"] = "left-end";
    TooltipPlacement["LEFT"] = "left";
    TooltipPlacement["LEFTSTART"] = "left-start";
})(TooltipPlacement = exports.TooltipPlacement || (exports.TooltipPlacement = {}));
const Tooltip = (_a) => {
    var props = __rest(_a, []);
    return react_1.default.createElement(Tooltip_1.default, Object.assign({}, props));
};
/**
 * @returns override Tooltip component styles and props
 */
const getMuiTooltipThemeOverrides = () => {
    return {
        MuiTooltip: {
            styleOverrides: {
                tooltip: ({ ownerState, theme }) => {
                    return ({
                        backgroundColor: theme.palette.background.dark,
                        color: theme.palette.text.tertiary1,
                        borderRadius: '2px',
                        '&.MuiTooltip-tooltip': Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, ownerState.tooltipsize === TooltipSizes.SMALL && Object.assign(Object.assign({}, theme.typography.caption), { padding: '5px 8px 5px 8px' })), ownerState.tooltipsize === TooltipSizes.MEDIUM && Object.assign(Object.assign({}, theme.typography.body2), { padding: '8px' })), ownerState.type === TooltipTypes.SINGLELINE && {
                            whiteSpace: 'nowrap',
                            maxWidth: 'none',
                        }), ownerState.type === TooltipTypes.MULTILINE && {
                            maxWidth: ownerState.maxwidth,
                        }), { '&.MuiTooltip-tooltipPlacementBottom': {
                                // Set 4px margin from top when tooltip is placed in the bottom of the anchor to make spacing between anchor and tooltip
                                margin: '4px 0px 0px 0px',
                            }, '&.MuiTooltip-tooltipPlacementTop': {
                                // Set 4px margin from bottom when tooltip is placed on the top of the anchor to make spacing between anchor and tooltip
                                margin: '0px 0px 4px 0px',
                            }, '&.MuiTooltip-tooltipPlacementLeft': {
                                // Set 4px margin from right when tooltip is placed on the left of the anchor to make spacing between anchor and tooltip
                                margin: '0px 4px 0px 0px',
                            }, '&.MuiTooltip-tooltipPlacementRight': {
                                // Set 4px margin from left when tooltip is placed on the right of the anchor to make spacing between anchor and tooltip
                                margin: '0px 0px 0px 4px',
                            } }),
                    });
                },
            },
        },
    };
};
exports.getMuiTooltipThemeOverrides = getMuiTooltipThemeOverrides;
__exportStar(require("@mui/material/Tooltip"), exports);
exports.default = Tooltip;
