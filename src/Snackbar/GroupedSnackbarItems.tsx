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
import { styled } from '@mui/material';
import ErrorIcon from '@hcl-software/enchanted-icons/dist/carbon/es/warning';
import WarningIcon from '@hcl-software/enchanted-icons/dist/carbon/es/warning--alt';
import SuccessIcon from '@hcl-software/enchanted-icons/dist/carbon/es/checkmark--outline';
import InformationIcon from '@hcl-software/enchanted-icons/dist/carbon/es/information';
import Divider from '@mui/material/Divider';
import Typography from '../Typography';
import List from '../List';
import ListItem from '../List/ListItem';
import ListItemButton, { ListSizes } from '../List/ListItemButton';
import ListItemText from '../List/ListItemText';
import { SnackbarVariants } from './Snackbar';
import { GroupedSnackbarItem, GroupedSnackbarPolicy } from './GroupedSnackbar';

interface ThemeColors {
  background: string;
  text: string;
  textTertiary: string;
  iconColor: string;
}

interface GroupedSnackbarItemsProps {
  visibleItems: GroupedSnackbarItem[];
  expanded: boolean;
  policy: GroupedSnackbarPolicy;
  items: GroupedSnackbarItem[];
  colors: ThemeColors;
}

const StyledList = styled(List)((props) => {
  const { theme } = props;
  return ({
    background: theme.palette.background.paper,
    maxHeight: '240px',
    width: '100%',
    overflowY: 'scroll',
    marginTop: '0px',
    '.MuiListItem-root': {
      '.MuiListItemButton-root': {
        alignItems: 'center !important',
        '.MuiListItemText-root': {
          maxWidth: 'unset',
          width: '100%',
          '& .MuiListItemText-primary': {
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            maxWidth: 'unset',
            width: '100%',
            margin: '8px 8px 8px 0',
          },
        },
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
          '.MuiListItemText-root': {
            '& .MuiListItemText-primary': {
              whiteSpace: 'normal',
              wordBreak: 'break-word',
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

const getVariantColor = (variant: SnackbarVariants) => {
  switch (variant) {
    case SnackbarVariants.ERROR:
      return '#c10c0d';
    case SnackbarVariants.WARNING:
      return '#d84315';
    case SnackbarVariants.SUCCESS:
      return '#1b5e20';
    case SnackbarVariants.INFO:
      return '#0d47a1';
    default:
      return '#ffffff';
  }
};

const GroupedSnackbarItems = React.forwardRef<HTMLDivElement, GroupedSnackbarItemsProps>(
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
    return (
      <Box ref={ref}>
        {expanded && visibleItems.length > 0 && (
          <StyledList>
            {visibleItems.map((item, index) => {
              return (
                <React.Fragment key={item.id}>
                  <ListItem disablePadding>
                    <ListItemButton size={ListSizes.SMALL} sx={{ alignItems: 'center' }}>
                      <ListItemText
                        primary={item.message}
                      />
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minWidth: '24px',
                          flexShrink: 0,
                          marginLeft: '8px',
                          alignSelf: 'center',
                        }}
                      >
                        {getVariantIcon(item.variant, getVariantColor(item.variant))}
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

GroupedSnackbarItems.displayName = 'GroupedSnackbarItems';

export default GroupedSnackbarItems;
