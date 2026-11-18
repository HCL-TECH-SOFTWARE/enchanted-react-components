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
import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { Button, ButtonVariant } from '../Button';
import { Dialog } from './Dialog';

const longContent = Array.from({ length: 40 }, (_, index) => `Line ${index + 1} of the dialog content.`).join(' ');

const meta = {
  title: 'Components/Feedback/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { defaultOpen: true, children: 'Dialog content' },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A dialog that is open from the start, with only its content. Start here: every other variation changes one thing about it. */
export const Default: Story = {};

/** Pass `header` and `footer` for a title and the actions. Put a `Dialog.Title` in `header` so the dialog has an accessible name. */
export const WithHeaderAndFooter: Story = {
  args: {
    header: <BaseDialog.Title>Delete item</BaseDialog.Title>,
    footer: (
      <BaseDialog.Close render={<Button variant={ButtonVariant.Text}>Cancel</Button>} />
    ),
    children: 'This cannot be undone.',
  },
};

/** Set `withPadding` to `false` when the content brings its own spacing, for example an image or a table that runs to the edges. */
export const WithoutPadding: Story = {
  args: { withPadding: false },
};

/** Set `scroll` so that long content scrolls inside the dialog while the header and footer stay in place. */
export const Scrolling: Story = {
  args: {
    scroll: true,
    header: <BaseDialog.Title>Terms</BaseDialog.Title>,
    footer: <BaseDialog.Close render={<Button>Close</Button>} />,
    children: longContent,
  },
};
