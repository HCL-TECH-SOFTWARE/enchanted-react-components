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

import { createRef, useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axe } from '../../axe';
import { TextField, TextFieldSize } from '../../../components/TextField';

describe('TextField', () => {
  it('renders a text box named by its label, with the Figma defaults', () => {
    const { container } = render(<TextField label="Name" />);
    const input = screen.getByRole('textbox', { name: 'Name' });
    expect(input.tagName).toBe('INPUT');
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveAttribute('part', 'root');
    expect(root).toHaveAttribute('data-size', TextFieldSize.Medium);
    expect(root).not.toHaveAttribute('data-multiline');
    expect(root).not.toHaveAttribute('data-inverse');
    expect(root).not.toHaveAttribute('data-read-only');
    expect(input).not.toBeRequired();
    expect(input).not.toHaveAttribute('aria-invalid');
  });

  it.each(Object.values(TextFieldSize))('reflects the %s size', (size) => {
    const { container } = render(<TextField label="Name" size={size} />);
    expect(container.firstElementChild).toHaveAttribute('data-size', size);
  });

  it('renders a textarea for multiline, with one row unless told otherwise', () => {
    const { container, rerender } = render(<TextField label="Notes" multiline />);
    const textarea = screen.getByRole('textbox', { name: 'Notes' });
    expect(textarea.tagName).toBe('TEXTAREA');
    expect(textarea).toHaveAttribute('rows', '1');
    expect(textarea).not.toHaveAttribute('type');
    expect(container.firstElementChild).toHaveAttribute('data-multiline');

    rerender(<TextField label="Notes" multiline rows={4} />);
    expect(screen.getByRole('textbox', { name: 'Notes' })).toHaveAttribute('rows', '4');
  });

  it('marks inverse, read-only and drag-handle fields for styling', () => {
    const { container, rerender } = render(<TextField label="A" inverse readOnly />);
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveAttribute('data-inverse');
    expect(root).toHaveAttribute('data-read-only');
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
    expect(root).not.toHaveAttribute('data-drag-handle');

    rerender(<TextField label="A" multiline showDragHandle />);
    expect(container.firstElementChild).toHaveAttribute('data-drag-handle');

    // The handle resizes a textarea only, so a single-line field ignores it.
    rerender(<TextField label="A" showDragHandle />);
    expect(container.firstElementChild).not.toHaveAttribute('data-drag-handle');
  });

  it('shows the required asterisk as decoration and marks the input required', () => {
    render(<TextField label="Name" required />);
    expect(screen.getByRole('textbox', { name: /Name/ })).toBeRequired();
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders the label through FormLabel, with its own part name and extra options', () => {
    const { container } = render(
      <TextField label="Name" invalid disabled inverse labelProps={{ showHelpIcon: true, helperText: 'Legal name' }} />,
    );
    const label = container.querySelector('.formLabelRoot') as HTMLElement;
    expect(label).toHaveAttribute('part', 'label');
    expect(label).toHaveAttribute('data-invalid');
    expect(label).toHaveAttribute('data-disabled');
    expect(label).toHaveAttribute('data-inverse');
    expect(container.querySelector('.formLabelHelpIcon')).toBeInTheDocument();
    expect(screen.getByText('Legal name')).toBeInTheDocument();
  });

  it('hides the label with showLabel and keeps an aria-label usable', () => {
    render(<TextField label="Name" showLabel={false} aria-label="Full name" />);
    expect(screen.queryByText('Name')).not.toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Full name' })).toBeInTheDocument();
  });

  it('renders no label when none is given', () => {
    const { container } = render(<TextField aria-label="Bare" />);
    expect(container.querySelector('label')).toBeNull();
  });

  it('describes the input with the helper text, and hides it with showHelperText', () => {
    const { rerender } = render(<TextField label="Name" helperText="Use your legal name" />);
    expect(screen.getByRole('textbox')).toHaveAccessibleDescription('Use your legal name');

    rerender(<TextField label="Name" helperText="Use your legal name" showHelperText={false} />);
    expect(screen.queryByText('Use your legal name')).not.toBeInTheDocument();
  });

  it('shows the error message and aria-invalid only while invalid', () => {
    const { rerender } = render(<TextField label="Name" errorMessage="Required" />);
    expect(screen.queryByText('Required')).not.toBeInTheDocument();
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid');

    rerender(<TextField label="Name" invalid errorMessage="Required" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAccessibleDescription('Required');

    rerender(<TextField label="Name" invalid errorMessage="Required" showErrorMessage={false} />);
    expect(screen.queryByText('Required')).not.toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('is disabled when disabled', async () => {
    const user = userEvent.setup();
    render(<TextField label="Name" disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    await user.type(input, 'abc');
    expect(input).toHaveValue('');
  });

  it('shows the unit label only when set and enabled', () => {
    const { rerender } = render(<TextField label="Width" unitLabel="px" />);
    expect(screen.getByText('px')).toBeInTheDocument();

    rerender(<TextField label="Width" unitLabel="px" showUnitLabel={false} />);
    expect(screen.queryByText('px')).not.toBeInTheDocument();

    rerender(<TextField label="Width" />);
    expect(screen.queryByText('px')).not.toBeInTheDocument();
  });

  it('renders the end adornment and the top and bottom content, each hidden by its show prop', () => {
    const slots = {
      endAdornment: <span>end</span>,
      contentTop: <span>top</span>,
      contentBottom: <span>bottom</span>,
    };
    const { rerender } = render(<TextField label="A" {...slots} />);
    expect(screen.getByText('end')).toBeInTheDocument();
    expect(screen.getByText('top')).toBeInTheDocument();
    expect(screen.getByText('bottom')).toBeInTheDocument();

    rerender(<TextField label="A" {...slots} showEndAdornment={false} showContentTop={false} showContentBottom={false} />);
    expect(screen.queryByText('end')).not.toBeInTheDocument();
    expect(screen.queryByText('top')).not.toBeInTheDocument();
    expect(screen.queryByText('bottom')).not.toBeInTheDocument();
  });

  it('types into an uncontrolled field and reports the value', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<TextField label="Name" onValueChange={onValueChange} />);
    await user.type(screen.getByRole('textbox'), 'ab');
    expect(screen.getByRole('textbox')).toHaveValue('ab');
    expect(onValueChange).toHaveBeenLastCalledWith('ab', expect.anything());
  });

  it('does not change a controlled value until the parent updates it', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<TextField label="Name" value="fixed" onValueChange={onValueChange} />);
    await user.type(screen.getByRole('textbox'), 'x');
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('textbox')).toHaveValue('fixed');
  });

  it('cannot be edited when read-only', async () => {
    const user = userEvent.setup();
    render(<TextField label="Name" readOnly defaultValue="locked" />);
    await user.type(screen.getByRole('textbox'), 'x');
    expect(screen.getByRole('textbox')).toHaveValue('locked');
  });

  it('is reachable and editable with the keyboard', async () => {
    const user = userEvent.setup();
    render(<TextField label="Name" />);
    await user.tab();
    expect(screen.getByRole('textbox')).toHaveFocus();
    await user.keyboard('hi');
    expect(screen.getByRole('textbox')).toHaveValue('hi');
  });

  describe('clear button', () => {
    it('clears an uncontrolled input, reports it and returns focus to the field', async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(<TextField label="Name" defaultValue="abc" onValueChange={onValueChange} />);
      await user.click(screen.getByRole('button', { name: 'Clear' }));
      expect(screen.getByRole('textbox')).toHaveValue('');
      expect(screen.getByRole('textbox')).toHaveFocus();
      expect(onValueChange).toHaveBeenCalledWith('', expect.anything());
    });

    it('clears a textarea', async () => {
      const user = userEvent.setup();
      render(<TextField label="Notes" multiline defaultValue="abc" />);
      await user.click(screen.getByRole('button', { name: 'Clear' }));
      expect(screen.getByRole('textbox')).toHaveValue('');
    });

    it('clears a controlled field through the parent', async () => {
      const user = userEvent.setup();
      const Controlled = () => {
        const [value, setValue] = useState('abc');
        return <TextField label="Name" value={value} onValueChange={setValue} />;
      };
      render(<Controlled />);
      await user.click(screen.getByRole('button', { name: 'Clear' }));
      expect(screen.getByRole('textbox')).toHaveValue('');
    });

    it('uses a custom accessible name', () => {
      render(<TextField label="Name" clearLabel="Effacer" />);
      expect(screen.getByRole('button', { name: 'Effacer' })).toBeInTheDocument();
    });

    it('keeps focus in the field on mouse down, and stays out of the tab order', () => {
      render(<TextField label="Name" />);
      const button = screen.getByRole('button', { name: 'Clear' });
      expect(button).toHaveAttribute('tabindex', '-1');
      // fireEvent returns false when the handler called preventDefault.
      expect(fireEvent.mouseDown(button)).toBe(false);
    });

    it.each([
      ['showClearIcon is false', { showClearIcon: false }],
      ['read-only', { readOnly: true }],
      ['disabled', { disabled: true }],
    ])('is not rendered when %s', (_name, props) => {
      render(<TextField label="Name" {...props} />);
      expect(screen.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument();
    });
  });

  it('forwards a function ref, an object ref and none, to the input and the textarea', () => {
    const functionRef = vi.fn();
    const objectRef = createRef<HTMLInputElement | HTMLTextAreaElement>();
    const { rerender } = render(<TextField label="A" ref={functionRef} />);
    expect(functionRef).toHaveBeenCalledWith(screen.getByRole('textbox'));

    rerender(<TextField label="A" ref={objectRef} multiline />);
    expect(objectRef.current).toBe(screen.getByRole('textbox'));
    expect(objectRef.current?.tagName).toBe('TEXTAREA');

    rerender(<TextField label="A" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('applies className and style to the root and other props to the input', () => {
    const { container } = render(
      <TextField label="A" className="custom" style={{ width: 120 }} name="email" placeholder="you@example.com" data-testid="control" />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass('textFieldRoot', 'custom');
    expect(root).toHaveStyle({ width: '120px' });
    const input = screen.getByTestId('control');
    expect(input).toHaveAttribute('name', 'email');
    expect(input).toHaveAttribute('placeholder', 'you@example.com');
  });

  it('submits its value in a form', () => {
    const { container } = render(
      <form>
        <TextField label="Email" name="email" defaultValue="a@b.c" />
      </form>,
    );
    expect(new FormData(container.querySelector('form') as HTMLFormElement).get('email')).toBe('a@b.c');
  });

  it('works without a ThemeProvider', () => {
    render(<TextField label="Name" />);
    expect(screen.getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
  });

  it('has no accessibility violations in its main states', async () => {
    const { container } = render(
      <>
        <TextField label="Default" />
        <TextField label="Filled" defaultValue="Input text" helperText="Helper" />
        <TextField label="Invalid" invalid errorMessage="Error" required />
        <TextField label="Disabled" disabled />
        <TextField label="Read only" readOnly defaultValue="Locked" />
        <TextField label="Multiline" multiline />
        <TextField label="Inverse" inverse unitLabel="px" />
        <TextField showLabel={false} aria-label="Search" endAdornment={<span aria-hidden="true">+</span>} />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
