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
import { createPortal } from 'react-dom';
import { usePortalContainer } from '../../../theme/BoundaryContext';
import { Direction, ShadowRootType, ThemeMode, ThemeProvider } from '../../../theme/ThemeProvider';

const Probe = () => <span data-testid="probe" />;

// Mimics a Base UI portal: renders into the container the provider hands out.
const PortalProbe = () => {
  const target = usePortalContainer();
  return target ? createPortal(<span data-testid="portaled">popup</span>, target) : <span data-testid="pending" />;
};

describe('ThemeProvider', () => {
  it('renders the plain host with data-theme and dir when shadowRootType is none', () => {
    const { container } = render(
      <ThemeProvider mode={ThemeMode.Dark} direction={Direction.Rtl} shadowRootType={ShadowRootType.None}>
        <Probe />
      </ThemeProvider>,
    );
    const host = container.firstElementChild;
    expect(host).toHaveAttribute('data-theme', 'dark');
    expect(host).toHaveAttribute('dir', 'rtl');
    expect(host).toContainElement(screen.getByTestId('probe'));
  });

  it('defaults to an open shadow root and ltr', () => {
    const { container } = render(
      <ThemeProvider mode={ThemeMode.Light}>
        <Probe />
      </ThemeProvider>,
    );
    const host = container.firstElementChild as HTMLElement;
    expect(host).toHaveAttribute('dir', 'ltr');
    expect(host.shadowRoot).not.toBeNull();
    expect(host.shadowRoot?.querySelector('[data-testid="probe"]')).not.toBeNull();
    expect(host.shadowRoot?.querySelector('style')).not.toBeNull();
  });

  it('keeps a closed root unreachable from the host', () => {
    const { container } = render(
      <ThemeProvider mode={ThemeMode.Light} shadowRootType={ShadowRootType.Closed}>
        <Probe />
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

  it('portals into the themed host when shadowRootType is none, so tokens and dir reach it', () => {
    const { container } = render(
      <ThemeProvider mode={ThemeMode.Dark} direction={Direction.Rtl} shadowRootType={ShadowRootType.None}>
        <PortalProbe />
      </ThemeProvider>,
    );
    const host = container.firstElementChild as HTMLElement;
    const popup = screen.getByTestId('portaled');
    expect(host).toContainElement(popup);
    expect(popup.closest('[data-theme]')).toHaveAttribute('data-theme', 'dark');
    expect(popup.closest('[dir]')).toHaveAttribute('dir', 'rtl');
  });

  it('keeps the portal container in step with a mode and direction change in none mode', () => {
    const { container, rerender } = render(
      <ThemeProvider mode={ThemeMode.Light} shadowRootType={ShadowRootType.None}>
        <PortalProbe />
      </ThemeProvider>,
    );
    rerender(
      <ThemeProvider mode={ThemeMode.Dark} direction={Direction.Rtl} shadowRootType={ShadowRootType.None}>
        <PortalProbe />
      </ThemeProvider>,
    );
    const host = container.firstElementChild as HTMLElement;
    expect(host).toContainElement(screen.getByTestId('portaled'));
    expect(host).toHaveAttribute('data-theme', 'dark');
    expect(host).toHaveAttribute('dir', 'rtl');
  });

  it('provides the shadow root as the portal container for open and closed roots', () => {
    const { container } = render(
      <ThemeProvider mode={ThemeMode.Light}>
        <PortalProbe />
      </ThemeProvider>,
    );
    const host = container.firstElementChild as HTMLElement;
    expect(host.shadowRoot?.querySelector('[data-testid="portaled"]')).not.toBeNull();
    expect(screen.queryByTestId('portaled')).toBeNull();
  });

  it('has no portal container outside a provider', () => {
    render(<PortalProbe />);
    expect(screen.getByTestId('pending')).toBeInTheDocument();
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
