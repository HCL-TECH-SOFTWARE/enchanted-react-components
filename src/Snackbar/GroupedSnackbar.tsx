/* ======================================================================== *
 * Copyright 2026 HCL America Inc.                                          *
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
import React, { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import MuiSnackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { SnackbarVariants } from './Snackbar';
import GroupedSnackbarHeader from './GroupedSnackbarHeader';
import GroupedSnackbarItems from './GroupedSnackbarItems';

export const getGroupedSnackbarColors = (theme: Theme) => {
  return {
    background: theme.palette.background.dark,
    text: theme.palette.common.white,
    textTertiary: theme.palette.text.secondary,
    iconColor: theme.palette.common.white,
  };
};

const GROUPED_SNACKBAR_MUI_STYLES = {
  padding: '0 !important',
  alignItems: 'center !important',
} as const;

const GROUPED_SNACKBAR_CONTENT_BOX_STYLES = {
  display: 'flex !important',
  flexDirection: 'column',
  gap: '0px',
  minWidth: '300px',
  maxWidth: '800px',
  position: 'relative',
  maxHeight: 'none !important',
} as const;

export interface GroupedSnackbarItem {
  id: string;
  message: React.ReactNode;
  variant: SnackbarVariants;
  buttonText?: string;
  buttonAction?: () => void;
  showActionButton?: boolean;
  autoHideDuration?: number;
  meta?: Record<string, unknown>;
}

export type GroupedSnackbarPolicy = 'stack' | 'queue';

export interface GroupedSnackbarProps {
  open: boolean;
  items: GroupedSnackbarItem[];
  policy?: GroupedSnackbarPolicy;
  maxVisible?: number;
  defaultExpanded?: boolean;
  showHeaderCounts?: boolean;
  includeProgressInHeaderCounts?: boolean;
  onCloseItem?: (id: string) => void;
  onCloseAll?: () => void;
  onExpandChange?: (expanded: boolean) => void;
  anchorOrigin?: SnackbarOrigin;
  sx?: SxProps<Theme>;
}

const DEFAULT_MAX_VISIBLE = 5;
const DEFAULT_POLICY: GroupedSnackbarPolicy = 'stack';

const GroupedSnackbar = React.forwardRef<HTMLDivElement, GroupedSnackbarProps>(
  (
    {
      open,
      items,
      policy = DEFAULT_POLICY,
      maxVisible = DEFAULT_MAX_VISIBLE,
      defaultExpanded = false,
      showHeaderCounts = true,
      includeProgressInHeaderCounts = false,
      onCloseItem,
      onCloseAll,
      onExpandChange,
      anchorOrigin,
      sx,
    },
    ref,
  ) => {
    const theme = useTheme();
    const [expanded, setExpanded] = useState(defaultExpanded);
    const colors = getGroupedSnackbarColors(theme);
    const handleExpandChange = (newExpanded: boolean) => {
      setExpanded(newExpanded);
      onExpandChange?.(newExpanded);
    };

    const filteredItems = useMemo(() => {
      return includeProgressInHeaderCounts
        ? items
        : items.filter((item) => { return item.variant !== SnackbarVariants.PROGRESS; });
    }, [items, includeProgressInHeaderCounts]);

    const variantCounts = useMemo(() => {
      const counts = {
        [SnackbarVariants.ERROR]: 0,
        [SnackbarVariants.WARNING]: 0,
        [SnackbarVariants.SUCCESS]: 0,
        [SnackbarVariants.INFO]: 0,
      };

      filteredItems.forEach((item) => {
        if (item.variant in counts) {
          counts[item.variant as keyof typeof counts] += 1;
        }
      });

      return counts;
    }, [filteredItems]);

    const visibleItems = useMemo(() => {
      if (expanded) {
        return items;
      }
      if (policy === 'queue') {
        return items.slice(0, 1);
      }
      return items.slice(0, maxVisible);
    }, [items, policy, maxVisible, expanded]);

    const hasOverflow = items.length > maxVisible;
    const totalCount = filteredItems.length;

    return (
      <MuiSnackbar
        ref={ref}
        open={open}
        anchorOrigin={anchorOrigin || { vertical: 'bottom', horizontal: 'right' }}
        sx={{
          ...GROUPED_SNACKBAR_MUI_STYLES,
          ...sx,
        }}
      >
        <Box sx={GROUPED_SNACKBAR_CONTENT_BOX_STYLES}>
          <GroupedSnackbarHeader
            variantCounts={variantCounts}
            totalCount={totalCount}
            showHeaderCounts={showHeaderCounts}
            hasOverflow={hasOverflow}
            expanded={expanded}
            colors={colors}
            onExpandChange={handleExpandChange}
            onCloseAll={onCloseAll}
          />
          <GroupedSnackbarItems
            visibleItems={visibleItems}
            expanded={expanded}
            policy={policy}
            items={items}
            colors={colors}
          />
        </Box>
      </MuiSnackbar>
    );
  },
);

GroupedSnackbar.displayName = 'GroupedSnackbar';

export default GroupedSnackbar;
