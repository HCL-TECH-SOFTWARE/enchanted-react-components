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

/**
 * Where portaled content (popups, dialogs, menus) should render so it stays inside the themed host:
 * the shadow root for `open` and `closed`, and the host element for `none`. It is `null` outside a
 * provider and during the first render, before the host exists.
 */
export const PortalContainerContext = createContext<HTMLElement | ShadowRoot | null>(null);

/**
 * Returns the `container` to pass to a Base UI portal. A `null` result means "not ready or no
 * provider"; Base UI then falls back to `document.body`, where tokens and `dir` do not apply.
 * Portaled content is normally opened after mount, when the container is set.
 */
export const usePortalContainer = (): HTMLElement | ShadowRoot | null => useContext(PortalContainerContext);
