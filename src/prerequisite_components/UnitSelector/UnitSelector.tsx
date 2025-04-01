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
import { PopperPlacementType, Theme, SxProps } from '@mui/material';
import React from 'react';
import Button from '../../Button';
import Menu from '../../Menu';
import MenuItem from '../../Menu/MenuItem';

export interface UnitSelectorProps {
  units: string[];
  selectedUnit: string;
  onUnitChange: (unit: string) => void;
  disabled?: boolean;
  className?: string;
  sx?: SxProps<Theme>;
  buttonProps?: React.ComponentProps<typeof Button>;
  placement?: PopperPlacementType;
}

const UnitSelector: React.FC<UnitSelectorProps> = ({
  units = [],
  selectedUnit,
  onUnitChange,
  disabled = false,
  className,
  sx,
  buttonProps,
  placement = 'bottom-start',
}) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    if (!disabled) {
      setOpen((prevOpen) => { return !prevOpen; });
    }
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  const handleUnitSelect = (unit: string) => {
    if (unit !== selectedUnit) {
      onUnitChange(unit);
    }

    setOpen(false);
  };

  const validatedUnit = React.useMemo(() => {
    // If units array is empty, display the selectedUnit
    if (units.length === 0) return selectedUnit;

    const isValidUnit = units.includes(selectedUnit);

    // Return first unit in the array as fallback if selectedUnit is not in the units array
    if (!isValidUnit) {
      return units[0];
    }

    return selectedUnit;
  }, [units, selectedUnit]);

  return (
    <div className={className} style={{ display: 'inline-flex' }}>
      <Button
        size="neutral"
        variant="contained"
        color="secondary"
        disabled={disabled}
        ref={anchorRef}
        onClick={handleToggle}
        sx={{
          ...sx,
          minWidth: '80px',
          cursor: disabled ? 'default' : 'pointer',
          margin: 0,
          textAlign: 'center',
          padding: '0px',
        }}
        {...buttonProps}
        aria-controls={open ? 'unit-selector-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
      >
        {validatedUnit}
      </Button>

      <Menu
        id="unit-selector-menu"
        anchorEl={anchorRef.current}
        open={open}
        onClose={handleClose}
        size="small"
        MenuListProps={{
          'aria-labelledby': 'unit-selector-button',
          dense: true,
          autoFocusItem: open,
        }}
        anchorOrigin={{
          vertical: placement.startsWith('bottom') ? 'bottom' : 'top',
          // eslint-why-allow-ntesting
          // eslint-disable-next-line no-nested-ternary
          horizontal: placement.startsWith('start') ? 'left' : placement.endsWith('end') ? 'right' : 'center',
        }}
        transformOrigin={{
          vertical: placement.startsWith('top') ? 'bottom' : 'top',
          // eslint-why-allow-ntesting
          // eslint-disable-next-line no-nested-ternary
          horizontal: placement.endsWith('start') ? 'left' : placement.endsWith('end') ? 'right' : 'center',
        }}
        sx={{
          '& .MuiMenu-paper': {
            minWidth: '80px',
            maxHeight: '136px',
            marginTop: '2px',
            padding: '0px',
            boxShadow: (theme) => { return theme.shadows[2]; },
          },
          '& .MuiMenuItem-root': {
            minHeight: '28px',
            padding: '2px 10px',
            justifyContent: 'end',
          },
        }}
      >
        {units.length > 0 ? (
          units.map((unit) => {
            return (
              <MenuItem
                key={unit}
                size="small"
                onClick={() => { return handleUnitSelect(unit); }}
                selected={unit === selectedUnit}
              >
                {unit}
              </MenuItem>
            );
          })
        ) : (
          <MenuItem size="small" disabled>
            No units available
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default UnitSelector;
