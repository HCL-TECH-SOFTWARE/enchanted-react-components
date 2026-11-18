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
import { Button, ButtonColor, ButtonSize, ButtonVariant, type ButtonProps } from '../../../components/Button';
import { ShadowRootType, ThemeMode, ThemeProvider } from '../../../theme/ThemeProvider';

const renderButton = (props: ButtonProps = {}) =>
  render(
    <ThemeProvider mode={ThemeMode.Light} shadowRootType={ShadowRootType.None}>
      <Button {...props}>Save</Button>
    </ThemeProvider>,
  );

describe('Button', () => {
  it('renders a button with an accessible name and the Figma defaults', () => {
    renderButton();
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toHaveAttribute('data-variant', 'contained');
    expect(button).toHaveAttribute('data-color', 'primary');
    expect(button).toHaveAttribute('data-size', 'medium');
    expect(button).not.toHaveAttribute('data-inverse');
    expect(button).not.toHaveAttribute('data-selected');
  });

  it.each(Object.values(ButtonVariant))('reflects the %s variant', (variant) => {
    renderButton({ variant });
    expect(screen.getByRole('button')).toHaveAttribute('data-variant', variant);
  });

  it.each(Object.values(ButtonColor))('reflects the %s color', (color) => {
    renderButton({ color });
    expect(screen.getByRole('button')).toHaveAttribute('data-color', color);
  });

  it.each(Object.values(ButtonSize))('reflects the %s size', (size) => {
    renderButton({ size });
    expect(screen.getByRole('button')).toHaveAttribute('data-size', size);
  });

  it('marks inverse colors and the selected state without setting aria-pressed', () => {
    renderButton({ inverseColors: true, selected: true });
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-inverse');
    expect(button).toHaveAttribute('data-selected');
    expect(button).not.toHaveAttribute('aria-pressed');
  });

  it('renders the start and end icons around the label', () => {
    renderButton({ startIcon: <i data-testid="start" />, endIcon: <i data-testid="end" /> });
    const button = screen.getByRole('button');
    const parts = Array.from(button.children).map((child) => child.textContent || child.firstElementChild?.getAttribute('data-testid'));
    expect(parts).toEqual(['start', 'Save', 'end']);
  });

  it('renders without a label wrapper when it has no children', () => {
    render(
      <ThemeProvider mode={ThemeMode.Light} shadowRootType={ShadowRootType.None}>
        <Button aria-label="Add" startIcon={<i data-testid="icon" />} />
      </ThemeProvider>,
    );
    expect(document.querySelector('.buttonLabel')).toBeNull();
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  it('calls onClick for a click and for the keyboard', async () => {
    const onClick = vi.fn();
    renderButton({ onClick });
    const button = screen.getByRole('button');
    await userEvent.click(button);
    button.focus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it('does not call onClick when disabled', async () => {
    const onClick = vi.fn();
    renderButton({ disabled: true, onClick });
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('merges a string or function className after the root class', () => {
    const { unmount } = renderButton({ className: 'custom' });
    expect(screen.getByRole('button')).toHaveClass('buttonRoot', 'custom');
    unmount();
    renderButton({ className: () => 'from-fn' });
    expect(screen.getByRole('button')).toHaveClass('buttonRoot', 'from-fn');
  });

  it('forwards a ref and other props', () => {
    const ref = createRef<HTMLButtonElement>();
    renderButton({ ref, id: 'save', type: 'submit' });
    expect(ref.current).toBe(screen.getByRole('button'));
    expect(ref.current).toHaveAttribute('id', 'save');
    expect(ref.current).toHaveAttribute('type', 'submit');
  });

  it('works without a ThemeProvider', () => {
    render(<Button>Plain</Button>);
    expect(screen.getByRole('button', { name: 'Plain' })).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = renderButton();
    expect(await axe(container)).toHaveNoViolations();
  });
});
