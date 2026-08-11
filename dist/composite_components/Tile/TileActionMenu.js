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
exports.TileActionTestIds = void 0;
const react_1 = __importDefault(require("react"));
const overflow_menu__horizontal_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/overflow-menu--horizontal"));
const information_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/information"));
const ListItemText_1 = __importDefault(require("../../List/ListItemText"));
const Menu_1 = __importStar(require("../../Menu"));
const ListItemIcon_1 = __importDefault(require("../../List/ListItemIcon"));
const Tooltip_1 = __importDefault(require("../../Tooltip"));
const IconButton_1 = __importDefault(require("../../IconButton"));
const MenuItem_1 = __importDefault(require("../../Menu/MenuItem"));
const Divider_1 = __importDefault(require("../../Divider"));
var TileActionTestIds;
(function (TileActionTestIds) {
    TileActionTestIds["TILE_ACTION_MENU"] = "basic-menu";
    TileActionTestIds["TILE_ACTION_OVERFLOW"] = "tile-action-menu";
})(TileActionTestIds = exports.TileActionTestIds || (exports.TileActionTestIds = {}));
const TileActionMenu = (props) => {
    const { itemId, actionList, overflowTooltip, disabled, hasThumbnail, isTrash, } = props;
    const overflowIconTitle = overflowTooltip;
    const [anchorEl, setAnchorEl] = react_1.default.useState(null);
    const open = Boolean(anchorEl);
    const definedSize = props.menuSize === Menu_1.MenuSizes.MEDIUM ? 'medium' : 'small';
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        event.stopPropagation();
    };
    const handleClose = (event) => {
        setAnchorEl(null);
        event.stopPropagation();
    };
    const returnMenuItem = (action) => {
        if (action) {
            return ([
                react_1.default.createElement(MenuItem_1.default, { key: action.key, size: props.menuSize, onClick: (e) => {
                        setAnchorEl(null);
                        return action.handler(e, itemId);
                    } },
                    react_1.default.createElement(ListItemIcon_1.default, null, react_1.default.cloneElement(action.iconObject, { fontSize: definedSize })),
                    react_1.default.createElement(ListItemText_1.default, { primary: action.title })),
                (action.showDivider) && react_1.default.createElement(Divider_1.default, { key: "divider", type: "secondary" }),
            ]);
        }
        return undefined;
    };
    return (react_1.default.createElement("div", { style: {
            // Actions container
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: 0,
            gap: 8,
            width: 48,
            height: 16,
            flex: 'none',
            order: 2,
            flexGrow: 0,
        } },
        isTrash && !hasThumbnail && (react_1.default.createElement(Tooltip_1.default, { title: props.trashInfoTooltip || '', componentsProps: {
                tooltip: {
                    sx: {
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        padding: '5px 8px',
                        gap: '10px',
                        background: 'rgba(56, 56, 56, 1)',
                        borderRadius: '2px',
                        maxWidth: '300px',
                        fontSize: '12px',
                        lineHeight: '16px',
                        color: 'rgba(255, 255, 255, 0.93)',
                    },
                },
            } },
            react_1.default.createElement(IconButton_1.default, { "data-testid": "tile-action-info", "aria-label": props.trashInfoTooltip || '', size: "small", tabIndex: 0, sx: {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2px',
                    isolation: 'isolate',
                    width: '20px',
                    height: '20px',
                    flex: 'none',
                    order: 0,
                    flexGrow: 0,
                } },
                react_1.default.createElement(information_1.default, null)))),
        react_1.default.createElement(Tooltip_1.default, { title: overflowIconTitle },
            react_1.default.createElement(IconButton_1.default, { "data-testid": TileActionTestIds.TILE_ACTION_OVERFLOW, "aria-controls": "fade-menu", "aria-haspopup": "true", onClick: handleClick, disabled: disabled, size: "small", sx: {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2px',
                    isolation: 'isolate',
                    width: '20px',
                    height: '20px',
                    borderRadius: '2px',
                    flex: 'none',
                    order: 0,
                    flexGrow: 0,
                } },
                react_1.default.createElement(overflow_menu__horizontal_1.default, null))),
        react_1.default.createElement(Menu_1.default, { PaperProps: { sx: { padding: '0px' } }, id: "basic-menu", "data-testid": TileActionTestIds.TILE_ACTION_MENU, anchorEl: anchorEl, open: open, onClose: handleClose, MenuListProps: {
                'aria-labelledby': 'basic-button',
            }, size: definedSize }, actionList.map((action, index) => {
            if (hasThumbnail === false) {
                return (returnMenuItem(action));
            }
            if (index >= 1) {
                return (returnMenuItem(action));
            }
            return null;
        }))));
};
exports.default = TileActionMenu;
