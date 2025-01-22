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
    expect((screen.getAllByRole('row')[0].firstChild as HTMLElement).classList).not.toContain(gridClasses['columnHeader--alignRight']);
    expect((screen.getAllByRole('row')[1].firstChild as HTMLElement).classList).not.toContain(gridClasses['cell--textRight']);
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
    expect((screen.getAllByRole('row')[0].firstChild as HTMLElement).classList).toContain(gridClasses['columnHeader--alignRight']);
    expect((screen.getAllByRole('row')[1].firstChild as HTMLElement).classList).toContain(gridClasses['cell--textRight']);
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
    expect(screen.getByLabelText(`${baseColumnConfig.headerName}`)).not.toBeNull();
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
    expect(screen.getByLabelText(`${iconEndColumnConfig.headerName}`)).not.toBeNull();
    // For icon column, iconEnd comes next after typography
    expect((screen.getAllByRole('cell')[0].firstChild?.childNodes[1].firstChild as HTMLElement).classList).toContain('MuiSvgIcon-root');
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
    expect(screen.getByLabelText(`${avatarColumnConfig.headerName}`)).not.toBeNull();
    expect((screen.getAllByRole('cell')[0].firstChild?.childNodes[0].firstChild as HTMLElement).classList).toContain('MuiAvatar-root');
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
    expect(screen.getByLabelText(`${iconColumnConfig.headerName}`)).not.toBeNull();
    // For icon column, icon comes first before typography
    expect((screen.getAllByRole('cell')[0].firstChild?.childNodes[0].firstChild as HTMLElement).classList).toContain('MuiSvgIcon-root');
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
    expect(screen.getByLabelText(`${endActionColumnConfig.headerName}`)).not.toBeNull();

    const withEndActionsCell = screen.getAllByRole('cell')[0].firstChild as HTMLElement;
    expect((screen.getAllByRole('cell')[0].firstChild as HTMLDivElement).children[1].getAttribute('aria-hidden')).toEqual('true'); // Should not show endActions just yet
    fireEvent.mouseEnter(withEndActionsCell);

    await waitFor(() => {
      expect((screen.getAllByRole('cell')[0].firstChild as HTMLDivElement).children[1].getAttribute('aria-hidden')).toEqual('false'); // endActions were appended on mouseEnter into the cell
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
    expect(screen.getByLabelText(`${allColumnConfig.headerName}`)).not.toBeNull();
    expect((screen.getAllByRole('cell')[0].firstChild?.childNodes[0].firstChild as HTMLElement).classList).toContain('MuiSvgIcon-root');
    expect((screen.getAllByRole('cell')[0].firstChild?.childNodes[1].firstChild as HTMLElement).classList).toContain('MuiTypography-root');
    expect((screen.getAllByRole('cell')[0].firstChild?.childNodes[1].firstChild as HTMLElement).innerHTML).toEqual(sampleRowContainsAll[0].all);
    expect((screen.getAllByRole('cell')[0].firstChild?.childNodes[2].firstChild as HTMLElement).classList).toContain('MuiSvgIcon-root');
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
    expect((screen.getAllByRole('cell')[0]?.firstChild?.firstChild?.firstChild as SVGSVGElement).getAttribute('data-mui-test')).toContain('document--tasksIcon');
    expect((screen.getAllByRole('cell')[1]?.firstChild?.firstChild?.firstChild as SVGSVGElement).getAttribute('data-mui-test')).toContain('starIcon');
    expect((screen.getAllByRole('cell')[2]?.firstChild?.firstChild?.firstChild as SVGSVGElement).getAttribute('data-mui-test')).toContain('radioIcon');
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
    expect(screen.getByLabelText(`${sampleColumns[0].headerName}`)).not.toBeNull();
    expect((screen.getAllByRole('cell')[0].firstChild?.childNodes[2].lastChild as HTMLElement).classList).toContain('MuiDataGrid-cell--subTitle');
    expect(screen.getByText('Fictional character')).not.toBeNull();
  });
});
