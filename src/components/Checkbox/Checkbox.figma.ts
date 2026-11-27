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

// url=https://www.figma.com/design/hSgxFly4e92zns5LJXAsNB/HCLED-Components-V3--POC-?node-id=1338-466326
// source=src/components/Checkbox/Checkbox.tsx
// component=Checkbox
// Omitted on purpose: `state` (hover/focus/active are CSS states, not props).
import figma from 'figma';

const instance = figma.selectedInstance;
const label = instance.getString('label');
const showLabel = instance.getBoolean('showLabel');
const helperText = instance.getString('helperText');
const showHelperText = instance.getBoolean('showHelperText');
const errorMessage = instance.getString('errorMessage');
const showErrorMessage = instance.getBoolean('showErrorMessage');
const required = instance.getBoolean('required');
const checked = instance.getEnum('checked', { True: true, False: false });
const indeterminate = instance.getEnum('indeterminate', { True: true, False: false });
const disabled = instance.getEnum('disabled', { True: true, False: false });
const invalid = instance.getEnum('invalid', { True: true, False: false });
const disablePadding = instance.getEnum('disablePadding', { True: true, False: false });

export default {
  example: figma.code`<Checkbox
  label="${label}"
  showLabel={${showLabel}}
  helperText="${helperText}"
  showHelperText={${showHelperText}}
  errorMessage="${errorMessage}"
  showErrorMessage={${showErrorMessage}}
  required={${required}}
  checked={${checked}}
  indeterminate={${indeterminate}}
  disabled={${disabled}}
  invalid={${invalid}}
  disablePadding={${disablePadding}}
/>`,
  imports: ['import { Checkbox } from "@hcl-software/enchanted-react-components"'],
  id: 'checkbox',
  metadata: { nestable: true },
};
