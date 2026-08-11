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
exports.TablePaginationTestIds = void 0;
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const useMediaQuery_1 = __importDefault(require("@mui/material/useMediaQuery"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const chevron__left_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/chevron--left"));
const chevron__right_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/chevron--right"));
const page__first_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/page--first"));
const page__last_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/page--last"));
const IconButton_1 = __importDefault(require("../IconButton/IconButton"));
const Typography_1 = __importDefault(require("../Typography/Typography"));
const Autocomplete_1 = __importDefault(require("../Autocomplete/Autocomplete"));
const theme_1 = require("../theme");
const Pagination_1 = require("./Pagination");
const Tooltip_1 = __importDefault(require("../Tooltip/Tooltip"));
var TablePaginationTestIds;
(function (TablePaginationTestIds) {
    TablePaginationTestIds["TABLE_PAGINATION_ACTIONS_ROOT"] = "tablePaginationActionsRoot";
    TablePaginationTestIds["TABLE_PAGINATION_PAGE_DIV"] = "tablePaginationActionsPageDiv";
    TablePaginationTestIds["TABLE_PAGINATION_PAGE_LABEL"] = "tablePaginationActionsPageLabel";
    TablePaginationTestIds["TABLE_PAGINATION_PAGE_TOTAL"] = "tablePaginationActionsPageTotal";
    TablePaginationTestIds["TABLE_PAGINATION_PAGE_FIRST"] = "tablePaginationActionsPageFirst";
    TablePaginationTestIds["TABLE_PAGINATION_PAGE_PREV"] = "tablePaginationActionsPagePrev";
    TablePaginationTestIds["TABLE_PAGINATION_PAGE_NEXT"] = "tablePaginationActionsPageNext";
    TablePaginationTestIds["TABLE_PAGINATION_PAGE_LAST"] = "tablePaginationActionsPageLast";
    TablePaginationTestIds["TABLE_PAGINATION_ROWS_DIV"] = "tablePaginationActionsRowsDiv";
    TablePaginationTestIds["TABLE_PAGINATION_ROWS_LABEL"] = "tablePaginationActionsRowsLabel";
    TablePaginationTestIds["TABLE_PAGINATION_ROWS_TOTAL"] = "tablePaginationActionsRowsTotal";
})(TablePaginationTestIds = exports.TablePaginationTestIds || (exports.TablePaginationTestIds = {}));
const CustomTablePaginationActions = (props) => {
    const theme = (0, material_1.useTheme)();
    const { count, page, rowsPerPage, onPageChange, onRowsPerPageChange, translation, rowsPerPageOptions, } = props;
    const atLeast480px = (0, useMediaQuery_1.default)('(min-width:480px)');
    const atLeast360px = (0, useMediaQuery_1.default)('(min-width:360px)');
    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };
    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };
    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };
    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
    const currentPageShownStart = (page * rowsPerPage) + 1;
    const currentPageShownEnd = (page + 1) * rowsPerPage;
    return (react_1.default.createElement(Box_1.default, { "data-testid": TablePaginationTestIds.TABLE_PAGINATION_ACTIONS_ROOT, sx: { flexShrink: 0, ml: 2.5 } },
        react_1.default.createElement("div", { "data-testid": TablePaginationTestIds.TABLE_PAGINATION_ROWS_DIV },
            react_1.default.createElement(Autocomplete_1.default, { "aria-label": translation.rowsPerPageLabel, label: translation.rowsPerPageLabel, id: TablePaginationTestIds.TABLE_PAGINATION_ROWS_LABEL, "data-testid": TablePaginationTestIds.TABLE_PAGINATION_ROWS_LABEL, role: "listbox", tabIndex: 0, noOptionsText: "", options: rowsPerPageOptions, getOptionLabel: (option) => { return (Number(option)).toString(); }, sx: { '& .MuiFormControl-root': { minWidth: '0px' }, '& .MuiAutocomplete-inputRoot': { width: '62px' } }, componentsProps: {
                    popper: {
                        sx: {
                            '.MuiAutocomplete-listbox': Object.assign(Object.assign({}, theme_1.TYPOGRAPHY.body2), { '::-webkit-scrollbar': {
                                    display: 'none',
                                }, '& .MuiAutocomplete-option': {
                                    '&[aria-selected=true]': {
                                        backgroundColor: `${theme.palette.action.activeOpacity}`,
                                        '&.Mui-focused': {
                                            backgroundColor: `${theme.palette.action.activeOpacity}`,
                                        },
                                        '&.Mui-focusVisible': {
                                            backgroundColor: 'transparent',
                                        },
                                    },
                                    '&.Mui-focusVisible': {
                                        border: `1px solid ${theme.palette.primary.main}`,
                                        backgroundColor: 'transparent',
                                        '&:hover': {
                                            backgroundColor: theme.palette.action.hover,
                                        },
                                    },
                                } }),
                        },
                    },
                }, value: rowsPerPage, onChange: (event, value) => {
                    if (onRowsPerPageChange) {
                        const evt = Object.assign(Object.assign({}, event), { target: Object.assign(Object.assign({}, event.target), { value: String(value) }) });
                        // @ts-ignore force change the value of target value, there is mismatch on event.target.value and onchange value on keydown event
                        onRowsPerPageChange(evt);
                    }
                }, onKeyDown: (event) => {
                    if (event.key === 'Enter') {
                        const targetValue = Number(event.target.value);
                        if (!rowsPerPageOptions.includes(targetValue)) {
                            event.target.blur();
                        }
                        else if (onRowsPerPageChange) {
                            if (targetValue === rowsPerPage) {
                                // handles when user retypes same number as existing rowsPerPage and hits double space twice (in Mac this appends a dot depending on laptop settings)
                                event.target.blur(); // should just go back to existing value
                            }
                            else {
                                // eslint-why KeyboardEvent for accessibility does not match expected TablePagination onRowsPerPageChange event type
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                onRowsPerPageChange(event);
                            }
                        }
                    }
                } }),
            atLeast360px
                && (react_1.default.createElement(Typography_1.default, { variant: "body2", "data-testid": TablePaginationTestIds.TABLE_PAGINATION_ROWS_TOTAL }, `${translation.rowsPerPageDescription.replace(Pagination_1.TablePaginationLocalizationPlaceholders.CURRENT_PAGE_TO_END_PAGE, theme.direction === theme_1.ThemeDirectionType.RTL
                    ? `${currentPageShownEnd < count ? currentPageShownEnd : count}-${currentPageShownStart}`
                    : `${currentPageShownStart}-${currentPageShownEnd < count ? currentPageShownEnd : count}`).replace(Pagination_1.TablePaginationLocalizationPlaceholders.TOTAL_ROWS_COUNT, `${count}`)}`))),
        react_1.default.createElement("div", { "data-testid": TablePaginationTestIds.TABLE_PAGINATION_PAGE_DIV },
            react_1.default.createElement(Tooltip_1.default, { title: theme.direction === theme_1.ThemeDirectionType.RTL ? translation.lastPageAriaLabel : translation.firstPageAriaLabel, placement: "top" },
                react_1.default.createElement(IconButton_1.default, { onClick: handleFirstPageButtonClick, disabled: page === 0, "aria-label": translation.firstPageAriaLabel, "data-testid": TablePaginationTestIds.TABLE_PAGINATION_PAGE_FIRST }, theme.direction === theme_1.ThemeDirectionType.RTL ? react_1.default.createElement(page__last_1.default, null) : react_1.default.createElement(page__first_1.default, null))),
            react_1.default.createElement(Tooltip_1.default, { title: theme.direction === theme_1.ThemeDirectionType.RTL ? translation.nextPageAriaLabel : translation.prevPageAriaLabel, placement: "top" },
                react_1.default.createElement(IconButton_1.default, { onClick: handleBackButtonClick, disabled: page === 0, "aria-label": translation.prevPageAriaLabel, "data-testid": TablePaginationTestIds.TABLE_PAGINATION_PAGE_PREV }, theme.direction === theme_1.ThemeDirectionType.RTL ? react_1.default.createElement(chevron__right_1.default, null) : react_1.default.createElement(chevron__left_1.default, null))),
            react_1.default.createElement(Autocomplete_1.default, { "aria-label": translation.pageLabel, label: translation.pageLabel, id: TablePaginationTestIds.TABLE_PAGINATION_PAGE_LABEL, "data-testid": TablePaginationTestIds.TABLE_PAGINATION_PAGE_LABEL, role: "listbox", tabIndex: 0, noOptionsText: "", options: Array.from(Array(Math.ceil(count / rowsPerPage)).keys()), getOptionLabel: (option) => { return (Number(option) + 1).toString(); }, sx: { '& .MuiFormControl-root': { minWidth: '0px' }, '& .MuiAutocomplete-inputRoot': { width: '40px' } }, componentsProps: {
                    popper: {
                        sx: {
                            '.MuiAutocomplete-listbox': Object.assign(Object.assign({}, theme_1.TYPOGRAPHY.body2), { '::-webkit-scrollbar': {
                                    display: 'none',
                                }, '& .MuiAutocomplete-option': {
                                    '&[aria-selected=true]': {
                                        backgroundColor: `${theme.palette.action.activeOpacity}`,
                                        '&.Mui-focused': {
                                            backgroundColor: `${theme.palette.action.activeOpacity}`,
                                        },
                                        '&.Mui-focusVisible': {
                                            backgroundColor: 'transparent',
                                        },
                                    },
                                    '&.Mui-focusVisible': {
                                        border: `1px solid ${theme.palette.primary.main}`,
                                        backgroundColor: 'transparent',
                                        '&:hover': {
                                            backgroundColor: theme.palette.action.hover,
                                        },
                                    },
                                } }),
                        },
                    },
                }, value: page, onChange: (event, value) => { onPageChange(event, Number(value)); }, onKeyDown: (event) => {
                    if (event.key === 'Enter') {
                        const targetValue = Number(event.target.value);
                        const numberTarget = Number.isNaN(targetValue) ? targetValue : (targetValue - 1);
                        if (!Array.from(Array(Math.ceil(count / rowsPerPage)).keys()).includes(numberTarget)) {
                            event.target.blur();
                        }
                        else if ((targetValue - 1) === page) {
                            // handles when user retypes same number as existing page and hits double space twice (in Mac this appends a dot depending on laptop settings)
                            event.target.blur(); // should just go back to existing value
                        }
                        else {
                            onPageChange(null, targetValue - 1);
                        }
                    }
                } }),
            atLeast480px
                && (react_1.default.createElement(Typography_1.default, { variant: "body2", "data-testid": TablePaginationTestIds.TABLE_PAGINATION_PAGE_TOTAL }, `${translation.pageDescription.replace(Pagination_1.TablePaginationLocalizationPlaceholders.TOTAL_PAGES_COUNT, `${Math.max(0, Math.ceil(count / rowsPerPage) - 1) + 1}`)}`)),
            react_1.default.createElement(Tooltip_1.default, { title: theme.direction === theme_1.ThemeDirectionType.RTL ? translation.prevPageAriaLabel : translation.nextPageAriaLabel, placement: "top" },
                react_1.default.createElement(IconButton_1.default, { onClick: handleNextButtonClick, disabled: page >= Math.ceil(count / rowsPerPage) - 1, "aria-label": translation.nextPageAriaLabel, "data-testid": TablePaginationTestIds.TABLE_PAGINATION_PAGE_NEXT }, theme.direction === theme_1.ThemeDirectionType.RTL ? react_1.default.createElement(chevron__left_1.default, null) : react_1.default.createElement(chevron__right_1.default, null))),
            react_1.default.createElement(Tooltip_1.default, { title: theme.direction === theme_1.ThemeDirectionType.RTL ? translation.firstPageAriaLabel : translation.lastPageAriaLabel, placement: "top" },
                react_1.default.createElement(IconButton_1.default, { onClick: handleLastPageButtonClick, disabled: page >= Math.ceil(count / rowsPerPage) - 1, "aria-label": translation.lastPageAriaLabel, "data-testid": TablePaginationTestIds.TABLE_PAGINATION_PAGE_LAST }, theme.direction === theme_1.ThemeDirectionType.RTL ? react_1.default.createElement(page__first_1.default, null) : react_1.default.createElement(page__last_1.default, null))))));
};
exports.default = CustomTablePaginationActions;
