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

import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import DatePicker from '../../../DatePicker/DatePicker';
import PickersLocalizationProvider from '../../../PickersLocalizationProvider/PickersLocalizationProvider';
import { ThemeDirectionType, ThemeModeType, createEnchantedTheme } from '../../../theme';

// Shared render helper — wraps UI in ThemeProvider + PickersLocalizationProvider.
const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
      <PickersLocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
        {ui}
      </PickersLocalizationProvider>
    </ThemeProvider>,
  );
};

describe('DatePicker', () => {
  it('Render regular DatePicker with label', () => {
    const label = 'Date label';
    renderWithProviders(<DatePicker label={label} value={null} onChange={jest.fn()} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('Render regular DatePicker with helper text', () => {
    const helperText = 'Pick a date';
    renderWithProviders(<DatePicker helperText={helperText} value={null} onChange={jest.fn()} />);
    expect(screen.getByText(helperText)).toBeInTheDocument();
  });

  it('Render regular DatePicker as disabled sets disabled property on input', () => {
    renderWithProviders(<DatePicker disabled value={null} onChange={jest.fn()} />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('Render regular DatePicker renders a text input field', () => {
    renderWithProviders(<DatePicker value={null} onChange={jest.fn()} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});

describe('DatePicker staticMode', () => {
  it('Render static DatePicker does not render a text input field', () => {
    renderWithProviders(<DatePicker staticMode value={null} onChange={jest.fn()} />);
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('Render static DatePicker renders calendar day buttons', () => {
    const dateValue = dayjs('2024-01-15');
    renderWithProviders(<DatePicker staticMode value={dateValue} onChange={jest.fn()} />);
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
  });

  it('Render static DatePicker shows the Today button in action bar', () => {
    renderWithProviders(<DatePicker staticMode value={null} onChange={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'Today' })).toBeInTheDocument();
  });

  it('Render static DatePicker calls onChange with correct dayjs value when a day is clicked', () => {
    const handleChange = jest.fn();
    const dateValue = dayjs('2024-01-15');
    renderWithProviders(<DatePicker staticMode value={dateValue} onChange={handleChange} />);
    const date10Button = screen.getByRole('gridcell', { name: '10' });
    fireEvent.click(date10Button);
    expect(handleChange).toHaveBeenCalledTimes(1);
    const calledWith = handleChange.mock.calls[0][0] as Dayjs;
    expect(dayjs.isDayjs(calledWith)).toBe(true);
    expect(calledWith.format('YYYY-MM-DD')).toBe('2024-01-10');
  });

  it('Render static DatePicker with disabled prop applies Mui-disabled class', () => {
    const dateValue = dayjs('2024-01-15');
    const { container } = renderWithProviders(
      <DatePicker staticMode disabled value={dateValue} onChange={jest.fn()} />,
    );
    expect(container.querySelector('.Mui-disabled')).toBeInTheDocument();
  });

  it('Render static DatePicker wrapped in Paper with elevation variant', () => {
    const dateValue = dayjs('2024-01-15');
    const { container } = renderWithProviders(
      <DatePicker staticMode value={dateValue} onChange={jest.fn()} />,
    );
    const paperEl = container.querySelector('.MuiPaper-root');
    expect(paperEl).toBeInTheDocument();
    expect(paperEl?.classList.contains('MuiPaper-elevation')).toBe(true);
  });
});
