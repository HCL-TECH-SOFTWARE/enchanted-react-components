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

import { render } from '@testing-library/react';
import { StrictMode } from 'react';
import { describe, expect, it } from 'vitest';
import { useShadowRoot } from '../../../utils/useShadowRoot';

const Host = ({ mode, onRoot }: { mode: ShadowRootMode; onRoot: (root: ShadowRoot | null) => void }) => {
  const [root, ref] = useShadowRoot<HTMLDivElement>(mode);
  onRoot(root);
  return <div ref={ref} data-testid="host" />;
};

describe('useShadowRoot', () => {
  it('attaches an open shadow root to the host', () => {
    let latest: ShadowRoot | null = null;
    const { getByTestId } = render(<Host mode="open" onRoot={(root) => (latest = root)} />);
    expect(latest).not.toBeNull();
    expect(getByTestId('host').shadowRoot).toBe(latest);
  });

  it('keeps a closed root out of reach of host.shadowRoot', () => {
    let latest: ShadowRoot | null = null;
    const { getByTestId } = render(<Host mode="closed" onRoot={(root) => (latest = root)} />);
    expect(latest).not.toBeNull();
    expect(getByTestId('host').shadowRoot).toBeNull();
  });

  it('survives StrictMode re-running ref callbacks', () => {
    expect(() =>
      render(
        <StrictMode>
          <Host mode="open" onRoot={() => undefined} />
        </StrictMode>,
      ),
    ).not.toThrow();
  });
});
