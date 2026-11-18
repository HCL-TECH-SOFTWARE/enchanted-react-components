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
import { axe } from 'vitest-axe';
import { Dialog, DialogHeader, DialogSize, type DialogProps } from '../../../components/Dialog';
import { ShadowRootType, ThemeMode, ThemeProvider } from '../../../theme/ThemeProvider';

const renderDialog = (props: Partial<DialogProps> = {}, shadowRootType: ShadowRootType = ShadowRootType.None) =>
  render(
    <ThemeProvider mode={ThemeMode.Light} shadowRootType={shadowRootType}>
      <Dialog open header={<DialogHeader>Title</DialogHeader>} {...props}>
        Body
      </Dialog>
    </ThemeProvider>,
  );

describe('Dialog', () => {
  it('renders its content in a dialog with the Figma defaults', () => {
    renderDialog();
    const dialog = screen.getByRole('dialog', { name: 'Title' });
    expect(dialog).toHaveTextContent('Body');
    expect(dialog).toHaveAttribute('data-size', 'sm');
    expect(dialog).toHaveAttribute('data-with-padding');
    expect(dialog).not.toHaveAttribute('data-scroll');
  });

  it('reflects size, withPadding, and scroll', () => {
    renderDialog({ size: DialogSize.ExtraLarge, withPadding: false, scroll: true });
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('data-size', 'xl');
    expect(dialog).not.toHaveAttribute('data-with-padding');
    expect(dialog).toHaveAttribute('data-scroll');
  });

  it('renders the header and footer only when given', () => {
    const { unmount } = renderDialog({ header: undefined });
    expect(document.querySelector('.dialogHeader')).toBeNull();
    expect(document.querySelector('.dialogFooter')).toBeNull();
    unmount();

    renderDialog({ footer: <button type="button">Save</button> });
    expect(document.querySelector('.dialogHeader')).toHaveTextContent('Title');
    expect(document.querySelector('.dialogFooter')).toContainElement(screen.getByRole('button', { name: 'Save' }));
  });

  it('renders nothing while closed', () => {
    renderDialog({ open: false });
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('passes the root props through, so onOpenChange fires on Escape', async () => {
    const onOpenChange = vi.fn();
    renderDialog({ onOpenChange });
    await userEvent.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything());
  });

  it('renders into the ThemeProvider boundary so it keeps its styles', () => {
    const { container } = renderDialog({}, ShadowRootType.Open);
    const host = container.firstElementChild as HTMLElement;
    expect(host.shadowRoot?.querySelector('[role="dialog"]')).not.toBeNull();
  });

  it('renders into the document body without a boundary', () => {
    renderDialog();
    expect(document.body).toContainElement(screen.getByRole('dialog'));
  });

  it('has no accessibility violations', async () => {
    renderDialog();
    expect(await axe(screen.getByRole('dialog'))).toHaveNoViolations();
  });
});
