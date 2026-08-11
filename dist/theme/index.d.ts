import React from 'react';
import { Theme } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';
declare module '@mui/material/styles' {
    interface TypographyVariants {
        body1bold: React.CSSProperties;
        body1italic: React.CSSProperties;
        body2bold: React.CSSProperties;
        body2italic: React.CSSProperties;
    }
    interface TypographyVariantsOptions {
        body1bold?: React.CSSProperties;
        body1italic?: React.CSSProperties;
        body2bold?: React.CSSProperties;
        body2italic?: React.CSSProperties;
    }
    interface TypeBackground {
        secondary: string;
        tertiary: string;
        dark: string;
        overlay: string;
        success: string;
        info: string;
        warning: string;
        error: string;
        primary: string;
        inverse: string;
        tile: string;
    }
    interface TypeText {
        hint: string;
        tertiary1: string;
        tertiary2: string;
        disabledInverse?: string;
    }
    interface TypeBorder {
        primary: string;
        secondary: string;
        hover?: string;
        inverseSecondary?: string;
        tertiary?: string;
    }
    interface TypeAction {
        activeOpacity?: string;
        selectedOpacityModified?: string;
        selectedOpacityHover?: string;
        hoverInverse?: string;
        hoverOpacityModified?: string;
        inverse?: string;
        disabledInverse?: string;
        disabledOpacityModified?: string;
        focusOpacityModified?: string;
        disableOpacityHover?: string;
        focusInverse?: string;
        selectedInverse?: string;
    }
    interface PaletteOptions {
        border: TypeBorder;
    }
    interface PaletteColor {
        inverse?: string;
        darkInverse?: string;
    }
    interface SimplePaletteColorOptions {
        inverse?: string;
        darkInverse?: string;
    }
    interface Palette {
        border: TypeBorder;
    }
    interface Palette {
        border: TypeBorder;
    }
    interface ColorPartial {
        50: false;
        A100: false;
        A200: false;
        A400: false;
        A700: false;
        150: string;
        1000: string;
        100080: string;
        1100: string;
    }
}
declare module '@mui/material' {
    interface Color {
        150: string;
        1000: string;
        100080: string;
        1100: string;
    }
}
export declare const ensureToGetColor: (color: string | undefined) => string;
export declare const TYPOGRAPHY: TypographyOptions;
export declare enum ThemeModeType {
    LIGHT_NEUTRAL_GREY = "LightNeutralGrey",
    LIGHT_COOL_GREY = "LightCoolGrey"
}
export declare enum PaletteMode {
    LIGHT = "light",
    DARK = "dark"
}
export declare enum ThemeDirectionType {
    LTR = "ltr",
    RTL = "rtl"
}
export declare const createEnchantedTheme: (direction: ThemeDirectionType, mode: ThemeModeType) => Theme;
/** @deprecated use the createEnchantedTheme method instead */
export declare const createRtlTheme: () => Theme;
/** @deprecated use the createEnchantedTheme method instead */
export declare const createLtrTheme: () => Theme;
