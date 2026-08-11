import { Theme, SxProps } from '@mui/material';
import React from 'react';
import Button from '../../Button';
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
declare const UnitSelector: React.FC<UnitSelectorProps>;
export default UnitSelector;
