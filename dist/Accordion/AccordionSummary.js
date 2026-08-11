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
const react_1 = __importDefault(require("react"));
const AccordionSummary_1 = __importDefault(require("@mui/material/AccordionSummary"));
const styles_1 = require("@mui/material/styles");
const StyledHoverActions = (0, styles_1.styled)('div')(({ theme }) => {
    return {
        position: 'absolute',
        top: '50%',
        right: '0px',
        transform: 'translateY(-50%)',
        visibility: 'hidden',
        opacity: '0',
        transition: 'opacity 0.3s ease',
    };
});
const StyledAccordionSummary = (0, styles_1.styled)(AccordionSummary_1.default)(({ theme, disabled }) => {
    return {
        '& .MuiBox-root:nth-of-type(1)': {
            display: 'flex',
            alignItems: 'center',
            '& .MuiBox-root': {
                flexDirection: 'column',
            },
        },
        minHeight: 'auto',
        padding: theme.spacing(1, 0.75, 0.5, 1),
        '& .MuiAccordionSummary-content': {
            position: 'relative',
            margin: '0px',
            '&.Mui-expanded': {
                margin: '0px',
            },
        },
        '.MuiTypography-root': Object.assign({}, (disabled && {
            color: theme.palette.text.disabled,
        })),
        '.MuiTypography-body2': {
            color: theme.palette.text.primary,
        },
        '.MuiTypography-caption': {
            color: theme.palette.text.secondary,
        },
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
        '&.Mui-focusVisible:hover': {
            backgroundColor: theme.palette.action.hover,
        },
        '.MuiCheckbox-root': {
            padding: '4px 0px',
            marginRight: '8px',
        },
        '& .MuiCheckbox-root.Mui-focusVisible': {
            margin: '0px 8px 0px 0px',
        },
        '&:last-of-type': {
            borderBottomLeftRadius: '4px',
            borderBottomRightRadius: '4px',
        },
        '&:hover .hover-actions, &:focus-within .hover-actions': {
            visibility: 'visible',
            opacity: '1',
        },
        '& .hover-actions': {
            '.IconButtonMainContainer': {
                marginLeft: '8px',
            },
            '.IconButtonMainContainer:first-of-type': {
                marginLeft: '0',
            },
        },
    };
});
const AccordionSummary = (_a) => {
    var props = __rest(_a, []);
    return (react_1.default.createElement(StyledAccordionSummary, Object.assign({}, props),
        props.children,
        props.hoveractions
            && react_1.default.createElement(StyledHoverActions, { className: "hover-actions" }, props.hoveractions)));
};
AccordionSummary.defaultProps = {};
__exportStar(require("@mui/material/AccordionSummary"), exports);
exports.default = AccordionSummary;
