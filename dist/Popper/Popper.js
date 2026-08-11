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
exports.PopperTestIds = void 0;
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
const Popper_1 = __importDefault(require("@mui/material/Popper"));
const material_1 = require("@mui/material");
const IconButton_1 = __importDefault(require("../IconButton"));
const PopperTitle_1 = __importDefault(require("./PopperTitle"));
const PopperContent_1 = __importDefault(require("./PopperContent"));
const theme_1 = require("../theme");
const Divider_1 = __importStar(require("../Divider"));
const Tooltip_1 = __importDefault(require("../Tooltip"));
var PopperTestIds;
(function (PopperTestIds) {
    PopperTestIds["POPPER_TITLE"] = "popperTitle";
    PopperTestIds["POPPER_CONTENT"] = "popperContent";
    PopperTestIds["POPPER_CLOSE_ICON"] = "popperCloseIcon";
})(PopperTestIds = exports.PopperTestIds || (exports.PopperTestIds = {}));
const Popper = (_a) => {
    var props = __rest(_a, []);
    const { headerChildren, contentChildren, subHeaderChildren, hideSubHeader, onClose } = props, rest = __rest(props, ["headerChildren", "contentChildren", "subHeaderChildren", "hideSubHeader", "onClose"]);
    return (
    // @ts-ignore
    react_1.default.createElement(Popper_1.default, Object.assign({}, rest, { sx: () => {
            return {
                borderRadius: '4px',
                width: '374px',
                boxShadow: (theme) => { return theme.shadows[6]; },
                backgroundColor: (theme) => { return theme.palette.background.paper; },
                position: 'relative',
                '.MuiDialogContent-root': {
                    padding: '12px',
                },
                '.MuiDialogTitle-root': {
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '12px',
                    borderRadius: '4px',
                    '&.MuiGrid-root': {
                        '&.MuiTypography-root': Object.assign({}, theme_1.TYPOGRAPHY.h6),
                        '&.MuiIconButton-root': {
                            position: 'absolute',
                            right: 12,
                            top: 12,
                        },
                    },
                },
            };
        } }),
        (headerChildren)
            && (react_1.default.createElement(PopperTitle_1.default, { "data-testid": PopperTestIds.POPPER_TITLE },
                react_1.default.createElement(material_1.Grid, null, headerChildren),
                react_1.default.createElement(Tooltip_1.default, { title: props.closeIconTooltip || '' },
                    react_1.default.createElement(IconButton_1.default, { "aria-label": props.closeIconTooltip ? props.closeIconTooltip : PopperTestIds.POPPER_TITLE, onClick: (e) => { onClose(e, 'backdropClick'); }, "data-testid": PopperTestIds.POPPER_CLOSE_ICON },
                        react_1.default.createElement(close_1.default, null))))),
        (!hideSubHeader)
            && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(Divider_1.default, { type: Divider_1.DividerTypes.SECONDARY }),
                react_1.default.createElement(PopperContent_1.default, null, subHeaderChildren))),
        react_1.default.createElement(Divider_1.default, { type: Divider_1.DividerTypes.SECONDARY }),
        react_1.default.createElement(PopperContent_1.default, null, contentChildren)));
};
Popper.defaultProps = {
    /* eslint-why user defined functions, defaults only put in place to prevent tsc could be undefined warning */
    /* eslint-disable no-empty-function */
    onClose: () => { },
    /* eslint-enable no-empty-function */
    hideSubHeader: false,
};
__exportStar(require("@mui/material/Popper"), exports);
exports.default = Popper;
