/* ======================================================================== *
 * Copyright 2026 HCL America Inc.                                          *
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
import React from 'react';
import MuiTreeView, { TreeViewProps } from '@mui/lab/TreeView';
import '@mui/lab/themeAugmentation';
import { Components, Theme } from '@mui/material';
import ChevronDownIcon from '@hcl-software/enchanted-icons/dist/carbon/es/chevron--down';
import ChevronRight from '@hcl-software/enchanted-icons/dist/carbon/es/chevron--right';
import { TreeViewContext } from './TreeItem';

export { TreeViewContext, TreeDepthContext } from './TreeItem';

export { TreeViewProps };

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
export const getMuiTreeViewThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiTreeView: {
      styleOverrides: {
        root: () => {
          return {
            padding: '0px',
          };
        },
      },
    },
    MuiTreeItem: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => {
          return {
            '& .MuiTreeItem-content': {
              position: 'relative',
              minHeight: '28px',
              height: 'auto',
              padding: '0 10px 0 4px',
              borderRadius: '2px',
              gap: '4px',
              '& .MuiTreeItem-label': {
                paddingLeft: 0,
              },
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
              '& .tree-item-details-icon svg': {
                color: theme.palette.action.active,
              },
              '& .tree-item-hover-actions svg': {
                color: theme.palette.action.active,
              },
              '& .tree-item-end-action svg': {
                color: theme.palette.action.active,
              },
              '&.Mui-selected': {
                backgroundColor: theme.palette.action.selectedOpacityModified,
                '& .tree-item-icon svg': {
                  color: theme.palette.action.selected,
                },
                '& .tree-item-label-text': {
                  color: theme.palette.action.selected,
                },
                '& .tree-item-details-text': {
                  color: theme.palette.action.selected,
                },
                '& .tree-item-end-action svg': {
                  color: theme.palette.action.selected,
                },
                '& .tree-item-hover-actions svg': {
                  color: theme.palette.action.selected,
                },
                '& .MuiTreeItem-iconContainer svg': {
                  color: theme.palette.action.selected,
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '3px',
                  borderRadius: '2px 0 0 2px',
                  backgroundColor: theme.palette.action.selected,
                },
                '&:hover': {
                  backgroundColor: theme.palette.action.selectedOpacityHover,
                },
              },
              '&.Mui-disabled.Mui-selected': {
                backgroundColor: 'transparent',
                '& .tree-item-icon svg': {
                  color: theme.palette.text.secondary,
                },
                '& .tree-item-label-text': {
                  color: theme.palette.text.primary,
                },
                '& .tree-item-details-text': {
                  color: theme.palette.text.secondary,
                },
                '& .tree-item-end-action svg': {
                  color: theme.palette.text.secondary,
                },
                '& .tree-item-hover-actions svg': {
                  color: theme.palette.text.secondary,
                },
                '& .MuiTreeItem-iconContainer svg': {
                  color: theme.palette.text.secondary,
                },
                '&::before': {
                  backgroundColor: theme.palette.text.secondary,
                },
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              },
              // Only suppress MUI's default focus background when cursor is NOT on the row.
              '&.Mui-focused:not(:hover)': {
                backgroundColor: 'transparent',
              },
              '&.Mui-focused.Mui-selected': {
                backgroundColor: `${theme.palette.action.selectedOpacityModified} !important`,
                '&:hover': {
                  backgroundColor: `${theme.palette.action.selectedOpacityHover} !important`,
                },
              },
              '&:focus-visible': {
                '&.Mui-selected': {
                  backgroundColor: theme.palette.action.selectedOpacityModified,
                  '&:hover': {
                    backgroundColor: theme.palette.action.selectedOpacityHover,
                  },
                },
              },
              '&.Mui-disabled': {
                pointerEvents: 'none',
              },
              '&:hover .tree-item-hover-actions, &.Mui-focused .tree-item-hover-actions, & .tree-item-hover-actions:focus-within': {
                opacity: 1,
              },
            },
            '& .MuiTreeItem-iconContainer': {
              width: '16px !important',
              height: '16px',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 0,
              marginRight: '0 !important',
              '& svg': {
                fontSize: '16px !important',
                color: theme.palette.text.secondary,
              },
            },
            '& .MuiTreeItem-label': {
              padding: 0,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              flex: 1,
              minWidth: 0,
              ...theme.typography.body2,
              color: theme.palette.text.primary,
            },
            '&:has(> .MuiTreeItem-content.Mui-focused)': {
              position: 'relative',
            },
            '&.keyboard-focused': {
              boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
              zIndex: 1,
              borderRadius: '2px',
            },
            '&.Mui-disabled > .MuiTreeItem-content': {
              pointerEvents: 'none',
            },
            '& .MuiTreeItem-group': {
              position: 'relative',
              marginLeft: 0,
              paddingLeft: 0,
            },
            '&:has(> .MuiTreeItem-content.Mui-selected) > .MuiTreeItem-group': {
              backgroundColor: 'rgba(5, 80, 220, 0.04)',
              borderRadius: '0 0 2px 2px',
            },
            // When a parent is selected, colour the level-lines in the selected colour.
            '& > .MuiTreeItem-content.Mui-selected ~ .MuiTreeItem-group .tree-level-line': {
              backgroundColor: theme.palette.action.selected,
            },
            // When a parent is selected, apply the selected visual treatment to ALL
            // descendant content items at any depth (excluding disabled items).
            '& > .MuiTreeItem-content.Mui-selected ~ .MuiTreeItem-group .MuiTreeItem-content': {
              backgroundColor: theme.palette.action.selectedOpacity,
              '& .tree-item-icon svg': {
                color: theme.palette.action.selected,
              },
              '& .tree-item-label-text': {
                color: theme.palette.action.selected,
              },
              '& .tree-item-details-text': {
                color: theme.palette.action.selected,
              },
              '& .tree-item-end-action svg': {
                color: theme.palette.action.selected,
              },
              '& .tree-item-hover-actions svg': {
                color: theme.palette.action.selected,
              },
              '& .MuiTreeItem-iconContainer svg': {
                color: theme.palette.action.selected,
              },
              '&:hover': {
                backgroundColor: theme.palette.action.selectedOpacityHover,
              },
            },
          };
        },
      },
    },
  };
};

const TreeView = React.forwardRef<HTMLUListElement, EnhancedTreeViewProps>(
  (props: EnhancedTreeViewProps, ref: React.Ref<HTMLUListElement>) => {
    const {
      defaultCollapseIcon, defaultExpandIcon, onMouseLeave, showLevelLine = true, disabled, ...rest
    } = props;

    const treeRef = React.useRef<HTMLUListElement>(null);
    // Accordion pattern: ref (not state) so MutationObserver callbacks read it synchronously.
    const isKeyboardNav = React.useRef(false);

    const combinedRef = (node: HTMLUListElement) => {
      (treeRef as React.MutableRefObject<HTMLUListElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLUListElement | null>).current = node;
    };

    // Accordion pattern: window-level keydown/mousedown listeners.
    React.useEffect(() => {
      const handleWinKeyDown = () => { isKeyboardNav.current = true; };
      const handleWinMouseDown = () => { isKeyboardNav.current = false; };
      window.addEventListener('keydown', handleWinKeyDown);
      window.addEventListener('mousedown', handleWinMouseDown);
      return () => {
        window.removeEventListener('keydown', handleWinKeyDown);
        window.removeEventListener('mousedown', handleWinMouseDown);
      };
    }, []);

    const handleMouseLeave = (e: React.MouseEvent<HTMLUListElement>) => {
      const active = document.activeElement as HTMLElement | null;
      if (active && e.currentTarget.contains(active) && !active.matches(':focus-visible')) {
        active.blur();
      }
      onMouseLeave?.(e);
    };

    const focusTree = React.useCallback(() => {
      treeRef.current?.focus();
    }, []);

    // Arrow key from action button: return DOM focus to tree ul so MUI restores
    // its internal focusedNodeId (synchronous ref update), then dispatch the key.
    const navigateWithKey = React.useCallback((key: string) => {
      const tree = treeRef.current;
      if (!tree) return;
      tree.focus();
      tree.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
    }, []);

    const navigateToNextItemAction = React.useCallback((reverse: boolean, fromContent: HTMLElement) => {
      const tree = treeRef.current;
      if (!tree) return;
      const allContents = Array.from(
        tree.querySelectorAll<HTMLElement>('.MuiTreeItem-content'),
      ).filter((el) => { return el.offsetParent !== null && !el.classList.contains('Mui-disabled'); });
      const currentIndex = allContents.indexOf(fromContent);
      const step = reverse ? -1 : 1;
      for (let i = currentIndex + step; reverse ? i >= 0 : i < allContents.length; i += step) {
        const buttons = allContents[i].querySelectorAll<HTMLElement>(
          '.tree-item-end-action button:not([disabled]), .tree-item-hover-actions button:not([disabled])',
        );
        if (buttons.length > 0) {
          buttons[0].focus();
          return;
        }
      }
      tree.focus();
    }, []);

    // Tab key: if a tree item has Mui-focused, move to its first action button.
    const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLUListElement>) => {
      if (e.key === 'Tab' && !e.shiftKey) {
        const focusedContent = treeRef.current?.querySelector<HTMLElement>('.MuiTreeItem-content.Mui-focused');
        if (focusedContent) {
          const buttons = Array.from(
            focusedContent.querySelectorAll<HTMLElement>(
              '.tree-item-end-action button:not([disabled]), .tree-item-hover-actions button:not([disabled])',
            ),
          );
          if (buttons.length > 0) {
            e.preventDefault();
            buttons[0].focus();
          }
        }
      }
    }, []);

    const contextValue = React.useMemo(
      () => {
        return {
          usingKeyboardRef: isKeyboardNav, focusTree, navigateWithKey, navigateToNextItemAction, showLevelLine, disabled,
        };
      },
      [focusTree, navigateWithKey, navigateToNextItemAction, showLevelLine, disabled],
    );

    return (
      <TreeViewContext.Provider value={contextValue}>
        <MuiTreeView
          ref={combinedRef}
          defaultCollapseIcon={defaultCollapseIcon ?? <ChevronDownIcon />}
          defaultExpandIcon={defaultExpandIcon ?? <ChevronRight />}
          onMouseLeave={handleMouseLeave}
          onKeyDown={handleKeyDown}
          {...rest}
        />
      </TreeViewContext.Provider>
    );
  },
);

TreeView.displayName = 'TreeView';

export * from '@mui/lab/TreeView';
export { default as TreeItem } from './TreeItem';
export type { EnhancedTreeItemProps, TreeViewContextValue } from './TreeItem';
export default TreeView;
