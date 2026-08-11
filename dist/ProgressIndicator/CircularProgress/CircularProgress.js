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
exports.getMuiCircularProgressThemeOverrides = exports.CircularProgressTestIds = exports.CircularProgressVariants = void 0;
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
const CircularProgress_1 = __importDefault(require("@mui/material/CircularProgress"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const Typography_1 = __importDefault(require("../../Typography"));
// Scaling constant for handling responsiveness of font, In Figma- default size of circular progress is 40px and font size is 12px (Body2 variant)
const scaleSize = 12 / 40;
const getScalingFontSize = (size) => {
    return size * scaleSize;
};
var CircularProgressVariants;
(function (CircularProgressVariants) {
    CircularProgressVariants["DETERMINATE"] = "determinate";
    CircularProgressVariants["INDETERMINATE"] = "indeterminate";
})(CircularProgressVariants = exports.CircularProgressVariants || (exports.CircularProgressVariants = {}));
var CircularProgressTestIds;
(function (CircularProgressTestIds) {
    CircularProgressTestIds["PROGRESS_ROOT"] = "progressRoot";
    CircularProgressTestIds["PROGRESS_TRAIL"] = "progressTrail";
    CircularProgressTestIds["PROGRESS_CIRCLE"] = "progressCircle";
    CircularProgressTestIds["PROGRESS_LABEL"] = "progressLabel";
})(CircularProgressTestIds = exports.CircularProgressTestIds || (exports.CircularProgressTestIds = {}));
const getMuiCircularProgressThemeOverrides = () => {
    return {
        MuiCircularProgress: {
            styleOverrides: {
                root: ({ ownerState, theme }) => {
                    return (Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, theme.typography.body2), { color: (ownerState.withbackdrop === 1 || ownerState.withbackdrop === true) ? theme.palette.info.inverse : theme.palette.primary.main, position: 'absolute', left: 0 }), (ownerState.variant === CircularProgressVariants.DETERMINATE && ownerState.id === CircularProgressTestIds.PROGRESS_TRAIL) && {
                        color: (ownerState.withbackdrop === 1 || ownerState.withbackdrop === true) ? theme.palette.action.hoverInverse : theme.palette.action.hover,
                    }), { '&.backdrop': Object.assign({ color: theme.palette.info.inverse }, (ownerState.variant === CircularProgressVariants.DETERMINATE && ownerState.id === CircularProgressTestIds.PROGRESS_TRAIL) && {
                            color: theme.palette.action.hoverInverse,
                        }) }), ownerState.variant === CircularProgressVariants.DETERMINATE && {
                        '+ .MuiBox-root': {
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            ' .MuiTypography-root': {
                                color: theme.palette.text.secondary,
                            },
                        },
                    }));
                },
            },
        },
    };
};
exports.getMuiCircularProgressThemeOverrides = getMuiCircularProgressThemeOverrides;
const CircularProgress = (_a) => {
    var { withbackdrop } = _a, props = __rest(_a, ["withbackdrop"]);
    return (react_1.default.createElement(Box_1.default, { sx: {
            position: 'relative',
            display: 'inline-block',
            width: props.size,
            height: props.size,
        }, "data-testid": CircularProgressTestIds.PROGRESS_ROOT },
        react_1.default.createElement(CircularProgress_1.default, Object.assign({ className: withbackdrop ? 'backdrop' : '' }, props, { id: CircularProgressTestIds.PROGRESS_TRAIL, "data-testid": CircularProgressTestIds.PROGRESS_TRAIL, variant: CircularProgressVariants.DETERMINATE, value: 100 })),
        react_1.default.createElement(CircularProgress_1.default, Object.assign({ className: withbackdrop ? 'backdrop' : '' }, props, { "data-testid": CircularProgressTestIds.PROGRESS_CIRCLE })),
        (props.variant === CircularProgressVariants.DETERMINATE && props.value !== undefined && props.value > 0 && Boolean(props.showprogress))
            && (react_1.default.createElement(Box_1.default, null,
                react_1.default.createElement(Typography_1.default, { variant: "body2", fontSize: getScalingFontSize(typeof props.size === 'number' ? props.size : 0), "data-testid": CircularProgressTestIds.PROGRESS_LABEL }, `${Math.round(props.value)}%`)))));
};
const defaultProps = {
    thickness: 3.5,
    size: 40,
    variant: CircularProgressVariants.INDETERMINATE,
    showprogress: 0,
    withbackdrop: false,
    value: 0,
};
CircularProgress.defaultProps = defaultProps;
__exportStar(require("@mui/material/CircularProgress"), exports);
exports.default = CircularProgress;
