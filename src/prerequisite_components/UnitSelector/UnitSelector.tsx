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
          minWidth: 'auto',
          cursor: 'pointer',
          margin: 0,
        }}
        {...buttonProps}
        aria-controls={open ? 'unit-selector-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
      >
        {selectedUnit}
      </Button>
    </div>
  );
};

export default UnitSelector;
