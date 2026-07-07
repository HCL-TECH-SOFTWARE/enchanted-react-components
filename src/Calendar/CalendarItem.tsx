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
// eslint-why TypeScript interfaces provide type safety
/* eslint-disable react/prop-types */
import React, { KeyboardEvent } from 'react';
import { Box, Theme } from '@mui/material';
import Typography from '../Typography';
import { CalendarItem as CalendarItemType, CalendarItemColors, CalendarView } from './types';

interface CalendarItemProps {
  item: CalendarItemType;
  view: CalendarView;
  onClick?: (item: CalendarItemType) => void;
  disabled?: boolean;
  timePreposition?: string;
}

const getItemColors = (color: CalendarItemType['color'], theme: Theme): CalendarItemColors => {
  const colorMap: Record<CalendarItemType['color'], CalendarItemColors> = {
    neutral: {
      iconBackground: theme.palette.background.default,
      background: theme.palette.background.paper,
      border: theme.palette.border?.tertiary || theme.palette.text.primary,
      text: theme.palette.text.primary,
    },
    red: {
      iconBackground: theme.palette.background.error,
      background: theme.palette.background.paper,
      border: theme.palette.error.main,
      text: theme.palette.error.main,
    },
    orange: {
      iconBackground: theme.palette.background.warning,
      background: theme.palette.background.paper,
      border: theme.palette.warning.main,
      text: theme.palette.warning.main,
    },
    blue: {
      iconBackground: theme.palette.background.info,
      background: theme.palette.background.paper,
      border: theme.palette.info.main,
      text: theme.palette.info.main,
    },
    green: {
      iconBackground: theme.palette.background.success,
      background: theme.palette.background.paper,
      border: theme.palette.success.main,
      text: theme.palette.success.main,
    },
  };

  return colorMap[color];
};

const CalendarItem: React.FC<CalendarItemProps> = React.memo(({
  item,
  view,
  onClick,
  disabled = false,
  timePreposition = 'at',
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick(item);
    }
    if (!disabled && item.onClick) {
      item.onClick(item);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  if (view === 'month') {
    return (
      <Box
        sx={(theme) => {
          return {
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing(0.5),
            padding: theme.spacing(0.25),
            borderRadius: '4px',
            backgroundColor: theme.palette.background.paper,
            cursor: disabled ? 'default' : 'pointer',
            overflow: 'hidden',
            width: '100%',
            opacity: disabled ? 0.38 : 1,
            '&:hover': !disabled && {
              backgroundColor: theme.palette.action.hover,
            },
            '&:focus-visible': {
              border: `2px solid ${theme.palette.action.focus}`,
              padding: '1px',
            },
          };
        }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-label={`${item.title}${item.time ? ` ${timePreposition} ${item.time}` : ''}`}
        aria-disabled={disabled}
      >
        <Box
          sx={(theme) => {
            const colors = getItemColors(item.color, theme);
            return {
              width: theme.spacing(1),
              height: theme.spacing(1),
              borderRadius: '50%',
              backgroundColor: colors.iconBackground,
              border: `1px solid ${colors.border}`,
              flexShrink: 0,
            };
          }}
          aria-hidden="true"
        />
        <Box
          sx={(theme) => {
            return {
              display: 'flex',
              alignItems: 'center',
              flex: 1,
              minWidth: 0,
              height: theme.spacing(2),
              overflow: 'hidden',
              position: 'relative',
            };
          }}
        >
          <Typography
            variant="body2"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              flex: 1,
            }}
          >
            {item.title}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={(theme) => {
        const colors = getItemColors(item.color, theme);
        return {
          display: 'flex',
          flexDirection: 'column',
          padding: theme.spacing(0.25),
          borderRadius: '4px',
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${colors.border}`,
          cursor: disabled ? 'default' : 'pointer',
          overflow: 'hidden',
          width: '100%',
          opacity: disabled ? 0.38 : 1,
          '&:hover': !disabled && {
            backgroundColor: theme.palette.action.hover,
          },
          '&:focus-visible': {
            border: `2px solid ${theme.palette.action.focus}`,
            padding: '1px',
          },
        };
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="button"
      aria-label={`${item.title}${item.time ? ` ${timePreposition} ${item.time}` : ''}`}
      aria-disabled={disabled}
    >
      <Box
        sx={(theme) => {
          return {
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing(0.25),
            overflow: 'hidden',
            width: '100%',
          };
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            position: 'relative',
            width: '100%',
          }}
        >
          <Typography
            variant="body2"
            sx={(theme) => {
              const colors = getItemColors(item.color, theme);
              return {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                flex: 1,
                color: colors.text,
              };
            }}
          >
            {item.title}
          </Typography>
        </Box>
        {item.time && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden',
              width: '100%',
            }}
          >
            <Typography
              variant="body2"
              sx={(theme) => {
                const colors = getItemColors(item.color, theme);
                return {
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: colors.text,
                };
              }}
            >
              {item.time}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
});

CalendarItem.displayName = 'CalendarItem';

export default CalendarItem;
