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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvatarToDisplayForFileType = exports.assets = exports.getAvatarToDisplay = exports.ItemActions = exports.data = void 0;
const react_1 = __importDefault(require("react"));
const video_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/video"));
const document__tasks_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/document--tasks"));
const XLS_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/XLS"));
const PPT_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/PPT"));
const TXT_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/TXT"));
const PDF_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/PDF"));
const star_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/star"));
const image_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/image"));
const rocket_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/rocket"));
const itemEditAction = (event, tileItemId) => {
    event.stopPropagation();
};
const itemDeleteAction = (event, tileItemId) => {
    event.stopPropagation();
};
const itemAddedToFavoritesAction = (event, tileItemId) => {
    event.stopPropagation();
};
const itemLinkCopiedAction = (event, tileItemId) => {
    event.stopPropagation();
};
const itemCopiedAction = (event, tileItemId) => {
    event.stopPropagation();
};
exports.data = [
    {
        key: 'OPTION1',
        title: 'Option1',
        iconObject: react_1.default.createElement(rocket_1.default, null),
        toolTip: 'Option1',
        handler: itemEditAction,
    },
    {
        key: 'OPTION2',
        title: 'Option2',
        iconObject: react_1.default.createElement(rocket_1.default, null),
        toolTip: 'Option2',
        handler: itemLinkCopiedAction,
        showDivider: true,
    },
    {
        key: 'OPTION3',
        title: 'Option3',
        iconObject: react_1.default.createElement(rocket_1.default, null),
        toolTip: 'Option3',
        handler: itemCopiedAction,
    },
    {
        key: 'OPTION4',
        title: 'Option4',
        iconObject: react_1.default.createElement(rocket_1.default, null),
        toolTip: 'Option4',
        handler: itemDeleteAction,
    },
];
exports.ItemActions = [
    {
        key: 'FAVORITE',
        title: 'Favorite Toggle',
        iconObject: react_1.default.createElement(star_1.default, null),
        toolTip: 'Add to Favorites',
        handler: itemAddedToFavoritesAction,
    },
    {
        key: 'OPTION1',
        title: 'Option1',
        iconObject: react_1.default.createElement(rocket_1.default, null),
        toolTip: 'Option1',
        handler: itemEditAction,
    },
    {
        key: 'OPTION2',
        title: 'Option2',
        iconObject: react_1.default.createElement(rocket_1.default, null),
        toolTip: 'Option2',
        handler: itemLinkCopiedAction,
        showDivider: true,
    },
    {
        key: 'OPTION3',
        title: 'Option3',
        iconObject: react_1.default.createElement(rocket_1.default, null),
        toolTip: 'Option3',
        handler: itemCopiedAction,
    },
    {
        key: 'OPTION4',
        title: 'Option4',
        iconObject: react_1.default.createElement(rocket_1.default, null),
        toolTip: 'Option4',
        handler: itemDeleteAction,
    },
];
const getAvatarToDisplay = (itemTypeArgument, imageUrl) => {
    let itemType = '';
    if (itemTypeArgument) {
        [itemType] = itemTypeArgument.split('/');
    }
    if (itemType === 'video' && !imageUrl) {
        return (react_1.default.createElement(video_1.default, null));
    }
    if (itemType === 'image' && imageUrl) {
        return (react_1.default.createElement(image_1.default, null));
    }
    return undefined;
};
exports.getAvatarToDisplay = getAvatarToDisplay;
exports.assets = [
    {
        title: 'Content.ppt',
        subTitle: 'ppt',
        itemType: 'application/ppt',
    },
    {
        title: 'Accounts.xls',
        subTitle: 'xls',
        itemType: 'application/xls',
    },
    {
        title: 'List.txt',
        subTitle: 'txt',
        itemType: 'application/txt',
    },
    {
        title: 'Notes.doc',
        subTitle: 'doc',
        itemType: 'application/doc',
    },
    {
        title: 'Instructions.pdf',
        subTitle: 'pdf',
        itemType: 'application/pdf',
    },
];
const getAvatarToDisplayForFileType = (itemTypeArgument, itemTitle, imageUrl) => {
    let itemType = '';
    let itemExtension = '';
    if (itemTypeArgument) {
        [itemType] = itemTypeArgument.split('/');
    }
    if (itemTitle) {
        itemExtension = itemTitle.substr(itemTitle.lastIndexOf('.') + 1).toUpperCase();
    }
    if (itemType === 'application') {
        if (itemExtension === 'PDF') {
            return (react_1.default.createElement(PDF_1.default, null));
        }
        if (itemExtension === 'DOC' || itemExtension === 'DOCX') {
            return (react_1.default.createElement(document__tasks_1.default, null));
        }
        if (itemExtension === 'XLS' || itemExtension === 'XLSX') {
            return (react_1.default.createElement(XLS_1.default, null));
        }
        if (itemExtension === 'PPT' || itemExtension === 'PPTX') {
            return (react_1.default.createElement(PPT_1.default, null));
        }
        if (itemExtension === 'TXT' || itemExtension === 'OTHERS') {
            return (react_1.default.createElement(TXT_1.default, null));
        }
    }
    return undefined;
};
exports.getAvatarToDisplayForFileType = getAvatarToDisplayForFileType;
