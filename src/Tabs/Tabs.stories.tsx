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
import IconPaintBrush from '@hcl-software/enchanted-icons/dist/carbon/es/paint-brush';
import Box from '@mui/material/Box';
import Tabs from './Tabs';
import Tab from './Tab';
import Typography from '../Typography';
import { tabIcons } from './TabData';

export default {
  title: 'Navigation/Tabs',
  component: Tabs,
  argTypes: {
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
      description: 'Orientation of tabs',
    },
    iconposition: {
      control: { type: 'radio' },
      if: {
        arg: 'orientation', eq: 'horizontal', then: { options: ['start', 'top'] }, value: 'start',
      },
    },
    classes: {
      description: 'https://mui.com/material-ui/api/tabs/#classes',
      control: false,
    },
    sx: {
      description: 'https://mui.com/system/getting-started/the-sx-prop/',
      control: false,
    },
    variant: {
      description: 'https://mui.com/material-ui/api/tabs/#tabs-prop-variant',
      control: false,
    },
    ref: {
      description: 'https://mui.com/material-ui/api/tabs/',
      control: false,
    },
    children: {
      description: 'https://mui.com/material-ui/api/tabs/#tabs-prop-children',
      control: false,
    },
    action: {
      description: 'https://mui.com/material-ui/api/tabs/#tabs-prop-action/',
      control: false,
    },
    tabIndex: {
      description: 'The tabIndex of the Tabs.',
      if: { arg: 'interactive' },
    },
    centerRipple: {
      description: 'https://mui.com/material-ui/api/tab/#tab-prop-centerRipple',
      control: false,
    },
    disableRipple: {
      description: 'https://mui.com/material-ui/api/tab/#tab-prop-disableRipple',
      control: false,
    },
    disableTouchRipple: {
      description: 'https://mui.com/material-ui/api/tabs/',
      control: false,
    },
    focusRipple: {
      description: 'https://mui.com/material-ui/api/tabs/',
      control: false,
    },
    TabIndicatorProps: {
      description: 'https://mui.com/material-ui/api/tabs/#tabs-prop-TabIndicatorProps',
      control: false,
    },
    onFocusVisible: {
      description: 'https://mui.com/material-ui/api/tabs/#tabs-prop-onFocusVisible',
      control: false,
    },
    TouchRippleProps: {
      description: 'https://mui.com/material-ui/api/tabs/#tabs-prop-TouchRippleProps',
      control: false,
    },
    focusVisibleClassName: {
      control: false,
    },
    onChange: {
      description: 'https://mui.com/material-ui/api/tabs/#tabs-prop-onChange',
      control: false,
    },
    'aria-label': {
      control: 'false',
      description: 'The label for the Tabs as a string.',
    },
    'aria-labelledby': { table: { disable: true } },
    allowScrollButtonsMobile: { table: { disable: true } },
    indicatorColor: { table: { disable: true } },
    scrollButtons: { table: { disable: true } },
    textColor: { table: { disable: true } },
    visibleScrollbar: { table: { disable: true } },
    disabled: { table: { disable: true } },
    LinkComponent: { table: { disable: true } },
    TabScrollButtonProps: { table: { disable: true } },
    ScrollButtonComponent: { table: { disable: true } },
    centered: { table: { disable: true } },
    value: { table: { disable: true } },
    selectionFollowsFocus: { table: { disable: true } },

  },
} as Meta<typeof Tabs>;

const Template: StoryFn<typeof Tabs> = (args) => {
  const {
    showLabel, showIcon, ...otherArgs
  } = args;

  return (
    <Box
      sx={{
        flexGrow: 1, display: 'flex',
      }}
    >
      <Tabs
        {...otherArgs}
        orientation={args.orientation}
        aria-label="Vertical tabs example"
      >
        {tabIcons.map((tab, index) => {
          const key = index;
          return (
            <Tab
              key={`tab-${key}`}
              label={showLabel ? tab.label : undefined}
              icon={showIcon ? tab.iconObject : undefined}
              iconPosition={args.orientation === 'vertical' ? 'start' : args.iconposition}
            />
          );
        })}
      </Tabs>
    </Box>
  );
};

export const InteractiveExample = {
  render: Template,

  args: {
    orientation: 'vertical',
    iconposition: 'start',
    showIcon: true,
    showLabel: true,
    ...Tabs.defaultProps,
  },
};

const VisualTestTemplate: StoryFn<typeof Tabs> = (args) => {
  return (
    <>
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        Disabled tab
      </Typography>
      <Box
        sx={{
          flexGrow: 1, bgcolor: 'background.paper', display: 'flex',
        }}
      >
        <Tabs
          orientation={args.orientation}
          iconposition={args.iconposition}
          aria-label="Vertical tabs example"
        >
          <Tab
            label="Tab"
            icon={<IconPaintBrush />}
            iconPosition={args.iconposition}
          />
          <Tab
            label="Tab"
            icon={<IconPaintBrush />}
            iconPosition={args.iconposition}
          />
          <Tab
            label="Tab"
            disabled
            icon={<IconPaintBrush />}
            iconPosition={args.iconposition}
          />
        </Tabs>
      </Box>
      &nbsp;
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        Vertical tabs with icon only
      </Typography>
      <Box
        sx={{
          flexGrow: 1, bgcolor: 'background.paper', display: 'flex',
        }}
      >
        <Tabs
          orientation="vertical"
          aria-label="Vertical tabs example"
        >
          <Tab
            icon={<IconPaintBrush />}
          />
          <Tab
            icon={<IconPaintBrush />}
          />
        </Tabs>
      </Box>
    </>
  );
};

export const VisualTest = VisualTestTemplate.bind({});
VisualTest.parameters = {
  options: { showPanel: false },
};
VisualTest.args = {
  orientation: 'vertical',
  iconposition: 'start',
  ...Tabs.defaultProps,
};
