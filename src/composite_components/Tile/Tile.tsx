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
import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import IconView from '@hcl-software/enchanted-icons/dist/carbon/es/view';
import { styled } from '@mui/material/styles';
import TileActionBar from './TileActionBar';
import { IActions } from './TileData';
import Checkbox from '../../Checkbox';
import Tooltip from '../../Tooltip';
import IconButton from '../../IconButton';
import Typography from '../../Typography';

interface ImageListContextProps {
  disabled?: boolean;
  isChecked?: boolean;
  hasThumbnail?: boolean;
}
const ImageListContext = React.createContext<ImageListContextProps>({});
const StyledImageListItem = styled(ImageListItem)<ImageListContextProps>(({ theme }) => {
  const { disabled, isChecked } = React.useContext(ImageListContext);
  return {
    backgroundColor: isChecked ? theme.palette.action.selectedOpacityModified : theme.palette.background.default,
    border: `1px solid ${theme.palette.border.secondary}`,
    borderRadius: `${theme.spacing(0.5)}`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    overflow: 'hidden',
    '&:focus': {
      border: `1px solid ${theme.palette.action.focus}`,
      boxShadow: `0 0 0 1px ${theme.palette.action.focus}`,
    },
    '&:hover': {
      '.overlay': {
        opacity: 1,
      },
      '.image-list-item-bar': {
        backgroundColor: !disabled && theme.palette.action.hover,
      },
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
interface StyledTitleProps {
  disabled?: boolean;
}
interface StyledSubTitleProps {
  disabled?: boolean;
}
const StyledTitle = styled(Box)<StyledTitleProps>(({ theme, disabled }) => {
  return {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    lineHeight: '16px',
    fontSize: '12px',
    maxWidth: '100%',
    color: disabled ? theme.palette.text.disabled : theme.palette.text.primary,
  };
});

const StyledSubTitle = styled(Box)<StyledSubTitleProps>(({ theme, disabled }) => {
  return {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: '14px',
    fontSize: '10px',
    maxWidth: '100%',
    color: disabled ? theme.palette.text.disabled : theme.palette.text.secondary,
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

const CustomIconView = styled(IconView)(({ theme }) => {
  return {
    color: `${theme.palette.action.inverse}`,
  };
});

const StyledImageListItembar = styled(ImageListItemBar)<ImageListContextProps>(({ theme }) => {
  const { hasThumbnail } = React.useContext(ImageListContext);
  return {
    padding: '7px',
    height: '46px',
    borderTop: hasThumbnail ? `1px solid ${theme.palette.border.secondary}` : 'none',
    '& .MuiImageListItemBar-titleWrap': {
      padding: '0px',
    },
    '& .MuiImageListItemBar-actionIcon': {
      padding: '0px 0px 0px 8px',
    },
  };
});

const PreviewTitle = styled(Typography)((props) => {
  const { theme } = props;
  return {
    color: theme.palette.text.tertiary1,
  };
});

const Overlay = styled('div')(({ theme }) => {
  return {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: `${theme.palette.background.overlay}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  };
});

const ImageContainer = styled('div')(() => {
  return {
    position: 'relative',
    height: '194px',
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
  handlePreviewAction?(event: React.MouseEvent<HTMLElement>, tileItemId: string): void,
  handleCheckboxChange?(event: React.ChangeEvent<HTMLInputElement>, tileItemId: string, isChecked: boolean): void,
  tileActions: IActions[],
  ariaLabel?: string;
  ariaLabelledBy?: string;
  overflowTooltip?: string;
  tileRef?: React.Ref<HTMLLIElement>;
  menuSize?: string;
  hasCheckBox: boolean;
  hasThumbnail?: boolean;
  disabled?: boolean;
}

export enum TileTestIds {
  TILE_PREVIEW = 'preview-icon-view',
}

const Tile = (props: TilePropsType) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const subTitleRef = useRef<HTMLDivElement | null>(null);
  const [isTitleOverflowing, setIsTitleOverflowing] = useState(false);
  const [isSubTitleOverflowing, setIsSubTitleOverflowing] = useState(false);
  const {
    itemId, imageUrl, avatar, itemClickedAction, handlePreviewAction, tileActions, activeItem,
    imageAltName, ariaLabel, ariaLabelledBy, overflowTooltip, tileRef, hideAvatarIfImageIsLoaded,
    subTitle, menuSize, hasCheckBox, hasThumbnail, disabled,
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

  const contextValue = useMemo(() => {
    return { disabled, isChecked, hasThumbnail };
  }, [isChecked, disabled, hasThumbnail]);

  return (
    <ImageListContext.Provider value={contextValue}>
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
        {(imageUrl && !avatar && hasThumbnail) && (
          <ImageContainer>
            <img
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              src={imageUrl}
              alt={imageAltName || ''}
            />
            {!disabled && (
              <Overlay className="overlay">
                <IconButton
                  data-testid={TileTestIds.TILE_PREVIEW}
                  onClick={(event) => { return handlePreviewAction?.(event, itemId); }}
                >
                  <CustomIconView />
                </IconButton>
                <PreviewTitle variant="body2">Preview</PreviewTitle>
              </Overlay>
            )}
          </ImageContainer>
        )}
        {(imageUrl && avatar) && (isImageLoaded && hideAvatarIfImageIsLoaded) && (hasThumbnail) && (
          <ImageContainer>
            <img
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              src={imageUrl}
              alt={imageAltName || ''}
            />
            {!disabled && (
              <Overlay className="overlay">
                <IconButton
                  data-testid={TileTestIds.TILE_PREVIEW}
                  onClick={(event) => { return handlePreviewAction?.(event, itemId); }}
                >
                  <CustomIconView />
                </IconButton>
                <PreviewTitle variant="body2">Preview</PreviewTitle>
              </Overlay>
            )}
          </ImageContainer>
        )}
        {(imageUrl && avatar) && (!hideAvatarIfImageIsLoaded || (!isImageLoaded)) && (hasThumbnail) && (
          <ImageContainer>
            <StyledBox>
              {avatar}
            </StyledBox>
            {!disabled && (
              <Overlay className="overlay">
                <IconButton
                  data-testid={TileTestIds.TILE_PREVIEW}
                  onClick={(event) => { return handlePreviewAction?.(event, itemId); }}
                >
                  <CustomIconView />
                </IconButton>
                <PreviewTitle variant="body2">Preview</PreviewTitle>
              </Overlay>
            )}
          </ImageContainer>
        )}
        {(!imageUrl && avatar) && (hasThumbnail) && (
          <ImageContainer>
            <StyledBox>
              {avatar}
            </StyledBox>
            {!disabled && (
              <Overlay className="overlay">
                <IconButton
                  data-testid={TileTestIds.TILE_PREVIEW}
                  onClick={(event) => { return handlePreviewAction?.(event, itemId); }}
                >
                  <CustomIconView />
                </IconButton>
                <PreviewTitle variant="body2">Preview</PreviewTitle>
              </Overlay>
            )}
          </ImageContainer>
        )}
        <StyledImageListItembar
          className="image-list-item-bar"
          title={(
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              {hasCheckBox && (<CustomCheckbox checked={isChecked} disabled={disabled} onChange={handleCheckboxChange} />)}
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                overflow: 'hidden',
              }}
              >
                {isTitleOverflowing ? (
                  <Tooltip title={props.title} disableInteractive>
                    <StyledTitle ref={titleRef} disabled={disabled}>
                      {props.title}
                    </StyledTitle>
                  </Tooltip>
                ) : (
                  <StyledTitle ref={titleRef} disabled={disabled}>
                    {props.title}
                  </StyledTitle>
                )}
                {isSubTitleOverflowing ? (
                  <Tooltip title={subTitle}>
                    <StyledSubTitle ref={subTitleRef} disabled={disabled}>
                      {subTitle}
                    </StyledSubTitle>
                  </Tooltip>
                ) : (
                  <StyledSubTitle ref={subTitleRef} disabled={disabled}>
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
                disabled={disabled}
                hasThumbnail={hasThumbnail}
              />
            </Box>
          )}
        />
      </StyledImageListItem>
    </ImageListContext.Provider>
  );
};

export default Tile;
