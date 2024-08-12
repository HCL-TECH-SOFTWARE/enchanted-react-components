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

import React, { useState } from 'react';
import { Box } from '@mui/material';
import ProgressHeader from './ProgressHeader';
import ProgressItems from './ProgressItems';
import ProgressSubHeader from './ProgressSubHeader';

export enum EnumUploadStatus {
  SUCCESS = 'SUCCESS',
  PROGRESS = 'PROGRESS',
  PENDING = 'PENDING',
  FAILURE = 'FAILURE',
}

export enum ProgressItemType {
  File = 'file',
  Folder = 'folder',
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
  learnMoreLabel: string,
  totalSizeLabel: string,
  cancelLabel: string,
  cancelAllLabel?: string,
  pauseButtonLabel?: string,
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
}

/**
 * @component Renders a progress bar component.
 * @param {progressBarProps} props - The props for the ProgressBar component.
 * @returns {JSX.Element} The rendered ProgressBar component.
 */
const ProgressBar = (props: progressBarProps) => {
  const {
    uploadStatus, totalPercentage, totalSize, totalTime, stringLiterals, uploadedFile,
    retryUploadItem, cancelItem, navigateFolder, cancelAll, learnMoreOnFailure, closeModal,
    pauseButton, translation,
  } = props;

  const [expanded, setExpanded] = useState(false);

  /**
   * Toggles the state of the progress bar.
   */
  const toggleButtonClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box
      position="fixed"
      bottom="12px"
      right="12px"
      zIndex={2}
      data-testid="upload-progress-container"
    >
      <ProgressHeader
        totalPercentage={totalPercentage}
        uploadStatus={uploadStatus}
        closeModal={closeModal}
        stringLiterals={stringLiterals}
        cancelAll={cancelAll}
        pauseButton={pauseButton}
        translation={translation}
        expanded={expanded}
        toggleButtonClick={toggleButtonClick}
      />
      {expanded && (
        <ProgressSubHeader
          totalSize={totalSize}
          totalTime={totalTime}
          literals={stringLiterals}
          cancelAll={cancelAll}
        />
      )}
      {expanded && (
        <ProgressItems
          file={uploadedFile}
          retryUploadItem={retryUploadItem}
          cancelItem={cancelItem}
          navigateFolder={navigateFolder}
          literals={stringLiterals}
          learnMoreOnFailure={learnMoreOnFailure}
          translation={translation}
        />
      )}
    </Box>
  );
};

export default ProgressBar;
