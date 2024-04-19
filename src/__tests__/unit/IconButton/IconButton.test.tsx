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
import IconDelete from '@hcl-software/enchanted-icons/dist/carbon/es/delete';
import IconButton, { IconButtonVariants, IconButtonSizes } from '../../../IconButton';

afterEach(cleanup);

describe('Icon Button', () => {
  it('Render Without Padding variant without crashing', () => {
    render(
      <IconButton variant={IconButtonVariants.WITHOUT_PADDING}>
        <IconDelete />
      </IconButton>,
    );
    expect(screen.getByRole('button')).not.toBeNull();
    expect((screen.getByRole('button').firstElementChild as HTMLElement).dataset.muiTest).toEqual('deleteIcon');
  });

  it('Render With Padding variant without crashing', () => {
    render(
      <IconButton variant={IconButtonVariants.WITH_PADDING}>
        <IconDelete />
      </IconButton>,
    );
    expect(screen.getByRole('button')).not.toBeNull();
    expect((screen.getByRole('button').firstElementChild as HTMLElement).dataset.muiTest).toEqual('deleteIcon');
  });

  it('Render Small size without crashing', () => {
    render(
      <IconButton size={IconButtonSizes.SMALL}>
        <IconDelete />
      </IconButton>,
    );
    expect(screen.getByRole('button')).not.toBeNull();
    expect((screen.getByRole('button').firstElementChild as HTMLElement).dataset.muiTest).toEqual('deleteIcon');
  });

  it('Render Medium size without crashing', () => {
    render(
      <IconButton size={IconButtonSizes.MEDIUM}>
        <IconDelete />
      </IconButton>,
    );
    expect(screen.getByRole('button')).not.toBeNull();
    expect((screen.getByRole('button').firstElementChild as HTMLElement).dataset.muiTest).toEqual('deleteIcon');
  });
});
