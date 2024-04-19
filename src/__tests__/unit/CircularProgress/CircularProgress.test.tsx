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
import CircularProgress, { CircularProgressVariants, CircularProgressTestIds } from '../../../ProgressIndicator/CircularProgress/CircularProgress';

afterEach(cleanup);

describe('CircularProgress', () => {
  it('Render indeterminate variant as default', () => {
    render(<CircularProgress />);
    expect(screen.getAllByTestId(CircularProgressTestIds.PROGRESS_TRAIL)).not.toBeNull();
    expect(screen.getAllByTestId(CircularProgressTestIds.PROGRESS_CIRCLE)).not.toBeNull();
  });

  it('Render determinate variant with value', () => {
    render(<CircularProgress variant={CircularProgressVariants.DETERMINATE} value={30} showprogress />);
    expect(screen.getAllByTestId(CircularProgressTestIds.PROGRESS_TRAIL)).not.toBeNull();
    expect(screen.getAllByTestId(CircularProgressTestIds.PROGRESS_CIRCLE)).not.toBeNull();
    expect(screen.getAllByTestId(CircularProgressTestIds.PROGRESS_LABEL)).not.toBeNull();
    expect(screen.getAllByTestId(CircularProgressTestIds.PROGRESS_LABEL)[0].innerHTML).toEqual('30%');
  });

  it('Should not crash but render determinate variant with undefined or zero value', () => {
    render(<CircularProgress variant={CircularProgressVariants.DETERMINATE} />);
    expect(screen.getAllByTestId(CircularProgressTestIds.PROGRESS_TRAIL)).not.toBeNull();
    expect(screen.getAllByTestId(CircularProgressTestIds.PROGRESS_CIRCLE)).not.toBeNull();
  });
});
