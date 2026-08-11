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
exports.getMuiAlertThemeOverrides = exports.AlertSeverity = exports.AlertVariants = void 0;
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
const Alert_1 = __importDefault(require("@mui/material/Alert"));
const warning__alt_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/warning--alt"));
const warning_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/warning"));
const information_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/information"));
const checkmark__outline_1 = __importDefault(require("@hcl-software/enchanted-icons/dist/carbon/es/checkmark--outline"));
const theme_1 = require("../theme");
var AlertVariants;
(function (AlertVariants) {
    AlertVariants["CONTAINED"] = "contained";
    AlertVariants["OUTLINED"] = "outlined";
})(AlertVariants = exports.AlertVariants || (exports.AlertVariants = {}));
var AlertSeverity;
(function (AlertSeverity) {
    AlertSeverity["WARNING"] = "warning";
    AlertSeverity["SUCCESS"] = "success";
    AlertSeverity["ERROR"] = "error";
    AlertSeverity["INFORMATION"] = "info";
})(AlertSeverity = exports.AlertSeverity || (exports.AlertSeverity = {}));
const getMuiAlertThemeOverrides = () => {
    return {
        MuiAlert: {
            styleOverrides: {
                root: ({ ownerState, theme }) => {
                    return (Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ '&.MuiPaper-root': {
                            flexDirection: 'row',
                            boxShadow: theme.shadows[0],
                            padding: '4px 8px',
                            alignItems: 'flex-start',
                        }, borderRadius: '4px', border: '1px solid', minHeight: '28px', '& .MuiAlert-icon': {
                            fontSize: '16px',
                            width: '20px',
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '2px',
                        }, '& .MuiAlert-message': Object.assign(Object.assign({}, theme_1.TYPOGRAPHY.body2), { marginRight: '8px', padding: '2px 0px 0px 0px' }), '& .MuiTypography-root .MuiAlertTitle-root': Object.assign({}, theme_1.TYPOGRAPHY.body2), '& .MuiAlert-action': {
                            padding: '0',
                            marginRight: '3px',
                            marginBottom: '-1px',
                            marginTop: '-1px',
                        }, '& .MuiButtonBase-root-MuiIconButton-root': {
                            fontSize: '16px',
                        }, '& .MuiButtonBase-root-MuiIconButton-root .MuiSvgIcon-root': {
                            fontSize: '16px',
                        }, '& .MuiSvgIcon-root': {
                            fontSize: '16px',
                        } }, (ownerState.variant === 'outlined' && {
                        backgroundColor: theme.palette.background.paper,
                    })), (ownerState.severity === 'warning' && {
                        border: `1px solid ${theme.palette.warning.main}`,
                        '&.MuiAlert-root .MuiAlert-message': {
                            color: theme.palette.warning.main,
                        },
                        '&.MuiAlert-root .MuiAlert-icon': {
                            marginRight: '8px',
                            color: theme.palette.warning.main,
                        },
                        '&.MuiAlert-containedWarning': Object.assign({ color: theme.palette.warning.main }, (ownerState.variant === 'contained' && {
                            backgroundColor: theme.palette.background.warning,
                        })),
                        '& .MuiAlert-action .MuiButtonBase-root': {
                            color: theme.palette.warning.main,
                        },
                    })), (ownerState.severity === 'success' && {
                        border: `1px solid ${theme.palette.success.main}`,
                        '&.MuiAlert-root .MuiAlert-message': {
                            color: theme.palette.success.main,
                        },
                        '&.MuiAlert-root .MuiAlert-icon': {
                            marginRight: '8px',
                            color: theme.palette.success.main,
                        },
                        '&.MuiAlert-containedSuccess': Object.assign({ color: theme.palette.success.main }, (ownerState.variant === 'contained' && {
                            backgroundColor: theme.palette.background.success,
                        })),
                        '& .MuiAlert-action .MuiButtonBase-root': {
                            color: theme.palette.success.main,
                        },
                    })), (ownerState.severity === 'error' && {
                        border: `1px solid ${theme.palette.error.main}`,
                        '&.MuiAlert-root .MuiAlert-message': {
                            color: theme.palette.error.main,
                        },
                        '&.MuiAlert-root .MuiAlert-icon': {
                            marginRight: '8px',
                            color: theme.palette.error.main,
                        },
                        '&.MuiAlert-containedError': Object.assign({ color: theme.palette.error.main }, (ownerState.variant === 'contained' && {
                            backgroundColor: theme.palette.background.error,
                        })),
                        '& .MuiAlert-action .MuiButtonBase-root': {
                            color: theme.palette.error.main,
                        },
                    })), (ownerState.severity === 'info' && {
                        border: `1px solid ${theme.palette.info.main}`,
                        '&.MuiAlert-root .MuiAlert-message': {
                            color: theme.palette.info.main,
                        },
                        '&.MuiAlert-root .MuiAlert-icon': {
                            marginRight: '8px',
                            color: theme.palette.info.main,
                        },
                        '&.MuiAlert-containedInfo': Object.assign({ color: theme.palette.info.main }, (ownerState.variant === 'contained' && {
                            backgroundColor: theme.palette.background.info,
                        })),
                        '& .MuiAlert-action .MuiButtonBase-root': {
                            color: theme.palette.info.main,
                        },
                    })));
                },
            },
            variants: [
                {
                    props: { variant: 'contained' },
                    style: {
                        background: 'inherit',
                    },
                },
            ],
        },
    };
};
exports.getMuiAlertThemeOverrides = getMuiAlertThemeOverrides;
const Alert = (_a) => {
    var props = __rest(_a, []);
    return (react_1.default.createElement(Alert_1.default, Object.assign({ iconMapping: Object.assign(Object.assign({}, props.iconMapping), { success: react_1.default.createElement(checkmark__outline_1.default, null), warning: react_1.default.createElement(warning__alt_1.default, null), info: react_1.default.createElement(warning_1.default, null), error: react_1.default.createElement(information_1.default, null) }), variant: props.variant }, props)));
};
const defaultProps = {
    message: 'Alert message',
    width: 240,
};
Alert.defaultProps = defaultProps;
__exportStar(require("@mui/material/Alert"), exports);
exports.default = Alert;
