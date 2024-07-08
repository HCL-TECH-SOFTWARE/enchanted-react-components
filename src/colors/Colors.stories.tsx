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

import Table from '../Table/Table';
import TableBody from '../Table/TableBody';
import TableCell from '../Table/TableCell';
import TableHead from '../Table/TableHead';
import TableRow from '../Table/TableRow';
import Avatar from '../Avatar';
import { TYPOGRAPHY } from '../theme';
import {
  Colors, black, blue, ColorNames, coolGrey, green, hclsoftwareblue, indigo, lime, neutralGrey, orange, pink, purple, red, teal, white, yellow,
} from '.';

export default {
  title: 'Theme/Colors',
  // component: Colors, // Colors is not a React component - facing some typing problems
} as Meta<typeof Colors>;

const Template: StoryFn<typeof Colors> = () => {
  return (
    <Table style={{ width: '100%' }}>
      <colgroup>
        <col style={{ width: '35%' }} />
        <col style={{ width: '1%' }} />
        <col style={{ width: '29%' }} />
        <col style={{ width: '1%' }} />
        <col style={{ width: '34%' }} />
      </colgroup>
      <TableHead
        sx={{
          ...TYPOGRAPHY.subtitle2,
        }}
      >
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell />
          <TableCell>Neutral</TableCell>
          <TableCell />
          <TableCell>Cool</TableCell>
        </TableRow>
      </TableHead>
      <TableBody
        sx={{
          ...TYPOGRAPHY.body2,
          '& .MuiTableCell-sizeMedium': {
            padding: '4px',
            height: '36px',
          },
        }}
      >
        <TableRow>
          <TableCell
            sx={{
              ...TYPOGRAPHY.body2bold,
            }}
          >
            grey
          </TableCell>
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.NEUTRALGREY100.substring(2)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.NEUTRALGREY100) }} /></TableCell>
          <TableCell>{neutralGrey.NG100!.substring(1)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.COOLGREY100) }} /></TableCell>
          <TableCell>{coolGrey.CG100!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.NEUTRALGREY150.substring(2)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.NEUTRALGREY150) }} /></TableCell>
          <TableCell>{neutralGrey.NG150!.substring(1)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.COOLGREY150) }} /></TableCell>
          <TableCell>{coolGrey.CG150!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.NEUTRALGREY200.substring(2)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.NEUTRALGREY200) }} /></TableCell>
          <TableCell>{neutralGrey.NG200!.substring(1)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.COOLGREY200) }} /></TableCell>
          <TableCell>{coolGrey.CG200!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.NEUTRALGREY300.substring(2)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.NEUTRALGREY300) }} /></TableCell>
          <TableCell>{neutralGrey.NG300!.substring(1)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.COOLGREY300) }} /></TableCell>
          <TableCell>{coolGrey.CG300!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.NEUTRALGREY400.substring(2)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.NEUTRALGREY400) }} /></TableCell>
          <TableCell>{neutralGrey.NG400!.substring(1)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.COOLGREY400) }} /></TableCell>
          <TableCell>{coolGrey.CG400!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.NEUTRALGREY500.substring(2)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.NEUTRALGREY500) }} /></TableCell>
          <TableCell>{neutralGrey.NG500!.substring(1)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.COOLGREY500) }} /></TableCell>
          <TableCell>{coolGrey.CG500!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.NEUTRALGREY600.substring(2)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.NEUTRALGREY600) }} /></TableCell>
          <TableCell>{neutralGrey.NG600!.substring(1)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.COOLGREY600) }} /></TableCell>
          <TableCell>{coolGrey.CG600!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.NEUTRALGREY700.substring(2)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.NEUTRALGREY700) }} /></TableCell>
          <TableCell>{neutralGrey.NG700!.substring(1)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.COOLGREY700) }} /></TableCell>
          <TableCell>{coolGrey.CG700!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.NEUTRALGREY800.substring(2)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.NEUTRALGREY800) }} /></TableCell>
          <TableCell>{neutralGrey.NG800!.substring(1)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.COOLGREY800) }} /></TableCell>
          <TableCell>{coolGrey.CG800!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.NEUTRALGREY900.substring(2)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.NEUTRALGREY900) }} /></TableCell>
          <TableCell>{neutralGrey.NG900!.substring(1)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.COOLGREY900) }} /></TableCell>
          <TableCell>{coolGrey.CG900!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.NEUTRALGREY1000.substring(2)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.NEUTRALGREY1000) }} /></TableCell>
          <TableCell>{neutralGrey.NG1000!.substring(1)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.COOLGREY1000) }} /></TableCell>
          <TableCell>{coolGrey.CG1000!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.NEUTRALGREY1000_80.substring(2)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.NEUTRALGREY1000_80) }} /></TableCell>
          <TableCell>
            {neutralGrey.NG1000!.substring(1)}
            {' 80%'}
          </TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.COOLGREY1000_80) }} /></TableCell>
          <TableCell>
            {coolGrey.CG1000!.substring(1)}
            {' 80%'}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.NEUTRALGREY1100.substring(2)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.NEUTRALGREY1100) }} /></TableCell>
          <TableCell>{neutralGrey.NG1100!.substring(1)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.COOLGREY1100) }} /></TableCell>
          <TableCell>{coolGrey.CG1100!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              ...TYPOGRAPHY.body2bold,
            }}
          >
            red
          </TableCell>
          <TableCell />
          <TableCell />
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.RED100.substring(3)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.RED100) }} /></TableCell>
          <TableCell>{red.RED100!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.RED200.substring(3)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.RED200) }} /></TableCell>
          <TableCell>{red.RED200!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.RED300.substring(3)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.RED300) }} /></TableCell>
          <TableCell>{red.RED300!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.RED400.substring(3)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.RED400) }} /></TableCell>
          <TableCell>{red.RED400!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.RED500.substring(3)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.RED500) }} /></TableCell>
          <TableCell>{red.RED500!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.RED600.substring(3)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.RED600) }} /></TableCell>
          <TableCell>{red.RED600!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.RED700.substring(3)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.RED700) }} /></TableCell>
          <TableCell>{red.RED700!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.RED800.substring(3)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.RED800) }} /></TableCell>
          <TableCell>{red.RED800!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.RED900.substring(3)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.RED900) }} /></TableCell>
          <TableCell>{red.RED900!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.RED1000.substring(3)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.RED1000) }} /></TableCell>
          <TableCell>{red.RED1000!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              ...TYPOGRAPHY.body2bold,
            }}
          >
            orange
          </TableCell>
          <TableCell />
          <TableCell />
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.ORANGE100.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.ORANGE100) }} /></TableCell>
          <TableCell>{orange.ORANGE100!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.ORANGE200.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.ORANGE200) }} /></TableCell>
          <TableCell>{orange.ORANGE200!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.ORANGE300.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.ORANGE300) }} /></TableCell>
          <TableCell>{orange.ORANGE300!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.ORANGE400.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.ORANGE400) }} /></TableCell>
          <TableCell>{orange.ORANGE400!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.ORANGE500.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.ORANGE500) }} /></TableCell>
          <TableCell>{orange.ORANGE500!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.ORANGE600.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.ORANGE600) }} /></TableCell>
          <TableCell>{orange.ORANGE600!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.ORANGE700.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.ORANGE700) }} /></TableCell>
          <TableCell>{orange.ORANGE700!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.ORANGE800.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.ORANGE800) }} /></TableCell>
          <TableCell>{orange.ORANGE800!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.ORANGE900.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.ORANGE900) }} /></TableCell>
          <TableCell>{orange.ORANGE900!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.ORANGE1000.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.ORANGE1000) }} /></TableCell>
          <TableCell>{orange.ORANGE1000!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              ...TYPOGRAPHY.body2bold,
            }}
          >
            yellow
          </TableCell>
          <TableCell />
          <TableCell />
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.YELLOW100.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.YELLOW100) }} /></TableCell>
          <TableCell>{yellow.YELLOW100!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.YELLOW200.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.YELLOW200) }} /></TableCell>
          <TableCell>{yellow.YELLOW200!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.YELLOW300.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.YELLOW300) }} /></TableCell>
          <TableCell>{yellow.YELLOW300!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.YELLOW400.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.YELLOW400) }} /></TableCell>
          <TableCell>{yellow.YELLOW400!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.YELLOW500.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.YELLOW500) }} /></TableCell>
          <TableCell>{yellow.YELLOW500!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.YELLOW600.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.YELLOW600) }} /></TableCell>
          <TableCell>{yellow.YELLOW600!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.YELLOW700.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.YELLOW700) }} /></TableCell>
          <TableCell>{yellow.YELLOW700!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.YELLOW800.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.YELLOW800) }} /></TableCell>
          <TableCell>{yellow.YELLOW800!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.YELLOW900.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.YELLOW900) }} /></TableCell>
          <TableCell>{yellow.YELLOW900!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.YELLOW1000.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.YELLOW1000) }} /></TableCell>
          <TableCell>{yellow.YELLOW1000!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              ...TYPOGRAPHY.body2bold,
            }}
          >
            lime
          </TableCell>
          <TableCell />
          <TableCell />
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.LIME100.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.LIME100) }} /></TableCell>
          <TableCell>{lime.LIME100!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.LIME200.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.LIME200) }} /></TableCell>
          <TableCell>{lime.LIME200!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.LIME300.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.LIME300) }} /></TableCell>
          <TableCell>{lime.LIME300!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.LIME400.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.LIME400) }} /></TableCell>
          <TableCell>{lime.LIME400!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.LIME500.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.LIME500) }} /></TableCell>
          <TableCell>{lime.LIME500!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.LIME600.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.LIME600) }} /></TableCell>
          <TableCell>{lime.LIME600!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.LIME700.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.LIME700) }} /></TableCell>
          <TableCell>{lime.LIME700!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.LIME800.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.LIME800) }} /></TableCell>
          <TableCell>{lime.LIME800!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.LIME900.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.LIME900) }} /></TableCell>
          <TableCell>{lime.LIME900!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.LIME1000.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.LIME1000) }} /></TableCell>
          <TableCell>{lime.LIME1000!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              ...TYPOGRAPHY.body2bold,
            }}
          >
            green
          </TableCell>
          <TableCell />
          <TableCell />
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.GREEN100.substring(5)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.GREEN100) }} /></TableCell>
          <TableCell>{green.GREEN100!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.GREEN200.substring(5)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.GREEN200) }} /></TableCell>
          <TableCell>{green.GREEN200!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.GREEN300.substring(5)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.GREEN300) }} /></TableCell>
          <TableCell>{green.GREEN300!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.GREEN400.substring(5)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.GREEN400) }} /></TableCell>
          <TableCell>{green.GREEN400!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.GREEN500.substring(5)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.GREEN500) }} /></TableCell>
          <TableCell>{green.GREEN500!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.GREEN600.substring(5)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.GREEN600) }} /></TableCell>
          <TableCell>{green.GREEN600!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.GREEN700.substring(5)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.GREEN700) }} /></TableCell>
          <TableCell>{green.GREEN700!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.GREEN800.substring(5)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.GREEN800) }} /></TableCell>
          <TableCell>{green.GREEN800!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.GREEN900.substring(5)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.GREEN900) }} /></TableCell>
          <TableCell>{green.GREEN900!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.GREEN1000.substring(5)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.GREEN1000) }} /></TableCell>
          <TableCell>{green.GREEN1000!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              ...TYPOGRAPHY.body2bold,
            }}
          >
            teal
          </TableCell>
          <TableCell />
          <TableCell />
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.TEAL100.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.TEAL100) }} /></TableCell>
          <TableCell>{teal.TEAL100!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.TEAL200.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.TEAL200) }} /></TableCell>
          <TableCell>{teal.TEAL200!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.TEAL300.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.TEAL300) }} /></TableCell>
          <TableCell>{teal.TEAL300!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.TEAL400.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.TEAL400) }} /></TableCell>
          <TableCell>{teal.TEAL400!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.TEAL500.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.TEAL500) }} /></TableCell>
          <TableCell>{teal.TEAL500!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.TEAL600.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.TEAL600) }} /></TableCell>
          <TableCell>{teal.TEAL600!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.TEAL700.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.TEAL700) }} /></TableCell>
          <TableCell>{teal.TEAL700!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.TEAL800.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.TEAL800) }} /></TableCell>
          <TableCell>{teal.TEAL800!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.TEAL900.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.TEAL900) }} /></TableCell>
          <TableCell>{teal.TEAL900!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.TEAL1000.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.TEAL1000) }} /></TableCell>
          <TableCell>{teal.TEAL1000!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              ...TYPOGRAPHY.body2bold,
            }}
          >
            blue
          </TableCell>
          <TableCell />
          <TableCell />
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.BLUE100.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.BLUE100) }} /></TableCell>
          <TableCell>{blue.BLUE100!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.BLUE200.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.BLUE200) }} /></TableCell>
          <TableCell>{blue.BLUE200!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.BLUE300.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.BLUE300) }} /></TableCell>
          <TableCell>{blue.BLUE300!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.BLUE400.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.BLUE400) }} /></TableCell>
          <TableCell>{blue.BLUE400!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.BLUE500.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.BLUE500) }} /></TableCell>
          <TableCell>{blue.BLUE500!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.BLUE600.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.BLUE600) }} /></TableCell>
          <TableCell>{blue.BLUE600!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.BLUE700.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.BLUE700) }} /></TableCell>
          <TableCell>{blue.BLUE700!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.BLUE800.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.BLUE800) }} /></TableCell>
          <TableCell>{blue.BLUE800!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.BLUE900.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.BLUE900) }} /></TableCell>
          <TableCell>{blue.BLUE900!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.BLUE1000.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.BLUE1000) }} /></TableCell>
          <TableCell>{blue.BLUE1000!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              ...TYPOGRAPHY.body2bold,
            }}
          >
            indigo
          </TableCell>
          <TableCell />
          <TableCell />
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.INDIGO100.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.INDIGO100) }} /></TableCell>
          <TableCell>{indigo.INDIGO100!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.INDIGO200.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.INDIGO200) }} /></TableCell>
          <TableCell>{indigo.INDIGO200!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.INDIGO300.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.INDIGO300) }} /></TableCell>
          <TableCell>{indigo.INDIGO300!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.INDIGO400.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.INDIGO400) }} /></TableCell>
          <TableCell>{indigo.INDIGO400!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.INDIGO500.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.INDIGO500) }} /></TableCell>
          <TableCell>{indigo.INDIGO500!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.INDIGO600.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.INDIGO600) }} /></TableCell>
          <TableCell>{indigo.INDIGO600!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.INDIGO700.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.INDIGO700) }} /></TableCell>
          <TableCell>{indigo.INDIGO700!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.INDIGO800.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.INDIGO800) }} /></TableCell>
          <TableCell>{indigo.INDIGO800!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.INDIGO900.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.INDIGO900) }} /></TableCell>
          <TableCell>{indigo.INDIGO900!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.INDIGO1000.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.INDIGO1000) }} /></TableCell>
          <TableCell>{indigo.INDIGO1000!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              ...TYPOGRAPHY.body2bold,
            }}
          >
            purple
          </TableCell>
          <TableCell />
          <TableCell />
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.PURPLE100.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.PURPLE100) }} /></TableCell>
          <TableCell>{purple.PURPLE100!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.PURPLE200.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.PURPLE200) }} /></TableCell>
          <TableCell>{purple.PURPLE200!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.PURPLE300.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.PURPLE300) }} /></TableCell>
          <TableCell>{purple.PURPLE300!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.PURPLE400.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.PURPLE400) }} /></TableCell>
          <TableCell>{purple.PURPLE400!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.PURPLE500.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.PURPLE500) }} /></TableCell>
          <TableCell>{purple.PURPLE500!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.PURPLE600.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.PURPLE600) }} /></TableCell>
          <TableCell>{purple.PURPLE600!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.PURPLE700.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.PURPLE700) }} /></TableCell>
          <TableCell>{purple.PURPLE700!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.PURPLE800.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.PURPLE800) }} /></TableCell>
          <TableCell>{purple.PURPLE800!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.PURPLE900.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.PURPLE900) }} /></TableCell>
          <TableCell>{purple.PURPLE900!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.PURPLE1000.substring(6)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.PURPLE1000) }} /></TableCell>
          <TableCell>{purple.PURPLE1000!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              ...TYPOGRAPHY.body2bold,
            }}
          >
            pink
          </TableCell>
          <TableCell />
          <TableCell />
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.PINK100.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.PINK100) }} /></TableCell>
          <TableCell>{pink.PINK100!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.PINK200.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.PINK200) }} /></TableCell>
          <TableCell>{pink.PINK200!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.PINK300.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.PINK300) }} /></TableCell>
          <TableCell>{pink.PINK300!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.PINK400.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.PINK400) }} /></TableCell>
          <TableCell>{pink.PINK400!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.PINK500.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.PINK500) }} /></TableCell>
          <TableCell>{pink.PINK500!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.PINK600.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.PINK600) }} /></TableCell>
          <TableCell>{pink.PINK600!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.PINK700.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.PINK700) }} /></TableCell>
          <TableCell>{pink.PINK700!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.PINK800.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.PINK800) }} /></TableCell>
          <TableCell>{pink.PINK800!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.PINK900.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.PINK900) }} /></TableCell>
          <TableCell>{pink.PINK900!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.PINK1000.substring(4)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.PINK1000) }} /></TableCell>
          <TableCell>{pink.PINK1000!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              ...TYPOGRAPHY.body2bold,
            }}
          >
            black
          </TableCell>
          <TableCell />
          <TableCell />
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.BLACK100P.substring(5)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.BLACK100P) }} /></TableCell>
          <TableCell>{black.BLACK100P!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.BLACK87P.substring(5)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.BLACK87P) }} /></TableCell>
          <TableCell>
            {black.BLACK100P!.substring(1)}
            {' 87%'}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.BLACK60P.substring(5)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.BLACK60P) }} /></TableCell>
          <TableCell>
            {black.BLACK100P!.substring(1)}
            {' 60%'}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.BLACK55P.substring(5)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.BLACK55P) }} /></TableCell>
          <TableCell>
            {black.BLACK100P!.substring(1)}
            {' 55%'}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.BLACK38P.substring(5)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.BLACK38P) }} /></TableCell>
          <TableCell>
            {black.BLACK100P!.substring(1)}
            {' 38%'}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.BLACK32P.substring(5)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.BLACK32P) }} /></TableCell>
          <TableCell>
            {black.BLACK100P!.substring(1)}
            {' 32'}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.BLACK20P.substring(5)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.BLACK20P) }} /></TableCell>
          <TableCell>
            {black.BLACK100P!.substring(1)}
            {' 20%'}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.BLACK15P.substring(5)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.BLACK15P) }} /></TableCell>
          <TableCell>
            {black.BLACK100P!.substring(1)}
            {' 15%'}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.BLACK12P.substring(5)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.BLACK12P) }} /></TableCell>
          <TableCell>
            {black.BLACK100P!.substring(1)}
            {' 12%'}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.BLACK8P.substring(5)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.BLACK8P) }} /></TableCell>
          <TableCell>
            {black.BLACK100P!.substring(1)}
            {' 8%'}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.BLACK7P.substring(5)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.BLACK7P) }} /></TableCell>
          <TableCell>
            {black.BLACK100P!.substring(1)}
            {' 7%'}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              ...TYPOGRAPHY.body2bold,
            }}
          >
            white
          </TableCell>
          <TableCell />
          <TableCell />
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.WHITE100P.substring(5)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.WHITE100P) }} /></TableCell>
          <TableCell>{white.WHITE100P!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.WHITE93P.substring(5)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.WHITE93P) }} /></TableCell>
          <TableCell>
            {white.WHITE100P!.substring(1)}
            {' 93%'}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.WHITE80P.substring(5)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.WHITE80P) }} /></TableCell>
          <TableCell>
            {white.WHITE100P!.substring(1)}
            {' 80%'}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.WHITE70P.substring(5)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.WHITE70P) }} /></TableCell>
          <TableCell>
            {white.WHITE100P!.substring(1)}
            {' 70%'}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.WHITE55P.substring(5)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.WHITE55P) }} /></TableCell>
          <TableCell>
            {white.WHITE100P!.substring(1)}
            {' 55%'}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.WHITE40P.substring(5)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.WHITE40P) }} /></TableCell>
          <TableCell>
            {white.WHITE100P!.substring(1)}
            {' 40%'}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.WHITE38P.substring(5)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.WHITE38P) }} /></TableCell>
          <TableCell>
            {white.WHITE100P!.substring(1)}
            {' 38%'}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.WHITE24P.substring(5)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.WHITE24P) }} /></TableCell>
          <TableCell>
            {white.WHITE100P!.substring(1)}
            {' 24%'}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.WHITE15P.substring(5)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.WHITE15P) }} /></TableCell>
          <TableCell>
            {white.WHITE100P!.substring(1)}
            {' 15%'}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.WHITE12P.substring(5)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.WHITE12P) }} /></TableCell>
          <TableCell>
            {white.WHITE100P!.substring(1)}
            {' 12%'}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.WHITE8P.substring(5)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.WHITE8P) }} /></TableCell>
          <TableCell>
            {white.WHITE100P!.substring(1)}
            {' 8%'}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              ...TYPOGRAPHY.body2bold,
            }}
          >
            HCLSoftwareBlue
          </TableCell>
          <TableCell />
          <TableCell />
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.HCLSOFTWAREBLUE01.substring(15)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.HCLSOFTWAREBLUE01) }} /></TableCell>
          <TableCell>{hclsoftwareblue.HCLSOFTWAREBLUE01!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.HCLSOFTWAREBLUE02.substring(15)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.HCLSOFTWAREBLUE02) }} /></TableCell>
          <TableCell>{hclsoftwareblue.HCLSOFTWAREBLUE02!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.HCLSOFTWAREBLUE03.substring(15)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.HCLSOFTWAREBLUE03) }} /></TableCell>
          <TableCell>{hclsoftwareblue.HCLSOFTWAREBLUE03!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.HCLSOFTWAREBLUE04.substring(15)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.HCLSOFTWAREBLUE04) }} /></TableCell>
          <TableCell>{hclsoftwareblue.HCLSOFTWAREBLUE04!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.HCLSOFTWAREBLUE05.substring(15)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.HCLSOFTWAREBLUE05) }} /></TableCell>
          <TableCell>{hclsoftwareblue.HCLSOFTWAREBLUE05!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.HCLSOFTWAREBLUE06.substring(15)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.HCLSOFTWAREBLUE06) }} /></TableCell>
          <TableCell>{hclsoftwareblue.HCLSOFTWAREBLUE06!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.HCLSOFTWAREBLUE07.substring(15)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.HCLSOFTWAREBLUE07) }} /></TableCell>
          <TableCell>{hclsoftwareblue.HCLSOFTWAREBLUE07!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.HCLSOFTWAREBLUE07_12P.substring(15)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.HCLSOFTWAREBLUE07_12P) }} /></TableCell>
          <TableCell>
            {hclsoftwareblue.HCLSOFTWAREBLUE07!.substring(1)}
            {' 12%'}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.HCLSOFTWAREBLUE07_8P.substring(15)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.HCLSOFTWAREBLUE07_8P) }} /></TableCell>
          <TableCell>
            {hclsoftwareblue.HCLSOFTWAREBLUE07!.substring(1)}
            {' 8%'}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.HCLSOFTWAREBLUE08.substring(15)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.HCLSOFTWAREBLUE08) }} /></TableCell>
          <TableCell>{hclsoftwareblue.HCLSOFTWAREBLUE08!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.HCLSOFTWAREBLUE09.substring(15)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.HCLSOFTWAREBLUE09) }} /></TableCell>
          <TableCell>{hclsoftwareblue.HCLSOFTWAREBLUE09!.substring(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.HCLSOFTWAREBLUE09_12P.substring(15)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.HCLSOFTWAREBLUE09_12P) }} /></TableCell>
          <TableCell>
            {hclsoftwareblue.HCLSOFTWAREBLUE09!.substring(1)}
            {' 12%'}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{ColorNames.HCLSOFTWAREBLUE09_8P.substring(15)}</TableCell>
          <TableCell><Avatar variant="rounded" sx={{ background: Colors.get(ColorNames.HCLSOFTWAREBLUE09_8P) }} /></TableCell>
          <TableCell>
            {hclsoftwareblue.HCLSOFTWAREBLUE09!.substring(1)}
            {' 8%'}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export const ExampleColors = Template.bind({});

ExampleColors.args = {
};
