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
import MuiSnackbar, { SnackbarProps as MuiSnackbarProps } from '@mui/material/Snackbar';
import { Components, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import CloseIcon from '@hcl-software/enchanted-icons/dist/carbon/es/close';
import WarningIcon from '@hcl-software/enchanted-icons/dist/carbon/es/warning--alt';
import ErrorIcon from '@hcl-software/enchanted-icons/dist/carbon/es/warning';
import InformationIcon from '@hcl-software/enchanted-icons/dist/carbon/es/information';
import SuccessIcon from '@hcl-software/enchanted-icons/dist/carbon/es/checkmark--outline';
import NotificationIcon from '@hcl-software/enchanted-icons/dist/carbon/es/notification';
import Button from '../Button';
import IconButton, { IconButtonVariants } from '../IconButton';
import Typography from '../Typography';
import CircularProgress, { CircularProgressVariants } from '../ProgressIndicator/CircularProgress';
import Tooltip from '../Tooltip';

export enum SnackbarVariants {
  WARNING = 'warning',
  INFO = 'information',
  ERROR = 'error',
  SUCCESS = 'success',
  PROGRESS = 'progress'
}

export enum SnackbarTestIds {
  SNACKBAR_ICON = 'snackbarIcon',
  SNACKBAR_MESSAGE = 'snackbarMessage',
  SNACKBAR_CLOSE = 'snackbarClose',
  SNACKBAR_BUTTON = 'snackbarButton',
  SNACKBAR_PLACEHOLDER_ICON = 'snackbarPlaceholderIcon',
}

export const getMuiSnackbarThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiSnackbar: {
      styleOverrides: {
        root: ({ theme }) => {
          return ({
            ...theme.typography.body2,
            position: 'static',
            bottom: 'unset',
            right: 'unset',
            left: 'unset',
            marginTop: '5px',
            boxSizing: 'border-box',
            maxWidth: 'inherit',
            justifyContent: 'flex-start',
            background: theme.palette.background.dark,
            borderRadius: '4px',
            boxShadow: theme.shadows[6],
            color: theme.palette.text.tertiary1,
            display: 'flex',
            alignItems: 'flex-start',
            minHeight: '36px',
            padding: '8px 12px 0 12px',
            '.MuiBox-root': {
              display: 'contents',
              position: 'relative',
              '[data-testid=progressRoot]': {
                margin: '2px 8px 8px 0',
                padding: 0,
                display: 'block',
                width: '16px',
                height: '16px',
                minWidth: '16px',
                '[data-testid=progressCircle]': {
                  color: theme.palette.primary.inverse,
                },
                '[data-testid=progressTrail]': {
                  color: theme.palette.background.inverse,
                },
              },
              '.MuiSvgIcon-root': { // styles the snackbar leading icon
                '&[data-mui-test=informationIcon]': {
                  color: theme.palette.primary.inverse,
                },
                '&[data-mui-test=warningIcon]': {
                  color: theme.palette.error.inverse, // used for error state as per design
                },
                '&[data-mui-test=warning--altIcon]': {
                  color: theme.palette.warning.inverse, // used for actual warning state as per design
                },
                '&[data-mui-test=checkmark--outlineIcon]': {
                  color: theme.palette.success.inverse,
                },
                // higher degree of specificity that will not affect other svg icons under an IconButton parent with actions inside this Snackbar
                '&[data-mui-test=informationIcon],&[data-mui-test=warningIcon],&[data-mui-test=warning--altIcon],&[data-mui-test=checkmark--outlineIcon]': {
                  height: '16px',
                  width: '16px',
                  margin: '2px 8px 8px 2px',
                  padding: 0,
                },
              },
              '.MuiTypography-root': { // styles the snackbar message
                margin: '2px 8px 8px 0',
                padding: '0',
                wordBreak: 'break-word',
                width: '100%',
                color: theme.palette.action.inverse,
              },
              '.MuiButton-root': { // styles the snackbar main action button
                ...theme.typography.subtitle2,
                color: theme.palette.primary.inverse,
                ':disabled': {
                  color: theme.palette.text.disabledInverse,
                },
                '&[data-testid=snackbarButton]': {
                  backgroundColor: 'inherit',
                  border: 'none',
                  margin: '0 4px 8px 0',
                  outline: 'none',
                  padding: '2px 6px',
                  textTransform: 'none',
                  minWidth: '55px',
                  wordBreak: 'normal',
                  overflowWrap: 'anywhere',
                  position: 'relative',
                  '&:hover': {
                    backgroundColor: theme.palette.action.hoverInverse,
                    borderRadius: '2px',
                  },
                  '&:focus': {
                    border: `1px solid ${theme.palette.primary.inverse} !important`,
                    borderRadius: '2px',
                    padding: '1px 5px',
                  },
                },
              },
              '.MuiIconButton-root': { // styles the snackbar trailing placeholder icon and close icon
                marginTop: '-4px',
                marginRight: '0px',
                padding: 0,
                '&:hover': {
                  backgroundColor: theme.palette.action.hoverInverse,
                },
                '&:focus': {
                  '.MuiSvgIcon-root': {
                    border: `1px solid ${theme.palette.primary.inverse}`,
                  },
                },
                '&[data-testid=snackbarPlaceholderIcon]': {
                  position: 'relative',
                },
                '&[data-testid=snackbarPlaceholderIcon] .MuiSvgIcon-root': {
                  color: theme.palette.action.inverse,
                },
                '&:last-of-type': {
                  marginTop: '-4px',
                  marginRight: 0,
                  padding: 0,
                  position: 'relative',
                },
                '.MuiSvgIcon-root': {
                  '&[data-mui-test=closeIcon]': {
                    color: theme.palette.action.inverse,
                  },
                },
                '&:disabled': {
                  '&[data-testid=snackbarPlaceholderIcon] .MuiSvgIcon-root': {
                    color: theme.palette.action.disabledInverse,
                  },
                  '.MuiSvgIcon-root': {
                    '&[data-mui-test=closeIcon]': {
                      color: theme.palette.action.disabledInverse,
                    },
                  },
                },
              },
            },
          });
        },
      },
    },
  };
};

/**
 * @typedef SnackbarProps
 * @type {object}
 * @property {SnackbarVariants} variant - The variant to use that will determine leading icon in snackbar.
 * @property {boolean} disabledSnackbar - Renders snackbar buttons as disabled
 * @property {string} buttonText - Text to show inside action Button. If empty string or no corresponding buttonAction function, it will hide itself.
 * @property {Function} buttonAction - Callback fired when action Button is clicked.
 * @property {Function} onClose - Callback fired when the component requests to be closed.
 * @property {JSX.Element} placeholderIcon - The icon button shown that provides additional functionality or action to the snackbar.
 * @property {Function} placeholderIconAction - Callback fired when placeholder icon button is clicked.
 * @property {boolean} showPlaceholderIcon - Used to toggle visibility of placeholder icon.
 * @property {CircularProgressVariants} progressVariant - This will only affect component when the variant is in progress. Choose what variant of CircularProgress to use.
 * @property {boolean} progressValue - The value of the progress indicator for the determinate variant. Value between 0 and 100.
 */
export type SnackbarProps = MuiSnackbarProps & {
  variant: SnackbarVariants,
  disabledSnackbar: boolean,
  buttonText?: string,
  buttonTextToolTip?: string,
  buttonAction: Function,
  onClose: Function,
  placeholderIcon?: JSX.Element,
  placeholderIconAction: Function,
  showPlaceholderIcon?: boolean,
  progressVariant?: CircularProgressVariants,
  progressValue?: number,
  closeIconToolTip?: string,
}

const Snackbar = ({ ...props }: SnackbarProps) => {
  const {
    disabledSnackbar, buttonAction, buttonText, // these 3 props handle main action Button in design
    placeholderIcon, placeholderIconAction, showPlaceholderIcon, // these 3 props handle placeholder IconButton in design
    progressVariant, progressValue, // these 2 props handle progress indicator
    ...rest // Do not put trailing comma here
  } = props;

  /**
   * Gets default icon for snackbar based on the status or type of notification
   * @param statusType Optional parameter to determine the status of notification
   * @returns A component of icon
   */
  const getStatusIcon = (statusType?: SnackbarVariants): JSX.Element => {
    switch (statusType) {
      case SnackbarVariants.ERROR: return (<ErrorIcon data-testid={SnackbarTestIds.SNACKBAR_ICON} />);
      case SnackbarVariants.WARNING: return (<WarningIcon data-testid={SnackbarTestIds.SNACKBAR_ICON} />);
      case SnackbarVariants.INFO: return (<InformationIcon data-testid={SnackbarTestIds.SNACKBAR_ICON} />);
      case SnackbarVariants.SUCCESS: return (<SuccessIcon data-testid={SnackbarTestIds.SNACKBAR_ICON} />);
      case SnackbarVariants.PROGRESS: return (progressVariant === CircularProgressVariants.DETERMINATE
        ? <CircularProgress variant={CircularProgressVariants.DETERMINATE} size={16} value={progressValue} />
        : <CircularProgress variant={CircularProgressVariants.INDETERMINATE} size={16} />);
      default: return (<NotificationIcon data-testid={SnackbarTestIds.SNACKBAR_ICON} />);
    }
  };

  return (
    <MuiSnackbar {...rest}>
      <Box>
        { getStatusIcon(rest.variant) }
        <Typography
          variant="body2"
          data-testid={SnackbarTestIds.SNACKBAR_MESSAGE}
          {...buttonText && { 'data-buttontext': buttonText }}
          {...showPlaceholderIcon && { 'data-hasplaceholdericon': 'true' }}
        >
          {rest.message}
        </Typography>
        { buttonText
          && (
            <Tooltip title={props.buttonTextToolTip}>
              <Button
                data-testid={SnackbarTestIds.SNACKBAR_BUTTON}
                onClick={() => { buttonAction(); }}
                disabled={disabledSnackbar}
                aria-disabled={disabledSnackbar}
                {...showPlaceholderIcon && { 'data-hasplaceholdericon': 'true' }}
              >
                {buttonText}
              </Button>
            </Tooltip>
          )}
        { (showPlaceholderIcon && React.isValidElement(placeholderIcon))
          && (
            <IconButton
              data-testid={SnackbarTestIds.SNACKBAR_PLACEHOLDER_ICON}
              onClick={() => { placeholderIconAction(); }}
              disabled={disabledSnackbar}
              aria-disabled={disabledSnackbar}
              variant={IconButtonVariants.WITH_PADDING}
            >
              {placeholderIcon}
            </IconButton>
          )}
        <Tooltip title={props.closeIconToolTip}>
          <IconButton
            onClick={(e) => { rest.onClose(e, 'clickaway'); }} // 2nd arg is just to provide a SnackbarCloseReason for typecheck
            disabled={disabledSnackbar}
            aria-disabled={disabledSnackbar}
            variant={IconButtonVariants.WITH_PADDING}
          >
            <CloseIcon data-testid={SnackbarTestIds.SNACKBAR_CLOSE} />
          </IconButton>
        </Tooltip>
      </Box>
    </MuiSnackbar>
  );
};

Snackbar.defaultProps = {
  variant: SnackbarVariants.INFO,
  disabledSnackbar: false,
  progressVariant: CircularProgressVariants.INDETERMINATE,
  progressValue: 0,
  /* eslint-why user defined functions, defaults only put in place to prevent tsc could be undefined warning */
  /* eslint-disable no-empty-function */
  buttonAction: () => {},
  placeholderIconAction: () => {},
  onClose: () => {},
  /* eslint-enable no-empty-function */
  showPlaceholderIcon: false,
  closeIconToolTip: 'Close',
};

export * from '@mui/material/Snackbar';
export default Snackbar;
