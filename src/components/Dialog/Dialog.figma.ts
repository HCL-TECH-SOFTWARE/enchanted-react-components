// url=https://www.figma.com/design/hSgxFly4e92zns5LJXAsNB/HCLED-Components-V3--POC-?node-id=1495-91831
// source=src/components/Dialog/Dialog.tsx
// component=Dialog
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

// Props follow the Figma component properties of `Dialog`; see `Dialog.tsx`.

import figma from 'figma'

const instance = figma.selectedInstance

// VARIANT properties: every Figma option is mapped explicitly.
const withPadding = instance.getEnum("withPadding", {
  True: true,
  False: false,
})
const scroll = instance.getEnum("scroll", {
  False: false,
  True: true,
})

// BOOLEAN and INSTANCE_SWAP: the header and footer are passed only while their toggle is on.
const showHeader = instance.getBoolean("showHeader")
const header = instance.getInstanceSwap("header")
const showFooter = instance.getBoolean("showFooter")
const footer = instance.getInstanceSwap("footer")

// SLOT: the freeform body of the dialog, rendered as children.
const content = instance.getSlot("content")

export default {
  example: figma.code`<Dialog${withPadding ? " withPadding" : ""}${
    scroll ? " scroll" : ""
  }${
    showHeader && header?.type === "INSTANCE"
      ? figma.code` header={${header.executeTemplate().example}}`
      : ""
  }${
    showFooter && footer?.type === "INSTANCE"
      ? figma.code` footer={${footer.executeTemplate().example}}`
      : ""
  }>
  ${content}
</Dialog>`,
  imports: ['import { Dialog } from "@hcl-software/enchanted-react-components"'],
  id: "dialog",
  metadata: {
    nestable: false,
  },
}
