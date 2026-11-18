// url=https://www.figma.com/design/hSgxFly4e92zns5LJXAsNB/HCLED-Components-V3--POC-?node-id=1322-451818
// source=src/components/IconButton/IconButton.tsx
// component=IconButton
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

// NOTE: The IconButton component is not implemented yet. This template is written ahead of the
// code from the Figma component properties; the prop names and values below are the proposed
// public API and must be reconciled with `IconButton.tsx` when the component is added.

import figma from 'figma'

const instance = figma.selectedInstance

// VARIANT properties: every Figma option is mapped explicitly.
const variant = instance.getEnum("variant", {
  "with padding": "withPadding",
  "without padding": "withoutPadding",
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

// INSTANCE_SWAP: the main icon is always shown; the end icon only while `showEndIcon` is on.
const icon = instance.getInstanceSwap("icon")
const showEndIcon = instance.getBoolean("showEndIcon")
const endIcon = instance.getInstanceSwap("endIcon")

export default {
  example: figma.code`<IconButton variant="${variant}" size="${size}"${
    disabled ? " disabled" : ""
  }${inverseColors ? " inverseColors" : ""}${selected ? " selected" : ""}${
    icon?.type === "INSTANCE"
      ? figma.code` icon={${icon.executeTemplate().example}}`
      : ""
  }${
    showEndIcon && endIcon?.type === "INSTANCE"
      ? figma.code` endIcon={${endIcon.executeTemplate().example}}`
      : ""
  }${showLabel ? figma.code`>${label}</IconButton>` : " />"}`,
  imports: ['import { IconButton } from "@hcl-software/enchanted-react-components"'],
  id: "icon-button",
  metadata: {
    nestable: true,
  },
}
