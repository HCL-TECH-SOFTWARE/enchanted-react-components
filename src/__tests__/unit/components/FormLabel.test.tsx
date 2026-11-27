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

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Field } from '@base-ui/react/field';
import type { ReactElement } from 'react';
import { describe, expect, it } from 'vitest';
import { axe } from '../../axe';
import { FormLabel } from '../../../components/FormLabel';

// FormLabel is built on Base UI Field parts, which must sit inside a Field.Root.
const inField = (label: ReactElement) => <Field.Root>{label}</Field.Root>;

describe('FormLabel', () => {
  it('renders its text as a label with the Figma defaults', () => {
    const { container } = render(inField(<FormLabel label="Email" />));
    expect(screen.getByText('Email').tagName).toBe('LABEL');
    const root = container.querySelector('.formLabelRoot') as HTMLElement;
    expect(root).toHaveAttribute('part', 'root');
    expect(root).not.toHaveAttribute('data-invalid');
    expect(root).not.toHaveAttribute('data-disabled');
    expect(root).not.toHaveAttribute('data-inverse');
    expect(container.querySelector('svg')).toBeNull();
  });

  it('marks invalid, disabled and inverse labels for styling', () => {
    const { container } = render(inField(<FormLabel label="Email" invalid disabled inverse />));
    const root = container.querySelector('.formLabelRoot') as HTMLElement;
    expect(root).toHaveAttribute('data-invalid');
    expect(root).toHaveAttribute('data-disabled');
    expect(root).toHaveAttribute('data-inverse');
  });

  it('shows the required asterisk as decoration only', () => {
    const { rerender } = render(inField(<FormLabel label="Email" required />));
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');

    rerender(inField(<FormLabel label="Email" />));
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });

  it('shows the default help icon, a custom one, or none', () => {
    const { container, rerender } = render(inField(<FormLabel label="Email" showHelpIcon />));
    expect(container.querySelector('.formLabelHelpIcon svg')).toHaveAttribute('aria-hidden', 'true');

    rerender(inField(<FormLabel label="Email" showHelpIcon helpIcon={<button type="button">Help</button>} />));
    expect(screen.getByRole('button', { name: 'Help' })).toBeInTheDocument();
    expect(container.querySelector('.formLabelHelpIcon svg')).toBeNull();

    rerender(inField(<FormLabel label="Email" helpIcon={<button type="button">Help</button>} />));
    expect(screen.queryByRole('button', { name: 'Help' })).not.toBeInTheDocument();
  });

  it('shows the actions only when set and enabled', () => {
    const { rerender } = render(inField(<FormLabel label="Password" showActionButton actions={<a href="#reset">Forgot password</a>} />));
    expect(screen.getByRole('link', { name: 'Forgot password' })).toBeInTheDocument();

    rerender(inField(<FormLabel label="Password" actions={<a href="#reset">Forgot password</a>} />));
    expect(screen.queryByRole('link')).not.toBeInTheDocument();

    rerender(inField(<FormLabel label="Password" showActionButton />));
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('shows the error icon only when asked', () => {
    const { container, rerender } = render(inField(<FormLabel label="Email" showErrorIcon />));
    expect(container.querySelector('.formLabelErrorIcon svg')).toHaveAttribute('aria-hidden', 'true');

    rerender(inField(<FormLabel label="Email" />));
    expect(container.querySelector('.formLabelErrorIcon')).toBeNull();
  });

  it('shows the helper text only when set and enabled', () => {
    const { rerender } = render(inField(<FormLabel label="Email" helperText="We never share it" />));
    expect(screen.getByText('We never share it')).toBeInTheDocument();

    rerender(inField(<FormLabel label="Email" helperText="We never share it" showHelperText={false} />));
    expect(screen.queryByText('We never share it')).not.toBeInTheDocument();

    rerender(inField(<FormLabel label="Email" />));
    expect(screen.queryByText('We never share it')).not.toBeInTheDocument();
  });

  it('names and describes the control inside a Field, and takes the focus state', async () => {
    const user = userEvent.setup();
    render(
      <Field.Root>
        <FormLabel label="Email" helperText="We never share it" />
        <Field.Control />
      </Field.Root>,
    );
    const input = screen.getByRole('textbox', { name: 'Email' });
    expect(input).toHaveAccessibleDescription('We never share it');
    expect(screen.getByText('Email')).not.toHaveAttribute('data-focused');

    await user.click(input);
    expect(screen.getByText('Email')).toHaveAttribute('data-focused');
  });

  it('applies className and style to the root, and a custom part name', () => {
    const { container } = render(inField(<FormLabel label="Email" className="custom" style={{ width: 120 }} part="label" />));
    const root = container.querySelector('.formLabelRoot') as HTMLElement;
    expect(root).toHaveClass('formLabelRoot', 'custom');
    expect(root).toHaveStyle({ width: '120px' });
    expect(root).toHaveAttribute('part', 'label');
  });

  it('works without a ThemeProvider', () => {
    render(inField(<FormLabel label="Email" />));
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('has no accessibility violations in its main states', async () => {
    const { container } = render(
      <>
        {[
          <FormLabel key="default" label="Default" />,
          <FormLabel key="required" label="Required" required helperText="Helper" />,
          <FormLabel key="invalid" label="Invalid" invalid showErrorIcon />,
          <FormLabel key="disabled" label="Disabled" disabled />,
          <FormLabel key="inverse" label="Inverse" inverse showHelpIcon />,
        ].map((label) => (
          <Field.Root key={label.key}>
            {label}
            <Field.Control />
          </Field.Root>
        ))}
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
