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
import { StoryFn, Meta } from '@storybook/react';
import { GridSortModel, GridColumnVisibilityModel } from '@mui/x-data-grid';
import DataGrid from './DataGrid';
import {
  processRow, sampleColumns, sampleColumnsWithSubTitle, sampleRows,
  sampleRowsWithDisabledRow,
  sampleRowsWithSubTitle,
} from './sampleData';
import Typography from '../Typography';

export default {
  title: 'Data display/DataGrid',
  component: DataGrid,
  argTypes: {
    checkboxSelection: {
      if: { arg: 'interactive' },
      description: 'If true, the grid get a first column with a checkbox that allows to select rows.',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    rows: {
      description: 'Required. Array of objects of type GridRowsProp. Must always have a unique row identifier preferably id.',
      // if: { arg: 'interactive' },
    },
    columns: {
      // if: { arg: 'interactive' },
      description: 'Required. Array of objects of type GridColumns.',
    },
    disableColumnMenu: {
      if: { arg: 'interactive' },
      description: 'If true, the column menu is disabled.',
      table: { disable: false },
    },
    stickyHeader: {
      description: ' If true, it will make column header fixed on the top.',
      if: { arg: 'interactive' },
      type: 'boolean',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    rowHeight: {
      if: { arg: 'interactive' },
      description: 'Set the height in pixel of a row in the grid.',
      table: {
        defaultValue: {
          summary: 37,
        },
      },
    },
    headerHeight: {
      if: { arg: 'interactive' },
      description: 'Set the height in pixel of the column headers in the grid.',
      table: {
        defaultValue: {
          summary: 37,
        },
      },
    },
    hideFooter: {
      if: { arg: 'interactive' },
      description: 'If true, the grid get the footer will be visible.',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    autoHeight: {
      if: { arg: 'interactive' },
      description: 'If true, the grid height is dynamic and follow the number of rows in the grid.',
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    pageSize: {
      if: { arg: 'interactive' },
      description: 'Page size or number of rows to render',
      control: { type: 'select' },
      options: [10, 25, 50, 100],
    },
    page: {
      description: 'Current page number - Storybook page options are dynamically computed by TablePagination component and cannot be controlled',
      control: false,
    },
    totalCount: {
      description: 'Total number of rows for all pages set by the sample data so it cannot be controlled',
      control: false,
    },
    rowsPerPageOptions: {
      description: 'Customizes the options of the rows per page select field.',
      control: false,
      table: {
        defaultValue: {
          summary: [10, 25, 50, 100],
        },
      },
    },
    translation: {
      control: false,
      description: 'Use the TablePagination component\'s exported enum TablePaginationLocalizationPlaceholders to write your translations',
    },
    pagination: {
      control: false,
      description: 'https://mui.com/x/api/data-grid/data-grid/',
    },
    onCheckboxClick: {
      control: false,
      description: 'Event handler for checkbox value change',
    },
    focusedRow: {
      control: false,
      description: 'Props state to tell data grid what is the focused row',
    },
  },
} as Meta<typeof DataGrid>;

const InteractiveExampleTemplate: StoryFn<typeof DataGrid> = (args) => {
  const [pageSize, setPageSize] = React.useState<number>(args.pageSize || 10);
  const [page, setPage] = React.useState<number>(args.page || 0);
  const [sortState, setSortState] = React.useState<GridSortModel>([{ field: 'id', sort: 'asc' }]); // based on sampleColumns field
  const [columnVisibilityState, setColumnVisibilityState] = React.useState<GridColumnVisibilityModel>(
    Object.assign({}, ...sampleColumns.map((col) => { return { [col.field]: true }; })),
  );

  React.useEffect(() => {
    setPageSize(args.pageSize || 10);
    setPage(0);
  }, [args.pageSize]);

  React.useEffect(() => {
    setPage(args.page || 0);
  }, [args.page]);

  const handleSortModelChange = (sortModel: GridSortModel) => {
    setSortState(sortModel);
  };

  const handleColumnVisibilityModelChange = (visibilityModel: GridColumnVisibilityModel) => {
    setColumnVisibilityState(visibilityModel);
  };

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        {...args}
        pageSize={pageSize}
        page={page}
        onPageSizeChange={(value) => {
          if (!Number.isNaN(value) && DataGrid.defaultProps.rowsPerPageOptions.includes(value)) {
            setPage(0);
            setPageSize(value);
          }
        }}
        onPageChange={(newPage) => {
          setPage(newPage);
        }}
        columnVisibilityModel={columnVisibilityState}
        onColumnVisibilityModelChange={handleColumnVisibilityModelChange}
        initialState={{
          sorting: {
            sortModel: [{ field: 'title', sort: 'asc' }],
          },
        }}
        sortModel={sortState}
        onSortModelChange={handleSortModelChange}
      />
    </div>
  );
};

const VisualTestTemplate: StoryFn<typeof DataGrid> = (args) => {
  const [pageSize, setPageSize] = React.useState<number>(args.pageSize || 10);
  const [page, setPage] = React.useState<number>(args.page || 0);
  const [sortState, setSortState] = React.useState<GridSortModel>([{ field: 'id', sort: 'asc' }]); // based on sampleColumns field
  const [columnVisibilityState, setColumnVisibilityState] = React.useState<GridColumnVisibilityModel>(
    Object.assign({}, ...sampleColumns.map((col) => { return { [col.field]: true }; })),
  );

  React.useEffect(() => {
    setPageSize(args.pageSize || 10);
    setPage(0);
  }, [args.pageSize]);

  React.useEffect(() => {
    setPage(args.page || 0);
  }, [args.page]);

  const handleSortModelChange = (sortModel: GridSortModel) => {
    setSortState(sortModel);
  };

  const handleColumnVisibilityModelChange = (visibilityModel: GridColumnVisibilityModel) => {
    setColumnVisibilityState(visibilityModel);
  };

  return (
    <>
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        DataGrid Default
      </Typography>
      <div style={{ width: '100%' }}>
        <DataGrid
          {...args}
          pageSize={pageSize}
          page={page}
          checkboxSelection
          onPageSizeChange={(value) => {
            if (!Number.isNaN(value) && DataGrid.defaultProps.rowsPerPageOptions.includes(value)) {
              setPage(0);
              setPageSize(value);
            }
          }}
          onPageChange={(newPage) => {
            setPage(newPage);
          }}
          totalCount={sampleRows.length}
          columnVisibilityModel={columnVisibilityState}
          onColumnVisibilityModelChange={handleColumnVisibilityModelChange}
          initialState={{
            sorting: {
              sortModel: [{ field: 'title', sort: 'asc' }],
            },
          }}
          sortModel={sortState}
          onSortModelChange={handleSortModelChange}
        />
      </div>
      &nbsp;
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        DataGrid with SubTitle
      </Typography>
      <div style={{ width: '100%' }}>
        <DataGrid
          {...args}
          rows={sampleRowsWithSubTitle}
          columns={sampleColumnsWithSubTitle}
          checkboxSelection
          pageSize={pageSize}
          page={page}
          onPageSizeChange={(value) => {
            if (!Number.isNaN(value) && DataGrid.defaultProps.rowsPerPageOptions.includes(value)) {
              setPage(0);
              setPageSize(value);
            }
          }}
          onPageChange={(newPage) => {
            setPage(newPage);
          }}
          totalCount={sampleRowsWithSubTitle.length}
          columnVisibilityModel={columnVisibilityState}
          onColumnVisibilityModelChange={handleColumnVisibilityModelChange}
          initialState={{
            sorting: {
              sortModel: [{ field: 'title', sort: 'asc' }],
            },
          }}
          sortModel={sortState}
          onSortModelChange={handleSortModelChange}
        />
      </div>
      &nbsp;
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        DataGrid No Footer
      </Typography>
      <div style={{ width: '100%' }}>
        <DataGrid
          {...args}
          pageSize={pageSize}
          page={page}
          hideFooter
          onPageSizeChange={(value) => {
            if (!Number.isNaN(value) && DataGrid.defaultProps.rowsPerPageOptions.includes(value)) {
              setPage(0);
              setPageSize(value);
            }
          }}
          onPageChange={(newPage) => {
            setPage(newPage);
          }}
          totalCount={sampleRows.length}
          columnVisibilityModel={columnVisibilityState}
          onColumnVisibilityModelChange={handleColumnVisibilityModelChange}
          initialState={{
            sorting: {
              sortModel: [{ field: 'title', sort: 'asc' }],
            },
          }}
          sortModel={sortState}
          onSortModelChange={handleSortModelChange}
        />
      </div>
      &nbsp;
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        DataGrid No Checkbox
      </Typography>
      <div style={{ width: '100%' }}>
        <DataGrid
          {...args}
          pageSize={pageSize}
          page={page}
          checkboxSelection={false}
          onPageSizeChange={(value) => {
            if (!Number.isNaN(value) && DataGrid.defaultProps.rowsPerPageOptions.includes(value)) {
              setPage(0);
              setPageSize(value);
            }
          }}
          onPageChange={(newPage) => {
            setPage(newPage);
          }}
          totalCount={sampleRows.length}
          columnVisibilityModel={columnVisibilityState}
          onColumnVisibilityModelChange={handleColumnVisibilityModelChange}
          initialState={{
            sorting: {
              sortModel: [{ field: 'title', sort: 'asc' }],
            },
          }}
          sortModel={sortState}
          onSortModelChange={handleSortModelChange}
        />
      </div>
      &nbsp;
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        DataGrid with Disabled rows
      </Typography>
      <div style={{ width: '100%' }}>
        <DataGrid
          {...args}
          rows={sampleRowsWithDisabledRow}
          pageSize={pageSize}
          page={page}
          checkboxSelection
          onPageSizeChange={(value) => {
            if (!Number.isNaN(value) && DataGrid.defaultProps.rowsPerPageOptions.includes(value)) {
              setPage(0);
              setPageSize(value);
            }
          }}
          onPageChange={(newPage) => {
            setPage(newPage);
          }}
          totalCount={sampleRows.length}
          columnVisibilityModel={columnVisibilityState}
          onColumnVisibilityModelChange={handleColumnVisibilityModelChange}
          initialState={{
            sorting: {
              sortModel: [{ field: 'title', sort: 'asc' }],
            },
          }}
          sortModel={sortState}
          onSortModelChange={handleSortModelChange}
        />
      </div>
      &nbsp;
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        DataGrid No rows
      </Typography>
      <div style={{ width: '100%' }}>
        <DataGrid
          {...args}
          pageSize={10}
          page={0}
          rows={[]}
          totalCount={0}
          checkboxSelection={false}
          onPageSizeChange={(value) => {
            if (!Number.isNaN(value) && DataGrid.defaultProps.rowsPerPageOptions.includes(value)) {
              setPage(0);
              setPageSize(value);
            }
          }}
          onPageChange={(newPage) => {
            setPage(newPage);
          }}
          columnVisibilityModel={columnVisibilityState}
          onColumnVisibilityModelChange={handleColumnVisibilityModelChange}
          initialState={{
            sorting: {
              sortModel: [{ field: 'title', sort: 'asc' }],
            },
          }}
          sortModel={sortState}
          onSortModelChange={handleSortModelChange}
        />
      </div>
    </>
  );
};

export const InteractiveExample = InteractiveExampleTemplate.bind({});
InteractiveExample.parameters = {
  options: { showPanel: true },
};
InteractiveExample.args = {
  // @ts-ignore - this attribute is need to disable all controls in the InteractiveExample, but this attribute is not part of the DataGridProps
  interactive: true,
  checkboxSelection: true,
  pageSize: 10,
  stickyHeader: false,
  hideFooter: false,
  // if you need to display dynamic field properties, you have to create a util to convert the original data for their rows
  // e.g. data.fullName => row['tooltip-${fullName}']
  rows: processRow(sampleRows, false),
  columns: sampleColumns,
  totalCount: sampleRows.length,
  page: 0,
  isRowClickable: false,
};

export const VisualTest = VisualTestTemplate.bind({});
VisualTest.parameters = {
  options: { showPanel: false },
};
VisualTest.args = {
  checkboxSelection: true,
  pageSize: 10,
  stickyHeader: false,
  // if you need to display dynamic field properties, you have to create a util to convert the original data for their rows
  // e.g. data.fullName => row['tooltip-${fullName}']
  rows: processRow(sampleRows, false),
  columns: sampleColumns,
  page: 0,
};
