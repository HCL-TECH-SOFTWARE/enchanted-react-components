/* ======================================================================== *
 * Copyright 2024 HCL America Inc.                                          *
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
import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import IconPhone from '@hcl-software/enchanted-icons/dist/carbon/es/phone';
import UserAvatar from '@hcl-software/enchanted-icons/dist/carbon/es/user--avatar';
import CloseIcon from '@hcl-software/enchanted-icons/dist/carbon/es/close';
import { Grid } from '@mui/material';
import Chip, { ChipVariants } from './Chip';
import { AvatarTypes } from '../Avatar';
import Typography from '../Typography';

export default {
  title: 'Data display/Chip',
  component: Chip,
  argTypes: {
    variant: {
      if: { arg: 'interactive' },
      options: [ChipVariants.CONTAINED, ChipVariants.OUTLINED],
      description: 'Changes background and border of Chip',
      table: {
        defaultValue: {
          summary: ChipVariants.CONTAINED,
        },
      },
    },
    color: {
      if: { arg: 'interactive' },
      description: 'The color of the component. It supports both default and custom theme colors, which can be added as shown in the palette customization guide.',
      options: ['default'],
      control: { type: 'radio' },
    },
    hideTrailingIcon: {
      if: { arg: 'interactive' },
      description: 'Toggles visibility of trailing icon, only for Storybook use',
    },
    selected: {
      if: { arg: 'interactive' },
      description: 'Toggles selected state for Storybook use only - adds :active state to component root',
    },
    leadingavatartype: {
      if: { arg: 'interactive' },
      options: [AvatarTypes.IMAGE, AvatarTypes.LETTER, AvatarTypes.ICON, 'none'],
      control: { type: 'radio' },
      table: {
        defaultValue: {
          summary: 'none',
        },
      },
      description: 'Determines type of avatar to show. If `image`, leadingImage must be defined. If `letter`, leadingLetter must be defined. If `icon`, leadingIcon must be defined.',
    },
    disabled: {
      if: { arg: 'interactive' },
      description: 'disables the Chip component',
    },
    leadingLetter: {
      if: { arg: 'interactive' },
      description: 'Letters (max 2 - see Avatar documentation) to render as avatar of type string',
    },
    leadingImage: {
      if: { arg: 'interactive' },
      description: 'Image to render as avatar using src of type string',
    },
    leadingImageAlt: {
      if: { arg: 'interactive' },
      description: 'String to define the img tag attribute `alt`',
      table: {
        defaultValue: {
          summary: '',
        },
      },
    },
    focus: {
      if: { arg: 'interactive' },
      description: 'Toggles focus state for Storybook use only - adds :focus state to component root',
      control: { type: 'radio' },
      options: [0, 1],
    },
    label: {
      if: { arg: 'interactive' },
      description: 'label of the Chip component,',
    },
    leadingIcon: {
      control: false,
      description: 'Types of Avatar that can be set as image, letter or icon',
    },
    size: {
      control: false,
      description: 'https://mui.com/material-ui/api/chip/#chip-prop-size',
    },
    leadingImageProps: {
      control: false,
      description: 'ImgHTMLAttributes that will be passed by the Chip down to its Avatar child. See Avatar documentation - imgProps',
    },
    trailingIcon: {
      control: false,
      description: 'Used to override the icon that may be clicked at the end of the chip. Common use case is for deleting the chip. If onDeleteFunc is null, this will be automatically hidden.',
    },
    onDeleteFunc: {
      control: false,
      description: 'Callback fired when trailing icon is clicked. If undefined, it will hide trailing icon',
    },
    icon: {
      control: false,
      description: 'https://mui.com/material-ui/api/chip/#chip-prop-icon',
    },
    avatar: {
      control: false,
      description: 'https://mui.com/material-ui/api/chip/#chip-prop-avatar',
    },
    deleteIcon: {
      control: false,
      description: 'https://mui.com/material-ui/api/chip/#chip-prop-deleteIcon',
    },
    clickable: {
      control: false,
      description: 'https://mui.com/material-ui/api/chip/#chip-prop-clickable',
    },
    children: {
      control: false,
      description: 'https://mui.com/material-ui/api/chip/#chip-prop-children',
    },
    classes: {
      control: false,
      description: 'https://mui.com/material-ui/api/chip/#chip-prop-classes',
    },
    onDelete: {
      control: false,
      description: 'https://mui.com/material-ui/api/chip/#chip-prop-onDelete',
    },
    sx: {
      control: false,
      description: 'https://mui.com/material-ui/api/chip/#chip-prop-sx',
    },
    ref: {
      control: false,
      description: 'https://mui.com/material-ui/api/chip/',
    },
  },
} as Meta<typeof Chip>;

const VisualTestTemplate: StoryFn<typeof Chip> = (args) => {
  return (
    <Grid container spacing={5} direction="row">
      <Grid item>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Chip Contained
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Default
            </Typography>
            <Chip
              color="default"
              label="Chip"
              leadingavatartype="none"
              leadingIcon={<UserAvatar />}
              leadingLetter="A"
              leadingImage="checker.png"
              icon={<IconPhone />}
              trailingIcon={<CloseIcon />}
              hideTrailingIcon={false}
              selected={false}
              focus={0}
            />
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Chip avatar Image
            </Typography>
            <Chip
              color="default"
              label="Chip"
              leadingavatartype={AvatarTypes.IMAGE}
              leadingIcon={<UserAvatar />}
              leadingLetter="A"
              leadingImage="checker.png"
              icon={<IconPhone />}
              trailingIcon={<CloseIcon />}
              hideTrailingIcon={false}
              selected={false}
              focus={0}
            />
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Chip Avatar Letter
            </Typography>
            <Chip
              color="default"
              label="Chip"
              leadingavatartype={AvatarTypes.LETTER}
              leadingIcon={<UserAvatar />}
              leadingLetter="A"
              leadingImage="checker.png"
              icon={<IconPhone />}
              trailingIcon={<CloseIcon />}
              hideTrailingIcon={false}
              selected={false}
              focus={0}
            />
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Chip Avatar Icon
            </Typography>
            <Chip
              color="default"
              label="Chip"
              leadingavatartype={AvatarTypes.ICON}
              leadingIcon={<UserAvatar />}
              leadingLetter="A"
              leadingImage="checker.png"
              icon={<IconPhone />}
              trailingIcon={<CloseIcon />}
              hideTrailingIcon={false}
              selected={false}
              focus={0}
            />
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Chip Selected
            </Typography>
            <Chip
              color="default"
              label="Chip"
              leadingavatartype="none"
              leadingIcon={<UserAvatar />}
              leadingLetter="A"
              leadingImage="checker.png"
              icon={<IconPhone />}
              trailingIcon={<CloseIcon />}
              hideTrailingIcon={false}
              selected
              focus={0}
            />
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Chip Disabled
            </Typography>
            <Chip
              color="default"
              label="Chip"
              leadingavatartype="none"
              leadingIcon={<UserAvatar />}
              leadingLetter="A"
              leadingImage="checker.png"
              icon={<IconPhone />}
              trailingIcon={<CloseIcon />}
              hideTrailingIcon={false}
              selected={false}
              focus={0}
              disabled
            />
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Chip Focus
            </Typography>
            <Chip
              color="default"
              label="Chip"
              leadingavatartype="none"
              leadingIcon={<UserAvatar />}
              leadingLetter="A"
              leadingImage="checker.png"
              icon={<IconPhone />}
              trailingIcon={<CloseIcon />}
              hideTrailingIcon={false}
              selected={false}
              focus={1}
              disabled={false}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Chip Outlined
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Default
            </Typography>
            <Chip
              color="default"
              label="Chip"
              leadingavatartype="none"
              leadingIcon={<UserAvatar />}
              leadingLetter="A"
              leadingImage="checker.png"
              icon={<IconPhone />}
              trailingIcon={<CloseIcon />}
              hideTrailingIcon={false}
              selected={false}
              focus={0}
              variant={ChipVariants.OUTLINED}
            />
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Chip avatar Image
            </Typography>
            <Chip
              color="default"
              label="Chip"
              leadingavatartype={AvatarTypes.IMAGE}
              leadingIcon={<UserAvatar />}
              leadingLetter="A"
              leadingImage="checker.png"
              icon={<IconPhone />}
              trailingIcon={<CloseIcon />}
              hideTrailingIcon={false}
              selected={false}
              focus={0}
              variant={ChipVariants.OUTLINED}
            />
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Chip Avatar Letter
            </Typography>
            <Chip
              color="default"
              label="Chip"
              leadingavatartype={AvatarTypes.LETTER}
              leadingIcon={<UserAvatar />}
              leadingLetter="A"
              leadingImage="checker.png"
              icon={<IconPhone />}
              trailingIcon={<CloseIcon />}
              hideTrailingIcon={false}
              selected={false}
              focus={0}
              variant={ChipVariants.OUTLINED}
            />
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Chip Avatar Icon
            </Typography>
            <Chip
              color="default"
              label="Chip"
              leadingavatartype={AvatarTypes.ICON}
              leadingIcon={<UserAvatar />}
              leadingLetter="A"
              leadingImage="checker.png"
              icon={<IconPhone />}
              trailingIcon={<CloseIcon />}
              hideTrailingIcon={false}
              selected={false}
              focus={0}
              variant={ChipVariants.OUTLINED}
            />
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Chip Selected
            </Typography>
            <Chip
              color="default"
              label="Chip"
              leadingavatartype="none"
              leadingIcon={<UserAvatar />}
              leadingLetter="A"
              leadingImage="checker.png"
              icon={<IconPhone />}
              trailingIcon={<CloseIcon />}
              hideTrailingIcon={false}
              selected
              focus={0}
              variant={ChipVariants.OUTLINED}
            />
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Chip Disabled
            </Typography>
            <Chip
              color="default"
              label="Chip"
              leadingavatartype="none"
              leadingIcon={<UserAvatar />}
              leadingLetter="A"
              leadingImage="checker.png"
              icon={<IconPhone />}
              trailingIcon={<CloseIcon />}
              hideTrailingIcon={false}
              selected={false}
              focus={0}
              disabled
              variant={ChipVariants.OUTLINED}
            />
          </Grid>
          <Grid item>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.60);' }} variant="body1">
              Chip Focus
            </Typography>
            <Chip
              color="default"
              label="Chip"
              leadingavatartype="none"
              leadingIcon={<UserAvatar />}
              leadingLetter="A"
              leadingImage="checker.png"
              icon={<IconPhone />}
              trailingIcon={<CloseIcon />}
              hideTrailingIcon={false}
              selected={false}
              focus={1}
              disabled={false}
              variant={ChipVariants.OUTLINED}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const InteractiveExampleTemplate: StoryFn<typeof Chip> = (args) => { return <Chip {...args} />; };
export const InteractiveExample = InteractiveExampleTemplate.bind({});
InteractiveExample.parameters = {
  options: { showPanel: true },
};
InteractiveExample.args = {
  ...Chip.defaultProps,
  // @ts-ignore - this attribute is need to disable all controls in the InteractiveExample, but this attribute is not part of the ChipsProps
  interactive: true,
  color: 'default',
  label: 'Chip',
  leadingavatartype: 'none',
  leadingIcon: <UserAvatar />,
  leadingLetter: 'A',
  leadingImage: 'checker.png',
  icon: <IconPhone />,
  trailingIcon: <CloseIcon />,
  // eslint-why sample callback
  // eslint-disable-next-line no-console
  onDeleteFunc: () => { console.log('Delete chip'); },
  hideTrailingIcon: false,
  selected: false,
  focus: 0,
};

export const VisualTest = VisualTestTemplate.bind({});
VisualTest.parameters = {
  options: { showPanel: false },
};
VisualTest.args = {
  color: 'default',
  label: 'Chip',
  leadingavatartype: 'none',
  leadingIcon: <UserAvatar />,
  leadingLetter: 'A',
  leadingImage: 'checker.png',
  icon: <IconPhone />,
  trailingIcon: <CloseIcon />,
  // eslint-why sample callback
  // eslint-disable-next-line no-console
  onDeleteFunc: () => { console.log('Delete chip'); },
  hideTrailingIcon: false,
  selected: false,
  focus: 0,
};
