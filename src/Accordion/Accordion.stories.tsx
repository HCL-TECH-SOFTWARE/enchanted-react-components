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

import React, { useState } from 'react';
import { Box } from '@mui/material';
import { StoryFn, Meta } from '@storybook/react';
import ChevronDownIcon from '@hcl-software/enchanted-icons/dist/carbon/es/chevron--down';
import Accordion from './Accordion';
import AccordionSummary from './AccordionSummary';
import AccordionDetails from './AccordionDetails';
import Checkbox from '../Checkbox/Checkbox';
import Typography from '../Typography/Typography';
import PlaceholderArea from '../utils/PlaceholderArea';

export default {
  title: 'Navigation/Accordion',
  component: Accordion,
  argTypes: {
    variant: {
      description: 'The variant of the Accordion.',
      options: ['outlined', 'non-outlined'],
    },
    disabled: {
      description: 'If true, the accordion will be disabled',
      control: { type: 'boolean' },
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    showCheckBox: {
      description: 'If true, the accordion will show a checkbox',
      control: { type: 'boolean' },
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    hasnested: {
      description: 'If true, the accordion will have nested accordions',
      control: { type: 'boolean' },
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    hasDivider: {
      description: 'If true, the accordion will have a divider',
      control: { type: 'boolean' },
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    children: {
      description: 'The content of the accordion',
      control: false,
    },
    elevation: {
      control: false,
    },
    square: {
      control: false,
    },
    ref: {
      description: 'https://mui.com/material-ui/api/accordion/',
      control: false,
    },
    isfocused: {
      control: false,
    },
  },
} as Meta<typeof Accordion>;

const Template: StoryFn<typeof Accordion> = (args) => {
  const { showCheckBox, disabled } = args;
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedItems({ ...checkedItems, [event.target.id]: event.target.checked });
  };
  window.console.log(args.variant);
  return (
    <>
      <Accordion
        disabled={disabled}
        id="accordion1"
        {...args}
      >
        <AccordionSummary
          expandIcon={<ChevronDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          disabled={disabled}
        >
          <Box>
            {showCheckBox && <Checkbox id="1" checked={checkedItems['1'] || false} onChange={handleCheckboxChange} onClick={(event) => { return event.stopPropagation(); }} />}
          </Box>
          <Box>
            <Typography
              variant="body2"
            >
              Level 1
            </Typography>
            <Typography
              variant="caption"
            >
              Optional
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <PlaceholderArea height="112px" />
        </AccordionDetails>
      </Accordion>
      <Accordion
        disabled={disabled}
        {...args}
      >
        <AccordionSummary
          expandIcon={<ChevronDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          disabled={disabled}
        >
          <Box>
            {showCheckBox && <Checkbox id="2" checked={checkedItems['2'] || false} onChange={handleCheckboxChange} onClick={(event) => { return event.stopPropagation(); }} />}
          </Box>
          <Box>
            <Typography
              variant="body2"
            >
              Level 1
            </Typography>
            <Typography
              variant="caption"
            >
              Optional
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <PlaceholderArea height="112px" />
        </AccordionDetails>
      </Accordion>
      <Accordion
        disabled={disabled}
        {...args}
      >
        <AccordionSummary
          expandIcon={<ChevronDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          disabled={disabled}
        >
          <Box>
            {showCheckBox && <Checkbox id="3" checked={checkedItems['3'] || false} onChange={handleCheckboxChange} onClick={(event) => { return event.stopPropagation(); }} />}
          </Box>
          <Box>
            <Typography
              variant="body2"
            >
              Level 1
            </Typography>
            <Typography
              variant="caption"
            >
              Optional
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <PlaceholderArea height="112px" />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export const InteractiveExample = {
  render: Template,

  args: {
    showCheckBox: true,
    hasnested: false,
    disabled: false,
    hasDivider: false,
    ...Accordion.defaultProps,
  },
};
const VisualTestTemplate: StoryFn<typeof Accordion> = (args) => {
  const { showCheckBox, disabled } = args;
  return (
    <>
      <Accordion disabled={disabled} {...args}>
        <AccordionSummary
          expandIcon={<ChevronDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          disabled={disabled}
        >
          <Box>
            {showCheckBox && <Checkbox />}
          </Box>
          <Box>
            <Typography
              variant="body2"
            >
              Level 1
            </Typography>
            <Typography
              variant="caption"
            >
              Optional
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <PlaceholderArea height="112px" />
        </AccordionDetails>
      </Accordion>
      <Accordion disabled={disabled} {...args} hasnested>
        <AccordionSummary
          expandIcon={<ChevronDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          disabled={disabled}
        >
          <Box>
            {showCheckBox && <Checkbox />}
          </Box>
          <Box>
            <Typography
              variant="body2"
            >
              Level 1
            </Typography>
            <Typography
              variant="caption"
            >
              Optional
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Accordion variant="nopadding">
            <AccordionSummary
              expandIcon={<ChevronDownIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="body2">Level 2</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <PlaceholderArea height="112px" />
            </AccordionDetails>
          </Accordion>
          <Accordion {...args} variant="nopadding">
            <AccordionSummary
              expandIcon={<ChevronDownIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="body2">Level 2</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <PlaceholderArea height="112px" />
            </AccordionDetails>
          </Accordion>
          <Accordion {...args} variant="nopadding">
            <AccordionSummary
              expandIcon={<ChevronDownIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="body2">Level 2</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <PlaceholderArea height="112px" />
            </AccordionDetails>
          </Accordion>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled={disabled} {...args}>
        <AccordionSummary
          expandIcon={<ChevronDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          disabled={disabled}
        >
          <Box>
            {showCheckBox && <Checkbox />}
          </Box>
          <Box>
            <Typography
              variant="body2"
            >
              Level 1
            </Typography>
            <Typography
              variant="caption"
            >
              Optional
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <PlaceholderArea height="112px" />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export const VisualTest = VisualTestTemplate.bind({});
VisualTest.parameters = {
  options: { showPanel: false },
};
VisualTest.args = {
  ...Accordion.defaultProps,
  showCheckBox: false,
  disabled: false,
};
