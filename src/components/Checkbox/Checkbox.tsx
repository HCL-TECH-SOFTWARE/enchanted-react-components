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
import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { cn } from '../../utils/cn';

/** Padding of a {@link Checkbox}. Maps to the Figma `variant` property. */
export const CheckboxVariant = {
  /** Adds padding around the box so the hit area is larger. The default. */
  WithPadding: 'withPadding',
  /** Only the box and label, with no padding. Use it where the checkbox must align with other content, for example in a table cell. */
  WithoutPadding: 'withoutPadding',
} as const;

/** Union of the {@link CheckboxVariant} values. */
export type CheckboxVariantType = (typeof CheckboxVariant)[keyof typeof CheckboxVariant];

/** Props of the {@link Checkbox}. Extends the Base UI `Checkbox.Root` props, which are passed through. */
export interface CheckboxProps extends ReactComponentProps<typeof BaseCheckbox.Root> {
  /** Text next to the box. Figma `label` with `showLabel`; omit it to hide the label. */
  label?: ReactNode;
  /** Supporting text below the label. Figma `helperText` with `showHelperText`. */
  helperText?: ReactNode;
  /**
   * Text below the label that explains the error. Figma `errorMessage` with `showErrorMessage`.
   * It is shown only while `error` is `true`.
   */
  errorMessage?: ReactNode;
  /**
   * Padding around the box. Figma `variant`.
   * @default CheckboxVariant.WithPadding
   */
  variant?: CheckboxVariantType;
  /**
   * Marks the checkbox as invalid. Figma `error`. Sets `aria-invalid` on the box.
   * @default false
   */
  error?: boolean;
}

/**
 * Lets users select one or more options from a set, or toggle a single option on or off. Use Radio
 * when only one option may be selected.
 *
 * Built on the Base UI `Checkbox`; the `checked`, `indeterminate`, and `disabled` states and the
 * other props are passed through to it. The label wraps the box, so clicking the text toggles it.
 * Styles live in the `ThemeProvider` boundary and use the design tokens, so render it inside a
 * `ThemeProvider`. Restyle it with tokens, the `style` prop, or `::part(root)`.
 *
 * @example
 * ```tsx
 * <Checkbox label="Accept the terms" defaultChecked />
 * ```
 */
export const Checkbox = ({
  label,
  helperText,
  errorMessage,
  variant = CheckboxVariant.WithPadding,
  error = false,
  className,
  disabled,
  ...props
}: CheckboxProps) => {
  const id = useId();
  const helperId = helperText ? `${id}-helper` : undefined;
  const errorId = error && errorMessage ? `${id}-error` : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div
      className="checkboxRoot"
      // React's DOM types have no `part` attribute, so it is passed through a spread.
      {...{ part: 'root' }}
      data-variant={variant}
      data-error={error ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
    >
      <label className="checkboxLabel">
        <BaseCheckbox.Root
          {...props}
          disabled={disabled}
          aria-invalid={error || undefined}
          aria-describedby={describedBy}
          // Base UI accepts a class name or a function of its state; both are merged after the control class.
          className={(state) => cn('checkboxControl', typeof className === 'function' ? className(state) : className)}
        >
          <BaseCheckbox.Indicator className="checkboxIndicator" />
        </BaseCheckbox.Root>
        {label ? <span className="checkboxText">{label}</span> : null}
      </label>
      {helperText ? (
        <div id={helperId} className="checkboxHelperText">
          {helperText}
        </div>
      ) : null}
      {error && errorMessage ? (
        <div id={errorId} className="checkboxErrorMessage">
          {errorMessage}
        </div>
      ) : null}
    </div>
  );
};
