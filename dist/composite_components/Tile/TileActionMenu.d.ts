import React from 'react';
import { IActions } from './TileData';
export interface ITileActionMenuProps {
    itemId: string;
    actionList: IActions[];
    overflowTooltip?: string;
    menuSize?: string;
    disabled?: boolean;
    hasThumbnail?: boolean;
    isTrash?: boolean;
    trashInfoTooltip?: string;
}
export declare enum TileActionTestIds {
    TILE_ACTION_MENU = "basic-menu",
    TILE_ACTION_OVERFLOW = "tile-action-menu"
}
declare const TileActionMenu: React.FC<ITileActionMenuProps>;
export default TileActionMenu;
