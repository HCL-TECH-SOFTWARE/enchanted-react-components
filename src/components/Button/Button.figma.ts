// url=https://www.figma.com/design/hSgxFly4e92zns5LJXAsNB/HCLED-Components-V3--POC-?node-id=1338-465763
// source=src/components/Button/Button.tsx
// component=Button
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

// VARIANT properties: every Figma option is mapped explicitly.
const variant = instance.getEnum("variant", {
  contained: "contained",
  outlined: "outlined",
  text: "text",
})
const color = instance.getEnum("color", {
  primary: "primary",
  neutral: "neutral",
  error: "error",
})
const size = instance.getEnum("size", {
  medium: "medium",
  small: "small",
})
const disabled = instance.getEnum("disabled", {
  False: false,
  True: true,
})
const inverseColors = instance.getEnum("inversecolors", {
  False: false,
  True: true,
})
const selected = instance.getEnum("selected", {
  False: false,
  True: true,
})

// The `state` VARIANT (default, hover, focus, hover & focus) is intentionally not mapped:
// hover and focus are CSS states, not component props.

// TEXT and BOOLEAN: the label is rendered as children only while `showLabel` is on.
const label = instance.getString("label")
const showLabel = instance.getBoolean("showLabel")

// BOOLEAN and INSTANCE_SWAP: an icon is passed only while its `show…Icon` toggle is on.
const showStartIcon = instance.getBoolean("showStartIcon")
const startIcon = instance.getInstanceSwap("startIcon")
const showEndIcon = instance.getBoolean("showEndIcon")
const endIcon = instance.getInstanceSwap("endIcon")

export default {
  example: figma.code`<Button variant="${variant}" color="${color}" size="${size}"${
    disabled ? " disabled" : ""
  }${inverseColors ? " inverseColors" : ""}${selected ? " selected" : ""}${
    showStartIcon && startIcon?.type === "INSTANCE" && startIcon.hasCodeConnect()
      ? figma.code` startIcon={${startIcon.executeTemplate().example}}`
      : ""
  }${
    showEndIcon && endIcon?.type === "INSTANCE" && endIcon.hasCodeConnect()
      ? figma.code` endIcon={${endIcon.executeTemplate().example}}`
      : ""
  }>
  ${showLabel ? label : ""}
</Button>`,
  imports: ['import { Button } from "@hcl-software/enchanted-react-components"'],
  id: "button",
  metadata: {
    nestable: true,
  },
}
