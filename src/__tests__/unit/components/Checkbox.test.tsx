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
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { Checkbox, CheckboxVariant } from '../../../components/Checkbox';
import { ShadowRootType, ThemeMode, ThemeProvider } from '../../../theme/ThemeProvider';

describe('Checkbox', () => {
  it('renders an unchecked checkbox named by its label with the Figma defaults', () => {
    render(<Checkbox>Accept</Checkbox>);
    const checkbox = screen.getByRole('checkbox', { name: 'Accept' });
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
    expect(checkbox).not.toHaveAttribute('aria-invalid');
    expect(checkbox.closest('label')).toHaveAttribute('data-variant', CheckboxVariant.WithPadding);
  });

  it('reflects the variant as a data attribute', () => {
    render(<Checkbox variant={CheckboxVariant.WithoutPadding}>Accept</Checkbox>);
    expect(screen.getByRole('checkbox').closest('label')).toHaveAttribute(
      'data-variant',
      CheckboxVariant.WithoutPadding,
    );
  });

  it('puts part="root" on the root element', () => {
    render(<Checkbox>Accept</Checkbox>);
    expect(screen.getByRole('checkbox').closest('label')).toHaveAttribute('part', 'root');
  });

  it('hides the label when showLabel is false', () => {
    render(<Checkbox showLabel={false} aria-label="Select row">Accept</Checkbox>);
    expect(screen.queryByText('Accept')).not.toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Select row' })).toBeInTheDocument();
  });

  it('shows helper text only when showHelperText is true and describes the checkbox with it', () => {
    const { rerender } = render(<Checkbox helperText="Weekly email">Accept</Checkbox>);
    expect(screen.queryByText('Weekly email')).not.toBeInTheDocument();

    rerender(
      <Checkbox helperText="Weekly email" showHelperText>
        Accept
      </Checkbox>,
    );
    expect(screen.getByRole('checkbox', { name: 'Accept' })).toHaveAccessibleDescription('Weekly email');
  });

  it('shows the error message and aria-invalid only when error is true', () => {
    const { rerender } = render(<Checkbox errorMessage="Required">Accept</Checkbox>);
    expect(screen.queryByText('Required')).not.toBeInTheDocument();

    rerender(
      <Checkbox error errorMessage="Required">
        Accept
      </Checkbox>,
    );
    const checkbox = screen.getByRole('checkbox', { name: 'Accept' });
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    expect(checkbox).toHaveAccessibleDescription('Required');
    expect(checkbox.closest('label')).toHaveAttribute('data-error');
  });

  it('hides the error message when showErrorMessage is false', () => {
    render(
      <Checkbox error errorMessage="Required" showErrorMessage={false}>
        Accept
      </Checkbox>,
    );
    expect(screen.queryByText('Required')).not.toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('toggles when used uncontrolled and reports the change', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox onCheckedChange={onCheckedChange}>Accept</Checkbox>);
    const checkbox = screen.getByRole('checkbox', { name: 'Accept' });

    await user.click(checkbox);
    expect(checkbox).toHaveAttribute('aria-checked', 'true');
    expect(onCheckedChange).toHaveBeenCalledTimes(1);
    // Base UI passes extra event details after the first argument; only the value is contract.
    expect(onCheckedChange.mock.lastCall?.[0]).toBe(true);
  });

  it('toggles when the label text is clicked', async () => {
    const user = userEvent.setup();
    render(<Checkbox>Accept</Checkbox>);
    await user.click(screen.getByText('Accept'));
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true');
  });

  it('supports an initial checked state', () => {
    render(<Checkbox defaultChecked>Accept</Checkbox>);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true');
  });

  it('does not change until the parent updates a controlled value', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(
      <Checkbox checked={false} onCheckedChange={onCheckedChange}>
        Accept
      </Checkbox>,
    );
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    expect(onCheckedChange).toHaveBeenCalledTimes(1);
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
  });

  it('follows a controlled value held by the parent', async () => {
    const user = userEvent.setup();
    const Controlled = () => {
      const [checked, setChecked] = useState(false);
      return (
        <Checkbox checked={checked} onCheckedChange={setChecked}>
          Accept
        </Checkbox>
      );
    };
    render(<Controlled />);
    await user.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true');
  });

  it('exposes the indeterminate state', () => {
    render(<Checkbox indeterminate>Accept</Checkbox>);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'mixed');
  });

  it('can be toggled with the keyboard', async () => {
    const user = userEvent.setup();
    render(<Checkbox>Accept</Checkbox>);
    await user.tab();
    expect(screen.getByRole('checkbox')).toHaveFocus();
    await user.keyboard(' ');
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true');
  });

  it('does not toggle or take focus when disabled', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(
      <Checkbox disabled onCheckedChange={onCheckedChange}>
        Accept
      </Checkbox>,
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-disabled', 'true');
    expect(checkbox.closest('label')).toHaveAttribute('data-disabled');
    await user.click(checkbox);
    expect(onCheckedChange).not.toHaveBeenCalled();
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
  });

  it('forwards ref, className, data attributes and name to the control', () => {
    const ref = createRef<HTMLElement>();
    const { container } = render(
      <form>
        <Checkbox ref={ref} className="custom" data-testid="control" name="terms" value="yes" defaultChecked>
          Accept
        </Checkbox>
      </form>,
    );
    const control = screen.getByTestId('control');
    expect(control).toHaveClass('checkboxControl', 'custom');
    expect(ref.current).toBe(control);
    expect(new FormData(container.querySelector('form') as HTMLFormElement).get('terms')).toBe('yes');
  });

  it('accepts a state-based className function', () => {
    render(<Checkbox className={(state) => (state.checked ? 'is-on' : 'is-off')}>Accept</Checkbox>);
    expect(screen.getByRole('checkbox')).toHaveClass('checkboxControl', 'is-off');
  });

  it('renders without a ThemeProvider and inside one', () => {
    const { unmount } = render(<Checkbox>Accept</Checkbox>);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    unmount();

    render(
      <ThemeProvider mode={ThemeMode.Dark} shadowRootType={ShadowRootType.None}>
        <Checkbox>Accept</Checkbox>
      </ThemeProvider>,
    );
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('has no accessibility violations in its main states', async () => {
    const { container } = render(
      <>
        <Checkbox>Default</Checkbox>
        <Checkbox defaultChecked helperText="Helper" showHelperText>
          Checked
        </Checkbox>
        <Checkbox indeterminate>Indeterminate</Checkbox>
        <Checkbox disabled>Disabled</Checkbox>
        <Checkbox error errorMessage="Required">
          Error
        </Checkbox>
        <Checkbox showLabel={false} aria-label="Select row" />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
