// url=https://www.figma.com/design/hSgxFly4e92zns5LJXAsNB/HCLED-Components-V3--POC-?node-id=1495-83049
// source=src/components/Dialog/DialogHeader.tsx
// component=DialogHeader
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

// Props follow the Figma component properties of `DialogTitle`; see `DialogHeader.tsx`.

import figma from 'figma'

const instance = figma.selectedInstance

// TEXT and BOOLEAN: the title is rendered as children only while `showDialogTitle` is on.
const dialogTitle = instance.getString("dialogTitle")
const showDialogTitle = instance.getBoolean("showDialogTitle")

// BOOLEAN: the close button and divider are on by default, so only turning them off is written out.
const showCloseIcon = instance.getBoolean("showCloseIcon")
const showDivider = instance.getBoolean("showDivider")

// BOOLEAN and INSTANCE_SWAP: the icon is passed only while `showIcon` is on.
const showIcon = instance.getBoolean("showIcon")
const icon = instance.getInstanceSwap("icon")

// Not mapped:
// - `showActions`, `showAction1`, `showAction2`, `action1`, `action2`: the code takes the actions as
//   one `actions` ReactNode, so the template does not reproduce the two swaps.
// - `showTabs`, `showAvatar`, `showHelpIcon`: Tabs and Avatar are not in the first-release scope and
//   the help icon has no approved specification yet.

export default {
  example: figma.code`<DialogHeader${showCloseIcon ? "" : " showCloseIcon={false}"}${
    showDivider ? "" : " showDivider={false}"
  }${
    showIcon && icon?.type === "INSTANCE" && icon.hasCodeConnect()
      ? figma.code` icon={${icon.executeTemplate().example}}`
      : ""
  }>
  ${showDialogTitle ? dialogTitle : ""}
</DialogHeader>`,
  imports: ['import { DialogHeader } from "@hcl-software/enchanted-react-components"'],
  id: "dialog-header",
  metadata: {
    nestable: true,
  },
}
