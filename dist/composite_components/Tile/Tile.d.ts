import React, { ReactNode } from 'react';
import { IActions } from './TileData';
export declare const StyledBox: import("@emotion/styled").StyledComponent<import("@mui/system").BoxOwnProps<import("@mui/material").Theme> & Omit<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null | undefined;
}, keyof import("@mui/system").BoxOwnProps<import("@mui/material").Theme>> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
export interface TilePropsType {
    activeItem?: string;
    itemId: string;
    title: string;
    subTitle: string;
    avatar?: React.ReactNode;
    imageUrl?: string;
    imageAltName?: string;
    hideAvatarIfImageIsLoaded: boolean;
    itemClickedAction?(event: React.MouseEvent<HTMLElement>, tileItemId: string): void;
    handlePreviewAction?(event: React.MouseEvent<HTMLElement>, tileItemId: string): void;
    handleCheckboxChange?(event: React.ChangeEvent<HTMLInputElement>, tileItemId: string, isChecked: boolean): void;
    tileActions?: IActions[];
    ariaLabel?: string;
    ariaLabelledBy?: string;
    overflowTooltip?: string;
    tileRef?: React.Ref<HTMLLIElement>;
    menuSize?: string;
    hasCheckBox: boolean;
    hasThumbnail?: boolean;
    disabled?: boolean;
    syncIcon?: ReactNode;
    hoverPreviewMenu?: string;
    isTrash?: boolean;
    trashInfoTooltip?: string;
    lockNoticeText?: string;
}
export declare enum TileTestIds {
    TILE_PREVIEW = "preview-icon-view"
}
declare const Tile: (props: TilePropsType) => React.JSX.Element;
export default Tile;
