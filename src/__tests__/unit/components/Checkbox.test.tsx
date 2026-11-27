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

describe('Checkbox', () => {
  it('renders a checkbox named by its label, unchecked by default', () => {
    render(<Checkbox label="Accept" />);
    const checkbox = screen.getByRole('checkbox', { name: 'Accept' });
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
  });

  it('toggles uncontrolled and calls onCheckedChange', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Accept" onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByText('Accept'));
    expect(screen.getByRole('checkbox')).toBeChecked();
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it('does not change until the parent updates a controlled checked', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Accept" checked={false} onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole('checkbox'));
    expect(onCheckedChange).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('supports defaultChecked and indeterminate', () => {
    const { rerender } = render(<Checkbox label="A" defaultChecked />);
    expect(screen.getByRole('checkbox')).toBeChecked();
    rerender(<Checkbox label="A" indeterminate />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'mixed');
  });

  it('toggles with the keyboard', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Accept" />);
    await user.tab();
    expect(screen.getByRole('checkbox')).toHaveFocus();
    await user.keyboard(' ');
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Accept" disabled onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByText('Accept'));
    expect(onCheckedChange).not.toHaveBeenCalled();
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-disabled', 'true');
  });

  it('marks required and shows a decorative asterisk', () => {
    render(<Checkbox label="Accept" required />);
    expect(screen.getByRole('checkbox')).toBeRequired();
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies padding by default and removes it with disablePadding', () => {
    const { rerender } = render(<Checkbox label="A" />);
    expect(screen.getByText('A').closest('label')).not.toHaveAttribute('data-disable-padding');
    rerender(<Checkbox label="A" disablePadding />);
    expect(screen.getByText('A').closest('label')).toHaveAttribute('data-disable-padding');
  });

  it('shows helper text and describes the control with it', () => {
    render(<Checkbox label="A" helperText="Help" />);
    expect(screen.getByRole('checkbox')).toHaveAccessibleDescription('Help');
  });

  it('hides label and helper text through showLabel and showHelperText', () => {
    render(<Checkbox label="A" helperText="Help" showLabel={false} showHelperText={false} aria-label="A" />);
    expect(screen.queryByText('Help')).not.toBeInTheDocument();
    expect(screen.queryByText('A')).not.toBeInTheDocument();
  });

  it('shows the error message and aria-invalid only while invalid', () => {
    const { rerender } = render(<Checkbox label="A" errorMessage="Bad" />);
    expect(screen.queryByText('Bad')).not.toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toHaveAttribute('aria-invalid');
    rerender(<Checkbox label="A" errorMessage="Bad" invalid />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('checkbox')).toHaveAccessibleDescription('Bad');
    rerender(<Checkbox label="A" errorMessage="Bad" invalid showErrorMessage={false} />);
    expect(screen.queryByText('Bad')).not.toBeInTheDocument();
  });

  it('forwards className and data attributes to the right elements', () => {
    render(<Checkbox label="A" className="custom" data-testid="control" />);
    expect(screen.getByText('A').closest('label')).toHaveClass('custom');
    expect(screen.getByTestId('control')).toBe(screen.getByRole('checkbox'));
  });

  it('forwards ref to the control', () => {
    const ref = createRef<HTMLElement>();
    render(<Checkbox label="A" ref={ref} />);
    expect(ref.current).toBe(screen.getByRole('checkbox'));
  });

  it('submits its value in a form', () => {
    const { container } = render(
      <form>
        <Checkbox label="A" name="terms" value="yes" defaultChecked />
      </form>,
    );
    expect(new FormData(container.querySelector('form')!).get('terms')).toBe('yes');
  });

  it('has no accessibility violations in its main states', async () => {
    const { container } = render(
      <>
        <Checkbox label="Default" helperText="Help" />
        <Checkbox label="Required" required />
        <Checkbox label="Invalid" invalid errorMessage="Bad" />
        <Checkbox label="Disabled" disabled />
        <Checkbox label="Mixed" indeterminate />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
