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
import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { usePortalContainer } from '../../theme/PortalContainerContext';

/** Width of a {@link Dialog}, matching the Figma widths. The dialog never grows wider than the viewport. */
export const DialogSize = {
  /** 444 pixels. */
  ExtraSmall: 'xs',
  /** 600 pixels. The default. */
  Small: 'sm',
  /** 960 pixels. */
  Medium: 'md',
  /** 1280 pixels. */
  Large: 'lg',
  /** 1920 pixels. */
  ExtraLarge: 'xl',
} as const;

/** Union of the {@link DialogSize} values. */
export type DialogSizeType = (typeof DialogSize)[keyof typeof DialogSize];

/** Props of the {@link Dialog}. Extends the Base UI `Dialog.Root` props, which are passed through. */
export interface DialogProps extends ReactComponentProps<typeof BaseDialog.Root> {
  /**
   * Width of the dialog. Figma dialog widths XS to XL.
   * @default DialogSize.Small
   */
  size?: DialogSizeType;
  /** The dialog body. Figma `content` slot. */
  children?: ReactNode;
  /** Content above the body, usually a {@link DialogHeader}. Replaces the Figma `header` swap and `showHeader` toggle. */
  header?: ReactNode;
  /** Content below the body, usually the actions. Replaces the Figma `footer` swap and `showFooter` toggle. */
  footer?: ReactNode;
  /**
   * Adds padding around the body. Figma `withPadding`.
   * @default true
   */
  withPadding?: boolean;
  /**
   * Scrolls the body when it is taller than the dialog. Figma `scroll`.
   * @default false
   */
  scroll?: boolean;
}

/**
 * Appears in front of the app content to provide critical information or ask for a decision.
 *
 * Built on the Base UI `Dialog`; the root props, including `open`, `defaultOpen`, and
 * `onOpenChange`, are passed through to it. Put a {@link DialogHeader} (or a Base UI `Dialog.Title`) in `header` so the dialog
 * has an accessible name. The dialog renders into the `ThemeProvider` boundary so it keeps its
 * styles. Styles live in the boundary and use the design tokens, so render it inside a
 * `ThemeProvider`.
 *
 * @example
 * ```tsx
 * <Dialog open onOpenChange={setOpen} header={<DialogHeader>Delete item</DialogHeader>}>
 *   This cannot be undone.
 * </Dialog>
 * ```
 */
export const Dialog = ({
  children,
  header,
  footer,
  size = DialogSize.Small,
  withPadding = true,
  scroll = false,
  ...props
}: DialogProps) => {
  const portalContainer = usePortalContainer();

  return (
    <BaseDialog.Root {...props}>
      {/* Base UI renders popups into `document.body` by default, outside the style boundary. */}
      <BaseDialog.Portal container={portalContainer ?? undefined}>
        <BaseDialog.Backdrop className="dialogBackdrop" />
        <BaseDialog.Popup
          className="dialogRoot"
          // React's DOM types have no `part` attribute, so it is passed through a spread.
          {...{ part: 'root' }}
          data-size={size}
          data-with-padding={withPadding ? '' : undefined}
          data-scroll={scroll ? '' : undefined}
        >
          {header ? <div className="dialogHeader">{header}</div> : null}
          <div className="dialogContent">{children}</div>
          {footer ? <div className="dialogFooter">{footer}</div> : null}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
};
