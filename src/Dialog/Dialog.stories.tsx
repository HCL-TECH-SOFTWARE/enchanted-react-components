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

import Dialog from './Dialog';
import Button from '../Button';
import Typography from '../Typography';

export default {
  title: 'Feedback/Dialog',
  component: Dialog,
  argTypes: {
    size: {
      description: 'Sets max-width of Dialog',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: 'XS',
        },
      },
    },
    withPadding: {
      description: 'Adds default padding of 12px all around DialogContent if set to `true`',
      if: { arg: 'interactive' },
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    onClose: {
      description: 'Callback fired when the component requests to be closed.',
      if: { arg: 'interactive' },
    },
    headerChildren: {
      description: 'Node to render inside DialogTitle',
      if: { arg: 'interactive' },
    },
    contentChildren: {
      description: 'Node to render inside DialogContent',
      if: { arg: 'interactive' },
    },
    footerChildren: {
      description: 'Node to render inside DialogActions',
      if: { arg: 'interactive' },
    },
    hideHeader: {
      description: 'Toggles header or DialogTitle, if `true`, then it is hidden',
      if: { arg: 'interactive' },
    },
    hideFooter: {
      description: 'Toggles footer or DialogActions, if `true`, then it is hidden',
      if: { arg: 'interactive' },
    },
  },
} as Meta<typeof Dialog>;

const VisualTestTemplate: StoryFn<typeof Dialog> = (args) => {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        hideHeader={false}
        hideFooter={false}
        headerChildren={(
          <Typography variant="body1">Label</Typography>
        )}
        // Should show placeholder (if undefined) according to Figma file, leaving this commented-out example contentChildren arg value as guide
        // contentChildren: <Typography variant="body1">{'Sample Content'}</Typography>,
        footerChildren={(
          <>
            <Button variant="text" aria-label="cancel" onClick={handleClose}>Cancel</Button>
            <Button variant="outlined">Button</Button>
            <Button variant="contained">Button</Button>
          </>
        )}
      />
    </div>
  );
};

const InteractiveExampleTemplate: StoryFn<typeof Dialog> = (args) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        {...args}
        open={open}
        onClose={handleClose}
        footerChildren={(
          <>
            <Button variant="text" aria-label="cancel" onClick={handleClose}>Cancel</Button>
            {args.footerChildren}
          </>
        )}
      />
    </div>
  );
};

export const InteractiveExample = InteractiveExampleTemplate.bind({});
InteractiveExample.parameters = {
  options: { showPanel: true },
};
InteractiveExample.args = {
  // @ts-ignore - this attribute is need to disable all controls in the InteractiveExample, but this attribute is not part of the DialogProps
  interactive: true,
  ...Dialog.defaultProps,
  // In MUI5, DialogTitle is constricted to having parent Typography h2 at the title root.
  // Hence, you might encounter validateDOMnesting warning such as `<h6> cannot appear as a child of <h2>` if you some typography variants.
  // Currently, please use body1 as variant, at least until we upgrade to MUI6. Open Github issue found here: https://github.com/mui/material-ui/issues/11557
  // For Dialog.tsx implementation, the first Typography inside DialogTitle will be styled as h6 according to Figma design anyway, so this shouldn't matter except to avoid console warning.
  headerChildren: (
    <>
      <Typography variant="body1">Label</Typography>
      {
        // Sample implementation of adding more text under Label - display block should be handled by MUI Grid
        // <Typography variant="body1">{'More text'}</Typography>
      }
    </>
  ),
  // Should show placeholder (if undefined) according to Figma file, leaving this commented-out example contentChildren arg value as guide
  // contentChildren: <Typography variant="body1">{'Sample Content'}</Typography>,
  footerChildren: (
    <>
      <Button variant="outlined">Button</Button>
      <Button variant="contained">Button</Button>
    </>
  ),
};

export const VisualTest = VisualTestTemplate.bind({});
VisualTest.parameters = {
  options: { showPanel: false },
};
VisualTestTemplate.args = {
};
