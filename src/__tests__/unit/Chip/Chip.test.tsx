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
  render, screen, waitFor, fireEvent, cleanup,
} from '@testing-library/react';
import IconPhone from '@hcl-software/enchanted-icons/dist/carbon/es/phone';
import UserAvatar from '@hcl-software/enchanted-icons/dist/carbon/es/user--avatar';
import Chip, { ChipVariants } from '../../../Chip';
import { AvatarTypes } from '../../../Avatar';

afterEach(cleanup);

describe('Chip', () => {
  const testLabel = 'This is a chip';

  it('Render base variant with given label', () => {
    render(
      <Chip label={testLabel} />,
    );
    expect(screen.getByText(testLabel)).toBeTruthy();
  });

  it('Render contained variant with given label', () => {
    render(
      <Chip label={testLabel} variant={ChipVariants.CONTAINED} />,
    );
    expect(screen.getByText(testLabel)).toBeTruthy();
  });

  it('Render outlined variant with given label', () => {
    render(
      <Chip label={testLabel} variant={ChipVariants.OUTLINED} />,
    );
    expect(screen.getByText(testLabel)).toBeTruthy();
  });

  it('Render with given label and leadingavatartype icon and leadingIcon is defined', () => {
    render(
      <Chip label={testLabel} leadingavatartype={AvatarTypes.ICON} leadingIcon={<UserAvatar />} />,
    );
    expect(screen.getByText(testLabel)).toBeTruthy();
  });

  it('Render with given label and leadingavatartype icon and default MUI prop icon is defined instead of Enchanted leadingIcon', () => {
    render(
      <Chip label={testLabel} leadingavatartype={AvatarTypes.ICON} icon={<IconPhone />} />,
    );
    expect(screen.getByText(testLabel)).toBeTruthy();
  });

  it('Render without crashing, with given label, leadingavatartype icon, but leadingIcon and icon are both undefined', () => {
    render(
      <Chip label={testLabel} leadingavatartype={AvatarTypes.ICON} />,
    );
    expect(screen.getByText(testLabel)).toBeTruthy();
  });

  it('Render with given label and leadingavatartype image and leadingImage is defined', () => {
    render(
      <Chip label={testLabel} leadingavatartype={AvatarTypes.IMAGE} leadingImage="checker.png" />,
    );
    expect(screen.getByText(testLabel)).toBeTruthy();
  });

  it('Render without crashing, with given label, leadingavatartype image, but leadingImage is undefined', () => {
    render(
      <Chip label={testLabel} leadingavatartype={AvatarTypes.IMAGE} />,
    );
    expect(screen.getByText(testLabel)).toBeTruthy();
  });

  it('Render with given label and leadingavatartype letter and leadingLetter is defined', () => {
    render(
      <Chip label={testLabel} leadingavatartype={AvatarTypes.LETTER} leadingLetter="CH" />,
    );
    expect(screen.getByText(testLabel)).toBeTruthy();
  });

  it('Render without crashing, with given label, leadingavatartype letter, but leadingLetter is undefined', () => {
    render(
      <Chip label={testLabel} leadingavatartype={AvatarTypes.LETTER} />,
    );
    expect(screen.getByText(testLabel)).toBeTruthy();
  });

  it('Render with given label and onDeleteFunc to show trailing icon', async () => {
    const mockFn = jest.fn();
    render(
      <Chip label={testLabel} onDeleteFunc={mockFn} />,
    );
    expect(screen.getByText(testLabel)).toBeTruthy();
    expect(screen.getByTestId('CancelIcon')).toBeTruthy();

    const deleteChipIcon = screen.getByTestId('CancelIcon');
    fireEvent.click(deleteChipIcon);

    await waitFor(() => {
      expect(mockFn).toBeCalled();
    });
  });

  it('Render with given label but have it disabled', () => {
    render(
      <Chip label={testLabel} disabled />,
    );
    expect(screen.getByText(testLabel)).toBeTruthy();
  });

  it('Render with given label but have it selected', () => {
    render(
      <Chip label={testLabel} selected />,
    );
    expect(screen.getByText(testLabel)).toBeTruthy();
  });
});
