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
import MuiTooltip, { TooltipProps as MuiTooltipProps } from '@mui/material/Tooltip';
import { Components, Theme } from '@mui/material';

export enum TooltipSizes {
  SMALL = 'small',
  MEDIUM = 'medium',
}

export enum TooltipTypes {
  SINGLELINE = 'singleLine',
  MULTILINE = 'multiLine',
}

export enum TooltipPlacement {
  TOPSTART = 'top-start',
  TOP = 'top',
  TOPEND = 'top-end',
  RIGHTSTART = 'right-start',
  RIGHT = 'right',
  RIGHTEND = 'right-end',
  BOTTOMEND = 'bottom-end',
  BOTTOM = 'bottom',
  BOTTOMSTART = 'bottom-start',
  LEFTEND = 'left-end',
  LEFT = 'left',
  LEFTSTART = 'left-start',
}

export type TooltipProps = MuiTooltipProps & {
  title?: string,
  type?: string,
  maxwidth?: number,
  tooltipsize?: string,
  placement?: string,

};

const Tooltip = ({ ...props }: TooltipProps) => {
  return <MuiTooltip {...props} />;
};

/**
 * @returns override Tooltip component styles and props
 */
export const getMuiTooltipThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: ({ ownerState, theme }) => {
          return ({
            backgroundColor: theme.palette.background.dark,
            color: theme.palette.text.tertiary1,
            borderRadius: '2px',
            '&.MuiTooltip-tooltip': {
              ...ownerState.tooltipsize === TooltipSizes.SMALL && {
                ...theme.typography.caption,
                padding: '5px 8px 5px 8px',
              },
              ...ownerState.tooltipsize === TooltipSizes.MEDIUM && {
                ...theme.typography.body2,
                padding: '8px',
              },
              ...ownerState.type === TooltipTypes.SINGLELINE && {
                whiteSpace: 'nowrap',
                maxWidth: 'none',
              },
              ...ownerState.type === TooltipTypes.MULTILINE && {
                maxWidth: ownerState.maxwidth,
              },
              '&.MuiTooltip-tooltipPlacementBottom': {
                // Set 4px margin from top when tooltip is placed in the bottom of the anchor to make spacing between anchor and tooltip
                margin: '4px 0px 0px 0px',
              },
              '&.MuiTooltip-tooltipPlacementTop': {
                // Set 4px margin from bottom when tooltip is placed on the top of the anchor to make spacing between anchor and tooltip
                margin: '0px 0px 4px 0px',
              },
              '&.MuiTooltip-tooltipPlacementLeft': {
                // Set 4px margin from right when tooltip is placed on the left of the anchor to make spacing between anchor and tooltip
                margin: '0px 4px 0px 0px',
              },
              '&.MuiTooltip-tooltipPlacementRight': {
                // Set 4px margin from left when tooltip is placed on the right of the anchor to make spacing between anchor and tooltip
                margin: '0px 0px 0px 4px',
              },
            },
          });
        },
      },
    },
  };
};

export * from '@mui/material/Tooltip';
export default Tooltip;
