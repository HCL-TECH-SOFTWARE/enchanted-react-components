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

import React, {
  ReactNode, useRef, useState,
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
            '&.Mui-focusVisible': {
              backgroundColor: 'transparent',
              boxShadow: `0 0 0 1px ${theme.palette.primary.main} inset`,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            },
            '& .MuiTouchRipple-root': {
              display: 'none',
            },
            '& .MuiListItemText-root': {
              margin: '0 8px 0 0',
            },
            '& .MuiListItemSecondaryAction-root': {
              right: ownerState.size === ListSizes.SMALL ? '8px' : '12px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              ...secondaryActionStyle,
              '.MuiButtonBase-root': {
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

const ListItemButton = ({ ...props }: ListItemButtonProps) => {
  const theme = useTheme();
  const { secondaryActionButton, ...restProps } = props;
  const [showaction, setShowaction] = useState(false);
  const [focused, setFocused] = useState(false);
  const secondaryActionRef = useRef<HTMLDivElement>(null);
  const listItemButtonRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Tab' && focused && secondaryActionButton) {
      const buttons = Array.from(event.currentTarget.querySelectorAll('button'));
      const firstButton = buttons[0];
      const lastButton = buttons[buttons.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === firstButton) {
          event.preventDefault();
          event.currentTarget.focus();
        } else {
          const index = buttons.findIndex((btn) => { return btn === document.activeElement; });
          if (index !== -1) {
            buttons[index - 1]?.focus();
            event.preventDefault();
          }
        }
      } else if (document.activeElement === lastButton) {
        event.currentTarget.focus();
      } else {
        const index = buttons.findIndex((btn) => { return btn === document.activeElement; });
        if (index === undefined && buttons.length > 0) {
          buttons[0]?.focus();
        } else {
          buttons[index + 1]?.focus();
        }
        event.preventDefault();
      }
    }
  };

  return (
    <MuiListItemButton
      {...restProps}
      onMouseEnter={() => { setShowaction(true); }}
      onMouseLeave={() => { setShowaction(false); }}
      onFocus={() => { setShowaction(true); setFocused(true); }}
      onBlur={() => { setShowaction(false); setFocused(false); }}
      onKeyDown={(e) => { handleKeyDown(e); }}
      ref={listItemButtonRef}
    >
      {props.children}
      {secondaryActionButton
      && (
      <ListItemSecondaryAction
        ref={secondaryActionRef}
      >
        {showaction && secondaryActionButton}
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
