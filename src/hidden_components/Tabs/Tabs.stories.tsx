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
import Box from '@mui/material/Box';

import Tabs from './Tabs';
import Tab from './Tab';
import Typography from '../../Typography';

export default {
  title: 'Navigation/Tabs',
  component: Tabs,
} as Meta<typeof Tabs>;

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Template: StoryFn<typeof Tabs> = (args) => {
  const [value, setValue] = React.useState<number>(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs {...args} value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <div
        role="tabpanel"
        hidden={value !== 0}
        id="simple-tabpanel-0"
        aria-labelledby="simple-tab-0"
      >
        <Box sx={{ p: 3 }}>
          <Typography>Item One</Typography>
        </Box>
      </div>
      <div
        role="tabpanel"
        hidden={value !== 1}
        id="simple-tabpanel-1"
        aria-labelledby="simple-tab-1"
      >
        <Box sx={{ p: 3 }}>
          <Typography>Item Two</Typography>
        </Box>
      </div>
      <div
        role="tabpanel"
        hidden={value !== 2}
        id="simple-tabpanel-2"
        aria-labelledby="simple-tab-2"
      >
        <Box sx={{ p: 3 }}>
          <Typography>Item Three</Typography>
        </Box>
      </div>
    </Box>
  );
};

export const ExampleTabs = {
  render: Template,

  args: {
    ...Tabs.defaultProps,
  },
};
