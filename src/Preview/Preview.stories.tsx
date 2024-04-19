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
import { StoryFn, Meta } from '@storybook/react';

import IconAvatar from '@hcl-software/enchanted-icons/dist/carbon/es/folder';
import Preview, { PreviewProps } from './Preview';
import Avatar, { AvatarColors, AvatarTypes } from '../Avatar';
import Typography from '../Typography';

export default {
  title: 'Data Display/Preview',
  component: Preview,
  parameters: {
    docs: {
      story: { height: '100vh', inline: true },
    },
  },
  argTypes: {
    open: {
      description: 'To show or hide the preview',
      type: 'boolean',
    },
    images: {
      description: 'List of images to be displayed in Preview',
    },
    renditionLabel: {
      description: 'Label of rendition',
    },
    isSelectButtonDisabled: {
      description: 'Enable/disable select button',
      type: 'boolean',
    },
    selectButtonTitle: {
      description: 'Text of select button',
    },
    index: {
      description: 'Index of image to be shown',
      type: 'number',
    },
    handleSelect: {
      description: 'Event handler for select',
    },
    handleDownload: {
      description: 'Event handler for download',
    },
    onClickBackButton: {
      description: 'Event handler for back button',
    },
    reactComponent: {
      description: 'Used to render react components when necessary',
    },
  },
} as Meta<typeof Preview>;

const tooltipTexts: PreviewProps['tooltipTexts'] = {
  zoomIn: 'Zoom in',
  zoomOut: 'Zoom out',
  zoomToFit: 'Zoom to fit',
  viewActualSize: 'View actual size',
  previousAsset: 'Previous asset',
  nextAsset: 'Next asset',
  download: 'Download asset',
};

const Template: StoryFn<typeof Preview> = (args) => {
  return (
    <Preview {...args} />
  );
};

export const ExampleImagePreview = {
  render: Template,
  args: {
    ...Preview.defaultProps,
    assets: [
      {
        title: 'Spitburg-Chair-Elemonte.jpg',
        mediaType: {
          mimeType: 'image/jpg',
          extensions: ['jpg'],
        },
        renditions: [
          {
            id: '1',
            type: 'Source',
            source: 'Spitburg-Chair-Elemonte-Source.jpg',
            dimension: '3684 x 4220',
          },
          {
            id: '2',
            type: 'Desktop',
            source: 'Spitburg-Chair-Elemonte-Desktop.jpg',
            dimension: '1280 x 1032',
          },
          {
            id: '3',
            type: 'Smartphone',
            source: 'Spitburg-Chair-Elemonte-Smartphone.jpg',
            dimension: '512 x 576',
          },
        ],
      },
      {
        title: 'Hanging-chair.png',
        mediaType: {
          mimeType: 'image/png',
          extensions: ['png'],
        },
        renditions: [
          {
            id: '4',
            type: 'Source',
            source: 'Hanging-chair.png',
            dimension: '4928 x 3264',
          },
        ],
      },
      {
        title: 'Business-workshop.png',
        mediaType: {
          mimeType: 'image/png',
          extensions: ['png'],
        },
        renditions: [
          {
            id: '5',
            type: 'Source',
            source: 'Business-workshop.png',
            dimension: '1000 x 400',
          },
        ],
      },
    ],
    renditionLabel: 'Rendition:',
    isSelectButtonDisabled: true,
    isFetchingAssets: false,
    selectButtonTitle: 'Select',
    tooltipTexts,
  },
};

const TemplateComponent: StoryFn<typeof Preview> = (args) => {
  return (
    <Preview {...args} />
  );
};

const sampleComponent = () => {
  return (
    <>
      <Avatar
        variant="rounded"
        type={AvatarTypes.ICON}
        color={AvatarColors.BLUE}
        iconImage={<IconAvatar />}
        sx={{ margin: 'auto', marginBottom: '8px' }}
      />
      <Typography color="textSecondary" variant="subtitle2">
        A sample text here
      </Typography>
    </>
  );
};

export const ExampleComponentPreview = {
  render: TemplateComponent,
  args: {
    ...Preview.defaultProps,
    assets: [
      {
        title: 'Hanging-chair.png',
        mediaType: {
          mimeType: 'image/png',
          extensions: ['png'],
        },
        renditions: [
          {
            id: '4',
            type: 'Source',
            source: 'Hanging-chair.png',
            dimension: '4928 x 3264',
          },
        ],
      },
    ],
    renditionLabel: 'Rendition:',
    isSelectButtonDisabled: true,
    selectButtonTitle: 'Select',
    tooltipTexts,
    reactComponent: sampleComponent(),
  },
};
