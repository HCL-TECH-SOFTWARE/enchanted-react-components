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

import Divider from '../Divider';
import Typography from './Typography';

export default {
  title: 'Data display/Typography',
  component: Typography,
  argTypes: {
    children: {
      description: 'The children of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    classes: {
      description: 'The classes of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    sx: {
      description: 'The sx of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    variant: {
      description: 'The variant of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    p: {
      description: 'The p of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    color: {
      description: 'The color of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    width: {
      description: 'The width of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    border: {
      description: 'The border of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    boxShadow: {
      description: 'The boxShadow of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    fontWeight: {
      description: 'The fontWeight of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    zIndex: {
      description: 'The zIndex of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    alignContent: {
      description: 'The alignContent of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    alignItems: {
      description: 'The alignItems of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    alignSelf: {
      description: 'The alignSelf of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    bottom: {
      description: 'The bottom of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    boxSizing: {
      description: 'The boxSizing of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    columnGap: {
      description: 'The columnGap of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    display: {
      description: 'The display of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    flexBasis: {
      description: 'The flexBasis of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    flexDirection: {
      description: 'The flexDirection of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    flexGrow: {
      description: 'The flexGrow of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    flexShrink: {
      description: 'The flexShrink of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    flexWrap: {
      description: 'The flexWrap of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    fontFamily: {
      description: 'The fontFamily of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    fontSize: {
      description: 'The fontSize of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    fontStyle: {
      description: 'The fontStyle of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    gridAutoColumns: {
      description: 'The gridAutoColumns of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    gridAutoFlow: {
      description: 'The gridAutoFlow of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    gridAutoRows: {
      description: 'The gridAutoFlow of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    gridTemplateAreas: {
      description: 'The gridTemplateAreas of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    gridTemplateColumns: {
      description: 'The gridTemplateColumns of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    gridTemplateRows: {
      description: 'The gridTemplateRows of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    height: {
      description: 'The height of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    justifyContent: {
      description: 'The justifyContent of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    justifyItems: {
      description: 'The justifyItems of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    justifySelf: {
      description: 'The justifySelf of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    left: {
      description: 'The left of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    letterSpacing: {
      description: 'The letterSpacing of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    lineHeight: {
      description: 'The lineHeight of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    marginBottom: {
      description: 'The marginBottom of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    marginLeft: {
      description: 'The marginLeft of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    marginRight: {
      description: 'The marginRight of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    marginTop: {
      description: 'The marginTop of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    maxHeight: {
      description: 'The maxHeight of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    maxWidth: {
      description: 'The maxWidth of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    minHeight: {
      description: 'The minHeight of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    minWidth: {
      description: 'The minWidth of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    order: {
      description: 'The order of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    paddingBottom: {
      description: 'The paddingBottom of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    paddingLeft: {
      description: 'The paddingLeft of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    paddingRight: {
      description: 'The paddingRight of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    paddingTop: {
      description: 'The paddingTop of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    position: {
      description: 'The position of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    right: {
      description: 'The right of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    rowGap: {
      description: 'The rowGap of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    textAlign: {
      description: 'The textAlign of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    textOverflow: {
      description: 'The textOverflow of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    textTransform: {
      description: 'The textTransform of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    top: {
      description: 'The top of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    visibility: {
      description: 'The visibility of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    whiteSpace: {
      description: 'The whiteSpace of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    borderBottom: {
      description: 'The borderBottom of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    borderColor: {
      description: 'The borderColor of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    borderLeft: {
      description: 'The borderLeft of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    borderRadius: {
      description: 'The borderRadius of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    borderRight: {
      description: 'The borderRight of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    borderTop: {
      description: 'The borderTop of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    flex: {
      description: 'The flex of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    gap: {
      description: 'The gap of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    gridArea: {
      description: 'The gridArea of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    gridColumn: {
      description: 'The gridColumn of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    gridRow: {
      description: 'The gridRow of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    margin: {
      description: 'The margin of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    overflow: {
      description: 'The overflow of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    padding: {
      description: 'The padding of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    bgcolor: {
      description: 'The bgcolor of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    m: {
      description: 'The m of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    mt: {
      description: 'The mt of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    mr: {
      description: 'The mr of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    mb: {
      description: 'The mb of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    mi: {
      description: 'The mi of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    mx: {
      description: 'The mx of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    ml: {
      description: 'The ml of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    marginX: {
      description: 'The marginX of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    my: {
      description: 'The my of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    marginY: {
      description: 'The marginY of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    pt: {
      description: 'The pt of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    pr: {
      description: 'The pr of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    pb: {
      description: 'The pb of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    pl: {
      description: 'The pl of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    px: {
      description: 'The px of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    paddingX: {
      description: 'The paddingX of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    py: {
      description: 'The py of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    paddingY: {
      description: 'The paddingY of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    typography: {
      description: 'The typography of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    displayPrint: {
      description: 'The displayPrint of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    align: {
      description: 'The align of the Typography component.',
      options: ['inherit', 'left', 'right', 'center', 'justify'],
      control: { type: 'radio' },
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    gutterBottom: {
      description: 'The gutterBottom of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    noWrap: {
      description: 'The noWrap of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    paragraph: {
      description: 'The paragraph of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
    variantMapping: {
      description: 'The variantMapping of the Typography component.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
  },
} as Meta<typeof Typography>;

const VisualTestTemplate: StoryFn<typeof Typography> = (args) => {
  return (
    <>
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        Inherit
      </Typography>
      <Divider />
      <Box sx={{ width: '100%' }}>
        <Typography variant="h1" align="inherit">
          h1 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="h2" align="inherit">
          h2 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="h3" align="inherit">
          h3 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="h4" align="inherit">
          h4 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="h5" align="inherit">
          h5 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="h6" align="inherit">
          h6 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="subtitle1" align="inherit">
          subtitle1 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="subtitle2" align="inherit">
          subtitle2 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="body1" align="inherit">
          body1 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="body1bold" display="block" align="inherit">
          body1bold - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="body1italic" align="inherit">
          body1italic - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="body2" align="inherit">
          body2 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="body2bold" display="block" align="inherit">
          body2bold - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="body2italic" align="inherit">
          body2italic - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="button" display="block" align="inherit">
          button - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="caption" display="block" align="inherit">
          caption - The big brown fox jumped over the lazy dog
        </Typography>
      </Box>
      &nbsp;
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        Left
      </Typography>
      <Divider />
      <Box sx={{ width: '100%' }}>
        <Typography variant="h1" align="left">
          h1 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="h2" align="left">
          h2 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="h3" align="left">
          h3 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="h4" align="left">
          h4 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="h5" align="left">
          h5 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="h6" align="left">
          h6 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="subtitle1" align="left">
          subtitle1 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="subtitle2" align="left">
          subtitle2 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="body1" align="left">
          body1 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="body1bold" display="block" align="left">
          body1bold - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="body1italic" align="left">
          body1italic - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="body2" align="left">
          body2 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="body2bold" display="block" align="left">
          body2bold - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="body2italic" align="left">
          body2italic - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="button" display="block" align="left">
          button - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="caption" display="block" align="left">
          caption - The big brown fox jumped over the lazy dog
        </Typography>
      </Box>
      &nbsp;
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        Right
      </Typography>
      <Divider />
      <Box sx={{ width: '100%' }}>
        <Typography variant="h1" align="right">
          h1 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="h2" align="right">
          h2 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="h3" align="right">
          h3 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="h4" align="right">
          h4 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="h5" align="right">
          h5 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="h6" align="right">
          h6 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="subtitle1" align="right">
          subtitle1 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="subtitle2" align="right">
          subtitle2 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="body1" align="right">
          body1 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="body1bold" display="block" align="right">
          body1bold - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="body1italic" align="right">
          body1italic - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="body2" align="right">
          body2 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="body2bold" display="block" align="right">
          body2bold - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="body2italic" align="right">
          body2italic - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="button" display="block" align="right">
          button - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="caption" display="block" align="right">
          caption - The big brown fox jumped over the lazy dog
        </Typography>
      </Box>
      &nbsp;
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        Center
      </Typography>
      <Divider />
      <Box sx={{ width: '100%' }}>
        <Typography variant="h1" align="center">
          h1 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="h2" align="center">
          h2 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="h3" align="center">
          h3 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="h4" align="center">
          h4 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="h5" align="center">
          h5 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="h6" align="center">
          h6 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="subtitle1" align="center">
          subtitle1 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="subtitle2" align="center">
          subtitle2 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="body1" align="center">
          body1 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="body1bold" display="block" align="center">
          body1bold - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="body1italic" align="center">
          body1italic - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="body2" align="center">
          body2 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="body2bold" display="block" align="center">
          body2bold - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="body2italic" align="center">
          body2italic - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="button" display="block" align="center">
          button - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="caption" display="block" align="center">
          caption - The big brown fox jumped over the lazy dog
        </Typography>
      </Box>
      &nbsp;
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        Justify
      </Typography>
      <Divider />
      <Box sx={{ width: '100%' }}>
        <Typography variant="h1" align="justify">
          h1 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="h2" align="justify">
          h2 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="h3" align="justify">
          h3 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="h4" align="justify">
          h4 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="h5" align="justify">
          h5 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="h6" align="justify">
          h6 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="subtitle1" align="justify">
          subtitle1 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="subtitle2" align="justify">
          subtitle2 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="body1" align="justify">
          body1 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="body1bold" display="block" align="justify">
          body1bold - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="body1italic" align="justify">
          body1italic - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="body2" align="justify">
          body2 - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="body2bold" display="block" align="justify">
          body2bold - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="body2italic" align="justify">
          body2italic - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="button" display="block" align="justify">
          button - The big brown fox jumped over the lazy dog
        </Typography>
        <Typography variant="caption" display="block" align="justify">
          caption - The big brown fox jumped over the lazy dog
        </Typography>
      </Box>
    </>
  );
};

const InteractiveExampleTemplate: StoryFn<typeof Typography> = (args) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography {...args} variant="h1">
        h1 - The big brown fox jumped over the lazy dog
      </Typography>
      <Typography {...args} variant="h2">
        h2 - The big brown fox jumped over the lazy dog
      </Typography>
      <Typography {...args} variant="h3">
        h3 - The big brown fox jumped over the lazy dog
      </Typography>
      <Typography {...args} variant="h4">
        h4 - The big brown fox jumped over the lazy dog
      </Typography>
      <Typography {...args} variant="h5">
        h5 - The big brown fox jumped over the lazy dog
      </Typography>
      <Typography {...args} variant="h6">
        h6 - The big brown fox jumped over the lazy dog
      </Typography>
      <Typography {...args} variant="subtitle1">
        subtitle1 - The big brown fox jumped over the lazy dog
      </Typography>
      <Typography {...args} variant="subtitle2">
        subtitle2 - The big brown fox jumped over the lazy dog
      </Typography>
      <Typography {...args} variant="body1">
        body1 - The big brown fox jumped over the lazy dog
      </Typography>
      <Typography {...args} variant="body1bold" display="block">
        body1bold - The big brown fox jumped over the lazy dog
      </Typography>
      <Typography {...args} variant="body1italic">
        body1italic - The big brown fox jumped over the lazy dog
      </Typography>
      <Typography {...args} variant="body2">
        body2 - The big brown fox jumped over the lazy dog
      </Typography>
      <Typography {...args} variant="body2bold" display="block">
        body2bold - The big brown fox jumped over the lazy dog
      </Typography>
      <Typography {...args} variant="body2italic">
        body2italic - The big brown fox jumped over the lazy dog
      </Typography>
      <Typography {...args} variant="button" display="block">
        button - The big brown fox jumped over the lazy dog
      </Typography>
      <Typography {...args} variant="caption" display="block">
        caption - The big brown fox jumped over the lazy dog
      </Typography>
    </Box>
  );
};

export const InteractiveExample = InteractiveExampleTemplate.bind({});
InteractiveExample.parameters = {
  options: { showPanel: true },
};
InteractiveExample.args = {
  ...Typography.defaultProps,
  variant: undefined,
  // @ts-ignore - this attribute is need to disable all controls in the InteractiveExample, but this attribute is not part of the TypographyProps
  interactive: true,
};

export const VisualTest = VisualTestTemplate.bind({});
VisualTest.parameters = {
  options: { showPanel: false },
};
VisualTest.args = {
};
