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
import IconAdd from '@hcl-software/enchanted-icons/dist/carbon/es/add';
import ToggleButton, { ToggleButtonSizes, ToggleButtonVariants } from '../../../ToggleButton/ToggleButton';

afterEach(cleanup);

describe('ToggleButton', () => {
  it('Render Without Padding variant without crashing', () => {
    render(
      <ToggleButton
        variant={ToggleButtonVariants.WITHOUT_PADDING}
        value="without padding"
      >
        <IconAdd />
      </ToggleButton>,
    );
    expect(screen.getByRole('button')).not.toBeNull();
    expect((screen.getByRole('button').firstElementChild as HTMLElement).dataset.muiTest).toEqual('addIcon');
  });

  it('Render With Padding variant without crashing', () => {
    render(
      <ToggleButton
        variant={ToggleButtonVariants.WITH_PADDING}
        value="with padding"
      >
        <IconAdd />
      </ToggleButton>,
    );
    expect(screen.getByRole('button')).not.toBeNull();
    expect((screen.getByRole('button').firstElementChild as HTMLElement).dataset.muiTest).toEqual('addIcon');
  });

  it('Render Small size without crashing', () => {
    render(
      <ToggleButton
        size={ToggleButtonSizes.SMALL}
        value="small"
      >
        <IconAdd />
      </ToggleButton>,
    );
    expect(screen.getByRole('button')).not.toBeNull();
    expect((screen.getByRole('button').firstElementChild as HTMLElement).dataset.muiTest).toEqual('addIcon');
  });

  it('Render Medium size without crashing', () => {
    render(
      <ToggleButton
        size={ToggleButtonSizes.MEDIUM}
        value="medium"
      >
        <IconAdd />
      </ToggleButton>,
    );
    expect(screen.getByRole('button')).not.toBeNull();
    expect((screen.getByRole('button').firstElementChild as HTMLElement).dataset.muiTest).toEqual('addIcon');
  });
});
