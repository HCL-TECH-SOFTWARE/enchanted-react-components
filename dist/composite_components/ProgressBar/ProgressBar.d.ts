import React from 'react';
export declare enum EnumUploadStatus {
    SUCCESS = "SUCCESS",
    PROGRESS = "PROGRESS",
    PENDING = "PENDING",
    FAILURE = "FAILURE",
    CANCELLED = "CANCELLED"
}
export declare enum ProgressItemType {
    File = "file",
    Folder = "folder"
}
export interface IProgressState {
    progress: number;
    size: number;
    name: string;
    collectionId: string;
    status: EnumUploadStatus;
    timestamp?: number;
    message: string;
    type?: ProgressItemType;
    showLearnMore?: boolean;
}
export interface Literals {
    learnMoreLabel: string;
    totalSizeLabel: string;
    cancelLabel: string;
    cancelAllLabel?: string;
    pauseButtonLabel?: string;
}
export interface ProgressBarLocalization {
    closeButtonTooltip?: string;
    expandTooltip?: string;
    collapseTooltip?: string;
    navigateButtonTooltip?: string;
    retryButtonTooltip?: string;
    errorButtonTooltip?: string;
    successLabel: string;
    progressLabel: string;
    pendingLabel: string;
    failureLabel: string;
    cancelledLabel: string;
}
interface progressBarProps {
    totalPercentage: number;
    uploadStatus: string;
    closeModal(event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void;
    totalSize: string;
    totalTime?: string;
    stringLiterals: Literals;
    cancelAll?: Function;
    uploadedFile: IProgressState[];
    retryUploadItem?(queueItem: IProgressState): void;
    cancelItem?(queueItem: IProgressState): void;
    navigateFolder?(queueItem: IProgressState): void;
    learnMoreOnFailure(event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void;
    pauseButton?: Function;
    translation?: ProgressBarLocalization | undefined;
    isCancelAllDisabled: boolean;
}
/**
 * @component Renders a progress bar component.
 * @param {progressBarProps} props - The props for the ProgressBar component.
 * @returns {JSX.Element} The rendered ProgressBar component.
 */
declare const ProgressBar: (props: progressBarProps) => React.JSX.Element;
export default ProgressBar;
