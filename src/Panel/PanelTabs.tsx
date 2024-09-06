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
import { styled, useTheme } from '@mui/material/styles';
import IconDoubleLeft from '@hcl-software/enchanted-icons/dist/apps/es/double-left';
import IconDoubleRight from '@hcl-software/enchanted-icons/dist/apps/es/double-right';
import Tabs from '../Tabs/Tabs';
import Tab from '../Tabs/Tab';
import { PanelLocalization, TabsPanelProps } from './Panel';
import IconButton, { IconButtonVariants } from '../IconButton/IconButton';
import { ThemeDirectionType } from '../theme';
import Tooltip from '../Tooltip/Tooltip';

export interface PanelTabsProps {
  selectedTabValue: number,
  handleTabChange(event: React.ChangeEvent<{}>, newValue: number): void;
  tabs: Array<TabsPanelProps>,
  isPanelCollapsed?: boolean;
  togglePanel?: (event: React.ChangeEvent<{}>) => void;
  translation: PanelLocalization | undefined;
}

const PanelTabContainerStyled = styled('div')((props) => {
  const { theme } = props;
  return {
    borderLeft: `solid 1px ${theme.palette.border.primary}`,
    borderRight: `solid 1px ${theme.palette.border.primary}`,
    width: '41px',
    maxWidth: '41px',
    position: 'relative',
  };
});

const ToggleButtonContainerStyled = styled('div')(() => {
  return {
    position: 'absolute',
    bottom: '0px',
    padding: '8px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  };
});

const PanelTabsStyled = styled(Tabs)((props) => {
  const { theme } = props;
  return {
    padding: '8px 0',
    '& button:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '& button:focus-visible': {
      border: `1px solid ${theme.palette.action.focus}`,
    },
  };
});

const TabStyled = styled(Tab)((props) => {
  const { theme } = props;
  return {
    '&.MuiTab-root': {
      minWidth: '17.5px',
      minHeight: '17.5px',
      padding: '10px',
    },
    '&.Mui-selected': {
      color: theme.palette.text.secondary,
    },
    '.MuiSvgIcon-root': {
      width: '20px',
      height: '20px',
    },
    color: theme.palette.text.secondary,
    maxHeight: '40px',
  };
});

const getArrowIcon = (isPanelCollapsed : boolean | undefined) => {
  const theme = useTheme();
  if (theme.direction === ThemeDirectionType.RTL && isPanelCollapsed) {
    return <IconDoubleRight />;
  } if (theme.direction === ThemeDirectionType.RTL && !isPanelCollapsed) {
    return <IconDoubleLeft />;
  } if (theme.direction !== ThemeDirectionType.RTL && isPanelCollapsed) {
    return <IconDoubleLeft />;
  }
  return <IconDoubleRight />;
};

const PanelTabs: React.FC<PanelTabsProps> = ({
  selectedTabValue,
  handleTabChange,
  tabs,
  isPanelCollapsed,
  togglePanel,
  translation,
}: PanelTabsProps) => {
  return (
    <PanelTabContainerStyled>
      <PanelTabsStyled
        value={selectedTabValue}
        onChange={(event, newValue) => {
          handleTabChange(event, newValue);
          event.stopPropagation();
        }}
        onClick={(event) => {
          handleTabChange(event, selectedTabValue);
          event.stopPropagation();
        }}
        data-testid="panel-tabs"
        orientation="vertical"
        variant="scrollable"
        tabIndex={-1}
      >
        {tabs.map((tab, index) => {
          const key = index;
          const iconTooltip = (
            <Tooltip title={tab.tabIcon.label}>
              {tab.tabIcon.icon}
            </Tooltip>
          );
          return (
            <TabStyled
              key={`tab-${key}`}
              tabIndex={0}
              data-testid={`tab-${key}`}
              icon={iconTooltip}
              aria-label={tab.tabIcon.label}
              disableFocusRipple
            />
          );
        })}
      </PanelTabsStyled>
      {togglePanel
        ? (
          <ToggleButtonContainerStyled>
            <Tooltip title={translation && translation.toggleButtonTooltip ? translation.toggleButtonTooltip : ''}>
              <IconButton
                size="small"
                variant={IconButtonVariants.WITHOUT_PADDING}
                onClick={togglePanel}
                aria-expanded={!isPanelCollapsed}
                aria-controls="panelContent"
                aria-label="Toggle panel"
              >
                { getArrowIcon(isPanelCollapsed) }
              </IconButton>
            </Tooltip>
          </ToggleButtonContainerStyled>
        )
        : null }
    </PanelTabContainerStyled>
  );
};

PanelTabs.defaultProps = { };

export default PanelTabs;
