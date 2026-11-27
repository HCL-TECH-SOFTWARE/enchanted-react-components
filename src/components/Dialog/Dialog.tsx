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
import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { ScrollArea } from '@base-ui/react/scroll-area';
import CloseIcon from '@hcl-software/enchanted-icons-react/carbon/es/close';
import HelpIcon from '@hcl-software/enchanted-icons-react/carbon/es/help';
import { usePortalContainer } from '../../theme/PortalContainerContext';
import { Button, ButtonColor, ButtonVariant } from '../Button';

/** Width of a {@link Dialog}. Maps to the Figma `size` property. */
export const DialogSize = {
  /** 444px wide. Use for short confirmations or a single field. */
  ExtraSmall: 'extraSmall',
  /** 600px wide. Use for simple forms and details. */
  Small: 'small',
  /** 960px wide. Use for richer forms and settings. */
  Medium: 'medium',
  /** 1280px wide. Use for dense content such as tables. */
  Large: 'large',
  /** 1920px wide and full screen high. Use for immersive tasks. */
  ExtraLarge: 'extraLarge',
} as const;

/** Union of the {@link DialogSize} values. */
export type DialogSizeType = (typeof DialogSize)[keyof typeof DialogSize];

/**
 * Props of the {@link Dialog}. Extends the Base UI `Dialog.Root` props (`open`, `defaultOpen`,
 * `onOpenChange`, `modal`, ...), which are passed through. The dialog content is `children`.
 * The Figma `scrollPosition` property has no prop: it follows the scroll state of the content.
 */
export interface DialogProps extends Omit<ComponentProps<typeof BaseDialog.Root>, 'children'> {
  /**
   * Width of the dialog.
   * @default DialogSize.Small
   */
  size?: DialogSizeType;
  /** Title text, rendered as the dialog heading. Figma `title`. */
  title?: string;
  /** Body of the dialog. It is the accessible description. Figma `content`. */
  children?: ReactNode;
  /**
   * Footer content, usually buttons. Omit it for the default Cancel and OK buttons.
   * Figma `footer`.
   */
  footer?: ReactNode;
  /** Actions shown at the end of the header, before the close button. Figma `headerActions`. */
  headerActions?: ReactNode;
  /** Icon shown before the title while `showIcon` is on. Figma `icon`. */
  icon?: ReactNode;
  /**
   * Shows the close button in the header. It sets no accessible name by itself, see `closeLabel`.
   * @default true
   */
  showClose?: boolean;
  /**
   * Shows the footer.
   * @default true
   */
  showFooter?: boolean;
  /**
   * Shows `headerActions`.
   * @default false
   */
  showHeaderActions?: boolean;
  /**
   * Shows a help button next to the title. Pass `onHelpClick` to react to it.
   * @default false
   */
  showHelpButton?: boolean;
  /**
   * Shows `icon` before the title.
   * @default false
   */
  showIcon?: boolean;
  /** Called when the help button is clicked. */
  onHelpClick?: () => void;
  /**
   * Accessible name of the close button. Not a Figma property; it exists so the label can be translated.
   * @default 'Close'
   */
  closeLabel?: string;
  /**
   * Accessible name of the help button. Not a Figma property; it exists so the label can be translated.
   * @default 'Help'
   */
  helpLabel?: string;
  /** Class name for the dialog popup. */
  className?: string;
}

/**
 * Shows focused content or a task in front of the page, such as a form, settings or details.
 * Users dismiss it with the close button, Esc or a click outside. For a decision that must be
 * answered before continuing, use AlertDialog instead.
 *
 * It builds on the Base UI `Dialog`; open state props are passed through. It renders into the
 * `ThemeProvider` boundary so it keeps its tokens and styles. Restyle it with tokens, the
 * `className` prop, or `::part(root)` on the `ThemeProvider` host.
 *
 * @example
 * ```tsx
 * <Dialog open={open} onOpenChange={setOpen} title="Rename file">
 *   <input aria-label="Name" />
 * </Dialog>
 * ```
 */
export const Dialog = ({
  size = DialogSize.Small,
  title,
  children,
  footer,
  headerActions,
  icon,
  showClose = true,
  showFooter = true,
  showHeaderActions = false,
  showHelpButton = false,
  showIcon = false,
  onHelpClick,
  closeLabel = 'Close',
  helpLabel = 'Help',
  className,
  ...rootProps
}: DialogProps) => {
  // Null before the provider has mounted, or without one. Base UI treats an explicit `null` as
  // "render nowhere", so it is passed as `undefined` to fall back to `document.body`.
  const container = usePortalContainer() ?? undefined;

  return (
    <BaseDialog.Root {...rootProps}>
      <BaseDialog.Portal container={container}>
        <BaseDialog.Backdrop className="dialogBackdrop" />
        <BaseDialog.Popup
          // React's DOM types have no `part` attribute, so it is passed through a spread.
          {...{ part: 'root' }}
          className={['dialogRoot', className].filter(Boolean).join(' ')}
          data-size={size}
        >
          <div className="dialogHeader">
            <div className="dialogTitleGroup">
              {showIcon && icon && <span className="dialogIcon">{icon}</span>}
              {/* The icon and help button sit beside the title so they stay out of the heading. */}
              <div className="dialogTitleWithHelp">
                <BaseDialog.Title className="dialogTitle">{title}</BaseDialog.Title>
                {showHelpButton && (
                  <Button
                    variant={ButtonVariant.Text}
                    color={ButtonColor.Neutral}
                    aria-label={helpLabel}
                    startIcon={<HelpIcon />}
                    onClick={onHelpClick}
                  />
                )}
              </div>
            </div>
            {showHeaderActions && headerActions && (
              <div className="dialogHeaderActions">{headerActions}</div>
            )}
            {showClose && (
              <BaseDialog.Close
                render={
                  <Button
                    variant={ButtonVariant.Text}
                    color={ButtonColor.Neutral}
                    aria-label={closeLabel}
                    startIcon={<CloseIcon />}
                  />
                }
              />
            )}
          </div>
          {/* Overflow data attributes on this root drive the scroll dividers in the stylesheet. */}
          <ScrollArea.Root className="dialogScrollArea">
            <ScrollArea.Viewport className="dialogViewport">
              <ScrollArea.Content>
                <BaseDialog.Description render={<div />} className="dialogContent">
                  {children}
                </BaseDialog.Description>
              </ScrollArea.Content>
            </ScrollArea.Viewport>
          </ScrollArea.Root>
          {showFooter && (
            <div className="dialogFooter">
              {footer ?? (
                <>
                  <BaseDialog.Close
                    render={<Button variant={ButtonVariant.Text} color={ButtonColor.Neutral} />}
                  >
                    Cancel
                  </BaseDialog.Close>
                  <BaseDialog.Close render={<Button variant={ButtonVariant.Contained} />}>
                    OK
                  </BaseDialog.Close>
                </>
              )}
            </div>
          )}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
};
