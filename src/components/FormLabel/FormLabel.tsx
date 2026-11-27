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

import type { ComponentProps, CSSProperties, ReactNode } from 'react';
import { Field } from '@base-ui/react/field';
import HelpIcon from '@hcl-software/enchanted-icons-react/carbon/es/help';
import WarningIcon from '@hcl-software/enchanted-icons-react/carbon/es/warning';
import { cn } from '../../utils/cn';

/**
 * Props of the {@link FormLabel}. Extends the Base UI `Field.Label` props, which are passed to the
 * `<label>`. Place it inside a Base UI `Field.Root`. The Figma `state` (default, focus)
 * is a CSS state, not a prop: inside a Base UI `Field` the label turns to the focus color while its
 * control has focus.
 */
export interface FormLabelProps extends Omit<ComponentProps<typeof Field.Label>, 'children' | 'className' | 'style'> {
  /** Extra class name for the root element. */
  className?: string;
  /** Inline style for the root element. */
  style?: CSSProperties;
  /**
   * Name of the shadow part on the root element. Components that contain a FormLabel set their own
   * name, so `::part(root)` on a field does not also restyle its label.
   * @default 'root'
   */
  part?: string;
  /** Text of the label. Figma `label`. */
  label: string;
  /**
   * Shows an asterisk after the label. It is decoration only: set `required` on the form control so
   * validation and assistive technology know. Figma `required`.
   * @default false
   */
  required?: boolean;
  /**
   * Error color for the label. Figma `invalid`.
   * @default false
   */
  invalid?: boolean;
  /**
   * Disabled color for the label and helper text. Figma `disabled`.
   * @default false
   */
  disabled?: boolean;
  /**
   * Light colors, so the label stays readable on a dark or colored background. Figma `inverse`.
   * @default false
   */
  inverse?: boolean;
  /**
   * Shows the `helpIcon` next to the label. Figma `showHelpIcon`.
   * @default false
   */
  showHelpIcon?: boolean;
  /**
   * Icon or control shown next to the label while `showHelpIcon` is on, such as a button that opens a
   * tooltip. Defaults to a decorative help icon. Figma help icon instance.
   */
  helpIcon?: ReactNode;
  /**
   * Shows the `actions` at the end of the row. Figma `showActionButton`.
   * @default false
   */
  showActionButton?: boolean;
  /** Link or text button at the end of the row, such as "Forgot password". Figma `.Actions` instance. */
  actions?: ReactNode;
  /**
   * Shows a warning icon at the end of the row. Figma `showErrorIcon`.
   * @default false
   */
  showErrorIcon?: boolean;
  /** Supporting text under the label. Rendered only when set and `showHelperText` is `true`. Figma `helperText`. */
  helperText?: string;
  /**
   * Shows the `helperText`. Figma `showHelperText` (off by default there, but the text only renders
   * when you set it).
   * @default true
   */
  showHelperText?: boolean;
}

/**
 * The label above a form control, with optional required marker, help icon, action, error icon and
 * helper text. Built into TextField and the other inputs; use it on its own only when composing a
 * custom input.
 *
 * Builds on the Base UI `Field.Label` and `Field.Description`, so it must be placed inside a
 * `Field.Root`: it labels the field's control automatically and the helper text describes it. Styles
 * live in the `ThemeProvider` boundary; override with tokens or `::part(root)`.
 *
 * @example
 * ```tsx
 * <Field.Root>
 *   <FormLabel label="Email" required helperText="We never share it" />
 *   <Field.Control />
 * </Field.Root>
 * ```
 */
export const FormLabel = ({
  label,
  required = false,
  invalid = false,
  disabled = false,
  inverse = false,
  showHelpIcon = false,
  helpIcon,
  showActionButton = false,
  actions,
  showErrorIcon = false,
  helperText,
  showHelperText = true,
  className,
  style,
  part = 'root',
  ...props
}: FormLabelProps) => (
  <div
    className={cn('formLabelRoot', className)}
    style={style}
    // React's DOM types have no `part` attribute, so it is passed through a spread.
    {...{ part }}
    data-invalid={invalid ? '' : undefined}
    data-disabled={disabled ? '' : undefined}
    data-inverse={inverse ? '' : undefined}
  >
    <div className="formLabelRow">
      <div className="formLabelStart">
        <Field.Label {...props} className="formLabelLabel">
          {label}
          {required && (
            <span className="formLabelRequired" aria-hidden="true">
              {' *'}
            </span>
          )}
        </Field.Label>
        {showHelpIcon && (
          <span className="formLabelHelpIcon">{helpIcon ?? <HelpIcon className="formLabelIcon" aria-hidden />}</span>
        )}
      </div>
      {showActionButton && actions && <div className="formLabelActions">{actions}</div>}
      {showErrorIcon && (
        <span className="formLabelErrorIcon">
          <WarningIcon className="formLabelIcon" aria-hidden />
        </span>
      )}
    </div>
    {showHelperText && helperText && <Field.Description className="formLabelHelperText">{helperText}</Field.Description>}
  </div>
);
