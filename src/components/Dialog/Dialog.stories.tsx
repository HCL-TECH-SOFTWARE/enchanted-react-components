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
import AddIcon from '@hcl-software/enchanted-icons-react/carbon/es/add';
import { Button, ButtonVariant } from '../Button';
import { Checkbox } from '../Checkbox';
import { IconButton } from '../IconButton';
import { Dialog, DialogSize } from './Dialog';
import { DialogActions, DialogActionsAlignment, DialogActionsFlow } from './DialogActions';
import { DialogHeader } from './DialogHeader';

const longContent = Array.from({ length: 40 }, (_, index) => `Line ${index + 1} of the dialog content.`).join(' ');

// The header and the actions are parts of the dialog: the header needs the Base UI dialog context, and
// the actions are dismissed through it. They are documented here, as stories of the `Dialog`.
const cancelAndDelete = (
  <>
    <BaseDialog.Close render={<Button variant={ButtonVariant.Text}>Cancel</Button>} />
    <Button>Delete</Button>
  </>
);

const meta = {
  title: 'Components/Feedback/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { defaultOpen: true, children: 'Dialog content' },
  argTypes: {
    size: { control: 'select', options: Object.values(DialogSize) },
  },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A dialog that is open from the start, with only its content. Start here: every other variation changes one thing about it. */
export const Default: Story = {};

/** The full dialog: pass a {@link DialogHeader} as `header` and {@link DialogActions} as `footer`. The header names the dialog for assistive technology and adds the close button. */
export const WithHeaderAndFooter: Story = {
  args: {
    header: <DialogHeader>Delete item</DialogHeader>,
    footer: <DialogActions>{cancelAndDelete}</DialogActions>,
    children: 'This cannot be undone.',
  },
};

/** Set `withPadding` to `false` when the content brings its own spacing, for example an image or a table that runs to the edges. */
export const WithoutPadding: Story = {
  args: { withPadding: false },
};

/** `size` sets the width: `xs` 444, `sm` 600 (default), `md` 960, `lg` 1280, `xl` 1920 pixels. The dialog never exceeds the viewport. */
export const Sizes: Story = {
  args: {
    size: DialogSize.Medium,
    header: <DialogHeader>Wide dialog</DialogHeader>,
    children: 'This dialog uses the medium width.',
  },
};

/** Set `scroll` so that long content scrolls inside the dialog while the header and footer stay in place. */
export const Scrolling: Story = {
  args: {
    scroll: true,
    header: <DialogHeader>Terms</DialogHeader>,
    footer: (
      <DialogActions>
        <BaseDialog.Close render={<Button>Close</Button>} />
      </DialogActions>
    ),
    children: longContent,
  },
};

/** Header: set `showCloseIcon` to `false` for a dialog that can only be dismissed through its actions. */
export const HeaderWithoutCloseIcon: Story = {
  args: {
    header: <DialogHeader showCloseIcon={false}>Delete item</DialogHeader>,
    footer: <DialogActions>{cancelAndDelete}</DialogActions>,
  },
};

/** Header: set `showDivider` to `false` when the content below already starts with a line. */
export const HeaderWithoutDivider: Story = {
  args: { header: <DialogHeader showDivider={false}>Delete item</DialogHeader> },
};

/** Header: pass `icon` to put an icon before the title and `actions` for extra buttons before the close button. */
export const HeaderWithIconAndActions: Story = {
  args: {
    header: (
      <DialogHeader icon={<AddIcon />} actions={<IconButton icon={<AddIcon />} aria-label="Add" />}>
        New item
      </DialogHeader>
    ),
  },
};

/** Actions: set `alignment` to `left` to put the actions at the start of the footer. */
export const ActionsAlignedLeft: Story = {
  args: {
    footer: <DialogActions alignment={DialogActionsAlignment.Left}>{cancelAndDelete}</DialogActions>,
  },
};

/** Actions: set `flow` to `vertical` to stack the actions, for narrow dialogs or long labels. `alignment` combines with it. */
export const ActionsVertical: Story = {
  args: {
    footer: <DialogActions flow={DialogActionsFlow.Vertical}>{cancelAndDelete}</DialogActions>,
  },
};

/** Actions: set `showDivider` to `false` when the content above already ends in a line. */
export const ActionsWithoutDivider: Story = {
  args: { footer: <DialogActions showDivider={false}>{cancelAndDelete}</DialogActions> },
};

/** Actions: pass `startContent` for something before the actions, such as a checkbox with a label. */
export const ActionsWithStartContent: Story = {
  args: {
    footer: (
      <DialogActions startContent={<Checkbox label="Don't ask again" />}>{cancelAndDelete}</DialogActions>
    ),
  },
};
