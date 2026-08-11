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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.StyledSpan = exports.MuiGrid = exports.StyledInputLabel = exports.MuiInputHelpIcon = exports.labelFocus = void 0;
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
const react_1 = __importDefault(require("react"));
const InputLabel_1 = __importDefault(require("@mui/material/InputLabel"));
const Grid_1 = __importDefault(require("@mui/material/Grid"));
const help_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/help"));
const material_1 = require("@mui/material");
const Tooltip_1 = __importStar(require("../../Tooltip"));
const ActionButton_1 = __importDefault(require("../../ActionButton"));
exports.labelFocus = (0, material_1.styled)('div')((theme) => {
    // if the textbox is focused then the label should get styled with the primary theme color
    return {
        '.MuiAutocomplete--label--focused': {
            color: theme.theme.palette.primary.main,
        },
    };
});
exports.MuiInputHelpIcon = (0, material_1.styled)(help_1.default, {
    // Prevent `enableHelpHoverEffect` from being passed to the DOM
    shouldForwardProp: (prop) => { return prop !== 'enableHelpHoverEffect'; },
})(({ theme, enableHelpHoverEffect }) => {
    return Object.assign(Object.assign(Object.assign({}, theme.typography.subtitle2), { marginLeft: '8px', marginBottom: '-4px', fontSize: '16px' }), (enableHelpHoverEffect && {
        ':hover': {
            borderRadius: '10px',
            backgroundColor: theme.palette.grey[200],
        },
    }));
});
const styledCustomIcon = (Icon) => {
    return react_1.default.createElement(Icon, { sx: { marginLeft: '8px', marginBottom: '-4px', fontSize: '16px' }, color: "action", fontSize: "small" });
};
exports.StyledInputLabel = (0, material_1.styled)(InputLabel_1.default)((theme) => {
    return Object.assign(Object.assign({}, theme.theme.typography.subtitle2), { color: theme.theme.palette.text.secondary, margin: '0px', pointerEvents: 'inherit', position: 'relative', display: 'inline-flex', alignItems: 'center', transform: 'none' });
});
const getMuiInputLabelProps = (props) => {
    const inputLabelProps = {
        color: props.color,
        disabled: props.disabled,
        error: props.error,
        required: props.required,
        sx: props.sx,
        htmlFor: props.htmlFor,
        id: props.id,
    };
    return inputLabelProps;
};
const renderInputLabel = (props) => {
    const muiInputLabelProps = getMuiInputLabelProps(props);
    // Below class name attribute is used only label get its color property primary when there is no error state enabled
    if (props.hiddenLabel) {
        return undefined;
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(exports.StyledInputLabel, Object.assign({ className: props.isFocus && !props.error ? 'MuiAutocomplete--label--focused' : ' ' }, muiInputLabelProps, { sx: (theme) => {
                return Object.assign({}, (props.fullWidth !== true && props.actionProps && props.actionProps.length >= 1) && {
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    maxWidth: '120px', // half of default 240px
                });
            } }), props.label),
        props.helperIconTooltip ? (react_1.default.createElement(Tooltip_1.default, { title: props.helperIconTooltip, placement: props.tooltipPlacement || Tooltip_1.TooltipPlacement.BOTTOM },
            react_1.default.createElement("span", null, props.customIcon ? styledCustomIcon(props.customIcon) : react_1.default.createElement(exports.MuiInputHelpIcon, { color: "action", fontSize: "small", tabIndex: 0, enableHelpHoverEffect: props.enableHelpHoverEffect })))) : ('')));
};
exports.MuiGrid = (0, material_1.styled)(Grid_1.default)((theme) => {
    return {
        '&.MuiGrid-container': {
            margin: '0px 0px 4px 0px',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
        },
        '&.MuiGrid-item': {
            padding: 0,
        },
    };
});
exports.StyledSpan = (0, material_1.styled)('span')((theme) => {
    return {
        display: 'inline-block',
        paddingRight: '4px',
        ':not(:first-of-type)': {
            borderLeft: `1px solid ${theme.theme.palette.border.secondary}`,
            padding: '0 4px', // 4px padding between action link and border divider for multiple action links
        },
    };
});
const renderInputLabelAndAction = (props) => {
    if (props.actionProps) {
        // To-Do: max 2 actions props for now, pending Figma design for many types of Action Links as discussed with UIUX
        const limitedActionProps = props.actionProps.slice(0, 2);
        return (react_1.default.createElement(exports.MuiGrid, { container: true, spacing: 2 },
            react_1.default.createElement(exports.MuiGrid, { item: true, sx: (theme) => {
                    return {
                        [theme.breakpoints.up('md')]: {
                            flexBasis: 'auto',
                            maxWidth: 'unset',
                        },
                        [theme.breakpoints.down('md')]: {
                            flexBasis: 'auto',
                            maxWidth: 'unset',
                        },
                    };
                } }, renderInputLabel(props)),
            react_1.default.createElement(exports.MuiGrid, { item: true, sx: (theme) => {
                    return {
                        [theme.breakpoints.up('md')]: {
                            flexBasis: 'auto',
                            maxWidth: 'unset',
                        },
                        [theme.breakpoints.down('md')]: {
                            flexBasis: 'auto',
                            maxWidth: 'unset',
                        },
                    };
                } }, limitedActionProps && limitedActionProps.map((actionProp, index) => {
                return (
                // eslint-why index is not the sole key definition, it is prefixed by other identifiers
                // eslint-disable-next-line react/no-array-index-key
                react_1.default.createElement(Tooltip_1.default, { title: actionProp.tooltip, tooltipsize: "small", placement: "bottom", key: `${actionProp.label}-${index}` },
                    react_1.default.createElement(exports.StyledSpan, null,
                        react_1.default.createElement(ActionButton_1.default, { label: actionProp.label, endIcon: actionProp.endIcon, disabled: actionProp.disabled || props.disabled, href: actionProp.href, handleClick: actionProp.handleClick }))));
            }))));
    }
    return (react_1.default.createElement(exports.MuiGrid, { container: true },
        react_1.default.createElement(exports.MuiGrid, { item: true, xs: 12 }, renderInputLabel(props))));
};
const InputLabelAndAction = (_a) => {
    var props = __rest(_a, []);
    return (react_1.default.createElement(react_1.default.Fragment, null, renderInputLabelAndAction(props)));
};
InputLabelAndAction.defaultProps = {};
exports.default = InputLabelAndAction;
