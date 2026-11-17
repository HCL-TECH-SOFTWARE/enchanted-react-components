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
import figma from 'figma';

const instance = figma.selectedInstance;

// Property names are the ones returned by the Figma MCP `get_context_for_code_connect`.
// The `state` variant (default, hover, focus, hover & focus) is intentionally not mapped:
// hover and focus are CSS states, not props.
const label = instance.getString('label');
const helperText = instance.getString('helperText');
const errorMessage = instance.getString('errorMessage');
const showLabel = instance.getBoolean('showLabel');
const showHelperText = instance.getBoolean('showHelperText');
const showErrorMessage = instance.getBoolean('showErrorMessage');
const checked = instance.getEnum('checked', { True: true, False: false });
const indeterminate = instance.getEnum('indeterminate', { True: true, False: false });
const disabled = instance.getEnum('disabled', { True: true, False: false });
const error = instance.getEnum('error', { True: true, False: false });
const variant = instance.getEnum('variant', {
  'with padding': 'with-padding',
  'without padding': 'without-padding',
});

export default {
  example: figma.code`<Checkbox
  variant="${variant}"
  checked={${checked}}
  indeterminate={${indeterminate}}
  disabled={${disabled}}
  error={${error}}
  showLabel={${showLabel}}
  showHelperText={${showHelperText}}
  helperText="${helperText}"
  showErrorMessage={${showErrorMessage}}
  errorMessage="${errorMessage}"
>
  ${label}
</Checkbox>`,
  imports: ['import { Checkbox } from "@hcl-software/enchanted-react-components"'],
  id: 'checkbox',
};
