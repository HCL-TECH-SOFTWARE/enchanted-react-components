// url=https://www.figma.com/design/hSgxFly4e92zns5LJXAsNB/HCLED-Components-V3--POC-?node-id=1338-466326
// source=src/components/Checkbox/Checkbox.tsx
// component=Checkbox
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

// Props follow the Figma component properties of `Checkbox`; see `Checkbox.tsx`.

import figma from 'figma'

const instance = figma.selectedInstance

// VARIANT properties: every Figma option is mapped explicitly.
const variant = instance.getEnum("variant", {
  "with padding": "withPadding",
  "without padding": "withoutPadding",
})
const checked = instance.getEnum("checked", {
  True: true,
  False: false,
})
const indeterminate = instance.getEnum("indeterminate", {
  False: false,
  True: true,
})
const disabled = instance.getEnum("disabled", {
  False: false,
  True: true,
})
const error = instance.getEnum("error", {
  True: true,
  False: false,
})

// The `state` VARIANT (default, hover, focus, hover & focus) is intentionally not mapped:
// hover and focus are CSS states, not component props.

// TEXT and BOOLEAN: each text is passed only while its `show…` toggle is on.
const label = instance.getString("label")
const showLabel = instance.getBoolean("showLabel")
const helperText = instance.getString("helperText")
const showHelperText = instance.getBoolean("showHelperText")
// The error message layer exists in Figma only for `error=True`.
const errorMessage = instance.getString("errorMessage")
const showErrorMessage = instance.getBoolean("showErrorMessage")

export default {
  example: figma.code`<Checkbox variant="${variant}"${
    checked ? " checked" : ""
  }${indeterminate ? " indeterminate" : ""}${disabled ? " disabled" : ""}${
    error ? " error" : ""
  }${showLabel ? ` label="${label}"` : ""}${
    showHelperText ? ` helperText="${helperText}"` : ""
  }${error && showErrorMessage ? ` errorMessage="${errorMessage}"` : ""} />`,
  imports: ['import { Checkbox } from "@hcl-software/enchanted-react-components"'],
  id: "checkbox",
  metadata: {
    nestable: true,
  },
}
