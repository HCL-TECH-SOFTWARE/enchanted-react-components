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

import {
  Button, Badge, Divider, ListItemIcon, ListItemText, MenuItem, Tooltip,
} from '@mui/material';
import IconCheckmark from '@hcl-software/enchanted-icons/dist/carbon/es/checkmark';

import IconCaretDown from '@hcl-software/enchanted-icons/dist/carbon/es/caret--down';
import IconFilter from '@hcl-software/enchanted-icons/dist/carbon/es/filter';
import SortAscendingAlt from '@hcl-software/enchanted-icons/dist/apps/es/Sort-ascending--alt';
import IconButton from '../IconButton';
import Breadcrumbs from './Breadcrumbs';
import Link from '../Link';
import Typography from '../Typography';
import { ButtonVariants } from '../Button';
import Menu from '../Menu';

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
      <Typography color="text.primary" variant="body2" component="span">Elements</Typography>
    </Breadcrumbs>
  );
};

export const ExampleBreadcrumbs = {
  render: Template,

  args: {
    ...Breadcrumbs.defaultProps,
  },
};

const VisualTestTemplate: StoryFn<typeof Breadcrumbs> = (args) => {
  const [badgeVisible, setBadgeVisible] = React.useState(false);
  return (
    <>
      <Breadcrumbs {...args}>
        <Link href="/">Search</Link>
        <Link href="/material-ui/getting-started/installation/">
          <IconInformation />
        </Link>
        <Link href="/material-ui/getting-started/installation/">
          <IconInformation sx={{ mr: '4px' }} />
          Content
        </Link>
        <Typography color="text.primary" variant="body2" component="span">Elements</Typography>
      </Breadcrumbs>
      &nbsp;

      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '12px',
      }}
      >
        <Breadcrumbs {...args}>
          <Link href="/">Search</Link>
          <Link href="/material-ui/getting-started/installation/">
            <IconInformation />
          </Link>
          <Link href="/material-ui/getting-started/installation/">
            <IconInformation sx={{ mr: '4px' }} />
            Content
          </Link>
          <Typography color="text.primary" variant="body2" component="span">Elements</Typography>
        </Breadcrumbs>
        <div>

          <div
            className="sortButtonContainer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexShrink: 0,
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
            >
              <Typography variant="body2">
                Sorted by:
              </Typography>
              <Button
                id="sortButton"
                variant={ButtonVariants.TEXT}
                endIcon={<IconCaretDown />}
                sx={{ maxHeight: '28px' }}
              >
                Name
              </Button>
              <Divider orientation="vertical" color="blue" flexItem />
              <Tooltip title="Sorted By: Z-A" placement="bottom" arrow>
                <Button
                  variant={ButtonVariants.TEXT}
                  data-testid="testSortOrderIcon"
                  sx={{ padding: '0px 6px 0px 6px', minWidth: '0px', maxHeight: '28px' }}
                >
                  <SortAscendingAlt fontSize="small" />
                </Button>
              </Tooltip>
              <Menu
                data-testid="testSortDropDownItems"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                PaperProps={{
                  sx: {
                    padding: '0px',
                  },
                }}
                open={false}
                size=""
              >
                <MenuItem
                  data-testid="testSortDate"
                  selected
                >
                  <ListItemIcon><IconCheckmark fontSize="small" sx={{ visibility: 'hidden' }} /></ListItemIcon>
                  <ListItemText primary="Date" />
                </MenuItem>
              </Menu>
              <div
                className="filterButtonWrapper"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Tooltip title="Filter Assets">
                  <span data-testid="testFilterButtonContainer">
                    <Badge
                      color="primary"
                      variant="dot"
                      invisible={!badgeVisible}
                      overlap="circular"
                      data-testid="testFilterBadge"
                      sx={{
                        '& .MuiBadge-dot': { top: '5%', right: '5%' },
                      }}
                    >
                      <IconButton
                        value="filter"
                        sx={{ height: '26px', width: '26px' }}
                        disabled={false}
                        data-testid="testFilterButton"
                        onClick={() => { return setBadgeVisible((prev) => { return !prev; }); }}
                      >
                        <IconFilter />
                      </IconButton>
                    </Badge>
                  </span>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const VisualTest = VisualTestTemplate.bind({});
VisualTest.parameters = {
  options: { showPanel: false },
};
VisualTest.args = {
};
