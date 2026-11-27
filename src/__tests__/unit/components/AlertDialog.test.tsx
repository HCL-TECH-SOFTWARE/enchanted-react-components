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
import { AlertDialog, AlertDialogSize } from '../../../components/AlertDialog';
import { ShadowRootType, ThemeMode, ThemeProvider } from '../../../theme';

describe('AlertDialog', () => {
  it('renders nothing while closed', () => {
    render(<AlertDialog title="Title">Body</AlertDialog>);
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });

  it('renders an accessible alert dialog with the title and message when open', () => {
    render(
      <AlertDialog open title="Delete file?">
        This cannot be undone.
      </AlertDialog>,
    );
    const dialog = screen.getByRole('alertdialog', { name: 'Delete file?' });
    expect(screen.getByRole('heading', { name: 'Delete file?' })).toBeInTheDocument();
    expect(dialog).toHaveAccessibleDescription('This cannot be undone.');
  });

  it('applies the Figma defaults and exposes the root part', () => {
    render(
      <AlertDialog open title="Title" icon={<span data-testid="icon" />}>
        Body
      </AlertDialog>,
    );
    const dialog = screen.getByRole('alertdialog');
    expect(dialog).toHaveAttribute('data-size', AlertDialogSize.ExtraSmall);
    expect(dialog).toHaveAttribute('part', 'root');
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Help' })).not.toBeInTheDocument();
  });

  it('has no close button', () => {
    render(
      <AlertDialog open title="Title">
        Body
      </AlertDialog>,
    );
    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
  });

  it('shows the default warning icon while none is supplied', () => {
    render(
      <AlertDialog open title="Title">
        Body
      </AlertDialog>,
    );
    expect(screen.getByRole('alertdialog').querySelector('.alertDialogIcon svg')).toBeInTheDocument();
  });

  it.each(Object.values(AlertDialogSize))('reflects the %s size', (size) => {
    render(
      <AlertDialog open size={size} title="Title">
        Body
      </AlertDialog>,
    );
    expect(screen.getByRole('alertdialog')).toHaveAttribute('data-size', size);
  });

  it('hides the icon and footer when turned off', () => {
    render(
      <AlertDialog open showIcon={false} showFooter={false} icon={<span data-testid="icon" />} title="Title">
        Body
      </AlertDialog>,
    );
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'OK' })).not.toBeInTheDocument();
  });

  it('renders a custom footer instead of the default buttons', () => {
    render(
      <AlertDialog open title="Title" footer={<button type="button">Delete</button>}>
        Body
      </AlertDialog>,
    );
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'OK' })).not.toBeInTheDocument();
  });

  it('keeps the icon out of the heading', () => {
    render(
      <AlertDialog open icon={<span data-testid="icon" />} title="Title">
        Body
      </AlertDialog>,
    );
    expect(screen.getByRole('heading')).not.toContainElement(screen.getByTestId('icon'));
  });

  it('shows a help button that calls onHelpClick, with a translatable label', async () => {
    const user = userEvent.setup();
    const onHelpClick = vi.fn();
    render(
      <AlertDialog open showHelpButton helpLabel="Hilfe" onHelpClick={onHelpClick} title="Title">
        Body
      </AlertDialog>,
    );
    await user.click(screen.getByRole('button', { name: 'Hilfe' }));
    expect(onHelpClick).toHaveBeenCalledTimes(1);
  });

  it('merges className onto the popup', () => {
    render(
      <AlertDialog open className="custom" title="Title">
        Body
      </AlertDialog>,
    );
    expect(screen.getByRole('alertdialog')).toHaveClass('dialogRoot', 'custom');
  });

  it.each([
    ['the Cancel button', 'Cancel'],
    ['the OK button', 'OK'],
  ])('calls onOpenChange(false) from %s', async (_label, name) => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <AlertDialog open onOpenChange={onOpenChange} title="Title">
        Body
      </AlertDialog>,
    );
    await user.click(screen.getByRole('button', { name }));
    expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything());
  });

  it('closes with Escape', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <AlertDialog open onOpenChange={onOpenChange} title="Title">
        Body
      </AlertDialog>,
    );
    await user.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything());
  });

  it('does not close on a click outside', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <AlertDialog open onOpenChange={onOpenChange} title="Title">
        Body
      </AlertDialog>,
    );
    await user.click(document.body);
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  });

  it('moves focus into the dialog when it opens', async () => {
    render(
      <AlertDialog open title="Title">
        Body
      </AlertDialog>,
    );
    const dialog = screen.getByRole('alertdialog');
    await vi.waitFor(() => expect(dialog).toContainElement(document.activeElement as HTMLElement));
  });

  it('renders the popup inside the themed host so it keeps tokens and styles', async () => {
    const { container } = render(
      <ThemeProvider mode={ThemeMode.Light} shadowRootType={ShadowRootType.None}>
        <AlertDialog open title="Title">
          Body
        </AlertDialog>
      </ThemeProvider>,
    );
    const host = container.querySelector('[data-theme]') as HTMLElement;
    await vi.waitFor(() => expect(host).toContainElement(screen.getByRole('alertdialog')));
  });

  it('has no detectable accessibility violations', async () => {
    render(
      <AlertDialog open showHelpButton title="Title">
        Body
      </AlertDialog>,
    );
    expect(await axe(screen.getByRole('alertdialog'))).toHaveNoViolations();
  });
});
