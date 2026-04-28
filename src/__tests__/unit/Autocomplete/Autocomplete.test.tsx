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
  render, fireEvent, screen, configure, cleanup, within,
} from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ThemeDirectionType, ThemeModeType, createEnchantedTheme } from '../../../theme';
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
    window.open = jest.fn();
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
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
    fireEvent.click(screen.getAllByText(actionLabel)[0]);
    expect(window.open).toHaveBeenCalledWith(actionHref, '_blank');
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
    // eslint-why we only suppress the expected error
    // eslint-disable-next-line no-console
    const originalConsoleError = console.error;
    jest.spyOn(console, 'error').mockImplementation((...args) => {
      // since the autocomplete is not editable, the input element is not found
      // this is expected and we suppress the error to avoid further confusion
      if (typeof args[0] === 'string' && args[0].includes('MUI: Unable to find the input element.')) {
        return;
      }
      originalConsoleError(...args);
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

  describe('listboxBanner functionality', () => {
    const options = ['Apple', 'Banana', 'Cherry', 'Durian'];

    it('Should render banner when listboxBanner prop is provided', () => {
      const bannerContent = (
        <Box data-testid="test-banner">
          <Typography>Banner content</Typography>
        </Box>
      );

      render(
        <Autocomplete
          options={options}
          listboxBanner={bannerContent}
        />,
      );

      const element = screen.getByRole('combobox');
      fireEvent.mouseDown(element);

      expect(screen.getByTestId('test-banner')).toBeTruthy();
      expect(screen.getByText('Banner content')).toBeTruthy();
    });

    it('Should render banner at the top of the listbox', () => {
      const bannerContent = (
        <Box data-testid="test-banner">
          <Typography>Banner content</Typography>
        </Box>
      );

      render(
        <Autocomplete
          options={options}
          listboxBanner={bannerContent}
        />,
      );

      const element = screen.getByRole('combobox');
      fireEvent.mouseDown(element);

      const listbox = screen.getByRole('listbox');
      const banner = screen.getByTestId('test-banner');

      // Banner should be first child of listbox
      expect(listbox.firstChild).toBe(banner);
    });

    it('Should render banner with correct accessibility attributes', () => {
      const bannerContent = (
        <Box data-testid="test-banner">
          <Typography>Banner content</Typography>
        </Box>
      );

      render(
        <Autocomplete
          options={options}
          listboxBanner={bannerContent}
        />,
      );

      const element = screen.getByRole('combobox');
      fireEvent.mouseDown(element);

      const banner = screen.getByTestId('test-banner');
      const bannerLi = banner.closest('li');

      // Banner should have aria-hidden="true" and role="presentation"
      expect(bannerLi?.getAttribute('role')).toBe('presentation');
      expect(bannerLi?.getAttribute('aria-hidden')).toBe('true');
      expect(bannerLi?.style.pointerEvents).toBe('none');
    });

    it('Should still render options when banner is present', () => {
      const bannerContent = (
        <Box data-testid="test-banner">
          <Typography>Banner content</Typography>
        </Box>
      );

      render(
        <Autocomplete
          options={options}
          listboxBanner={bannerContent}
        />,
      );

      const element = screen.getByRole('combobox');
      fireEvent.mouseDown(element);

      // Banner should be present
      expect(screen.getByTestId('test-banner')).toBeTruthy();

      // Options should still be rendered
      const listbox = within(screen.getByRole('listbox'));
      expect(listbox.getByText('Apple')).toBeTruthy();
      expect(listbox.getByText('Banana')).toBeTruthy();
      expect(listbox.getByText('Cherry')).toBeTruthy();
    });

    it('Should not render banner when listboxBanner prop is not provided', () => {
      render(
        <Autocomplete
          options={options}
        />,
      );

      const element = screen.getByRole('combobox');
      fireEvent.mouseDown(element);

      expect(screen.queryByTestId('test-banner')).toBeNull();

      // Options should render normally
      const listbox = within(screen.getByRole('listbox'));
      expect(listbox.getByText('Apple')).toBeTruthy();
    });

    it('Should work with complex banner content', () => {
      const complexBanner = (
        <Box data-testid="complex-banner" sx={{ padding: 2, backgroundColor: 'grey.100' }}>
          <Typography variant="h6">Complex Banner</Typography>
          <Typography variant="body2">This is a complex banner with multiple elements</Typography>
        </Box>
      );

      render(
        <Autocomplete
          options={options}
          listboxBanner={complexBanner}
        />,
      );

      const element = screen.getByRole('combobox');
      fireEvent.mouseDown(element);

      expect(screen.getByTestId('complex-banner')).toBeTruthy();
      expect(screen.getByText('Complex Banner')).toBeTruthy();
      expect(screen.getByText('This is a complex banner with multiple elements')).toBeTruthy();
    });
  });
});
