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
import React, { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import MuiSnackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import ChevronDownIcon from '@hcl-software/enchanted-icons/dist/carbon/es/chevron--down';
import ChevronUpIcon from '@hcl-software/enchanted-icons/dist/carbon/es/chevron--up';
import CloseIcon from '@hcl-software/enchanted-icons/dist/carbon/es/close';
import ErrorIcon from '@hcl-software/enchanted-icons/dist/carbon/es/warning';
import WarningIcon from '@hcl-software/enchanted-icons/dist/carbon/es/warning--alt';
import SuccessIcon from '@hcl-software/enchanted-icons/dist/carbon/es/checkmark--outline';
import InformationIcon from '@hcl-software/enchanted-icons/dist/carbon/es/information';
import IconButton, { IconButtonVariants } from '../IconButton';
import Typography from '../Typography';
import Button from '../Button';
import Tooltip from '../Tooltip';
import { SnackbarVariants } from './Snackbar';

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

const getVariantIcon = (variant: SnackbarVariants) => {
  switch (variant) {
    case SnackbarVariants.ERROR:
      return <ErrorIcon />;
    case SnackbarVariants.WARNING:
      return <WarningIcon />;
    case SnackbarVariants.SUCCESS:
      return <SuccessIcon />;
    case SnackbarVariants.INFO:
      return <InformationIcon />;
    default:
      return null;
  }
};

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
    const [expanded, setExpanded] = useState(defaultExpanded);

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
          padding: '0 !important',
          alignItems: 'center !important',
          ...sx,
        }}
      >
        <Box
          sx={(theme) => {
            return {
              display: 'flex !important',
              flexDirection: 'column',
              gap: '8px',
              minWidth: '300px',
              maxWidth: '800px',
              position: 'relative',
              maxHeight: 'none !important',
            };
          }}
        >
          <Box
            sx={(theme) => {
              return {
                ...theme.typography.body2,
                position: 'relative',
                background: theme.palette.background.dark,
                borderRadius: '4px',
                boxShadow: theme.shadows[6],
                color: theme.palette.text.tertiary1,
                display: 'flex !important',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: '36px',
                padding: '8px 12px',
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
                        {/* {variantCounts[SnackbarVariants.ERROR]} */}
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
                        {/* {variantCounts[SnackbarVariants.WARNING]} */}
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
                        {/* {variantCounts[SnackbarVariants.SUCCESS]} */}
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
                        {/* {variantCounts[SnackbarVariants.INFO]} */}
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
                    onClick={() => { return handleExpandChange(!expanded); }}
                    variant={IconButtonVariants.WITH_PADDING}
                    aria-expanded={expanded}
                    aria-label="Toggle notification list"
                    sx={{
                      '& svg': {
                        color: '#ffffff',
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
                        color: '#ffffff',
                      },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Box>

          {expanded && visibleItems.length > 0 && (
            <Box
              sx={(muiTheme) => {
                return {
                  display: 'flex !important',
                  flexDirection: 'column',
                  gap: '0',
                  background: muiTheme.palette.background.dark,
                  borderRadius: '4px',
                  boxShadow: muiTheme.shadows[6],
                  overflow: 'auto !important',
                  overflowX: 'hidden !important',
                  maxHeight: '240px !important',
                  height: 'auto !important',
                  marginTop: '8px',
                  width: '100%',
                };
              }}
            >
              {visibleItems.map((item, index) => {
                return (
                  <Box
                    key={item.id}
                    sx={(theme) => {
                      return {
                        display: 'flex !important',
                        alignItems: 'center !important',
                        justifyContent: 'flex-start',
                        padding: '8px 12px',
                        backgroundColor: theme.palette.background.dark,
                        borderBottom: index !== visibleItems.length - 1 ? `1px solid ${theme.palette.divider}` : 'none',
                        gap: '8px',
                        minHeight: '40px',
                        width: '100%',
                        boxSizing: 'border-box',
                      };
                    }}
                  >
                    <Box sx={{
                      display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0,
                    }}
                    >
                      <Box sx={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '20px', flexShrink: 0,
                      }}
                      >
                        {getVariantIcon(item.variant)}
                      </Box>
                      <Typography
                        variant="body2"
                        sx={(muiTheme) => {
                          return {
                            color: muiTheme.palette.text.tertiary1,
                            flex: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          };
                        }}
                      >
                        {item.message}
                      </Typography>
                    </Box>

                    <Box sx={{
                      display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0,
                    }}
                    >
                      {item.showActionButton && item.buttonText && item.buttonAction && (
                      <Button
                        onClick={item.buttonAction}
                        sx={{
                          fontSize: '12px',
                          padding: '2px 6px',
                          minWidth: 'auto',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {item.buttonText}
                      </Button>
                      )}
                      {onCloseItem && (
                        <Tooltip title="Close">
                          <IconButton
                            onClick={() => { return onCloseItem(item.id); }}
                            variant={IconButtonVariants.WITH_PADDING}
                            aria-label={`Close notification: ${item.message}`}
                            sx={{
                              '& svg': {
                                color: '#ffffff',
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
              })}
            </Box>
          )}

          {policy === 'queue' && items.length > 1 && (
            <Typography
              variant="caption"
              sx={(theme) => {
                return {
                  color: theme.palette.text.tertiary1,
                  textAlign: 'center',
                  padding: '0 8px',
                };
              }}
            >
              +
              {items.length - 1}
              {' '}
              more in queue
            </Typography>
          )}
        </Box>
      </MuiSnackbar>
    );
  },
);

GroupedSnackbar.displayName = 'GroupedSnackbar';

export default GroupedSnackbar;
