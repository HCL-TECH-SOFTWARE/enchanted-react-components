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
import {
  Theme, createTheme, PaletteOptions, Shadows,
} from '@mui/material/styles';
import { ThemeOptions } from '@mui/material/styles/createTheme';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import { Colors, ColorNames, UNKNOWN_COLOR_CODE } from '../colors';
import { getMuiTextFieldThemeOverrides } from '../TextField';
import { getMuiChipThemeOverrides } from '../Chip/Chip';
import { getMuiCheckboxThemeOverrides } from '../Checkbox/Checkbox';
import { getMuiCircularProgressThemeOverrides } from '../ProgressIndicator/CircularProgress/CircularProgress';
import { getMuiSnackbarThemeOverrides } from '../Snackbar/Snackbar';
import { getMuiRadioThemeOverrides } from '../Radio';
import { getMuiButtonThemeOverrides } from '../Button/Button';
import { getMuiToggleButtonThemeOverrides } from '../ToggleButton/ToggleButton';
import { getMuiLinkThemeOverrides } from '../Link';
import { getMuiBreadcrumbsThemeOverrides } from '../Breadcrumbs';
import { getMuiSelectThemeOverrides } from '../Select';
import { getMuiAutocompleteThemeOverrides } from '../Autocomplete';
import { getMuiSwitchThemeOverrides } from '../Switch';
import { getMuiDividerThemeOverrides } from '../Divider';
import { getMuiIconButtonThemeOverrides } from '../IconButton';
import { getMuiPaperThemeOverrides } from '../Paper';
import { getMuiAvatarThemeOverrides } from '../Avatar';
import { getMuiMenuItemThemeOverrides } from '../Menu/MenuItem';
import { getMuiTooltipThemeOverrides } from '../Tooltip';
import { getMuiBackdropThemeOverrides } from '../Backdrop';
import { getMuiDialogThemeOverrides } from '../Dialog';
import { getMuiMenuThemeOverrides } from '../Menu';
import { getMuiTypographyThemeOverrides } from '../Typography';
import { getMuiFormControlLabelThemeOverrides } from '../prerequisite_components/FormControlLabel';
import { getMuiAlertThemeOverrides } from '../Alert';
import { getMuiTablePaginationThemeOverrides } from '../Pagination';
import { getMuiListThemeOverrides } from '../List/List';
import { getMuiListItemThemeOverrides } from '../List/ListItem';
import { getMuiListItemAvatarThemeOverrides } from '../List/ListItemAvatar';
import { getMuiListItemButtonThemeOverrides } from '../List/ListItemButton';
import { getMuiListItemIconThemeOverrides } from '../List/ListItemIcon';
import { getMuiListItemTextThemeOverrides } from '../List/ListItemText';
import { getMuiToggleButtonGroupThemeOverrides } from '../ToggleButtonGroup';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    body1bold: React.CSSProperties,
    body1italic: React.CSSProperties,
    body2bold: React.CSSProperties,
    body2italic: React.CSSProperties,
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    body1bold?: React.CSSProperties,
    body1italic?: React.CSSProperties,
    body2bold?: React.CSSProperties,
    body2italic?: React.CSSProperties,
  }

  interface TypeBackground {
    secondary: string,
    tertiary: string,
    dark: string,
    overlay: string,
    success: string,
    info: string,
    warning: string,
    error: string,
    primary: string,
    inverse: string,
    tile: string,
  }
  interface TypeText {
    hint: string,
    tertiary1: string,
    tertiary2: string,
    disabledInverse?: string,
  }

  interface TypeBorder {
    primary: string,
    secondary: string,
    hover?: string,
    inverseSecondary?: string,
    tertiary?: string,
  }

  interface TypeAction {
    activeOpacity?: string,
    selectedOpacityModified?: string, // modified because TypeAction has another selectedOpacity property that accepts number only
    selectedOpacityHover?: string,
    hoverInverse?: string,
    hoverOpacityModified?: string,
    inverse?: string,
    disabledInverse?: string,
    disabledOpacityModified?: string, // modified because TypeAction has another disabledOpacity property that accepts number only
    focusOpacityModified?: string, // modified because TypeAction has another focusOpacity property that accepts number only
    disableOpacityHover?: string;
  }

  interface PaletteOptions {
    border: TypeBorder,
  }

  interface PaletteColor {
    inverse?: string,
  }

  interface SimplePaletteColorOptions {
    inverse?: string,
  }

  interface Palette {
    border: TypeBorder,
  }

  interface Palette {
    border: TypeBorder,
  }

  interface ColorPartial {
    50: false,
    A100: false,
    A200: false,
    A400: false,
    A700: false,
    150: string,
    1000: string,
    1000_80: string,
    1100: string,
  }
}

declare module '@mui/material' {
  interface Color {
    150: string,
    1000: string,
    1000_80: string,
    1100: string,
  }
}

export const ensureToGetColor = (color: string | undefined): string => {
  if (color === undefined) {
    return UNKNOWN_COLOR_CODE;
  }
  return color;
};

export const TYPOGRAPHY: TypographyOptions = {
  fontFamily: 'Inter, sans-serif',
  h1: {
    fontWeight: '300',
    fontSize: '60px',
    lineHeight: '72px',
    letterSpacing: '0px',
  },
  h2: {
    fontWeight: '400',
    fontSize: '48px',
    lineHeight: '56px',
    letterSpacing: '0px',
  },
  h3: {
    fontWeight: '400',
    fontSize: '34px',
    lineHeight: '42px',
    letterSpacing: '0px',
  },
  h4: {
    fontWeight: '400',
    fontSize: '24px',
    lineHeight: '32px',
    letterSpacing: '0px',
  },
  h5: {
    fontWeight: '400',
    fontSize: '20px',
    lineHeight: '30px',
    letterSpacing: '0px',
  },
  h6: {
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0px',
  },
  subtitle1: {
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '22px',
    letterSpacing: '0px',
  },
  subtitle2: {
    fontWeight: '600',
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '0px',
  },
  body1: {
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '22px',
    letterSpacing: '0px',
  },
  body1bold: {
    fontWeight: '700',
    fontSize: '14px',
    lineHeight: '22px',
    letterSpacing: '0px',
  },
  body1italic: {
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '22px',
    letterSpacing: '0px',
    fontStyle: 'italic',
  },
  body2: {
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '0px',
  },
  body2bold: {
    fontWeight: '700',
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '0px',
  },
  body2italic: {
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '0px',
    fontStyle: 'italic',
  },
  caption: {
    fontWeight: '400',
    fontSize: '10px',
    lineHeight: '14px',
    letterSpacing: '0px',
  },
};

export enum ThemeModeType {
  LIGHT_NEUTRAL_GREY = 'LightNeutralGrey',
  LIGHT_COOL_GREY = 'LightCoolGrey',
  // DARK_NEUTRAL_GREY = 'DarkNeutralGrey',
  // DARK_COOL_GREY = 'DarkCoolGrey',
}

export enum PaletteMode {
  LIGHT = 'light',
  DARK = 'dark',
}

const PALETTE_LIGHT: PaletteOptions = {
  mode: PaletteMode.LIGHT,
  common: {
    black: ensureToGetColor(Colors.get(ColorNames.BLACK)),
    white: ensureToGetColor(Colors.get(ColorNames.WHITE)),
  },
  primary: {
    main: ensureToGetColor(Colors.get(ColorNames.HCLSOFTWAREBLUE07)),
    dark: ensureToGetColor(Colors.get(ColorNames.PRIMARY_DARK)),
    inverse: ensureToGetColor(Colors.get(ColorNames.HCLSOFTWAREBLUE09)),
  },
  error: {
    main: ensureToGetColor(Colors.get(ColorNames.RED800)),
    dark: ensureToGetColor(Colors.get(ColorNames.ERROR_HOVER)),
    inverse: ensureToGetColor(Colors.get(ColorNames.RED300)),
  },
  warning: {
    main: ensureToGetColor(Colors.get(ColorNames.ORANGE800)),
    dark: ensureToGetColor(Colors.get(ColorNames.WARNING_HOVER)),
    inverse: ensureToGetColor(Colors.get(ColorNames.ORANGE300)),
  },
  info: {
    main: ensureToGetColor(Colors.get(ColorNames.BLUE800)),
    dark: ensureToGetColor(Colors.get(ColorNames.INFO_HOVER)),
    inverse: ensureToGetColor(Colors.get(ColorNames.BLUE300)),
  },
  success: {
    main: ensureToGetColor(Colors.get(ColorNames.GREEN800)),
    dark: ensureToGetColor(Colors.get(ColorNames.SUCCESS_HOVER)),
    inverse: ensureToGetColor(Colors.get(ColorNames.GREEN300)),
  },
  background: {
    default: ensureToGetColor(Colors.get(ColorNames.NEUTRALGREY100)),
    paper: ensureToGetColor(Colors.get(ColorNames.WHITE100P)),
    secondary: ensureToGetColor(Colors.get(ColorNames.NEUTRALGREY150)),
    tertiary: ensureToGetColor(Colors.get(ColorNames.NEUTRALGREY200)),
    dark: ensureToGetColor(Colors.get(ColorNames.NEUTRALGREY900)),
    overlay: ensureToGetColor(Colors.get(ColorNames.NEUTRALGREY1000_80)),
    primary: ensureToGetColor(Colors.get(ColorNames.HCLSOFTWAREBLUE07_12P)),
    success: ensureToGetColor(Colors.get(ColorNames.GREEN100)),
    error: ensureToGetColor(Colors.get(ColorNames.RED100)),
    info: ensureToGetColor(Colors.get(ColorNames.BLUE100)),
    warning: ensureToGetColor(Colors.get(ColorNames.ORANGE100)),
    inverse: ensureToGetColor(Colors.get(ColorNames.WHITE24P)),
    tile: ensureToGetColor(Colors.get(ColorNames.INDIGO100)),
  },
  text: {
    primary: ensureToGetColor(Colors.get(ColorNames.BLACK87P)),
    secondary: ensureToGetColor(Colors.get(ColorNames.BLACK60P)),
    disabled: ensureToGetColor(Colors.get(ColorNames.BLACK38P)),
    disabledInverse: ensureToGetColor(Colors.get(ColorNames.WHITE38P)),
    hint: ensureToGetColor(Colors.get(ColorNames.BLACK60P)),
    tertiary1: ensureToGetColor(Colors.get(ColorNames.WHITE93P)),
    tertiary2: ensureToGetColor(Colors.get(ColorNames.WHITE70P)),
  },
  border: {
    primary: ensureToGetColor(Colors.get(ColorNames.BLACK32P)),
    secondary: ensureToGetColor(Colors.get(ColorNames.BLACK20P)),
    tertiary: ensureToGetColor(Colors.get(ColorNames.BLACK43P)),
    inverseSecondary: ensureToGetColor(Colors.get(ColorNames.WHITE40P)),
  },
  action: {
    active: ensureToGetColor(Colors.get(ColorNames.BLACK60P)),
    activeOpacity: ensureToGetColor(Colors.get(ColorNames.BLACK12P)),
    hover: ensureToGetColor(Colors.get(ColorNames.BLACK7P)),
    hoverOpacityModified: ensureToGetColor(Colors.get(ColorNames.BLACK7P)),
    selected: ensureToGetColor(Colors.get(ColorNames.HCLSOFTWAREBLUE07)),
    selectedOpacityModified: ensureToGetColor(Colors.get(ColorNames.HCLSOFTWAREBLUE07_8P)),
    selectedOpacityHover: ensureToGetColor(Colors.get(ColorNames.HCLSOFTWAREBLUE07_20P)),
    disabled: ensureToGetColor(Colors.get(ColorNames.BLACK38P)),
    disabledBackground: ensureToGetColor(Colors.get(ColorNames.NEUTRALGREY150)),
    disabledOpacityModified: ensureToGetColor(Colors.get(ColorNames.BLACK8P)),
    disableOpacityHover: ensureToGetColor(Colors.get(ColorNames.BLACK15P)),
    focus: ensureToGetColor(Colors.get(ColorNames.HCLSOFTWAREBLUE07)),
    focusOpacityModified: ensureToGetColor(Colors.get(ColorNames.HCLSOFTWAREBLUE07_12P)),
    inverse: ensureToGetColor(Colors.get(ColorNames.WHITE80P)),
    disabledInverse: ensureToGetColor(Colors.get(ColorNames.WHITE38P)),
    hoverInverse: ensureToGetColor(Colors.get(ColorNames.WHITE15P)),
  },
  grey: {
    100: ensureToGetColor(Colors.get(ColorNames.NEUTRALGREY100)),
    150: ensureToGetColor(Colors.get(ColorNames.NEUTRALGREY150)),
    200: ensureToGetColor(Colors.get(ColorNames.NEUTRALGREY200)),
    300: ensureToGetColor(Colors.get(ColorNames.NEUTRALGREY300)),
    400: ensureToGetColor(Colors.get(ColorNames.NEUTRALGREY400)),
    500: ensureToGetColor(Colors.get(ColorNames.NEUTRALGREY500)),
    600: ensureToGetColor(Colors.get(ColorNames.NEUTRALGREY600)),
    700: ensureToGetColor(Colors.get(ColorNames.NEUTRALGREY700)),
    800: ensureToGetColor(Colors.get(ColorNames.NEUTRALGREY800)),
    900: ensureToGetColor(Colors.get(ColorNames.NEUTRALGREY900)),
    1000: ensureToGetColor(Colors.get(ColorNames.NEUTRALGREY1000)),
    1100: ensureToGetColor(Colors.get(ColorNames.NEUTRALGREY1100)),
  },
};

const PALETTE_LIGHT_COOL_GRAY: PaletteOptions = {
  ...PALETTE_LIGHT,
  background: {
    ...PALETTE_LIGHT.background,
    default: ensureToGetColor(Colors.get(ColorNames.COOLGREY100)),
    secondary: ensureToGetColor(Colors.get(ColorNames.COOLGREY150)),
    tertiary: ensureToGetColor(Colors.get(ColorNames.COOLGREY200)),
    dark: ensureToGetColor(Colors.get(ColorNames.COOLGREY900)),
    overlay: ensureToGetColor(Colors.get(ColorNames.COOLGREY1000_80)),
  },
  action: {
    ...PALETTE_LIGHT.action,
    disabledBackground: ensureToGetColor(Colors.get(ColorNames.COOLGREY150)),
  },
  grey: {
    100: ensureToGetColor(Colors.get(ColorNames.COOLGREY100)),
    150: ensureToGetColor(Colors.get(ColorNames.COOLGREY150)),
    200: ensureToGetColor(Colors.get(ColorNames.COOLGREY200)),
    300: ensureToGetColor(Colors.get(ColorNames.COOLGREY300)),
    400: ensureToGetColor(Colors.get(ColorNames.COOLGREY400)),
    500: ensureToGetColor(Colors.get(ColorNames.COOLGREY500)),
    600: ensureToGetColor(Colors.get(ColorNames.COOLGREY600)),
    700: ensureToGetColor(Colors.get(ColorNames.COOLGREY700)),
    800: ensureToGetColor(Colors.get(ColorNames.COOLGREY800)),
    900: ensureToGetColor(Colors.get(ColorNames.COOLGREY900)),
    1000: ensureToGetColor(Colors.get(ColorNames.COOLGREY1000)),
    1100: ensureToGetColor(Colors.get(ColorNames.COOLGREY1100)),
  },
};

const getPalette = (mode: ThemeModeType): PaletteOptions => {
  switch (true) {
    case mode === ThemeModeType.LIGHT_NEUTRAL_GREY:
      return PALETTE_LIGHT;
    case mode === ThemeModeType.LIGHT_COOL_GREY:
      return PALETTE_LIGHT_COOL_GRAY;
    default:
      return PALETTE_LIGHT;
  }
};

export enum ThemeDirectionType {
  LTR = 'ltr',
  RTL = 'rtl',
}

// Shadow Tokens used in various components are defined as elevation levels below.
const shadows: Shadows = Array(25).fill('none') as Shadows;
shadows[0] = 'none';
shadows[1] = '0px 4px 10px 0px rgba(0, 0, 0, 0.12)';
shadows[2] = '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)';
shadows[4] = '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)';
shadows[6] = '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)';
shadows[16] = '0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12)';
shadows[24] = '0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)';

const getThemeOptions = (direction: ThemeDirectionType, mode: ThemeModeType) => {
  const themeOptions: ThemeOptions = {
    typography: TYPOGRAPHY,
    palette: getPalette(mode),
    direction,
    shadows,
    components: {
      ...getMuiChipThemeOverrides(),
      ...getMuiCheckboxThemeOverrides(),
      ...getMuiRadioThemeOverrides(),
      ...getMuiTextFieldThemeOverrides(),
      ...getMuiButtonThemeOverrides(),
      ...getMuiToggleButtonThemeOverrides(),
      ...getMuiToggleButtonGroupThemeOverrides(),
      ...getMuiLinkThemeOverrides(),
      ...getMuiBreadcrumbsThemeOverrides(),
      ...getMuiCircularProgressThemeOverrides(),
      ...getMuiSelectThemeOverrides(),
      ...getMuiAutocompleteThemeOverrides(),
      ...getMuiSwitchThemeOverrides(),
      ...getMuiDividerThemeOverrides(),
      ...getMuiSnackbarThemeOverrides(),
      ...getMuiIconButtonThemeOverrides(),
      ...getMuiPaperThemeOverrides(),
      ...getMuiAvatarThemeOverrides(),
      ...getMuiTooltipThemeOverrides(),
      ...getMuiBackdropThemeOverrides(),
      ...getMuiDialogThemeOverrides(),
      ...getMuiMenuThemeOverrides(),
      ...getMuiMenuItemThemeOverrides(),
      ...getMuiFormControlLabelThemeOverrides(),
      ...getMuiTypographyThemeOverrides(),
      ...getMuiAlertThemeOverrides(),
      ...getMuiTablePaginationThemeOverrides(),
      ...getMuiListThemeOverrides(),
      ...getMuiListItemThemeOverrides(),
      ...getMuiListItemAvatarThemeOverrides(),
      ...getMuiListItemButtonThemeOverrides(),
      ...getMuiListItemIconThemeOverrides(),
      ...getMuiListItemTextThemeOverrides(),
    },
  };
  return themeOptions;
};

export const createEnchantedTheme = (direction: ThemeDirectionType, mode: ThemeModeType): Theme => {
  const themeOptions: ThemeOptions = getThemeOptions(direction, mode);
  const enchantedTheme = createTheme(themeOptions);
  return enchantedTheme;
};

/** @deprecated use the createEnchantedTheme method instead */
export const createRtlTheme = (): Theme => {
  const themeOptions: ThemeOptions = getThemeOptions(ThemeDirectionType.RTL, ThemeModeType.LIGHT_NEUTRAL_GREY);
  const rtlTheme = createTheme(themeOptions);
  return rtlTheme;
};

/** @deprecated use the createEnchantedTheme method instead */
export const createLtrTheme = (): Theme => {
  const themeOptions: ThemeOptions = getThemeOptions(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY);
  const ltrTheme = createTheme(themeOptions);
  return ltrTheme;
};
