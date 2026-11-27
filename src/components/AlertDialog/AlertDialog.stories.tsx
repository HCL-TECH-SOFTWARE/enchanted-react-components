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

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, ButtonColor } from '../Button';
import { usePortalContainer } from '../../theme';
import { AlertDialog, AlertDialogSize } from './AlertDialog';
import type { AlertDialogProps } from './AlertDialog';

/**
 * Values of an `as const` object. Storybook's docgen plugin adds `displayName` (a string) and
 * `__docgenInfo` (an object) to these exports, and `Object.values` would return both as extra values.
 */
const values = <T extends Record<string, string>>(options: T): T[keyof T][] =>
  Object.entries(options)
    .filter(([key]) => key !== 'displayName' && key !== '__docgenInfo')
    .map(([, value]) => value as T[keyof T]);

/** Lays the trigger buttons out in a wrapping row. */
const Row = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'calc(var(--padding-sm) * 2)' }}>
    {children}
  </div>
);

interface DemoProps extends AlertDialogProps {
  /** Text of the button that opens the dialog. */
  triggerLabel?: string;
  /** Opens the dialog once the `ThemeProvider` boundary is ready, for visual review. */
  autoOpen?: boolean;
}

/**
 * A button that opens an {@link AlertDialog}. An alert dialog is modal, so each story opens it on
 * demand and several of them can share a docs page.
 */
const Demo = ({ triggerLabel = 'Open alert dialog', autoOpen = false, ...dialogProps }: DemoProps) => {
  const container = usePortalContainer();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Wait for the portal container, or the popup would render outside the style boundary.
    if (autoOpen && container) setOpen(true);
  }, [autoOpen, container]);

  return (
    <>
      <Button color={ButtonColor.Error} onClick={() => setOpen(true)}>
        {triggerLabel}
      </Button>
      <AlertDialog {...dialogProps} open={open} onOpenChange={setOpen} />
    </>
  );
};

/** Enough paragraphs to make the dialog content scroll in every size. */
const Paragraphs = ({ scrollTo }: { scrollTo?: 'middle' | 'bottom' }) => {
  const endRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!scrollTo) return;
    // Scrolls the nearest scrollable ancestor, so the story needs no knowledge of the dialog internals.
    let scroller: HTMLElement | null = endRef.current?.parentElement ?? null;
    while (scroller && scroller.scrollHeight <= scroller.clientHeight) scroller = scroller.parentElement;
    if (!scroller) return;
    const max = scroller.scrollHeight - scroller.clientHeight;
    scroller.scrollTop = scrollTo === 'bottom' ? max : max / 2;
  }, [scrollTo]);

  return (
    <>
      {Array.from({ length: 14 }, (_, index) => (
        <p key={index} style={{ margin: 0 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
          ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
        </p>
      ))}
      <span ref={endRef} />
    </>
  );
};

const meta = {
  title: 'Components/Feedback/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
  args: { title: 'Title', children: 'This is a copy text.' },
  argTypes: {
    size: { control: 'select', options: values(AlertDialogSize) },
    // Slots are ReactNode props, which have no useful control. `open` is owned by the demo button.
    footer: { control: false },
    icon: { control: false },
    open: { control: false },
    defaultOpen: { control: false },
  },
  render: (args) => <Demo {...args} />,
} satisfies Meta<typeof AlertDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * An alert dialog with a warning icon, a title, a line of message and the default Cancel and OK
 * buttons. Start here: it is the smallest use. Users must choose an action; Esc cancels.
 */
export const Default: Story = {};

/**
 * `extraSmall` suits short confirmations and `small` gives a longer message more room. Each button
 * opens a dialog of that size.
 */
export const Sizes: Story = {
  render: (args) => (
    <Row>
      {values(AlertDialogSize).map((size) => (
        <Demo key={size} {...args} size={size} triggerLabel={size} title={size} />
      ))}
    </Row>
  ),
};

// The stories below open the dialog on load, one per Figma size and scroll position, for visual
// regression review in Chromatic. Not documentation, so they stay out of the docs page. `autoOpen` belongs to the
// demo button, not to the AlertDialog, so the args are cast to the AlertDialog props.
const visual = { tags: ['visual', '!autodocs'] };

/** Visual review: `extraSmall`, content that fits, so no divider shows (Figma `scrollPosition=none`). */
export const ExtraSmallScrollNoneOpen: Story = {
  ...visual,
  args: { autoOpen: true, size: AlertDialogSize.ExtraSmall } as AlertDialogProps,
};

/** Visual review: `extraSmall`, at the top, bottom divider only (Figma `scrollPosition=top`). */
export const ExtraSmallScrollTopOpen: Story = {
  ...visual,
  args: { autoOpen: true, size: AlertDialogSize.ExtraSmall, children: <Paragraphs /> } as AlertDialogProps,
};

/** Visual review: `extraSmall`, in the middle, both dividers (Figma `scrollPosition=middle`). */
export const ExtraSmallScrollMiddleOpen: Story = {
  ...visual,
  args: { autoOpen: true, size: AlertDialogSize.ExtraSmall, children: <Paragraphs scrollTo="middle" /> } as AlertDialogProps,
};

/** Visual review: `extraSmall`, at the bottom, top divider only (Figma `scrollPosition=bottom`). */
export const ExtraSmallScrollBottomOpen: Story = {
  ...visual,
  args: { autoOpen: true, size: AlertDialogSize.ExtraSmall, children: <Paragraphs scrollTo="bottom" /> } as AlertDialogProps,
};

/** Visual review: `small`, content that fits, so no divider shows (Figma `scrollPosition=none`). */
export const SmallScrollNoneOpen: Story = {
  ...visual,
  args: { autoOpen: true, size: AlertDialogSize.Small } as AlertDialogProps,
};

/** Visual review: `small`, at the top, bottom divider only (Figma `scrollPosition=top`). */
export const SmallScrollTopOpen: Story = {
  ...visual,
  args: { autoOpen: true, size: AlertDialogSize.Small, children: <Paragraphs /> } as AlertDialogProps,
};

/** Visual review: `small`, in the middle, both dividers (Figma `scrollPosition=middle`). */
export const SmallScrollMiddleOpen: Story = {
  ...visual,
  args: { autoOpen: true, size: AlertDialogSize.Small, children: <Paragraphs scrollTo="middle" /> } as AlertDialogProps,
};

/** Visual review: `small`, at the bottom, top divider only (Figma `scrollPosition=bottom`). */
export const SmallScrollBottomOpen: Story = {
  ...visual,
  args: { autoOpen: true, size: AlertDialogSize.Small, children: <Paragraphs scrollTo="bottom" /> } as AlertDialogProps,
};
