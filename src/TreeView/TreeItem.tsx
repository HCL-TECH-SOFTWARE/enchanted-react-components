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
import React, { ReactNode } from 'react';
import MuiTreeItem, { TreeItemProps } from '@mui/lab/TreeItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
  /** When true, all tree items are disabled regardless of their own disabled prop. */
  disabled?: boolean;
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
  /** Props applied to the end-action container (e.g., id/data-testid/handlers). */
  endActionProps?: React.HTMLAttributes<HTMLDivElement>;
  /** Props applied to the hover-actions container (e.g., id/data-testid/handlers). */
  hoverActionsProps?: React.HTMLAttributes<HTMLDivElement>;
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
      aria-hidden="true"
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
      endActionProps,
      hoverActionsProps,
      children,
      disabled,
      ContentProps,
      ...props
    },
    ref,
  ) => {
    const depth = React.useContext(TreeDepthContext);
    const {
      usingKeyboardRef, focusTree, navigateWithKey, navigateToNextItemAction, showLevelLine, disabled: contextDisabled,
    } = React.useContext(TreeViewContext);

    // Each item watches its own content for Mui-focused class changes,
    // and shows the ring only when keyboard is being used.
    const liRef = React.useRef<HTMLLIElement>(null);
    const endActionContainerRef = React.useRef<HTMLDivElement>(null);
    const hoverActionContainerRef = React.useRef<HTMLDivElement>(null);
    const wasFocusedInActionRef = React.useRef(false);
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

    // Focus the tree item when the end action is clicked
    const focusTreeItemNode = React.useCallback(() => {
      liRef.current?.focus();
    }, []);

    // Get all buttons in a container
    const getActionButtons = React.useCallback((container: HTMLElement | null) => {
      if (!container) return [] as HTMLElement[];
      return Array.from(
        container.querySelectorAll<HTMLElement>('button:not([disabled]), [role="button"]:not([aria-disabled="true"])'),
      );
    }, []);

    // Check if the active element is in the action container
    const isActionContainerFocused = React.useCallback(() => {
      const active = document.activeElement as HTMLElement | null;
      if (!active) return false;
      return Boolean(
        endActionContainerRef.current?.contains(active)
        || hoverActionContainerRef.current?.contains(active),
      );
    }, []);

    React.useLayoutEffect(() => {
      if (!wasFocusedInActionRef.current) return;
      if (!isActionContainerFocused()) {
        focusTreeItemNode();
        wasFocusedInActionRef.current = false;
      }
    }, [endAction, hoverActions, focusTreeItemNode, isActionContainerFocused]);

    const handleActionKeyDown = React.useCallback((e: React.KeyboardEvent) => {
      const treeUl = (e.currentTarget as HTMLElement).closest<HTMLElement>('ul[role="tree"]');
      // const isArrowLeft = e.key === 'ArrowLeft';
      // const isArrowRight = e.key === 'ArrowRight';
      // const isTab = e.key === 'Tab';

      // if (isArrowLeft || isArrowRight || isTab) {
      //   const buttons = getActionButtons(e.currentTarget as HTMLElement);
      //   const currentButton = (e.target as HTMLElement).closest<HTMLElement>('button, [role="button"]');
      //   const currentIndex = currentButton ? buttons.indexOf(currentButton) : -1;
      //   if (buttons.length > 1 && currentIndex > -1) {

      //     // If the arrow key is pressed on the last/first button, move to the next/previous button.
      //     const isRtl = treeUl ? getComputedStyle(treeUl).direction === 'rtl' : false;
      //     const isNextButton = (isRtl && isArrowLeft) || (!isRtl && isArrowRight);
      //     const nextIndex = isNextButton ? currentIndex + 1 : currentIndex - 1;
      //     if (nextIndex >= 0 && nextIndex < buttons.length) {
      //       e.preventDefault();
      //       e.stopPropagation();
      //       buttons[nextIndex].focus();
      //       return;
      //     }
      //   }
      const isArrowLeft = e.key === 'ArrowLeft';
      const isArrowRight = e.key === 'ArrowRight';
      const isTab = e.key === 'Tab';

      // If the arrow key is pressed on the last/first button, move to the next/previous button.
      if (isArrowLeft || isArrowRight || isTab) {
        const buttons = getActionButtons(e.currentTarget as HTMLElement);
        const currentButton = (e.target as HTMLElement).closest<HTMLElement>('button, [role="button"]');
        const currentIndex = currentButton ? buttons.indexOf(currentButton) : -1;
        
        if (buttons.length > 1 && currentIndex > -1) {
          const isRtl = treeUl ? getComputedStyle(treeUl).direction === 'rtl' : false;
          
          let isNextButton = false;

          if (isTab) {
            // In RTL, moving forward in the DOM naturally moves focus to the left visually!
            isNextButton = !e.shiftKey; 
          } else {
            isNextButton = (isRtl && isArrowLeft) || (!isRtl && isArrowRight);
          }

          const nextIndex = isNextButton ? currentIndex + 1 : currentIndex - 1;
          
          if (nextIndex >= 0 && nextIndex < buttons.length) {
            e.preventDefault();
            e.stopPropagation();
            buttons[nextIndex].focus();
            return;
          }
        }
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        e.stopPropagation();
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
        // Focus the target li element — MUI's handleFocus on li fires only when
        // li itself is focused (currentTarget === target), which then calls
        // setFocusedNodeId(nodeId) and redirects DOM focus to the tree ul.
        const targetLi = allContents[targetIndex].closest<HTMLElement>('li[role="treeitem"]');
        targetLi?.focus();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        e.stopPropagation();
        if (!treeUl) { focusTree(); return; }
        const { key } = e;

        // From action buttons, allow direct navigation into first child when already expanded.
        const thisLi = (e.currentTarget as HTMLElement).closest<HTMLElement>('li[role="treeitem"]');
        if (!thisLi) {
          navigateWithKey(key);
          return;
        }

        // Determine if we should expand or collapse.
        const isRtl = getComputedStyle(treeUl).direction === 'rtl';
        const expandKey = isRtl ? 'ArrowLeft' : 'ArrowRight';
        const collapseKey = isRtl ? 'ArrowRight' : 'ArrowLeft';
        const expanded = thisLi.getAttribute('aria-expanded');

        // From action buttons, allow direct navigation into first child when already expanded.
        if (key === expandKey && expanded === 'true') {
          const childGroup = Array.from(thisLi.children).find((child) => {
            return child.classList.contains('MuiTreeItem-group');
          });
          const firstChildLi = childGroup?.querySelector<HTMLElement>('li[role="treeitem"]:not(.Mui-disabled)');
          if (firstChildLi) {
            firstChildLi.focus();
            return;
          }
        }

        // From action buttons, allow navigating back to parent when already collapsed.
        if (key === collapseKey && expanded !== 'true') {
          const parentLi = thisLi.parentElement?.closest<HTMLElement>('li[role="treeitem"]');
          if (parentLi) {
            parentLi.focus();
            return;
          }
        }

        // Focus this item's li so MUI sets focusedNodeId to this node,
        // then dispatch the key so MUI's handleKeyDown acts on the correct node.
        thisLi?.focus();
        requestAnimationFrame(() => {
          treeUl.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
        });
      } else if (e.key === 'Home' || e.key === 'End') {
        e.preventDefault();
        e.stopPropagation();
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
    }, [focusTree, navigateToNextItemAction, navigateWithKey, getActionButtons]);

    const contentPaddingLeft = depth > 0 ? 4 + depth * 8 : undefined;

    // Vertical level line sits at the horizontal center of the parent's caret:
    const lineLeft = 11 + depth * 8;

    const mergedContentProps = React.useMemo(() => {
      const mergedStyle = {
        ...(ContentProps?.style ?? {}),
        ...(contentPaddingLeft !== undefined ? { paddingInlineStart: `${contentPaddingLeft}px` } : {}),
      };
      return {
        ...ContentProps,
        style: mergedStyle,
      };
    }, [ContentProps, contentPaddingLeft]);

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
                insetInlineStart: `${lineLeft}px`,
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
          <Box aria-hidden="true" className="tree-item-icon tree-item-status" sx={ICON_SLOT_SX}>
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
            {...endActionProps}
            ref={endActionContainerRef}
            className={`tree-item-end-action${endActionProps?.className ? ` ${endActionProps.className}` : ''}`}
            onClick={(e) => {
              endActionProps?.onClick?.(e);
              e.stopPropagation();
            }}
            onFocusCapture={(e) => {
              endActionProps?.onFocusCapture?.(e);
              wasFocusedInActionRef.current = true;
            }}
            onBlurCapture={(e) => {
              endActionProps?.onBlurCapture?.(e);
              requestAnimationFrame(() => {
                if (!isActionContainerFocused()) {
                  wasFocusedInActionRef.current = false;
                }
              });
            }}
            onKeyDown={(e) => {
              endActionProps?.onKeyDown?.(e);
              handleActionKeyDown(e);
            }}
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
            {...hoverActionsProps}
            ref={hoverActionContainerRef}
            className={`tree-item-hover-actions${hoverActionsProps?.className ? ` ${hoverActionsProps.className}` : ''}`}
            onClick={(e) => {
              hoverActionsProps?.onClick?.(e);
              e.stopPropagation();
            }}
            onFocusCapture={(e) => {
              hoverActionsProps?.onFocusCapture?.(e);
              wasFocusedInActionRef.current = true;
            }}
            onBlurCapture={(e) => {
              hoverActionsProps?.onBlurCapture?.(e);
              requestAnimationFrame(() => {
                if (!isActionContainerFocused()) {
                  wasFocusedInActionRef.current = false;
                }
              });
            }}
            onKeyDown={(e) => {
              hoverActionsProps?.onKeyDown?.(e);
              handleActionKeyDown(e);
            }}
            sx={{
              maxWidth: 0,
              overflow: 'hidden',
              opacity: 0,
              visibility: 'hidden',
              transition: 'max-width 0.2s ease, opacity 0.2s ease, visibility 0s 0.2s',
              display: 'flex',
              flexShrink: 0,
              alignItems: 'center',
              gap: '8px',
              marginLeft: '4px',
              '.MuiTreeItem-content:hover &, .MuiTreeItem-content.Mui-focused &, &:focus-within': {
                maxWidth: '200px',
                opacity: 1,
                visibility: 'visible',
                transition: 'max-width 0.2s ease, opacity 0.2s ease, visibility 0s',
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
        ContentProps={mergedContentProps}
        {...props}
        disabled={contextDisabled || disabled}
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
