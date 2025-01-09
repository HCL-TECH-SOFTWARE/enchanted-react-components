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
import {
  render, screen, fireEvent, waitFor, within, cleanup, act,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@emotion/react';
import Pagination from '../../../Pagination';
import { TablePaginationTestIds } from '../../../Pagination/CustomTablePaginationActions';
import { createEnchantedTheme, ThemeDirectionType, ThemeModeType } from '../../../theme';

const theme = createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY);

afterEach(cleanup);

describe('TablePagination', () => {
  it('Render TablePagination', () => {
    render(
      <ThemeProvider theme={theme}>
        <Pagination page={0} rowsPerPage={10} count={100} />
      </ThemeProvider>,
    );
    expect(screen.getByTestId(TablePaginationTestIds.TABLE_PAGINATION_ACTIONS_ROOT)).not.toBeNull();
    expect(screen.getByTestId(TablePaginationTestIds.TABLE_PAGINATION_ROWS_DIV)).not.toBeNull();
    expect(screen.getByTestId(TablePaginationTestIds.TABLE_PAGINATION_PAGE_DIV)).not.toBeNull();
  });

  it('Should change page on TablePagination next page and prev page button click', async () => {
    const mockFn = jest.fn();

    render(
      <ThemeProvider theme={theme}>
        <Pagination page={0} rowsPerPage={10} count={100} onPageChange={mockFn} />
      </ThemeProvider>,
    );

    expect(screen.getByTestId(TablePaginationTestIds.TABLE_PAGINATION_PAGE_NEXT)).not.toBeNull();
    const nextButton = screen.getByTestId(TablePaginationTestIds.TABLE_PAGINATION_PAGE_NEXT);
    fireEvent.click(nextButton);
    await waitFor(() => { expect(mockFn).toHaveBeenCalled(); });

    expect(screen.getByTestId(TablePaginationTestIds.TABLE_PAGINATION_PAGE_PREV)).not.toBeNull();
    const prevButton = screen.getByTestId(TablePaginationTestIds.TABLE_PAGINATION_PAGE_PREV);
    fireEvent.click(prevButton);
    await waitFor(() => { expect(mockFn).toHaveBeenCalled(); });
  });

  it('Should change page on TablePagination last page and first page button click', async () => {
    const mockFn = jest.fn();

    render(
      <ThemeProvider theme={theme}>
        <Pagination page={0} rowsPerPage={10} count={100} onPageChange={mockFn} />
      </ThemeProvider>,
    );

    expect(screen.getByTestId(TablePaginationTestIds.TABLE_PAGINATION_PAGE_LAST)).not.toBeNull();
    const lastButton = screen.getByTestId(TablePaginationTestIds.TABLE_PAGINATION_PAGE_LAST);
    fireEvent.click(lastButton);
    await waitFor(() => { expect(mockFn).toHaveBeenCalled(); });

    expect(screen.getByTestId(TablePaginationTestIds.TABLE_PAGINATION_PAGE_FIRST)).not.toBeNull();
    const firstButton = screen.getByTestId(TablePaginationTestIds.TABLE_PAGINATION_PAGE_FIRST);
    fireEvent.click(firstButton);
    await waitFor(() => { expect(mockFn).toHaveBeenCalled(); });
  });

  it('Should change rowsPerPage size on TablePagination rows combobox value change', async () => {
    const mockFn = jest.fn();

    render(
      <ThemeProvider theme={theme}>
        <Pagination page={0} rowsPerPage={10} count={100} onRowsPerPageChange={mockFn} />
      </ThemeProvider>,
    );

    const element = screen.getAllByRole('combobox')[0];
    fireEvent.mouseDown(element);
    const listbox = within(screen.getByRole('listbox'));
    expect(listbox.getByText('25')).not.toBeNull();
    fireEvent.click(listbox.getByText('25'));
    await waitFor(() => { expect(mockFn).toHaveBeenCalled(); });
  });

  it('Should be able to jump to a specific page number on TablePagination page combobox value change', async () => {
    const mockFn = jest.fn();

    render(
      <ThemeProvider theme={theme}>
        <Pagination page={0} rowsPerPage={10} count={100} onPageChange={mockFn} />
      </ThemeProvider>,
    );

    const element = screen.getAllByRole('combobox')[1];
    fireEvent.mouseDown(element);
    const listbox = within(screen.getByRole('listbox'));
    expect(listbox.getByText('5')).not.toBeNull();
    fireEvent.click(listbox.getByText('5'));
    await waitFor(() => { expect(mockFn).toHaveBeenCalled(); });
  });

  it('Should NOT jump to any pagesize on TablePagination pagesize combobox INVALID value change', async () => {
    const mockFn = jest.fn();
    const ue = userEvent.setup();

    render(
      <ThemeProvider theme={theme}>
        <Pagination page={0} rowsPerPage={10} count={100} onPageChange={mockFn} />
      </ThemeProvider>,
    );

    const element = screen.getAllByRole('combobox')[0];

    await act(async () => {
      await ue.type(element, 'invalid-pagesize');
    });

    await act(async () => {
      await ue.type(element, '{Enter}');
    });

    await waitFor(() => { expect(mockFn).not.toHaveBeenCalled(); });
  });

  // it('Should NOT jump to any page on TablePagination page combobox INVALID value change', async () => {
  //   const mockFn = jest.fn();
  //   const ue = userEvent.setup();

  //   render(
  //     <Pagination page={0} rowsPerPage={10} count={100} onPageChange={mockFn} />,
  //   );

  //   const element = screen.getAllByRole('combobox')[1];

  //   act(async () => {
  //     await ue.type(element, 'invalid-page');
  //   });

  //   act(async () => {
  //     await ue.type(element, '{Enter}');
  //   });

  //   await waitFor(() => { expect(mockFn).not.toHaveBeenCalled(); });
  // });

  it('should hide pagination when total count is zero', () => {
    render(
      <ThemeProvider theme={theme}>
        <Pagination page={0} rowsPerPage={0} count={0} />
      </ThemeProvider>,
    );
    expect(screen.queryByTestId(TablePaginationTestIds.TABLE_PAGINATION_ACTIONS_ROOT)).toBeNull();
    expect(screen.queryByTestId(TablePaginationTestIds.TABLE_PAGINATION_ROWS_DIV)).toBeNull();
    expect(screen.queryByTestId(TablePaginationTestIds.TABLE_PAGINATION_PAGE_DIV)).toBeNull();
  });

  it('should have correct aria-label for rows per page in pagination', () => {
    render(
      <ThemeProvider theme={theme}>
        <Pagination page={0} rowsPerPage={10} count={100} />
      </ThemeProvider>,
    );
    const rowsPerPage = screen.getByLabelText('Show rows:');
    expect(rowsPerPage).not.toBeNull();
    expect(rowsPerPage.getAttribute('aria-label')).toBe('Show rows:');
  });

  it('should have correct aria-label for page number in pagination', () => {
    render(
      <ThemeProvider theme={theme}>
        <Pagination page={0} rowsPerPage={10} count={100} />
      </ThemeProvider>,
    );
    const pageNumber = screen.getByLabelText('Page:');
    expect(pageNumber).not.toBeNull();
    expect(pageNumber.getAttribute('aria-label')).toBe('Page:');
  });
});
