import React, { ImgHTMLAttributes } from 'react';
import { Components, Theme } from '@mui/material';
import { ChipProps as MuiChipProps } from '@mui/material/Chip';
import { AvatarTypes } from '../Avatar';
export declare enum ChipVariants {
    CONTAINED = "filled",
    OUTLINED = "outlined"
}
export declare enum ChipTestIds {
    CHIP_ROOT = "ChipRoot"
}
/**
 * @typedef ChipProps
 * @type {object}
 * @property {AvatarTypes} leadingavatartype - Types of Avatar that can be set as image, letter or icon
 * @property {React.ReactNode} leadingIcon - Types of Avatar that can be set as image, letter or icon
 * @property {string} leadingImage - Types of Avatar that can be set as image, letter or icon
 * @property {string} leadingImageAlt - Types of Avatar that can be set as image, letter or icon
 * @property {ImgHTMLAttributes<HTMLImageElement>} leadingImageProps - Types of Avatar that can be set as image, letter or icon
 * @property {string} leadingLetter - Types of Avatar that can be set as image, letter or icon
 * @property {React.ReactNode} trailingIcon - Types of Avatar that can be set as image, letter or icon
 * @property {Function} onDeleteFunc - Callback fired when trailing icon is clicked. If undefined, it will hide trailing icon
 * @property {boolean} hideTrailingIcon - Toggles visibility of trailing icon, only for Storybook use
 * @property {boolean} selected - Toggles selected state for Storybook use only - adds same styles as :active state
 * @property {boolean} focus - Toggles focus state for Storybook use only - adds same styles as :focus state
 */
export type ChipProps = MuiChipProps & {
    leadingavatartype?: AvatarTypes | 'none';
    leadingIcon?: React.ReactNode;
    leadingImage?: string;
    leadingImageAlt?: string;
    leadingImageProps?: ImgHTMLAttributes<HTMLImageElement>;
    leadingLetter?: string;
    trailingIcon?: React.ReactElement;
    onDeleteFunc?: Function;
    hideTrailingIcon?: boolean;
    selected?: boolean;
    focus?: boolean | 0 | 1;
};
declare const Chip: {
    ({ ...props }: ChipProps): React.JSX.Element;
    defaultProps: {
        color: string;
        clickable: boolean;
        disabled: boolean;
        variant: ChipVariants;
        onDeleteFunc: undefined;
        hideTrailingIcon: boolean;
        leadingavatartype: string;
        selected: boolean;
        focus: undefined;
    };
};
export declare const getMuiChipThemeOverrides: () => Components<Omit<Theme, 'components'>>;
export * from '@mui/material/Chip';
export default Chip;
