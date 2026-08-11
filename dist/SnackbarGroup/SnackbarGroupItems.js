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
exports.getVariantColors = void 0;
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
const material_1 = require("@mui/material");
const warning_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/warning"));
const warning__alt_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/warning--alt"));
const checkmark__outline_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/checkmark--outline"));
const information_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/information"));
const Divider_1 = __importDefault(require("@mui/material/Divider"));
const Typography_1 = __importDefault(require("../Typography"));
const List_1 = __importDefault(require("../List"));
const ListItem_1 = __importDefault(require("../List/ListItem"));
const ListItemButton_1 = __importStar(require("../List/ListItemButton"));
const ListItemText_1 = __importDefault(require("../List/ListItemText"));
const Snackbar_1 = require("../Snackbar/Snackbar");
const getVariantColors = (theme) => {
    return {
        error: theme.palette.error.main,
        warning: theme.palette.warning.main,
        success: theme.palette.success.main,
        information: theme.palette.info.main,
        progress: theme.palette.common.white,
    };
};
exports.getVariantColors = getVariantColors;
const StyledList = (0, material_1.styled)(List_1.default)((props) => {
    const { theme } = props;
    return ({
        background: theme.palette.background.paper,
        maxHeight: '240px',
        width: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        marginTop: '0px',
        boxSizing: 'border-box',
        '.MuiListItem-root': {
            '.MuiListItemButton-root': {
                alignItems: 'flex-start !important',
                padding: '8px 12px',
                minHeight: 'auto',
                '.MuiListItemText-root': {
                    maxWidth: 'unset',
                    width: '100%',
                    margin: 0,
                    '& .MuiListItemText-primary': {
                        whiteSpace: 'normal',
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                        maxWidth: 'unset',
                        width: '100%',
                        margin: '0 8px 0 0',
                        color: theme.palette.text.primary,
                        lineHeight: 1.5,
                    },
                },
                '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                    '.MuiListItemText-root': {
                        '& .MuiListItemText-primary': {
                            whiteSpace: 'normal',
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                        },
                    },
                },
            },
        },
    });
});
const getVariantIcon = (variant, color) => {
    const style = { color };
    switch (variant) {
        case Snackbar_1.SnackbarVariants.ERROR:
            return react_1.default.createElement(warning_1.default, { style: style });
        case Snackbar_1.SnackbarVariants.WARNING:
            return react_1.default.createElement(warning__alt_1.default, { style: style });
        case Snackbar_1.SnackbarVariants.SUCCESS:
            return react_1.default.createElement(checkmark__outline_1.default, { style: style });
        case Snackbar_1.SnackbarVariants.INFO:
            return react_1.default.createElement(information_1.default, { style: style });
        default:
            return null;
    }
};
const getVariantColor = (variant, theme) => {
    const variantColors = (0, exports.getVariantColors)(theme);
    return variantColors[variant];
};
const SnackbarGroupItems = react_1.default.forwardRef(({ visibleItems, expanded, policy, items, colors, }, ref) => {
    const theme = (0, material_1.useTheme)();
    return (react_1.default.createElement(Box_1.default, { ref: ref },
        expanded && visibleItems.length > 0 && (react_1.default.createElement(StyledList, null, visibleItems.map((item, index) => {
            return (react_1.default.createElement(react_1.default.Fragment, { key: item.id },
                react_1.default.createElement(ListItem_1.default, { disablePadding: true },
                    react_1.default.createElement(ListItemButton_1.default, { size: ListItemButton_1.ListSizes.SMALL, sx: { alignItems: 'flex-start', gap: '8px' } },
                        react_1.default.createElement(ListItemText_1.default, { primary: item.message, sx: {
                                '& .MuiListItemText-primary': {
                                    color: 'text.primary',
                                },
                            } }),
                        react_1.default.createElement(Box_1.default, { sx: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: '24px',
                                width: '24px',
                                height: '24px',
                                flexShrink: 0,
                                marginTop: '2px',
                            } }, getVariantIcon(item.variant, getVariantColor(item.variant, theme))))),
                index < visibleItems.length - 1 && react_1.default.createElement(Divider_1.default, { key: `divider-${item.id}` })));
        }))),
        policy === 'queue' && items.length > 1 && (react_1.default.createElement(Typography_1.default, { variant: "caption", sx: {
                color: colors.textTertiary,
                textAlign: 'center',
                padding: '0 8px',
            } },
            "+",
            items.length - 1,
            ' ',
            "more in queue"))));
});
SnackbarGroupItems.displayName = 'SnackbarGroupItems';
exports.default = SnackbarGroupItems;
