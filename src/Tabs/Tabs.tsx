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

import React, { useEffect, useState, useRef } from 'react';
import MuiTabs, { TabsProps as MuiTabsProps } from '@mui/material/Tabs';
import { styled } from '@mui/material/styles';

interface TabsProps extends MuiTabsProps {
  iconposition?: 'start' | 'top';
  showIcon?: boolean;
  showLabel?: boolean;
}

const StyledTabs = styled(MuiTabs)((props) => {
  const { theme } = props;
  return {
    '& .MuiButtonBase-root': { // This targets the tab
      padding: props.orientation === 'horizontal' ? '6px 8px' : '10px',
    },
    '& .MuiTabs-indicator': { // This targets the tab indicator
      backgroundColor: theme.palette.action.active,
      marginRight: '2px',
    },
    '& .MuiTab-root:hover': { // This targets the label of the tab on hover
      backgroundColor: theme.palette.action.hover,
    },
    '& .MuiTab-root': {
      border: '1px solid transparent',
      justifyContent: props.orientation === 'horizontal' ? 'center' : 'flex-start',
    },
    '& .MuiTouchRipple-root': {
      display: 'none',
    },
    '& .MuiTab-root:focus': { // This targets the label of the tab on focus
      border: `1px solid ${theme.palette.action.focus}`,
    },
    '& .MuiSvgIcon-root': { // This targets the icon
      color: theme.palette.action.active,
      width: props.orientation === 'horizontal' ? '16px' : '20px',
      height: props.orientation === 'horizontal' ? '16px' : '20px',
    },
  };
});

const Tabs = ({ ...props }: TabsProps) => {
  const [value, setValue] = useState(props.value || 0);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef<HTMLButtonElement | null>(null);

  /**
  * This function calculates and updates the style of the tab indicator. It determines the orientation of the tabs,
  * computes the padding and dimensions of the selected tab, and calculates its position.
  *
  * @param {HTMLElement} tabElement - The HTML element of the selected tab.
  */
  const updateIndicatorStyle = (tabElement: HTMLElement) => {
    const style = window.getComputedStyle(tabElement);
    const isVertical = props.orientation === 'vertical';
    const startPadding = parseFloat(style.getPropertyValue(isVertical ? 'padding-top' : 'padding-left'));
    const endPadding = parseFloat(style.getPropertyValue(isVertical ? 'padding-bottom' : 'padding-right'));
    const dimensionWithoutPadding = tabElement[isVertical ? 'offsetHeight' : 'offsetWidth'] - startPadding - endPadding;
    const startPosition = tabElement[isVertical ? 'offsetTop' : 'offsetLeft'] + startPadding;
    setIndicatorStyle({
      [isVertical ? 'height' : 'width']: dimensionWithoutPadding,
      [isVertical ? 'top' : 'left']: startPosition,
    });
  };

  useEffect(() => {
    if (tabsRef.current) {
      const selectedTab = tabsRef.current.querySelector('.Mui-selected') as HTMLElement;
      if (selectedTab) {
        updateIndicatorStyle(selectedTab);
      }
    }
  }, []);

  useEffect(() => {
    if (tabsRef.current) {
      const selectedTab = tabsRef.current.querySelector('.Mui-selected') as HTMLElement;
      if (selectedTab) {
        updateIndicatorStyle(selectedTab);
      }
    }
  }, [props.orientation]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (props.onChange) {
      props.onChange(event, newValue);
    } else {
      setValue(newValue);
    }
    updateIndicatorStyle(event.currentTarget as HTMLElement);
  };

  return (
    <StyledTabs
      {...props}
      value={value}
      onChange={handleChange}
      sx={{
        borderBottom: props.orientation === 'horizontal' ? 1 : 'none',
        borderColor: 'divider',
        minHeight: '30px',
      }}
      TabIndicatorProps={{
        style: indicatorStyle,
      }}
      ref={tabsRef}
    />
  );
};

const defaultProps: TabsProps = {
  centered: false,
  orientation: 'horizontal',
  variant: 'standard',
  tabIndex: 0,
  disabled: false,
};

Tabs.defaultProps = defaultProps;

export * from '@mui/material/Tabs';
export default Tabs;
