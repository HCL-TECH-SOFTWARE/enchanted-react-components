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
const react_1 = __importStar(require("react"));
const Tabs_1 = __importDefault(require("@mui/material/Tabs"));
const styles_1 = require("@mui/material/styles");
const StyledTabs = (0, styles_1.styled)(Tabs_1.default)((props) => {
    const { theme } = props;
    return {
        '& .MuiButtonBase-root': {
            padding: props.orientation === 'horizontal' ? '6px 8px' : '10px',
        },
        '& .MuiTabs-indicator': {
            backgroundColor: theme.palette.action.active,
            marginRight: '2px',
        },
        '& .MuiTab-root:hover': {
            backgroundColor: theme.palette.action.hover,
        },
        '& .MuiTab-root': {
            border: '1px solid transparent',
            justifyContent: props.orientation === 'horizontal' ? 'center' : 'flex-start',
        },
        '& .MuiTouchRipple-root': {
            display: 'none',
        },
        '& .MuiTab-root:focus': {
            border: `1px solid ${theme.palette.action.focus}`,
        },
        '& .MuiSvgIcon-root': {
            color: theme.palette.action.active,
            width: props.orientation === 'horizontal' ? '16px' : '20px',
            height: props.orientation === 'horizontal' ? '16px' : '20px',
        },
    };
});
const Tabs = (_a) => {
    var props = __rest(_a, []);
    const [value, setValue] = (0, react_1.useState)(props.value || 0);
    const [indicatorStyle, setIndicatorStyle] = (0, react_1.useState)({});
    const tabsRef = (0, react_1.useRef)(null);
    /**
    * This function calculates and updates the style of the tab indicator. It determines the orientation of the tabs,
    * computes the padding and dimensions of the selected tab, and calculates its position.
    *
    * @param {HTMLElement} tabElement - The HTML element of the selected tab.
    */
    const updateIndicatorStyle = (tabElement) => {
        const style = window.getComputedStyle(tabElement);
        const isVertical = props.orientation === 'vertical';
        const startPadding = parseFloat(style.getPropertyValue(isVertical ? 'padding-top' : 'padding-left'));
        const endPadding = parseFloat(style.getPropertyValue(isVertical ? 'padding-bottom' : 'padding-right'));
        const dimensionWithoutPadding = tabElement[isVertical ? 'offsetHeight' : 'offsetWidth'] - startPadding - endPadding;
        const startPosition = tabElement[isVertical ? 'offsetTop' : 'offsetLeft'] + startPadding;
        setIndicatorStyle({
            [isVertical ? 'height' : 'width']: dimensionWithoutPadding,
            [isVertical ? 'top' : 'left']: startPosition,
        });
    };
    (0, react_1.useEffect)(() => {
        if (tabsRef.current) {
            const selectedTab = tabsRef.current.querySelector('.Mui-selected');
            if (selectedTab) {
                updateIndicatorStyle(selectedTab);
            }
        }
    }, []);
    (0, react_1.useEffect)(() => {
        if (tabsRef.current) {
            const selectedTab = tabsRef.current.querySelector('.Mui-selected');
            if (selectedTab) {
                updateIndicatorStyle(selectedTab);
            }
        }
    }, [props.orientation, value]);
    (0, react_1.useEffect)(() => {
        if (props.value !== undefined) {
            setValue(props.value);
        }
    }, [props.value]);
    const handleChange = (event, newValue) => {
        if (props.onChange) {
            props.onChange(event, newValue);
            updateIndicatorStyle(event.currentTarget);
        }
        else {
            setValue(newValue);
        }
    };
    return (react_1.default.createElement(StyledTabs, Object.assign({}, props, { value: value, onChange: handleChange, sx: {
            borderBottom: props.orientation === 'horizontal' ? 1 : 'none',
            borderColor: 'divider',
            minHeight: '30px',
        }, TabIndicatorProps: {
            style: indicatorStyle,
        }, ref: tabsRef })));
};
const defaultProps = {
    centered: false,
    orientation: 'horizontal',
    variant: 'standard',
    tabIndex: 0,
    disabled: false,
};
Tabs.defaultProps = defaultProps;
__exportStar(require("@mui/material/Tabs"), exports);
exports.default = Tabs;
