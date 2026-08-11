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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetType = exports.PreviewTestIds = void 0;
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
const material_1 = require("@mui/material");
const styles_1 = require("@mui/material/styles");
const download_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/download"));
const zoom__in_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/zoom--in"));
const zoom__out_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/zoom--out"));
const chevron__left_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/chevron--left"));
const chevron__right_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/chevron--right"));
const lodash_1 = require("lodash");
const Header_1 = __importDefault(require("../Header/Header"));
const Typography_1 = __importDefault(require("../Typography/Typography"));
const Select_1 = __importDefault(require("../Select/Select"));
const MenuItem_1 = __importDefault(require("../Menu/MenuItem"));
const IconButton_1 = __importStar(require("../IconButton/IconButton"));
const Button_1 = __importStar(require("../Button/Button"));
const Tooltip_1 = __importDefault(require("../Tooltip/Tooltip"));
const Backdrop_1 = __importDefault(require("../Backdrop/Backdrop"));
const ListItemText_1 = __importDefault(require("../List/ListItemText"));
const CircularProgress_1 = __importDefault(require("../ProgressIndicator/CircularProgress/CircularProgress"));
const colors_1 = require("../colors");
// Zoom button margin is 12px
const zoomButtonMargin = 12;
const PreviewContainer = (0, styles_1.styled)(material_1.Grid)((props) => {
    return {
        height: '100vh',
        ' .MuiSvgIcon-root': {
            pointerEvents: 'none',
        },
    };
});
const StyledImage = (0, styles_1.styled)('img')((props) => {
    const { theme } = props;
    return {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'scale-down',
        margin: '0 auto',
        boxShadow: theme.shadows[1],
        transition: 'transform 0.3s',
    };
});
const StyledVideo = (0, styles_1.styled)('video')((props) => {
    return {
        height: '100%',
        objectFit: 'contain',
        width: '100%',
    };
});
const StyledVideoWrapper = (0, styles_1.styled)(material_1.Grid)((props) => {
    return {
        margin: '0 auto',
        overflow: 'hidden',
    };
});
const StyledComponent = (0, styles_1.styled)('div')((props) => {
    return {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'scale-down',
        margin: '0 auto',
    };
});
const ImageContainer = (0, styles_1.styled)(material_1.Grid)((props) => {
    return {
        overflow: 'auto',
    };
});
const ZoomContainer = (0, styles_1.styled)(material_1.Grid)((props) => {
    const { theme } = props;
    return {
        marginBottom: `${zoomButtonMargin}px`,
        display: 'flex',
        position: 'fixed',
        bottom: '0',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.overlay,
        padding: '2px 12px',
        borderRadius: '4px',
        border: `1px solid ${theme.palette.border.inverseSecondary}`,
        width: 'unset',
        ' .MuiSvgIcon-root': {
            color: colors_1.white.WHITE100P,
        },
        '.MuiButton-textPrimary': {
            backgroundColor: 'unset',
            color: colors_1.white.WHITE100P,
            fontWeight: '400',
            minWidth: 'unset',
        },
        '.Mui-disabled .MuiSvgIcon-root': {
            color: theme.palette.action.disabledInverse,
        },
    };
});
const PreviousPreviewButton = (0, styles_1.styled)(material_1.Grid)((props) => {
    const { theme } = props;
    return {
        position: 'fixed',
        left: '0',
        marginLeft: '12px',
        border: `1px solid ${theme.palette.border.inverseSecondary}`,
        borderRadius: '4px',
        backgroundColor: theme.palette.background.overlay,
        zIndex: 999,
    };
});
const NextPreviewButton = (0, styles_1.styled)(material_1.Grid)((props) => {
    const { theme } = props;
    return {
        position: 'fixed',
        right: '0',
        marginRight: '12px',
        border: `1px solid ${theme.palette.border.inverseSecondary}`,
        borderRadius: '4px',
        backgroundColor: theme.palette.background.overlay,
        zIndex: 999,
    };
});
const StyledArrowButton = (0, styles_1.styled)(IconButton_1.default)((props) => {
    const { theme } = props;
    return {
        margin: '3px',
        '&:hover': {
            backgroundColor: theme.palette.action.hoverInverse,
        },
        '&:focus .MuiSvgIcon-root ': {
            border: `1px solid ${theme.palette.primary.inverse}`,
        },
        '.MuiSvgIcon-root': {
            color: `${props.disabled ? theme.palette.border.inverseSecondary : colors_1.white.WHITE100P}`,
        },
    };
});
const CircularProgressContainer = (0, styles_1.styled)(material_1.Grid)(() => {
    return {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        position: 'absolute',
    };
});
var PreviewTestIds;
(function (PreviewTestIds) {
    PreviewTestIds["PREVIEW_SELECT_BUTTON"] = "previewSelectButton";
    PreviewTestIds["PREVIEW_DOWNLOAD_BUTTON"] = "previewDownloadButton";
    PreviewTestIds["PREVIEW_RENDITION_DROPDOWN"] = "previewRenditionDropdown";
    PreviewTestIds["PREVIEW_IMAGE"] = "previewImage";
    PreviewTestIds["PREVIEW_PREV_BUTTON"] = "previewPreviousButton";
    PreviewTestIds["PREVIEW_NEXT_BUTTON"] = "previewNextButton";
    PreviewTestIds["PREVIEW_ZOOM_IN_BUTTON"] = "previewZoomInButton";
    PreviewTestIds["PREVIEW_ZOOM_OUT_BUTTON"] = "previewZoomOutButton";
    PreviewTestIds["PREVIEW_ZOOM_PERCENT_BUTTON"] = "previewZoomPercentButton";
    PreviewTestIds["PREVIEW_ZOOM_TOOLTIP_TEXT"] = "tooltipTexts.previewZoom";
    PreviewTestIds["PREVIEW_VIDEO_PLAYER"] = "previewVideoPlayer";
    PreviewTestIds["PREVIEW_CIRCULAR_PROGRESS"] = "previewCircularProgress";
})(PreviewTestIds = exports.PreviewTestIds || (exports.PreviewTestIds = {}));
var AssetType;
(function (AssetType) {
    AssetType["IMAGE"] = "image";
    AssetType["VIDEO"] = "video";
})(AssetType = exports.AssetType || (exports.AssetType = {}));
const zoomOptions = [
    10,
    25,
    50,
    75,
    100,
    175,
    250,
    325,
    400,
];
const Preview = ({ open, reactComponent, renditionLabel, assets, index, isSelectButtonDisabled, selectButtonTitle, onClickBackButton, handleSelect, handleDownload, tooltipTexts, isNextButtonDisabled, isPreviousButtonDisabled, overrideHandleNext, overrideHandlePrevious, isFetchingAssets = false, customHeaderTitle, handleError, isVersionComparison = false, }) => {
    var _a, _b;
    const fallbackAssetValue = [
        {
            title: '',
            mediaType: {
                mimeType: '',
                extensions: [
                    '',
                ],
            },
            renditions: [
                {
                    id: '',
                    type: '',
                    source: '',
                    dimension: '',
                },
            ],
        },
    ];
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const zoomDefault = 100;
    const [zoomPercentage, setZoomPercentage] = React.useState(zoomDefault);
    const [zoomInDisable, setZoomInDisable] = React.useState(false);
    const [zoomOutDisable, setZoomOutDisable] = React.useState(false);
    const [zoomButtonTooltip, setZoomButtonTooltip] = React.useState('');
    const [zoomToFitPercentage, setZoomToFitPercentage] = React.useState(zoomDefault);
    const [zoomTrigger, setZoomTrigger] = React.useState(true);
    const imageContainerRef = React.useRef(null);
    const videoRef = React.useRef(null);
    const imageRef = React.useRef(null);
    const [isAssetFinishedRendering, setIsAssetFinishedRendering] = React.useState(false);
    const [showMessage, setshowMessage] = React.useState(false);
    const handleResize = () => {
        var _a, _b, _c, _d, _e, _f;
        if (videoRef.current && imageContainerRef.current) {
            const videoWidth = (_b = (_a = videoRef.current) === null || _a === void 0 ? void 0 : _a.videoWidth) !== null && _b !== void 0 ? _b : 0;
            const videoHeight = (_d = (_c = videoRef.current) === null || _c === void 0 ? void 0 : _c.videoHeight) !== null && _d !== void 0 ? _d : 0;
            const aspectRatio = videoHeight / videoWidth;
            const containerWidth = imageContainerRef.current.offsetWidth;
            const calculatedHeight = containerWidth * aspectRatio;
            if (calculatedHeight < ((_e = imageContainerRef.current) === null || _e === void 0 ? void 0 : _e.clientHeight)) {
                videoRef.current.style.height = `${containerWidth * aspectRatio}px`;
                videoRef.current.style.width = `${containerWidth}px`;
            }
            else {
                videoRef.current.style.height = `${(_f = imageContainerRef.current) === null || _f === void 0 ? void 0 : _f.clientHeight}px`;
                videoRef.current.style.width = '100%';
            }
        }
    };
    // Calculates video element based on its container size
    React.useLayoutEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.addEventListener('resize', handleResize);
        };
    }, []);
    // Switching label from 'Zoom to fit' or 'View actual size'
    React.useEffect(() => {
        const zoomText = zoomPercentage === zoomDefault ? tooltipTexts.zoomToFit : tooltipTexts.viewActualSize;
        setZoomButtonTooltip(zoomText);
    }, [zoomPercentage]);
    React.useEffect(() => {
        if (!zoomTrigger) {
            setTimeout(() => {
                setshowMessage(false);
            }, 3000); // Set the timeout duration for 3 second so that screen reader can read the message
            setZoomTrigger(true);
        }
    }, [zoomTrigger]);
    // Function to handle zooming in on the image
    const handleZoomIn = () => {
        setshowMessage(true);
        // Finds the next highest zoom percentage
        const zoomInNumber = zoomOptions.find((element) => {
            return element > zoomPercentage;
        });
        // Disables the zoom in button if the current zoom level is at maximum threshold
        if (zoomInNumber === 400)
            setZoomInDisable(true);
        if (zoomInNumber) {
            setZoomPercentage(zoomInNumber);
        }
        setZoomOutDisable(false);
        setZoomTrigger(false);
    };
    // Function to handle zooming out on the image
    const handleZoomOut = () => {
        setshowMessage(true);
        // We need to reverse the zoom options array to get the next lowest available
        const reversed = [...zoomOptions].reverse();
        // Finds the next lowest zoom percentage
        const zoomOutNumber = reversed.find((element) => {
            return zoomPercentage > element;
        });
        // Disables the zoom out button if the current zoom level is at minimum threshold
        if (zoomOutNumber === 10)
            setZoomOutDisable(true);
        if (zoomOutNumber) {
            setZoomPercentage(zoomOutNumber);
        }
        setZoomInDisable(false);
        setZoomTrigger(false);
    };
    // Sets the zooming of the image based on 'view actual size' or 'fit to size' into AssetContainer
    const zoomPercentageFit = () => {
        setshowMessage(true);
        if (zoomButtonTooltip === tooltipTexts.viewActualSize) {
            // View actual size
            setZoomPercentage(zoomDefault);
        }
        else {
            // Zoom to Fit
            setZoomPercentage(zoomToFitPercentage);
        }
        // Sets Zoom in and Zoom out button to be clickable
        setZoomInDisable(false);
        setZoomOutDisable(false);
        setZoomTrigger(false);
    };
    // Calculates image zoom to fit percentage
    const calculateImagePercentage = () => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const imgHeight = (_b = (_a = imageRef.current) === null || _a === void 0 ? void 0 : _a.height) !== null && _b !== void 0 ? _b : 0;
        const imgContainerHeight = (_d = (_c = imageContainerRef === null || imageContainerRef === void 0 ? void 0 : imageContainerRef.current) === null || _c === void 0 ? void 0 : _c.clientHeight) !== null && _d !== void 0 ? _d : 0;
        // Computes the Zoom to Fit percentage based on AssetContainer and the actual image
        if (imgHeight === imgContainerHeight) {
            const calculatedPercentage = Math.round(((imgContainerHeight - (zoomButtonMargin * 2)) / imgContainerHeight) * 100);
            setZoomToFitPercentage(calculatedPercentage);
            return calculatedPercentage;
        }
        // Calculates smaller images based on AssetContainer and the actual image
        const calculatedImageHeight = Math.round(((imgContainerHeight - (zoomButtonMargin * 2)) / imgHeight) * 100);
        const imageContainerWidth = (_f = (_e = imageContainerRef === null || imageContainerRef === void 0 ? void 0 : imageContainerRef.current) === null || _e === void 0 ? void 0 : _e.clientWidth) !== null && _f !== void 0 ? _f : 0;
        const imageWidth = (_h = (_g = imageRef.current) === null || _g === void 0 ? void 0 : _g.width) !== null && _h !== void 0 ? _h : 0;
        const calculatedImageWidth = Math.round(((imageContainerWidth - (zoomButtonMargin * 2)) / imageWidth) * 100);
        // Compares which percentage is lowest to fit in container
        setZoomToFitPercentage(Math.min(calculatedImageHeight, calculatedImageWidth));
        return zoomDefault;
    };
    // Event handler whenever image is loaded
    const handleImageLoad = (event) => {
        // check if asset is fully rendered
        setIsAssetFinishedRendering(true);
        setZoomPercentage(calculateImagePercentage());
    };
    React.useEffect(() => {
        // Function to handle key press events for zoom in and zoom out
        const handleKeyPress = (event) => {
            if ((event.metaKey && event.code === 'Equal') || (event.metaKey && event.key === '-')) {
                event.preventDefault();
                if (event.code === 'Equal') {
                    handleZoomIn();
                }
                else {
                    handleZoomOut();
                }
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [zoomPercentage]);
    // Get the image to be previewed based on index (setting fallback values to avoid crash)
    const currentAsset = React.useMemo(() => {
        if (assets.length > 0) {
            const tempCurrentAsset = assets[currentIndex];
            return {
                title: (0, lodash_1.get)(tempCurrentAsset, 'title', fallbackAssetValue[0].title),
                renditions: (0, lodash_1.get)(tempCurrentAsset, 'renditions', fallbackAssetValue[0].renditions),
                mediaType: (0, lodash_1.get)(tempCurrentAsset, 'mediaType', fallbackAssetValue[0].mediaType),
            };
        }
        // Return a default value if the component was passed with an empty array of assets
        return fallbackAssetValue[0];
    }, [assets, currentIndex]);
    // Checks if the current asset is a video
    const isVideo = (_a = currentAsset.mediaType) === null || _a === void 0 ? void 0 : _a.mimeType.includes('video');
    // is asset metadata ready
    // and is asset fully rendered (if so hide spinner and show fully rendered asset)
    const isCurrentAssetReady = React.useMemo(() => {
        // not waiting for videos to finish rendering
        if (isVideo) {
            return isFetchingAssets === false;
        }
        return isFetchingAssets === false && isAssetFinishedRendering === true;
    }, [isFetchingAssets, isAssetFinishedRendering, isVideo]);
    // Get the rendition selected, default is first rendition on the list which should be Source/Original
    const [currentRendition, setCurrentRendition] = React.useState(currentAsset.renditions[0]);
    // Function to navigate previous asset
    const handlePreviousAsset = () => {
        if (overrideHandlePrevious) {
            overrideHandlePrevious();
            return;
        }
        setCurrentIndex((prevIndex) => {
            return prevIndex === 0 ? (assets.length - 1) : prevIndex - 1;
        });
    };
    // Function to navigate next asset
    const handleNextAsset = () => {
        if (overrideHandleNext) {
            overrideHandleNext();
            return;
        }
        setCurrentIndex((prevIndex) => {
            return prevIndex === (assets.length - 1) ? 0 : prevIndex + 1;
        });
    };
    React.useEffect(() => {
        // reset boolean to indicate that asset hast not finished rendering
        if (assets.length > currentIndex) {
            setIsAssetFinishedRendering(false);
        }
        // Refreshes renditions whenever asset is navigated
        setCurrentRendition(currentAsset.renditions[0]);
        // re-enable zoom-in/zoom-out on change asset
        setZoomOutDisable(false);
        setZoomInDisable(false);
    }, [currentIndex]);
    // Determines if previous and next buttons should be disabled
    const isPreviousDisabled = isPreviousButtonDisabled !== undefined ? isPreviousButtonDisabled : currentIndex === 0;
    const isNextDisabled = isNextButtonDisabled !== undefined ? isNextButtonDisabled : (currentIndex === assets.length - 1);
    // Event handler for Rendition dropdown
    const handleOnChangeSelect = (event) => {
        // reset boolean to indicate that asset hast not finished rendering
        setIsAssetFinishedRendering(false);
        if (event.target) {
            const selectedRendition = currentAsset.renditions.find((rendition) => {
                return rendition.type === event.target.value;
            });
            if (selectedRendition)
                setCurrentRendition(selectedRendition);
            setZoomInDisable(false);
            setZoomOutDisable(false);
        }
    };
    // Sets the fallback value's renditions as current rendition if component was passed an empty array of assets
    React.useEffect(() => {
        if (assets.length === 0) {
            return setCurrentRendition(fallbackAssetValue[0].renditions[0]);
        }
        return setCurrentRendition(currentAsset.renditions[0]);
    }, [assets]);
    React.useEffect(() => {
        // Checks if index is inside array range
        if (index >= 0 && index < assets.length) {
            // Sets the currentIndex state to rerender component every index change
            setCurrentIndex(index);
        }
    }, [index]);
    const renderOptions = () => {
        var _a;
        switch (reactComponent !== undefined) {
            case true:
                return (React.createElement(StyledComponent, null, reactComponent));
            default:
                if (isVideo) {
                    return (React.createElement(StyledVideoWrapper, null,
                        React.createElement(StyledVideo, { key: currentRendition.source, ref: videoRef, controls: true, sx: {
                                opacity: isCurrentAssetReady ? 1 : 0,
                            }, onLoadedData: () => {
                                handleResize();
                            }, onError: (e) => {
                                if (handleError)
                                    handleError(e);
                            } },
                            React.createElement("source", { "data-testid": PreviewTestIds.PREVIEW_VIDEO_PLAYER, src: currentRendition.source, type: (_a = currentAsset.mediaType) === null || _a === void 0 ? void 0 : _a.mimeType }))));
                }
                return (React.createElement(StyledImage, { key: currentRendition.source, ref: imageRef, "data-testid": PreviewTestIds.PREVIEW_IMAGE, src: currentRendition.source, sx: {
                        transform: `scale(${zoomPercentage / 100})`,
                        opacity: isCurrentAssetReady ? 1 : 0,
                        transformOrigin: 'center',
                    }, draggable: "true", onLoad: handleImageLoad, onError: (e) => {
                        if (handleError)
                            handleError(e);
                    } }));
        }
    };
    return (React.createElement(Backdrop_1.default, { open: open, sx: {
            zIndex: 999,
            position: isVersionComparison ? 'relative' : 'fixed',
            backgroundColor: (scopedTheme) => { return scopedTheme.palette.background.secondary; },
        } },
        React.createElement(PreviewContainer, { container: true, direction: "column", justifyContent: "flex-start", sx: {
                height: isVersionComparison ? '400px' : '100vh',
            } },
            React.createElement(material_1.Grid, null,
                React.createElement(Header_1.default, { sx: {
                        display: isVersionComparison ? 'none' : '',
                    }, startSection: {
                        hamburgerSpace: false,
                        withBackButton: true,
                        title: customHeaderTitle !== null && customHeaderTitle !== void 0 ? customHeaderTitle : currentAsset.title,
                        backIconToolTip: tooltipTexts.backButton,
                    }, middleSection: [
                        React.createElement(Typography_1.default, { color: "textSecondary", variant: "subtitle2", marginRight: -1 }, renditionLabel),
                        React.createElement(Select_1.default, { label: renditionLabel, id: PreviewTestIds.PREVIEW_RENDITION_DROPDOWN, "data-testid": PreviewTestIds.PREVIEW_RENDITION_DROPDOWN, role: "listbox", hiddenLabel: true, required: true, value: (_b = currentRendition.type) !== null && _b !== void 0 ? _b : '', onChange: handleOnChangeSelect, disabled: !isCurrentAssetReady || reactComponent !== undefined }, currentAsset.renditions.map((rendition) => {
                            return (React.createElement(MenuItem_1.default, { key: rendition.type, value: rendition.type, size: "small" }, rendition.type ? (React.createElement(ListItemText_1.default, { primary: `${rendition.type} (${rendition.dimension})` })) : ''));
                        })),
                    ], hideMiddleSection: isVideo, endSection: [
                        React.createElement(Tooltip_1.default, { tooltipsize: "small", placement: "bottom", title: tooltipTexts.download },
                            React.createElement("span", null,
                                React.createElement(IconButton_1.default, { "data-testid": PreviewTestIds.PREVIEW_DOWNLOAD_BUTTON, variant: IconButton_1.IconButtonVariants.WITH_PADDING, disabled: !isCurrentAssetReady || reactComponent !== undefined || isVersionComparison, onClick: (e) => {
                                        const selectRenditionId = currentRendition.id;
                                        if (handleDownload)
                                            handleDownload(e, selectRenditionId);
                                    }, showendicon: 0 },
                                    React.createElement(download_1.default, null)))),
                        React.createElement(Button_1.default, { "data-testid": PreviewTestIds.PREVIEW_SELECT_BUTTON, variant: Button_1.ButtonVariants.CONTAINED, disabled: isSelectButtonDisabled || !isCurrentAssetReady || reactComponent !== undefined, onClick: (e) => {
                                const selectRenditionId = currentRendition.id;
                                if (handleSelect)
                                    handleSelect(e, selectRenditionId);
                            } }, selectButtonTitle),
                    ], onClickBackButton: onClickBackButton })),
            React.createElement(React.Fragment, null,
                React.createElement(ImageContainer, { ref: imageContainerRef, container: true, direction: "row", justifyContent: "space-between", alignItems: "center", sx: {
                        height: `calc(100% - ${isVideo ? '55' : `${isVersionComparison ? '0' : '66'}`}px)`,
                        overflow: (zoomPercentage === zoomDefault || zoomPercentage === zoomToFitPercentage) ? 'hidden' : 'auto',
                    } },
                    !isVersionComparison && (React.createElement(Tooltip_1.default, { tooltipsize: "small", placement: "bottom-start", title: tooltipTexts.previousAsset },
                        React.createElement(PreviousPreviewButton, null,
                            React.createElement("span", null,
                                React.createElement(StyledArrowButton, { "data-testid": PreviewTestIds.PREVIEW_PREV_BUTTON, disabled: isPreviousDisabled || isVersionComparison, onClick: handlePreviousAsset, showendicon: 0 },
                                    React.createElement(chevron__left_1.default, null)))))),
                    React.createElement(React.Fragment, null,
                        (isCurrentAssetReady === false && reactComponent === undefined) && (React.createElement(CircularProgressContainer, { "data-testid": PreviewTestIds.PREVIEW_CIRCULAR_PROGRESS, container: true, sx: {
                                height: `calc(100% - ${isVideo ? '55' : `${isVersionComparison ? '0' : '66'}`}px)`,
                            } },
                            React.createElement(CircularProgress_1.default, { withbackdrop: 0 }))),
                        renderOptions()),
                    !isVersionComparison && (React.createElement(Tooltip_1.default, { tooltipsize: "small", placement: "bottom-end", title: tooltipTexts.nextAsset },
                        React.createElement(NextPreviewButton, null,
                            React.createElement("span", null,
                                React.createElement(StyledArrowButton, { "data-testid": PreviewTestIds.PREVIEW_NEXT_BUTTON, disabled: isNextDisabled || isVersionComparison, onClick: handleNextAsset, showendicon: 0 },
                                    React.createElement(chevron__right_1.default, null))))))),
                (!isVideo && isCurrentAssetReady && reactComponent === undefined) && (React.createElement(material_1.Grid, { container: true, justifyContent: "center" },
                    (React.createElement(material_1.Box, { component: "div", role: "status", sx: {
                            // The followine css is used to hide the status message from the DOM but still make it accessible to screen readers
                            position: 'absolute', top: '-1000px', height: '1px', overflow: 'hidden',
                        }, "aria-live": "assertive", "aria-atomic": "true" }, showMessage && `Zoomed percentage ${zoomPercentage}%`)),
                    React.createElement(ZoomContainer, { sx: {
                            position: isVersionComparison ? 'absolute' : 'fixed',
                        } },
                        React.createElement(Tooltip_1.default, { tooltipsize: "small", placement: "top", title: tooltipTexts.zoomOut },
                            React.createElement(IconButton_1.default, { "data-testid": PreviewTestIds.PREVIEW_ZOOM_OUT_BUTTON, variant: IconButton_1.IconButtonVariants.WITH_PADDING, inversecolors: true, disabled: zoomOutDisable, onClick: handleZoomOut, showendicon: 0 },
                                React.createElement(zoom__out_1.default, null))),
                        React.createElement(Tooltip_1.default, { "data-testid": PreviewTestIds.PREVIEW_ZOOM_TOOLTIP_TEXT, tooltipsize: "small", placement: "top", title: zoomButtonTooltip },
                            React.createElement(Button_1.default, { "data-testid": PreviewTestIds.PREVIEW_ZOOM_PERCENT_BUTTON, variant: "text", size: "small", onClick: zoomPercentageFit, inversecolors: true }, `${zoomPercentage}%`)),
                        React.createElement(Tooltip_1.default, { tooltipsize: "small", placement: "top", title: tooltipTexts.zoomIn },
                            React.createElement(IconButton_1.default, { "data-testid": PreviewTestIds.PREVIEW_ZOOM_IN_BUTTON, variant: IconButton_1.IconButtonVariants.WITH_PADDING, inversecolors: true, disabled: zoomInDisable, onClick: handleZoomIn, showendicon: 0 },
                                React.createElement(zoom__in_1.default, null))))))))));
};
Preview.defaultProps = {
    open: true,
    index: 0,
};
exports.default = Preview;
