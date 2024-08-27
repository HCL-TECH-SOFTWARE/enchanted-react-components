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
import IconDelete from '@hcl-software/enchanted-icons/dist/carbon/es/delete';
import ToggleButtonGroup, { ToggleButtonGroupSizes } from '../../../ToggleButtonGroup/ToggleButtonGroup';
import ToggleButton from '../../../ToggleButton/ToggleButton';

afterEach(cleanup);

describe('ToggleButtonGroup', () => {
  it('Render Small size without crashing', () => {
    render(
      <ToggleButtonGroup
        size={ToggleButtonGroupSizes.SMALL}
      >
        <ToggleButton
          value="small1"
        >
          <IconAdd />
        </ToggleButton>
        <ToggleButton
          value="small2"
        >
          <IconDelete />
        </ToggleButton>
      </ToggleButtonGroup>,
    );
    expect(screen.getByRole('group')).not.toBeNull();
    expect(screen.getAllByRole('button')).not.toBeNull();
    expect((screen.getAllByRole('button')[0].firstElementChild as HTMLElement).dataset.muiTest).toEqual('addIcon');
    expect((screen.getAllByRole('button')[1].firstElementChild as HTMLElement).dataset.muiTest).toEqual('deleteIcon');
  });

  it('Render Medium size without crashing', () => {
    render(
      <ToggleButtonGroup
        size={ToggleButtonGroupSizes.MEDIUM}
      >
        <ToggleButton
          value="small1"
        >
          <IconAdd />
        </ToggleButton>
        <ToggleButton
          value="small2"
        >
          <IconDelete />
        </ToggleButton>
      </ToggleButtonGroup>,
    );
    expect(screen.getByRole('group')).not.toBeNull();
    expect(screen.getAllByRole('button')).not.toBeNull();
    expect((screen.getAllByRole('button')[0].firstElementChild as HTMLElement).dataset.muiTest).toEqual('addIcon');
    expect((screen.getAllByRole('button')[1].firstElementChild as HTMLElement).dataset.muiTest).toEqual('deleteIcon');
  });
});
