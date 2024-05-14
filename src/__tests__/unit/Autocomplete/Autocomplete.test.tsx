/* ======================================================================== *
 * Copyright 2024 HCL America Inc.                                          *
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

import React from 'react';
import {
  render, fireEvent, screen, configure, cleanup,
} from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { createLtrTheme } from '../../../theme';
import Autocomplete from '../../../Autocomplete';

afterEach(cleanup);

describe('Autocomplete', () => {
  it('Should render the correct placeholder text', () => {
    const placeholder = 'placeholder text';
    render(<Autocomplete
      options={[]}
      placeholder={placeholder}
    />);
    expect(screen.getAllByPlaceholderText(placeholder)).toBeTruthy();
  });

  it('Should render with label messages', () => {
    const label = 'Label test message';
    const { getByText } = render(
      <Autocomplete label={label} options={[]} />,
    );
    const labelElement = getByText(label);
    expect(labelElement).toBeTruthy();
  });

  it('Should render with helper text messages', () => {
    const helperText = 'Helper test message';
    render(<Autocomplete helperText={helperText} options={[]} />);

    expect(screen.getByText(helperText)).not.toBeNull();
  });

  it('Should render with action link', () => {
    const actionLabel = 'Action';
    const actionHref = 'https://www.hcltech.com/';
    render(
      <ThemeProvider theme={createLtrTheme()}>
        <Autocomplete
          options={[]}
          actionProps={[{
            href: actionHref,
            label: actionLabel,
          }]}
        />
      </ThemeProvider>,
    );

    expect(screen.getAllByText(actionLabel)).not.toBeNull();
    expect(screen.getAllByText(actionLabel)[0].getAttribute('href')).toBe(actionHref);
  });

  it('should filter options based on user input', () => {
    const options = ['Apple', 'Banana', 'Cherry', 'Durian', 'Elderberry'];
    const autoCompletetextFeild = 'Autocomplete';
    const { getByText, getByRole } = render(
      <Autocomplete label={autoCompletetextFeild} options={options} />,
    );
    const input = getByRole('combobox');
    fireEvent.change(input, { target: { value: 'b' } });

    const option1 = getByText('Banana');
    const option2 = getByText('Elderberry');

    expect(option1).toBeTruthy();
    expect(option2).toBeTruthy();
  });

  it('Should render with error state', () => {
    configure({ testIdAttribute: 'data-mui-test' });
    const { container } = render(
      <Autocomplete
        error
        options={[]}
      />,
    );
    expect(screen.getByTestId('warningIcon')).not.toBeNull();
    expect(container.querySelector('.Mui-error')).not.toBeNull();
  });
  it('Render with disabled state', () => {
    const { container } = render(
      <Autocomplete
        disabled
        options={[]}
      />,
    );

    expect(container.querySelector('.Mui-disabled')).not.toBeNull();
  });

  it('Render with non edit state', () => {
    jest.spyOn(console, 'error').mockImplementation((message) => {
      // since the autocomplete is not editable, the input element is not found
      // this is expected and we suppress the error to avoid further confusion
      if (message.includes('MUI: Unable to find the input element.')) {
        return;
      }
      // eslint-why we only suppress the expected error
      // eslint-disable-next-line no-console
      console.error(message);
    });
    const exampleMessage = 'Example message';
    render(
      <Autocomplete
        nonEdit
        value={exampleMessage}
        options={[]}
      />,
    );
    const input = screen.queryByRole('input');
    expect(input).toBeNull();
    jest.clearAllMocks();
  });
});
