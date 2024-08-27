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

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ProgressBar from './ProgressBar';

export default {
  title: 'Data display/ProgressBar',
  component: ProgressBar,
  argTypes: {
    totalPercentage: {
      control: {
        type: 'range', min: 0, max: 100, step: 1,
      },
      description: 'Total percentage of the progress bar',
    },
    uploadStatus: {
      control: 'text',
      description: 'Status of the upload progress bar',
    },
    totalSize: {
      control: 'text',
      description: 'Total size of the progress bar',
      table: {
        defaultValue: {
          summary: '50 MB',
        },
      },
    },
    totalTime: {
      control: 'text',
      description: 'Total time of the progress bar',
      table: {
        defaultValue: {
          summary: '27 min 45 sec',
        },
      },
    },
    uploadedFile: {
      control: 'object',
      description: 'Uploaded file',
    },
    navigateFolder: {
      action: 'navigateFolder',
      description: 'Click the folder icon to view the asset\'s collection.',
    },
    retryUploadItem: {
      action: 'retryUploadItem',
      description: 'Click the icon to retry the upload.',
    },
    cancelItem: {
      action: 'cancelItem',
      description: 'Click the icon to pause or stop file upload.',
    },
    cancelAll: {
      control: false,
      description: 'Cancel all',
    },
    learnMoreOnFailure: {
      action: 'learnMoreOnFailure',
      description: 'Learn more on failure',
    },
    stringLiterals: {
      control: 'object',
      description: 'String literals',
    },
    closeModal: {
      action: 'closeModal',
      description: 'Close modal',
    },
    pauseButton: {
      control: false,
      description: 'Pause button action',
    },
  },
} as Meta<typeof ProgressBar>;

const InteractiveExampleTemplate: StoryFn<typeof ProgressBar> = (args) => {
  const translation = {
    closeButtonTooltip: 'Close',
    expandTooltip: 'View upload details',
    collapseTooltip: 'Hide upload details',
    navigateButtonTooltip: 'View location',
    retryButtonTooltip: 'Retry upload',
    errorButtonTooltip: 'Pause/Stop uploading',
    successLabel: 'Uploaded.',
    failureLabel: 'Upload Failed.',
    pendingLabel: 'Waiting...',
    progressLabel: 'Uploading...',
  };
  return (
    <div style={{ height: '40vh' }}>
      <ProgressBar
        {...args}
        translation={translation}
      />
    </div>
  );
};

export const InteractiveExample = InteractiveExampleTemplate.bind({});
InteractiveExample.args = {
  totalPercentage: 25,
  uploadStatus: 'Uploading 1 of 5 items',
  totalSize: '50 MB',
  totalTime: '27 min 45 sec',
  uploadedFile: [
    {
      progress: 100,
      size: 4000,
      name: 'testImage.jpg',
      collectionId: '1',
      status: 'SUCCESS',
      timestamp: 1588996092641,
    },
    {
      progress: 100,
      size: 0,
      name: 'Folder',
      collectionId: '2',
      status: 'SUCCESS',
      message: 'Collection created successfully.',
      type: 'folder',
      timestamp: 1588996092642,
    },
    {
      progress: 100,
      size: 4000,
      name: 'testPDF.pdf',
      collectionId: '2',
      status: 'SUCCESS',
      timestamp: 1588996092643,
    },
    {
      progress: 100,
      size: 50000,
      name: 'testImage_1.gif',
      collectionId: '2',
      status: 'SUCCESS',
      timestamp: 1588996092644,
    },
    {
      progress: 0,
      size: 0,
      name: 'Folder',
      collectionId: '',
      status: 'FAILURE',
      message: 'Collection name already exists in this location. Please use a different folder name.',
      type: 'folder',
      timestamp: 1588996092645,
    },
    {
      progress: 0,
      size: 5366330,
      name: 'testPDF_1.pdf',
      collectionId: '1',
      status: 'FAILURE',
      showLearnMore: true,
      timestamp: 1588996092646,
    },
    {
      progress: 75,
      size: 53000,
      name: 'testVideo.mp4',
      collectionId: '1',
      status: 'PROGRESS',
      timestamp: 1588996092647,
    },
    {
      progress: 0,
      size: 5736420,
      name: 'testDOCX.docx',
      collectionId: '1',
      status: 'PENDING',
      timestamp: 1588996092648,
    },
    {
      progress: 100,
      size: 50276287,
      name: 'testXLSX.xlsx',
      collectionId: '1',
      status: 'SUCCESS',
      timestamp: 1588996092649,
    },
    {
      progress: 25,
      size: 50276287,
      name: 'testPPT.ppt',
      collectionId: '1',
      status: 'PROGRESS',
      timestamp: 1588996092650,
    },
  ],
  stringLiterals: {
    learnMoreLabel: 'Learn more',
    totalSizeLabel: 'Total file size',
    retryLabel: 'Retry',
    cancelLabel: 'Cancel',
    cancelAllLabel: 'Cancel all',
    pauseButtonLabel: 'Pause',
  },
  navigateFolder: () => {
    // navigate to folder action
  },
  retryUploadItem: () => {
    // retry upload item action
  },
  cancelItem: () => {
    // cancel item action
  },
};
