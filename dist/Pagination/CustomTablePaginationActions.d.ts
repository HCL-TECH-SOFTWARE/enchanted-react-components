import React from 'react';
import { TablePaginationActionsProps as MuiTablePaginationActionsProps } from '@mui/material/TablePagination/TablePaginationActions';
import { TablePaginationProps } from './Pagination';
export declare enum TablePaginationTestIds {
    TABLE_PAGINATION_ACTIONS_ROOT = "tablePaginationActionsRoot",
    TABLE_PAGINATION_PAGE_DIV = "tablePaginationActionsPageDiv",
    TABLE_PAGINATION_PAGE_LABEL = "tablePaginationActionsPageLabel",
    TABLE_PAGINATION_PAGE_TOTAL = "tablePaginationActionsPageTotal",
    TABLE_PAGINATION_PAGE_FIRST = "tablePaginationActionsPageFirst",
    TABLE_PAGINATION_PAGE_PREV = "tablePaginationActionsPagePrev",
    TABLE_PAGINATION_PAGE_NEXT = "tablePaginationActionsPageNext",
    TABLE_PAGINATION_PAGE_LAST = "tablePaginationActionsPageLast",
    TABLE_PAGINATION_ROWS_DIV = "tablePaginationActionsRowsDiv",
    TABLE_PAGINATION_ROWS_LABEL = "tablePaginationActionsRowsLabel",
    TABLE_PAGINATION_ROWS_TOTAL = "tablePaginationActionsRowsTotal"
}
type CustomTablePaginationActionsProps = MuiTablePaginationActionsProps & TablePaginationProps;
declare const CustomTablePaginationActions: (props: CustomTablePaginationActionsProps) => React.JSX.Element;
export default CustomTablePaginationActions;
