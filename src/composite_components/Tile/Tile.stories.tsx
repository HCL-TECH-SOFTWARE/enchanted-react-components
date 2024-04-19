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
import { Meta, StoryFn } from '@storybook/react';
import { ImageList } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  assets, getAvatarToDisplay, getAvatarToDisplayForFileType, getItemActions,
} from './TileData';
import Tile from './Tile';
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
    hasCheckBox: {
      description:
        'Enable or disable checkbox.',
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

const InteractiveExampleTemplate: StoryFn<typeof Tile> = (args) => {
  const [onSelectionFlag, setOnSelectioFlag] = useState('');
  const itemClickedAction = (event: React.MouseEvent<HTMLElement>, tileItemId: string) => {
    setOnSelectioFlag(tileItemId);
    event.stopPropagation();
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, tileItemId: string, isChecked: boolean) => {
    event.stopPropagation();
  };
  return (
    <StyledImageList
      gap={10}
      cols={0}
      sx={{
        display: 'grid',
        padding: '2px',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      }}
    >
      <Tile
        {...args}
        activeItem={onSelectionFlag}
        itemClickedAction={itemClickedAction}
        handleCheckboxChange={handleCheckboxChange}
        avatar={getAvatarToDisplay('image/jpg', 'green bowl_bea.png')}
      />
    </StyledImageList>
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
  menuSize: 'medium',
  itemId: '3',
  tileActions: getItemActions(false),
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
        gap={10}
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
        />
      </StyledImageList>
      &nbsp;
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        Tile for different file types
      </Typography>
      <StyledImageList
        gap={10}
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
  tileActions: getItemActions(false),
  overflowTooltip: 'More Actions',
  hasCheckBox: true,
  hideAvatarIfImageIsLoaded: true,
  menuSize: 'medium',
};
