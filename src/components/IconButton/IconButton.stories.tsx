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
import type { ReactNode } from 'react';
import AddIcon from '@hcl-software/enchanted-icons-react/carbon/es/add';
import ChevronDownIcon from '@hcl-software/enchanted-icons-react/carbon/es/chevron--down';
import { IconButton, IconButtonSize, IconButtonVariant } from './IconButton';

// Stories render inside the ThemeProvider boundary, so the tokens are available for the layout.
const Row = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--padding-s)' }}>{children}</div>
);

const meta = {
  title: 'Components/Inputs/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: { icon: <AddIcon />, 'aria-label': 'Add' },
  argTypes: {
    variant: { control: 'select', options: Object.values(IconButtonVariant) },
    size: { control: 'select', options: Object.values(IconButtonSize) },
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

/** One icon that triggers an action. Start here: every other variation changes one thing about it. Name the action with `aria-label`. */
export const Default: Story = {};

/** `withPadding` gives the icon a larger hit area; use `withoutPadding` where the button must align with other content, for example inside a field. */
export const Variants: Story = {
  render: (args) => (
    <Row>
      {Object.values(IconButtonVariant).map((variant) => (
        <IconButton key={variant} {...args} variant={variant} aria-label={variant} />
      ))}
    </Row>
  ),
};

/** `medium` is the default; use `small` in dense layouts such as tables and toolbars. */
export const Sizes: Story = {
  render: (args) => (
    <Row>
      {Object.values(IconButtonSize).map((size) => (
        <IconButton key={size} {...args} size={size} aria-label={size} />
      ))}
    </Row>
  ),
};

/** Pass `children` to show a label below the icon when the icon alone is not enough to tell what the action does. */
export const WithLabel: Story = {
  args: { children: 'Add' },
};

/** Pass `endIcon` to add a second, smaller icon after the main one, for example a chevron that hints at a menu. */
export const WithEndIcon: Story = {
  args: { endIcon: <ChevronDownIcon />, children: 'Add' },
};

/**
 * Marks the button as selected, for example the active option of a toolbar. This is visual only: set
 * `aria-pressed` yourself when the button is a toggle.
 */
export const Selected: Story = {
  args: { selected: true },
};

/** Use while the action is unavailable. The button ignores clicks and keyboard input. */
export const Disabled: Story = {
  args: { disabled: true },
};

/** Set `inverseColors` when the button sits on a dark surface, so its colors keep their contrast. */
export const InverseOnDark: Story = {
  args: { inverseColors: true },
  render: (args) => (
    <div style={{ padding: 'var(--padding-s)', background: 'var(--color-background-dark)' }}>
      <Row>
        <IconButton {...args} />
        <IconButton {...args} selected aria-label="Selected" />
        <IconButton {...args} disabled aria-label="Disabled" />
      </Row>
    </div>
  ),
};

/** Every variant and size at rest, selected, and disabled, for visual regression review. Not documentation. */
export const AllVariants: Story = {
  tags: ['visual'],
  render: (args) => (
    <div style={{ display: 'grid', gap: 'var(--padding-s)' }}>
      {Object.values(IconButtonVariant).map((variant) => (
        <Row key={variant}>
          {Object.values(IconButtonSize).map((size) => (
            <Row key={size}>
              <IconButton {...args} variant={variant} size={size} aria-label="Rest" />
              <IconButton {...args} variant={variant} size={size} selected aria-label="Selected" />
              <IconButton {...args} variant={variant} size={size} disabled aria-label="Disabled" />
            </Row>
          ))}
        </Row>
      ))}
    </div>
  ),
};
