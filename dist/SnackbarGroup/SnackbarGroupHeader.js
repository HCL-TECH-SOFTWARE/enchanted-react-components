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
const Box_1 = __importDefault(require("@mui/material/Box"));
const styles_1 = require("@mui/material/styles");
const chevron__down_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/chevron--down"));
const chevron__up_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/chevron--up"));
const close_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/close"));
const warning_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/warning"));
const warning__alt_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/warning--alt"));
const checkmark__outline_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/checkmark--outline"));
const information_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/information"));
const IconButton_1 = __importStar(require("../IconButton"));
const Typography_1 = __importDefault(require("../Typography"));
const Tooltip_1 = __importDefault(require("../Tooltip"));
const Snackbar_1 = require("../Snackbar/Snackbar");
const HEADER_TYPOGRAPHY_STYLES = {
    color: 'inherit',
    marginLeft: '8px',
};
const getVariantCountBoxBaseStyles = (theme, backgroundColor) => {
    return {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '2px 6px',
        borderRadius: '2px',
        fontSize: '12px',
        fontWeight: 600,
        backgroundColor,
        color: theme.palette.common.white,
    };
};
const VARIANT_ICON_STYLES = {
    width: '14px',
    height: '14px',
};
const HEADER_ACTIONS_BOX_STYLES = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    flexShrink: 0,
};
const getHeaderIconButtonStyles = (iconColor) => {
    return {
        '& svg': {
            color: iconColor,
        },
    };
};
const SnackbarGroupHeader = react_1.default.forwardRef(({ variantCounts, totalCount, showVariantBadges, hasOverflow, expanded, colors, onExpandChange, onCloseAll, }, ref) => {
    const theme = (0, styles_1.useTheme)();
    return (react_1.default.createElement(Box_1.default, { ref: ref, sx: (muiTheme) => {
            return Object.assign(Object.assign({}, muiTheme.typography.body2), { position: 'relative', background: colors.background, borderRadius: expanded ? '4px 4px 0px 0px' : '4px', boxShadow: muiTheme.shadows[6], color: colors.text, display: 'flex !important', alignItems: 'center', justifyContent: 'space-between', minHeight: '36px', padding: '4px 12px 0 12px', gap: '8px', flexWrap: 'nowrap', width: '100%', boxSizing: 'border-box' });
        } },
        react_1.default.createElement(Box_1.default, { sx: {
                display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, overflow: 'hidden',
            } },
            showVariantBadges && (react_1.default.createElement(react_1.default.Fragment, null,
                variantCounts[Snackbar_1.SnackbarVariants.ERROR] > 1 && (react_1.default.createElement(Box_1.default, { sx: getVariantCountBoxBaseStyles(theme, theme.palette.error.main) },
                    react_1.default.createElement(warning_1.default, { style: VARIANT_ICON_STYLES }))),
                variantCounts[Snackbar_1.SnackbarVariants.WARNING] > 1 && (react_1.default.createElement(Box_1.default, { sx: getVariantCountBoxBaseStyles(theme, theme.palette.warning.main) },
                    react_1.default.createElement(warning__alt_1.default, { style: VARIANT_ICON_STYLES }))),
                variantCounts[Snackbar_1.SnackbarVariants.SUCCESS] > 1 && (react_1.default.createElement(Box_1.default, { sx: getVariantCountBoxBaseStyles(theme, theme.palette.success.main) },
                    react_1.default.createElement(checkmark__outline_1.default, { style: VARIANT_ICON_STYLES }))),
                variantCounts[Snackbar_1.SnackbarVariants.INFO] > 1 && (react_1.default.createElement(Box_1.default, { sx: getVariantCountBoxBaseStyles(theme, theme.palette.info.main) },
                    react_1.default.createElement(information_1.default, { style: VARIANT_ICON_STYLES }))))),
            react_1.default.createElement(Typography_1.default, { variant: "body2", sx: HEADER_TYPOGRAPHY_STYLES },
                variantCounts[Snackbar_1.SnackbarVariants.ERROR] > 0 && (react_1.default.createElement(react_1.default.Fragment, null,
                    variantCounts[Snackbar_1.SnackbarVariants.ERROR],
                    ' ',
                    "error(s)",
                    ' ')),
                variantCounts[Snackbar_1.SnackbarVariants.WARNING] > 0 && (react_1.default.createElement(react_1.default.Fragment, null,
                    variantCounts[Snackbar_1.SnackbarVariants.WARNING],
                    ' ',
                    "warning(s)",
                    ' ')),
                variantCounts[Snackbar_1.SnackbarVariants.SUCCESS] > 0 && (react_1.default.createElement(react_1.default.Fragment, null,
                    variantCounts[Snackbar_1.SnackbarVariants.SUCCESS],
                    ' ',
                    "success(es)",
                    ' ')),
                variantCounts[Snackbar_1.SnackbarVariants.INFO] > 0 && (react_1.default.createElement(react_1.default.Fragment, null,
                    variantCounts[Snackbar_1.SnackbarVariants.INFO],
                    ' ',
                    "info(s)",
                    ' ')),
                "notification",
                totalCount !== 1 ? 's' : '')),
        react_1.default.createElement(Box_1.default, { sx: HEADER_ACTIONS_BOX_STYLES },
            hasOverflow && (react_1.default.createElement(Tooltip_1.default, { title: expanded ? 'Collapse' : 'Expand' },
                react_1.default.createElement(IconButton_1.default, { onClick: () => { return onExpandChange(!expanded); }, variant: IconButton_1.IconButtonVariants.WITH_PADDING, "aria-expanded": expanded, "aria-label": "Toggle notification list", sx: getHeaderIconButtonStyles(colors.iconColor) }, expanded ? react_1.default.createElement(chevron__up_1.default, null) : react_1.default.createElement(chevron__down_1.default, null)))),
            onCloseAll && (react_1.default.createElement(Tooltip_1.default, { title: "Close all" },
                react_1.default.createElement(IconButton_1.default, { onClick: onCloseAll, variant: IconButton_1.IconButtonVariants.WITH_PADDING, "aria-label": "Close all notifications", sx: getHeaderIconButtonStyles(colors.iconColor) },
                    react_1.default.createElement(close_1.default, null)))))));
});
SnackbarGroupHeader.displayName = 'SnackbarGroupHeader';
exports.default = SnackbarGroupHeader;
