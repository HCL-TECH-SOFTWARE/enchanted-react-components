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
import React, { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import SnackbarGroup, { SnackbarGroupItem } from './SnackbarGroup';
import SnackbarContainer, { SnackbarContainerPosition } from '../Snackbar/SnackbarContainer';
import { SnackbarVariants } from '../Snackbar/Snackbar';

export default {
  title: 'Feedback/SnackbarGroup',
  component: SnackbarGroup,
  parameters: {
    docs: {
      story: { height: '200px', inline: true },
    },
  },
  argTypes: {
    open: {
      description: 'If true, the component is shown.',
    },
    items: {
      description: 'Array of notification items to display.',
      control: false,
    },
    policy: {
      description: 'Display policy for items: "stack" shows multiple items, "queue" shows only the first.',
      options: ['stack', 'queue'],
      control: { type: 'radio' },
      table: {
        defaultValue: {
          summary: 'stack',
        },
      },
    },
    maxVisible: {
      description: 'Maximum number of items visible before needing to expand.',
      control: { type: 'number' },
      table: {
        defaultValue: {
          summary: 5,
        },
      },
    },
    defaultExpanded: {
      description: 'Whether the group should be expanded by default.',
      control: 'boolean',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    showVariantBadges: {
      description: 'Whether to show variant count badges in the header.',
      control: 'boolean',
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    includeProgressInHeaderCounts: {
      description: 'Whether to include progress items in the header count.',
      control: 'boolean',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    onCloseItem: {
      control: false,
      description: 'Callback fired when an individual item is closed.',
    },
    onCloseAll: {
      control: false,
      description: 'Callback fired when all items are closed.',
    },
    onExpandChange: {
      control: false,
      description: 'Callback fired when the expand state changes.',
    },
    anchorOrigin: {
      control: false,
      description: 'The position of the snackbar on the screen.',
    },
    sx: {
      control: false,
      description: 'System properties for styling.',
    },
    ref: {
      control: false,
      description: 'Forward reference to the underlying DOM element.',
    },
  },
} as Meta<typeof SnackbarGroup>;

// eslint-why Storybook args require flexible typing
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const InteractiveExampleTemplate: StoryFn<typeof SnackbarGroup> = (args: any) => {
  const [items, setItems] = useState<SnackbarGroupItem[]>([
    {
      id: '1',
      message: 'The width you entered is too small. It has been resized to the minimum supported width of 320px.',
      variant: SnackbarVariants.ERROR,
      showActionButton: false,
    },
    {
      id: '2',
      message: 'The dimensions entered exceeds 500% of your device\'s viewport.',
      variant: SnackbarVariants.ERROR,
      showActionButton: false,
    },
    {
      id: '3',
      message: 'Invalid color. Please enter a valid Hex, RGB, or color name.',
      variant: SnackbarVariants.ERROR,
      showActionButton: false,
    },
  ]);

  return (
    <SnackbarContainer>
      <SnackbarGroup
        open
        items={items}
        policy={args.policy}
        maxVisible={args.maxVisible}
        defaultExpanded={args.defaultExpanded}
        showVariantBadges={args.showVariantBadges}
        includeProgressInHeaderCounts={args.includeProgressInHeaderCounts}
        onCloseItem={(id) => { return setItems((prev) => { return prev.filter((x) => { return x.id !== id; }); }); }}
        onCloseAll={() => { return setItems([]); }}
      />
    </SnackbarContainer>
  );
};

export const InteractiveExample = InteractiveExampleTemplate.bind({});
InteractiveExample.parameters = {
  options: { showPanel: true },
};
InteractiveExample.args = {
  policy: 'stack',
  maxVisible: 2,
  defaultExpanded: false,
  showVariantBadges: true,
  includeProgressInHeaderCounts: false,
};

const VisualTestTemplate: StoryFn<typeof SnackbarGroup> = () => {
  const [stackSuccessItems, setStackSuccessItems] = useState<SnackbarGroupItem[]>([
    {
      id: '1',
      message: 'Success: Your changes have been saved successfully to the database.',
      variant: SnackbarVariants.SUCCESS,
    },
    {
      id: '2',
      message: 'Success: The file has been uploaded and is now available for download.',
      variant: SnackbarVariants.SUCCESS,
    },
    {
      id: '3',
      message: 'Success: Operation completed successfully. All items have been processed.',
      variant: SnackbarVariants.SUCCESS,
    },
  ]);

  const [stackWarningItems, setStackWarningItems] = useState<SnackbarGroupItem[]>([
    {
      id: '1',
      message: 'Warning: Please review your input before submitting the form.',
      variant: SnackbarVariants.WARNING,
    },
    {
      id: '2',
      message: 'Warning: This action cannot be undone. Are you sure you want to proceed?',
      variant: SnackbarVariants.WARNING,
    },
    {
      id: '3',
      message: 'Warning: Your session will expire in 5 minutes due to inactivity.',
      variant: SnackbarVariants.WARNING,
    },
  ]);

  const [queueSuccessItems, setQueueSuccessItems] = useState<SnackbarGroupItem[]>([
    {
      id: '1',
      message: 'Success: Your changes have been saved successfully to the database.',
      variant: SnackbarVariants.SUCCESS,
    },
    {
      id: '2',
      message: 'Success: The file has been uploaded and is now available for download.',
      variant: SnackbarVariants.SUCCESS,
    },
    {
      id: '3',
      message: 'Success: Operation completed successfully. All items have been processed.',
      variant: SnackbarVariants.SUCCESS,
    },
  ]);

  const [queueWarningItems, setQueueWarningItems] = useState<SnackbarGroupItem[]>([
    {
      id: '1',
      message: 'Warning: Please review your input before submitting the form.',
      variant: SnackbarVariants.WARNING,
    },
    {
      id: '2',
      message: 'Warning: This action cannot be undone. Are you sure you want to proceed?',
      variant: SnackbarVariants.WARNING,
    },
    {
      id: '3',
      message: 'Warning: Your session will expire in 5 minutes due to inactivity.',
      variant: SnackbarVariants.WARNING,
    },
  ]);

  return (
    <SnackbarContainer position={SnackbarContainerPosition.LEFT}>
      <SnackbarGroup
        open
        items={stackSuccessItems}
        policy="stack"
        maxVisible={2}
        defaultExpanded={false}
        showVariantBadges
        onCloseItem={(id) => { return setStackSuccessItems((prev) => { return prev.filter((x) => { return x.id !== id; }); }); }}
        onCloseAll={() => { return setStackSuccessItems([]); }}
      />
      <SnackbarGroup
        open
        items={stackWarningItems}
        policy="stack"
        maxVisible={2}
        defaultExpanded={false}
        showVariantBadges
        onCloseItem={(id) => { return setStackWarningItems((prev) => { return prev.filter((x) => { return x.id !== id; }); }); }}
        onCloseAll={() => { return setStackWarningItems([]); }}
      />
      <SnackbarGroup
        open
        items={queueSuccessItems}
        policy="queue"
        maxVisible={1}
        defaultExpanded={false}
        showVariantBadges
        onCloseItem={(id) => { return setQueueSuccessItems((prev) => { return prev.filter((x) => { return x.id !== id; }); }); }}
        onCloseAll={() => { return setQueueSuccessItems([]); }}
      />
      <SnackbarGroup
        open
        items={queueWarningItems}
        policy="queue"
        maxVisible={1}
        defaultExpanded={false}
        showVariantBadges
        onCloseItem={(id) => { return setQueueWarningItems((prev) => { return prev.filter((x) => { return x.id !== id; }); }); }}
        onCloseAll={() => { return setQueueWarningItems([]); }}
      />
    </SnackbarContainer>
  );
};

export const VisualTest = VisualTestTemplate.bind({});
VisualTest.parameters = {
  options: { showPanel: false },
};
