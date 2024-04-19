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

import * as React from 'react';
import { Theme, SxProps } from '@mui/material';
import ClearFilledIcon from '@hcl-software/enchanted-icons/dist/carbon/es/close--filled';

import Autocomplete, { AutocompleteProps } from '../../Autocomplete';
import { white } from '../../colors';

/**
 * Props that will be used for MultipleSelectChip its extension of SelectProps
 *
 * @interface MultipleSelectChipProps
 */
// eslint-why need to extend AutocompleteProps
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface MultipleSelectChipProps<T, Multiple, DisableClearable, FreeSolo> extends AutocompleteProps<T, boolean, boolean, boolean> {
  emptyOptions?: boolean;
}

const MultipleSelectChip = <T, Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined, FreeSolo extends boolean | undefined = undefined>
  ({ ...props }: MultipleSelectChipProps<T, Multiple, DisableClearable, FreeSolo>) => {
  const { emptyOptions, ...rest } = props;
  const getMuiInputBasePaddingRight = () => {
    if (props.error && !props.emptyOptions) {
      return '82px !important';
    }
    if (!props.error && !props.emptyOptions) {
      return '56px !important';
    }
    if (props.error && props.emptyOptions) {
      return '60px !important';
    }
    return '40px !important';
  };

  const sxDefaultProps: SxProps<Theme> = {
    '& .MuiInputBase-root': {
      height: '100% !important',
      paddingRight: getMuiInputBasePaddingRight(),
      '& input': {
        minWidth: '70px !important',
        paddingLeft: '2px !important',
        paddingTop: '6px !important',
        paddingBottom: '6px !important',
      },
    },
    '& .MuiInputBase-root.Mui-disabled': {
      backgroundColor: white.WHITE100P,
    },
    '& .MuiOutlinedInput-root': {
      width: props.fullWidth ? '100%' : '500px',
      paddingLeft: '7px !important',
    },
    '& .MuiFormControl-root': {
      width: props.fullWidth ? '100%' : '500px',
      display: 'block',
    },
    '& .MuiChip-root': {
      padding: '0px 4px !important',
      margin: '2px',
      maxWidth: 'calc(100% - 6px)',
      border: 0,
    },
  };
  const sxProps: SxProps<Theme> = {
    ...sxDefaultProps,
    ...rest.sx,
  };

  return (
    <Autocomplete
      {...rest}
      freeSolo={emptyOptions}
      options={emptyOptions ? [] : rest.options}
      sx={sxProps}
      multiple
      clearIcon={<ClearFilledIcon color="action" />}
    />
  );
};

MultipleSelectChip.defaultProps = {
  emptyOptions: false,
};

export default MultipleSelectChip;
