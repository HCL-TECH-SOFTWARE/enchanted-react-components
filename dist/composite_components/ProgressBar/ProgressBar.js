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
exports.ProgressItemType = exports.EnumUploadStatus = void 0;
const react_1 = __importStar(require("react"));
const material_1 = require("@mui/material");
const styles_1 = require("@mui/material/styles");
const ProgressHeader_1 = __importDefault(require("./ProgressHeader"));
const ProgressItems_1 = __importDefault(require("./ProgressItems"));
const ProgressSubHeader_1 = __importDefault(require("./ProgressSubHeader"));
var EnumUploadStatus;
(function (EnumUploadStatus) {
    EnumUploadStatus["SUCCESS"] = "SUCCESS";
    EnumUploadStatus["PROGRESS"] = "PROGRESS";
    EnumUploadStatus["PENDING"] = "PENDING";
    EnumUploadStatus["FAILURE"] = "FAILURE";
    EnumUploadStatus["CANCELLED"] = "CANCELLED";
})(EnumUploadStatus = exports.EnumUploadStatus || (exports.EnumUploadStatus = {}));
var ProgressItemType;
(function (ProgressItemType) {
    ProgressItemType["File"] = "file";
    ProgressItemType["Folder"] = "folder";
})(ProgressItemType = exports.ProgressItemType || (exports.ProgressItemType = {}));
/**
 * @component Renders a progress bar component.
 * @param {progressBarProps} props - The props for the ProgressBar component.
 * @returns {JSX.Element} The rendered ProgressBar component.
 */
const ProgressBar = (props) => {
    const { uploadStatus, totalPercentage, totalSize, totalTime, stringLiterals, uploadedFile, retryUploadItem, cancelItem, navigateFolder, cancelAll, learnMoreOnFailure, closeModal, pauseButton, translation, isCancelAllDisabled, } = props;
    const [expanded, setExpanded] = (0, react_1.useState)(false);
    const theme = (0, styles_1.useTheme)();
    /**
     * Toggles the state of the progress bar.
     */
    const toggleButtonClick = () => {
        setExpanded(!expanded);
    };
    return (react_1.default.createElement(material_1.Box, { position: "fixed", bottom: "12px", right: "12px", zIndex: 2, "data-testid": "upload-progress-container" },
        react_1.default.createElement(ProgressHeader_1.default, { totalPercentage: totalPercentage, uploadStatus: uploadStatus, closeModal: closeModal, stringLiterals: stringLiterals, cancelAll: cancelAll, isCancelAllDisabled: isCancelAllDisabled, pauseButton: pauseButton, translation: translation, expanded: expanded, toggleButtonClick: toggleButtonClick }),
        expanded && (react_1.default.createElement(ProgressSubHeader_1.default, { totalSize: totalSize, totalTime: totalTime, literals: stringLiterals })),
        expanded && (react_1.default.createElement(ProgressItems_1.default, { file: uploadedFile, retryUploadItem: retryUploadItem, cancelItem: cancelItem, navigateFolder: navigateFolder, literals: stringLiterals, learnMoreOnFailure: learnMoreOnFailure, translation: translation, direction: theme.direction }))));
};
exports.default = ProgressBar;
