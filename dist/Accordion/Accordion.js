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
exports.AccordionTypes = void 0;
const react_1 = __importStar(require("react"));
const Accordion_1 = __importDefault(require("@mui/material/Accordion"));
const styles_1 = require("@mui/material/styles");
var AccordionTypes;
(function (AccordionTypes) {
    AccordionTypes["OUTLINED"] = "outlined";
    AccordionTypes["NO_OUTLINE"] = "no-outline";
})(AccordionTypes = exports.AccordionTypes || (exports.AccordionTypes = {}));
const StyledAccordion = (0, styles_1.styled)(Accordion_1.default)((props) => {
    const { theme, variant, isfocused, hasNested, hasDivider, type, } = props;
    return {
        '& .MuiAccordionDetails-root': Object.assign({}, (hasNested ? { padding: '8px 0px 8px 8px' } : { padding: '8px 8px 8px 8px' })),
        '&.MuiAccordion-root': Object.assign({ '&:focus': {
                boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
                zIndex: 1,
            } }, (isfocused && {
            boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
            zIndex: 1,
        })),
        '& .MuiAccordionSummary-expandIconWrapper': {
            marginLeft: theme.spacing(1),
        },
        '&.Mui-disabled': {
            backgroundColor: 'transparent',
        },
        padding: '0px',
        border: type === 'outlined' ? `1px solid ${theme.palette.border.secondary}` : 'none',
        '&.MuiPaper-root.MuiAccordion-root.MuiPaper-root': {
            backgroundColor: 'transparent',
        },
        '.MuiButtonBase-root.MuiAccordionSummary-root.Mui-expanded': {
            minHeight: '32px',
            backgroundColor: theme.palette.action.disabledOpacityModified,
            '&:hover': {
                backgroundColor: theme.palette.action.disableOpacityHover,
            },
        },
        '& .MuiButtonBase-root.Mui-focusVisible': {
            backgroundColor: 'transparent',
            '&:hover': {
                backgroundColor: theme.palette.action.hover,
            },
        },
        '&.MuiAccordion-root.Mui-expanded': {
            margin: '0px',
        },
        '&.MuiAccordion-root:before': {
            content: variant === 'outlined' ? '""' : 'none',
        },
        '&.MuiAccordion-root .MuiAccordion-root': {
            borderTopRightRadius: '0px',
            borderBottomRightRadius: '0px',
        },
        '&:not(:last-of-type)': {
            borderBottom: (hasDivider && (type !== 'outlined')) ? `1px solid ${theme.palette.border.secondary}` : 'none',
        },
    };
});
const Accordion = (_a) => {
    var props = __rest(_a, []);
    const [isFocused, setIsFocused] = (0, react_1.useState)(false);
    const [usingKeyboard, setUsingKeyboard] = (0, react_1.useState)(false);
    const accordionRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const handleKeyDown = () => {
            setUsingKeyboard(true);
        };
        const handleMouseDown = () => {
            setUsingKeyboard(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('mousedown', handleMouseDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('mousedown', handleMouseDown);
        };
    }, []);
    const handleFocus = (event) => {
        if (usingKeyboard) {
            if (accordionRef.current && accordionRef.current.contains(event.relatedTarget)) {
                setIsFocused(false);
            }
            else {
                setIsFocused(true);
            }
        }
    };
    return (react_1.default.createElement(StyledAccordion, Object.assign({ ref: accordionRef, onFocus: handleFocus, onBlur: () => { return setIsFocused(false); } }, props, { isfocused: isFocused, hasNested: props.hasNested, hasDivider: props.hasDivider, square: props.square })));
};
const defaultProps = {
    type: AccordionTypes.OUTLINED,
    children: '',
    variant: 'nopadding',
    square: false,
};
Accordion.defaultProps = defaultProps;
__exportStar(require("@mui/material/Accordion"), exports);
exports.default = Accordion;
