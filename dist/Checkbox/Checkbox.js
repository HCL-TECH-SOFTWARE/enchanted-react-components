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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMuiCheckboxThemeOverrides = exports.CheckboxVariants = void 0;
const react_1 = __importDefault(require("react"));
const Checkbox_1 = __importDefault(require("@mui/material/Checkbox"));
var CheckboxVariants;
(function (CheckboxVariants) {
    CheckboxVariants["WITHOUT_PADDING"] = "without padding";
    CheckboxVariants["WITH_PADDING"] = "with padding";
})(CheckboxVariants = exports.CheckboxVariants || (exports.CheckboxVariants = {}));
/**
 * Override out of the box styling from mui to align with designer theme
 * @returns override Checkbox component styles and prop
 */
const getMuiCheckboxThemeOverrides = () => {
    return {
        MuiCheckbox: {
            styleOverrides: {
                root: ({ ownerState, theme }) => {
                    return (Object.assign(Object.assign(Object.assign({}, ownerState.variant === CheckboxVariants.WITH_PADDING && {
                        padding: '4px',
                        marginRight: '4px',
                        marginTop: '4px',
                        marginLeft: '4px',
                        ' + .MuiTypography-root': {
                            maxHeight: '30px',
                            marginTop: '4px',
                            marginRight: '16px',
                            '& .MuiTypography-body2': {
                                color: theme.palette.text.primary,
                            },
                            '& .MuiTypography-caption': {
                                color: theme.palette.text.secondary,
                            },
                            '&.Mui-disabled': {
                                '& .MuiTypography-body2': {
                                    color: theme.palette.text.disabled,
                                },
                                '& .MuiTypography-caption': {
                                    color: theme.palette.text.disabled,
                                },
                            },
                        },
                        '&.Mui-focusVisible': {
                            border: `1px solid ${theme.palette.primary.main}`,
                            borderRadius: '3px',
                            width: '18px',
                            height: '18px',
                            margin: '8px',
                            marginRight: '8px',
                            ' + .MuiTypography-root': {
                                marginTop: 0,
                            },
                            '&:hover': {
                                borderRadius: '3px',
                            },
                            input: {
                                '&:focus': {
                                    outline: 'none',
                                },
                            },
                        },
                    }), ownerState.variant === CheckboxVariants.WITHOUT_PADDING && {
                        padding: '4px',
                        marginRight: '4px',
                        ' + .MuiTypography-root': {
                            maxHeight: '30px',
                            '& .MuiTypography-body2': {
                                color: theme.palette.text.primary,
                            },
                            '& .MuiTypography-caption': {
                                color: theme.palette.text.secondary,
                            },
                            '&.Mui-disabled': {
                                '& .MuiTypography-body2': {
                                    color: theme.palette.text.disabled,
                                },
                                '& .MuiTypography-caption': {
                                    color: theme.palette.text.disabled,
                                },
                            },
                        },
                        '&.Mui-focusVisible': {
                            border: `1px solid ${theme.palette.primary.main}`,
                            borderRadius: '3px',
                            width: '18px',
                            height: '18px',
                            margin: '4px',
                            marginRight: '8px',
                            '&:hover': {
                                borderRadius: '3px',
                            },
                            input: {
                                '&:focus': {
                                    outline: 'none',
                                },
                            },
                        },
                    }), { border: 'transparent 1px solid', '&.MuiButtonBase-root:hover': {
                            backgroundColor: theme.palette.action.hover,
                            borderRadius: '2px',
                        }, '.MuiSvgIcon-root': {
                            height: '16px',
                            width: '16px',
                        } }));
                },
            },
        },
    };
};
exports.getMuiCheckboxThemeOverrides = getMuiCheckboxThemeOverrides;
const Checkbox = react_1.default.forwardRef((props, ref) => {
    return react_1.default.createElement(Checkbox_1.default, Object.assign({ ref: ref }, props));
});
Checkbox.defaultProps = {
    variant: CheckboxVariants.WITHOUT_PADDING,
    indeterminate: false,
    disabled: false,
    disableRipple: true,
};
exports.default = Checkbox;
