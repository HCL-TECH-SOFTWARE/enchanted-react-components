"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLtrTheme = exports.createRtlTheme = exports.createEnchantedTheme = exports.ThemeDirectionType = exports.PaletteMode = exports.ThemeModeType = exports.TYPOGRAPHY = exports.ensureToGetColor = void 0;
const styles_1 = require("@mui/material/styles");
const colors_1 = require("../colors");
const TextField_1 = require("../TextField");
const Chip_1 = require("../Chip/Chip");
const Checkbox_1 = require("../Checkbox/Checkbox");
const CircularProgress_1 = require("../ProgressIndicator/CircularProgress/CircularProgress");
const Snackbar_1 = require("../Snackbar/Snackbar");
const Radio_1 = require("../Radio");
const Button_1 = require("../Button/Button");
const ToggleButton_1 = require("../ToggleButton/ToggleButton");
const Link_1 = require("../Link");
const Breadcrumbs_1 = require("../Breadcrumbs");
const Select_1 = require("../Select");
const Autocomplete_1 = require("../Autocomplete");
const Switch_1 = require("../Switch");
const Divider_1 = require("../Divider");
const IconButton_1 = require("../IconButton");
const Paper_1 = require("../Paper");
const Avatar_1 = require("../Avatar");
const MenuItem_1 = require("../Menu/MenuItem");
const Tooltip_1 = require("../Tooltip");
const Backdrop_1 = require("../Backdrop");
const Dialog_1 = require("../Dialog");
const Menu_1 = require("../Menu");
const Typography_1 = require("../Typography");
const FormControlLabel_1 = require("../prerequisite_components/FormControlLabel");
const Alert_1 = require("../Alert");
const Pagination_1 = require("../Pagination");
const List_1 = require("../List/List");
const ListItem_1 = require("../List/ListItem");
const ListItemAvatar_1 = require("../List/ListItemAvatar");
const ListItemButton_1 = require("../List/ListItemButton");
const ListItemIcon_1 = require("../List/ListItemIcon");
const ListItemText_1 = require("../List/ListItemText");
const ToggleButtonGroup_1 = require("../ToggleButtonGroup");
const TreeView_1 = require("../TreeView");
const ensureToGetColor = (color) => {
    if (color === undefined) {
        return colors_1.UNKNOWN_COLOR_CODE;
    }
    return color;
};
exports.ensureToGetColor = ensureToGetColor;
exports.TYPOGRAPHY = {
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
var ThemeModeType;
(function (ThemeModeType) {
    ThemeModeType["LIGHT_NEUTRAL_GREY"] = "LightNeutralGrey";
    ThemeModeType["LIGHT_COOL_GREY"] = "LightCoolGrey";
    // DARK_NEUTRAL_GREY = 'DarkNeutralGrey',
    // DARK_COOL_GREY = 'DarkCoolGrey',
})(ThemeModeType = exports.ThemeModeType || (exports.ThemeModeType = {}));
var PaletteMode;
(function (PaletteMode) {
    PaletteMode["LIGHT"] = "light";
    PaletteMode["DARK"] = "dark";
})(PaletteMode = exports.PaletteMode || (exports.PaletteMode = {}));
const PALETTE_LIGHT = {
    mode: PaletteMode.LIGHT,
    common: {
        black: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.BLACK)),
        white: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.WHITE)),
    },
    primary: {
        main: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.HCLSOFTWAREBLUE07)),
        dark: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.PRIMARY_DARK)),
        darkInverse: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.PRIMARY_DARK_INVERSE)),
        inverse: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.HCLSOFTWAREBLUE09)),
    },
    error: {
        main: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.RED800)),
        dark: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.ERROR_HOVER)),
        inverse: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.RED300)),
    },
    warning: {
        main: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.ORANGE800)),
        dark: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.WARNING_HOVER)),
        inverse: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.ORANGE300)),
    },
    info: {
        main: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.BLUE800)),
        dark: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.INFO_HOVER)),
        inverse: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.BLUE300)),
    },
    success: {
        main: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.GREEN800)),
        dark: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.SUCCESS_HOVER)),
        inverse: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.GREEN300)),
    },
    background: {
        default: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.NEUTRALGREY100)),
        paper: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.WHITE100P)),
        secondary: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.NEUTRALGREY150)),
        tertiary: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.NEUTRALGREY200)),
        dark: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.NEUTRALGREY900)),
        overlay: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.NEUTRALGREY1000_80)),
        primary: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.HCLSOFTWAREBLUE07_12P)),
        success: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.GREEN100)),
        error: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.RED100)),
        info: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.BLUE100)),
        warning: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.ORANGE100)),
        inverse: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.WHITE24P)),
        tile: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.INDIGO100)),
    },
    text: {
        primary: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.BLACK87P)),
        secondary: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.BLACK60P)),
        disabled: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.BLACK38P)),
        disabledInverse: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.WHITE38P)),
        hint: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.BLACK60P)),
        tertiary1: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.WHITE93P)),
        tertiary2: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.WHITE70P)),
    },
    border: {
        primary: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.BLACK32P)),
        secondary: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.BLACK20P)),
        tertiary: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.BLACK43P)),
        inverseSecondary: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.WHITE40P)),
    },
    action: {
        active: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.BLACK60P)),
        activeOpacity: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.BLACK12P)),
        hover: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.BLACK7P)),
        hoverOpacityModified: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.BLACK7P)),
        selected: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.HCLSOFTWAREBLUE07)),
        selectedInverse: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.HCLSOFTWAREBLUE09)),
        selectedOpacityModified: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.HCLSOFTWAREBLUE07_8P)),
        selectedOpacityHover: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.HCLSOFTWAREBLUE07_20P)),
        disabled: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.BLACK38P)),
        disabledBackground: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.NEUTRALGREY150)),
        disabledOpacityModified: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.BLACK8P)),
        disableOpacityHover: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.BLACK15P)),
        focus: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.HCLSOFTWAREBLUE07)),
        focusInverse: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.HCLSOFTWAREBLUE09)),
        focusOpacityModified: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.HCLSOFTWAREBLUE07_12P)),
        inverse: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.WHITE80P)),
        disabledInverse: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.WHITE38P)),
        hoverInverse: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.WHITE15P)),
    },
    grey: {
        100: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.NEUTRALGREY100)),
        150: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.NEUTRALGREY150)),
        200: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.NEUTRALGREY200)),
        300: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.NEUTRALGREY300)),
        400: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.NEUTRALGREY400)),
        500: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.NEUTRALGREY500)),
        600: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.NEUTRALGREY600)),
        700: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.NEUTRALGREY700)),
        800: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.NEUTRALGREY800)),
        900: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.NEUTRALGREY900)),
        1000: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.NEUTRALGREY1000)),
        1100: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.NEUTRALGREY1100)),
    },
};
const PALETTE_LIGHT_COOL_GRAY = Object.assign(Object.assign({}, PALETTE_LIGHT), { background: Object.assign(Object.assign({}, PALETTE_LIGHT.background), { default: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.COOLGREY100)), secondary: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.COOLGREY150)), tertiary: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.COOLGREY200)), dark: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.COOLGREY900)), overlay: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.COOLGREY1000_80)) }), action: Object.assign(Object.assign({}, PALETTE_LIGHT.action), { disabledBackground: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.COOLGREY150)) }), grey: {
        100: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.COOLGREY100)),
        150: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.COOLGREY150)),
        200: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.COOLGREY200)),
        300: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.COOLGREY300)),
        400: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.COOLGREY400)),
        500: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.COOLGREY500)),
        600: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.COOLGREY600)),
        700: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.COOLGREY700)),
        800: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.COOLGREY800)),
        900: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.COOLGREY900)),
        1000: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.COOLGREY1000)),
        1100: (0, exports.ensureToGetColor)(colors_1.Colors.get(colors_1.ColorNames.COOLGREY1100)),
    } });
const getPalette = (mode) => {
    switch (true) {
        case mode === ThemeModeType.LIGHT_NEUTRAL_GREY:
            return PALETTE_LIGHT;
        case mode === ThemeModeType.LIGHT_COOL_GREY:
            return PALETTE_LIGHT_COOL_GRAY;
        default:
            return PALETTE_LIGHT;
    }
};
var ThemeDirectionType;
(function (ThemeDirectionType) {
    ThemeDirectionType["LTR"] = "ltr";
    ThemeDirectionType["RTL"] = "rtl";
})(ThemeDirectionType = exports.ThemeDirectionType || (exports.ThemeDirectionType = {}));
// Shadow Tokens used in various components are defined as elevation levels below.
const shadows = Array(25).fill('none');
shadows[0] = 'none';
shadows[1] = '0px 4px 10px 0px rgba(0, 0, 0, 0.12)';
shadows[2] = '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)';
shadows[4] = '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)';
shadows[6] = '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)';
shadows[16] = '0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12)';
shadows[24] = '0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)';
const getThemeOptions = (direction, mode) => {
    const themeOptions = {
        typography: exports.TYPOGRAPHY,
        palette: getPalette(mode),
        direction,
        shadows,
        components: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (0, Chip_1.getMuiChipThemeOverrides)()), (0, Checkbox_1.getMuiCheckboxThemeOverrides)()), (0, Radio_1.getMuiRadioThemeOverrides)()), (0, TextField_1.getMuiTextFieldThemeOverrides)()), (0, Button_1.getMuiButtonThemeOverrides)()), (0, ToggleButton_1.getMuiToggleButtonThemeOverrides)()), (0, ToggleButtonGroup_1.getMuiToggleButtonGroupThemeOverrides)()), (0, Link_1.getMuiLinkThemeOverrides)()), (0, Breadcrumbs_1.getMuiBreadcrumbsThemeOverrides)()), (0, CircularProgress_1.getMuiCircularProgressThemeOverrides)()), (0, Select_1.getMuiSelectThemeOverrides)()), (0, Autocomplete_1.getMuiAutocompleteThemeOverrides)()), (0, Switch_1.getMuiSwitchThemeOverrides)()), (0, Divider_1.getMuiDividerThemeOverrides)()), (0, Snackbar_1.getMuiSnackbarThemeOverrides)()), (0, IconButton_1.getMuiIconButtonThemeOverrides)()), (0, Paper_1.getMuiPaperThemeOverrides)()), (0, Avatar_1.getMuiAvatarThemeOverrides)()), (0, Tooltip_1.getMuiTooltipThemeOverrides)()), (0, Backdrop_1.getMuiBackdropThemeOverrides)()), (0, Dialog_1.getMuiDialogThemeOverrides)()), (0, Menu_1.getMuiMenuThemeOverrides)()), (0, MenuItem_1.getMuiMenuItemThemeOverrides)()), (0, FormControlLabel_1.getMuiFormControlLabelThemeOverrides)()), (0, Typography_1.getMuiTypographyThemeOverrides)()), (0, Alert_1.getMuiAlertThemeOverrides)()), (0, Pagination_1.getMuiTablePaginationThemeOverrides)()), (0, List_1.getMuiListThemeOverrides)()), (0, ListItem_1.getMuiListItemThemeOverrides)()), (0, ListItemAvatar_1.getMuiListItemAvatarThemeOverrides)()), (0, ListItemButton_1.getMuiListItemButtonThemeOverrides)()), (0, ListItemIcon_1.getMuiListItemIconThemeOverrides)()), (0, ListItemText_1.getMuiListItemTextThemeOverrides)()), (0, TreeView_1.getMuiTreeViewThemeOverrides)()),
    };
    return themeOptions;
};
const createEnchantedTheme = (direction, mode) => {
    const themeOptions = getThemeOptions(direction, mode);
    const enchantedTheme = (0, styles_1.createTheme)(themeOptions);
    return enchantedTheme;
};
exports.createEnchantedTheme = createEnchantedTheme;
/** @deprecated use the createEnchantedTheme method instead */
const createRtlTheme = () => {
    const themeOptions = getThemeOptions(ThemeDirectionType.RTL, ThemeModeType.LIGHT_NEUTRAL_GREY);
    const rtlTheme = (0, styles_1.createTheme)(themeOptions);
    return rtlTheme;
};
exports.createRtlTheme = createRtlTheme;
/** @deprecated use the createEnchantedTheme method instead */
const createLtrTheme = () => {
    const themeOptions = getThemeOptions(ThemeDirectionType.LTR, ThemeModeType.LIGHT_NEUTRAL_GREY);
    const ltrTheme = (0, styles_1.createTheme)(themeOptions);
    return ltrTheme;
};
exports.createLtrTheme = createLtrTheme;
