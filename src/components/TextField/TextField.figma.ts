// url=https://www.figma.com/design/hSgxFly4e92zns5LJXAsNB/HCLED-Components-V3--POC-?node-id=1418-23335
// source=src/components/TextField/TextField.tsx
// component=TextField
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

// NOTE: The TextField component is not implemented yet. This template is written ahead of the
// code from the Figma component properties; the prop names and values below are the proposed
// public API and must be reconciled with `TextField.tsx` when the component is added.

import figma from 'figma'

const instance = figma.selectedInstance

// VARIANT properties: every Figma option is mapped explicitly.
const size = instance.getEnum("size", {
  medium: "medium",
  small: "small",
})
const error = instance.getEnum("error", {
  False: false,
  True: true,
})
const disabled = instance.getEnum("disabled", {
  False: false,
  True: true,
})
const inverseColors = instance.getEnum("inversecolors", {
  False: false,
  True: true,
})
const multiline = instance.getEnum("multiline", {
  True: true,
  False: false,
})
// `nonEdit` is a read-only field.
const readOnly = instance.getEnum("nonEdit", {
  False: false,
  True: true,
})
// `hasInput` switches the Figma field between the placeholder and the input text.
const hasInput = instance.getEnum("hasInput", {
  False: false,
  True: true,
})

// The `state` VARIANT (default, hover, focus) is intentionally not mapped:
// hover and focus are CSS states, not component props.

// TEXT: the input text is the value while `hasInput` is on, otherwise the placeholder shows.
const value = instance.getString("value")
const placeholder = instance.getString("placeholder")
const helperText = instance.getString("helperText")
const showHelperText = instance.getBoolean("showHelperText")
const unitLabel = instance.getString("unitLabel")
const showUnitLabel = instance.getBoolean("showUnitLabel")

// BOOLEAN without a content swap.
const showClearIcon = instance.getBoolean("showClearIcon")
const showDragHandle = instance.getBoolean("showDragHandle")

// BOOLEAN and INSTANCE_SWAP: the adornment is passed only while `showInputAdornment` is on.
const showInputAdornment = instance.getBoolean("showInputAdornment")
const inputAdornment = instance.getInstanceSwap("inputAdornment")

// BOOLEAN and SLOT: freeform content above and below the input.
const showContentTop = instance.getBoolean("showContentTop")
const contentTop = instance.getSlot("contentTop")
const showContentBottom = instance.getBoolean("showContentBottom")
const contentBottom = instance.getSlot("contentBottom")

// Not mapped: the `showLabel` toggle. The label is the nested `FormLabel` instance, which has no
// Code Connect template (FormLabel is not part of the first-release scope).

export default {
  example: figma.code`<TextField size="${size}"${
    hasInput ? ` value="${value}"` : ` placeholder="${placeholder}"`
  }${disabled ? " disabled" : ""}${readOnly ? " readOnly" : ""}${
    error ? " error" : ""
  }${inverseColors ? " inverseColors" : ""}${multiline ? " multiline" : ""}${
    showClearIcon ? " clearable" : ""
  }${showDragHandle ? " dragHandle" : ""}${
    showHelperText ? ` helperText="${helperText}"` : ""
  }${showUnitLabel ? ` unitLabel="${unitLabel}"` : ""}${
    showInputAdornment && inputAdornment?.type === "INSTANCE"
      ? figma.code` inputAdornment={${inputAdornment.executeTemplate().example}}`
      : ""
  }${showContentTop ? figma.code` contentTop={${contentTop}}` : ""}${
    showContentBottom ? figma.code` contentBottom={${contentBottom}}` : ""
  } />`,
  imports: ['import { TextField } from "@hcl-software/enchanted-react-components"'],
  id: "text-field",
  metadata: {
    nestable: true,
  },
}
