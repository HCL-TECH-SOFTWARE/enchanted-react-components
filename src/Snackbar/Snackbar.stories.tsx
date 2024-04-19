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
import ChevronDownIcon from '@hcl-software/enchanted-icons/dist/carbon/es/chevron--down';
import Snackbar, { SnackbarVariants } from './Snackbar';
import SnackbarContainer from './SnackbarContainer';
import { CircularProgressVariants } from '../ProgressIndicator/CircularProgress';

export default {
  title: 'Feedback/Snackbar',
  component: Snackbar,
  parameters: {
    docs: {
      story: { height: '200px', inline: true },
    },
  },
  argTypes: {
    variant: {
      description: 'The variant to use that will determine leading icon in snackbar.',
      table: {
        defaultValue: {
          summary: 'information',
        },
      },
    },
    showStackSnackbar: {
      description: 'Show multiple snackbar in stack when true, this is for testing purpose only and and not an actual property of Snackbar.',
      control: 'boolean',
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    disabledSnackbar: {
      description: 'Renders snackbar buttons as disabled',
    },
    buttonText: {
      description:
        'Text to show inside action Button. If empty string or no corresponding buttonAction function, it will hide itself.',
      default: 'Button',
    },
    buttonAction: {
      description: 'Callback fired when action Button is clicked.',
    },
    onClose: {
      description:
        // eslint-why Seems appropriate to include full description from MUIv5 API so users understand this better
        // eslint-disable-next-line max-len
        'Callback fired when the component requests to be closed. Typically onClose is used to set state in the parent component, which is used to control the Snackbar open prop. The reason parameter can optionally be used to control the response to onClose, for example ignoring clickaway.',
    },
    message: {
      description: 'The message to display.',
      default: 'Alert message',
    },
    open: {
      description: 'If true, the component is shown.',
    },
    placeholderIcon: {
      description:
        'The icon button shown that provides additional functionality or action to the snackbar. Typically, it is an HTML or JSX element with onClick callback to be fired when clicked.',
    },
    placeholderIconAction: {
      description: 'Callback fired when placeholder icon is clicked.',
    },
    showPlaceholderIcon: {
      description: 'Used to toggle visibility of placeholder icon.',
    },
    progressVariant: {
      options: [CircularProgressVariants.DETERMINATE, CircularProgressVariants.INDETERMINATE],
      control: { type: 'radio' },
      description: 'This will only affect component when the variant is in progress. Choose what variant of CircularProgress to use.',
      table: {
        defaultValue: {
          summary: CircularProgressVariants.INDETERMINATE,
        },
      },
    },
    progressValue: {
      description: 'The value of the progress indicator for the determinate variant. Value between 0 and 100.',
      control: { type: 'range', min: 0, max: 100 },
      table: {
        defaultValue: {
          summary: 0,
        },
      },
    },
  },
} as Meta<typeof Snackbar>;

const InteractiveExampleTemplate: StoryFn<typeof Snackbar> = (args) => {
  const messageTwo = `${args.message} > a bit longer`;
  const messageThree = `${args.message} > a bit much more longer ;-)`;
  // @ts-ignore for test only, its purpose is to show snackbar when its stack
  if (args.showStackSnackbar) {
    return (
      <SnackbarContainer>
        <Snackbar {...args} />
        <Snackbar {...args} message={messageTwo} />
        <Snackbar {...args} message={messageThree} />
      </SnackbarContainer>
    );
  }
  return (
    <SnackbarContainer>
      <Snackbar {...args} />
    </SnackbarContainer>
  );
};

export const InteractiveExample = InteractiveExampleTemplate.bind({});
InteractiveExample.parameters = {
  options: { showPanel: true },
};
InteractiveExample.args = {
  ...Snackbar.defaultProps,
  message: 'Alert message.',
  open: true,
  buttonText: 'Button',
  placeholderIcon: <ChevronDownIcon />,
  showPlaceholderIcon: true,
  showStackSnackbar: false,
};

const VisualTestTemplate: StoryFn<typeof Snackbar> = (args) => {
  return (
    <SnackbarContainer>
      <Snackbar {...args} />
      <Snackbar {...args} variant={SnackbarVariants.SUCCESS} />
      <Snackbar {...args} variant={SnackbarVariants.WARNING} />
      <Snackbar {...args} variant={SnackbarVariants.ERROR} />
      <Snackbar {...args} variant={SnackbarVariants.PROGRESS} progressVariant={CircularProgressVariants.DETERMINATE} progressValue={50} />
    </SnackbarContainer>
  );
};

export const VisualTest = VisualTestTemplate.bind({});
VisualTest.parameters = {
  options: { showPanel: false },
};
VisualTest.args = {
  ...Snackbar.defaultProps,
  message: 'Alert message.',
  open: true,
  buttonText: 'Button',
  placeholderIcon: <ChevronDownIcon />,
  showPlaceholderIcon: true,
};
