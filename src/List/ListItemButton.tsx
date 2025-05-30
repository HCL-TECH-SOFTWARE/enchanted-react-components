/* ======================================================================== *
 * Copyright 2024, 2025 HCL America Inc.                                    *
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

import React, {
  ReactNode,
} from 'react';
import IconCaretRight from '@hcl-software/enchanted-icons/dist/carbon/es/caret--right';
import IconCaretLeft from '@hcl-software/enchanted-icons/dist/carbon/es/caret--left';

import MuiListItemButton, { ListItemButtonProps as MuiListItemButtonProps } from '@mui/material/ListItemButton';
import { Components, Theme, useTheme } from '@mui/material';
import ListItemSecondaryAction from './ListItemSecondaryAction';
import ListItemIcon from './ListItemIcon';
import { ThemeDirectionType } from '../theme';

export enum ListSizes {
  SMALL = 'small',
  MEDIUM = 'medium',
}

interface ListItemButtonProps extends MuiListItemButtonProps {
  secondaryActionButton?: ReactNode;
  cascading?: boolean;
  size?: ListSizes;
  disabledHover?: boolean;
}

export const getMuiListItemButtonThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiListItemButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          const secondaryActionStyle = ownerState.cascading ? {
            right: ownerState.size === ListSizes.SMALL ? '26px' : '30px',
          } : {};

          const sizeStyle = ownerState.size === ListSizes.SMALL ? {
            width: '16px',
            height: '16px',
          } : {
            width: '20px',
            height: '20px',
          };

          const sizeIconStyle = ownerState.size === ListSizes.SMALL ? {
            marginRight: '8px',
          } : {
            marginRight: '16px',
          };

          const listItemStyle = ownerState.size === ListSizes.SMALL ? {
            padding: '6px 8px',
          } : {
            padding: '6px 12px',
          };

          return {
            '&.MuiListItemButton-root': {
              ...listItemStyle,
              '.MuiListItemIcon-root': {
                minWidth: ownerState.size === ListSizes.SMALL ? '16px' : '20px',
                ...sizeIconStyle,
              },
              '.MuiListItemIcon-root.cascading': {
                margin: '0 0 0 4px',
                padding: '4px',
                justifyContent: 'center',
                alignItems: 'center',
                ...sizeStyle,
              },
              '.MuiListItemAvatar-root': {
                minWidth: 'auto',
                ...sizeIconStyle,
              },
            },
            '&.MuiListItemButton-root.Mui-disabled': {
              opacity: 'unset',
              '.MuiSvgIcon-root': {
                color: theme.palette.action.disabled,
              },
              '.MuiTypography-root': {
                color: theme.palette.text.disabled,
              },
            },
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
            '&.MuiListItemButton-root.disabled-hover': {
              pointerEvents: 'none',
              backgroundColor: 'transparent',
            },
            '&.Mui-focusVisible': {
              backgroundColor: 'transparent',
              boxShadow: `0 0 0 1px ${theme.palette.primary.main} inset`,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            },
            '&:hover .MuiListItemSecondaryAction-root,&:focus-within .MuiListItemSecondaryAction-root, &.open-menu-action .MuiListItemSecondaryAction-root,&:focus .MuiListItemSecondaryAction-root': {
              opacity: '1',
            },
            '&:hover .MuiListItemText-primary, &:hover .MuiListItemText-secondary': {
              width: 'calc(100% - 48px)',
            },
            '& .MuiTouchRipple-root': {
              display: 'none',
            },
            '& .MuiListItemText-root': {
              margin: '0 8px 0 0',
            },
            '& .MuiListItemSecondaryAction-root': {
              opacity: '0',
              transition: 'opacity 0.3s ease',
              right: ownerState.size === ListSizes.SMALL ? '8px' : '12px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              ...secondaryActionStyle,
              '.IconButtonMainContainer': {
                margin: '0 4px 0 0',
                '&:last-child': {
                  margin: '0',
                },
              },
              '.MuiButtonBase-root.Mui-disabled': {
                '.MuiSvgIcon-root': {
                  color: theme.palette.action.disabled,
                },
              },
            },
            '& .MuiSvgIcon-root': {
              ...sizeStyle,
              color: theme.palette.action.active,
            },
            '& .MuiAvatar-root.MuiAvatar-root': {
              ...sizeStyle,
            },
            '& .MuiListItemText-secondary': {
              display: 'flex',
              '.MuiSvgIcon-root': {
                margin: '0 4px 0 0',
                width: '12px',
                height: '12px',
              },
            },
          };
        },
      },
    },
  };
};

const ListItemButton = ({ disabledHover, ...props }: ListItemButtonProps) => {
  const theme = useTheme();
  const { secondaryActionButton, ...restProps } = props;
  const composedClassName = [props.className, disabledHover ? 'disabled-hover' : ''].filter(Boolean).join(' ');
  return (
    <MuiListItemButton
      {...restProps}
      className={composedClassName}
      tabIndex={disabledHover ? -1 : props.tabIndex}
      aria-disabled={disabledHover ? 'true' : undefined}
    >
      {props.children}
      {secondaryActionButton
      && (
      <ListItemSecondaryAction>
        {secondaryActionButton}
      </ListItemSecondaryAction>
      )}

      {props.cascading ? (
        <ListItemIcon className="cascading">
          {theme.direction === ThemeDirectionType.RTL ? <IconCaretLeft /> : <IconCaretRight />}
        </ListItemIcon>
      ) : null}
    </MuiListItemButton>
  );
};

ListItemButton.defaultProps = {
  cascading: false,
  size: ListSizes.SMALL,
};

export * from '@mui/material/ListItemButton';
export default ListItemButton;
