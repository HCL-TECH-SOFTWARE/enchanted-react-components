/* ======================================================================== *
 * Copyright 2026 HCL America Inc.                                          *
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

import type { Preview } from '@storybook/react-vite';
import { Direction, ShadowRootType, ThemeMode, ThemeProvider } from '../src/theme/ThemeProvider';
import '../src/styles/index.scss';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Theme mode',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: ThemeMode.Light, title: 'Light' },
          { value: ThemeMode.Dark, title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
    direction: {
      description: 'Text direction',
      toolbar: {
        title: 'Direction',
        icon: 'transfer',
        items: [
          { value: Direction.Ltr, title: 'LTR' },
          { value: Direction.Rtl, title: 'RTL' },
        ],
        dynamicTitle: true,
      },
    },
    shadowRootType: {
      description: 'Shadow root type',
      toolbar: {
        title: 'Shadow root',
        icon: 'box',
        items: [
          { value: ShadowRootType.None, title: 'None' },
          { value: ShadowRootType.Open, title: 'Open' },
          { value: ShadowRootType.Closed, title: 'Closed' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: ThemeMode.Light,
    direction: Direction.Ltr,
    shadowRootType: ShadowRootType.Open,
  },
  decorators: [
    (Story, context) => (
      <ThemeProvider
        mode={context.globals.theme as ThemeMode}
        direction={context.globals.direction as Direction}
        shadowRootType={context.globals.shadowRootType as ShadowRootType}
      >
        <Story />
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default preview;
