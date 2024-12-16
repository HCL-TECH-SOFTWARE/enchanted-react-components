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

import {
  Colors, ColorNames, blue, red, orange, green, neutralGrey, white, coolGrey, indigo, black, yellow, lime, teal, purple, pink, hclsoftwareblue,
} from '../../../colors';

describe('Colors', () => {
  it('Check color names', () => {
    // theme colors
    expect(ColorNames.PRIMARY_MAIN).toEqual('PrimaryMain');
    expect(ColorNames.PRIMARY_HOVER).toEqual('PrimaryHover');
    expect(ColorNames.PRIMARY_DARK_INVERSE).toEqual('PrimaryDarkInverse');
    expect(ColorNames.PRIMARY_INVERSE).toEqual('PrimaryInverse');
    expect(ColorNames.PRIMARY_INVERSE_HOVER).toEqual('PrimaryInverseHover');
    expect(ColorNames.ERROR_MAIN).toEqual('ErrorMain');
    expect(ColorNames.ERROR_HOVER).toEqual('ErrorHover');
    expect(ColorNames.ERROR_INVERSE).toEqual('ErrorInverse');
    expect(ColorNames.ERROR_INVERSE_HOVER).toEqual('ErrorInverseHover');
    expect(ColorNames.WARNING_MAIN).toEqual('WarningMain');
    expect(ColorNames.WARNING_HOVER).toEqual('WarningHover');
    expect(ColorNames.WARNING_INVERSE).toEqual('WarningInverse');
    expect(ColorNames.WARNING_INVERSE_HOVER).toEqual('WarningInverseHover');
    expect(ColorNames.INFO_MAIN).toEqual('InfoMain');
    expect(ColorNames.INFO_HOVER).toEqual('InfoHover');
    expect(ColorNames.INFO_INVERSE).toEqual('InfoInverse');
    expect(ColorNames.INFO_INVERSE_HOVER).toEqual('InfoInverseHover');
    expect(ColorNames.SUCCESS_MAIN).toEqual('SuccessMain');
    expect(ColorNames.SUCCESS_HOVER).toEqual('SuccessHover');
    expect(ColorNames.SUCCESS_INVERSE).toEqual('SuccessInverse');
    expect(ColorNames.SUCCESS_INVERSE_HOVER).toEqual('SuccessInverseHover');
    // text colors
    expect(ColorNames.NEUTRAL_TEXT_PRIMARY).toEqual('NeutralTextPrimary');
    expect(ColorNames.NEUTRAL_TEXT_SECONDARY).toEqual('NeutralTextSecondary');
    expect(ColorNames.NEUTRAL_TEXT_DISABLED).toEqual('NeutralTextDisabled');
    expect(ColorNames.NEUTRAL_TEXT_HINT).toEqual('NeutralTextHint');
    expect(ColorNames.NEUTRAL_TEXT_PRIMARY_INVERSE).toEqual('NeutralTextPrimaryInverse');
    expect(ColorNames.NEUTRAL_TEXT_SECONDARY_INVERSE).toEqual('NeutralTextSecondaryInverse');
    // backgrounds
    expect(ColorNames.INTERFACE_BG_LOW).toEqual('InterfaceBgLow');
    expect(ColorNames.INTERFACE_BG_MED).toEqual('InterfaceBgMed');
    expect(ColorNames.INTERFACE_BG_HIGH).toEqual('InterfaceBgHigh');
    expect(ColorNames.INTERFACE_BG_PAPER).toEqual('InterfaceBgPaper');
    expect(ColorNames.INTERFACE_BG_PAPER_INVERSE).toEqual('InterfaceBgPaperInverse');
    expect(ColorNames.INTERFACE_BG_OVERLAY).toEqual('InterfaceBgOverlay');
    expect(ColorNames.PRIMARY_BG).toEqual('PrimaryBg');
    expect(ColorNames.SUCCESS_BG).toEqual('SuccessBg');
    expect(ColorNames.ERROR_BG).toEqual('ErrorBg');
    expect(ColorNames.INFO_BG).toEqual('InfoBg');
    expect(ColorNames.WARNING_BG).toEqual('WarningBg');
    // borders
    expect(ColorNames.INTERFACE_BORDER_PRIMARY).toEqual('InterfaceBorderPrimary');
    expect(ColorNames.INTERFACE_BORDER_SECONDARY).toEqual('InterfaceBorderSecondary');
    expect(ColorNames.INTERFACE_BORDER_INVERSE_PRIMARY).toEqual('InterfaceBorderInversePrimary');
    expect(ColorNames.INTERFACE_BORDER_INVERSE_SECONDARY).toEqual('InterfaceBorderInverseSecondary');
    // actions
    expect(ColorNames.NEUTRAL_ICON).toEqual('NeutralIcon');
    expect(ColorNames.NEUTRAL_ICON_HOVER).toEqual('NeutralIconHover');
    expect(ColorNames.NEUTRAL_ICON_DISABLED).toEqual('NeutralIconDisabled');
    expect(ColorNames.NEUTRAL_ICON_INVERSE).toEqual('NeutralIconInverse');
    expect(ColorNames.NEUTRAL_BORDER_HOVER).toEqual('NeutralBorderHover');
    expect(ColorNames.NEUTRAL_BG).toEqual('NeutralBg');
    expect(ColorNames.NEUTRAL_BG_HOVER).toEqual('NeutralBgHover');
    expect(ColorNames.NEUTRAL_BG_INVERSE).toEqual('NeutralBgInverse');
    expect(ColorNames.NEUTRAL_BG_INVERSE_DISABLED).toEqual('NeutralBgInverseDisabled');
    expect(ColorNames.NEUTRAL_BG_INVERSE_HOVER).toEqual('NeutralBgInverseHover');
    // commons
    expect(ColorNames.WHITE).toEqual('WHITE100P');
    expect(ColorNames.BLACK).toEqual('BLACK100P');
    // grey
    expect(ColorNames.GREY50).toEqual('50');
    expect(ColorNames.GREY100).toEqual('100');
    expect(ColorNames.GREY200).toEqual('200');
    expect(ColorNames.GREY300).toEqual('300');
    expect(ColorNames.GREY400).toEqual('400');
    expect(ColorNames.GREY500).toEqual('500');
    expect(ColorNames.GREY600).toEqual('600');
    expect(ColorNames.GREY700).toEqual('700');
    expect(ColorNames.GREY800).toEqual('800');
    expect(ColorNames.GREY900).toEqual('900');
    expect(ColorNames.GREY1000).toEqual('1000');
    expect(ColorNames.GREYA100).toEqual('A100');
    expect(ColorNames.GREYA200).toEqual('A200');
    expect(ColorNames.GREYA400).toEqual('A400');
    expect(ColorNames.GREYA700).toEqual('A700');

    // nuetral
    expect(ColorNames.NEUTRALGREY100).toEqual('NG100');
    expect(ColorNames.NEUTRALGREY150).toEqual('NG150');
    expect(ColorNames.NEUTRALGREY200).toEqual('NG200');
    expect(ColorNames.NEUTRALGREY300).toEqual('NG300');
    expect(ColorNames.NEUTRALGREY400).toEqual('NG400');
    expect(ColorNames.NEUTRALGREY500).toEqual('NG500');
    expect(ColorNames.NEUTRALGREY600).toEqual('NG600');
    expect(ColorNames.NEUTRALGREY700).toEqual('NG700');
    expect(ColorNames.NEUTRALGREY800).toEqual('NG800');
    expect(ColorNames.NEUTRALGREY900).toEqual('NG900');
    expect(ColorNames.NEUTRALGREY900).toEqual('NG900');
    expect(ColorNames.NEUTRALGREY1000_80).toEqual('NG1000 (80P)');
    expect(ColorNames.NEUTRALGREY1100).toEqual('NG1100');

    // coolgrey
    expect(ColorNames.COOLGREY100).toEqual('CG100');
    expect(ColorNames.COOLGREY150).toEqual('CG150');
    expect(ColorNames.COOLGREY200).toEqual('CG200');
    expect(ColorNames.COOLGREY300).toEqual('CG300');
    expect(ColorNames.COOLGREY400).toEqual('CG400');
    expect(ColorNames.COOLGREY500).toEqual('CG500');
    expect(ColorNames.COOLGREY600).toEqual('CG600');
    expect(ColorNames.COOLGREY700).toEqual('CG700');
    expect(ColorNames.COOLGREY800).toEqual('CG800');
    expect(ColorNames.COOLGREY900).toEqual('CG900');
    expect(ColorNames.COOLGREY900).toEqual('CG900');
    expect(ColorNames.COOLGREY1000_80).toEqual('CG1000 (80P)');
    expect(ColorNames.COOLGREY1100).toEqual('CG1100');

    // red
    expect(ColorNames.RED100).toEqual('RED100');
    expect(ColorNames.RED200).toEqual('RED200');
    expect(ColorNames.RED300).toEqual('RED300');
    expect(ColorNames.RED400).toEqual('RED400');
    expect(ColorNames.RED500).toEqual('RED500');
    expect(ColorNames.RED600).toEqual('RED600');
    expect(ColorNames.RED700).toEqual('RED700');
    expect(ColorNames.RED800).toEqual('RED800');
    expect(ColorNames.RED900).toEqual('RED900');
    expect(ColorNames.RED1000).toEqual('RED1000');

    // orange
    expect(ColorNames.ORANGE100).toEqual('ORANGE100');
    expect(ColorNames.ORANGE200).toEqual('ORANGE200');
    expect(ColorNames.ORANGE300).toEqual('ORANGE300');
    expect(ColorNames.ORANGE400).toEqual('ORANGE400');
    expect(ColorNames.ORANGE500).toEqual('ORANGE500');
    expect(ColorNames.ORANGE600).toEqual('ORANGE600');
    expect(ColorNames.ORANGE700).toEqual('ORANGE700');
    expect(ColorNames.ORANGE800).toEqual('ORANGE800');
    expect(ColorNames.ORANGE900).toEqual('ORANGE900');
    expect(ColorNames.ORANGE1000).toEqual('ORANGE1000');

    // yellow
    expect(ColorNames.YELLOW100).toEqual('YELLOW100');
    expect(ColorNames.YELLOW200).toEqual('YELLOW200');
    expect(ColorNames.YELLOW300).toEqual('YELLOW300');
    expect(ColorNames.YELLOW400).toEqual('YELLOW400');
    expect(ColorNames.YELLOW500).toEqual('YELLOW500');
    expect(ColorNames.YELLOW600).toEqual('YELLOW600');
    expect(ColorNames.YELLOW700).toEqual('YELLOW700');
    expect(ColorNames.YELLOW800).toEqual('YELLOW800');
    expect(ColorNames.YELLOW900).toEqual('YELLOW900');
    expect(ColorNames.YELLOW1000).toEqual('YELLOW1000');

    // lime
    expect(ColorNames.LIME100).toEqual('LIME100');
    expect(ColorNames.LIME200).toEqual('LIME200');
    expect(ColorNames.LIME300).toEqual('LIME300');
    expect(ColorNames.LIME400).toEqual('LIME400');
    expect(ColorNames.LIME500).toEqual('LIME500');
    expect(ColorNames.LIME600).toEqual('LIME600');
    expect(ColorNames.LIME700).toEqual('LIME700');
    expect(ColorNames.LIME800).toEqual('LIME800');
    expect(ColorNames.LIME900).toEqual('LIME900');
    expect(ColorNames.LIME1000).toEqual('LIME1000');

    // green
    expect(ColorNames.GREEN100).toEqual('GREEN100');
    expect(ColorNames.GREEN200).toEqual('GREEN200');
    expect(ColorNames.GREEN300).toEqual('GREEN300');
    expect(ColorNames.GREEN400).toEqual('GREEN400');
    expect(ColorNames.GREEN500).toEqual('GREEN500');
    expect(ColorNames.GREEN600).toEqual('GREEN600');
    expect(ColorNames.GREEN700).toEqual('GREEN700');
    expect(ColorNames.GREEN800).toEqual('GREEN800');
    expect(ColorNames.GREEN900).toEqual('GREEN900');
    expect(ColorNames.GREEN1000).toEqual('GREEN1000');

    // teal
    expect(ColorNames.TEAL100).toEqual('TEAL100');
    expect(ColorNames.TEAL200).toEqual('TEAL200');
    expect(ColorNames.TEAL300).toEqual('TEAL300');
    expect(ColorNames.TEAL400).toEqual('TEAL400');
    expect(ColorNames.TEAL500).toEqual('TEAL500');
    expect(ColorNames.TEAL600).toEqual('TEAL600');
    expect(ColorNames.TEAL700).toEqual('TEAL700');
    expect(ColorNames.TEAL800).toEqual('TEAL800');
    expect(ColorNames.TEAL900).toEqual('TEAL900');
    expect(ColorNames.TEAL1000).toEqual('TEAL1000');

    // blue
    expect(ColorNames.BLUE100).toEqual('BLUE100');
    expect(ColorNames.BLUE200).toEqual('BLUE200');
    expect(ColorNames.BLUE300).toEqual('BLUE300');
    expect(ColorNames.BLUE400).toEqual('BLUE400');
    expect(ColorNames.BLUE500).toEqual('BLUE500');
    expect(ColorNames.BLUE600).toEqual('BLUE600');
    expect(ColorNames.BLUE700).toEqual('BLUE700');
    expect(ColorNames.BLUE800).toEqual('BLUE800');
    expect(ColorNames.BLUE900).toEqual('BLUE900');
    expect(ColorNames.BLUE1000).toEqual('BLUE1000');

    // indigo
    expect(ColorNames.INDIGO100).toEqual('INDIGO100');
    expect(ColorNames.INDIGO200).toEqual('INDIGO200');
    expect(ColorNames.INDIGO300).toEqual('INDIGO300');
    expect(ColorNames.INDIGO400).toEqual('INDIGO400');
    expect(ColorNames.INDIGO500).toEqual('INDIGO500');
    expect(ColorNames.INDIGO600).toEqual('INDIGO600');
    expect(ColorNames.INDIGO700).toEqual('INDIGO700');
    expect(ColorNames.INDIGO800).toEqual('INDIGO800');
    expect(ColorNames.INDIGO900).toEqual('INDIGO900');
    expect(ColorNames.INDIGO1000).toEqual('INDIGO1000');

    // purple
    expect(ColorNames.PURPLE100).toEqual('PURPLE100');
    expect(ColorNames.PURPLE200).toEqual('PURPLE200');
    expect(ColorNames.PURPLE300).toEqual('PURPLE300');
    expect(ColorNames.PURPLE400).toEqual('PURPLE400');
    expect(ColorNames.PURPLE500).toEqual('PURPLE500');
    expect(ColorNames.PURPLE600).toEqual('PURPLE600');
    expect(ColorNames.PURPLE700).toEqual('PURPLE700');
    expect(ColorNames.PURPLE800).toEqual('PURPLE800');
    expect(ColorNames.PURPLE900).toEqual('PURPLE900');
    expect(ColorNames.PURPLE1000).toEqual('PURPLE1000');

    // pink
    expect(ColorNames.PINK100).toEqual('PINK100');
    expect(ColorNames.PINK200).toEqual('PINK200');
    expect(ColorNames.PINK300).toEqual('PINK300');
    expect(ColorNames.PINK400).toEqual('PINK400');
    expect(ColorNames.PINK500).toEqual('PINK500');
    expect(ColorNames.PINK600).toEqual('PINK600');
    expect(ColorNames.PINK700).toEqual('PINK700');
    expect(ColorNames.PINK800).toEqual('PINK800');
    expect(ColorNames.PINK900).toEqual('PINK900');
    expect(ColorNames.PINK1000).toEqual('PINK1000');

    // black
    expect(ColorNames.BLACK).toEqual('BLACK100P');
    expect(ColorNames.BLACK100P).toEqual('BLACK100P');
    expect(ColorNames.BLACK87P).toEqual('BLACK87P');
    expect(ColorNames.BLACK60P).toEqual('BLACK60P');
    expect(ColorNames.BLACK55P).toEqual('BLACK55P');
    expect(ColorNames.BLACK38P).toEqual('BLACK38P');
    expect(ColorNames.BLACK32P).toEqual('BLACK32P');
    expect(ColorNames.BLACK20P).toEqual('BLACK20P');
    expect(ColorNames.BLACK15P).toEqual('BLACK15P');
    expect(ColorNames.BLACK12P).toEqual('BLACK12P');
    expect(ColorNames.BLACK8P).toEqual('BLACK8P');
    expect(ColorNames.BLACK7P).toEqual('BLACK7P');

    // white
    expect(ColorNames.WHITE).toEqual('WHITE100P');
    expect(ColorNames.WHITE100P).toEqual('WHITE100P');
    expect(ColorNames.WHITE93P).toEqual('WHITE93P');
    expect(ColorNames.WHITE80P).toEqual('WHITE80P');
    expect(ColorNames.WHITE70P).toEqual('WHITE70P');
    expect(ColorNames.WHITE55P).toEqual('WHITE55P');
    expect(ColorNames.WHITE40P).toEqual('WHITE40P');
    expect(ColorNames.WHITE38P).toEqual('WHITE38P');
    expect(ColorNames.WHITE24P).toEqual('WHITE24P');
    expect(ColorNames.WHITE15P).toEqual('WHITE15P');
    expect(ColorNames.WHITE12P).toEqual('WHITE12P');
    expect(ColorNames.WHITE8P).toEqual('WHITE8P');

    // white
    expect(ColorNames.HCLSOFTWAREBLUE01).toEqual('HCLSOFTWAREBLUE01');
    expect(ColorNames.HCLSOFTWAREBLUE02).toEqual('HCLSOFTWAREBLUE02');
    expect(ColorNames.HCLSOFTWAREBLUE03).toEqual('HCLSOFTWAREBLUE03');
    expect(ColorNames.HCLSOFTWAREBLUE04).toEqual('HCLSOFTWAREBLUE04');
    expect(ColorNames.HCLSOFTWAREBLUE05).toEqual('HCLSOFTWAREBLUE05');
    expect(ColorNames.HCLSOFTWAREBLUE06).toEqual('HCLSOFTWAREBLUE06');
    expect(ColorNames.HCLSOFTWAREBLUE07).toEqual('HCLSOFTWAREBLUE07');
    expect(ColorNames.HCLSOFTWAREBLUE07_12P).toEqual('HCLSOFTWAREBLUE07 (12P)');
    expect(ColorNames.HCLSOFTWAREBLUE07_8P).toEqual('HCLSOFTWAREBLUE07 (8P)');
    expect(ColorNames.HCLSOFTWAREBLUE07_20P).toEqual('HCLSOFTWAREBLUE07 (20P)');
    expect(ColorNames.HCLSOFTWAREBLUE08).toEqual('HCLSOFTWAREBLUE08');
    expect(ColorNames.HCLSOFTWAREBLUE09).toEqual('HCLSOFTWAREBLUE09');
    expect(ColorNames.HCLSOFTWAREBLUE09_12P).toEqual('HCLSOFTWAREBLUE09 (12P)');
    expect(ColorNames.HCLSOFTWAREBLUE09_8P).toEqual('HCLSOFTWAREBLUE09 (8P)');
  });
  it('Check color token', () => {
    // theme colors
    expect(Colors.get(ColorNames.PRIMARY_MAIN)).toEqual(blue.BLUE800);
    expect(Colors.get(ColorNames.PRIMARY_HOVER)).toEqual('#002B6C');
    expect(Colors.get(ColorNames.PRIMARY_DARK_INVERSE)).toEqual('#E6FFFF');
    expect(Colors.get(ColorNames.PRIMARY_INVERSE)).toEqual(blue.BLUE300);
    expect(Colors.get(ColorNames.PRIMARY_INVERSE_HOVER)).toEqual('#A7FFFF');
    expect(Colors.get(ColorNames.ERROR_MAIN)).toEqual(red.RED800);
    expect(Colors.get(ColorNames.ERROR_HOVER)).toEqual('#890000');
    expect(Colors.get(ColorNames.ERROR_INVERSE)).toEqual(red.RED300);
    expect(Colors.get(ColorNames.ERROR_INVERSE_HOVER)).toEqual('#FFDFDF');
    expect(Colors.get(ColorNames.WARNING_MAIN)).toEqual(orange.ORANGE800);
    expect(Colors.get(ColorNames.WARNING_HOVER)).toEqual('#780500');
    expect(Colors.get(ColorNames.WARNING_INVERSE)).toEqual(orange.ORANGE300);
    expect(Colors.get(ColorNames.WARNING_INVERSE_HOVER)).toEqual('#FFFA96');
    expect(Colors.get(ColorNames.INFO_MAIN)).toEqual(blue.BLUE800);
    expect(Colors.get(ColorNames.INFO_HOVER)).toEqual('#002B6C');
    expect(Colors.get(ColorNames.INFO_INVERSE)).toEqual(blue.BLUE300);
    expect(Colors.get(ColorNames.INFO_INVERSE_HOVER)).toEqual('#A7FFFF');
    expect(Colors.get(ColorNames.SUCCESS_MAIN)).toEqual(green.GREEN800);
    expect(Colors.get(ColorNames.SUCCESS_HOVER)).toEqual('#003816');
    expect(Colors.get(ColorNames.SUCCESS_INVERSE)).toEqual(green.GREEN300);
    expect(Colors.get(ColorNames.SUCCESS_INVERSE_HOVER)).toEqual('#7EFFB8');
    // text colors
    expect(Colors.get(ColorNames.NEUTRAL_TEXT_PRIMARY)).toEqual('rgba(0, 0, 0, 0.87)');
    expect(Colors.get(ColorNames.NEUTRAL_TEXT_SECONDARY)).toEqual('rgba(0, 0, 0, 0.60)');
    expect(Colors.get(ColorNames.NEUTRAL_TEXT_DISABLED)).toEqual('rgba(0, 0, 0, 0.38)');
    expect(Colors.get(ColorNames.NEUTRAL_TEXT_HINT)).toEqual('rgba(0, 0, 0, 0.60)');
    expect(Colors.get(ColorNames.NEUTRAL_TEXT_PRIMARY_INVERSE)).toEqual('rgba(255, 255, 255, 0.93)');
    expect(Colors.get(ColorNames.NEUTRAL_TEXT_SECONDARY_INVERSE)).toEqual('rgba(255, 255, 255, 0.70)');
    // backgrounds
    expect(Colors.get(ColorNames.INTERFACE_BG_LOW)).toEqual(neutralGrey.NG100);
    expect(Colors.get(ColorNames.INTERFACE_BG_MED)).toEqual(neutralGrey.NG150);
    expect(Colors.get(ColorNames.INTERFACE_BG_HIGH)).toEqual(neutralGrey.NG200);
    expect(Colors.get(ColorNames.INTERFACE_BG_PAPER)).toEqual(white.WHITE100P);
    expect(Colors.get(ColorNames.INTERFACE_BG_PAPER_INVERSE)).toEqual(coolGrey.CG1000);
    expect(Colors.get(ColorNames.INTERFACE_BG_OVERLAY)).toEqual('rgba(28, 38, 46, 0.8)');
    expect(Colors.get(ColorNames.PRIMARY_BG)).toEqual('rgba(1, 83, 155, 0.12)');
    expect(Colors.get(ColorNames.SUCCESS_BG)).toEqual(green.GREEN100);
    expect(Colors.get(ColorNames.ERROR_BG)).toEqual(red.RED100);
    expect(Colors.get(ColorNames.INFO_BG)).toEqual(indigo.INDIGO100);
    expect(Colors.get(ColorNames.WARNING_BG)).toEqual(orange.ORANGE100);
    // borders
    expect(Colors.get(ColorNames.INTERFACE_BORDER_PRIMARY)).toEqual('rgba(0, 0, 0, 0.32)');
    expect(Colors.get(ColorNames.INTERFACE_BORDER_SECONDARY)).toEqual('rgba(0, 0, 0, 0.20)');
    expect(Colors.get(ColorNames.INTERFACE_BORDER_INVERSE_PRIMARY)).toEqual('rgba(255,255,255, 0.55)');
    expect(Colors.get(ColorNames.INTERFACE_BORDER_INVERSE_SECONDARY)).toEqual('rgba(255,255,255,0.40)');
    // actions
    expect(Colors.get(ColorNames.NEUTRAL_ICON)).toEqual('rgba(0, 0, 0, 0.60)');
    expect(Colors.get(ColorNames.NEUTRAL_ICON_HOVER)).toEqual('rgba(0, 0, 0, 0.87)');
    expect(Colors.get(ColorNames.NEUTRAL_ICON_DISABLED)).toEqual('rgba(0, 0, 0, 0.38)');
    expect(Colors.get(ColorNames.NEUTRAL_ICON_INVERSE)).toEqual('rgba(255, 255, 255, 0.80)');
    expect(Colors.get(ColorNames.NEUTRAL_BORDER_HOVER)).toEqual('rgba(0, 0, 0, 0.55)');
    expect(Colors.get(ColorNames.NEUTRAL_BG)).toEqual('rgba(0, 0, 0, 0.60)');
    expect(Colors.get(ColorNames.NEUTRAL_BG_HOVER)).toEqual('rgba(0, 0, 0, 0.07)');
    expect(Colors.get(ColorNames.NEUTRAL_BG_INVERSE)).toEqual('rgba(255, 255, 255, 0.24)');
    expect(Colors.get(ColorNames.NEUTRAL_BG_INVERSE_DISABLED)).toEqual('rgba(255, 255, 255, 0.38)');
    expect(Colors.get(ColorNames.NEUTRAL_BG_INVERSE_HOVER)).toEqual('rgba(255, 255, 255, 0.15)');
    // commons
    expect(Colors.get(ColorNames.WHITE)).toEqual(white.WHITE100P);
    expect(Colors.get(ColorNames.BLACK)).toEqual(black.BLACK100P);
    // nuetral
    expect(Colors.get(ColorNames.NEUTRALGREY100)).toEqual(neutralGrey.NG100);
    expect(Colors.get(ColorNames.NEUTRALGREY150)).toEqual(neutralGrey.NG150);
    expect(Colors.get(ColorNames.NEUTRALGREY200)).toEqual(neutralGrey.NG200);
    expect(Colors.get(ColorNames.NEUTRALGREY300)).toEqual(neutralGrey.NG300);
    expect(Colors.get(ColorNames.NEUTRALGREY400)).toEqual(neutralGrey.NG400);
    expect(Colors.get(ColorNames.NEUTRALGREY500)).toEqual(neutralGrey.NG500);
    expect(Colors.get(ColorNames.NEUTRALGREY600)).toEqual(neutralGrey.NG600);
    expect(Colors.get(ColorNames.NEUTRALGREY700)).toEqual(neutralGrey.NG700);
    expect(Colors.get(ColorNames.NEUTRALGREY800)).toEqual(neutralGrey.NG800);
    expect(Colors.get(ColorNames.NEUTRALGREY900)).toEqual(neutralGrey.NG900);
    expect(Colors.get(ColorNames.NEUTRALGREY900)).toEqual(neutralGrey.NG900);
    expect(Colors.get(ColorNames.NEUTRALGREY1000_80)).toEqual(neutralGrey.NG1000_80);
    expect(Colors.get(ColorNames.NEUTRALGREY1100)).toEqual(neutralGrey.NG1100);

    // coolgrey
    expect(Colors.get(ColorNames.COOLGREY100)).toEqual(coolGrey.CG100);
    expect(Colors.get(ColorNames.COOLGREY150)).toEqual(coolGrey.CG150);
    expect(Colors.get(ColorNames.COOLGREY200)).toEqual(coolGrey.CG200);
    expect(Colors.get(ColorNames.COOLGREY300)).toEqual(coolGrey.CG300);
    expect(Colors.get(ColorNames.COOLGREY400)).toEqual(coolGrey.CG400);
    expect(Colors.get(ColorNames.COOLGREY500)).toEqual(coolGrey.CG500);
    expect(Colors.get(ColorNames.COOLGREY600)).toEqual(coolGrey.CG600);
    expect(Colors.get(ColorNames.COOLGREY700)).toEqual(coolGrey.CG700);
    expect(Colors.get(ColorNames.COOLGREY800)).toEqual(coolGrey.CG800);
    expect(Colors.get(ColorNames.COOLGREY900)).toEqual(coolGrey.CG900);
    expect(Colors.get(ColorNames.COOLGREY900)).toEqual(coolGrey.CG900);
    expect(Colors.get(ColorNames.COOLGREY1000_80)).toEqual(coolGrey.CG1000_80);
    expect(Colors.get(ColorNames.COOLGREY1100)).toEqual(coolGrey.CG1100);

    // red
    expect(Colors.get(ColorNames.RED100)).toEqual(red.RED100);
    expect(Colors.get(ColorNames.RED200)).toEqual(red.RED200);
    expect(Colors.get(ColorNames.RED300)).toEqual(red.RED300);
    expect(Colors.get(ColorNames.RED400)).toEqual(red.RED400);
    expect(Colors.get(ColorNames.RED500)).toEqual(red.RED500);
    expect(Colors.get(ColorNames.RED600)).toEqual(red.RED600);
    expect(Colors.get(ColorNames.RED700)).toEqual(red.RED700);
    expect(Colors.get(ColorNames.RED800)).toEqual(red.RED800);
    expect(Colors.get(ColorNames.RED900)).toEqual(red.RED900);
    expect(Colors.get(ColorNames.RED1000)).toEqual(red.RED1000);

    // orange
    expect(Colors.get(ColorNames.ORANGE100)).toEqual(orange.ORANGE100);
    expect(Colors.get(ColorNames.ORANGE200)).toEqual(orange.ORANGE200);
    expect(Colors.get(ColorNames.ORANGE300)).toEqual(orange.ORANGE300);
    expect(Colors.get(ColorNames.ORANGE400)).toEqual(orange.ORANGE400);
    expect(Colors.get(ColorNames.ORANGE500)).toEqual(orange.ORANGE500);
    expect(Colors.get(ColorNames.ORANGE600)).toEqual(orange.ORANGE600);
    expect(Colors.get(ColorNames.ORANGE700)).toEqual(orange.ORANGE700);
    expect(Colors.get(ColorNames.ORANGE800)).toEqual(orange.ORANGE800);
    expect(Colors.get(ColorNames.ORANGE900)).toEqual(orange.ORANGE900);
    expect(Colors.get(ColorNames.ORANGE1000)).toEqual(orange.ORANGE1000);

    // yellow
    expect(Colors.get(ColorNames.YELLOW100)).toEqual(yellow.YELLOW100);
    expect(Colors.get(ColorNames.YELLOW200)).toEqual(yellow.YELLOW200);
    expect(Colors.get(ColorNames.YELLOW300)).toEqual(yellow.YELLOW300);
    expect(Colors.get(ColorNames.YELLOW400)).toEqual(yellow.YELLOW400);
    expect(Colors.get(ColorNames.YELLOW500)).toEqual(yellow.YELLOW500);
    expect(Colors.get(ColorNames.YELLOW600)).toEqual(yellow.YELLOW600);
    expect(Colors.get(ColorNames.YELLOW700)).toEqual(yellow.YELLOW700);
    expect(Colors.get(ColorNames.YELLOW800)).toEqual(yellow.YELLOW800);
    expect(Colors.get(ColorNames.YELLOW900)).toEqual(yellow.YELLOW900);
    expect(Colors.get(ColorNames.YELLOW1000)).toEqual(yellow.YELLOW1000);

    // lime
    expect(Colors.get(ColorNames.LIME100)).toEqual(lime.LIME100);
    expect(Colors.get(ColorNames.LIME200)).toEqual(lime.LIME200);
    expect(Colors.get(ColorNames.LIME300)).toEqual(lime.LIME300);
    expect(Colors.get(ColorNames.LIME400)).toEqual(lime.LIME400);
    expect(Colors.get(ColorNames.LIME500)).toEqual(lime.LIME500);
    expect(Colors.get(ColorNames.LIME600)).toEqual(lime.LIME600);
    expect(Colors.get(ColorNames.LIME700)).toEqual(lime.LIME700);
    expect(Colors.get(ColorNames.LIME800)).toEqual(lime.LIME800);
    expect(Colors.get(ColorNames.LIME900)).toEqual(lime.LIME900);
    expect(Colors.get(ColorNames.LIME1000)).toEqual(lime.LIME1000);

    // green
    expect(Colors.get(ColorNames.GREEN100)).toEqual(green.GREEN100);
    expect(Colors.get(ColorNames.GREEN200)).toEqual(green.GREEN200);
    expect(Colors.get(ColorNames.GREEN300)).toEqual(green.GREEN300);
    expect(Colors.get(ColorNames.GREEN400)).toEqual(green.GREEN400);
    expect(Colors.get(ColorNames.GREEN500)).toEqual(green.GREEN500);
    expect(Colors.get(ColorNames.GREEN600)).toEqual(green.GREEN600);
    expect(Colors.get(ColorNames.GREEN700)).toEqual(green.GREEN700);
    expect(Colors.get(ColorNames.GREEN800)).toEqual(green.GREEN800);
    expect(Colors.get(ColorNames.GREEN900)).toEqual(green.GREEN900);
    expect(Colors.get(ColorNames.GREEN1000)).toEqual(green.GREEN1000);

    // teal
    expect(Colors.get(ColorNames.TEAL100)).toEqual(teal.TEAL100);
    expect(Colors.get(ColorNames.TEAL200)).toEqual(teal.TEAL200);
    expect(Colors.get(ColorNames.TEAL300)).toEqual(teal.TEAL300);
    expect(Colors.get(ColorNames.TEAL400)).toEqual(teal.TEAL400);
    expect(Colors.get(ColorNames.TEAL500)).toEqual(teal.TEAL500);
    expect(Colors.get(ColorNames.TEAL600)).toEqual(teal.TEAL600);
    expect(Colors.get(ColorNames.TEAL700)).toEqual(teal.TEAL700);
    expect(Colors.get(ColorNames.TEAL800)).toEqual(teal.TEAL800);
    expect(Colors.get(ColorNames.TEAL900)).toEqual(teal.TEAL900);
    expect(Colors.get(ColorNames.TEAL1000)).toEqual(teal.TEAL1000);

    // blue
    expect(Colors.get(ColorNames.BLUE100)).toEqual(blue.BLUE100);
    expect(Colors.get(ColorNames.BLUE200)).toEqual(blue.BLUE200);
    expect(Colors.get(ColorNames.BLUE300)).toEqual(blue.BLUE300);
    expect(Colors.get(ColorNames.BLUE400)).toEqual(blue.BLUE400);
    expect(Colors.get(ColorNames.BLUE500)).toEqual(blue.BLUE500);
    expect(Colors.get(ColorNames.BLUE600)).toEqual(blue.BLUE600);
    expect(Colors.get(ColorNames.BLUE700)).toEqual(blue.BLUE700);
    expect(Colors.get(ColorNames.BLUE800)).toEqual(blue.BLUE800);
    expect(Colors.get(ColorNames.BLUE900)).toEqual(blue.BLUE900);
    expect(Colors.get(ColorNames.BLUE1000)).toEqual(blue.BLUE1000);

    // indigo
    expect(Colors.get(ColorNames.INDIGO100)).toEqual(indigo.INDIGO100);
    expect(Colors.get(ColorNames.INDIGO200)).toEqual(indigo.INDIGO200);
    expect(Colors.get(ColorNames.INDIGO300)).toEqual(indigo.INDIGO300);
    expect(Colors.get(ColorNames.INDIGO400)).toEqual(indigo.INDIGO400);
    expect(Colors.get(ColorNames.INDIGO500)).toEqual(indigo.INDIGO500);
    expect(Colors.get(ColorNames.INDIGO600)).toEqual(indigo.INDIGO600);
    expect(Colors.get(ColorNames.INDIGO700)).toEqual(indigo.INDIGO700);
    expect(Colors.get(ColorNames.INDIGO800)).toEqual(indigo.INDIGO800);
    expect(Colors.get(ColorNames.INDIGO900)).toEqual(indigo.INDIGO900);
    expect(Colors.get(ColorNames.INDIGO1000)).toEqual(indigo.INDIGO1000);

    // purple
    expect(Colors.get(ColorNames.PURPLE100)).toEqual(purple.PURPLE100);
    expect(Colors.get(ColorNames.PURPLE200)).toEqual(purple.PURPLE200);
    expect(Colors.get(ColorNames.PURPLE300)).toEqual(purple.PURPLE300);
    expect(Colors.get(ColorNames.PURPLE400)).toEqual(purple.PURPLE400);
    expect(Colors.get(ColorNames.PURPLE500)).toEqual(purple.PURPLE500);
    expect(Colors.get(ColorNames.PURPLE600)).toEqual(purple.PURPLE600);
    expect(Colors.get(ColorNames.PURPLE700)).toEqual(purple.PURPLE700);
    expect(Colors.get(ColorNames.PURPLE800)).toEqual(purple.PURPLE800);
    expect(Colors.get(ColorNames.PURPLE900)).toEqual(purple.PURPLE900);
    expect(Colors.get(ColorNames.PURPLE1000)).toEqual(purple.PURPLE1000);

    // pink
    expect(Colors.get(ColorNames.PINK100)).toEqual(pink.PINK100);
    expect(Colors.get(ColorNames.PINK200)).toEqual(pink.PINK200);
    expect(Colors.get(ColorNames.PINK300)).toEqual(pink.PINK300);
    expect(Colors.get(ColorNames.PINK400)).toEqual(pink.PINK400);
    expect(Colors.get(ColorNames.PINK500)).toEqual(pink.PINK500);
    expect(Colors.get(ColorNames.PINK600)).toEqual(pink.PINK600);
    expect(Colors.get(ColorNames.PINK700)).toEqual(pink.PINK700);
    expect(Colors.get(ColorNames.PINK800)).toEqual(pink.PINK800);
    expect(Colors.get(ColorNames.PINK900)).toEqual(pink.PINK900);
    expect(Colors.get(ColorNames.PINK1000)).toEqual(pink.PINK1000);

    // black
    expect(Colors.get(ColorNames.BLACK)).toEqual(black.BLACK100P);
    expect(Colors.get(ColorNames.BLACK100P)).toEqual(black.BLACK100P);
    expect(Colors.get(ColorNames.BLACK87P)).toEqual(black.BLACK87P);
    expect(Colors.get(ColorNames.BLACK60P)).toEqual(black.BLACK60P);
    expect(Colors.get(ColorNames.BLACK55P)).toEqual(black.BLACK55P);
    expect(Colors.get(ColorNames.BLACK38P)).toEqual(black.BLACK38P);
    expect(Colors.get(ColorNames.BLACK32P)).toEqual(black.BLACK32P);
    expect(Colors.get(ColorNames.BLACK20P)).toEqual(black.BLACK20P);
    expect(Colors.get(ColorNames.BLACK15P)).toEqual(black.BLACK15P);
    expect(Colors.get(ColorNames.BLACK12P)).toEqual(black.BLACK12P);
    expect(Colors.get(ColorNames.BLACK8P)).toEqual(black.BLACK8P);
    expect(Colors.get(ColorNames.BLACK7P)).toEqual(black.BLACK7P);

    // white
    expect(Colors.get(ColorNames.WHITE)).toEqual(white.WHITE100P);
    expect(Colors.get(ColorNames.WHITE100P)).toEqual(white.WHITE100P);
    expect(Colors.get(ColorNames.WHITE93P)).toEqual(white.WHITE93P);
    expect(Colors.get(ColorNames.WHITE80P)).toEqual(white.WHITE80P);
    expect(Colors.get(ColorNames.WHITE70P)).toEqual(white.WHITE70P);
    expect(Colors.get(ColorNames.WHITE55P)).toEqual(white.WHITE55P);
    expect(Colors.get(ColorNames.WHITE40P)).toEqual(white.WHITE40P);
    expect(Colors.get(ColorNames.WHITE38P)).toEqual(white.WHITE38P);
    expect(Colors.get(ColorNames.WHITE24P)).toEqual(white.WHITE24P);
    expect(Colors.get(ColorNames.WHITE15P)).toEqual(white.WHITE15P);
    expect(Colors.get(ColorNames.WHITE12P)).toEqual(white.WHITE12P);
    expect(Colors.get(ColorNames.WHITE8P)).toEqual(white.WHITE8P);

    // hclsoftwareblue
    expect(Colors.get(ColorNames.HCLSOFTWAREBLUE01)).toEqual(hclsoftwareblue.HCLSOFTWAREBLUE01);
    expect(Colors.get(ColorNames.HCLSOFTWAREBLUE02)).toEqual(hclsoftwareblue.HCLSOFTWAREBLUE02);
    expect(Colors.get(ColorNames.HCLSOFTWAREBLUE03)).toEqual(hclsoftwareblue.HCLSOFTWAREBLUE03);
    expect(Colors.get(ColorNames.HCLSOFTWAREBLUE04)).toEqual(hclsoftwareblue.HCLSOFTWAREBLUE04);
    expect(Colors.get(ColorNames.HCLSOFTWAREBLUE05)).toEqual(hclsoftwareblue.HCLSOFTWAREBLUE05);
    expect(Colors.get(ColorNames.HCLSOFTWAREBLUE06)).toEqual(hclsoftwareblue.HCLSOFTWAREBLUE06);
    expect(Colors.get(ColorNames.HCLSOFTWAREBLUE07)).toEqual(hclsoftwareblue.HCLSOFTWAREBLUE07);
    expect(Colors.get(ColorNames.HCLSOFTWAREBLUE07_12P)).toEqual(hclsoftwareblue.HCLSOFTWAREBLUE07_12);
    expect(Colors.get(ColorNames.HCLSOFTWAREBLUE07_8P)).toEqual(hclsoftwareblue.HCLSOFTWAREBLUE07_8);
    expect(Colors.get(ColorNames.HCLSOFTWAREBLUE08)).toEqual(hclsoftwareblue.HCLSOFTWAREBLUE08);
    expect(Colors.get(ColorNames.HCLSOFTWAREBLUE09)).toEqual(hclsoftwareblue.HCLSOFTWAREBLUE09);
    expect(Colors.get(ColorNames.HCLSOFTWAREBLUE09_12P)).toEqual(hclsoftwareblue.HCLSOFTWAREBLUE09_12);
    expect(Colors.get(ColorNames.HCLSOFTWAREBLUE09_8P)).toEqual(hclsoftwareblue.HCLSOFTWAREBLUE09_8);
  });
});
