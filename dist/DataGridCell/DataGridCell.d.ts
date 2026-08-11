import React from 'react';
import { GridRenderCellParams } from '@mui/x-data-grid';
/**
* Renders our custom cell for Data Grid
*/
declare const DataGridCell: {
    (props: GridRenderCellParams): React.JSX.Element;
    defaultProps: {
        showSortingIcon: boolean;
    };
};
export default DataGridCell;
