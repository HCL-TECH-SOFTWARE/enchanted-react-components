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
import CircularProgress, { CircularProgressVariants } from './CircularProgress';

export default {
  title: 'Feedback/ProgressIndicator/CircularProgress',
  component: CircularProgress,
  argTypes: {
    variant: {
      options: [CircularProgressVariants.DETERMINATE, CircularProgressVariants.INDETERMINATE],
      control: { type: 'radio' },
      description: 'The variant to use. Use indeterminate when there is no progress value.',
      table: {
        defaultValue: {
          summary: CircularProgressVariants.INDETERMINATE,
        },
      },
    },
    thickness: {
      description: 'The thickness of the circle.',
      control: false,
      table: {
        defaultValue: {
          summary: 3.5,
        },
      },
    },
    size: {
      description:
        'The size of the component. If using a number, the pixel unit is assumed. If using a string, you need to provide the CSS unit, e.g `3rem`.',
      table: {
        defaultValue: {
          summary: 40,
        },
      },
    },
    value: {
      description:
        'The value of the determinate circular progress, if showprogress control is enabled. Value between 0 and 100.',
      control: { type: 'range', min: 0, max: 100 },
      table: {
        defaultValue: {
          summary: 0,
        },
      },
    },
    showprogress: {
      description:
        'Toggles showprogress state to show/hide progress text inside circular progress in case of determinate variant.',
      control: { type: 'boolean' },
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
  },
} as Meta<typeof CircularProgress>;

const Template: StoryFn<typeof CircularProgress> = (args) => {
  const { showprogress, value, ...rest } = args;
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        return prevProgress >= 100 ? 0 : prevProgress + 10;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <CircularProgress {...rest} value={value || progress} showprogress={showprogress ? 1 : 0} />
  );
};

export const ExampleCircularProgress = {
  render: Template,

  args: {
    ...CircularProgress.defaultProps,
    variant: CircularProgressVariants.DETERMINATE,
    value: 10,
  },
};
