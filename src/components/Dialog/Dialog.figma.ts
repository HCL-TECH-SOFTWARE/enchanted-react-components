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

import figma from 'figma'

const instance = figma.selectedInstance

// VARIANT: every Figma option is mapped explicitly.
const size = instance.getEnum('size', {
  extraSmall: 'extraSmall',
  small: 'small',
  medium: 'medium',
  large: 'large',
  extraLarge: 'extraLarge',
})

// The `scrollPosition` VARIANT (none, top, middle, bottom) is intentionally not mapped: it is the
// scroll state of the content, driven by Base UI ScrollArea data attributes and CSS.

// TEXT, BOOLEAN and INSTANCE_SWAP: the Figma property names are as reported by Figma MCP.
const title = instance.getString('title')
const showClose = instance.getBoolean('showClose')
const showFooter = instance.getBoolean('showFooter')
const showHeaderActions = instance.getBoolean('showHeaderActions')
const showHelpButton = instance.getBoolean('showHelpButton')
const showIcon = instance.getBoolean('showIcon')

export default {
  example: figma.code`<Dialog
  open={open}
  onOpenChange={setOpen}
  size="${size}"
  title="${title}"
  showClose={${showClose}}
  showFooter={${showFooter}}
  showHeaderActions={${showHeaderActions}}
  showHelpButton={${showHelpButton}}
  showIcon={${showIcon}}
>
  Content
</Dialog>`,
  imports: ['import { Dialog } from "@hcl-software/enchanted-react-components"'],
  id: 'dialog',
}
