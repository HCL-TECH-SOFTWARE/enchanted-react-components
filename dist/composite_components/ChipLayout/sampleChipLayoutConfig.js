"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleFiveChips = exports.sampleFourChips = exports.sampleThreeChips = exports.sampleTwoChips = exports.sampleSingleChip = exports.sampleDefaultSet = void 0;
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
const Typography_1 = __importDefault(require("../../Typography/Typography"));
exports.sampleDefaultSet = [
    react_1.default.createElement(Typography_1.default, { variant: "body2" },
        react_1.default.createElement("span", { style: { fontWeight: '700' } }, "Author: "),
        "wpsadmin, wpsadmin2, wpsadmin3"),
    react_1.default.createElement(Typography_1.default, { variant: "body2" },
        react_1.default.createElement("span", { style: { fontWeight: '700' } }, "Owner: "),
        "wpsadmin, wpsadmin2, wpsadmin3,"),
    react_1.default.createElement(Typography_1.default, { variant: "body2" },
        react_1.default.createElement("span", { style: { fontWeight: '700' } }, "Expiry: "),
        "12/31/2033"),
    react_1.default.createElement(Typography_1.default, { variant: "body2" },
        react_1.default.createElement("span", { style: { fontWeight: '700' } }, "Item type: "),
        "Content, Content template, Site area, Workflow, Presentation template"),
    react_1.default.createElement(Typography_1.default, { variant: "body2" },
        react_1.default.createElement("span", { style: { fontWeight: '700' } }, "Words: "),
        "article, gallery, woodburn, studio, pottery, test, book"),
    react_1.default.createElement(Typography_1.default, { variant: "body2" },
        react_1.default.createElement("span", { style: { fontWeight: '700' } }, "Phrase: "),
        "this is a long long long long long long long text"),
    react_1.default.createElement(Typography_1.default, { variant: "body2" },
        react_1.default.createElement("span", { style: { fontWeight: '700' } }, "Workflow status: "),
        "Expired - The content just got expired"),
    react_1.default.createElement(Typography_1.default, { variant: "body2" },
        react_1.default.createElement("span", { style: { fontWeight: '700' } }, "Location: "),
        "All the subfolders"),
];
exports.sampleSingleChip = [
    react_1.default.createElement(Typography_1.default, { variant: "body2" },
        react_1.default.createElement("span", { style: { fontWeight: '700' } }, "Item type: "),
        "Content, Content template, Site area, Workflow, Presentation template, Page navigation component, Image component, Folder, Text component, Stylesheet component, Segment, Category,"),
];
exports.sampleTwoChips = [
    react_1.default.createElement(Typography_1.default, { variant: "body2" },
        react_1.default.createElement("span", { style: { fontWeight: '700' } }, "Item type: "),
        "Content, Content template, Site area, Workflow, Presentation template, Page navigation component, Image component, Folder, Text component, Stylesheet component, Segment, Category,"),
    react_1.default.createElement(Typography_1.default, { variant: "body2" },
        react_1.default.createElement("span", { style: { fontWeight: '700' } }, "Authors: "),
        "wpsadmin, Content authors, Approvers, Reviewers, Content Managers, Writers, Contributors, Editors"),
];
exports.sampleThreeChips = [
    react_1.default.createElement(Typography_1.default, { variant: "body2" },
        react_1.default.createElement("span", { style: { fontWeight: '700' } }, "Item type: "),
        "Content, Content template, Site area, Workflow, Presentation template, Page navigation component, Image component, Folder, Text component, Stylesheet component, Segment, Category,"),
    react_1.default.createElement(Typography_1.default, { variant: "body2" },
        react_1.default.createElement("span", { style: { fontWeight: '700' } }, "Authors: "),
        "wpsadmin, Content authors, Approvers, Reviewers, Content Managers, Writers, Contributors, Editors"),
    react_1.default.createElement(Typography_1.default, { variant: "body2" },
        react_1.default.createElement("span", { style: { fontWeight: '700' } }, "Words: "),
        "article, headline, product, woodburn, studio, party, apple"),
];
exports.sampleFourChips = [
    react_1.default.createElement(Typography_1.default, { variant: "body2" },
        react_1.default.createElement("span", { style: { fontWeight: '700' } }, "Item type: "),
        "Content, Content template, Site area, Workflow, Presentation template, Page navigation component, Image component, Folder, Text component, Stylesheet component, Segment, Category,"),
    react_1.default.createElement(Typography_1.default, { variant: "body2" },
        react_1.default.createElement("span", { style: { fontWeight: '700' } }, "Authors: "),
        "wpsadmin, Content authors, Approvers, Reviewers, Content Managers, Writers, Contributors, Editors"),
    react_1.default.createElement(Typography_1.default, { variant: "body2" },
        react_1.default.createElement("span", { style: { fontWeight: '700' } }, "Words: "),
        "article, headline, product, woodburn, studio, party, apple"),
    react_1.default.createElement(Typography_1.default, { variant: "body2" },
        react_1.default.createElement("span", { style: { fontWeight: '700' } }, "Expiry date: "),
        "Date: Expired From: 12/25/2022 To: 01/25/2026"),
];
exports.sampleFiveChips = [
    react_1.default.createElement(Typography_1.default, { variant: "body2" },
        react_1.default.createElement("span", { style: { fontWeight: '700' } }, "Item type: "),
        "Content, Content template, Site area, Workflow, Presentation template, Page navigation component, Image component, Folder, Text component, Stylesheet component, Segment, Category,"),
    react_1.default.createElement(Typography_1.default, { variant: "body2" },
        react_1.default.createElement("span", { style: { fontWeight: '700' } }, "Authors: "),
        "wpsadmin, Content authors, Approvers, Reviewers, Content Managers, Writers, Contributors, Editors"),
    react_1.default.createElement(Typography_1.default, { variant: "body2" },
        react_1.default.createElement("span", { style: { fontWeight: '700' } }, "Words: "),
        "article, headline, product, woodburn, studio, party, apple"),
    react_1.default.createElement(Typography_1.default, { variant: "body2" },
        react_1.default.createElement("span", { style: { fontWeight: '700' } }, "Words: "),
        "Date: Expired From: 12/25/2022 To: 01/25/2026"),
    react_1.default.createElement(Typography_1.default, { variant: "body2" },
        react_1.default.createElement("span", { style: { fontWeight: '700' } }, "Phrase: "),
        "Videographic evidence that earth is flat"),
];
