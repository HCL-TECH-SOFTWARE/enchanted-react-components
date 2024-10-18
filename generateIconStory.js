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

const fs = require('fs');
const _ = require('lodash');

const excludedIcons = ['utils'];
let createSuccess = 0;

const createTestClass = (imports, renders) => {
  return `/* ======================================================================== *
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
import {
  Card, CardContent, CardHeader, Grid,
  Icon,
} from '@mui/material';
${imports}

export default {
  title: 'Data display/IconPreview',
  component: Icon,
  argTypes: {
    children: {
      control: false,
      description: 'https://mui.com/material-ui/api/icon/#icon-prop-children',
      defaultValue: { summary: false },
    },
    classes: {
      control: false,
      description: 'https://mui.com/material-ui/api/icon/#icon-prop-classes',
      defaultValue: { summary: false },
    },
    htmlColor: {
      control: false,
      description: 'https://mui.com/material-ui/api/icon/',
      defaultValue: { summary: false },
    },
    shapeRendering: {
      control: false,
      description: 'https://mui.com/material-ui/api/icon/',
      defaultValue: { summary: false },
    },
    sx: {
      control: false,
      description: 'https://mui.com/material-ui/api/icon/#icon-prop-sx',
      defaultValue: { summary: false },
    },
    titleAccess: {
      control: false,
      description: 'https://mui.com/material-ui/api/icon/',
      defaultValue: { summary: false },
    },
    ref: {
      control: false,
      description: 'https://mui.com/material-ui/api/icon/',
      defaultValue: { summary: false },
    },
    viewBox: {
      control: false,
      description: 'https://mui.com/material-ui/api/icon/',
    },
    inheritViewBox: {
      control: false,
      description: 'https://mui.com/material-ui/api/icon/',
    },
  },
} as Meta<typeof Icon>;

const renderGridItem = (iconFileName: string, icon: JSX.Element) => {
  return (
    <Grid item xs={4}>
      <Card key={iconFileName}>
        <CardHeader subheader={iconFileName} />
        <CardContent style={{ textAlign: 'center' }}>{icon}</CardContent>
      </Card>
    </Grid>
  );
};

const Template: StoryFn<typeof Icon> = (args) => {
  return (
    <Grid container spacing={4}>${renders}
    </Grid>
  );
};

export const ExampleIcons = Template.bind({});

ExampleIcons.args = {
  ...Icon.defaultProps,
  color: 'primary',
  fontSize: 'large',
};
`;
};

let testFileImportContent = '';
let testFileRender = '';

const createContent = (source, desitination, subFolder) => {
  const sourcePath = `${source}/${subFolder}`;
  const files = fs.readdirSync(sourcePath);

  for (let i = 0; i < files.length; i++) {
    let iconName = files[i];
    // if iconName is a directory, then call createContent recursively
    if (fs.lstatSync(`${sourcePath}/${iconName}`).isDirectory()) {
      createContent(source, desitination, `${_.isEmpty(subFolder) ? '' : `${subFolder}/`}${iconName}`);
    } else if (iconName === 'index.js') {
      const pathArray = subFolder.split('/');
      iconName = pathArray[pathArray.length - 1];
      if (pathArray.length > 3) {
        iconName = `${pathArray[pathArray.length - 2]}-${iconName}`;
      }

      let camelCaseIconName = `Icon${_.upperFirst(_.camelCase(iconName))}`;

      // check if subfolder contains '/apps/'
      if (subFolder.includes('apps/')) {
        camelCaseIconName = `Custom${camelCaseIconName}`;
      }
      // workaround for https://github.com/HCL-TECH-SOFTWARE/enchanted-icons/issues/9
      if (pathArray[pathArray.length - 1] === 'page--add') {
        camelCaseIconName = `Custom${camelCaseIconName}2`;
      }

      // skip icons that are excluded
      if (!excludedIcons.includes(iconName)) {
      // const camelCaseIconName = `Icon${_.upperFirst(_.camelCase(subFolder))}${_.upperFirst(_.camelCase(iconName))}`;
        testFileImportContent = `${testFileImportContent}
import ${camelCaseIconName} from '@hcl-software/enchanted-icons/dist/${subFolder}';`;

        testFileRender = `${testFileRender}
      {renderGridItem('../${subFolder}', <${camelCaseIconName} {...args} />)}`;
        createSuccess += 1;
      }
    }
  }
};

console.info('START - Create generate icons preview story');
const rootSourcePath = `${process.cwd()}/node_modules/@hcl-software/enchanted-icons/dist/`;
const rootDesitinationPath = `${process.cwd()}/src/Icon`;

// Create test file for the showroom 'IconsCarbon.tsx'
const testFile = `${rootDesitinationPath}/Icon.stories.tsx`;
// Create all wrapped components
createContent(rootSourcePath, rootDesitinationPath, '');
const testFileContent = createTestClass(testFileImportContent, testFileRender);

fs.writeFileSync(testFile, testFileContent);
console.info(`createSuccess: ${createSuccess}`);
console.info('DONE - Create generate icons');