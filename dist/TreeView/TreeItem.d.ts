import React, { ReactNode } from 'react';
import { TreeItemProps } from '@mui/lab/TreeItem';
/**
 * Context tracking nesting depth (0 = root level).
 * Used to compute the level-line position and content padding.
 */
export declare const TreeDepthContext: React.Context<number>;
export interface TreeViewContextValue {
    usingKeyboardRef: React.MutableRefObject<boolean>;
    focusTree: () => void;
    navigateWithKey: (key: string) => void;
    navigateToNextItemAction: (reverse: boolean, fromContent: HTMLElement) => void;
    showLevelLine: boolean;
    /** When true, all tree items are disabled regardless of their own disabled prop. */
    disabled?: boolean;
}
export declare const TreeViewContext: React.Context<TreeViewContextValue>;
export interface EnhancedTreeItemProps extends Omit<TreeItemProps, 'endIcon'> {
    /** Icon after the expand/collapse caret. 16×16. E.g. DocumentIcon. */
    startIcon?: ReactNode;
    /** Status badge after startIcon. 16×16. E.g. a coloured circle / Badge. */
    statusBadge?: ReactNode;
    /** Icon in the Details section (left of detailsText). 16×16. E.g. ArrowLeftIcon. */
    detailsIcon?: ReactNode;
    /** Text in the Details section. Rendered as body2 / text-secondary. */
    detailsText?: ReactNode;
    /**
     * Always-visible icon at the far right, before endAction. 16×16.
     * Corresponds to "Icon - end" in Figma (e.g. HomeIcon).
     */
    endIcon?: ReactNode;
    /**
     * Always-visible action at the far right (e.g. an IconButton).
     * Corresponds to "Action - end" / "overflow-menu--horizontal" in Figma.
     */
    endAction?: ReactNode;
    /** Buttons revealed only on row hover / keyboard focus (opacity 0 → 1). */
    hoverActions?: ReactNode;
    /**
     * Controls where detailsIcon/detailsText are placed.
     * - 'label' (default): hugged immediately after the label text.
     * - 'end': right-aligned, placed before endIcon/endAction.
     */
    detailsAlign?: 'label' | 'end';
}
declare const TreeItem: React.ForwardRefExoticComponent<Omit<EnhancedTreeItemProps, "ref"> & React.RefAttributes<HTMLLIElement>>;
export * from '@mui/lab/TreeItem';
export default TreeItem;
