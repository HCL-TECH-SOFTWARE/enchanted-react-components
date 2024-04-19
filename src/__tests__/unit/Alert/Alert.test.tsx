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
import Close from '@hcl-software/enchanted-icons/dist/carbon/es/close';
import Alert, { AlertSeverity, AlertVariants } from '../../../Alert/Alert';

afterEach(cleanup);

describe('Alert', () => {
  it('Render Base Style', () => {
    render(<Alert />);
    expect(screen.findByLabelText('Alert')).toBeTruthy();
  });

  it('Render Outlined variant', () => {
    render(<Alert variant={AlertVariants.OUTLINED} />);
    expect(screen.findByLabelText('Alert')).toBeTruthy();
  });

  it('Render Success severity', () => {
    render(<Alert severity={AlertSeverity.SUCCESS} />);
    expect(screen.findByLabelText('Alert')).toBeTruthy();
  });

  it('Render Close style', () => {
    render(<Alert action={<Close />} />);
    expect(screen.findByLabelText('Alert')).toBeTruthy();
  });

  it('Render success severity and contained variant', () => {
    const { container } = render(<Alert severity={AlertSeverity.SUCCESS} variant={AlertVariants.CONTAINED} />);
    const iconContainer = container.querySelector('.MuiAlert-icon');
    expect(iconContainer).not.toBeNull();
    expect(iconContainer?.firstElementChild?.getAttribute('data-mui-test')).toBe('checkmark--outlineIcon');
    const paper = container.querySelector('.MuiAlert-containedSuccess');
    expect(paper).not.toBeNull();
  });

  it('Render success severity and outline variant', () => {
    const { container } = render(<Alert severity={AlertSeverity.SUCCESS} variant={AlertVariants.OUTLINED} />);
    const iconContainer = container.querySelector('.MuiAlert-icon');
    expect(iconContainer).not.toBeNull();
    expect(iconContainer?.firstElementChild?.getAttribute('data-mui-test')).toBe('checkmark--outlineIcon');
    const paper = container.querySelector('.MuiAlert-outlinedSuccess');
    expect(paper).not.toBeNull();
  });

  it('Render warning severity and contained variant', () => {
    const { container } = render(<Alert severity={AlertSeverity.WARNING} variant={AlertVariants.CONTAINED} />);
    const iconContainer = container.querySelector('.MuiAlert-icon');
    expect(iconContainer).not.toBeNull();
    expect(iconContainer?.firstElementChild?.getAttribute('data-mui-test')).toBe('warning--altIcon');
    const paper = container.querySelector('.MuiAlert-containedWarning');
    expect(paper).not.toBeNull();
  });

  it('Render warning severity and outline variant', () => {
    const { container } = render(<Alert severity={AlertSeverity.WARNING} variant={AlertVariants.OUTLINED} />);
    const iconContainer = container.querySelector('.MuiAlert-icon');
    expect(iconContainer).not.toBeNull();
    expect(iconContainer?.firstElementChild?.getAttribute('data-mui-test')).toBe('warning--altIcon');
    const paper = container.querySelector('.MuiAlert-outlinedWarning');
    expect(paper).not.toBeNull();
  });

  it('Render info severity and contained variant', () => {
    const { container } = render(<Alert severity={AlertSeverity.INFORMATION} variant={AlertVariants.CONTAINED} />);
    const iconContainer = container.querySelector('.MuiAlert-icon');
    expect(iconContainer).not.toBeNull();
    expect(iconContainer?.firstElementChild?.getAttribute('data-mui-test')).toBe('warningIcon');
    const paper = container.querySelector('.MuiAlert-containedInfo');
    expect(paper).not.toBeNull();
  });

  it('Render info severity and outline variant', () => {
    const { container } = render(<Alert severity={AlertSeverity.INFORMATION} variant={AlertVariants.OUTLINED} />);
    const iconContainer = container.querySelector('.MuiAlert-icon');
    expect(iconContainer).not.toBeNull();
    expect(iconContainer?.firstElementChild?.getAttribute('data-mui-test')).toBe('warningIcon');
    const paper = container.querySelector('.MuiAlert-outlinedInfo');
    expect(paper).not.toBeNull();
  });

  it('Render error severity and contained variant', () => {
    const { container } = render(<Alert severity={AlertSeverity.ERROR} variant={AlertVariants.CONTAINED} />);
    const iconContainer = container.querySelector('.MuiAlert-icon');
    expect(iconContainer).not.toBeNull();
    expect(iconContainer?.firstElementChild?.getAttribute('data-mui-test')).toBe('informationIcon');
    const paper = container.querySelector('.MuiAlert-containedError');
    expect(paper).not.toBeNull();
  });

  it('Render error severity and outline variant', () => {
    const { container } = render(<Alert severity={AlertSeverity.ERROR} variant={AlertVariants.OUTLINED} />);
    const iconContainer = container.querySelector('.MuiAlert-icon');
    expect(iconContainer).not.toBeNull();
    expect(iconContainer?.firstElementChild?.getAttribute('data-mui-test')).toBe('informationIcon');
    const paper = container.querySelector('.MuiAlert-outlinedError');
    expect(paper).not.toBeNull();
  });
});
