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
exports.HeaderTestIds = exports.HeaderPageVariant = exports.HeaderDemo = void 0;
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
const react_1 = __importStar(require("react"));
const lodash_1 = require("lodash");
const uuid_1 = require("uuid");
const styles_1 = require("@mui/material/styles");
const arrow__left_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/arrow--left"));
const arrow__right_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/arrow--right"));
const material_1 = require("@mui/material");
const Grid_1 = __importDefault(require("@mui/material/Grid"));
const Container_1 = __importDefault(require("@mui/material/Container"));
const Typography_1 = __importDefault(require("../Typography"));
const IconButton_1 = __importStar(require("../IconButton"));
const Divider_1 = __importStar(require("../Divider"));
const theme_1 = require("../theme");
const Tooltip_1 = __importDefault(require("../Tooltip/Tooltip"));
var HeaderDemo;
(function (HeaderDemo) {
    HeaderDemo["CC"] = "CC";
    HeaderDemo["DAM"] = "DAM";
    HeaderDemo["CR"] = "CR";
})(HeaderDemo = exports.HeaderDemo || (exports.HeaderDemo = {}));
var HeaderPageVariant;
(function (HeaderPageVariant) {
    HeaderPageVariant["OVERVIEW_PAGE"] = "OVERVIEW_PAGE";
    HeaderPageVariant["ITEM_PAGE"] = "ITEM_PAGE";
    HeaderPageVariant["SEARCH_RESULT_PAGE"] = "SEARCH_RESULT_PAGE";
    HeaderPageVariant["UPDATES_PAGE"] = "UPDATES_PAGE";
})(HeaderPageVariant = exports.HeaderPageVariant || (exports.HeaderPageVariant = {}));
var HeaderTestIds;
(function (HeaderTestIds) {
    HeaderTestIds["HEADER_CONTAINER"] = "headerContainer";
    HeaderTestIds["HEADER_START_SECTION"] = "headerStartSection";
    HeaderTestIds["HEADER_MIDDLE_SECTION"] = "headerMiddleSection";
    HeaderTestIds["HEADER_END_SECTION"] = "headerEndSection";
    HeaderTestIds["HEADER_BACK_BUTTON"] = "headerBackButton";
    HeaderTestIds["HEADER_START_TITLE"] = "headerStartTitle";
    HeaderTestIds["HEADER_START_SUBTITLE"] = "headerStartSubtitle";
    HeaderTestIds["HEADER_FAVORITES_TOGGLE"] = "headerFavoritesToggle";
})(HeaderTestIds = exports.HeaderTestIds || (exports.HeaderTestIds = {}));
const MuiContainer = (0, styles_1.styled)(Container_1.default)((theme) => {
    return {
        backgroundColor: theme.theme.palette.common.white,
        position: 'relative',
        top: '0px',
        right: '0px',
        left: '0px',
        padding: '0px !important',
        margin: '0px !important',
        maxWidth: 'unset !important',
    };
});
const MuiGrid = (0, styles_1.styled)(Grid_1.default)((theme) => {
    return {
        minWidth: '0',
        minHeight: '54px',
        '&.MuiGrid-container': {
            margin: '0px',
            display: 'flex',
            minWidth: '0',
            justifyContent: 'space-between',
            width: '100%',
        },
        '&.MuiGrid-root': {
            justifyContent: 'end',
        },
    };
});
const StartSectionGridStyled = (0, styles_1.styled)(Grid_1.default)((theme) => {
    return {
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'nowrap',
        overflow: 'hidden',
        gap: '12px',
        '&.MuiGrid-root': {
            justifyContent: 'start',
            paddingRight: '6px',
            paddingTop: '0px',
        },
        '[data-testid=headerFavoritesToggle]': {
            '.MuiSvgIcon-root': {
                '&[data-mui-test=star--filledIcon]': {
                    color: theme.theme.palette.primary.main,
                },
            },
        },
        '.MuiTypography-root': {
            alignItems: 'center',
            display: 'flex',
            minWidth: '0',
            '&[data-testid=headerStartSubtitle]': {
                paddingLeft: '0px',
                width: '85px',
            },
            '&[data-testid=headerStartTitle]': {
                display: 'block',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
            },
        },
        '.MuiIconButton-root': {
            alignItems: 'center',
            display: 'flex',
            minWidth: '0',
        },
    };
});
const MiddleSectionGridStyled = (0, styles_1.styled)(Grid_1.default)((theme) => {
    return {
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
        gap: '12px',
        '&.MuiGrid-root': {
            justifyContent: 'center',
            paddingLeft: '6px',
            paddingRight: '6px',
            paddingTop: '0px',
        },
    };
});
const EndSectionGridStyled = (0, styles_1.styled)(Grid_1.default)((theme) => {
    return {
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
        paddingRight: '12px',
        gap: '12px',
        '.MuiSvgIcon-root': {
            fontSize: '16px',
        },
        '&[data-testid=headerEndSection]': {
            '&.MuiGrid-root': {
                justifyContent: 'end',
                paddingLeft: '6px',
                paddingTop: '0px',
            },
            '& .MuiSwitch-root': {
                '& .MuiButtonBase-root': {
                    marginLeft: 0, // fix for affected button inside Switch from .MuiButtonBase-root style before this block
                },
            },
        },
    };
});
const Header = (_a) => {
    var props = __rest(_a, []);
    const theme = (0, material_1.useTheme)();
    const { startSection, middleSection, endSection, hideMiddleSection, onClickBackButton, onClickFavoritesToggle, } = props;
    const withMiddleSection = middleSection && middleSection.length > 0 && hideMiddleSection !== true;
    const hamburgerSpace = (startSection.hamburgerSpace !== undefined && startSection.hamburgerSpace);
    const muiContainerProps = (0, lodash_1.omit)(props, [
        'startSection', 'middleSection', 'endSection', 'hideMiddleSection', 'onClickBackButton', 'onClickFavoritesToggle', 'hamburgerSpace',
        'headerDemoSample', 'headerPageVariant',
    ]);
    const headerTitleRef = (0, react_1.useRef)(null);
    const [isOverflowed, setIsOverflow] = (0, react_1.useState)(false);
    // This function checks if the header title is too long and enables the tooltip when it overflows
    const compareSize = () => {
        if (headerTitleRef.current) {
            setIsOverflow(headerTitleRef.current.scrollWidth > headerTitleRef.current.clientWidth);
        }
    };
    (0, react_1.useEffect)(() => {
        compareSize();
        window.addEventListener('resize', compareSize);
        return () => {
            window.removeEventListener('resize', compareSize);
        };
    }, [startSection.title]);
    return (react_1.default.createElement(MuiContainer, Object.assign({}, muiContainerProps),
        react_1.default.createElement(MuiGrid, { container: true, spacing: 2, "data-testid": HeaderTestIds.HEADER_CONTAINER },
            react_1.default.createElement(StartSectionGridStyled, { item: true, xs: 4, sx: { '&.MuiGrid-root': { paddingLeft: hamburgerSpace ? '68px' : '12px' } }, "data-testid": HeaderTestIds.HEADER_START_SECTION },
                ((startSection === null || startSection === void 0 ? void 0 : startSection.withBackButton) !== undefined && startSection.withBackButton && (startSection === null || startSection === void 0 ? void 0 : startSection.avatar) !== undefined)
                    && (react_1.default.createElement(Tooltip_1.default, { title: startSection.backIconToolTip },
                        react_1.default.createElement(IconButton_1.default, { onClick: () => { onClickBackButton(); }, "data-testid": HeaderTestIds.HEADER_BACK_BUTTON, showendicon: 0 }, theme.direction === theme_1.ThemeDirectionType.RTL ? react_1.default.createElement(arrow__right_1.default, null) : react_1.default.createElement(arrow__left_1.default, null)))),
                ((startSection === null || startSection === void 0 ? void 0 : startSection.withBackButton) !== undefined && startSection.withBackButton && (startSection === null || startSection === void 0 ? void 0 : startSection.avatar) === undefined)
                    && (react_1.default.createElement(Tooltip_1.default, { title: startSection.backIconToolTip },
                        react_1.default.createElement(IconButton_1.default, { onClick: () => { onClickBackButton(); }, "data-testid": HeaderTestIds.HEADER_BACK_BUTTON, showendicon: 0 }, theme.direction === theme_1.ThemeDirectionType.RTL ? react_1.default.createElement(arrow__right_1.default, null) : react_1.default.createElement(arrow__left_1.default, null)))),
                (startSection === null || startSection === void 0 ? void 0 : startSection.avatar) !== undefined && startSection.avatar,
                (startSection === null || startSection === void 0 ? void 0 : startSection.title) !== undefined
                    && (react_1.default.createElement(Tooltip_1.default, { tooltipsize: "small", placement: "bottom", title: startSection.title, disableHoverListener: !isOverflowed },
                        react_1.default.createElement(Typography_1.default, { ref: headerTitleRef, variant: "subtitle1", sx: {
                                paddingLeft: ((startSection === null || startSection === void 0 ? void 0 : startSection.withBackButton) || (startSection === null || startSection === void 0 ? void 0 : startSection.avatar)) ? '0px' : '4px',
                                margin: '-4px',
                            }, "data-testid": HeaderTestIds.HEADER_START_TITLE }, startSection.title))),
                (startSection === null || startSection === void 0 ? void 0 : startSection.subtitle) !== undefined
                    && (react_1.default.createElement(Typography_1.default, { sx: Object.assign(Object.assign({}, theme_1.TYPOGRAPHY.caption), { height: '14px', color: (scopedTheme) => { return scopedTheme.palette.text.secondary; } }), "data-testid": HeaderTestIds.HEADER_START_SUBTITLE }, startSection.subtitle)),
                ((startSection === null || startSection === void 0 ? void 0 : startSection.favoritesToggleIcon) && react_1.default.isValidElement(startSection.favoritesToggleIcon) && !(startSection === null || startSection === void 0 ? void 0 : startSection.favoritesToggleComponent))
                    && (react_1.default.createElement(IconButton_1.default, { size: IconButton_1.IconButtonSizes.SMALL, onClick: () => { onClickFavoritesToggle(); }, "data-testid": HeaderTestIds.HEADER_FAVORITES_TOGGLE, showendicon: 0 }, startSection.favoritesToggleIcon)),
                ((startSection === null || startSection === void 0 ? void 0 : startSection.favoritesToggleComponent) && react_1.default.isValidElement(startSection.favoritesToggleComponent))
                    && (startSection.favoritesToggleComponent)),
            withMiddleSection && (react_1.default.createElement(MiddleSectionGridStyled, { item: true, xs: 4, "data-testid": HeaderTestIds.HEADER_MIDDLE_SECTION }, middleSection === null || middleSection === void 0 ? void 0 : middleSection.map((eachIcon, index) => {
                return react_1.default.isValidElement(eachIcon) ? react_1.default.createElement(react_1.default.Fragment, { key: (0, uuid_1.v4)() }, eachIcon) : null;
            }))),
            react_1.default.createElement(EndSectionGridStyled, { item: true, xs: withMiddleSection ? 4 : 8, "data-testid": HeaderTestIds.HEADER_END_SECTION }, endSection === null || endSection === void 0 ? void 0 : endSection.map((eachElement, index) => {
                return react_1.default.isValidElement(eachElement) ? react_1.default.createElement(react_1.default.Fragment, { key: (0, uuid_1.v4)() }, eachElement) : null;
            }))),
        react_1.default.createElement(Divider_1.default, { type: Divider_1.DividerTypes.PRIMARY, sx: {
                alignItems: 'center',
                display: 'flex',
                minWidth: '0',
            } })));
};
Header.defaultProps = {
    hideMiddleSection: false,
    startSection: [],
    middleSection: [],
    endSection: [],
    /* eslint-why user defined functions, defaults only put in place to prevent tsc could be undefined warning */
    /* eslint-disable no-empty-function */
    onClickBackButton: () => { },
    onClickFavoritesToggle: () => { },
    /* eslint-enable no-empty-function */
};
__exportStar(require("@mui/material/AppBar"), exports);
exports.default = Header;
