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
import {
  render, screen, cleanup,
} from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { Grid } from '@mui/material';
import IconTools from '@hcl-software/enchanted-icons/dist/carbon/es/tools';
import IconOverflowHorizontal from '@hcl-software/enchanted-icons/dist/carbon/es/overflow-menu--horizontal';

import { ThemeDirectionType, ThemeModeType, createEnchantedTheme } from '../../../theme';
import IconButton from '../../../IconButton/IconButton';
import Panel, { PanelVariants } from '../../../Panel';

const theme = createEnchantedTheme(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY);

afterEach(cleanup);

describe('Panel', () => {
  it('should render panel with content', () => {
    const sampleContent = 'Sample content';
    const tabLabel = 'Properties';
    const toggleClose = jest.fn();
    const sampleTabList = [{
      tabIcon: {
        icon: <IconTools />,
        label: tabLabel,
      },
      content: {
        title: tabLabel,
        body: <div>{sampleContent}</div>,
      },
    }];

    render(
      <ThemeProvider theme={theme}>
        <Panel
          tabList={sampleTabList}
          open
          toggleClose={toggleClose}
          panelVariant={PanelVariants.WITH_PADDING}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText(tabLabel)).not.toBeNull();
    expect(screen.getByText(sampleContent)).not.toBeNull();
    expect(screen.getByTestId('tab-0')).not.toBeNull();
  });

  it('should render panel without tabs', () => {
    const sampleContent = 'Sample content';
    const tabLabel = 'Properties';
    const toggleClose = jest.fn();
    const sampleTabList = [{
      tabIcon: {
        icon: <IconTools />,
        label: tabLabel,
      },
      content: {
        title: tabLabel,
        body: <div>{sampleContent}</div>,
      },
    }];

    render(
      <ThemeProvider theme={theme}>
        <Panel
          tabList={sampleTabList}
          open
          toggleClose={toggleClose}
          hideSidebar
          panelVariant={PanelVariants.WITH_PADDING}
        />
      </ThemeProvider>,
    );

    expect(screen.queryByTestId('tab-0')).toBeNull();
  });

  it('should render panel with buttons beside x button', () => {
    const sampleContent = 'Sample content';
    const tabLabel = 'Properties';
    const toggleClose = jest.fn();
    const sampleTabList = [{
      tabIcon: {
        icon: <IconTools />,
        label: tabLabel,
      },
      content: {
        title: tabLabel,
        body: <div>{sampleContent}</div>,
        actionHeaderBar: (
          <Grid data-testid="extra-button">
            <IconButton>
              <IconOverflowHorizontal />
            </IconButton>
          </Grid>
        ),
      },
    }];

    render(
      <ThemeProvider theme={theme}>
        <Panel
          tabList={sampleTabList}
          open
          toggleClose={toggleClose}
          panelVariant={PanelVariants.WITH_PADDING}
        />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('extra-button')).not.toBeNull();
  });
});
