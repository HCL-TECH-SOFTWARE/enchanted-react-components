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

// url=https://www.figma.com/design/hSgxFly4e92zns5LJXAsNB/HCLED-Components-V3?node-id=3297-35178
// source=src/components/CheckboxGroup/CheckboxGroup.tsx
// component=CheckboxGroup
// Omitted on purpose: the `FormLabel` and `Checkbox` instances are nested components (`label`, `required` and the
// checkboxes come from them); the `formGroup` slot maps to `children`.
import figma from 'figma';

const instance = figma.selectedInstance;
const disabled = instance.getEnum('disabled', { True: true, False: false });
const invalid = instance.getEnum('invalid', { True: true, False: false });
const orientation = instance.getEnum('orientation', {
  vertical: 'vertical',
  horizontal: 'horizontal',
});
const showLabel = instance.getBoolean('showLabel');
const helperText = instance.getString('helperText');
const showHelperText = instance.getBoolean('showHelperText');
const errorMessage = instance.getString('errorMessage');
const showErrorMessage = instance.getBoolean('showErrorMessage');
const children = instance.getInstanceSwap('children');

export default {
  example: figma.code`<CheckboxGroup
  orientation="${orientation}"
  disabled={${disabled}}
  invalid={${invalid}}
  showLabel={${showLabel}}
  helperText="${helperText}"
  showHelperText={${showHelperText}}
  errorMessage="${errorMessage}"
  showErrorMessage={${showErrorMessage}}
>
  ${children}
</CheckboxGroup>`,
  imports: ['import { CheckboxGroup } from "@hcl-software/enchanted-react-components"'],
  id: 'checkbox-group',
  metadata: { nestable: true },
};
