/* ======================================================================== *
 * Copyright 2026 HCL America Inc.                                          *
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
  render, screen, fireEvent, cleanup,
} from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { createEnchantedTheme, ThemeDirectionType, ThemeModeType } from '../../../theme';
import TreeView from '../../../TreeView';
import TreeItem from '../../../TreeView/TreeItem';

afterEach(cleanup);

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY)}>
      {ui}
    </ThemeProvider>,
  );
};

describe('TreeView', () => {
  it('Render TreeView without crashing', () => {
    const { container } = renderWithTheme(<TreeView aria-label="test-tree" />);
    expect(container.querySelector('ul[role="tree"]')).not.toBeNull();
  });

  it('Render TreeView with single TreeItem', () => {
    renderWithTheme(
      <TreeView>
        <TreeItem nodeId="1" label="Item 1" />
      </TreeView>,
    );
    expect(screen.getByRole('treeitem')).not.toBeNull();
  });

  it('Render TreeView with multiple TreeItems', () => {
    renderWithTheme(
      <TreeView>
        <TreeItem nodeId="1" label="Item 1" />
        <TreeItem nodeId="2" label="Item 2" />
        <TreeItem nodeId="3" label="Item 3" />
      </TreeView>,
    );
    expect(screen.getAllByRole('treeitem')).toHaveLength(3);
  });

  it('Render TreeView with nested items expanded via defaultExpanded', () => {
    renderWithTheme(
      <TreeView defaultExpanded={['1']}>
        <TreeItem nodeId="1" label="Parent">
          <TreeItem nodeId="2" label="Child" />
        </TreeItem>
      </TreeView>,
    );
    expect(screen.getAllByRole('treeitem')).toHaveLength(2);
  });

  it('Render TreeView with showLevelLine=false hides level line', () => {
    const { container } = renderWithTheme(
      <TreeView showLevelLine={false} defaultExpanded={['1']}>
        <TreeItem nodeId="1" label="Parent">
          <TreeItem nodeId="2" label="Child" />
        </TreeItem>
      </TreeView>,
    );
    expect(container.querySelectorAll('.tree-level-line')).toHaveLength(0);
  });

  it('Render TreeView with showLevelLine=true (default) shows level line', () => {
    const { container } = renderWithTheme(
      <TreeView defaultExpanded={['1']}>
        <TreeItem nodeId="1" label="Parent">
          <TreeItem nodeId="2" label="Child" />
        </TreeItem>
      </TreeView>,
    );
    expect(container.querySelectorAll('.tree-level-line').length).toBeGreaterThan(0);
  });

  it('Render TreeView with controlled selected applies Mui-selected', () => {
    const { container } = renderWithTheme(
      <TreeView selected="1">
        <TreeItem nodeId="1" label="Item 1" />
      </TreeView>,
    );
    expect(container.querySelector('.MuiTreeItem-content.Mui-selected')).not.toBeNull();
  });

  it('Render TreeView with controlled expanded', () => {
    renderWithTheme(
      <TreeView expanded={['1']}>
        <TreeItem nodeId="1" label="Parent">
          <TreeItem nodeId="2" label="Child" />
        </TreeItem>
      </TreeView>,
    );
    expect(screen.getAllByRole('treeitem')).toHaveLength(2);
  });

  it('Render TreeView multiSelect with multiple selected nodes', () => {
    const { container } = renderWithTheme(
      <TreeView multiSelect selected={['1', '2']}>
        <TreeItem nodeId="1" label="Item 1" />
        <TreeItem nodeId="2" label="Item 2" />
      </TreeView>,
    );
    expect(container.querySelectorAll('.MuiTreeItem-content.Mui-selected')).toHaveLength(2);
  });

  it('Calls onNodeSelect when a TreeItem is clicked', () => {
    const handleSelect = jest.fn();
    renderWithTheme(
      <TreeView onNodeSelect={handleSelect}>
        <TreeItem nodeId="1" label="Item 1" />
      </TreeView>,
    );
    fireEvent.click(screen.getByText('Item 1'));
    expect(handleSelect).toHaveBeenCalledWith(expect.anything(), '1');
  });

  it('Calls onNodeToggle when expand icon is clicked', () => {
    const handleToggle = jest.fn();
    const { container } = renderWithTheme(
      <TreeView onNodeToggle={handleToggle}>
        <TreeItem nodeId="1" label="Parent">
          <TreeItem nodeId="2" label="Child" />
        </TreeItem>
      </TreeView>,
    );
    fireEvent.click(container.querySelector('.MuiTreeItem-iconContainer') as HTMLElement);
    expect(handleToggle).toHaveBeenCalledWith(expect.anything(), ['1']);
  });

  it('Collapses expanded node when icon is clicked again', () => {
    const { container } = renderWithTheme(
      <TreeView defaultExpanded={['1']}>
        <TreeItem nodeId="1" label="Parent">
          <TreeItem nodeId="2" label="Child" />
        </TreeItem>
      </TreeView>,
    );
    expect(screen.getAllByRole('treeitem')[0].getAttribute('aria-expanded')).toBe('true');
    fireEvent.click(container.querySelector('.MuiTreeItem-iconContainer') as HTMLElement);
    expect(screen.getAllByRole('treeitem')[0].getAttribute('aria-expanded')).toBe('false');
  });
});

describe('TreeItem', () => {
  it('Render TreeItem with label', () => {
    renderWithTheme(
      <TreeView>
        <TreeItem nodeId="1" label="My Label" />
      </TreeView>,
    );
    expect(screen.getByText('My Label')).not.toBeNull();
  });

  it('Render TreeItem with startIcon', () => {
    const { container } = renderWithTheme(
      <TreeView>
        <TreeItem nodeId="1" label="Item" startIcon={<span />} />
      </TreeView>,
    );
    expect(container.querySelector('.tree-item-start-icon')).not.toBeNull();
  });

  it('Render TreeItem with statusBadge', () => {
    const { container } = renderWithTheme(
      <TreeView>
        <TreeItem nodeId="1" label="Item" statusBadge={<span />} />
      </TreeView>,
    );
    expect(container.querySelector('.tree-item-status')).not.toBeNull();
  });

  it('Render TreeItem with detailsText label-aligned', () => {
    renderWithTheme(
      <TreeView>
        <TreeItem nodeId="1" label="Item" detailsText="Detail info" detailsAlign="label" />
      </TreeView>,
    );
    expect(screen.getByText('Detail info')).not.toBeNull();
  });

  it('Render TreeItem with detailsText end-aligned', () => {
    renderWithTheme(
      <TreeView>
        <TreeItem nodeId="1" label="Item" detailsText="End detail" detailsAlign="end" />
      </TreeView>,
    );
    expect(screen.getByText('End detail')).not.toBeNull();
  });

  it('Render TreeItem with detailsIcon', () => {
    const { container } = renderWithTheme(
      <TreeView>
        <TreeItem nodeId="1" label="Item" detailsIcon={<span />} />
      </TreeView>,
    );
    expect(container.querySelector('.tree-item-details-icon')).not.toBeNull();
  });

  it('Render TreeItem with endIcon', () => {
    const { container } = renderWithTheme(
      <TreeView>
        <TreeItem nodeId="1" label="Item" endIcon={<span />} />
      </TreeView>,
    );
    expect(container.querySelector('.tree-item-end-icon')).not.toBeNull();
  });

  it('Render TreeItem with endAction', () => {
    const { container } = renderWithTheme(
      <TreeView>
        <TreeItem nodeId="1" label="Item" endAction={<button type="button">Act</button>} />
      </TreeView>,
    );
    expect(container.querySelector('.tree-item-end-action')).not.toBeNull();
  });

  it('Render TreeItem with hoverActions', () => {
    const { container } = renderWithTheme(
      <TreeView>
        <TreeItem nodeId="1" label="Item" hoverActions={<button type="button">Hover</button>} />
      </TreeView>,
    );
    expect(container.querySelector('.tree-item-hover-actions')).not.toBeNull();
  });

  it('Render disabled TreeItem has Mui-disabled on content', () => {
    const { container } = renderWithTheme(
      <TreeView>
        <TreeItem nodeId="1" label="Disabled Item" disabled />
      </TreeView>,
    );
    expect(container.querySelector('.MuiTreeItem-content.Mui-disabled')).not.toBeNull();
  });

  it('Render disabled TreeItem has aria-disabled=true', () => {
    renderWithTheme(
      <TreeView>
        <TreeItem nodeId="1" label="Disabled Item" disabled />
      </TreeView>,
    );
    expect(screen.getByRole('treeitem').getAttribute('aria-disabled')).toBe('true');
  });

  it('Render disabled TreeItem does not call onNodeSelect on click', () => {
    const handleSelect = jest.fn();
    renderWithTheme(
      <TreeView onNodeSelect={handleSelect}>
        <TreeItem nodeId="1" label="Disabled Item" disabled />
      </TreeView>,
    );
    fireEvent.click(screen.getByRole('treeitem'));
    expect(handleSelect).not.toHaveBeenCalled();
  });

  it('Render leaf TreeItem has no aria-expanded', () => {
    renderWithTheme(
      <TreeView>
        <TreeItem nodeId="1" label="Leaf" />
      </TreeView>,
    );
    expect(screen.getByRole('treeitem').getAttribute('aria-expanded')).toBeNull();
  });

  it('Render parent TreeItem has aria-expanded=false when collapsed', () => {
    renderWithTheme(
      <TreeView>
        <TreeItem nodeId="1" label="Parent">
          <TreeItem nodeId="2" label="Child" />
        </TreeItem>
      </TreeView>,
    );
    expect(screen.getByRole('treeitem').getAttribute('aria-expanded')).toBe('false');
  });

  it('Render parent TreeItem has aria-expanded=true when expanded', () => {
    renderWithTheme(
      <TreeView defaultExpanded={['1']}>
        <TreeItem nodeId="1" label="Parent">
          <TreeItem nodeId="2" label="Child" />
        </TreeItem>
      </TreeView>,
    );
    expect(screen.getAllByRole('treeitem')[0].getAttribute('aria-expanded')).toBe('true');
  });
});
