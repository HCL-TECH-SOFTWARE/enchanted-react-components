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

// url=https://www.figma.com/design/hSgxFly4e92zns5LJXAsNB/HCLED-Components-V3--POC-?node-id=1418-23335
// source=src/components/TextField/TextField.tsx
// component=TextField
// Omitted on purpose: `state` (default, hover, focus) and `filled` are CSS states, not props.
// Not mapped: the FormLabel instance's `showHelpIcon`, `showActionButton`, `showErrorIcon` and
// `helperText` (FormLabel is a separate component that is not built yet), and `value`/`placeholder`
// (TEXT properties that carry sample content; set them as the native `value`/`placeholder` props).
import figma from 'figma';

const instance = figma.selectedInstance;
const formLabel = instance.findInstance('FormLabel');
// `findInstance` returns an error handle when the layer is missing; fall back to no label then.
const hasFormLabel = formLabel.type === 'INSTANCE';
const label = hasFormLabel ? formLabel.getString('label') : '';
const required = hasFormLabel ? formLabel.getBoolean('required') : false;
const showLabel = instance.getBoolean('showLabel');
const helperText = instance.getString('helperText');
const showHelperText = instance.getBoolean('showHelperText');
const errorMessage = instance.getString('errorMessage');
const showErrorMessage = instance.getBoolean('showErrorMessage');
const unitLabel = instance.getString('unitLabel');
const showUnitLabel = instance.getBoolean('showUnitLabel');
const endAdornment = instance.getInstanceSwap('endAdornment');
const showEndAdornment = instance.getBoolean('showEndAdornment');
const contentTop = instance.getInstanceSwap('contentTop');
const showContentTop = instance.getBoolean('showContentTop');
const contentBottom = instance.getInstanceSwap('contentBottom');
const showContentBottom = instance.getBoolean('showContentBottom');
const showDragHandle = instance.getBoolean('showDragHandle');
const showClearIcon = instance.getBoolean('showClearIcon');
const size = instance.getEnum('size', { medium: 'medium', small: 'small' });
const multiline = instance.getEnum('multiline', { False: false, True: true });
const invalid = instance.getEnum('invalid', { False: false, True: true });
const disabled = instance.getEnum('disabled', { False: false, True: true });
const readOnly = instance.getEnum('readOnly', { False: false, True: true });
const inverse = instance.getEnum('inverse', { False: false, True: true });

export default {
  example: figma.code`<TextField
  label="${label}"
  showLabel={${showLabel}}
  required={${required}}
  size="${size}"
  multiline={${multiline}}
  invalid={${invalid}}
  disabled={${disabled}}
  readOnly={${readOnly}}
  inverse={${inverse}}
  helperText="${helperText}"
  showHelperText={${showHelperText}}
  errorMessage="${errorMessage}"
  showErrorMessage={${showErrorMessage}}
  unitLabel="${unitLabel}"
  showUnitLabel={${showUnitLabel}}
  endAdornment={${endAdornment}}
  showEndAdornment={${showEndAdornment}}
  contentTop={${contentTop}}
  showContentTop={${showContentTop}}
  contentBottom={${contentBottom}}
  showContentBottom={${showContentBottom}}
  showDragHandle={${showDragHandle}}
  showClearIcon={${showClearIcon}}
/>`,
  imports: ['import { TextField } from "@hcl-software/enchanted-react-components"'],
  id: 'text-field',
};
