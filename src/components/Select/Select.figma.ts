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

// url=https://www.figma.com/design/hSgxFly4e92zns5LJXAsNB/HCLED-Components-V3--POC-?node-id=29412-27437
// source=src/components/Select/Select.tsx
// component=Select
// Omitted on purpose: `state` (default, hover, focus) and `filled` are CSS states, not props.
// Not mapped: the `value` TEXT property (sample text of the chosen option; the code `value` is the
// option's value, not its label), and the FormLabel instance's `showHelpIcon`, `showActionButton`,
// `showErrorIcon` and `helperText` (set them through `labelProps`).
import figma from 'figma';

const instance = figma.selectedInstance;
const formLabel = instance.findInstance('FormLabel');
// `findInstance` returns an error handle when the layer is missing; fall back to no label then.
const hasFormLabel = formLabel.type === 'INSTANCE';
const label = hasFormLabel ? formLabel.getString('label') : '';
const required = hasFormLabel ? formLabel.getBoolean('required') : false;
const showLabel = instance.getBoolean('showLabel');
const placeholder = instance.getString('placeholder');
const helperText = instance.getString('helperText');
const showHelperText = instance.getBoolean('showHelperText');
const showIcon = instance.getBoolean('showIcon');
const menu = instance.getInstanceSwap('menu');
const size = instance.getEnum('size', { medium: 'medium', small: 'small' });
const invalid = instance.getEnum('invalid', { False: false, True: true });
const disabled = instance.getEnum('disabled', { False: false, True: true });
const readOnly = instance.getEnum('readOnly', { False: false, True: true });
const inverse = instance.getEnum('inverse', { False: false, True: true });
const open = instance.getEnum('open', { False: false, True: true });

export default {
  example: figma.code`<Select
  label="${label}"
  showLabel={${showLabel}}
  required={${required}}
  placeholder="${placeholder}"
  size="${size}"
  invalid={${invalid}}
  disabled={${disabled}}
  readOnly={${readOnly}}
  inverse={${inverse}}
  open={${open}}
  showIcon={${showIcon}}
  helperText="${helperText}"
  showHelperText={${showHelperText}}
  menu={${menu}}
/>`,
  imports: ['import { Select } from "@hcl-software/enchanted-react-components"'],
  id: 'select',
};
