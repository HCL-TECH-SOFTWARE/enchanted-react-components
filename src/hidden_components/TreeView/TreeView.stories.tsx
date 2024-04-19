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
import { StoryFn, Meta } from '@storybook/react';

import ChevronRightIcon from '@hcl-software/enchanted-icons/dist/carbon/es/chevron--right';
import ChevronDownIcon from '@hcl-software/enchanted-icons/dist/carbon/es/chevron--down';

import TreeView from './TreeView';
import TreeItem from './TreeItem';

export default {
  title: 'Navigation/TreeView',
  component: TreeView,
} as Meta<typeof TreeView>;

const Template: StoryFn<typeof TreeView> = (args) => {
  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ChevronDownIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{
        height: 240,
        flexGrow: 1,
        maxWidth: 400,
        overflowY: 'auto',
      }}
    >
      <TreeItem nodeId="1" label="Applications">
        <TreeItem nodeId="2" label="Calendar" />
      </TreeItem>
      <TreeItem nodeId="5" label="Documents">
        <TreeItem nodeId="10" label="OSS" />
        <TreeItem nodeId="6" label="MUI">
          <TreeItem nodeId="8" label="index.js" />
        </TreeItem>
      </TreeItem>
    </TreeView>
  );
};

export const ExampleTreeView = {
  render: Template,

  args: {
    ...TreeView.defaultProps,
  },
};
