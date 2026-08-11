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
exports.getMuiDialogThemeOverrides = exports.DialogTestIds = exports.DialogSizes = void 0;
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
const react_1 = __importDefault(require("react"));
const close_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/close"));
const Dialog_1 = __importDefault(require("@mui/material/Dialog"));
const material_1 = require("@mui/material");
const IconButton_1 = __importDefault(require("../IconButton"));
const DialogTitle_1 = __importDefault(require("./DialogTitle"));
const DialogContent_1 = __importDefault(require("./DialogContent"));
const DialogActions_1 = __importDefault(require("./DialogActions"));
const Backdrop_1 = __importDefault(require("../Backdrop"));
const Tooltip_1 = __importDefault(require("../Tooltip"));
var DialogSizes;
(function (DialogSizes) {
    DialogSizes["EXTRA_SMALL"] = "XS";
    DialogSizes["SMALL"] = "SM";
    DialogSizes["MEDIUM"] = "MD";
    DialogSizes["LARGE"] = "LG";
    DialogSizes["EXTRA_LARGE"] = "XL";
})(DialogSizes = exports.DialogSizes || (exports.DialogSizes = {}));
var DialogTestIds;
(function (DialogTestIds) {
    DialogTestIds["DIALOG_TITLE"] = "dialogTitle";
    DialogTestIds["DIALOG_CONTENT"] = "dialogContent";
    DialogTestIds["DIALOG_ACTIONS"] = "dialogActions";
    DialogTestIds["DIALOG_CLOSE_ICON"] = "dialogCloseIcon";
})(DialogTestIds = exports.DialogTestIds || (exports.DialogTestIds = {}));
const getMuiDialogThemeOverrides = () => {
    return {
        MuiDialog: {
            styleOverrides: {
                paper: ({ ownerState }) => {
                    return (Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ padding: 0, width: 'calc(100% - 64px)' }, ownerState.size === DialogSizes.EXTRA_SMALL && {
                        maxWidth: '444px',
                    }), ownerState.size === DialogSizes.SMALL && {
                        maxWidth: '600px',
                    }), ownerState.size === DialogSizes.MEDIUM && {
                        maxWidth: '960px',
                    }), ownerState.size === DialogSizes.LARGE && {
                        maxWidth: '1280px',
                    }), ownerState.size === DialogSizes.EXTRA_LARGE && {
                        maxWidth: '1920px',
                    }));
                },
            },
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: ({ theme }) => {
                    return ({
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '12px',
                        '.MuiGrid-root': {
                            '.MuiTypography-root': Object.assign({}, theme.typography.h6),
                        },
                        '.MuiIconButton-root': {
                            position: 'absolute',
                            right: 12,
                            top: 12,
                        },
                    });
                },
            },
        },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    padding: '8px 12px',
                    '> :not(:first-of-type)': {
                        marginLeft: '12px',
                    },
                },
            },
        },
    };
};
exports.getMuiDialogThemeOverrides = getMuiDialogThemeOverrides;
const Dialog = (_a) => {
    var props = __rest(_a, []);
    const { headerChildren, footerChildren, contentChildren, withPadding, hideHeader, hideFooter } = props, rest = __rest(props, ["headerChildren", "footerChildren", "contentChildren", "withPadding", "hideHeader", "hideFooter"]);
    return (react_1.default.createElement(Dialog_1.default, Object.assign({}, rest, { maxWidth: false, components: { Backdrop: Backdrop_1.default } }),
        (headerChildren && !hideHeader)
            && (react_1.default.createElement(DialogTitle_1.default, { "data-testid": DialogTestIds.DIALOG_TITLE },
                react_1.default.createElement(material_1.Grid, null, headerChildren),
                react_1.default.createElement(Tooltip_1.default, { title: props.closeIconToolTip },
                    react_1.default.createElement(IconButton_1.default, { "aria-label": "close", onClick: (e) => { rest.onClose(e, 'backdropClick'); }, "data-testid": DialogTestIds.DIALOG_CLOSE_ICON },
                        react_1.default.createElement(close_1.default, null))))),
        react_1.default.createElement(DialogContent_1.default, { sx: (theme) => {
                return {
                    padding: withPadding ? '12px' : 0,
                    borderTop: !hideHeader ? `1px solid ${theme.palette.border.secondary}` : 'none',
                    borderBottom: !hideFooter ? `1px solid ${theme.palette.border.secondary}` : 'none', // styles the bottom divider
                };
            }, dividers: true, "data-testid": DialogTestIds.DIALOG_CONTENT }, contentChildren),
        (footerChildren && !hideFooter) && (react_1.default.createElement(DialogActions_1.default, { "data-testid": DialogTestIds.DIALOG_ACTIONS }, footerChildren))));
};
Dialog.defaultProps = {
    'aria-labelledby': 'alert-dialog-title',
    'aria-describedby': 'alert-dialog-description',
    size: DialogSizes.EXTRA_SMALL,
    withPadding: true,
    /* eslint-why user defined functions, defaults only put in place to prevent tsc could be undefined warning */
    /* eslint-disable no-empty-function */
    onClose: () => { },
    /* eslint-enable no-empty-function */
    hideHeader: false,
    hideFooter: false,
    closeIconToolTip: 'Close',
};
__exportStar(require("@mui/material/Dialog"), exports);
exports.default = Dialog;
