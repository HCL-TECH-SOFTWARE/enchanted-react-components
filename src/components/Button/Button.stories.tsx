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

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, ButtonColor, ButtonSize, ButtonVariant } from './Button';

const meta = {
  title: 'Components/Inputs/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Button' },
  argTypes: {
    variant: { control: 'select', options: Object.values(ButtonVariant) },
    color: { control: 'select', options: Object.values(ButtonColor) },
    size: { control: 'select', options: Object.values(ButtonSize) },
    inverse: { control: 'boolean' },
    pressed: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
    // Icons are ReactNode props with no control, and the only approved icon package is not installed here.
    startIcon: { control: false },
    endIcon: { control: false },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A filled brand button with a text label. Start here: it is the default for the main action of a view. */
export const Default: Story = {};
