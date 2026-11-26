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
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axe } from '../../axe';
import { Dialog, DialogSize } from '../../../components/Dialog';
import { ShadowRootType, ThemeMode, ThemeProvider } from '../../../theme';

describe('Dialog', () => {
  it('renders nothing while closed', () => {
    render(<Dialog title="Title">Body</Dialog>);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders an accessible dialog with the title and content when open', () => {
    render(
      <Dialog open title="Rename file">
        Pick a new name.
      </Dialog>,
    );
    const dialog = screen.getByRole('dialog', { name: 'Rename file' });
    expect(screen.getByRole('heading', { name: 'Rename file' })).toBeInTheDocument();
    expect(dialog).toHaveAccessibleDescription('Pick a new name.');
  });

  it('applies the Figma defaults and exposes the root part', () => {
    render(
      <Dialog open title="Title">
        Body
      </Dialog>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('data-size', DialogSize.Small);
    expect(dialog).toHaveAttribute('part', 'root');
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Help' })).not.toBeInTheDocument();
  });

  it.each(Object.values(DialogSize))('reflects the %s size', (size) => {
    render(
      <Dialog open size={size} title="Title">
        Body
      </Dialog>,
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('data-size', size);
  });

  it('hides the close button and footer when turned off', () => {
    render(
      <Dialog open showClose={false} showFooter={false} title="Title">
        Body
      </Dialog>,
    );
    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'OK' })).not.toBeInTheDocument();
  });

  it('renders a custom footer instead of the default buttons', () => {
    render(
      <Dialog open title="Title" footer={<button type="button">Save</button>}>
        Body
      </Dialog>,
    );
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'OK' })).not.toBeInTheDocument();
  });

  it('shows the icon and header actions only while their toggles are on', () => {
    const slots = {
      icon: <span data-testid="icon" />,
      headerActions: <button type="button">More</button>,
    };
    const { rerender } = render(
      <Dialog open title="Title" {...slots}>
        Body
      </Dialog>,
    );
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'More' })).not.toBeInTheDocument();

    rerender(
      <Dialog open title="Title" showIcon showHeaderActions {...slots}>
        Body
      </Dialog>,
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'More' })).toBeInTheDocument();
  });

  it('keeps the icon out of the heading', () => {
    render(
      <Dialog open showIcon icon={<span data-testid="icon" />} title="Title">
        Body
      </Dialog>,
    );
    expect(screen.getByRole('heading')).not.toContainElement(screen.getByTestId('icon'));
  });

  it('shows a help button that calls onHelpClick, with a translatable label', async () => {
    const user = userEvent.setup();
    const onHelpClick = vi.fn();
    render(
      <Dialog open showHelpButton helpLabel="Hilfe" onHelpClick={onHelpClick} title="Title">
        Body
      </Dialog>,
    );
    await user.click(screen.getByRole('button', { name: 'Hilfe' }));
    expect(onHelpClick).toHaveBeenCalledTimes(1);
  });

  it('uses a translatable label for the close button', () => {
    render(
      <Dialog open closeLabel="Schließen" title="Title">
        Body
      </Dialog>,
    );
    expect(screen.getByRole('button', { name: 'Schließen' })).toBeInTheDocument();
  });

  it('merges className onto the popup', () => {
    render(
      <Dialog open className="custom" title="Title">
        Body
      </Dialog>,
    );
    expect(screen.getByRole('dialog')).toHaveClass('dialogRoot', 'custom');
  });

  it.each([
    ['the close button', 'Close'],
    ['the Cancel button', 'Cancel'],
    ['the OK button', 'OK'],
  ])('calls onOpenChange(false) from %s', async (_label, name) => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Dialog open onOpenChange={onOpenChange} title="Title">
        Body
      </Dialog>,
    );
    await user.click(screen.getByRole('button', { name }));
    expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything());
  });

  it('closes with Escape', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Dialog open onOpenChange={onOpenChange} title="Title">
        Body
      </Dialog>,
    );
    await user.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything());
  });

  it('moves focus into the dialog when it opens', async () => {
    render(
      <Dialog open title="Title">
        Body
      </Dialog>,
    );
    const dialog = screen.getByRole('dialog');
    await vi.waitFor(() => expect(dialog).toContainElement(document.activeElement as HTMLElement));
  });

  it('renders the popup inside the themed host so it keeps tokens and styles', async () => {
    const { container } = render(
      <ThemeProvider mode={ThemeMode.Light} shadowRootType={ShadowRootType.None}>
        <Dialog open title="Title">
          Body
        </Dialog>
      </ThemeProvider>,
    );
    const host = container.querySelector('[data-theme]') as HTMLElement;
    await vi.waitFor(() => expect(host).toContainElement(screen.getByRole('dialog')));
  });

  it('has no detectable accessibility violations', async () => {
    render(
      <Dialog open showHelpButton title="Title">
        Body
      </Dialog>,
    );
    expect(await axe(screen.getByRole('dialog'))).toHaveNoViolations();
  });
});
