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
exports.getMuiToggleButtonThemeOverrides = exports.ToggleButtonSizes = exports.ToggleButtonVariants = void 0;
const react_1 = __importDefault(require("react"));
const ToggleButton_1 = __importDefault(require("@mui/material/ToggleButton"));
var ToggleButtonVariants;
(function (ToggleButtonVariants) {
    ToggleButtonVariants["WITHOUT_PADDING"] = "without padding";
    ToggleButtonVariants["WITH_PADDING"] = "with padding";
})(ToggleButtonVariants = exports.ToggleButtonVariants || (exports.ToggleButtonVariants = {}));
var ToggleButtonSizes;
(function (ToggleButtonSizes) {
    ToggleButtonSizes["SMALL"] = "small";
    ToggleButtonSizes["MEDIUM"] = "medium";
})(ToggleButtonSizes = exports.ToggleButtonSizes || (exports.ToggleButtonSizes = {}));
const ToggleButton = react_1.default.forwardRef((_a, forwardRef) => {
    var props = __rest(_a, []);
    return react_1.default.createElement(ToggleButton_1.default, Object.assign({}, props, { ref: forwardRef, "aria-disabled": props.disabled }));
});
ToggleButton.defaultProps = {
    variant: ToggleButtonVariants.WITH_PADDING,
    disabled: false,
    disableFocusRipple: true,
    disableRipple: true,
    centerRipple: false,
    disableTouchRipple: false,
    focusRipple: false,
    tabIndex: 0,
};
const getMuiToggleButtonThemeOverrides = () => {
    return {
        MuiToggleButton: {
            styleOverrides: {
                root: ({ ownerState, theme }) => {
                    return ({
                        border: `1px solid ${theme.palette.border.secondary}`,
                        padding: '0px',
                        borderRadius: '2px',
                        '.MuiSvgIcon-root': Object.assign(Object.assign({}, ownerState.variant === ToggleButtonVariants.WITHOUT_PADDING && Object.assign(Object.assign({ margin: '1px', padding: '0px' }, ownerState.size === ToggleButtonSizes.SMALL && {
                            height: '16px',
                            width: '16px',
                        }), ownerState.size === ToggleButtonSizes.MEDIUM && {
                            height: '20px',
                            width: '20px',
                        })), ownerState.variant === ToggleButtonVariants.WITH_PADDING && Object.assign(Object.assign({ margin: '3px', padding: '0px' }, ownerState.size === ToggleButtonSizes.SMALL && {
                            height: '16px',
                            width: '16px',
                        }), ownerState.size === ToggleButtonSizes.MEDIUM && {
                            height: '20px',
                            width: '20px',
                        })),
                        '&.Mui-selected': {
                            border: `1px solid ${theme.palette.action.focus}`,
                            backgroundColor: theme.palette.action.selectedOpacityModified,
                            color: theme.palette.action.focus,
                            '&:hover': {
                                backgroundColor: theme.palette.action.selectedOpacityHover,
                                color: theme.palette.primary.dark,
                            },
                            '&.force-to-focusHover': {
                                outlineOffset: '2px',
                                outline: `1px solid ${theme.palette.action.focus}`,
                                backgroundColor: theme.palette.action.selectedOpacityHover,
                                color: theme.palette.primary.dark,
                                borderRadius: '2px',
                            },
                        },
                        '&:hover': {
                            backgroundColor: theme.palette.action.hover,
                        },
                        '&.force-to-focusHover': {
                            outlineOffset: '2px',
                            outline: `1px solid ${theme.palette.action.focus}`,
                            backgroundColor: theme.palette.action.hover,
                            borderRadius: '2px',
                        },
                        '&:focus, &.force-to-focus': {
                            outlineOffset: '2px',
                            outline: `1px solid ${theme.palette.action.focus}`,
                        },
                        '&.Mui-disabled': {
                            color: theme.palette.action.disabled,
                            '&.Mui-selected': {
                                border: `1px solid ${theme.palette.border.secondary}`,
                                backgroundColor: theme.palette.action.disabledOpacityModified,
                            },
                        },
                    });
                },
            },
        },
    };
};
exports.getMuiToggleButtonThemeOverrides = getMuiToggleButtonThemeOverrides;
exports.default = ToggleButton;
