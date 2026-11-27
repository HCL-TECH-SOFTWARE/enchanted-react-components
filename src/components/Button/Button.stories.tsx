import { Fragment } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import AddIcon from '@hcl-software/enchanted-icons-react/carbon/es/add';
import ArrowRightIcon from '@hcl-software/enchanted-icons-react/carbon/es/arrow--right';
import { Button, ButtonColor, ButtonSize, ButtonVariant } from './Button';

/**
 * Extract enum values from const objects while filtering out Storybook's injected metadata
 * (`displayName` and `__docgenInfo`).
 */
const getEnumValues = <T extends Record<string, string>>(options: T): T[keyof T][] =>
  Object.entries(options)
    .filter(([key]) => key !== 'displayName' && key !== '__docgenInfo')
    .map(([, value]) => value as T[keyof T]);

const meta = {
  title: 'Components/Inputs/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Button' },
  argTypes: {
    variant: { control: 'select', options: getEnumValues(ButtonVariant) },
    color: { control: 'select', options: getEnumValues(ButtonColor) },
    size: { control: 'select', options: getEnumValues(ButtonSize) },
    icon: { control: false },
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
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'calc(var(--padding-sm) * 2)' }}>
      {getEnumValues(ButtonVariant).map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

/** `brand` for normal actions, `neutral` for quiet ones, `error` for destructive or failed actions. */
export const Colors: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'calc(var(--padding-sm) * 2)' }}>
      {getEnumValues(ButtonColor).map((color) => (
        <Button key={color} {...args} color={color}>
          {color}
        </Button>
      ))}
    </div>
  ),
};

/**
 * `medium` is the default, `small` suits dense layouts, and `extraSmall` is for inline actions next
 * to field labels. Figma defines `extraSmall` for the `text` variant only, so all sizes render as text.
 */
export const Sizes: Story = {
  args: { variant: ButtonVariant.Text },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'calc(var(--padding-sm) * 2)' }}>
      {getEnumValues(ButtonSize).map((size) => (
        <Button key={size} {...args} size={size}>
          {size}
        </Button>
      ))}
    </div>
  ),
};

/** Use `pressed` to turn the button into a toggle. `true` shows it switched on and sets `aria-pressed`. */
export const Pressed: Story = { args: { pressed: true } };

/** Use `disabled` when the action is unavailable. The button cannot be focused or clicked. */
export const Disabled: Story = { args: { disabled: true } };

/** Use `inverse` on a dark or colored background, where the default colors would not stay readable. */
export const Inverse: Story = { args: { inverse: true } };

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
    const sizes = getEnumValues(ButtonSize);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(var(--padding-sm) * 4)' }}>
        {getEnumValues(ButtonVariant).map((variant) => (
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
            {getEnumValues(ButtonColor).map((color) => (
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

/** Use `iconButton` to display only an icon in a square button (36×36px). The icon is required and `aria-label` must be provided for accessibility. */
export const IconButton: Story = {
  args: { iconButton: true, icon: <AddIcon />, 'aria-label': 'Add' },
};

/**
 * Every variant, color and size combination for icon buttons, for visual regression review. Not documentation: learn
 * from the axis stories above. One table per variant, with colors as rows and sizes as columns.
 * Icon buttons support only `medium` and `small` sizes (36×36px and 24×24px).
 */
export const AllIconButtonVariants: Story = {
  tags: ['visual'],
  render: (args) => {
    const sizes = [ButtonSize.Medium, ButtonSize.Small];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(var(--padding-sm) * 4)' }}>
        {getEnumValues(ButtonVariant).map((variant) => (
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
            {getEnumValues(ButtonColor).map((color) => (
              <Fragment key={color}>
                <span>{color}</span>
                {sizes.map((size) => (
                  <Button key={size} {...args} variant={variant} color={color} size={size} iconButton icon={<AddIcon />} aria-label="Add" />
                ))}
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    );
  },
};
