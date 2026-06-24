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

import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Stack } from '@mui/material';
import IconClose from '@hcl-software/enchanted-icons/dist/carbon/es/close';

import { PanelLocalization, PanelVariants, TabsPanelProps } from './Panel';
import Typography from '../Typography/Typography';
import IconButton, { IconButtonVariants } from '../IconButton/IconButton';
import Tooltip from '../Tooltip/Tooltip';

export interface PanelTabContentProps {
  open: boolean;
  selectedTabValue: number;
  variant: PanelVariants;
  toggleClose?(isClosed: boolean): void;
  tabs: Array<TabsPanelProps>;
  translation: PanelLocalization | undefined;
}

export interface TabBodyProps {
  variant: PanelVariants;
  maxHeight?: string;
}

const PanelTabContentStyled = styled(Box)((props) => {
  return {
    width: '260px',
    overflow: 'hidden',
  };
});

const TabHeaderStyled = styled(Stack)((props) => {
  const { theme } = props;
  return {
    display: 'flex',
    borderBottom: `solid 1px ${theme.palette.border.primary}`,
    paddingRight: '12px',
  };
});

const TabBodyStyled = styled(Box)<TabBodyProps>((props) => {
  return {
    padding: props.variant === PanelVariants.WITH_PADDING ? '12px' : 0,
    maxHeight: props.maxHeight || 'calc(100vh - 48px)',
    overflowY: 'auto',
  };
});

const PanelTitle = styled(Typography)((props) => {
  const { theme } = props;
  return {
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.text.primary,
    margin: '12px',
  };
});

const PanelActions = styled(Stack)((props) => {
  return {
    maxWidth: '50%',
  };
});

const CloseButtonStyled = styled(IconButton)((props) => {
  return {
    marginLeft: 0,
  };
});

const PanelTabContent: React.FC<PanelTabContentProps> = ({
  selectedTabValue,
  tabs,
  open,
  variant,
  toggleClose,
  translation,
  ...props
}: PanelTabContentProps) => {
  return (
    <>
      {tabs.map((tab, index) => {
        const key = index;
        return (
          <React.Fragment
            key={key}
          >
            {selectedTabValue === index && (
              <PanelTabContentStyled
                flexGrow={1}
                flexShrink={0}
              >
                <Stack
                  direction="column"
                >
                  <TabHeaderStyled
                    data-testid="panel-header"
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box
                      sx={{ flex: '1 1 50%' }}
                    >
                      <PanelTitle
                        variant="subtitle1"
                      >
                        {tab.content.title}
                      </PanelTitle>
                    </Box>
                    <PanelActions
                      direction="row"
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      <Box
                        sx={{
                          display: 'flex',
                        }}
                      >
                        {tab.content.actionHeaderBar}
                      </Box>
                      {toggleClose && (
                      <Tooltip title={(translation && translation.closeButtonTooltip) ? translation.closeButtonTooltip : ''}>
                        <CloseButtonStyled
                          variant={IconButtonVariants.WITH_PADDING}
                          onClick={() => {
                            return toggleClose ? toggleClose(!open) : null;
                          }}
                        >
                          <IconClose />
                        </CloseButtonStyled>
                      </Tooltip>
                      )}
                    </PanelActions>
                  </TabHeaderStyled>
                  <TabBodyStyled
                    data-testid="panel-body"
                    variant={variant}
                    maxHeight={tab.content.maxHeight}
                  >
                    <Box>
                      {tab.content.body}
                    </Box>
                  </TabBodyStyled>
                </Stack>
              </PanelTabContentStyled>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

PanelTabContent.defaultProps = { };

export default PanelTabContent;
