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
import * as React from 'react';
import {
  Theme, Grid, SelectChangeEvent,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import IconDownload from '@hcl-software/enchanted-icons/dist/carbon/es/download';
import IconZoomIn from '@hcl-software/enchanted-icons/dist/carbon/es/zoom--in';
import IconZoomOut from '@hcl-software/enchanted-icons/dist/carbon/es/zoom--out';
import ChevronLeft from '@hcl-software/enchanted-icons/dist/carbon/es/chevron--left';
import ChevronRight from '@hcl-software/enchanted-icons/dist/carbon/es/chevron--right';
import { get } from 'lodash';
import Header from '../Header/Header';
import Typography from '../Typography/Typography';
import Select from '../Select/Select';
import MenuItem from '../Menu/MenuItem';
import IconButton, { IconButtonVariants } from '../IconButton/IconButton';
import Button, { ButtonVariants } from '../Button/Button';
import Tooltip from '../Tooltip/Tooltip';
import Backdrop from '../Backdrop/Backdrop';
import ListItemText from '../List/ListItemText';
import CircularProgress from '../ProgressIndicator/CircularProgress/CircularProgress';
import { white } from '../colors';

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
  onClickBackButton?: Function,
  tooltipTexts: {
    zoomIn: string;
    zoomOut: string;
    zoomToFit: string;
    viewActualSize: string;
    nextAsset: string;
    previousAsset: string;
    download: string;
    backButton: string;
  }
  isNextButtonDisabled?: boolean;
  isPreviousButtonDisabled?: boolean;
  overrideHandlePrevious?: () => void;
  overrideHandleNext?: () => void;
  isFetchingAssets?: boolean;
  customHeaderTitle?: string;
  zoomMessage?: string;
  handleError?: (event: React.SyntheticEvent<HTMLVideoElement | HTMLImageElement, Event>) => void;
  isVersionComparison?: boolean;
}

// Zoom button margin is 12px
const zoomButtonMargin = 12;

const PreviewContainer = styled(Grid)((props) => {
  return {
    height: '100vh',
    ' .MuiSvgIcon-root': {
      pointerEvents: 'none',
    },
  };
});

const StyledImage = styled('img')((props) => {
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

const StyledVideo = styled('video')((props) => {
  return {
    height: '100%',
    objectFit: 'contain',
    width: '100%',
  };
});

const StyledVideoWrapper = styled(Grid)((props) => {
  return {
    margin: '0 auto',
    overflow: 'hidden',
  };
});

const StyledComponent = styled('div')((props) => {
  return {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'scale-down',
    margin: '0 auto',
  };
});

const ImageContainer = styled(Grid)((props) => {
  return {
    overflow: 'auto',
  };
});

const ZoomContainer = styled(Grid)((props) => {
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
      color: white.WHITE100P,
    },
    '.MuiButton-textPrimary': {
      backgroundColor: 'unset',
      color: white.WHITE100P,
      fontWeight: '400',
      minWidth: 'unset',
    },
    '.Mui-disabled .MuiSvgIcon-root': {
      color: theme.palette.action.disabledInverse,
    },
  };
});

const PreviousPreviewButton = styled(Grid)((props) => {
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

const NextPreviewButton = styled(Grid)((props) => {
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

const StyledArrowButton = styled(IconButton)((props) => {
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
      color: `${props.disabled ? theme.palette.border.inverseSecondary : white.WHITE100P}`,
    },
  };
});

const CircularProgressContainer = styled(Grid)(() => {
  return {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
  };
});

export enum PreviewTestIds {
  PREVIEW_SELECT_BUTTON = 'previewSelectButton',
  PREVIEW_DOWNLOAD_BUTTON = 'previewDownloadButton',
  PREVIEW_RENDITION_DROPDOWN = 'previewRenditionDropdown',
  PREVIEW_IMAGE = 'previewImage',
  PREVIEW_PREV_BUTTON = 'previewPreviousButton',
  PREVIEW_NEXT_BUTTON = 'previewNextButton',
  PREVIEW_ZOOM_IN_BUTTON = 'previewZoomInButton',
  PREVIEW_ZOOM_OUT_BUTTON = 'previewZoomOutButton',
  PREVIEW_ZOOM_PERCENT_BUTTON = 'previewZoomPercentButton',
  PREVIEW_ZOOM_TOOLTIP_TEXT = 'tooltipTexts.previewZoom',
  PREVIEW_VIDEO_PLAYER = 'previewVideoPlayer',
  PREVIEW_CIRCULAR_PROGRESS = 'previewCircularProgress',
}

export enum AssetType {
  IMAGE = 'image',
  VIDEO = 'video',
}

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

const Preview: React.FC<PreviewProps> = ({
  open,
  reactComponent,
  renditionLabel,
  assets,
  index,
  isSelectButtonDisabled,
  selectButtonTitle,
  onClickBackButton,
  handleSelect,
  handleDownload,
  tooltipTexts,
  isNextButtonDisabled,
  isPreviousButtonDisabled,
  overrideHandleNext,
  overrideHandlePrevious,
  isFetchingAssets = false,
  customHeaderTitle,
  zoomMessage,
  handleError,
  isVersionComparison = false,
}: PreviewProps) => {
  const fallbackAssetValue: Assets[] = [
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

  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const zoomDefault: number = 100;
  const [zoomPercentage, setZoomPercentage] = React.useState<number>(zoomDefault);
  const [zoomInDisable, setZoomInDisable] = React.useState<boolean>(false);
  const [zoomOutDisable, setZoomOutDisable] = React.useState<boolean>(false);
  const [zoomButtonTooltip, setZoomButtonTooltip] = React.useState<string>('');
  const [zoomToFitPercentage, setZoomToFitPercentage] = React.useState<number>(zoomDefault);
  const [zoomTrigger, setZoomTrigger] = React.useState(true);

  const imageContainerRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const imageRef = React.useRef<HTMLImageElement>(null);

  const [isAssetFinishedRendering, setIsAssetFinishedRendering] = React.useState(false);
  const [showMessage, setshowMessage] = React.useState(false);

  const handleResize = () => {
    if (videoRef.current && imageContainerRef.current) {
      const videoWidth = videoRef.current?.videoWidth ?? 0;
      const videoHeight = videoRef.current?.videoHeight ?? 0;
      const aspectRatio = videoHeight / videoWidth;

      const containerWidth = imageContainerRef.current.offsetWidth;
      const calculatedHeight = containerWidth * aspectRatio;
      if (calculatedHeight < imageContainerRef.current?.clientHeight) {
        videoRef.current.style.height = `${containerWidth * aspectRatio}px`;
        videoRef.current.style.width = `${containerWidth}px`;
      } else {
        videoRef.current.style.height = `${imageContainerRef.current?.clientHeight}px`;
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
      setshowMessage(false);
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
    if (zoomInNumber === 400) setZoomInDisable(true);
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
    if (zoomOutNumber === 10) setZoomOutDisable(true);
    if (zoomOutNumber) {
      setZoomPercentage(zoomOutNumber);
    }
    setZoomInDisable(false);
    setZoomTrigger(false);
  };

  // Sets the zooming of the image based on 'view actual size' or 'fit to size' into AssetContainer
  const zoomPercentageFit = () => {
    if (zoomButtonTooltip === tooltipTexts.viewActualSize) {
      // View actual size
      setZoomPercentage(zoomDefault);
    } else {
      // Zoom to Fit
      setZoomPercentage(zoomToFitPercentage);
    }

    // Sets Zoom in and Zoom out button to be clickable
    setZoomInDisable(false);
    setZoomOutDisable(false);
  };

  // Calculates image zoom to fit percentage
  const calculateImagePercentage = () => {
    const imgHeight = imageRef.current?.height ?? 0;
    const imgContainerHeight = imageContainerRef?.current?.clientHeight ?? 0;

    // Computes the Zoom to Fit percentage based on AssetContainer and the actual image
    if (imgHeight === imgContainerHeight) {
      const calculatedPercentage = Math.round(((imgContainerHeight - (zoomButtonMargin * 2)) / imgContainerHeight) * 100);
      setZoomToFitPercentage(calculatedPercentage);
      return calculatedPercentage;
    }

    // Calculates smaller images based on AssetContainer and the actual image
    const calculatedImageHeight = Math.round(((imgContainerHeight - (zoomButtonMargin * 2)) / imgHeight) * 100);
    const imageContainerWidth = imageContainerRef?.current?.clientWidth ?? 0;
    const imageWidth = imageRef.current?.width ?? 0;
    const calculatedImageWidth = Math.round(((imageContainerWidth - (zoomButtonMargin * 2)) / imageWidth) * 100);

    // Compares which percentage is lowest to fit in container
    setZoomToFitPercentage(Math.min(calculatedImageHeight, calculatedImageWidth));
    return zoomDefault;
  };

  // Event handler whenever image is loaded
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // check if asset is fully rendered
    setIsAssetFinishedRendering(true);
    setZoomPercentage(calculateImagePercentage());
  };

  React.useEffect(() => {
    // Function to handle key press events for zoom in and zoom out
    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.metaKey && event.code === 'Equal') || (event.metaKey && event.key === '-')) {
        event.preventDefault();
        if (event.code === 'Equal') {
          handleZoomIn();
        } else {
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
  const currentAsset = React.useMemo<Assets>(() => {
    if (assets.length > 0) {
      const tempCurrentAsset = assets[currentIndex];

      return {
        title: get(tempCurrentAsset, 'title', fallbackAssetValue[0].title),
        renditions: get(tempCurrentAsset, 'renditions', fallbackAssetValue[0].renditions),
        mediaType: get(tempCurrentAsset, 'mediaType', fallbackAssetValue[0].mediaType),
      };
    }
    // Return a default value if the component was passed with an empty array of assets
    return fallbackAssetValue[0];
  }, [assets, currentIndex]);

  // Checks if the current asset is a video
  const isVideo = currentAsset.mediaType?.mimeType.includes('video');

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
  const [currentRendition, setCurrentRendition] = React.useState<AssetRendition>(currentAsset.renditions[0]);

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
  const handleOnChangeSelect = (event: SelectChangeEvent<unknown>) => {
    // reset boolean to indicate that asset hast not finished rendering
    setIsAssetFinishedRendering(false);

    if (event.target) {
      const selectedRendition = currentAsset.renditions.find((rendition) => {
        return rendition.type === event.target.value;
      });
      if (selectedRendition) setCurrentRendition(selectedRendition);
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
    switch (reactComponent !== undefined) {
      case true:
        return (
          <StyledComponent>
            {reactComponent}
          </StyledComponent>
        );

      default:
        if (isVideo) {
          return (
            <StyledVideoWrapper>
              <StyledVideo
                key={currentRendition.source}
                ref={videoRef}
                controls
                sx={{
                  opacity: isCurrentAssetReady ? 1 : 0,
                }}
                onLoadedData={() => {
                  handleResize();
                }}
                onError={(e) => {
                  if (handleError) handleError(e);
                }}
              >
                <source
                  data-testid={PreviewTestIds.PREVIEW_VIDEO_PLAYER}
                  src={currentRendition.source}
                  type={currentAsset.mediaType?.mimeType}
                />
              </StyledVideo>
            </StyledVideoWrapper>
          );
        }

        return (
          <StyledImage
            key={currentRendition.source}
            ref={imageRef}
            data-testid={PreviewTestIds.PREVIEW_IMAGE}
            src={currentRendition.source}
            sx={{
              transform: `scale(${zoomPercentage / 100})`,
              opacity: isCurrentAssetReady ? 1 : 0,
              transformOrigin: 'center',
            }}
            draggable="true"
            onLoad={handleImageLoad}
            onError={(e) => {
              if (handleError) handleError(e);
            }}
          />
        );
    }
  };

  return (
    <Backdrop
      open={open}
      sx={{
        zIndex: 999,
        position: isVersionComparison ? 'relative' : 'fixed',
        backgroundColor: (scopedTheme: Theme) => { return scopedTheme.palette.background.secondary; },
      }}
    >
      <PreviewContainer
        container
        direction="column"
        justifyContent="flex-start"
        sx={{
          height: isVersionComparison ? '400px' : '100vh',
        }}
      >
        <Grid>
          <Header
            sx={{
              display: isVersionComparison ? 'none' : '',
            }}
            startSection={{
              hamburgerSpace: false,
              withBackButton: true,
              title: customHeaderTitle ?? currentAsset.title,
              backIconToolTip: tooltipTexts.backButton,
            }}
            middleSection={[
              <Typography color="textSecondary" variant="subtitle2" marginRight={-1}>{renditionLabel}</Typography>,
              <Select
                data-testid={PreviewTestIds.PREVIEW_RENDITION_DROPDOWN}
                hiddenLabel
                required
                value={currentRendition.type ?? ''}
                onChange={handleOnChangeSelect}
                disabled={!isCurrentAssetReady || reactComponent !== undefined}
              >
                {currentAsset.renditions.map((rendition) => {
                  return (
                    <MenuItem
                      key={rendition.type}
                      value={rendition.type}
                      size="small"
                    >
                      {rendition.type ? (
                        <ListItemText primary={`${rendition.type} (${rendition.dimension})`} />
                      ) : ''}
                    </MenuItem>
                  );
                })}
              </Select>,
            ]}
            hideMiddleSection={isVideo}
            endSection={[
              <Tooltip
                tooltipsize="small"
                placement="bottom"
                title={tooltipTexts.download}
              >
                <span>
                  <IconButton
                    data-testid={PreviewTestIds.PREVIEW_DOWNLOAD_BUTTON}
                    variant={IconButtonVariants.WITH_PADDING}
                    disabled={!isCurrentAssetReady || reactComponent !== undefined || isVersionComparison}
                    onClick={(e) => {
                      const selectRenditionId = currentRendition.id;
                      if (handleDownload) handleDownload(e, selectRenditionId);
                    }}
                    showendicon={0}
                  >
                    <IconDownload />
                  </IconButton>
                </span>
              </Tooltip>,
              <Button
                data-testid={PreviewTestIds.PREVIEW_SELECT_BUTTON}
                variant={ButtonVariants.CONTAINED}
                disabled={isSelectButtonDisabled || !isCurrentAssetReady || reactComponent !== undefined}
                onClick={(e) => {
                  const selectRenditionId = currentRendition.id;
                  if (handleSelect) handleSelect(e, selectRenditionId);
                }}
              >
                {selectButtonTitle}
              </Button>,
            ]}
            onClickBackButton={onClickBackButton}
          />
        </Grid>
        <>
          <ImageContainer
            ref={imageContainerRef}
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              height: `calc(100% - ${isVideo ? '55' : `${isVersionComparison ? '0' : '66'}`}px)`,
              overflow: (zoomPercentage === zoomDefault || zoomPercentage === zoomToFitPercentage) ? 'hidden' : 'auto',
            }}
          >
            { !isVersionComparison && (
              <Tooltip
                tooltipsize="small"
                placement="bottom-start"
                title={tooltipTexts.previousAsset}
              >
                <PreviousPreviewButton>
                  <span>
                    <StyledArrowButton
                      data-testid={PreviewTestIds.PREVIEW_PREV_BUTTON}
                      disabled={isPreviousDisabled || isVersionComparison}
                      onClick={handlePreviousAsset}
                      showendicon={0}
                    >
                      <ChevronLeft />
                    </StyledArrowButton>
                  </span>
                </PreviousPreviewButton>
              </Tooltip>
            )}
            <>
              {(isCurrentAssetReady === false && reactComponent === undefined) && (
              <CircularProgressContainer
                data-testid={PreviewTestIds.PREVIEW_CIRCULAR_PROGRESS}
                container
                sx={{
                  height: `calc(100% - ${isVideo ? '55' : `${isVersionComparison ? '0' : '66'}`}px)`,
                }}
              >
                <CircularProgress withbackdrop={0} />
              </CircularProgressContainer>
              )}
              {renderOptions()}
            </>
            { !isVersionComparison && (
              <Tooltip
                tooltipsize="small"
                placement="bottom-end"
                title={tooltipTexts.nextAsset}
              >
                <NextPreviewButton>
                  <span>
                    <StyledArrowButton
                      data-testid={PreviewTestIds.PREVIEW_NEXT_BUTTON}
                      disabled={isNextDisabled || isVersionComparison}
                      onClick={handleNextAsset}
                      showendicon={0}
                    >
                      <ChevronRight />
                    </StyledArrowButton>
                  </span>
                </NextPreviewButton>
              </Tooltip>
            )}
          </ImageContainer>
          {(!isVideo && isCurrentAssetReady && reactComponent === undefined) && (
          <Grid
            container
            justifyContent="center"
          >
            <ZoomContainer
              sx={{
                position: isVersionComparison ? 'absolute' : 'fixed',
              }}
            >
              <Tooltip
                tooltipsize="small"
                placement="top"
                title={tooltipTexts.zoomOut}
              >
                <IconButton
                  data-testid={PreviewTestIds.PREVIEW_ZOOM_OUT_BUTTON}
                  variant={IconButtonVariants.WITH_PADDING}
                  inversecolors
                  disabled={zoomOutDisable}
                  onClick={handleZoomOut}
                  showendicon={0}
                >
                  <IconZoomOut />
                </IconButton>
              </Tooltip>
              {showMessage && (
              <Box
                component="div"
                role='alert'
                sx={{
                  // The followine css is used to hide the status message from the DOM but still make it accessible to screen readers
                  position: 'absolute', top: '-1000px', height: '1px', overflow: 'hidden',
                }}
                aria-live="assertive"
                aria-atomic="true"
              >
                {`${zoomMessage} ${zoomPercentage}%`}
              </Box>
              )}
              <Tooltip
                data-testid={PreviewTestIds.PREVIEW_ZOOM_TOOLTIP_TEXT}
                tooltipsize="small"
                placement="top"
                title={zoomButtonTooltip}
              >
                <Button
                  data-testid={PreviewTestIds.PREVIEW_ZOOM_PERCENT_BUTTON}
                  variant="text"
                  size="small"
                  onClick={zoomPercentageFit}
                >
                  {`${zoomPercentage}%`}
                </Button>
              </Tooltip>
              <Tooltip
                tooltipsize="small"
                placement="top"
                title={tooltipTexts.zoomIn}
              >
                <IconButton
                  data-testid={PreviewTestIds.PREVIEW_ZOOM_IN_BUTTON}
                  variant={IconButtonVariants.WITH_PADDING}
                  inversecolors
                  disabled={zoomInDisable}
                  onClick={handleZoomIn}
                  showendicon={0}
                >
                  <IconZoomIn />
                </IconButton>
              </Tooltip>
            </ZoomContainer>
          </Grid>
          )}
        </>
      </PreviewContainer>
    </Backdrop>
  );
};

Preview.defaultProps = {
  open: true,
  index: 0,
  zoomMessage: 'Zoomed',
};

export default Preview;
