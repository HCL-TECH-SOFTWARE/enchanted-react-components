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

import { useCallback, useState, type RefCallback } from 'react';

// Keyed by host instead of reading `host.shadowRoot`, which is always null for a closed root.
// Reusing the root matters because `attachShadow` throws when called twice on one element,
// and React StrictMode re-runs ref callbacks.
const roots = new WeakMap<Element, ShadowRoot>();

/**
 * Attaches a shadow root of the given mode to the element that receives the returned ref.
 *
 * `root` is `null` until the host has mounted. The mode cannot change for an element that
 * already has a root; remount the host (for example with a `key`) to change it.
 */
export const useShadowRoot = <T extends HTMLElement = HTMLElement>(
  mode: ShadowRootMode,
): [ShadowRoot | null, RefCallback<T>] => {
  const [root, setRoot] = useState<ShadowRoot | null>(null);

  const ref = useCallback<RefCallback<T>>(
    (host) => {
      if (!host) return;
      let shadowRoot = roots.get(host);
      if (!shadowRoot) {
        shadowRoot = host.attachShadow({ mode });
        roots.set(host, shadowRoot);
      }
      setRoot(shadowRoot);
    },
    [mode],
  );

  return [root, ref];
};
