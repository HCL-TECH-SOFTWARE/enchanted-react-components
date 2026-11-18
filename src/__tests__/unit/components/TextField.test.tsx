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
import { TextField, TextFieldSize, type TextFieldProps } from '../../../components/TextField';
import { ShadowRootType, ThemeMode, ThemeProvider } from '../../../theme/ThemeProvider';

const renderField = (props: TextFieldProps = {}) =>
  render(
    <ThemeProvider mode={ThemeMode.Light} shadowRootType={ShadowRootType.None}>
      <TextField label="Name" {...props} />
    </ThemeProvider>,
  );

const root = () => document.querySelector('.textFieldRoot');

describe('TextField', () => {
  it('renders a textbox named by its label, with the Figma defaults', () => {
    renderField();
    const input = screen.getByRole('textbox', { name: 'Name' });
    expect(input.tagName).toBe('INPUT');
    expect(root()).toHaveAttribute('data-size', 'medium');
    expect(root()).not.toHaveAttribute('data-inverse');
    expect(root()).not.toHaveAttribute('data-multiline');
    expect(input).not.toHaveAttribute('aria-invalid');
  });

  it.each(Object.values(TextFieldSize))('reflects the %s size', (size) => {
    renderField({ size });
    expect(root()).toHaveAttribute('data-size', size);
  });

  it('marks inverse colors', () => {
    renderField({ inverseColors: true });
    expect(root()).toHaveAttribute('data-inverse');
  });

  it('renders a textarea when multiline', () => {
    renderField({ multiline: true });
    expect(screen.getByRole('textbox', { name: 'Name' }).tagName).toBe('TEXTAREA');
    expect(root()).toHaveAttribute('data-multiline');
  });

  it('renders without a label unless given', () => {
    renderField({ label: undefined, 'aria-label': 'Search' });
    expect(document.querySelector('.textFieldLabel')).toBeNull();
    expect(screen.getByRole('textbox', { name: 'Search' })).toBeInTheDocument();
  });

  it('renders the optional parts only when given', () => {
    const { unmount } = renderField();
    for (const part of ['ContentTop', 'ContentBottom', 'Unit', 'Adornment', 'HelperText']) {
      expect(document.querySelector(`.textField${part}`)).toBeNull();
    }
    unmount();
    renderField({
      contentTop: <span>Top</span>,
      contentBottom: <span>Bottom</span>,
      unitLabel: 'px',
      inputAdornment: <i data-testid="adornment" />,
      helperText: 'As shown on your badge',
    });
    expect(screen.getByText('Top')).toBeInTheDocument();
    expect(screen.getByText('Bottom')).toBeInTheDocument();
    expect(screen.getByText('px')).toBeInTheDocument();
    expect(screen.getByTestId('adornment')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAccessibleDescription('As shown on your badge');
  });

  it('accepts typing in uncontrolled use and reports changes', async () => {
    const onChange = vi.fn();
    renderField({ onChange });
    await userEvent.type(screen.getByRole('textbox'), 'Ada');
    expect(screen.getByRole('textbox')).toHaveValue('Ada');
    expect(onChange).toHaveBeenCalledTimes(3);
  });

  it('supports controlled use', async () => {
    const Controlled = () => {
      const [value, setValue] = useState('');
      return (
        <ThemeProvider mode={ThemeMode.Light} shadowRootType={ShadowRootType.None}>
          <TextField label="Name" value={value} onChange={(event) => setValue(event.target.value.toUpperCase())} />
        </ThemeProvider>
      );
    };
    render(<Controlled />);
    await userEvent.type(screen.getByRole('textbox'), 'ada');
    expect(screen.getByRole('textbox')).toHaveValue('ADA');
  });

  it('shows the placeholder', () => {
    renderField({ placeholder: 'Your name' });
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
  });

  it('does not accept input when disabled or read-only', async () => {
    const { unmount } = renderField({ disabled: true });
    expect(screen.getByRole('textbox')).toBeDisabled();
    unmount();
    renderField({ readOnly: true, defaultValue: 'fixed' });
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('readonly');
    await userEvent.type(input, 'x');
    expect(input).toHaveValue('fixed');
  });

  it('marks the error state with aria-invalid', () => {
    renderField({ error: true });
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('merges a string or function className onto the input', () => {
    const { unmount } = renderField({ className: 'custom' });
    expect(screen.getByRole('textbox')).toHaveClass('textFieldInput', 'custom');
    unmount();
    renderField({ className: () => 'from-fn' });
    expect(screen.getByRole('textbox')).toHaveClass('textFieldInput', 'from-fn');
  });

  it('forwards other props to the input', () => {
    renderField({ name: 'full-name', maxLength: 10 });
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'full-name');
    expect(screen.getByRole('textbox')).toHaveAttribute('maxlength', '10');
  });

  it('works without a ThemeProvider', () => {
    render(<TextField label="Plain" />);
    expect(screen.getByRole('textbox', { name: 'Plain' })).toBeInTheDocument();
  });

  it('has no accessibility violations in the default, error, multiline, and disabled states', async () => {
    for (const props of [{}, { error: true, helperText: 'Help' }, { multiline: true }, { disabled: true }]) {
      const { container, unmount } = renderField(props);
      expect(await axe(container)).toHaveNoViolations();
      unmount();
    }
  });
});
