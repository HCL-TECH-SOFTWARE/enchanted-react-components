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
import MuiPopper, { PopperProps as MuiPopperProps } from '@mui/material/Popper';
import {
  Theme,
  Grid,
} from '@mui/material';
import IconButton from '../IconButton';
import PopperTitle from './PopperTitle';
import PopperContent from './PopperContent';
import { TYPOGRAPHY } from '../theme';
import Divider, { DividerTypes } from '../Divider';
import Tooltip from '../Tooltip';

export enum PopperTestIds {
  POPPER_TITLE = 'popperTitle',
  POPPER_CONTENT = 'popperContent',
  POPPER_CLOSE_ICON = 'popperCloseIcon',
}

export type PopperProps = MuiPopperProps & {
  headerChildren?: React.ReactNode,
  contentChildren?: React.ReactNode,
  subHeaderChildren?: React.ReactNode,
  onClose: Function,
  hideSubHeader?: boolean,
  closeIconTooltip?: string,
};

const Popper = ({ ...props }: PopperProps) => {
  const {
    headerChildren, contentChildren, subHeaderChildren,
    hideSubHeader, onClose, ...rest
  } = props;
  return (
    // @ts-ignore
    <MuiPopper
      {...rest}
      sx={() => {
        return {
          borderRadius: '4px',
          width: '374px',
          boxShadow: (theme:Theme) => { return theme.shadows[6]; },
          backgroundColor: (theme: Theme) => { return theme.palette.background.paper; },
          position: 'relative',
          '.MuiDialogContent-root': {
            padding: '12px',
          },
          '.MuiDialogTitle-root': {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '12px',
            borderRadius: '4px',
            '&.MuiGrid-root': {
              '&.MuiTypography-root': {
                ...TYPOGRAPHY.h6,
              },
              '&.MuiIconButton-root': {
                position: 'absolute',
                right: 12,
                top: 12,
              },
            },
          },
        };
      }}
    >
      {(headerChildren)
        && (
        <PopperTitle data-testid={PopperTestIds.POPPER_TITLE}>
          <Grid>{headerChildren}</Grid>
          <Tooltip title={props.closeIconTooltip || ''}>
            <IconButton
              aria-label={props.closeIconTooltip ? props. closeIconTooltip : PopperTestIds.POPPER_TITLE}
              onClick={(e) => { onClose(e, 'backdropClick'); }}
              data-testid={PopperTestIds.POPPER_CLOSE_ICON}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </PopperTitle>
        )}
      {(!hideSubHeader)
        && (
          <>
            <Divider type={DividerTypes.SECONDARY} />
            <PopperContent>
              {subHeaderChildren}
            </PopperContent>
          </>
        )}
      <Divider type={DividerTypes.SECONDARY} />
      <PopperContent>
        {contentChildren}
      </PopperContent>
    </MuiPopper>
  );
};

Popper.defaultProps = {
  /* eslint-why user defined functions, defaults only put in place to prevent tsc could be undefined warning */
  /* eslint-disable no-empty-function */
  onClose: () => { },
  /* eslint-enable no-empty-function */
  hideSubHeader: false,
};

export * from '@mui/material/Popper';
export default Popper;
