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

import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import {
  IconButton,
  IconButtonSize,
  IconButtonVariant,
  type IconButtonProps,
} from '../../../components/IconButton';
import { ShadowRootType, ThemeMode, ThemeProvider } from '../../../theme/ThemeProvider';

const renderIconButton = (props: Partial<IconButtonProps> = {}) =>
  render(
    <ThemeProvider mode={ThemeMode.Light} shadowRootType={ShadowRootType.None}>
      <IconButton icon={<i data-testid="icon" />} aria-label="Add" {...props} />
    </ThemeProvider>,
  );

describe('IconButton', () => {
  it('renders a button named by its aria-label, with the Figma defaults', () => {
    renderIconButton();
    const button = screen.getByRole('button', { name: 'Add' });
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(button).toHaveAttribute('data-variant', 'withPadding');
    expect(button).toHaveAttribute('data-size', 'medium');
    expect(button).not.toHaveAttribute('data-inverse');
    expect(button).not.toHaveAttribute('data-selected');
  });

  it.each(Object.values(IconButtonVariant))('reflects the %s variant', (variant) => {
    renderIconButton({ variant });
    expect(screen.getByRole('button')).toHaveAttribute('data-variant', variant);
  });

  it.each(Object.values(IconButtonSize))('reflects the %s size', (size) => {
    renderIconButton({ size });
    expect(screen.getByRole('button')).toHaveAttribute('data-size', size);
  });

  it('marks inverse colors and the selected state without setting aria-pressed', () => {
    renderIconButton({ inverseColors: true, selected: true });
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-inverse');
    expect(button).toHaveAttribute('data-selected');
    expect(button).not.toHaveAttribute('aria-pressed');
  });

  it('renders no label or end icon unless given', () => {
    renderIconButton();
    expect(document.querySelector('.iconButtonLabel')).toBeNull();
    expect(document.querySelector('.iconButtonEndIcon')).toBeNull();
  });

  it('renders the label and the end icon', () => {
    renderIconButton({ children: 'Add item', endIcon: <i data-testid="end" /> });
    expect(document.querySelector('.iconButtonLabel')).toHaveTextContent('Add item');
    expect(screen.getByTestId('end')).toBeInTheDocument();
  });

  it('calls onClick for a click and for the keyboard', async () => {
    const onClick = vi.fn();
    renderIconButton({ onClick });
    const button = screen.getByRole('button');
    await userEvent.click(button);
    button.focus();
    await userEvent.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('does not call onClick when disabled', async () => {
    const onClick = vi.fn();
    renderIconButton({ disabled: true, onClick });
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('merges a string or function className after the root class', () => {
    const { unmount } = renderIconButton({ className: 'custom' });
    expect(screen.getByRole('button')).toHaveClass('iconButtonRoot', 'custom');
    unmount();
    renderIconButton({ className: () => 'from-fn' });
    expect(screen.getByRole('button')).toHaveClass('iconButtonRoot', 'from-fn');
  });

  it('forwards a ref and other props', () => {
    const ref = createRef<HTMLButtonElement>();
    renderIconButton({ ref, id: 'add' });
    expect(ref.current).toBe(screen.getByRole('button'));
    expect(ref.current).toHaveAttribute('id', 'add');
  });

  it('works without a ThemeProvider', () => {
    render(<IconButton icon={<i />} aria-label="Plain" />);
    expect(screen.getByRole('button', { name: 'Plain' })).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = renderIconButton();
    expect(await axe(container)).toHaveNoViolations();
  });
});
