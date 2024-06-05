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
import Tabs from '../Tabs/Tabs';
import Tab from '../Tabs/Tab';
import { TabsPanelProps } from './Panel';

export interface PanelTabsProps {
  selectedTabValue: number,
  handleTabChange(event: React.ChangeEvent<{}>, newValue: number): void;
  tabs: Array<TabsPanelProps>,
}

const PanelTabsStyled = styled(Tabs)((props) => {
  const { theme } = props;
  return {
    borderLeft: `solid 1px ${theme.palette.border.primary}`,
    width: '41px',
    maxWidth: '41px',
    padding: '10px 0',
    '.MuiTabs-indicator': {
      backgroundColor: theme.palette.text.secondary,
      maxHeight: '20px',
      margin: '10px 0',
      position: 'center',
      marginRight: '2px',
    },
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

const PanelTabs: React.FC<PanelTabsProps> = ({
  selectedTabValue,
  handleTabChange,
  tabs,
}: PanelTabsProps) => {
  return (
    <PanelTabsStyled
      value={selectedTabValue}
      onChange={handleTabChange}
      data-testid="panel-tabs"
      orientation="vertical"
      variant="scrollable"
      tabIndex={-1}
    >
      {tabs.map((tab, index) => {
        const key = index;
        return (
          <TabStyled
            key={`tab-${key}`}
            tabIndex={0}
            data-testid={`tab-${key}`}
            icon={tab.tabIcon.icon}
            aria-label={tab.tabIcon.label}
            disableFocusRipple
          />
        );
      })}
    </PanelTabsStyled>
  );
};

PanelTabs.defaultProps = { };

export default PanelTabs;
