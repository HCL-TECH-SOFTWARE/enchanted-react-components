import * as React from 'react';
import { PanelLocalization, PanelVariants, TabsPanelProps } from './Panel';
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
declare const PanelTabContent: React.FC<PanelTabContentProps>;
export default PanelTabContent;
