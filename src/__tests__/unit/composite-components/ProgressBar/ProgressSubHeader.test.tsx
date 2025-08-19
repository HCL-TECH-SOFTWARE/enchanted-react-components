/* ======================================================================== *
 * Copyright 2024, 2025 HCL America Inc.                                    *
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
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { Literals } from '../../../../composite_components/ProgressBar/ProgressBar';
import { createEnchantedTheme, ThemeDirectionType, ThemeModeType } from '../../../../theme';
import ProgressSubHeader from '../../../../composite_components/ProgressBar/ProgressSubHeader';

const mockProps = {
  totalSize: '500MB',
  totalTime: '5 minutes',
  literals: {
    learnMoreLabel: 'Learn More',
    totalSizeLabel: 'Total Size',
    cancelLabel: 'Cancel',
    cancelAllLabel: 'Cancel All',
    pauseButtonLabel: 'Pause',
  } as Literals,
  cancelAll: jest.fn(),
  isCancelAllDisabled: false,
};

describe('ProgressSubHeader', () => {
  it('renders the progress subheader with total size and time', () => {
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <ProgressSubHeader {...mockProps} />
      </ThemeProvider>,
    );
    expect(screen.getByText('Total Size:')).not.toBeNull();
    expect(screen.getByText('500MB')).not.toBeNull();
    expect(screen.getByText('5 minutes')).not.toBeNull();
  });

  it('applies correct margins in LTR mode', () => {
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <ProgressSubHeader {...mockProps} />
      </ThemeProvider>,
    );
    const totalSizeElement = screen.getByText('500MB');
    const totalTimeElement = screen.getByText('5 minutes');
    
    expect(window.getComputedStyle(totalSizeElement).marginLeft).toBe('4px');
    expect(window.getComputedStyle(totalTimeElement).marginLeft).toBe('8px');
  });

  it('applies correct margins in RTL mode', () => {
    render(
      <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.RTL, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
        <ProgressSubHeader {...mockProps} />
      </ThemeProvider>,
    );
    const totalSizeElement = screen.getByText('500MB');
    const totalTimeElement = screen.getByText('5 minutes');
    
    expect(window.getComputedStyle(totalSizeElement).marginRight).toBe('4px');
    expect(window.getComputedStyle(totalTimeElement).marginRight).toBe('8px');
  });
});
