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
exports.getMuiChipThemeOverrides = exports.ChipTestIds = exports.ChipVariants = void 0;
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
const Chip_1 = __importDefault(require("@mui/material/Chip"));
const Avatar_1 = __importStar(require("../Avatar"));
var ChipVariants;
(function (ChipVariants) {
    ChipVariants["CONTAINED"] = "filled";
    ChipVariants["OUTLINED"] = "outlined";
})(ChipVariants = exports.ChipVariants || (exports.ChipVariants = {}));
var ChipTestIds;
(function (ChipTestIds) {
    ChipTestIds["CHIP_ROOT"] = "ChipRoot";
})(ChipTestIds = exports.ChipTestIds || (exports.ChipTestIds = {}));
const Chip = (_a) => {
    var props = __rest(_a, []);
    const { leadingIcon, leadingImage, leadingImageAlt, leadingImageProps, leadingLetter, trailingIcon, onDeleteFunc, hideTrailingIcon, icon } = props, rest = __rest(props, ["leadingIcon", "leadingImage", "leadingImageAlt", "leadingImageProps", "leadingLetter", "trailingIcon", "onDeleteFunc", "hideTrailingIcon", "icon"]);
    const renderLeadingIcon = () => {
        switch (props.leadingavatartype) {
            case Avatar_1.AvatarTypes.ICON: {
                if (leadingIcon || icon) {
                    return react_1.default.createElement(Avatar_1.default, { type: props.leadingavatartype, iconImage: leadingIcon || icon });
                }
                break;
            }
            case Avatar_1.AvatarTypes.LETTER: {
                if (leadingLetter) {
                    return react_1.default.createElement(Avatar_1.default, { type: props.leadingavatartype, letter: leadingLetter });
                }
                break;
            }
            case Avatar_1.AvatarTypes.IMAGE: {
                if (leadingImage) {
                    return react_1.default.createElement(Avatar_1.default, { type: props.leadingavatartype, imageSource: leadingImage, imageAltProps: leadingImageAlt, imageProps: leadingImageProps });
                }
                break;
            }
            case 'none':
            default:
                break;
        }
        return undefined;
    };
    return (react_1.default.createElement(Chip_1.default, Object.assign({}, rest, { avatar: renderLeadingIcon(), deleteIcon: trailingIcon, onDelete: onDeleteFunc && !hideTrailingIcon
            ? () => { onDeleteFunc(); }
            : undefined // undefined is acceptable for MuiChip, it hides the trailing icon as per doc
        , "data-testid": ChipTestIds.CHIP_ROOT })));
};
const getMuiChipThemeOverrides = () => {
    return {
        MuiChip: {
            styleOverrides: {
                root: ({ ownerState, theme }) => {
                    var _a;
                    const leadingLetter = (_a = ownerState.avatar) === null || _a === void 0 ? void 0 : _a.props.letter;
                    return (Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ height: '24px', padding: '4px', border: '1px solid transparent' }, ownerState.variant === ChipVariants.CONTAINED && Object.assign(Object.assign({ backgroundColor: theme.palette.action.activeOpacity, '&.Mui-focusVisible': {
                            backgroundColor: theme.palette.action.hover,
                        } }, ownerState.disabled && {
                        backgroundColor: theme.palette.action.disabledBackground,
                    }), ownerState.focus === 1 && {
                        border: `2px solid ${theme.palette.action.focus}`,
                        padding: '3px',
                    })), ownerState.variant === ChipVariants.OUTLINED && Object.assign(Object.assign({ backgroundColor: 'transparent', border: `1px solid ${theme.palette.border.tertiary}`, '&.Mui-focusVisible': {
                            backgroundColor: 'transparent',
                        } }, ownerState.disabled && {
                        border: `1px solid ${theme.palette.action.disabledOpacityModified}`,
                    }), ownerState.focus === 1 && {
                        border: `2px solid ${theme.palette.action.focus}`,
                        padding: '3px',
                    })), { '&:focus': {
                            border: `2px solid ${theme.palette.action.focus}`,
                            padding: '3px',
                        }, '&:hover': {
                            backgroundColor: theme.palette.action.hover,
                            '&:active': {
                                backgroundColor: theme.palette.action.selectedOpacityModified, // on select, override hover bg color with blueish one
                            },
                        } }), ownerState.selected === true && Object.assign({ backgroundColor: theme.palette.action.selectedOpacityModified, border: `1px solid ${theme.palette.action.selected}`, '&:hover': {
                            backgroundColor: theme.palette.background.primary,
                            border: `1px solid ${theme.palette.primary.dark}`,
                            padding: '4px',
                            '.MuiChip-label': {
                                color: theme.palette.primary.dark,
                            },
                        } }, ownerState.focus === 1 && {
                        border: `2px solid ${theme.palette.action.focus}`,
                        padding: '3px',
                    })), { '&.Mui-disabled': {
                            opacity: 'unset',
                            backgroundColor: theme.palette.action.disabledBackground,
                        }, '&:active': {
                            backgroundColor: theme.palette.action.selectedOpacityModified,
                            outline: `1px solid ${theme.palette.action.selected}`,
                            '&:focus': {
                                outline: 'none', // focus should take care of the 2px so it doesn't total up to 3
                            },
                            '.MuiChip-label': {
                                color: theme.palette.action.selected,
                            },
                        }, '.MuiChip-label': Object.assign(Object.assign(Object.assign({ padding: '0 8px', color: theme.palette.text.primary }, theme.typography.body2), ownerState.disabled && {
                            color: theme.palette.text.disabled,
                        }), ownerState.selected === true && {
                            color: theme.palette.action.selected,
                        }), '.MuiAvatar-root': Object.assign(Object.assign({ '&.MuiChip-avatar': {
                                border: 'none',
                                margin: 0,
                                color: theme.palette.action.active,
                                '&.MuiChip-avatarMedium': Object.assign(Object.assign({ height: '16px', width: '16px' }, ownerState.leadingavatartype === Avatar_1.AvatarTypes.IMAGE && {
                                    img: Object.assign({ height: '16px', width: '16px' }, ownerState.disabled === true && {
                                        opacity: '0.38',
                                    }),
                                }), ownerState.leadingavatartype === Avatar_1.AvatarTypes.ICON && {
                                    '.MuiSvgIcon-root': {
                                        height: '16px',
                                        width: '16px',
                                    },
                                }),
                            }, '.MuiTypography-root': Object.assign({ 
                                // DXQ-35439 - As per new chip V2.1, in case of 2 letters in Avatar inside Chip, font size should be 6.67px and line height should be 9.33px
                                // styles the letter inside avatar if type is letter
                                fontSize: (leadingLetter && leadingLetter.length > 1) ? '6.66px' : '10px', lineHeight: (leadingLetter && leadingLetter.length > 1) ? '9.33px' : '14px' }, ownerState.disabled === true && {
                                opacity: '0.38',
                            }), '.MuiSvgIcon-root': Object.assign({ fill: theme.palette.action.active }, ownerState.disabled && {
                                fill: theme.palette.action.disabled,
                            }) }, ownerState.leadingavatartype === Avatar_1.AvatarTypes.ICON && {
                            backgroundColor: 'transparent',
                        }), ownerState.leadingavatartype === Avatar_1.AvatarTypes.LETTER && {
                            backgroundColor: theme.palette.action.activeOpacity,
                        }), '.MuiChip-deleteIcon': Object.assign({ margin: 0, height: '16px', width: '16px', color: theme.palette.action.active }, ownerState.disabled && {
                            color: theme.palette.action.disabled,
                        }) }));
                },
            },
        },
    };
};
exports.getMuiChipThemeOverrides = getMuiChipThemeOverrides;
Chip.defaultProps = {
    color: 'default',
    clickable: false,
    disabled: false,
    variant: ChipVariants.CONTAINED,
    onDeleteFunc: undefined,
    hideTrailingIcon: false,
    leadingavatartype: 'none',
    selected: false,
    focus: undefined,
};
__exportStar(require("@mui/material/Chip"), exports);
exports.default = Chip;
