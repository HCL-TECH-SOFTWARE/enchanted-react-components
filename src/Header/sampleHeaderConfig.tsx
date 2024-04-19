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
import { InputAdornment, FormControl } from '@mui/material';
import IconCrop from '@hcl-software/enchanted-icons/dist/carbon/es/crop';
import IconRotateCounterClockwise from '@hcl-software/enchanted-icons/dist/carbon/es/rotate--counterclockwise';
import IconRotateClockwise from '@hcl-software/enchanted-icons/dist/carbon/es/rotate--clockwise';
import IconDataShare from '@hcl-software/enchanted-icons/dist/carbon/es/data-share';
import IconCaretDown from '@hcl-software/enchanted-icons/dist/carbon/es/caret--down';
import IconUpload from '@hcl-software/enchanted-icons/dist/carbon/es/upload';
import IconSearch from '@hcl-software/enchanted-icons/dist/carbon/es/search';
import IconFilter from '@hcl-software/enchanted-icons/dist/carbon/es/filter';
import IconSettings from '@hcl-software/enchanted-icons/dist/carbon/es/settings';
import IconColumn from '@hcl-software/enchanted-icons/dist/carbon/es/column';
import IconUndo from '@hcl-software/enchanted-icons/dist/carbon/es/undo';
import IconRedo from '@hcl-software/enchanted-icons/dist/carbon/es/redo';
import IconDocumentTasks from '@hcl-software/enchanted-icons/dist/carbon/es/document--tasks';
import IconFolder from '@hcl-software/enchanted-icons/dist/carbon/es/folder';
import IconStar from '@hcl-software/enchanted-icons/dist/carbon/es/star';
import FormControlLabel from '../prerequisite_components/FormControlLabel';
import IconButton from '../IconButton';
import Avatar from '../Avatar';
import Button, { ButtonVariants } from '../Button';
import Switch from '../Switch';
import { HeaderProps } from './Header';
import TextField from '../TextField';

// Samples for CC
export const sampleContentComposerOverview: Partial<HeaderProps> = {
  startSection: {
    hamburgerSpace: false,
    title: 'Content',
    subtitle: '120 items',
  },
  endSection: [
    <Button {...Button.defaultProps} variant={ButtonVariants.CONTAINED} endIcon={<IconCaretDown />}>Create</Button>,
    <TextField
      hiddenLabel
      sx={{
        borderRadius: '2px',
      }}
      InputProps={{
        startAdornment: <InputAdornment position="start"><IconSearch /></InputAdornment>,
      }}
      placeholder="Search for content and templates"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          /* eslint-why sample handler only */
          /* eslint-disable-next-line no-console */
          console.log(e.currentTarget.querySelector('input')?.value);
        }
      }}
    />,
    <IconButton {...IconButton.defaultProps}><IconFilter /></IconButton>,
    <Button {...Button.defaultProps} variant={ButtonVariants.TEXT} startIcon={<IconColumn />} endIcon={<IconCaretDown />}>Recently added</Button>,
    <IconButton {...IconButton.defaultProps}><IconSettings /></IconButton>,
  ],
};

export const sampleContentComposerSearchResults: Partial<HeaderProps> = {
  startSection: {
    hamburgerSpace: false,
    withBackButton: true,
    title: 'Search results',
    subtitle: '120 items',
  },
  endSection: [
    <Button {...Button.defaultProps} variant={ButtonVariants.CONTAINED} endIcon={<IconCaretDown />}>Create</Button>,
    <TextField
      hiddenLabel
      sx={{
        borderRadius: '2px',
      }}
      InputProps={{
        startAdornment: <InputAdornment position="start"><IconSearch /></InputAdornment>,
      }}
      placeholder="Search for content and templates"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          /* eslint-why sample handler only */
          /* eslint-disable-next-line no-console */
          console.log(e.currentTarget.querySelector('input')?.value);
        }
      }}
    />,
    <IconButton {...IconButton.defaultProps}><IconFilter /></IconButton>,
    <Button {...Button.defaultProps} variant={ButtonVariants.TEXT} startIcon={<IconColumn />} endIcon={<IconCaretDown />}>Recently added</Button>,
    <IconButton {...IconButton.defaultProps}><IconSettings /></IconButton>,
  ],
};

export const sampleContentComposerItemPage: Partial<HeaderProps> = {
  startSection: {
    hamburgerSpace: false,
    withBackButton: true,
    avatar: <Avatar {...Avatar.defaultProps} variant="rounded" iconImage={<IconFolder />} />,
    title: 'Untitled',
    favoritesToggleIcon: <IconStar />,
  },
  endSection: [
    <FormControl>
      <FormControlLabel value="Edit mode" control={<Switch sx={{ margin: '0px 12px 0px 12px' }} />} label="Label" />
    </FormControl>,
    <IconDocumentTasks sx={{ color: (theme) => { return theme.palette.success.main; }, marginRight: '-12px' }} />,
    <Button
      {...Button.defaultProps}
      variant={ButtonVariants.TEXT}
      endIcon={<IconCaretDown />}
      sx={(theme) => { return { ...theme.typography.body2, color: theme.palette.text.primary }; }}
    >
      Published
    </Button>,
    <Button {...Button.defaultProps} variant={ButtonVariants.OUTLINED} endIcon={<IconCaretDown />}>More</Button>,
    <Button {...Button.defaultProps} variant={ButtonVariants.CONTAINED} endIcon={<IconCaretDown />}>Save</Button>,
  ],
};

// Samples for DAM
export const sampleDigitalAssetManagerOverview: Partial<HeaderProps> = {
  startSection: {
    hamburgerSpace: false,
    title: 'Assets',
    subtitle: '120 items',
  },
  endSection: [
    <Button {...Button.defaultProps} variant={ButtonVariants.CONTAINED} startIcon={<IconUpload />}>Upload</Button>,
    <TextField
      hiddenLabel
      sx={{
        borderRadius: '2px',
      }}
      InputProps={{
        startAdornment: <InputAdornment position="start"><IconSearch /></InputAdornment>,
      }}
      placeholder="Search for assets and collections"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          /* eslint-why sample handler only */
          /* eslint-disable-next-line no-console */
          console.log(e.currentTarget.querySelector('input')?.value);
        }
      }}
    />,
    <IconButton {...IconButton.defaultProps}><IconFilter /></IconButton>,
    <Button {...Button.defaultProps} variant={ButtonVariants.TEXT} startIcon={<IconColumn />} endIcon={<IconCaretDown />}>Recently added</Button>,
    <IconButton {...IconButton.defaultProps}><IconSettings /></IconButton>,
  ],
};

export const sampleDigitalAssetManagerItemPage: Partial<HeaderProps> = {
  startSection: {
    hamburgerSpace: false,
    withBackButton: true,
    avatar: <Avatar {...Avatar.defaultProps} variant="rounded" iconImage={<IconFolder />} />,
    title: 'Untitled.jpg',
    favoritesToggleIcon: <IconStar />,
  },
  middleSection: [
    <IconButton {...IconButton.defaultProps}>
      <IconCrop />
    </IconButton>,
    <IconButton {...IconButton.defaultProps}>
      <IconRotateCounterClockwise />
    </IconButton>,
    <IconButton {...IconButton.defaultProps}>
      <IconRotateClockwise />
    </IconButton>,
    <IconButton {...IconButton.defaultProps}>
      <IconDataShare />
    </IconButton>,
  ],
  endSection: [
    <IconButton {...IconButton.defaultProps}>
      <IconUndo />
    </IconButton>,
    <IconButton {...IconButton.defaultProps}>
      <IconRedo />
    </IconButton>,
    <Button {...Button.defaultProps} variant={ButtonVariants.OUTLINED} endIcon={<IconCaretDown />}>More</Button>,
    <Button {...Button.defaultProps} variant={ButtonVariants.CONTAINED} endIcon={<IconCaretDown />}>Save</Button>,
  ],
};

export const sampleDigitalAssetManagerSearchResults: Partial<HeaderProps> = {
  startSection: {
    hamburgerSpace: false,
    withBackButton: true,
    title: 'Search results',
    subtitle: '120 items',
  },
  endSection: [
    <Button {...Button.defaultProps} variant={ButtonVariants.CONTAINED} startIcon={<IconUpload />}>Upload</Button>,
    <TextField
      hiddenLabel
      sx={{
        borderRadius: '2px',
      }}
      InputProps={{
        startAdornment: <InputAdornment position="start"><IconSearch /></InputAdornment>,
      }}
      placeholder="Search for assets and collections"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          /* eslint-why sample handler only */
          /* eslint-disable-next-line no-console */
          console.log(e.currentTarget.querySelector('input')?.value);
        }
      }}
    />,
    <IconButton {...IconButton.defaultProps}><IconFilter /></IconButton>,
    <Button {...Button.defaultProps} variant={ButtonVariants.TEXT} startIcon={<IconColumn />} endIcon={<IconCaretDown />}>Recently added</Button>,
    <IconButton {...IconButton.defaultProps}><IconSettings /></IconButton>,
  ],
};

// Samples for Content Reporting
export const sampleContentReportingOverview: Partial<HeaderProps> = {
  startSection: {
    hamburgerSpace: false,
    title: 'Reporting',
    subtitle: '120 items',
  },
  endSection: [
    <Button {...Button.defaultProps} variant={ButtonVariants.TEXT}>View(#)</Button>,
    <Button {...Button.defaultProps} variant={ButtonVariants.CONTAINED}>Update</Button>,
    <Button {...Button.defaultProps} variant={ButtonVariants.CONTAINED} startIcon={<IconUpload />}>Export</Button>,
  ],
};

export const sampleContentReportingUpdates: Partial<HeaderProps> = {
  startSection: {
    hamburgerSpace: false,
    withBackButton: true,
    title: 'Updates',
    subtitle: '120 items',
  },
};
