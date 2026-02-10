/* ======================================================================== *
 * Copyright 2026 HCL America Inc.                                          *
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
import MuiSelect, { SelectProps as MuiSelectProps } from '@mui/material/Select';
import MuiFormControl, { FormControlProps as MuiFormControlProps } from '@mui/material/FormControl';
import MuiFormHelperText from '@mui/material/FormHelperText';
import useId from '@mui/material/utils/useId';
import WarningIcon from '@hcl-software/enchanted-icons/dist/carbon/es/warning';
import CaretDownIcon from '@hcl-software/enchanted-icons/dist/carbon/es/caret--down';
import {
  Components, Theme, InputAdornment as MuiInputAdornment, styled,
  SvgIconProps,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Typography from '../Typography';
import InputLabelAndAction, { ActionProps, InputLabelAndActionProps } from '../prerequisite_components/InputLabelAndAction';
import { ThemeDirectionType } from '../theme';

export interface SelectProps extends MuiSelectProps {
  nonEdit?: boolean;
  actionProps?: ActionProps[];
  helperText?: string;
  enableHelpHoverEffect?: boolean;
  helperIconTooltip?: string;
  margin?: 'none' | 'dense';
  color?: 'primary';
  size?: 'medium';
  unitLabel?: string,
  options?: { label: string }[];
  hiddenLabel?: boolean,
  value?: string,
  customIcon?: React.ComponentType<SvgIconProps> | undefined;
}

export const getMuiSelectThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiSelect: {
      styleOverrides: {
        outlined: ({ theme }) => {
          return {
            ...theme.typography.body2,
            color: theme.palette.text.primary,
            padding: '0px',
            height: '20px',
            marginTop: '2px',
            marginBottom: '-4px',
            '& em': {
              fontStyle: 'italic',
              color: theme.palette.text.secondary,
            },
          };
        },
        select: ({ theme }) => {
          return {
            paddingRight: '0px !important',
            '& .MuiListItemText-root': {
              marginTop: '0px',
              '& .MuiTypography-root': {
                ...theme.typography.body2,
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              },
            },
          };
        },
        iconOutlined: ({ theme }) => {
          return {
            width: '16px',
            height: '16px',
            top: 'calc(50% - 8px)',
          };
        },
        icon: ({ theme }) => {
          return {
            right: '8px',
          };
        },
      },
    },
  };
};

const getEndAdornment = (props: SelectProps) => {
  return (
    <>
      {props.error ? <WarningIcon color="error" /> : null }
      {props.unitLabel ? <Typography variant="body2" style={{ cursor: (props.disabled || props.readOnly) ? 'default' : 'pointer' }}>{props.unitLabel}</Typography> : null }
      &nbsp;
    </>
  );
};

const InputAdornment = styled(MuiInputAdornment)(({ theme }) => {
  return {
    position: 'relative',
    paddingRight: '20px',
    paddingLeft: '4px',
  };
});

const getMuiSelectProps = (props: SelectProps): MuiSelectProps => {
  const cleanedProps = { ...props };
  cleanedProps.id += '-select';
  delete cleanedProps.actionProps;
  delete cleanedProps.nonEdit;
  delete cleanedProps.unitLabel;
  delete cleanedProps.helperIconTooltip;
  delete cleanedProps.helperText;
  delete cleanedProps.hiddenLabel;
  delete cleanedProps.enableHelpHoverEffect;

  const handleMouseDown = ((event: React.MouseEvent<HTMLElement>) => {
    if (props.disabled || props.readOnly) {
      return;
    }

    // This is workaround solution to catch the mousedown on the InputAdornment section
    // and to simulate a mousedown event on the select section to open the menu component
    // Try to get the sibling node with this id (just in case somebody has accidentally used the same id elsewhere)
    const parent = (event.target as HTMLElement).parentElement;
    const element = parent?.querySelector(`:scope [id='${props.id}-select']`);
    if (element) {
      event.preventDefault();
      const elementPosition = element.getBoundingClientRect();
      // eslint-why - The default type MouseEvent is not defined, it is a browser native class
      // eslint-disable-next-line no-undef
      const elementEvent = new MouseEvent('mousedown', {
        view: window,
        bubbles: true,
        cancelable: true,
        screenX: elementPosition.left,
        screenY: elementPosition.top,
      });
      element.dispatchEvent(elementEvent);
    }
  });

  const muiTextFieldProps: MuiSelectProps = {
    ...cleanedProps,
    label: undefined, // The label will be separately handled and not via the MuiSelect
    endAdornment: <InputAdornment position="end" onMouseDown={handleMouseDown} style={{ cursor: (props.disabled || props.readOnly) ? 'default' : 'pointer' }}>{getEndAdornment(props)}</InputAdornment>,
    IconComponent: CaretDownIcon,
  };
  return muiTextFieldProps;
};

const getMuiFormControlProps = (props: SelectProps, forwardRef: React.ForwardedRef<unknown>): MuiFormControlProps => {
  const muiFormControlProps: MuiFormControlProps = {
    color: props.color,
    disabled: props.disabled,
    error: props.error,
    fullWidth: props.fullWidth,
    hiddenLabel: props.hiddenLabel,
    margin: props.margin,
    required: props.required,
    size: props.size,
    sx: props.sx,
    ref: forwardRef as ((instance: HTMLDivElement | null) => void),
  };
  return muiFormControlProps;
};

const renderInput = (props: SelectProps, id?: string) => {
  if (props.nonEdit) {
    return <Typography variant="body2">{props.value ? props.value : null}</Typography>;
  }
  const selectProps = getMuiSelectProps(props);
  const theme = useTheme();

  // Short workaround to get the right alignment of the Select Menu component Paper.
  // A normal styling via the overrides are not possible.
  // Due to the fact that those stylings will also affecting the normal Paper,
  // therefore we have only to override the Paper for the Select Menu component.
  // Also we have to support the option that some stylings will handover via the MenuProps?.PaperProps?.style.
  const defaultStyle = {
    width: props.fullWidth ? '100%' : '240px',
    // eslint-why - using nested ternary to reduce unnecessary code blocks
    // eslint-disable-next-line no-nested-ternary
    marginLeft: props.fullWidth ? '0px' : (theme.direction === ThemeDirectionType.RTL ? '8px' : '-8px'),
    marginTop: '21px',
    padding: '0',
  };
  const paperPropsStyle = selectProps.MenuProps?.PaperProps?.style ? selectProps.MenuProps?.PaperProps?.style : defaultStyle;
  if (!paperPropsStyle.width) {
    paperPropsStyle.width = defaultStyle.width;
  }
  if (!paperPropsStyle.marginLeft) {
    paperPropsStyle.marginLeft = defaultStyle.marginLeft;
  }
  if (!paperPropsStyle.marginTop) {
    paperPropsStyle.marginTop = defaultStyle.marginTop;
  }

  return (
    <MuiSelect
      {...selectProps}
      aria-label={typeof props.label === 'string' ? props.label : props.placeholder}
      labelId={`${props.id}-label`}
      inputProps={{ id: props.id }}
      MenuProps={{
        ...selectProps.MenuProps,
        transformOrigin: { vertical: 'top', horizontal: theme.direction === ThemeDirectionType.RTL ? 'right' : 'left' },
        anchorOrigin: { vertical: 'top', horizontal: theme.direction === ThemeDirectionType.RTL ? 'right' : 'left' },
        PaperProps: {
          style: paperPropsStyle,
          elevation: 2,
          ref: (node) => {
            if (node && props.fullWidth && props.id) {
              // Dynamically set the Paper width to match the Select input width
              const selectElement = document.getElementById(props.id)?.parentElement;
              if (selectElement) {
                node.style.width = `${selectElement.clientWidth}px`;
                // Check if the select element or its parent takes up the full width of the page
                const isFullPage = window.innerWidth === document.body.clientWidth;
                if (!isFullPage) {
                  // Apply -8px marginLeft adjustment in fullWidth mode when the input box is not in full page
                  node.style.marginLeft = '-8px';
                }
              }
            }
          },
        },
      }}
    />
  );
};

const getInputLabelAndActionProps = (props : SelectProps): InputLabelAndActionProps => {
  const inputLabelId = `${props.id}-label`;
  const inputLabelProps: InputLabelAndActionProps = {
    color: props.color,
    disabled: props.disabled,
    error: props.error,
    required: props.required,
    sx: props.sx,
    htmlFor: props.id,
    id: inputLabelId,
    label: props.label,
    helperIconTooltip: props.helperIconTooltip,
    actionProps: props.actionProps,
    hiddenLabel: props.hiddenLabel,
    fullWidth: props.fullWidth,
    enableHelpHoverEffect: props.enableHelpHoverEffect,
    customIcon: props.customIcon,
  };
  return inputLabelProps;
};

const Select = React.forwardRef(({ ...props }: SelectProps, forwardRef: React.ForwardedRef<unknown>) => {
  if (!props.id) {
    const id = useId();
    props.id = id;
  }
  const muiFormControlProps = getMuiFormControlProps(props, forwardRef);
  const inputLabelAndActionProps = getInputLabelAndActionProps(props);
  const helperTextId = props.helperText && props.id ? `${props.id}-helper-text` : undefined;
  return (
    <MuiFormControl {...muiFormControlProps}>
      <InputLabelAndAction {...inputLabelAndActionProps} />
      {renderInput(props, props.id)}
      {props.helperText && (<MuiFormHelperText id={helperTextId}>{props.helperText}</MuiFormHelperText>)}
    </MuiFormControl>
  );
}) as React.FC<SelectProps>;

Select.defaultProps = {
  margin: 'none',
  color: 'primary',
  size: 'medium',
  label: '',
  helperText: '',
  enableHelpHoverEffect: false,
  helperIconTooltip: '',
  placeholder: '',
  unitLabel: '',
  required: false,
  disabled: false,
  error: false,
  fullWidth: false,
  autoFocus: false,
  hiddenLabel: false,
  nonEdit: false,
  sx: { minWidth: '240px' },
};

export * from '@mui/material/Select';
export default Select;
