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

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axe } from '../../axe';
import { Select, SelectItem, SelectSize } from '../../../components/Select';
import type { SelectOption } from '../../../components/Select';

const options: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'pear', label: 'Pear' },
  { value: 'plum', label: 'Plum', disabled: true },
];

describe('Select', () => {
  it('renders a combobox named by its label, with the Figma defaults', () => {
    const { container } = render(<Select label="Fruit" placeholder="Choose" options={options} />);
    const trigger = screen.getByRole('combobox', { name: 'Fruit' });
    expect(trigger).toHaveTextContent('Choose');
    const root = container.querySelector('.selectRoot') as HTMLElement;
    expect(root).toHaveAttribute('part', 'root');
    expect(root).toHaveAttribute('data-size', SelectSize.Medium);
    expect(root).not.toHaveAttribute('data-inverse');
    expect(root).not.toHaveAttribute('data-read-only');
    expect(trigger).not.toHaveAttribute('aria-invalid');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it.each(Object.values(SelectSize))('reflects the %s size', (size) => {
    const { container } = render(<Select label="Fruit" size={size} options={options} />);
    expect(container.querySelector('.selectRoot')).toHaveAttribute('data-size', size);
  });

  it('opens on click and lists the options', async () => {
    const user = userEvent.setup();
    render(<Select label="Fruit" options={options} />);
    await user.click(screen.getByRole('combobox', { name: 'Fruit' }));
    const listbox = await screen.findByRole('listbox');
    expect(listbox).toBeInTheDocument();
    expect(screen.getAllByRole('option').map((option) => option.textContent)).toEqual(['Apple', 'Pear', 'Plum']);
    expect(listbox.closest('.selectPopup')).toHaveAttribute('data-size', SelectSize.Medium);
  });

  it('chooses an option, shows its label and reports the value', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Select label="Fruit" options={options} onValueChange={onValueChange} />);
    await user.click(screen.getByRole('combobox'));
    await user.click(await screen.findByRole('option', { name: 'Pear' }));
    expect(onValueChange).toHaveBeenCalledWith('pear', expect.anything());
    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
    expect(screen.getByRole('combobox')).toHaveTextContent('Pear');
  });

  it('shows the label of a default value', () => {
    render(<Select label="Fruit" options={options} defaultValue="apple" />);
    expect(screen.getByRole('combobox')).toHaveTextContent('Apple');
  });

  it('does not change a controlled value until the parent updates it', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Select label="Fruit" options={options} value="apple" onValueChange={onValueChange} />);
    await user.click(screen.getByRole('combobox'));
    await user.click(await screen.findByRole('option', { name: 'Pear' }));
    expect(onValueChange).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
    expect(screen.getByRole('combobox')).toHaveTextContent('Apple');
  });

  it('opens and chooses with the keyboard', async () => {
    const user = userEvent.setup();
    render(<Select label="Fruit" options={options} />);
    await user.tab();
    expect(screen.getByRole('combobox')).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    expect(await screen.findByRole('listbox')).toBeInTheDocument();
    await user.keyboard('{ArrowDown}{Enter}');
    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
    expect(screen.getByRole('combobox')).not.toHaveTextContent('Select');
  });

  it('starts open with defaultOpen and reports open changes', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<Select label="Fruit" options={options} defaultOpen onOpenChange={onOpenChange} />);
    expect(await screen.findByRole('listbox')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything());
  });

  it('does not let the user choose a disabled option', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Select label="Fruit" options={options} onValueChange={onValueChange} />);
    await user.click(screen.getByRole('combobox'));
    await user.click(await screen.findByRole('option', { name: 'Plum' }));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('renders a custom menu in place of the options', async () => {
    const user = userEvent.setup();
    render(
      <Select
        label="Fruit"
        options={options}
        menu={
          <>
            <SelectItem value="apple">Custom apple</SelectItem>
            <SelectItem value="fig" className="custom">
              Fig
            </SelectItem>
          </>
        }
      />,
    );
    await user.click(screen.getByRole('combobox'));
    expect(await screen.findByRole('option', { name: 'Custom apple' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Fig' })).toHaveClass('selectItem', 'custom');
    expect(screen.queryByRole('option', { name: 'Pear' })).not.toBeInTheDocument();
  });

  it('renders nothing in the list when there are neither options nor a menu', async () => {
    const user = userEvent.setup();
    render(<Select label="Fruit" />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.queryByRole('option')).not.toBeInTheDocument();
  });

  it('shows the required asterisk as decoration and marks the select required', () => {
    render(<Select label="Fruit" options={options} required />);
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-required', 'true');
  });

  it('hides the label with showLabel and keeps an aria-label usable', () => {
    render(<Select label="Fruit" showLabel={false} aria-label="Pick a fruit" options={options} />);
    expect(screen.queryByText('Fruit')).not.toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Pick a fruit' })).toBeInTheDocument();
  });

  it('renders the label through FormLabel, with its own part name and extra options', () => {
    const { container } = render(
      <Select label="Fruit" options={options} invalid disabled inverse labelProps={{ helperText: 'Pick one' }} />,
    );
    const label = container.querySelector('.formLabelRoot') as HTMLElement;
    expect(label).toHaveAttribute('part', 'label');
    expect(label).toHaveAttribute('data-invalid');
    expect(label).toHaveAttribute('data-disabled');
    expect(label).toHaveAttribute('data-inverse');
    expect(screen.getByText('Pick one')).toBeInTheDocument();
  });

  it('shows the helper text only when set and enabled', () => {
    const { rerender } = render(<Select label="Fruit" options={options} helperText="Pick one" />);
    expect(screen.getByText('Pick one')).toBeInTheDocument();

    rerender(<Select label="Fruit" options={options} helperText="Pick one" showHelperText={false} />);
    expect(screen.queryByText('Pick one')).not.toBeInTheDocument();
  });

  it('shows the error message, icon and aria-invalid only while invalid', () => {
    const { container, rerender } = render(<Select label="Fruit" options={options} errorMessage="Required" />);
    expect(screen.queryByText('Required')).not.toBeInTheDocument();
    expect(container.querySelector('.selectErrorIcon')).toBeNull();

    rerender(<Select label="Fruit" options={options} invalid errorMessage="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(container.querySelector('.selectErrorIcon svg')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');

    rerender(<Select label="Fruit" options={options} invalid errorMessage="Required" showErrorMessage={false} />);
    expect(screen.queryByText('Required')).not.toBeInTheDocument();
  });

  it('does not open when disabled', async () => {
    const user = userEvent.setup();
    render(<Select label="Fruit" options={options} disabled />);
    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeDisabled();
    await user.click(trigger);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('shows the chosen option without a caret and does not open when read-only', async () => {
    const user = userEvent.setup();
    const { container } = render(<Select label="Fruit" options={options} readOnly defaultValue="pear" />);
    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveTextContent('Pear');
    expect(container.querySelector('.selectRoot')).toHaveAttribute('data-read-only');
    expect(container.querySelector('.selectCaret')).toBeNull();
    await user.click(trigger);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('marks an inverse field and shows the caret unless showIcon is off', () => {
    const { container, rerender } = render(<Select label="Fruit" options={options} inverse />);
    expect(container.querySelector('.selectRoot')).toHaveAttribute('data-inverse');
    expect(container.querySelector('.selectCaret svg')).toHaveAttribute('aria-hidden', 'true');

    rerender(<Select label="Fruit" options={options} showIcon={false} />);
    expect(container.querySelector('.selectCaret')).toBeNull();
  });

  it('applies className and style to the root', () => {
    const { container } = render(<Select label="Fruit" options={options} className="custom" style={{ width: 120 }} />);
    const root = container.querySelector('.selectRoot') as HTMLElement;
    expect(root).toHaveClass('custom');
    expect(root).toHaveStyle({ width: '120px' });
  });

  it('submits the chosen value in a form', () => {
    const { container } = render(
      <form>
        <Select label="Fruit" options={options} name="fruit" defaultValue="pear" />
      </form>,
    );
    expect(new FormData(container.querySelector('form') as HTMLFormElement).get('fruit')).toBe('pear');
  });

  it('works without a ThemeProvider', () => {
    render(<Select label="Fruit" options={options} />);
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toBeInTheDocument();
  });

  it('has no accessibility violations in its main states', async () => {
    const { container } = render(
      <>
        <Select label="Default" options={options} />
        <Select label="Filled" options={options} defaultValue="apple" helperText="Helper" />
        <Select label="Invalid" options={options} invalid errorMessage="Error" required />
        <Select label="Disabled" options={options} disabled />
        <Select label="Read only" options={options} readOnly defaultValue="pear" />
        <Select label="Inverse" options={options} inverse size={SelectSize.Small} />
        <Select showLabel={false} aria-label="Search" options={options} />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no accessibility violations while open', async () => {
    const user = userEvent.setup();
    render(<Select label="Fruit" options={options} />);
    await user.click(screen.getByRole('combobox'));
    await screen.findByRole('listbox');
    // The popup is portaled to document.body, so axe has to scan the body. Its page-level `region` rule
    // (content inside landmarks) cannot pass for a bare component test, so it is off for this check only.
    expect(await axe(document.body, { rules: { region: { enabled: false } } })).toHaveNoViolations();
  });
});
