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
const React = __importStar(require("react"));
const styles_1 = require("@mui/material/styles");
const material_1 = require("@mui/material");
const close_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/close"));
const Panel_1 = require("./Panel");
const Typography_1 = __importDefault(require("../Typography/Typography"));
const IconButton_1 = __importStar(require("../IconButton/IconButton"));
const Tooltip_1 = __importDefault(require("../Tooltip/Tooltip"));
const PanelTabContentStyled = (0, styles_1.styled)(material_1.Grid)((props) => {
    return {
        width: '260px',
        overflow: 'hidden',
    };
});
const TabHeaderStyled = (0, styles_1.styled)(material_1.Grid)((props) => {
    const { theme } = props;
    return {
        display: 'flex',
        borderBottom: `solid 1px ${theme.palette.border.primary}`,
        paddingRight: '12px',
    };
});
const TabBodyStyled = (0, styles_1.styled)(material_1.Grid)((props) => {
    return {
        padding: props.variant === Panel_1.PanelVariants.WITH_PADDING ? '12px' : 0,
        maxHeight: props.maxHeight || 'calc(100vh - 48px)',
        overflowY: 'auto',
    };
});
const PanelTitle = (0, styles_1.styled)(Typography_1.default)((props) => {
    const { theme } = props;
    return {
        fontSize: theme.typography.pxToRem(14),
        color: theme.palette.text.primary,
        margin: '12px',
    };
});
const PanelActions = (0, styles_1.styled)(material_1.Grid)((props) => {
    return {
        maxWidth: '50%',
    };
});
const CloseButtonStyled = (0, styles_1.styled)(IconButton_1.default)((props) => {
    return {
        marginLeft: 0,
    };
});
const PanelTabContent = (_a) => {
    var { selectedTabValue, tabs, open, variant, toggleClose, translation } = _a, props = __rest(_a, ["selectedTabValue", "tabs", "open", "variant", "toggleClose", "translation"]);
    return (React.createElement(React.Fragment, null, tabs.map((tab, index) => {
        const key = index;
        return (React.createElement(React.Fragment, { key: key }, selectedTabValue === index && (React.createElement(PanelTabContentStyled, { flexGrow: 1, flexShrink: 0 },
            React.createElement(material_1.Grid, { container: true, direction: "column" },
                React.createElement(TabHeaderStyled, { container: true, "data-testid": "panel-header", direction: "row", justifyContent: "space-between", alignItems: "center" },
                    React.createElement(material_1.Grid, { item: true, xs: 6 },
                        React.createElement(PanelTitle, { variant: "subtitle1" }, tab.content.title)),
                    React.createElement(PanelActions, { container: true, direction: "row", justifyContent: "flex-end", alignItems: "center" },
                        React.createElement(material_1.Grid, { sx: {
                                display: 'flex',
                            } }, tab.content.actionHeaderBar),
                        toggleClose && (React.createElement(Tooltip_1.default, { title: (translation && translation.closeButtonTooltip) ? translation.closeButtonTooltip : '' },
                            React.createElement(CloseButtonStyled, { variant: IconButton_1.IconButtonVariants.WITH_PADDING, onClick: () => {
                                    return toggleClose ? toggleClose(!open) : null;
                                } },
                                React.createElement(close_1.default, null)))))),
                React.createElement(TabBodyStyled, { "data-testid": "panel-body", variant: variant, maxHeight: tab.content.maxHeight },
                    React.createElement(material_1.Grid, null, tab.content.body)))))));
    })));
};
PanelTabContent.defaultProps = {};
exports.default = PanelTabContent;
