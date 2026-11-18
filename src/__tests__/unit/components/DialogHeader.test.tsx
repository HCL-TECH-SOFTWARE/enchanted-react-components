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

import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { Dialog, DialogHeader, type DialogHeaderProps } from '../../../components/Dialog';
import { ShadowRootType, ThemeMode, ThemeProvider } from '../../../theme/ThemeProvider';

const renderHeader = (props: DialogHeaderProps = {}, onOpenChange?: (open: boolean) => void) =>
  render(
    <ThemeProvider mode={ThemeMode.Light} shadowRootType={ShadowRootType.None}>
      <Dialog open onOpenChange={onOpenChange} header={<DialogHeader data-testid="header" {...props}>Delete item</DialogHeader>}>
        Content
      </Dialog>
    </ThemeProvider>,
  );

describe('DialogHeader', () => {
  it('names the dialog with its title', () => {
    renderHeader();
    expect(screen.getByRole('dialog', { name: 'Delete item' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Delete item' })).toBeInTheDocument();
  });

  it('shows the close button and divider by default', () => {
    renderHeader();
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
    expect(screen.getByTestId('header')).toHaveAttribute('data-with-divider');
  });

  it('closes the dialog from the close button', async () => {
    const onOpenChange = vi.fn();
    renderHeader({}, onOpenChange);
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything());
  });

  it('uses a custom close label', () => {
    renderHeader({ closeLabel: 'Dismiss' });
    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument();
  });

  it('hides the close button and divider on request', () => {
    renderHeader({ showCloseIcon: false, showDivider: false });
    expect(screen.queryByRole('button', { name: 'Close' })).toBeNull();
    expect(screen.getByTestId('header')).not.toHaveAttribute('data-with-divider');
  });

  it('renders the icon and actions', () => {
    renderHeader({ icon: <span data-testid="icon" />, actions: <button type="button">Extra</button> });
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Extra' })).toBeInTheDocument();
  });

  describe('with parts left out', () => {
    // The helper above always passes a title, so these render the header directly.
    const renderBare = (header: ReactNode) =>
      render(
        <ThemeProvider mode={ThemeMode.Light} shadowRootType={ShadowRootType.None}>
          <Dialog open header={header} aria-label="Bare">
            Content
          </Dialog>
        </ThemeProvider>,
      );

    it('renders no title group without a title or icon', () => {
      renderBare(<DialogHeader />);
      expect(document.querySelector('.dialogHeaderTitleGroup')).toBeNull();
      expect(screen.queryByRole('heading')).toBeNull();
      expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
    });

    it('renders an icon without a title', () => {
      renderBare(<DialogHeader icon={<span data-testid="icon" />} />);
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.queryByRole('heading')).toBeNull();
    });

    it('renders a title without an icon', () => {
      renderBare(<DialogHeader>Only title</DialogHeader>);
      expect(document.querySelector('.dialogHeaderIcon')).toBeNull();
      expect(screen.getByRole('heading', { name: 'Only title' })).toBeInTheDocument();
    });

    it('renders actions without the close button', () => {
      renderBare(
        <DialogHeader showCloseIcon={false} actions={<button type="button">Extra</button>}>
          Title
        </DialogHeader>,
      );
      expect(screen.getByRole('button', { name: 'Extra' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Close' })).toBeNull();
    });

    it('renders no end group without actions or the close button', () => {
      renderBare(<DialogHeader showCloseIcon={false}>Title</DialogHeader>);
      expect(document.querySelector('.dialogHeaderEnd')).toBeNull();
    });

    it('merges a custom className', () => {
      renderBare(<DialogHeader className="custom">Title</DialogHeader>);
      expect(document.querySelector('.dialogHeaderRoot')).toHaveClass('custom');
    });
  });

  it('has no accessibility violations', async () => {
    renderHeader();
    expect(await axe(screen.getByRole('dialog'))).toHaveNoViolations();
  });
});
