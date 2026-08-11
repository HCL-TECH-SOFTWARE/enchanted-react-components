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
const react_1 = __importDefault(require("react"));
const x_data_grid_1 = require("@mui/x-data-grid");
const material_1 = require("@mui/material");
const lodash_1 = require("lodash");
const Typography_1 = __importDefault(require("../Typography"));
const Tooltip_1 = __importDefault(require("../Tooltip"));
const domUtils_1 = require("../utils/domUtils");
/**
* Renders our custom cell for Data Grid
*/
const DataGridCell = (props) => {
    const [isActive, setIsActive] = react_1.default.useState(false); // if cell is active it will show end actions button
    const apiContext = (0, x_data_grid_1.useGridApiContext)();
    const valueRef = react_1.default.useRef(null); // add ref to truncate text
    const [tooltip, setTooltip] = react_1.default.useState('');
    const [subTitleTooltip, setSubTitleTooltip] = react_1.default.useState('');
    const [innerWidth, setInnerWidth] = react_1.default.useState(window.innerWidth);
    const handleOnActive = react_1.default.useCallback(() => {
        setIsActive(true);
    }, []);
    const handleOnInactive = react_1.default.useCallback(() => {
        setIsActive(false);
    }, []);
    const colDef = props.colDef;
    const { row } = props; // get row values
    const handleOnCellKeydown = react_1.default.useCallback((event) => {
        var _a, _b, _c, _d, _e, _f;
        const target = event.target;
        // if cell has action button and if user press tab we should not hide action button
        if ((event.key === 'Tab' || event.key === 'ArrowDown' || event.key === 'ArrowUp')
            && row[`endActions-${colDef.field}`] && row[`endActions-${colDef.field}`].length > 0) {
            if (target.getAttribute('role') === 'button' && !((_c = (_b = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.nextSibling)) {
                setIsActive(false);
                return;
            }
            setIsActive(true);
        }
        else {
            setIsActive(false);
        }
        // Check if the focus is moving to the next row, the endActions should be hidden
        const parentRow = target.closest('.MuiDataGrid-row');
        const nextRow = parentRow === null || parentRow === void 0 ? void 0 : parentRow.nextSibling;
        if (nextRow && ((_f = (_e = (_d = target.parentElement) === null || _d === void 0 ? void 0 : _d.parentElement) === null || _e === void 0 ? void 0 : _e.parentElement) === null || _f === void 0 ? void 0 : _f.nextSibling) && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
            setIsActive(false);
        }
    }, []);
    // handle resize event
    const handleWindowResize = (0, lodash_1.debounce)(() => {
        setInnerWidth(window.innerWidth);
    }, 500);
    react_1.default.useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);
    // add ellipsis to text
    react_1.default.useEffect(() => {
        if (valueRef && valueRef.current) {
            const isOver = (0, domUtils_1.isOverflown)(valueRef.current);
            if (isOver) {
                setTooltip(props.value);
                setSubTitleTooltip(row[`subTitle-${colDef.field}`]);
            }
            else {
                setTooltip('');
                setSubTitleTooltip('');
            }
        }
    }, [valueRef, props.value, innerWidth, row[`subTitle-${colDef.field}`]]);
    const hideEndActions = apiContext.current.getSelectedRows().size > 1 && apiContext.current.isRowSelected(row.id); // hide action button when there is a seleted row/s
    const isAlignRight = colDef.align === 'right';
    return (react_1.default.createElement(material_1.Grid // parent grid of our custom cell
    , { tabIndex: props.tabIndex, onMouseEnter: handleOnActive, onMouseLeave: handleOnInactive, onFocus: handleOnActive, onKeyDown: (evt) => { return handleOnCellKeydown(evt); }, sx: (theme) => {
            return Object.assign(Object.assign(Object.assign(Object.assign({}, theme.typography.body2), { minHeight: '36px', fontColor: theme.palette.text.primary, outline: 'none', width: '100%', height: '100%', alignItems: 'center', display: 'flex', '& .MuiCheckbox-root': {
                    marginRight: '16px',
                } }), (row.disabled && {
                color: theme.palette.text.disabled,
                pointerEvents: 'none',
            })), { svg: {
                    height: '16px',
                    width: '16px',
                } });
        } },
        colDef.iconStart && row[`iconStart-${colDef.field}`] && (react_1.default.createElement(material_1.Grid, { sx: Object.assign({ alignItems: 'center', display: 'flex', marginRight: '8px' }, (isAlignRight && {
                marginLeft: 'auto',
                marginRight: '0',
            })) }, row[`iconStart-${colDef.field}`])),
        colDef.avatar && row[`avatar-${colDef.field}`] && (react_1.default.createElement(material_1.Grid, { sx: Object.assign(Object.assign({ alignItems: 'center', display: 'flex', marginRight: '8px' }, (isAlignRight && {
                marginLeft: 'auto',
                marginRight: '0',
            })), { '& .MuiAvatar-root': {
                    height: '20px',
                    width: '20px',
                } }) }, row[`avatar-${colDef.field}`])),
        props.value && (react_1.default.createElement(material_1.Grid, { ref: valueRef, sx: Object.assign({ alignItems: 'normal', textAlign: 'left', display: 'flex', flexDirection: 'column', marginRight: '8px', minWidth: '0', overflow: 'hidden' }, (isAlignRight && {
                marginLeft: `${colDef.iconStart || colDef.avatar ? '' : 'auto'}`,
                marginRight: '0',
                paddingLeft: '8px',
                paddingRight: '8px',
            })) },
            react_1.default.createElement(Tooltip_1.default, { title: row[`tooltip-${colDef.field}`] || tooltip, tooltipsize: "small", componentsProps: {
                    tooltip: {
                        sx: {
                            unicodeBidi: (row[`override-bidi-tooltip-${colDef.field}`]) ? 'plaintext' : 'initial',
                        },
                    },
                } },
                react_1.default.createElement(Typography_1.default, Object.assign({ className: "MuiDataGrid-cell--value" }, tooltip && {
                    noWrap: true,
                }, { variant: "body2" }), props.value)),
            colDef.subTitle && row[`subTitle-${colDef.field}`] && (react_1.default.createElement(Tooltip_1.default, { title: subTitleTooltip, tooltipsize: "small", componentsProps: {
                    tooltip: {
                        sx: {
                            unicodeBidi: (row[`override-bidi-tooltip-${colDef.field}`]) ? 'plaintext' : 'initial',
                        },
                    },
                } },
                react_1.default.createElement(Typography_1.default, Object.assign({ className: "MuiDataGrid-cell--subTitle" }, subTitleTooltip && {
                    noWrap: true,
                }, { variant: "caption", color: "text.secondary" }), row[`subTitle-${colDef.field}`]))))),
        colDef.iconEnd && row[`iconEnd-${colDef.field}`] && (react_1.default.createElement(material_1.Grid, { sx: Object.assign({ alignItems: 'center', display: 'flex', marginRight: '8px' }, (isAlignRight && {
                marginRight: '0',
            })) }, row[`iconEnd-${colDef.field}`])),
        colDef.endActions && row[`endActions-${colDef.field}`] && (react_1.default.createElement(material_1.Grid // this grid is for the container of end action button at the end of the cell
        , { className: colDef.endActions ? 'MuiDataGrid-cell--withEndActions' : '', "aria-hidden": !(isActive && !row.disabled && colDef.endActions && !hideEndActions && row[`endActions-${colDef.field}`].length > 0), sx: (theme) => {
                return Object.assign(Object.assign({ display: 'none', alignItems: 'center', background: 'transparent' }, (isAlignRight ? Object.assign({ marginRight: '0' }, (colDef.iconEnd && { paddingLeft: '12px' })) : {
                    marginLeft: 'auto',
                    marginRight: '0',
                })), (isActive && !row.disabled
                    && colDef.endActions && !hideEndActions && row[`endActions-${colDef.field}`].length > 0 && {
                    display: 'flex',
                }));
            } }, row[`endActions-${colDef.field}`] && row[`endActions-${colDef.field}`].map((elem, index) => {
            return (
            // eslint-why index is not the sole key definition, it is prefixed by other identifiers
            // eslint-disable-next-line react/no-array-index-key
            react_1.default.createElement(material_1.Grid, { sx: { marginLeft: '12px' }, key: `endActions-${row.id}-${colDef.field}-${index}` }, elem) // grid container button this is to margin to the buttons
            );
        })))));
};
DataGridCell.defaultProps = {
    showSortingIcon: false,
};
exports.default = DataGridCell;
