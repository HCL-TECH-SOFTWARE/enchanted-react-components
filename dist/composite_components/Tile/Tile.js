"use strict";
/* ======================================================================== *
 * Copyright 2024, 2026 HCL America Inc.                                    *
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
exports.TileTestIds = exports.StyledBox = void 0;
const material_1 = require("@mui/material");
const react_1 = __importStar(require("react"));
const view_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/view"));
const styles_1 = require("@mui/material/styles");
const TileActionBar_1 = __importDefault(require("./TileActionBar"));
const Checkbox_1 = __importDefault(require("../../Checkbox"));
const Tooltip_1 = __importDefault(require("../../Tooltip"));
const IconButton_1 = __importDefault(require("../../IconButton"));
const Typography_1 = __importDefault(require("../../Typography"));
const ImageListContext = react_1.default.createContext({});
const StyledSyncIcon = (0, styles_1.styled)('div')(({ theme }) => {
    return {
        position: 'absolute',
        top: '6px',
        right: '6px',
        zIndex: '1',
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        color: theme.palette.text.tertiary2,
        background: theme.palette.background.overlay,
        padding: '4px',
        borderRadius: '2px',
        '.MuiSvgIcon-root': {
            fontSize: '16px',
            marginRight: '4px',
        },
    };
});
const StyledLockNotice = (0, styles_1.styled)('div')(() => {
    return {
        position: 'absolute',
        top: '12px',
        right: '12px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '4px',
        gap: '4px',
        background: 'rgba(30, 30, 30, 0.8)',
        borderRadius: '2px',
        flex: 'none',
        order: 1,
        flexGrow: 0,
        zIndex: 1,
    };
});
const StyledImageListItem = (0, styles_1.styled)(material_1.ImageListItem)(({ theme }) => {
    const { disabled, isChecked } = react_1.default.useContext(ImageListContext);
    return {
        position: 'relative',
        backgroundColor: isChecked ? theme.palette.action.selectedOpacityModified : theme.palette.background.default,
        border: `1px solid ${theme.palette.border.secondary}`,
        borderRadius: `${theme.spacing(0.5)}`,
        cursor: disabled ? 'not-allowed' : 'pointer',
        overflow: 'hidden',
        '&:focus': {
            border: `2px solid ${theme.palette.action.focus}`,
            '.MuiImageListItemBar-root': {
                paddingBottom: '5px',
            },
        },
        '&:hover': {
            '.overlay': {
                opacity: 1,
            },
            '.image-list-item-bar': {
                backgroundColor: !disabled && theme.palette.action.hover,
            },
        },
        '.visible': {
            opacity: 1,
        },
    };
});
exports.StyledBox = (0, styles_1.styled)(material_1.Box)(({ theme }) => {
    return {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '194px',
        backgroundColor: theme.palette.background.tile,
    };
});
const StyledTitle = (0, styles_1.styled)(material_1.Box)(({ theme, disabled }) => {
    return {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        lineHeight: '16px',
        fontSize: '12px',
        maxWidth: '100%',
        color: disabled ? theme.palette.text.disabled : theme.palette.text.primary,
    };
});
const StyledSubTitle = (0, styles_1.styled)(material_1.Box)(({ theme, disabled }) => {
    return {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        lineHeight: '14px',
        fontSize: '10px',
        maxWidth: '100%',
        color: disabled ? theme.palette.text.disabled : theme.palette.text.secondary,
    };
});
const CustomCheckbox = (0, styles_1.styled)(Checkbox_1.default)(() => {
    return {
        '&.MuiCheckbox-root': {
            padding: '0px',
            margin: '0px 8px 0px 0px',
        },
    };
});
const StyledImageListItembar = (0, styles_1.styled)(material_1.ImageListItemBar)(({ theme }) => {
    const { hasThumbnail } = react_1.default.useContext(ImageListContext);
    return {
        padding: '7px',
        height: 'auto',
        borderTop: hasThumbnail ? `1px solid ${theme.palette.border.secondary}` : 'none',
        '& .MuiImageListItemBar-titleWrap': {
            padding: '0px',
            marginTop: '3px',
        },
        '& .MuiImageListItemBar-actionIcon': {
            padding: '0px 0px 0px 8px',
        },
    };
});
const PreviewTitle = (0, styles_1.styled)(Typography_1.default)((props) => {
    const { theme } = props;
    return {
        color: theme.palette.text.tertiary1,
    };
});
const Overlay = (0, styles_1.styled)('div')(({ theme }) => {
    return {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: `${theme.palette.background.overlay}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0,
        transition: 'opacity 0.3s ease',
    };
});
const ImageContainer = (0, styles_1.styled)('div')(() => {
    return {
        position: 'relative',
        height: '194px',
    };
});
var TileTestIds;
(function (TileTestIds) {
    TileTestIds["TILE_PREVIEW"] = "preview-icon-view";
})(TileTestIds = exports.TileTestIds || (exports.TileTestIds = {}));
const Tile = (props) => {
    const [isChecked, setIsChecked] = (0, react_1.useState)(false);
    const [isImageLoaded, setIsImageLoaded] = (0, react_1.useState)(false);
    const titleRef = (0, react_1.useRef)(null);
    const subTitleRef = (0, react_1.useRef)(null);
    const [isTitleOverflowing, setIsTitleOverflowing] = (0, react_1.useState)(false);
    const [isSubTitleOverflowing, setIsSubTitleOverflowing] = (0, react_1.useState)(false);
    const [isOverlayVisible, setIsOverlayVisible] = (0, react_1.useState)(false);
    const { itemId, imageUrl, avatar, itemClickedAction, handlePreviewAction, tileActions, activeItem, imageAltName, ariaLabel, ariaLabelledBy, overflowTooltip, tileRef, hideAvatarIfImageIsLoaded, subTitle, menuSize, hasCheckBox, hasThumbnail, disabled, hoverPreviewMenu, isTrash, trashInfoTooltip, lockNoticeText, } = props;
    // Show lock notice for media tiles (hasThumbnail=true) in trash view when lockNoticeText has content
    const showLockNotice = isTrash && hasThumbnail && !!lockNoticeText;
    (0, react_1.useEffect)(() => {
        const titleElement = titleRef.current;
        const subTitleElement = subTitleRef.current;
        if (titleElement && titleElement.scrollWidth > titleElement.clientWidth) {
            setIsTitleOverflowing(true);
        }
        if (subTitleElement && subTitleElement.scrollWidth > subTitleElement.clientWidth) {
            setIsSubTitleOverflowing(true);
        }
    }, [props.title, subTitle]);
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
        if (props.handleCheckboxChange) {
            props.handleCheckboxChange(event, props.itemId, event.target.checked);
        }
    };
    const handleTileClick = (event, tileItemId) => {
        if (itemClickedAction) {
            itemClickedAction(event, tileItemId);
        }
    };
    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };
    (0, react_1.useEffect)(() => {
        const img = new Image();
        if (imageUrl) {
            img.src = imageUrl;
        }
        img.onload = handleImageLoad;
    }, [imageUrl]);
    const contextValue = (0, react_1.useMemo)(() => {
        return { disabled, isChecked, hasThumbnail };
    }, [isChecked, disabled, hasThumbnail]);
    return (react_1.default.createElement(ImageListContext.Provider, { value: contextValue },
        react_1.default.createElement(StyledImageListItem, { key: itemId, onClick: (event) => { return handleTileClick(event, itemId); }, onKeyDown: (event) => {
                if (event.key === 'Enter') {
                    handleTileClick(event, itemId);
                }
            }, tabIndex: 0, role: "listitem", "aria-current": activeItem === itemId, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, ref: tileRef },
            props.syncIcon && (react_1.default.createElement(StyledSyncIcon, null, props.syncIcon)),
            showLockNotice && (react_1.default.createElement(StyledLockNotice, null,
                react_1.default.createElement(Typography_1.default, { variant: "body2", sx: { color: 'rgba(255, 255, 255, 0.7)' } }, lockNoticeText))),
            (imageUrl && !avatar && hasThumbnail) && (react_1.default.createElement(ImageContainer, null,
                react_1.default.createElement("img", { style: {
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }, src: imageUrl, alt: imageAltName || '' }),
                !disabled && (react_1.default.createElement(Overlay, { className: `overlay ${isOverlayVisible ? 'visible' : ''}` },
                    react_1.default.createElement(IconButton_1.default, { "data-testid": TileTestIds.TILE_PREVIEW, inversecolors: true, onClick: (event) => { return handlePreviewAction === null || handlePreviewAction === void 0 ? void 0 : handlePreviewAction(event, itemId); }, onFocus: () => { return setIsOverlayVisible(true); }, onBlur: () => { return setIsOverlayVisible(false); }, "aria-label": "Preview" },
                        react_1.default.createElement(view_1.default, null)),
                    react_1.default.createElement(PreviewTitle, { variant: "body2" }, hoverPreviewMenu || 'Preview'))))),
            (imageUrl && avatar) && (isImageLoaded && hideAvatarIfImageIsLoaded) && (hasThumbnail) && (react_1.default.createElement(ImageContainer, null,
                react_1.default.createElement("img", { style: {
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }, src: imageUrl, alt: imageAltName || '' }),
                !disabled && (react_1.default.createElement(Overlay, { className: `overlay ${isOverlayVisible ? 'visible' : ''}` },
                    react_1.default.createElement(IconButton_1.default, { "data-testid": TileTestIds.TILE_PREVIEW, inversecolors: true, onClick: (event) => { return handlePreviewAction === null || handlePreviewAction === void 0 ? void 0 : handlePreviewAction(event, itemId); }, onFocus: () => { return setIsOverlayVisible(true); }, onBlur: () => { return setIsOverlayVisible(false); }, "aria-label": "Preview" },
                        react_1.default.createElement(view_1.default, null)),
                    react_1.default.createElement(PreviewTitle, { variant: "body2" }, hoverPreviewMenu || 'Preview'))))),
            (imageUrl && avatar) && (!hideAvatarIfImageIsLoaded || (!isImageLoaded)) && (hasThumbnail) && (react_1.default.createElement(ImageContainer, null,
                react_1.default.createElement(exports.StyledBox, null, avatar),
                !disabled && (react_1.default.createElement(Overlay, { className: `overlay ${isOverlayVisible ? 'visible' : ''}` },
                    react_1.default.createElement(IconButton_1.default, { "data-testid": TileTestIds.TILE_PREVIEW, inversecolors: true, onClick: (event) => { return handlePreviewAction === null || handlePreviewAction === void 0 ? void 0 : handlePreviewAction(event, itemId); }, onFocus: () => { return setIsOverlayVisible(true); }, onBlur: () => { return setIsOverlayVisible(false); }, "aria-label": "Preview" },
                        react_1.default.createElement(view_1.default, null)),
                    react_1.default.createElement(PreviewTitle, { variant: "body2" }, hoverPreviewMenu || 'Preview'))))),
            (!imageUrl && avatar) && (hasThumbnail) && (react_1.default.createElement(ImageContainer, null,
                react_1.default.createElement(exports.StyledBox, null, avatar),
                !disabled && (react_1.default.createElement(Overlay, { className: `overlay ${isOverlayVisible ? 'visible' : ''}` },
                    react_1.default.createElement(IconButton_1.default, { "data-testid": TileTestIds.TILE_PREVIEW, inversecolors: true, onClick: (event) => { return handlePreviewAction === null || handlePreviewAction === void 0 ? void 0 : handlePreviewAction(event, itemId); }, onFocus: () => { return setIsOverlayVisible(true); }, onBlur: () => { return setIsOverlayVisible(false); }, "aria-label": "Preview" },
                        react_1.default.createElement(view_1.default, null)),
                    react_1.default.createElement(PreviewTitle, { variant: "body2" }, hoverPreviewMenu || 'Preview'))))),
            react_1.default.createElement(StyledImageListItembar, { className: "image-list-item-bar", title: (react_1.default.createElement(material_1.Box, { sx: { display: 'flex', alignItems: 'flex-start' } },
                    hasCheckBox && (react_1.default.createElement(CustomCheckbox, { checked: isChecked, disabled: disabled, onChange: handleCheckboxChange })),
                    react_1.default.createElement(material_1.Box, { sx: {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            overflow: 'hidden',
                        } },
                        isTitleOverflowing ? (react_1.default.createElement(Tooltip_1.default, { title: props.title, disableInteractive: true },
                            react_1.default.createElement(StyledTitle, { ref: titleRef, disabled: disabled }, props.title))) : (react_1.default.createElement(StyledTitle, { ref: titleRef, disabled: disabled }, props.title)),
                        isSubTitleOverflowing ? (react_1.default.createElement(Tooltip_1.default, { title: subTitle },
                            react_1.default.createElement(StyledSubTitle, { ref: subTitleRef, disabled: disabled }, subTitle))) : (react_1.default.createElement(StyledSubTitle, { ref: subTitleRef, disabled: disabled }, subTitle))))), position: "below", actionIcon: (react_1.default.createElement(material_1.Box, { sx: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                    } },
                    react_1.default.createElement(TileActionBar_1.default, { itemId: itemId, actionList: tileActions, overflowTooltip: overflowTooltip, menuSize: menuSize, disabled: disabled, hasThumbnail: hasThumbnail, isTrash: isTrash, trashInfoTooltip: trashInfoTooltip }))) }))));
};
exports.default = Tile;
