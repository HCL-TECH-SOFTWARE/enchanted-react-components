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
import { styled, useTheme } from '@mui/material';
import ErrorIcon from '@hcl-software/enchanted-icons/dist/carbon/es/warning';
import WarningIcon from '@hcl-software/enchanted-icons/dist/carbon/es/warning--alt';
import SuccessIcon from '@hcl-software/enchanted-icons/dist/carbon/es/checkmark--outline';
import InformationIcon from '@hcl-software/enchanted-icons/dist/carbon/es/information';
import Divider from '@mui/material/Divider';
import { Theme } from '@mui/material/styles';
import Typography from '../Typography';
import List from '../List';
import ListItem from '../List/ListItem';
import ListItemButton, { ListSizes } from '../List/ListItemButton';
import ListItemText from '../List/ListItemText';
import { SnackbarVariants } from '../Snackbar/Snackbar';
import { SnackbarGroupItem, SnackbarGroupPolicy } from './SnackbarGroup';

interface ThemeColors {
  background: string;
  text: string;
  textTertiary: string;
  iconColor: string;
}

interface SnackbarGroupItemsProps {
  visibleItems: SnackbarGroupItem[];
  expanded: boolean;
  policy: SnackbarGroupPolicy;
  items: SnackbarGroupItem[];
  colors: ThemeColors;
}

export const getVariantColors = (theme: Theme): Record<SnackbarVariants, string> => {
  return {
    error: theme.palette.error.main,
    warning: theme.palette.warning.main,
    success: theme.palette.success.main,
    information: theme.palette.info.main,
    progress: theme.palette.common.white,
  };
};

const StyledList = styled(List)((props) => {
  const { theme } = props;
  return ({
    background: theme.palette.background.paper,
    maxHeight: '240px',
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    marginTop: '0px',
    boxSizing: 'border-box',
    '.MuiListItem-root': {
      '.MuiListItemButton-root': {
        alignItems: 'flex-start !important',
        padding: '8px 12px',
        minHeight: 'auto',
        '.MuiListItemText-root': {
          maxWidth: 'unset',
          width: '100%',
          margin: 0,
          '& .MuiListItemText-primary': {
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            maxWidth: 'unset',
            width: '100%',
            margin: '0 8px 0 0',
            color: theme.palette.text.primary,
            lineHeight: 1.5,
          },
        },
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
          '.MuiListItemText-root': {
            '& .MuiListItemText-primary': {
              whiteSpace: 'normal',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
            },
          },
        },
      },
    },
  });
});

const getVariantIcon = (variant: SnackbarVariants, color: string) => {
  const style = { color };
  switch (variant) {
    case SnackbarVariants.ERROR:
      return <ErrorIcon style={style} />;
    case SnackbarVariants.WARNING:
      return <WarningIcon style={style} />;
    case SnackbarVariants.SUCCESS:
      return <SuccessIcon style={style} />;
    case SnackbarVariants.INFO:
      return <InformationIcon style={style} />;
    default:
      return null;
  }
};

const getVariantColor = (variant: SnackbarVariants, theme: Theme): string => {
  const variantColors = getVariantColors(theme);
  return variantColors[variant];
};

const SnackbarGroupItems = React.forwardRef<HTMLDivElement, SnackbarGroupItemsProps>(
  (
    {
      visibleItems,
      expanded,
      policy,
      items,
      colors,
    },
    ref,
  ) => {
    const theme = useTheme();

    return (
      <Box ref={ref}>
        {expanded && visibleItems.length > 0 && (
          <StyledList>
            {visibleItems.map((item, index) => {
              return (
                <React.Fragment key={item.id}>
                  <ListItem disablePadding>
                    <ListItemButton size={ListSizes.SMALL} sx={{ alignItems: 'flex-start', gap: '8px' }}>
                      <ListItemText
                        primary={item.message}
                        sx={{
                          '& .MuiListItemText-primary': {
                            color: 'text.primary',
                          },
                        }}
                      />
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minWidth: '24px',
                          width: '24px',
                          height: '24px',
                          flexShrink: 0,
                          marginTop: '2px',
                        }}
                      >
                        {getVariantIcon(item.variant, getVariantColor(item.variant, theme))}
                      </Box>
                    </ListItemButton>
                  </ListItem>
                  {index < visibleItems.length - 1 && <Divider key={`divider-${item.id}`} />}
                </React.Fragment>
              );
            })}
          </StyledList>
        )}

        {policy === 'queue' && items.length > 1 && (
          <Typography
            variant="caption"
            sx={{
              color: colors.textTertiary,
              textAlign: 'center',
              padding: '0 8px',
            }}
          >
            +
            {items.length - 1}
            {' '}
            more in queue
          </Typography>
        )}
      </Box>
    );
  },
);

SnackbarGroupItems.displayName = 'SnackbarGroupItems';

export default SnackbarGroupItems;
