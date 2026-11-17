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
import CheckboxCheckedIcon from '@hcl-software/enchanted-icons-react/carbon/es/checkbox--checked--filled';
import CheckboxIndeterminateIcon from '@hcl-software/enchanted-icons-react/carbon/es/checkbox--indeterminate--filled';
import { cn } from '../../utils/cn';

/** Spacing around a {@link Checkbox}. Maps to the Figma `variant` property. */
export const CheckboxVariant = {
  /** Adds vertical padding around the box and label. Use for standalone checkboxes and form rows. */
  WithPadding: 'with-padding',
  /** Removes the outer padding. Use inside lists, tables or other components that provide their own spacing. */
  WithoutPadding: 'without-padding',
} as const;

/** Union of the {@link CheckboxVariant} values. */
export type CheckboxVariantType = (typeof CheckboxVariant)[keyof typeof CheckboxVariant];

/**
 * Props of the {@link Checkbox}. Extends the Base UI `Checkbox.Root` props, which are passed
 * through to the checkbox control (`role="checkbox"`), including `checked`, `defaultChecked`,
 * `indeterminate`, `disabled`, `onCheckedChange`, `name`, `value`, `required`, `className` and `ref`.
 */
export interface CheckboxProps extends ReactComponentProps<typeof BaseCheckbox.Root> {
  /**
   * Visual spacing. Figma `variant`.
   * @default CheckboxVariant.WithPadding
   */
  variant?: CheckboxVariantType;
  /**
   * Shows the error styling and sets `aria-invalid`. Figma `error`. Base UI has no equivalent
   * prop; it does not block submission or validate the value.
   * @default false
   */
  error?: boolean;
  /**
   * Whether the label (the `children`) is rendered. Figma `showLabel`.
   * @default true
   */
  showLabel?: boolean;
  /**
   * Secondary text under the label. Rendered only when `showHelperText` is `true`. Figma `helperText`.
   */
  helperText?: string;
  /**
   * Whether the helper text is rendered. Figma `showHelperText`.
   * @default false
   */
  showHelperText?: boolean;
  /**
   * Text shown under the label when `error` is `true`. Figma `errorMessage`.
   */
  errorMessage?: string;
  /**
   * Whether the error message is rendered while `error` is `true`. Figma `showErrorMessage`.
   * @default true
   */
  showErrorMessage?: boolean;
}

/**
 * A control to select or clear one option, with an optional label, helper text and error message.
 * Use it for independent on/off choices; for a mutually exclusive choice use a radio group.
 *
 * Built on the Base UI `Checkbox`, so its props are passed through to the checkbox control and it
 * supports controlled and uncontrolled use. The box icons come from `@hcl-software/enchanted-icons-react`.
 * Styles live in the `ThemeProvider` boundary and are customised through tokens, the `style` prop,
 * or `::part(root)`, which targets the wrapper that holds the box and the text.
 * The Figma `label` text property is the `children`. The hover and focus states are CSS, not props.
 *
 * @example
 * ```tsx
 * <Checkbox defaultChecked helperText="We email you once a week." showHelperText>
 *   Subscribe to the newsletter
 * </Checkbox>
 * ```
 */
export const Checkbox = ({
  variant = CheckboxVariant.WithPadding,
  error = false,
  showLabel = true,
  helperText,
  showHelperText = false,
  errorMessage,
  showErrorMessage = true,
  children,
  className,
  ...props
}: CheckboxProps) => {
  const id = useId();
  const labelId = `${id}-label`;
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;

  const hasLabel = showLabel && children !== undefined && children !== null && children !== false;
  const hasHelper = showHelperText && Boolean(helperText);
  const hasError = error && showErrorMessage && Boolean(errorMessage);
  const describedBy = [hasHelper && helperId, hasError && errorId].filter(Boolean).join(' ') || undefined;

  return (
    // A wrapping <label> makes the text clickable and keeps the control and its text in one boundary.
    <label
      className="checkboxRoot"
      // React's DOM types have no `part` attribute, so it is passed through a spread.
      {...{ part: 'root' }}
      data-variant={variant}
      data-error={error ? '' : undefined}
      data-disabled={props.disabled ? '' : undefined}
    >
      <BaseCheckbox.Root
        aria-labelledby={hasLabel ? labelId : undefined}
        aria-describedby={describedBy}
        aria-invalid={error || undefined}
        {...props}
        // Base UI also accepts a state-based className function, so keep supporting it.
        className={
          typeof className === 'function'
            ? (state) => cn('checkboxControl', className(state))
            : cn('checkboxControl', className)
        }
      >
        <span className="checkboxBox">
          <CheckboxIcon className="checkboxIcon checkboxIconUnchecked" aria-hidden="true" />
          <CheckboxCheckedIcon className="checkboxIcon checkboxIconChecked" aria-hidden="true" />
          <CheckboxIndeterminateIcon className="checkboxIcon checkboxIconIndeterminate" aria-hidden="true" />
        </span>
      </BaseCheckbox.Root>
      {(hasLabel || hasHelper || hasError) && (
        <span className="checkboxContent">
          {hasLabel && (
            <span id={labelId} className="checkboxLabel">
              {children}
            </span>
          )}
          {hasHelper && (
            <span id={helperId} className="checkboxHelperText">
              {helperText}
            </span>
          )}
          {hasError && (
            <span id={errorId} className="checkboxErrorMessage">
              {errorMessage}
            </span>
          )}
        </span>
      )}
    </label>
  );
};
