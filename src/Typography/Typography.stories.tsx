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
    variant: {
      control: false,
      description: 'The variant of the Typography component.',
    },
    align: {
      description: 'The align of the Typography component.',
      options: ['inherit', 'left', 'right', 'center', 'justify'],
      control: { type: 'radio' },
      if: { arg: 'interactive' },
    },
    gutterBottom: {
      description: 'The gutterBottom of the Typography component.',
      if: { arg: 'interactive' },
    },
    noWrap: {
      description: 'The noWrap of the Typography component.',
      if: { arg: 'interactive' },
    },
    component: {
      description: 'The component used for the root node. Either a string to use a HTML element or a component.',
      control: false,
    },
    paragraph: {
      description: 'Deprecated－Use the component prop instead. The paragraph of the Typography component.',
      if: { arg: 'interactive' },
    },
    ref: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    children: {
      description: 'https://mui.com/material-ui/api/typography/#typography-prop-children',
      control: false,
    },
    classes: {
      description: 'https://mui.com/material-ui/api/typography/#typography-prop-classes',
      control: false,
    },
    sx: {
      description: 'https://mui.com/material-ui/api/typography/#typography-prop-sx',
      control: false,
    },
    p: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    color: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    width: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    border: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    boxShadow: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    fontWeight: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    zIndex: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    alignContent: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    alignItems: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    alignSelf: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    bottom: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    boxSizing: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    columnGap: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    display: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    flexBasis: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    flexDirection: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    flexGrow: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    flexShrink: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    flexWrap: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    fontFamily: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    fontSize: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    fontStyle: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    gridAutoColumns: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    gridAutoFlow: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    gridAutoRows: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    gridTemplateAreas: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    gridTemplateColumns: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    gridTemplateRows: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    height: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    justifyContent: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    justifyItems: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    justifySelf: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    left: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    letterSpacing: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    lineHeight: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    marginBottom: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    marginLeft: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    marginRight: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    marginTop: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    maxHeight: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    maxWidth: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    minHeight: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    minWidth: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    order: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    paddingBottom: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    paddingLeft: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    paddingRight: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    paddingTop: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    position: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    right: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    rowGap: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    textAlign: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    textOverflow: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    textTransform: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    top: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    visibility: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    whiteSpace: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    borderBottom: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    borderColor: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    borderLeft: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    borderRadius: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    borderRight: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    borderTop: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    flex: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    gap: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    gridArea: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    gridColumn: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    gridRow: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    margin: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    overflow: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    padding: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    bgcolor: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    m: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    mt: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    mr: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    mb: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    mi: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    mx: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    ml: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    marginX: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    my: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    marginY: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    pt: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    pr: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    pb: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    pl: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    px: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    paddingX: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    py: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    paddingY: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    typography: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    displayPrint: {
      description: 'https://mui.com/material-ui/api/typography/',
      control: false,
    },
    variantMapping: {
      description: 'https://mui.com/material-ui/api/typography/#typography-prop-variantMapping',
      control: false,
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
