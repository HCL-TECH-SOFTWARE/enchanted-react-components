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

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { useBoundary } from '../../../theme/BoundaryContext';
import { Direction, ShadowRootType, ThemeMode, ThemeProvider } from '../../../theme/ThemeProvider';

const BoundaryProbe = () => <span data-testid="probe">{useBoundary() ? 'boundary' : 'none'}</span>;

describe('ThemeProvider', () => {
  it('renders the plain host with data-theme and dir when shadowRootType is none', () => {
    const { container } = render(
      <ThemeProvider mode={ThemeMode.Dark} direction={Direction.Rtl} shadowRootType={ShadowRootType.None}>
        <BoundaryProbe />
      </ThemeProvider>,
    );
    const host = container.firstElementChild;
    expect(host).toHaveAttribute('data-theme', 'dark');
    expect(host).toHaveAttribute('dir', 'rtl');
    expect(screen.getByTestId('probe')).toHaveTextContent('none');
  });

  it('defaults to an open shadow root and ltr', () => {
    const { container } = render(
      <ThemeProvider mode={ThemeMode.Light}>
        <BoundaryProbe />
      </ThemeProvider>,
    );
    const host = container.firstElementChild as HTMLElement;
    expect(host).toHaveAttribute('dir', 'ltr');
    expect(host.shadowRoot).not.toBeNull();
    expect(host.shadowRoot?.querySelector('[data-testid="probe"]')).toHaveTextContent('boundary');
    expect(host.shadowRoot?.querySelector('style')).not.toBeNull();
  });

  it('keeps a closed root unreachable from the host', () => {
    const { container } = render(
      <ThemeProvider mode={ThemeMode.Light} shadowRootType={ShadowRootType.Closed}>
        <BoundaryProbe />
      </ThemeProvider>,
    );
    expect((container.firstElementChild as HTMLElement).shadowRoot).toBeNull();
  });

  it('forwards className and style to the host', () => {
    const { container } = render(
      <ThemeProvider mode={ThemeMode.Light} className="brand" style={{ color: 'red' }} shadowRootType={ShadowRootType.None} />,
    );
    const host = container.firstElementChild as HTMLElement;
    expect(host).toHaveClass('brand');
    expect(host.style.color).toBe('red');
  });

  it('remounts the host when shadowRootType changes', () => {
    const { container, rerender } = render(<ThemeProvider mode={ThemeMode.Light} shadowRootType={ShadowRootType.Open} />);
    const first = container.firstElementChild;
    rerender(<ThemeProvider mode={ThemeMode.Light} shadowRootType={ShadowRootType.None} />);
    expect(container.firstElementChild).not.toBe(first);
  });

  it('has no automated accessibility violations', async () => {
    const { container } = render(
      <ThemeProvider mode={ThemeMode.Light} shadowRootType={ShadowRootType.None}>
        <p>Content</p>
      </ThemeProvider>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
