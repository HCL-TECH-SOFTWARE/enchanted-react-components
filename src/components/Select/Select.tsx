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

import type { CSSProperties, ReactNode } from 'react';
import { Field } from '@base-ui/react/field';
import { Select as BaseSelect } from '@base-ui/react/select';
import CaretDownIcon from '@hcl-software/enchanted-icons-react/carbon/es/caret--down';
import CaretUpIcon from '@hcl-software/enchanted-icons-react/carbon/es/caret--up';
import WarningIcon from '@hcl-software/enchanted-icons-react/carbon/es/warning';
import { cn } from '../../utils/cn';
import { usePortalContainer } from '../../theme/PortalContainerContext';
import { FormLabel } from '../FormLabel';
import type { FormLabelProps } from '../FormLabel';
import { SelectItem } from './SelectItem';

/** Height of a {@link Select}. Maps to the Figma `size` property. */
export const SelectSize = {
  /** Default size, 36px high. */
  Medium: 'medium',
  /** Compact size, 24px high. */
  Small: 'small',
} as const;

/** Union of the {@link SelectSize} values. */
export type SelectSizeType = (typeof SelectSize)[keyof typeof SelectSize];

/** One entry of the Select `options` prop. */
export interface SelectOption {
  /** Value reported to `onValueChange` and submitted with a form. */
  value: string;
  /** Text shown in the list and in the trigger once chosen. */
  label: string;
  /** Blocks choosing this option. */
  disabled?: boolean;
}

/**
 * Props of the {@link Select}. Extends the Base UI `Select.Root` props for a single string value, so
 * `value`, `defaultValue`, `onValueChange`, `open`, `defaultOpen`, `onOpenChange`, `name` and `form`
 * work as documented there. The Figma `state` (default, hover, focus) and `filled` properties are CSS
 * states, not props.
 */
export interface SelectProps
  extends Omit<
    BaseSelect.Root.Props<string, false>,
    'children' | 'items' | 'multiple' | 'disabled' | 'readOnly' | 'required' | 'inputRef'
  > {
  /** Extra class name for the root element. */
  className?: string;
  /** Inline style for the root element. */
  style?: CSSProperties;
  /**
   * Height of the field: `medium` (36px) or `small` (24px).
   * @default SelectSize.Medium
   */
  size?: SelectSizeType;
  /**
   * Uses light colors so the field stays readable on a dark or colored background. The popup keeps
   * its normal colors. Figma `inverse`.
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
   * Shows the chosen option without a border or fill, and cannot be changed or opened. Figma `readOnly`.
   * @default false
   */
  readOnly?: boolean;
  /**
   * Marks the field as required for form validation and shows an asterisk after the `label`.
   * @default false
   */
  required?: boolean;
  /** Hint shown, in italic, while no option is chosen. Figma `placeholder`. */
  placeholder?: string;
  /**
   * The options, as values with labels. Not a Figma property: Figma shows the list as the `menu`
   * instance, and this prop builds that list for the common case. Ignored when `menu` is set.
   */
  options?: ReadonlyArray<SelectOption>;
  /**
   * Content of the popup list, replacing the list built from `options`; use {@link SelectItem}s.
   * Figma `menu` (instance swap). The labels in `options` are still used for the trigger text.
   */
  menu?: ReactNode;
  /**
   * Shows the caret at the end of the field. A read-only field never shows it. Figma `showIcon`.
   * @default true
   */
  showIcon?: boolean;
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
  /**
   * Extra options of the label, which is a {@link FormLabel}: the help icon, an action, an error icon
   * and helper text under the label. The label text, `required`, `invalid`, `disabled` and `inverse`
   * come from the field's own props.
   */
  labelProps?: Omit<FormLabelProps, 'label' | 'required' | 'invalid' | 'disabled' | 'inverse' | 'part'>;
  /** Supporting text under the field. Rendered only when set and `showHelperText` is `true`. Figma `helperText`. */
  helperText?: string;
  /**
   * Shows the `helperText`. Figma `showHelperText` (off by default there, but the text only renders
   * when you set it).
   * @default true
   */
  showHelperText?: boolean;
  /** Message shown under the field while `invalid` is `true`. Ignored otherwise. */
  errorMessage?: string;
  /**
   * Shows the `errorMessage` while `invalid` is `true`.
   * @default true
   */
  showErrorMessage?: boolean;
  /** Accessible name of the field when there is no visible `label`. */
  'aria-label'?: string;
}

/**
 * Lets a user choose one option from a list in a popup. Use it for a fixed set of choices; use a
 * TextField when the user types the value.
 *
 * Builds on the Base UI `Select`: the label, helper text and error message are linked to the trigger
 * automatically. Styles live in the `ThemeProvider` boundary, and the popup renders inside it too;
 * override with tokens or `::part(root)`. Hover and focus appearances (the Figma `state` property) and
 * `filled` are CSS states, not props.
 *
 * @example
 * ```tsx
 * <Select
 *   label="Fruit"
 *   placeholder="Choose a fruit"
 *   options={[{ value: 'apple', label: 'Apple' }, { value: 'pear', label: 'Pear' }]}
 * />
 * ```
 */
export const Select = ({
  size = SelectSize.Medium,
  inverse = false,
  invalid = false,
  disabled = false,
  readOnly = false,
  required = false,
  placeholder,
  options,
  menu,
  showIcon = true,
  label,
  showLabel = true,
  labelProps,
  helperText,
  showHelperText = true,
  errorMessage,
  showErrorMessage = true,
  className,
  style,
  'aria-label': ariaLabel,
  ...props
}: SelectProps) => {
  const container = usePortalContainer();
  const hasLabel = showLabel && Boolean(label);
  const hasHelper = showHelperText && Boolean(helperText);
  const hasError = invalid && showErrorMessage && Boolean(errorMessage);

  return (
    <Field.Root
      className={cn('selectRoot', className)}
      style={style}
      // React's DOM types have no `part` attribute, so it is passed through a spread.
      {...{ part: 'root' }}
      invalid={invalid}
      disabled={disabled}
      data-size={size}
      data-inverse={inverse ? '' : undefined}
      data-read-only={readOnly ? '' : undefined}
    >
      <BaseSelect.Root {...props} items={options} disabled={disabled} readOnly={readOnly} required={required}>
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
        <BaseSelect.Trigger className="selectTrigger" aria-label={ariaLabel}>
          <BaseSelect.Value className="selectValue" placeholder={placeholder} />
          {invalid && (
            <span className="selectErrorIcon">
              <WarningIcon className="selectIcon" aria-hidden />
            </span>
          )}
          {showIcon && !readOnly && (
            <BaseSelect.Icon className="selectCaret">
              <CaretDownIcon className="selectIcon selectCaretDown" aria-hidden />
              <CaretUpIcon className="selectIcon selectCaretUp" aria-hidden />
            </BaseSelect.Icon>
          )}
        </BaseSelect.Trigger>
        {/* `null` means "no provider yet" and would render the popup nowhere; `undefined` falls back to document.body. */}
        <BaseSelect.Portal container={container ?? undefined}>
          <BaseSelect.Positioner sideOffset={0} alignItemWithTrigger={false} className="selectPositioner">
            <BaseSelect.Popup className="selectPopup" data-size={size}>
              <BaseSelect.List className="selectList">
                {menu ??
                  options?.map((option) => (
                    <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
                      {option.label}
                    </SelectItem>
                  ))}
              </BaseSelect.List>
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>
      {hasHelper && <Field.Description className="selectHelperText">{helperText}</Field.Description>}
      {hasError && (
        <Field.Error className="selectErrorMessage" match>
          {errorMessage}
        </Field.Error>
      )}
    </Field.Root>
  );
};
