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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TablePaginationLocalizationPlaceholders = exports.getMuiTablePaginationThemeOverrides = void 0;
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
const TablePagination_1 = __importDefault(require("@mui/material/TablePagination"));
const TableFooter_1 = __importDefault(require("@mui/material/TableFooter"));
const Table_1 = __importDefault(require("../Table/Table"));
const TableRow_1 = __importDefault(require("../Table/TableRow"));
const CustomTablePaginationActions_1 = __importDefault(require("./CustomTablePaginationActions"));
const getMuiTablePaginationThemeOverrides = () => {
    return {
        MuiTablePagination: {
            styleOverrides: {
                root: ({ ownerState, theme }) => {
                    return ({
                        borderBottom: 'none',
                        '[data-testid=tablePaginationActionsRoot]': {
                            margin: 0,
                        },
                        '& .MuiTablePagination-toolbar': {
                            margin: '4px 12px',
                            padding: 0,
                            display: 'flex',
                            justifyContent: 'flex-end',
                            minHeight: '28px',
                            '& .MuiTablePagination-spacer': {
                                display: 'none',
                            },
                            '& .MuiTablePagination-selectLabel': {
                                display: 'none',
                            },
                            '& .MuiTablePagination-selectLabel + div': {
                                display: 'none',
                            },
                            '& .MuiTablePagination-displayedRows': {
                                display: 'none',
                            },
                            '& [data-testid=tablePaginationActionsRoot]': {
                                display: 'inline-flex',
                                justifyContent: 'space-between',
                                width: '100%',
                                '& > div': {
                                    display: 'flex',
                                },
                                '.MuiFormControl-root': {
                                    height: '28px',
                                    display: 'flex',
                                    flexDirection: 'row',
                                },
                                // styles for Change Page Buttons inside TablePagination
                                'button[data-testid=tablePaginationActionsPageFirst]': {
                                    marginRight: '4px',
                                },
                                'button[data-testid=tablePaginationActionsPagePrev]': {
                                    marginRight: '4px',
                                },
                                'button[data-testid=tablePaginationActionsPageNext]': {
                                    marginLeft: '4px',
                                },
                                'button[data-testid=tablePaginationActionsPageLast]': {
                                    marginLeft: '4px',
                                },
                                // styles for Page label Typography inside TablePagination
                                '.MuiTypography-root': {
                                    margin: 'auto 0',
                                    display: 'inline-flex',
                                },
                                'div[data-testid=tablePaginationActionsRowsDiv]': {
                                    display: 'inline-flex',
                                    '.MuiFormLabel-root': {
                                        maxWidth: 'none',
                                        margin: '6px 4px 6px 0px',
                                        fontWeight: '400',
                                        color: theme.palette.text.primary,
                                    },
                                    '> .autocomplete-container': {
                                        marginRight: '4px',
                                    },
                                },
                                'div[data-testid=tablePaginationActionsPageDiv]': {
                                    display: 'inline-flex',
                                    '.MuiFormLabel-root': {
                                        maxWidth: 'none',
                                        margin: '6px 4px 6px 0px',
                                        fontWeight: '400',
                                        color: theme.palette.text.primary,
                                    },
                                    '> .autocomplete-container': {
                                        marginRight: '4px',
                                    },
                                },
                                '.MuiTypography-root[data-testid=tablePaginationActionsPageTotal]': {
                                    margin: 'auto 0',
                                },
                                // styles for Autocomplete inside TablePagination
                                '& .MuiGrid-root.MuiGrid-container': {
                                    minWidth: '0px',
                                },
                                '[data-testid=tablePaginationActionsRowsDiv]': {
                                    '.MuiAutocomplete-clearIndicator': {
                                        display: 'none',
                                    },
                                },
                                '[data-testid=tablePaginationActionsPageDiv]': {
                                    '.MuiAutocomplete-endAdornment': {
                                        display: 'none',
                                    },
                                },
                            },
                        },
                    });
                },
            },
        },
    };
};
exports.getMuiTablePaginationThemeOverrides = getMuiTablePaginationThemeOverrides;
var TablePaginationLocalizationPlaceholders;
(function (TablePaginationLocalizationPlaceholders) {
    TablePaginationLocalizationPlaceholders["CURRENT_PAGE_TO_END_PAGE"] = "{current_page_to_end_page}";
    TablePaginationLocalizationPlaceholders["TOTAL_ROWS_COUNT"] = "{total_rows_count}";
    TablePaginationLocalizationPlaceholders["TOTAL_PAGES_COUNT"] = "{total_pages_count}";
})(TablePaginationLocalizationPlaceholders = exports.TablePaginationLocalizationPlaceholders || (exports.TablePaginationLocalizationPlaceholders = {}));
const Pagination = (_a) => {
    var props = __rest(_a, []);
    const { translation } = props, rest = __rest(props, ["translation"]);
    return (react_1.default.createElement(react_1.default.Fragment, null, props.count > 0 && (react_1.default.createElement(Table_1.default, { role: "presentation" },
        react_1.default.createElement(TableFooter_1.default, null,
            react_1.default.createElement(TableRow_1.default, null,
                react_1.default.createElement(TablePagination_1.default, Object.assign({}, rest, { ActionsComponent: () => {
                        return (react_1.default.createElement(CustomTablePaginationActions_1.default, { count: props.count, page: props.page, rowsPerPage: props.rowsPerPage, onPageChange: props.onPageChange, onRowsPerPageChange: props.onRowsPerPageChange, showFirstButton: true, showLastButton: true, getItemAriaLabel: (type) => { return type; }, translation: translation, rowsPerPageOptions: props.rowsPerPageOptions }));
                    } }))))))));
};
Pagination.defaultProps = {
    translation: {
        rowsPerPageLabel: 'Show rows:',
        rowsPerPageDescription: `${TablePaginationLocalizationPlaceholders.CURRENT_PAGE_TO_END_PAGE} of ${TablePaginationLocalizationPlaceholders.TOTAL_ROWS_COUNT}`,
        pageLabel: 'Page:',
        pageDescription: `of ${TablePaginationLocalizationPlaceholders.TOTAL_PAGES_COUNT}`,
        firstPageAriaLabel: 'go to first page',
        prevPageAriaLabel: 'go to previous page',
        nextPageAriaLabel: 'go to next page',
        lastPageAriaLabel: 'go to last page',
    },
    /* eslint-why user defined functions, defaults only put in place for test rendering */
    /* eslint-disable no-empty-function */
    onPageChange: () => { },
    onRowsPerPageChange: () => { },
    /* eslint-enable no-empty-function */
    rowsPerPageOptions: [10, 25, 50, 100],
};
__exportStar(require("@mui/material/TablePagination"), exports);
exports.default = Pagination;
