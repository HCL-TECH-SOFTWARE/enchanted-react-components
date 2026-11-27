// ========================================================================
// Copyright 2026 HCL America Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// ========================================================================

// url=https://www.figma.com/design/hSgxFly4e92zns5LJXAsNB/HCLED-Components-V3--POC-?node-id=1338-465763
// source=src/components/Button/Button.tsx
// component=Button
import figma from 'figma';

const instance = figma.selectedInstance;

const label = instance.getString('label');
const showLabel = instance.getBoolean('showLabel');
const startIcon = instance.getInstanceSwap('startIcon');
const showStartIcon = instance.getBoolean('showStartIcon');
const endIcon = instance.getInstanceSwap('endIcon');
const showEndIcon = instance.getBoolean('showEndIcon');
const variant = instance.getEnum('variant', { contained: 'contained', outlined: 'outlined', text: 'text' });
const color = instance.getEnum('color', { brand: 'brand', neutral: 'neutral', error: 'error' });
const size = instance.getEnum('size', { medium: 'medium', small: 'small', extraSmall: 'extraSmall' });
const inverse = instance.getEnum('inverse', { False: false, True: true });
const disabled = instance.getEnum('disabled', { False: false, True: true });
const pressed = instance.getEnum('pressed', { False: false, True: true });
// `state` (default, hover, focus, active) is intentionally omitted: it is expressed with CSS states.

export default {
  example: figma.code`<Button
  variant="${variant}"
  color="${color}"
  size="${size}"
  inverse={${inverse}}
  disabled={${disabled}}
  pressed={${pressed}}
  startIcon={${showStartIcon ? startIcon : undefined}}
  endIcon={${showEndIcon ? endIcon : undefined}}
>
  ${showLabel ? label : undefined}
</Button>`,
  imports: ['import { Button } from "@hcl-software/enchanted-react-components"'],
  id: 'button',
};
