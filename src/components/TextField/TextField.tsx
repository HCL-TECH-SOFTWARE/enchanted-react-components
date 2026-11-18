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

import type { ComponentProps as ReactComponentProps, ReactNode } from 'react';
import { Field as BaseField } from '@base-ui/react/field';
import { Input as BaseInput } from '@base-ui/react/input';
import { cn } from '../../utils/cn';

/** Size of a {@link TextField}. Maps to the Figma `size` property. */
export const TextFieldSize = {
  /** The default size. */
  Medium: 'medium',
  /** A compact size for dense layouts. */
  Small: 'small',
} as const;

/** Union of the {@link TextFieldSize} values. */
export type TextFieldSizeType = (typeof TextFieldSize)[keyof typeof TextFieldSize];

/** Props of the {@link TextField}. Extends the Base UI `Input` props, which are passed through to the input. */
export interface TextFieldProps extends Omit<ReactComponentProps<typeof BaseInput>, 'size'> {
  /** Text above the input. Replaces the Figma `FormLabel` instance and `showLabel` toggle. */
  label?: ReactNode;
  /** Supporting text below the input. Figma `helperText` with `showHelperText`. */
  helperText?: ReactNode;
  /** Unit shown after the text, for example `px`. Figma `unitLabel` with `showUnitLabel`. */
  unitLabel?: ReactNode;
  /** Content shown at the end of the input, for example an icon button. Replaces the Figma `inputAdornment` swap and `showInputAdornment` toggle. */
  inputAdornment?: ReactNode;
  /** Freeform content above the input. Figma `contentTop` slot with `showContentTop`. */
  contentTop?: ReactNode;
  /** Freeform content below the input. Figma `contentBottom` slot with `showContentBottom`. */
  contentBottom?: ReactNode;
  /**
   * Size. Figma `size`.
   * @default TextFieldSize.Medium
   */
  size?: TextFieldSizeType;
  /**
   * Marks the field as invalid. Figma `error`. Sets `aria-invalid` on the input.
   * @default false
   */
  error?: boolean;
  /**
   * Uses the colors made for dark backgrounds. Figma `inversecolors`.
   * @default false
   */
  inverseColors?: boolean;
  /**
   * Renders a multiline `textarea` instead of a single-line input. Figma `multiline`.
   * @default false
   */
  multiline?: boolean;
}

/**
 * Lets users enter and edit text, on one line or several.
 *
 * Built on the Base UI `Field` and `Input`; the input props, including `disabled`, `readOnly`
 * (Figma `nonEdit`), `value`, and `placeholder`, are passed through to the input. Styles live in the
 * `ThemeProvider` boundary and use the design tokens, so render it inside a `ThemeProvider`.
 * Restyle it with tokens, the `style` prop, or `::part(root)`.
 *
 * @example
 * ```tsx
 * <TextField label="Name" helperText="As shown on your badge" />
 * ```
 */
export const TextField = ({
  label,
  helperText,
  unitLabel,
  inputAdornment,
  contentTop,
  contentBottom,
  size = TextFieldSize.Medium,
  error = false,
  inverseColors = false,
  multiline = false,
  disabled,
  className,
  ...props
}: TextFieldProps) => (
  <BaseField.Root
    className="textFieldRoot"
    disabled={disabled}
    invalid={error || undefined}
    // React's DOM types have no `part` attribute, so it is passed through a spread.
    {...{ part: 'root' }}
    data-size={size}
    data-inverse={inverseColors ? '' : undefined}
    data-multiline={multiline ? '' : undefined}
  >
    {label ? <BaseField.Label className="textFieldLabel">{label}</BaseField.Label> : null}
    {contentTop ? <div className="textFieldContentTop">{contentTop}</div> : null}
    <div className="textFieldSurface">
      <BaseField.Control
        {...props}
        // The `textarea` element is the multiline form of the same control.
        render={multiline ? <textarea /> : undefined}
        // Base UI accepts a class name or a function of its state; both are merged after the control class.
        className={(state) => cn('textFieldInput', typeof className === 'function' ? className(state) : className)}
      />
      {unitLabel ? <span className="textFieldUnit">{unitLabel}</span> : null}
      {inputAdornment ? <span className="textFieldAdornment">{inputAdornment}</span> : null}
    </div>
    {contentBottom ? <div className="textFieldContentBottom">{contentBottom}</div> : null}
    {helperText ? <BaseField.Description className="textFieldHelperText">{helperText}</BaseField.Description> : null}
  </BaseField.Root>
);
