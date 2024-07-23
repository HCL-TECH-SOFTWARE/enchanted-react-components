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
import { Grid } from '@mui/material';
import IconTools from '@hcl-software/enchanted-icons/dist/carbon/es/tools';
import IconDocument from '@hcl-software/enchanted-icons/dist/carbon/es/document';
import IconOverflowHorizontal from '@hcl-software/enchanted-icons/dist/carbon/es/overflow-menu--horizontal';

import IconButton, { IconButtonVariants } from '../IconButton/IconButton';
import Panel from './Panel';
import PlaceholderArea from '../utils/PlaceholderArea';

export default {
  title: 'Data Display/Panel',
  component: Panel,
  parameters: {
    docs: {
      story: { height: '840px', inline: true },
    },
  },
  argTypes: {
    open: {
      description: 'To show or hide the panel',
      if: { arg: 'interactive' },
      type: 'boolean',
    },
    isPanelCollapsed: {
      description: 'To expand or collapse the panel',
      if: { arg: 'interactive' },
      type: 'boolean',
    },
    panelVariant: {
      description: 'Adds padding to the content of the panel',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'without padding',
        },
      },
    },
    hideSidebar: {
      description: 'If true, the sidebar will be hidden',
      if: { arg: 'interactive' },
      type: 'boolean',
    },
    tabList: {
      description: 'Required. Array of objects of type TabsPanelProps',
      if: { arg: 'interactive' },
    },
    selectedTabValue: {
      description: 'Index of the current selected tab',
      control: false,
    },
    toggleClose: {
      description: 'Event handler for close button',
      control: false,
    },
    handleTabChange: {
      description: 'Event handler for changing tab',
      control: false,
    },
    ref: {
      description: 'ref of Panel component.',
      control: false,
    },
    sidebar: {
      description: 'sidebar of Panel component.',
      control: false,
    },
    BackdropComponent: {
      description: 'BackdropComponent of Panel component.',
      control: false,
    },
    BackdropProps: {
      description: 'BackdropProps of Panel component.',
      control: false,
    },
  },
} as Meta<typeof Panel>;

const samplePropertiesContent = () => {
  return (
    <div>
      <PlaceholderArea height="calc(100vh - 48px)" />
    </div>
  );
};

const tabList = [{
  tabIcon: {
    icon: <IconTools />,
    label: 'Properties',
  },
  content: {
    title: 'Properties',
    body: samplePropertiesContent(),
    actionHeaderBar: (
      <Grid>
        <IconButton
          size="small"
          variant={IconButtonVariants.WITH_PADDING}
        >
          <IconOverflowHorizontal />
        </IconButton>
      </Grid>
    ),
  },
}, {
  tabIcon: {
    icon: <IconDocument />,
    label: 'Renditions',
  },
  content: {
    title: 'Renditions',
    body: samplePropertiesContent(),
  },
}];

const InteractiveExampleTemplate: StoryFn<typeof Panel> = (args) => {
  const translations = {
    closeButtonTooltip: 'Close Panel',
    toggleButtonTooltip: args.isPanelCollapsed ? 'Expand panel' : 'Collapse panel',
  };
  return (
    <Panel
      {...args}
      isPanelCollapsed={args.isPanelCollapsed}
      togglePanel={() => { return true; }}
      translation={translations}
    />
  );
};

const VisualTestTemplate: StoryFn<typeof Panel> = () => {
  return (
    // @ts-ignore
    <Panel
      {...Panel.defaultProps}
      open
      tabList={tabList}
      togglePanel={() => { return true; }}
    />
  );
};

export const InteractiveExample = InteractiveExampleTemplate.bind({});
InteractiveExample.parameters = {
  options: { showPanel: true },
};
InteractiveExample.args = {
  ...Panel.defaultProps,
  // @ts-ignore - this attribute is need to disable all controls in the InteractiveExample, but this attribute is not part of the PanelProps
  interactive: true,
  open: true,
  tabList,
};

export const VisualTest = VisualTestTemplate.bind({});
VisualTest.parameters = {
  options: { showPanel: false },
};
