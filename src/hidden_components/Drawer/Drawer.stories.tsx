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
  StoryFn,
  Meta,
} from '@storybook/react';
import Box from '@mui/material/Box';

import InboxIcon from '@hcl-software/enchanted-icons/dist/carbon/es/license';
import EmailIcon from '@hcl-software/enchanted-icons/dist/carbon/es/email';

import Drawer from './Drawer';
import List from '../List';
import ListItem from '../List/ListItem';
import ListItemButton from '../List/ListItemButton';
import ListItemIcon from '../List/ListItemIcon';
import ListItemText from '../List/ListItemText';
import Divider from '../../Divider';
import Button from '../../Button';

export default {
  title: 'Navigation/Drawer',
  component: Drawer,
} as Meta<typeof Drawer>;

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const Template: StoryFn<typeof Drawer> = (args) => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => {
    return (event: React.KeyboardEvent | React.MouseEvent) => {
      if (event.type === 'keydown'
        && ((event as React.KeyboardEvent).key === 'Tab'
        || (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };
  };

  const list = (anchor: Anchor) => {
    return (
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => {
            return (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <EmailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => {
            return (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <EmailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    );
  };

  return (
    <>
      {(['left', 'right', 'top', 'bottom'] as const).map((anchor) => {
        return (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        );
      })}
    </>
  );
};

export const ExampleDrawer = Template.bind({});

ExampleDrawer.args = {
  ...Drawer.defaultProps,
};
