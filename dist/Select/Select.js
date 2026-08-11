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
exports.getMuiSelectThemeOverrides = void 0;
const react_1 = __importDefault(require("react"));
const Select_1 = __importDefault(require("@mui/material/Select"));
const FormControl_1 = __importDefault(require("@mui/material/FormControl"));
const FormHelperText_1 = __importDefault(require("@mui/material/FormHelperText"));
const useId_1 = __importDefault(require("@mui/material/utils/useId"));
const warning_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/warning"));
const caret__down_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/caret--down"));
const material_1 = require("@mui/material");
const styles_1 = require("@mui/material/styles");
const Typography_1 = __importDefault(require("../Typography"));
const InputLabelAndAction_1 = __importDefault(require("../prerequisite_components/InputLabelAndAction"));
const theme_1 = require("../theme");
const getMuiSelectThemeOverrides = () => {
    return {
        MuiSelect: {
            styleOverrides: {
                outlined: ({ theme }) => {
                    return Object.assign(Object.assign({}, theme.typography.body2), { color: theme.palette.text.primary, padding: '0px', height: '20px', marginTop: '2px', marginBottom: '-4px', '& em': {
                            fontStyle: 'italic',
                            color: theme.palette.text.secondary,
                        } });
                },
                select: ({ theme }) => {
                    return {
                        paddingRight: '0px !important',
                        '& .MuiListItemText-root': {
                            marginTop: '0px',
                            '& .MuiTypography-root': Object.assign(Object.assign({}, theme.typography.body2), { textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }),
                        },
                    };
                },
                iconOutlined: ({ theme }) => {
                    return {
                        width: '16px',
                        height: '16px',
                        top: 'calc(50% - 8px)',
                    };
                },
                icon: ({ theme }) => {
                    return {
                        right: '8px',
                    };
                },
            },
        },
    };
};
exports.getMuiSelectThemeOverrides = getMuiSelectThemeOverrides;
const getEndAdornment = (props) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        props.error ? react_1.default.createElement(warning_1.default, { color: "error" }) : null,
        props.unitLabel ? react_1.default.createElement(Typography_1.default, { variant: "body2", style: { cursor: (props.disabled || props.readOnly) ? 'default' : 'pointer' } }, props.unitLabel) : null,
        "\u00A0"));
};
const InputAdornment = (0, material_1.styled)(material_1.InputAdornment)(({ theme }) => {
    return {
        position: 'relative',
        paddingRight: '20px',
        paddingLeft: '4px',
    };
});
const getMuiSelectProps = (props) => {
    const cleanedProps = Object.assign({}, props);
    cleanedProps.id += '-select';
    delete cleanedProps.actionProps;
    delete cleanedProps.nonEdit;
    delete cleanedProps.unitLabel;
    delete cleanedProps.helperIconTooltip;
    delete cleanedProps.helperText;
    delete cleanedProps.hiddenLabel;
    delete cleanedProps.enableHelpHoverEffect;
    const handleMouseDown = ((event) => {
        if (props.disabled || props.readOnly) {
            return;
        }
        // This is workaround solution to catch the mousedown on the InputAdornment section
        // and to simulate a mousedown event on the select section to open the menu component
        // Try to get the sibling node with this id (just in case somebody has accidentally used the same id elsewhere)
        const parent = event.target.parentElement;
        const element = parent === null || parent === void 0 ? void 0 : parent.querySelector(`:scope [id='${props.id}-select']`);
        if (element) {
            event.preventDefault();
            const elementPosition = element.getBoundingClientRect();
            // eslint-why - The default type MouseEvent is not defined, it is a browser native class
            // eslint-disable-next-line no-undef
            const elementEvent = new MouseEvent('mousedown', {
                view: window,
                bubbles: true,
                cancelable: true,
                screenX: elementPosition.left,
                screenY: elementPosition.top,
            });
            element.dispatchEvent(elementEvent);
        }
    });
    const muiTextFieldProps = Object.assign(Object.assign({}, cleanedProps), { label: undefined, endAdornment: (react_1.default.createElement(InputAdornment, { "data-testid": "endAdornment", position: "end", onMouseDown: handleMouseDown, style: { cursor: (props.disabled || props.readOnly) ? 'default' : 'pointer' } }, getEndAdornment(props))), IconComponent: caret__down_1.default });
    return muiTextFieldProps;
};
const getMuiFormControlProps = (props, forwardRef) => {
    const muiFormControlProps = {
        color: props.color,
        disabled: props.disabled,
        error: props.error,
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
const renderInput = (props, id) => {
    var _a, _b, _c, _d;
    if (props.nonEdit) {
        return react_1.default.createElement(Typography_1.default, { variant: "body2" }, props.value ? props.value : null);
    }
    const selectProps = getMuiSelectProps(props);
    const theme = (0, styles_1.useTheme)();
    // Short workaround to get the right alignment of the Select Menu component Paper.
    // A normal styling via the overrides are not possible.
    // Due to the fact that those stylings will also affecting the normal Paper,
    // therefore we have only to override the Paper for the Select Menu component.
    // Also we have to support the option that some stylings will handover via the MenuProps?.PaperProps?.style.
    const defaultStyle = {
        width: props.fullWidth ? '100%' : '240px',
        padding: '0',
    };
    const paperPropsStyle = ((_b = (_a = selectProps.MenuProps) === null || _a === void 0 ? void 0 : _a.PaperProps) === null || _b === void 0 ? void 0 : _b.style) ? (_d = (_c = selectProps.MenuProps) === null || _c === void 0 ? void 0 : _c.PaperProps) === null || _d === void 0 ? void 0 : _d.style : defaultStyle;
    if (!paperPropsStyle.width) {
        paperPropsStyle.width = defaultStyle.width;
    }
    return (react_1.default.createElement(Select_1.default, Object.assign({}, selectProps, { "aria-label": typeof props.label === 'string' ? props.label : props.placeholder, labelId: `${props.id}-label`, inputProps: { id: props.id }, MenuProps: Object.assign(Object.assign({}, selectProps.MenuProps), { transformOrigin: { vertical: 'top', horizontal: theme.direction === theme_1.ThemeDirectionType.RTL ? 'right' : 'left' }, anchorOrigin: { vertical: 'bottom', horizontal: theme.direction === theme_1.ThemeDirectionType.RTL ? 'right' : 'left' }, PaperProps: {
                style: paperPropsStyle,
                elevation: 2,
                ref: (node) => {
                    var _a;
                    if (node && props.fullWidth && props.id) {
                        // Dynamically set the Paper width to match the Select input width
                        const selectElement = (_a = document.getElementById(props.id)) === null || _a === void 0 ? void 0 : _a.parentElement;
                        if (selectElement) {
                            node.style.width = `${selectElement.clientWidth}px`;
                            // Check if the select element or its parent takes up the full width of the page
                            const isFullPage = window.innerWidth === document.body.clientWidth;
                            if (!isFullPage) {
                                // Apply -8px marginLeft adjustment in fullWidth mode when the input box is not in full page
                                node.style.marginLeft = '-8px';
                            }
                        }
                    }
                },
            } }) })));
};
const getInputLabelAndActionProps = (props) => {
    const inputLabelId = `${props.id}-label`;
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
        enableHelpHoverEffect: props.enableHelpHoverEffect,
        customIcon: props.customIcon,
    };
    return inputLabelProps;
};
const Select = react_1.default.forwardRef((_a, forwardRef) => {
    var props = __rest(_a, []);
    if (!props.id) {
        const id = (0, useId_1.default)();
        props.id = id;
    }
    const muiFormControlProps = getMuiFormControlProps(props, forwardRef);
    const inputLabelAndActionProps = getInputLabelAndActionProps(props);
    const helperTextId = props.helperText && props.id ? `${props.id}-helper-text` : undefined;
    return (react_1.default.createElement(FormControl_1.default, Object.assign({}, muiFormControlProps),
        react_1.default.createElement(InputLabelAndAction_1.default, Object.assign({}, inputLabelAndActionProps)),
        renderInput(props, props.id),
        props.helperText && (react_1.default.createElement(FormHelperText_1.default, { id: helperTextId }, props.helperText))));
});
Select.defaultProps = {
    margin: 'none',
    color: 'primary',
    size: 'medium',
    label: '',
    helperText: '',
    enableHelpHoverEffect: false,
    helperIconTooltip: '',
    placeholder: '',
    unitLabel: '',
    required: false,
    disabled: false,
    error: false,
    fullWidth: false,
    autoFocus: false,
    hiddenLabel: false,
    nonEdit: false,
    sx: { minWidth: '240px' },
};
__exportStar(require("@mui/material/Select"), exports);
exports.default = Select;
