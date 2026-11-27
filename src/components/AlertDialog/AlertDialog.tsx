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

import type { ReactNode } from 'react';
import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import WarningAltIcon from '@hcl-software/enchanted-icons-react/carbon/es/warning--alt';
import { Button, ButtonColor, ButtonVariant } from '../Button';
import { Dialog } from '../Dialog';
import type { DialogProps } from '../Dialog';

/** Width of an {@link AlertDialog}. Maps to the Figma `size` property. */
export const AlertDialogSize = {
  /** 444px wide. Use for short confirmations. */
  ExtraSmall: 'extraSmall',
  /** 600px wide. Use when the message needs more room. */
  Small: 'small',
} as const;

/** Union of the {@link AlertDialogSize} values. */
export type AlertDialogSizeType = (typeof AlertDialogSize)[keyof typeof AlertDialogSize];

/**
 * Props of the {@link AlertDialog}. Extends the {@link Dialog} props (`open`, `defaultOpen`,
 * `onOpenChange`, `title`, `footer`, `showFooter`, `showHelpButton`, ...), which are passed
 * through. It leaves out what an alert dialog does not have: the close button, header actions,
 * modal and pointer-dismissal settings, and the larger sizes.
 */
export interface AlertDialogProps
  extends Omit<
    DialogProps,
    | 'size'
    | 'showClose'
    | 'closeLabel'
    | 'showHeaderActions'
    | 'headerActions'
    | 'modal'
    | 'disablePointerDismissal'
    | 'popupProps'
  > {
  /**
   * Width of the dialog.
   * @default AlertDialogSize.ExtraSmall
   */
  size?: AlertDialogSizeType;
  /**
   * Icon shown before the title while `showIcon` is on. Figma `icon`.
   * @default <WarningAltIcon />
   */
  icon?: ReactNode;
  /**
   * Shows `icon` before the title.
   * @default true
   */
  showIcon?: boolean;
}

/**
 * Interrupts the user with a decision they must answer before continuing, such as confirming a
 * destructive or irreversible action. It has no close button and a click outside does not dismiss
 * it: the user picks a footer action, and Esc acts as cancel. For dismissible content or tasks,
 * use {@link Dialog}. Keep the message short.
 *
 * It is a {@link Dialog} with `role="alertdialog"`, no close button, pointer dismissal off and the
 * Figma alert defaults, so props, styling and customization are the same as for Dialog. Custom
 * `footer` buttons do not close the dialog; update `open` yourself from their handlers.
 *
 * @example
 * ```tsx
 * <AlertDialog open={open} onOpenChange={setOpen} title="Delete file?">
 *   This cannot be undone.
 * </AlertDialog>
 * ```
 */
export const AlertDialog = ({
  size = AlertDialogSize.ExtraSmall,
  icon = <WarningAltIcon />,
  showIcon = true,
  footer,
  ...props
}: AlertDialogProps) => (
  <Dialog
    {...props}
    size={size}
    showClose={false}
    showIcon={showIcon}
    // Wrapped so the stylesheet can color it; the icon fill follows `currentColor`.
    icon={<span className="alertDialogIcon">{icon}</span>}
    disablePointerDismissal
    popupProps={{ role: 'alertdialog' }}
    footer={
      footer ?? (
        <>
          <BaseDialog.Close render={<Button variant={ButtonVariant.Text} color={ButtonColor.Neutral} />}>
            Cancel
          </BaseDialog.Close>
          <BaseDialog.Close render={<Button variant={ButtonVariant.Contained} color={ButtonColor.Error} />}>
            OK
          </BaseDialog.Close>
        </>
      )
    }
  />
);
