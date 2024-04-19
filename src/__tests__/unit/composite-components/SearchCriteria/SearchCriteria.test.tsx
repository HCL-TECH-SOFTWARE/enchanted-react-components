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
import SearchCriteria, { FooterButtonProps } from '../../../../composite_components/SearchCriteria';

afterEach(cleanup);

describe('SearchCriteria', () => {
  it('should render search criteria with body only', () => {
    const placeholder = 'Test Body';
    const label = 'Test Label';
    const handleDrawerOpen = jest.fn();
    const handleDrawerClose = jest.fn();
    render(
      <SearchCriteria
        handleExpand={handleDrawerOpen}
        handleCollapse={handleDrawerClose}
        expandButtonLabel="Button"
        collapseButtonLabel="Cancel"
        label={label}
        open
      >
        {placeholder}
      </SearchCriteria>,
    );

    expect(screen.getByText(placeholder)).not.toBeNull();
  });

  it('should render label, secondary text, and button while help text icon is not rendered in search criteria when drawer is close.', () => {
    const placeholder = 'Test Body';
    const label = 'Test Label';
    const secondaryText = 'Test Secondary Text';
    const helpText = 'Test Help Text';
    const viewButton = 'Button';
    const handleDrawerOpen = jest.fn();
    const handleDrawerClose = jest.fn();
    render(
      <SearchCriteria
        secondaryText={secondaryText}
        helperIconTooltip={helpText}
        open={false}
        label={label}
        handleExpand={handleDrawerOpen}
        handleCollapse={handleDrawerClose}
        expandButtonLabel={viewButton}
        collapseButtonLabel="Cancel"
      >
        {placeholder}

      </SearchCriteria>,
    );

    expect(screen.getByText(placeholder)).not.toBeNull();
    expect(screen.getByText(label)).not.toBeNull();
    expect(screen.getByText(secondaryText)).not.toBeNull();
    expect(screen.getByText('Button')).not.toBeNull();
    expect(screen.queryByLabelText(helpText)).toBeNull();
  });

  it('should not render secondary text and button while help text icon is rendered in search criteria when drawer is open.', () => {
    const placeholder = 'Test Body';
    const label = 'Test Label';
    const secondaryText = 'Test Secondary Text';
    const helpText = 'Test Help Text';
    const viewButton = 'Button';
    const handleDrawerOpen = jest.fn();
    const handleDrawerClose = jest.fn();
    render(
      <SearchCriteria
        secondaryText={secondaryText}
        helperIconTooltip={helpText}
        open
        label={label}
        handleExpand={handleDrawerOpen}
        handleCollapse={handleDrawerClose}
        expandButtonLabel={viewButton}
        collapseButtonLabel="Cancel"
      >
        {placeholder}

      </SearchCriteria>,
    );

    expect(screen.getByText(placeholder)).not.toBeNull();
    expect(screen.getByText(label)).not.toBeNull();
    expect(screen.queryByText(secondaryText)).toBeNull();
    expect(screen.queryByText(viewButton)).toBeNull();
    expect(screen.queryByLabelText(helpText)).not.toBeNull();
  });

  it('should render search criteria with footer when it is open', () => {
    const placeholder = 'Test Body';
    const label = 'Test Label';
    const handleDrawerOpen = jest.fn();
    const handleDrawerClose = jest.fn();
    const footerButtonProps: FooterButtonProps[] = [{
      label: 'Clear',
      variant: 'text',
      key: '1',
    }, {
      label: 'Search',
      variant: 'outlined',
      key: '2',
    }];
    render(
      <SearchCriteria
        handleExpand={handleDrawerOpen}
        handleCollapse={handleDrawerClose}
        expandButtonLabel="Button"
        collapseButtonLabel="Cancel"
        label={label}
        open
        footerButtonProps={footerButtonProps}
      >
        {placeholder}

      </SearchCriteria>,
    );

    expect(screen.getByText(placeholder)).not.toBeNull();
    expect(screen.getByText('Clear')).not.toBeNull();
    expect(screen.getByText('Search')).not.toBeNull();
  });

  it('should render search criteria with correct header and footer when its open', () => {
    const placeholder = 'Test Body';
    const label = 'Test Label';
    const helpText = 'Test Help Text';
    const secondaryText = 'Test Secondary Text';
    const viewButton = 'Button';
    const handleDrawerOpen = jest.fn();
    const handleDrawerClose = jest.fn();
    const footerButtonProps: FooterButtonProps[] = [{
      label: 'Clear',
      variant: 'text',
      key: '1',
    }, {
      label: 'Search',
      variant: 'outlined',
      key: '2',
    }];
    render(
      <SearchCriteria
        open
        secondaryText={secondaryText}
        helperIconTooltip={helpText}
        label={label}
        handleExpand={handleDrawerOpen}
        handleCollapse={handleDrawerClose}
        expandButtonLabel="Button"
        collapseButtonLabel="Cancel"
        footerButtonProps={footerButtonProps}
      >
        {placeholder}

      </SearchCriteria>,
    );

    expect(screen.getByText(placeholder)).not.toBeNull();
    expect(screen.getByText('Clear')).not.toBeNull();
    expect(screen.getByText('Search')).not.toBeNull();
    expect(screen.getByLabelText(helpText)).not.toBeNull();
    expect(screen.getByText(label)).not.toBeNull();
    expect(screen.queryByText(secondaryText)).toBeNull();
    expect(screen.queryByText(viewButton)).toBeNull();
  });
});
