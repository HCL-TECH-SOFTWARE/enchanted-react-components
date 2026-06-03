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
import { StoryFn, Meta } from '@storybook/react';
import DocumentIcon from '@hcl-software/enchanted-icons/dist/carbon/es/document';
import IconView from '@hcl-software/enchanted-icons/dist/carbon/es/view';
import HomeIcon from '@hcl-software/enchanted-icons/dist/carbon/es/home';
import FolderIcon from '@hcl-software/enchanted-icons/dist/carbon/es/folder';
import ArrowLeftIcon from '@hcl-software/enchanted-icons/dist/carbon/es/arrow--left';
import OverflowMenuHorizontalIcon from '@hcl-software/enchanted-icons/dist/carbon/es/overflow-menu--horizontal';
import EditIcon from '@hcl-software/enchanted-icons/dist/carbon/es/edit';
import TrashCanIcon from '@hcl-software/enchanted-icons/dist/carbon/es/trash-can';
import Box from '@mui/material/Box';
import CustomIconUserStatusActive from '@hcl-software/enchanted-icons/dist/apps/es/user-status--active';
import { green } from '../colors';
import IconButton from '../IconButton';
import { IconButtonVariants } from '../IconButton/IconButton';
import TreeView, { TreeItem } from './TreeView';

export default {
  title: 'Navigation/TreeView',
  component: TreeView,
  argTypes: {
    disableSelection: {
      if: { arg: 'interactive' },
      description: 'If true, selection is disabled.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    showStartIcon: {
      if: { arg: 'interactive' },
      description: 'Show a start icon on each item, only for Storybook use.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'true' } },
    },
    showStatusBadge: {
      if: { arg: 'interactive' },
      description: 'Show a status badge on each item, only for Storybook use.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'true' } },
    },
    showDetailsIcon: {
      if: { arg: 'interactive' },
      description: 'Show a details icon on each item, only for Storybook use.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'true' } },
    },
    showDetailsText: {
      if: { arg: 'interactive' },
      description: 'Show details text on each item, only for Storybook use.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'true' } },
    },
    showEndIcon: {
      if: { arg: 'interactive' },
      description: 'Show an end icon on each item, only for Storybook use.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'true' } },
    },
    showEndAction: {
      if: { arg: 'interactive' },
      description: 'Show an end action (overflow menu) on each item, only for Storybook use.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'true' } },
    },
    showHoverActions: {
      if: { arg: 'interactive' },
      description: 'Show hover action buttons on each item, only for Storybook use.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'true' } },
    },
    disabled: {
      if: { arg: 'interactive' },
      description: 'If true, all tree items in the tree are globally disabled.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    detailsAlign: {
      if: { arg: 'interactive' },
      description: 'Controls where detailsIcon/detailsText are placed. "label" = hugged after label text; "end" = right-aligned before endIcon/endAction.',
      control: { type: 'radio' },
      options: ['label', 'end'],
      table: { defaultValue: { summary: 'label' } },
    },
    showLevelLine: {
      if: { arg: 'interactive' },
      description: 'When false, hides the vertical level-line that connects parent items to their children.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'true' } },
    },
    defaultExpanded: { table: { disable: true } },
    defaultCollapseIcon: { table: { disable: true } },
    defaultExpandIcon: { table: { disable: true } },
    defaultParentIcon: { table: { disable: true } },
    defaultEndIcon: { table: { disable: true } },
    children: { table: { disable: true } },
    ref: { table: { disable: true } },
    classes: { table: { disable: true } },
    sx: { table: { disable: true } },
    expanded: { table: { disable: true } },
    selected: { table: { disable: true } },
    onNodeSelect: { table: { disable: true } },
    onNodeToggle: { table: { disable: true } },
    onNodeFocus: { table: { disable: true } },
  },
} as Meta<typeof TreeView>;

/* ── Shared helpers ──────────────────────────────────────────────────────── */
const StatusBadge = () => {
  return (
    <CustomIconUserStatusActive style={{ fontSize: 16, color: green.GREEN400 }} sx={{ '& path': { stroke: green.GREEN1000 } }} />
  );
};

/* ── Interactive template ────────────────────────────────────────────────── */
interface ExtendedTreeViewArgs {
  interactive?: boolean;
  disableSelection?: boolean;
  showStartIcon?: boolean;
  showStatusBadge?: boolean;
  showDetailsIcon?: boolean;
  showDetailsText?: boolean;
  showEndIcon?: boolean;
  showEndAction?: boolean;
  showHoverActions?: boolean;
  disabled?: boolean;
  detailsAlign?: 'label' | 'end';
  showLevelLine?: boolean;
}

const Template: StoryFn<ExtendedTreeViewArgs> = (args) => {
  const {
    disableSelection,
    showStartIcon,
    showStatusBadge,
    showDetailsIcon,
    showDetailsText,
    showEndIcon,
    showEndAction,
    showHoverActions,
    disabled,
    detailsAlign = 'label',
    showLevelLine = true,
  } = args;

  const [selected, setSelected] = React.useState<string[]>([]);

  const handleNodeSelect = (_event: React.SyntheticEvent, nodeIds: string | string[]) => {
    setSelected(Array.isArray(nodeIds) ? nodeIds : [nodeIds]);
  };

  const overflowAction = showEndAction ? (
    <IconButton
      size="small"
      variant={IconButtonVariants.WITHOUT_PADDING}
      showendicon={0}
      aria-label="More actions"
      onClick={(e) => { e.stopPropagation(); }}
    >
      <OverflowMenuHorizontalIcon />
    </IconButton>
  ) : undefined;

  const hoverActionButtons = showHoverActions ? (
    <>
      <IconButton size="small" variant={IconButtonVariants.WITHOUT_PADDING} showendicon={0} onClick={(e) => { e.stopPropagation(); }}><IconView /></IconButton>
      <IconButton size="small" variant={IconButtonVariants.WITHOUT_PADDING} showendicon={0} onClick={(e) => { e.stopPropagation(); }}><OverflowMenuHorizontalIcon /></IconButton>
    </>
  ) : undefined;

  const treeRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    const handleDocMouseDown = (e: MouseEvent) => {
      if (treeRef.current && !treeRef.current.contains(e.target as Node)) {
        setSelected([]);
      }
    };
    document.addEventListener('mousedown', handleDocMouseDown);
    return () => { return document.removeEventListener('mousedown', handleDocMouseDown); };
  }, []);

  return (
    <Box>
      <TreeView
        ref={treeRef}
        key={String(disabled)}
        disableSelection={disableSelection}
        defaultExpanded={['1']}
        selected={selected}
        onNodeSelect={handleNodeSelect}
        showLevelLine={showLevelLine}
        disabled={disabled}
      >
        <TreeItem
          nodeId="1"
          label="Item"
          startIcon={showStartIcon ? <DocumentIcon /> : undefined}
          statusBadge={showStatusBadge ? <StatusBadge /> : undefined}
          detailsIcon={showDetailsIcon ? <ArrowLeftIcon /> : undefined}
          detailsText={showDetailsText ? 'Details' : undefined}
          detailsAlign={detailsAlign}
          endIcon={showEndIcon ? <HomeIcon /> : undefined}
          endAction={overflowAction}
          hoverActions={hoverActionButtons}
        >
          <TreeItem
            nodeId="2"
            label="Item one"
            startIcon={showStartIcon ? <DocumentIcon /> : undefined}
            statusBadge={showStatusBadge ? <StatusBadge /> : undefined}
            detailsIcon={showDetailsIcon ? <ArrowLeftIcon /> : undefined}
            detailsText={showDetailsText ? 'Details' : undefined}
            detailsAlign={detailsAlign}
            endIcon={showEndIcon ? <HomeIcon /> : undefined}
            endAction={overflowAction}
            hoverActions={hoverActionButtons}
          >
            <TreeItem
              nodeId="3"
              label="Sub-item one"
              startIcon={showStartIcon ? <DocumentIcon /> : undefined}
              statusBadge={showStatusBadge ? <StatusBadge /> : undefined}
              detailsIcon={showDetailsIcon ? <ArrowLeftIcon /> : undefined}
              detailsText={showDetailsText ? 'Details' : undefined}
              detailsAlign={detailsAlign}
              endIcon={showEndIcon ? <HomeIcon /> : undefined}
              endAction={overflowAction}
              hoverActions={hoverActionButtons}
            >
              <TreeItem
                nodeId="4"
                label="Sub-sub-item one"
                startIcon={showStartIcon ? <DocumentIcon /> : undefined}
                statusBadge={showStatusBadge ? <StatusBadge /> : undefined}
                detailsIcon={showDetailsIcon ? <ArrowLeftIcon /> : undefined}
                detailsText={showDetailsText ? 'Details' : undefined}
                detailsAlign={detailsAlign}
                endIcon={showEndIcon ? <HomeIcon /> : undefined}
                endAction={overflowAction}
                hoverActions={hoverActionButtons}
              >
                <TreeItem
                  nodeId="5"
                  label="Sub-sub-sub-item one"
                  startIcon={showStartIcon ? <DocumentIcon /> : undefined}
                  statusBadge={showStatusBadge ? <StatusBadge /> : undefined}
                  detailsIcon={showDetailsIcon ? <ArrowLeftIcon /> : undefined}
                  detailsText={showDetailsText ? 'Details' : undefined}
                  detailsAlign={detailsAlign}
                  endIcon={showEndIcon ? <HomeIcon /> : undefined}
                  endAction={overflowAction}
                  hoverActions={hoverActionButtons}
                />
              </TreeItem>
            </TreeItem>
          </TreeItem>
          <TreeItem
            nodeId="6"
            label="Item two"
            startIcon={showStartIcon ? <DocumentIcon /> : undefined}
            statusBadge={showStatusBadge ? <StatusBadge /> : undefined}
            detailsIcon={showDetailsIcon ? <ArrowLeftIcon /> : undefined}
            detailsText={showDetailsText ? 'Details' : undefined}
            detailsAlign={detailsAlign}
            endIcon={showEndIcon ? <HomeIcon /> : undefined}
            endAction={overflowAction}
            hoverActions={hoverActionButtons}
          />
        </TreeItem>
      </TreeView>
    </Box>
  );
};

export const InteractiveExample = {
  render: Template,
  args: {
    interactive: true,
    disableSelection: false,
    showStartIcon: true,
    showStatusBadge: true,
    showDetailsIcon: true,
    showDetailsText: true,
    showEndIcon: true,
    showEndAction: true,
    showHoverActions: true,
    disabled: false,
    detailsAlign: 'label',
    showLevelLine: true,
  },
};

/* ── Visual test ─────────────────────────────────── */
const VisualTestTemplate: StoryFn<object> = () => {
  const overflowAction = (
    <IconButton size="small" variant={IconButtonVariants.WITHOUT_PADDING} showendicon={0}>
      <OverflowMenuHorizontalIcon />
    </IconButton>
  );
  const hoverActionButtons = (
    <>
      <IconButton size="small" variant={IconButtonVariants.WITHOUT_PADDING} showendicon={0}><EditIcon /></IconButton>
      <IconButton size="small" variant={IconButtonVariants.WITHOUT_PADDING} showendicon={0}><TrashCanIcon /></IconButton>
    </>
  );

  type ExtraProps = {
    hoverActions?: React.ReactNode;
    endAction?: React.ReactNode;
    disabled?: boolean;
  };
  const fullItem = (nodeId: string, extra?: ExtraProps) => {
    return (
      <TreeItem
        nodeId={nodeId}
        label="Item"
        startIcon={<DocumentIcon />}
        statusBadge={<StatusBadge />}
        detailsIcon={<ArrowLeftIcon />}
        detailsText="Text"
        endIcon={<HomeIcon />}
        endAction={overflowAction}
        {...extra}
      />
    );
  };

  return (
    <Box
      sx={{
        display: 'flex', flexDirection: 'column', gap: 4, p: 2,
      }}
    >
      <Box>
        <Box sx={{ mb: 1, typography: 'caption', color: 'text.secondary' }}>State=Default · Selected=False · Hover actions=False</Box>
        <TreeView defaultExpanded={['a1']}>{fullItem('a1')}</TreeView>
      </Box>

      <Box>
        <Box sx={{ mb: 1, typography: 'caption', color: 'text.secondary' }}>State=Default · Selected=False · Hover actions=True</Box>
        <TreeView defaultExpanded={['b1']}>{fullItem('b1', { hoverActions: hoverActionButtons, endAction: undefined })}</TreeView>
      </Box>

      <Box>
        <Box sx={{ mb: 1, typography: 'caption', color: 'text.secondary' }}>State=Default · Selected=True · Hover actions=False</Box>
        <TreeView defaultExpanded={['c1']} defaultSelected="c2">
          <TreeItem nodeId="c1" label="Folder" startIcon={<FolderIcon />}>{fullItem('c2')}</TreeItem>
        </TreeView>
      </Box>

      <Box>
        <Box sx={{ mb: 1, typography: 'caption', color: 'text.secondary' }}>State=Default · Selected=True · Hover actions=True</Box>
        <TreeView defaultExpanded={['d1']} defaultSelected="d2">
          <TreeItem nodeId="d1" label="Folder" startIcon={<FolderIcon />}>{fullItem('d2', { hoverActions: hoverActionButtons, endAction: undefined })}</TreeItem>
        </TreeView>
      </Box>

      <Box>
        <Box sx={{ mb: 1, typography: 'caption', color: 'text.secondary' }}>Minimal – label only</Box>
        <TreeView defaultExpanded={['e1']}>
          <TreeItem nodeId="e1" label="Folder">
            <TreeItem nodeId="e2" label="File one" />
            <TreeItem nodeId="e3" label="File two" />
          </TreeItem>
        </TreeView>
      </Box>

      <Box>
        <Box sx={{ mb: 1, typography: 'caption', color: 'text.secondary' }}>Disabled</Box>
        <TreeView defaultExpanded={['f1']}>
          <TreeItem nodeId="f1" label="Folder (disabled)" startIcon={<FolderIcon />} disabled>
            <TreeItem nodeId="f2" label="File" startIcon={<DocumentIcon />} />
          </TreeItem>
          <TreeItem nodeId="f3" label="Item (disabled)" startIcon={<DocumentIcon />} disabled />
        </TreeView>
      </Box>
    </Box>
  );
};

export const VisualTest = VisualTestTemplate.bind({});
VisualTest.parameters = { controls: { disable: true } };
