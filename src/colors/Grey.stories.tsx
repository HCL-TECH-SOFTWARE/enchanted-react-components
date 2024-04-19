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
import * as React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Box from '@mui/material/Box';
import { Theme } from '@mui/material';
import { DataGrid, ExtendedGridColDef } from '../DataGrid';

const Grey = { };

export default {
  title: 'Theme/Grey',
  parameters: {
    options: { showPanel: false },
  },
} as Meta<typeof Grey>;

const columns: ExtendedGridColDef[] = [
  {
    field: 'id',
    headerName: 'Grey',
    flex: 0.25,
  },
  {
    field: 'color',
    headerName: 'Color',
    flex: 1,
    renderCell: (params) => {
      return (
        <Box sx={(theme: Theme) => {
          return {
            width: '100%',
            height: '100%',
            backgroundColor: theme.palette.grey[params.row.color],
          };
        }}
        />
      );
    },
  },
];

const rows = [
  {
    id: 100,
    color: '100',
  },
  {
    id: 200,
    color: '200',
  },
  {
    id: 300,
    color: '300',
  },
  {
    id: 400,
    color: '400',
  },
  {
    id: 500,
    color: '500',
  },
  {
    id: 600,
    color: '600',
  },
  {
    id: 700,
    color: '700',
  },
  {
    id: 800,
    color: '800',
  },
  {
    id: 900,
    color: '900',
  },
  {
    id: 1000,
    color: '1000',
  },
  {
    id: 1100,
    color: '1100',
  },
];
const Template: StoryFn<typeof Grey> = () => {
  return (
    <Box width={600}>
      <DataGrid
        rows={rows}
        columns={columns}
        hideFooter
        autoHeight
      />
    </Box>
  );
};

export const ExampleGreyColors = {
  render: Template,
};
