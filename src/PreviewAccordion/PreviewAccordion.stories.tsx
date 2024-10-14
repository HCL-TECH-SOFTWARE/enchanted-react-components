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

import React, { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import ChevronDownIcon from '@hcl-software/enchanted-icons/dist/carbon/es/chevron--down';
import RocketIcon from '@hcl-software/enchanted-icons/dist/carbon/es/rocket';
import Button from '../Button/Button';
import PreviewAccordion, { PreviewAccordionTypes, AccordionProps } from './PreviewAccordion';
import PreviewAccordionSummary from './PreviewAccordionSummary';
import PreviewAccordionDetails from './PreviewAccordionDetails';
import Checkbox from '../Checkbox/Checkbox';
import Typography from '../Typography/Typography';
import PlaceholderArea from '../utils/PlaceholderArea';
import IconButton, { IconButtonVariants } from '../IconButton/IconButton';
import Link from '../Link/Link';
import Avatar, { AvatarTypes } from '../Avatar/Avatar';

export default {
  title: 'Navigation/PreviewAccordion',
  component: PreviewAccordion,
  argTypes: {
    type: {
      if: { arg: 'interactive' },
      description: 'The type of accordion to use',
      options: [PreviewAccordionTypes.OUTLINED, PreviewAccordionTypes.NO_OUTLINE],
      control: { type: 'radio' },
    },
    disabled: {
      if: { arg: 'interactive' },
      description: 'If true, the accordion will be disabled',
      control: { type: 'boolean' },
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    showCheckBox: {
      if: { arg: 'interactive' },
      description: 'If true, the accordion will show a checkbox, only for Storybook use',
      control: { type: 'boolean' },
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    hasDivider: {
      if: { arg: 'interactive' },
      description: 'If true, the accordion will have a divider',
      control: { type: 'boolean' },
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    showSecondaryText: {
      if: { arg: 'interactive' },
      control: {
        type: 'boolean',
      },
      defaultValue: true,
      description: 'Show a secondary optional text, only for Storybook use',
    },
    showAvatar: {
      if: { arg: 'interactive' },
      control: {
        type: 'boolean',
      },
      description: 'Show a avatar, only for Storybook use',
    },
    showIcon: {
      if: { arg: 'interactive' },
      control: {
        type: 'boolean',
      },
      description: 'Show a icon, only for Storybook use',
    },
    variant: { table: { disable: true } },
    children: { table: { disable: true } },
    elevation: { table: { disable: true } },
    square: { table: { disable: true } },
    ref: { table: { disable: true } },
    isfocused: { table: { disable: true } },
    showHoverActions: { table: { disable: true } },
    hasNested: { table: { disable: true } },
    hascheckbox: { table: { disable: true } },
    hasicon: { table: { disable: true } },
    hasavatar: { table: { disable: true } },
  },
} as Meta<typeof PreviewAccordion>;

interface ExtendedPreviewAccordionProps extends AccordionProps {
  showCheckBox: boolean,
  showSecondaryText: boolean,
  showAvatar: boolean,
  showIcon: boolean,
  showHoverActions: boolean,
}

const Template: StoryFn<ExtendedPreviewAccordionProps> = (args) => {
  const {
    showCheckBox, disabled, showAvatar, showIcon, showSecondaryText,
  } = args;
  const [checkedItems, setCheckedItems] = useState({});
  const [linkLabels, setLinkLabels] = useState(['Link 1', 'Link 2', 'Link 3']);
  const [optionalLabels, setOptionalLabels] = useState(['Optional 1', 'Optional 2', 'Optional 3']);
  const [expandedAccordionId, setExpandedAccordionId] = useState(null);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedItems({ ...checkedItems, [event.target.id]: event.target.checked });
  };
  const getLeftSection = () => {
    if (showCheckBox) {
      return <Checkbox id="2" checked={checkedItems['2'] || false} onChange={handleCheckboxChange} onClick={(event) => { return event.stopPropagation(); }} />;
    } if (showAvatar) {
      return <Avatar iconImage={<RocketIcon />} type={AvatarTypes.ICON} variant="rounded" />;
    } if (showIcon) {
      return <RocketIcon />;
    }
    return null;
  };

  const handleChange = (accordionId) => {
    return () => {
      if (expandedAccordionId === accordionId) {
        linkLabels[accordionId] = linkLabels[accordionId].replace('Expanded', '');
        setLinkLabels(linkLabels);
        optionalLabels[accordionId] = optionalLabels[accordionId].replace('Expanded', '');
        setOptionalLabels(optionalLabels);
        setExpandedAccordionId(null);
      } else {
        linkLabels[accordionId] = `${linkLabels[accordionId]} Expanded`;
        setLinkLabels(linkLabels);
        optionalLabels[accordionId] = `${optionalLabels[accordionId]} Expanded`;
        setOptionalLabels(optionalLabels);
        setExpandedAccordionId(accordionId);
      }
    };
  };

  return (
    <>
      <PreviewAccordion
        disabled={disabled}
        id="accordion1"
        {...args}
        hascheckbox={showCheckBox}
        hasicon={showIcon}
        hasavatar={showAvatar}
        expanded={expandedAccordionId === 0}
        onChange={handleChange(0)}
      >
        <PreviewAccordionSummary
          expandIcon={(<IconButton variant={IconButtonVariants.WITHOUT_PADDING}><ChevronDownIcon /></IconButton>)}
          aria-controls="panel1-content"
          id="panel1-header"
          disabled={disabled}
          leftsection={getLeftSection()}
          titlelink={(
            <Link
              href="#"
              target="_blank"
              hoverBackground={false}
              underline="always"
              onClick={(event) => { return event.stopPropagation(); }}
            >
              {linkLabels[0]}
            </Link>
          )}
          subtitle={showSecondaryText && (
            <Typography
              variant="caption"
            >
              {optionalLabels[0]}
            </Typography>
          )}
        />
        <PreviewAccordionDetails>
          <PlaceholderArea height="112px" />
        </PreviewAccordionDetails>
      </PreviewAccordion>
      <PreviewAccordion
        disabled={disabled}
        {...args}
        expanded={expandedAccordionId === 1}
        onChange={handleChange(1)}
        hascheckbox={showCheckBox}
        hasicon={showIcon}
        hasavatar={showAvatar}
      >
        <PreviewAccordionSummary
          expandIcon={<IconButton><ChevronDownIcon /></IconButton>}
          aria-controls="panel1-content"
          id="panel1-header"
          disabled={disabled}
          leftsection={getLeftSection()}
          titlelink={(
            <Link
              href="#"
              target="_blank"
              hoverBackground={false}
              underline="always"
              onClick={(event) => { return event.stopPropagation(); }}
            >
              {linkLabels[1]}
            </Link>
          )}
          subtitle={showSecondaryText && (
            <Typography
              variant="caption"
            >
              {optionalLabels[1]}
            </Typography>
          )}
        />
        <PreviewAccordionDetails>
          <PlaceholderArea height="112px" />
        </PreviewAccordionDetails>
      </PreviewAccordion>
      <PreviewAccordion
        disabled={disabled}
        {...args}
        expanded={expandedAccordionId === 2}
        onChange={handleChange(2)}
        hascheckbox={showCheckBox}
        hasicon={showIcon}
        hasavatar={showAvatar}
      >
        <PreviewAccordionSummary
          expandIcon={<IconButton><ChevronDownIcon /></IconButton>}
          aria-controls="panel1-content"
          id="panel1-header"
          disabled={disabled}
          leftsection={getLeftSection()}
          titlelink={(
            <Link
              href="#"
              target="_blank"
              hoverBackground={false}
              underline="always"
              onClick={(event) => { return event.stopPropagation(); }}
            >
              {linkLabels[2]}
            </Link>
          )}
          subtitle={showSecondaryText && (
            <Typography
              variant="caption"
            >
              {optionalLabels[2]}
            </Typography>
          )}
        />
        <PreviewAccordionDetails>
          <PlaceholderArea height="112px" />
        </PreviewAccordionDetails>
      </PreviewAccordion>
    </>
  );
};

export const InteractiveExample = {
  render: Template,

  args: {
    interactive: true,
    showCheckBox: false,
    disabled: false,
    ...PreviewAccordion.defaultProps,
    hasDivider: false,
    showSecondaryText: true,
    showAvatar: true,
    showIcon: false,
    hasNested: false,
    showHoverActions: false,
  },
};
const VisualTestTemplate: StoryFn<typeof PreviewAccordion> = (args) => {
  const {
    disabled,
  } = args;
  const [linkLabels, setLinkLabels] = useState(['Link 1', 'Link 2', 'Link 3']);
  const [optionalLabels, setOptionalLabels] = useState(['Optional 1', 'Optional 2', 'Optional 3']);
  const [expandedAccordionId, setExpandedAccordionId] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});

  const handleChange = (accordionId) => {
    return () => {
      if (expandedAccordionId === accordionId) {
        linkLabels[accordionId] = linkLabels[accordionId].replace('Expanded', '');
        setLinkLabels(linkLabels);
        optionalLabels[accordionId] = optionalLabels[accordionId].replace('Expanded', '');
        setOptionalLabels(optionalLabels);
        setExpandedAccordionId(null);
      } else {
        linkLabels[accordionId] = `${linkLabels[accordionId]} Expanded`;
        setLinkLabels(linkLabels);
        optionalLabels[accordionId] = `${optionalLabels[accordionId]} Expanded`;
        setOptionalLabels(optionalLabels);
        setExpandedAccordionId(accordionId);
      }
    };
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedItems({ ...checkedItems, [event.target.id]: event.target.checked });
  };

  const getRightSection = () => {
    return (
      <>
        <IconButton size="small"><RocketIcon /></IconButton>
        <Button
          onClick={() => { return null; }}
          onFocusVisible={() => { return null; }}
          variant="text"
          size="small"
        >
          Button
        </Button>
      </>
    );
  };

  return (
    <>
      <PreviewAccordion
        disabled={disabled}
        {...args}
        expanded={expandedAccordionId === 0}
        onChange={handleChange(0)}
        hasavatar
      >
        <PreviewAccordionSummary
          expandIcon={<IconButton><ChevronDownIcon /></IconButton>}
          aria-controls="panel1-content"
          id="panel1-header"
          disabled={disabled}
          leftsection={<Avatar iconImage={<RocketIcon />} type={AvatarTypes.ICON} variant="rounded" />}
          titlelink={(
            <Link
              href="#"
              target="_blank"
              hoverBackground={false}
              underline="always"
              onClick={(event) => { return event.stopPropagation(); }}
            >
              {linkLabels[0]}
            </Link>
)}
          subtitle={(
            <Typography
              variant="caption"
            >
              {optionalLabels[0]}
            </Typography>
)}
        />
        <PreviewAccordionDetails>
          <PlaceholderArea height="112px" />
        </PreviewAccordionDetails>
      </PreviewAccordion>
      <PreviewAccordion
        disabled={disabled}
        {...args}
        expanded={expandedAccordionId === 1}
        onChange={handleChange(1)}
        hascheckbox
      >
        <PreviewAccordionSummary
          expandIcon={<IconButton><ChevronDownIcon /></IconButton>}
          aria-controls="panel1-content"
          id="panel1-header"
          disabled={disabled}
          leftsection={<Checkbox id="2" checked={checkedItems['2'] || false} onChange={handleCheckboxChange} onClick={(event) => { return event.stopPropagation(); }} />}
          rightsection={getRightSection()}
          titlelink={(
            <Link
              href="#"
              target="_blank"
              hoverBackground={false}
              underline="always"
              onClick={(event) => { return event.stopPropagation(); }}
            >
              {linkLabels[1]}
            </Link>
)}
          subtitle={(
            <Typography
              variant="caption"
            >
              {optionalLabels[1]}
            </Typography>
)}
        />
        <PreviewAccordionDetails>
          <PlaceholderArea height="112px" />
        </PreviewAccordionDetails>
      </PreviewAccordion>
      <PreviewAccordion
        disabled={disabled}
        {...args}
        expanded={expandedAccordionId === 2}
        onChange={handleChange(2)}
        hasicon
      >
        <PreviewAccordionSummary
          expandIcon={<IconButton><ChevronDownIcon /></IconButton>}
          aria-controls="panel1-content"
          id="panel1-header"
          disabled={disabled}
          leftsection={<RocketIcon />}
          titlelink={(
            <Link
              href="#"
              target="_blank"
              hoverBackground={false}
              underline="always"
              onClick={(event) => { return event.stopPropagation(); }}
            >
              {linkLabels[2]}
            </Link>
)}
          subtitle={(
            <Typography
              variant="caption"
            >
              {optionalLabels[2]}
            </Typography>
)}
        />
        <PreviewAccordionDetails>
          <PlaceholderArea height="112px" />
        </PreviewAccordionDetails>
      </PreviewAccordion>
    </>
  );
};

export const VisualTest = VisualTestTemplate.bind({});
VisualTest.parameters = {
  options: { showPanel: false },
};
VisualTest.args = {
  ...PreviewAccordion.defaultProps,
  showCheckBox: false,
  disabled: false,
  hasDivider: false,
};
