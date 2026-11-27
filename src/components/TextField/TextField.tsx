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

import type { ComponentProps, CSSProperties, ReactNode, Ref } from 'react';
import { useRef } from 'react';
import { Field } from '@base-ui/react/field';
import CloseIcon from '@hcl-software/enchanted-icons-react/carbon/es/close';
import WarningIcon from '@hcl-software/enchanted-icons-react/carbon/es/warning';
import { cn } from '../../utils/cn';
import { FormLabel } from '../FormLabel';
import type { FormLabelProps } from '../FormLabel';

/** Height of a {@link TextField}. Maps to the Figma `size` property. */
export const TextFieldSize = {
  /** Default size, 36px high. */
  Medium: 'medium',
  /** Compact size, 24px high. */
  Small: 'small',
} as const;

/** Union of the {@link TextFieldSize} values. */
export type TextFieldSizeType = (typeof TextFieldSize)[keyof typeof TextFieldSize];

/**
 * Props of the {@link TextField}. Extends the Base UI `Field.Control` props, which are passed to the
 * `<input>` (or `<textarea>`), so `value`, `defaultValue`, `onValueChange`, `name`, `placeholder`,
 * `required`, `readOnly`, `id`, `type` and `aria-*` work as on a native input. The Figma `state`
 * (default, hover, focus) and `filled` properties are CSS states, not props.
 */
export interface TextFieldProps
  extends Omit<ComponentProps<typeof Field.Control>, 'size' | 'children' | 'className' | 'style' | 'ref'> {
  /** Ref to the `<input>` or, when `multiline`, the `<textarea>`. */
  ref?: Ref<HTMLInputElement | HTMLTextAreaElement>;
  /** Extra class name for the root element. */
  className?: string;
  /** Inline style for the root element. */
  style?: CSSProperties;
  /**
   * Height of the field: `medium` (36px) or `small` (24px).
   * @default TextFieldSize.Medium
   */
  size?: TextFieldSizeType;
  /**
   * Renders a `<textarea>` that can grow, instead of a single-line `<input>`. Figma `multiline`.
   * @default false
   */
  multiline?: boolean;
  /**
   * Visible lines of a `multiline` field. Native `<textarea rows>`, not a Figma property; the field
   * still grows with its content when `showDragHandle` is on or the text wraps. Ignored otherwise.
   * @default 1
   */
  rows?: number;
  /**
   * Uses light colors so the field stays readable on a dark or colored background. Figma `inverse`.
   * @default false
   */
  inverse?: boolean;
  /**
   * Marks the field as failing validation: error colors and icon, `aria-invalid`, and the
   * `errorMessage`. Figma `invalid`.
   * @default false
   */
  invalid?: boolean;
  /**
   * Blocks interaction and dims the field. Figma `disabled`.
   * @default false
   */
  disabled?: boolean;
  /**
   * Shows a value the user can select and copy but not change. The field loses its border and fill.
   * Figma `readOnly`.
   * @default false
   */
  readOnly?: boolean;
  /**
   * Marks the input as required for form validation and shows an asterisk after the `label`.
   * @default false
   */
  required?: boolean;
  /** Hint shown, in italic, while the field is empty. Figma `placeholder`. */
  placeholder?: string;
  /**
   * Text above the field, linked to it. Without it the field needs an `aria-label`. `required` also
   * shows an asterisk after it. Figma `label` (on the nested FormLabel).
   */
  label?: string;
  /**
   * Shows the `label`. Set to `false` for a field without visible text; then provide an `aria-label`.
   * Figma `showLabel`.
   * @default true
   */
  showLabel?: boolean;
  /** Supporting text under the field. Rendered only when set and `showHelperText` is `true`. Figma `helperText`. */
  helperText?: string;
  /**
   * Shows the `helperText`. Figma `showHelperText` (off by default there, but the text only renders
   * when you set it).
   * @default true
   */
  showHelperText?: boolean;
  /** Message shown under the field while `invalid` is `true`. Ignored otherwise. Figma `errorMessage`. */
  errorMessage?: string;
  /**
   * Shows the `errorMessage` while `invalid` is `true`. Figma `showErrorMessage`.
   * @default true
   */
  showErrorMessage?: boolean;
  /** Short unit text after the value, such as `px`. Rendered only when set and `showUnitLabel` is `true`. Figma `unitLabel`. */
  unitLabel?: string;
  /**
   * Shows the `unitLabel`. Figma `showUnitLabel` (off by default there, but the text only renders
   * when you set it).
   * @default true
   */
  showUnitLabel?: boolean;
  /** Content at the end of the field, such as an icon button. Figma `endAdornment` (instance swap). */
  endAdornment?: ReactNode;
  /**
   * Shows the `endAdornment`. Figma `showEndAdornment` (off by default there, but the slot only
   * renders when you set it).
   * @default true
   */
  showEndAdornment?: boolean;
  /** Content above the input row, inside the border, such as tags. Figma `contentTop` (instance swap). */
  contentTop?: ReactNode;
  /**
   * Shows the `contentTop`. Figma `showContentTop` (off by default there, but the slot only renders
   * when you set it).
   * @default true
   */
  showContentTop?: boolean;
  /** Content below the input row, inside the border, such as a toolbar. Figma `contentBottom` (instance swap). */
  contentBottom?: ReactNode;
  /**
   * Shows the `contentBottom`. Figma `showContentBottom` (off by default there, but the slot only
   * renders when you set it).
   * @default true
   */
  showContentBottom?: boolean;
  /**
   * Lets the user resize a `multiline` field vertically by dragging its corner. Ignored for a
   * single-line field. Figma `showDragHandle`.
   * @default false
   */
  showDragHandle?: boolean;
  /**
   * Shows a clear button while the field is focused and has a value. It is not in the tab order, so
   * keyboard users clear the text by selecting and deleting it. Never shown when `readOnly` or
   * `disabled`. Figma `showClearIcon` (only has an effect in the focus state with a value).
   * @default true
   */
  showClearIcon?: boolean;
  /**
   * Extra options of the label, which is a {@link FormLabel}: the help icon, an action, an error icon
   * and helper text under the label. Figma exposes these on the nested FormLabel instance
   * (`showHelpIcon`, `showActionButton`, `showErrorIcon`, `showHelperText`, `helperText`). The label
   * text, `required`, `invalid`, `disabled` and `inverse` come from the field's own props.
   */
  labelProps?: Omit<FormLabelProps, 'label' | 'required' | 'invalid' | 'disabled' | 'inverse' | 'part'>;
  /**
   * Accessible name of the clear button. Pass a translated string in non-English UIs.
   * @default 'Clear'
   */
  clearLabel?: string;
}

/**
 * Sets a form control's value the way a user's typing would, so React `onChange` handlers and the
 * Base UI field state both see it, for controlled and uncontrolled fields alike.
 */
const setNativeValue = (element: HTMLInputElement | HTMLTextAreaElement, value: string) => {
  const prototype = element instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(prototype, 'value')?.set?.call(element, value);
  element.dispatchEvent(new Event('input', { bubbles: true }));
};

/**
 * Lets a user enter and edit text, on one line or several. Use it for free-form values; use Select to
 * choose from a fixed list.
 *
 * Builds on the Base UI `Field`: the label, helper text and error message are linked to the control
 * automatically, and the other props are passed to the `<input>` or `<textarea>`. Styles live in the
 * `ThemeProvider` boundary; override with tokens or `::part(root)`. Hover and focus appearances (the
 * Figma `state` property) and `filled` are CSS states, not props.
 *
 * @example
 * ```tsx
 * <TextField label="Email" type="email" helperText="We never share it" required />
 * ```
 */
export const TextField = ({
  size = TextFieldSize.Medium,
  multiline = false,
  rows = 1,
  inverse = false,
  invalid = false,
  disabled = false,
  readOnly = false,
  label,
  showLabel = true,
  helperText,
  showHelperText = true,
  errorMessage,
  showErrorMessage = true,
  unitLabel,
  showUnitLabel = true,
  endAdornment,
  showEndAdornment = true,
  contentTop,
  showContentTop = true,
  contentBottom,
  showContentBottom = true,
  showDragHandle = false,
  showClearIcon = true,
  clearLabel = 'Clear',
  labelProps,
  required,
  className,
  style,
  ref,
  ...props
}: TextFieldProps) => {
  const controlRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const setRefs = (node: HTMLInputElement | HTMLTextAreaElement | null) => {
    controlRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) (ref as { current: HTMLInputElement | HTMLTextAreaElement | null }).current = node;
  };

  const hasLabel = showLabel && Boolean(label);
  const hasHelper = showHelperText && Boolean(helperText);
  const hasError = invalid && showErrorMessage && Boolean(errorMessage);
  const hasUnit = showUnitLabel && Boolean(unitLabel);
  const hasClear = showClearIcon && !readOnly && !disabled;

  const clear = () => {
    // The clear button only renders next to the control, so the ref is always set when it is clicked.
    const control = controlRef.current as HTMLInputElement | HTMLTextAreaElement;
    setNativeValue(control, '');
    control.focus();
  };

  return (
    <Field.Root
      className={cn('textFieldRoot', className)}
      style={style}
      // React's DOM types have no `part` attribute, so it is passed through a spread.
      {...{ part: 'root' }}
      invalid={invalid}
      disabled={disabled}
      data-size={size}
      data-multiline={multiline ? '' : undefined}
      data-inverse={inverse ? '' : undefined}
      data-read-only={readOnly ? '' : undefined}
      data-drag-handle={multiline && showDragHandle ? '' : undefined}
    >
      {hasLabel && (
        <FormLabel
          {...labelProps}
          // A distinct part, so `::part(root)` on a field does not also restyle its label.
          part="label"
          label={label as string}
          required={required}
          invalid={invalid}
          disabled={disabled}
          inverse={inverse}
        />
      )}
      <div className="textFieldInput">
        {showContentTop && contentTop && <div className="textFieldContentTop">{contentTop}</div>}
        <div className="textFieldContent">
          <Field.Control
            {...props}
            ref={setRefs}
            className="textFieldControl"
            required={required}
            readOnly={readOnly}
            // The textarea has no `type`; Base UI passes it through, so drop it to avoid an invalid attribute.
            {...(multiline ? { render: <textarea rows={rows} />, type: undefined } : {})}
          />
          {hasClear && (
            <button
              type="button"
              className="textFieldClear"
              aria-label={clearLabel}
              // Out of the tab order on purpose: the button only exists while the field has focus, and
              // moving focus to it would hide it before the click lands.
              tabIndex={-1}
              onMouseDown={(event) => event.preventDefault()}
              onClick={clear}
            >
              <CloseIcon className="textFieldIcon" aria-hidden />
            </button>
          )}
          {hasUnit && <span className="textFieldUnit">{unitLabel}</span>}
          {invalid && (
            <span className="textFieldErrorIcon">
              <WarningIcon className="textFieldIcon" aria-hidden />
            </span>
          )}
          {showEndAdornment && endAdornment && <div className="textFieldEndAdornment">{endAdornment}</div>}
        </div>
        {showContentBottom && contentBottom && <div className="textFieldContentBottom">{contentBottom}</div>}
      </div>
      {hasHelper && <Field.Description className="textFieldHelperText">{helperText}</Field.Description>}
      {hasError && (
        <Field.Error className="textFieldErrorMessage" match>
          {errorMessage}
        </Field.Error>
      )}
    </Field.Root>
  );
};
