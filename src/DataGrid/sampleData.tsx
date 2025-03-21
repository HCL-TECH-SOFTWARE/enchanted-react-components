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
import { GridValueGetterParams, GridColumnHeaderParams } from '@mui/x-data-grid';
import IconDocument from '@hcl-software/enchanted-icons/dist/carbon/es/document--tasks';
import IconEdit from '@hcl-software/enchanted-icons/dist/carbon/es/edit';
import IconUser from '@hcl-software/enchanted-icons/dist/carbon/es/user';
import IconOverflowMenuHorizontal from '@hcl-software/enchanted-icons/dist/carbon/es/overflow-menu--horizontal';

import { alwaysVisibleColHeadIconModifier, ExtendedGridColDef } from './DataGrid';
import DataGridCell from '../DataGridCell/DataGridCell';
import Avatar, { AvatarColors } from '../Avatar';
import IconButton from '../IconButton';

interface Person {
  id: string,
  lastName?: string | null,
  firstName?: string | null,
  age?: number | null,
  'iconStart-id'?: React.ReactNode,
  'avatar-fullName'?: React.ReactNode,
  'endActions-fullName'?: React.ReactNode,
  'iconEnd-lastName'?: React.ReactNode,
  'subTitle-fullName'?: string,
}

export const sampleColumns: ExtendedGridColDef[] = [
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    flex: 1,
    avatar: true,
    endActions: true,
    renderCell: (cellValues) => { return <DataGridCell {...cellValues} />; },
    valueGetter: (params: GridValueGetterParams) => { return `${params.row.firstName || ''} ${params.row.lastName || ''}`; },
  },
  {
    field: 'id',
    headerName: 'Table head',
    flex: 1,
    iconStart: true,
    renderCell: (cellValues) => { return <DataGridCell {...cellValues} />; },
    headerClassName: (params: GridColumnHeaderParams) => {
      return (params.colDef as ExtendedGridColDef).showSortingIcon
        ? alwaysVisibleColHeadIconModifier
        : '';
    },
  },
  {
    field: 'firstName',
    headerName: 'First name',
    flex: 1,
    renderCell: (cellValues) => { return <DataGridCell {...cellValues} />; },
  },
  {
    field: 'lastName',
    iconEnd: true,
    headerName: 'Last name',
    flex: 1,
    renderCell: (cellValues) => { return <DataGridCell {...cellValues} />; },
  },
  {
    field: 'age',
    headerName: 'Age',
    flex: 0.5,
    renderCell: (cellValues) => { return <DataGridCell {...cellValues} />; },
  },
];

export const sampleRows: Person[] = [
  {
    id: 'Table row 1',
    lastName: 'Snow',
    firstName: 'Jon',
    age: 35,
  },
  {
    id: 'Table row 2',
    lastName: 'Lannister',
    firstName: 'Tywin',
    age: 42,
  },
  {
    id: 'Table row 3',
    lastName: 'Lannister',
    firstName: 'Jaime',
    age: 45,
  },
  {
    id: 'Table row 4',
    lastName: 'Stark',
    firstName: 'Arya',
    age: 1,
  },
  {
    id: 'Table row 5',
    lastName: 'Targaryen',
    firstName: 'Daenerys',
    age: null,
  },
  {
    id: 'Table row 6',
    lastName: 'Melisandre',
    firstName: null,
    age: 150,
  },
  {
    id: 'Table row 7',
    lastName: 'Tyrell',
    firstName: 'Margaery',
    age: 44,
  },
  {
    id: 'Table row 8',
    lastName: 'Stark',
    firstName: 'Sansa',
    age: 36,
  },
  {
    id: 'Table row 9',
    lastName: 'Lannister',
    firstName: 'Tyrion',
    age: 65,
  },
  {
    id: 'Table row 10',
    lastName: 'Clegane',
    firstName: 'Sandor',
    age: 65,
  },
  {
    id: 'Table row 11',
    lastName: 'Lannister',
    firstName: 'Cersei',
    age: 42,
  },
  {
    id: 'Table row 12',
    lastName: 'Bolton',
    firstName: 'Ramsay',
    age: 45,
  },
  {
    id: 'Table row 13',
    lastName: 'Martell',
    firstName: 'Oberyn',
    age: 1,
  },
  {
    id: 'Table row 14',
    lastName: 'Baelish',
    firstName: 'Petyr',
    age: null,
  },
  {
    id: 'Table row 15',
    lastName: 'Mormont',
    firstName: 'Lyanna',
    age: 42,
  },
  {
    id: 'Table row 16',
    lastName: 'Varys',
    firstName: 'Lord',
    age: 45,
  },
  {
    id: 'Table row 17',
    lastName: 'Drogo',
    firstName: 'Khal',
    age: 1,
  },
  {
    id: 'Table row 18',
    lastName: 'Tarly',
    firstName: 'Samwell',
    age: null,
  },
  {
    id: 'Table row 19',
    lastName: 'Greyjoy',
    firstName: 'Theon',
    age: 45,
  },
  {
    id: 'Table row 20',
    lastName: 'Naharis',
    firstName: 'Daario',
    age: 1,
  },
  {
    id: 'Table row 21',
    lastName: 'Stark',
    firstName: 'Bran',
    age: null,
  },
];

export const sampleMinimalRows: Person[] = [
  {
    id: 'Table row 1',
    lastName: 'Snow',
    firstName: 'Jon',
    age: 35,
    'endActions-fullName': [
      <IconButton tabIndex={0}><IconEdit /></IconButton>,
    ],
  },
  {
    id: 'Table row 2',
    lastName: 'Lannister',
    age: 42,
    'endActions-fullName': [
      <IconButton tabIndex={0}><IconEdit /></IconButton>,
    ],
  },
];

export const processRow = (rows: Person[], isMinimal: boolean, subTitle?: boolean) => {
  const rowsHolder: Person[] = rows.map((item) => {
    if (item.id) {
      item['iconStart-id'] = <IconDocument />;
    }
    if (item.firstName || item.lastName) {
      item['avatar-fullName'] = <Avatar variant="rounded" iconImage={<IconUser />} color={AvatarColors.DEFAULT} />;
      if (isMinimal) {
        item['endActions-fullName'] = [
          <IconButton tabIndex={0}><IconEdit /></IconButton>,
        ];
      } else {
        item['endActions-fullName'] = [
          <IconButton tabIndex={0}><IconEdit /></IconButton>,
          <IconButton tabIndex={0}><IconOverflowMenuHorizontal /></IconButton>,
        ];
      }
      if (subTitle) {
        item['subTitle-fullName'] = 'Fictional character';
      }
    }
    if (item.lastName) {
      item['iconEnd-lastName'] = <IconDocument />;
    }
    return item;
  });
  return rowsHolder;
};

export const sampleRowsWithSubTitle = processRow(sampleRows, false, true);
export const sampleColumnsWithSubTitle = sampleColumns.map((col) => {
  if (col.field === 'fullName') {
    return {
      ...col,
      subTitle: true,
    };
  }
  return col;
});
const disabledRow = [
  ...sampleRows,
  {
    ...sampleRows[10],
    disabled: true,
  },
];
export const sampleRowsWithDisabledRow = processRow(disabledRow, false, true);
