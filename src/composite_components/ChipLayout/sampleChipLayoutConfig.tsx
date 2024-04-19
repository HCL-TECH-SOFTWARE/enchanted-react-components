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
import React from 'react';
import Typography from '../../Typography/Typography';

export const sampleDefaultSet: Array<React.ReactNode> = [
  <Typography variant="body2">
    <span style={{ fontWeight: '700' }}>Author: </span>
    wpsadmin, wpsadmin2, wpsadmin3
  </Typography>,
  <Typography variant="body2">
    <span style={{ fontWeight: '700' }}>Owner: </span>
    wpsadmin, wpsadmin2, wpsadmin3,
  </Typography>,
  <Typography variant="body2">
    <span style={{ fontWeight: '700' }}>Expiry: </span>
    12/31/2033
  </Typography>,
  <Typography variant="body2">
    <span style={{ fontWeight: '700' }}>Item type: </span>
    Content, Content template, Site area, Workflow, Presentation template
  </Typography>,
  <Typography variant="body2">
    <span style={{ fontWeight: '700' }}>Words: </span>
    article, gallery, woodburn, studio, pottery, test, book
  </Typography>,
  <Typography variant="body2">
    <span style={{ fontWeight: '700' }}>Phrase: </span>
    this is a long long long long long long long text
  </Typography>,
  <Typography variant="body2">
    <span style={{ fontWeight: '700' }}>Workflow status: </span>
    Expired - The content just got expired
  </Typography>,
  <Typography variant="body2">
    <span style={{ fontWeight: '700' }}>Location: </span>
    All the subfolders
  </Typography>,
];

export const sampleSingleChip: Array<React.ReactNode> = [
  <Typography variant="body2">
    <span style={{ fontWeight: '700' }}>Item type: </span>
    Content, Content template, Site area, Workflow, Presentation template, Page navigation component, Image component, Folder, Text component, Stylesheet component, Segment, Category,
  </Typography>,
];

export const sampleTwoChips: Array<React.ReactNode> = [
  <Typography variant="body2">
    <span style={{ fontWeight: '700' }}>Item type: </span>
    Content, Content template, Site area, Workflow, Presentation template, Page navigation component, Image component, Folder, Text component, Stylesheet component, Segment, Category,
  </Typography>,
  <Typography variant="body2">
    <span style={{ fontWeight: '700' }}>Authors: </span>
    wpsadmin, Content authors, Approvers, Reviewers, Content Managers, Writers, Contributors, Editors
  </Typography>,
];

export const sampleThreeChips: Array<React.ReactNode> = [
  <Typography variant="body2">
    <span style={{ fontWeight: '700' }}>Item type: </span>
    Content, Content template, Site area, Workflow, Presentation template, Page navigation component, Image component, Folder, Text component, Stylesheet component, Segment, Category,
  </Typography>,
  <Typography variant="body2">
    <span style={{ fontWeight: '700' }}>Authors: </span>
    wpsadmin, Content authors, Approvers, Reviewers, Content Managers, Writers, Contributors, Editors
  </Typography>,
  <Typography variant="body2">
    <span style={{ fontWeight: '700' }}>Words: </span>
    article, headline, product, woodburn, studio, party, apple
  </Typography>,
];

export const sampleFourChips: Array<React.ReactNode> = [
  <Typography variant="body2">
    <span style={{ fontWeight: '700' }}>Item type: </span>
    Content, Content template, Site area, Workflow, Presentation template, Page navigation component, Image component, Folder, Text component, Stylesheet component, Segment, Category,
  </Typography>,
  <Typography variant="body2">
    <span style={{ fontWeight: '700' }}>Authors: </span>
    wpsadmin, Content authors, Approvers, Reviewers, Content Managers, Writers, Contributors, Editors
  </Typography>,
  <Typography variant="body2">
    <span style={{ fontWeight: '700' }}>Words: </span>
    article, headline, product, woodburn, studio, party, apple
  </Typography>,
  <Typography variant="body2">
    <span style={{ fontWeight: '700' }}>Expiry date: </span>
    Date: Expired From: 12/25/2022 To: 01/25/2026
  </Typography>,
];

export const sampleFiveChips: Array<React.ReactNode> = [
  <Typography variant="body2">
    <span style={{ fontWeight: '700' }}>Item type: </span>
    Content, Content template, Site area, Workflow, Presentation template, Page navigation component, Image component, Folder, Text component, Stylesheet component, Segment, Category,
  </Typography>,
  <Typography variant="body2">
    <span style={{ fontWeight: '700' }}>Authors: </span>
    wpsadmin, Content authors, Approvers, Reviewers, Content Managers, Writers, Contributors, Editors
  </Typography>,
  <Typography variant="body2">
    <span style={{ fontWeight: '700' }}>Words: </span>
    article, headline, product, woodburn, studio, party, apple
  </Typography>,
  <Typography variant="body2">
    <span style={{ fontWeight: '700' }}>Words: </span>
    Date: Expired From: 12/25/2022 To: 01/25/2026
  </Typography>,
  <Typography variant="body2">
    <span style={{ fontWeight: '700' }}>Phrase: </span>
    Videographic evidence that earth is flat
  </Typography>,
];
