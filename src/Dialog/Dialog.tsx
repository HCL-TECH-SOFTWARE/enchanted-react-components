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
import CloseIcon from '@hcl-software/enchanted-icons/dist/carbon/es/close';
import MuiDialog, { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import { Components, Theme, Grid } from '@mui/material';
import IconButton from '../IconButton';
import DialogTitle from './DialogTitle';
import DialogContent from './DialogContent';
import DialogActions from './DialogActions';
import Backdrop from '../Backdrop';
import Tooltip from '../Tooltip';

export enum DialogSizes {
  EXTRA_SMALL = 'XS',
  SMALL = 'SM',
  MEDIUM = 'MD',
  LARGE = 'LG',
  EXTRA_LARGE = 'XL',
}

export enum DialogTestIds {
  DIALOG_TITLE = 'dialogTitle',
  DIALOG_CONTENT = 'dialogContent',
  DIALOG_ACTIONS = 'dialogActions',
  DIALOG_CLOSE_ICON = 'dialogCloseIcon',
}

export const getMuiDialogThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiDialog: {
      styleOverrides: {
        paper: ({ ownerState }) => { // refers to .MuiDialog-paper https://mui.com/material-ui/api/dialog/#css
          return ({
            padding: 0,
            width: 'calc(100% - 64px)',
            ...ownerState.size === DialogSizes.EXTRA_SMALL && {
              maxWidth: '444px',
            },
            ...ownerState.size === DialogSizes.SMALL && {
              maxWidth: '600px',
            },
            ...ownerState.size === DialogSizes.MEDIUM && {
              maxWidth: '960px',
            },
            ...ownerState.size === DialogSizes.LARGE && {
              maxWidth: '1280px',
            },
            ...ownerState.size === DialogSizes.EXTRA_LARGE && {
              maxWidth: '1920px',
            },
          });
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: ({ theme }) => {
          return ({
            display: 'flex',
            justifyContent: 'space-between',
            padding: '12px',
            '.MuiGrid-root': {
              '.MuiTypography-root': {
                ...theme.typography.h6, // Styles all Typography under DialogTitle as h6 no matter what as per Figma design
              },
            },
            '.MuiIconButton-root': {
              position: 'absolute',
              right: 12,
              top: 12,
            },
          });
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '8px 12px',
          '> :not(:first-of-type)': {
            marginLeft: '12px',
          },
        },
      },
    },
  };
};

/**
 * @typedef DialogProps
 * @type {object}
 * @property {React.ReactNode} headerChildren - Node to render inside DialogTitle
 * @property {React.ReactNode} contentChildren - Node to render inside DialogContent
 * @property {React.ReactNode} footerChildren - Node to render inside DialogActions
 * @property {DialogSizes} size - Sets min-width and max-width of Dialog
 * @property {boolean} withPadding - Adds default padding of 12px all around DialogContent if set to `true`
 * @property {Function} onClose - Callback fired when the component requests to be closed.
 * @property {Function} hideHeader - Toggles header or DialogTitle, if `true`, then it is hidden
 * @property {Function} hideFooter - Toggles footer or DialogActions, if `true`, then it is hidden
 */
export type DialogProps = MuiDialogProps & {
  headerChildren?: React.ReactNode,
  contentChildren?: React.ReactNode,
  footerChildren?: React.ReactNode,
  size?: DialogSizes,
  withPadding?: boolean,
  onClose: Function,
  hideHeader?: boolean,
  hideFooter?: boolean,
  closeIconToolTip?: string,
}

const Dialog = ({ ...props }: DialogProps) => {
  const {
    headerChildren, footerChildren, contentChildren, withPadding,
    hideHeader, hideFooter, ...rest
  } = props;

  return (
    <MuiDialog
      {...rest}
      maxWidth={false} // size prop should take priority
      components={{ Backdrop }}
    >
      { (headerChildren && !hideHeader)
        && (
          <DialogTitle data-testid={DialogTestIds.DIALOG_TITLE}>
            <Grid>{headerChildren}</Grid>
            <Tooltip title={props.closeIconToolTip}>
              <IconButton
                aria-label="close"
                onClick={(e) => { rest.onClose(e, 'backdropClick'); }}
                data-testid={DialogTestIds.DIALOG_CLOSE_ICON}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </DialogTitle>
        )}
      <DialogContent
        sx={(theme) => {
          return {
            padding: withPadding ? '12px' : 0,
            borderTop: !hideHeader ? `1px solid ${theme.palette.border.secondary}` : 'none', // styles the top divider
            borderBottom: !hideFooter ? `1px solid ${theme.palette.border.secondary}` : 'none', // styles the bottom divider
          };
        }}
        dividers
        data-testid={DialogTestIds.DIALOG_CONTENT}
      >
        {contentChildren}
      </DialogContent>
      { (footerChildren && !hideFooter) && (
        <DialogActions data-testid={DialogTestIds.DIALOG_ACTIONS}>
          {footerChildren}
        </DialogActions>
      )}
    </MuiDialog>
  );
};

Dialog.defaultProps = {
  'aria-labelledby': 'alert-dialog-title',
  'aria-describedby': 'alert-dialog-description',
  size: DialogSizes.EXTRA_SMALL,
  withPadding: true,
  /* eslint-why user defined functions, defaults only put in place to prevent tsc could be undefined warning */
  /* eslint-disable no-empty-function */
  onClose: () => {},
  /* eslint-enable no-empty-function */
  hideHeader: false,
  hideFooter: false,
  closeIconToolTip: 'Close',
};

export * from '@mui/material/Dialog';
export default Dialog;
