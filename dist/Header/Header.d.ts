import React from 'react';
import { ContainerProps as MuiContainerProps } from '@mui/material/Container';
export declare enum HeaderDemo {
    CC = "CC",
    DAM = "DAM",
    CR = "CR"
}
export declare enum HeaderPageVariant {
    OVERVIEW_PAGE = "OVERVIEW_PAGE",
    ITEM_PAGE = "ITEM_PAGE",
    SEARCH_RESULT_PAGE = "SEARCH_RESULT_PAGE",
    UPDATES_PAGE = "UPDATES_PAGE"
}
export declare enum HeaderTestIds {
    HEADER_CONTAINER = "headerContainer",
    HEADER_START_SECTION = "headerStartSection",
    HEADER_MIDDLE_SECTION = "headerMiddleSection",
    HEADER_END_SECTION = "headerEndSection",
    HEADER_BACK_BUTTON = "headerBackButton",
    HEADER_START_TITLE = "headerStartTitle",
    HEADER_START_SUBTITLE = "headerStartSubtitle",
    HEADER_FAVORITES_TOGGLE = "headerFavoritesToggle"
}
export interface IHeaderStartSection {
    hamburgerSpace?: boolean;
    title?: string;
    withBackButton?: boolean;
    avatar?: React.ReactNode;
    subtitle?: string;
    favoritesToggleIcon?: React.ReactNode;
    favoritesToggleComponent?: React.ReactNode;
    backIconToolTip?: string;
}
export interface HeaderProps extends MuiContainerProps {
    startSection: IHeaderStartSection;
    hideMiddleSection?: boolean;
    hamburgerSpace?: boolean;
    middleSection?: Array<React.ReactNode>;
    endSection?: Array<React.ReactNode>;
    headerPageVariant?: HeaderPageVariant;
    headerDemoSample?: HeaderDemo;
    onClickBackButton: Function;
    onClickFavoritesToggle: Function;
}
declare const Header: {
    ({ ...props }: HeaderProps): React.JSX.Element;
    defaultProps: {
        hideMiddleSection: boolean;
        startSection: never[];
        middleSection: never[];
        endSection: never[];
        onClickBackButton: () => void;
        onClickFavoritesToggle: () => void;
    };
};
export * from '@mui/material/AppBar';
export default Header;
