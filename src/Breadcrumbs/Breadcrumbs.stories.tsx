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
import IconInformation from '@hcl-software/enchanted-icons/dist/carbon/es/information';

import Breadcrumbs from './Breadcrumbs';
import Link from '../Link';
import Typography from '../Typography';

export default {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  argTypes: {
    disabled: {
      description: 'If `true`, the component is disabled.',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    separator: {
      control: false,
      description: 'https://mui.com/material-ui/api/breadcrumbs/#breadcrumbs-prop-separator',
    },
    children: {
      control: false,
      description: 'https://mui.com/material-ui/api/breadcrumbs/#breadcrumbs-prop-children',
    },
    classes: {
      control: false,
      description: 'https://mui.com/material-ui/api/breadcrumbs/#breadcrumbs-prop-classes',
    },
    ref: {
      control: false,
      description: 'https://mui.com/material-ui/api/breadcrumbs/',
    },
    sx: {
      control: false,
      description: 'https://mui.com/material-ui/api/breadcrumbs/#breadcrumbs-prop-sx',
    },
    expandText: {
      control: false,
      description: 'https://mui.com/material-ui/api/breadcrumbs/#breadcrumbs-prop-expandText',
    },
    itemsAfterCollapse: {
      control: false,
      description: 'https://mui.com/material-ui/api/breadcrumbs/#breadcrumbs-prop-itemsAfterCollapse',
    },
    itemsBeforeCollapse: {
      control: false,
      description: 'https://mui.com/material-ui/api/breadcrumbs/#breadcrumbs-prop-itemsBeforeCollapse',
    },
    maxItems: {
      control: false,
      description: 'https://mui.com/material-ui/api/breadcrumbs/#breadcrumbs-prop-maxItems',
    },
  },
} as Meta<typeof Breadcrumbs>;

const Template: StoryFn<typeof Breadcrumbs> = (args) => {
  return (
    <Breadcrumbs {...args}>
      <Link href="/">Search</Link>
      <Link href="/material-ui/getting-started/installation/">
        <IconInformation />
      </Link>
      <Link href="/material-ui/getting-started/installation/">
        <IconInformation sx={{ mr: '4px' }} />
        Content
      </Link>
      <Typography color="text.primary">Elements</Typography>
    </Breadcrumbs>
  );
};

export const ExampleBreadcrumbs = {
  render: Template,

  args: {
    ...Breadcrumbs.defaultProps,
  },
};
