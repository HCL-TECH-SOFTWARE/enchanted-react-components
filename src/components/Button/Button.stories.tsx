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

import { Fragment, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import AddIcon from '@hcl-software/enchanted-icons-react/carbon/es/add';
import ArrowRightIcon from '@hcl-software/enchanted-icons-react/carbon/es/arrow--right';
import { Button, ButtonColor, ButtonSize, ButtonVariant } from './Button';

/**
 * Values of an `as const` object. Storybook's docgen plugin adds `displayName` (a string) and
 * `__docgenInfo` (an object) to these exports, and `Object.values` would return both as extra values.
 */
const values = <T extends Record<string, string>>(options: T): T[keyof T][] =>
  Object.entries(options)
    .filter(([key]) => key !== 'displayName' && key !== '__docgenInfo')
    .map(([, value]) => value as T[keyof T]);

/** Lays buttons out in a wrapping row with space between them. */
const Row = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'calc(var(--padding-sm) * 2)' }}>
    {children}
  </div>
);

/**
 * Paints the dark inverse canvas behind the Inverse story. In the canvas it fills the whole preview page;
 * in the docs page it only fills a box around the story, so the other stories stay on the normal page.
 * The token is the same near-black in light and dark mode, so the story reads in both.
 */
const InverseBackground = ({ fullPage, children }: { fullPage: boolean; children: ReactNode }) => {
  // No dependency list on purpose: the preview repaints `body` when the theme changes, so this reapplies after it.
  useEffect(() => {
    if (!fullPage) return undefined;
    const { body } = document;
    const previous = body.style.background;
    body.style.background = 'var(--color-background-canvas-inverse)';
    return () => {
      body.style.background = previous;
    };
  });
  return fullPage ? (
    <>{children}</>
  ) : (
    <div
      style={{
        display: 'inline-flex',
        padding: 'calc(var(--padding-sm) * 3)',
        borderRadius: 'var(--corner-radius-md)',
        background: 'var(--color-background-canvas-inverse)',
      }}
    >
      {children}
    </div>
  );
};

const meta = {
  title: 'Components/Inputs/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Button' },
  argTypes: {
    variant: { control: 'select', options: values(ButtonVariant) },
    color: { control: 'select', options: values(ButtonColor) },
    size: { control: 'select', options: values(ButtonSize) },
    // Icons are ReactNode props, which have no useful control.
    startIcon: { control: false },
    endIcon: { control: false },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A filled brand button with a text label. Start here: it is the default for the main action of a view. */
export const Default: Story = {};

/** `contained` for the primary action of a view, `outlined` for secondary actions, `text` for low-emphasis actions. */
export const Variants: Story = {
  render: (args) => (
    <Row>
      {values(ButtonVariant).map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </Row>
  ),
};

/** `brand` for normal actions, `neutral` for quiet ones, `error` for destructive or failed actions. */
export const Colors: Story = {
  render: (args) => (
    <Row>
      {values(ButtonColor).map((color) => (
        <Button key={color} {...args} color={color}>
          {color}
        </Button>
      ))}
    </Row>
  ),
};

/**
 * `medium` is the default, `small` suits dense layouts, and `extraSmall` is for inline actions next
 * to field labels. Figma defines `extraSmall` for the `text` variant only, so all sizes render as text.
 */
export const Sizes: Story = {
  args: { variant: ButtonVariant.Text },
  render: (args) => (
    <Row>
      {values(ButtonSize).map((size) => (
        <Button key={size} {...args} size={size}>
          {size}
        </Button>
      ))}
    </Row>
  ),
};

/** Use `pressed` to turn the button into a toggle. `true` shows it switched on and sets `aria-pressed`. */
export const Pressed: Story = { args: { pressed: true } };

/** Use `disabled` when the action is unavailable. The button cannot be focused or clicked. */
export const Disabled: Story = { args: { disabled: true } };

/** Use `inverse` on a dark or colored background, where the default colors would not stay readable. */
export const Inverse: Story = {
  args: { inverse: true },
  decorators: [
    (Story, { viewMode }) => (
      <InverseBackground fullPage={viewMode === 'story'}>
        <Story />
      </InverseBackground>
    ),
  ],
};

/** Use `startIcon` to reinforce the action with an icon before the label, such as Add for a create action. */
export const WithStartIcon: Story = { args: { startIcon: <AddIcon /> } };

/** Use `endIcon` for actions that move forward or open something, such as a next step. */
export const WithEndIcon: Story = { args: { endIcon: <ArrowRightIcon /> } };

/**
 * Every variant, color and size combination, for visual regression review. Not documentation: learn
 * from the axis stories above. One table per variant, with colors as rows and sizes as columns.
 * `extraSmall` is defined for the `text` variant only, so its cells are empty for the others.
 */
export const AllVariants: Story = {
  tags: ['visual'],
  render: (args) => {
    const sizes = values(ButtonSize);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(var(--padding-sm) * 4)' }}>
        {values(ButtonVariant).map((variant) => (
          <div
            key={variant}
            style={{
              display: 'grid',
              gridTemplateColumns: `max-content repeat(${sizes.length}, max-content)`,
              alignItems: 'center',
              justifyItems: 'start',
              gap: `calc(var(--padding-sm) * 2) calc(var(--padding-sm) * 3)`,
            }}
          >
            <strong>{variant}</strong>
            {sizes.map((size) => (
              <span key={size}>{size}</span>
            ))}
            {values(ButtonColor).map((color) => (
              <Fragment key={color}>
                <span>{color}</span>
                {sizes.map((size) =>
                  size === ButtonSize.ExtraSmall && variant !== ButtonVariant.Text ? (
                    <span key={size} />
                  ) : (
                    <Button key={size} {...args} variant={variant} color={color} size={size}>
                      Button
                    </Button>
                  ),
                )}
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    );
  },
};
