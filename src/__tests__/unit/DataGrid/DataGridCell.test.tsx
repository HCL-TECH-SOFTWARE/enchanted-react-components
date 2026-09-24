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
  render, screen, fireEvent, waitFor, cleanup,
} from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { gridClasses } from '@mui/x-data-grid';
import { ThemeDirectionType, ThemeModeType, createEnchantedTheme } from '../../../theme';
import DataGrid from '../../../DataGrid';
import {
  sampleColumnsByDefaultLeft, sampleColumnsModifiedRight, sampleRowContainsAll,
  baseColumnConfig, iconEndColumnConfig, avatarColumnConfig, iconColumnConfig, endActionColumnConfig, allColumnConfig, sampleRowMultiStartIconAndTooltip, sampleColumnsMultiStartIconAndTooltip,
  sampleRows, sampleColumns,
} from '../../../DataGridCell/sampleCellConfig';

const theme = createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY);

// Helper to get only DataGrid data cells (excluding footer/pagination cells)
const getDataGridCells = (): HTMLElement[] => {
  return Array.from(document.querySelectorAll(`.${gridClasses.cell}`)) as HTMLElement[];
};

afterEach(cleanup);

describe('DataGridCell', () => {
  it('Should render DataGrid with DataGridCell on default Left alignment', () => {
    render(
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={sampleRowContainsAll}
          columns={sampleColumnsByDefaultLeft}
          totalCount={sampleRowContainsAll.length}
        />
      </ThemeProvider>,
    );
    expect(screen.getAllByRole('columnheader')[0].classList).not.toContain(gridClasses['columnHeader--alignRight']);
    expect(getDataGridCells()[0].classList).not.toContain(gridClasses['cell--textRight']);
  });

  it('Should render DataGrid with DataGridCell on Right alignment', () => {
    render(
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={sampleRowContainsAll}
          columns={sampleColumnsModifiedRight}
          totalCount={sampleRowContainsAll.length}
        />
      </ThemeProvider>,
    );
    expect(screen.getAllByRole('columnheader')[0].classList).toContain(gridClasses['columnHeader--alignRight']);
    expect(getDataGridCells()[0].classList).toContain(gridClasses['cell--textRight']);
  });

  it('Should render DataGrid with DataGridCell with base config', () => {
    render(
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={sampleRowContainsAll}
          columns={[{ ...baseColumnConfig }]}
          totalCount={sampleRowContainsAll.length}
        />
      </ThemeProvider>,
    );
    expect(screen.getByText(`${baseColumnConfig.headerName}`)).not.toBeNull();
  });

  it('Should render DataGrid with DataGridCell with iconEndColumn config', () => {
    render(
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={sampleRowContainsAll}
          columns={[{ ...iconEndColumnConfig }]}
          totalCount={sampleRowContainsAll.length}
        />
      </ThemeProvider>,
    );
    expect(screen.getByText(`${iconEndColumnConfig.headerName}`)).not.toBeNull();
    // For icon column, iconEnd comes next after typography
    const cellContent = getDataGridCells()[0].querySelector('.MuiSvgIcon-root');
    expect(cellContent).not.toBeNull();
  });

  it('Should render DataGrid with DataGridCell with avatarColumn config', () => {
    render(
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={sampleRowContainsAll}
          columns={[{ ...avatarColumnConfig }]}
          totalCount={sampleRowContainsAll.length}
        />
      </ThemeProvider>,
    );
    expect(screen.getByText(`${avatarColumnConfig.headerName}`)).not.toBeNull();
    const avatarEl = getDataGridCells()[0].querySelector('.MuiAvatar-root');
    expect(avatarEl).not.toBeNull();
  });

  it('Should render DataGrid with DataGridCell with iconColumn config', () => {
    render(
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={sampleRowContainsAll}
          columns={[{ ...iconColumnConfig }]}
          totalCount={sampleRowContainsAll.length}
        />
      </ThemeProvider>,
    );
    expect(screen.getByText(`${iconColumnConfig.headerName}`)).not.toBeNull();
    // For icon column, icon comes first before typography
    const iconEl = getDataGridCells()[0].querySelector('.MuiSvgIcon-root');
    expect(iconEl).not.toBeNull();
  });

  it('Should render DataGrid with DataGridCell with endActionColumn config', async () => {
    render(
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={sampleRowContainsAll}
          columns={[{ ...endActionColumnConfig }]}
          totalCount={sampleRowContainsAll.length}
        />
      </ThemeProvider>,
    );
    expect(screen.getByText(`${endActionColumnConfig.headerName}`)).not.toBeNull();

    const withEndActionsCell = getDataGridCells()[0].firstChild as HTMLElement;
    expect((getDataGridCells()[0].firstChild as HTMLDivElement).children[1].getAttribute('aria-hidden')).toEqual('true'); // Should not show endActions just yet
    fireEvent.mouseEnter(withEndActionsCell);

    await waitFor(() => {
      expect((getDataGridCells()[0].firstChild as HTMLDivElement).children[1].getAttribute('aria-hidden')).toEqual('false'); // endActions were appended on mouseEnter into the cell
    });
  });

  it('Should render DataGrid with DataGridCell with allColumn config', () => {
    render(
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={sampleRowContainsAll}
          columns={[{ ...allColumnConfig }]}
          totalCount={sampleRowContainsAll.length}
        />
      </ThemeProvider>,
    );
    expect(screen.getByText(`${allColumnConfig.headerName}`)).not.toBeNull();
    const cell = getDataGridCells()[0];
    expect(cell.querySelector('.MuiSvgIcon-root')).not.toBeNull();
    expect(cell.querySelector('.MuiTypography-root')).not.toBeNull();
    expect(cell.querySelector('.MuiTypography-root')?.innerHTML).toEqual(sampleRowContainsAll[0].all);
  });

  it('Should render DataGrid with DataGridCell with multiple start icon', () => {
    render(
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={sampleRowMultiStartIconAndTooltip}
          columns={sampleColumnsMultiStartIconAndTooltip}
          totalCount={sampleColumnsMultiStartIconAndTooltip.length}
        />
      </ThemeProvider>,
    );
    expect(getDataGridCells()[0]?.querySelector('[data-mui-test="document--tasksIcon"]')).not.toBeNull();
    expect(getDataGridCells()[1]?.querySelector('[data-mui-test="starIcon"]')).not.toBeNull();
    expect(getDataGridCells()[2]?.querySelector('[data-mui-test="radioIcon"]')).not.toBeNull();
  });

  it('should render DataGridCell with subTitle when subTitle is present in the data', () => {
    render(
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={sampleRows}
          columns={sampleColumns}
          totalCount={sampleRows.length}
        />
      </ThemeProvider>,
    );
    expect(screen.getByText(`${sampleColumns[0].headerName}`)).not.toBeNull();
    const subTitleEl = getDataGridCells()[0].querySelector('.MuiDataGrid-cell--subTitle');
    expect(subTitleEl).not.toBeNull();
    expect(screen.getByText('Fictional character')).not.toBeNull();
  });
});
