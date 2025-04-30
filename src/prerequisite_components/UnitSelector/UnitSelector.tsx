/* ======================================================================== *
 * Copyright 2025 HCL America Inc.                                          *
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
import { Theme, SxProps, useTheme } from '@mui/material';
import React from 'react';
import Button, { ButtonVariants } from '../../Button';
import Menu, { MenuSizes } from '../../Menu';
import MenuItem from '../../Menu/MenuItem';
import { ThemeDirectionType } from '../../theme';

export interface UnitSelectorProps {
  units: string[];
  selectedUnit: string;
  onUnitChange: (unit: string) => void;
  disabled?: boolean;
  active?: boolean;
  className?: string;
  sx?: SxProps<Theme>;
  buttonProps?: React.ComponentProps<typeof Button>;
}

const UnitSelector: React.FC<UnitSelectorProps> = ({
  units = [],
  selectedUnit,
  onUnitChange,
  disabled = false,
  active = false,
  className,
  sx,
  buttonProps,
}) => {
  if (units.length === 0) {
    return null;
  }

  const [open, setOpen] = React.useState(false);
  const { direction } = useTheme();
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [menuStyle, setMenuStyle] = React.useState<React.CSSProperties>({});

  const handleToggle = () => {
    if (!disabled) {
      setOpen((prevOpen) => { return !prevOpen; });
    }
  };

  const handleClose = (_event: Event | React.SyntheticEvent) => {
    setOpen(false);
  };

  const handleUnitSelect = (unit: string) => {
    if (unit !== selectedUnit) {
      onUnitChange(unit);
    }
    setOpen(false);
  };

  const validatedUnit = React.useMemo(() => {
    const isValidUnit = units.includes(selectedUnit);

    // Return first unit in the array as fallback if selectedUnit is not in the units array
    if (!isValidUnit) {
      return units[0];
    }

    return selectedUnit;
  }, [units, selectedUnit]);

  const getDisplayValue = (unit: string): string => {
    if (unit === 'Freeform') {
      return 'ff';
    }

    return unit;
  };

  const buttonActive = active || open;

  React.useEffect(() => {
    if (open && anchorRef.current) {
      // Find the closest TextField container
      const textFieldEl = anchorRef.current.closest('.MuiOutlinedInput-root');

      if (textFieldEl) {
        // Get button and textfield positions
        const textFieldRect = textFieldEl.getBoundingClientRect();
        const buttonRect = anchorRef.current.getBoundingClientRect();

        // Calculate the offset based on text direction
        let offsetX = 0;

        if (direction === ThemeDirectionType.RTL) {
          offsetX = textFieldRect.left - buttonRect.left;
        } else {
          offsetX = textFieldRect.right - buttonRect.right;
        }

        setMenuStyle({
          marginLeft: `${offsetX}px`,
        });
      }
    }
  }, [open, direction]);

  return (
    <div className={className} style={{ display: 'inline-flex' }}>
      <Button
        size="neutral"
        variant={ButtonVariants.CONTAINED}
        color={buttonActive ? 'secondary' : 'primary'}
        disabled={disabled}
        ref={anchorRef}
        onClick={handleToggle}
        sx={{
          ...sx,
          cursor: disabled ? 'default' : 'pointer',
          margin: 0,
          textAlign: 'center',
          '&.MuiButtonBase-root': {
            padding: '1px 4px !important',
          },
          '.MuiInputBase-root:hover &:not(.Mui-disabled)': {
            backgroundColor: (theme) => { return theme.palette.action.selectedOpacityModified; },
            color: (theme) => { return theme.palette.action.selected; },
          },
        }}
        style={{
          margin: direction === ThemeDirectionType.RTL ? '0px 8px 0px 0px' : '0px 0px 0px 8px',
        }}
        {...buttonProps}
        aria-controls={open ? 'unit-selector-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
      >
        {getDisplayValue(validatedUnit)}
      </Button>

      <Menu
        id="unit-selector-menu"
        anchorEl={anchorRef.current}
        open={open}
        onClose={handleClose}
        size={MenuSizes.SMALL}
        MenuListProps={{
          dense: true,
          autoFocusItem: open,
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: direction === ThemeDirectionType.RTL ? 'left' : 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: direction === ThemeDirectionType.RTL ? 'left' : 'right',
        }}
        sx={{
          ...menuStyle,
          '& .MuiMenu-paper': {
            minWidth: '72px',
            maxHeight: '136px',
            marginTop: '6px',
            padding: '0px',
            boxShadow: (theme) => { return theme.shadows[2]; },
          },
          '& .MuiMenuItem-root': {
            minHeight: '28px',
            padding: '2px 10px',
            justifyContent: direction === ThemeDirectionType.RTL ? 'start' : 'end',
          },
        }}
      >
        {units.map((unit) => {
          return (
            <MenuItem
              key={unit}
              size={MenuSizes.SMALL}
              onClick={() => { return handleUnitSelect(unit); }}
              selected={unit === validatedUnit}
            >
              {unit}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default UnitSelector;
