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
  configure, render, screen, cleanup,
} from '@testing-library/react';
import InputAdornment from '@mui/material/InputAdornment';
import { ThemeProvider } from '@emotion/react';
import { ThemeDirectionType, ThemeModeType, createEnchantedTheme } from '../../../theme';

import TextField from '../../../TextField';
import Button from '../../../Button/Button';

afterEach(cleanup);

describe('TextField', () => {
  it('Render with placeholder messages', () => {
    const placeholder = 'Placeholder test message';
    render(<TextField placeholder={placeholder} />);

    expect(screen.getByPlaceholderText(placeholder)).not.toBeNull();
  });

  it('Render with label messages', () => {
    const label = 'Label test message';
    render(<TextField label={label} />);

    expect(screen.getByText(label)).not.toBeNull();
  });

  it('Render with required start', () => {
    const requiredStar = '*';
    render(<TextField required />);

    expect(screen.getByText(requiredStar)).not.toBeNull();
  });

  it('Render with helper text messages', () => {
    const helperText = 'Helper test message';
    render(<TextField helperText={helperText} />);

    expect(screen.getByText(helperText)).not.toBeNull();
  });

  it('Render with action link', () => {
    const actionLabel = 'Action';
    const actionHref = 'https://www.hcltech.com/';
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <TextField actionProps={[{ href: actionHref, label: actionLabel }]} />
      </ThemeProvider>,
    );

    expect(screen.getByText(actionLabel)).not.toBeNull();
    expect(screen.getByText(actionLabel).getAttribute('href')).toBe(actionHref);
  });

  it('Render with start adornment only', () => {
    const startAdornment = 'START-A';
    render(<TextField InputProps={{
      startAdornment: <InputAdornment position="start">{startAdornment}</InputAdornment>,
    }}
    />);

    expect(screen.getByText(startAdornment)).not.toBeNull();
  });

  it('Render with end adornment only', () => {
    const endAdornment = 'END-A';
    render(<TextField InputProps={{
      endAdornment: <InputAdornment position="end">{endAdornment}</InputAdornment>,
    }}
    />);

    expect(screen.getByText(endAdornment)).not.toBeNull();
  });

  it('Render with a unit label', () => {
    const unitLabel = 'kg';
    render(<TextField unitLabel={unitLabel} />);

    expect(screen.getByText(unitLabel)).not.toBeNull();
  });

  it('Render with error state', () => {
    configure({ testIdAttribute: 'data-mui-test' });
    const { container } = render(<TextField error />);

    expect(screen.getByTestId('warningIcon')).not.toBeNull();
    expect(container.querySelector('.Mui-error')).not.toBeNull();
  });

  it('Render with disabled state', () => {
    const { container } = render(<TextField disabled />);

    expect(container.querySelector('.Mui-disabled')).not.toBeNull();
  });

  it('Render with and custom end adornment', () => {
    const endAdornmentText = 'END_ADORNMENT_ACTION_TEXT';
    const endAdornment = <Button variant="text">{endAdornmentText}</Button>;
    render(<TextField InputProps={{ endAdornment }} />);

    expect(screen.getByText(endAdornmentText)).not.toBeNull();
  });

  it('Render with non edit state', () => {
    const exampleMessage = 'Example message';
    render(<TextField nonEdit value={exampleMessage} />);
    expect(screen.getByText(exampleMessage)).not.toBeNull();
  });

  it('Render without multiline state', () => {
    const { container } = render(<TextField />);

    expect(container.querySelector('input')).not.toBeNull();
    expect(container.querySelector('textarea')).toBeNull();
  });

  it('Render with multiline state', () => {
    const { container } = render(<TextField multiline />);

    expect(container.querySelector('input')).toBeNull();
    expect(container.querySelector('textarea')).not.toBeNull();
  });
});
