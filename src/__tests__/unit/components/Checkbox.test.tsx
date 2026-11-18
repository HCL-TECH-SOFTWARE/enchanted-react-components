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

import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { Checkbox, CheckboxVariant, type CheckboxProps } from '../../../components/Checkbox';
import { ShadowRootType, ThemeMode, ThemeProvider } from '../../../theme/ThemeProvider';

const renderCheckbox = (props: CheckboxProps = {}) =>
  render(
    <ThemeProvider mode={ThemeMode.Light} shadowRootType={ShadowRootType.None}>
      <Checkbox label="Accept the terms" {...props} />
    </ThemeProvider>,
  );

describe('Checkbox', () => {
  it('renders a checkbox named by its label, with the Figma defaults', () => {
    renderCheckbox();
    const checkbox = screen.getByRole('checkbox', { name: 'Accept the terms' });
    expect(checkbox).not.toBeChecked();
    expect(checkbox).not.toHaveAttribute('aria-invalid');
    expect(document.querySelector('.checkboxRoot')).toHaveAttribute('data-variant', 'withPadding');
  });

  it.each(Object.values(CheckboxVariant))('reflects the %s variant', (variant) => {
    renderCheckbox({ variant });
    expect(document.querySelector('.checkboxRoot')).toHaveAttribute('data-variant', variant);
  });

  it('renders without a label wrapper text when it has no label', () => {
    renderCheckbox({ label: undefined, 'aria-label': 'Select row' });
    expect(document.querySelector('.checkboxText')).toBeNull();
    expect(screen.getByRole('checkbox', { name: 'Select row' })).toBeInTheDocument();
  });

  it('toggles when the box or the label text is clicked', async () => {
    renderCheckbox();
    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    await userEvent.click(screen.getByText('Accept the terms'));
    expect(checkbox).not.toBeChecked();
  });

  it('toggles with the space key', async () => {
    renderCheckbox();
    const checkbox = screen.getByRole('checkbox');
    checkbox.focus();
    await userEvent.keyboard(' ');
    expect(checkbox).toBeChecked();
  });

  it('supports uncontrolled use with defaultChecked and reports changes', async () => {
    const onCheckedChange = vi.fn();
    renderCheckbox({ defaultChecked: true, onCheckedChange });
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
    await userEvent.click(checkbox);
    expect(onCheckedChange).toHaveBeenCalledWith(false, expect.anything());
  });

  it('supports controlled use', async () => {
    const Controlled = () => {
      const [checked, setChecked] = useState(false);
      return (
        <ThemeProvider mode={ThemeMode.Light} shadowRootType={ShadowRootType.None}>
          <Checkbox label="Controlled" checked={checked} onCheckedChange={setChecked} />
          <output>{checked ? 'on' : 'off'}</output>
        </ThemeProvider>
      );
    };
    render(<Controlled />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('status')).toHaveTextContent('on');
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('exposes the indeterminate state', () => {
    renderCheckbox({ indeterminate: true });
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'mixed');
  });

  it('does not toggle when disabled', async () => {
    renderCheckbox({ disabled: true });
    const checkbox = screen.getByRole('checkbox');
    expect(document.querySelector('.checkboxRoot')).toHaveAttribute('data-disabled');
    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('marks the error state with aria-invalid', () => {
    renderCheckbox({ error: true });
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
    expect(document.querySelector('.checkboxRoot')).toHaveAttribute('data-error');
  });

  it('describes the box with the helper text', () => {
    renderCheckbox({ helperText: 'Required to continue' });
    expect(screen.getByRole('checkbox')).toHaveAccessibleDescription('Required to continue');
  });

  it('shows the error message only while error is true, and describes the box with it', () => {
    const { unmount } = renderCheckbox({ errorMessage: 'You must accept' });
    expect(screen.queryByText('You must accept')).toBeNull();
    unmount();
    renderCheckbox({ error: true, errorMessage: 'You must accept', helperText: 'Required' });
    expect(screen.getByText('You must accept')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toHaveAccessibleDescription('Required You must accept');
  });

  it('merges a string or function className onto the control', () => {
    const { unmount } = renderCheckbox({ className: 'custom' });
    expect(screen.getByRole('checkbox')).toHaveClass('checkboxControl', 'custom');
    unmount();
    renderCheckbox({ className: () => 'from-fn' });
    expect(screen.getByRole('checkbox')).toHaveClass('checkboxControl', 'from-fn');
  });

  it('forwards other props to the control', () => {
    renderCheckbox({ 'data-testid': 'terms-box' } as CheckboxProps);
    expect(screen.getByRole('checkbox')).toBe(screen.getByTestId('terms-box'));
  });

  it('works without a ThemeProvider', () => {
    render(<Checkbox label="Plain" />);
    expect(screen.getByRole('checkbox', { name: 'Plain' })).toBeInTheDocument();
  });

  it('has no accessibility violations in the default, error, and disabled states', async () => {
    const { container, unmount } = renderCheckbox();
    expect(await axe(container)).toHaveNoViolations();
    unmount();
    const error = renderCheckbox({ error: true, errorMessage: 'Required', helperText: 'Help' });
    expect(await axe(error.container)).toHaveNoViolations();
    error.unmount();
    const disabled = renderCheckbox({ disabled: true });
    expect(await axe(disabled.container)).toHaveNoViolations();
  });
});
