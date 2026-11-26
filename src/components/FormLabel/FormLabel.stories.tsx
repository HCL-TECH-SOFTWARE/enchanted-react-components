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

import { useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field } from '@base-ui/react/field';
import { FormLabel } from './FormLabel';

/** Lays labels out in a wrapping row with space between them. */
const Row = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 'calc(var(--padding-sm) * 3)' }}>
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
  title: 'Components/Inputs/FormLabel',
  component: FormLabel,
  tags: ['autodocs'],
  args: { label: 'Label', style: { width: 'calc(var(--padding-md) * 20)' } },
  decorators: [
    (Story) => (
      <Field.Root>
        <Story />
      </Field.Root>
    ),
  ],
  argTypes: {
    // A slot is a ReactNode prop, which has no useful control.
    helpIcon: { control: false },
    actions: { control: false },
  },
} satisfies Meta<typeof FormLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The label above a form control. Start here: every other story changes one thing about it. */
export const Default: Story = {};

/** `required` adds an asterisk after the label. It is decoration; set `required` on the form control too. Figma `required`. */
export const Required: Story = { args: { required: true } };

/** `invalid` switches the label to the error color. Pair it with `showErrorIcon` for a warning icon. Figma `invalid`. */
export const Invalid: Story = { args: { invalid: true, showErrorIcon: true } };

/** `disabled` dims the label and helper text. Figma `disabled`. */
export const Disabled: Story = { args: { disabled: true, helperText: 'Helper text' } };

/** Use `inverse` on a dark or colored background, where the default colors would not stay readable. Figma `inverse`. */
export const Inverse: Story = {
  args: { inverse: true, helperText: 'Helper text' },
  decorators: [
    (Story, { viewMode }) => (
      <InverseBackground fullPage={viewMode === 'story'}>
        <Story />
      </InverseBackground>
    ),
  ],
};

/** Supporting text under the label, for context the label alone cannot give. Figma `helperText`. */
export const WithHelperText: Story = { args: { helperText: 'Helper text' } };

/** `showHelpIcon` shows a help icon next to the label; pass `helpIcon` to swap in a button that opens a tooltip. Figma `showHelpIcon`. */
export const WithHelpIcon: Story = { args: { showHelpIcon: true } };

/** `actions` puts a link or text button at the end of the row, such as "Forgot password". Figma `showActionButton`. */
export const WithAction: Story = { args: { showActionButton: true, actions: <span>Action</span> } };

/** `showErrorIcon` shows a warning icon at the end of the row, for a field that failed validation. Figma `showErrorIcon`. */
export const WithErrorIcon: Story = { args: { showErrorIcon: true, invalid: true } };

/**
 * The label names the control and takes the focus color while the control has focus. Every story is
 * wrapped in a Base UI `Field.Root`, which FormLabel requires; this one adds an input to click into.
 */
export const WithControl: Story = {
  decorators: [
    (Story) => (
      <>
        <Story />
        <Field.Control placeholder="Placeholder" />
      </>
    ),
  ],
};

/**
 * Every state and option in the default and inverse colors, for visual regression review. Not
 * documentation: learn from the stories above. The focus color is checked by hand in `WithControl`.
 */
export const AllVariants: Story = {
  tags: ['visual'],
  render: (args) => {
    const all = (inverse: boolean) => (
      <Row>
        <FormLabel {...args} inverse={inverse} />
        <FormLabel {...args} inverse={inverse} required />
        <FormLabel {...args} inverse={inverse} invalid showErrorIcon />
        <FormLabel {...args} inverse={inverse} disabled helperText="Helper text" />
        <FormLabel {...args} inverse={inverse} helperText="Helper text" />
        <FormLabel {...args} inverse={inverse} showHelpIcon />
        <FormLabel {...args} inverse={inverse} showActionButton actions={<span>Action</span>} />
      </Row>
    );
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(var(--padding-sm) * 4)' }}>
        {all(false)}
        <div style={{ padding: 'calc(var(--padding-sm) * 3)', background: 'var(--color-background-canvas-inverse)' }}>
          {all(true)}
        </div>
      </div>
    );
  },
};
