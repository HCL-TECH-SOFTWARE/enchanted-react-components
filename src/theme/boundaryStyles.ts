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

import selectStyles from '../components/Select/Select.shadow.scss?inline';
import formLabelStyles from '../components/FormLabel/FormLabel.shadow.scss?inline';
import textFieldStyles from '../components/TextField/TextField.shadow.scss?inline';

// One `import x from '../components/<Component>/<Component>.shadow.scss?inline'` per component
// that has styles, concatenated below.
const componentStyles: string[] = [formLabelStyles, selectStyles, textFieldStyles];

/** The concatenated CSS of every component, injected by `ThemeProvider`. */
export const boundaryStyles = componentStyles.join('\n');
