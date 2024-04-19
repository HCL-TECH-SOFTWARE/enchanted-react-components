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
  render, screen, fireEvent, within, waitFor, cleanup,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MultipleSelectChip from '../../../../composite_components/MultipleSelectChip';
import Chip, { ChipTestIds } from '../../../../Chip';

const itemType = [
  { label: 'Category' },
  { label: 'Content' },
  { label: 'ContentTemplate' },
  { label: 'CustomWorkflowAction' },
  { label: 'DateComponent' },
  { label: 'EmailAction' },
  { label: 'ExpireAction' },
  { label: 'FileComponent' },
  { label: 'SiteArea' },
  { label: 'Workflow' },
];

afterEach(cleanup);

describe('MultipleSelectChip', () => {
  it('Render with label', () => {
    const placeholder = 'Select label';
    render(<MultipleSelectChip multiple filterSelectedOptions placeholder={placeholder} options={itemType} value={[]} />);

    const element = screen.getByRole('combobox');
    expect(element.getAttribute('placeholder')).toEqual(placeholder);
  });

  it('Render with chip value', () => {
    const placeholder = 'Select label';
    render(<MultipleSelectChip multiple filterSelectedOptions placeholder={placeholder} options={itemType} value={['SiteArea', 'ContentTemplate', 'Workflow']} />);

    expect(screen.getByText('SiteArea')).not.toBeNull();
    expect(screen.getByText('ContentTemplate')).not.toBeNull();
    expect(screen.getByText('Workflow')).not.toBeNull();
  });

  it('Render with item list', () => {
    const placeholder = 'Select label';
    const { getByRole } = render(<MultipleSelectChip placeholder={placeholder} options={itemType} value={[]} />);

    const element = screen.getByRole('combobox');
    fireEvent.mouseDown(element);
    const listbox = within(getByRole('listbox'));
    expect(listbox.getByText('Category')).not.toBeNull();
    expect(listbox.getByText('FileComponent')).not.toBeNull();
    expect(listbox.getByText('Content')).not.toBeNull();
  });

  it('Call onchange function on item click', () => {
    const placeholder = 'Select label';
    const handleChange = jest.fn();
    const { getByRole } = render(<MultipleSelectChip onChange={handleChange} label={placeholder} options={itemType} />);

    const element = screen.getByRole('combobox');
    fireEvent.mouseDown(element);
    const listbox = within(getByRole('listbox'));
    expect(listbox.getByText('Category')).not.toBeNull();

    fireEvent.click(listbox.getByText('Category'));

    expect(handleChange).toHaveBeenCalled();
  });

  it('Should add free undetermined value as a Chip on input', async () => {
    const freeValue = 'free-value';
    render(
      <MultipleSelectChip
        emptyOptions
        options={['should-be-hidden-option']}
        renderTags={(tagValue, getTagProps) => {
          return tagValue.map((option, index) => {
            return (
              <Chip
                label={option}
                {...getTagProps({ index })}
              />
            );
          });
        }}
      />,
    );

    const element = screen.getByRole('combobox');
    fireEvent.change(element, { target: { value: freeValue } });
    userEvent.type(element, '{enter}');

    await waitFor(() => {
      expect(screen.getByTestId(ChipTestIds.CHIP_ROOT).firstElementChild?.innerHTML).toEqual(freeValue);
    });
  });
});
