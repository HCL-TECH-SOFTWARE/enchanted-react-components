import React from 'react';
export interface ChipLayoutProps {
    chipChildNodes: Array<React.ReactNode>;
}
export declare enum ChipLayoutTestIds {
    CHIP_LAYOUT_ROOT = "chipLayoutRoot",
    CHIP_LAYOUT_SHOW_MORE = "chipLayoutShowMore"
}
declare const ChipLayout: (props: ChipLayoutProps) => React.JSX.Element | null;
export default ChipLayout;
