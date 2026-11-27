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

import { useId } from 'react';
import type { ComponentProps as ReactComponentProps } from 'react';
import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import CheckboxIcon from '@hcl-software/enchanted-icons-react/carbon/es/checkbox';
import CheckboxCheckedFilledIcon from '@hcl-software/enchanted-icons-react/carbon/es/checkbox--checked--filled';
import CheckboxIndeterminateFilledIcon from '@hcl-software/enchanted-icons-react/carbon/es/checkbox--indeterminate--filled';
import { cn } from '../../utils/cn';

/** Props of the {@link Checkbox}. Extends the Base UI `Checkbox.Root` props, which are passed through. */
export interface CheckboxProps extends Omit<ReactComponentProps<typeof BaseCheckbox.Root>, 'children' | 'className'> {
  /** Extra class name for the root element. Unlike the Base UI prop, it cannot be a function of the state. */
  className?: string;
  /**
   * Text shown next to the control. When omitted, no label is rendered and the control needs an
   * `aria-label`. Figma `label`.
   */
  label?: string;
  /**
   * Shows the `label`. Set to `false` for a control without visible text; then provide an `aria-label`.
   * Figma `showLabel`.
   * @default true
   */
  showLabel?: boolean;
  /** Supporting text under the label. Rendered only when set and `showHelperText` is `true`. Figma `helperText`. */
  helperText?: string;
  /**
   * Shows the `helperText`. Figma `showHelperText`.
   * @default true
   */
  showHelperText?: boolean;
  /** Message shown under the label while `invalid` is `true`. Ignored otherwise. Figma `errorMessage`. */
  errorMessage?: string;
  /**
   * Shows the `errorMessage` while `invalid` is `true`. Figma `showErrorMessage`.
   * @default true
   */
  showErrorMessage?: boolean;
  /**
   * Marks the checkbox as failing validation: error colors, `aria-invalid`, and the `errorMessage`.
   * Figma `invalid`.
   * @default false
   */
  invalid?: boolean;
  /**
   * Removes the outer padding around the control and label, for dense layouts such as tables.
   * Figma `disablePadding`.
   * @default false
   */
  disablePadding?: boolean;
}

/**
 * Lets a user toggle one option, or select several options from a set. Use Radio when only one
 * option may be selected.
 *
 * Builds on the Base UI `Checkbox`; its props are passed through to `Checkbox.Root`. Styles live in
 * the `ThemeProvider` boundary; override with tokens or `::part(root)`. `required` also shows the
 * asterisk after the label. Hover, focus, and active appearances (the Figma `state` property) are CSS states, not props.
 *
 * @example
 * ```tsx
 * <Checkbox label="Accept terms" helperText="You can change this later" required />
 * ```
 */
export const Checkbox = ({
  label,
  showLabel = true,
  helperText,
  showHelperText = true,
  errorMessage,
  showErrorMessage = true,
  invalid = false,
  disablePadding = false,
  required,
  disabled,
  className,
  ...props
}: CheckboxProps) => {
  const id = useId();
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;
  const hasLabel = showLabel && Boolean(label);
  const hasHelper = showHelperText && Boolean(helperText);
  const showError = invalid && showErrorMessage && Boolean(errorMessage);
  const describedBy = [hasHelper ? helperId : null, showError ? errorId : null].filter(Boolean).join(' ');

  return (
    <label
      className={cn('checkboxRoot', className)}
      // React's DOM types have no `part` attribute, so it is passed through a spread.
      {...{ part: 'root' }}
      data-disable-padding={disablePadding ? '' : undefined}
      data-invalid={invalid ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
    >
      <BaseCheckbox.Root
        {...props}
        className="checkboxControl"
        required={required}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy || undefined}
        data-invalid={invalid ? '' : undefined}
      >
        <CheckboxIcon className="checkboxIcon checkboxIconUnchecked" aria-hidden />
        <BaseCheckbox.Indicator className="checkboxIndicator">
          <CheckboxCheckedFilledIcon className="checkboxIcon checkboxIconChecked" aria-hidden />
          <CheckboxIndeterminateFilledIcon className="checkboxIcon checkboxIconIndeterminate" aria-hidden />
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
      {(hasLabel || hasHelper || showError) && (
        <span className="checkboxContent">
          {hasLabel && (
            <span className="checkboxLabel">
              {label}
              {required && (
                <span className="checkboxRequired" aria-hidden="true">
                  {' *'}
                </span>
              )}
            </span>
          )}
          {hasHelper && (
            <span id={helperId} className="checkboxHelperText">
              {helperText}
            </span>
          )}
          {showError && (
            <span id={errorId} className="checkboxErrorMessage">
              {errorMessage}
            </span>
          )}
        </span>
      )}
    </label>
  );
};
