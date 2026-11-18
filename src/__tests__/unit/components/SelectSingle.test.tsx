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

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { Combobox } from '@base-ui/react/combobox';
import { SelectSingle, SelectSingleSize, type SelectSingleProps } from '../../../components/SelectSingle';
import { ShadowRootType, ThemeMode, ThemeProvider } from '../../../theme/ThemeProvider';

const fruits = ['Apple', 'Banana', 'Cherry'];

const menu = (
  <Combobox.List>
    {(item: string) => (
      <Combobox.Item key={item} value={item}>
        {item}
      </Combobox.Item>
    )}
  </Combobox.List>
);

const renderSelect = (props: Partial<SelectSingleProps> = {}, shadowRootType: ShadowRootType = ShadowRootType.None) =>
  render(
    <ThemeProvider mode={ThemeMode.Light} shadowRootType={shadowRootType}>
      <SelectSingle label="Fruit" items={fruits} menu={menu} {...props} />
    </ThemeProvider>,
  );

const root = () => document.querySelector('.selectSingleRoot');

describe('SelectSingle', () => {
  it('renders a combobox named by its label, with the Figma defaults', () => {
    renderSelect();
    const input = screen.getByRole('combobox', { name: 'Fruit' });
    expect(input).not.toHaveAttribute('aria-invalid');
    expect(root()).toHaveAttribute('data-size', 'medium');
    expect(root()).not.toHaveAttribute('data-inverse');
  });

  it.each(Object.values(SelectSingleSize))('reflects the %s size', (size) => {
    renderSelect({ size });
    expect(root()).toHaveAttribute('data-size', size);
  });

  it('marks inverse colors', () => {
    renderSelect({ inverseColors: true });
    expect(root()).toHaveAttribute('data-inverse');
  });

  it('shows the placeholder, start adornment, and helper text only when given', () => {
    const { unmount } = renderSelect();
    expect(document.querySelector('.selectSingleAdornment')).toBeNull();
    expect(document.querySelector('.selectSingleHelperText')).toBeNull();
    unmount();
    renderSelect({ placeholder: 'Pick one', startAdornment: <i data-testid="adornment" />, helperText: 'Any fruit' });
    expect(screen.getByPlaceholderText('Pick one')).toBeInTheDocument();
    expect(screen.getByTestId('adornment')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveAccessibleDescription('Any fruit');
  });

  it('renders without a label unless given', () => {
    renderSelect({ label: undefined });
    expect(document.querySelector('.selectSingleLabel')).toBeNull();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('marks the error state with aria-invalid', () => {
    renderSelect({ error: true });
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('is disabled when disabled', () => {
    renderSelect({ disabled: true });
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('opens the menu on click and lists the options', async () => {
    renderSelect();
    expect(screen.queryByRole('listbox')).toBeNull();
    await userEvent.click(screen.getByRole('combobox'));
    const listbox = await screen.findByRole('listbox');
    expect(within(listbox).getAllByRole('option').map((option) => option.textContent)).toEqual(fruits);
  });

  it('filters the options while typing', async () => {
    renderSelect();
    await userEvent.type(screen.getByRole('combobox'), 'an');
    const listbox = await screen.findByRole('listbox');
    expect(within(listbox).getAllByRole('option').map((option) => option.textContent)).toEqual(['Banana']);
  });

  it('selects an option with the keyboard and reports it', async () => {
    const onValueChange = vi.fn();
    renderSelect({ onValueChange });
    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    await screen.findByRole('listbox');
    await userEvent.keyboard('{ArrowDown}{Enter}');
    expect(onValueChange).toHaveBeenCalledWith('Apple', expect.anything());
    expect(input).toHaveValue('Apple');
  });

  it('selects an option with the pointer', async () => {
    renderSelect();
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(await screen.findByRole('option', { name: 'Cherry' }));
    expect(screen.getByRole('combobox')).toHaveValue('Cherry');
  });

  it('supports controlled use through value', () => {
    renderSelect({ value: 'Banana' });
    expect(screen.getByRole('combobox')).toHaveValue('Banana');
  });

  it('renders no popup without a menu', async () => {
    renderSelect({ menu: undefined });
    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('renders the popup into the ThemeProvider boundary so it keeps its styles', async () => {
    const { container } = renderSelect({}, ShadowRootType.Open);
    const host = container.firstElementChild as HTMLElement;
    const input = host.shadowRoot?.querySelector('input') as HTMLInputElement;
    await userEvent.click(input);
    await vi.waitFor(() => expect(host.shadowRoot?.querySelector('[role="listbox"]')).not.toBeNull());
  });

  it('works without a ThemeProvider', () => {
    render(<SelectSingle label="Plain" items={fruits} menu={menu} />);
    expect(screen.getByRole('combobox', { name: 'Plain' })).toBeInTheDocument();
  });

  it('has no accessibility violations in the default, error, and disabled states', async () => {
    for (const props of [{}, { error: true, helperText: 'Help' }, { disabled: true }]) {
      const { container, unmount } = renderSelect(props);
      expect(await axe(container)).toHaveNoViolations();
      unmount();
    }
  });
});
