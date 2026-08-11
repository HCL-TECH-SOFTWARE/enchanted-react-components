"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleRowsWithDisabledRow = exports.sampleColumnsWithSubTitle = exports.sampleRowsWithSubTitle = exports.processRow = exports.sampleMinimalRows = exports.sampleRows = exports.sampleColumns = void 0;
const react_1 = __importDefault(require("react"));
const document__tasks_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/document--tasks"));
const edit_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/edit"));
const user_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/user"));
const overflow_menu__horizontal_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/overflow-menu--horizontal"));
const DataGrid_1 = require("./DataGrid");
const DataGridCell_1 = __importDefault(require("../DataGridCell/DataGridCell"));
const Avatar_1 = __importStar(require("../Avatar"));
const IconButton_1 = __importDefault(require("../IconButton"));
exports.sampleColumns = [
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        flex: 1,
        avatar: true,
        endActions: true,
        renderCell: (cellValues) => { return react_1.default.createElement(DataGridCell_1.default, Object.assign({}, cellValues)); },
        valueGetter: (params) => { return `${params.row.firstName || ''} ${params.row.lastName || ''}`; },
    },
    {
        field: 'id',
        headerName: 'Table head',
        flex: 1,
        iconStart: true,
        renderCell: (cellValues) => { return react_1.default.createElement(DataGridCell_1.default, Object.assign({}, cellValues)); },
        headerClassName: (params) => {
            return params.colDef.showSortingIcon
                ? DataGrid_1.alwaysVisibleColHeadIconModifier
                : '';
        },
    },
    {
        field: 'firstName',
        headerName: 'First name',
        flex: 1,
        renderCell: (cellValues) => { return react_1.default.createElement(DataGridCell_1.default, Object.assign({}, cellValues)); },
    },
    {
        field: 'lastName',
        iconEnd: true,
        headerName: 'Last name',
        flex: 1,
        renderCell: (cellValues) => { return react_1.default.createElement(DataGridCell_1.default, Object.assign({}, cellValues)); },
    },
    {
        field: 'age',
        headerName: 'Age',
        flex: 0.5,
        renderCell: (cellValues) => { return react_1.default.createElement(DataGridCell_1.default, Object.assign({}, cellValues)); },
    },
];
exports.sampleRows = [
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
exports.sampleMinimalRows = [
    {
        id: 'Table row 1',
        lastName: 'Snow',
        firstName: 'Jon',
        age: 35,
        'endActions-fullName': [
            react_1.default.createElement(IconButton_1.default, { tabIndex: 0 },
                react_1.default.createElement(edit_1.default, null)),
        ],
    },
    {
        id: 'Table row 2',
        lastName: 'Lannister',
        age: 42,
        'endActions-fullName': [
            react_1.default.createElement(IconButton_1.default, { tabIndex: 0 },
                react_1.default.createElement(edit_1.default, null)),
        ],
    },
];
const processRow = (rows, isMinimal, subTitle) => {
    const rowsHolder = rows.map((item) => {
        if (item.id) {
            item['iconStart-id'] = react_1.default.createElement(document__tasks_1.default, null);
        }
        if (item.firstName || item.lastName) {
            item['avatar-fullName'] = react_1.default.createElement(Avatar_1.default, { variant: "rounded", iconImage: react_1.default.createElement(user_1.default, null), color: Avatar_1.AvatarColors.DEFAULT });
            if (isMinimal) {
                item['endActions-fullName'] = [
                    react_1.default.createElement(IconButton_1.default, { tabIndex: 0 },
                        react_1.default.createElement(edit_1.default, null)),
                ];
            }
            else {
                item['endActions-fullName'] = [
                    react_1.default.createElement(IconButton_1.default, { tabIndex: 0 },
                        react_1.default.createElement(edit_1.default, null)),
                    react_1.default.createElement(IconButton_1.default, { tabIndex: 0 },
                        react_1.default.createElement(overflow_menu__horizontal_1.default, null)),
                ];
            }
            if (subTitle) {
                item['subTitle-fullName'] = 'Fictional character';
            }
        }
        if (item.lastName) {
            item['iconEnd-lastName'] = react_1.default.createElement(document__tasks_1.default, null);
        }
        return item;
    });
    return rowsHolder;
};
exports.processRow = processRow;
exports.sampleRowsWithSubTitle = (0, exports.processRow)(exports.sampleRows, false, true);
exports.sampleColumnsWithSubTitle = exports.sampleColumns.map((col) => {
    if (col.field === 'fullName') {
        return Object.assign(Object.assign({}, col), { subTitle: true });
    }
    return col;
});
const disabledRow = [
    ...exports.sampleRows,
    Object.assign(Object.assign({}, exports.sampleRows[10]), { disabled: true }),
];
exports.sampleRowsWithDisabledRow = (0, exports.processRow)(disabledRow, false, true);
