"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMuiPaperThemeOverrides = void 0;
const react_1 = __importDefault(require("react"));
const Paper_1 = __importDefault(require("@mui/material/Paper"));
const Paper = react_1.default.forwardRef((props, ref) => {
    return react_1.default.createElement(Paper_1.default, Object.assign({ ref: ref }, props));
});
const getMuiPaperThemeOverrides = () => {
    return {
        MuiPaper: {
            variants: [
                {
                    props: { variant: 'nopadding' },
                    style: {
                        padding: '0px',
                    },
                },
            ],
            styleOverrides: {
                root: ({ ownerState, theme }) => {
                    return (Object.assign(Object.assign({ '&.MuiPaper-root': {
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: theme.palette.background.paper,
                        } }, ownerState.variant === 'elevation' && {
                        boxShadow: (ownerState.elevation !== undefined && theme.shadows[ownerState.elevation]) || theme.shadows[2],
                        padding: '8px',
                    }), ownerState.variant === 'outlined' && {
                        border: `1px solid ${theme.palette.border.primary}`,
                        padding: '8px',
                    }));
                },
            },
        },
    };
};
exports.getMuiPaperThemeOverrides = getMuiPaperThemeOverrides;
const defaultProps = {
    variant: 'outlined',
    square: false,
    elevation: 0,
};
Paper.defaultProps = defaultProps;
exports.default = Paper;
