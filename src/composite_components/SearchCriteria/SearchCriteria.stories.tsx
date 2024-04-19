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
import Grid from '@mui/material/Grid';

import Paper from '../../Paper/Paper';
import Table from '../../Table/Table';
import TableBody from '../../Table/TableBody';
import TableCell from '../../Table/TableCell';
import TableContainer from '../../Table/TableContainer';
import TableHead from '../../Table/TableHead';
import TableRow from '../../Table/TableRow';

import SearchCriteria, { SearchCriteriaProps } from './SearchCriteria';
import PlaceholderArea from '../../utils/PlaceholderArea';
import Typography from '../../Typography';

// Sample Table for search result
const DenseTable = () => {
  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
  ) {
    return {
      name, calories, fat, carbs, protein,
    };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Cupcake1', 305, 3.7, 67, 4.3),
    createData('Gingerbread1', 356, 16.0, 49, 3.9),
    createData('Ice cream sandwich1', 237, 9.0, 37, 4.3),
    createData('Eclair1', 262, 16.0, 24, 6.0),
  ];
  return (
    <TableContainer
      sx={{ borderRadius: '0' }}
      // @ts-ignore for test only
      component={Paper}
    >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            return (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default {
  title: 'Surfaces/SearchCriteria',
  component: SearchCriteria,
  argTypes: {
    label: {
      if: { arg: 'interactive' },
      description: 'Label for the Search Criteria header.',
    },
    labelProps: {
      if: { arg: 'interactive' },
      description: 'Props for label in Search Criteria header.',
    },
    helperIconTooltip: {
      if: { arg: 'interactive' },
      description: 'Help text for Search Criteria.',
    },
    footerButtonProps: {
      if: { arg: 'interactive' },
      description: 'List of button props to render in the footer.',
    },
    showBody: {
      if: { arg: 'interactive' },
      description: 'Hide the table, and this is for testing only and not an actual property of Search Criteria.',
      control: 'boolean',
      table: {
        defaultValue: { summary: true },
      },
    },
    secondaryText: {
      if: { arg: 'interactive' },
      description: 'Secondary text for the Search Criteria summary.',
    },
    secondaryTextProps: {
      if: { arg: 'interactive' },
      description: 'Props for Secondary text the Search Criteria summary.',
    },
    expandButtonLabel: {
      if: { arg: 'interactive' },
      description: 'Label for the expand button in Search Criteria summary.',
    },
    expandButtonProps: {
      if: { arg: 'interactive' },
      description: 'Props for the expand button in Search Criteria summary.',
    },
    collapseButtonLabel: {
      if: { arg: 'interactive' },
      description: 'Label for the collapse button in Search Criteria summary.',
    },
    collapseButtonProps: {
      if: { arg: 'interactive' },
      description: 'Props for the collapse button in Search Criteria summary.',
    },
    handleExpand: {
      if: { arg: 'interactive' },
      description: 'Call this function when we expand Search Criteria.',
    },
    handleCollapse: {
      if: { arg: 'interactive' },
      description: 'Call this function when we collapse Search Criteria.',
    },
    open: {
      if: { arg: 'interactive' },
      description: 'Call this function when we open Search Criteria.',
    },
  },
} as Meta<typeof SearchCriteria>;

const VisualTestTemplate: StoryFn<typeof SearchCriteria> = (args) => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(false);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const visualTestProps: SearchCriteriaProps = {
    children: undefined,
    label: 'Label',
    helperIconTooltip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
    footerButtonProps: [{
      label: 'Button',
      variant: 'outlined',
      key: '1',
    }, {
      label: 'Button',
      variant: 'contained',
      key: '2',
    }],
    secondaryText: 'Secondary Text',
    expandButtonLabel: 'Button',
    collapseButtonLabel: 'Cancel',
    open,
    handleExpand: handleDrawerOpen,
    handleCollapse: handleDrawerClose,
  };

  return (
    <>
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        Search Criteria No Body
      </Typography>
      <Box position="relative">
        <SearchCriteria {...visualTestProps}>
          <PlaceholderArea sx={{ height: '10px' }} />
        </SearchCriteria>
        {/* @ts-ignore for test only and not property of Search Criteria */}
        <Grid height="10vh">{false && <DenseTable />}</Grid>
      </Box>
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        Search Criteria Show Body
      </Typography>
      <Box position="relative">
        <SearchCriteria {...visualTestProps}>
          <PlaceholderArea sx={{ height: '120px' }} />
        </SearchCriteria>
        {/* @ts-ignore for test only and not property of Search Criteria */}
        <Grid height="100vh">{true && <DenseTable />}</Grid>
      </Box>
    </>
  );
};

const InteractiveExampleTemplate: StoryFn<typeof SearchCriteria > = (args) => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box position="relative">
      <SearchCriteria {...args} open={open} handleExpand={handleDrawerOpen} handleCollapse={handleDrawerClose}>
        <PlaceholderArea sx={{ height: '120px' }} />
      </SearchCriteria>
      {/* @ts-ignore for test only and not property of Search Criteria */}
      <Grid height="100vh">{args.showBody && <DenseTable />}</Grid>
    </Box>
  );
};

export const InteractiveExample = InteractiveExampleTemplate.bind({});
InteractiveExample.parameters = {
  options: { showPanel: true },
};
InteractiveExample.args = {
  // @ts-ignore - this attribute is need to disable all controls in the InteractiveExample, but this attribute is not part of the SearchCriteriaProps
  interactive: true,
  label: 'Label',
  helperIconTooltip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
  footerButtonProps: [{
    label: 'Button',
    variant: 'outlined',
    key: '1',
  }, {
    label: 'Button',
    variant: 'contained',
    key: '2',
  }],
  showBody: true,
  secondaryText: 'Secondary Text',
  expandButtonLabel: 'View Button',
  collapseButtonLabel: 'Cancel',
};

export const VisualTest = VisualTestTemplate.bind({});
VisualTest.parameters = {
  options: { showPanel: false },
};
VisualTest.args = {
};
