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
import { Grid, Box, Typography } from '@mui/material';
import Tooltip, {
  TooltipPlacement, TooltipSizes, TooltipTypes,
} from './Tooltip';
import Button from '../Button';

export default {
  title: 'Data display/Tooltip',
  component: Tooltip,
  // Increasing height of docs canvas for placing component properly
  parameters: {
    docs: {
      story: { height: '100px', inline: true },
    },
  },
  argTypes: {
    tooltipsize: {
      description: 'Size of tooltip.',
      if: { arg: 'interactive' },
      options: [TooltipSizes.SMALL, TooltipSizes.MEDIUM],
      control: { type: 'radio' },
      table: {
        defaultValue: {
          summary: 'small',
        },
      },
    },
    placement: {
      description: 'Tooltip placement. Set buttonPlacement = center for better testing of tooltip placement.',
      if: { arg: 'interactive' },
      options: [TooltipPlacement.TOPSTART, TooltipPlacement.TOP, TooltipPlacement.TOPEND, TooltipPlacement.RIGHTSTART, TooltipPlacement.RIGHT, TooltipPlacement.RIGHTEND,
        TooltipPlacement.BOTTOMEND, TooltipPlacement.BOTTOM, TooltipPlacement.BOTTOMSTART, TooltipPlacement.LEFTEND, TooltipPlacement.LEFT,
        TooltipPlacement.LEFTSTART],
      control: { type: 'radio' },
      table: {
        defaultValue: {
          summary: 'top-start',
        },
      },
    },
    type: {
      description: 'Two types of Tooltip - single line and multiple line.',
      if: { arg: 'interactive' },
      options: [TooltipTypes.SINGLELINE, TooltipTypes.MULTILINE],
      control: { type: 'radio' },
      table: {
        defaultValue: {
          summary: 'singleLine',
        },
      },
    },
    maxwidth: {
      description: 'Set maximum width of tooltip. This works only with multi line tooltip',
      if: { arg: 'interactive' },
      control: { type: 'number' },
      table: {
        defaultValue: {
          summary: '327',
        },
      },
    },
    title: {
      description: 'Tooltip title. Zero-length titles string, undefined, null and false are never displayed.',
      if: { arg: 'interactive' },
    },
    ref: {
      description: 'https://mui.com/material-ui/api/tooltip/',
      control: false,
    },
  },
} as Meta<typeof Tooltip>;

const VisualTestTemplate: StoryFn<typeof Tooltip> = (args) => {
  // Placed 5 buttons in different positions of the screen to visualize functionality
  return (
    <Grid container>
      <Tooltip
        {...args}
        open
        type="MultiLine"
        maxwidth={327}
        tooltipsize="Small"
        placement="top-start"
        title="MultiLine tooltip. Small Size. Placement at the top-start. This should be set to a fixed width that is easy to quickly scan or read."
      >
        <Button sx={{
          position: 'absolute',
          left: '0',
          marginLeft: '8px',
          top: '25%',
        }}
        >
          Button
        </Button>
      </Tooltip>
      <Tooltip
        {...args}
        open
        type="MultiLine"
        maxwidth={327}
        tooltipsize="Small"
        placement="top"
        title="MultiLine tooltip. Small Size. Placement at the top. This should be set to a fixed width that is easy to quickly scan or read."
      >
        <Button sx={{
          position: 'absolute',
          left: '50%',
          top: '25%',
        }}
        >
          Button
        </Button>
      </Tooltip>
      <Tooltip
        {...args}
        open
        type="MultiLine"
        maxwidth={327}
        tooltipsize="Small"
        placement="top-end"
        title="MultiLine tooltip. Small Size. Placement at the top-end. This should be set to a fixed width that is easy to quickly scan or read."
      >
        <Button sx={{
          position: 'absolute',
          right: '0',
          marginright: '8px',
          top: '25%',
        }}
        >
          Button
        </Button>
      </Tooltip>
      <Tooltip
        {...args}
        open
        type="multiLine"
        maxwidth={327}
        tooltipsize="medium"
        placement="bottom"
        title="Multiline tooltip. Medium Size. Placement at the bottom. This should be set to a fixed width that is easy to quickly scan or read."
      >
        <Button sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
        }}
        >
          Button
        </Button>
      </Tooltip>
      <Tooltip
        {...args}
        open
        type="MultiLine"
        maxwidth={327}
        tooltipsize="Small"
        placement="right-start"
        title="MultiLine tooltip. Small Size. Placement at the Right start. This should be set to a fixed width that is easy to quickly scan or read."
      >
        <Button sx={{
          position: 'absolute',
          left: '0',
          marginRight: '8px',
          top: '90%',
        }}
        >
          Button
        </Button>
      </Tooltip>
      <Tooltip
        {...args}
        open
        type="MultiLine"
        maxwidth={327}
        tooltipsize="Small"
        placement="right"
        title="MultiLine   tooltip. Small Size. Placement at the Right. This should be set to a fixed width that is easy to quickly scan or read."
      >
        <Button sx={{
          position: 'absolute',
          left: '0',
          marginLeft: '8px',
          top: '65%',
        }}
        >
          Button
        </Button>
      </Tooltip>
      <Tooltip
        {...args}
        open
        type="MultiLine"
        maxwidth={327}
        tooltipsize="Small"
        placement="right-end"
        title="Multi tooltip. Small Size. Placement at the Right End. This should be set to a fixed width that is easy to quickly scan or read."
      >
        <Button sx={{
          position: 'absolute',
          left: '0',
          marginLeft: '8px',
          top: '80%',
        }}
        >
          Button
        </Button>
      </Tooltip>
      <Tooltip
        {...args}
        open
        type="MultiLine"
        maxwidth={327}
        tooltipsize="Small"
        placement="left-start"
        title="MultiLine tooltip. Small Size. Placement at the left start. This should be set to a fixed width that is easy to quickly scan or read."
      >
        <Button sx={{
          position: 'absolute',
          right: '0px',
          marginRight: '8px',
          top: '90%',
        }}
        >
          Button
        </Button>
      </Tooltip>
      <Tooltip
        {...args}
        open
        type="multiLine"
        maxwidth={327}
        tooltipsize="Small"
        placement="left-end"
        title="MultiLine tooltip. Small Size. Placement at the left end. This should be set to a fixed width that is easy to quickly scan or read."
      >
        <Button sx={{
          position: 'absolute',
          right: '0px',
          marginRight: '8px',
          top: '80%',
        }}
        >
          Button
        </Button>
      </Tooltip>
      <Tooltip
        {...args}
        open
        type="multiLine"
        maxwidth={327}
        tooltipsize="Small"
        placement="left"
        title="MultiLine tooltip. Small Size. Placement at the left. This should be set to a fixed width that is easy to quickly scan or read."
      >
        <Button sx={{
          position: 'absolute',
          right: '0px',
          marginRight: '8px',
          top: '65%',
        }}
        >
          Button
        </Button>
      </Tooltip>
      <Tooltip
        {...args}
        open
        type="singleLine"
        maxwidth={327}
        tooltipsize="Small"
        placement="bottom-end"
        title="SingleLine tooltip. Small Size. Placement at the bottom-end. This should be set to a fixed width that is easy to quickly scan or read."
      >
        <Button sx={{
          position: 'absolute',
          right: '0',
          marginRight: '8px',
        }}
        >
          Button
        </Button>
      </Tooltip>
      <Tooltip
        {...args}
        open
        type="singleLine"
        maxwidth={327}
        tooltipsize="Small"
        placement="bottom-start"
        title="SingleLine tooltip. Small Size. Placement at the bottom-start. This should be set to a fixed width that is easy to quickly scan or read."
      >
        <Button sx={{
          position: 'absolute',
          left: '0',
          marginLeft: '8px',
        }}
        >
          Button
        </Button>
      </Tooltip>
      <Tooltip
        {...args}
        maxwidth={327}
        tooltipsize="Small"
        placement="bottom-start"
        title={(
          <Box>
            List
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              <Typography variant="body2" sx={{ display: 'list-item' }}>Line 1</Typography>
              <Typography variant="body2" sx={{ display: 'list-item' }}>Line 2</Typography>
            </ul>
          </Box>
        )}
      >
        <Button sx={{
          position: 'absolute',
          left: '0',
          marginLeft: '8px',
        }}
        >
          Button
        </Button>
      </Tooltip>
    </Grid>
  );
};

const InteractiveExampleTemplate: StoryFn<typeof Tooltip> = (args) => {
  // Placed button in center position of the screen to test all tooltip placements
  return (
    <Tooltip {...args}>
      <Button sx={{
        position: 'absolute',
        left: '50%',
        top: '50%',
      }}
      >
        Button
      </Button>
    </Tooltip>
  );
};

export const InteractiveExample = InteractiveExampleTemplate.bind({});
InteractiveExample.parameters = {
  options: { showPanel: true },
};
InteractiveExample.args = {
  type: 'singleLine',
  maxwidth: 327,
  tooltipsize: 'medium',
  placement: 'bottom',
  title: 'Multiline tooltip. This should be set to a fixed width that is easy to quickly scan or read.',
  // @ts-ignore - this attribute is need to disable all controls in the InteractiveExample, but this attribute is not part of the TooltipProps
  interactive: true,
};

export const VisualTest = VisualTestTemplate.bind({});
VisualTest.parameters = {
  options: { showPanel: false },
};
VisualTest.args = {
};
