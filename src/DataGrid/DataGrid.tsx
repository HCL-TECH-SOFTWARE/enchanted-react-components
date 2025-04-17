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
import {
  DataGrid as MuiDataGrid, DataGridProps as MuiDataGridProps, gridClasses, GridColDef, GridSlotsComponent,
} from '@mui/x-data-grid';
import { styled } from '@mui/material';
import Checkbox from '../Checkbox';
import Pagination, { TablePaginationLocalization, TablePaginationLocalizationPlaceholders } from '../Pagination';
import { findNextFocusableRow, findPreviousFocusableRow, findTargetElement } from '../utils/eventUtils';
import DataGridDivider from './DataGridDivider';
import ColumnSortedAscendingIcon from './ColumnSortedAscendingIcon';
import ColumnSortedDescendingIcon from './ColumnSortedDescendingIcon';
// import { ExtendedGridColumnMenu } from './DataGridColumnMenu'; commented out until https://jira.cwp.pnp-hcl.com/browse/DXQ-30099 implementation starts

/**
 * Extension for GridColDef it lets use or custon cell
 * GridColDef include properties that determine whether a column is sortable, disabled, etc. See: https://mui.com/x/api/data-grid/grid-col-def/
 *
 * @interface ExtendedGridColDef
 * @member {boolean} iconEnd If true, the cell will display the endIcon in row data
 * @member {boolean} iconStart If true, the cell will display the iconStart in row data
 * @member {boolean} avatar If true, the cell will display the avatar in row data
 * @member {boolean} endActions If true, the cell will display the endActions in row data
 * @member {boolean} showSortingIcon If true, the column header cell will permanently display the sortIcon
 * @member {string} tooltip If we have tooltip, the cell will display tooltip on hover on the cell
 * @member {boolean} subTitle If true, the cell will display the subTitle in row data
 */
export interface ExtendedGridColDef extends GridColDef {
  iconEnd?: boolean,
  iconStart?: boolean,
  avatar?: boolean,
  endActions?: boolean, // always use tabIndex inside your button so i can be focused inside the cell
  showSortingIcon?: boolean,
  tooltip?: string,
  subTitle?: boolean,
}

// Style modifier for the column header that ensures always visibility of sorting icon, NOT just on hover which was default behavior
export const alwaysVisibleColHeadIconModifier = `${gridClasses['columnHeader--sortable']}--alwaysVisibleIcon`;

export enum DataGridTestIds {
  DATAGRID_CHECKBOX = 'dataGridCheckbox',
  DATAGRID_PAGINATION = 'dataGridPagination',
}

/**
 * @typedef DataGridProps
 *
 * @type {object}
 * @property {Function} onCheckboxClick - Event handler for checkbox value change
 * @property {string} focusedRow - Props state to tell data grid what is the focused row
 * @property {boolean} stickyHeader - If true, it will make column header fixed on the top
 * @property {number} totalCount - Actual total number of rows even beyond first fetch
 */
export type DataGridProps = MuiDataGridProps & {
  onCheckboxClick?: Function,
  focusedRow?: string,
  stickyHeader?: boolean,
  isRowClickable?: boolean,
  totalCount: number,
  page: number,
  pageSize: number,
  translation: TablePaginationLocalization,
  rowsPerPageOptions: Array<number>,
}

const StyledDataGrid = styled(MuiDataGrid)<DataGridProps>((props) => {
  const { theme } = props;
  const focusSelector = `.MuiDataGrid-row[data-id="${props.focusedRow}"]`;
  return {
    fontFamily: theme.typography.fontFamily,
    '&.MuiDataGrid-root': {
      border: 'none',
    },
    '& .MuiDataGrid-columnHeaders': {
      borderBottom: `1px ${theme.palette.border.primary} solid`,
      background: theme.palette.common.white,
      '& .MuiDataGrid-columnHeaderTitle': {
        ...theme.typography.subtitle2,
        fontColor: theme.palette.text.primary,
      },
      ...(props.stickyHeader === true) && {
        position: 'sticky',
        zIndex: 1,
      },
    },
    ' .MuiDataGrid-cell': {
      borderBottom: `1px ${theme.palette.border.secondary} solid`,
    },
    '& .MuiDataGrid-row': {
      '.MuiCheckbox-root': {
        marginRight: '0',
      },
    },
    '& .MuiDataGrid-row:hover': {
      backgroundColor: theme.palette.action.hover,
      ...(props.isRowClickable === true) && {
        cursor: 'pointer',
      },
      '.MuiCheckbox-root': {
        display: 'inline-flex',
        padding: '4px',
        height: '24px',
        width: '24px',
        '.PrivateSwitchBase-input': {
          height: '24px',
          width: '24px',
        },
      },
      '& .MuiDataGrid-cell--withEndActions': {
        display: 'flex',
      },
    },
    '& .MuiDataGrid-row.Mui-selected:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '& .MuiDataGrid-row.Mui-selected': {
      backgroundColor: theme.palette.action.activeOpacity,
      '.MuiCheckbox-root': {
        display: 'inline-flex',
        padding: '4px',
        height: '24px',
        width: '24px',
        '.PrivateSwitchBase-input': {
          height: '24px',
          width: '24px',
        },
      },
    },
    '& .MuiDataGrid-cell:focus': {
      border: `1px ${theme.palette.action.focus} solid`,
      outline: 'none',
    },
    '& .MuiDataGrid-hide-checkbox .MuiCheckbox-root': {
      display: 'none',
    },
    '& .withEndActions .MuiDataGrid-cell--withEndActions': {
      display: 'flex',
    },
    '& .MuiDataGrid-cell': {
      paddingLeft: '12px',
      paddingRight: '12px',
      textAlign: 'center',
      '&.MuiDataGrid-cellCheckbox': {
        paddingRight: '12px',
      },
    },
    '& .MuiDataGrid-columnHeader': {
      padding: '0',
      '&--sortable--alwaysVisibleIcon': {
        '& .MuiDataGrid-iconButtonContainer': {
          visibility: 'visible',
          width: 'auto',
          '& .MuiDataGrid-sortIcon': {
            opacity: 0.5,
            color: theme.palette.action.active,
          },
        },
      },
      '&.MuiDataGrid-columnHeaderCheckbox': {
        '& .MuiDataGrid-columnHeaderTitleContainer': {
          marginRight: '12px',
        },
      },
      '& .MuiDataGrid-iconButtonContainer': {
        margin: '8px',
      },
    },
    '& .MuiDataGrid-columnHeaderTitleContainer': {
      marginLeft: '12px',
      marginRight: '12px',
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      ...theme.typography.subtitle2,
    },
    '& .MuiDataGrid-columnHeaders:hover': {
      '& .MuiDataGrid-columnSeparator': {
        display: 'flex',
      },
      '& .MuiDataGrid-columnHeader:last-child .MuiDataGrid-columnSeparator': {
        display: 'none',
      },
      '& .MuiDataGrid-columnSeparator--sideRight': {
        right: '4px',
      },
    },
    '& .MuiDataGrid-columnSeparator': {
      display: 'none',
    },
    '& .MuiDataGrid-columnHeaders:focus': {
      outline: 'none',
      border: `1px ${theme.palette.action.focus} solid`,
    },
    '& .MuiDataGrid-columnHeader--alignRight .MuiDataGrid-columnHeaderTitleContainer': {
      flexDirection: 'row',
      '& .MuiDataGrid-columnHeaderTitleContainerContent': {
        marginLeft: 'auto',
        marginRight: 0,
      },
    },
    '& .MuiDataGrid-columnHeaderCheckbox.MuiDataGrid-columnHeader:focus-within': {
      outline: 'none',
      border: 'none',
    },
    '& .MuiDataGrid-columnHeader:focus-within': {
      outline: 'none',
      border: `1px solid ${theme.palette.action.focus}`,
      ' .MuiDataGrid-iconButtonContainer': {
        visibility: 'visible',
        width: 'auto',
        ' .MuiSvgIcon-root': {
          opacity: '1',
          border: `1px solid ${theme.palette.action.focus}`,
          borderRadius: '3px',
        },
      },
      ' .MuiTouchRipple-root': {
        display: 'none',
      },
    },
    '& .MuiDataGrid-columnHeader:focus': {
      outline: 'none',
    },
    '& .MuiDataGrid-cellCheckbox.MuiDataGrid-cell:focus-within': {
      outline: 'none',
      border: 'none',
      borderBottom: `1px ${theme.palette.action.activeOpacity} solid !important`, // need to be important so border bottom will not primary when it is a checkbox cell
    },
    '& .MuiDataGrid-cell:focus-within': {
      outline: 'none',
      border: `1px ${theme.palette.action.focus} solid`,
      borderBottom: `1px ${theme.palette.action.focus} solid !important`, // need to be important to override data grid border bottom behaviour when focused
    },
    [focusSelector]: {
      outline: 'none',
      border: `1px ${theme.palette.action.focus} solid`,
      '& .MuiDataGrid-cell:last-child': {
        borderRight: `2px ${theme.palette.action.focus} solid`,
      },
      '.MuiCheckbox-root': {
        display: 'inline-flex',
        padding: '4px',
        height: '24px',
        width: '24px',
        '.PrivateSwitchBase-input': {
          height: '24px',
          width: '24px',
        },
      },
      '& .MuiDataGrid-cell--withEndActions': {
        display: 'flex',
      },
    },
    '& .MuiDataGrid-cell:has(.MuiDataGrid-cell--withEndActions)': {
      borderLeft: 'none',
      borderRight: 'none',
      borderTop: 'none',
      ':focus-within': {
        borderBottom: `1px ${theme.palette.action.activeOpacity} solid !important`,
      },
    },
    '& .MuiDataGrid-columnHeader.MuiDataGrid-columnHeader--sortable:focus': {
      outline: 'none',
      border: 'none',
    },
    '& .MuiDataGrid-overlay': {
      background: theme.palette.common.white,
    },
    ...(props.stickyHeader === true) && {
      '& .MuiDataGrid-main': {
        // remove overflow hidden overwise sticky does not work
        overflow: 'unset',
      },
      '& .MuiDataGrid-virtualScroller': {
        // remove the space left for the header
        marginTop: '0!important',
      },
    },
    ...(props.hideFooter) && {
      '& .MuiDataGrid-virtualScroller': {
        borderBottom: `1px ${theme.palette.border.secondary} solid`,
      },
    },
    ...(props.totalCount <= 0) && {
      '& .MuiDataGrid-footerContainer': {
        borderTop: 'none',
      },
      '& .MuiDataGrid-columnHeaders': {
        display: 'none',
        border: 'none !important',
      },
    },
  };
});

/**
* Renders a data grid, it replaces the table component.
*/
const DataGrid = ({ components, componentsProps, ...props }: DataGridProps) => {
  const {
    onCheckboxClick, translation, totalCount, page, pageSize, rowsPerPageOptions,
  } = props;
  const [focusRow, setFocusRow] = React.useState<string>('');
  const arrowKey = React.useRef<string>('');

  // this function handles different key bindings for each row on the table
  const handleOnRowKeyDown = (event: React.KeyboardEvent) => {
    const target = event.target as HTMLDivElement;
    // get row check box for table row
    const rowCheckbox: HTMLElement | undefined = findTargetElement(target, 'PrivateSwitchBase-input', false);
    // if users press enter or space it will select the row.
    if (event.key === 'Enter' || event.key === ' ') {
      if (rowCheckbox) {
        rowCheckbox.click();
      } else if (event.key === 'Enter') {
        target.click();
      }
    }
    // add navigation control if user press arrow right it will focus on action button on a row
    if (event.key === 'ArrowRight' && target.classList.contains('MuiDataGrid-row')) {
      setFocusRow(''); // to remove border
      const cellWithEndAction = target.querySelectorAll('.MuiDataGrid-cell--withEndActions');
      if (cellWithEndAction.length > 0) {
        const parentCell = findTargetElement(cellWithEndAction[0], 'MuiDataGrid-cell', true);
        if (parentCell?.firstElementChild) {
          (parentCell.firstElementChild as HTMLDivElement).focus();
        }
      } else if (target.firstElementChild) {
        (target.firstElementChild as HTMLDivElement).focus();
      }
    }
    if (event.key === 'ArrowLeft') {
      // we need to focus on the row if the cell is the last cell
      if (!target.previousElementSibling) {
        const parentRow = findTargetElement(target, 'MuiDataGrid-row', true);
        setFocusRow(parentRow?.getAttribute('data-id') as string);
        if (parentRow) parentRow.focus();
      }
      // we show the border if the cell is the checkbox cell or we are already focused on the row
      if (!target.classList.contains('PrivateSwitchBase-input') && !target.classList.contains('MuiDataGrid-row')) {
        setFocusRow(''); // to remove border
      }
    }
    // if user hold shift and press arrow down row should be selected below
    if (event.shiftKey && event.key === 'ArrowDown') {
      if (target.nextElementSibling) {
        if (target.className.includes('Mui-selected') && target.nextElementSibling.className.includes('Mui-selected')) {
          // this handle when next row is already selected
          if (rowCheckbox) {
            rowCheckbox.click();
            (target.nextElementSibling as HTMLDivElement).focus();
          }
        } else {
          const nextSiblingCheckBox = findTargetElement(target.nextElementSibling, 'PrivateSwitchBase-input', false);
          // focuses on the next row
          (target.nextElementSibling as HTMLDivElement).focus();
          // enable select to next row
          if (nextSiblingCheckBox) nextSiblingCheckBox.click();
        }
      }
    }
    // if user hold shift and press arrow up row should be selected above
    if (!event.ctrlKey && event.shiftKey && event.key === 'ArrowUp') {
      if (target.previousElementSibling) {
        if (target.className.includes('Mui-selected') && target.previousElementSibling.className.includes('Mui-selected')) {
          // this handle when previous row is already selected
          if (rowCheckbox) {
            rowCheckbox.click();
            (target.previousElementSibling as HTMLDivElement).focus();
          }
        } else {
          const previousSiblingCheckBox = findTargetElement(target.previousElementSibling, 'PrivateSwitchBase-input', false);
          // focuses on the previous row
          (target.previousElementSibling as HTMLDivElement).focus();
          // enable select to previous row
          if (previousSiblingCheckBox) previousSiblingCheckBox.click();
        }
      }
    }
    // this allow user to navigate via keyboard table row by pressing arrow down
    if (!event.shiftKey && event.key === 'ArrowDown') {
      const parentCell = findTargetElement(target, 'MuiDataGrid-cell', true);
      const parentRow = parentCell?.parentElement as HTMLDivElement;
      if (target.nextElementSibling) {
        // hide the checkbox to current select row
        target.classList.add('MuiDataGrid-hide-checkbox');
        // focus to next row
        const nextFocusableRow = findNextFocusableRow(target);
        (nextFocusableRow as HTMLDivElement).focus();
      } else if (parentCell && parentRow?.nextElementSibling?.classList.contains('disabled-row')) {
        // find next focusable row
        const nextFocusableRow = findNextFocusableRow(parentRow as HTMLDivElement);
        if (!nextFocusableRow) {
          return;
        }
        const nextRow = parentRow?.nextElementSibling as HTMLDivElement;
        const nextRowCell = nextRow.querySelector(`.MuiDataGrid-cell[data-colindex="${parentCell?.getAttribute('data-colindex')}"]`) as HTMLDivElement;
        (nextRowCell.firstChild as HTMLDivElement).focus();
      }
    }
    // this allow user to navigate via keyboard table row by pressing arrow up
    if (!event.shiftKey && event.key === 'ArrowUp') {
      const previousFocusableRow = findPreviousFocusableRow(target);
      const parentCell = findTargetElement(target, 'MuiDataGrid-cell', true);
      const parentRow = parentCell?.parentElement as HTMLDivElement;
      // check if we have previous row
      if (previousFocusableRow && target.classList.contains('MuiDataGrid-row')) {
        // hide the checkbox to current select row
        target.classList.add('MuiDataGrid-hide-checkbox');
        // focus to previous row
        (previousFocusableRow as HTMLDivElement).focus();
      } else if (parentCell && parentRow?.previousElementSibling?.classList.contains('disabled-row')) {
        // find previous row
        const previousRow = parentRow?.previousElementSibling as HTMLDivElement;
        const previousRowCell = previousRow.querySelector(`.MuiDataGrid-cell[data-colindex="${parentCell?.getAttribute('data-colindex')}"]`) as HTMLDivElement;
        previousRowCell.focus();
      } else {
        // to focus the columnHeaders since we dont have previousElementSibling
        target.classList.add('MuiDataGrid-hide-checkbox');
        const dataGridMain = findTargetElement(target, 'MuiDataGrid-main', true) as HTMLDivElement;
        if (dataGridMain.firstElementChild && dataGridMain.firstElementChild.className.includes('MuiDataGrid-columnHeaders ')) {
          setFocusRow(''); // to hide border on current row
          (dataGridMain.firstElementChild as HTMLDivElement).focus();
        }
      }
    }

    // this allow user to jump to column header row when they press shift, control then arrow up
    if (event.shiftKey && event.ctrlKey && event.key === 'ArrowUp') {
      setFocusRow('');
      const dataGridMain = findTargetElement(target, 'MuiDataGrid-main', true) as HTMLDivElement;
      (dataGridMain.firstChild as HTMLDivElement).focus();
    }

    // check if the row is the last available row and the user press tab
    if (event.key === 'Tab') {
      setFocusRow(''); // to hide border on current row
      // check if the row is the first focusable row then we need to focus on the column header row
      const previousElementSibling = findPreviousFocusableRow(target);
      if (event.shiftKey && !previousElementSibling && target.classList.contains('MuiDataGrid-row')) {
        const dataGridMain = findTargetElement(target, 'MuiDataGrid-main', true) as HTMLDivElement;
        if (dataGridMain.firstElementChild && dataGridMain.firstElementChild.className.includes('MuiDataGrid-columnHeaders ')) {
          (dataGridMain.firstElementChild as HTMLDivElement).focus();
        }
      }
    }
  };

  // this functions handles keyboard navigation on the column header row
  const handleOnColumnHeaderRowKeyDown = (event: KeyboardEvent) => {
    event.preventDefault();
    const target = event.target as HTMLDivElement;
    const rowCheckbox: HTMLElement | undefined = findTargetElement(target, 'PrivateSwitchBase-input', false);
    // find column header title element that contains column title and sorting icon as we are supporting click for whole space of title and icon in header title
    const columnHeaderTitle: HTMLElement | undefined = findTargetElement(target, 'MuiDataGrid-columnHeaderTitle', false);
    const columnHeader: HTMLElement | undefined = findTargetElement(target, 'MuiDataGrid-columnHeader', false);
    // this is for us to navigate to the first row of the table body
    if (target && (event.key === 'Tab' || event.key === 'ArrowDown')) {
      // to find the first row in order to focus
      const firstRow = findTargetElement(target.parentElement?.children[1], 'MuiDataGrid-row', false);
      // check if the first row is not focusable then we need to find the next focusable row
      if (firstRow?.getAttribute('tabindex') === '-1') {
        const nextFocusableRow = findNextFocusableRow(firstRow);
        if (nextFocusableRow) {
          nextFocusableRow.focus();
        } else {
          // If no focusable row is found, move focus to the footer
          const footer = document.querySelector('.MuiDataGrid-footerContainer') as HTMLDivElement;
          if (footer) {
            const focusableFooterElement = footer.querySelector('.MuiAutocomplete-root') as HTMLElement;
            if (focusableFooterElement) {
              focusableFooterElement.focus();
            }
          }
        }
      } else {
        arrowKey.current = event.key;
        firstRow?.focus();
      }
    }
    // this is for us enable select all when user press enter on column header row and apply sorting through both space and enter key press
    if (target && (event.key === 'Enter' || event.key === ' ')) {
      // this will find the select all check box
      if (rowCheckbox) {
        rowCheckbox.click();
      }
      // this option allow users to press enter key or space for sorting
      if (columnHeaderTitle) {
        columnHeaderTitle.click();
      }
    }
    // this option allow users to focus select all check box
    if (target && event.key === 'ArrowRight') {
      if (rowCheckbox) {
        rowCheckbox.focus();
      }
      if (!rowCheckbox && columnHeader) {
        columnHeader.focus();
      }
    }
  };

  /**
   * Handles the focus event on the header of the DataGrid.
   * @param event - The keyboard event triggered when the header is focused.
   * This function prevents the default focus behavior, finds the column header row,
   * and sets it to be focusable by adding a `tabindex` attribute. It then focuses
   * on the column header row and adds a keydown event listener for keyboard navigation.
   * Additionally, it removes the focus from the row when the header is focused.
   */
  const handleOnHeaderFocus = (event: KeyboardEvent) => {
    event.preventDefault();
    // need to get coloumn header row to so that we can focus on it.
    const parentElem = findTargetElement(event.target, 'MuiDataGrid-root', true);
    const columnHeaderRow = parentElem?.querySelector('.MuiDataGrid-columnHeaders') as HTMLDivElement;
    if (columnHeaderRow) {
      // add tabindex so that we can are able to focus on it.
      columnHeaderRow.setAttribute('tabindex', '0');
      // need some wait to set attribute to take effect
      window.setTimeout(() => {
        columnHeaderRow.focus();
      }, 0);
      // add keydown event to coloumn header row for some keyboard navigation
      columnHeaderRow.addEventListener('keydown', (e) => {
        return handleOnColumnHeaderRowKeyDown(e);
      });
      columnHeaderRow.addEventListener('focus', () => {
        setFocusRow(''); // remove focus on the row when we focus on the header
      }, { once: true });
    }
    // check if the first row is disabled so that we can set tabindex to -1
    const firstRow = parentElem?.querySelector('.MuiDataGrid-row') as HTMLDivElement;
    if (firstRow.classList.contains('disabled-row')) {
      firstRow.setAttribute('tabindex', '-1');
      firstRow.setAttribute('aria-disabled', 'true');
    }
  };

  // we need this function to show checkbox on that row when a cell is focused
  const handleOnCellFocus = (event: React.FocusEvent) => {
    console.log('nidhinraj new');
    const target = event.target as HTMLDivElement;
    const parentRow = findTargetElement(target, 'MuiDataGrid-row', true) as HTMLDivElement;
    if (parentRow && !parentRow.classList.contains('disabled-row') && parentRow.classList.contains('MuiDataGrid-hide-checkbox')) {
      parentRow.classList.remove('MuiDataGrid-hide-checkbox');
    }

    // we need to focus on next focusable row when we are pressing tab from a cell
    if (parentRow && parentRow.nextElementSibling && parentRow.nextElementSibling.classList.contains('disabled-row')) {
      parentRow.nextElementSibling.setAttribute('tabindex', '-1');
      parentRow.nextElementSibling.setAttribute('aria-disabled', 'true');
    }

    const parentCell = findTargetElement(target, 'MuiDataGrid-cell', true);
    if (parentRow?.classList.contains('disabled-row')) {
      const relatedTargetCell = findTargetElement(event.relatedTarget as HTMLElement, 'MuiDataGrid-cell', true);
      const relatedTargetRow = relatedTargetCell?.parentElement as HTMLDivElement;
      //  Find the next focusable row
      let nextFocusableRow;
      if (arrowKey.current === 'ArrowDown' || (relatedTargetRow === parentRow.nextElementSibling && arrowKey.current === '')) {
        nextFocusableRow = findNextFocusableRow(parentRow);
        // if we are at the last focusable row and if we press arrow down we need to hide focus from the disabled cell(last row is disabled cell)
        if (!nextFocusableRow) target.blur();
      } else {
        nextFocusableRow = findPreviousFocusableRow(parentRow);
        if (!nextFocusableRow) {
          const dataGridMain = findTargetElement(target, 'MuiDataGrid-main', true) as HTMLDivElement;
          if (dataGridMain.firstElementChild && dataGridMain.firstElementChild.className.includes('MuiDataGrid-columnHeaders ')) {
            parentRow.classList.add('MuiDataGrid-hide-checkbox');// to hide checkbox from disabled current row
            (dataGridMain.firstElementChild as HTMLDivElement).focus();
          }
        }
      }

      if (nextFocusableRow) {
        const nextRowCell = nextFocusableRow.querySelector(`.MuiDataGrid-cell[data-colindex="${parentCell?.getAttribute('data-colindex')}"]`)?.firstChild as HTMLDivElement;
        nextRowCell?.focus();
      }
    }

    // need to refocus the from parent cell to action button
    const cellWithEndAction = target.querySelectorAll('.MuiDataGrid-cell--withEndActions');
    if (cellWithEndAction.length > 0) {
      const actionButton = findTargetElement(cellWithEndAction[0], 'MuiButtonBase-root', false);
      if (actionButton) {
        // this is needed to let the button to be focused instead of the cell
        window.setTimeout(() => {
          actionButton.focus();
        }, 0);
      }
    }
  };

  // we need this function to hide checkbox on that row when a cell is blured
  const handleOnCellBlur = (event: React.FocusEvent) => {
    const target = event.target as HTMLDivElement;
    const parentRow = findTargetElement(target, 'MuiDataGrid-row', true);
    const parentCell = findTargetElement(target, 'MuiDataGrid-cell', true);
    // need to check if the previous cell is checkbox cell so that we will not hide the checkbox
    const isPreviousSiblingCheckbox = parentCell?.previousElementSibling?.className.includes('MuiDataGrid-cellCheckbox');
    if (parentRow && !isPreviousSiblingCheckbox) {
      parentRow.classList.add('MuiDataGrid-hide-checkbox');
    }
  };

  // we need to check if previous cell is the checkbox cell so we can hide checkbox when we change row focus
  const handleOnCellKeydown = (event: React.KeyboardEvent) => {
    const target = event.target as HTMLDivElement;
    arrowKey.current = event.key;
    const parentCell = findTargetElement(target, 'MuiDataGrid-cell', true);
    // need to hide the end actions when we navigate to other cell
    parentCell?.classList.remove('withEndActions');
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      // check if the current cell is beside the checkbox so that we dont hide it.
      const isPreviousSiblingCheckbox = parentCell?.previousElementSibling?.className.includes('MuiDataGrid-cellCheckbox');
      const parentRow = findTargetElement(target, 'MuiDataGrid-row', true) as HTMLDivElement;
      // !(parentRow.classList.contains('MuiDataGrid-row--lastVisible') && event.key === 'ArrowDown') we dont want to hide checkbox when are the last row on arrow down
      if (isPreviousSiblingCheckbox && parentRow && !(parentRow.classList.contains('MuiDataGrid-row--lastVisible') && event.key === 'ArrowDown')) {
        parentRow.classList.add('MuiDataGrid-hide-checkbox');
      }
    }
    // this is for the handling if you want to select the row from row cell
    if (target.classList.contains('PrivateSwitchBase-input') && (event.key === 'ArrowLeft' || (event.shiftKey && event.key === 'ArrowUp'))) {
      const parentRow = findTargetElement(target, 'MuiDataGrid-row', true);
      setFocusRow(parentRow?.getAttribute('data-id') as string);
      if (parentRow) parentRow.focus();
    }
    // hide checkbox to current row when user press tab
    if (event.key === 'Tab') {
      const parentCellDiv = findTargetElement(target, 'MuiDataGrid-cell', true);
      // need to set tabibex to -1 tp cell and child of that cell when lost focus due to tab
      if (parentCellDiv && parentCellDiv.classList.contains('MuiDataGrid-cell')) parentCellDiv.setAttribute('tabindex', '-1');
      if (parentCellDiv && parentCellDiv.firstChild) (parentCellDiv.firstChild as HTMLDivElement).setAttribute('tabindex', '-1');
      const parentRow = findTargetElement(target, 'MuiDataGrid-row', true);
      if (parentRow) parentRow.classList.add('MuiDataGrid-hide-checkbox');
    }
  };

  // this function is for navigating checkbox up and down
  const handleOnCheckboxKeydown = (event: React.KeyboardEvent) => {
    const target = event.target as HTMLInputElement;
    const parentRow = findTargetElement(target, 'MuiDataGrid-row', true); // get the parent row
    if (parentRow) {
      // navigate checkbox from top to bottom
      if (event.key === 'ArrowUp' && parentRow.previousElementSibling) {
        parentRow.previousElementSibling.classList.remove('MuiDataGrid-hide-checkbox');
      }
      // navigate checkbox from bottom to top
      if (event.key === 'ArrowDown' && parentRow.nextElementSibling) {
        parentRow.nextElementSibling.classList.remove('MuiDataGrid-hide-checkbox');
      }
      if (event.key === 'Enter' || event.key === ' ') {
        // we want remove to be last event to took place
        window.setTimeout(() => {
          parentRow.classList.remove('MuiDataGrid-hide-checkbox');
        }, 0);
      }
    }
    const columnHeaderRow = findTargetElement(target, 'MuiDataGrid-columnHeaders', true);
    if (columnHeaderRow) {
      if (event.key === 'ArrowLeft') {
        columnHeaderRow.focus();
      }
    }
    // this handling for us to be able to focus on the first checkbox on the table body from the select all checkbox on Arrow down
    if (!parentRow && event.key === 'ArrowDown') {
      const dataGridMain = findTargetElement(target, 'MuiDataGrid-main', true) as HTMLDivElement;
      if (dataGridMain.children[1]) {
        const firstRow = findTargetElement(dataGridMain.children[1], 'MuiDataGrid-row', false);
        if (firstRow) firstRow.classList.remove('MuiDataGrid-hide-checkbox');
      }
    }
  };

  // to show end action button via mouse click or keyboard nav
  const handleOnRowFocus = (event: FocusEvent) => {
    const target = event.target as HTMLDivElement;
    if (target.classList.contains('MuiDataGrid-row')) {
      const nextRows = target.nextElementSibling as HTMLDivElement;
      if (nextRows && nextRows.classList.contains('disabled-row')) {
        nextRows.setAttribute('tabindex', '-1');
        nextRows.setAttribute('aria-disabled', 'true');
        // find all cells inside that cell and set tabindex to -1
        const nextRowCells = nextRows.querySelectorAll('.MuiDataGrid-cell');
        nextRowCells.forEach((cell) => {
          cell.setAttribute('tabindex', '-1');
          const cellChild = cell.firstChild as HTMLElement;
          cellChild.setAttribute('tabindex', '-1');
          cell.setAttribute('aria-disabled', 'true');
        });
      }
      setFocusRow(target.getAttribute('data-id') as string);
    }
    arrowKey.current = '';
  };

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    if (props.onPageChange !== undefined) {
      // eslint-why check DataGrid onPageChange type def, GridCallbackDetails expect any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      props.onPageChange(newPage, event as any);
    }
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (props.onPageSizeChange && event.target) {
      // eslint-why check DataGrid onPageChange type def, GridCallbackDetails expect any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      props.onPageSizeChange(Number(event.target.value), event as any);
    }
  };

  // eslint-why to do
  // eslint-disable-next-line react/no-unstable-nested-components
  const DataGridTablePagination = () => {
    return (
      <Pagination
        translation={translation}
        count={totalCount}
        page={page}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handlePageSizeChange}
        onPageChange={handlePageChange}
        data-testid={DataGridTestIds.DATAGRID_PAGINATION}
        rowsPerPageOptions={rowsPerPageOptions}
      />
    );
  };

  const componentsOverride: Partial<GridSlotsComponent> = {
    BaseCheckbox: Checkbox,
    ColumnSortedAscendingIcon,
    ColumnSortedDescendingIcon,
    ColumnResizeIcon: DataGridDivider,
    Pagination: DataGridTablePagination,
    // ColumnMenu: ExtendedGridColumnMenu, commented out until https://jira.cwp.pnp-hcl.com/browse/DXQ-30099 implementation starts
  };

  return (
    <StyledDataGrid
      {...props}
      focusedRow={focusRow}
        // For list of components that can be overriden with custom components inside DataGrid - See https://mui.com/x/api/data-grid/data-grid/#slots
      components={{ ...components, ...componentsOverride }}
      componentsProps={{
        ...componentsProps,
        ...props.checkboxSelection && {
          baseCheckbox: {
            'data-testid': DataGridTestIds.DATAGRID_CHECKBOX,
            onClick: onCheckboxClick,
            onKeyDown: handleOnCheckboxKeydown,
          },
        },
        header: {
          tabIndex: 0,
          onFocus: handleOnHeaderFocus,
        },
        row: {
          tabIndex: 0,
          onKeyDown: handleOnRowKeyDown,
          onFocus: handleOnRowFocus,
        },
        cell: {
          onFocus: handleOnCellFocus,
          onBlur: handleOnCellBlur,
          onKeyDown: handleOnCellKeydown,
        },
        columnMenu: {
          onSortModelChange: props.onSortModelChange,
          onColumnVisibilityModelChange: props.onColumnVisibilityModelChange,
          columnVisibilityModel: props.columnVisibilityModel,
        },
      }}
      getRowClassName={(params) => {
        const classes = ['MuiDataGrid-hide-checkbox'];
        if (params.row.disabled) {
          classes.push('disabled-row');
        }
        return classes.join(' ');
      }}
    />
  );
};

DataGrid.defaultProps = {
  rowHeight: 37,
  headerHeight: 37,
  hideFooter: false, // shows footer containing TablePagination component
  autoHeight: true,
  columns: [],
  rows: [],
  checkboxSelection: false,
  disableColumnMenu: true, // hides menu icon (originally visible on hover) until https://jira.cwp.pnp-hcl.com/browse/DXQ-30099 implementation starts,
  page: 0,
  pageSize: 10,
  totalCount: 0,
  rowsPerPageOptions: [10, 25, 50, 100],
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
};

export * from '@mui/x-data-grid/DataGrid';
export default DataGrid;
