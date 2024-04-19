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
  cleanup, fireEvent, render,
} from '@testing-library/react';
import { Button } from '@mui/material';
import Tooltip from '../../../Tooltip/Tooltip';

afterEach(cleanup);

describe('Tooltip unit tests', () => {
  it('Show title in tooltip', async () => {
    const baseComponent = render(
      <Tooltip data-testid="test-tooltip" title="This is title">
        <Button data-testid="test-button" variant="contained">Button</Button>
      </Tooltip>,
    );
    fireEvent.mouseOver(baseComponent.getByTestId('test-button')); // To hover element and show tooltip
    expect(
      await baseComponent.findByText('This is title'),
    ).toBeDefined();
  });
});
