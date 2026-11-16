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

/** Visual emphasis of a {@link Button}. Maps to the Figma `variant` property. */
export const ButtonVariant = {
  /** Filled background. Use for the primary action of a view. */
  Contained: 'contained',
  /** Stroke without a fill. Use for secondary actions. */
  Outlined: 'outlined',
  /** No fill and no stroke. Use for low-emphasis actions. */
  Text: 'text',
} as const;

/** Union of the {@link ButtonVariant} values. */
export type ButtonVariantType = (typeof ButtonVariant)[keyof typeof ButtonVariant];

/** Color role of a {@link Button}. Maps to the Figma `color` property. */
export const ButtonColor = {
  /** The brand color. Use for the main action. */
  Primary: 'primary',
  /** A neutral, text-colored button. Use for actions that are not tied to the brand. */
  Neutral: 'neutral',
  /** Use for destructive or error-related actions. */
  Error: 'error',
} as const;

/** Union of the {@link ButtonColor} values. */
export type ButtonColorType = (typeof ButtonColor)[keyof typeof ButtonColor];

/** Size of a {@link Button}. Maps to the Figma `size` property. */
export const ButtonSize = {
  /** The default size. */
  Medium: 'medium',
  /** A compact size for dense layouts. */
  Small: 'small',
} as const;

/** Union of the {@link ButtonSize} values. */
export type ButtonSizeType = (typeof ButtonSize)[keyof typeof ButtonSize];

/** Props of the {@link Button}. Extends the Base UI `Button` props, which are passed through. */
export interface ButtonProps extends ReactComponentProps<typeof BaseButton> {
  /**
   * Visual emphasis. Figma `variant`.
   * @default ButtonVariant.Contained
   */
  variant?: ButtonVariantType;
  /**
   * Color role. Figma `color`. The `error` color has no `selected` design.
   * @default ButtonColor.Primary
   */
  color?: ButtonColorType;
  /**
   * Size. Figma `size`.
   * @default ButtonSize.Medium
   */
  size?: ButtonSizeType;
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
  /** Icon shown before the label. Replaces the Figma `startIcon` swap and `showStartIcon` toggle. */
  startIcon?: ReactNode;
  /** Icon shown after the label. Replaces the Figma `endIcon` swap and `showEndIcon` toggle. */
  endIcon?: ReactNode;
}

/**
 * Triggers an action with a single click. For icon-only actions, use IconButton.
 *
 * Built on the Base UI `Button`; its props are passed through. Styles live in the `ThemeProvider`
 * boundary and use the design tokens, so render it inside a `ThemeProvider`. Restyle it with tokens,
 * the `style` prop, or `::part(root)`. The label is `children`; omit it to hide the label
 * (Figma `showLabel`).
 *
 * @example
 * ```tsx
 * <Button variant={ButtonVariant.Outlined} color={ButtonColor.Neutral}>Save</Button>
 * ```
 */
export const Button = ({
  variant = ButtonVariant.Contained,
  color = ButtonColor.Primary,
  size = ButtonSize.Medium,
  inverseColors = false,
  selected = false,
  startIcon,
  endIcon,
  className,
  children,
  ...props
}: ButtonProps) => (
  <BaseButton
    {...props}
    // Base UI accepts a class name or a function of its state; both are merged after the root class.
    className={(state) => cn('buttonRoot', typeof className === 'function' ? className(state) : className)}
    // React's DOM types have no `part` attribute, so it is passed through a spread.
    {...{ part: 'root' }}
    data-variant={variant}
    data-color={color}
    data-size={size}
    data-inverse={inverseColors ? '' : undefined}
    data-selected={selected ? '' : undefined}
  >
    {startIcon ? <span className="buttonIcon">{startIcon}</span> : null}
    {children ? <span className="buttonLabel">{children}</span> : null}
    {endIcon ? <span className="buttonIcon">{endIcon}</span> : null}
  </BaseButton>
);
