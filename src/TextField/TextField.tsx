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

const ADORNMENT_GAP = 8;
const ADORNMENT_SLOT_WIDTH = 16;
const ADORNMENT_MIN_PADDING = 16;
const ADORNMENT_SLOT_ATTRIBUTE = 'data-adornment-slot';
const ADORNMENT_FIXED_SLOT_ATTRIBUTE = 'data-adornment-fixed';
const CLEAR_INDICATOR_CLASS = 'clearIndicator';
const POPUP_INDICATOR_CLASS = 'popupIndicator';
const END_ADORNMENT_CLASS = 'MuiAutocomplete-endAdornment';

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
              ...ownerState.endAdornment ?? {
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

// Extend standard MUI TextFieldProps to include your custom properties
export type CustomTextFieldProps = TextFieldProps & {
  unitLabel?: string;
  endAdornmentIconButton?: React.ReactNode;
  endAdornmentAction?: React.ReactNode;
};

const wrapAdornmentNodes = (nodes: React.ReactNode[], fixed = false) => {
  return React.Children.map(nodes, (node) => {
    return (
      <span
        {...{ [ADORNMENT_SLOT_ATTRIBUTE]: 'true' }}
        {...(fixed ? { [ADORNMENT_FIXED_SLOT_ATTRIBUTE]: 'true' } : {})}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        {node}
      </span>
    );
  });
};

// Group the endAdornment nodes into clear, popup, and other nodes for proper ordering and styling
const partitionAdornmentNodes = (node: React.ReactNode) => {
  const clearNodes: React.ReactNode[] = [];
  const popupNodes: React.ReactNode[] = [];
  const otherNodes: React.ReactNode[] = [];

  const traverse = (currentNode: React.ReactNode) => {
    React.Children.forEach(currentNode, (child) => {
      // If the child is not a valid React element, skip it
      if (!React.isValidElement(child)) return;

      // Check if the child has a className and categorize it based on known classes
      const className = (child.props as { className?: string }).className || '';

      // If the child has a className, check for known classes and categorize accordingly
      if (typeof className === 'string') {
        // If we hit the clear indicator, add it to the respective array and skip further traversal
        if (className.includes(CLEAR_INDICATOR_CLASS)) {
          clearNodes.push(child);
          return;
        }

        // If we hit the popup indicator, add it to the popupNodes array and skip further traversal
        if (className.includes(POPUP_INDICATOR_CLASS)) {
          popupNodes.push(child);
          return;
        }
        // If we hit the MUI wrapper, DO NOT add it. Instead, traverse inside it.
        if (className.includes(END_ADORNMENT_CLASS)) {
          if (child.props.children) traverse(child.props.children);
          return;
        }
      }

      // If we hit a React Fragment, unwrap it and traverse inside.
      if (child.type === React.Fragment) {
        if (child.props.children) traverse(child.props.children);
        return;
      }

      // Catch everything else (like loading spinners)
      otherNodes.push(child);
    });
  };

  // Start the traversal with the initial node
  traverse(node);
  return { clearNodes, popupNodes, otherNodes };
};

// Apply custom props to a React node if it's a valid element
const applyCustomPropsToIcon = (node: React.ReactNode, customProps: object) => {
  if (React.isValidElement(node)) {
    return React.cloneElement(node, { ...customProps, key: node.key || undefined });
  }

  return node;
};

// Group the endAdornment nodes into clear, popup, and other nodes for proper ordering and styling
export const getEndAdornmentSlots = (props: CustomTextFieldProps) => {
  const flowNodes: React.ReactNode[] = [];
  const fixedNodes: React.ReactNode[] = [];

  const defaultAdornment = props.InputProps?.endAdornment;

  const { clearNodes: rawClearNodes, popupNodes: rawPopupNodes, otherNodes: rawOtherNodes } = partitionAdornmentNodes(defaultAdornment);

  const iconPropsToOverride = { size: 'small' };
  const clearNodes = rawClearNodes.map((node) => { return applyCustomPropsToIcon(node, iconPropsToOverride); });
  const popupNodes = rawPopupNodes.map((node) => { return applyCustomPropsToIcon(node, iconPropsToOverride); });

  flowNodes.push(...clearNodes);

  // Add unit label and other nodes
  if (props.error) flowNodes.push(<WarningIcon color="error" fontSize="small" key="warning-icon" />);
  if (props.unitLabel) flowNodes.push(<Typography variant="body2" key="unit-label">{props.unitLabel}</Typography>);
  flowNodes.push(...rawOtherNodes);
  flowNodes.push(...popupNodes);

  if (props.endAdornmentIconButton) fixedNodes.push(props.endAdornmentIconButton);
  if (props.endAdornmentAction) fixedNodes.push(props.endAdornmentAction);

  return { flowNodes, fixedNodes };
};

export const getEndAdornment = (props: CustomTextFieldProps, isComboBox: boolean) => {
  if (props.InputProps?.startAdornment !== undefined && !isComboBox) {
    return null;
  }
  const { flowNodes, fixedNodes } = getEndAdornmentSlots(props);

  if (flowNodes.length === 0 && fixedNodes.length === 0) {
    return null;
  }

  // Wrap each node in an InputAdornment
  return (
    <InputAdornment position="end" className="erc-textfield-end-adornment-root">
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: `${ADORNMENT_GAP}px`,
          width: '100%',
        }}
      >
        {wrapAdornmentNodes(flowNodes)}
        {wrapAdornmentNodes(fixedNodes, true)}
      </span>
    </InputAdornment>
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

const getMuiTextFieldProps = (props: TextFieldProps, reservedAdornmentWidth: number): OutlinedTextFieldProps => {
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
  delete cleanedProps.endAdornmentIconButton;

  const userInputProps = props.InputProps ?? {};
  const userInputSx = userInputProps.sx;

  // To make the endAdornment width dynamic
  const mergedInputSx = {
    ...(typeof userInputSx === 'object' && userInputSx !== null ? userInputSx : {}),
    '--erc-end-adornment-width': `${Math.max(0, Math.ceil(reservedAdornmentWidth))}px`,
    '& .MuiInputBase-input, & .MuiAutocomplete-input': {
      paddingRight: 'calc(var(--erc-end-adornment-width, 56px) + 4px) !important',
      maxWidth: '100%',
    },
  };

  const muiTextFieldProps: OutlinedTextFieldProps = {
    ...cleanedProps,
    variant: 'outlined',
    label: undefined, // The label will be separately handled and not via the MuiTextField
    InputProps: {
      ...userInputProps, // since we checking the class name for Inputpros and making sure that upper component is autocomplete
      startAdornment: getStartAdornment(props, isComboBox),
      endAdornment: getEndAdornment(props, isComboBox),
      sx: mergedInputSx,
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

const renderInput = (
  props: TextFieldProps,
  setIsFocus: React.Dispatch<React.SetStateAction<boolean>>,
  reservedAdornmentWidth: number,
) => {
  const muiTextFieldProps = getMuiTextFieldProps(props, reservedAdornmentWidth);
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
  const [reservedAdornmentWidth, setReservedAdornmentWidth] = React.useState(ADORNMENT_MIN_PADDING);
  const rootRef = React.useRef<HTMLDivElement | null>(null);

  // Measure the width of the endAdornment and update the reservedAdornmentWidth state
  React.useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const measure = () => {
      // Get the width of the end adornment
      const adornmentRoot = root.querySelector<HTMLElement>('.erc-textfield-end-adornment-root');

      if (!adornmentRoot) {
        setReservedAdornmentWidth(ADORNMENT_MIN_PADDING);
        return;
      }

      // Get all elements that are marked as adornment slots
      const slotElements = Array.from(adornmentRoot.querySelectorAll<HTMLElement>(`[${ADORNMENT_SLOT_ATTRIBUTE}="true"]`));

      // Filter out any adornment slots that are not visible (e.g., those that are hidden due to conditional rendering)
      const visibleSlots = slotElements.filter((element) => {
        const style = window.getComputedStyle(element);
        return style.display !== 'none' && style.visibility !== 'hidden';
      });

      // Calculate the width of the end adornment based on the number of visible slots
      const countBasedWidth = visibleSlots.length > 0
        ? (visibleSlots.length * ADORNMENT_SLOT_WIDTH) + ((visibleSlots.length - 1) * ADORNMENT_GAP) + ADORNMENT_MIN_PADDING
        : ADORNMENT_MIN_PADDING;

      const measuredWidth = Math.ceil(adornmentRoot.getBoundingClientRect().width);
      setReservedAdornmentWidth(Math.max(measuredWidth, countBasedWidth));
    };

    measure();

    if (typeof ResizeObserver === 'undefined') {
      return undefined;
    }

    const observer = new ResizeObserver(() => {
      measure();
    });

    observer.observe(root);
    const adornmentRoot = root.querySelector<HTMLElement>('.erc-textfield-end-adornment-root');
    if (adornmentRoot) {
      observer.observe(adornmentRoot);
    }

    return () => {
      observer.disconnect();
    };
  }, [props.error, props.unitLabel, props.endAdornmentIconButton, props.InputProps?.endAdornment]);

  if (!props.id) {
    const id = useId();
    props.id = id;
  } else {
    props.id = `${useId()}${props.id}`;
  }
  const muiInputLabelProps = getInputLabelAndActionProps(props, isFocus);
  const muiFormControlProps = getMuiFormControlProps(props, forwardRef);

  return (
    <StyledMuiFormControl
      {...muiFormControlProps}
      ref={(node) => {
        rootRef.current = node;
        const forwarded = muiFormControlProps.ref;
        if (typeof forwarded === 'function') {
          forwarded(node);
        }
      }}
    >
      <InputLabelAndAction {...muiInputLabelProps} />
      {renderInput(props, setIsFocus, reservedAdornmentWidth)}
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
