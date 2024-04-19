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
import { linkTo } from '@storybook/addon-links';

import Table from './Table';
import Typography from '../Typography';
import Link from '../Link';

export default {
  title: 'Data display/Table',
  component: Table,
} as Meta<typeof Table>;

const Template: StoryFn<typeof Table> = (args) => {
  return (
    <Typography>
      Please use
      {' '}
      <Link
        sx={{ cursor: 'pointer' }}
        onClick={linkTo('Data display/DataGrid', 'interactive-example')}
      >
        Data Grid
      </Link>
    </Typography>
  );
};

export const ExampleTable = Template.bind({});

ExampleTable.args = {
};
