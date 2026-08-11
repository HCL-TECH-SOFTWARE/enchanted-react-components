import React from 'react';
export interface IActions {
    key: string;
    title: string;
    iconObject: React.ReactNode;
    toolTip: string;
    color?: string;
    handler(event: React.MouseEvent<HTMLElement>, itemId: string, optionalValue?: string, optionalFlag?: boolean): void;
    showDivider?: boolean;
}
export declare const data: IActions[];
export declare const ItemActions: IActions[];
export declare const getAvatarToDisplay: (itemTypeArgument: string, imageUrl?: string) => React.ReactNode | undefined;
export declare const assets: {
    title: string;
    subTitle: string;
    itemType: string;
}[];
export declare const getAvatarToDisplayForFileType: (itemTypeArgument: string, itemTitle: string, imageUrl?: string) => React.ReactNode | undefined;
