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
import MuiFormControl, { FormControlProps as MuiFormControlProps } from '@mui/material/FormControl';
import MuiTextField, { OutlinedTextFieldProps as MuiOutlinedTextFieldProps } from '@mui/material/TextField';
import MuiFormHelperText from '@mui/material/FormHelperText';
import WarningIcon from '@hcl-software/enchanted-icons/dist/carbon/es/warning';
import {
  Components, Theme, InputAdornment,
  SvgIconProps,
} from '@mui/material';
import { unstable_useId as useId } from '@mui/utils';

import { styled } from '@mui/material/styles';
import Typography from '../Typography';
import InputLabelAndAction, { InputLabelAndActionProps, ActionProps } from '../prerequisite_components/InputLabelAndAction/InputLabelAndAction';

/**
 * @typedef OutlinedTextFieldProps
 * @type {object}
 * @property {any} value
 */
export type OutlinedTextFieldProps = MuiOutlinedTextFieldProps & {
  // eslint-why - React18 brings stricter typechecking and MUI is not all updated there yet, so we override for now
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
}

export interface TextFieldProps extends Omit<OutlinedTextFieldProps, 'variant'> {
  nonEdit?: boolean;
  actionProps?: ActionProps[];
  helperText?: string;
  enableHelpHoverEffect?: boolean;
  helperIconTooltip?: string;
  margin?: 'none' | 'dense';
  color?: 'primary';
  size?: 'medium';
  unitLabel?: string;
  endAdornmentAction?: React.ReactNode;
  renderNonEditInput?: () => React.ReactNode;
  endAdornmentIconButton?: React.ReactNode;
  customIcon?: React.ComponentType<SvgIconProps> | undefined;
}

export const getMuiTextFieldThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiTextField: {
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          return {
            // below MuiTextField override only applicable for Autocomplete to make sure Autocomplete is parent component
            '.MuiAutocomplete-inputRoot': {
              position: 'relative',
              ...ownerState.error ? {
                '&.MuiOutlinedInput-root:focus-within': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: `2px solid ${theme.palette.error.main}`,
                  },
                },
                '&.MuiOutlinedInput-root:hover': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: `${theme.palette.error.main}`,
                  },
                },
              } : {
                '& .MuiInputBase-root:hover': {
                  outline: `1px solid ${theme.palette.border.primary}`,
                },
                '&.MuiOutlinedInput-root:focus-within': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: `2px solid ${theme.palette.primary.main}`,
                  },
                },
              },
              '&.MuiOutlinedInput-root': {
                paddingRight: ownerState.disabled ? '8px' : '16px',
              },
              '& .MuiAutocomplete-input': {
                // Reserve a stable right-side area so selected text does not shift when icons toggle.
                paddingRight: 'var(--erc-autocomplete-end-adornment-width, 56px) !important',
              },
              '& [class*=MuiInputAdornment-positionEnd]': {
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: 'calc(var(--erc-autocomplete-end-adornment-width, 56px) - 8px)',
                marginLeft: '0px',
                justifyContent: 'flex-end',
              },
              '& .MuiAutocomplete-endAdornment': {
                position: 'static',
                transform: 'none',
                display: 'inline-flex',
                alignItems: 'center',
              },
              '& .MuiAutocomplete-endAdornment .MuiButtonBase-root': {
                position: 'static',
                transform: 'none',
              },
            },
            '.MuiOutlinedInput-root': {
              '&:not(.Mui-disabled)': {
                background: theme.palette.common.white,
              },
              ...ownerState.error ? {
                '&.MuiOutlinedInput-root:focus-within': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: `2px solid ${theme.palette.error.main}`,
                  },
                },
                '&.MuiOutlinedInput-root:hover': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: `${theme.palette.error.main}`,
                  },
                },
              } : {
                '& .MuiInputBase-root:hover': {
                  outline: `1px solid ${theme.palette.border.primary}`,
                },
                '&.MuiOutlinedInput-root:focus-within': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: ownerState.disabled ? `${theme.palette.error.main}` : `2px solid ${theme.palette.primary.main}`,
                  },
                },
              },
            },
            // below MuiTextField override only applicable for DatePicker to make sure DatePicker is parent component
            '[data-mui-test=calendarIcon] + .MuiTouchRipple-root': {
              color: 'transparent',
            },
          };
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        contained: ({ theme }) => {
          return {
            ...theme.typography.caption,
            color: theme.palette.text.secondary,
            marginTop: '4px',
            cursor: 'default',
            marginLeft: '0px',
            marginRight: '0px',
            textAlign: 'left',
          };
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            borderRadius: '2px',
            width: '100%',
            margin: '0px',
            padding: '5px 8px',
            input: {
              ...theme.typography.body2,
              color: theme.palette.text.primary,
              padding: '0px',
              height: '1.5em',
              '&::placeholder': {
                fontStyle: 'italic',
                color: theme.palette.text.secondary,
                opacity: 9,
              },
            },
            textarea: {
              ...theme.typography.body2,
              color: theme.palette.text.primary,
              paddingTop: '1px',
              paddingBottom: '1px',
              '&::placeholder': {
                fontStyle: 'italic',
                color: theme.palette.text.secondary,
                opacity: 9,
              },
            },
            '&.MuiInputBase-fullWidth': {
              width: '100%',
            },
            '&.Mui-disabled': {
              backgroundColor: theme.palette.action.disabledBackground,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.action.disabledBackground,
              },
              ':hover': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.action.disabledBackground,
                },
              },
              '& [class*=MuiInputAdornment-positionEnd]': {
                '& [class*=MuiTypography-body2]': {
                  color: theme.palette.text.disabled,
                  cursor: 'default',
                },
                '& button': {
                  pointerEvents: 'none',
                  cursor: 'default',
                  '& svg': {
                    color: theme.palette.text.disabled,
                  },
                },
              },
            },
            '& .MuiOutlinedInput-notchedOutline': {
              top: '0px',
              borderColor: theme.palette.border.tertiary,
              borderRadius: '2px',
              '& legend': {
                display: 'none',
              },
            },
            '&.Mui-error': {
              ':hover': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.error.main,
                },
              },
              '&.Mui-focused': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.error.main,
                },
              },
            },
            ':hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.action.active,
              },
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.action.focus,
              },
            },
            '& [class*=MuiButtonBase-root]': {
              padding: '0px',
              minWidth: 'unset',
            },
            '& [class*=MuiInputAdornment-root]': {
              margin: '0px',
            },
            '& [class*=MuiInputAdornment-positionStart]': {
              marginRight: '8px',
              height: '18px',
              '& svg:not(.MuiCircularProgress-svg)': {
                margin: '0px 0px 0px 4px',
                padding: '0px',
                fontSize: '16px',
              },
              '& [class*=MuiTypography-body2]': {
                margin: '0px 0px 0px 8px',
                cursor: 'default',
              },
            },
            '& [class*=MuiInputAdornment-positionEnd]': {
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '8px',
              flexShrink: 0,
              marginLeft: '8px',
              height: '18px',
              '& svg:not(.MuiCircularProgress-svg)': {
                margin: '0px',
                padding: '0px',
                fontSize: '16px',
              },
              '& [class*=MuiTypography-body2]': {
                margin: '0px 0px 0px 8px',
                cursor: 'default',
              },
              '& button': {
                minWidth: '0px',
                margin: '0px',
                padding: '0px',
                '& svg': {
                  margin: '0px',
                  height: '16px',
                  width: '16px',
                },
              },
            },
          };
        },
      },
    },
  };
};

const StyledMuiFormControl = styled(MuiFormControl)((theme) => {
  return {
    '.MuiAutocomplete--label--focused': {
      color: theme.theme.palette.primary.main,
    },
  };
});

const getStartAdornment = (props: TextFieldProps, isComboBox: boolean) => {
  if (props.InputProps?.startAdornment) {
    // For comboBox (Autocomplete), startAdornment may contain chips from MUI's
    // multiple mode or custom icons already wrapped by Autocomplete.
    // Pass through as-is to avoid double-wrapping in InputAdornment which
    // constrains chips to fixed height and breaks chip layout.
    return props.InputProps.startAdornment;
  }
  return null;
};

const flattenAdornmentNodes = (node: React.ReactNode): React.ReactNode[] => {
  if (node === null || node === undefined || typeof node === 'boolean') {
    return [];
  }

  if (Array.isArray(node)) {
    return node.reduce<React.ReactNode[]>((accumulator, child) => {
      return accumulator.concat(flattenAdornmentNodes(child));
    }, []);
  }

  if (React.isValidElement(node)) {
    const elementProps = node.props as { hidden?: boolean; children?: React.ReactNode };
    if (elementProps.hidden) {
      return [];
    }
    if (node.type === React.Fragment) {
      return flattenAdornmentNodes(elementProps.children);
    }
  }

  return [node];
};

const getEndAdornment = (props: TextFieldProps, isComboBox: boolean) => {
  // This is workaround until proper Search component has already been implemented
  // This hides the endAdornment when startAdornment is present and it's a simple Textfield (NOT affecting Autocomplete / Multiselect)
  if (props.InputProps?.startAdornment !== undefined && !isComboBox) {
    return null;
  }

  // end of comment
  // dito ata need ayusin yung mga element
  let trailingAdornmentItems: React.ReactNode[] = [];
  const endAdornmentActionButton = React.isValidElement(props.endAdornmentIconButton) ? props.endAdornmentIconButton : null;

  if (props.InputProps) {
    const defaultAdornment = props.InputProps!.endAdornment;

    const childrenArr = React.isValidElement(defaultAdornment) ? React.Children.toArray(defaultAdornment.props.children) : [];
    console.log('defaultAdornment:', defaultAdornment, 'childrenArr:', childrenArr);

    // 1. Safely convert children to an array
    const childrenArray = React.isValidElement(defaultAdornment)
      ? React.Children.toArray(defaultAdornment.props.children)
      : [];

    // 2. Identify the buttons by their class names (Safely checking if they exist)
    const clearButton = childrenArray.find(
      (child) => {
        return React.isValidElement(child) && child.props.className?.includes('MuiAutocomplete-clearIndicator');
      },
    );

    // 3. Identify the buttons by their class names (Safely checking if they exist)
    const popupButton = childrenArray.find(
      (child) => {
        return React.isValidElement(child) && child.props.className?.includes('MuiAutocomplete-popupIndicator');
      },
    );

    // 3. You can customize the positioning of the icons here. For example, you can always place the warning icon in the middle of the end adornment.
    const customIcon = [
      // Clear Icon Segment, Mui Autocomplete Clear Icon
      clearButton,
      // Loading, Information Icon Segment
      defaultAdornment,
      // Caret Down Icon Segment, Mui Autocomplete Popup Icon
      popupButton,
      // // Last Icon Segment, IconButton
      // endAdornmentActionButton,
    ].filter((item) => { return item !== undefined || item !== null; }); // Filter out undefined items

    console.log('customIcon: ', customIcon);
    let customIconAlignment = defaultAdornment || customIcon;

    if (React.isValidElement(defaultAdornment)) {
      customIconAlignment = React.cloneElement(
        defaultAdornment,
        {}, // No prop changes
        customIcon,
      );
    }

   trailingAdornmentItems = flattenAdornmentNodes(customIconAlignment);
  }

  // if the component is a comboBox (Autocomplete), endAdornment may contain chips from MUI's
  return (
    <>
      {props.error ? <WarningIcon color="error" /> : null }
      {props.unitLabel ? <Typography variant="body2">{props.unitLabel}</Typography> : null }
      {isComboBox && React.Children.toArray(trailingAdornmentItems)}
      {/* {React.Children.toArray(trailingAdornmentItems)} */}
      {endAdornmentActionButton ? endAdornmentActionButton : null}
    </>
  );
};

const getInputLabelAndActionProps = (props: TextFieldProps, isFocus: boolean): InputLabelAndActionProps => {
  const inputLabelId = props.id ? `${props.id}-label` : undefined;
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
    isFocus,
    enableHelpHoverEffect: props.enableHelpHoverEffect,
    customIcon: props.customIcon,
  };
  return inputLabelProps;
};

const getMuiFormControlProps = (props: TextFieldProps, forwardRef: React.ForwardedRef<unknown>): MuiFormControlProps => {
  const muiFormControlProps: MuiFormControlProps = {
    color: props.color,
    disabled: props.disabled,
    error: props.error,
    focused: props.focused,
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

const getMuiTextFieldProps = (props: TextFieldProps): OutlinedTextFieldProps => {
  const isComboBox = Boolean(props.InputProps?.className?.startsWith('MuiAutocomplete'));
  const cleanedProps = { ...props };
  delete cleanedProps.actionProps;
  delete cleanedProps.nonEdit;
  delete cleanedProps.unitLabel;
  delete cleanedProps.helperIconTooltip;
  delete cleanedProps.renderNonEditInput;
  delete cleanedProps.endAdornmentAction;
  delete cleanedProps.enableHelpHoverEffect;
  delete cleanedProps.customIcon;

  // Check also here
  const muiTextFieldProps: OutlinedTextFieldProps = {
    ...cleanedProps,
    variant: 'outlined',
    label: undefined, // The label will be separately handled and not via the MuiTextField
    InputProps: {
      ...props.InputProps, // since we checking the class name for Inputpros and making sure that upper component is autocomplete
      startAdornment: getStartAdornment(props, isComboBox),
      endAdornment: props.InputProps?.endAdornment && !isComboBox
        ? props.InputProps?.endAdornment
        : <InputAdornment position="end">{getEndAdornment(props, isComboBox)}</InputAdornment>,
    },
  };
  return muiTextFieldProps;
};

const renderNonEditInput = (props: TextFieldProps, muiTextFieldProps: OutlinedTextFieldProps) => {
  if (props.renderNonEditInput) {
    return props.renderNonEditInput();
  }
  return <Typography variant="body2">{muiTextFieldProps.value ? muiTextFieldProps.value : null}</Typography>;
};

const renderInput = (props: TextFieldProps, setIsFocus: React.Dispatch<React.SetStateAction<boolean>>) => {
  const muiTextFieldProps = getMuiTextFieldProps(props);
  const helperTextId = props.helperText && props.id ? `${props.id}-helper-text` : undefined;
  if (props.nonEdit) {
    return (
      <>
        {renderNonEditInput(props, muiTextFieldProps)}
        <MuiFormHelperText id={helperTextId}>{muiTextFieldProps.helperText}</MuiFormHelperText>
      </>
    );
  }
  return (
    <MuiTextField
      {...muiTextFieldProps}
      onFocus={() => {
        setIsFocus(true);
      }}
      onBlur={() => {
        setIsFocus(false);
      }}
    />
  );
};

const TextField = React.forwardRef(({ ...props }: TextFieldProps, forwardRef: React.ForwardedRef<unknown>) => {
  const [isFocus, setIsFocus] = React.useState(false);
  if (!props.id) {
    const id = useId();
    props.id = id;
  } else {
    props.id = `${useId()}${props.id}`;
  }
  const muiInputLabelProps = getInputLabelAndActionProps(props, isFocus);
  const muiFormControlProps = getMuiFormControlProps(props, forwardRef);

  // dito check
  return (
    <StyledMuiFormControl {...muiFormControlProps}>
      <InputLabelAndAction {...muiInputLabelProps} />
      {renderInput(props, setIsFocus)}
    </StyledMuiFormControl>
  );
}) as React.FC<TextFieldProps>;

TextField.defaultProps = {
  margin: 'none',
  color: 'primary',
  size: 'medium',
  label: '',
  helperText: '',
  helperIconTooltip: '',
  placeholder: '',
  unitLabel: '',
  required: false,
  disabled: false,
  error: false,
  fullWidth: false,
  multiline: false,
  focused: false,
  autoFocus: false,
  hiddenLabel: false,
  nonEdit: false,
};

export default TextField;
