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
import Drawer, { DrawerProps } from '../hidden_components/Drawer';
import { neutralGrey } from '../colors';
import PanelTabs from './PanelTabs';
import PanelTabContent from './PanelTabContent';

export enum PanelVariants {
  WITHOUT_PADDING = 'without padding',
  WITH_PADDING = 'with padding',
}
export interface TabContentProps {
  title: string;
  actionHeaderBar?: JSX.Element;
  body: JSX.Element;
  showActionHeaderBar?: boolean;
  maxHeight?: string;
}

export interface TabIconProps {
  icon: JSX.Element;
  label: string;
}
export interface TabsPanelProps {
  tabIcon: TabIconProps;
  content: TabContentProps;
}

export interface PanelLocalization {
  closeButtonTooltip?: string;
  toggleButtonTooltip?: string;
}

export interface InspectorPanelProps extends DrawerProps{
  open: boolean;
  tabList: TabsPanelProps[];
  selectedTabValue?: number;
  hideSidebar?: boolean;
  panelVariant: PanelVariants;
  toggleClose?(isCollapsed: boolean): void;
  handleTabChange?: (event: React.ChangeEvent<{}>, tabIndex: number) => void;
  togglePanel?: (event: React.ChangeEvent<{}>) => void;
  isPanelCollapsed?: boolean;
  translation?: PanelLocalization | undefined;
}

export interface PanelProps {
  hideSidebar?: boolean;
  isPanelCollapsed?: boolean;
  translation?: PanelLocalization;
}

const StyledDrawer = styled(Drawer)((theme) => {
  return {
    position: 'absolute',
    right: 0,
    top: 0,
    '.MuiPaper-root': {
      padding: 0,
      overflowX: 'hidden',
    },
    '&.MuiDrawer-root': {
      padding: 0,
    },
    '& .MuiDrawer-paper': {
      boxShadow: theme.theme.shadows[0],
      borderLeft: 'none',
    },
  };
});

const PanelBody = styled('main')<PanelProps>((props) => {
  let panelWidth = '301px'; // Default width
  if (props.isPanelCollapsed) {
    panelWidth = '41px';
  } else if (props.hideSidebar) {
    panelWidth = '260px';
  }
  return {
    background: neutralGrey.NG100,
    display: 'flex',
    height: '100%',
    width: panelWidth,
  };
});

const Panel: React.FC<InspectorPanelProps> = ({
  open,
  anchor,
  variant,
  tabList,
  hideSidebar,
  selectedTabValue,
  panelVariant,
  handleTabChange,
  togglePanel,
  isPanelCollapsed,
  translation,
  ...rest
}: InspectorPanelProps) => {
  const [selectedTabValueDefault, setSelelectedTabValueDefault] = React.useState(0);

  const handleTabChangeDefault = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelelectedTabValueDefault(newValue);
  };

  return (
    <StyledDrawer
      anchor={anchor || 'right'}
      variant={variant || 'persistent'}
      open={open}
    >
      <PanelBody
        hideSidebar={hideSidebar}
        isPanelCollapsed={isPanelCollapsed}
      >
        <>
          {tabList && (
            <>
              { hideSidebar !== true && (
                <PanelTabs
                  tabs={tabList}
                  handleTabChange={handleTabChange || handleTabChangeDefault}
                  selectedTabValue={selectedTabValue || selectedTabValueDefault}
                  isPanelCollapsed={isPanelCollapsed}
                  togglePanel={togglePanel}
                  translation={translation}
                />
              )}
              { !isPanelCollapsed && (
              <PanelTabContent
                open={open}
                tabs={tabList}
                selectedTabValue={selectedTabValue || selectedTabValueDefault}
                variant={panelVariant || PanelVariants.WITH_PADDING}
                toggleClose={rest.toggleClose || undefined}
                translation={translation}
              />
              )}
            </>
          )}
        </>
      </PanelBody>
    </StyledDrawer>
  );
};

Panel.defaultProps = {
  open: false,
  panelVariant: PanelVariants.WITH_PADDING,
  isPanelCollapsed: false,
};

export default Panel;
