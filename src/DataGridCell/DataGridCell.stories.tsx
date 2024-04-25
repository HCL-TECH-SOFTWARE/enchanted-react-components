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
import DataGrid from '../DataGrid/DataGrid';
import {
  sampleColumnsByDefaultLeft,
  sampleColumnsModifiedRight,
  sampleColumnsMultiStartIconAndTooltip,
  sampleRowContainsAll,
  sampleRowMultiStartIconAndTooltip,
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
  },
} as Meta<typeof DataGridCell>;

const Template: StoryFn<typeof DataGridCell> = (args) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={sampleRowContainsAll} columns={sampleColumnsByDefaultLeft} {...args} totalCount={1} />
    </div>
  );
};

export const AlignLeft = {
  render: Template,

  args: {
    rows: sampleRowContainsAll,
    columns: sampleColumnsByDefaultLeft,
    pageSize: 1,
    checkboxSelection: true,
    hideFooter: true,
  },
};

const AlignRightTemplate: StoryFn<typeof DataGridCell> = (args) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={sampleRowContainsAll} columns={sampleColumnsModifiedRight} {...args} totalCount={1} />
    </div>
  );
};

export const AlignRight = {
  render: AlignRightTemplate,

  args: {
    rows: sampleRowContainsAll,
    columns: sampleColumnsModifiedRight,
    pageSize: 1,
    checkboxSelection: true,
    hideFooter: true,
    disableColumnMenu: true,
  },
};

const DisabledTemplate: StoryFn<typeof DataGridCell> = (args) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={sampleRowsDisabled}
        columns={sampleColumnsByDefaultLeft}
        // add condition to tell if row is disabled
        isRowSelectable={() => {
          return false;
        }}
        {...args}
        totalCount={1}
      />
    </div>
  );
};

export const Disabled = {
  render: DisabledTemplate,

  args: {
    rows: sampleRowsDisabled,
    columns: sampleColumnsByDefaultLeft,
    pageSize: 1,
    checkboxSelection: true,
    hideFooter: true,
    disableColumnMenu: true,
  },
};

const MultipleStartIconAndTooltipTemplate: StoryFn<typeof DataGridCell> = (args) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={sampleRowMultiStartIconAndTooltip}
        columns={sampleColumnsMultiStartIconAndTooltip}
        // add condition to tell if row is disabled
        isRowSelectable={() => {
          return false;
        }}
        totalCount={1}
        {...args}
      />
    </div>
  );
};

export const MultipleStartIconAndTooltip = {
  render: MultipleStartIconAndTooltipTemplate,

  args: {
    rows: sampleRowMultiStartIconAndTooltip,
    columns: sampleColumnsMultiStartIconAndTooltip,
    pageSize: 1,
    checkboxSelection: true,
    hideFooter: true,
    disableColumnMenu: true,
  },
};
