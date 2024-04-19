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

import {
  Box,
  ImageListItem, ImageListItemBar,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import TileActionBar from './TileActionBar';
import { IActions } from './TileData';
import Checkbox from '../../Checkbox';
import Tooltip from '../../Tooltip';

const StyledImageListItem = styled(ImageListItem)((props) => {
  const { theme } = props;
  return {
    border: `1px solid ${theme.palette.border.secondary}`,
    borderRadius: `${theme.spacing(0.5)}`,
    cursor: 'pointer',
    overflow: 'hidden',
    '&:focus': {
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
    },
  };
});
export const StyledBox = styled(Box)(({ theme }) => {
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '194px',
    backgroundColor: theme.palette.background.tile,
  };
});

const StyledTitle = styled(Box)(({ theme }) => {
  return {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    lineHeight: '16px',
    fontSize: '12px',
    maxWidth: '100%',
    color: theme.palette.text.primary,
  };
});

const StyledSubTitle = styled(Box)(({ theme }) => {
  return {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: '14px',
    fontSize: '10px',
    maxWidth: '100%',
    color: theme.palette.text.secondary,
  };
});

const CustomCheckbox = styled(Checkbox)(({ theme }) => {
  return {
    '&.MuiCheckbox-root': {
      padding: '0px',
      margin: '0px 8px 0px 0px',
    },
  };
});

const StyledImageListItembar = styled(ImageListItemBar)(({ theme }) => {
  return {
    padding: '7px',
    height: '46px',
    borderTop: `1px solid ${theme.palette.border.secondary}`,
    backgroundColor: `${theme.palette.background.default}`,
    '& .MuiImageListItemBar-titleWrap': {
      padding: '0px',
    },
    '& .MuiImageListItemBar-actionIcon': {
      padding: '0px 0px 0px 8px',
    },
  };
});

export interface TilePropsType {
  activeItem?: string,
  itemId: string,
  title: string,
  subTitle: string,
  avatar?: React.ReactNode,
  imageUrl?: string,
  imageAltName?: string,
  hideAvatarIfImageIsLoaded: boolean,
  itemClickedAction?(event: React.MouseEvent<HTMLElement>, tileItemId: string): void,
  handleCheckboxChange?(event: React.ChangeEvent<HTMLInputElement>, tileItemId: string, isChecked: boolean): void,
  tileActions: IActions[],
  ariaLabel?: string;
  ariaLabelledBy?: string;
  overflowTooltip?: string;
  tileRef?: React.Ref<HTMLLIElement>;
  menuSize?: string;
  hasCheckBox: boolean;
}

const Tile = (props: TilePropsType) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const subTitleRef = useRef<HTMLDivElement | null>(null);
  const [isTitleOverflowing, setIsTitleOverflowing] = useState(false);
  const [isSubTitleOverflowing, setIsSubTitleOverflowing] = useState(false);
  const {
    itemId, imageUrl, avatar, itemClickedAction, tileActions, activeItem, hideAvatarIfImageIsLoaded,
    imageAltName, ariaLabel, ariaLabelledBy, overflowTooltip, tileRef,
    subTitle, menuSize, hasCheckBox,
  } = props;

  useEffect(() => {
    const titleElement = titleRef.current;
    const subTitleElement = subTitleRef.current;
    if (titleElement && titleElement.scrollWidth > titleElement.clientWidth) {
      setIsTitleOverflowing(true);
    }
    if (subTitleElement && subTitleElement.scrollWidth > subTitleElement.clientWidth) {
      setIsSubTitleOverflowing(true);
    }
  }, [props.title, subTitle]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    if (props.handleCheckboxChange) {
      props.handleCheckboxChange(event, props.itemId, event.target.checked);
    }
  };

  const handleTileClick = (event: React.MouseEvent<HTMLElement>, tileItemId: string) => {
    if (itemClickedAction) {
      itemClickedAction(event, tileItemId);
    }
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  useEffect(() => {
    const img = new Image();
    if (imageUrl) {
      img.src = imageUrl;
    }
    img.onload = handleImageLoad;
  }, [imageUrl]);

  return (
    <StyledImageListItem
      key={itemId}
      onClick={(event: React.MouseEvent<HTMLLIElement>) => { return handleTileClick(event, itemId); }}
      tabIndex={0}
      role="listitem"
      aria-current={activeItem === itemId}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      ref={tileRef}
    >
      {(imageUrl && !avatar) && (
        <img
          style={{
            maxWidth: '100%', // ensure the image never exceeds the width of its container
            height: '194px', // keep the original aspect ratio
          }}
          src={imageUrl}
          alt={props.title}
          loading="lazy"
        />
      )}
      {(imageUrl && avatar) && (isImageLoaded && hideAvatarIfImageIsLoaded) && (
        <img
          style={{
            height: '194px', // keep the original aspect ratio
          }}
          src={imageUrl}
          alt={imageAltName || ''}
        />
      )}
      {(imageUrl && avatar) && (!hideAvatarIfImageIsLoaded || (!isImageLoaded)) && (
        <StyledBox>
          {avatar}
        </StyledBox>
      )}
      {(!imageUrl && avatar) && (
        <StyledBox>
          {avatar}
        </StyledBox>
      )}
      <StyledImageListItembar
        title={(
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            {hasCheckBox && (<CustomCheckbox checked={isChecked} onChange={handleCheckboxChange} />)}
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              overflow: 'hidden',
            }}
            >
              {isTitleOverflowing ? (
                <Tooltip title={props.title}>
                  <StyledTitle ref={titleRef}>
                    {props.title}
                  </StyledTitle>
                </Tooltip>
              ) : (
                <StyledTitle ref={titleRef}>
                  {props.title}
                </StyledTitle>
              )}
              {isSubTitleOverflowing ? (
                <Tooltip title={subTitle}>
                  <StyledSubTitle ref={subTitleRef}>
                    {subTitle}
                  </StyledSubTitle>
                </Tooltip>
              ) : (
                <StyledSubTitle ref={subTitleRef}>
                  {subTitle}
                </StyledSubTitle>
              )}
            </Box>
          </Box>
        )}
        position="below"
        actionIcon={(
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
          >
            <TileActionBar
              itemId={itemId}
              actionList={tileActions}
              overflowTooltip={overflowTooltip}
              menuSize={menuSize}
            />
          </Box>
        )}
      />
    </StyledImageListItem>
  );
};

export default Tile;
