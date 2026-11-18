// url=https://www.figma.com/design/hSgxFly4e92zns5LJXAsNB/HCLED-Components-V3--POC-?node-id=19459-175387
// source=src/components/Dialog/DialogActions.tsx
// component=DialogActions
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

// Props follow the Figma component properties of `DialogActions`; see `DialogActions.tsx`.

import figma from 'figma'

const instance = figma.selectedInstance

// VARIANT properties: every Figma option is mapped explicitly.
const alignment = instance.getEnum("actionAlignment", {
  right: "right",
  left: "left",
})
const flow = instance.getEnum("actionFlow", {
  horizontal: "horizontal",
  vertical: "vertical",
})

// BOOLEAN: the divider is on by default, so only turning it off is written out.
const showDivider = instance.getBoolean("showDivider")

// SLOT: the actions, rendered as children.
const actions = instance.getSlot("actions")

// `showLabelAndCheckbox`, `label`, `showLabel`, and `showCheckBox` are intentionally not mapped:
// the checkbox needs consumer state, so the code takes the whole group as `startContent`.

export default {
  example: figma.code`<DialogActions alignment="${alignment}" flow="${flow}"${
    showDivider ? "" : " showDivider={false}"
  }>
  ${actions}
</DialogActions>`,
  imports: ['import { DialogActions } from "@hcl-software/enchanted-react-components"'],
  id: "dialog-actions",
  metadata: {
    nestable: true,
  },
}
