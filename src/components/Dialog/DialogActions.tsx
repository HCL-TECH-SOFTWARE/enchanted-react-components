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
import { cn } from '../../utils/cn';

/** Side of the footer the actions sit on. Maps to the Figma `actionAlignment` property. */
export const DialogActionsAlignment = {
  /** Actions at the end of the footer. The default; use it for the confirming action. */
  Right: 'right',
  /** Actions at the start of the footer. */
  Left: 'left',
} as const;

/** Union of the {@link DialogActionsAlignment} values. */
export type DialogActionsAlignmentType = (typeof DialogActionsAlignment)[keyof typeof DialogActionsAlignment];

/** Direction the actions are laid out in. Maps to the Figma `actionFlow` property. */
export const DialogActionsFlow = {
  /** Actions side by side. The default. */
  Horizontal: 'horizontal',
  /** Actions stacked, for narrow dialogs or long labels. */
  Vertical: 'vertical',
} as const;

/** Union of the {@link DialogActionsFlow} values. */
export type DialogActionsFlowType = (typeof DialogActionsFlow)[keyof typeof DialogActionsFlow];

/** Props of the {@link DialogActions}. Extends the props of a `div`, which are passed through. */
export interface DialogActionsProps extends ReactComponentProps<'div'> {
  /** The actions, usually Buttons. Figma `actions` slot. */
  children?: ReactNode;
  /**
   * Content before the actions, for example a label with a checkbox such as "Don't ask again". Replaces
   * the Figma `showLabelAndCheckbox`, `label`, `showLabel`, and `showCheckBox` properties: the
   * consumer owns the checkbox state, so it is passed in rather than rendered here.
   */
  startContent?: ReactNode;
  /**
   * Side of the footer the actions sit on. Figma `actionAlignment`.
   * @default DialogActionsAlignment.Right
   */
  alignment?: DialogActionsAlignmentType;
  /**
   * Direction the actions are laid out in. Figma `actionFlow`.
   * @default DialogActionsFlow.Horizontal
   */
  flow?: DialogActionsFlowType;
  /**
   * Shows a line above the actions. Figma `showDivider`.
   * @default true
   */
  showDivider?: boolean;
}

/**
 * The footer of a {@link Dialog}, holding the confirming and dismissing actions. Pass it as the
 * `footer` of the dialog.
 *
 * It has no Base UI primitive and renders a `div`, whose other props are passed through. It adds no
 * behavior: wire each action yourself, for example with a Base UI `Dialog.Close` around a
 * {@link Button} to dismiss. Styles live in the `ThemeProvider` boundary and use the design tokens,
 * so render it inside a `ThemeProvider`.
 *
 * @example
 * ```tsx
 * <DialogActions>
 *   <Button variant={ButtonVariant.Text}>Cancel</Button>
 *   <Button>Save</Button>
 * </DialogActions>
 * ```
 */
export const DialogActions = ({
  children,
  startContent,
  alignment = DialogActionsAlignment.Right,
  flow = DialogActionsFlow.Horizontal,
  showDivider = true,
  className,
  ...props
}: DialogActionsProps) => (
  <div
    {...props}
    className={cn('dialogActionsRoot', className)}
    // React's DOM types have no `part` attribute, so it is passed through a spread.
    {...{ part: 'root' }}
    data-alignment={alignment}
    data-flow={flow}
    data-with-divider={showDivider ? '' : undefined}
  >
    <div className="dialogActionsContent">
      {startContent ? <div className="dialogActionsStart">{startContent}</div> : null}
      <div className="dialogActionsActions">{children}</div>
    </div>
  </div>
);
