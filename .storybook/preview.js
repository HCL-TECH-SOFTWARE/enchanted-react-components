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

import { withThemeProvider } from './theme';
import { ensureToGetColor } from '../src/theme';
import { Colors, ColorNames } from '../src/colors';

import { ThemeDirectionType, ThemeModeType } from '../src/theme';
import { create } from '@storybook/theming/create';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: ensureToGetColor(Colors.get(ColorNames.INTERFACE_BG_PAPER)),
      },
      {
        name: 'dark',
        value: ensureToGetColor(Colors.get(ColorNames.INTERFACE_BG_PAPER_INVERSE)),
      }
    ]
  },
  controls: {
    matchers: {
      date: /Date$/,
    },
  },
}

export const globalTypes = {
  themeDirection: {
    title: 'Theme direction',
    description: 'Global theme direction',
    defaultValue: ThemeDirectionType.LTR,
    toolbar: {
      icon: 'compass',
      items: [
        { value: ThemeDirectionType.LTR, title: 'LTR' },
        { value: ThemeDirectionType.RTL, title: 'RTL' },
      ],
      dynamicTitle: true,
    },
  },
  theme: {
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      title: 'Theme',
      icon: 'paintbrush',
      items: [
        { value: ThemeModeType.LIGHT_NEUTRAL_GREY, title: 'Light - neutral grey' },
        { value: ThemeModeType.LIGHT_COOL_GREY, title: 'Light - cool grey' },
      ],
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
};

export const decorators = [withThemeProvider];
