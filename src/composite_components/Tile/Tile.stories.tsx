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

import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { ImageList } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconVideoChat from '@hcl-software/enchanted-icons/dist/carbon/es/video--chat';
import {
  IActions,
  ItemActions,
  assets, data, getAvatarToDisplay, getAvatarToDisplayForFileType,
} from './TileData';
import Tile, { TilePropsType } from './Tile';
import Typography from '../../Typography';

export default {
  title: 'Data display/Tile',
  component: Tile,
  argTypes: {
    menuSize: {
      control: { type: 'radio' },
      options: ['small', 'medium'],
      description: 'size of the menu',
    },
    title: {
      description:
        ' Title of the component.',
      table: {
        defaultValue: {
          summary: 'Label',
        },
      },
    },
    subTitle: {
      description:
        ' Sub Title of the component.',
      table: {
        defaultValue: {
          summary: 'Text',
        },
      },
    },
    itemId: {
      control: 'false',
      description:
        ' Unique Id of the Tile component.',
    },
    hideAvatarIfImageIsLoaded: {
      description:
        'Enable or disable avatar if image is loaded.',
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    imageUrl: {
      control: { type: 'select' },
      options: ['green bowl_bea.png', 'Spitburg-Chair-Elemonte-Source.jpg', 'Website-banner.png', 'Business-workshop.png'],
      description:
        'Url of the image.',
    },
    tileActions: {
      description:
        'Actions to be displayed on the tilebar.',
      control: 'false',
    },
    isTrash: {
      control: { type: 'boolean' },
      description: 'Enable trash view mode. Shows lock notice badge on media tiles (with thumbnail) and info icon on collection tiles (without thumbnail).',
      table: {
        defaultValue: { summary: false },
      },
    },
    trashInfoTooltip: {
      control: { type: 'text' },
      description: 'Tooltip text for info icon (shown on collection tiles when isTrash=true)',
      table: {
        defaultValue: { summary: '' },
      },
    },
    lockNoticeText: {
      control: { type: 'text' },
      description: 'Text to display in the lock notice badge (shown on media tiles when isTrash=true)',
      table: {
        defaultValue: { summary: '' },
      },
    },
    showSyncIcon: {
      control: {
        type: 'boolean',
      },
      description: 'Show a video sync icon, only for Storybook use',
    },
    syncIcon: {
      control: false,
      description: 'Show a video sync icon on the tile',
    },
    overflowTooltip: {
      description:
        'Tooltip of the overflow Icon.',
      table: {
        defaultValue: {
          summary: 'More Actions',
        },
      },
    },
    handleCheckboxChange: {
      description: 'Event handler for checkbox change',
      control: 'false',
    },
    itemClickedAction: {
      description: 'Event handler for tile click',
      control: 'false',
    },
    handlePreviewAction: {
      description: 'Event handler for preview',
      control: 'false',
    },
    hasCheckBox: {
      description:
        'Enable or disable checkbox.',
    },
    hasThumbnail: {
      description:
        'Enable or disable Thumbnail.',
    },
    disabled: {
      description:
        'Enable or disable the component.',
    },
    tileRef: { table: { disable: true } },
    ariaLabel: {
      control: 'false',
      description: 'Aria-label for the tile. Provides a direct text description to the tile for screen readers.',
    },
    ariaLabelledBy: { table: { disable: true } },
    avatar: {
      description: 'Avatar to be displayed on the tile.',
      control: 'false',
    },
    imageAltName: {
      description: 'Alt text for the image.',
      control: 'false',
    },
    activeItem: { table: { disable: true } },
  },
} as Meta<typeof Tile>;

const itemData = {
  title: 'Label',
  author: 'Text',
  featured: true,
};
const StyledImageList = styled(ImageList)({
  rowHeight: 'auto',
});

interface ExtendTilePropsType extends TilePropsType {
  showSyncIcon: boolean;
}
const InteractiveExampleTemplate: StoryFn<ExtendTilePropsType> = (args) => {
  const tileActions: IActions[] = args.hasThumbnail ? ItemActions : data;
  const [onSelectionFlag, setOnSelectioFlag] = useState('');
  const itemClickedAction = (event: React.MouseEvent<HTMLElement>, tileItemId: string) => {
    setOnSelectioFlag(tileItemId);
    event.stopPropagation();
  };

  const handlePreviewAction = (event: React.MouseEvent<HTMLElement>, tileItemId: string) => {
    event.stopPropagation();
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, tileItemId: string, isChecked: boolean) => {
    event.stopPropagation();
  };
  const syncIcon = (
    <>
      <IconVideoChat />
      <Typography variant="body2">Synced</Typography>
    </>
  );
  return (
    <>
      <StyledImageList
        gap={12}
        cols={0}
        sx={{
          display: 'grid',
          padding: '2px',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        }}
      >
        <Tile
          {...args}
          tileActions={tileActions}
          activeItem={onSelectionFlag}
          itemClickedAction={itemClickedAction}
          handlePreviewAction={handlePreviewAction}
          handleCheckboxChange={handleCheckboxChange}
          avatar={getAvatarToDisplay('image/jpg', 'green bowl_bea.png')}
          syncIcon={args.showSyncIcon ? syncIcon : undefined}
          hasThumbnail
          isTrash={args.isTrash}
          lockNoticeText={args.lockNoticeText}
        />
      </StyledImageList>
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);', mt: 2 }} variant="body1">
        Collection Tile
      </Typography>
      <StyledImageList
        gap={12}
        cols={0}
        sx={{
          display: 'grid',
          padding: '2px',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        }}
      >
        <Tile
          {...args}
          tileActions={tileActions}
          activeItem={onSelectionFlag}
          itemClickedAction={itemClickedAction}
          handlePreviewAction={handlePreviewAction}
          handleCheckboxChange={handleCheckboxChange}
          avatar={getAvatarToDisplay('image/jpg', 'green bowl_bea.png')}
          syncIcon={args.showSyncIcon ? syncIcon : undefined}
          isTrash={args.isTrash}
          trashInfoTooltip={args.trashInfoTooltip}
          hasThumbnail={false}
        />
      </StyledImageList>
    </>
  );
};

export const InteractiveExample = InteractiveExampleTemplate.bind({});
InteractiveExample.parameters = {
  options: { showPanel: true },
};

InteractiveExample.args = {
  title: itemData.title,
  subTitle: 'Text',
  imageUrl: 'green bowl_bea.png',
  overflowTooltip: 'More Actions',
  hasCheckBox: true,
  hideAvatarIfImageIsLoaded: true,
  hasThumbnail: true,
  disabled: false,
  menuSize: 'medium',
  itemId: '3',
  showSyncIcon: false,
  isTrash: false,
  trashInfoTooltip: '10 days',
  lockNoticeText: '15 days',
};

const VisualTestTemplate: StoryFn<typeof Tile> = (args) => {
  const [onSelectionFlag, setOnSelectioFlag] = useState('');

  const itemClickedAction = (event: React.MouseEvent<HTMLElement>, tileItemId: string) => {
    setOnSelectioFlag(tileItemId);
    event.stopPropagation();
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, tileItemId: string, isChecked: boolean) => {
    event.stopPropagation();
  };
  return (
    <>
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        Tile for images
      </Typography>
      <StyledImageList
        gap={12}
        cols={0}
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        }}
      >
        <Tile
          {...args}
          activeItem={onSelectionFlag}
          itemClickedAction={itemClickedAction}
          avatar={getAvatarToDisplay('image/jpg', 'green bowl_bea.png')}
          handleCheckboxChange={handleCheckboxChange}
          title={itemData.title}
          imageUrl="green bowl_bea.png"
          isTrash={args.isTrash}
          lockNoticeText={args.lockNoticeText}
        />
      </StyledImageList>
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        Tile for Collections
      </Typography>
      <StyledImageList
        gap={12}
        cols={0}
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        }}
      >
        <Tile
          {...args}
          activeItem={onSelectionFlag}
          itemClickedAction={itemClickedAction}
          avatar={getAvatarToDisplay('image/jpg', 'green bowl_bea.png')}
          handleCheckboxChange={handleCheckboxChange}
          title={itemData.title}
          imageUrl="green bowl_bea.png"
          hasThumbnail={false}
          tileActions={data}
          isTrash={args.isTrash}
          trashInfoTooltip={args.trashInfoTooltip}
        />
      </StyledImageList>
      &nbsp;
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        Tile for different file types
      </Typography>
      <StyledImageList
        gap={12}
        cols={0}
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        }}
      >
        {assets.map((asset, index) => {
          const key = `tile-${index}`;
          return (
            <div key={key}>
              <Tile
                {...args}
                activeItem={onSelectionFlag}
                itemId={`${index}`}
                title={asset.title}
                subTitle={asset.subTitle}
                itemClickedAction={itemClickedAction}
                avatar={getAvatarToDisplayForFileType(asset.itemType, asset.title)}
                isTrash={args.isTrash}
                lockNoticeText={args.lockNoticeText}
              />
            </div>
          );
        })}
      </StyledImageList>
    </>
  );
};

export const VisualTest = VisualTestTemplate.bind({});
VisualTest.parameters = {
  options: { showPanel: false },
};
VisualTest.args = {
  subTitle: 'Text',
  itemId: '3',
  tileActions: ItemActions,
  overflowTooltip: 'More Actions',
  hasCheckBox: true,
  hideAvatarIfImageIsLoaded: true,
  menuSize: 'medium',
  hasThumbnail: true,
  showSyncIcon: false,
  isTrash: false,
  trashInfoTooltip: '10 days',
  lockNoticeText: '< 1 hour',
};
