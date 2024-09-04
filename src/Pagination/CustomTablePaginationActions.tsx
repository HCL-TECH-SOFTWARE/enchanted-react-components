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
import { TablePaginationActionsProps as MuiTablePaginationActionsProps } from '@mui/material/TablePagination/TablePaginationActions';
import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import KeyboardArrowLeft from '@hcl-software/enchanted-icons/dist/carbon/es/chevron--left';
import KeyboardArrowRight from '@hcl-software/enchanted-icons/dist/carbon/es/chevron--right';
import FirstPageIcon from '@hcl-software/enchanted-icons/dist/carbon/es/page--first';
import LastPageIcon from '@hcl-software/enchanted-icons/dist/carbon/es/page--last';
import IconButton from '../IconButton/IconButton';
import Typography from '../Typography/Typography';
import Autocomplete from '../Autocomplete/Autocomplete';
import { TYPOGRAPHY, ThemeDirectionType } from '../theme';
import { TablePaginationProps, TablePaginationLocalizationPlaceholders } from './Pagination';
import Tooltip from '../Tooltip/Tooltip';

export enum TablePaginationTestIds {
  TABLE_PAGINATION_ACTIONS_ROOT = 'tablePaginationActionsRoot',
  TABLE_PAGINATION_PAGE_DIV = 'tablePaginationActionsPageDiv',
  TABLE_PAGINATION_PAGE_LABEL = 'tablePaginationActionsPageLabel',
  TABLE_PAGINATION_PAGE_TOTAL = 'tablePaginationActionsPageTotal',
  TABLE_PAGINATION_PAGE_FIRST = 'tablePaginationActionsPageFirst',
  TABLE_PAGINATION_PAGE_PREV = 'tablePaginationActionsPagePrev',
  TABLE_PAGINATION_PAGE_NEXT = 'tablePaginationActionsPageNext',
  TABLE_PAGINATION_PAGE_LAST = 'tablePaginationActionsPageLast',
  TABLE_PAGINATION_ROWS_DIV = 'tablePaginationActionsRowsDiv',
  TABLE_PAGINATION_ROWS_LABEL = 'tablePaginationActionsRowsLabel',
  TABLE_PAGINATION_ROWS_TOTAL = 'tablePaginationActionsRowsTotal',
}

type CustomTablePaginationActionsProps = MuiTablePaginationActionsProps & TablePaginationProps;

const CustomTablePaginationActions = (props: CustomTablePaginationActionsProps) => {
  const theme = useTheme();
  const {
    count, page, rowsPerPage, onPageChange, onRowsPerPageChange, translation, rowsPerPageOptions,
  } = props;
  const atLeast480px = useMediaQuery('(min-width:480px)');
  const atLeast360px = useMediaQuery('(min-width:360px)');

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  const currentPageShownStart = (page * rowsPerPage) + 1;
  const currentPageShownEnd = (page + 1) * rowsPerPage;

  return (
    <Box data-testid={TablePaginationTestIds.TABLE_PAGINATION_ACTIONS_ROOT} sx={{ flexShrink: 0, ml: 2.5 }}>
      <div data-testid={TablePaginationTestIds.TABLE_PAGINATION_ROWS_DIV}>
        { atLeast480px
          && <Typography variant="body2" data-testid={TablePaginationTestIds.TABLE_PAGINATION_ROWS_LABEL}>{translation.rowsPerPageLabel}</Typography>}
        <Autocomplete
          noOptionsText=""
          options={rowsPerPageOptions}
          getOptionLabel={(option) => { return (Number(option)).toString(); }}
          sx={{ '& .MuiFormControl-root': { minWidth: '0px' }, '& .MuiAutocomplete-inputRoot': { width: '62px' } }}
          componentsProps={{
            popper: {
              sx: {
                '.MuiAutocomplete-listbox': {
                  ...TYPOGRAPHY.body2,
                  '::-webkit-scrollbar': {
                    display: 'none',
                  },
                  '& .MuiAutocomplete-option': {
                    '&[aria-selected=true]': {
                      backgroundColor: `${theme.palette.action.activeOpacity}`,
                      '&.Mui-focused': {
                        backgroundColor: `${theme.palette.action.activeOpacity}`,
                      },
                      '&.Mui-focusVisible': {
                        backgroundColor: 'transparent',
                      },
                    },
                    '&.Mui-focusVisible': {
                      border: `1px solid ${theme.palette.primary.main}`,
                      backgroundColor: 'transparent',
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                      },
                    },
                  },
                },
              },
            },
          }}
          value={rowsPerPage}
          onChange={(event, value) => {
            if (onRowsPerPageChange) {
              const evt = { ...(event as unknown as React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>), target: { ...event.target, value: String(value) } };
              // @ts-ignore force change the value of target value, there is mismatch on event.target.value and onchange value on keydown event
              onRowsPerPageChange(evt);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              const targetValue = Number((event.target as HTMLInputElement).value);
              if (!rowsPerPageOptions.includes(targetValue)) {
                (event.target as HTMLElement).blur();
              } else if (onRowsPerPageChange) {
                if (targetValue === rowsPerPage) {
                  // handles when user retypes same number as existing rowsPerPage and hits double space twice (in Mac this appends a dot depending on laptop settings)
                  (event.target as HTMLElement).blur(); // should just go back to existing value
                } else {
                  // eslint-why KeyboardEvent for accessibility does not match expected TablePagination onRowsPerPageChange event type
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onRowsPerPageChange(event as any);
                }
              }
            }
          }}
        />
        { atLeast360px
          && (
          <Typography variant="body2" data-testid={TablePaginationTestIds.TABLE_PAGINATION_ROWS_TOTAL}>
            {`${translation.rowsPerPageDescription.replace(
              TablePaginationLocalizationPlaceholders.CURRENT_PAGE_TO_END_PAGE,
              `${currentPageShownStart}-${currentPageShownEnd < count ? currentPageShownEnd : count}`,
            ).replace(TablePaginationLocalizationPlaceholders.TOTAL_ROWS_COUNT, `${count}`)}`}
          </Typography>
          )}
      </div>
      <div data-testid={TablePaginationTestIds.TABLE_PAGINATION_PAGE_DIV}>
        <Tooltip title={theme.direction === ThemeDirectionType.RTL ? translation.lastPageAriaLabel : translation.firstPageAriaLabel} placement="top">
          <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label={translation.firstPageAriaLabel}
            data-testid={TablePaginationTestIds.TABLE_PAGINATION_PAGE_FIRST}
          >
            {theme.direction === ThemeDirectionType.RTL ? <LastPageIcon /> : <FirstPageIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip title={theme.direction === ThemeDirectionType.RTL ? translation.nextPageAriaLabel : translation.prevPageAriaLabel} placement="top">
          <IconButton
            onClick={handleBackButtonClick}
            disabled={page === 0}
            aria-label={translation.prevPageAriaLabel}
            data-testid={TablePaginationTestIds.TABLE_PAGINATION_PAGE_PREV}
          >
            {theme.direction === ThemeDirectionType.RTL ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </IconButton>
        </Tooltip>
        { atLeast480px
          && <Typography variant="body2" data-testid={TablePaginationTestIds.TABLE_PAGINATION_PAGE_LABEL}>{translation.pageLabel}</Typography>}
        <Autocomplete
          noOptionsText=""
          options={Array.from(Array(Math.ceil(count / rowsPerPage)).keys())}
          getOptionLabel={(option) => { return (Number(option) + 1).toString(); }}
          sx={{ '& .MuiFormControl-root': { minWidth: '0px' }, '& .MuiAutocomplete-inputRoot': { width: '40px' } }}
          componentsProps={{
            popper: {
              sx: {
                '.MuiAutocomplete-listbox': {
                  ...TYPOGRAPHY.body2,
                  '::-webkit-scrollbar': {
                    display: 'none',
                  },
                  '& .MuiAutocomplete-option': {
                    '&[aria-selected=true]': {
                      backgroundColor: `${theme.palette.action.activeOpacity}`,
                      '&.Mui-focused': {
                        backgroundColor: `${theme.palette.action.activeOpacity}`,
                      },
                      '&.Mui-focusVisible': {
                        backgroundColor: 'transparent',
                      },
                    },
                    '&.Mui-focusVisible': {
                      border: `1px solid ${theme.palette.primary.main}`,
                      backgroundColor: 'transparent',
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                      },
                    },
                  },
                },
              },
            },
          }}
          value={page}
          onChange={(event, value) => { onPageChange(event as unknown as React.MouseEvent<HTMLButtonElement, MouseEvent>, Number(value)); }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              const targetValue = Number((event.target as HTMLInputElement).value);
              const numberTarget = Number.isNaN(targetValue) ? targetValue : (targetValue - 1);
              if (!Array.from(Array(Math.ceil(count / rowsPerPage)).keys()).includes(numberTarget)) {
                (event.target as HTMLElement).blur();
              } else if ((targetValue - 1) === page) {
                // handles when user retypes same number as existing page and hits double space twice (in Mac this appends a dot depending on laptop settings)
                (event.target as HTMLElement).blur(); // should just go back to existing value
              } else {
                onPageChange(null, targetValue - 1);
              }
            }
          }}
        />
        { atLeast480px
          && (
            <Typography variant="body2" data-testid={TablePaginationTestIds.TABLE_PAGINATION_PAGE_TOTAL}>
              {`${translation.pageDescription.replace(TablePaginationLocalizationPlaceholders.TOTAL_PAGES_COUNT, `${Math.max(0, Math.ceil(count / rowsPerPage) - 1) + 1}`)}`}
            </Typography>
          )}
        <Tooltip title={theme.direction === ThemeDirectionType.RTL ? translation.prevPageAriaLabel : translation.nextPageAriaLabel} placement="top">
          <IconButton
            onClick={handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label={translation.nextPageAriaLabel}
            data-testid={TablePaginationTestIds.TABLE_PAGINATION_PAGE_NEXT}
          >
            {theme.direction === ThemeDirectionType.RTL ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </IconButton>
        </Tooltip>
        <Tooltip title={theme.direction === ThemeDirectionType.RTL ? translation.firstPageAriaLabel : translation.lastPageAriaLabel} placement="top">
          <IconButton
            onClick={handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label={translation.lastPageAriaLabel}
            data-testid={TablePaginationTestIds.TABLE_PAGINATION_PAGE_LAST}
          >
            {theme.direction === ThemeDirectionType.RTL ? <FirstPageIcon /> : <LastPageIcon />}
          </IconButton>
        </Tooltip>
      </div>
    </Box>
  );
};

export default CustomTablePaginationActions;
