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
import { GridRenderCellParams, useGridApiContext } from '@mui/x-data-grid';
import { Grid } from '@mui/material';
import { debounce } from 'lodash';
import Typography from '../Typography';
import { ExtendedGridColDef } from '../DataGrid';
import Tooltip from '../Tooltip';
import { isOverflown } from '../utils/domUtils';

/**
* Renders our custom cell for Data Grid
*/
const DataGridCell = (props: GridRenderCellParams) => {
  const [isActive, setIsActive] = React.useState(false); // if cell is active it will show end actions button
  const apiContext = useGridApiContext();
  const valueRef = React.useRef<HTMLDivElement>(null); // add ref to truncate text
  const [tooltip, setTooltip] = React.useState('');
  const [subTitleTooltip, setSubTitleTooltip] = React.useState('');
  const [innerWidth, setInnerWidth] = React.useState<number>(window.innerWidth);

  const handleOnActive = React.useCallback(() => {
    setIsActive(true);
  }, []);
  const handleOnInactive = React.useCallback(() => {
    setIsActive(false);
  }, []);
  const colDef = props.colDef as ExtendedGridColDef;
  const { row } = props; // get row values

  const handleOnCellKeydown = React.useCallback((event: React.KeyboardEvent) => {
    const target = event.target as HTMLDivElement;
    // if cell has action button and if user press tab we should not hide action button
    if ((event.key === 'Tab' || event.key === 'ArrowDown' || event.key === 'ArrowUp')
      && row[`endActions-${colDef.field}`] && row[`endActions-${colDef.field}`].length > 0) {
      if (target.getAttribute('role') === 'button' && !target.parentElement?.parentElement?.parentElement?.nextSibling) {
        setIsActive(false);
        return;
      }
      setIsActive(true);
    } else {
      setIsActive(false);
    }

    // Check if the focus is moving to the next row, the endActions should be hidden
    const parentRow = target.closest('.MuiDataGrid-row');
    const nextRow = parentRow?.nextSibling as HTMLElement;
    if (nextRow && target.parentElement?.parentElement?.parentElement?.nextSibling && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      setIsActive(false);
    }
  }, []);

  // handle resize event
  const handleWindowResize = debounce(() => {
    setInnerWidth(window.innerWidth);
  }, 500);

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  // add ellipsis to text
  React.useEffect(() => {
    if (valueRef && valueRef.current) {
      const isOver = isOverflown(valueRef.current);
      if (isOver) {
        setTooltip(props.value);
        setSubTitleTooltip(row[`subTitle-${colDef.field}`]);
      } else {
        setTooltip('');
        setSubTitleTooltip('');
      }
    }
  }, [valueRef, props.value, innerWidth, row[`subTitle-${colDef.field}`]]);

  const hideEndActions = apiContext.current.getSelectedRows().size > 1 && apiContext.current.isRowSelected(row.id); // hide action button when there is a seleted row/s
  const isAlignRight = colDef.align === 'right';
  return (
    <Grid // parent grid of our custom cell
      tabIndex={props.tabIndex}
      onMouseEnter={handleOnActive}
      onMouseLeave={handleOnInactive}
      onFocus={handleOnActive}
      onKeyDown={(evt) => { return handleOnCellKeydown(evt); }}
      sx={(theme) => {
        return {
          ...theme.typography.body2,
          minHeight: '36px',
          fontColor: theme.palette.text.primary,
          outline: 'none',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          display: 'flex',
          '& .MuiCheckbox-root': {
            marginRight: '16px',
          },
          ...(row.disabled && {
            color: theme.palette.text.disabled,
            pointerEvents: 'none',
          }),
          svg: {
            height: '16px',
            width: '16px',
          },
        };
      }}
    >
      {colDef.iconStart && row[`iconStart-${colDef.field}`] && (
      <Grid sx={{ // this grid is for the container of icon before the value if the dev pass an iconStart as row data and iconStart is true in column definiton
        alignItems: 'center',
        display: 'flex',
        marginRight: '8px',
        ...(isAlignRight && {
          marginLeft: 'auto',
          marginRight: '0',
        }),
      }}
      >
        {row[`iconStart-${colDef.field}`]}
      </Grid>
      )}
      {colDef.avatar && row[`avatar-${colDef.field}`] && (
      <Grid sx={{ // this grid is for the container of avatar if the dev pass an avatar as row data and avatar is true in column definiton
        alignItems: 'center',
        display: 'flex',
        marginRight: '8px',
        ...(isAlignRight && {
          marginLeft: 'auto',
          marginRight: '0',
        }),
        '& .MuiAvatar-root': {
          height: '20px',
          width: '20px',
        },
      }}
      >
        {row[`avatar-${colDef.field}`]}
      </Grid>
      )}
      {props.value && (
      <Grid
        ref={valueRef}
        sx={{ // this grid is for the container of the value of the cell define in col def
          alignItems: 'normal',
          display: 'flex',
          flexDirection: 'column',
          marginRight: '8px',
          minWidth: '0',
          overflow: 'hidden',
          ...(isAlignRight && {
            marginLeft: `${colDef.iconStart || colDef.avatar ? '' : 'auto'}`,
            marginRight: '0',
            paddingLeft: '8px',
            paddingRight: '8px',
          }),
        }}
      >
        <Tooltip
          title={row[`tooltip-${colDef.field}`] || tooltip}
          tooltipsize="small"
          componentsProps={{
            tooltip: {
              sx: {
                unicodeBidi: (row[`override-bidi-tooltip-${colDef.field}`]) ? 'plaintext' : 'initial',
              },
            },
          }}
        >
          <Typography
            className="MuiDataGrid-cell--value"
            {...tooltip && {
              noWrap: true,
            }}
            variant="body2"
          >
            {props.value}
          </Typography>
        </Tooltip>
        {colDef.subTitle && row[`subTitle-${colDef.field}`] && (
          <Tooltip
            title={subTitleTooltip}
            tooltipsize="small"
            componentsProps={{
              tooltip: {
                sx: {
                  unicodeBidi: (row[`override-bidi-tooltip-${colDef.field}`]) ? 'plaintext' : 'initial',
                },
              },
            }}
          >
            <Typography
              className="MuiDataGrid-cell--subTitle"
              {...subTitleTooltip && {
                noWrap: true,
              }}
              variant="caption"
              color="text.secondary"
            >
              {row[`subTitle-${colDef.field}`]}
            </Typography>
          </Tooltip>
        )}
      </Grid>
      )}
      {colDef.iconEnd && row[`iconEnd-${colDef.field}`] && (
      <Grid sx={{ // this grid is for the container of icon after the value if the dev pass an iconEnd as row data and iconEnd is true in column definiton
        alignItems: 'center',
        display: 'flex',
        marginRight: '8px',
        ...(isAlignRight && {
          marginRight: '0',
        }),
      }}
      >
        {row[`iconEnd-${colDef.field}`]}
      </Grid>
      )}
      {colDef.endActions && row[`endActions-${colDef.field}`] && (
        <Grid // this grid is for the container of end action button at the end of the cell
          className={colDef.endActions ? 'MuiDataGrid-cell--withEndActions' : ''}
          aria-hidden={!(isActive && !row.disabled && colDef.endActions && !hideEndActions && row[`endActions-${colDef.field}`].length > 0)}
          sx={(theme) => {
            return {
              display: 'none',
              alignItems: 'center',
              background: 'transparent',
              ...(isAlignRight ? {
                marginRight: '0',
                ...(colDef.iconEnd && { paddingLeft: '12px' }),
              } : {
                marginLeft: 'auto',
                marginRight: '0',
              }),
              ...(isActive && !row.disabled
                && colDef.endActions && !hideEndActions && row[`endActions-${colDef.field}`].length > 0 && { // button are shown on mouse hover, cell/row focus, no selected row
                display: 'flex',
              }),
            };
          }}
        >
          {row[`endActions-${colDef.field}`] && row[`endActions-${colDef.field}`].map((elem: React.ReactElement, index: number) => {
            return (
              // eslint-why index is not the sole key definition, it is prefixed by other identifiers
              // eslint-disable-next-line react/no-array-index-key
              <Grid sx={{ marginLeft: '12px' }} key={`endActions-${row.id}-${colDef.field}-${index}`}>{elem}</Grid>// grid container button this is to margin to the buttons
            );
          })}
        </Grid>
      )}
    </Grid>
  );
};

DataGridCell.defaultProps = {
  showSortingIcon: false,
};

export default DataGridCell;
