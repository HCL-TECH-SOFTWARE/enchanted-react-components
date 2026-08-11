"use strict";
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
exports.sampleRowsForSubTitle = exports.sampleColumnsForSubTitle = exports.sampleRows = exports.sampleColumns = exports.sampleColumnsMultiStartIconAndTooltip = exports.sampleRowMultiStartIconAndTooltip = exports.columnTest5 = exports.columnTest4 = exports.columnTest3 = exports.columnTest2 = exports.columnTest1 = exports.sampleRowsDisabled = exports.sampleRowContainsAll = exports.sampleColumnsModifiedRight = exports.sampleColumnsByDefaultLeft = exports.allColumnConfig = exports.endActionColumnConfig = exports.iconColumnConfig = exports.avatarColumnConfig = exports.iconEndColumnConfig = exports.baseColumnConfig = void 0;
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
const react_1 = __importDefault(require("react"));
const document__tasks_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/document--tasks"));
const star_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/star"));
const edit_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/edit"));
const overflow_menu__horizontal_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/overflow-menu--horizontal"));
const radio_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/radio"));
const query_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/query"));
const result_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/result"));
const rain__scattered__night_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/rain--scattered--night"));
const road__weather_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/road--weather"));
const roadmap_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/roadmap"));
const rocket_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/rocket"));
const user_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/user"));
const Avatar_1 = __importStar(require("../Avatar"));
const IconButton_1 = __importDefault(require("../IconButton"));
const DataGridCell_1 = __importDefault(require("./DataGridCell"));
const DataGrid_1 = require("../DataGrid");
exports.baseColumnConfig = {
    field: 'baseColumn',
    headerName: 'Base',
    width: 180,
    renderCell: (cellValues) => { return react_1.default.createElement(DataGridCell_1.default, Object.assign({}, cellValues)); },
};
exports.iconEndColumnConfig = {
    field: 'iconEndColumn',
    headerName: 'With Icon End',
    iconEnd: true,
    width: 180,
    renderCell: (cellValues) => { return react_1.default.createElement(DataGridCell_1.default, Object.assign({}, cellValues)); },
};
exports.avatarColumnConfig = {
    field: 'avatarColumn',
    headerName: 'With Avatar',
    avatar: true,
    width: 180,
    renderCell: (cellValues) => { return react_1.default.createElement(DataGridCell_1.default, Object.assign({}, cellValues)); },
};
exports.iconColumnConfig = {
    field: 'iconStartColumn',
    headerName: 'With Icon',
    iconStart: true,
    width: 180,
    renderCell: (cellValues) => { return react_1.default.createElement(DataGridCell_1.default, Object.assign({}, cellValues)); },
};
exports.endActionColumnConfig = {
    field: 'endActionColumn',
    headerName: 'With End Actions',
    endActions: true,
    width: 200,
    renderCell: (cellValues) => { return react_1.default.createElement(DataGridCell_1.default, Object.assign({}, cellValues)); },
};
exports.allColumnConfig = {
    field: 'all',
    headerName: 'With Combinations',
    iconStart: true,
    endActions: true,
    iconEnd: true,
    width: 240,
    renderCell: (cellValues) => { return react_1.default.createElement(DataGridCell_1.default, Object.assign({}, cellValues)); },
};
exports.sampleColumnsByDefaultLeft = [
    Object.assign({}, exports.baseColumnConfig),
    Object.assign({}, exports.iconEndColumnConfig),
    Object.assign({}, exports.avatarColumnConfig),
    Object.assign({}, exports.iconColumnConfig),
    Object.assign({}, exports.endActionColumnConfig),
    Object.assign({}, exports.allColumnConfig),
];
exports.sampleColumnsModifiedRight = [
    Object.assign(Object.assign({}, exports.baseColumnConfig), { align: 'right', headerAlign: 'right' }),
    Object.assign(Object.assign({}, exports.iconEndColumnConfig), { align: 'right', headerAlign: 'right' }),
    Object.assign(Object.assign({}, exports.avatarColumnConfig), { align: 'right', headerAlign: 'right' }),
    Object.assign(Object.assign({}, exports.iconColumnConfig), { align: 'right', headerAlign: 'right' }),
    Object.assign(Object.assign({}, exports.endActionColumnConfig), { align: 'right', headerAlign: 'right' }),
    Object.assign(Object.assign({}, exports.allColumnConfig), { align: 'right', headerAlign: 'right' }),
];
exports.sampleRowContainsAll = [
    {
        id: '1',
        baseColumn: 'Table row',
        iconEndColumn: 'Table row',
        'iconEnd-iconEndColumn': react_1.default.createElement(star_1.default, null),
        'iconEnd-all': react_1.default.createElement(star_1.default, null),
        avatarColumn: 'Table row',
        'avatar-avatarColumn': react_1.default.createElement(Avatar_1.default, { variant: "rounded", sx: { background: 'grey' } }),
        'avatar-all': react_1.default.createElement(Avatar_1.default, { variant: "rounded", sx: { background: 'grey' } }),
        iconStartColumn: 'Table row',
        'iconStart-iconStartColumn': react_1.default.createElement(document__tasks_1.default, null),
        'iconStart-all': react_1.default.createElement(document__tasks_1.default, null),
        endActionColumn: 'Table row',
        'endActions-endActionColumn': [
            react_1.default.createElement(IconButton_1.default, { tabIndex: 0 },
                react_1.default.createElement(edit_1.default, null)),
            react_1.default.createElement(IconButton_1.default, { tabIndex: 0 },
                react_1.default.createElement(overflow_menu__horizontal_1.default, null)),
        ],
        'endActions-all': [
            react_1.default.createElement(IconButton_1.default, { tabIndex: 0 },
                react_1.default.createElement(edit_1.default, null)),
            react_1.default.createElement(IconButton_1.default, { tabIndex: 0 },
                react_1.default.createElement(overflow_menu__horizontal_1.default, null)),
        ],
        all: 'Table row',
    },
];
exports.sampleRowsDisabled = [
    Object.assign(Object.assign({}, exports.sampleRowContainsAll[0]), { disabled: true }),
];
exports.columnTest1 = {
    field: 'column1',
    headerName: 'column1',
    tooltip: 'column1',
    iconStart: true,
    width: 180,
    renderCell: (cellValues) => { return react_1.default.createElement(DataGridCell_1.default, Object.assign({}, cellValues)); },
};
exports.columnTest2 = {
    field: 'column2',
    headerName: 'column2',
    tooltip: 'column1',
    iconStart: true,
    width: 180,
    renderCell: (cellValues) => { return react_1.default.createElement(DataGridCell_1.default, Object.assign({}, cellValues)); },
};
exports.columnTest3 = {
    field: 'column3',
    headerName: 'column3',
    tooltip: 'column3',
    iconStart: true,
    width: 180,
    renderCell: (cellValues) => { return react_1.default.createElement(DataGridCell_1.default, Object.assign({}, cellValues)); },
};
exports.columnTest4 = {
    field: 'column4',
    headerName: 'column 1 with all combinations',
    tooltip: 'column4',
    iconStart: true,
    avatar: true,
    endActions: true,
    iconEnd: true,
    width: 300,
    renderCell: (cellValues) => { return react_1.default.createElement(DataGridCell_1.default, Object.assign({}, cellValues)); },
};
exports.columnTest5 = {
    field: 'column5',
    headerName: 'column 2 with all combinations',
    tooltip: 'column5',
    iconStart: true,
    avatar: true,
    endActions: true,
    iconEnd: true,
    width: 300,
    renderCell: (cellValues) => { return react_1.default.createElement(DataGridCell_1.default, Object.assign({}, cellValues)); },
};
exports.sampleRowMultiStartIconAndTooltip = [
    {
        id: '1',
        column1: 'column 1',
        'tooltip-column1': 'I am column 1',
        'iconStart-column1': react_1.default.createElement(document__tasks_1.default, null),
        column2: 'column 2',
        'tooltip-column2': 'I am column 1',
        'iconStart-column2': react_1.default.createElement(star_1.default, null),
        column3: 'column 3',
        'tooltip-column3': 'I am column 3',
        'iconStart-column3': react_1.default.createElement(radio_1.default, null),
        column4: 'column 4',
        'tooltip-column4': 'I am column 4',
        'iconStart-column4': react_1.default.createElement(result_1.default, null),
        'endActions-column4': [
            react_1.default.createElement(IconButton_1.default, { tabIndex: 0 },
                react_1.default.createElement(road__weather_1.default, null)),
            react_1.default.createElement(IconButton_1.default, { tabIndex: 0 },
                react_1.default.createElement(roadmap_1.default, null)),
        ],
        'avatar-column4': react_1.default.createElement(Avatar_1.default, { variant: "rounded", type: Avatar_1.AvatarTypes.LETTER, letter: "AR", color: Avatar_1.AvatarColors.GREEN }),
        'iconEnd-column4': react_1.default.createElement(rocket_1.default, null),
        column5: 'column 5',
        'tooltip-column5': 'I am column 5',
        'iconStart-column5': react_1.default.createElement(query_1.default, null),
        'endActions-column5': [
            react_1.default.createElement(IconButton_1.default, { tabIndex: 0 },
                react_1.default.createElement(edit_1.default, null)),
            react_1.default.createElement(IconButton_1.default, { tabIndex: 0 },
                react_1.default.createElement(overflow_menu__horizontal_1.default, null)),
        ],
        'avatar-column5': react_1.default.createElement(Avatar_1.default, { variant: "rounded", type: Avatar_1.AvatarTypes.LETTER, letter: "NA", color: Avatar_1.AvatarColors.BLUE }),
        'iconEnd-column5': react_1.default.createElement(rain__scattered__night_1.default, null),
    },
];
exports.sampleColumnsMultiStartIconAndTooltip = [
    Object.assign({}, exports.columnTest1),
    Object.assign({}, exports.columnTest2),
    Object.assign({}, exports.columnTest3),
    Object.assign({}, exports.columnTest4),
    Object.assign({}, exports.columnTest5),
];
exports.sampleColumns = [
    {
        field: 'tableHead',
        headerName: 'Table Head',
        width: 280,
        iconEnd: true,
        avatar: true,
        iconStart: true,
        endActions: true,
        subTitle: true,
        renderCell: (cellValues) => { return react_1.default.createElement(DataGridCell_1.default, Object.assign({}, cellValues)); },
        headerClassName: (params) => {
            return params.colDef.showSortingIcon
                ? DataGrid_1.alwaysVisibleColHeadIconModifier
                : '';
        },
    },
];
exports.sampleRows = [
    {
        id: '1',
        tableHead: 'Jon Snow',
        'iconEnd-tableHead': react_1.default.createElement(star_1.default, null),
        'avatar-tableHead': react_1.default.createElement(Avatar_1.default, { variant: "rounded", iconImage: react_1.default.createElement(user_1.default, null) }),
        'iconStart-tableHead': react_1.default.createElement(document__tasks_1.default, null),
        'endActions-tableHead': [
            react_1.default.createElement(IconButton_1.default, { tabIndex: 0 },
                react_1.default.createElement(edit_1.default, null)),
            react_1.default.createElement(IconButton_1.default, { tabIndex: 0 },
                react_1.default.createElement(overflow_menu__horizontal_1.default, null)),
        ],
        'subTitle-tableHead': 'Fictional character',
    },
];
exports.sampleColumnsForSubTitle = [
    exports.sampleColumns[0],
    Object.assign(Object.assign({}, exports.sampleColumns[0]), { field: 'withTooltip', headerName: 'With Tooltip' }),
];
exports.sampleRowsForSubTitle = [
    Object.assign(Object.assign({}, exports.sampleRows[0]), { withTooltip: 'Jon Snow', 'iconEnd-withTooltip': react_1.default.createElement(star_1.default, null), 'avatar-withTooltip': react_1.default.createElement(Avatar_1.default, { variant: "rounded", iconImage: react_1.default.createElement(user_1.default, null) }), 'iconStart-withTooltip': react_1.default.createElement(document__tasks_1.default, null), 'endActions-withTooltip': [
            react_1.default.createElement(IconButton_1.default, { tabIndex: 0 },
                react_1.default.createElement(edit_1.default, null)),
            react_1.default.createElement(IconButton_1.default, { tabIndex: 0 },
                react_1.default.createElement(overflow_menu__horizontal_1.default, null)),
        ], 'subTitle-withTooltip': 'Jon Snow was the son of Rhaegar Targaryen and Lyanna Stark' }),
];
