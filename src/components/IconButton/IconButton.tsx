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
import { Button as BaseButton } from '@base-ui/react/button';
import { cn } from '../../utils/cn';

/** Padding of an {@link IconButton}. Maps to the Figma `variant` property. */
export const IconButtonVariant = {
  /** Adds padding around the icon so the hit area is larger. The default. */
  WithPadding: 'withPadding',
  /** Only the icon, with no padding. Use it where the button must align optically, for example inside a field. */
  WithoutPadding: 'withoutPadding',
} as const;

/** Union of the {@link IconButtonVariant} values. */
export type IconButtonVariantType = (typeof IconButtonVariant)[keyof typeof IconButtonVariant];

/** Size of an {@link IconButton}. Maps to the Figma `size` property. */
export const IconButtonSize = {
  /** The default size. */
  Medium: 'medium',
  /** A compact size for dense layouts. */
  Small: 'small',
} as const;

/** Union of the {@link IconButtonSize} values. */
export type IconButtonSizeType = (typeof IconButtonSize)[keyof typeof IconButtonSize];

/** Props of the {@link IconButton}. Extends the Base UI `Button` props, which are passed through. */
export interface IconButtonProps extends Omit<ReactComponentProps<typeof BaseButton>, 'children'> {
  /** The icon. Replaces the Figma `icon` swap. */
  icon: ReactNode;
  /** Icon shown after the label. Replaces the Figma `endIcon` swap and `showEndIcon` toggle. */
  endIcon?: ReactNode;
  /** Optional text shown beside the icon. Omit it to hide the label (Figma `showLabel`). */
  children?: ReactNode;
  /**
   * Padding around the icon. Figma `variant`.
   * @default IconButtonVariant.WithPadding
   */
  variant?: IconButtonVariantType;
  /**
   * Size. Figma `size`.
   * @default IconButtonSize.Medium
   */
  size?: IconButtonSizeType;
  /**
   * Uses the colors made for dark backgrounds. Figma `inversecolors`.
   * @default false
   */
  inverseColors?: boolean;
  /**
   * Paints the button as selected. Figma `selected`. This is visual only: it sets `data-selected`
   * but not `aria-pressed`, so set that yourself for a toggle button.
   * @default false
   */
  selected?: boolean;
}

/**
 * Triggers an action with a single click, using an icon. Use it when space is limited and the icon
 * is commonly understood; otherwise use Button.
 *
 * Built on the Base UI `Button`; its props are passed through. Without a visible label, pass
 * `aria-label` so assistive technology can name the action. Styles live in the `ThemeProvider`
 * boundary and use the design tokens, so render it inside a `ThemeProvider`. Restyle it with
 * tokens, the `style` prop, or `::part(root)`.
 *
 * @example
 * ```tsx
 * <IconButton icon={<AddIcon />} aria-label="Add" />
 * ```
 */
export const IconButton = ({
  icon,
  endIcon,
  variant = IconButtonVariant.WithPadding,
  size = IconButtonSize.Medium,
  inverseColors = false,
  selected = false,
  className,
  children,
  ...props
}: IconButtonProps) => (
  <BaseButton
    {...props}
    // Base UI accepts a class name or a function of its state; both are merged after the root class.
    className={(state) => cn('iconButtonRoot', typeof className === 'function' ? className(state) : className)}
    // React's DOM types have no `part` attribute, so it is passed through a spread.
    {...{ part: 'root' }}
    data-variant={variant}
    data-size={size}
    data-inverse={inverseColors ? '' : undefined}
    data-selected={selected ? '' : undefined}
  >
    <span className="iconButtonIcon">{icon}</span>
    {children ? <span className="iconButtonLabel">{children}</span> : null}
    {endIcon ? <span className="iconButtonIcon">{endIcon}</span> : null}
  </BaseButton>
);
