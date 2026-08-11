import React from 'react';
import { TableProps } from '@mui/material/Table';
declare const Table: {
    ({ ...props }: TableProps): React.JSX.Element;
    defaultProps: {
        padding: string;
        size: string;
        stickyHeader: boolean;
    };
};
export * from '@mui/material/Table';
export default Table;
