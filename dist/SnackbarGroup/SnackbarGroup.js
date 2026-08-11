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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSnackbarGroupColors = void 0;
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
const react_1 = __importStar(require("react"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const styles_1 = require("@mui/material/styles");
const Snackbar_1 = __importDefault(require("@mui/material/Snackbar"));
const Snackbar_2 = require("../Snackbar/Snackbar");
const SnackbarGroupHeader_1 = __importDefault(require("./SnackbarGroupHeader"));
const SnackbarGroupItems_1 = __importDefault(require("./SnackbarGroupItems"));
const getSnackbarGroupColors = (theme) => {
    return {
        background: theme.palette.background.dark,
        text: theme.palette.common.white,
        textTertiary: theme.palette.text.secondary,
        iconColor: theme.palette.common.white,
    };
};
exports.getSnackbarGroupColors = getSnackbarGroupColors;
const SNACKBAR_GROUP_MUI_STYLES = {
    padding: '0 !important',
    alignItems: 'center !important',
};
const SNACKBAR_GROUP_CONTENT_BOX_STYLES = {
    display: 'flex !important',
    flexDirection: 'column',
    gap: '0px',
    minWidth: '300px',
    maxWidth: '800px',
    width: '100%',
    position: 'relative',
    maxHeight: 'none !important',
};
const DEFAULT_MAX_VISIBLE = 5;
const DEFAULT_POLICY = 'stack';
const SnackbarGroup = react_1.default.forwardRef(({ open, items, policy = DEFAULT_POLICY, maxVisible = DEFAULT_MAX_VISIBLE, defaultExpanded = false, showVariantBadges = true, includeProgressInHeaderCounts = false, onCloseItem, onCloseAll, onExpandChange, anchorOrigin, sx, }, ref) => {
    const theme = (0, styles_1.useTheme)();
    const [expanded, setExpanded] = (0, react_1.useState)(defaultExpanded);
    const colors = (0, exports.getSnackbarGroupColors)(theme);
    const handleExpandChange = (newExpanded) => {
        setExpanded(newExpanded);
        onExpandChange === null || onExpandChange === void 0 ? void 0 : onExpandChange(newExpanded);
    };
    const filteredItems = (0, react_1.useMemo)(() => {
        return includeProgressInHeaderCounts
            ? items
            : items.filter((item) => { return item.variant !== Snackbar_2.SnackbarVariants.PROGRESS; });
    }, [items, includeProgressInHeaderCounts]);
    const variantCounts = (0, react_1.useMemo)(() => {
        const counts = {
            [Snackbar_2.SnackbarVariants.ERROR]: 0,
            [Snackbar_2.SnackbarVariants.WARNING]: 0,
            [Snackbar_2.SnackbarVariants.SUCCESS]: 0,
            [Snackbar_2.SnackbarVariants.INFO]: 0,
        };
        filteredItems.forEach((item) => {
            if (item.variant in counts) {
                counts[item.variant] += 1;
            }
        });
        return counts;
    }, [filteredItems]);
    const visibleItems = (0, react_1.useMemo)(() => {
        if (expanded) {
            return items;
        }
        if (policy === 'queue') {
            return items.slice(0, 1);
        }
        return items.slice(0, maxVisible);
    }, [items, policy, maxVisible, expanded]);
    const hasOverflow = items.length > maxVisible;
    const totalCount = filteredItems.length;
    return (react_1.default.createElement(Snackbar_1.default, { ref: ref, open: open, anchorOrigin: anchorOrigin || { vertical: 'bottom', horizontal: 'right' }, sx: Object.assign(Object.assign({}, SNACKBAR_GROUP_MUI_STYLES), sx) },
        react_1.default.createElement(Box_1.default, { sx: SNACKBAR_GROUP_CONTENT_BOX_STYLES },
            react_1.default.createElement(SnackbarGroupHeader_1.default, { variantCounts: variantCounts, totalCount: totalCount, showVariantBadges: showVariantBadges, hasOverflow: hasOverflow, expanded: expanded, colors: colors, onExpandChange: handleExpandChange, onCloseAll: onCloseAll }),
            react_1.default.createElement(SnackbarGroupItems_1.default, { visibleItems: visibleItems, expanded: expanded, policy: policy, items: items, colors: colors }))));
});
SnackbarGroup.displayName = 'SnackbarGroup';
exports.default = SnackbarGroup;
