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
import React, { ReactNode } from 'react';
import MuiTreeItem, { TreeItemProps } from '@mui/lab/TreeItem';
// @ts-ignore - accessing MUI Lab's internal TreeViewContext (private API, no type declarations available)
import MuiTreeViewInternalContextRaw from '@mui/lab/TreeView/TreeViewContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const MuiTreeViewInternalContext = MuiTreeViewInternalContextRaw as React.Context<{ focus?: (event: unknown, nodeId: string) => void }>;

/**
 * Context tracking nesting depth (0 = root level).
 * Used to compute the level-line position and content padding.
 */
export const TreeDepthContext = React.createContext(0);

export interface TreeViewContextValue {
  usingKeyboardRef: React.MutableRefObject<boolean>;
  focusTree: () => void;
  navigateWithKey: (key: string) => void;
  navigateToNextItemAction: (reverse: boolean, fromContent: HTMLElement) => void;
  showLevelLine: boolean;
}
export const TreeViewContext = React.createContext<TreeViewContextValue>({
  usingKeyboardRef: { current: false },
  focusTree: () => { return undefined; },
  navigateWithKey: () => { return undefined; },
  navigateToNextItemAction: () => { return undefined; },
  showLevelLine: true,
});

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

const ICON_SLOT_SX = {
  width: 16,
  height: 16,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& svg': { fontSize: '16px' },
} as const;
const IconSlot = ({ className, children }: { className?: string; children: ReactNode }) => {
  return (
    <Box
      className={`tree-item-icon${className ? ` ${className}` : ''}`}
      sx={ICON_SLOT_SX}
    >
      {children}
    </Box>
  );
};

const TreeItem = React.forwardRef<HTMLLIElement, EnhancedTreeItemProps>(
  (
    {
      label,
      startIcon,
      statusBadge,
      detailsIcon,
      detailsText,
      detailsAlign = 'label',
      endIcon,
      endAction,
      hoverActions,
      children,
      ...props
    },
    ref,
  ) => {
    const depth = React.useContext(TreeDepthContext);
    const {
      usingKeyboardRef, focusTree, navigateToNextItemAction, showLevelLine,
    } = React.useContext(TreeViewContext);
    // Access MUI's internal focus(event, nodeId) — lets us set focusedNodeId
    // to the correct item before dispatching arrow keys, bypassing MUI's
    // handleBlur-clears-focusedNodeId + handleFocus-restores-to-firstSelected issue.
    const muiFocus = (React.useContext(MuiTreeViewInternalContext) as { focus?: (e: unknown, nodeId: string) => void }).focus;

    // Per-item focus ring — Accordion pattern:
    // Each item watches its own content for Mui-focused class changes,
    // and shows the ring only when keyboard is being used.
    const liRef = React.useRef<HTMLLIElement>(null);
    const [isFocused, setIsFocused] = React.useState(false);

    React.useEffect(() => {
      const li = liRef.current;
      if (!li) return undefined;
      const content = li.querySelector('.MuiTreeItem-content');
      if (!content) return undefined;
      const observer = new MutationObserver(() => {
        setIsFocused(content.classList.contains('Mui-focused') && usingKeyboardRef.current);
      });
      observer.observe(content, { attributes: true, attributeFilter: ['class'] });
      return () => { return observer.disconnect(); };
    }, [usingKeyboardRef]);

    // Combine the forwarded ref with our own liRef.
    const setRef = React.useCallback((node: HTMLLIElement) => {
      (liRef as React.MutableRefObject<HTMLLIElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLLIElement | null>).current = node;
    }, [ref]);

    const handleActionKeyDown = (e: React.KeyboardEvent) => {
      const treeUl = (e.currentTarget as HTMLElement).closest<HTMLElement>('ul[role="tree"]');
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!treeUl) { focusTree(); return; }
        const li = (e.currentTarget as HTMLElement).closest<HTMLElement>('li[role="treeitem"]');
        const content = li?.querySelector<HTMLElement>('.MuiTreeItem-content');
        const allContents = Array.from(
          treeUl.querySelectorAll<HTMLElement>('.MuiTreeItem-content'),
        ).filter((el) => { return el.offsetParent !== null && !el.classList.contains('Mui-disabled'); });
        const currentIndex = content ? allContents.indexOf(content) : -1;
        const targetIndex = currentIndex + (e.key === 'ArrowDown' ? 1 : -1);
        if (currentIndex === -1 || targetIndex < 0 || targetIndex >= allContents.length) {
          focusTree();
          return;
        }
        const targetLi = allContents[targetIndex].closest<HTMLElement>('li[role="treeitem"]');
        const treeId = treeUl.id;
        const liId = targetLi?.id ?? '';
        const targetNodeId = treeId && liId.startsWith(`${treeId}-`)
          ? liId.slice(treeId.length + 1)
          : liId;
        if (!targetNodeId) { focusTree(); return; }
        // Focus tree (MUI handleFocus restores to firstSelected || first).
        // Override in rAF after React flushes that state update.
        treeUl.focus();
        requestAnimationFrame(() => { muiFocus?.(e, targetNodeId); });
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        if (!treeUl) { focusTree(); return; }
        const { key } = e;
        // Two rAFs: first sets focusedNodeId to THIS item, second dispatches the key.
        treeUl.focus();
        requestAnimationFrame(() => {
          muiFocus?.(e, props.nodeId);
          requestAnimationFrame(() => {
            treeUl.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
          });
        });
      } else if (e.key === 'Home' || e.key === 'End') {
        e.preventDefault();
        if (!treeUl) { focusTree(); return; }
        const { key } = e;
        // after handleFocus sets any focusedNodeId (needed to pass MUI's guard).
        treeUl.focus();
        requestAnimationFrame(() => {
          treeUl.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
        });
      } else if (e.key === 'Escape') {
        e.stopPropagation();
        focusTree();
      } else if (e.key === 'Tab') {
        const li = (e.currentTarget as HTMLElement).closest<HTMLElement>('li[role="treeitem"]') ?? undefined;
        const content = li?.querySelector<HTMLElement>('.MuiTreeItem-content');
        if (content) {
          e.preventDefault();
          navigateToNextItemAction(e.shiftKey, content);
        }
      }
    };

    // Content left padding: 4px (root) + 8px per nesting level.
    // Keeps caret visually at 4px + depth*8 from the left edge.
    const contentPaddingLeft = depth > 0 ? 4 + depth * 8 : undefined;

    // Vertical level line sits at the horizontal center of the parent's caret:
    // 4px (content padding) + 8px (half of 16px icon) = 12px, minus 1px (line width) = 11px base.
    // Each deeper level adds 8px (= half icon width).
    const lineLeft = 11 + depth * 8;

    // Wrap children: render the real line div + increment depth for grandchildren.
    const wrappedChildren = children ? (
      <TreeDepthContext.Provider value={depth + 1}>
        {showLevelLine && (
          <Box
            aria-hidden
            className="tree-level-line"
            sx={(theme) => {
              return {
                position: 'absolute',
                left: `${lineLeft}px`,
                top: 0,
                bottom: 0,
                width: '1px',
                backgroundColor: theme.palette.border.secondary,
                pointerEvents: 'none',
                zIndex: 0,
              };
            }}
          />
        )}
        {children}
      </TreeDepthContext.Provider>
    ) : undefined;
    const customLabel = (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          gap: '4px',
          overflow: 'hidden',
          minWidth: 0,
        }}
      >
        {startIcon && <IconSlot className="tree-item-start-icon">{startIcon}</IconSlot>}

        {statusBadge && (
          <Box className="tree-item-icon tree-item-status" sx={ICON_SLOT_SX}>
            {statusBadge}
          </Box>
        )}

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          flex: 1,
          minWidth: 0,
          overflow: 'hidden',
        }}
        >
          <Typography
            className="tree-item-label-text"
            variant="body2"
            color="text.primary"
            noWrap
            sx={{
              flexShrink: 1,
              minWidth: 0,
            }}
          >
            {label}
          </Typography>

          {detailsAlign === 'label' && (detailsIcon !== undefined || detailsText !== undefined) && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                flexShrink: 0,
              }}
            >
              {detailsIcon && <IconSlot className="tree-item-details-icon">{detailsIcon}</IconSlot>}
              {detailsText !== undefined && (
                <Typography className="tree-item-details-text" variant="body2" color="text.secondary" noWrap sx={{ flexShrink: 0 }}>
                  {detailsText}
                </Typography>
              )}
            </Box>
          )}
        </Box>

        {detailsAlign === 'end' && (detailsIcon !== undefined || detailsText !== undefined) && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              flexShrink: 0,
            }}
          >
            {detailsIcon && <IconSlot className="tree-item-details-icon">{detailsIcon}</IconSlot>}
            {detailsText !== undefined && (
              <Typography className="tree-item-details-text" variant="body2" color="text.secondary" noWrap sx={{ flexShrink: 0 }}>
                {detailsText}
              </Typography>
            )}
          </Box>
        )}

        {(endIcon !== undefined || endAction !== undefined) && (
          <Box
            className="tree-item-end-action"
            onClick={(e) => { e.stopPropagation(); }}
            onKeyDown={handleActionKeyDown}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexShrink: 0,
            }}
          >
            {endIcon && (
            <IconSlot
              className="tree-item-end-icon"
            >
              {endIcon}
            </IconSlot>
            )}
            {endAction}
          </Box>
        )}

        {hoverActions && (
          <Box
            className="tree-item-hover-actions"
            onClick={(e) => { e.stopPropagation(); }}
            onKeyDown={handleActionKeyDown}
            sx={{
              maxWidth: 0,
              overflow: 'hidden',
              opacity: 0,
              transition: 'max-width 0.2s ease, opacity 0.2s ease',
              display: 'flex',
              flexShrink: 0,
              alignItems: 'center',
              gap: '8px',
              marginLeft: '4px',
              '.MuiTreeItem-content:hover &, .MuiTreeItem-content.Mui-focused &, .MuiTreeItem-content:focus-within &': {
                maxWidth: '200px',
                opacity: 1,
              },
            }}
          >
            {hoverActions}
          </Box>
        )}
      </Box>
    );

    return (
      <MuiTreeItem
        ref={setRef}
        className={isFocused ? 'keyboard-focused' : undefined}
        ContentProps={contentPaddingLeft !== undefined ? { style: { paddingLeft: `${contentPaddingLeft}px` } } : undefined}
        {...props}
        label={customLabel}
      >
        {wrappedChildren}
      </MuiTreeItem>
    );
  },
);

TreeItem.displayName = 'TreeItem';

export * from '@mui/lab/TreeItem';
export default TreeItem;
