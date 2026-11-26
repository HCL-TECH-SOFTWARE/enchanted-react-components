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
import InformationIcon from '@hcl-software/enchanted-icons-react/carbon/es/information';
import { Button } from '../Button';
import { usePortalContainer } from '../../theme';
import { Dialog, DialogSize } from './Dialog';
import type { DialogProps } from './Dialog';

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

interface DemoProps extends DialogProps {
  /** Text of the button that opens the dialog. */
  triggerLabel?: string;
  /** Opens the dialog once the `ThemeProvider` boundary is ready, for visual review. */
  autoOpen?: boolean;
}

/**
 * A button that opens a {@link Dialog}. A dialog is modal, so each story opens it on demand and
 * several of them can share a docs page.
 */
const Demo = ({ triggerLabel = 'Open dialog', autoOpen = false, ...dialogProps }: DemoProps) => {
  const container = usePortalContainer();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Wait for the portal container, or the popup would render outside the style boundary.
    if (autoOpen && container) setOpen(true);
  }, [autoOpen, container]);

  return (
    <>
      <Button onClick={() => setOpen(true)}>{triggerLabel}</Button>
      <Dialog {...dialogProps} open={open} onOpenChange={setOpen} />
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
  title: 'Components/Feedback/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  args: { title: 'Title', children: 'This is a copy text.' },
  argTypes: {
    size: { control: 'select', options: values(DialogSize) },
    // Slots are ReactNode props, which have no useful control. `open` is owned by the demo button.
    footer: { control: false },
    headerActions: { control: false },
    icon: { control: false },
    open: { control: false },
    defaultOpen: { control: false },
  },
  render: (args) => <Demo {...args} />,
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * A dialog with a title, a line of content and the default Cancel and OK buttons. Start here: it is
 * the smallest use. Users close it with the close button, Esc or a click outside.
 */
export const Default: Story = {};

/**
 * `extraSmall` suits short confirmations, `small` simple forms, `medium` and `large` richer content,
 * and `extraLarge` fills the screen. Each button opens a dialog of that size.
 */
export const Sizes: Story = {
  render: (args) => (
    <Row>
      {values(DialogSize).map((size) => (
        <Demo key={size} {...args} size={size} triggerLabel={size} title={size} />
      ))}
    </Row>
  ),
};

/** Use `showIcon` with `icon` to mark the kind of task or message, such as information. */
export const WithIcon: Story = {
  args: { showIcon: true, icon: <InformationIcon /> },
};

/**
 * Content that is taller than the dialog scrolls inside it. A divider appears at the top while content
 * is hidden above and at the bottom while content is hidden below.
 */
export const LongContent: Story = {
  args: { children: <Paragraphs /> },
};

// The stories below open the dialog on load, one per size, scroll position and slot set, for visual
// regression review in Chromatic. Not documentation, so they stay out of the docs page. `autoOpen`
// belongs to the demo button, not to the Dialog, so the args are cast to the Dialog props.
const visual = { tags: ['visual', '!autodocs'] };

/** Visual review: `extraSmall`, open. */
export const SizeExtraSmallOpen: Story = {
  ...visual,
  args: { autoOpen: true, size: DialogSize.ExtraSmall } as DialogProps,
};

/** Visual review: `small`, open. */
export const SizeSmallOpen: Story = {
  ...visual,
  args: { autoOpen: true, size: DialogSize.Small } as DialogProps,
};

/** Visual review: `medium`, open. */
export const SizeMediumOpen: Story = {
  ...visual,
  args: { autoOpen: true, size: DialogSize.Medium } as DialogProps,
};

/** Visual review: `large`, open. */
export const SizeLargeOpen: Story = {
  ...visual,
  args: { autoOpen: true, size: DialogSize.Large } as DialogProps,
};

/** Visual review: `extraLarge`, open. */
export const SizeExtraLargeOpen: Story = {
  ...visual,
  args: { autoOpen: true, size: DialogSize.ExtraLarge } as DialogProps,
};

/** Visual review: content that fits, so no divider shows (Figma `scrollPosition=none`). */
export const ScrollNoneOpen: Story = {
  ...visual,
  args: { autoOpen: true } as DialogProps,
};

/** Visual review: scrolled to the top, bottom divider only (Figma `scrollPosition=top`). */
export const ScrollTopOpen: Story = {
  ...visual,
  args: { autoOpen: true, children: <Paragraphs /> } as DialogProps,
};

/** Visual review: scrolled to the middle, both dividers (Figma `scrollPosition=middle`). */
export const ScrollMiddleOpen: Story = {
  ...visual,
  args: { autoOpen: true, children: <Paragraphs scrollTo="middle" /> } as DialogProps,
};

/** Visual review: scrolled to the bottom, top divider only (Figma `scrollPosition=bottom`). */
export const ScrollBottomOpen: Story = {
  ...visual,
  args: { autoOpen: true, children: <Paragraphs scrollTo="bottom" /> } as DialogProps,
};
