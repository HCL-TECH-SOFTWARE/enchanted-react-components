/* ======================================================================== *
 * Copyright 2024, 2025 HCL America Inc.                                    *
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
import { styled } from '@mui/material';
import WarningIcon from '@hcl-software/enchanted-icons/dist/carbon/es/warning';
import SuccessIcon from '@hcl-software/enchanted-icons/dist/carbon/es/checkmark--outline';
import ImageIcon from '@hcl-software/enchanted-icons/dist/carbon/es/image';
import FolderIcon from '@hcl-software/enchanted-icons/dist/carbon/es/folder';
import FoldersIcon from '@hcl-software/enchanted-icons/dist/carbon/es/folders';
import ErrorIcon from '@hcl-software/enchanted-icons/dist/carbon/es/error';
import RetryFailedIcon from '@hcl-software/enchanted-icons/dist/carbon/es/retry--failed';
import VideoIcon from '@hcl-software/enchanted-icons/dist/carbon/es/video';
import DOCIcon from '@hcl-software/enchanted-icons/dist/carbon/es/DOC';
import XLSIcon from '@hcl-software/enchanted-icons/dist/carbon/es/XLS';
import PDFIcon from '@hcl-software/enchanted-icons/dist/carbon/es/PDF';
import PPTIcon from '@hcl-software/enchanted-icons/dist/carbon/es/PPT';
import TIFIcon from '@hcl-software/enchanted-icons/dist/carbon/es/TIF';
import GIFIcon from '@hcl-software/enchanted-icons/dist/carbon/es/GIF';
import SVGIcon from '@hcl-software/enchanted-icons/dist/carbon/es/SVG';
import JPGIcon from '@hcl-software/enchanted-icons/dist/carbon/es/JPG';
import PNGIcon from '@hcl-software/enchanted-icons/dist/carbon/es/PNG';
import {
  EnumUploadStatus, IProgressState, Literals, ProgressBarLocalization, ProgressItemType,
} from './ProgressBar';
import CircularProgress from '../../ProgressIndicator/CircularProgress';
import IconButton from '../../IconButton';
import Avatar, { AvatarColors, AvatarTypes } from '../../Avatar';
import Tooltip from '../../Tooltip';
import Button from '../../Button';
import Typography from '../../Typography';
import List from '../../List';
import ListItem from '../../List/ListItem';
import ListItemText from '../../List/ListItemText';
import ListItemIcon from '../../List/ListItemIcon';
import ListItemButton, { ListSizes } from '../../List/ListItemButton';
import ListItemAvatar from '../../List/ListItemAvatar';

enum ItemTypes {
  IMAGE = 'image',
  VIDEO = 'video',
  APPLICATION = 'application',
}

enum ItemApplicationFormat {
  DOC = 'doc',
  DOCX = 'docx',
  XLS = 'xls',
  XLSX = 'xlsx',
  PDF = 'pdf',
  PPT = 'ppt',
  PPTX = 'pptx',
}

enum ItemImageFormat {
  WEBP = 'webp',
  SVG = 'svg',
  PNG = 'png',
  GIF = 'gif',
  TIF = 'tif',
  TIFF = 'tiff',
  JPG = 'jpg',
  JPEG = 'jpeg',
}

enum ItemVideoFormat {
  WEBM = 'webm',
  MP4 = 'mp4',
  OGV = 'ogv',
}

interface ProgressItemsProps {
  file: IProgressState[];
  retryUploadItem?(queueItem: IProgressState): void;
  cancelItem?(queueItem: IProgressState): void;
  navigateFolder?(queueItem: IProgressState): void;
  literals: Literals;
  learnMoreOnFailure(event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void;
  translation?: ProgressBarLocalization | undefined;
  direction?: 'ltr' | 'rtl';
}

/**
 * StyledList component is a customized version of the List component from Material-UI.
 * It applies custom styling to the List and its child components.
 */
const StyledList = styled(List)((props) => {
  const { theme } = props;
  return ({
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[6],
    maxHeight: '305px',
    width: '360px',
    overflowY: 'scroll',
    '.MuiListItem-root': {
      '.MuiListItemButton-root': {
        '.MuiListItemText-root': {
          '& .MuiListItemText-primary': {
            maxWidth: '252px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          },
          '& .MuiListItemText-secondary': {
            maxWidth: '252px',
            '& span:not(.file-size)': {
              display: 'inline',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            },
          },
          '[data-testid=pending-item-text-primary]': {
            color: theme.palette.text.disabled,
          },
          '& p': {
            ...theme.typography.caption,
            '[data-testid=upload-status-label]': {
              color: theme.palette.success.main,
            },
            '[data-testid=failed-status-label]': {
              color: theme.palette.error.main,
            },
            '[data-testid=pending-item-text-secondary]': {
              color: theme.palette.text.disabled,
            },
            '[data-testid=learn-more-button]': {
              background: 'none',
              color: theme.palette.primary.main,
              '&:hover': {
                background: 'none',
              },
            },
          },
        },
        '&:hover .MuiListItemText-primary, &:hover .MuiListItemText-secondary': {
          width: 'unset',
        },
        '.MuiListItemIcon-root': {
          '.MuiSvgIcon-root': {
            '&[data-mui-test=warningIcon]': {
              color: theme.palette.error.main,
            },
            '&[data-mui-test=checkmark--outlineIcon]': {
              color: theme.palette.success.main,
            },
            '[data-testid=progressRoot]': {
              '[data-testid=progressCircle]': {
                color: theme.palette.primary.main,
              },
            },
          },
        },
      },
      '.MuiListItemButton-root.disabled-hover': {
        pointerEvents: 'none !important',
        backgroundColor: 'transparent !important',
        '&:hover': {
          backgroundColor: 'transparent !important',
        },
      },
    },
  });
});

/**
 * @component Renders the progress items component.
 * @param {ProgressItemProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
const ProgressItems = (props: ProgressItemsProps) => {
  const {
    file, retryUploadItem, cancelItem, navigateFolder, literals, learnMoreOnFailure, translation, direction = 'ltr',
  } = props;
  const isRTL = direction === 'rtl';
  const [hover, setHover] = useState<string | null>(null);
  const [focus, setFocus] = useState<string | null>(null);

  let folderId = '';

  /**
   * Renders the progress indicator based on the upload status and progress.
   * @returns The progress indicator component based on the upload status and progress.
   */
  const renderProgressIndicator = (status: string, progress: number) => {
    if (status === EnumUploadStatus.SUCCESS) {
      return <SuccessIcon />;
    } if (status === EnumUploadStatus.PROGRESS || status === EnumUploadStatus.PENDING) {
      return (
        <CircularProgress
          variant="determinate"
          value={progress}
          size={16}
        />
      );
    } if (status === EnumUploadStatus.FAILURE) {
      return <WarningIcon />;
    }
    return '';
  };

  /**
   * Renders the hover icon based on the status of the queue item.
   * @param {IProgressState} queueItem - The queue item to render the hover icon for.
   * @returns {React.ReactNode} - The rendered hover icon.
   */
  const renderHoverIcon = (queueItem: IProgressState): React.ReactNode => {
    if (queueItem.status === EnumUploadStatus.SUCCESS && navigateFolder) {
      return (
        <Tooltip
          title={translation?.navigateButtonTooltip}
          tooltipsize="small"
          placement="left"
          PopperProps={{
            disablePortal: true,
          }}
          componentsProps={{
            tooltip: {
              sx: {
                whiteSpace: 'nowrap',
              },
            },
          }}
        >
          <IconButton
            data-testid="navigate-folder"
            onClick={() => { return navigateFolder(queueItem); }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                navigateFolder(queueItem);
              }
            }}
          >
            <FoldersIcon />
          </IconButton>
        </Tooltip>
      );
    } if ((queueItem.status === EnumUploadStatus.PROGRESS || queueItem.status === EnumUploadStatus.PENDING) && cancelItem) {
      return (
        <Tooltip
          title={translation?.errorButtonTooltip}
          tooltipsize="small"
          placement="left"
          PopperProps={{
            disablePortal: true,
          }}
          componentsProps={{
            tooltip: {
              sx: {
                whiteSpace: 'nowrap',
              },
            },
          }}
        >
          <IconButton
            data-testid="cancel-upload"
            onClick={() => { return cancelItem(queueItem); }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                cancelItem(queueItem);
              }
            }}
          >
            <ErrorIcon />
          </IconButton>
        </Tooltip>
      );
    } if (queueItem.status === EnumUploadStatus.FAILURE && retryUploadItem) {
      return (
        <Tooltip
          title={translation?.retryButtonTooltip}
          tooltipsize="small"
          placement="left"
          PopperProps={{
            disablePortal: true,
          }}
          componentsProps={{
            tooltip: {
              sx: {
                whiteSpace: 'nowrap',
              },
            },
          }}
        >
          <IconButton
            data-testid="retry-upload"
            onClick={() => { retryUploadItem(queueItem); }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                retryUploadItem(queueItem);
              }
            }}
          >
            <RetryFailedIcon />
          </IconButton>
        </Tooltip>
      );
    }
    return null;
  };

  /**
   * @param fileSize
   * @return {convertedFileSize}
   * This function takes in file size value(type: number) as argument and converts the value(in bytes) to KB/MB/GB/TB
   * returns the value in type string (using Bytes/KB/MB/GB/TB accordingly)
   */
  const fileSizeValueConverter = (fileSize: number): string => {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    let i = 0;
    if (fileSize <= 0) return '0';
    i = Math.floor(Math.log(fileSize) / Math.log(1024));
    if (i === 0) return `${fileSize} ${sizes[i]}`;
    const filesize = (fileSize / (1024 ** i)).toFixed(1);
    const formattedFileSize = new Intl.NumberFormat().format(parseFloat(filesize));
    const fileSizeWithUnit = `${formattedFileSize} ${sizes[i]}`;
    return fileSizeWithUnit;
  };

  /**
   * Returns the avatar icon based on the file type.
   * @param itemTitle - The title of the item.
   * @returns An object containing the icon image.
   */
  const getAvatarByFileType = (itemTitle: string): { iconImage: React.ReactNode } => {
    let itemType = '';
    let itemExtension = '';
    if (itemTitle) {
      itemExtension = itemTitle.substring(itemTitle.lastIndexOf('.') + 1).toLowerCase();
    }
    if (Object.values(ItemApplicationFormat).includes(itemExtension as ItemApplicationFormat)) {
      itemType = ItemTypes.APPLICATION;
    } else if (Object.values(ItemImageFormat).includes(itemExtension as ItemImageFormat)) {
      itemType = ItemTypes.IMAGE;
    } else if (Object.values(ItemVideoFormat).includes(itemExtension as ItemVideoFormat)) {
      itemType = ItemTypes.VIDEO;
    }

    if (itemType === ItemTypes.VIDEO) {
      return {
        iconImage: <VideoIcon data-testid="videoIcon" />,
      };
    } if (itemType === ItemTypes.IMAGE) {
      switch (itemExtension) {
        case ItemImageFormat.TIFF:
        case ItemImageFormat.TIF:
          return {
            iconImage: <TIFIcon data-testid="TIFIcon" />,
          };
        case ItemImageFormat.GIF:
          return {
            iconImage: <GIFIcon data-testid="GIFIcon" />,
          };
        case ItemImageFormat.SVG:
          return {
            iconImage: <SVGIcon data-testid="SVGIcon" />,
          };
        case ItemImageFormat.JPG:
        case ItemImageFormat.JPEG:
          return {
            iconImage: <JPGIcon data-testid="JPGIcon" />,
          };
        case ItemImageFormat.PNG:
          return {
            iconImage: <PNGIcon data-testid="PNGIcon" />,
          };
        default:
          return {
            iconImage: <ImageIcon data-testid="imageIcon" />,
          };
      }
    } if (itemType === ItemTypes.APPLICATION) {
      switch (itemExtension) {
        case ItemApplicationFormat.PDF:
          return {
            iconImage: <PDFIcon data-testid="PDFIcon" />,
          };
        case ItemApplicationFormat.XLS:
        case ItemApplicationFormat.XLSX:
          return {
            iconImage: <XLSIcon data-testid="XLSIcon" />,
          };
        case ItemApplicationFormat.PPT:
        case ItemApplicationFormat.PPTX:
          return {
            iconImage: <PPTIcon data-testid="PPTIcon" />,
          };
        default:
          return {
            iconImage: <DOCIcon data-testid="DOCIcon" />,
          };
      }
    }
    return {
      iconImage: undefined,
    };
  };

  return (
    <StyledList>
      {Array.from(file).map((queueItem: IProgressState) => {
        const showLearnMoreButton = queueItem && queueItem.showLearnMore !== undefined ? queueItem.showLearnMore : false;
        if (queueItem.type === ProgressItemType.Folder) {
          folderId = queueItem.collectionId;
        }
        const { iconImage } = getAvatarByFileType(queueItem.name);
        return (
          <React.Fragment key={`${queueItem.name}_${queueItem.timestamp}`}>
            <ListItem
              disablePadding
              sx={{ paddingLeft: (queueItem.type !== ProgressItemType.Folder && folderId === queueItem.collectionId) ? '8px' : '0px' }}
              hasBorder
            >
              <ListItemButton
                size={ListSizes.SMALL}
                secondaryActionButton={renderHoverIcon(queueItem)}
                onMouseEnter={() => { return setHover(`${queueItem.name}_${queueItem.timestamp}`); }}
                onMouseLeave={() => { return setHover(null); }}
                onFocus={() => { return setFocus(`${queueItem.name}_${queueItem.timestamp}`); }}
                onBlur={() => { return setFocus(null); }}
                disabledHover={queueItem.status === EnumUploadStatus.CANCELLED}
              >
                {queueItem.status === EnumUploadStatus.SUCCESS
                  ? (
                    <ListItemAvatar>
                      <Avatar
                        iconImage={queueItem.type === ProgressItemType.Folder ? <FolderIcon /> : iconImage}
                        color={AvatarColors.DEFAULT}
                        variant="rounded"
                        type={AvatarTypes.ICON}
                        style={{ height: '24px', width: '24px' }}
                      />
                    </ListItemAvatar>
                  ) : (
                    <ListItemAvatar>
                      <Avatar
                        iconImage={queueItem.type === 'folder' ? <FolderIcon /> : iconImage}
                        color={AvatarColors.DEFAULT}
                        variant="rounded"
                        type={AvatarTypes.ICON}
                        style={{ height: '24px', width: '24px', opacity: 0.38 }}
                      />
                    </ListItemAvatar>
                  )}
                {queueItem.status !== EnumUploadStatus.PENDING
                  ? (
                    <ListItemText
                      primary={(
                        <Tooltip
                          title={queueItem.name}
                          tooltipsize="small"
                          placement="left"
                          PopperProps={{
                            disablePortal: true,
                          }}
                          componentsProps={{
                            tooltip: {
                              sx: {
                                whiteSpace: 'nowrap',
                              },
                            },
                          }}
                        >
                          <span>{queueItem.name}</span>
                        </Tooltip>
                      )}
                      secondary={(
                        <>
                          {queueItem.type !== 'folder' && (
                            <span style={{ [isRTL ? 'marginLeft' : 'marginRight']: '8px' }} data-testid="file-size" className="file-size">
                              {`${fileSizeValueConverter(queueItem.size)}`}
                            </span>
                          )}
                          {queueItem.status === EnumUploadStatus.SUCCESS && (
                            <span data-testid="upload-status-label">
                              {!queueItem.message ? translation?.successLabel : queueItem.message}
                            </span>
                          )}
                          {queueItem.status === EnumUploadStatus.PROGRESS && (
                            <span>{translation?.progressLabel}</span>
                          )}
                          {queueItem.status === EnumUploadStatus.CANCELLED && (
                            <span>{translation?.cancelledLabel}</span>
                          )}
                          {queueItem.status === EnumUploadStatus.FAILURE && (
                            <Tooltip title={queueItem.message} tooltipsize="small">
                              <span
                                data-testid="failed-status-label"
                                style={{
                                  maxWidth: showLearnMoreButton ? '134px' : '252px',
                                }}
                              >
                                {!queueItem.message ? translation?.failureLabel : queueItem.message}
                              </span>
                            </Tooltip>
                          )}
                          {showLearnMoreButton && (
                            <Tooltip
                              title={literals.learnMoreLabel}
                              tooltipsize="small"
                              placement="left"
                              PopperProps={{
                                disablePortal: true,
                              }}
                              componentsProps={{
                                tooltip: {
                                  sx: {
                                    whiteSpace: 'nowrap',
                                  },
                                },
                              }}
                            >
                              <Button
                                style={{ marginLeft: '4px', padding: '0px 3px 3px 3px' }}
                                onClick={learnMoreOnFailure}
                                onKeyDown={(event) => {
                                  if (event.key === 'Enter') {
                                    learnMoreOnFailure(event);
                                  }
                                }}
                                data-testid="learn-more-button"
                              >
                                <Typography variant="caption">{literals.learnMoreLabel}</Typography>
                              </Button>
                            </Tooltip>
                          )}
                        </>
                      )}
                    />
                  ) : (
                    <ListItemText
                      primary={(
                        <Tooltip
                          title={queueItem.name}
                          tooltipsize="small"
                          placement="left"
                          PopperProps={{
                            disablePortal: true,
                          }}
                        >
                          <span data-testid="pending-item-text-primary">
                            {queueItem.name}
                          </span>
                        </Tooltip>
                      )}
                      secondary={(
                        <>
                          {queueItem.type !== 'folder' && (
                            <span style={{ [isRTL ? 'marginLeft' : 'marginRight']: '8px' }} className="file-size" data-testid="pending-item-text-secondary">
                              {`${fileSizeValueConverter(queueItem.size)}`}
                            </span>
                          )}
                          <span>{translation?.pendingLabel}</span>
                        </>
                      )}
                    />
                  )}
                <ListItemIcon
                  data-testid="progress-indicator"
                  style={
                    renderHoverIcon(queueItem) !== null
                    && (hover === `${queueItem.name}_${queueItem.timestamp}` || focus === `${queueItem.name}_${queueItem.timestamp}`)
                      ? { [isRTL ? 'marginLeft' : 'marginRight']: '28px' }
                      : { [isRTL ? 'marginLeft' : 'marginRight']: '0px' }
                  }
                >
                  {renderProgressIndicator(queueItem.status, queueItem.progress)}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </React.Fragment>
        );
      })}
    </StyledList>
  );
};

export default ProgressItems;
