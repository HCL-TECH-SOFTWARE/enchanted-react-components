"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeViewContext = exports.TreeDepthContext = void 0;
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
const react_1 = __importDefault(require("react"));
const TreeItem_1 = __importDefault(require("@mui/lab/TreeItem"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
/**
 * Context tracking nesting depth (0 = root level).
 * Used to compute the level-line position and content padding.
 */
exports.TreeDepthContext = react_1.default.createContext(0);
exports.TreeViewContext = react_1.default.createContext({
    usingKeyboardRef: { current: false },
    focusTree: () => { return undefined; },
    navigateWithKey: () => { return undefined; },
    navigateToNextItemAction: () => { return undefined; },
    showLevelLine: true,
});
const ICON_SLOT_SX = {
    width: 16,
    height: 16,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': { fontSize: '16px' },
};
const IconSlot = ({ className, children }) => {
    return (react_1.default.createElement(Box_1.default, { "aria-hidden": "true", className: `tree-item-icon${className ? ` ${className}` : ''}`, sx: ICON_SLOT_SX }, children));
};
const TreeItem = react_1.default.forwardRef((_a, ref) => {
    var { label, startIcon, statusBadge, detailsIcon, detailsText, detailsAlign = 'label', endIcon, endAction, hoverActions, children, disabled } = _a, props = __rest(_a, ["label", "startIcon", "statusBadge", "detailsIcon", "detailsText", "detailsAlign", "endIcon", "endAction", "hoverActions", "children", "disabled"]);
    const depth = react_1.default.useContext(exports.TreeDepthContext);
    const { usingKeyboardRef, focusTree, navigateToNextItemAction, showLevelLine, disabled: contextDisabled, } = react_1.default.useContext(exports.TreeViewContext);
    // Each item watches its own content for Mui-focused class changes,
    // and shows the ring only when keyboard is being used.
    const liRef = react_1.default.useRef(null);
    const [isFocused, setIsFocused] = react_1.default.useState(false);
    react_1.default.useEffect(() => {
        const li = liRef.current;
        if (!li)
            return undefined;
        const content = li.querySelector('.MuiTreeItem-content');
        if (!content)
            return undefined;
        const observer = new MutationObserver(() => {
            setIsFocused(content.classList.contains('Mui-focused') && usingKeyboardRef.current);
        });
        observer.observe(content, { attributes: true, attributeFilter: ['class'] });
        return () => { return observer.disconnect(); };
    }, [usingKeyboardRef]);
    // Combine the forwarded ref with our own liRef.
    const setRef = react_1.default.useCallback((node) => {
        liRef.current = node;
        if (typeof ref === 'function')
            ref(node);
        else if (ref)
            ref.current = node;
    }, [ref]);
    // Get all buttons in a container
    const getActionButtons = react_1.default.useCallback((container) => {
        if (!container)
            return [];
        return Array.from(container.querySelectorAll('button:not([disabled]), [role="button"]:not([aria-disabled="true"])'));
    }, []);
    const handleActionKeyDown = react_1.default.useCallback((e) => {
        var _a;
        const treeUl = e.currentTarget.closest('ul[role="tree"]');
        const { key } = e;
        // Button navigation logic (Tab, ArrowLeft, ArrowRight)
        if (key === 'ArrowLeft' || key === 'ArrowRight' || key === 'Tab') {
            const buttons = getActionButtons(e.currentTarget);
            const currentButton = e.target.closest('button, [role="button"]');
            const currentIndex = currentButton ? buttons.indexOf(currentButton) : -1;
            // If there are multiple buttons, try to navigate between them first
            if (buttons.length > 1 && currentIndex > -1) {
                const isRtl = treeUl ? getComputedStyle(treeUl).direction === 'rtl' : false;
                let isNextButton = false;
                if (key === 'Tab') {
                    // Tab moves forward, Shift+Tab moves backward
                    isNextButton = !e.shiftKey;
                }
                else {
                    // Handle RTL/LTR Arrow navigation
                    isNextButton = (isRtl && key === 'ArrowLeft') || (!isRtl && key === 'ArrowRight');
                }
                const nextIndex = isNextButton ? currentIndex + 1 : currentIndex - 1;
                // If the next button exists, focus it and stop.
                // (If it doesn't exist, let it fall through to the rest of the code!)
                if (nextIndex >= 0 && nextIndex < buttons.length) {
                    e.preventDefault();
                    e.stopPropagation();
                    buttons[nextIndex].focus();
                    return;
                }
            }
        }
        // Button navigation logic (ArrowDown, ArrowUp)
        if (key === 'ArrowDown' || key === 'ArrowUp') {
            e.preventDefault();
            e.stopPropagation();
            if (!treeUl) {
                focusTree();
                return;
            }
            const li = e.currentTarget.closest('li[role="treeitem"]');
            const content = li === null || li === void 0 ? void 0 : li.querySelector('.MuiTreeItem-content');
            const allContents = Array.from(treeUl.querySelectorAll('.MuiTreeItem-content')).filter((el) => { return el.offsetParent !== null && !el.classList.contains('Mui-disabled'); });
            const currentIndex = content ? allContents.indexOf(content) : -1;
            const targetIndex = currentIndex + (key === 'ArrowDown' ? 1 : -1);
            if (currentIndex === -1 || targetIndex < 0 || targetIndex >= allContents.length) {
                focusTree();
                return;
            }
            // Focus the target li element — MUI's handleFocus on li fires only when
            // li itself is focused (currentTarget === target), which then calls
            // setFocusedNodeId(nodeId) and redirects DOM focus to the tree ul.
            const targetLi = allContents[targetIndex].closest('li[role="treeitem"]');
            targetLi === null || targetLi === void 0 ? void 0 : targetLi.focus();
        }
        else if (key === 'ArrowLeft' || key === 'ArrowRight') {
            e.preventDefault();
            e.stopPropagation();
            if (!treeUl) {
                focusTree();
                return;
            }
            // Focus this item's li so MUI sets focusedNodeId to this node,
            // then dispatch the key so MUI's handleKeyDown acts on the correct node.
            const thisLi = e.currentTarget.closest('li[role="treeitem"]');
            thisLi === null || thisLi === void 0 ? void 0 : thisLi.focus();
            requestAnimationFrame(() => {
                treeUl.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
            });
        }
        else if (key === 'Home' || key === 'End') {
            e.preventDefault();
            e.stopPropagation();
            if (!treeUl) {
                focusTree();
                return;
            }
            // after handleFocus sets any focusedNodeId (needed to pass MUI's guard).
            treeUl.focus();
            requestAnimationFrame(() => {
                treeUl.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
            });
        }
        else if (key === 'Escape') {
            e.stopPropagation();
            focusTree();
        }
        else if (key === 'Tab') {
            const li = (_a = e.currentTarget.closest('li[role="treeitem"]')) !== null && _a !== void 0 ? _a : undefined;
            const content = li === null || li === void 0 ? void 0 : li.querySelector('.MuiTreeItem-content');
            if (content) {
                e.preventDefault();
                navigateToNextItemAction(e.shiftKey, content);
            }
        }
    }, [focusTree, navigateToNextItemAction, getActionButtons]);
    const contentPaddingLeft = depth > 0 ? 4 + depth * 8 : undefined;
    // Vertical level line sits at the horizontal center of the parent's caret:
    const lineLeft = 11 + depth * 8;
    // Wrap children: render the real line div + increment depth for grandchildren.
    const wrappedChildren = children ? (react_1.default.createElement(exports.TreeDepthContext.Provider, { value: depth + 1 },
        showLevelLine && (react_1.default.createElement(Box_1.default, { "aria-hidden": true, className: "tree-level-line", sx: (theme) => {
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
            } })),
        children)) : undefined;
    const customLabel = (react_1.default.createElement(Box_1.default, { sx: {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            gap: '4px',
            overflow: 'hidden',
            minWidth: 0,
        } },
        startIcon && react_1.default.createElement(IconSlot, { className: "tree-item-start-icon" }, startIcon),
        statusBadge && (react_1.default.createElement(Box_1.default, { "aria-hidden": "true", className: "tree-item-icon tree-item-status", sx: ICON_SLOT_SX }, statusBadge)),
        react_1.default.createElement(Box_1.default, { sx: {
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                flex: 1,
                minWidth: 0,
                overflow: 'hidden',
            } },
            react_1.default.createElement(Typography_1.default, { className: "tree-item-label-text", variant: "body2", color: "text.primary", noWrap: true, sx: {
                    flexShrink: 1,
                    minWidth: 0,
                } }, label),
            detailsAlign === 'label' && (detailsIcon !== undefined || detailsText !== undefined) && (react_1.default.createElement(Box_1.default, { sx: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    flexShrink: 0,
                } },
                detailsIcon && react_1.default.createElement(IconSlot, { className: "tree-item-details-icon" }, detailsIcon),
                detailsText !== undefined && (react_1.default.createElement(Typography_1.default, { className: "tree-item-details-text", variant: "body2", color: "text.secondary", noWrap: true, sx: { flexShrink: 0 } }, detailsText))))),
        detailsAlign === 'end' && (detailsIcon !== undefined || detailsText !== undefined) && (react_1.default.createElement(Box_1.default, { sx: {
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                flexShrink: 0,
            } },
            detailsIcon && react_1.default.createElement(IconSlot, { className: "tree-item-details-icon" }, detailsIcon),
            detailsText !== undefined && (react_1.default.createElement(Typography_1.default, { className: "tree-item-details-text", variant: "body2", color: "text.secondary", noWrap: true, sx: { flexShrink: 0 } }, detailsText)))),
        (endIcon !== undefined || endAction !== undefined) && (react_1.default.createElement(Box_1.default, { className: "tree-item-end-action", onClick: (e) => { e.stopPropagation(); }, onKeyDown: handleActionKeyDown, sx: {
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flexShrink: 0,
            } },
            endIcon && (react_1.default.createElement(IconSlot, { className: "tree-item-end-icon" }, endIcon)),
            endAction)),
        hoverActions && (react_1.default.createElement(Box_1.default, { className: "tree-item-hover-actions", onClick: (e) => { e.stopPropagation(); }, onKeyDown: handleActionKeyDown, sx: {
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
            } }, hoverActions))));
    return (react_1.default.createElement(TreeItem_1.default, Object.assign({ ref: setRef, className: isFocused ? 'keyboard-focused' : undefined, ContentProps: contentPaddingLeft !== undefined ? { style: { paddingInlineStart: `${contentPaddingLeft}px` } } : undefined }, props, { disabled: contextDisabled || disabled, label: customLabel }), wrappedChildren));
});
TreeItem.displayName = 'TreeItem';
__exportStar(require("@mui/lab/TreeItem"), exports);
exports.default = TreeItem;
