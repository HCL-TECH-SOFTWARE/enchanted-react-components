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
import {
  Grid, Components, Theme,
} from '@mui/material';
import MuiListItemText, { ListItemTextProps as MuiListItemTextProps } from '@mui/material/ListItemText';
import Tooltip from '../Tooltip';

import { isOverflown } from '../utils/domUtils';

export type ListItemTextProps = MuiListItemTextProps & {
  tooltip?: string;
  tooltipPlacement?: 'top' | 'right' | 'bottom' | 'left' | 'bottom-end' | 'bottom-start' | 'left-end' | 'left-start' | 'right-end' | 'right-start' | 'top-end' | 'top-start';
  forceTooltip: boolean;
  secondaryTooltip?: string;
  secondaryTooltipPlacement?: 'top' | 'right' | 'bottom' | 'left' | 'bottom-end' | 'bottom-start' | 'left-end' | 'left-start' | 'right-end' | 'right-start' | 'top-end' | 'top-start';
}

export const getMuiListItemTextThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiListItemText: {
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          return {
            margin: '0',
            '&.list-item-text-truncate .MuiTypography-root': {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            },
          };
        },
      },
    },
  };
};

const ListItemText = ({
  tooltip, tooltipPlacement, forceTooltip, secondaryTooltip, secondaryTooltipPlacement, ...props
}: ListItemTextProps) => {
  const listRef = React.useRef<HTMLDivElement>(null);
  const [tooltipValue, setTooltipValue] = React.useState<string | undefined>('');
  const [secondaryTooltipValue, setSecondaryTooltipValue] = React.useState<string | undefined>('');
  React.useEffect(() => {
    if (forceTooltip) {
      setTooltipValue(tooltip);
      setSecondaryTooltipValue(secondaryTooltip);
    } else if (listRef && listRef.current) {
      const isOver = isOverflown(listRef.current);
      if (isOver) {
        setTooltipValue(tooltip);
        setSecondaryTooltipValue(secondaryTooltip);
      } else {
        setTooltipValue('');
        setSecondaryTooltipValue('');
      }
    }
  }, [listRef, tooltip, forceTooltip]);
  let primaryReactNode = props.primary;
  let secondaryReactNode = props.secondary && props.secondary;

  if (tooltipValue) {
    primaryReactNode = (
      <Tooltip
        title={tooltipValue}
        placement={tooltipPlacement}
      >
        <Grid container>
          <Grid item sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{primaryReactNode}</Grid>
        </Grid>
      </Tooltip>
    );
  }

  if (secondaryTooltipValue) {
    secondaryReactNode = (
      <Tooltip
        title={secondaryTooltipValue}
        placement={secondaryTooltipPlacement}
      >
        <Grid container>
          <Grid item sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {secondaryReactNode}
          </Grid>
        </Grid>
      </Tooltip>
    );
  }

  return (
    <MuiListItemText
      className={`${tooltip ? '' : 'list-item-text-truncate'}`}
      ref={listRef}
      {...props}
      primary={primaryReactNode}
      secondary={secondaryReactNode}
    />
  );
};

ListItemText.defaultProps = {
  tooltipPlacement: 'right',
  secondaryTooltipPlacement: 'right',
  forceTooltip: false,
};

export * from '@mui/material/ListItemText';
export default ListItemText;
