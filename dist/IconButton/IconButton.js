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
exports.getMuiIconButtonThemeOverrides = exports.IconButtonTestIds = exports.IconButtonSizes = exports.IconButtonVariants = void 0;
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
const react_1 = __importDefault(require("react"));
const styles_1 = require("@mui/material/styles");
const IconButton_1 = __importDefault(require("@mui/material/IconButton"));
const chevron__down_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/chevron--down"));
const Typography_1 = __importDefault(require("../Typography"));
var IconButtonVariants;
(function (IconButtonVariants) {
    IconButtonVariants["WITHOUT_PADDING"] = "without padding";
    IconButtonVariants["WITH_PADDING"] = "with padding";
})(IconButtonVariants = exports.IconButtonVariants || (exports.IconButtonVariants = {}));
var IconButtonSizes;
(function (IconButtonSizes) {
    IconButtonSizes["SMALL"] = "small";
    IconButtonSizes["MEDIUM"] = "medium";
})(IconButtonSizes = exports.IconButtonSizes || (exports.IconButtonSizes = {}));
var IconButtonTestIds;
(function (IconButtonTestIds) {
    IconButtonTestIds["ICONBUTTON_END_ICON"] = "iconButtonEndIcon";
})(IconButtonTestIds = exports.IconButtonTestIds || (exports.IconButtonTestIds = {}));
const StyledMainContainer = (0, styles_1.styled)('div')((props) => {
    const { theme, inversecolors } = props;
    return {
        flexDirection: 'column',
        justifyContent: 'center',
        display: 'inline-flex',
        alignItems: 'center',
        '&.selected': {
            color: inversecolors ? theme.palette.action.selectedInverse : theme.palette.action.selected,
            '.MuiSvgIcon-root, .MuiTypography-root': {
                color: inversecolors ? theme.palette.action.selectedInverse : theme.palette.action.selected,
            },
        },
        '&.disabled': {
            color: inversecolors ? theme.palette.action.disabledInverse : theme.palette.action.disabled,
            '.MuiSvgIcon-root, .MuiTypography-root': {
                color: inversecolors ? theme.palette.action.disabledInverse : theme.palette.action.disabled,
            },
            pointerEvents: 'none',
        },
    };
});
const StyledSubContainer = (0, styles_1.styled)('div')((props) => {
    const { theme, inversecolors } = props;
    return {
        flexDirection: 'row',
        justifyContent: 'center',
        display: 'inline-flex',
        alignItems: 'center',
        width: 'fit-content',
        '&:hover': {
            borderRadius: '2px',
            backgroundColor: inversecolors ? theme.palette.action.hoverInverse : theme.palette.action.hover,
        },
        '&.force-to-focusHover': {
            borderRadius: '2px',
            backgroundColor: inversecolors ? theme.palette.action.hoverInverse : theme.palette.action.hover,
        },
        '&.selected': {
            outline: `1px solid ${inversecolors ? theme.palette.action.focusInverse : theme.palette.action.focus}`,
            borderRadius: '1px',
            backgroundColor: theme.palette.action.selectedOpacityModified,
            '&:hover': {
                backgroundColor: theme.palette.action.selectedOpacityModified,
                color: inversecolors ? theme.palette.primary.darkInverse : theme.palette.primary.dark,
                outline: `1px solid ${inversecolors ? theme.palette.primary.darkInverse : theme.palette.primary.dark}`,
                '.MuiSvgIcon-root, + .MuiTypography-root': {
                    color: inversecolors ? theme.palette.primary.darkInverse : theme.palette.primary.dark,
                },
            },
            '&.force-to-focusHover': {
                backgroundColor: theme.palette.action.selectedOpacityModified,
                color: inversecolors ? theme.palette.primary.darkInverse : theme.palette.primary.dark,
                outline: `1px solid ${inversecolors ? theme.palette.primary.darkInverse : theme.palette.primary.dark}`,
                '.MuiSvgIcon-root, + .MuiTypography-root': {
                    color: inversecolors ? theme.palette.primary.darkInverse : theme.palette.primary.dark,
                },
            },
            '&.disabled': {
                backgroundColor: theme.palette.action.disabledOpacityModified,
                outline: `1px solid ${inversecolors ? theme.palette.border.inverseSecondary : theme.palette.border.secondary}`,
                borderRadius: '1px',
            },
        },
    };
});
const getMuiIconButtonThemeOverrides = () => {
    return {
        MuiIconButton: {
            styleOverrides: {
                root: ({ ownerState, theme }) => {
                    return ({
                        color: ownerState.inversecolors ? theme.palette.action.inverse : theme.palette.action.active,
                        backgroundColor: 'transparent',
                        borderRadius: '2px',
                        padding: 0,
                        '&.Mui-focusVisible, &:focus, &.force-to-focus, &.force-to-focusHover': {
                            outline: `1px solid ${ownerState.inversecolors ? theme.palette.action.focusInverse : theme.palette.action.focus}`,
                            borderRadius: '3px',
                            outlineOffset: '-2px',
                        },
                        '&:hover': {
                            borderRadius: '2px',
                            backgroundColor: ownerState.inversecolors ? theme.palette.action.hoverInverse : theme.palette.action.hover,
                        },
                        '&.force-to-focusHover': {
                            borderRadius: '2px',
                            backgroundColor: ownerState.inversecolors ? theme.palette.action.hoverInverse : theme.palette.action.hover,
                        },
                        '.MuiSvgIcon-root:not(.endIcon)': Object.assign(Object.assign(Object.assign({ margin: '0', padding: 0, outline: 'none', boxSizing: 'border-box' }, ownerState.variant === IconButtonVariants.WITH_PADDING && {
                            margin: '2px',
                        }), ownerState.size === IconButtonSizes.SMALL && {
                            height: '16px',
                            width: '16px',
                        }), ownerState.size === IconButtonSizes.MEDIUM && {
                            height: '20px',
                            width: '20px',
                        }),
                    });
                },
            },
        },
    };
};
exports.getMuiIconButtonThemeOverrides = getMuiIconButtonThemeOverrides;
const IconButton = react_1.default.forwardRef((_a, forwardRef) => {
    var { showendicon } = _a, props = __rest(_a, ["showendicon"]);
    props.inversecolors = props.inversecolors ? 1 : 0;
    return (react_1.default.createElement(StyledMainContainer, { className: `IconButtonMainContainer ${props.selected ? 'selected' : ''} ${props.disabled ? 'disabled' : ''} ${props.className}`, inversecolors: Boolean(props.inversecolors) },
        react_1.default.createElement(StyledSubContainer, { className: `${props.selected ? 'selected' : ''} ${props.disabled ? 'disabled' : ''} ${props.className}`, inversecolors: Boolean(props.inversecolors) },
            react_1.default.createElement(IconButton_1.default, Object.assign({}, props, { ref: forwardRef, role: "button", "aria-disabled": props.disabled, className: `${props.selected ? 'selected' : ''} ${props.className}` }),
                props.children,
                (showendicon === 1 || showendicon === true) && (react_1.default.createElement(chevron__down_1.default, { className: "endIcon", "data-testid": IconButtonTestIds.ICONBUTTON_END_ICON, sx: (theme) => {
                        return Object.assign(Object.assign({ color: (props.inversecolors) ? theme.palette.action.inverse : theme.palette.action.active, width: '12px', height: '12px', margin: '0', padding: '0' }, props.variant === IconButtonVariants.WITH_PADDING && Object.assign(Object.assign({ marginLeft: '-2px' }, props.size === IconButtonSizes.SMALL && {
                            marginRight: '3px',
                        }), props.size === IconButtonSizes.MEDIUM && {
                            marginRight: '4px',
                        })), props.variant === IconButtonVariants.WITHOUT_PADDING && Object.assign(Object.assign({}, props.size === IconButtonSizes.SMALL && {
                            marginRight: '2px',
                        }), props.size === IconButtonSizes.MEDIUM && {
                            marginRight: '2px',
                        }));
                    } })))),
        props.label && (react_1.default.createElement(Typography_1.default, { variant: "caption", textAlign: "center", sx: (theme) => {
                return {
                    color: (props.inversecolors) ? theme.palette.action.inverse : theme.palette.action.active,
                    paddingLeft: '4px',
                    paddingRight: '4px',
                    marginTop: '2px',
                };
            } }, props.label))));
});
IconButton.defaultProps = {
    size: IconButtonSizes.MEDIUM,
    variant: IconButtonVariants.WITH_PADDING,
    color: 'default',
    selected: false,
    showendicon: false,
    label: undefined,
    disabled: false,
    inversecolors: false,
    disableFocusRipple: true,
    edge: false,
    centerRipple: true,
    disableRipple: true,
    disableTouchRipple: true,
    focusRipple: true,
    tabIndex: 0,
};
__exportStar(require("@mui/material/IconButton"), exports);
exports.default = IconButton;
