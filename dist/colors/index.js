"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Colors = exports.ColorNames = exports.hclsoftwareblue = exports.white = exports.black = exports.neutralGrey = exports.coolGrey = exports.pink = exports.purple = exports.indigo = exports.blue = exports.teal = exports.green = exports.lime = exports.yellow = exports.orange = exports.red = exports.UNKNOWN_COLOR_CODE = void 0;
const blue_1 = __importDefault(require("./blue"));
const red_1 = __importDefault(require("./red"));
const orange_1 = __importDefault(require("./orange"));
const green_1 = __importDefault(require("./green"));
const neutralGrey_1 = __importDefault(require("./neutralGrey"));
const coolGrey_1 = __importDefault(require("./coolGrey"));
const indigo_1 = __importDefault(require("./indigo"));
const white_1 = __importDefault(require("./white"));
const black_1 = __importDefault(require("./black"));
const yellow_1 = __importDefault(require("./yellow"));
const lime_1 = __importDefault(require("./lime"));
const teal_1 = __importDefault(require("./teal"));
const purple_1 = __importDefault(require("./purple"));
const pink_1 = __importDefault(require("./pink"));
const hclsoftwareblue_1 = __importDefault(require("./hclsoftwareblue"));
exports.UNKNOWN_COLOR_CODE = '#FFB400';
var red_2 = require("./red");
Object.defineProperty(exports, "red", { enumerable: true, get: function () { return __importDefault(red_2).default; } });
var orange_2 = require("./orange");
Object.defineProperty(exports, "orange", { enumerable: true, get: function () { return __importDefault(orange_2).default; } });
var yellow_2 = require("./yellow");
Object.defineProperty(exports, "yellow", { enumerable: true, get: function () { return __importDefault(yellow_2).default; } });
var lime_2 = require("./lime");
Object.defineProperty(exports, "lime", { enumerable: true, get: function () { return __importDefault(lime_2).default; } });
var green_2 = require("./green");
Object.defineProperty(exports, "green", { enumerable: true, get: function () { return __importDefault(green_2).default; } });
var teal_2 = require("./teal");
Object.defineProperty(exports, "teal", { enumerable: true, get: function () { return __importDefault(teal_2).default; } });
var blue_2 = require("./blue");
Object.defineProperty(exports, "blue", { enumerable: true, get: function () { return __importDefault(blue_2).default; } });
var indigo_2 = require("./indigo");
Object.defineProperty(exports, "indigo", { enumerable: true, get: function () { return __importDefault(indigo_2).default; } });
var purple_2 = require("./purple");
Object.defineProperty(exports, "purple", { enumerable: true, get: function () { return __importDefault(purple_2).default; } });
var pink_2 = require("./pink");
Object.defineProperty(exports, "pink", { enumerable: true, get: function () { return __importDefault(pink_2).default; } });
var coolGrey_2 = require("./coolGrey");
Object.defineProperty(exports, "coolGrey", { enumerable: true, get: function () { return __importDefault(coolGrey_2).default; } });
var neutralGrey_2 = require("./neutralGrey");
Object.defineProperty(exports, "neutralGrey", { enumerable: true, get: function () { return __importDefault(neutralGrey_2).default; } });
var black_2 = require("./black");
Object.defineProperty(exports, "black", { enumerable: true, get: function () { return __importDefault(black_2).default; } });
var white_2 = require("./white");
Object.defineProperty(exports, "white", { enumerable: true, get: function () { return __importDefault(white_2).default; } });
var hclsoftwareblue_2 = require("./hclsoftwareblue");
Object.defineProperty(exports, "hclsoftwareblue", { enumerable: true, get: function () { return __importDefault(hclsoftwareblue_2).default; } });
var ColorNames;
(function (ColorNames) {
    // theme colors
    ColorNames["PRIMARY_MAIN"] = "PrimaryMain";
    ColorNames["PRIMARY_DARK"] = "PrimaryDark";
    ColorNames["PRIMARY_DARK_INVERSE"] = "PrimaryDarkInverse";
    ColorNames["PRIMARY_HOVER"] = "PrimaryHover";
    ColorNames["PRIMARY_INVERSE"] = "PrimaryInverse";
    ColorNames["PRIMARY_INVERSE_HOVER"] = "PrimaryInverseHover";
    ColorNames["ERROR_MAIN"] = "ErrorMain";
    ColorNames["ERROR_HOVER"] = "ErrorHover";
    ColorNames["ERROR_INVERSE"] = "ErrorInverse";
    ColorNames["ERROR_INVERSE_HOVER"] = "ErrorInverseHover";
    ColorNames["WARNING_MAIN"] = "WarningMain";
    ColorNames["WARNING_HOVER"] = "WarningHover";
    ColorNames["WARNING_INVERSE"] = "WarningInverse";
    ColorNames["WARNING_INVERSE_HOVER"] = "WarningInverseHover";
    ColorNames["INFO_MAIN"] = "InfoMain";
    ColorNames["INFO_HOVER"] = "InfoHover";
    ColorNames["INFO_INVERSE"] = "InfoInverse";
    ColorNames["INFO_INVERSE_HOVER"] = "InfoInverseHover";
    ColorNames["SUCCESS_MAIN"] = "SuccessMain";
    ColorNames["SUCCESS_HOVER"] = "SuccessHover";
    ColorNames["SUCCESS_INVERSE"] = "SuccessInverse";
    ColorNames["SUCCESS_INVERSE_HOVER"] = "SuccessInverseHover";
    // text colors
    ColorNames["NEUTRAL_TEXT_PRIMARY"] = "NeutralTextPrimary";
    ColorNames["NEUTRAL_TEXT_SECONDARY"] = "NeutralTextSecondary";
    ColorNames["NEUTRAL_TEXT_DISABLED"] = "NeutralTextDisabled";
    ColorNames["NEUTRAL_TEXT_HINT"] = "NeutralTextHint";
    ColorNames["NEUTRAL_TEXT_PRIMARY_INVERSE"] = "NeutralTextPrimaryInverse";
    ColorNames["NEUTRAL_TEXT_SECONDARY_INVERSE"] = "NeutralTextSecondaryInverse";
    // backgrounds
    ColorNames["INTERFACE_BG_LOW"] = "InterfaceBgLow";
    ColorNames["INTERFACE_BG_MED"] = "InterfaceBgMed";
    ColorNames["INTERFACE_BG_HIGH"] = "InterfaceBgHigh";
    ColorNames["INTERFACE_BG_PAPER"] = "InterfaceBgPaper";
    ColorNames["INTERFACE_BG_PAPER_INVERSE"] = "InterfaceBgPaperInverse";
    ColorNames["INTERFACE_BG_OVERLAY"] = "InterfaceBgOverlay";
    ColorNames["PRIMARY_BG"] = "PrimaryBg";
    ColorNames["SUCCESS_BG"] = "SuccessBg";
    ColorNames["ERROR_BG"] = "ErrorBg";
    ColorNames["INFO_BG"] = "InfoBg";
    ColorNames["WARNING_BG"] = "WarningBg";
    // borders
    ColorNames["INTERFACE_BORDER_PRIMARY"] = "InterfaceBorderPrimary";
    ColorNames["INTERFACE_BORDER_SECONDARY"] = "InterfaceBorderSecondary";
    ColorNames["INTERFACE_BORDER_INVERSE_PRIMARY"] = "InterfaceBorderInversePrimary";
    ColorNames["INTERFACE_BORDER_INVERSE_SECONDARY"] = "InterfaceBorderInverseSecondary";
    // actions
    ColorNames["NEUTRAL_ICON"] = "NeutralIcon";
    ColorNames["NEUTRAL_ICON_HOVER"] = "NeutralIconHover";
    ColorNames["NEUTRAL_ICON_DISABLED"] = "NeutralIconDisabled";
    ColorNames["NEUTRAL_ICON_INVERSE"] = "NeutralIconInverse";
    ColorNames["NEUTRAL_BORDER_HOVER"] = "NeutralBorderHover";
    ColorNames["NEUTRAL_BG"] = "NeutralBg";
    ColorNames["NEUTRAL_BG_HOVER"] = "NeutralBgHover";
    ColorNames["NEUTRAL_BG_INVERSE"] = "NeutralBgInverse";
    ColorNames["NEUTRAL_BG_INVERSE_DISABLED"] = "NeutralBgInverseDisabled";
    ColorNames["NEUTRAL_BG_INVERSE_HOVER"] = "NeutralBgInverseHover";
    ColorNames["NEUTRAL_ACTIVE_OPACITY"] = "NeutralActiveOpacity";
    ColorNames["SELECTED_OPACITY"] = "SelectedOpacity";
    ColorNames["DISABLED_OPACITY"] = "DisabledOpacity";
    // commons
    ColorNames["WHITE"] = "WHITE100P";
    ColorNames["BLACK"] = "BLACK100P";
    // grey
    ColorNames["GREY50"] = "50";
    ColorNames["GREY100"] = "100";
    ColorNames["GREY150"] = "150";
    ColorNames["GREY200"] = "200";
    ColorNames["GREY300"] = "300";
    ColorNames["GREY400"] = "400";
    ColorNames["GREY500"] = "500";
    ColorNames["GREY600"] = "600";
    ColorNames["GREY700"] = "700";
    ColorNames["GREY800"] = "800";
    ColorNames["GREY900"] = "900";
    ColorNames["GREY1000"] = "1000";
    ColorNames["GREYA100"] = "A100";
    ColorNames["GREYA200"] = "A200";
    ColorNames["GREYA400"] = "A400";
    ColorNames["GREYA700"] = "A700";
    // neutralgrey
    ColorNames["NEUTRALGREY100"] = "NG100";
    ColorNames["NEUTRALGREY150"] = "NG150";
    ColorNames["NEUTRALGREY200"] = "NG200";
    ColorNames["NEUTRALGREY300"] = "NG300";
    ColorNames["NEUTRALGREY400"] = "NG400";
    ColorNames["NEUTRALGREY500"] = "NG500";
    ColorNames["NEUTRALGREY600"] = "NG600";
    ColorNames["NEUTRALGREY700"] = "NG700";
    ColorNames["NEUTRALGREY800"] = "NG800";
    ColorNames["NEUTRALGREY900"] = "NG900";
    ColorNames["NEUTRALGREY1000"] = "NG1000";
    ColorNames["NEUTRALGREY1000_80"] = "NG1000 (80P)";
    ColorNames["NEUTRALGREY1100"] = "NG1100";
    // coolgrey
    ColorNames["COOLGREY100"] = "CG100";
    ColorNames["COOLGREY150"] = "CG150";
    ColorNames["COOLGREY200"] = "CG200";
    ColorNames["COOLGREY300"] = "CG300";
    ColorNames["COOLGREY400"] = "CG400";
    ColorNames["COOLGREY500"] = "CG500";
    ColorNames["COOLGREY600"] = "CG600";
    ColorNames["COOLGREY700"] = "CG700";
    ColorNames["COOLGREY800"] = "CG800";
    ColorNames["COOLGREY900"] = "CG900";
    ColorNames["COOLGREY1000"] = "CG1000";
    ColorNames["COOLGREY1000_80"] = "CG1000 (80P)";
    ColorNames["COOLGREY1100"] = "CG1100";
    // red
    ColorNames["RED100"] = "RED100";
    ColorNames["RED200"] = "RED200";
    ColorNames["RED300"] = "RED300";
    ColorNames["RED400"] = "RED400";
    ColorNames["RED500"] = "RED500";
    ColorNames["RED600"] = "RED600";
    ColorNames["RED700"] = "RED700";
    ColorNames["RED800"] = "RED800";
    ColorNames["RED900"] = "RED900";
    ColorNames["RED1000"] = "RED1000";
    // orange
    ColorNames["ORANGE100"] = "ORANGE100";
    ColorNames["ORANGE200"] = "ORANGE200";
    ColorNames["ORANGE300"] = "ORANGE300";
    ColorNames["ORANGE400"] = "ORANGE400";
    ColorNames["ORANGE500"] = "ORANGE500";
    ColorNames["ORANGE600"] = "ORANGE600";
    ColorNames["ORANGE700"] = "ORANGE700";
    ColorNames["ORANGE800"] = "ORANGE800";
    ColorNames["ORANGE900"] = "ORANGE900";
    ColorNames["ORANGE1000"] = "ORANGE1000";
    // yellow
    ColorNames["YELLOW100"] = "YELLOW100";
    ColorNames["YELLOW200"] = "YELLOW200";
    ColorNames["YELLOW300"] = "YELLOW300";
    ColorNames["YELLOW400"] = "YELLOW400";
    ColorNames["YELLOW500"] = "YELLOW500";
    ColorNames["YELLOW600"] = "YELLOW600";
    ColorNames["YELLOW700"] = "YELLOW700";
    ColorNames["YELLOW800"] = "YELLOW800";
    ColorNames["YELLOW900"] = "YELLOW900";
    ColorNames["YELLOW1000"] = "YELLOW1000";
    // lime
    ColorNames["LIME100"] = "LIME100";
    ColorNames["LIME200"] = "LIME200";
    ColorNames["LIME300"] = "LIME300";
    ColorNames["LIME400"] = "LIME400";
    ColorNames["LIME500"] = "LIME500";
    ColorNames["LIME600"] = "LIME600";
    ColorNames["LIME700"] = "LIME700";
    ColorNames["LIME800"] = "LIME800";
    ColorNames["LIME900"] = "LIME900";
    ColorNames["LIME1000"] = "LIME1000";
    // green
    ColorNames["GREEN100"] = "GREEN100";
    ColorNames["GREEN200"] = "GREEN200";
    ColorNames["GREEN300"] = "GREEN300";
    ColorNames["GREEN400"] = "GREEN400";
    ColorNames["GREEN500"] = "GREEN500";
    ColorNames["GREEN600"] = "GREEN600";
    ColorNames["GREEN700"] = "GREEN700";
    ColorNames["GREEN800"] = "GREEN800";
    ColorNames["GREEN900"] = "GREEN900";
    ColorNames["GREEN1000"] = "GREEN1000";
    // teal
    ColorNames["TEAL100"] = "TEAL100";
    ColorNames["TEAL200"] = "TEAL200";
    ColorNames["TEAL300"] = "TEAL300";
    ColorNames["TEAL400"] = "TEAL400";
    ColorNames["TEAL500"] = "TEAL500";
    ColorNames["TEAL600"] = "TEAL600";
    ColorNames["TEAL700"] = "TEAL700";
    ColorNames["TEAL800"] = "TEAL800";
    ColorNames["TEAL900"] = "TEAL900";
    ColorNames["TEAL1000"] = "TEAL1000";
    // blue
    ColorNames["BLUE100"] = "BLUE100";
    ColorNames["BLUE200"] = "BLUE200";
    ColorNames["BLUE300"] = "BLUE300";
    ColorNames["BLUE400"] = "BLUE400";
    ColorNames["BLUE500"] = "BLUE500";
    ColorNames["BLUE600"] = "BLUE600";
    ColorNames["BLUE700"] = "BLUE700";
    ColorNames["BLUE800"] = "BLUE800";
    ColorNames["BLUE900"] = "BLUE900";
    ColorNames["BLUE1000"] = "BLUE1000";
    // indigo
    ColorNames["INDIGO100"] = "INDIGO100";
    ColorNames["INDIGO200"] = "INDIGO200";
    ColorNames["INDIGO300"] = "INDIGO300";
    ColorNames["INDIGO400"] = "INDIGO400";
    ColorNames["INDIGO500"] = "INDIGO500";
    ColorNames["INDIGO600"] = "INDIGO600";
    ColorNames["INDIGO700"] = "INDIGO700";
    ColorNames["INDIGO800"] = "INDIGO800";
    ColorNames["INDIGO900"] = "INDIGO900";
    ColorNames["INDIGO1000"] = "INDIGO1000";
    // purple
    ColorNames["PURPLE100"] = "PURPLE100";
    ColorNames["PURPLE200"] = "PURPLE200";
    ColorNames["PURPLE300"] = "PURPLE300";
    ColorNames["PURPLE400"] = "PURPLE400";
    ColorNames["PURPLE500"] = "PURPLE500";
    ColorNames["PURPLE600"] = "PURPLE600";
    ColorNames["PURPLE700"] = "PURPLE700";
    ColorNames["PURPLE800"] = "PURPLE800";
    ColorNames["PURPLE900"] = "PURPLE900";
    ColorNames["PURPLE1000"] = "PURPLE1000";
    // pink
    ColorNames["PINK100"] = "PINK100";
    ColorNames["PINK200"] = "PINK200";
    ColorNames["PINK300"] = "PINK300";
    ColorNames["PINK400"] = "PINK400";
    ColorNames["PINK500"] = "PINK500";
    ColorNames["PINK600"] = "PINK600";
    ColorNames["PINK700"] = "PINK700";
    ColorNames["PINK800"] = "PINK800";
    ColorNames["PINK900"] = "PINK900";
    ColorNames["PINK1000"] = "PINK1000";
    // black
    ColorNames["BLACK100P"] = "BLACK100P";
    ColorNames["BLACK87P"] = "BLACK87P";
    ColorNames["BLACK60P"] = "BLACK60P";
    ColorNames["BLACK55P"] = "BLACK55P";
    ColorNames["BLACK43P"] = "BLACK43P";
    ColorNames["BLACK38P"] = "BLACK38P";
    ColorNames["BLACK32P"] = "BLACK32P";
    ColorNames["BLACK20P"] = "BLACK20P";
    ColorNames["BLACK15P"] = "BLACK15P";
    ColorNames["BLACK12P"] = "BLACK12P";
    ColorNames["BLACK8P"] = "BLACK8P";
    ColorNames["BLACK7P"] = "BLACK7P";
    // white
    ColorNames["WHITE100P"] = "WHITE100P";
    ColorNames["WHITE93P"] = "WHITE93P";
    ColorNames["WHITE80P"] = "WHITE80P";
    ColorNames["WHITE70P"] = "WHITE70P";
    ColorNames["WHITE55P"] = "WHITE55P";
    ColorNames["WHITE40P"] = "WHITE40P";
    ColorNames["WHITE38P"] = "WHITE38P";
    ColorNames["WHITE24P"] = "WHITE24P";
    ColorNames["WHITE15P"] = "WHITE15P";
    ColorNames["WHITE12P"] = "WHITE12P";
    ColorNames["WHITE8P"] = "WHITE8P";
    // hclsoftwareblue
    ColorNames["HCLSOFTWAREBLUE01"] = "HCLSOFTWAREBLUE01";
    ColorNames["HCLSOFTWAREBLUE02"] = "HCLSOFTWAREBLUE02";
    ColorNames["HCLSOFTWAREBLUE03"] = "HCLSOFTWAREBLUE03";
    ColorNames["HCLSOFTWAREBLUE04"] = "HCLSOFTWAREBLUE04";
    ColorNames["HCLSOFTWAREBLUE05"] = "HCLSOFTWAREBLUE05";
    ColorNames["HCLSOFTWAREBLUE06"] = "HCLSOFTWAREBLUE06";
    ColorNames["HCLSOFTWAREBLUE07"] = "HCLSOFTWAREBLUE07";
    ColorNames["HCLSOFTWAREBLUE07_12P"] = "HCLSOFTWAREBLUE07 (12P)";
    ColorNames["HCLSOFTWAREBLUE07_8P"] = "HCLSOFTWAREBLUE07 (8P)";
    ColorNames["HCLSOFTWAREBLUE07_20P"] = "HCLSOFTWAREBLUE07 (20P)";
    ColorNames["HCLSOFTWAREBLUE08"] = "HCLSOFTWAREBLUE08";
    ColorNames["HCLSOFTWAREBLUE09"] = "HCLSOFTWAREBLUE09";
    ColorNames["HCLSOFTWAREBLUE09_12P"] = "HCLSOFTWAREBLUE09 (12P)";
    ColorNames["HCLSOFTWAREBLUE09_8P"] = "HCLSOFTWAREBLUE09 (8P)";
})(ColorNames = exports.ColorNames || (exports.ColorNames = {}));
exports.Colors = new Map([
    // theme colors
    [ColorNames.PRIMARY_MAIN, blue_1.default.BLUE800],
    [ColorNames.PRIMARY_DARK, '#0029A9'],
    [ColorNames.PRIMARY_DARK_INVERSE, '#E6FFFF'],
    [ColorNames.PRIMARY_HOVER, '#002B6C'],
    [ColorNames.PRIMARY_INVERSE, blue_1.default.BLUE300],
    [ColorNames.PRIMARY_INVERSE_HOVER, '#A7FFFF'],
    [ColorNames.ERROR_MAIN, red_1.default.RED800],
    [ColorNames.ERROR_HOVER, '#890000'],
    [ColorNames.ERROR_INVERSE, red_1.default.RED300],
    [ColorNames.ERROR_INVERSE_HOVER, '#FFDFDF'],
    [ColorNames.WARNING_MAIN, orange_1.default.ORANGE800],
    [ColorNames.WARNING_HOVER, '#780500'],
    [ColorNames.WARNING_INVERSE, orange_1.default.ORANGE300],
    [ColorNames.WARNING_INVERSE_HOVER, '#FFFA96'],
    [ColorNames.INFO_MAIN, blue_1.default.BLUE800],
    [ColorNames.INFO_HOVER, '#002B6C'],
    [ColorNames.INFO_INVERSE, blue_1.default.BLUE300],
    [ColorNames.INFO_INVERSE_HOVER, '#A7FFFF'],
    [ColorNames.SUCCESS_MAIN, green_1.default.GREEN800],
    [ColorNames.SUCCESS_HOVER, '#003816'],
    [ColorNames.SUCCESS_INVERSE, green_1.default.GREEN300],
    [ColorNames.SUCCESS_INVERSE_HOVER, '#7EFFB8'],
    // text colors
    [ColorNames.NEUTRAL_TEXT_PRIMARY, 'rgba(0, 0, 0, 0.87)'],
    [ColorNames.NEUTRAL_TEXT_SECONDARY, 'rgba(0, 0, 0, 0.60)'],
    [ColorNames.NEUTRAL_TEXT_DISABLED, 'rgba(0, 0, 0, 0.38)'],
    [ColorNames.NEUTRAL_TEXT_HINT, 'rgba(0, 0, 0, 0.60)'],
    [ColorNames.NEUTRAL_TEXT_PRIMARY_INVERSE, 'rgba(255, 255, 255, 0.93)'],
    [ColorNames.NEUTRAL_TEXT_SECONDARY_INVERSE, 'rgba(255, 255, 255, 0.70)'],
    // backgrounds
    [ColorNames.INTERFACE_BG_LOW, neutralGrey_1.default.NG100],
    [ColorNames.INTERFACE_BG_MED, neutralGrey_1.default.NG150],
    [ColorNames.INTERFACE_BG_HIGH, neutralGrey_1.default.NG200],
    [ColorNames.INTERFACE_BG_PAPER, white_1.default.WHITE100P],
    [ColorNames.INTERFACE_BG_PAPER_INVERSE, coolGrey_1.default.CG1000],
    [ColorNames.INTERFACE_BG_OVERLAY, 'rgba(28, 38, 46, 0.8)'],
    [ColorNames.PRIMARY_BG, 'rgba(1, 83, 155, 0.12)'],
    [ColorNames.SUCCESS_BG, green_1.default.GREEN100],
    [ColorNames.ERROR_BG, red_1.default.RED100],
    [ColorNames.INFO_BG, indigo_1.default.INDIGO100],
    [ColorNames.WARNING_BG, orange_1.default.ORANGE100],
    // borders
    [ColorNames.INTERFACE_BORDER_PRIMARY, 'rgba(0, 0, 0, 0.32)'],
    [ColorNames.INTERFACE_BORDER_SECONDARY, 'rgba(0, 0, 0, 0.20)'],
    [ColorNames.INTERFACE_BORDER_INVERSE_PRIMARY, 'rgba(255,255,255, 0.55)'],
    [ColorNames.INTERFACE_BORDER_INVERSE_SECONDARY, 'rgba(255,255,255,0.40)'],
    // actions
    [ColorNames.NEUTRAL_ICON, 'rgba(0, 0, 0, 0.60)'],
    [ColorNames.NEUTRAL_ICON_HOVER, 'rgba(0, 0, 0, 0.87)'],
    [ColorNames.NEUTRAL_ICON_DISABLED, 'rgba(0, 0, 0, 0.38)'],
    [ColorNames.NEUTRAL_ICON_INVERSE, 'rgba(255, 255, 255, 0.80)'],
    [ColorNames.NEUTRAL_BORDER_HOVER, 'rgba(0, 0, 0, 0.55)'],
    [ColorNames.NEUTRAL_BG, 'rgba(0, 0, 0, 0.60)'],
    [ColorNames.NEUTRAL_BG_HOVER, 'rgba(0, 0, 0, 0.07)'],
    [ColorNames.NEUTRAL_ACTIVE_OPACITY, 'rgba(0, 0, 0, 0.12)'],
    [ColorNames.NEUTRAL_BG_INVERSE, 'rgba(255, 255, 255, 0.24)'],
    [ColorNames.NEUTRAL_BG_INVERSE_DISABLED, 'rgba(255, 255, 255, 0.38)'],
    [ColorNames.NEUTRAL_BG_INVERSE_HOVER, 'rgba(255, 255, 255, 0.15)'],
    [ColorNames.SELECTED_OPACITY, 'rgba(1, 83, 155, 0.08)'],
    [ColorNames.DISABLED_OPACITY, 'rgba(0, 0, 0, 0.08)'],
    // common
    [ColorNames.WHITE, white_1.default.WHITE100P],
    [ColorNames.BLACK, black_1.default.BLACK100P],
    // nuetralgrey
    [ColorNames.NEUTRALGREY100, neutralGrey_1.default.NG100],
    [ColorNames.NEUTRALGREY150, neutralGrey_1.default.NG150],
    [ColorNames.NEUTRALGREY200, neutralGrey_1.default.NG200],
    [ColorNames.NEUTRALGREY300, neutralGrey_1.default.NG300],
    [ColorNames.NEUTRALGREY400, neutralGrey_1.default.NG400],
    [ColorNames.NEUTRALGREY500, neutralGrey_1.default.NG500],
    [ColorNames.NEUTRALGREY600, neutralGrey_1.default.NG600],
    [ColorNames.NEUTRALGREY700, neutralGrey_1.default.NG700],
    [ColorNames.NEUTRALGREY800, neutralGrey_1.default.NG800],
    [ColorNames.NEUTRALGREY900, neutralGrey_1.default.NG900],
    [ColorNames.NEUTRALGREY1000, neutralGrey_1.default.NG1000],
    [ColorNames.NEUTRALGREY1000_80, neutralGrey_1.default.NG1000_80],
    [ColorNames.NEUTRALGREY1100, neutralGrey_1.default.NG1100],
    // coolgray
    [ColorNames.COOLGREY100, coolGrey_1.default.CG100],
    [ColorNames.COOLGREY150, coolGrey_1.default.CG150],
    [ColorNames.COOLGREY200, coolGrey_1.default.CG200],
    [ColorNames.COOLGREY300, coolGrey_1.default.CG300],
    [ColorNames.COOLGREY400, coolGrey_1.default.CG400],
    [ColorNames.COOLGREY500, coolGrey_1.default.CG500],
    [ColorNames.COOLGREY600, coolGrey_1.default.CG600],
    [ColorNames.COOLGREY700, coolGrey_1.default.CG700],
    [ColorNames.COOLGREY800, coolGrey_1.default.CG800],
    [ColorNames.COOLGREY900, coolGrey_1.default.CG900],
    [ColorNames.COOLGREY1000, coolGrey_1.default.CG1000],
    [ColorNames.COOLGREY1000_80, coolGrey_1.default.CG1000_80],
    [ColorNames.COOLGREY1100, coolGrey_1.default.CG1100],
    // red
    [ColorNames.RED100, red_1.default.RED100],
    [ColorNames.RED200, red_1.default.RED200],
    [ColorNames.RED300, red_1.default.RED300],
    [ColorNames.RED400, red_1.default.RED400],
    [ColorNames.RED500, red_1.default.RED500],
    [ColorNames.RED600, red_1.default.RED600],
    [ColorNames.RED700, red_1.default.RED700],
    [ColorNames.RED800, red_1.default.RED800],
    [ColorNames.RED900, red_1.default.RED900],
    [ColorNames.RED1000, red_1.default.RED1000],
    // orange
    [ColorNames.ORANGE100, orange_1.default.ORANGE100],
    [ColorNames.ORANGE200, orange_1.default.ORANGE200],
    [ColorNames.ORANGE300, orange_1.default.ORANGE300],
    [ColorNames.ORANGE400, orange_1.default.ORANGE400],
    [ColorNames.ORANGE500, orange_1.default.ORANGE500],
    [ColorNames.ORANGE600, orange_1.default.ORANGE600],
    [ColorNames.ORANGE700, orange_1.default.ORANGE700],
    [ColorNames.ORANGE800, orange_1.default.ORANGE800],
    [ColorNames.ORANGE900, orange_1.default.ORANGE900],
    [ColorNames.ORANGE1000, orange_1.default.ORANGE1000],
    // yellow
    [ColorNames.YELLOW100, yellow_1.default.YELLOW100],
    [ColorNames.YELLOW200, yellow_1.default.YELLOW200],
    [ColorNames.YELLOW300, yellow_1.default.YELLOW300],
    [ColorNames.YELLOW400, yellow_1.default.YELLOW400],
    [ColorNames.YELLOW500, yellow_1.default.YELLOW500],
    [ColorNames.YELLOW600, yellow_1.default.YELLOW600],
    [ColorNames.YELLOW700, yellow_1.default.YELLOW700],
    [ColorNames.YELLOW800, yellow_1.default.YELLOW800],
    [ColorNames.YELLOW900, yellow_1.default.YELLOW900],
    [ColorNames.YELLOW1000, yellow_1.default.YELLOW1000],
    // lime
    [ColorNames.LIME100, lime_1.default.LIME100],
    [ColorNames.LIME200, lime_1.default.LIME200],
    [ColorNames.LIME300, lime_1.default.LIME300],
    [ColorNames.LIME400, lime_1.default.LIME400],
    [ColorNames.LIME500, lime_1.default.LIME500],
    [ColorNames.LIME600, lime_1.default.LIME600],
    [ColorNames.LIME700, lime_1.default.LIME700],
    [ColorNames.LIME800, lime_1.default.LIME800],
    [ColorNames.LIME900, lime_1.default.LIME900],
    [ColorNames.LIME1000, lime_1.default.LIME1000],
    // green
    [ColorNames.GREEN100, green_1.default.GREEN100],
    [ColorNames.GREEN200, green_1.default.GREEN200],
    [ColorNames.GREEN300, green_1.default.GREEN300],
    [ColorNames.GREEN400, green_1.default.GREEN400],
    [ColorNames.GREEN500, green_1.default.GREEN500],
    [ColorNames.GREEN600, green_1.default.GREEN600],
    [ColorNames.GREEN700, green_1.default.GREEN700],
    [ColorNames.GREEN800, green_1.default.GREEN800],
    [ColorNames.GREEN900, green_1.default.GREEN900],
    [ColorNames.GREEN1000, green_1.default.GREEN1000],
    // teal
    [ColorNames.TEAL100, teal_1.default.TEAL100],
    [ColorNames.TEAL200, teal_1.default.TEAL200],
    [ColorNames.TEAL300, teal_1.default.TEAL300],
    [ColorNames.TEAL400, teal_1.default.TEAL400],
    [ColorNames.TEAL500, teal_1.default.TEAL500],
    [ColorNames.TEAL600, teal_1.default.TEAL600],
    [ColorNames.TEAL700, teal_1.default.TEAL700],
    [ColorNames.TEAL800, teal_1.default.TEAL800],
    [ColorNames.TEAL900, teal_1.default.TEAL900],
    [ColorNames.TEAL1000, teal_1.default.TEAL1000],
    // blue
    [ColorNames.BLUE100, blue_1.default.BLUE100],
    [ColorNames.BLUE200, blue_1.default.BLUE200],
    [ColorNames.BLUE300, blue_1.default.BLUE300],
    [ColorNames.BLUE400, blue_1.default.BLUE400],
    [ColorNames.BLUE500, blue_1.default.BLUE500],
    [ColorNames.BLUE600, blue_1.default.BLUE600],
    [ColorNames.BLUE700, blue_1.default.BLUE700],
    [ColorNames.BLUE800, blue_1.default.BLUE800],
    [ColorNames.BLUE900, blue_1.default.BLUE900],
    [ColorNames.BLUE1000, blue_1.default.BLUE1000],
    // indigo
    [ColorNames.INDIGO100, indigo_1.default.INDIGO100],
    [ColorNames.INDIGO200, indigo_1.default.INDIGO200],
    [ColorNames.INDIGO300, indigo_1.default.INDIGO300],
    [ColorNames.INDIGO400, indigo_1.default.INDIGO400],
    [ColorNames.INDIGO500, indigo_1.default.INDIGO500],
    [ColorNames.INDIGO600, indigo_1.default.INDIGO600],
    [ColorNames.INDIGO700, indigo_1.default.INDIGO700],
    [ColorNames.INDIGO800, indigo_1.default.INDIGO800],
    [ColorNames.INDIGO900, indigo_1.default.INDIGO900],
    [ColorNames.INDIGO1000, indigo_1.default.INDIGO1000],
    // purple
    [ColorNames.PURPLE100, purple_1.default.PURPLE100],
    [ColorNames.PURPLE200, purple_1.default.PURPLE200],
    [ColorNames.PURPLE300, purple_1.default.PURPLE300],
    [ColorNames.PURPLE400, purple_1.default.PURPLE400],
    [ColorNames.PURPLE500, purple_1.default.PURPLE500],
    [ColorNames.PURPLE600, purple_1.default.PURPLE600],
    [ColorNames.PURPLE700, purple_1.default.PURPLE700],
    [ColorNames.PURPLE800, purple_1.default.PURPLE800],
    [ColorNames.PURPLE900, purple_1.default.PURPLE900],
    [ColorNames.PURPLE1000, purple_1.default.PURPLE1000],
    // pink
    [ColorNames.PINK100, pink_1.default.PINK100],
    [ColorNames.PINK200, pink_1.default.PINK200],
    [ColorNames.PINK300, pink_1.default.PINK300],
    [ColorNames.PINK400, pink_1.default.PINK400],
    [ColorNames.PINK500, pink_1.default.PINK500],
    [ColorNames.PINK600, pink_1.default.PINK600],
    [ColorNames.PINK700, pink_1.default.PINK700],
    [ColorNames.PINK800, pink_1.default.PINK800],
    [ColorNames.PINK900, pink_1.default.PINK900],
    [ColorNames.PINK1000, pink_1.default.PINK1000],
    // black
    [ColorNames.BLACK100P, black_1.default.BLACK100P],
    [ColorNames.BLACK87P, black_1.default.BLACK87P],
    [ColorNames.BLACK60P, black_1.default.BLACK60P],
    [ColorNames.BLACK55P, black_1.default.BLACK55P],
    [ColorNames.BLACK43P, black_1.default.BLACK43P],
    [ColorNames.BLACK38P, black_1.default.BLACK38P],
    [ColorNames.BLACK32P, black_1.default.BLACK32P],
    [ColorNames.BLACK20P, black_1.default.BLACK20P],
    [ColorNames.BLACK15P, black_1.default.BLACK15P],
    [ColorNames.BLACK12P, black_1.default.BLACK12P],
    [ColorNames.BLACK8P, black_1.default.BLACK8P],
    [ColorNames.BLACK7P, black_1.default.BLACK7P],
    // white
    [ColorNames.WHITE100P, white_1.default.WHITE100P],
    [ColorNames.WHITE93P, white_1.default.WHITE93P],
    [ColorNames.WHITE80P, white_1.default.WHITE80P],
    [ColorNames.WHITE70P, white_1.default.WHITE70P],
    [ColorNames.WHITE55P, white_1.default.WHITE55P],
    [ColorNames.WHITE40P, white_1.default.WHITE40P],
    [ColorNames.WHITE38P, white_1.default.WHITE38P],
    [ColorNames.WHITE24P, white_1.default.WHITE24P],
    [ColorNames.WHITE15P, white_1.default.WHITE15P],
    [ColorNames.WHITE12P, white_1.default.WHITE12P],
    [ColorNames.WHITE8P, white_1.default.WHITE8P],
    // hclsoftwareblue
    [ColorNames.HCLSOFTWAREBLUE01, hclsoftwareblue_1.default.HCLSOFTWAREBLUE01],
    [ColorNames.HCLSOFTWAREBLUE02, hclsoftwareblue_1.default.HCLSOFTWAREBLUE02],
    [ColorNames.HCLSOFTWAREBLUE03, hclsoftwareblue_1.default.HCLSOFTWAREBLUE03],
    [ColorNames.HCLSOFTWAREBLUE04, hclsoftwareblue_1.default.HCLSOFTWAREBLUE04],
    [ColorNames.HCLSOFTWAREBLUE05, hclsoftwareblue_1.default.HCLSOFTWAREBLUE05],
    [ColorNames.HCLSOFTWAREBLUE06, hclsoftwareblue_1.default.HCLSOFTWAREBLUE06],
    [ColorNames.HCLSOFTWAREBLUE07, hclsoftwareblue_1.default.HCLSOFTWAREBLUE07],
    [ColorNames.HCLSOFTWAREBLUE07_12P, hclsoftwareblue_1.default.HCLSOFTWAREBLUE07_12],
    [ColorNames.HCLSOFTWAREBLUE07_8P, hclsoftwareblue_1.default.HCLSOFTWAREBLUE07_8],
    [ColorNames.HCLSOFTWAREBLUE07_20P, hclsoftwareblue_1.default.HCLSOFTWAREBLUE07_20],
    [ColorNames.HCLSOFTWAREBLUE08, hclsoftwareblue_1.default.HCLSOFTWAREBLUE08],
    [ColorNames.HCLSOFTWAREBLUE09, hclsoftwareblue_1.default.HCLSOFTWAREBLUE09],
    [ColorNames.HCLSOFTWAREBLUE09_12P, hclsoftwareblue_1.default.HCLSOFTWAREBLUE09_12],
    [ColorNames.HCLSOFTWAREBLUE09_8P, hclsoftwareblue_1.default.HCLSOFTWAREBLUE09_8],
]);
