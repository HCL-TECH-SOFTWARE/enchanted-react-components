import * as React from 'react';
/**
 * @typedef PreviewProps
 * @type {object}
 * @property {boolean} open - Show preview component
 * @property {Assets[]} assets - List of Assets to be displayed in Preview
 * @property {string} renditionLabel - label of renditions
 * @property {boolean} isSelectButtonDisabled - Enable/disable select button
 * @property {string} selectButtonTitle - Text of select button
 * @property {number} index - Index of image to be shown
 * @property {function} handleSelect - Event handler for select
 * @property {function} handleDownload - Event handler for download
 * @property {function} onClickBackButton - Event handler for back button
 * @property {boolean} isNextButtonDisabled - Enable/disable next button (will override automatic toggling)
 * @property {boolean} isPreviousButtonDisabled - Enable/disable previous button (will override automatic toggling)
 * @property {function} overrideHandlePrevious - Event handler that overrides the default privious asset navigation
 * @property {function} overrideHandleNext - Event handler that overrides the default next asset navigation
 * @property {boolean} isFetchingAssets - indicate whether the assets prop is still fetching, Note: even when this is false and asset is not finished rendering, <Preview /> will still show spinner
 * @property {boolean} customHeaderTitle - custom header title
 * @property {boolean} isVersionComparison - check if the preivew is used for version comparison
*/
export interface MediaType {
    mimeType: string;
    extensions: string[];
}
export interface AssetRendition {
    id: string;
    type: string;
    source: string;
    dimension?: string;
}
export interface Assets {
    title: string;
    mediaType: MediaType;
    renditions: AssetRendition[];
}
export interface PreviewProps {
    open: boolean;
    reactComponent?: JSX.Element;
    assets: Assets[];
    renditionLabel: string;
    isSelectButtonDisabled: boolean;
    selectButtonTitle: string;
    index: number;
    handleSelect?: (event: React.ChangeEvent<{}>, imageRenditionId: string) => void;
    handleDownload?: (event: React.ChangeEvent<{}>, imageRenditionId: string) => void;
    onClickBackButton?: Function;
    tooltipTexts: {
        zoomIn: string;
        zoomOut: string;
        zoomToFit: string;
        viewActualSize: string;
        nextAsset: string;
        previousAsset: string;
        download: string;
        backButton: string;
    };
    isNextButtonDisabled?: boolean;
    isPreviousButtonDisabled?: boolean;
    overrideHandlePrevious?: () => void;
    overrideHandleNext?: () => void;
    isFetchingAssets?: boolean;
    customHeaderTitle?: string;
    handleError?: (event: React.SyntheticEvent<HTMLVideoElement | HTMLImageElement, Event>) => void;
    isVersionComparison?: boolean;
}
export declare enum PreviewTestIds {
    PREVIEW_SELECT_BUTTON = "previewSelectButton",
    PREVIEW_DOWNLOAD_BUTTON = "previewDownloadButton",
    PREVIEW_RENDITION_DROPDOWN = "previewRenditionDropdown",
    PREVIEW_IMAGE = "previewImage",
    PREVIEW_PREV_BUTTON = "previewPreviousButton",
    PREVIEW_NEXT_BUTTON = "previewNextButton",
    PREVIEW_ZOOM_IN_BUTTON = "previewZoomInButton",
    PREVIEW_ZOOM_OUT_BUTTON = "previewZoomOutButton",
    PREVIEW_ZOOM_PERCENT_BUTTON = "previewZoomPercentButton",
    PREVIEW_ZOOM_TOOLTIP_TEXT = "tooltipTexts.previewZoom",
    PREVIEW_VIDEO_PLAYER = "previewVideoPlayer",
    PREVIEW_CIRCULAR_PROGRESS = "previewCircularProgress"
}
export declare enum AssetType {
    IMAGE = "image",
    VIDEO = "video"
}
declare const Preview: React.FC<PreviewProps>;
export default Preview;
