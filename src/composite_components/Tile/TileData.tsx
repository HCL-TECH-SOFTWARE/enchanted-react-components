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
import IconVideo from '@hcl-software/enchanted-icons/dist/carbon/es/video';
import IconDocument from '@hcl-software/enchanted-icons/dist/carbon/es/document--tasks';
import IconXls from '@hcl-software/enchanted-icons/dist/carbon/es/XLS';
import IconPpt from '@hcl-software/enchanted-icons/dist/carbon/es/PPT';
import IconTxt from '@hcl-software/enchanted-icons/dist/carbon/es/TXT';
import IconPdf from '@hcl-software/enchanted-icons/dist/carbon/es/PDF';
import IconStar from '@hcl-software/enchanted-icons/dist/carbon/es/star';
import IconImage from '@hcl-software/enchanted-icons/dist/carbon/es/image';
import IconRocket from '@hcl-software/enchanted-icons/dist/carbon/es/rocket';

export interface IActions {
  key: string,
  title: string,
  iconObject: React.ReactNode,
  toolTip: string,
  handler(event: React.MouseEvent<HTMLElement>, itemId: string, optionalValue?: string, optionalFlag?: boolean): void,
  showDivider?: boolean,
}
const itemEditAction = (event: React.MouseEvent<HTMLElement>, tileItemId: string) => {
  event.stopPropagation();
};

const itemDeleteAction = (event: React.MouseEvent<HTMLElement>, tileItemId: string) => {
  event.stopPropagation();
};

const itemAddedToFavoritesAction = (event: React.MouseEvent<HTMLElement>, tileItemId: string) => {
  event.stopPropagation();
};

const itemLinkCopiedAction = (event: React.MouseEvent<HTMLElement>, tileItemId: string) => {
  event.stopPropagation();
};
const itemCopiedAction = (event: React.MouseEvent<HTMLElement>, tileItemId: string) => {
  event.stopPropagation();
};
export const data: IActions[] = [
  {
    key: 'OPTION1',
    title: 'Option1',
    iconObject: <IconRocket />,
    toolTip: 'Option1',
    handler: itemEditAction,
  },
  {
    key: 'OPTION2',
    title: 'Option2',
    iconObject: <IconRocket />,
    toolTip: 'Option2',
    handler: itemLinkCopiedAction,
    showDivider: true,
  },
  {
    key: 'OPTION3',
    title: 'Option3',
    iconObject: <IconRocket />,
    toolTip: 'Option3',
    handler: itemCopiedAction,
  },
  {
    key: 'OPTION4',
    title: 'Option4',
    iconObject: <IconRocket />,
    toolTip: 'Option4',
    handler: itemDeleteAction,
  },
];

export const ItemActions:IActions[] = [
  {
    key: 'FAVORITE',
    title: 'Favorite Toggle',
    iconObject: <IconStar />,
    toolTip: 'Add to Favorites',
    handler: itemAddedToFavoritesAction,
  },
  {
    key: 'OPTION1',
    title: 'Option1',
    iconObject: <IconRocket />,
    toolTip: 'Option1',
    handler: itemEditAction,
  },
  {
    key: 'OPTION2',
    title: 'Option2',
    iconObject: <IconRocket />,
    toolTip: 'Option2',
    handler: itemLinkCopiedAction,
    showDivider: true,
  },
  {
    key: 'OPTION3',
    title: 'Option3',
    iconObject: <IconRocket />,
    toolTip: 'Option3',
    handler: itemCopiedAction,
  },
  {
    key: 'OPTION4',
    title: 'Option4',
    iconObject: <IconRocket />,
    toolTip: 'Option4',
    handler: itemDeleteAction,
  },
];

export const getAvatarToDisplay = (itemTypeArgument: string, imageUrl?: string): React.ReactNode | undefined => {
  let itemType = '';
  if (itemTypeArgument) {
    [itemType] = itemTypeArgument.split('/');
  }
  if (itemType === 'video' && !imageUrl) {
    return (
      <IconVideo />
    );
  } if (itemType === 'image' && imageUrl) {
    return (
      <IconImage />
    );
  }
  return undefined;
};

export const assets = [
  {
    title: 'Content.ppt',
    subTitle: 'ppt',
    itemType: 'application/ppt',
  },
  {
    title: 'Accounts.xls',
    subTitle: 'xls',
    itemType: 'application/xls',
  },
  {
    title: 'List.txt',
    subTitle: 'txt',
    itemType: 'application/txt',
  },
  {
    title: 'Notes.doc',
    subTitle: 'doc',
    itemType: 'application/doc',
  },
  {
    title: 'Instructions.pdf',
    subTitle: 'pdf',
    itemType: 'application/pdf',
  },
];

export const getAvatarToDisplayForFileType = (itemTypeArgument: string, itemTitle: string, imageUrl?: string): React.ReactNode | undefined => {
  let itemType = '';
  let itemExtension = '';
  if (itemTypeArgument) {
    [itemType] = itemTypeArgument.split('/');
  }
  if (itemTitle) {
    itemExtension = itemTitle.substr(itemTitle.lastIndexOf('.') + 1).toUpperCase();
  }
  if (itemType === 'application') {
    if (itemExtension === 'PDF') {
      return (
        <IconPdf />
      );
    } if (itemExtension === 'DOC' || itemExtension === 'DOCX') {
      return (
        <IconDocument />
      );
    } if (itemExtension === 'XLS' || itemExtension === 'XLSX') {
      return (
        <IconXls />
      );
    }
    if (itemExtension === 'PPT' || itemExtension === 'PPTX') {
      return (
        <IconPpt />
      );
    }
    if (itemExtension === 'TXT' || itemExtension === 'OTHERS') {
      return (
        <IconTxt />
      );
    }
  }
  return undefined;
};
