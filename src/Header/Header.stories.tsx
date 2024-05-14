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
import IconStar from '@hcl-software/enchanted-icons/dist/carbon/es/star';
import IconStarFilled from '@hcl-software/enchanted-icons/dist/carbon/es/star--filled';
import Header, { HeaderDemo, HeaderPageVariant } from './Header';
import {
  sampleContentComposerOverview, sampleContentComposerItemPage, sampleContentComposerSearchResults,
  sampleDigitalAssetManagerOverview, sampleDigitalAssetManagerItemPage, sampleDigitalAssetManagerSearchResults,
  sampleContentReportingOverview, sampleContentReportingUpdates,
} from './sampleHeaderConfig';
import Typography from '../Typography';

export default {
  title: 'Navigation/Header',
  component: Header,
  argTypes: {
    hamburgerSpace: {
      if: { arg: 'interactive' },
      description: "It's a helper control to enable and disable the 'hamburgerSpace'.",
      table: {
        defaultValue: { summary: false },
      },
    },
    hideMiddleSection: {
      description: 'hideMiddleSection of Header component.',
      if: { arg: 'interactive' },
    },
    headerPageVariant: {
      description: 'headerPageVariant of Header component.',
      options: ['OVERVIEW_PAGE', 'ITEM_PAGE', 'SEARCH_RESULT_PAGE', 'UPDATES_PAGE'],
      control: { type: 'radio' },
      if: { arg: 'interactive' },
    },
    headerDemoSample: {
      description: 'headerDemoSample of Header component. This is storybook control only, not an actual property of Header component.',
      options: ['CC', 'DAM', 'CR'],
      control: { type: 'radio' },
      if: { arg: 'interactive' },
    },
    startSection: {
      description: 'handles the rendering of the children components in the left section of the header.',
      control: false,
    },
    middleSection: {
      description: 'array containing the children components in the middle section of the header',
      control: false,
    },
    endSection: {
      description: 'handles the rendering of the children components in the right section of the header',
      control: false,
    },
    onClickBackButton: {
      description: 'handles the function call when the back button is clicked.',
      control: false,
    },
    onClickFavoritesToggle: {
      description: 'handles the function call when the favorites button is clieck.',
      control: false,
    },
    classes: {
      description: 'https://mui.com/material-ui/api/grid/#grid-prop-classes',
      control: false,
    },
    disableGutters: {
      description: 'https://mui.com/material-ui/api/grid/',
      control: false,
    },
    fixed: {
      description: 'https://mui.com/material-ui/api/container/#container-prop-fixed',
      control: false,
    },
    maxWidth: {
      description: 'https://mui.com/material-ui/api/container/#container-prop-maxWidth',
      control: false,
    },
    sx: {
      description: 'https://mui.com/material-ui/api/container/#container-prop-sx',
      control: false,
    },
    ref: {
      description: 'https://mui.com/material-ui/api/container/',
      control: false,
    },
  },
} as Meta<typeof Header>;

const InteractiveExampleTemplate: StoryFn<typeof Header> = (args) => {
  let argsClone = { ...args };
  const [isFavorite, setIsFavorite] = React.useState<boolean>(false);

  const handleClickFavoritesToggle = () => {
    setIsFavorite(!isFavorite);
  };

  React.useEffect(() => {
    if (args.headerPageVariant === HeaderPageVariant.ITEM_PAGE && args.headerDemoSample
      && [HeaderDemo.CC, HeaderDemo.DAM].includes(args.headerDemoSample)
    ) {
      if (isFavorite) {
        argsClone.startSection.favoritesToggleIcon = <IconStarFilled />;
      } else {
        argsClone.startSection.favoritesToggleIcon = <IconStar />;
      }
    }
  }, [isFavorite]);

  switch (args.headerDemoSample) {
    case HeaderDemo.CC: {
      if (args.headerPageVariant === HeaderPageVariant.OVERVIEW_PAGE) {
        argsClone = { ...argsClone, ...sampleContentComposerOverview };
      } else if (args.headerPageVariant === HeaderPageVariant.ITEM_PAGE) {
        argsClone = { ...argsClone, ...sampleContentComposerItemPage };
      } else if (args.headerPageVariant === HeaderPageVariant.SEARCH_RESULT_PAGE) {
        argsClone = { ...argsClone, ...sampleContentComposerSearchResults };
      }
      argsClone.startSection.hamburgerSpace = args.hamburgerSpace;
      break;
    }
    case HeaderDemo.DAM: {
      if (args.headerPageVariant === HeaderPageVariant.OVERVIEW_PAGE) {
        argsClone = { ...argsClone, ...sampleDigitalAssetManagerOverview };
      } else if (args.headerPageVariant === HeaderPageVariant.ITEM_PAGE) {
        argsClone = { ...argsClone, ...sampleDigitalAssetManagerItemPage };
      } else if (args.headerPageVariant === HeaderPageVariant.SEARCH_RESULT_PAGE) {
        argsClone = { ...argsClone, ...sampleDigitalAssetManagerSearchResults };
      }
      argsClone.startSection.hamburgerSpace = args.hamburgerSpace;
      break;
    }
    case HeaderDemo.CR: {
      if (args.headerPageVariant === HeaderPageVariant.OVERVIEW_PAGE) {
        argsClone = { ...argsClone, ...sampleContentReportingOverview };
      } else if (args.headerPageVariant === HeaderPageVariant.UPDATES_PAGE) {
        argsClone = { ...argsClone, ...sampleContentReportingUpdates };
      }
      argsClone.startSection.hamburgerSpace = args.hamburgerSpace;
      break;
    }
    default:
      break;
  }

  return (
    <Header
      {...argsClone}
      {...(args.headerPageVariant === HeaderPageVariant.ITEM_PAGE && args.headerDemoSample
        && [HeaderDemo.CC, HeaderDemo.DAM].includes(args.headerDemoSample))
        && {
          onClickFavoritesToggle: handleClickFavoritesToggle,
        }
      }
    />
  );
};

const VisualTestTemplate: StoryFn<typeof Header> = (args) => {
  return (
    <>
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        CC Overview
      </Typography>
      <Header
        {...sampleContentComposerOverview}
      />
      &nbsp;
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        CC Item Page
      </Typography>
      <Header
        {...sampleContentComposerItemPage}
      />
      &nbsp;
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        CC Search Results
      </Typography>
      <Header
        {...sampleContentComposerSearchResults}
      />
      &nbsp;
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        CR Overview
      </Typography>
      <Header
        {...sampleContentReportingOverview}
      />
      &nbsp;
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        CR Update Page
      </Typography>
      <Header
        {...sampleContentReportingUpdates}
      />
      &nbsp;
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        DAM Overview
      </Typography>
      <Header
        {...sampleDigitalAssetManagerOverview}
      />
      &nbsp;
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        DAM Item Page
      </Typography>
      <Header
        {...sampleDigitalAssetManagerItemPage}
      />
      &nbsp;
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
        DAM Search Results
      </Typography>
      <Header
        {...sampleDigitalAssetManagerSearchResults}
      />
      &nbsp;
    </>
  );
};

export const InteractiveExample = InteractiveExampleTemplate.bind({});
InteractiveExample.parameters = {
  options: { showPanel: true },
};
InteractiveExample.args = {
  ...Header.defaultProps,
  // @ts-ignore - this attribute is need to disable all controls in the InteractiveExample, but this attribute is not part of the HeaderProps
  interactive: true,
  startSection: {
    title: 'Sample Title',
    subtitle: '0 item',
  },
  hamburgerSpace: false,
  hideMiddleSection: false,
  headerDemoSample: HeaderDemo.CR,
  headerPageVariant: HeaderPageVariant.ITEM_PAGE,
};

export const VisualTest = VisualTestTemplate.bind({});
VisualTest.parameters = {
  options: { showPanel: false },
};
VisualTest.args = {
};
