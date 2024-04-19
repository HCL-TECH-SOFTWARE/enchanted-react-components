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
import MuiCircularProgress, { CircularProgressProps as MuiCircularProgressProps } from '@mui/material/CircularProgress';
import { Components, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '../../Typography';

// Scaling constant for handling responsiveness of font, In Figma- default size of circular progress is 40px and font size is 12px (Body2 variant)
const scaleSize = 12 / 40;

const getScalingFontSize = (size: number) : number => {
  return size * scaleSize;
};

export enum CircularProgressVariants {
  DETERMINATE = 'determinate',
  INDETERMINATE = 'indeterminate',
}

export enum CircularProgressTestIds {
  PROGRESS_ROOT = 'progressRoot',
  PROGRESS_TRAIL = 'progressTrail',
  PROGRESS_CIRCLE = 'progressCircle',
  PROGRESS_LABEL = 'progressLabel',
}

/**
 * @typedef CircularProgressProps
 * @type {object}
 * @property {boolean} showprogress - Toggles showprogress state to enable/disable progress text inside progress in case of 'determinate' variant
 */
export type CircularProgressProps = MuiCircularProgressProps & {
  showprogress?: boolean | 0 | 1,
}

export const getMuiCircularProgressThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiCircularProgress: {
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          return ({
            ...theme.typography.body2,
            color: theme.palette.primary.main,
            position: 'absolute',
            left: 0,
            ...(ownerState.variant === CircularProgressVariants.DETERMINATE && ownerState.id === CircularProgressTestIds.PROGRESS_TRAIL) && {
              color: theme.palette.action.hover,
            },
            ...ownerState.variant === CircularProgressVariants.DETERMINATE && {
              '+ .MuiBox-root': { // styles the label element right next to a determinate progress circle
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ' .MuiTypography-root': {
                  color: theme.palette.text.secondary,
                },
              },
            },
          });
        },
      },
    },
  };
};

const CircularProgress = ({ ...props }: CircularProgressProps) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-block',
        width: props.size,
        height: props.size,
      }}
      data-testid={CircularProgressTestIds.PROGRESS_ROOT}
    >
      <MuiCircularProgress
        {...props}
        id={CircularProgressTestIds.PROGRESS_TRAIL}
        data-testid={CircularProgressTestIds.PROGRESS_TRAIL}
        variant={CircularProgressVariants.DETERMINATE} // for the full gray trail
        value={100} // for the full gray trail
      />
      <MuiCircularProgress
        {...props}
        data-testid={CircularProgressTestIds.PROGRESS_CIRCLE}
      />
      { (props.variant === CircularProgressVariants.DETERMINATE && props.value !== undefined && props.value > 0 && Boolean(props.showprogress))
      && (
        <Box>
          <Typography
            variant="body2"
            fontSize={getScalingFontSize(typeof props.size === 'number' ? props.size : 0)}
            data-testid={CircularProgressTestIds.PROGRESS_LABEL}
          >
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const defaultProps: CircularProgressProps = {
  thickness: 3.5,
  size: 40,
  variant: CircularProgressVariants.INDETERMINATE,
  showprogress: 0,
  value: 0,
};

CircularProgress.defaultProps = defaultProps;

export * from '@mui/material/CircularProgress';
export default CircularProgress;
