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
import React from 'react';
import MuiTablePagination, { TablePaginationProps as MuiTablePaginationProps } from '@mui/material/TablePagination';
import { Components, Theme } from '@mui/material';
import TableFooter from '@mui/material/TableFooter';

import Table from '../Table/Table';
import TableRow from '../Table/TableRow';
import CustomTablePaginationActions from './CustomTablePaginationActions';

export const getMuiTablePaginationThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiTablePagination: {
      styleOverrides: {
        root: ({ ownerState }) => {
          return ({
            borderBottom: 'none',
            '[data-testid=tablePaginationActionsRoot]': {
              margin: 0,
            },
            '& .MuiTablePagination-toolbar': {
              margin: '4px 12px',
              padding: 0,
              position: 'relative',
              minHeight: '28px', // overrides MUI min height set for this
              '& .MuiTablePagination-spacer': {
                display: 'none',
              },
              '& .MuiTablePagination-selectLabel': {
                display: 'none',
              },
              '& .MuiTablePagination-selectLabel + div': {
                display: 'none',
              },
              '& .MuiTablePagination-displayedRows': {
                display: 'none',
              },
              '& [data-testid=tablePaginationActionsRoot]': {
                position: 'absolute',
                right: '0',
                display: 'inline-flex',
                justifyContent: 'space-between',
                width: '100%',
                '& > div': {
                  display: 'flex',
                },
                '.MuiFormControl-root': {
                  height: '28px',
                },
                // styles for Change Page Buttons inside TablePagination
                'button[data-testid=tablePaginationActionsPageFirst]': {
                  marginRight: '4px',
                },
                'button[data-testid=tablePaginationActionsPagePrev]': {
                  marginRight: '4px',
                },
                'button[data-testid=tablePaginationActionsPageNext]': {
                  marginLeft: '4px',
                },
                'button[data-testid=tablePaginationActionsPageLast]': {
                  marginLeft: '4px',
                },
                // styles for Page label Typography inside TablePagination
                '.MuiTypography-root': {
                  margin: 'auto 0',
                  display: 'inline-flex',
                },
                'div[data-testid=tablePaginationActionsRowsDiv]': {
                  display: 'inline-flex',
                  '.MuiFormLabel-root': {
                    display: 'none', // hides the form action label space from Autocomplete
                  },
                  '> div:first-of-type': {
                    margin: '0 12px 0 4px',
                  },
                },
                'div[data-testid=tablePaginationActionsPageDiv]': {
                  display: 'inline-flex',
                  '.MuiFormLabel-root': {
                    display: 'none', // hides the form action label space from Autocomplete
                  },
                  '> div:first-of-type': {
                    margin: '0 4px',
                  },
                },
                '.MuiTypography-root[data-testid=tablePaginationActionsPageTotal]': {
                  margin: 'auto 0',
                },
                // styles for Autocomplete inside TablePagination
                '& .MuiGrid-root.MuiGrid-container': {
                  minWidth: '0px',
                },
                '[data-testid=tablePaginationActionsRowsDiv]': {
                  '.MuiAutocomplete-clearIndicator': {
                    display: 'none',
                  },
                },
                '[data-testid=tablePaginationActionsPageDiv]': {
                  '.MuiAutocomplete-endAdornment': {
                    display: 'none',
                  },
                },
              },
            },
          });
        },
      },
    },
  };
};

export enum TablePaginationLocalizationPlaceholders {
  CURRENT_PAGE_TO_END_PAGE = '{current_page_to_end_page}',
  TOTAL_ROWS_COUNT = '{total_rows_count}',
  TOTAL_PAGES_COUNT = '{total_pages_count}',
}

export interface TablePaginationLocalization {
  rowsPerPageLabel: string,
  rowsPerPageDescription: string,
  pageLabel: string,
  pageDescription: string,
  firstPageAriaLabel: string,
  prevPageAriaLabel: string,
  nextPageAriaLabel: string,
  lastPageAriaLabel: string,
}

export type TablePaginationProps = MuiTablePaginationProps & {
  translation: TablePaginationLocalization,
  rowsPerPageOptions: Array<number>,
}

const Pagination = ({ ...props }: TablePaginationProps) => {
  const { translation, ...rest } = props;

  return (
    <>
      {props.count > 0 && (
      <Table>
        <TableFooter>
          <TableRow>
            <MuiTablePagination
              {...rest}
              ActionsComponent={() => {
                return (
                  <CustomTablePaginationActions
                    count={props.count}
                    page={props.page}
                    rowsPerPage={props.rowsPerPage}
                    onPageChange={props.onPageChange}
                    onRowsPerPageChange={props.onRowsPerPageChange}
                    showFirstButton
                    showLastButton
                    getItemAriaLabel={(type: 'first' | 'last' | 'next' | 'previous') => { return type; }}
                    translation={translation}
                    rowsPerPageOptions={props.rowsPerPageOptions}
                  />
                );
              }}
            />
          </TableRow>
        </TableFooter>
      </Table>
      )}
    </>
  );
};

Pagination.defaultProps = {
  translation: {
    rowsPerPageLabel: 'Show rows:',
    rowsPerPageDescription: `${TablePaginationLocalizationPlaceholders.CURRENT_PAGE_TO_END_PAGE} of ${TablePaginationLocalizationPlaceholders.TOTAL_ROWS_COUNT}`,
    pageLabel: 'Page:',
    pageDescription: `of ${TablePaginationLocalizationPlaceholders.TOTAL_PAGES_COUNT}`,
    firstPageAriaLabel: 'go to first page',
    prevPageAriaLabel: 'go to previous page',
    nextPageAriaLabel: 'go to next page',
    lastPageAriaLabel: 'go to last page',
  },
  /* eslint-why user defined functions, defaults only put in place for test rendering */
  /* eslint-disable no-empty-function */
  onPageChange: () => {},
  onRowsPerPageChange: () => {},
  /* eslint-enable no-empty-function */
  rowsPerPageOptions: [10, 25, 50, 100],
};

export * from '@mui/material/TablePagination';
export default Pagination;
