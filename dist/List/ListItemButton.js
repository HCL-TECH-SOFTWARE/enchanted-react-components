"use strict";
/* ======================================================================== *
 * Copyright 2024, 2025 HCL America Inc.                                    *
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
exports.getMuiListItemButtonThemeOverrides = exports.ListSizes = void 0;
const react_1 = __importDefault(require("react"));
const caret__right_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/caret--right"));
const caret__left_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/caret--left"));
const ListItemButton_1 = __importDefault(require("@mui/material/ListItemButton"));
const material_1 = require("@mui/material");
const ListItemSecondaryAction_1 = __importDefault(require("./ListItemSecondaryAction"));
const ListItemIcon_1 = __importDefault(require("./ListItemIcon"));
const theme_1 = require("../theme");
var ListSizes;
(function (ListSizes) {
    ListSizes["SMALL"] = "small";
    ListSizes["MEDIUM"] = "medium";
})(ListSizes = exports.ListSizes || (exports.ListSizes = {}));
const getMuiListItemButtonThemeOverrides = () => {
    return {
        MuiListItemButton: {
            styleOverrides: {
                root: ({ ownerState, theme }) => {
                    const secondaryActionStyle = ownerState.cascading ? {
                        right: ownerState.size === ListSizes.SMALL ? '26px' : '30px',
                    } : {};
                    const sizeStyle = ownerState.size === ListSizes.SMALL ? {
                        width: '16px',
                        height: '16px',
                    } : {
                        width: '20px',
                        height: '20px',
                    };
                    const sizeIconStyle = ownerState.size === ListSizes.SMALL ? {
                        marginRight: '8px',
                    } : {
                        marginRight: '16px',
                    };
                    const listItemStyle = ownerState.size === ListSizes.SMALL ? {
                        padding: '6px 8px',
                    } : {
                        padding: '6px 12px',
                    };
                    return {
                        '&.MuiListItemButton-root': Object.assign(Object.assign({}, listItemStyle), { '.MuiListItemIcon-root': Object.assign({ minWidth: ownerState.size === ListSizes.SMALL ? '16px' : '20px' }, sizeIconStyle), '.MuiListItemIcon-root.cascading': Object.assign({ margin: '0 0 0 4px', padding: '4px', justifyContent: 'center', alignItems: 'center' }, sizeStyle), '.MuiListItemAvatar-root': Object.assign({ minWidth: 'auto' }, sizeIconStyle) }),
                        '&.MuiListItemButton-root.Mui-disabled': {
                            opacity: 'unset',
                            '.MuiSvgIcon-root': {
                                color: theme.palette.action.disabled,
                            },
                            '.MuiTypography-root': {
                                color: theme.palette.text.disabled,
                            },
                        },
                        '&:hover': {
                            backgroundColor: theme.palette.action.hover,
                        },
                        '&.MuiListItemButton-root.disabled-hover': {
                            pointerEvents: 'none !important',
                            backgroundColor: 'transparent !important',
                            '&:hover': {
                                backgroundColor: 'transparent !important',
                            },
                        },
                        '&.Mui-focusVisible': {
                            backgroundColor: 'transparent',
                            boxShadow: `0 0 0 1px ${theme.palette.primary.main} inset`,
                            '&:hover': {
                                backgroundColor: theme.palette.action.hover,
                            },
                        },
                        '&:hover .MuiListItemSecondaryAction-root,&:focus-within .MuiListItemSecondaryAction-root, &.open-menu-action .MuiListItemSecondaryAction-root,&:focus .MuiListItemSecondaryAction-root': {
                            opacity: '1',
                        },
                        '&:hover .MuiListItemText-primary, &:hover .MuiListItemText-secondary': {
                            width: 'calc(100% - 48px)',
                        },
                        '& .MuiTouchRipple-root': {
                            display: 'none',
                        },
                        '& .MuiListItemText-root': {
                            margin: '0 8px 0 0',
                        },
                        '& .MuiListItemSecondaryAction-root': Object.assign(Object.assign({ opacity: '0', transition: 'opacity 0.3s ease', right: ownerState.size === ListSizes.SMALL ? '8px' : '12px', display: 'flex', justifyContent: 'center', alignItems: 'center' }, secondaryActionStyle), { '.IconButtonMainContainer': {
                                margin: '0 4px 0 0',
                                '&:last-child': {
                                    margin: '0',
                                },
                            }, '.MuiButtonBase-root.Mui-disabled': {
                                '.MuiSvgIcon-root': {
                                    color: theme.palette.action.disabled,
                                },
                            } }),
                        '& .MuiSvgIcon-root': Object.assign(Object.assign({}, sizeStyle), { color: theme.palette.action.active }),
                        '& .MuiAvatar-root.MuiAvatar-root': Object.assign({}, sizeStyle),
                        '& .MuiListItemText-secondary': {
                            display: 'flex',
                            '.MuiSvgIcon-root': {
                                margin: '0 4px 0 0',
                                width: '12px',
                                height: '12px',
                            },
                        },
                    };
                },
            },
        },
    };
};
exports.getMuiListItemButtonThemeOverrides = getMuiListItemButtonThemeOverrides;
const ListItemButton = (_a) => {
    var { disabledHover } = _a, props = __rest(_a, ["disabledHover"]);
    const theme = (0, material_1.useTheme)();
    const { secondaryActionButton } = props, restProps = __rest(props, ["secondaryActionButton"]);
    const composedClassName = [props.className, disabledHover ? 'disabled-hover' : ''].filter(Boolean).join(' ');
    return (react_1.default.createElement(ListItemButton_1.default, Object.assign({}, restProps, { className: composedClassName, tabIndex: disabledHover ? -1 : props.tabIndex, "aria-disabled": disabledHover ? 'true' : undefined }),
        props.children,
        secondaryActionButton
            && (react_1.default.createElement(ListItemSecondaryAction_1.default, null, secondaryActionButton)),
        props.cascading ? (react_1.default.createElement(ListItemIcon_1.default, { className: "cascading" }, theme.direction === theme_1.ThemeDirectionType.RTL ? react_1.default.createElement(caret__left_1.default, null) : react_1.default.createElement(caret__right_1.default, null))) : null));
};
ListItemButton.defaultProps = {
    cascading: false,
    size: ListSizes.SMALL,
};
__exportStar(require("@mui/material/ListItemButton"), exports);
exports.default = ListItemButton;
