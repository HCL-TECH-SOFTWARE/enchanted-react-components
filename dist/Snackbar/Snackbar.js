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
exports.getMuiSnackbarThemeOverrides = exports.SnackbarTestIds = exports.SnackbarVariants = void 0;
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
const Snackbar_1 = __importDefault(require("@mui/material/Snackbar"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const close_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/close"));
const warning__alt_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/warning--alt"));
const warning_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/warning"));
const information_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/information"));
const checkmark__outline_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/checkmark--outline"));
const notification_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/notification"));
const Button_1 = __importDefault(require("../Button"));
const IconButton_1 = __importStar(require("../IconButton"));
const Typography_1 = __importDefault(require("../Typography"));
const CircularProgress_1 = __importStar(require("../ProgressIndicator/CircularProgress"));
const Tooltip_1 = __importDefault(require("../Tooltip"));
var SnackbarVariants;
(function (SnackbarVariants) {
    SnackbarVariants["WARNING"] = "warning";
    SnackbarVariants["INFO"] = "information";
    SnackbarVariants["ERROR"] = "error";
    SnackbarVariants["SUCCESS"] = "success";
    SnackbarVariants["PROGRESS"] = "progress";
})(SnackbarVariants = exports.SnackbarVariants || (exports.SnackbarVariants = {}));
var SnackbarTestIds;
(function (SnackbarTestIds) {
    SnackbarTestIds["SNACKBAR_ICON"] = "snackbarIcon";
    SnackbarTestIds["SNACKBAR_MESSAGE"] = "snackbarMessage";
    SnackbarTestIds["SNACKBAR_CLOSE"] = "snackbarClose";
    SnackbarTestIds["SNACKBAR_BUTTON"] = "snackbarButton";
    SnackbarTestIds["SNACKBAR_PLACEHOLDER_ICON"] = "snackbarPlaceholderIcon";
})(SnackbarTestIds = exports.SnackbarTestIds || (exports.SnackbarTestIds = {}));
const getMuiSnackbarThemeOverrides = () => {
    return {
        MuiSnackbar: {
            styleOverrides: {
                root: ({ theme }) => {
                    return (Object.assign(Object.assign({}, theme.typography.body2), { position: 'static', bottom: 'unset', right: 'unset', left: 'unset', marginTop: '5px', boxSizing: 'border-box', maxWidth: 'inherit', justifyContent: 'flex-start', background: theme.palette.background.dark, borderRadius: '4px', boxShadow: theme.shadows[6], color: theme.palette.text.tertiary1, display: 'flex', alignItems: 'flex-start', minHeight: '36px', padding: '8px 12px 0 12px', '.MuiBox-root': {
                            display: 'contents',
                            position: 'relative',
                            '[data-testid=progressRoot]': {
                                margin: '2px 8px 8px 0',
                                padding: 0,
                                display: 'block',
                                width: '16px',
                                height: '16px',
                                minWidth: '16px',
                                '[data-testid=progressCircle]': {
                                    color: theme.palette.primary.inverse,
                                },
                                '[data-testid=progressTrail]': {
                                    color: theme.palette.background.inverse,
                                },
                            },
                            '.MuiSvgIcon-root': {
                                '&[data-mui-test=informationIcon]': {
                                    color: theme.palette.primary.inverse,
                                },
                                '&[data-mui-test=warningIcon]': {
                                    color: theme.palette.error.inverse, // used for error state as per design
                                },
                                '&[data-mui-test=warning--altIcon]': {
                                    color: theme.palette.warning.inverse, // used for actual warning state as per design
                                },
                                '&[data-mui-test=checkmark--outlineIcon]': {
                                    color: theme.palette.success.inverse,
                                },
                                // higher degree of specificity that will not affect other svg icons under an IconButton parent with actions inside this Snackbar
                                '&[data-mui-test=informationIcon],&[data-mui-test=warningIcon],&[data-mui-test=warning--altIcon],&[data-mui-test=checkmark--outlineIcon]': {
                                    height: '16px',
                                    width: '16px',
                                    margin: '2px 8px 8px 2px',
                                    padding: 0,
                                },
                            },
                            '.MuiTypography-root': {
                                margin: '2px 8px 8px 0',
                                padding: '0',
                                wordBreak: 'break-word',
                                width: '100%',
                                color: theme.palette.action.inverse,
                            },
                            '.MuiButton-root': Object.assign(Object.assign({}, theme.typography.subtitle2), { color: theme.palette.primary.inverse, ':disabled': {
                                    color: theme.palette.text.disabledInverse,
                                }, '&[data-testid=snackbarButton]': {
                                    backgroundColor: 'inherit',
                                    border: 'none',
                                    margin: '0 4px 8px 0',
                                    outline: 'none',
                                    padding: '2px 6px',
                                    textTransform: 'none',
                                    minWidth: '55px',
                                    wordBreak: 'normal',
                                    overflowWrap: 'anywhere',
                                    position: 'relative',
                                    '&:hover': {
                                        backgroundColor: theme.palette.action.hoverInverse,
                                        borderRadius: '2px',
                                    },
                                    '&:focus': {
                                        border: `1px solid ${theme.palette.primary.inverse} !important`,
                                        borderRadius: '2px',
                                        padding: '1px 5px',
                                    },
                                } }),
                            '.IconButtonMainContainer': {
                                marginTop: '-2px',
                                marginRight: '0px',
                                padding: 0,
                                '& .MuiIconButton-root:hover': {
                                    backgroundColor: theme.palette.action.hoverInverse,
                                },
                                '& .MuiIconButton-root:focus': {
                                    '.MuiSvgIcon-root': {
                                        border: `1px solid ${theme.palette.primary.inverse}`,
                                    },
                                },
                                '& .MuiIconButton-root[data-testid=snackbarPlaceholderIcon]': {
                                    position: 'relative',
                                },
                                '& .MuiIconButton-root[data-testid=snackbarPlaceholderIcon] .MuiSvgIcon-root': {
                                    color: theme.palette.action.inverse,
                                },
                                '.MuiIconButton-root .MuiSvgIcon-root': {
                                    '&[data-mui-test=closeIcon]': {
                                        color: theme.palette.action.inverse,
                                    },
                                },
                                '& .MuiIconButton-root:disabled': {
                                    '& .MuiIconButton-root[data-testid=snackbarPlaceholderIcon] .MuiSvgIcon-root': {
                                        color: theme.palette.action.disabledInverse,
                                    },
                                    '.MuiIconButton-root .MuiSvgIcon-root': {
                                        '& .MuiIconButton-root[data-mui-test=closeIcon]': {
                                            color: theme.palette.action.disabledInverse,
                                        },
                                    },
                                },
                            },
                        } }));
                },
            },
        },
    };
};
exports.getMuiSnackbarThemeOverrides = getMuiSnackbarThemeOverrides;
const Snackbar = (_a) => {
    var props = __rest(_a, []);
    const { disabledSnackbar, buttonAction, buttonText, // these 3 props handle main action Button in design
    placeholderIcon, placeholderIconAction, showPlaceholderIcon, // these 3 props handle placeholder IconButton in design
    progressVariant, progressValue } = props, // these 2 props handle progress indicator
    rest = __rest(props, ["disabledSnackbar", "buttonAction", "buttonText", "placeholderIcon", "placeholderIconAction", "showPlaceholderIcon", "progressVariant", "progressValue"]) // Do not put trailing comma here
    ;
    /**
     * Gets default icon for snackbar based on the status or type of notification
     * @param statusType Optional parameter to determine the status of notification
     * @returns A component of icon
     */
    const getStatusIcon = (statusType) => {
        switch (statusType) {
            case SnackbarVariants.ERROR: return (react_1.default.createElement(warning_1.default, { "data-testid": SnackbarTestIds.SNACKBAR_ICON }));
            case SnackbarVariants.WARNING: return (react_1.default.createElement(warning__alt_1.default, { "data-testid": SnackbarTestIds.SNACKBAR_ICON }));
            case SnackbarVariants.INFO: return (react_1.default.createElement(information_1.default, { "data-testid": SnackbarTestIds.SNACKBAR_ICON }));
            case SnackbarVariants.SUCCESS: return (react_1.default.createElement(checkmark__outline_1.default, { "data-testid": SnackbarTestIds.SNACKBAR_ICON }));
            case SnackbarVariants.PROGRESS: return (progressVariant === CircularProgress_1.CircularProgressVariants.DETERMINATE
                ? react_1.default.createElement(CircularProgress_1.default, { variant: CircularProgress_1.CircularProgressVariants.DETERMINATE, size: 16, value: progressValue })
                : react_1.default.createElement(CircularProgress_1.default, { variant: CircularProgress_1.CircularProgressVariants.INDETERMINATE, size: 16 }));
            default: return (react_1.default.createElement(notification_1.default, { "data-testid": SnackbarTestIds.SNACKBAR_ICON }));
        }
    };
    return (react_1.default.createElement(Snackbar_1.default, Object.assign({}, rest),
        react_1.default.createElement(Box_1.default, null,
            getStatusIcon(rest.variant),
            react_1.default.createElement(Typography_1.default, Object.assign({ role: "alert" // for screen readers to announce the message
                , variant: "body2", "data-testid": SnackbarTestIds.SNACKBAR_MESSAGE }, buttonText && { 'data-buttontext': buttonText }, showPlaceholderIcon && { 'data-hasplaceholdericon': 'true' }), rest.message),
            buttonText
                && (react_1.default.createElement(Tooltip_1.default, { title: props.buttonTextToolTip },
                    react_1.default.createElement(Button_1.default, Object.assign({ "data-testid": SnackbarTestIds.SNACKBAR_BUTTON, onClick: () => { buttonAction(); }, disabled: disabledSnackbar, "aria-disabled": disabledSnackbar }, showPlaceholderIcon && { 'data-hasplaceholdericon': 'true' }), buttonText))),
            (showPlaceholderIcon && react_1.default.isValidElement(placeholderIcon))
                && (react_1.default.createElement(IconButton_1.default, { "data-testid": SnackbarTestIds.SNACKBAR_PLACEHOLDER_ICON, onClick: () => { placeholderIconAction(); }, disabled: disabledSnackbar, "aria-disabled": disabledSnackbar, variant: IconButton_1.IconButtonVariants.WITH_PADDING }, placeholderIcon)),
            react_1.default.createElement(Tooltip_1.default, { title: props.closeIconToolTip },
                react_1.default.createElement(IconButton_1.default, { onClick: (e) => { rest.onClose(e, 'clickaway'); }, disabled: disabledSnackbar, "aria-disabled": disabledSnackbar, variant: IconButton_1.IconButtonVariants.WITH_PADDING },
                    react_1.default.createElement(close_1.default, { "data-testid": SnackbarTestIds.SNACKBAR_CLOSE }))))));
};
Snackbar.defaultProps = {
    variant: SnackbarVariants.INFO,
    disabledSnackbar: false,
    progressVariant: CircularProgress_1.CircularProgressVariants.INDETERMINATE,
    progressValue: 0,
    /* eslint-why user defined functions, defaults only put in place to prevent tsc could be undefined warning */
    /* eslint-disable no-empty-function */
    buttonAction: () => { },
    placeholderIconAction: () => { },
    onClose: () => { },
    /* eslint-enable no-empty-function */
    showPlaceholderIcon: false,
    closeIconToolTip: 'Close',
};
__exportStar(require("@mui/material/Snackbar"), exports);
exports.default = Snackbar;
