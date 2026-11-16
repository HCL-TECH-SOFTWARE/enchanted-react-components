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
import { Button, ButtonColor, ButtonSize, ButtonVariant } from './Button';

// Stories render inside the ThemeProvider boundary, so the tokens are available for the layout.
const Row = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--padding-s)' }}>{children}</div>
);

const meta = {
  title: 'Components/Inputs/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Button' },
  argTypes: {
    variant: { control: 'select', options: Object.values(ButtonVariant) },
    color: { control: 'select', options: Object.values(ButtonColor) },
    size: { control: 'select', options: Object.values(ButtonSize) },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The primary action in a view. Start here: every other variation changes one thing about it. */
export const Default: Story = {};

/** `contained` for the primary action, `outlined` for secondary actions, `text` for low-emphasis actions. */
export const Variants: Story = {
  render: (args) => (
    <Row>
      {Object.values(ButtonVariant).map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </Row>
  ),
};

/** `primary` for the main action, `neutral` when the action is not tied to the brand, `error` for destructive actions. */
export const Colors: Story = {
  render: (args) => (
    <Row>
      {Object.values(ButtonColor).map((color) => (
        <Button key={color} {...args} color={color}>
          {color}
        </Button>
      ))}
    </Row>
  ),
};

/** `medium` is the default; use `small` in dense layouts such as tables and toolbars. */
export const Sizes: Story = {
  render: (args) => (
    <Row>
      {Object.values(ButtonSize).map((size) => (
        <Button key={size} {...args} size={size}>
          {size}
        </Button>
      ))}
    </Row>
  ),
};

/** Pass `startIcon` to put an icon before the label, for example to reinforce an action such as adding. */
export const WithStartIcon: Story = {
  args: { startIcon: <AddIcon />, children: 'Add' },
};

/** Pass `endIcon` to put an icon after the label, for example to hint at what happens next. */
export const WithEndIcon: Story = {
  args: { endIcon: <AddIcon />, children: 'Add' },
};

/**
 * Marks the button as selected, for example the active option of a group. This is visual only: set
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
        {Object.values(ButtonVariant).map((variant) => (
          <Button key={variant} {...args} variant={variant}>
            {variant}
          </Button>
        ))}
      </Row>
    </div>
  ),
};

/** Every variant, color, and size at rest, for visual regression review. Not documentation. */
export const AllVariants: Story = {
  tags: ['visual'],
  render: (args) => (
    <div style={{ display: 'grid', gap: 'var(--padding-s)' }}>
      {Object.values(ButtonVariant).map((variant) => (
        <Row key={variant}>
          {Object.values(ButtonColor).map((color) =>
            Object.values(ButtonSize).map((size) => (
              <Button key={`${color}-${size}`} {...args} variant={variant} color={color} size={size}>
                {variant}
              </Button>
            )),
          )}
        </Row>
      ))}
    </div>
  ),
};
