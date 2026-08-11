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
exports.PreviewAccordionTypes = void 0;
const react_1 = __importDefault(require("react"));
const styles_1 = require("@mui/material/styles");
const Accordion_1 = __importStar(require("../Accordion"));
exports.PreviewAccordionTypes = Object.assign({}, Accordion_1.AccordionTypes);
const StyledAccordion = (0, styles_1.styled)(Accordion_1.default)((props) => {
    return {
        '& .MuiAccordionSummary-content': {
            overflow: 'hidden',
            width: '100%',
        },
        '& .MuiAccordionDetails-root': Object.assign(Object.assign(Object.assign(Object.assign({ padding: '8px 0px 8px 8px' }, (props.hascheckbox && { paddingLeft: '34px' })), (props.hasavatar && { paddingLeft: '40px' })), (props.hasicon && { paddingLeft: '36px' })), { '.MuiGrid-root': {
                borderRadius: 'unset',
            } }),
        '& .MuiButtonBase-root.MuiAccordionSummary-root.Mui-expanded': {
            minHeight: '32px',
            backgroundColor: 'transparent',
        },
        '& .MuiAccordionSummary-root:not(.Mui-expanded) .accordion-link-section': {
            '.MuiLink-root': {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '100%',
                display: 'inline-block',
            },
        },
        '& .MuiAccordionSummary-root:not(.Mui-expanded) .sub-section': {
            maxWidth: '100%',
            display: 'flex',
            '& .MuiTypography-root': {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '100%',
                display: 'inline-block',
            },
        },
        '&.Mui-disabled, & .MuiAccordionSummary-root.Mui-disabled': {
            opacity: 1,
        },
    };
});
const PreviewAccordion = (_a) => {
    var props = __rest(_a, []);
    return (react_1.default.createElement(StyledAccordion, Object.assign({}, props)));
};
const defaultProps = {
    type: Accordion_1.AccordionTypes.OUTLINED,
    children: '',
    variant: 'nopadding',
    hascheckbox: false,
    hasicon: false,
    hasavatar: false,
};
PreviewAccordion.defaultProps = defaultProps;
__exportStar(require("@mui/material/Accordion"), exports);
exports.default = PreviewAccordion;
