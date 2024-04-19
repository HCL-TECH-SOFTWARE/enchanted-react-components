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
  render, screen, cleanup,
} from '@testing-library/react';
import ChipLayout, { ChipLayoutTestIds } from '../../../../composite_components/ChipLayout';
import { ChipTestIds } from '../../../../Chip';
import { sampleDefaultSet, sampleFiveChips, sampleFourChips } from '../../../../composite_components/ChipLayout/sampleChipLayoutConfig';

afterEach(cleanup);

describe('ChipLayout Tests', () => {
  it('Render ChipLayout', async () => {
    render(<ChipLayout chipChildNodes={sampleDefaultSet} />);
    const chipRoot = await screen.findByTestId(ChipLayoutTestIds.CHIP_LAYOUT_ROOT);
    expect(chipRoot).toBeTruthy();
  });

  it('Exactly four chips must be rendered on DOM if dataset has four Typography elements', async () => {
    render(<ChipLayout chipChildNodes={sampleFourChips} />);
    const chipsRendered = await screen.findAllByTestId(ChipTestIds.CHIP_ROOT);
    expect(chipsRendered.length).toBe(4);
  });

  it('At least four chips must be rendered on DOM if dataset has greater than four Typography elements', async () => {
    render(<ChipLayout chipChildNodes={sampleFiveChips} />);
    const chipsRendered = await screen.findAllByTestId(ChipTestIds.CHIP_ROOT);
    expect(chipsRendered.length).toBeGreaterThanOrEqual(4);
  });

  it('displays "Show more" chip when there are more chips to be adjusted in available space', async () => {
    render(<ChipLayout chipChildNodes={sampleDefaultSet} />);
    const showMoreChip = await screen.findByTestId(ChipLayoutTestIds.CHIP_LAYOUT_SHOW_MORE);
    expect(showMoreChip).toBeTruthy();
  });
});
