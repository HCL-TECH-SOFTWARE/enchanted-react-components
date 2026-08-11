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
exports.getMuiMenuItemThemeOverrides = void 0;
const react_1 = __importDefault(require("react"));
const MenuItem_1 = __importDefault(require("@mui/material/MenuItem"));
const getMuiMenuItemThemeOverrides = () => {
    return {
        MuiMenuItem: {
            styleOverrides: {
                // Those adjustments are needed for the Select menu overlay comp
                root: ({ ownerState, theme }) => {
                    return {
                        // The placeholder item, should not showed inside of the menu list
                        '&.Mui-disabled:has(em)': {
                            display: 'none',
                        },
                        // All the adjustment from this line has done for updating menu component as per design requirement
                        display: 'flex',
                        '&.MuiMenuItem-root': Object.assign(Object.assign(Object.assign({ border: '1px solid transparent', paddingLeft: '0px', paddingRight: '0px' }, (ownerState.size === 'medium' && {
                            paddingTop: '5px',
                            paddingBottom: '5px',
                            minHeight: '36px',
                        })), (ownerState.size === 'small' && {
                            paddingTop: '3px',
                            paddingBottom: '3px',
                            minHeight: '28px',
                        })), { '&:hover': {
                                backgroundColor: theme.palette.action.hover,
                            }, '&.Mui-focusVisible': {
                                border: `1px solid ${theme.palette.primary.main}`,
                                backgroundColor: 'transparent',
                                '&:hover': {
                                    backgroundColor: theme.palette.action.hover,
                                },
                            }, '&.MuiButtonBase-root.MuiMenuItem-root.MuiMenuItem-root.Mui-selected': {
                                backgroundColor: `${theme.palette.action.activeOpacity}`,
                                '&:hover': {
                                    backgroundColor: theme.palette.action.hover,
                                },
                                '&.Mui-focusVisible': {
                                    border: `1px solid ${theme.palette.primary.main}`,
                                    backgroundColor: 'transparent',
                                    '&:hover': {
                                        backgroundColor: theme.palette.action.hover,
                                    },
                                },
                            } }),
                        '.MuiListItemIcon-root': Object.assign(Object.assign({ marginLeft: '8px' }, (ownerState.size === 'medium' && {
                            minWidth: '24px',
                        })), (ownerState.size === 'small' && {
                            minWidth: '20px',
                        })),
                        '.MuiListItemText-root': Object.assign(Object.assign(Object.assign({}, (ownerState.size === 'medium' && {
                            marginLeft: '16px',
                        })), (ownerState.size === 'small' && {
                            marginLeft: '8px',
                        })), { marginRight: '8px', '.MuiTypography-root': Object.assign({ display: 'block' }, (ownerState.size === 'small' && {
                                paddingTop: '2.5px',
                            })) }),
                        '.MuiTypography-root': Object.assign(Object.assign(Object.assign({ display: 'flex', alignItems: 'center', marginLeft: '8px', color: theme.palette.text.primary }, (ownerState.size === 'medium' && Object.assign(Object.assign({}, theme.typography.body1), { minHeight: '24px' }))), (ownerState.size === 'small' && Object.assign(Object.assign({}, theme.typography.body2), { minHeight: '20px', marginRight: '4px' }))), (ownerState.disabled && {
                            color: theme.palette.text.disabled,
                        })),
                        '.MuiListItemText-root + .MuiTypography-root': Object.assign(Object.assign(Object.assign({ color: theme.palette.text.secondary }, (ownerState.disabled && {
                            color: theme.palette.text.disabled,
                        })), (ownerState.size === 'medium' && {
                            marginRight: ownerState.cascading ? '0px' : '8px',
                        })), (ownerState.size === 'small' && {
                            marginRight: '4px',
                        })),
                        '.MuiTypography-root + .MuiListItemIcon-root': Object.assign(Object.assign({}, (ownerState.size === 'medium' && {
                            marginRight: '8px',
                            marginLeft: '0px',
                        })), (ownerState.size === 'small' && {
                            marginRight: '4px',
                            marginLeft: '0px',
                        })),
                        '.MuiListItemText-root + .MuiListItemIcon-root': Object.assign(Object.assign({}, (ownerState.size === 'medium' && {
                            marginRight: '8px',
                        })), (ownerState.size === 'small' && {
                            marginRight: '4px',
                        })),
                        '.MuiListItemText-inset ': {
                            paddingLeft: '28px',
                        },
                    };
                },
            },
        },
    };
};
exports.getMuiMenuItemThemeOverrides = getMuiMenuItemThemeOverrides;
const MenuItem = (_a) => {
    var props = __rest(_a, []);
    return react_1.default.createElement(MenuItem_1.default, Object.assign({}, props));
};
MenuItem.defaultProps = {
    size: 'medium',
    disabled: false,
};
__exportStar(require("@mui/material/MenuItem"), exports);
exports.default = MenuItem;
