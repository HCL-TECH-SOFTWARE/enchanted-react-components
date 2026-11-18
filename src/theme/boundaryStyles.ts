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

import buttonStyles from '../components/Button/Button.shadow.scss?inline';
import iconButtonStyles from '../components/IconButton/IconButton.shadow.scss?inline';
import checkboxStyles from '../components/Checkbox/Checkbox.shadow.scss?inline';
import textFieldStyles from '../components/TextField/TextField.shadow.scss?inline';
import selectSingleStyles from '../components/SelectSingle/SelectSingle.shadow.scss?inline';
import dialogStyles from '../components/Dialog/Dialog.shadow.scss?inline';
import dialogActionsStyles from '../components/Dialog/DialogActions.shadow.scss?inline';
import dialogHeaderStyles from '../components/Dialog/DialogHeader.shadow.scss?inline';

// One `import x from '../components/<Component>/<Component>.shadow.scss?inline'` per component
// that has styles, concatenated below.
const componentStyles: string[] = [buttonStyles, iconButtonStyles, checkboxStyles, textFieldStyles, selectSingleStyles, dialogStyles, dialogActionsStyles, dialogHeaderStyles];

/** The concatenated CSS of every component, injected by `ThemeProvider`. */
export const boundaryStyles = componentStyles.join('\n');
