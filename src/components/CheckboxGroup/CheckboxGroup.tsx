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
import type { ComponentProps as ReactComponentProps, ReactNode } from 'react';
import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group';
import { Field } from '@base-ui/react/field';
import { Fieldset } from '@base-ui/react/fieldset';
import WarningIcon from '@hcl-software/enchanted-icons-react/carbon/es/warning';
import { cn } from '../../utils/cn';

/** How the checkboxes of a {@link CheckboxGroup} are laid out. Figma `orientation`. */
export const CheckboxGroupOrientation = {
  Vertical: 'vertical',
  Horizontal: 'horizontal',
} as const;

/** Union of the {@link CheckboxGroupOrientation} values. */
export type CheckboxGroupOrientationType = (typeof CheckboxGroupOrientation)[keyof typeof CheckboxGroupOrientation];

/** Props of the {@link CheckboxGroup}. Extends the Base UI `CheckboxGroup` props (`value`, `defaultValue`, `onValueChange`, `allValues`), which are passed through. */
export interface CheckboxGroupProps
  extends Omit<ReactComponentProps<typeof BaseCheckboxGroup>, 'children' | 'className'> {
  /** Extra class name for the root element. Unlike the Base UI prop, it cannot be a function of the state. Figma `className`. */
  className?: string;
  /** The `Checkbox` elements of the group (the Figma `formGroup` slot). Pass each checkbox its own `value`. */
  children?: ReactNode;
  /**
   * Text of the group label. Not a Figma property of CheckboxGroup itself: it is the `label` of the
   * FormLabel nested in the design. Without it, no label is rendered and the group needs an `aria-label`.
   */
  label?: string;
  /**
   * Shows the group `label`. Set to `false` for a group without visible text; then provide an `aria-label`.
   * Figma `showLabel`.
   * @default true
   */
  showLabel?: boolean;
  /**
   * Shows an asterisk after the label (the `required` property of the nested FormLabel). It does not
   * validate anything; set `required` on the checkboxes for that.
   * @default false
   */
  required?: boolean;
  /**
   * Lays the checkboxes out in a column or in a wrapping row. Figma `orientation`.
   * @default CheckboxGroupOrientation.Vertical
   */
  orientation?: CheckboxGroupOrientationType;
  /** Supporting text under the checkboxes. Rendered only when set and `showHelperText` is `true`. Figma `helperText`. */
  helperText?: string;
  /**
   * Shows the `helperText`. Figma `showHelperText`.
   * @default false
   */
  showHelperText?: boolean;
  /** Message shown under the checkboxes while `invalid` is `true`. Ignored otherwise. Figma `errorMessage`. */
  errorMessage?: string;
  /**
   * Shows the `errorMessage` while `invalid` is `true`. Figma `showErrorMessage`.
   * @default true
   */
  showErrorMessage?: boolean;
  /**
   * Marks the group as failing validation: error label color, the error icon, and the `errorMessage`.
   * Set `invalid` on the checkboxes too to color their controls. Figma `invalid`.
   * @default false
   */
  invalid?: boolean;
  /**
   * Disables every checkbox in the group (Base UI `CheckboxGroup` `disabled`). Figma `disabled`.
   * @default false
   */
  disabled?: boolean;
}

/**
 * Groups related `Checkbox` elements under one label, with shared helper text and error message.
 * Use it to select several options in a form; use a single `Checkbox` for one option.
 *
 * Builds on the Base UI `CheckboxGroup` inside `Field` and `Fieldset`: the label is the fieldset legend,
 * and the helper text and error message are linked to the group with `aria-describedby`.
 * Styles live in the `ThemeProvider` boundary; override with tokens or `::part(root)`.
 */
export const CheckboxGroup = ({
  className,
  children,
  label,
  showLabel = true,
  required = false,
  orientation = CheckboxGroupOrientation.Vertical,
  helperText,
  showHelperText = false,
  errorMessage,
  showErrorMessage = true,
  invalid = false,
  disabled = false,
  ...props
}: CheckboxGroupProps) => {
  const helperId = useId();
  const errorId = useId();
  const hasLabel = showLabel && Boolean(label);
  const hasHelper = showHelperText && Boolean(helperText);
  const hasError = invalid && showErrorMessage && Boolean(errorMessage);
  const describedBy = [hasHelper ? helperId : null, hasError ? errorId : null].filter(Boolean).join(' ');

  return (
    <Field.Root
      className={cn('checkboxGroupRoot', className)}
      // React's DOM types have no `part` attribute, so it is passed through a spread.
      {...{ part: 'root' }}
      disabled={disabled}
      invalid={invalid}
      data-orientation={orientation}
      data-invalid={invalid ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
    >
      <Fieldset.Root className="checkboxGroupFieldset" aria-describedby={describedBy || undefined}>
        {hasLabel && (
          <Fieldset.Legend className="checkboxGroupLabel">
            <span className="checkboxGroupLabelText">
              {label}
              {required && <span aria-hidden="true">{' *'}</span>}
            </span>
            {invalid && <WarningIcon className="checkboxGroupErrorIcon" aria-hidden />}
          </Fieldset.Legend>
        )}
        <BaseCheckboxGroup {...props} disabled={disabled} className="checkboxGroupControls">
          {children}
        </BaseCheckboxGroup>
      </Fieldset.Root>
      {hasHelper && (
        <p id={helperId} className="checkboxGroupHelperText">
          {helperText}
        </p>
      )}
      {hasError && (
        <p id={errorId} className="checkboxGroupErrorMessage">
          {errorMessage}
        </p>
      )}
    </Field.Root>
  );
};
