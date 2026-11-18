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
import { Button } from '../../../components/Button';
import { DialogActions, DialogActionsAlignment, DialogActionsFlow } from '../../../components/Dialog';
import { ShadowRootType, ThemeMode, ThemeProvider } from '../../../theme/ThemeProvider';

const renderActions = (props: Partial<Parameters<typeof DialogActions>[0]> = {}) =>
  render(
    <ThemeProvider mode={ThemeMode.Light} shadowRootType={ShadowRootType.None}>
      <DialogActions data-testid="actions" {...props}>
        <Button>Save</Button>
      </DialogActions>
    </ThemeProvider>,
  );

describe('DialogActions', () => {
  it('renders its actions with the Figma defaults', () => {
    renderActions();
    const root = screen.getByTestId('actions');
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    expect(root).toHaveAttribute('data-alignment', 'right');
    expect(root).toHaveAttribute('data-flow', 'horizontal');
    expect(root).toHaveAttribute('data-with-divider');
  });

  it('reflects alignment and flow', () => {
    renderActions({ alignment: DialogActionsAlignment.Left, flow: DialogActionsFlow.Vertical });
    const root = screen.getByTestId('actions');
    expect(root).toHaveAttribute('data-alignment', 'left');
    expect(root).toHaveAttribute('data-flow', 'vertical');
  });

  it('hides the divider when showDivider is false', () => {
    renderActions({ showDivider: false });
    expect(screen.getByTestId('actions')).not.toHaveAttribute('data-with-divider');
  });

  it('renders startContent before the actions only when given', () => {
    const { rerender } = renderActions();
    expect(document.querySelector('.dialogActionsStart')).toBeNull();

    rerender(
      <ThemeProvider mode={ThemeMode.Light} shadowRootType={ShadowRootType.None}>
        <DialogActions startContent={<span>Remember</span>}>
          <Button>Save</Button>
        </DialogActions>
      </ThemeProvider>,
    );
    const start = document.querySelector('.dialogActionsStart');
    expect(start).toHaveTextContent('Remember');
    expect(start?.nextElementSibling).toContainElement(screen.getByRole('button', { name: 'Save' }));
  });

  it('merges a custom className and passes other props through', () => {
    renderActions({ className: 'custom', id: 'footer' });
    const root = screen.getByTestId('actions');
    expect(root).toHaveClass('dialogActionsRoot', 'custom');
    expect(root).toHaveAttribute('id', 'footer');
  });

  it('has no accessibility violations', async () => {
    const { container } = renderActions();
    expect(await axe(container)).toHaveNoViolations();
  });
});
