import React from 'react';
import { TabsProps as MuiTabsProps } from '@mui/material/Tabs';
interface TabsProps extends MuiTabsProps {
    disabled?: boolean;
    iconposition?: 'start' | 'top';
    showIcon?: boolean;
    showLabel?: boolean;
}
declare const Tabs: {
    ({ ...props }: TabsProps): React.JSX.Element;
    defaultProps: TabsProps;
};
export * from '@mui/material/Tabs';
export default Tabs;
