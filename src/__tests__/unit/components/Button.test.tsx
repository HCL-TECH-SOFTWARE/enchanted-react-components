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
import type { FormEvent } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axe } from '../../axe';
import { Button, ButtonColor, ButtonSize, ButtonVariant } from '../../../components/Button';

describe('Button', () => {
  it('renders its label as a button with the Figma defaults', () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toHaveAttribute('data-variant', ButtonVariant.Contained);
    expect(button).toHaveAttribute('data-color', ButtonColor.Brand);
    expect(button).toHaveAttribute('data-size', ButtonSize.Medium);
    expect(button).not.toHaveAttribute('data-inverse');
    expect(button).not.toHaveAttribute('data-pressed');
    expect(button).not.toHaveAttribute('aria-pressed');
  });

  it('exposes the root as the `root` part for ::part styling', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('part', 'root');
  });

  it.each(Object.values(ButtonVariant))('reflects the %s variant', (variant) => {
    render(<Button variant={variant}>Save</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('data-variant', variant);
  });

  it.each(Object.values(ButtonColor))('reflects the %s color', (color) => {
    render(<Button color={color}>Save</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('data-color', color);
  });

  it.each(Object.values(ButtonSize))('reflects the %s size', (size) => {
    render(<Button size={size}>Save</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('data-size', size);
  });

  it('marks an inverse button', () => {
    render(<Button inverse>Save</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('data-inverse', 'true');
  });

  it('is a toggle only when `pressed` is set, and reports both states', () => {
    const { rerender } = render(<Button pressed>Bold</Button>);
    const button = screen.getByRole('button', { name: 'Bold' });
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button).toHaveAttribute('data-pressed', 'true');

    rerender(<Button pressed={false}>Bold</Button>);
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(button).not.toHaveAttribute('data-pressed');
  });

  it('renders start and end icons around the label', () => {
    render(
      <Button startIcon={<span data-testid="start" />} endIcon={<span data-testid="end" />}>
        Next
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Next' });
    expect(button.firstElementChild).toContainElement(screen.getByTestId('start'));
    expect(button.lastElementChild).toContainElement(screen.getByTestId('end'));
  });

  it('renders no icon or label wrappers when none are given', () => {
    render(<Button aria-label="Empty" />);
    expect(screen.getByRole('button', { name: 'Empty' })).toBeEmptyDOMElement();
  });

  it('calls onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    await user.click(screen.getByRole('button', { name: 'Save' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('activates with Enter and Space', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    await user.tab();
    expect(screen.getByRole('button')).toHaveFocus();
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('does not fire when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Save' });
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  it('submits a form from a submit button', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((event: FormEvent) => event.preventDefault());
    render(
      <form onSubmit={onSubmit}>
        <Button type="submit">Send</Button>
      </form>,
    );
    await user.click(screen.getByRole('button', { name: 'Send' }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('forwards ref, data attributes and aria attributes to the button', () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <Button ref={ref} data-testid="cta" aria-describedby="hint">
        Save
      </Button>,
    );
    const button = screen.getByTestId('cta');
    expect(ref.current).toBe(button);
    expect(button).toHaveAttribute('aria-describedby', 'hint');
  });

  it('merges a string className after the library class', () => {
    render(<Button className="custom">Save</Button>);
    expect(screen.getByRole('button')).toHaveClass('buttonRoot', 'custom');
  });

  it('merges a className function with the library class', () => {
    render(<Button className={(state) => (state.disabled ? 'is-disabled' : 'is-enabled')}>Save</Button>);
    expect(screen.getByRole('button')).toHaveClass('buttonRoot', 'is-enabled');
  });

  it('works without a ThemeProvider', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('has no accessibility violations in its main states', async () => {
    const { container } = render(
      <>
        <Button>Default</Button>
        <Button variant={ButtonVariant.Outlined} color={ButtonColor.Error}>
          Outlined
        </Button>
        <Button variant={ButtonVariant.Text} size={ButtonSize.ExtraSmall}>
          Text
        </Button>
        <Button pressed>Pressed</Button>
        <Button disabled>Disabled</Button>
        <Button inverse>Inverse</Button>
        <Button aria-label="Add" startIcon={<span aria-hidden="true">+</span>} />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
