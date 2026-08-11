import React from 'react';
import { TablePaginationProps as MuiTablePaginationProps } from '@mui/material/TablePagination';
import { Components, Theme } from '@mui/material';
export declare const getMuiTablePaginationThemeOverrides: () => Components<Omit<Theme, 'components'>>;
export declare enum TablePaginationLocalizationPlaceholders {
    CURRENT_PAGE_TO_END_PAGE = "{current_page_to_end_page}",
    TOTAL_ROWS_COUNT = "{total_rows_count}",
    TOTAL_PAGES_COUNT = "{total_pages_count}"
}
export interface TablePaginationLocalization {
    rowsPerPageLabel: string;
    rowsPerPageDescription: string;
    pageLabel: string;
    pageDescription: string;
    firstPageAriaLabel: string;
    prevPageAriaLabel: string;
    nextPageAriaLabel: string;
    lastPageAriaLabel: string;
}
export type TablePaginationProps = MuiTablePaginationProps & {
    translation: TablePaginationLocalization;
    rowsPerPageOptions: Array<number>;
};
declare const Pagination: {
    ({ ...props }: TablePaginationProps): React.JSX.Element;
    defaultProps: {
        translation: {
            rowsPerPageLabel: string;
            rowsPerPageDescription: string;
            pageLabel: string;
            pageDescription: string;
            firstPageAriaLabel: string;
            prevPageAriaLabel: string;
            nextPageAriaLabel: string;
            lastPageAriaLabel: string;
        };
        onPageChange: () => void;
        onRowsPerPageChange: () => void;
        rowsPerPageOptions: number[];
    };
};
export * from '@mui/material/TablePagination';
export default Pagination;
