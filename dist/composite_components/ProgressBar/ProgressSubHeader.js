"use strict";
/* ======================================================================== *
 * Copyright 2024, 2025 HCL America Inc.                                    *
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
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const Typography_1 = __importDefault(require("../../Typography"));
/**
 * @component Renders the progress subheader component.
 * @param {ProgressSubHeaderProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
const ProgressSubHeader = (props) => {
    const { totalSize, totalTime, literals, } = props;
    const theme = (0, material_1.useTheme)();
    const isRTL = theme.direction === 'rtl';
    return (react_1.default.createElement(material_1.Box, { sx: () => {
            return ({
                padding: '5px 12px',
                background: theme.palette.background.secondary,
                boxShadow: theme.shadows[6],
            });
        }, height: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", boxSizing: "border-box" },
        react_1.default.createElement(material_1.Box, { display: "flex", alignItems: "center" },
            react_1.default.createElement(Typography_1.default, { variant: "caption", color: "text.secondary" }, `${literals.totalSizeLabel}:`),
            react_1.default.createElement(Typography_1.default, { variant: "caption", color: "text.primary", style: { [isRTL ? 'marginRight' : 'marginLeft']: '4px' } }, totalSize),
            totalTime && (react_1.default.createElement(Typography_1.default, { variant: "caption", color: "text.primary", style: { [isRTL ? 'marginRight' : 'marginLeft']: '8px' } }, totalTime)))));
};
exports.default = ProgressSubHeader;
