"use strict";
/* ======================================================================== *
 * Copyright 2024, 2026 HCL America Inc.                                    *
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const TileActionMenu_1 = __importDefault(require("./TileActionMenu"));
const Tooltip_1 = __importDefault(require("../../Tooltip"));
const IconButton_1 = __importDefault(require("../../IconButton"));
const TileActionBar = (props) => {
    const { itemId, actionList, overflowTooltip, menuSize, disabled, hasThumbnail, } = props;
    const returnActionIcon = (index) => {
        if ((index >= 0) && actionList && actionList.length > index) {
            return (react_1.default.createElement(material_1.Box, { mr: index === 0 && actionList.length > 1 ? 0.5 : 0 },
                react_1.default.createElement(Tooltip_1.default, { title: actionList[index].toolTip },
                    react_1.default.createElement(IconButton_1.default, { "data-testid": actionList[index].title, "aria-label": actionList[index].toolTip, disabled: disabled, id: itemId, sx: Object.assign({}, actionList[index].color && { color: actionList[index].color }), onClick: (e) => { return actionList[index].handler(e, itemId); }, onKeyDown: (event) => { if (event.key === 'Enter')
                            event.stopPropagation(); } }, actionList[index].iconObject))));
        }
        return undefined;
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        hasThumbnail && (actionList) && (react_1.default.createElement(react_1.default.Fragment, null,
            returnActionIcon(0),
            (actionList.length === 2) && (returnActionIcon(1)),
            (actionList.length > 2) && (react_1.default.createElement(TileActionMenu_1.default, { itemId: itemId, actionList: actionList, overflowTooltip: overflowTooltip, menuSize: menuSize, disabled: disabled, hasThumbnail: hasThumbnail, isTrash: props.isTrash, trashInfoTooltip: props.trashInfoTooltip })))),
        (!hasThumbnail && actionList) && (react_1.default.createElement(TileActionMenu_1.default, { itemId: itemId, actionList: actionList, overflowTooltip: overflowTooltip, menuSize: menuSize, disabled: disabled, hasThumbnail: hasThumbnail, isTrash: props.isTrash, trashInfoTooltip: props.trashInfoTooltip }))));
};
exports.default = TileActionBar;
