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

import Link from './Link';

export default {
  title: 'Navigation/Link',
  component: Link,
  argTypes: {
    disabled: {
      description: 'If `true`, the component is disabled.',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    href: {
      description: 'The href of the link.',
    },
    color: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/#link-prop-color',
    },
    border: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    borderTop: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    borderRight: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    borderBottom: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    borderLeft: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    borderColor: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    borderRadius: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    display: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    displayPrint: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    overflow: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    textOverflow: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    visibility: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    whiteSpace: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    flexBasis: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    flexDirection: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    flexWrap: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    justifyContent: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    alignItems: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    alignContent: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    order: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    flex: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    flexGrow: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    flexShrink: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    alignSelf: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    justifyItems: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    justifySelf: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    gap: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    columnGap: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    rowGap: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    gridColumn: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    gridRow: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    gridAutoFlow: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    gridAutoColumns: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    gridAutoRows: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    gridTemplateColumns: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    gridTemplateRows: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    gridTemplateAreas: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    gridArea: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    bgcolor: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    zIndex: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    position: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    top: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    right: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    bottom: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    left: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    boxShadow: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    width: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    maxWidth: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    minWidth: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    height: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    maxHeight: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    minHeight: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    boxSizing: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    m: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    mt: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    mr: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    mb: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    ml: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    mx: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    my: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    p: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    pt: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    pr: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    pb: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    pl: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    px: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    py: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    margin: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    marginTop: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    marginRight: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    marginBottom: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    marginLeft: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    marginX: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    marginY: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    padding: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    paddingTop: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    paddingRight: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    paddingBottom: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    paddingLeft: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    paddingX: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    paddingY: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    typography: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    fontFamily: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    fontSize: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    fontStyle: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    fontWeight: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    letterSpacing: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    lineHeight: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    textAlign: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    textTransform: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    gutterBottom: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    sx: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/#link-prop-sx',
    },
    variantMapping: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
    classes: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/#link-prop-classes',
    },
    TypographyClasses: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/#link-prop-TypographyClasses',
    },
    align: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/#link',
    },
    ref: {
      control: false,
      description: 'https://mui.com/material-ui/api/link/',
    },
  },
} as Meta<typeof Link>;

const Template: StoryFn<typeof Link> = (args) => {
  return <Link {...args}>Link</Link>;
};

export const ExampleLink = {
  render: Template,

  args: {
    ...Link.defaultProps,
    href: '#',
  },
};
