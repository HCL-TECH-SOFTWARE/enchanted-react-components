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

import type { ComponentProps, ReactNode } from 'react';
import { Button as BaseButton } from '@base-ui/react/button';
import { cn } from '../../utils/cn';

/** Visual emphasis of a {@link Button}. Maps to the Figma `variant` property. */
export const ButtonVariant = {
  /** Filled. Use for the primary action of a view. */
  Contained: 'contained',
  /** Outlined. Use for secondary actions. */
  Outlined: 'outlined',
  /** Text only. Use for low-emphasis actions. */
  Text: 'text',
} as const;

/** Union of the {@link ButtonVariant} values. */
export type ButtonVariantType = (typeof ButtonVariant)[keyof typeof ButtonVariant];

/** Color role of a {@link Button}. Maps to the Figma `color` property. */
export const ButtonColor = {
  /** Brand color. */
  Brand: 'brand',
  /** Neutral color. */
  Neutral: 'neutral',
  /** Error color, for destructive or failed actions. */
  Error: 'error',
} as const;

/** Union of the {@link ButtonColor} values. */
export type ButtonColorType = (typeof ButtonColor)[keyof typeof ButtonColor];

/** Size of a {@link Button}. Maps to the Figma `size` property. */
export const ButtonSize = {
  /** Default size, 36px high. */
  Medium: 'medium',
  /** Compact size, 24px high. */
  Small: 'small',
  /**
   * 16px high with no padding. Figma defines it for the text variant only, for inline actions next
   * to field labels and inside inputs. Keep a 24×24px target or 24px clearance to other targets
   * (WCAG 2.5.8).
   */
  ExtraSmall: 'extraSmall',
} as const;

/** Union of the {@link ButtonSize} values. */
export type ButtonSizeType = (typeof ButtonSize)[keyof typeof ButtonSize];

/**
 * Props of the {@link Button}. Extends the Base UI `Button` props, so `onClick`, `type`, `disabled`
 * and `aria-*` work as on a native button. The label is `children`. Hover, focus and active looks
 * are applied automatically and have no prop.
 */
export interface ButtonProps extends ComponentProps<typeof BaseButton> {
  /**
   * How strongly the button stands out: `contained` (filled), `outlined` (border only) or `text`
   * (no fill or border).
   * @default ButtonVariant.Contained
   */
  variant?: ButtonVariantType;
  /**
   * Color of the button: `brand` for normal actions, `neutral` for quiet ones, `error` for
   * destructive ones.
   * @default ButtonColor.Brand
   */
  color?: ButtonColorType;
  /**
   * Height of the button: `medium` (36px), `small` (24px) or `extraSmall` (16px, text variant only).
   * @default ButtonSize.Medium
   */
  size?: ButtonSizeType;
  /**
   * Uses light colors so the button stays readable on a dark or colored background.
   * @default false
   */
  inverse?: boolean;
  /**
   * Makes the button a toggle: `true` shows it switched on and `false` switched off, and both set
   * `aria-pressed`. Leave it out for a normal action button.
   */
  pressed?: boolean;
  /**
   * Icon shown before the label. Omit it to show none. When `iconButton` is `true`, this is ignored
   * and `icon` is used instead.
   */
  startIcon?: ReactNode;
  /**
   * Icon shown after the label. Omit it to show none. When `iconButton` is `true`, this is ignored
   * and `icon` is used instead.
   */
  endIcon?: ReactNode;
  /**
   * Label of the button. A button with an icon and no label needs an `aria-label`.
   */
  children?: ReactNode;
  /**
   * Displays only an icon in a square button (36×36px by default) with no label. When `true`,
   * the `icon` prop is required and `aria-label` must be provided for accessibility. The button
   * will be square regardless of the `size` prop: `medium` = 36×36px, `small` = 24×24px,
   * `extraSmall` = 16×16px.
   * @default false
   */
  iconButton?: boolean;
  /**
   * Icon displayed in the center of the button when `iconButton` is `true`. Ignored when
   * `iconButton` is `false` or not set.
   */
  icon?: ReactNode;
}

/**
 * Triggers an action when clicked, such as saving a form or opening a dialog. Use it for actions
 * on the current page; it does not render a link.
 *
 * It builds on the Base UI `Button`, which receives all other props. Restyle it with design
 * tokens, the `style` prop, or `::part(root)` on the `ThemeProvider` host.
 *
 * @example
 * ```tsx
 * <Button variant={ButtonVariant.Outlined} onClick={save}>Save</Button>
 * ```
 *
 * @example
 * ```tsx
 * // Icon-only button (36×36px square, requires aria-label)
 * <Button iconButton icon={<AddIcon />} aria-label="Add item" />
 * ```
 */
export const Button = ({
  variant = ButtonVariant.Contained,
  color = ButtonColor.Brand,
  size = ButtonSize.Medium,
  inverse = false,
  pressed,
  startIcon,
  endIcon,
  children,
  iconButton = false,
  icon,
  className,
  ...props
}: ButtonProps) => (
  <BaseButton
    {...props}
    // React's DOM types have no `part` attribute, so it is passed through a spread.
    {...{ part: 'root' }}
    // Base UI accepts a function for `className`, so the class is merged into either form.
    className={
      typeof className === 'function'
        ? (state) => cn('buttonRoot', iconButton && 'buttonIconButton', className(state))
        : cn('buttonRoot', iconButton && 'buttonIconButton', className)
    }
    aria-pressed={pressed}
    data-variant={variant}
    data-color={color}
    data-size={size}
    data-inverse={inverse || undefined}
    data-pressed={pressed || undefined}
  >
    {iconButton ? (
      icon && <span className="buttonIcon">{icon}</span>
    ) : (
      <>
        {startIcon && <span className="buttonStartIcon">{startIcon}</span>}
        {children && <span className="buttonLabel">{children}</span>}
        {endIcon && <span className="buttonEndIcon">{endIcon}</span>}
      </>
    )}
  </BaseButton>
);
