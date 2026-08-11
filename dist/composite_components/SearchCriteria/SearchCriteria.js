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
const React = __importStar(require("react"));
const styles_1 = require("@mui/material/styles");
const Grid_1 = __importDefault(require("@mui/material/Grid"));
const help_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/help"));
const Toolbar_1 = __importDefault(require("@mui/material/Toolbar"));
const Collapse_1 = __importDefault(require("@mui/material/Collapse"));
const Button_1 = __importDefault(require("../../Button/Button"));
const Typography_1 = __importDefault(require("../../Typography"));
const Tooltip_1 = __importDefault(require("../../Tooltip"));
const Divider_1 = __importDefault(require("../../Divider"));
/**
* Drawer Footer Grid styling
*/
const DrawerFooter = (0, styles_1.styled)(Grid_1.default)(() => {
    return {
        marginTop: '12px',
    };
});
/**
* Help Text Icon styling
*/
const InternalHelpIcon = (0, styles_1.styled)(help_1.default)((theme) => {
    return Object.assign(Object.assign({}, theme.theme.typography.body2), { marginLeft: '4px', height: '16px', width: '16px', marginTop: '4px' });
});
// Since the trigger button to open a backdrop is also inside the component, using the MUI / Enchanted Backdrop is impossible.
// We have implemented a pseudo-backdrop inside SearchCriteria (Current use case: Content Reporting)
/**
* Grid styling for the backdrop
*/
const InternalBackdrop = (0, styles_1.styled)(Grid_1.default)((props) => {
    return {
        left: '0',
        top: '0',
        height: `${props.open ? '100%' : ''}`,
        width: '100%',
        zIndex: '2',
    };
});
/**
* Drawer Footer Grid styling
*/
const InternalGridDrawer = (0, styles_1.styled)('div')((theme) => {
    return {
        outline: 'none',
        backgroundColor: theme.theme.palette.background.paper,
        width: '100%',
        left: '0',
        top: '0',
        display: 'block',
        maxHeight: 'inherit',
        boxShadow: theme.theme.shadows[1],
    };
});
/**
* Typhography styling for Label Text
*/
const SearchCriteriaLabel = (0, styles_1.styled)('div')((theme) => {
    return {
        flexBasis: 'fit-content',
        alignSelf: 'flex-start',
        whiteSpace: 'nowrap',
        paddingTop: '3px',
    };
});
/**
* Typhography styling for Label Text
*/
const SearchCriteriaFiller = (0, styles_1.styled)('div')((theme) => {
    return {
        flexGrow: 1,
        flexShrink: 0,
    };
});
/**
* Typhography styling for Secondary Text
*/
const SearchCriteriaSecondaryLabel = (0, styles_1.styled)('div')((theme) => {
    return {
        marginLeft: '12px',
        marginRight: '12px',
        color: theme.theme.palette.text.secondary,
        flexBasis: 'fit-content',
        paddingTop: '6px',
        paddingBottom: '6px',
        alignSelf: 'flex-start',
    };
});
/**
* Div styling for View Button
*/
const SearchCriteriaViewButtonDiv = (0, styles_1.styled)('div')((theme) => {
    return {
        alignSelf: 'flex-start',
    };
});
/**
* Toolbar styling for header
*/
const SearchCriteriaSummary = (0, styles_1.styled)(Toolbar_1.default)((theme) => {
    return {
        color: theme.theme.palette.text.secondary,
        display: 'flex',
        justifyContent: 'space-between',
        '&.MuiToolbar-root': {
            minHeight: '28px',
            padding: '4px 12px',
            alignItems: 'flex-start',
            maxHeight: 'inherit',
        },
    };
});
/**
* Button styling for header button
*/
const SearchCriteriaViewButton = (0, styles_1.styled)(Button_1.default)(() => {
    return {
        right: '4px',
        marginLeft: '12px',
        whiteSpace: 'nowrap',
    };
});
/**
 * Renders a drawer that opens from the top on the parent div and is used for containers of search parameters.
 * Note: Please add style positon: 'relative' to the parent of this component to position this relative component to the parent and not to the browser.
 * Demo:
 * https://opensource.hcltechsw.com/enchanted-react-components/?path=/story/surfaces-searchcriteria--interactive-example
 */
const SearchCriteria = (_a) => {
    var { footerButtonProps, label, helperIconTooltip, labelProps, secondaryText, secondaryTextProps, expandButtonProps, expandButtonLabel, open, handleExpand, collapseButtonProps, collapseButtonLabel, handleCollapse } = _a, props = __rest(_a, ["footerButtonProps", "label", "helperIconTooltip", "labelProps", "secondaryText", "secondaryTextProps", "expandButtonProps", "expandButtonLabel", "open", "handleExpand", "collapseButtonProps", "collapseButtonLabel", "handleCollapse"]);
    const [position, setPosition] = React.useState(true);
    const handleStartPosition = () => {
        setPosition(false);
    };
    const handleEndPosition = () => {
        setPosition(true);
    };
    return (React.createElement(React.Fragment, null,
        open && React.createElement(Grid_1.default, { sx: { height: '52px' } }),
        !position && React.createElement(Grid_1.default, { sx: { height: '52px' } }),
        React.createElement(InternalBackdrop, { sx: {
                background: (theme) => { return (open ? theme.palette.background.overlay : ''); },
                position: `${open ? 'absolute' : `${position ? 'sticky' : 'absolute'}`}`,
            }, open: open },
            React.createElement(InternalGridDrawer, null,
                React.createElement(SearchCriteriaSummary, null,
                    React.createElement(SearchCriteriaLabel, null,
                        React.createElement(Typography_1.default, Object.assign({ variant: "subtitle1", color: open ? 'text.primary' : 'text.secondary' }, labelProps), label)),
                    secondaryText && !open && (React.createElement(SearchCriteriaSecondaryLabel, null, typeof secondaryText === 'string' ? (React.createElement(Typography_1.default, Object.assign({ variant: "body2" }, secondaryTextProps), secondaryText)) : React.createElement(React.Fragment, null, secondaryText))),
                    open && helperIconTooltip ? React.createElement(Tooltip_1.default, { title: helperIconTooltip },
                        React.createElement(InternalHelpIcon, { color: "action" })) : '',
                    React.createElement(SearchCriteriaFiller, null),
                    !open && (React.createElement(SearchCriteriaViewButtonDiv, null,
                        React.createElement(SearchCriteriaViewButton, Object.assign({ variant: "text", onClick: () => { return handleExpand(); } }, expandButtonProps), expandButtonLabel)))),
                React.createElement(Collapse_1.default, { in: open, onExit: handleStartPosition, onExited: handleEndPosition, timeout: {
                        enter: 500,
                        exit: 500,
                    } },
                    React.createElement(Grid_1.default, null,
                        React.createElement(Grid_1.default, { sx: { margin: '0 12px 10px 12px' } }, props.children),
                        React.createElement(DrawerFooter, null,
                            React.createElement(Divider_1.default, null),
                            React.createElement(Grid_1.default, { sx: { height: '45px', padding: '8px 12px 8px 0', float: 'right' } },
                                React.createElement(Button_1.default, Object.assign({ variant: "text", sx: { marginLeft: '12px' }, onClick: () => { return handleCollapse(); } }, collapseButtonProps), collapseButtonLabel),
                                footerButtonProps && footerButtonProps.map((buttonProps) => {
                                    return (React.createElement(Button_1.default, Object.assign({ sx: { marginLeft: '12px' }, key: buttonProps.key }, buttonProps),
                                        buttonProps.label,
                                        buttonProps.children));
                                })))))))));
};
SearchCriteria.defaultProps = {};
exports.default = SearchCriteria;
