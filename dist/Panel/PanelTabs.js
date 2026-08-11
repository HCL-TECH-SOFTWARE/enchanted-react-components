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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const styles_1 = require("@mui/material/styles");
const double_left_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/apps/es/double-left"));
const double_right_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/apps/es/double-right"));
const Tabs_1 = __importDefault(require("../Tabs/Tabs"));
const Tab_1 = __importDefault(require("../Tabs/Tab"));
const IconButton_1 = __importStar(require("../IconButton/IconButton"));
const theme_1 = require("../theme");
const Tooltip_1 = __importDefault(require("../Tooltip/Tooltip"));
const PanelTabContainerStyled = (0, styles_1.styled)('div')((props) => {
    const { theme } = props;
    return {
        borderLeft: `solid 1px ${theme.palette.border.primary}`,
        borderRight: `solid 1px ${theme.palette.border.primary}`,
        width: '41px',
        maxWidth: '41px',
        position: 'relative',
    };
});
const ToggleButtonContainerStyled = (0, styles_1.styled)('div')(() => {
    return {
        position: 'fixed',
        bottom: '0px',
        padding: '8px 12px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };
});
const PanelTabsStyled = (0, styles_1.styled)(Tabs_1.default)((props) => {
    const { theme } = props;
    return {
        padding: '8px 0',
        '& button:hover': {
            backgroundColor: theme.palette.action.hover,
        },
        '& button:focus-visible': {
            border: `1px solid ${theme.palette.action.focus}`,
        },
    };
});
const TabStyled = (0, styles_1.styled)(Tab_1.default)((props) => {
    const { theme } = props;
    return {
        '&.MuiTab-root': {
            minWidth: '17.5px',
            minHeight: '17.5px',
            padding: '10px',
        },
        '&.Mui-selected': {
            color: theme.palette.text.secondary,
        },
        '.MuiSvgIcon-root': {
            width: '20px',
            height: '20px',
        },
        color: theme.palette.text.secondary,
        maxHeight: '40px',
    };
});
const getArrowIcon = (isPanelCollapsed) => {
    const theme = (0, styles_1.useTheme)();
    if (theme.direction === theme_1.ThemeDirectionType.RTL && isPanelCollapsed) {
        return React.createElement(double_right_1.default, null);
    }
    if (theme.direction === theme_1.ThemeDirectionType.RTL && !isPanelCollapsed) {
        return React.createElement(double_left_1.default, null);
    }
    if (theme.direction !== theme_1.ThemeDirectionType.RTL && isPanelCollapsed) {
        return React.createElement(double_left_1.default, null);
    }
    return React.createElement(double_right_1.default, null);
};
const PanelTabs = ({ selectedTabValue, handleTabChange, tabs, isPanelCollapsed, togglePanel, translation, togglePanelLabel, }) => {
    const [activeTab, setActiveTab] = React.useState(null);
    const handleFocus = (key) => {
        setActiveTab(key);
    };
    const handleBlur = () => {
        setActiveTab(null);
    };
    return (React.createElement(PanelTabContainerStyled, null,
        React.createElement(PanelTabsStyled, { value: selectedTabValue, onChange: (event, newValue) => {
                handleTabChange(event, newValue);
                event.stopPropagation();
            }, onClick: (event) => {
                handleTabChange(event, selectedTabValue);
                event.stopPropagation();
            }, "data-testid": "panel-tabs", orientation: "vertical", variant: "scrollable", tabIndex: -1 }, tabs.map((tab, index) => {
            const key = index;
            const iconTooltip = (React.createElement(Tooltip_1.default, { title: tab.tabIcon.label, open: activeTab === key, placement: (tab.tabIcon && tab.tabIcon.tooltipPlacement) ? tab.tabIcon.tooltipPlacement : 'left' }, tab.tabIcon.icon));
            return (React.createElement(TabStyled, { key: `tab-${key}`, tabIndex: 0, "data-testid": `tab-${key}`, icon: iconTooltip, "aria-label": tab.tabIcon.label, disableFocusRipple: true, onFocus: () => {
                    return handleFocus(key);
                }, onBlur: handleBlur, onMouseEnter: () => {
                    return handleFocus(key);
                }, onMouseLeave: handleBlur }));
        })),
        togglePanel
            ? (React.createElement(ToggleButtonContainerStyled, null,
                React.createElement(Tooltip_1.default, { title: translation && translation.toggleButtonTooltip ? translation.toggleButtonTooltip : '' },
                    React.createElement(IconButton_1.default, { size: "small", variant: IconButton_1.IconButtonVariants.WITHOUT_PADDING, onClick: togglePanel, "aria-expanded": !isPanelCollapsed, "aria-controls": "panelContent", "aria-label": togglePanelLabel || 'Toggle panel' }, getArrowIcon(isPanelCollapsed)))))
            : null));
};
PanelTabs.defaultProps = {};
exports.default = PanelTabs;
