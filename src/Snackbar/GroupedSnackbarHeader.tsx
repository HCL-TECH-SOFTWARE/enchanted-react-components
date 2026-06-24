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
import Box from '@mui/material/Box';
import ChevronDownIcon from '@hcl-software/enchanted-icons/dist/carbon/es/chevron--down';
import ChevronUpIcon from '@hcl-software/enchanted-icons/dist/carbon/es/chevron--up';
import CloseIcon from '@hcl-software/enchanted-icons/dist/carbon/es/close';
import ErrorIcon from '@hcl-software/enchanted-icons/dist/carbon/es/warning';
import WarningIcon from '@hcl-software/enchanted-icons/dist/carbon/es/warning--alt';
import SuccessIcon from '@hcl-software/enchanted-icons/dist/carbon/es/checkmark--outline';
import InformationIcon from '@hcl-software/enchanted-icons/dist/carbon/es/information';
import IconButton, { IconButtonVariants } from '../IconButton';
import Typography from '../Typography';
import Tooltip from '../Tooltip';
import { SnackbarVariants } from './Snackbar';

interface ThemeColors {
  background: string;
  text: string;
  textTertiary: string;
  iconColor: string;
}

interface VariantCounts {
  [SnackbarVariants.ERROR]: number;
  [SnackbarVariants.WARNING]: number;
  [SnackbarVariants.SUCCESS]: number;
  [SnackbarVariants.INFO]: number;
}

interface GroupedSnackbarHeaderProps {
  variantCounts: VariantCounts;
  totalCount: number;
  showHeaderCounts: boolean;
  hasOverflow: boolean;
  expanded: boolean;
  colors: ThemeColors;
  onExpandChange: (expanded: boolean) => void;
  onCloseAll?: () => void;
}

const GroupedSnackbarHeader = React.forwardRef<HTMLDivElement, GroupedSnackbarHeaderProps>(
  (
    {
      variantCounts,
      totalCount,
      showHeaderCounts,
      hasOverflow,
      expanded,
      colors,
      onExpandChange,
      onCloseAll,
    },
    ref,
  ) => {
    return (
      <Box
        ref={ref}
        sx={(theme) => {
          return {
            ...theme.typography.body2,
            position: 'relative',
            background: colors.background,
            borderRadius: '4px',
            boxShadow: theme.shadows[6],
            color: colors.textTertiary,
            display: 'flex !important',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: '36px',
            padding: '4px 12px 0 12px',
            gap: '8px',
            flexWrap: 'nowrap',
            width: '100%',
            boxSizing: 'border-box',
          };
        }}
      >
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0, overflow: 'hidden',
        }}
        >
          {showHeaderCounts && (
            <>
              {variantCounts[SnackbarVariants.ERROR] > 1 && (
                <Tooltip title={`${variantCounts[SnackbarVariants.ERROR]} error(s)`}>
                  <Box
                    sx={(theme) => {
                      return {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '2px 6px',
                        borderRadius: '2px',
                        backgroundColor: theme.palette.error.inverse,
                        color: theme.palette.background.dark,
                        fontSize: '12px',
                        fontWeight: 600,
                      };
                    }}
                  >
                    <ErrorIcon style={{ width: '14px', height: '14px' }} />
                  </Box>
                </Tooltip>
              )}
              {variantCounts[SnackbarVariants.WARNING] > 1 && (
                <Tooltip title={`${variantCounts[SnackbarVariants.WARNING]} warning(s)`}>
                  <Box
                    sx={(theme) => {
                      return {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '2px 6px',
                        borderRadius: '2px',
                        backgroundColor: theme.palette.warning.inverse,
                        color: theme.palette.background.dark,
                        fontSize: '12px',
                        fontWeight: 600,
                      };
                    }}
                  >
                    <WarningIcon style={{ width: '14px', height: '14px' }} />
                  </Box>
                </Tooltip>
              )}
              {variantCounts[SnackbarVariants.SUCCESS] > 1 && (
                <Tooltip title={`${variantCounts[SnackbarVariants.SUCCESS]} success(es)`}>
                  <Box
                    sx={(theme) => {
                      return {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '2px 6px',
                        borderRadius: '2px',
                        backgroundColor: theme.palette.success.inverse,
                        color: theme.palette.background.dark,
                        fontSize: '12px',
                        fontWeight: 600,
                      };
                    }}
                  >
                    <SuccessIcon style={{ width: '14px', height: '14px' }} />
                  </Box>
                </Tooltip>
              )}
              {variantCounts[SnackbarVariants.INFO] > 1 && (
                <Tooltip title={`${variantCounts[SnackbarVariants.INFO]} info(s)`}>
                  <Box
                    sx={(theme) => {
                      return {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '2px 6px',
                        borderRadius: '2px',
                        backgroundColor: theme.palette.primary.inverse,
                        color: theme.palette.background.dark,
                        fontSize: '12px',
                        fontWeight: 600,
                      };
                    }}
                  >
                    <InformationIcon style={{ width: '14px', height: '14px' }} />
                  </Box>
                </Tooltip>
              )}
            </>
          )}
          <Typography
            variant="body2"
            sx={{
              color: 'inherit',
              marginLeft: '8px',
            }}
          >
            {totalCount}
            {' '}
            notification
            {totalCount !== 1 ? 's' : ''}
          </Typography>
        </Box>

        <Box sx={{
          display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0,
        }}
        >
          {hasOverflow && (
            <Tooltip title={expanded ? 'Collapse' : 'Expand'}>
              <IconButton
                onClick={() => { return onExpandChange(!expanded); }}
                variant={IconButtonVariants.WITH_PADDING}
                aria-expanded={expanded}
                aria-label="Toggle notification list"
                sx={{
                  '& svg': {
                    color: colors.iconColor,
                  },
                }}
              >
                {expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </IconButton>
            </Tooltip>
          )}
          {onCloseAll && (
            <Tooltip title="Close all">
              <IconButton
                onClick={onCloseAll}
                variant={IconButtonVariants.WITH_PADDING}
                aria-label="Close all notifications"
                sx={{
                  '& svg': {
                    color: colors.iconColor,
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>
    );
  },
);

GroupedSnackbarHeader.displayName = 'GroupedSnackbarHeader';

export default GroupedSnackbarHeader;
