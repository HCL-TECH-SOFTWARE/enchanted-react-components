import React from 'react';
import { GridColumnMenuProps as MuiGridColumnMenuProps, GridColumnVisibilityModel } from '@mui/x-data-grid';
type GridColumnMenuProps = MuiGridColumnMenuProps & {
    onSortModelChange: Function;
    onColumnVisibilityModelChange: Function;
    columnVisibilityModel: GridColumnVisibilityModel;
};
export declare const ExtendedGridColumnMenu: ({ currentColumn, onSortModelChange, onColumnVisibilityModelChange, columnVisibilityModel, ...rest }: GridColumnMenuProps) => React.JSX.Element;
export {};
