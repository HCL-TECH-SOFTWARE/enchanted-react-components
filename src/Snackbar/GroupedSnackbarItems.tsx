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
import { styled } from '@mui/material';
import ErrorIcon from '@hcl-software/enchanted-icons/dist/carbon/es/warning';
import WarningIcon from '@hcl-software/enchanted-icons/dist/carbon/es/warning--alt';
import SuccessIcon from '@hcl-software/enchanted-icons/dist/carbon/es/checkmark--outline';
import InformationIcon from '@hcl-software/enchanted-icons/dist/carbon/es/information';
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
  onCloseItem?: (id: string) => void;
}

const StyledList = styled(List)((props) => {
  const { theme } = props;
  return ({
    background: theme.palette.background.paper,
    maxHeight: '240px',
    width: '100%',
    overflowY: 'scroll',
    marginTop: '8px',
    '.MuiListItem-root': {
      '.MuiListItemButton-root': {
        '.MuiListItemText-root': {
          '& .MuiListItemText-primary': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            color: '#000000',
          },
        },
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
      },
    },
  });
});

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

const GroupedSnackbarItems = React.forwardRef<HTMLDivElement, GroupedSnackbarItemsProps>(
  (
    {
      visibleItems,
      expanded,
      policy,
      items,
      colors,
      onCloseItem,
    },
    ref,
  ) => {
    return (
      <Box ref={ref}>
        {expanded && visibleItems.length > 0 && (
          <StyledList>
            {visibleItems.map((item) => {
              return (
                <ListItem key={item.id} disablePadding>
                  <ListItemButton size={ListSizes.SMALL}>
                    <ListItemText
                      primary={item.message}
                      primaryTypographyProps={{
                        sx: {
                          color: '#000000',
                        },
                      }}
                    />
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '24px',
                        flexShrink: 0,
                        marginLeft: '8px',
                        '& svg': {
                          color: '#000000',
                        },
                      }}
                    >
                      {getVariantIcon(item.variant)}
                    </Box>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </StyledList>
        )}

        {policy === 'queue' && items.length > 1 && (
          <Typography
            variant="caption"
            sx={(theme) => {
              return {
                color: colors.textTertiary,
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
    );
  },
);

GroupedSnackbarItems.displayName = 'GroupedSnackbarItems';

export default GroupedSnackbarItems;
