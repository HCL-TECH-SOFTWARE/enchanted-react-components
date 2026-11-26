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
import { axe } from '../../axe';
import { Checkbox } from '../../../components/Checkbox';
import { CheckboxGroup } from '../../../components/CheckboxGroup';

const renderGroup = (props: Partial<React.ComponentProps<typeof CheckboxGroup>> = {}) =>
  render(
    <CheckboxGroup label="Fruits" {...props}>
      <Checkbox value="apple" label="Apple" />
      <Checkbox value="pear" label="Pear" />
    </CheckboxGroup>
  );

describe('CheckboxGroup', () => {
  it('renders a group named by its label containing the checkboxes', () => {
    renderGroup();
    const group = screen.getByRole('group', { name: 'Fruits' });
    expect(group).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
  });

  it('tracks the selection uncontrolled and calls onValueChange', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderGroup({ onValueChange });
    await user.click(screen.getByText('Pear'));
    expect(screen.getByRole('checkbox', { name: 'Pear' })).toBeChecked();
    expect(onValueChange).toHaveBeenCalledWith(['pear'], expect.anything());
  });

  it('supports defaultValue and controlled value', async () => {
    const user = userEvent.setup();
    const { rerender } = renderGroup({ defaultValue: ['apple'] });
    expect(screen.getByRole('checkbox', { name: 'Apple' })).toBeChecked();
    rerender(
      <CheckboxGroup label="Fruits" value={[]}>
        <Checkbox value="apple" label="Apple" />
      </CheckboxGroup>
    );
    await user.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('disables every checkbox when disabled', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const { container } = renderGroup({ disabled: true, onValueChange });
    await user.click(screen.getByText('Apple'));
    expect(onValueChange).not.toHaveBeenCalled();
    screen.getAllByRole('checkbox').forEach((box) => expect(box).toHaveAttribute('aria-disabled', 'true'));
    expect(container.firstElementChild).toHaveAttribute('data-disabled');
  });

  it('marks each checkbox of a disabled group as disabled so its label can be dimmed', () => {
    renderGroup({ disabled: true });
    screen.getAllByRole('checkbox').forEach((box) => expect(box).toHaveAttribute('data-disabled'));
  });

  it('exposes orientation as a data attribute, vertical by default', () => {
    const { container, rerender } = renderGroup();
    expect(container.firstElementChild).toHaveAttribute('data-orientation', 'vertical');
    rerender(
      <CheckboxGroup label="Fruits" orientation="horizontal">
        <Checkbox value="apple" label="Apple" />
      </CheckboxGroup>
    );
    expect(container.firstElementChild).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('hides the label through showLabel', () => {
    renderGroup({ showLabel: false, 'aria-label': 'Fruits' });
    expect(screen.queryByText('Fruits')).not.toBeInTheDocument();
  });

  it('shows a decorative asterisk when required', () => {
    renderGroup({ required: true });
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
  });

  it('shows helper text only when showHelperText is true and describes the group with it', () => {
    const { rerender } = renderGroup({ helperText: 'Help' });
    expect(screen.queryByText('Help')).not.toBeInTheDocument();
    rerender(
      <CheckboxGroup label="Fruits" helperText="Help" showHelperText>
        <Checkbox value="apple" label="Apple" />
      </CheckboxGroup>
    );
    expect(screen.getByRole('group', { name: 'Fruits' })).toHaveAccessibleDescription('Help');
  });

  it('shows the error message and error icon only while invalid', () => {
    const { container, rerender } = renderGroup({ errorMessage: 'Bad' });
    expect(screen.queryByText('Bad')).not.toBeInTheDocument();
    expect(container.querySelector('.checkboxGroupErrorIcon')).toBeNull();
    rerender(
      <CheckboxGroup label="Fruits" errorMessage="Bad" invalid>
        <Checkbox value="apple" label="Apple" />
      </CheckboxGroup>
    );
    expect(screen.getByText('Bad')).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Fruits' })).toHaveAccessibleDescription('Bad');
    expect(container.querySelector('.checkboxGroupErrorIcon')).not.toBeNull();
    expect(container.firstElementChild).toHaveAttribute('data-invalid');
    rerender(
      <CheckboxGroup label="Fruits" errorMessage="Bad" invalid showErrorMessage={false}>
        <Checkbox value="apple" label="Apple" />
      </CheckboxGroup>
    );
    expect(screen.queryByText('Bad')).not.toBeInTheDocument();
  });

  it('forwards className to the root and ref to the checkbox container', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = renderGroup({ className: 'custom', ref });
    expect(container.firstElementChild).toHaveClass('custom');
    expect(ref.current).toContainElement(screen.getAllByRole('checkbox')[0] ?? null);
  });

  it('has no accessibility violations in its main states', async () => {
    const { container } = render(
      <>
        <CheckboxGroup label="Default" helperText="Help" showHelperText>
          <Checkbox value="a" label="A" />
        </CheckboxGroup>
        <CheckboxGroup label="Invalid" invalid errorMessage="Bad" orientation="horizontal">
          <Checkbox value="a" label="A" invalid />
        </CheckboxGroup>
        <CheckboxGroup label="Disabled" disabled>
          <Checkbox value="a" label="A" />
        </CheckboxGroup>
      </>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
