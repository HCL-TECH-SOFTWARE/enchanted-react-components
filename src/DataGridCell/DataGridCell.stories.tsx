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
import DataGridCell from './DataGridCell';
import DataGrid, { ExtendedGridColDef } from '../DataGrid/DataGrid';
import Typography from '../Typography';
import {
  sampleColumns, sampleColumnsForSubTitle,
  sampleColumnsByDefaultLeft,
  sampleColumnsModifiedRight,
  sampleColumnsMultiStartIconAndTooltip,
  sampleRowContainsAll,
  sampleRowMultiStartIconAndTooltip,
  sampleRows, sampleRowsForSubTitle,
  sampleRowsDisabled,
} from './sampleCellConfig';

export default {
  title: 'Data display/DataGridCell',
  component: DataGridCell,
  argTypes: {
    rows: {
      description: 'Set of rows of type GridColDef[].',
    },
    columns: {
      description: 'Set of columns of type GridColDef[].',
    },
    pageSize: {
      control: false,
      description: 'Number of row per page.',
    },
    checkboxSelection: {
      description: 'If true, it will activate checkbox selection.',
    },
    hideFooter: {
      description: 'If true, the footer will be hidden.',
    },
    colDef: {
      control: 'object',
      description: `Defines the configuration for each column in the DataGridCell. This object allows customization 
        of the appearance and behavior of each column, having options like iconEnd, iconStart, avatar, endActions, 
        showSortingIcon, and subTitle, etc.`,
      table: {
        type: {
          summary: 'ExtendedGridColDef',
          detail: `{
            iconEnd?: boolean; // If true, an icon will be displayed at the end of the cell.
            iconStart?: boolean; // If true, an icon will be displayed at the start of the cell.
            avatar?: boolean; // If true, an avatar will be displayed in the cell.
            endActions?: boolean; // If true, action buttons will be displayed at the end of the cell.
            showSortingIcon?: boolean; // If true, a sorting icon will be displayed in the column header.
            subTitle?: boolean; // If true, a subtitle will be displayed below the main cell content.
          }`,
        },
      },
    },
    subTitle: {
      description: 'Subtitle text to be displayed below the main cell content.',
      control: 'text',
    },
    align: {
      control: 'select',
      options: ['left', 'right'],
      description: 'It allows to align the column values in cells.',
    },
    headerAlign: {
      control: 'select',
      options: ['left', 'right'],
      description: 'It allows to align the column header values.',
    },
    totalCount: {
      description: 'Total number of rows for all pages set by the sample data so it cannot be controlled',
      control: false,
    },
  },
} as Meta<typeof DataGridCell>;

const InteractiveExampleTemplate: StoryFn<typeof DataGridCell> = (args) => {
  const updatedColumns = sampleColumns.map((col: ExtendedGridColDef) => {
    const updatedCol = {
      ...col,
      iconEnd: (args.colDef as ExtendedGridColDef).iconEnd,
      iconStart: (args.colDef as ExtendedGridColDef).iconStart,
      avatar: (args.colDef as ExtendedGridColDef).avatar,
      endActions: (args.colDef as ExtendedGridColDef).endActions,
      subTitle: (args.colDef as ExtendedGridColDef).subTitle,
      showSortingIcon: (args.colDef as ExtendedGridColDef).showSortingIcon,
      align: (args as ExtendedGridColDef).align,
      headerAlign: (args as ExtendedGridColDef).headerAlign,
    };
    return updatedCol;
  });
  const updatedRows = sampleRows.map((row) => {
    const updatedRow = {
      ...row,
      // eslint-why The 'any' type is used here to allow flexibility in assigning the subtitle value, as it is dynamically generated based on the 'colDef.subTitle' value.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      'subTitle-tableHead': (args.colDef as ExtendedGridColDef).subTitle ? (args as any).subTitle : null,
    };
    return updatedRow;
  });
  return (
    <div style={{ height: 150, width: '100%' }}>
      <DataGrid
        {...args}
        columns={updatedColumns}
        rows={updatedRows}
      />
    </div>
  );
};

export const InteractiveExample = InteractiveExampleTemplate.bind({});
InteractiveExample.parameters = {
  options: { showPanel: true },
};
InteractiveExample.args = {
  interactive: true,
  colDef: {
    iconEnd: true,
    iconStart: true,
    avatar: true,
    endActions: true,
    subTitle: true,
    showSortingIcon: false,
  },
  subTitle: 'Fictional character',
  align: 'left',
  headerAlign: 'left',
  rows: sampleRows,
  columns: sampleColumns,
  checkboxSelection: true,
  hideFooter: true,
  pageSize: 10,
  totalCount: sampleRows.length,
};

const VisualTestTemplate: StoryFn<typeof DataGridCell> = (args) => {
  return (
    <>
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        DataGridCell SubTitle
      </Typography>
      <div style={{ height: 150, width: '100%' }}>
        <DataGrid
          {...args}
          rows={sampleRowsForSubTitle}
          columns={sampleColumnsForSubTitle}
        />
      </div>

      &nbsp;
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        DataGridCell Align Left
      </Typography>
      <div style={{ height: 150, width: '100%' }}>
        <DataGrid
          {...args}
          rows={sampleRowContainsAll}
          columns={sampleColumnsByDefaultLeft}
        />
      </div>

      &nbsp;
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        DataGridCell Align Right
      </Typography>
      <div style={{ height: 150, width: '100%' }}>
        <DataGrid
          {...args}
          rows={sampleRowContainsAll}
          columns={sampleColumnsModifiedRight}
        />
      </div>

      &nbsp;
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        DataGridCell Disabled
      </Typography>
      <div style={{ height: 150, width: '100%' }}>
        <DataGrid
          {...args}
          rows={sampleRowsDisabled}
          columns={sampleColumnsByDefaultLeft}
          isRowSelectable={() => { return false; }}
        />
      </div>

      &nbsp;
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        DataGridCell MultipleStartIconAndTooltip
      </Typography>
      <div style={{ height: 150, width: '100%' }}>
        <DataGrid
          {...args}
          rows={sampleRowMultiStartIconAndTooltip}
          columns={sampleColumnsMultiStartIconAndTooltip}
          isRowSelectable={() => { return false; }}
        />
      </div>
    </>
  );
};

export const VisualTest = VisualTestTemplate.bind({});
VisualTest.parameters = {
  options: { showPanel: false },
};
VisualTest.args = {
  pageSize: 1,
  checkboxSelection: true,
  hideFooter: true,
  disableColumnMenu: true,
  totalCount: 1,
};
