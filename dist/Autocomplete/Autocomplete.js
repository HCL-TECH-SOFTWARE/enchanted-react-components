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
exports.getMuiAutocompleteThemeOverrides = void 0;
const react_1 = __importDefault(require("react"));
const Autocomplete_1 = __importDefault(require("@mui/material/Autocomplete"));
const material_1 = require("@mui/material");
const caret__down_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/caret--down"));
const close_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/close"));
const FormHelperText_1 = __importDefault(require("@mui/material/FormHelperText"));
const FormControl_1 = __importDefault(require("@mui/material/FormControl"));
const styles_1 = require("@mui/material/styles");
const theme_1 = require("../theme");
const InputLabelAndAction_1 = __importDefault(require("../prerequisite_components/InputLabelAndAction/InputLabelAndAction"));
const TextField_1 = __importDefault(require("../TextField/TextField"));
const Tooltip_1 = __importDefault(require("../Tooltip"));
// Factory function to create a stable ListboxComponent with banner
const createBannerListboxComponent = (banner) => {
    return react_1.default.forwardRef((_a, ref) => {
        var { children } = _a, listboxProps = __rest(_a, ["children"]);
        return (react_1.default.createElement("ul", Object.assign({}, listboxProps, { ref: ref }),
            banner && (react_1.default.createElement("li", { role: "presentation", "aria-hidden": "true", style: { pointerEvents: 'none' } }, banner)),
            children));
    });
};
const getMuiFormControlProps = (_a) => {
    var props = __rest(_a, []);
    const muiFormControlProps = {
        disabled: props.disabled,
        error: Boolean(props.error),
        fullWidth: props.fullWidth,
        hiddenLabel: props.hiddenLabel,
        required: props.required,
        size: props.size,
    };
    return muiFormControlProps;
};
const AutoCompleteContainer = (0, styles_1.styled)('div')((theme) => {
    return {
        '.MuiAutocomplete--label--focused': {
            color: theme.theme.palette.primary.main,
        },
    };
});
const getInputLabelAndActionProps = (props, isFocus) => {
    const inputLabelId = props.label && props.id ? `${props.id}-label` : undefined;
    const inputLabelProps = {
        disabled: props.disabled,
        error: Boolean(props.error),
        required: props.required,
        sx: props.sx,
        htmlFor: props.id,
        id: inputLabelId,
        label: props.label,
        helperIconTooltip: props.helperIconTooltip,
        tooltipPlacement: props.tooltipPlacement,
        actionProps: props.actionProps,
        hiddenLabel: props.hiddenLabel,
        isFocus,
        fullWidth: props.fullWidth,
        enableHelpHoverEffect: props.enableHelpHoverEffect,
        customIcon: props.customIcon,
    };
    return inputLabelProps;
};
const Autocomplete = (_a) => {
    var _b;
    var props = __rest(_a, []);
    const { helperText, helperIconTooltip, actionProps, focused, hiddenLabel, nonEdit, enableHelpHoverEffect, renderNonEditInput, endAdornmentAction, startAdornment, endAdornment, listboxBanner } = props, rest = __rest(props, ["helperText", "helperIconTooltip", "actionProps", "focused", "hiddenLabel", "nonEdit", "enableHelpHoverEffect", "renderNonEditInput", "endAdornmentAction", "startAdornment", "endAdornment", "listboxBanner"]) // clean up rest of props for MuiAutocomplete tag
    ;
    // create a unique id for the autocomplete component if not provided
    props.id || (props.id = `autocomplete-${((_b = react_1.default.createRef().current) === null || _b === void 0 ? void 0 : _b.id) || Math.random().toString(36).substring(7)}`);
    const [isFocus, setIsFocus] = react_1.default.useState(false);
    const helperTextId = props.helperText ? `${props.id}-helper-text` : undefined;
    const muiFormControlProps = getMuiFormControlProps(props);
    const inputLabelAndActionProps = getInputLabelAndActionProps(props, isFocus);
    const textfieldRef = react_1.default.useRef(null);
    const [isValueOverFlowing, setIsValueOverFlowing] = react_1.default.useState(false);
    const [prevValue, setPrevValue] = react_1.default.useState('');
    const [selectedOption, setSelectedOption] = react_1.default.useState();
    react_1.default.useEffect(() => {
        const textFieldElement = textfieldRef.current;
        if (textFieldElement && textFieldElement.scrollWidth > textFieldElement.clientWidth) {
            setIsValueOverFlowing(true);
        }
        else {
            setIsValueOverFlowing(false);
        }
    }, [props.value, prevValue]);
    const getIconsCount = react_1.default.useCallback((adornment) => {
        return react_1.default.Children.toArray(adornment).filter((child) => { return react_1.default.isValidElement(child); }).length;
    }, []);
    const getStartAdornmentWidth = react_1.default.useCallback(() => {
        var _a, _b;
        let iconCount = 0;
        const parentWidth = ((_b = (_a = textfieldRef.current) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.offsetWidth) || 0;
        if (props.startAdornment) {
            iconCount += getIconsCount(props.startAdornment);
        }
        // Each icon is assumed to be 21px wide. If the parent width is very small (<= 150px), subtract 5px for tighter spacing.
        const iconWidth = ((iconCount) * 21 - (parentWidth <= 150 ? 5 : 0));
        return Math.max(iconWidth, 0);
    }, [props.startAdornment]);
    const getEndAdornmentWidth = react_1.default.useCallback(() => {
        var _a, _b, _c;
        let iconCount = 0;
        const parentWidth = ((_b = (_a = textfieldRef.current) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.offsetWidth) || 0;
        if (props.endAdornment) {
            iconCount += getIconsCount(props.endAdornment);
        }
        // Check for freeSolo first because if it's true, then the caret down icon will not be shown.
        iconCount += props.freeSolo ? 0 : 1;
        // Check if the component is disabled or disableClearable is true.
        // If either is true, the clear icon will not be shown.
        if (!props.disabled && !((_c = props.disableClearable) !== null && _c !== void 0 ? _c : false)) {
            if (props.value) {
                iconCount += 1; // show clear icon
            }
        }
        // Check if error icon should be shown.
        iconCount += props.error ? 1 : 0;
        // Calculate the total width needed for the input adornment area based on the number of icons.
        // Each icon is assumed to be 21px wide. If the parent width is very small (<= 150px), subtract 5px for tighter spacing.
        const iconWidth = ((iconCount) * 21 - (parentWidth <= 150 ? 5 : 0));
        return Math.max(iconWidth, 0);
    }, [props.endAdornment, props.error, props.freeSolo, props.disabled, textfieldRef]);
    const handleChange = (event, value, reason, details) => {
        // Value can be an option from the list or null if cleared
        setSelectedOption(value);
        if (textfieldRef.current) {
            setPrevValue(textfieldRef.current.value);
        }
        // Call the existing onChange from props if it exists
        if (rest.onChange) {
            rest.onChange(event, value, reason, details);
        }
    };
    const handleInputChange = (event, inputValue, reason) => {
        // When user types, we clear the selectedOption as it's no longer a confirmed selection
        setSelectedOption(null);
        setPrevValue(inputValue);
        // Call the existing onInputChange from props if it exists
        if (rest.onInputChange) {
            rest.onInputChange(event, inputValue, reason);
        }
    };
    return (react_1.default.createElement(AutoCompleteContainer, { className: "autocomplete-container" },
        react_1.default.createElement(FormControl_1.default, Object.assign({}, muiFormControlProps),
            react_1.default.createElement(InputLabelAndAction_1.default, Object.assign({}, inputLabelAndActionProps)),
            react_1.default.createElement(Autocomplete_1.default, Object.assign({}, rest, (listboxBanner && { ListboxComponent: createBannerListboxComponent(listboxBanner) }), { onFocus: () => {
                    setIsFocus(true);
                }, onBlur: () => {
                    setIsFocus(false);
                }, onChange: handleChange, onInputChange: handleInputChange, clearIcon: props.clearIcon ? props.clearIcon : react_1.default.createElement(close_1.default, { color: "action" }), popupIcon: react_1.default.createElement(caret__down_1.default, { color: "action" }), renderInput: (params) => {
                    var _a, _b, _c, _d, _e;
                    const textFieldArgs = Object.assign(Object.assign({}, params), { placeholder: props.placeholder, error: Boolean(props.error), required: props.required, fullWidth: props.fullWidth, sx: Object.assign(Object.assign({}, props.sx), { '& .MuiInputAdornment-root.MuiInputAdornment-positionStart': {
                                width: getStartAdornmentWidth(),
                            }, '& .MuiInputAdornment-root.MuiInputAdornment-positionEnd': {
                                width: getEndAdornmentWidth(),
                                marginLeft: getEndAdornmentWidth() > 0 ? '8px' : '0px', // add some spacing if there are icons in the end adornment
                            } }), focused,
                        hiddenLabel,
                        helperIconTooltip,
                        actionProps,
                        nonEdit, size: props.size, autoFocus: props.autoFocus, renderNonEditInput,
                        endAdornmentAction, value: props.value, enableHelpHoverEffect, InputProps: Object.assign(Object.assign({}, params.InputProps), { startAdornment: startAdornment
                                ? (react_1.default.createElement(react_1.default.Fragment, null,
                                    react_1.default.createElement(material_1.InputAdornment, { position: "start" }, startAdornment), (_a = params.InputProps) === null || _a === void 0 ? void 0 :
                                    _a.startAdornment))
                                : (_b = params.InputProps) === null || _b === void 0 ? void 0 : _b.startAdornment, endAdornment: (react_1.default.createElement(react_1.default.Fragment, null,
                                endAdornment, (_c = params.InputProps) === null || _c === void 0 ? void 0 :
                                _c.endAdornment)) }) });
                    let tooltipTitle = '';
                    const inputValue = (_e = (_d = textfieldRef.current) === null || _d === void 0 ? void 0 : _d.value) !== null && _e !== void 0 ? _e : '';
                    const getPathSegmentLabel = (segment) => {
                        if (typeof segment === 'string') {
                            return segment;
                        }
                        if (typeof segment === 'object' && segment !== null) {
                            const segmentRecord = segment;
                            const labelCandidate = segmentRecord.label;
                            const titleCandidate = segmentRecord.title;
                            const valueCandidate = segmentRecord.value;
                            // Prefer nested title.value from path nodes for consistent breadcrumb labels.
                            if (typeof titleCandidate === 'object' && titleCandidate !== null) {
                                const titleValueCandidate = titleCandidate.value;
                                if (typeof titleValueCandidate === 'string')
                                    return titleValueCandidate;
                            }
                            if (typeof labelCandidate === 'string')
                                return labelCandidate;
                            if (typeof titleCandidate === 'string')
                                return titleCandidate;
                            if (typeof valueCandidate === 'string')
                                return valueCandidate;
                        }
                        return '';
                    };
                    // Build full breadcrumb-like text from option.path.
                    const getFullPathLabel = (option) => {
                        if (typeof option !== 'object' || option === null) {
                            return '';
                        }
                        const optionRecord = option;
                        const pathValue = optionRecord.path;
                        if (Array.isArray(pathValue)) {
                            const segments = pathValue
                                .map((segment) => { return getPathSegmentLabel(segment).trim(); })
                                .filter((segment) => { return Boolean(segment); });
                            return segments.join(' / ');
                        }
                        if (typeof pathValue === 'string') {
                            return pathValue;
                        }
                        return '';
                    };
                    // Helper to check if a value matches an option
                    const isValueInOptions = (selctedValue) => {
                        if (!selctedValue)
                            return false;
                        return Array.isArray(props.options)
                            ? props.options.some((option) => {
                                if (typeof option === 'object' && option !== null) {
                                    return option.label === selctedValue || option.value === selctedValue;
                                }
                                return option === selctedValue;
                            })
                            : false;
                    };
                    const hasSelectedValue = selectedOption && typeof selectedOption === 'object' && 'label' in selectedOption;
                    const selectedValue = hasSelectedValue ? selectedOption.label : selectedOption;
                    const selectedPathValue = getFullPathLabel(selectedOption);
                    const selectedTooltipValue = selectedPathValue && selectedPathValue.length > selectedValue.length
                        ? selectedPathValue
                        : (selectedValue || selectedPathValue || '');
                    // Checking for selectedOption covers cases where user selects from dropdown or clears input
                    if (selectedOption && isValueOverFlowing) {
                        tooltipTitle = selectedTooltipValue;
                        // Checking for inputValue covers cases where user types a value and then selects it from the dropdown
                    }
                    else if (!selectedOption && isValueOverFlowing && isValueInOptions(inputValue)) {
                        tooltipTitle = inputValue;
                        // Checking for prevValue covers cases where user tabs back to a previous value or
                    }
                    else if ((prevValue === inputValue && isValueOverFlowing && isValueInOptions(prevValue))) {
                        tooltipTitle = prevValue;
                        // Checking for freeSolo mode where user can type arbitrary values
                    }
                    else if (isValueOverFlowing) {
                        tooltipTitle = props.freeSolo ? inputValue : prevValue;
                    }
                    textFieldArgs.inputProps = Object.assign({ 'aria-describedby': props.error ? undefined : helperTextId, 'aria-errormessage': props.error ? helperTextId : undefined, 'aria-labelledby': props.id ? `${props.id}-label` : undefined }, textFieldArgs.inputProps);
                    return tooltipTitle ? (react_1.default.createElement(Tooltip_1.default, { title: tooltipTitle, tooltipsize: "small" },
                        react_1.default.createElement("div", null,
                            react_1.default.createElement(TextField_1.default, Object.assign({}, textFieldArgs, { inputRef: textfieldRef }))))) : (react_1.default.createElement(TextField_1.default, Object.assign({}, textFieldArgs, { inputRef: textfieldRef })));
                } })),
            react_1.default.createElement(FormHelperText_1.default, { id: helperTextId, sx: { marginTop: nonEdit ? '0px' : '4px' } }, helperText))));
};
const getMuiAutocompleteThemeOverrides = () => {
    return {
        MuiAutocomplete: {
            styleOverrides: {
                root: ({ ownerState, theme }) => {
                    return (Object.assign(Object.assign({ lineHeight: '16px' }, ownerState.error ? {
                        '&.Mui-focused': {
                            ' .MuiFormLabel-root ': {
                                color: theme.palette.error.main,
                            },
                        },
                    } : {
                        '&.Mui-focused': {
                            ' .MuiFormLabel-root ': {
                                color: theme.palette.primary.main,
                            },
                        },
                    }), { '&.MuiAutocomplete-hasClearIcon': {
                            '&.MuiAutocomplete-hasPopupIcon .MuiOutlinedInput-root': {
                                paddingRight: '8px',
                            },
                        }, '& .MuiFormControl-root': Object.assign(Object.assign({ '.MuiGrid-root:first-of-type': {
                                display: 'none', // removes label inside autocomplete
                            }, '.MuiFormHelperText-root': {
                                display: 'none',
                            } }, theme_1.TYPOGRAPHY.body1), { '& .MuiFormLabel-root': Object.assign(Object.assign({}, theme_1.TYPOGRAPHY.subtitle2), { height: '16px' }), '& .MuiSvgIcon-colorError': {
                                position: 'absolute',
                                right: ownerState.freeSolo ? '10px' : '32px',
                                height: '100%',
                                verticalAlign: 'middle',
                                top: '0px',
                            }, '& .MuiInputBase-root': {
                                paddingTop: '5px',
                                paddingBottom: '5px',
                                paddingLeft: '8px',
                                height: '28px',
                                '&.MuiOutlinedInput-root .MuiAutocomplete-input': Object.assign(Object.assign({}, theme_1.TYPOGRAPHY.body2), { padding: '0px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', '&::placeholder': {
                                        fontStyle: 'italic',
                                        color: theme.palette.text.secondary,
                                        opacity: 9,
                                    } }),
                                '.MuiInputAdornment-root': {
                                    '.MuiAutocomplete-clearIndicator .MuiSvgIcon-root': {
                                        height: '16px',
                                        width: '16px',
                                        position: 'relative',
                                    },
                                    '.MuiAutocomplete-endAdornment': {
                                        right: '8px',
                                        '.MuiButtonBase-root': {
                                            top: '-1px',
                                            // eslint-why - a nested ternary is needed
                                            // eslint-disable-next-line no-nested-ternary
                                            margin: ownerState.error ? (ownerState.freeSolo ? '0px 30px 0px 4px' : '0px 36px 0px 4px') : '0px 6px 0px 4px',
                                            '&.MuiAutocomplete-popupIndicator ': {
                                                position: 'relative',
                                                margin: '0px',
                                                '.MuiSvgIcon-root': {
                                                    height: '16px',
                                                    width: '16px',
                                                },
                                            },
                                        },
                                    },
                                },
                            } }), '& + .MuiFormHelperText-root': {
                            marginTop: '4px',
                        } }));
                },
                popper: ({ ownerState }) => {
                    return (Object.assign({}, (ownerState.freeSolo && ownerState.options.length === 0) && {
                        display: 'none',
                    }));
                },
                paper: ({ theme, ownerState }) => {
                    return Object.assign({ padding: '0', '& .MuiMenuItem-root .MuiMenuItem-gutters': {
                            padding: '0',
                        } }, (ownerState.multiple) && {
                        '& .MuiButtonBase-root.MuiMenuItem-root.Mui-selected.MuiAutocomplete-option[aria-selected="true"]': {
                            backgroundColor: 'inherit !important',
                            '&:hover': {
                                backgroundColor: `${theme.palette.action.hover} !important`,
                            },
                        },
                    });
                },
            },
        },
    };
};
exports.getMuiAutocompleteThemeOverrides = getMuiAutocompleteThemeOverrides;
Autocomplete.defaultProps = {
    freeSolo: false,
};
__exportStar(require("@mui/material/Autocomplete"), exports);
exports.default = Autocomplete;
