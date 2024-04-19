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
import ChipLayout from './ChipLayout';
import {
  sampleDefaultSet,
  sampleSingleChip,
  sampleTwoChips,
  sampleThreeChips,
  sampleFourChips,
  sampleFiveChips,
} from './sampleChipLayoutConfig';

export default {
  title: 'Inputs/ChipLayout',
  component: ChipLayout,
  parameters: {
    docs: {
      inlineStories: false,
      iframeWidth: 1600,
    },
  },
  argTypes: {
    chipChildNodes: {
      description: 'Nodes to render inside ChipLayout component as individual Chips',
      table: {
        defaultValue: {
          summary: sampleDefaultSet,
        },
      },
    },
  },
} as Meta<typeof ChipLayout>;

const Template: StoryFn<typeof ChipLayout> = (args) => {
  return <ChipLayout chipChildNodes={args.chipChildNodes} />;
};

export const ExampleChipLayout = {
  render: Template,

  args: {
    chipChildNodes: sampleDefaultSet,
  },
};

export const ExampleChipLayoutSingleChip = {
  render: Template,

  args: {
    chipChildNodes: sampleSingleChip,
  },
};

export const ExampleChipLayoutTwoChips = {
  render: Template,

  args: {
    chipChildNodes: sampleTwoChips,
  },
};

export const ExampleChipLayoutThreeChips = {
  render: Template,

  args: {
    chipChildNodes: sampleThreeChips,
  },
};

export const ExampleChipLayoutFourChips = {
  render: Template,

  args: {
    chipChildNodes: sampleFourChips,
  },
};

export const ExampleChipLayoutFiveChips = {
  render: Template,

  args: {
    chipChildNodes: sampleFiveChips,
  },
};
