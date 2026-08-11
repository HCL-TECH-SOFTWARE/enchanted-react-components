"use strict";
/* ======================================================================== *
 * Copyright 2026 HCL America Inc.                                          *
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
exports.getMuiTextFieldThemeOverrides = void 0;
const react_1 = __importDefault(require("react"));
const FormControl_1 = __importDefault(require("@mui/material/FormControl"));
const TextField_1 = __importDefault(require("@mui/material/TextField"));
const FormHelperText_1 = __importDefault(require("@mui/material/FormHelperText"));
const warning_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/warning"));
const material_1 = require("@mui/material");
const utils_1 = require("@mui/utils");
const styles_1 = require("@mui/material/styles");
const Typography_1 = __importDefault(require("../Typography"));
const InputLabelAndAction_1 = __importDefault(require("../prerequisite_components/InputLabelAndAction/InputLabelAndAction"));
const getMuiTextFieldThemeOverrides = () => {
    return {
        MuiTextField: {
            styleOverrides: {
                root: ({ ownerState, theme }) => {
                    return {
                        // below MuiTextField override only applicable for Autocomplete to make sure Autocomplete is parent component
                        '.MuiAutocomplete-inputRoot': Object.assign(Object.assign({}, ownerState.error ? {
                            '&.MuiOutlinedInput-root:focus-within': {
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: `2px solid ${theme.palette.error.main}`,
                                },
                            },
                            '&.MuiOutlinedInput-root:hover': {
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: `${theme.palette.error.main}`,
                                },
                            },
                            '& .MuiAutocomplete-clearIndicator': {
                                marginRight: '34px',
                                left: '3px',
                            },
                        } : {
                            '& .MuiInputBase-root:hover': {
                                outline: `1px solid ${theme.palette.border.primary}`,
                            },
                            '&.MuiOutlinedInput-root:focus-within': {
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: `2px solid ${theme.palette.primary.main}`,
                                },
                            },
                        }), { '&.MuiOutlinedInput-root': {
                                paddingRight: ownerState.disabled ? '8px' : '16px',
                            } }),
                        '.MuiOutlinedInput-root': Object.assign({ '&:not(.Mui-disabled)': {
                                background: theme.palette.common.white,
                            } }, ownerState.error ? {
                            '&.MuiOutlinedInput-root:focus-within': {
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: `2px solid ${theme.palette.error.main}`,
                                },
                            },
                            '&.MuiOutlinedInput-root:hover': {
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: `${theme.palette.error.main}`,
                                },
                            },
                        } : {
                            '& .MuiInputBase-root:hover': {
                                outline: `1px solid ${theme.palette.border.primary}`,
                            },
                            '&.MuiOutlinedInput-root:focus-within': {
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: ownerState.disabled ? `${theme.palette.error.main}` : `2px solid ${theme.palette.primary.main}`,
                                },
                            },
                        }),
                        // below MuiTextField override only applicable for DatePicker to make sure DatePicker is parent component
                        '[data-mui-test=calendarIcon] + .MuiTouchRipple-root': {
                            color: 'transparent',
                        },
                    };
                },
            },
        },
        MuiFormHelperText: {
            styleOverrides: {
                contained: ({ theme }) => {
                    return Object.assign(Object.assign({}, theme.typography.caption), { color: theme.palette.text.secondary, marginTop: '4px', cursor: 'default', marginLeft: '0px', marginRight: '0px', textAlign: 'left' });
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: ({ theme }) => {
                    return {
                        borderRadius: '2px',
                        width: '100%',
                        margin: '0px',
                        padding: '5px 8px',
                        input: Object.assign(Object.assign({}, theme.typography.body2), { color: theme.palette.text.primary, padding: '0px', height: '1.5em', '&::placeholder': {
                                fontStyle: 'italic',
                                color: theme.palette.text.secondary,
                                opacity: 9,
                            } }),
                        textarea: Object.assign(Object.assign({}, theme.typography.body2), { color: theme.palette.text.primary, paddingTop: '1px', paddingBottom: '1px', '&::placeholder': {
                                fontStyle: 'italic',
                                color: theme.palette.text.secondary,
                                opacity: 9,
                            } }),
                        '&.MuiInputBase-fullWidth': {
                            width: '100%',
                        },
                        '&.Mui-disabled': {
                            backgroundColor: theme.palette.action.disabledBackground,
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.action.disabledBackground,
                            },
                            ':hover': {
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: theme.palette.action.disabledBackground,
                                },
                            },
                            '& [class*=MuiInputAdornment-positionEnd]': {
                                '& [class*=MuiTypography-body2]': {
                                    color: theme.palette.text.disabled,
                                    cursor: 'default',
                                },
                                '& button': {
                                    pointerEvents: 'none',
                                    cursor: 'default',
                                    '& svg': {
                                        color: theme.palette.text.disabled,
                                    },
                                },
                            },
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            top: '0px',
                            borderColor: theme.palette.border.tertiary,
                            borderRadius: '2px',
                            '& legend': {
                                display: 'none',
                            },
                        },
                        '&.Mui-error': {
                            ':hover': {
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: theme.palette.error.main,
                                },
                            },
                            '&.Mui-focused': {
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: theme.palette.error.main,
                                },
                            },
                        },
                        ':hover': {
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.action.active,
                            },
                        },
                        '&.Mui-focused': {
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.action.focus,
                            },
                        },
                        '& [class*=MuiButtonBase-root]': {
                            padding: '0px',
                            minWidth: 'unset',
                        },
                        '& [class*=MuiInputAdornment-root]': {
                            margin: '0px',
                        },
                        '& [class*=MuiInputAdornment-positionStart]': {
                            marginRight: '8px',
                            height: '18px',
                            '& svg:not(.MuiCircularProgress-svg)': {
                                margin: '0px 0px 0px 4px',
                                padding: '0px',
                                fontSize: '16px',
                            },
                            '& [class*=MuiTypography-body2]': {
                                margin: '0px 0px 0px 8px',
                                cursor: 'default',
                            },
                        },
                        '& [class*=MuiInputAdornment-positionEnd]': {
                            height: '18px',
                            '& svg:not(.MuiCircularProgress-svg)': {
                                margin: '0px',
                                padding: '0px',
                                fontSize: '16px',
                            },
                            '& [class*=MuiTypography-body2]': {
                                margin: '0px 0px 0px 8px',
                                cursor: 'default',
                            },
                            '& button': {
                                minWidth: '0px',
                                margin: '0px 0px 0px 8px',
                                padding: '0px',
                                '& svg': {
                                    margin: '0px',
                                    height: '16px',
                                    width: '16px',
                                },
                            },
                        },
                    };
                },
            },
        },
    };
};
exports.getMuiTextFieldThemeOverrides = getMuiTextFieldThemeOverrides;
const StyledMuiFormControl = (0, styles_1.styled)(FormControl_1.default)((theme) => {
    return {
        '.MuiAutocomplete--label--focused': {
            color: theme.theme.palette.primary.main,
        },
    };
});
const getStartAdornment = (props, isComboBox) => {
    var _a;
    if ((_a = props.InputProps) === null || _a === void 0 ? void 0 : _a.startAdornment) {
        // For comboBox (Autocomplete), startAdornment may contain chips from MUI's
        // multiple mode or custom icons already wrapped by Autocomplete.
        // Pass through as-is to avoid double-wrapping in InputAdornment which
        // constrains chips to fixed height and breaks chip layout.
        return props.InputProps.startAdornment;
    }
    return null;
};
const getEndAdornment = (props, isComboBox) => {
    var _a, _b;
    // This is workaround until proper Search component has already been implemented
    // This hides the endAdornment when startAdornment is present and it's a simple Textfield (NOT affecting Autocomplete / Multiselect)
    if (((_a = props.InputProps) === null || _a === void 0 ? void 0 : _a.startAdornment) !== undefined && !isComboBox) {
        return null;
    }
    // end of comment
    return (react_1.default.createElement(react_1.default.Fragment, null,
        props.error ? react_1.default.createElement(warning_1.default, { color: "error" }) : null,
        props.unitLabel ? react_1.default.createElement(Typography_1.default, { variant: "body2" }, props.unitLabel) : null,
        !isComboBox && props.endAdornmentAction ? props.endAdornmentAction : null,
        isComboBox && ((_b = props.InputProps) === null || _b === void 0 ? void 0 : _b.endAdornment)));
};
const getInputLabelAndActionProps = (props, isFocus) => {
    const inputLabelId = props.id ? `${props.id}-label` : undefined;
    const inputLabelProps = {
        color: props.color,
        disabled: props.disabled,
        error: props.error,
        required: props.required,
        sx: props.sx,
        htmlFor: props.id,
        id: inputLabelId,
        label: props.label,
        helperIconTooltip: props.helperIconTooltip,
        actionProps: props.actionProps,
        hiddenLabel: props.hiddenLabel,
        fullWidth: props.fullWidth,
        isFocus,
        enableHelpHoverEffect: props.enableHelpHoverEffect,
        customIcon: props.customIcon,
    };
    return inputLabelProps;
};
const getMuiFormControlProps = (props, forwardRef) => {
    const muiFormControlProps = {
        color: props.color,
        disabled: props.disabled,
        error: props.error,
        focused: props.focused,
        fullWidth: props.fullWidth,
        hiddenLabel: props.hiddenLabel,
        margin: props.margin,
        required: props.required,
        size: props.size,
        sx: props.sx,
        ref: forwardRef,
    };
    return muiFormControlProps;
};
const getMuiTextFieldProps = (props) => {
    var _a, _b, _c, _d;
    const isComboBox = Boolean((_b = (_a = props.InputProps) === null || _a === void 0 ? void 0 : _a.className) === null || _b === void 0 ? void 0 : _b.startsWith('MuiAutocomplete'));
    const cleanedProps = Object.assign({}, props);
    delete cleanedProps.actionProps;
    delete cleanedProps.nonEdit;
    delete cleanedProps.unitLabel;
    delete cleanedProps.helperIconTooltip;
    delete cleanedProps.renderNonEditInput;
    delete cleanedProps.endAdornmentAction;
    delete cleanedProps.enableHelpHoverEffect;
    delete cleanedProps.customIcon;
    const muiTextFieldProps = Object.assign(Object.assign({}, cleanedProps), { variant: 'outlined', label: undefined, InputProps: Object.assign(Object.assign({}, props.InputProps), { startAdornment: getStartAdornment(props, isComboBox), endAdornment: ((_c = props.InputProps) === null || _c === void 0 ? void 0 : _c.endAdornment) && !isComboBox
                ? (_d = props.InputProps) === null || _d === void 0 ? void 0 : _d.endAdornment
                : react_1.default.createElement(material_1.InputAdornment, { position: "end" }, getEndAdornment(props, isComboBox)) }) });
    return muiTextFieldProps;
};
const renderNonEditInput = (props, muiTextFieldProps) => {
    if (props.renderNonEditInput) {
        return props.renderNonEditInput();
    }
    return react_1.default.createElement(Typography_1.default, { variant: "body2" }, muiTextFieldProps.value ? muiTextFieldProps.value : null);
};
const renderInput = (props, setIsFocus) => {
    const muiTextFieldProps = getMuiTextFieldProps(props);
    const helperTextId = props.helperText && props.id ? `${props.id}-helper-text` : undefined;
    if (props.nonEdit) {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            renderNonEditInput(props, muiTextFieldProps),
            react_1.default.createElement(FormHelperText_1.default, { id: helperTextId }, muiTextFieldProps.helperText)));
    }
    return (react_1.default.createElement(TextField_1.default, Object.assign({}, muiTextFieldProps, { onFocus: () => {
            setIsFocus(true);
        }, onBlur: () => {
            setIsFocus(false);
        } })));
};
const TextField = react_1.default.forwardRef((_a, forwardRef) => {
    var props = __rest(_a, []);
    const [isFocus, setIsFocus] = react_1.default.useState(false);
    if (!props.id) {
        const id = (0, utils_1.unstable_useId)();
        props.id = id;
    }
    else {
        props.id = `${(0, utils_1.unstable_useId)()}${props.id}`;
    }
    const muiInputLabelProps = getInputLabelAndActionProps(props, isFocus);
    const muiFormControlProps = getMuiFormControlProps(props, forwardRef);
    return (react_1.default.createElement(StyledMuiFormControl, Object.assign({}, muiFormControlProps),
        react_1.default.createElement(InputLabelAndAction_1.default, Object.assign({}, muiInputLabelProps)),
        renderInput(props, setIsFocus)));
});
TextField.defaultProps = {
    margin: 'none',
    color: 'primary',
    size: 'medium',
    label: '',
    helperText: '',
    helperIconTooltip: '',
    placeholder: '',
    unitLabel: '',
    required: false,
    disabled: false,
    error: false,
    fullWidth: false,
    multiline: false,
    focused: false,
    autoFocus: false,
    hiddenLabel: false,
    nonEdit: false,
};
exports.default = TextField;
