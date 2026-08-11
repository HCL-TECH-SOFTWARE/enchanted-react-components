"use strict";
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
/* ======================================================================== *
 * Copyright 2025 HCL America Inc.                                          *
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
const caret__down_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/caret--down"));
const system_1 = require("@mui/system");
const material_1 = require("@mui/material");
const Typography_1 = __importDefault(require("../Typography"));
/**
 * `StyledBox` is a styled component based on the `Box` component. It applies various styles to the `Box` component.
 * @param {object} theme - The theme object provided by the styled-components library.
 * @returns {object} - The styles to be applied to the `Box` component.
 */
const StyledBox = (0, material_1.styled)(system_1.Box)(({ theme }) => {
    return {
        display: 'flex',
        width: 'fit-content',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '0px 2px',
        borderRadius: '1px',
        backgroundColor: 'transparent',
        color: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
            color: theme.palette.primary.dark,
        },
        '&:focus': {
            outline: `2px solid ${theme.palette.action.focus}`,
            borderRadius: '2px',
            outlineOffset: '1px',
        },
        '& .MuiTypography-root': {
            padding: '1px 0px',
        },
        '& .MuiSvgIcon-root': {
            width: '16px',
            height: '16px',
        },
        '&.disabled': {
            pointerEvents: 'none',
            color: theme.palette.action.disabled,
        },
    };
});
const ActionButton = (_a) => {
    var props = __rest(_a, []);
    return (react_1.default.createElement(StyledBox, { "data-testid": "action-button", className: props.disabled ? 'disabled' : '', tabIndex: props.disabled ? -1 : 0, onClick: (event) => {
            if (props.href) {
                window.open(props.href, '_blank');
            }
            else if (props.handleClick) {
                props.handleClick(event);
            }
        }, onKeyDown: (event) => {
            if (event.key === 'Enter' && props.href) {
                window.open(props.href, '_blank');
            }
            else if (event.key === 'Enter' && props.handleClick) {
                props.handleClick(event);
            }
        }, role: "button", "aria-disabled": props.disabled },
        react_1.default.createElement(Typography_1.default, { variant: "caption" }, props.label),
        props.endIcon
            && (react_1.default.createElement(caret__down_1.default, null))));
};
ActionButton.defaultProps = {
    label: 'Action',
    endIcon: false,
    disabled: false,
};
exports.default = ActionButton;
