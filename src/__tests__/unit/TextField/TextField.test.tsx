/* ======================================================================== *
 * Copyright 2024-2026 HCL America Inc.                                     *
 * Licensed under the Apache License, Version 2.0 (the "License");          *
 * you may not use this file except in compliance with the License.         *
 * You may obtain a copy of the License at                                  *
 *                                                                          *
 * http://www.apache.org/licenses/LICENSE-2.0                               *
 *                                                                          *
 * Unless required by applicable law or agreed to in writing, software      *
 * distributed under the License is distributed on an "AS IS" BASIS,        *
 * limitations under the License.                                           *
 * ======================================================================== */

import React from 'react';
import {
  configure, render, screen, cleanup,
  fireEvent,
} from '@testing-library/react';
import InputAdornment from '@mui/material/InputAdornment';
import { ThemeProvider } from '@emotion/react';
import { ThemeDirectionType, ThemeModeType, createEnchantedTheme } from '../../../theme';

import TextField, { getEndAdornment, getEndAdornmentSlots, CustomTextFieldProps } from '../../../TextField';
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
    window.open = jest.fn();
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <TextField actionProps={[{ href: actionHref, label: actionLabel }]} />
      </ThemeProvider>,
    );

    expect(screen.getByText(actionLabel)).not.toBeNull();
    fireEvent.click(screen.getByText(actionLabel));
    expect(window.open).toHaveBeenCalledWith(actionHref, '_blank');
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

  it('Arranges end adornment items in expected order (unitLabel -> endAdornmentAction -> endAdornmentIconButton)', () => {
    render(
      <TextField
        unitLabel="px"
        endAdornmentAction={<button type="button">Action</button>}
        endAdornmentIconButton={<button type="button">IconButton</button>}
      />,
    );

    const unitNode = screen.getByText('px');
    const actionNode = screen.getByRole('button', { name: 'Action' });
    const iconButtonNode = screen.getByRole('button', { name: 'IconButton' });

    /* eslint-why - DOM Node comparison API returns a bitmask that requires a bitwise operator */
    /* eslint-disable no-bitwise */
    expect(unitNode.compareDocumentPosition(actionNode) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(actionNode.compareDocumentPosition(iconButtonNode) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
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

  it('Render with a11y attributes', () => {
    const { container } = render(<TextField helperText="Some important text" />);
    const label = container.querySelector('label');
    const input = container.querySelector('input');
    const helperText = container.querySelector('p');

    if (!label) {
      throw new Error('Label is not found');
    }
    if (!input) {
      throw new Error('Input is not found');
    }
    if (!helperText) {
      throw new Error('Helper text is not found');
    }

    expect(label.getAttribute('for')).toBe(input.id);
    expect(input.getAttribute('aria-describedby')).toBe(helperText.id);
  });

  it('Renders with a11y attributes and the provided id', () => {
    const id = 'input-id';
    const { container } = render(<TextField id={id} helperText="Some important text" />);
    const label = container.querySelector('label');
    const input = container.querySelector('input');
    const helperText = container.querySelector('p');

    if (!label) {
      throw new Error('Label is not found');
    }
    if (!input) {
      throw new Error('Input is not found');
    }
    if (!helperText) {
      throw new Error('Helper text is not found');
    }

    expect(label.getAttribute('for')).toBe(input.id);
    expect(input.getAttribute('aria-describedby')).toBe(helperText.id);
  });

  it('Renders Autocomplete (isComboBox) end adornments correctly and excludes endAdornmentAction', () => {
    const comboClass = 'MuiAutocomplete-inputRoot';
    const comboAdornment = <span className="custom-popupIndicator">ComboBoxIcon</span>;
    const actionText = 'ShouldNotRenderForComboBox';

    render(
      <TextField
        InputProps={{
          className: comboClass,
          endAdornment: comboAdornment,
        }}
        endAdornmentAction={<button type="button">{actionText}</button>}
      />,
    );

    expect(screen.getByText('ComboBoxIcon')).not.toBeNull();
    expect(screen.queryByText(actionText)).toBeNull();
  });

  it('Verifies getEndAdornmentSlots partitions nodes properly depending on isComboBox', () => {
    const props = {
      error: true,
      unitLabel: 'kg',
      endAdornmentAction: <span>ActionNode</span>,
      endAdornmentIconButton: <span>IconButtonNode</span>,
      InputProps: {
        endAdornment: <span className="clearIndicator">ClearIcon</span>,
      },
    } as unknown as CustomTextFieldProps;

    // When isComboBox is true, clearNodes from InputProps are included, but endAdornmentAction is excluded
    const comboSlots = getEndAdornmentSlots(props, true);
    expect(comboSlots.flowNodes.length).toBe(3); // ClearIcon, WarningIcon, UnitLabel
    expect(comboSlots.fixedNodes.length).toBe(1); // IconButtonNode
    expect(comboSlots.actionNodes.length).toBe(0); // Excluded for ComboBox

    // When isComboBox is false, endAdornmentAction is included, and InputProps overrides are skipped
    const standardSlots = getEndAdornmentSlots(props, false);
    expect(standardSlots.flowNodes.length).toBe(2); // WarningIcon, UnitLabel (ClearIcon is not parsed)
    expect(standardSlots.fixedNodes.length).toBe(1); // IconButtonNode
    expect(standardSlots.actionNodes.length).toBe(1); // ActionNode included for standard TextField
  });

  it('Renders endAdornmentIconButton in fixed slot', () => {
    const buttonText = 'FixedIconButton';
    render(<TextField endAdornmentIconButton={<button type="button">{buttonText}</button>} />);

    expect(screen.getByRole('button', { name: buttonText })).not.toBeNull();
  });

  it('Returns null in getEndAdornment for non-combobox fields when startAdornment is defined', () => {
    const props = {
      InputProps: {
        startAdornment: <span>Start</span>,
      },
      unitLabel: 'cm',
    } as unknown as CustomTextFieldProps;

    expect(getEndAdornment(props, false)).toBeNull();
    expect(getEndAdornment(props, true)).not.toBeNull();
  });
});
