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
  render, screen, fireEvent, waitFor, cleanup, act,
} from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import userEvent from '@testing-library/user-event';

import { ThemeDirectionType, ThemeModeType, createEnchantedTheme } from '../../../theme';
import DataGrid, { DataGridTestIds } from '../../../DataGrid';
import {
  sampleRows, sampleColumns, sampleMinimalRows, processRow,
} from '../../../DataGrid/sampleData';

const theme = createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY);

afterEach(cleanup);

describe('DataGrid', () => {
  it('Should render DataGrid without crashing - rows and columns are empty in defaultProps', () => {
    render(
      <ThemeProvider theme={theme}>
        <DataGrid totalCount={0} />
      </ThemeProvider>,
    );
    expect(screen.getByRole('grid')).not.toBeNull();
  });

  it('Should render DataGrid with checkboxSelection=true and fire onCheckboxClick callback prop', async () => {
    const mockFn = jest.fn();
    const { getAllByTestId } = render(
      <ThemeProvider theme={theme}>
        <DataGrid checkboxSelection rows={sampleRows} columns={sampleColumns} onCheckboxClick={mockFn} totalCount={sampleRows.length} />
      </ThemeProvider>,
    );
    expect(screen.getByRole('grid')).not.toBeNull();

    // Expect no separator visible
    const separatorIconParentStyle = window.getComputedStyle(screen.getAllByTestId('Divider')[0].parentElement as Element);
    expect(separatorIconParentStyle.display).toBe('none');

    const element = getAllByTestId(DataGridTestIds.DATAGRID_CHECKBOX)[0];
    await act(async () => {
      fireEvent.click(element);
    });
    await waitFor(() => { expect(mockFn).toHaveBeenCalled(); });
  });

  it('Should render DataGrid with sample data', () => {
    render(
      <ThemeProvider theme={theme}>
        <DataGrid rows={processRow(sampleRows, false)} columns={sampleColumns} totalCount={sampleRows.length} />
      </ThemeProvider>,
    );
    expect(screen.getByRole('grid')).not.toBeNull();
    expect(screen.getAllByRole('columnheader')).not.toBeNull();
    expect(screen.getAllByRole('row')).not.toBeNull();
    // Check if there are at least half the expected number of rows: DOM print limit https://testing-library.com/docs/dom-testing-library/api-debugging/
    expect(screen.getAllByRole('row').length).toBeGreaterThan(10);

    // Expect no menu icon visible on columns - until https://jira.cwp.pnp-hcl.com/browse/DXQ-30099 implementation starts
    try {
      expect(screen.getAllByTestId('TripleDotsVerticalIcon')).toBeNull(); // should have disableColumnMenu=true by default as per design
    } catch (err) {
      expect((err as Error).message).toContain('Unable to find an element by: [data-testid="TripleDotsVerticalIcon"]');
    }
  });

  it('Should navigate on Column Header via keyboard', async () => {
    const userKeyboard = userEvent.keyboard;
    render(
      <ThemeProvider theme={theme}>
        <DataGrid checkboxSelection rows={processRow(sampleMinimalRows, true)} columns={sampleColumns} totalCount={sampleMinimalRows.length} />
      </ThemeProvider>,
    );
    expect(screen.getByRole('grid')).not.toBeNull();

    // Need to focus on the column Headers on tab
    await act(async () => {
      await userKeyboard('{Tab}');
    });
    await waitFor(() => {
      expect(window.document.activeElement?.classList.contains('MuiDataGrid-columnHeaders')).toBe(true);
    });

    // Need to focus on the select all checkbox on arrow right
    await act(async () => {
      await userKeyboard('{ArrowRight}');
    });
    await waitFor(() => {
      expect(window.document.activeElement?.classList.contains('PrivateSwitchBase-input')).toBe(true);
    });

    // Need to focus on the sort icon on arrow right again
    await act(async () => {
      await userKeyboard('{ArrowRight}');
    });
    await act(async () => {
      await userKeyboard('{ArrowRight}');
    });
    await waitFor(() => {
      expect(window.document.activeElement?.classList.contains('MuiDataGrid-columnHeader--sortable')).toBe(true);
    });

    // Need to refocus on select all checkbox on arrow left after going to sort icon
    await act(async () => {
      await userKeyboard('{ArrowLeft}');
    });
    await act(async () => {
      await userKeyboard('{ArrowLeft}');
    });
    await waitFor(() => {
      expect(window.document.activeElement?.classList.contains('PrivateSwitchBase-input')).toBe(true);
    });

    // Need to refocus on the column Headers when press arrow left from select all
    await act(async () => {
      await userKeyboard('{ArrowLeft}');
    });
    await waitFor(() => {
      expect(window.document.activeElement?.classList.contains('MuiDataGrid-columnHeaders')).toBe(true);
    });

    // Need to focus first row when press arrow down
    await act(async () => {
      await userKeyboard('{ArrowDown}');
    });
    await waitFor(() => {
      expect(window.document.activeElement?.classList.contains('MuiDataGrid-row')).toBe(true);
    });
  });

  it('Should navigate on Row via keyboard by Arrow Up/Down', async () => {
    const userKeyboard = userEvent.keyboard;
    render(
      <ThemeProvider theme={theme}>
        <DataGrid checkboxSelection rows={sampleMinimalRows} columns={sampleColumns} totalCount={sampleMinimalRows.length} />
      </ThemeProvider>,
    );
    expect(screen.getByRole('grid')).not.toBeNull();

    // Need to focus on the first row when we press double tab
    await act(async () => {
      await userKeyboard('{Tab}{Tab}');
    });
    await waitFor(() => {
      expect(window.document.activeElement?.getAttribute('data-id')).toBe('Table row 1');
    });

    // Need focus on next row when we press arrow down
    await act(async () => {
      await userKeyboard('{ArrowDown}');
    });
    await waitFor(() => {
      expect(window.document.activeElement?.getAttribute('data-id')).toBe('Table row 2');
    });

    // Need focus on previous row when we press arrow up
    await act(async () => {
      await userKeyboard('{ArrowUp}');
    });
    await waitFor(() => {
      expect(window.document.activeElement?.getAttribute('data-id')).toBe('Table row 1');
    });
  });

  it('Should select and unselect Row/s via keyboard by Enter', async () => {
    const userKeyboard = userEvent.keyboard;
    render(
      <ThemeProvider theme={theme}>
        <DataGrid checkboxSelection rows={sampleMinimalRows} columns={sampleColumns} totalCount={sampleMinimalRows.length} />
      </ThemeProvider>,
    );
    expect(screen.getByRole('grid')).not.toBeNull();

    // Need to focus on the first row when we press double tab
    await act(async () => {
      await userKeyboard('{Tab}{Tab}');
    });
    await waitFor(() => {
      expect(window.document.activeElement?.getAttribute('data-id')).toBe('Table row 1');
    });

    // Need to select row when press enter
    await act(async () => {
      await userKeyboard('{Enter}');
    });
    await waitFor(() => {
      expect(window.document.activeElement?.classList.contains('Mui-selected')).toBe(true);
    });

    // Need to unselect row when row is already selected by pressing enter
    await act(async () => {
      await userKeyboard('{Enter}');
    });
    await waitFor(() => {
      expect(window.document.activeElement?.classList.contains('Mui-selected')).toBe(false);
    });
  });

  it('Should select and unselect Row/s via keyboard by Shift/Arrow', async () => {
    const userKeyboard = userEvent.keyboard;
    const { container } = render(
      <ThemeProvider theme={theme}>
        <DataGrid checkboxSelection rows={sampleMinimalRows} columns={sampleColumns} totalCount={sampleMinimalRows.length} />
      </ThemeProvider>,
    );
    expect(screen.getByRole('grid')).not.toBeNull();

    // Need to focus on the first row when we press double tab
    await act(async () => {
      await userKeyboard('{Tab}{Tab}');
    });
    await waitFor(() => {
      expect(window.document.activeElement?.getAttribute('data-id')).toBe('Table row 1');
    });

    // Select current row and row below by holding shift and pressing arrow down
    await act(async () => {
      await userKeyboard('{ }{Shift>}{ArrowDown}{/Shift}');
    });
    await waitFor(() => {
      expect(container.querySelectorAll('.Mui-selected').length).toBe(2);
    });

    // Unselect current row below by holding shift and pressind arrow up
    await act(async () => {
      await userKeyboard('{Shift>}{ArrowUp}{/Shift}{ }');
    });
    await waitFor(() => {
      expect(container.querySelectorAll('.Mui-selected').length).toBe(0);
    });
  });

  it('Should select and unselect succeeding Row/s via keyboard by Shift/Arrow', async () => {
    const userKeyboard = userEvent.keyboard;
    const { container } = render(
      <ThemeProvider theme={theme}>
        <DataGrid checkboxSelection rows={sampleMinimalRows} columns={sampleColumns} totalCount={sampleMinimalRows.length} />
      </ThemeProvider>,
    );
    expect(screen.getByRole('grid')).not.toBeNull();

    // Need to focus on the first row when we press double tab
    await act(async () => {
      await userKeyboard('{Tab}{Tab}');
    });
    await waitFor(() => {
      expect(window.document.activeElement?.getAttribute('data-id')).toBe('Table row 1');
    });

    // Need to focus on the next row
    await act(async () => {
      await userKeyboard('{ArrowDown}');
    });
    await waitFor(() => {
      expect(window.document.activeElement?.getAttribute('data-id')).toBe('Table row 2');
    });

    // Select second and previous row by holding shift and pressing arrow up
    await act(async () => {
      await userKeyboard('{Enter}{Shift>}{ArrowUp}{/Shift}');
    });
    await waitFor(() => {
      expect(container.querySelectorAll('.Mui-selected').length).toBe(2);
    });

    // Unselect second and previous row by holding shift and pressing arrow down then enter
    await act(async () => {
      await userKeyboard('{Shift>}{ArrowDown}{/Shift}{Enter}');
    });
    await waitFor(() => {
      expect(container.querySelectorAll('.Mui-selected').length).toBe(0);
    });
  });

  it('Should render DataGrid with pagination', async () => {
    render(
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={processRow(sampleRows, false)}
          columns={sampleColumns}
          hideFooter={false}
          totalCount={sampleRows.length}
          pageSize={10}
        />
      </ThemeProvider>,
    );
    expect(screen.getByTestId(DataGridTestIds.DATAGRID_PAGINATION)).not.toBeNull();
  });

  it('Should navigate on Column sorting icon and click via keyboard', async () => {
    const userKeyboard = userEvent.keyboard;
    render(
      <ThemeProvider theme={theme}>
        <DataGrid checkboxSelection rows={processRow(sampleMinimalRows, true)} columns={sampleColumns} totalCount={sampleMinimalRows.length} />
      </ThemeProvider>,
    );
    expect(screen.getByRole('grid')).not.toBeNull();

    // every key needs to be within it's own act block
    await act(async () => {
      await userKeyboard('{Tab}');
    });
    await act(async () => {
      await userKeyboard('{ArrowRight}');
    });
    await act(async () => {
      await userKeyboard('{ArrowRight}');
    });
    await act(async () => {
      await userKeyboard('{ArrowRight}');
    });
    await act(async () => {
      await userKeyboard('{ }');
    });
    await waitFor(() => {
      expect(window.document.activeElement?.getAttribute('aria-sort')).toBe('ascending');
    });

    // Again pressing space key to change sort to 'descending'
    await act(async () => {
      await userKeyboard('{ }');
    });
    await waitFor(() => {
      expect(window.document.activeElement?.getAttribute('aria-sort')).toBe('descending');
    });
  });
});
