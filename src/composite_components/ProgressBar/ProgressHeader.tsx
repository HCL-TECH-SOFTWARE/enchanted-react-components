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
import { Box, styled } from '@mui/material';
import ChevronDownIcon from '@hcl-software/enchanted-icons/dist/carbon/es/chevron--down';
import ChevronUpIcon from '@hcl-software/enchanted-icons/dist/carbon/es/chevron--up';
import CloseIcon from '@hcl-software/enchanted-icons/dist/carbon/es/close';
import SuccessIcon from '@hcl-software/enchanted-icons/dist/carbon/es/checkmark--outline';
import WarningIcon from '@hcl-software/enchanted-icons/dist/carbon/es/warning';
import Typography from '../../Typography';
import IconButton from '../../IconButton';
import CircularProgress from '../../ProgressIndicator/CircularProgress';
import { Literals, ProgressBarLocalization } from './ProgressBar';
import Button from '../../Button';
import Tooltip from '../../Tooltip';

/**
 * StyledHeader component for the UploadProgressBar.
 * @param {BoxProps} props - The props for the component.
 * @returns {Object} - The styled component.
 */
const StyledHeader = styled(Box)((props) => {
  const { theme } = props;
  return ({
    ...theme.typography.body2,
    position: 'static',
    boxSizing: 'border-box',
    width: '360px',
    maxWidth: 'inherit',
    justifyContent: 'space-between',
    background: theme.palette.background.dark,
    boxShadow: theme.shadows[6],
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
    height: '36px',
    padding: '8px 12px 8px 12px',
    '.MuiBox-root': {
      display: 'flex',
      alignItems: 'center',
      '&[data-testid=wrapper]': {
        marginRight: '8px',
        '[data-testid=progressRoot]': {
          display: 'block',
          marginRight: '8px',
          '[data-testid=progressCircle]': {
            color: theme.palette.primary.inverse,
          },
          '[data-testid=progressTrail]': {
            color: theme.palette.background.inverse,
          },
        },
        // styles the leading icon
        '.MuiSvgIcon-root': {
          '&[data-mui-test=checkmark--outlineIcon]': {
            color: theme.palette.success.inverse,
          },
          '&[data-mui-test=warningIcon]': {
            color: theme.palette.error.inverse,
          },
          '&[data-mui-test=warningIcon],&[data-mui-test=checkmark--outlineIcon]': {
            height: '16px',
            width: '16px',
            margin: '2px 8px 2px 0px',
          },
        },
        // styles the upload status message
        '.MuiTypography-root': {
          padding: '2px 0px 2px 0px',
          wordBreak: 'break-word',
          color: theme.palette.action.inverse,
        },
      },
      '&[data-testid=end-actions]': {
        // styles the optional action button
        '.MuiButton-root': {
          ...theme.typography.subtitle2,
          color: theme.palette.primary.inverse,
          '&[data-testid=pauseButton], &[data-testid=cancelAllButton]': {
            backgroundColor: 'inherit',
            border: 'none',
            marginRight: '8px',
            outline: 'none',
            padding: '2px 4px',
            textTransform: 'none',
            minWidth: 'auto',
            wordBreak: 'normal',
            overflowWrap: 'anywhere',
            position: 'relative',
            '&:hover': {
              backgroundColor: theme.palette.action.hoverInverse,
              borderRadius: '2px',
            },
            '&:focus': {
              outline: `1px solid ${theme.palette.primary.inverse}`,
              borderRadius: '2px',
            },
          },
        },
        // styles the chevron icon and close icon
        '.MuiIconButton-root': {
          '&:hover': {
            backgroundColor: theme.palette.action.hoverInverse,
          },
          '&:focus': {
            '.MuiSvgIcon-root': {
              border: `1px solid ${theme.palette.primary.inverse}`,
            },
          },
          '.MuiSvgIcon-root': {
            color: theme.palette.action.inverse,
          },
        },
      },
    },
  });
});

interface progressHeaderProps {
  totalPercentage: number;
  uploadStatus: string;
  closeModal(event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void;
  stringLiterals: Literals;
  cancelAll?: Function;
  pauseButton?: Function;
  translation?: ProgressBarLocalization | undefined;
  expanded: boolean;
  toggleButtonClick(): void;
}

/**
 * Represents the ProgressHeader component.
 * @param props - The props for the ProgressHeader component.
 * @returns The rendered ProgressHeader component.
 */
const ProgressHeader = (props: progressHeaderProps) => {
  const {
    totalPercentage, uploadStatus, closeModal, stringLiterals,
    cancelAll, pauseButton, translation, expanded, toggleButtonClick,
  } = props;

  /**
   * Renders an icon based on the total percentage value.
   * @returns The icon component based on the total percentage value.
   */
  const renderIcon = () => {
    let statusIcon;
    if (totalPercentage != null) {
      if (totalPercentage === 0) {
        statusIcon = <WarningIcon />;
      } else if (totalPercentage === 100) {
        statusIcon = <SuccessIcon />;
      } else {
        statusIcon = (
          <CircularProgress
            variant="determinate"
            value={totalPercentage}
            size={16}
          />
        );
      }
    }
    return statusIcon;
  };

  return (
    <StyledHeader style={{ borderRadius: expanded ? '4px 4px 0px 0px' : '4px' }}>
      <Box data-testid="wrapper">
        {renderIcon()}
        <Typography variant="body2">
          {uploadStatus}
        </Typography>
      </Box>
      <Box data-testid="end-actions">
        {pauseButton
          && (
            <Button
              data-testid="pauseButton"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                if (pauseButton) pauseButton();
              }}
            >
              {stringLiterals.pauseButtonLabel}
            </Button>
          )}
        {cancelAll
          && (
            <Button
              data-testid="cancelAllButton"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                if (cancelAll) cancelAll();
              }}
            >
              {stringLiterals.cancelAllLabel}
            </Button>
          )}
        <Box>
          {expanded && (
            <Tooltip title={translation?.collapseTooltip} tooltipsize="small">
              <IconButton
                data-testid="collapseIconButton"
                onClick={toggleButtonClick}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    toggleButtonClick();
                  }
                }}
              >
                <ChevronUpIcon />
              </IconButton>
            </Tooltip>
          )}
          {!expanded && (
            <Tooltip title={translation?.expandTooltip} tooltipsize="small">
              <IconButton
                data-testid="expandIconButton"
                onClick={toggleButtonClick}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    toggleButtonClick();
                  }
                }}
              >
                <ChevronDownIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Tooltip title={translation?.closeButtonTooltip} tooltipsize="small">
          <IconButton
            onClick={closeModal}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                closeModal(e);
              }
            }}
            data-testid="close-button"
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </StyledHeader>
  );
};

export default ProgressHeader;
