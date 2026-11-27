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

// url=https://www.figma.com/design/hSgxFly4e92zns5LJXAsNB/HCLED-Components-V3--POC-?node-id=22891-21455
// source=src/components/FormLabel/FormLabel.tsx
// component=FormLabel
// Omitted on purpose: `state` (default, focus) is a CSS state, not a prop.
// Property names come from the FormLabel instance inside TextField (`label`, `required`,
// `showHelpIcon`, `showActionButton`, `showErrorIcon`, `showHelperText`, `helperText`); the
// help icon and `.Actions` layers are hidden instances, mapped to the `helpIcon` and `actions` slots.
import figma from 'figma';

const instance = figma.selectedInstance;
const label = instance.getString('label');
const required = instance.getBoolean('required');
const helperText = instance.getString('helperText');
const showHelperText = instance.getBoolean('showHelperText');
const showHelpIcon = instance.getBoolean('showHelpIcon');
const showActionButton = instance.getBoolean('showActionButton');
const showErrorIcon = instance.getBoolean('showErrorIcon');
const invalid = instance.getEnum('invalid', { False: false, True: true });
const disabled = instance.getEnum('disabled', { False: false, True: true });
const inverse = instance.getEnum('inverse', { False: false, True: true });

export default {
  example: figma.code`<FormLabel
  label="${label}"
  required={${required}}
  invalid={${invalid}}
  disabled={${disabled}}
  inverse={${inverse}}
  showHelpIcon={${showHelpIcon}}
  showActionButton={${showActionButton}}
  showErrorIcon={${showErrorIcon}}
  helperText="${helperText}"
  showHelperText={${showHelperText}}
/>`,
  imports: ['import { FormLabel } from "@hcl-software/enchanted-react-components"'],
  id: 'form-label',
};
