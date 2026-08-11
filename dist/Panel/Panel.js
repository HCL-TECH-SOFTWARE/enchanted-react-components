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
exports.PanelVariants = void 0;
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
const Drawer_1 = __importDefault(require("../hidden_components/Drawer"));
const colors_1 = require("../colors");
const PanelTabs_1 = __importDefault(require("./PanelTabs"));
const PanelTabContent_1 = __importDefault(require("./PanelTabContent"));
var PanelVariants;
(function (PanelVariants) {
    PanelVariants["WITHOUT_PADDING"] = "without padding";
    PanelVariants["WITH_PADDING"] = "with padding";
})(PanelVariants = exports.PanelVariants || (exports.PanelVariants = {}));
const StyledDrawer = (0, styles_1.styled)(Drawer_1.default)((theme) => {
    return {
        position: 'absolute',
        right: 0,
        top: 0,
        '.MuiPaper-root': {
            padding: 0,
            overflowX: 'hidden',
        },
        '&.MuiDrawer-root': {
            padding: 0,
        },
        '& .MuiDrawer-paper': {
            boxShadow: theme.theme.shadows[0],
            borderLeft: 'none',
        },
    };
});
const PanelBody = (0, styles_1.styled)('main')((props) => {
    let panelWidth = '301px'; // Default width
    if (props.isPanelCollapsed) {
        panelWidth = '41px';
    }
    else if (props.hideSidebar) {
        panelWidth = '260px';
    }
    return {
        background: colors_1.neutralGrey.NG100,
        display: 'flex',
        height: '100%',
        width: panelWidth,
    };
});
const Panel = (_a) => {
    var { open, anchor, variant, tabList, hideSidebar, selectedTabValue, panelVariant, handleTabChange, togglePanel, isPanelCollapsed, translation, togglePanelLabel } = _a, rest = __rest(_a, ["open", "anchor", "variant", "tabList", "hideSidebar", "selectedTabValue", "panelVariant", "handleTabChange", "togglePanel", "isPanelCollapsed", "translation", "togglePanelLabel"]);
    const [selectedTabValueDefault, setSelelectedTabValueDefault] = React.useState(0);
    const handleTabChangeDefault = (event, newValue) => {
        setSelelectedTabValueDefault(newValue);
    };
    return (React.createElement(StyledDrawer, { anchor: anchor || 'right', variant: variant || 'persistent', open: open },
        React.createElement(PanelBody, { hideSidebar: hideSidebar, isPanelCollapsed: isPanelCollapsed },
            React.createElement(React.Fragment, null, tabList && (React.createElement(React.Fragment, null,
                hideSidebar !== true && (React.createElement(PanelTabs_1.default, { tabs: tabList, handleTabChange: handleTabChange || handleTabChangeDefault, selectedTabValue: selectedTabValue || selectedTabValueDefault, isPanelCollapsed: isPanelCollapsed, togglePanel: togglePanel, translation: translation, togglePanelLabel: togglePanelLabel })),
                !isPanelCollapsed && (React.createElement(PanelTabContent_1.default, { open: open, tabs: tabList, selectedTabValue: selectedTabValue || selectedTabValueDefault, variant: panelVariant || PanelVariants.WITH_PADDING, toggleClose: rest.toggleClose || undefined, translation: translation }))))))));
};
Panel.defaultProps = {
    open: false,
    panelVariant: PanelVariants.WITH_PADDING,
    isPanelCollapsed: false,
};
exports.default = Panel;
