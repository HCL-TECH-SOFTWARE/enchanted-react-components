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
import IconDocument from '@hcl-software/enchanted-icons/dist/carbon/es/document--tasks';
import IconStar from '@hcl-software/enchanted-icons/dist/carbon/es/star';
import IconEdit from '@hcl-software/enchanted-icons/dist/carbon/es/edit';
import IconOverflowMenuHorizontal from '@hcl-software/enchanted-icons/dist/carbon/es/overflow-menu--horizontal';
import IconRadio from '@hcl-software/enchanted-icons/dist/carbon/es/radio';
import IconQuery from '@hcl-software/enchanted-icons/dist/carbon/es/query';
import IconResult from '@hcl-software/enchanted-icons/dist/carbon/es/result';
import IconRainScatteredNight from '@hcl-software/enchanted-icons/dist/carbon/es/rain--scattered--night';
import IconRoadWeather from '@hcl-software/enchanted-icons/dist/carbon/es/road--weather';
import IconRoadmap from '@hcl-software/enchanted-icons/dist/carbon/es/roadmap';
import IconRocket from '@hcl-software/enchanted-icons/dist/carbon/es/rocket';
import IconUser from '@hcl-software/enchanted-icons/dist/carbon/es/user';
import { GridColumnHeaderParams } from '@mui/x-data-grid';
import Avatar, { AvatarColors, AvatarTypes } from '../Avatar';
import IconButton from '../IconButton';
import DataGridCell from './DataGridCell';
import { alwaysVisibleColHeadIconModifier, ExtendedGridColDef } from '../DataGrid';

export const baseColumnConfig: ExtendedGridColDef = {
  field: 'baseColumn',
  headerName: 'Base',
  width: 180,
  renderCell: (cellValues) => { return <DataGridCell {...cellValues} />; },
};

export const iconEndColumnConfig: ExtendedGridColDef = {
  field: 'iconEndColumn',
  headerName: 'With Icon End',
  iconEnd: true,
  width: 180,
  renderCell: (cellValues) => { return <DataGridCell {...cellValues} />; },
};

export const avatarColumnConfig: ExtendedGridColDef = {
  field: 'avatarColumn',
  headerName: 'With Avatar',
  avatar: true,
  width: 180,
  renderCell: (cellValues) => { return <DataGridCell {...cellValues} />; },
};

export const iconColumnConfig: ExtendedGridColDef = {
  field: 'iconStartColumn',
  headerName: 'With Icon',
  iconStart: true,
  width: 180,
  renderCell: (cellValues) => { return <DataGridCell {...cellValues} />; },
};

export const endActionColumnConfig: ExtendedGridColDef = {
  field: 'endActionColumn',
  headerName: 'With End Actions',
  endActions: true,
  width: 200,
  renderCell: (cellValues) => { return <DataGridCell {...cellValues} />; },
};

export const allColumnConfig: ExtendedGridColDef = {
  field: 'all',
  headerName: 'With Combinations',
  iconStart: true,
  endActions: true,
  iconEnd: true,
  width: 240,
  renderCell: (cellValues) => { return <DataGridCell {...cellValues} />; },
};

export const sampleColumnsByDefaultLeft: ExtendedGridColDef[] = [
  {
    ...baseColumnConfig,
  },
  {
    ...iconEndColumnConfig,
  },
  {
    ...avatarColumnConfig,
  },
  {
    ...iconColumnConfig,
  },
  {
    ...endActionColumnConfig,
  },
  {
    ...allColumnConfig,
  },
];

export const sampleColumnsModifiedRight: ExtendedGridColDef[] = [
  {
    ...baseColumnConfig,
    align: 'right',
    headerAlign: 'right',
  },
  {
    ...iconEndColumnConfig,
    align: 'right',
    headerAlign: 'right',
  },
  {
    ...avatarColumnConfig,
    align: 'right',
    headerAlign: 'right',
  },
  {
    ...iconColumnConfig,
    align: 'right',
    headerAlign: 'right',
  },
  {
    ...endActionColumnConfig,
    align: 'right',
    headerAlign: 'right',
  },
  {
    ...allColumnConfig,
    align: 'right',
    headerAlign: 'right',
  },
];

export const sampleRowContainsAll = [
  {
    id: '1',
    baseColumn: 'Table row',
    iconEndColumn: 'Table row',
    'iconEnd-iconEndColumn': <IconStar />,
    'iconEnd-all': <IconStar />,
    avatarColumn: 'Table row',
    'avatar-avatarColumn': <Avatar variant="rounded" sx={{ background: 'grey' }} />,
    'avatar-all': <Avatar variant="rounded" sx={{ background: 'grey' }} />,
    iconStartColumn: 'Table row',
    'iconStart-iconStartColumn': <IconDocument />,
    'iconStart-all': <IconDocument />,
    endActionColumn: 'Table row',
    'endActions-endActionColumn': [
      <IconButton tabIndex={0}><IconEdit /></IconButton>,
      <IconButton tabIndex={0}><IconOverflowMenuHorizontal /></IconButton>,
    ],
    'endActions-all': [
      <IconButton tabIndex={0}><IconEdit /></IconButton>,
      <IconButton tabIndex={0}><IconOverflowMenuHorizontal /></IconButton>,
    ],
    all: 'Table row',
  },
];

export const sampleRowsDisabled = [
  {
    ...sampleRowContainsAll[0],
    disabled: true,
  },
];

export const columnTest1: ExtendedGridColDef = {
  field: 'column1',
  headerName: 'column1',
  tooltip: 'column1',
  iconStart: true,
  width: 180,
  renderCell: (cellValues) => { return <DataGridCell {...cellValues} />; },
};

export const columnTest2: ExtendedGridColDef = {
  field: 'column2',
  headerName: 'column2',
  tooltip: 'column1',
  iconStart: true,
  width: 180,
  renderCell: (cellValues) => { return <DataGridCell {...cellValues} />; },
};

export const columnTest3: ExtendedGridColDef = {
  field: 'column3',
  headerName: 'column3',
  tooltip: 'column3',
  iconStart: true,
  width: 180,
  renderCell: (cellValues) => { return <DataGridCell {...cellValues} />; },
};

export const columnTest4: ExtendedGridColDef = {
  field: 'column4',
  headerName: 'column 1 with all combinations',
  tooltip: 'column4',
  iconStart: true,
  avatar: true,
  endActions: true,
  iconEnd: true,
  width: 300,
  renderCell: (cellValues) => { return <DataGridCell {...cellValues} />; },
};

export const columnTest5: ExtendedGridColDef = {
  field: 'column5',
  headerName: 'column 2 with all combinations',
  tooltip: 'column5',
  iconStart: true,
  avatar: true,
  endActions: true,
  iconEnd: true,
  width: 300,
  renderCell: (cellValues) => { return <DataGridCell {...cellValues} />; },
};

export const sampleRowMultiStartIconAndTooltip = [
  {
    id: '1',
    column1: 'column 1',
    'tooltip-column1': 'I am column 1',
    'iconStart-column1': <IconDocument />,
    column2: 'column 2',
    'tooltip-column2': 'I am column 1',
    'iconStart-column2': <IconStar />,
    column3: 'column 3',
    'tooltip-column3': 'I am column 3',
    'iconStart-column3': <IconRadio />,
    column4: 'column 4',
    'tooltip-column4': 'I am column 4',
    'iconStart-column4': <IconResult />,
    'endActions-column4': [
      <IconButton tabIndex={0}><IconRoadWeather /></IconButton>,
      <IconButton tabIndex={0}><IconRoadmap /></IconButton>,
    ],
    'avatar-column4': <Avatar variant="rounded" type={AvatarTypes.LETTER} letter="AR" color={AvatarColors.GREEN} />,
    'iconEnd-column4': <IconRocket />,
    column5: 'column 5',
    'tooltip-column5': 'I am column 5',
    'iconStart-column5': <IconQuery />,
    'endActions-column5': [
      <IconButton tabIndex={0}><IconEdit /></IconButton>,
      <IconButton tabIndex={0}><IconOverflowMenuHorizontal /></IconButton>,
    ],
    'avatar-column5': <Avatar variant="rounded" type={AvatarTypes.LETTER} letter="NA" color={AvatarColors.BLUE} />,
    'iconEnd-column5': <IconRainScatteredNight />,
  },
];

export const sampleColumnsMultiStartIconAndTooltip: ExtendedGridColDef[] = [
  {
    ...columnTest1,
  },
  {
    ...columnTest2,
  },
  {
    ...columnTest3,
  },
  {
    ...columnTest4,
  },
  {
    ...columnTest5,
  },
];

export const sampleColumns: ExtendedGridColDef[] = [
  {
    field: 'tableHead',
    headerName: 'Table Head',
    width: 280,
    iconEnd: true,
    avatar: true,
    iconStart: true,
    endActions: true,
    subTitle: true,
    renderCell: (cellValues) => { return <DataGridCell {...cellValues} />; },
    headerClassName: (params: GridColumnHeaderParams) => {
      return (params.colDef as ExtendedGridColDef).showSortingIcon
        ? alwaysVisibleColHeadIconModifier
        : '';
    },
  },
];

export const sampleRows = [
  {
    id: '1',
    tableHead: 'Jon Snow',
    'iconEnd-tableHead': <IconStar />,
    'avatar-tableHead': <Avatar variant="rounded" iconImage={<IconUser />} />,
    'iconStart-tableHead': <IconDocument />,
    'endActions-tableHead': [
      <IconButton tabIndex={0}><IconEdit /></IconButton>,
      <IconButton tabIndex={0}><IconOverflowMenuHorizontal /></IconButton>,
    ],
    'subTitle-tableHead': 'Fictional character',
  },
];
