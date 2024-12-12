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

import { ColorPartial } from '@mui/material/styles/createPalette';
import blue from './blue';
import red from './red';
import orange from './orange';
import green from './green';
import neutralGrey from './neutralGrey';
import coolGrey from './coolGrey';
import indigo from './indigo';
import white from './white';
import black from './black';
import yellow from './yellow';
import lime from './lime';
import teal from './teal';
import purple from './purple';
import pink from './pink';
import hclsoftwareblue from './hclsoftwareblue';

export const UNKNOWN_COLOR_CODE: string = '#FFB400';
// We just extended the color interface from material-ui-core and add new properties
export interface ColorType extends ColorPartial {
  150?: string; // some color has shade of 150 or 15
  1000?: string;
  1100?: string; // some color has shade of 1100 or 110
  1000_80?: string;
  87?: string;
  60?: string;
  55?: string;
  38?: string;
  32?: string;
  20?: string;
  12?: string;
  8?: string;
  7?: string;
  93?: string;
  80?: string;
  70?: string;
  40?: string;
  24?: string;
  15?: string;
  1?: string;
  2?: string;
  3?: string;
  4?: string;
  5?: string;
  6?: string;
  7_12?: string;
  7_8?: string;
  9?: string;
  9_12?: string;
  9_8?: string;
  'NG100'?: string;
  'NG150'?: string;
  'NG200'?: string;
  'NG300'?: string;
  'NG400'?: string;
  'NG500'?: string;
  'NG600'?: string;
  'NG700'?: string;
  'NG800'?: string;
  'NG900'?: string;
  'NG1000'?: string;
  'NG1000_80'?: string;
  'NG1100'?: string;
  'CG100'?: string;
  'CG150'?: string;
  'CG200'?: string;
  'CG300'?: string;
  'CG400'?: string;
  'CG500'?: string;
  'CG600'?: string;
  'CG700'?: string;
  'CG800'?: string;
  'CG900'?: string;
  'CG1000'?: string;
  'CG1000_80'?: string;
  'CG1100'?: string;
  'RED100'?: string;
  'RED200'?: string;
  'RED300'?: string;
  'RED400'?: string;
  'RED500'?: string;
  'RED600'?: string;
  'RED700'?: string;
  'RED800'?: string;
  'RED900'?: string;
  'RED1000'?: string;
  'ORANGE100'?: string;
  'ORANGE200'?: string;
  'ORANGE300'?: string;
  'ORANGE400'?: string;
  'ORANGE500'?: string;
  'ORANGE600'?: string;
  'ORANGE700'?: string;
  'ORANGE800'?: string;
  'ORANGE900'?: string;
  'ORANGE1000'?: string;
  'YELLOW100'?: string;
  'YELLOW200'?: string;
  'YELLOW300'?: string;
  'YELLOW400'?: string;
  'YELLOW500'?: string;
  'YELLOW600'?: string;
  'YELLOW700'?: string;
  'YELLOW800'?: string;
  'YELLOW900'?: string;
  'YELLOW1000'?: string;
  'LIME100'?: string;
  'LIME200'?: string;
  'LIME300'?: string;
  'LIME400'?: string;
  'LIME500'?: string;
  'LIME600'?: string;
  'LIME700'?: string;
  'LIME800'?: string;
  'LIME900'?: string;
  'LIME1000'?: string;
  'GREEN100'?: string;
  'GREEN200'?: string;
  'GREEN300'?: string;
  'GREEN400'?: string;
  'GREEN500'?: string;
  'GREEN600'?: string;
  'GREEN700'?: string;
  'GREEN800'?: string;
  'GREEN900'?: string;
  'GREEN1000'?: string;
  'TEAL100'?: string;
  'TEAL200'?: string;
  'TEAL300'?: string;
  'TEAL400'?: string;
  'TEAL500'?: string;
  'TEAL600'?: string;
  'TEAL700'?: string;
  'TEAL800'?: string;
  'TEAL900'?: string;
  'TEAL1000'?: string;
  'BLUE100'?: string;
  'BLUE200'?: string;
  'BLUE300'?: string;
  'BLUE400'?: string;
  'BLUE500'?: string;
  'BLUE600'?: string;
  'BLUE700'?: string;
  'BLUE800'?: string;
  'BLUE900'?: string;
  'BLUE1000'?: string;
  'INDIGO100'?: string;
  'INDIGO200'?: string;
  'INDIGO300'?: string;
  'INDIGO400'?: string;
  'INDIGO500'?: string;
  'INDIGO600'?: string;
  'INDIGO700'?: string;
  'INDIGO800'?: string;
  'INDIGO900'?: string;
  'INDIGO1000'?: string;
  'PURPLE100'?: string;
  'PURPLE200'?: string;
  'PURPLE300'?: string;
  'PURPLE400'?: string;
  'PURPLE500'?: string;
  'PURPLE600'?: string;
  'PURPLE700'?: string;
  'PURPLE800'?: string;
  'PURPLE900'?: string;
  'PURPLE1000'?: string;
  'PINK100'?: string;
  'PINK200'?: string;
  'PINK300'?: string;
  'PINK400'?: string;
  'PINK500'?: string;
  'PINK600'?: string;
  'PINK700'?: string;
  'PINK800'?: string;
  'PINK900'?: string;
  'PINK1000'?: string;
  'BLACK100P'?: string;
  'BLACK87P'?: string;
  'BLACK60P'?: string;
  'BLACK55P'?: string;
  'BLACK43P'?: string;
  'BLACK38P'?: string;
  'BLACK32P'?: string;
  'BLACK20P'?: string;
  'BLACK15P'?: string;
  'BLACK12P'?: string;
  'BLACK8P'?: string;
  'BLACK7P'?: string;
  'WHITE100P'?: string;
  'WHITE93P'?: string;
  'WHITE80P'?: string;
  'WHITE70P'?: string;
  'WHITE55P'?: string;
  'WHITE40P'?: string;
  'WHITE38P'?: string;
  'WHITE24P'?: string;
  'WHITE15P'?: string;
  'WHITE12P'?: string;
  'WHITE8P'?: string;
  'HCLSOFTWAREBLUE01'?: string;
  'HCLSOFTWAREBLUE02'?: string;
  'HCLSOFTWAREBLUE03'?: string;
  'HCLSOFTWAREBLUE04'?: string;
  'HCLSOFTWAREBLUE05'?: string;
  'HCLSOFTWAREBLUE06'?: string;
  'HCLSOFTWAREBLUE07'?: string;
  'HCLSOFTWAREBLUE07_12'?: string;
  'HCLSOFTWAREBLUE07_8'?: string;
  'HCLSOFTWAREBLUE07_20'?: string;
  'HCLSOFTWAREBLUE08'?: string;
  'HCLSOFTWAREBLUE09'?: string;
  'HCLSOFTWAREBLUE09_12'?: string;
  'HCLSOFTWAREBLUE09_8'?: string;

}

export { default as red } from './red';
export { default as orange } from './orange';
export { default as yellow } from './yellow';
export { default as lime } from './lime';
export { default as green } from './green';
export { default as teal } from './teal';
export { default as blue } from './blue';
export { default as indigo } from './indigo';
export { default as purple } from './purple';
export { default as pink } from './pink';
export { default as coolGrey } from './coolGrey';
export { default as neutralGrey } from './neutralGrey';
export { default as black } from './black';
export { default as white } from './white';
export { default as hclsoftwareblue } from './hclsoftwareblue';

export enum ColorNames {
  // theme colors
  PRIMARY_MAIN = 'PrimaryMain',
  PRIMARY_DARK = 'PrimaryDark',
  PRIMARY_DARK_INVERSE = 'PrimaryDarkInverse',
  PRIMARY_HOVER = 'PrimaryHover',
  PRIMARY_INVERSE = 'PrimaryInverse',
  PRIMARY_INVERSE_HOVER = 'PrimaryInverseHover',
  ERROR_MAIN = 'ErrorMain',
  ERROR_HOVER = 'ErrorHover',
  ERROR_INVERSE = 'ErrorInverse',
  ERROR_INVERSE_HOVER = 'ErrorInverseHover',
  WARNING_MAIN = 'WarningMain',
  WARNING_HOVER = 'WarningHover',
  WARNING_INVERSE = 'WarningInverse',
  WARNING_INVERSE_HOVER = 'WarningInverseHover',
  INFO_MAIN = 'InfoMain',
  INFO_HOVER = 'InfoHover',
  INFO_INVERSE = 'InfoInverse',
  INFO_INVERSE_HOVER = 'InfoInverseHover',
  SUCCESS_MAIN = 'SuccessMain',
  SUCCESS_HOVER = 'SuccessHover',
  SUCCESS_INVERSE = 'SuccessInverse',
  SUCCESS_INVERSE_HOVER = 'SuccessInverseHover',
  // text colors
  NEUTRAL_TEXT_PRIMARY = 'NeutralTextPrimary',
  NEUTRAL_TEXT_SECONDARY = 'NeutralTextSecondary',
  NEUTRAL_TEXT_DISABLED = 'NeutralTextDisabled',
  NEUTRAL_TEXT_HINT = 'NeutralTextHint',
  NEUTRAL_TEXT_PRIMARY_INVERSE = 'NeutralTextPrimaryInverse',
  NEUTRAL_TEXT_SECONDARY_INVERSE = 'NeutralTextSecondaryInverse',
  // backgrounds
  INTERFACE_BG_LOW = 'InterfaceBgLow',
  INTERFACE_BG_MED = 'InterfaceBgMed',
  INTERFACE_BG_HIGH = 'InterfaceBgHigh',
  INTERFACE_BG_PAPER = 'InterfaceBgPaper',
  INTERFACE_BG_PAPER_INVERSE = 'InterfaceBgPaperInverse',
  INTERFACE_BG_OVERLAY = 'InterfaceBgOverlay',
  PRIMARY_BG = 'PrimaryBg',
  SUCCESS_BG = 'SuccessBg',
  ERROR_BG = 'ErrorBg',
  INFO_BG = 'InfoBg',
  WARNING_BG = 'WarningBg',
  // borders
  INTERFACE_BORDER_PRIMARY = 'InterfaceBorderPrimary',
  INTERFACE_BORDER_SECONDARY = 'InterfaceBorderSecondary',
  INTERFACE_BORDER_INVERSE_PRIMARY = 'InterfaceBorderInversePrimary',
  INTERFACE_BORDER_INVERSE_SECONDARY = 'InterfaceBorderInverseSecondary',
  // actions
  NEUTRAL_ICON = 'NeutralIcon',
  NEUTRAL_ICON_HOVER = 'NeutralIconHover',
  NEUTRAL_ICON_DISABLED = 'NeutralIconDisabled',
  NEUTRAL_ICON_INVERSE = 'NeutralIconInverse',
  NEUTRAL_BORDER_HOVER = 'NeutralBorderHover',
  NEUTRAL_BG = 'NeutralBg',
  NEUTRAL_BG_HOVER = 'NeutralBgHover',
  NEUTRAL_BG_INVERSE = 'NeutralBgInverse',
  NEUTRAL_BG_INVERSE_DISABLED = 'NeutralBgInverseDisabled',
  NEUTRAL_BG_INVERSE_HOVER = 'NeutralBgInverseHover',
  NEUTRAL_ACTIVE_OPACITY = 'NeutralActiveOpacity',
  SELECTED_OPACITY = 'SelectedOpacity',
  DISABLED_OPACITY = 'DisabledOpacity',
  // commons
  WHITE = 'WHITE100P',
  BLACK = 'BLACK100P',
  // grey
  GREY50 = '50',
  GREY100 = '100',
  GREY150 = '150',
  GREY200 = '200',
  GREY300 = '300',
  GREY400 = '400',
  GREY500 = '500',
  GREY600 = '600',
  GREY700 = '700',
  GREY800 = '800',
  GREY900 = '900',
  GREY1000 = '1000',
  GREYA100 = 'A100',
  GREYA200 = 'A200',
  GREYA400 = 'A400',
  GREYA700 = 'A700',

  // neutralgrey
  NEUTRALGREY100 = 'NG100',
  NEUTRALGREY150 = 'NG150',
  NEUTRALGREY200 = 'NG200',
  NEUTRALGREY300 = 'NG300',
  NEUTRALGREY400 = 'NG400',
  NEUTRALGREY500 = 'NG500',
  NEUTRALGREY600 = 'NG600',
  NEUTRALGREY700 = 'NG700',
  NEUTRALGREY800 = 'NG800',
  NEUTRALGREY900 = 'NG900',
  NEUTRALGREY1000 = 'NG1000',
  NEUTRALGREY1000_80 = 'NG1000 (80P)',
  NEUTRALGREY1100 = 'NG1100',

  // coolgrey
  COOLGREY100 = 'CG100',
  COOLGREY150 = 'CG150',
  COOLGREY200 = 'CG200',
  COOLGREY300 = 'CG300',
  COOLGREY400 = 'CG400',
  COOLGREY500 = 'CG500',
  COOLGREY600 = 'CG600',
  COOLGREY700 = 'CG700',
  COOLGREY800 = 'CG800',
  COOLGREY900 = 'CG900',
  COOLGREY1000 = 'CG1000',
  COOLGREY1000_80 = 'CG1000 (80P)',
  COOLGREY1100 = 'CG1100',

  // red
  RED100 = 'RED100',
  RED200 = 'RED200',
  RED300 = 'RED300',
  RED400 = 'RED400',
  RED500 = 'RED500',
  RED600 = 'RED600',
  RED700 = 'RED700',
  RED800 = 'RED800',
  RED900 = 'RED900',
  RED1000 = 'RED1000',

  // orange
  ORANGE100 = 'ORANGE100',
  ORANGE200 = 'ORANGE200',
  ORANGE300 = 'ORANGE300',
  ORANGE400 = 'ORANGE400',
  ORANGE500 = 'ORANGE500',
  ORANGE600 = 'ORANGE600',
  ORANGE700 = 'ORANGE700',
  ORANGE800 = 'ORANGE800',
  ORANGE900 = 'ORANGE900',
  ORANGE1000 = 'ORANGE1000',

  // yellow
  YELLOW100 = 'YELLOW100',
  YELLOW200 = 'YELLOW200',
  YELLOW300 = 'YELLOW300',
  YELLOW400 = 'YELLOW400',
  YELLOW500 = 'YELLOW500',
  YELLOW600 = 'YELLOW600',
  YELLOW700 = 'YELLOW700',
  YELLOW800 = 'YELLOW800',
  YELLOW900 = 'YELLOW900',
  YELLOW1000 = 'YELLOW1000',

  // lime
  LIME100 = 'LIME100',
  LIME200 = 'LIME200',
  LIME300 = 'LIME300',
  LIME400 = 'LIME400',
  LIME500 = 'LIME500',
  LIME600 = 'LIME600',
  LIME700 = 'LIME700',
  LIME800 = 'LIME800',
  LIME900 = 'LIME900',
  LIME1000 = 'LIME1000',

  // green
  GREEN100 = 'GREEN100',
  GREEN200 = 'GREEN200',
  GREEN300 = 'GREEN300',
  GREEN400 = 'GREEN400',
  GREEN500 = 'GREEN500',
  GREEN600 = 'GREEN600',
  GREEN700 = 'GREEN700',
  GREEN800 = 'GREEN800',
  GREEN900 = 'GREEN900',
  GREEN1000 = 'GREEN1000',

  // teal
  TEAL100 = 'TEAL100',
  TEAL200 = 'TEAL200',
  TEAL300 = 'TEAL300',
  TEAL400 = 'TEAL400',
  TEAL500 = 'TEAL500',
  TEAL600 = 'TEAL600',
  TEAL700 = 'TEAL700',
  TEAL800 = 'TEAL800',
  TEAL900 = 'TEAL900',
  TEAL1000 = 'TEAL1000',

  // blue
  BLUE100 = 'BLUE100',
  BLUE200 = 'BLUE200',
  BLUE300 = 'BLUE300',
  BLUE400 = 'BLUE400',
  BLUE500 = 'BLUE500',
  BLUE600 = 'BLUE600',
  BLUE700 = 'BLUE700',
  BLUE800 = 'BLUE800',
  BLUE900 = 'BLUE900',
  BLUE1000 = 'BLUE1000',

  // indigo
  INDIGO100 = 'INDIGO100',
  INDIGO200 = 'INDIGO200',
  INDIGO300 = 'INDIGO300',
  INDIGO400 = 'INDIGO400',
  INDIGO500 = 'INDIGO500',
  INDIGO600 = 'INDIGO600',
  INDIGO700 = 'INDIGO700',
  INDIGO800 = 'INDIGO800',
  INDIGO900 = 'INDIGO900',
  INDIGO1000 = 'INDIGO1000',

  // purple
  PURPLE100 = 'PURPLE100',
  PURPLE200 = 'PURPLE200',
  PURPLE300 = 'PURPLE300',
  PURPLE400 = 'PURPLE400',
  PURPLE500 = 'PURPLE500',
  PURPLE600 = 'PURPLE600',
  PURPLE700 = 'PURPLE700',
  PURPLE800 = 'PURPLE800',
  PURPLE900 = 'PURPLE900',
  PURPLE1000 = 'PURPLE1000',

  // pink
  PINK100 = 'PINK100',
  PINK200 = 'PINK200',
  PINK300 = 'PINK300',
  PINK400 = 'PINK400',
  PINK500 = 'PINK500',
  PINK600 = 'PINK600',
  PINK700 = 'PINK700',
  PINK800 = 'PINK800',
  PINK900 = 'PINK900',
  PINK1000 = 'PINK1000',

  // black
  BLACK100P = 'BLACK100P',
  BLACK87P = 'BLACK87P',
  BLACK60P = 'BLACK60P',
  BLACK55P = 'BLACK55P',
  BLACK43P = 'BLACK43P',
  BLACK38P = 'BLACK38P',
  BLACK32P = 'BLACK32P',
  BLACK20P = 'BLACK20P',
  BLACK15P = 'BLACK15P',
  BLACK12P = 'BLACK12P',
  BLACK8P = 'BLACK8P',
  BLACK7P = 'BLACK7P',

  // white
  WHITE100P = 'WHITE100P',
  WHITE93P = 'WHITE93P',
  WHITE80P = 'WHITE80P',
  WHITE70P = 'WHITE70P',
  WHITE55P = 'WHITE55P',
  WHITE40P = 'WHITE40P',
  WHITE38P = 'WHITE38P',
  WHITE24P = 'WHITE24P',
  WHITE15P = 'WHITE15P',
  WHITE12P = 'WHITE12P',
  WHITE8P = 'WHITE8P',

  // hclsoftwareblue
  HCLSOFTWAREBLUE01 = 'HCLSOFTWAREBLUE01',
  HCLSOFTWAREBLUE02 = 'HCLSOFTWAREBLUE02',
  HCLSOFTWAREBLUE03 = 'HCLSOFTWAREBLUE03',
  HCLSOFTWAREBLUE04 = 'HCLSOFTWAREBLUE04',
  HCLSOFTWAREBLUE05 = 'HCLSOFTWAREBLUE05',
  HCLSOFTWAREBLUE06 = 'HCLSOFTWAREBLUE06',
  HCLSOFTWAREBLUE07 = 'HCLSOFTWAREBLUE07',
  HCLSOFTWAREBLUE07_12P = 'HCLSOFTWAREBLUE07 (12P)',
  HCLSOFTWAREBLUE07_8P = 'HCLSOFTWAREBLUE07 (8P)',
  HCLSOFTWAREBLUE07_20P = 'HCLSOFTWAREBLUE07 (20P)',
  HCLSOFTWAREBLUE08 = 'HCLSOFTWAREBLUE08',
  HCLSOFTWAREBLUE09 = 'HCLSOFTWAREBLUE09',
  HCLSOFTWAREBLUE09_12P = 'HCLSOFTWAREBLUE09 (12P)',
  HCLSOFTWAREBLUE09_8P = 'HCLSOFTWAREBLUE09 (8P)',
}

export const Colors = new Map<ColorNames, string | undefined>([
  // theme colors
  [ColorNames.PRIMARY_MAIN, blue.BLUE800],
  [ColorNames.PRIMARY_DARK, '#0029A9'], // This color is not present in the color primitives but being used in the theme, need to add this color in the color primitives
  [ColorNames.PRIMARY_DARK_INVERSE, '#E6FFFF'],
  [ColorNames.PRIMARY_HOVER, '#002B6C'],
  [ColorNames.PRIMARY_INVERSE, blue.BLUE300],
  [ColorNames.PRIMARY_INVERSE_HOVER, '#A7FFFF'],
  [ColorNames.ERROR_MAIN, red.RED800],
  [ColorNames.ERROR_HOVER, '#890000'], // This color is not present in the color primitives but being used in the theme, need to add this color in the color primitives
  [ColorNames.ERROR_INVERSE, red.RED300],
  [ColorNames.ERROR_INVERSE_HOVER, '#FFDFDF'],
  [ColorNames.WARNING_MAIN, orange.ORANGE800],
  [ColorNames.WARNING_HOVER, '#780500'], // This color is not present in the color primitives but being used in the theme, need to add this color in the color primitives
  [ColorNames.WARNING_INVERSE, orange.ORANGE300],
  [ColorNames.WARNING_INVERSE_HOVER, '#FFFA96'],
  [ColorNames.INFO_MAIN, blue.BLUE800],
  [ColorNames.INFO_HOVER, '#002B6C'], // This color is not present in the color primitives but being used in the theme, need to add this color in the color primitives
  [ColorNames.INFO_INVERSE, blue.BLUE300],
  [ColorNames.INFO_INVERSE_HOVER, '#A7FFFF'],
  [ColorNames.SUCCESS_MAIN, green.GREEN800],
  [ColorNames.SUCCESS_HOVER, '#003816'], // This color is not present in the color primitives but being used in the theme, need to add this color in the color primitives
  [ColorNames.SUCCESS_INVERSE, green.GREEN300],
  [ColorNames.SUCCESS_INVERSE_HOVER, '#7EFFB8'],
  // text colors
  [ColorNames.NEUTRAL_TEXT_PRIMARY, 'rgba(0, 0, 0, 0.87)'],
  [ColorNames.NEUTRAL_TEXT_SECONDARY, 'rgba(0, 0, 0, 0.60)'],
  [ColorNames.NEUTRAL_TEXT_DISABLED, 'rgba(0, 0, 0, 0.38)'],
  [ColorNames.NEUTRAL_TEXT_HINT, 'rgba(0, 0, 0, 0.60)'],
  [ColorNames.NEUTRAL_TEXT_PRIMARY_INVERSE, 'rgba(255, 255, 255, 0.93)'],
  [ColorNames.NEUTRAL_TEXT_SECONDARY_INVERSE, 'rgba(255, 255, 255, 0.70)'],
  // backgrounds
  [ColorNames.INTERFACE_BG_LOW, neutralGrey.NG100],
  [ColorNames.INTERFACE_BG_MED, neutralGrey.NG150],
  [ColorNames.INTERFACE_BG_HIGH, neutralGrey.NG200],
  [ColorNames.INTERFACE_BG_PAPER, white.WHITE100P],
  [ColorNames.INTERFACE_BG_PAPER_INVERSE, coolGrey.CG1000],
  [ColorNames.INTERFACE_BG_OVERLAY, 'rgba(28, 38, 46, 0.8)'],
  [ColorNames.PRIMARY_BG, 'rgba(1, 83, 155, 0.12)'],
  [ColorNames.SUCCESS_BG, green.GREEN100],
  [ColorNames.ERROR_BG, red.RED100],
  [ColorNames.INFO_BG, indigo.INDIGO100],
  [ColorNames.WARNING_BG, orange.ORANGE100],
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
  [ColorNames.WHITE, white.WHITE100P],
  [ColorNames.BLACK, black.BLACK100P],

  // nuetralgrey
  [ColorNames.NEUTRALGREY100, neutralGrey.NG100],
  [ColorNames.NEUTRALGREY150, neutralGrey.NG150],
  [ColorNames.NEUTRALGREY200, neutralGrey.NG200],
  [ColorNames.NEUTRALGREY300, neutralGrey.NG300],
  [ColorNames.NEUTRALGREY400, neutralGrey.NG400],
  [ColorNames.NEUTRALGREY500, neutralGrey.NG500],
  [ColorNames.NEUTRALGREY600, neutralGrey.NG600],
  [ColorNames.NEUTRALGREY700, neutralGrey.NG700],
  [ColorNames.NEUTRALGREY800, neutralGrey.NG800],
  [ColorNames.NEUTRALGREY900, neutralGrey.NG900],
  [ColorNames.NEUTRALGREY1000, neutralGrey.NG1000],
  [ColorNames.NEUTRALGREY1000_80, neutralGrey.NG1000_80],
  [ColorNames.NEUTRALGREY1100, neutralGrey.NG1100],

  // coolgray
  [ColorNames.COOLGREY100, coolGrey.CG100],
  [ColorNames.COOLGREY150, coolGrey.CG150],
  [ColorNames.COOLGREY200, coolGrey.CG200],
  [ColorNames.COOLGREY300, coolGrey.CG300],
  [ColorNames.COOLGREY400, coolGrey.CG400],
  [ColorNames.COOLGREY500, coolGrey.CG500],
  [ColorNames.COOLGREY600, coolGrey.CG600],
  [ColorNames.COOLGREY700, coolGrey.CG700],
  [ColorNames.COOLGREY800, coolGrey.CG800],
  [ColorNames.COOLGREY900, coolGrey.CG900],
  [ColorNames.COOLGREY1000, coolGrey.CG1000],
  [ColorNames.COOLGREY1000_80, coolGrey.CG1000_80],
  [ColorNames.COOLGREY1100, coolGrey.CG1100],

  // red
  [ColorNames.RED100, red.RED100],
  [ColorNames.RED200, red.RED200],
  [ColorNames.RED300, red.RED300],
  [ColorNames.RED400, red.RED400],
  [ColorNames.RED500, red.RED500],
  [ColorNames.RED600, red.RED600],
  [ColorNames.RED700, red.RED700],
  [ColorNames.RED800, red.RED800],
  [ColorNames.RED900, red.RED900],
  [ColorNames.RED1000, red.RED1000],

  // orange
  [ColorNames.ORANGE100, orange.ORANGE100],
  [ColorNames.ORANGE200, orange.ORANGE200],
  [ColorNames.ORANGE300, orange.ORANGE300],
  [ColorNames.ORANGE400, orange.ORANGE400],
  [ColorNames.ORANGE500, orange.ORANGE500],
  [ColorNames.ORANGE600, orange.ORANGE600],
  [ColorNames.ORANGE700, orange.ORANGE700],
  [ColorNames.ORANGE800, orange.ORANGE800],
  [ColorNames.ORANGE900, orange.ORANGE900],
  [ColorNames.ORANGE1000, orange.ORANGE1000],

  // yellow
  [ColorNames.YELLOW100, yellow.YELLOW100],
  [ColorNames.YELLOW200, yellow.YELLOW200],
  [ColorNames.YELLOW300, yellow.YELLOW300],
  [ColorNames.YELLOW400, yellow.YELLOW400],
  [ColorNames.YELLOW500, yellow.YELLOW500],
  [ColorNames.YELLOW600, yellow.YELLOW600],
  [ColorNames.YELLOW700, yellow.YELLOW700],
  [ColorNames.YELLOW800, yellow.YELLOW800],
  [ColorNames.YELLOW900, yellow.YELLOW900],
  [ColorNames.YELLOW1000, yellow.YELLOW1000],

  // lime
  [ColorNames.LIME100, lime.LIME100],
  [ColorNames.LIME200, lime.LIME200],
  [ColorNames.LIME300, lime.LIME300],
  [ColorNames.LIME400, lime.LIME400],
  [ColorNames.LIME500, lime.LIME500],
  [ColorNames.LIME600, lime.LIME600],
  [ColorNames.LIME700, lime.LIME700],
  [ColorNames.LIME800, lime.LIME800],
  [ColorNames.LIME900, lime.LIME900],
  [ColorNames.LIME1000, lime.LIME1000],

  // green
  [ColorNames.GREEN100, green.GREEN100],
  [ColorNames.GREEN200, green.GREEN200],
  [ColorNames.GREEN300, green.GREEN300],
  [ColorNames.GREEN400, green.GREEN400],
  [ColorNames.GREEN500, green.GREEN500],
  [ColorNames.GREEN600, green.GREEN600],
  [ColorNames.GREEN700, green.GREEN700],
  [ColorNames.GREEN800, green.GREEN800],
  [ColorNames.GREEN900, green.GREEN900],
  [ColorNames.GREEN1000, green.GREEN1000],

  // teal
  [ColorNames.TEAL100, teal.TEAL100],
  [ColorNames.TEAL200, teal.TEAL200],
  [ColorNames.TEAL300, teal.TEAL300],
  [ColorNames.TEAL400, teal.TEAL400],
  [ColorNames.TEAL500, teal.TEAL500],
  [ColorNames.TEAL600, teal.TEAL600],
  [ColorNames.TEAL700, teal.TEAL700],
  [ColorNames.TEAL800, teal.TEAL800],
  [ColorNames.TEAL900, teal.TEAL900],
  [ColorNames.TEAL1000, teal.TEAL1000],

  // blue
  [ColorNames.BLUE100, blue.BLUE100],
  [ColorNames.BLUE200, blue.BLUE200],
  [ColorNames.BLUE300, blue.BLUE300],
  [ColorNames.BLUE400, blue.BLUE400],
  [ColorNames.BLUE500, blue.BLUE500],
  [ColorNames.BLUE600, blue.BLUE600],
  [ColorNames.BLUE700, blue.BLUE700],
  [ColorNames.BLUE800, blue.BLUE800],
  [ColorNames.BLUE900, blue.BLUE900],
  [ColorNames.BLUE1000, blue.BLUE1000],

  // indigo
  [ColorNames.INDIGO100, indigo.INDIGO100],
  [ColorNames.INDIGO200, indigo.INDIGO200],
  [ColorNames.INDIGO300, indigo.INDIGO300],
  [ColorNames.INDIGO400, indigo.INDIGO400],
  [ColorNames.INDIGO500, indigo.INDIGO500],
  [ColorNames.INDIGO600, indigo.INDIGO600],
  [ColorNames.INDIGO700, indigo.INDIGO700],
  [ColorNames.INDIGO800, indigo.INDIGO800],
  [ColorNames.INDIGO900, indigo.INDIGO900],
  [ColorNames.INDIGO1000, indigo.INDIGO1000],

  // purple
  [ColorNames.PURPLE100, purple.PURPLE100],
  [ColorNames.PURPLE200, purple.PURPLE200],
  [ColorNames.PURPLE300, purple.PURPLE300],
  [ColorNames.PURPLE400, purple.PURPLE400],
  [ColorNames.PURPLE500, purple.PURPLE500],
  [ColorNames.PURPLE600, purple.PURPLE600],
  [ColorNames.PURPLE700, purple.PURPLE700],
  [ColorNames.PURPLE800, purple.PURPLE800],
  [ColorNames.PURPLE900, purple.PURPLE900],
  [ColorNames.PURPLE1000, purple.PURPLE1000],

  // pink
  [ColorNames.PINK100, pink.PINK100],
  [ColorNames.PINK200, pink.PINK200],
  [ColorNames.PINK300, pink.PINK300],
  [ColorNames.PINK400, pink.PINK400],
  [ColorNames.PINK500, pink.PINK500],
  [ColorNames.PINK600, pink.PINK600],
  [ColorNames.PINK700, pink.PINK700],
  [ColorNames.PINK800, pink.PINK800],
  [ColorNames.PINK900, pink.PINK900],
  [ColorNames.PINK1000, pink.PINK1000],

  // black
  [ColorNames.BLACK100P, black.BLACK100P],
  [ColorNames.BLACK87P, black.BLACK87P],
  [ColorNames.BLACK60P, black.BLACK60P],
  [ColorNames.BLACK55P, black.BLACK55P],
  [ColorNames.BLACK43P, black.BLACK43P],
  [ColorNames.BLACK38P, black.BLACK38P],
  [ColorNames.BLACK32P, black.BLACK32P],
  [ColorNames.BLACK20P, black.BLACK20P],
  [ColorNames.BLACK15P, black.BLACK15P],
  [ColorNames.BLACK12P, black.BLACK12P],
  [ColorNames.BLACK8P, black.BLACK8P],
  [ColorNames.BLACK7P, black.BLACK7P],

  // white
  [ColorNames.WHITE100P, white.WHITE100P],
  [ColorNames.WHITE93P, white.WHITE93P],
  [ColorNames.WHITE80P, white.WHITE80P],
  [ColorNames.WHITE70P, white.WHITE70P],
  [ColorNames.WHITE55P, white.WHITE55P],
  [ColorNames.WHITE40P, white.WHITE40P],
  [ColorNames.WHITE38P, white.WHITE38P],
  [ColorNames.WHITE24P, white.WHITE24P],
  [ColorNames.WHITE15P, white.WHITE15P],
  [ColorNames.WHITE12P, white.WHITE12P],
  [ColorNames.WHITE8P, white.WHITE8P],

  // hclsoftwareblue
  [ColorNames.HCLSOFTWAREBLUE01, hclsoftwareblue.HCLSOFTWAREBLUE01],
  [ColorNames.HCLSOFTWAREBLUE02, hclsoftwareblue.HCLSOFTWAREBLUE02],
  [ColorNames.HCLSOFTWAREBLUE03, hclsoftwareblue.HCLSOFTWAREBLUE03],
  [ColorNames.HCLSOFTWAREBLUE04, hclsoftwareblue.HCLSOFTWAREBLUE04],
  [ColorNames.HCLSOFTWAREBLUE05, hclsoftwareblue.HCLSOFTWAREBLUE05],
  [ColorNames.HCLSOFTWAREBLUE06, hclsoftwareblue.HCLSOFTWAREBLUE06],
  [ColorNames.HCLSOFTWAREBLUE07, hclsoftwareblue.HCLSOFTWAREBLUE07],
  [ColorNames.HCLSOFTWAREBLUE07_12P, hclsoftwareblue.HCLSOFTWAREBLUE07_12],
  [ColorNames.HCLSOFTWAREBLUE07_8P, hclsoftwareblue.HCLSOFTWAREBLUE07_8],
  [ColorNames.HCLSOFTWAREBLUE07_20P, hclsoftwareblue.HCLSOFTWAREBLUE07_20],
  [ColorNames.HCLSOFTWAREBLUE08, hclsoftwareblue.HCLSOFTWAREBLUE08],
  [ColorNames.HCLSOFTWAREBLUE09, hclsoftwareblue.HCLSOFTWAREBLUE09],
  [ColorNames.HCLSOFTWAREBLUE09_12P, hclsoftwareblue.HCLSOFTWAREBLUE09_12],
  [ColorNames.HCLSOFTWAREBLUE09_8P, hclsoftwareblue.HCLSOFTWAREBLUE09_8],
]);
