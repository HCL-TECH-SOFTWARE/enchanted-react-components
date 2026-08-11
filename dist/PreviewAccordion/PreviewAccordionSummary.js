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
const styles_1 = require("@mui/material/styles");
const AccordionSummary_1 = __importDefault(require("../Accordion/AccordionSummary"));
const StyledMiddleSection = (0, styles_1.styled)('div')(() => {
    return {
        display: 'flex',
        alignItems: 'left',
        flexDirection: 'column',
        overflow: 'hidden',
        maxWidth: '100%',
        justifyContent: 'center',
    };
});
const StyledSubSection = (0, styles_1.styled)('div')(() => {
    return {
        lineHeight: '0.9',
        maxWidth: '100%',
        display: 'flex',
    };
});
const StyledLeftSection = (0, styles_1.styled)('div')(() => {
    return {
        flex: '0 0 auto',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
    };
});
const StyledRightSection = (0, styles_1.styled)('div')(() => {
    return {
        marginLeft: 'auto',
        flex: '0 0 auto',
        alignItems: 'center',
        display: 'flex',
    };
});
const StyledAccordionSummary = (0, styles_1.styled)(AccordionSummary_1.default)(({ theme, hoveractions }) => {
    return {
        '&.MuiAccordionSummary-root': {
            padding: '4px 6px 4px 8px',
        },
        '& .MuiBox-root:nth-of-type(1)': {
            display: 'flex',
            alignItems: 'center',
            '& .MuiBox-root': {
                display: 'block',
                paddingRight: hoveractions ? '50px' : '0px',
            },
            '& .MuiTypography-root': {
                display: 'block',
            },
        },
        '.MuiCheckbox-root': {
            padding: '4px 0px',
            marginRight: '8px',
            height: '20px',
        },
        '& .accordion-left-section >.MuiSvgIcon-root': {
            height: '20px',
            width: '20px',
            marginRight: '8px',
            color: theme.palette.action.active,
        },
        '& .MuiCheckbox-root.Mui-focusVisible': {
            margin: '0px 8px 0px 0px',
        },
        '& .MuiLink-root': {
            padding: '0px',
        },
        '& .MuiAvatar-root': {
            marginRight: '8px',
        },
        '& .accordion-right-section': {
            '.MuiButton-root': {
                marginLeft: '8px',
            },
            '.IconButtonMainContainer': {
                marginLeft: '8px',
            },
        },
    };
});
const PreviewAccordionSummary = (_a) => {
    var props = __rest(_a, []);
    return (react_1.default.createElement(StyledAccordionSummary, Object.assign({}, props),
        react_1.default.createElement(StyledLeftSection, { className: "accordion-left-section" }, props.leftsection),
        props.titlelink && (react_1.default.createElement(StyledMiddleSection, { className: "accordion-link-section" },
            props.titlelink && props.titlelink,
            props.subtitle && react_1.default.createElement(StyledSubSection, { className: "sub-section" }, props.subtitle))),
        react_1.default.createElement(StyledRightSection, { className: "accordion-right-section" }, props.rightsection)));
};
PreviewAccordionSummary.defaultProps = {};
exports.default = PreviewAccordionSummary;
