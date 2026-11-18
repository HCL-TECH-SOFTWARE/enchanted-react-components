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
import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import { Field as BaseField } from '@base-ui/react/field';
import { useBoundary } from '../../theme/BoundaryContext';

/** Size of a {@link SelectSingle}. Maps to the Figma `size` property. */
export const SelectSingleSize = {
  /** The default size. */
  Medium: 'medium',
  /** A compact size for dense layouts. */
  Small: 'small',
} as const;

/** Union of the {@link SelectSingleSize} values. */
export type SelectSingleSizeType = (typeof SelectSingleSize)[keyof typeof SelectSingleSize];

/** Props of the {@link SelectSingle}. Extends the Base UI `Combobox.Root` props, which are passed through. */
export interface SelectSingleProps extends Omit<ReactComponentProps<typeof BaseCombobox.Root>, 'children'> {
  /** The popup content, usually a Base UI `Combobox.List` with its items. Replaces the Figma `menu` swap and `showMenu` toggle. */
  menu?: ReactNode;
  /** Text above the input. Replaces the Figma `FormLabel` instance and `showLabel` toggle. */
  label?: ReactNode;
  /** Supporting text below the input. Figma `helperText` with `showHelperText`. */
  helperText?: ReactNode;
  /** Text shown while the input is empty. Figma `placeholder`. */
  placeholder?: string;
  /** Content shown at the start of the input, for example a search icon. Figma `startAdornment` with `showStartAdornment`. */
  startAdornment?: ReactNode;
  /**
   * Size. Figma `size`.
   * @default SelectSingleSize.Medium
   */
  size?: SelectSingleSizeType;
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
}

/**
 * Lets users select a single option from a dropdown menu. Typing in the input filters the options,
 * so it covers both a select and an autocomplete. For several options, use SelectMultiple.
 *
 * Built on the Base UI `Combobox` and `Field`; the root props, including `value`, `items`,
 * `disabled`, and `readOnly` (Figma `nonEdit`), are passed through to it. The popup renders into the
 * `ThemeProvider` boundary so it keeps its styles. Styles live in the boundary and use the design
 * tokens, so render it inside a `ThemeProvider`.
 *
 * @example
 * ```tsx
 * <SelectSingle label="Fruit" items={['Apple', 'Pear']} menu={<Combobox.List>…</Combobox.List>} />
 * ```
 */
export const SelectSingle = ({
  menu,
  label,
  helperText,
  placeholder,
  startAdornment,
  size = SelectSingleSize.Medium,
  error = false,
  inverseColors = false,
  disabled,
  ...props
}: SelectSingleProps) => {
  const boundary = useBoundary();

  return (
    <BaseField.Root
      className="selectSingleRoot"
      disabled={disabled}
      invalid={error || undefined}
      // React's DOM types have no `part` attribute, so it is passed through a spread.
      {...{ part: 'root' }}
      data-size={size}
      data-inverse={inverseColors ? '' : undefined}
    >
      <BaseCombobox.Root {...props} disabled={disabled}>
        {label ? <BaseField.Label className="selectSingleLabel">{label}</BaseField.Label> : null}
        <div className="selectSingleSurface">
          {startAdornment ? <span className="selectSingleAdornment">{startAdornment}</span> : null}
          <BaseCombobox.Input className="selectSingleInput" placeholder={placeholder} />
        </div>
        {menu ? (
          // Base UI renders popups into `document.body` by default, outside the style boundary.
          <BaseCombobox.Portal container={boundary ?? undefined}>
            <BaseCombobox.Positioner className="selectSinglePositioner">
              <BaseCombobox.Popup className="selectSingleMenu">{menu}</BaseCombobox.Popup>
            </BaseCombobox.Positioner>
          </BaseCombobox.Portal>
        ) : null}
      </BaseCombobox.Root>
      {helperText ? <BaseField.Description className="selectSingleHelperText">{helperText}</BaseField.Description> : null}
    </BaseField.Root>
  );
};
