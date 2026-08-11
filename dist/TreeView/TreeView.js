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
exports.TreeItem = exports.getMuiTreeViewThemeOverrides = exports.TreeDepthContext = exports.TreeViewContext = void 0;
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
const TreeView_1 = __importDefault(require("@mui/lab/TreeView"));
require("@mui/lab/themeAugmentation");
const styles_1 = require("@mui/material/styles");
const chevron__down_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/chevron--down"));
const chevron__right_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/chevron--right"));
const chevron__left_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/chevron--left"));
const TreeItem_1 = require("./TreeItem");
var TreeItem_2 = require("./TreeItem");
Object.defineProperty(exports, "TreeViewContext", { enumerable: true, get: function () { return TreeItem_2.TreeViewContext; } });
Object.defineProperty(exports, "TreeDepthContext", { enumerable: true, get: function () { return TreeItem_2.TreeDepthContext; } });
/**
 * Override out of the box styling from MUI to align with designer theme.
 * @returns override TreeView and TreeItem component styles and props
 */
const getMuiTreeViewThemeOverrides = () => {
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
                root: ({ theme }) => {
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
                        '& .MuiTreeItem-label': Object.assign(Object.assign({ padding: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }, theme.typography.body2), { color: theme.palette.text.primary }),
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
exports.getMuiTreeViewThemeOverrides = getMuiTreeViewThemeOverrides;
const TreeView = react_1.default.forwardRef((props, ref) => {
    const { defaultCollapseIcon, defaultExpandIcon, onMouseLeave, showLevelLine = true, disabled } = props, rest = __rest(props, ["defaultCollapseIcon", "defaultExpandIcon", "onMouseLeave", "showLevelLine", "disabled"]);
    const theme = (0, styles_1.useTheme)();
    const treeRef = react_1.default.useRef(null);
    // Accordion pattern: ref (not state) so MutationObserver callbacks read it synchronously.
    const isKeyboardNav = react_1.default.useRef(false);
    const combinedRef = (node) => {
        treeRef.current = node;
        if (typeof ref === 'function')
            ref(node);
        else if (ref)
            ref.current = node;
    };
    // Accordion pattern: window-level keydown/mousedown listeners.
    react_1.default.useEffect(() => {
        const handleWinKeyDown = () => { isKeyboardNav.current = true; };
        const handleWinMouseDown = () => { isKeyboardNav.current = false; };
        window.addEventListener('keydown', handleWinKeyDown);
        window.addEventListener('mousedown', handleWinMouseDown);
        return () => {
            window.removeEventListener('keydown', handleWinKeyDown);
            window.removeEventListener('mousedown', handleWinMouseDown);
        };
    }, []);
    const handleMouseLeave = (e) => {
        const active = document.activeElement;
        if (active && e.currentTarget.contains(active) && !active.matches(':focus-visible')) {
            active.blur();
        }
        onMouseLeave === null || onMouseLeave === void 0 ? void 0 : onMouseLeave(e);
    };
    const focusTree = react_1.default.useCallback(() => {
        var _a;
        (_a = treeRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, []);
    // Arrow key from action button: return DOM focus to tree ul so MUI restores
    // its internal focusedNodeId (synchronous ref update), then dispatch the key.
    const navigateWithKey = react_1.default.useCallback((key) => {
        const tree = treeRef.current;
        if (!tree)
            return;
        tree.focus();
        tree.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
    }, []);
    const navigateToNextItemAction = react_1.default.useCallback((reverse, fromContent) => {
        const tree = treeRef.current;
        if (!tree)
            return;
        const allContents = Array.from(tree.querySelectorAll('.MuiTreeItem-content')).filter((el) => { return el.offsetParent !== null && !el.classList.contains('Mui-disabled'); });
        const currentIndex = allContents.indexOf(fromContent);
        const step = reverse ? -1 : 1;
        for (let i = currentIndex + step; reverse ? i >= 0 : i < allContents.length; i += step) {
            const buttons = allContents[i].querySelectorAll('.tree-item-end-action button:not([disabled]), .tree-item-hover-actions button:not([disabled])');
            if (buttons.length > 0) {
                buttons[0].focus();
                return;
            }
        }
        tree.focus();
    }, []);
    // Tab key: if a tree item has Mui-focused, move to its first action button.
    const handleKeyDown = react_1.default.useCallback((e) => {
        var _a;
        if (e.key === 'Tab' && !e.shiftKey) {
            const focusedContent = (_a = treeRef.current) === null || _a === void 0 ? void 0 : _a.querySelector('.MuiTreeItem-content.Mui-focused');
            if (focusedContent) {
                const buttons = Array.from(focusedContent.querySelectorAll('.tree-item-end-action button:not([disabled]), .tree-item-hover-actions button:not([disabled])'));
                if (buttons.length > 0) {
                    e.preventDefault();
                    buttons[0].focus();
                }
            }
        }
    }, []);
    const contextValue = react_1.default.useMemo(() => {
        return {
            usingKeyboardRef: isKeyboardNav, focusTree, navigateWithKey, navigateToNextItemAction, showLevelLine, disabled,
        };
    }, [focusTree, navigateWithKey, navigateToNextItemAction, showLevelLine, disabled]);
    // If the user has not provided a defaultExpandIcon, we will use the default ChevronRight or ChevronLeft icon based on the theme direction.
    const resolvedExpandIcon = react_1.default.useMemo(() => {
        if (defaultExpandIcon)
            return defaultExpandIcon;
        const ExpandIcon = theme.direction === 'rtl' ? chevron__left_1.default : chevron__right_1.default;
        return react_1.default.createElement(ExpandIcon, { "data-testid": "treeview-default-expand-icon", "data-icon-direction": theme.direction });
    }, [defaultExpandIcon, theme.direction]);
    return (react_1.default.createElement(TreeItem_1.TreeViewContext.Provider, { value: contextValue },
        react_1.default.createElement(TreeView_1.default, Object.assign({ ref: combinedRef, defaultCollapseIcon: defaultCollapseIcon !== null && defaultCollapseIcon !== void 0 ? defaultCollapseIcon : react_1.default.createElement(chevron__down_1.default, null), defaultExpandIcon: resolvedExpandIcon, onMouseLeave: handleMouseLeave, onKeyDown: handleKeyDown }, rest))));
});
TreeView.displayName = 'TreeView';
__exportStar(require("@mui/lab/TreeView"), exports);
var TreeItem_3 = require("./TreeItem");
Object.defineProperty(exports, "TreeItem", { enumerable: true, get: function () { return __importDefault(TreeItem_3).default; } });
exports.default = TreeView;
