import React from 'react';
import type { TreeViewProps } from '@mui/lab/TreeView';
import '@mui/lab/themeAugmentation';
import { Components, Theme } from '@mui/material';
export { TreeViewContext, TreeDepthContext } from './TreeItem';
export type { TreeViewProps };
export type EnhancedTreeViewProps = TreeViewProps & {
    /** When false, hides the vertical level-line connecting parent to children. Defaults to true. */
    showLevelLine?: boolean;
    /** When true, all tree items in the tree are disabled. */
    disabled?: boolean;
};
/**
 * Override out of the box styling from MUI to align with designer theme.
 * @returns override TreeView and TreeItem component styles and props
 */
export declare const getMuiTreeViewThemeOverrides: () => Components<Omit<Theme, 'components'>>;
declare const TreeView: React.ForwardRefExoticComponent<(Omit<import("@mui/lab/TreeView").SingleSelectTreeViewProps & {
    /** When false, hides the vertical level-line connecting parent to children. Defaults to true. */
    showLevelLine?: boolean | undefined;
    /** When true, all tree items in the tree are disabled. */
    disabled?: boolean | undefined;
}, "ref"> | Omit<import("@mui/lab/TreeView").MultiSelectTreeViewProps & {
    /** When false, hides the vertical level-line connecting parent to children. Defaults to true. */
    showLevelLine?: boolean | undefined;
    /** When true, all tree items in the tree are disabled. */
    disabled?: boolean | undefined;
}, "ref">) & React.RefAttributes<HTMLUListElement>>;
export * from '@mui/lab/TreeView';
export { default as TreeItem } from './TreeItem';
export type { EnhancedTreeItemProps, TreeViewContextValue } from './TreeItem';
export default TreeView;
