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

const HEADER_TYPOGRAPHY_STYLES = {
  color: 'inherit',
  marginLeft: '8px',
} as const;

const VARIANT_COUNT_BOX_BASE_STYLES = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  padding: '2px 6px',
  borderRadius: '2px',
  color: '#ffffff',
  fontSize: '12px',
  fontWeight: 600,
} as const;

const VARIANT_ICON_STYLES = {
  width: '14px',
  height: '14px',
} as const;

const HEADER_ACTIONS_BOX_STYLES = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  flexShrink: 0,
} as const;

const getHeaderIconButtonStyles = (iconColor: string) => {
  return {
    '& svg': {
      color: iconColor,
    },
  };
};

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
            borderRadius: expanded ? '4px 4px 0px 0px' : '4px',
            boxShadow: theme.shadows[6],
            color: colors.text,
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
                <Box sx={VARIANT_COUNT_BOX_BASE_STYLES}>
                  <ErrorIcon style={VARIANT_ICON_STYLES} />
                </Box>
              )}
              {variantCounts[SnackbarVariants.WARNING] > 1 && (
                <Box
                  sx={{
                    ...VARIANT_COUNT_BOX_BASE_STYLES,
                    backgroundColor: colors.background === '#f5f5f5' ? '#ffb74d' : '#f57c00',
                  }}
                >
                  <WarningIcon style={VARIANT_ICON_STYLES} />
                </Box>
              )}
              {variantCounts[SnackbarVariants.SUCCESS] > 1 && (
                <Box sx={VARIANT_COUNT_BOX_BASE_STYLES}>
                  <SuccessIcon style={VARIANT_ICON_STYLES} />
                </Box>
              )}
              {variantCounts[SnackbarVariants.INFO] > 1 && (
                <Box sx={VARIANT_COUNT_BOX_BASE_STYLES}>
                  <InformationIcon style={VARIANT_ICON_STYLES} />
                </Box>
              )}
            </>
          )}
          <Typography
            variant="body2"
            sx={HEADER_TYPOGRAPHY_STYLES}
          >
            {variantCounts[SnackbarVariants.ERROR] > 0 && (
              <>
                {variantCounts[SnackbarVariants.ERROR]}
                {' '}
                error(s)
                {' '}
              </>
            )}
            {variantCounts[SnackbarVariants.WARNING] > 0 && (
              <>
                {variantCounts[SnackbarVariants.WARNING]}
                {' '}
                warning(s)
                {' '}
              </>
            )}
            {variantCounts[SnackbarVariants.SUCCESS] > 0 && (
              <>
                {variantCounts[SnackbarVariants.SUCCESS]}
                {' '}
                success(es)
                {' '}
              </>
            )}
            {variantCounts[SnackbarVariants.INFO] > 0 && (
              <>
                {variantCounts[SnackbarVariants.INFO]}
                {' '}
                info(s)
                {' '}
              </>
            )}
            notification
            {totalCount !== 1 ? 's' : ''}
          </Typography>
        </Box>

        <Box sx={HEADER_ACTIONS_BOX_STYLES}>
          {hasOverflow && (
            <Tooltip title={expanded ? 'Collapse' : 'Expand'}>
              <IconButton
                onClick={() => { return onExpandChange(!expanded); }}
                variant={IconButtonVariants.WITH_PADDING}
                aria-expanded={expanded}
                aria-label="Toggle notification list"
                sx={getHeaderIconButtonStyles(colors.iconColor)}
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
                sx={getHeaderIconButtonStyles(colors.iconColor)}
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
