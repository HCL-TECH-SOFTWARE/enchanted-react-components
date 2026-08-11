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
exports.sampleContentReportingUpdates = exports.sampleContentReportingOverview = exports.sampleDigitalAssetManagerSearchResults = exports.sampleDigitalAssetManagerItemPage = exports.sampleDigitalAssetManagerOverview = exports.sampleContentComposerItemPage = exports.sampleContentComposerSearchResults = exports.sampleContentComposerOverview = void 0;
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
const material_1 = require("@mui/material");
const crop_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/crop"));
const rotate__counterclockwise_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/rotate--counterclockwise"));
const rotate__clockwise_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/rotate--clockwise"));
const data_share_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/data-share"));
const caret__down_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/caret--down"));
const upload_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/upload"));
const search_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/search"));
const filter_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/filter"));
const settings_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/settings"));
const column_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/column"));
const undo_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/undo"));
const folder__add_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/folder--add"));
const redo_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/redo"));
const document__tasks_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/document--tasks"));
const folder_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/folder"));
const star_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/star"));
const grid_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/grid"));
const list_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/list"));
const FormControlLabel_1 = __importDefault(require("../prerequisite_components/FormControlLabel"));
const IconButton_1 = __importDefault(require("../IconButton"));
const Avatar_1 = __importDefault(require("../Avatar"));
const Button_1 = __importStar(require("../Button"));
const Switch_1 = __importDefault(require("../Switch"));
const TextField_1 = __importDefault(require("../TextField"));
// Samples for CC
exports.sampleContentComposerOverview = {
    startSection: {
        hamburgerSpace: false,
        title: 'Content',
        subtitle: '120 items',
    },
    endSection: [
        react_1.default.createElement(Button_1.default, Object.assign({}, Button_1.default.defaultProps, { variant: Button_1.ButtonVariants.CONTAINED, endIcon: react_1.default.createElement(caret__down_1.default, null) }), "Create"),
        react_1.default.createElement(TextField_1.default, { hiddenLabel: true, sx: {
                borderRadius: '2px',
            }, InputProps: {
                startAdornment: react_1.default.createElement(material_1.InputAdornment, { position: "start" },
                    react_1.default.createElement(search_1.default, null)),
            }, placeholder: "Search for content and templates", onKeyDown: (e) => {
                var _a;
                if (e.key === 'Enter') {
                    /* eslint-why sample handler only */
                    /* eslint-disable-next-line no-console */
                    console.log((_a = e.currentTarget.querySelector('input')) === null || _a === void 0 ? void 0 : _a.value);
                }
            } }),
        react_1.default.createElement(IconButton_1.default, Object.assign({}, IconButton_1.default.defaultProps),
            react_1.default.createElement(filter_1.default, null)),
        react_1.default.createElement(Button_1.default, Object.assign({}, Button_1.default.defaultProps, { variant: Button_1.ButtonVariants.TEXT, startIcon: react_1.default.createElement(column_1.default, null), endIcon: react_1.default.createElement(caret__down_1.default, null) }), "Recently added"),
        react_1.default.createElement(IconButton_1.default, Object.assign({}, IconButton_1.default.defaultProps),
            react_1.default.createElement(settings_1.default, null)),
    ],
};
exports.sampleContentComposerSearchResults = {
    startSection: {
        hamburgerSpace: false,
        withBackButton: true,
        title: 'Search results',
        subtitle: '120 items',
    },
    endSection: [
        react_1.default.createElement(Button_1.default, Object.assign({}, Button_1.default.defaultProps, { variant: Button_1.ButtonVariants.CONTAINED, endIcon: react_1.default.createElement(caret__down_1.default, null) }), "Create"),
        react_1.default.createElement(TextField_1.default, { hiddenLabel: true, sx: {
                borderRadius: '2px',
            }, InputProps: {
                startAdornment: react_1.default.createElement(material_1.InputAdornment, { position: "start" },
                    react_1.default.createElement(search_1.default, null)),
            }, placeholder: "Search for content and templates", onKeyDown: (e) => {
                var _a;
                if (e.key === 'Enter') {
                    /* eslint-why sample handler only */
                    /* eslint-disable-next-line no-console */
                    console.log((_a = e.currentTarget.querySelector('input')) === null || _a === void 0 ? void 0 : _a.value);
                }
            } }),
        react_1.default.createElement(IconButton_1.default, Object.assign({}, IconButton_1.default.defaultProps),
            react_1.default.createElement(filter_1.default, null)),
        react_1.default.createElement(Button_1.default, Object.assign({}, Button_1.default.defaultProps, { variant: Button_1.ButtonVariants.TEXT, startIcon: react_1.default.createElement(column_1.default, null), endIcon: react_1.default.createElement(caret__down_1.default, null) }), "Recently added"),
        react_1.default.createElement(IconButton_1.default, Object.assign({}, IconButton_1.default.defaultProps),
            react_1.default.createElement(settings_1.default, null)),
    ],
};
exports.sampleContentComposerItemPage = {
    startSection: {
        hamburgerSpace: false,
        withBackButton: true,
        avatar: react_1.default.createElement(Avatar_1.default, Object.assign({}, Avatar_1.default.defaultProps, { variant: "rounded", iconImage: react_1.default.createElement(folder_1.default, null) })),
        title: 'Untitled',
        favoritesToggleIcon: react_1.default.createElement(star_1.default, null),
    },
    endSection: [
        react_1.default.createElement(material_1.FormControl, null,
            react_1.default.createElement(FormControlLabel_1.default, { value: "Edit mode", control: react_1.default.createElement(Switch_1.default, { sx: { margin: '0px 12px 0px 12px' } }), label: "Label" })),
        react_1.default.createElement(document__tasks_1.default, { sx: { color: (theme) => { return theme.palette.success.main; }, marginRight: '-12px' } }),
        react_1.default.createElement(Button_1.default, Object.assign({}, Button_1.default.defaultProps, { variant: Button_1.ButtonVariants.TEXT, endIcon: react_1.default.createElement(caret__down_1.default, null), sx: (theme) => { return Object.assign(Object.assign({}, theme.typography.body2), { color: theme.palette.text.primary }); } }), "Published"),
        react_1.default.createElement(Button_1.default, Object.assign({}, Button_1.default.defaultProps, { variant: Button_1.ButtonVariants.OUTLINED, endIcon: react_1.default.createElement(caret__down_1.default, null) }), "More"),
        react_1.default.createElement(Button_1.default, Object.assign({}, Button_1.default.defaultProps, { variant: Button_1.ButtonVariants.CONTAINED, endIcon: react_1.default.createElement(caret__down_1.default, null) }), "Save"),
    ],
};
// Samples for DAM
exports.sampleDigitalAssetManagerOverview = {
    startSection: {
        hamburgerSpace: false,
        title: 'Assets',
        subtitle: '120 items',
    },
    endSection: [
        react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Button_1.default, Object.assign({}, Button_1.default.defaultProps, { variant: Button_1.ButtonVariants.CONTAINED, startIcon: react_1.default.createElement(upload_1.default, null) }), "Upload"),
            react_1.default.createElement(Button_1.default, { variant: Button_1.ButtonVariants.OUTLINED, startIcon: react_1.default.createElement(folder__add_1.default, null), "data-acceptance-test-id": "clickAddNewCollectionBTN", sx: { whiteSpace: 'nowrap', maxHeight: '28px' } }, "Create collection"),
            react_1.default.createElement(TextField_1.default, { hiddenLabel: true, sx: {
                    borderRadius: '2px',
                }, InputProps: {
                    startAdornment: react_1.default.createElement(material_1.InputAdornment, { position: "start" },
                        react_1.default.createElement(search_1.default, null)),
                }, placeholder: "Search for assets and collections", onKeyDown: (e) => {
                    var _a;
                    if (e.key === 'Enter') {
                        /* eslint-why sample handler only */
                        /* eslint-disable-next-line no-console */
                        console.log((_a = e.currentTarget.querySelector('input')) === null || _a === void 0 ? void 0 : _a.value);
                    }
                } }),
            react_1.default.createElement(material_1.ToggleButtonGroup, { "data-testid": "testSelectedView", size: "medium" },
                react_1.default.createElement(material_1.Tooltip, { title: "List view" },
                    react_1.default.createElement(material_1.ToggleButton, { id: "listView", value: "listView", selected: true, "aria-pressed": true, "data-testid": "testListView" },
                        react_1.default.createElement(list_1.default, { style: {
                                margin: '3px',
                                padding: '0px',
                                height: '20px',
                                width: '20px',
                            } }))),
                react_1.default.createElement(material_1.Tooltip, { title: "Grid view" },
                    react_1.default.createElement(material_1.ToggleButton, { id: "gridView", value: "gridView", "data-testid": "testGridView" },
                        react_1.default.createElement(grid_1.default, { style: {
                                margin: '3px',
                                padding: '0px',
                                height: '20px',
                                width: '20px',
                            } })))),
            react_1.default.createElement(IconButton_1.default, Object.assign({}, IconButton_1.default.defaultProps),
                react_1.default.createElement(settings_1.default, null))),
    ],
};
exports.sampleDigitalAssetManagerItemPage = {
    startSection: {
        hamburgerSpace: false,
        withBackButton: true,
        avatar: react_1.default.createElement(Avatar_1.default, Object.assign({}, Avatar_1.default.defaultProps, { variant: "rounded", iconImage: react_1.default.createElement(folder_1.default, null) })),
        title: 'Untitled.jpg',
        favoritesToggleIcon: react_1.default.createElement(star_1.default, null),
    },
    middleSection: [
        react_1.default.createElement(IconButton_1.default, Object.assign({}, IconButton_1.default.defaultProps),
            react_1.default.createElement(crop_1.default, null)),
        react_1.default.createElement(IconButton_1.default, Object.assign({}, IconButton_1.default.defaultProps),
            react_1.default.createElement(rotate__counterclockwise_1.default, null)),
        react_1.default.createElement(IconButton_1.default, Object.assign({}, IconButton_1.default.defaultProps),
            react_1.default.createElement(rotate__clockwise_1.default, null)),
        react_1.default.createElement(IconButton_1.default, Object.assign({}, IconButton_1.default.defaultProps),
            react_1.default.createElement(data_share_1.default, null)),
    ],
    endSection: [
        react_1.default.createElement(IconButton_1.default, Object.assign({}, IconButton_1.default.defaultProps),
            react_1.default.createElement(undo_1.default, null)),
        react_1.default.createElement(IconButton_1.default, Object.assign({}, IconButton_1.default.defaultProps),
            react_1.default.createElement(redo_1.default, null)),
        react_1.default.createElement(Button_1.default, Object.assign({}, Button_1.default.defaultProps, { variant: Button_1.ButtonVariants.OUTLINED, endIcon: react_1.default.createElement(caret__down_1.default, null) }), "More"),
        react_1.default.createElement(Button_1.default, Object.assign({}, Button_1.default.defaultProps, { variant: Button_1.ButtonVariants.CONTAINED, endIcon: react_1.default.createElement(caret__down_1.default, null) }), "Save"),
    ],
};
exports.sampleDigitalAssetManagerSearchResults = {
    startSection: {
        hamburgerSpace: false,
        withBackButton: true,
        title: 'Search results',
        subtitle: '120 items',
    },
    endSection: [
        react_1.default.createElement(Button_1.default, Object.assign({}, Button_1.default.defaultProps, { variant: Button_1.ButtonVariants.CONTAINED, startIcon: react_1.default.createElement(upload_1.default, null) }), "Upload"),
        react_1.default.createElement(TextField_1.default, { hiddenLabel: true, sx: {
                borderRadius: '2px',
            }, InputProps: {
                startAdornment: react_1.default.createElement(material_1.InputAdornment, { position: "start" },
                    react_1.default.createElement(search_1.default, null)),
            }, placeholder: "Search for assets and collections", onKeyDown: (e) => {
                var _a;
                if (e.key === 'Enter') {
                    /* eslint-why sample handler only */
                    /* eslint-disable-next-line no-console */
                    console.log((_a = e.currentTarget.querySelector('input')) === null || _a === void 0 ? void 0 : _a.value);
                }
            } }),
        react_1.default.createElement(IconButton_1.default, Object.assign({}, IconButton_1.default.defaultProps),
            react_1.default.createElement(filter_1.default, null)),
        react_1.default.createElement(Button_1.default, Object.assign({}, Button_1.default.defaultProps, { variant: Button_1.ButtonVariants.TEXT, startIcon: react_1.default.createElement(column_1.default, null), endIcon: react_1.default.createElement(caret__down_1.default, null) }), "Recently added"),
        react_1.default.createElement(IconButton_1.default, Object.assign({}, IconButton_1.default.defaultProps),
            react_1.default.createElement(settings_1.default, null)),
    ],
};
// Samples for Content Reporting
exports.sampleContentReportingOverview = {
    startSection: {
        hamburgerSpace: false,
        title: 'Reporting',
        subtitle: '120 items',
    },
    endSection: [
        react_1.default.createElement(Button_1.default, Object.assign({}, Button_1.default.defaultProps, { variant: Button_1.ButtonVariants.TEXT }), "View(#)"),
        react_1.default.createElement(Button_1.default, Object.assign({}, Button_1.default.defaultProps, { variant: Button_1.ButtonVariants.CONTAINED }), "Update"),
        react_1.default.createElement(Button_1.default, Object.assign({}, Button_1.default.defaultProps, { variant: Button_1.ButtonVariants.CONTAINED, startIcon: react_1.default.createElement(upload_1.default, null) }), "Export"),
    ],
};
exports.sampleContentReportingUpdates = {
    startSection: {
        hamburgerSpace: false,
        withBackButton: true,
        title: 'Updates',
        subtitle: '120 items',
    },
};
