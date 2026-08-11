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
const react_1 = __importStar(require("react"));
const material_1 = require("@mui/material");
const warning_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/warning"));
const checkmark__outline_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/checkmark--outline"));
const image_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/image"));
const folder_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/folder"));
const folders_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/folders"));
const error_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/error"));
const retry__failed_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/retry--failed"));
const video_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/video"));
const DOC_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/DOC"));
const XLS_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/XLS"));
const PDF_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/PDF"));
const PPT_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/PPT"));
const TIF_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/TIF"));
const GIF_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/GIF"));
const SVG_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/SVG"));
const JPG_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/JPG"));
const PNG_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/PNG"));
const ProgressBar_1 = require("./ProgressBar");
const CircularProgress_1 = __importDefault(require("../../ProgressIndicator/CircularProgress"));
const IconButton_1 = __importDefault(require("../../IconButton"));
const Avatar_1 = __importStar(require("../../Avatar"));
const Tooltip_1 = __importDefault(require("../../Tooltip"));
const Button_1 = __importDefault(require("../../Button"));
const Typography_1 = __importDefault(require("../../Typography"));
const List_1 = __importDefault(require("../../List"));
const ListItem_1 = __importDefault(require("../../List/ListItem"));
const ListItemText_1 = __importDefault(require("../../List/ListItemText"));
const ListItemIcon_1 = __importDefault(require("../../List/ListItemIcon"));
const ListItemButton_1 = __importStar(require("../../List/ListItemButton"));
const ListItemAvatar_1 = __importDefault(require("../../List/ListItemAvatar"));
var ItemTypes;
(function (ItemTypes) {
    ItemTypes["IMAGE"] = "image";
    ItemTypes["VIDEO"] = "video";
    ItemTypes["APPLICATION"] = "application";
})(ItemTypes || (ItemTypes = {}));
var ItemApplicationFormat;
(function (ItemApplicationFormat) {
    ItemApplicationFormat["DOC"] = "doc";
    ItemApplicationFormat["DOCX"] = "docx";
    ItemApplicationFormat["XLS"] = "xls";
    ItemApplicationFormat["XLSX"] = "xlsx";
    ItemApplicationFormat["PDF"] = "pdf";
    ItemApplicationFormat["PPT"] = "ppt";
    ItemApplicationFormat["PPTX"] = "pptx";
})(ItemApplicationFormat || (ItemApplicationFormat = {}));
var ItemImageFormat;
(function (ItemImageFormat) {
    ItemImageFormat["WEBP"] = "webp";
    ItemImageFormat["SVG"] = "svg";
    ItemImageFormat["PNG"] = "png";
    ItemImageFormat["GIF"] = "gif";
    ItemImageFormat["TIF"] = "tif";
    ItemImageFormat["TIFF"] = "tiff";
    ItemImageFormat["JPG"] = "jpg";
    ItemImageFormat["JPEG"] = "jpeg";
})(ItemImageFormat || (ItemImageFormat = {}));
var ItemVideoFormat;
(function (ItemVideoFormat) {
    ItemVideoFormat["WEBM"] = "webm";
    ItemVideoFormat["MP4"] = "mp4";
    ItemVideoFormat["OGV"] = "ogv";
})(ItemVideoFormat || (ItemVideoFormat = {}));
/**
 * StyledList component is a customized version of the List component from Material-UI.
 * It applies custom styling to the List and its child components.
 */
const StyledList = (0, material_1.styled)(List_1.default)((props) => {
    const { theme } = props;
    return ({
        background: theme.palette.background.paper,
        boxShadow: theme.shadows[6],
        maxHeight: '305px',
        width: '360px',
        overflowY: 'scroll',
        '.MuiListItem-root': {
            '.MuiListItemButton-root': {
                '.MuiListItemText-root': {
                    '& .MuiListItemText-primary': {
                        maxWidth: '252px',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                    },
                    '& .MuiListItemText-secondary': {
                        maxWidth: '252px',
                        '& span:not(.file-size)': {
                            display: 'inline',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                        },
                    },
                    '[data-testid=pending-item-text-primary]': {
                        color: theme.palette.text.disabled,
                    },
                    '& p': Object.assign(Object.assign({}, theme.typography.caption), { '[data-testid=upload-status-label]': {
                            color: theme.palette.success.main,
                        }, '[data-testid=failed-status-label]': {
                            color: theme.palette.error.main,
                        }, '[data-testid=pending-item-text-secondary]': {
                            color: theme.palette.text.disabled,
                        }, '[data-testid=learn-more-button]': {
                            background: 'none',
                            color: theme.palette.primary.main,
                            '&:hover': {
                                background: 'none',
                            },
                        } }),
                },
                '& .MuiListItemSecondaryAction-root': {
                    '.IconButtonMainContainer': {
                        margin: '0',
                    },
                },
                '&:hover .MuiListItemText-primary, &:hover .MuiListItemText-secondary': {
                    width: 'unset',
                },
                '.MuiListItemIcon-root': {
                    '.MuiSvgIcon-root': {
                        '&[data-mui-test=warningIcon]': {
                            color: theme.palette.error.main,
                        },
                        '&[data-mui-test=checkmark--outlineIcon]': {
                            color: theme.palette.success.main,
                        },
                        '[data-testid=progressRoot]': {
                            '[data-testid=progressCircle]': {
                                color: theme.palette.primary.main,
                            },
                        },
                    },
                },
            },
            '.MuiListItemButton-root.disabled-hover': {
                pointerEvents: 'none !important',
                backgroundColor: 'transparent !important',
                '&:hover': {
                    backgroundColor: 'transparent !important',
                },
            },
        },
    });
});
/**
 * @component Renders the progress items component.
 * @param {ProgressItemProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
const ProgressItems = (props) => {
    const { file, retryUploadItem, cancelItem, navigateFolder, literals, learnMoreOnFailure, translation, direction = 'ltr', } = props;
    const isRTL = direction === 'rtl';
    const [hover, setHover] = (0, react_1.useState)(null);
    const [focus, setFocus] = (0, react_1.useState)(null);
    let folderId = '';
    /**
     * Renders the progress indicator based on the upload status and progress.
     * @returns The progress indicator component based on the upload status and progress.
     */
    const renderProgressIndicator = (status, progress) => {
        if (status === ProgressBar_1.EnumUploadStatus.SUCCESS) {
            return react_1.default.createElement(checkmark__outline_1.default, null);
        }
        if (status === ProgressBar_1.EnumUploadStatus.PROGRESS || status === ProgressBar_1.EnumUploadStatus.PENDING) {
            return (react_1.default.createElement(CircularProgress_1.default, { variant: "determinate", value: progress, size: 16 }));
        }
        if (status === ProgressBar_1.EnumUploadStatus.FAILURE) {
            return react_1.default.createElement(warning_1.default, null);
        }
        return '';
    };
    /**
     * Renders the hover icon based on the status of the queue item.
     * @param {IProgressState} queueItem - The queue item to render the hover icon for.
     * @returns {React.ReactNode} - The rendered hover icon.
     */
    const renderHoverIcon = (queueItem) => {
        if (queueItem.status === ProgressBar_1.EnumUploadStatus.SUCCESS && navigateFolder) {
            return (react_1.default.createElement(Tooltip_1.default, { title: translation === null || translation === void 0 ? void 0 : translation.navigateButtonTooltip, tooltipsize: "small", placement: "left", PopperProps: {
                    disablePortal: true,
                }, componentsProps: {
                    tooltip: {
                        sx: {
                            whiteSpace: 'nowrap',
                        },
                    },
                } },
                react_1.default.createElement(IconButton_1.default, { "data-testid": "navigate-folder", onClick: () => { return navigateFolder(queueItem); }, onKeyDown: (event) => {
                        if (event.key === 'Enter') {
                            navigateFolder(queueItem);
                        }
                    } },
                    react_1.default.createElement(folders_1.default, null))));
        }
        if ((queueItem.status === ProgressBar_1.EnumUploadStatus.PROGRESS || queueItem.status === ProgressBar_1.EnumUploadStatus.PENDING) && cancelItem) {
            return (react_1.default.createElement(Tooltip_1.default, { title: translation === null || translation === void 0 ? void 0 : translation.errorButtonTooltip, tooltipsize: "small", placement: "left", PopperProps: {
                    disablePortal: true,
                }, componentsProps: {
                    tooltip: {
                        sx: {
                            whiteSpace: 'nowrap',
                        },
                    },
                } },
                react_1.default.createElement(IconButton_1.default, { "data-testid": "cancel-upload", onClick: () => { return cancelItem(queueItem); }, onKeyDown: (event) => {
                        if (event.key === 'Enter') {
                            cancelItem(queueItem);
                        }
                    } },
                    react_1.default.createElement(error_1.default, null))));
        }
        if (queueItem.status === ProgressBar_1.EnumUploadStatus.FAILURE && retryUploadItem) {
            return (react_1.default.createElement(Tooltip_1.default, { title: translation === null || translation === void 0 ? void 0 : translation.retryButtonTooltip, tooltipsize: "small", placement: "left", PopperProps: {
                    disablePortal: true,
                }, componentsProps: {
                    tooltip: {
                        sx: {
                            whiteSpace: 'nowrap',
                        },
                    },
                } },
                react_1.default.createElement(IconButton_1.default, { "data-testid": "retry-upload", onClick: () => { retryUploadItem(queueItem); }, onKeyDown: (event) => {
                        if (event.key === 'Enter') {
                            retryUploadItem(queueItem);
                        }
                    } },
                    react_1.default.createElement(retry__failed_1.default, null))));
        }
        return null;
    };
    /**
     * @param fileSize
     * @return {convertedFileSize}
     * This function takes in file size value(type: number) as argument and converts the value(in bytes) to KB/MB/GB/TB
     * returns the value in type string (using Bytes/KB/MB/GB/TB accordingly)
     */
    const fileSizeValueConverter = (fileSize) => {
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        let i = 0;
        if (fileSize <= 0)
            return '0';
        i = Math.floor(Math.log(fileSize) / Math.log(1024));
        if (i === 0)
            return `${fileSize} ${sizes[i]}`;
        const filesize = (fileSize / (Math.pow(1024, i))).toFixed(1);
        const formattedFileSize = new Intl.NumberFormat().format(parseFloat(filesize));
        const fileSizeWithUnit = `${formattedFileSize} ${sizes[i]}`;
        return fileSizeWithUnit;
    };
    /**
     * Returns the avatar icon based on the file type.
     * @param itemTitle - The title of the item.
     * @returns An object containing the icon image.
     */
    const getAvatarByFileType = (itemTitle) => {
        let itemType = '';
        let itemExtension = '';
        if (itemTitle) {
            itemExtension = itemTitle.substring(itemTitle.lastIndexOf('.') + 1).toLowerCase();
        }
        if (Object.values(ItemApplicationFormat).includes(itemExtension)) {
            itemType = ItemTypes.APPLICATION;
        }
        else if (Object.values(ItemImageFormat).includes(itemExtension)) {
            itemType = ItemTypes.IMAGE;
        }
        else if (Object.values(ItemVideoFormat).includes(itemExtension)) {
            itemType = ItemTypes.VIDEO;
        }
        if (itemType === ItemTypes.VIDEO) {
            return {
                iconImage: react_1.default.createElement(video_1.default, { "data-testid": "videoIcon" }),
            };
        }
        if (itemType === ItemTypes.IMAGE) {
            switch (itemExtension) {
                case ItemImageFormat.TIFF:
                case ItemImageFormat.TIF:
                    return {
                        iconImage: react_1.default.createElement(TIF_1.default, { "data-testid": "TIFIcon" }),
                    };
                case ItemImageFormat.GIF:
                    return {
                        iconImage: react_1.default.createElement(GIF_1.default, { "data-testid": "GIFIcon" }),
                    };
                case ItemImageFormat.SVG:
                    return {
                        iconImage: react_1.default.createElement(SVG_1.default, { "data-testid": "SVGIcon" }),
                    };
                case ItemImageFormat.JPG:
                case ItemImageFormat.JPEG:
                    return {
                        iconImage: react_1.default.createElement(JPG_1.default, { "data-testid": "JPGIcon" }),
                    };
                case ItemImageFormat.PNG:
                    return {
                        iconImage: react_1.default.createElement(PNG_1.default, { "data-testid": "PNGIcon" }),
                    };
                default:
                    return {
                        iconImage: react_1.default.createElement(image_1.default, { "data-testid": "imageIcon" }),
                    };
            }
        }
        if (itemType === ItemTypes.APPLICATION) {
            switch (itemExtension) {
                case ItemApplicationFormat.PDF:
                    return {
                        iconImage: react_1.default.createElement(PDF_1.default, { "data-testid": "PDFIcon" }),
                    };
                case ItemApplicationFormat.XLS:
                case ItemApplicationFormat.XLSX:
                    return {
                        iconImage: react_1.default.createElement(XLS_1.default, { "data-testid": "XLSIcon" }),
                    };
                case ItemApplicationFormat.PPT:
                case ItemApplicationFormat.PPTX:
                    return {
                        iconImage: react_1.default.createElement(PPT_1.default, { "data-testid": "PPTIcon" }),
                    };
                default:
                    return {
                        iconImage: react_1.default.createElement(DOC_1.default, { "data-testid": "DOCIcon" }),
                    };
            }
        }
        return {
            iconImage: undefined,
        };
    };
    return (react_1.default.createElement(StyledList, null, Array.from(file).map((queueItem) => {
        const showLearnMoreButton = queueItem && queueItem.showLearnMore !== undefined ? queueItem.showLearnMore : false;
        if (queueItem.type === ProgressBar_1.ProgressItemType.Folder) {
            folderId = queueItem.collectionId;
        }
        const { iconImage } = getAvatarByFileType(queueItem.name);
        return (react_1.default.createElement(react_1.default.Fragment, { key: `${queueItem.name}_${queueItem.timestamp}` },
            react_1.default.createElement(ListItem_1.default, { disablePadding: true, sx: { paddingLeft: (queueItem.type !== ProgressBar_1.ProgressItemType.Folder && folderId === queueItem.collectionId) ? '8px' : '0px' }, hasBorder: true },
                react_1.default.createElement(ListItemButton_1.default, { size: ListItemButton_1.ListSizes.SMALL, secondaryActionButton: renderHoverIcon(queueItem), onMouseEnter: () => { return setHover(`${queueItem.name}_${queueItem.timestamp}`); }, onMouseLeave: () => { return setHover(null); }, onFocus: () => { return setFocus(`${queueItem.name}_${queueItem.timestamp}`); }, onBlur: () => { return setFocus(null); }, disabledHover: queueItem.status === ProgressBar_1.EnumUploadStatus.CANCELLED },
                    queueItem.status === ProgressBar_1.EnumUploadStatus.SUCCESS
                        ? (react_1.default.createElement(ListItemAvatar_1.default, null,
                            react_1.default.createElement(Avatar_1.default, { iconImage: queueItem.type === ProgressBar_1.ProgressItemType.Folder ? react_1.default.createElement(folder_1.default, null) : iconImage, color: Avatar_1.AvatarColors.DEFAULT, variant: "rounded", type: Avatar_1.AvatarTypes.ICON, style: { height: '24px', width: '24px' } }))) : (react_1.default.createElement(ListItemAvatar_1.default, null,
                        react_1.default.createElement(Avatar_1.default, { iconImage: queueItem.type === 'folder' ? react_1.default.createElement(folder_1.default, null) : iconImage, color: Avatar_1.AvatarColors.DEFAULT, variant: "rounded", type: Avatar_1.AvatarTypes.ICON, style: { height: '24px', width: '24px', opacity: 0.38 } }))),
                    queueItem.status !== ProgressBar_1.EnumUploadStatus.PENDING
                        ? (react_1.default.createElement(ListItemText_1.default, { primary: (react_1.default.createElement(Tooltip_1.default, { title: queueItem.name, tooltipsize: "small", placement: "left", componentsProps: {
                                    tooltip: {
                                        sx: {
                                            maxWidth: '252px',
                                            wordBreak: 'break-all',
                                        },
                                    },
                                } },
                                react_1.default.createElement("span", null, queueItem.name))), secondary: (react_1.default.createElement(react_1.default.Fragment, null,
                                queueItem.type !== 'folder' && (react_1.default.createElement("span", { style: { [isRTL ? 'marginLeft' : 'marginRight']: '8px' }, "data-testid": "file-size", className: "file-size" }, `${fileSizeValueConverter(queueItem.size)}`)),
                                queueItem.status === ProgressBar_1.EnumUploadStatus.SUCCESS && (react_1.default.createElement("span", { "data-testid": "upload-status-label" }, !queueItem.message ? translation === null || translation === void 0 ? void 0 : translation.successLabel : queueItem.message)),
                                queueItem.status === ProgressBar_1.EnumUploadStatus.PROGRESS && (react_1.default.createElement("span", null, translation === null || translation === void 0 ? void 0 : translation.progressLabel)),
                                queueItem.status === ProgressBar_1.EnumUploadStatus.CANCELLED && (react_1.default.createElement("span", null, translation === null || translation === void 0 ? void 0 : translation.cancelledLabel)),
                                queueItem.status === ProgressBar_1.EnumUploadStatus.FAILURE && (react_1.default.createElement(Tooltip_1.default, { title: queueItem.message, tooltipsize: "small" },
                                    react_1.default.createElement("span", { "data-testid": "failed-status-label", style: {
                                            maxWidth: showLearnMoreButton ? '134px' : '252px',
                                        } }, !queueItem.message ? translation === null || translation === void 0 ? void 0 : translation.failureLabel : queueItem.message))),
                                showLearnMoreButton && (react_1.default.createElement(Tooltip_1.default, { title: literals.learnMoreLabel, tooltipsize: "small", placement: "left", componentsProps: {
                                        tooltip: {
                                            sx: {
                                                whiteSpace: 'nowrap',
                                            },
                                        },
                                    } },
                                    react_1.default.createElement(Button_1.default, { style: { marginLeft: '4px', padding: '0px 3px 3px 3px' }, onClick: learnMoreOnFailure, onKeyDown: (event) => {
                                            if (event.key === 'Enter') {
                                                learnMoreOnFailure(event);
                                            }
                                        }, "data-testid": "learn-more-button" },
                                        react_1.default.createElement(Typography_1.default, { variant: "caption" }, literals.learnMoreLabel)))))) })) : (react_1.default.createElement(ListItemText_1.default, { primary: (react_1.default.createElement(Tooltip_1.default, { title: queueItem.name, tooltipsize: "small", placement: "left", componentsProps: {
                                tooltip: {
                                    sx: {
                                        maxWidth: '252px',
                                        wordBreak: 'break-all',
                                    },
                                },
                            } },
                            react_1.default.createElement("span", { "data-testid": "pending-item-text-primary" }, queueItem.name))), secondary: (react_1.default.createElement(react_1.default.Fragment, null,
                            queueItem.type !== 'folder' && (react_1.default.createElement("span", { style: { [isRTL ? 'marginLeft' : 'marginRight']: '8px' }, className: "file-size", "data-testid": "pending-item-text-secondary" }, `${fileSizeValueConverter(queueItem.size)}`)),
                            react_1.default.createElement("span", null, translation === null || translation === void 0 ? void 0 : translation.pendingLabel))) })),
                    react_1.default.createElement(ListItemIcon_1.default, { "data-testid": "progress-indicator", style: renderHoverIcon(queueItem) !== null
                            && (hover === `${queueItem.name}_${queueItem.timestamp}` || focus === `${queueItem.name}_${queueItem.timestamp}`)
                            ? { [isRTL ? 'marginLeft' : 'marginRight']: '28px' }
                            : { [isRTL ? 'marginLeft' : 'marginRight']: '0px' } }, renderProgressIndicator(queueItem.status, queueItem.progress))))));
    })));
};
exports.default = ProgressItems;
