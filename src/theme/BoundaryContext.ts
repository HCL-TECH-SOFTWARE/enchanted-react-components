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

import { createContext, useContext } from 'react';

/** The `ThemeProvider` style boundary, or `null` when there is no shadow root. */
export const BoundaryContext = createContext<ShadowRoot | null>(null);

/** Returns the style boundary, for example to pass it as a portal `container`. */
export const useBoundary = (): ShadowRoot | null => useContext(BoundaryContext);
