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
exports.getMuiButtonThemeOverrides = exports.ButtonTestIds = exports.ButtonVariants = void 0;
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
const Button_1 = __importDefault(require("@mui/material/Button"));
var ButtonVariants;
(function (ButtonVariants) {
    ButtonVariants["CONTAINED"] = "contained";
    ButtonVariants["OUTLINED"] = "outlined";
    ButtonVariants["TEXT"] = "text";
})(ButtonVariants = exports.ButtonVariants || (exports.ButtonVariants = {}));
var ButtonTestIds;
(function (ButtonTestIds) {
    ButtonTestIds["CONTAINED"] = "Contained";
    ButtonTestIds["OUTLINED"] = "Outlined";
    ButtonTestIds["TEXT"] = "Text";
})(ButtonTestIds = exports.ButtonTestIds || (exports.ButtonTestIds = {}));
const Button = react_1.default.forwardRef((_a, forwardRef) => {
    var props = __rest(_a, []);
    props.inversecolors = props.inversecolors ? 1 : 0;
    return (react_1.default.createElement(Button_1.default, Object.assign({ id: props.variant, variant: props.variant, sx: (theme) => {
            const inverseColor = props.inversecolors && props.variant === 'contained' ? theme.palette.text.primary : theme.palette.action.selectedInverse;
            return {
                color: props.inversecolors ? inverseColor : '',
            };
        } }, props, { ref: forwardRef })));
});
Button.defaultProps = {
    variant: ButtonVariants.CONTAINED,
    disableElevation: true,
    disableFocusRipple: true,
    fullWidth: false,
    centerRipple: false,
    disableRipple: false,
    disableTouchRipple: false,
    focusRipple: false,
    tabIndex: 0,
    inversecolors: false,
};
const getMuiButtonThemeOverrides = () => {
    return {
        MuiButton: {
            styleOverrides: {
                root: ({ ownerState, theme }) => {
                    return (Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ borderRadius: '2px', padding: '6px 12px' }, theme.typography.subtitle2), { textTransform: 'none', boxSizing: 'border-box', lineHeight: '17px', '&.Mui-focusVisible, &.force-to-focus': {
                            outline: `${ownerState.inversecolors ? theme.palette.action.selectedInverse : theme.palette.action.selected} 1px solid`,
                            outlineOffset: '2px',
                        }, '& .MuiButtonBase-root:disabled': {
                            cursor: 0,
                            pointerEvent: 'auto',
                        }, '& .MuiSvgIcon-root': {
                            height: '16px',
                            width: '16px',
                            borderRadius: '2px',
                            variant: 'contained',
                            disabled: false,
                            color: 'primary',
                        }, '& .MuiButton-endIcon': {
                            marginLeft: '4px',
                        }, '& .MuiButton-startIcon': {
                            marginRight: '4px',
                        } }), (ownerState.variant === 'contained'
                        && ownerState.color === 'primary' && {
                        backgroundColor: ownerState.inversecolors ? theme.palette.action.selectedInverse : theme.palette.action.selected,
                        '&:hover': {
                            backgroundColor: ownerState.inversecolors ? theme.palette.primary.darkInverse : theme.palette.primary.dark,
                        },
                        '&.force-to-focusHover': {
                            outline: `${ownerState.inversecolors ? theme.palette.action.selectedInverse : theme.palette.action.selected} 1px solid`,
                            outlineOffset: '2px',
                            backgroundColor: ownerState.inversecolors ? theme.palette.primary.darkInverse : theme.palette.primary.dark,
                        },
                    })), (ownerState.variant === 'outlined'
                        && ownerState.color === 'primary' && {
                        backgroundColor: ownerState.inversecolors ? 'inherit' : theme.palette.background.paper,
                        borderColor: ownerState.inversecolors ? theme.palette.action.selectedInverse : theme.palette.action.selected,
                        '&:hover': {
                            backgroundColor: ownerState.inversecolors ? theme.palette.action.hoverInverse : theme.palette.action.hover,
                            borderColor: ownerState.inversecolors ? theme.palette.action.selectedInverse : theme.palette.action.selected,
                        },
                        '&.force-to-focusHover': {
                            outline: `${ownerState.inversecolors ? theme.palette.action.selectedInverse : theme.palette.action.selected} 1px solid`,
                            outlineOffset: '2px',
                            backgroundColor: ownerState.inversecolors ? theme.palette.action.hoverInverse : theme.palette.action.hover,
                        },
                    })), (ownerState.variant === 'text'
                        && ownerState.color === 'primary' && {
                        backgroundColor: ownerState.inversecolors ? 'inherit' : theme.palette.background.paper,
                        '&:hover': {
                            backgroundColor: ownerState.inversecolors ? theme.palette.action.hoverInverse : theme.palette.action.hover,
                        },
                        '&.force-to-focusHover': {
                            outline: `${ownerState.inversecolors ? theme.palette.action.selectedInverse : theme.palette.action.selected} 1px solid`,
                            outlineOffset: '2px',
                            backgroundColor: ownerState.inversecolors ? theme.palette.action.hoverInverse : theme.palette.action.hover,
                        },
                    })), (ownerState.size === 'neutral' && {
                        height: '20px',
                        width: 'auto',
                        minWidth: 'auto',
                        padding: '0 4px',
                        fontWeight: 'normal',
                    })), (ownerState.size === 'neutral' && ownerState.variant === 'contained' && (!ownerState.color || ownerState.color === 'primary') && {
                        color: theme.palette.text.secondary,
                        backgroundColor: theme.palette.action.disabledOpacityModified,
                        border: 'none',
                        '&:hover': {
                            backgroundColor: theme.palette.action.disableOpacityHover,
                            color: theme.palette.text.primary,
                        },
                        '&.Mui-focusVisible, &.force-to-focus': {
                            backgroundColor: theme.palette.action.disabledOpacityModified,
                            color: theme.palette.text.secondary,
                            outline: `${theme.palette.action.selected} 1px solid`,
                            outlineOffset: '2px',
                        },
                        '&.force-to-focusHover': {
                            backgroundColor: theme.palette.action.disableOpacityHover,
                            color: theme.palette.text.primary,
                            outline: `${theme.palette.action.selected} 1px solid`,
                            outlineOffset: '2px',
                        },
                        '&.Mui-disabled': {
                            backgroundColor: theme.palette.action.disabledBackground,
                            color: theme.palette.text.disabled,
                        },
                    })), (ownerState.size === 'neutral' && ownerState.variant === 'outlined' && (!ownerState.color || ownerState.color === 'primary') && {
                        color: theme.palette.text.secondary,
                        backgroundColor: 'transparent',
                        borderColor: theme.palette.text.secondary,
                        '&:hover': {
                            backgroundColor: theme.palette.action.hover,
                            color: theme.palette.text.primary,
                            borderColor: theme.palette.text.primary,
                        },
                        '&.Mui-focusVisible, &.force-to-focus': {
                            backgroundColor: 'transparent',
                            color: theme.palette.text.secondary,
                            borderColor: theme.palette.text.secondary,
                            outline: `${theme.palette.action.selected} 1px solid`,
                            outlineOffset: '2px',
                        },
                        '&.force-to-focusHover': {
                            backgroundColor: theme.palette.action.hover,
                            color: theme.palette.text.primary,
                            borderColor: theme.palette.text.primary,
                            outline: `${theme.palette.action.selected} 1px solid`,
                            outlineOffset: '2px',
                        },
                        '&.Mui-disabled': {
                            backgroundColor: 'transparent',
                            color: theme.palette.action.disabledBackground,
                            borderColor: theme.palette.action.disabledBackground,
                        },
                    })), (ownerState.size === 'neutral' && ownerState.variant === 'contained' && ownerState.color && ownerState.color !== 'primary' && {
                        color: theme.palette.action.selected,
                        backgroundColor: theme.palette.action.selectedOpacityModified,
                        border: 'none',
                        '&:hover': {
                            backgroundColor: theme.palette.action.selectedOpacityHover,
                        },
                        '&.Mui-focusVisible, &.force-to-focus': {
                            backgroundColor: theme.palette.action.selectedOpacityModified,
                            outline: `${theme.palette.action.selected} 1px solid`,
                            outlineOffset: '2px',
                        },
                        '&.force-to-focusHover': {
                            backgroundColor: theme.palette.action.selectedOpacityHover,
                            outline: `${theme.palette.action.selected} 1px solid`,
                            outlineOffset: '2px',
                        },
                    })), (ownerState.size === 'neutral' && ownerState.variant === 'outlined' && ownerState.color && ownerState.color !== 'primary' && {
                        color: theme.palette.action.selected,
                        backgroundColor: theme.palette.action.selectedOpacityModified,
                        borderColor: theme.palette.action.selected,
                        '&:hover': {
                            backgroundColor: theme.palette.action.selectedOpacityHover,
                            borderColor: theme.palette.action.selected,
                        },
                        '&.Mui-focusVisible, &.force-to-focus': {
                            backgroundColor: theme.palette.action.selectedOpacityModified,
                            outline: `${theme.palette.action.selected} 1px solid`,
                            outlineOffset: '2px',
                        },
                        '&.force-to-focusHover': {
                            backgroundColor: theme.palette.action.selectedOpacityHover,
                            outline: `${theme.palette.action.selected} 1px solid`,
                            outlineOffset: '2px',
                        },
                        '&.Mui-disabled': {
                            backgroundColor: theme.palette.action.disabledBackground,
                        },
                    })));
                },
            },
        },
    };
};
exports.getMuiButtonThemeOverrides = getMuiButtonThemeOverrides;
__exportStar(require("@mui/material/Button"), exports);
exports.default = Button;
