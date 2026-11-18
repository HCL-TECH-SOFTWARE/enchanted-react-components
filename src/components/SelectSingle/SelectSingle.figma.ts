// url=https://www.figma.com/design/hSgxFly4e92zns5LJXAsNB/HCLED-Components-V3--POC-?node-id=22891-19922
// source=src/components/SelectSingle/SelectSingle.tsx
// component=SelectSingle
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

// NOTE: The SelectSingle component is not implemented yet. This template is written ahead of the
// code from the Figma component properties (Figma name: "SelectSingle (Autocomplete)"); the prop
// names and values below are the proposed public API and must be reconciled with
// `SelectSingle.tsx` when the component is added.

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
const input = instance.getString("input")
const placeholder = instance.getString("placeholder")
const helperText = instance.getString("helperText")
const showHelperText = instance.getBoolean("showHelperText")

// BOOLEAN without a content swap.
const showClearIcon = instance.getBoolean("showClearIcon")
const showEndAdornment = instance.getBoolean("showEndAdornment")
const showEndAdornmentAction = instance.getBoolean("showEndAdornmentAction")

// BOOLEAN and a fixed child layer: the start adornment is the `startAdornment` instance,
// which is not exposed as a swap property, so it is resolved by its layer name.
const showStartAdornment = instance.getBoolean("showStartAdornment")
const startAdornment = instance.findInstance("startAdornment")

// BOOLEAN and INSTANCE_SWAP: the menu is passed only while `showMenu` is on.
const showMenu = instance.getBoolean("showMenu")
const menu = instance.getInstanceSwap("menu")

// Not mapped: the `showLabel` toggle. The label is the nested `FormLabel` instance, which has no
// Code Connect template (FormLabel is not part of the first-release scope).

export default {
  example: figma.code`<SelectSingle size="${size}"${
    hasInput ? ` value="${input}"` : ` placeholder="${placeholder}"`
  }${disabled ? " disabled" : ""}${readOnly ? " readOnly" : ""}${
    error ? " error" : ""
  }${inverseColors ? " inverseColors" : ""}${
    showClearIcon ? " clearable" : ""
  }${showEndAdornment ? " endAdornment" : ""}${
    showEndAdornmentAction ? " endAdornmentAction" : ""
  }${showHelperText ? ` helperText="${helperText}"` : ""}${
    showStartAdornment && startAdornment?.type === "INSTANCE"
      ? figma.code` startAdornment={${startAdornment.executeTemplate().example}}`
      : ""
  }${
    showMenu && menu?.type === "INSTANCE"
      ? figma.code` menu={${menu.executeTemplate().example}}`
      : ""
  } />`,
  imports: ['import { SelectSingle } from "@hcl-software/enchanted-react-components"'],
  id: "select-single",
  metadata: {
    nestable: true,
  },
}
