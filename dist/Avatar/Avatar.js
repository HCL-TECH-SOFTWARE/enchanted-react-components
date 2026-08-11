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
exports.getMuiAvatarThemeOverrides = exports.AvatarTestIds = exports.AvatarColors = exports.AvatarTypes = void 0;
const react_1 = __importDefault(require("react"));
const Avatar_1 = __importDefault(require("@mui/material/Avatar"));
const Typography_1 = __importDefault(require("../Typography"));
const colors_1 = require("../colors");
// Props for Avatar types
var AvatarTypes;
(function (AvatarTypes) {
    AvatarTypes["IMAGE"] = "image";
    AvatarTypes["LETTER"] = "letter";
    AvatarTypes["ICON"] = "icon";
})(AvatarTypes = exports.AvatarTypes || (exports.AvatarTypes = {}));
// Props for Avatar colors while avatar type selected as icon type
var AvatarColors;
(function (AvatarColors) {
    AvatarColors["DEFAULT"] = "default";
    AvatarColors["RED"] = "red";
    AvatarColors["ORANGE"] = "orange";
    AvatarColors["YELLOW"] = "yellow";
    AvatarColors["LIME"] = "lime";
    AvatarColors["GREEN"] = "green";
    AvatarColors["TEAL"] = "teal";
    AvatarColors["BLUE"] = "blue";
    AvatarColors["INDIGO"] = "indigo";
    AvatarColors["PURPLE"] = "purple";
    AvatarColors["PINK"] = "pink";
})(AvatarColors = exports.AvatarColors || (exports.AvatarColors = {}));
var AvatarTestIds;
(function (AvatarTestIds) {
    AvatarTestIds["AVATAR_ICON"] = "avatarIcon";
    AvatarTestIds["AVATAR_LETTER"] = "avatarLetter";
    AvatarTestIds["AVATAR_IMAGE"] = "avatarImage";
})(AvatarTestIds = exports.AvatarTestIds || (exports.AvatarTestIds = {}));
const Avatar = (_a) => {
    var props = __rest(_a, []);
    const { type, iconImage, imageSource, letter, imageAltProps, imageProps } = props, rest = __rest(props, ["type", "iconImage", "imageSource", "letter", "imageAltProps", "imageProps"]) // Do not put trailing comma here
    ;
    const getIconAvatar = () => {
        return (react_1.default.createElement(react_1.default.Fragment, null, iconImage));
    };
    const getImageAvatar = () => {
        return (react_1.default.createElement(react_1.default.Fragment, null, imageSource ? react_1.default.createElement("img", Object.assign({ src: imageSource, alt: imageAltProps, "data-testid": AvatarTestIds.AVATAR_IMAGE }, imageProps)) : null));
    };
    // To format typography inputs for showing inside Avatar
    const getFormattedLetter = () => {
        let letterText = '';
        if (letter != null && letter.length >= 1) {
            letterText = letter.substring(0, 2);
        }
        return letterText.toUpperCase();
    };
    const getLetterAvatar = () => {
        return (react_1.default.createElement(react_1.default.Fragment, null, letter
            ? (react_1.default.createElement(Typography_1.default, { variant: "caption", "data-testid": AvatarTestIds.AVATAR_LETTER }, getFormattedLetter()))
            : null));
    };
    /**
     * Gets child icon for Avatar based on the type of Avatar
     * @param avatarType Optional parameter to determine the type of Avatar
     * @returns A component of icon
     */
    const getChildIcon = () => {
        switch (type) {
            case AvatarTypes.IMAGE: return getImageAvatar();
            case AvatarTypes.LETTER: return getLetterAvatar();
            case AvatarTypes.ICON: return getIconAvatar();
            default: return (react_1.default.createElement(Avatar_1.default, null));
        }
    };
    return (react_1.default.createElement(Avatar_1.default, Object.assign({}, rest), getChildIcon()));
};
/**
 * Override out of the box styling from mui to align with designer theme
 * @returns override Checkbox component styles and prop
 */
const getMuiAvatarThemeOverrides = () => {
    return {
        MuiAvatar: {
            styleOverrides: {
                root: ({ ownerState, theme }) => {
                    return (Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ '&.MuiAvatar-root': Object.assign({ height: '24px', width: '24px', boxSizing: 'border-box', border: `1px solid ${theme.palette.border.secondary}`, display: 'flex', justifyContent: 'center', alignItems: 'center' }, ownerState.variant === 'rounded' && {
                            padding: '3px',
                            borderRadius: '2px',
                        }), '& .MuiSvgIcon-root': Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ height: '16px', width: '16px' }, (ownerState.color === 'default' && {
                            color: colors_1.neutralGrey.NG800,
                            fill: colors_1.neutralGrey.NG800,
                        })), (ownerState.color === 'red' && {
                            color: colors_1.red.RED800,
                            fill: colors_1.red.RED800,
                        })), (ownerState.color === 'orange' && {
                            color: colors_1.orange.ORANGE800,
                            fill: colors_1.orange.ORANGE800,
                        })), (ownerState.color === 'yellow' && {
                            color: colors_1.yellow.YELLOW800,
                            fill: colors_1.yellow.YELLOW800,
                        })), (ownerState.color === 'lime' && {
                            color: colors_1.lime.LIME800,
                            fill: colors_1.lime.LIME800,
                        })), (ownerState.color === 'green' && {
                            color: colors_1.green.GREEN800,
                            fill: colors_1.green.GREEN800,
                        })), (ownerState.color === 'teal' && {
                            color: colors_1.teal.TEAL800,
                            fill: colors_1.teal.TEAL800,
                        })), (ownerState.color === 'blue' && {
                            color: colors_1.blue.BLUE800,
                            fill: colors_1.blue.BLUE800,
                        })), (ownerState.color === 'indigo' && {
                            color: colors_1.indigo.INDIGO800,
                            fill: colors_1.indigo.INDIGO800,
                        })), (ownerState.color === 'purple' && {
                            color: colors_1.purple.PURPLE800,
                            fill: colors_1.purple.PURPLE800,
                        })), (ownerState.color === 'pink' && {
                            color: colors_1.pink.PINK800,
                            fill: colors_1.pink.PINK800,
                        })) }, (ownerState.color === 'default' && {
                        backgroundColor: colors_1.neutralGrey.NG100,
                        '.MuiTypography-root': {
                            color: colors_1.neutralGrey.NG800,
                        },
                    })), (ownerState.color === 'red' && {
                        backgroundColor: colors_1.red.RED100,
                        '.MuiTypography-root': {
                            color: colors_1.red.RED800,
                        },
                    })), (ownerState.color === 'orange' && {
                        backgroundColor: colors_1.orange.ORANGE100,
                        '.MuiTypography-root': {
                            color: colors_1.orange.ORANGE800,
                        },
                    })), (ownerState.color === 'yellow' && {
                        backgroundColor: colors_1.yellow.YELLOW100,
                        '.MuiTypography-root': {
                            color: colors_1.yellow.YELLOW800,
                        },
                    })), (ownerState.color === 'lime' && {
                        backgroundColor: colors_1.lime.LIME100,
                        '.MuiTypography-root': {
                            color: colors_1.lime.LIME800,
                        },
                    })), (ownerState.color === 'green' && {
                        backgroundColor: colors_1.green.GREEN100,
                        '.MuiTypography-root': {
                            color: colors_1.green.GREEN800,
                        },
                    })), (ownerState.color === 'teal' && {
                        backgroundColor: colors_1.teal.TEAL100,
                        '.MuiTypography-root': {
                            color: colors_1.teal.TEAL800,
                        },
                    })), (ownerState.color === 'blue' && {
                        backgroundColor: colors_1.blue.BLUE100,
                        '.MuiTypography-root': {
                            color: colors_1.blue.BLUE800,
                        },
                    })), (ownerState.color === 'indigo' && {
                        backgroundColor: colors_1.indigo.INDIGO100,
                        '.MuiTypography-root': {
                            color: colors_1.indigo.INDIGO800,
                        },
                    })), (ownerState.color === 'purple' && {
                        backgroundColor: colors_1.purple.PURPLE100,
                        '.MuiTypography-root': {
                            color: colors_1.purple.PURPLE800,
                        },
                    })), (ownerState.color === 'pink' && {
                        backgroundColor: colors_1.pink.PINK100,
                        '.MuiTypography-root': {
                            color: colors_1.pink.PINK800,
                        },
                    })), { img: {
                            height: '24px',
                            width: '24px',
                        } }));
                },
            },
        },
    };
};
exports.getMuiAvatarThemeOverrides = getMuiAvatarThemeOverrides;
const defaultProps = {
    variant: 'circular',
    type: AvatarTypes.ICON,
    color: AvatarColors.DEFAULT,
};
Avatar.defaultProps = defaultProps;
__exportStar(require("@mui/material/Avatar"), exports);
exports.default = Avatar;
