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
import MuiAutocomplete, { AutocompleteInputChangeReason, AutocompleteProps as MuiAutocompleteProps } from '@mui/material/Autocomplete';
import { Components, SvgIconProps, Theme } from '@mui/material';
import CaretDownIcon from '@hcl-software/enchanted-icons/dist/carbon/es/caret--down';
import ClearIcon from '@hcl-software/enchanted-icons/dist/carbon/es/close';
import MuiFormHelperText from '@mui/material/FormHelperText';
import MuiFormControl, { FormControlProps as MuiFormControlProps } from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';
import { TYPOGRAPHY } from '../theme';
import InputLabelAndAction, { InputLabelAndActionProps, ActionProps } from '../prerequisite_components/InputLabelAndAction/InputLabelAndAction';
import TextField, { TextFieldProps } from '../TextField/TextField';
import Tooltip, { TooltipPlacement } from '../Tooltip';

/**
 * @typedef AutocompleteProps
 * @type {object}
 * @property {boolean} error - Indicates the combobox value is invalid
 */
// eslint-why: need to extend autocomplete props
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> extends Omit<MuiAutocompleteProps<T, boolean, boolean, boolean>, 'renderInput'> {
  error?: boolean | 0 | 1;
  actionProps?: ActionProps[];
  nonEdit?: boolean;
  helperText?: string;
  enableHelpHoverEffect?: boolean;
  helperIconTooltip?: string;
  tooltipPlacement?: TooltipPlacement;
  label?: string;
  required?: boolean;
  focused?: boolean;
  hiddenLabel?: boolean;
  size?: 'medium';
  autoFocus?: boolean;
  clearIcon?: React.ReactNode;
  endAdornmentAction?: React.ReactNode;
  renderNonEditInput?: () => React.ReactNode;
  placeholder?: string;
  customIcon?: React.ComponentType<SvgIconProps> | undefined;
}

const getMuiFormControlProps = <T, Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined, FreeSolo extends boolean | undefined = undefined>
  ({ ...props }: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>): MuiFormControlProps => {
  const muiFormControlProps: MuiFormControlProps = {
    disabled: props.disabled,
    error: Boolean(props.error),
    fullWidth: props.fullWidth,
    hiddenLabel: props.hiddenLabel,
    required: props.required,
    size: props.size,
  };
  return muiFormControlProps;
};

const AutoCompleteContainer = styled('div')((theme) => {
  return {
    '.MuiAutocomplete--label--focused': {
      color: theme.theme.palette.primary.main,
    },
  };
});

const getInputLabelAndActionProps = <T, Multiple extends boolean | undefined = undefined,
DisableClearable extends boolean | undefined = undefined, FreeSolo extends boolean | undefined = undefined>
  (props : AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>, isFocus: boolean): InputLabelAndActionProps => {
  const inputLabelId = props.label && props.id ? `${props.id}-label` : undefined;
  const inputLabelProps: InputLabelAndActionProps = {
    disabled: props.disabled,
    error: Boolean(props.error),
    required: props.required,
    sx: props.sx,
    htmlFor: props.id,
    id: inputLabelId,
    label: props.label,
    helperIconTooltip: props.helperIconTooltip,
    tooltipPlacement: props.tooltipPlacement,
    actionProps: props.actionProps,
    hiddenLabel: props.hiddenLabel,
    isFocus,
    fullWidth: props.fullWidth,
    enableHelpHoverEffect: props.enableHelpHoverEffect,
    customIcon: props.customIcon,
  };
  return inputLabelProps;
};

const Autocomplete = <T, Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined, FreeSolo extends boolean | undefined = undefined>
  ({ ...props }: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) => {
  const {
    helperText,
    helperIconTooltip,
    actionProps,
    focused,
    hiddenLabel,
    nonEdit,
    enableHelpHoverEffect,
    renderNonEditInput,
    endAdornmentAction,
    ...rest // clean up rest of props for MuiAutocomplete tag
  } = props;

  // prevents DOM warning for error=boolean
  rest.error = rest.error ? 1 : 0;

  // create a unique id for the autocomplete component if not provided
  props.id ||= `autocomplete-${(React.createRef().current as HTMLElement)?.id || Math.random().toString(36).substring(7)}`;

  const [isFocus, setIsFocus] = React.useState(false);
  const helperTextId = props.helperText ? `${props.id}-helper-text` : undefined;
  const muiFormControlProps = getMuiFormControlProps(props);
  const inputLabelAndActionProps = getInputLabelAndActionProps(props, isFocus);
  const textfieldRef = React.useRef<HTMLInputElement>(null);
  const [isValueOverFlowing, setIsValueOverFlowing] = React.useState(false);
  const [prevValue, setPrevValue] = React.useState('');
  const [selectedOption, setSelectedOption] = React.useState<T | null>();

  React.useEffect(() => {
    const textFieldElement = textfieldRef.current;
    if (textFieldElement && textFieldElement.scrollWidth > textFieldElement.clientWidth) {
      setIsValueOverFlowing(true);
    } else {
      setIsValueOverFlowing(false);
    }
  }, [props.value, prevValue]);

  const getAdornmentWidth = React.useCallback(() => {
    let iconCount = 0;
    const parentWidth = textfieldRef.current?.parentElement?.offsetWidth || 0;

    // show three icon
    if (props.disabled) { // two icon show either error or caret
      iconCount += props.freeSolo ? 0 : 1;
    } else {
      // freeSolo is false - two icon show either error or caret and clear icon
      // disableClearable is true - one icon show caret down icon only
      // eslint-why - a nested ternary is needed
      // eslint-disable-next-line no-nested-ternary
      iconCount += !props.freeSolo ? (props.disableClearable ? 1 : 2) : 1;
    }

    if (props.error) {
      iconCount += 1;
    }

    // Calculate the total width needed for the input adornment area based on the number of icons.
    // Each icon is assumed to be 21px wide. If the parent width is very small (<= 150px), subtract 5px for tighter spacing.
    const iconWidth = ((iconCount) * 21 - (parentWidth <= 150 ? 5 : 0));

    return Math.max(iconWidth, 0);
  }, [props.error, props.freeSolo, props.disabled, textfieldRef]);

  const handleChange = (event: React.SyntheticEvent<Element, Event>, value: T | NonNullable<string | T> | (string | T)[] | null) => {
    // Value can be an option from the list or null if cleared
    setSelectedOption(value as T | null);
    if (textfieldRef.current) {
      setPrevValue(textfieldRef.current.value);
    }

    // Call the existing onChange from props if it exists
    if (rest.onChange) {
      rest.onChange(event, value, 'selectOption');
    }
  };

  const handleInputChange = (event: React.SyntheticEvent, inputValue: string, reason?: string) => {
    // When user types, we clear the selectedOption as it's no longer a confirmed selection
    setSelectedOption(null);
    setPrevValue(inputValue);

    // Call the existing onInputChange from props if it exists
    if (rest.onInputChange) {
      rest.onInputChange(event, inputValue, reason as AutocompleteInputChangeReason);
    }
  };

  return (
    <AutoCompleteContainer className="autocomplete-container">
      <MuiFormControl {...muiFormControlProps}>
        <InputLabelAndAction {...inputLabelAndActionProps} />
        <MuiAutocomplete
          {...rest}
          onFocus={() => {
            setIsFocus(true);
          }}
          onBlur={() => {
            setIsFocus(false);
          }}
          onChange={handleChange}
          onInputChange={handleInputChange}
          clearIcon={props.clearIcon ? props.clearIcon : <ClearIcon color="action" />}
          popupIcon={<CaretDownIcon color="action" />}
          renderInput={(params) => {
            const textFieldArgs: TextFieldProps = {
              ...params,
              placeholder: props.placeholder,
              error: Boolean(props.error),
              required: props.required,
              fullWidth: props.fullWidth,
              sx: {
                ...props.sx,
                '& .MuiInputAdornment-root': {
                  width: getAdornmentWidth(),
                },
              },
              focused,
              hiddenLabel,
              helperIconTooltip,
              actionProps,
              nonEdit,
              size: props.size,
              autoFocus: props.autoFocus,
              renderNonEditInput,
              endAdornmentAction,
              value: props.value,
              enableHelpHoverEffect,
            };

            let tooltipTitle = '';
            const inputValue = textfieldRef.current?.value ?? '';

            // Helper to check if a value matches an option
            const isValueInOptions = (selctedValue: string) => {
              if (!selctedValue) return false;

              return Array.isArray(props.options)
                ? props.options.some((option) => {
                  if (typeof option === 'object' && option !== null) {
                    return option.label === selctedValue || option.value === selctedValue;
                  }
                  return option === selctedValue;
                })
                : false;
            };

            const hasSelectedValue = selectedOption && typeof selectedOption === 'object' && 'label' in selectedOption;
            const selectedValue = hasSelectedValue ? (selectedOption.label as string) : (selectedOption as string);

            // Checking for selectedOption covers cases where user selects from dropdown or clears input
            if (selectedOption && isValueOverFlowing && isValueInOptions(selectedValue)) {
              tooltipTitle = selectedValue;
            // Checking for inputValue covers cases where user types a value and then selects it from the dropdown
            } else if (!selectedOption && isValueOverFlowing && isValueInOptions(inputValue)) {
              tooltipTitle = inputValue;
            // Checking for prevValue covers cases where user tabs back to a previous value or
            } else if ((prevValue === inputValue && isValueOverFlowing && isValueInOptions(prevValue))) {
              tooltipTitle = prevValue;
            // Checking for freeSolo mode where user can type arbitrary values
            } else if (isValueOverFlowing) {
              tooltipTitle = props.freeSolo ? inputValue : prevValue;
            }

            textFieldArgs.inputProps = {
              'aria-describedby': props.error ? undefined : helperTextId,
              'aria-errormessage': props.error ? helperTextId : undefined,
              'aria-labelledby': props.id ? `${props.id}-label` : undefined,
              ...textFieldArgs.inputProps,
            };

            return (
              <Tooltip title={tooltipTitle} tooltipsize="small">
                <TextField {...textFieldArgs} inputRef={textfieldRef} />
              </Tooltip>
            );
          }}
        />
        <MuiFormHelperText id={helperTextId} sx={{ marginTop: nonEdit ? '0px' : '4px' }}>{helperText}</MuiFormHelperText>
      </MuiFormControl>
    </AutoCompleteContainer>
  );
};

export const getMuiAutocompleteThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          return ({
            lineHeight: '16px',
            ...ownerState.error ? { // on focus in normal mode label should be in primary and on error should be main in color
              '&.Mui-focused': {
                ' .MuiFormLabel-root ': {
                  color: theme.palette.error.main,
                },
              },
            } : {
              '&.Mui-focused': {
                ' .MuiFormLabel-root ': {
                  color: theme.palette.primary.main,
                },
              },
            },
            '&.MuiAutocomplete-hasClearIcon': { // this is for error state with non-empty value
              '&.MuiAutocomplete-hasPopupIcon .MuiOutlinedInput-root': {
                paddingRight: '8px',
              },
            },
            '& .MuiFormControl-root': {
              '.MuiGrid-root:first-of-type': {
                display: 'none', // removes label inside autocomplete
              },
              '.MuiFormHelperText-root': { // removes helper text inside autocomplete
                display: 'none',
              },
              ...TYPOGRAPHY.body1,
              '& .MuiFormLabel-root': { // label text
                ...TYPOGRAPHY.subtitle2,
                height: '16px',
              },
              '& .MuiSvgIcon-colorError': {
                position: 'absolute',
                right: ownerState.freeSolo ? '10px' : '32px',
                height: '100%',
                verticalAlign: 'middle',
                top: '0px',
              },
              '& .MuiInputBase-root': {
                paddingTop: '5px',
                paddingBottom: '5px',
                paddingLeft: '8px',
                height: '28px',
                '&.MuiOutlinedInput-root .MuiAutocomplete-input': { // for input truncation
                  ...TYPOGRAPHY.body2,
                  padding: '0px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  display: 'block',
                  '&::placeholder': {
                    fontStyle: 'italic',
                    color: theme.palette.text.secondary,
                    opacity: 9,
                  },
                },
                '.MuiInputAdornment-root': { // all input icons
                  '.MuiAutocomplete-clearIndicator .MuiSvgIcon-root': { // clear icon
                    height: '16px',
                    width: '16px',
                    position: 'relative',
                  },
                  '.MuiAutocomplete-endAdornment': { // end icon
                    right: '8px',
                    '.MuiButtonBase-root': { // for both clear icon and caret down icon
                      top: '3px',
                      // eslint-why - a nested ternary is needed
                      // eslint-disable-next-line no-nested-ternary
                      margin: ownerState.error ? (ownerState.freeSolo ? '0px 30px 0px 4px' : '0px 36px 0px 4px') : '0px 6px 0px 4px',
                      '&.MuiAutocomplete-popupIndicator ': { // caret down icon
                        position: 'relative',
                        margin: '0px',
                        '.MuiSvgIcon-root': {
                          height: '16px',
                          width: '16px',
                        },
                      },
                    },
                  },
                },
              },
            },
            '& + .MuiFormHelperText-root': { // styles a form helper text right next to an autocomplete
              marginTop: '4px',
            },
          });
        },
        popper: ({ ownerState }) => {
          return ({
            ...(ownerState.freeSolo && ownerState.options.length === 0) && {
              display: 'none',
            },
          });
        },
        paper: ({ theme, ownerState }) => {
          return {
            padding: '0',
            '& .MuiMenuItem-root .MuiMenuItem-gutters': {
              padding: '0',
            },
            ...(ownerState.multiple) && {
              '& .MuiButtonBase-root.MuiMenuItem-root.Mui-selected.MuiAutocomplete-option[aria-selected="true"]': {
                backgroundColor: 'inherit !important',
                '&:hover': {
                  backgroundColor: `${theme.palette.action.hover} !important`,
                },
              },
            },
          };
        },
      },
    },
  };
};

Autocomplete.defaultProps = {
  freeSolo: false,
};

export * from '@mui/material/Autocomplete';
export default Autocomplete;
