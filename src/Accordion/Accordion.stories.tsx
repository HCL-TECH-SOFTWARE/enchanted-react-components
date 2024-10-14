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
import RocketIcon from '@hcl-software/enchanted-icons/dist/carbon/es/rocket';
import Accordion, { AccordionTypes, AccordionProps } from './Accordion';
import AccordionSummary from './AccordionSummary';
import AccordionDetails from './AccordionDetails';
import Checkbox from '../Checkbox/Checkbox';
import Typography from '../Typography/Typography';
import PlaceholderArea from '../utils/PlaceholderArea';
import IconButton, { IconButtonVariants } from '../IconButton/IconButton';

export default {
  title: 'Navigation/Accordion',
  component: Accordion,
  argTypes: {
    type: {
      if: { arg: 'interactive' },
      description: 'The type of accordion to use',
      options: [AccordionTypes.OUTLINED, AccordionTypes.NO_OUTLINE],
      control: { type: 'radio' },
    },
    disabled: {
      if: { arg: 'interactive' },
      description: 'If true, the accordion will be disabled',
      control: { type: 'boolean' },
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    showCheckBox: {
      if: { arg: 'interactive' },
      description: 'If true, the accordion will show a checkbox, only for Storybook use',
      control: { type: 'boolean' },
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    hasNested: {
      description: 'should make it true if the accordion have nested accordions',
      control: false,
    },
    hasDivider: {
      if: { arg: 'interactive' },
      description: 'If true, the accordion will have a divider',
      control: { type: 'boolean' },
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    showSecondaryText: {
      if: { arg: 'interactive' },
      control: {
        type: 'boolean',
      },
      description: 'Show a secondary text, only for Storybook use',
    },
    showHoverActions: {
      if: { arg: 'interactive' },
      control: {
        type: 'boolean',
      },
      description: 'Show a hover action button, only for Storybook use',
    },
    variant: { table: { disable: true } },
    children: { table: { disable: true } },
    elevation: { table: { disable: true } },
    square: { table: { disable: true } },
    ref: { table: { disable: true } },
    isfocused: { table: { disable: true } },
  },
} as Meta<typeof Accordion>;

interface ExtendedAccordionProps extends AccordionProps {
  showCheckBox: boolean,
  showSecondaryText: boolean,
  showHoverActions: boolean,
}

const Template: StoryFn<ExtendedAccordionProps> = (args) => {
  const {
    showCheckBox, disabled, showSecondaryText, showHoverActions,
  } = args;
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedItems({ ...checkedItems, [event.target.id]: event.target.checked });
  };
  const hoveractions = (
    <>
      <IconButton
        size="small"
        variant={IconButtonVariants.WITHOUT_PADDING}
        onBlur={() => { return null; }}
        onClick={() => { return null; }}
        id="1"
        showendicon={0}
      >
        <RocketIcon />
      </IconButton>
      <IconButton
        size="small"
        variant={IconButtonVariants.WITHOUT_PADDING}
        onBlur={() => { return null; }}
        onClick={() => { return null; }}
        id="2"
        showendicon={0}
      >
        <RocketIcon />
      </IconButton>
    </>
  );
  return (
    <>
      <Accordion
        disabled={disabled}
        id="accordion1"
        {...args}
      >
        <AccordionSummary
          expandIcon={(<IconButton variant={IconButtonVariants.WITHOUT_PADDING} showendicon={0}><ChevronDownIcon /></IconButton>)}
          aria-controls="panel1-content"
          id="panel1-header"
          disabled={disabled}
          hoveractions={showHoverActions ? hoveractions : undefined}
        >
          <Box>
            {showCheckBox && <Checkbox id="1" checked={checkedItems['1'] || false} onChange={handleCheckboxChange} onClick={(event) => { return event.stopPropagation(); }} />}
            <Box>
              <Typography
                variant="body2"
              >
                Level 1
              </Typography>
              {showSecondaryText && (
              <Typography
                variant="caption"
              >
                Optional
              </Typography>
              )}
            </Box>
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
          expandIcon={<IconButton showendicon={0}><ChevronDownIcon /></IconButton>}
          aria-controls="panel1-content"
          id="panel1-header"
          disabled={disabled}
          hoveractions={showHoverActions ? hoveractions : undefined}
        >
          <Box>
            {showCheckBox && <Checkbox id="2" checked={checkedItems['2'] || false} onChange={handleCheckboxChange} onClick={(event) => { return event.stopPropagation(); }} />}
            <Box>
              <Typography
                variant="body2"
              >
                Level 1
              </Typography>
              {showSecondaryText && (
              <Typography
                variant="caption"
              >
                Optional
              </Typography>
              )}
            </Box>
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
          expandIcon={<IconButton showendicon={0}><ChevronDownIcon /></IconButton>}
          aria-controls="panel1-content"
          id="panel1-header"
          disabled={disabled}
          hoveractions={showHoverActions ? hoveractions : undefined}
        >
          <Box>
            {showCheckBox && <Checkbox id="3" checked={checkedItems['3'] || false} onChange={handleCheckboxChange} onClick={(event) => { return event.stopPropagation(); }} />}
            <Box>
              <Typography
                variant="body2"
              >
                Level 1
              </Typography>
              {showSecondaryText && (
              <Typography
                variant="caption"
              >
                Optional
              </Typography>
              )}
            </Box>
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
    interactive: true,
    showCheckBox: true,
    disabled: false,
    ...Accordion.defaultProps,
    hasDivider: false,
    showSecondaryText: true,
    hasNested: false,
    showHoverActions: false,
  },
};
const VisualTestTemplate: StoryFn<typeof Accordion> = (args) => {
  const { showCheckBox, disabled } = args;
  return (
    <>
      <Accordion disabled={disabled} {...args}>
        <AccordionSummary
          expandIcon={<IconButton showendicon={0}><ChevronDownIcon /></IconButton>}
          aria-controls="panel1-content"
          id="panel1-header"
          disabled={disabled}
        >
          <Box>
            {showCheckBox && <Checkbox />}
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
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <PlaceholderArea height="112px" />
        </AccordionDetails>
      </Accordion>
      <Accordion disabled={disabled} {...args} hasNested>
        <AccordionSummary
          expandIcon={<IconButton showendicon={0}><ChevronDownIcon /></IconButton>}
          aria-controls="panel1-content"
          id="panel1-header"
          disabled={disabled}
        >
          <Box>
            {showCheckBox && <Checkbox />}
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
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Accordion type={AccordionTypes.NO_OUTLINE}>
            <AccordionSummary
              expandIcon={<IconButton showendicon={0}><ChevronDownIcon /></IconButton>}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="body2">Level 2</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <PlaceholderArea height="112px" />
            </AccordionDetails>
          </Accordion>
          <Accordion {...args} type={AccordionTypes.NO_OUTLINE}>
            <AccordionSummary
              expandIcon={<IconButton showendicon={0}><ChevronDownIcon /></IconButton>}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="body2">Level 2</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <PlaceholderArea height="112px" />
            </AccordionDetails>
          </Accordion>
          <Accordion {...args} type={AccordionTypes.NO_OUTLINE}>
            <AccordionSummary
              expandIcon={<IconButton showendicon={0}><ChevronDownIcon /></IconButton>}
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
          expandIcon={<IconButton showendicon={0}><ChevronDownIcon /></IconButton>}
          aria-controls="panel1-content"
          id="panel1-header"
          disabled={disabled}
        >
          <Box>
            {showCheckBox && <Checkbox />}
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
  hasDivider: false,
};
