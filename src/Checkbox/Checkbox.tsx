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
import MuiCheckbox, { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox';
import { Components, Theme } from '@mui/material';

export enum CheckboxVariants {
  WITHOUT_PADDING = 'without padding',
  WITH_PADDING = 'with padding',
}

/**
 * Override out of the box styling from mui to align with designer theme
 * @returns override Checkbox component styles and prop
 */
export const getMuiCheckboxThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiCheckbox: {
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          return ({
            ...ownerState.variant === CheckboxVariants.WITH_PADDING && {
              padding: '4px',
              marginRight: '4px', // this is the space between the checkbox and the typography next to it
              marginTop: '4px', // this is the padding so that the checkbox moves down a bit so the hover effect does not overflow into parent container (use case)
              marginLeft: '4px', // this is the padding so that the checkbox moves right a bit so the hover effect does not overflow into parent container (use case)
              ' + .MuiTypography-root': {
                maxHeight: '30px',
                marginTop: '4px', // to match the added padding of the checkbox - based on redlines on how the label beside a checkbox should behave
                marginRight: '16px', // based on redlines on how the label beside a checkbox should behave
                '& .MuiTypography-body2': {
                  color: theme.palette.text.primary,
                },
                '& .MuiTypography-caption': {
                  color: theme.palette.text.secondary,
                },
                '&.Mui-disabled': {
                  '& .MuiTypography-body2': {
                    color: theme.palette.text.disabled,
                  },
                  '& .MuiTypography-caption': {
                    color: theme.palette.text.disabled,
                  },
                },
              },
              '&.Mui-focusVisible': {
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: '3px',
                width: '18px',
                height: '18px',
                margin: '8px',
                marginRight: '8px',
                ' + .MuiTypography-root': {
                  marginTop: 0,
                },
                '&:hover': {
                  borderRadius: '3px',
                },
                input: {
                  '&:focus': {
                    outline: 'none',
                  },
                },
              },
            },
            ...ownerState.variant === CheckboxVariants.WITHOUT_PADDING && {
              padding: '4px',
              marginRight: '4px', // this is the space between the checkbox and the typography next to it
              ' + .MuiTypography-root': {
                maxHeight: '30px',
                '& .MuiTypography-body2': {
                  color: theme.palette.text.primary,
                },
                '& .MuiTypography-caption': {
                  color: theme.palette.text.secondary,
                },
                '&.Mui-disabled': {
                  '& .MuiTypography-body2': {
                    color: theme.palette.text.disabled,
                  },
                  '& .MuiTypography-caption': {
                    color: theme.palette.text.disabled,
                  },
                },
              },
              '&.Mui-focusVisible': {
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: '3px',
                width: '18px',
                height: '18px',
                margin: '4px',
                marginRight: '8px',
                '&:hover': {
                  borderRadius: '3px',
                },
                input: {
                  '&:focus': {
                    outline: 'none',
                  },
                },
              },
            },
            border: 'transparent 1px solid',
            '&.MuiButtonBase-root:hover': {
              backgroundColor: theme.palette.action.hover,
              borderRadius: '2px',
            },
            '.MuiSvgIcon-root': {
              height: '16px',
              width: '16px',
            },
          });
        },
      },
    },
  };
};

/**
 * @typedef CheckboxProps
 * @type {object}
 * @property {CheckboxVariants} variant - Adds padding around icon svg
 */
export type CheckboxProps = MuiCheckboxProps & {
  variant?: CheckboxVariants,
}

const Checkbox = React.forwardRef((props: CheckboxProps, ref: React.Ref<HTMLButtonElement>) => {
  return <MuiCheckbox ref={ref} {...props} />;
}) as React.FC<CheckboxProps>;

Checkbox.defaultProps = {
  variant: CheckboxVariants.WITHOUT_PADDING,
  indeterminate: false,
  disabled: false,
  disableRipple: true,
};

export default Checkbox;
