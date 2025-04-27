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
import Button from '../../../Button/Button';

afterEach(cleanup);

describe('Button', () => {
  it('Render Default variant as default', () => {
    render(<Button variant="contained" />);
    expect(screen.findByLabelText('Button')).toBeTruthy();
  });

  it('Render Contained variant', () => {
    render(<Button variant="contained" />);
    expect(screen.findByLabelText('Button')).toBeTruthy();
  });

  it('Render Outlined variant', () => {
    render(<Button variant="outlined" />);
    expect(screen.findByLabelText('Button')).toBeTruthy();
  });

  it('Render Text variant', () => {
    render(<Button variant="text" />);
    expect(screen.findByLabelText('Button')).toBeTruthy();
  });

  it('Render inversecolors variant', () => {
    render(<Button inversecolors />);
    expect(screen.findByLabelText('Button')).toBeTruthy();
  });

  it('Render neutral size', () => {
    render(<Button size="neutral" />);
    expect(screen.findByLabelText('Button')).toBeTruthy();
  });
});
