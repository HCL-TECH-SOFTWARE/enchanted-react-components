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
import CloseIcon from '@hcl-software/enchanted-icons-react/carbon/es/close';
import { cn } from '../../utils/cn';
import { IconButton, IconButtonSize } from '../IconButton';

/** Props of the {@link DialogHeader}. Extends the props of a `div`, which are passed through. */
export interface DialogHeaderProps extends Omit<ReactComponentProps<'div'>, 'title'> {
  /** The title text. Figma `dialogTitle` with `showDialogTitle`; omit it to hide the title. */
  children?: ReactNode;
  /** Icon before the title. Replaces the Figma `icon` swap and `showIcon` toggle. */
  icon?: ReactNode;
  /** Actions before the close button, usually {@link IconButton}s. Replaces the Figma `action1` and `action2` swaps with `showActions`, `showAction1`, and `showAction2`. */
  actions?: ReactNode;
  /**
   * Shows the close button. Figma `showCloseIcon`.
   * @default true
   */
  showCloseIcon?: boolean;
  /**
   * Accessible name of the close button.
   * @default 'Close'
   */
  closeLabel?: string;
  /**
   * Shows a line below the header. Figma `showDivider`.
   * @default true
   */
  showDivider?: boolean;
}

/**
 * The header of a {@link Dialog}, with the title and a close button. Pass it as the `header` of
 * the dialog.
 *
 * Built on the Base UI `Dialog.Title` and `Dialog.Close`, so it must be rendered inside a
 * {@link Dialog}: the title names the dialog for assistive technology and the close button closes
 * it. The `div` it renders passes its other props through. Styles live in the `ThemeProvider`
 * boundary and use the design tokens, so render it inside a `ThemeProvider`.
 *
 * The Figma `showTabs`, `showAvatar`, and `showHelpIcon` options are not available yet.
 *
 * @example
 * ```tsx
 * <Dialog header={<DialogHeader>Delete item</DialogHeader>}>This cannot be undone.</Dialog>
 * ```
 */
export const DialogHeader = ({
  children,
  icon,
  actions,
  showCloseIcon = true,
  closeLabel = 'Close',
  showDivider = true,
  className,
  ...props
}: DialogHeaderProps) => (
  <div
    {...props}
    className={cn('dialogHeaderRoot', className)}
    // React's DOM types have no `part` attribute, so it is passed through a spread.
    {...{ part: 'root' }}
    data-with-divider={showDivider ? '' : undefined}
  >
    <div className="dialogHeaderContent">
      {children || icon ? (
        <div className="dialogHeaderTitleGroup">
          {icon ? <span className="dialogHeaderIcon">{icon}</span> : null}
          {children ? <BaseDialog.Title className="dialogHeaderTitle">{children}</BaseDialog.Title> : null}
        </div>
      ) : null}
      {actions || showCloseIcon ? (
        <div className="dialogHeaderEnd">
          {actions}
          {showCloseIcon ? (
            <BaseDialog.Close
              render={<IconButton icon={<CloseIcon />} size={IconButtonSize.Small} aria-label={closeLabel} />}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  </div>
);
