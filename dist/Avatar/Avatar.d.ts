import React, { ImgHTMLAttributes } from 'react';
import { AvatarProps as MuiAvatarProps } from '@mui/material/Avatar';
import { Components, Theme } from '@mui/material';
declare module '@mui/material/Avatar' {
    interface AvatarPropsVariantOverrides {
        square: false;
    }
}
export declare enum AvatarTypes {
    IMAGE = "image",
    LETTER = "letter",
    ICON = "icon"
}
export declare enum AvatarColors {
    DEFAULT = "default",
    RED = "red",
    ORANGE = "orange",
    YELLOW = "yellow",
    LIME = "lime",
    GREEN = "green",
    TEAL = "teal",
    BLUE = "blue",
    INDIGO = "indigo",
    PURPLE = "purple",
    PINK = "pink"
}
export type AvatarProps = MuiAvatarProps & {
    type: AvatarTypes;
    color?: AvatarColors;
    iconImage?: React.ReactNode;
    imageSource?: string;
    letter?: string;
    imageAltProps?: string;
    imageProps?: ImgHTMLAttributes<HTMLImageElement>;
};
export declare enum AvatarTestIds {
    AVATAR_ICON = "avatarIcon",
    AVATAR_LETTER = "avatarLetter",
    AVATAR_IMAGE = "avatarImage"
}
declare const Avatar: {
    ({ ...props }: AvatarProps): React.JSX.Element;
    defaultProps: AvatarProps;
};
/**
 * Override out of the box styling from mui to align with designer theme
 * @returns override Checkbox component styles and prop
 */
export declare const getMuiAvatarThemeOverrides: () => Components<Omit<Theme, 'components'>>;
export * from '@mui/material/Avatar';
export default Avatar;
