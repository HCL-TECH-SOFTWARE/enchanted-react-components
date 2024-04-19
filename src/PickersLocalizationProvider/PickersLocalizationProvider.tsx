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
import React, { useState, useEffect } from 'react';
import { LocalizationProvider as MuiLocalizationProvider, LocalizationProviderProps as MuiLocalizationProviderProps } from '@mui/x-date-pickers/LocalizationProvider';
import * as locales from '@mui/x-date-pickers/locales';
import { PickersLocaleText } from '@mui/x-date-pickers/locales';
import * as dayjs from 'dayjs';

import { arAR } from './locales/arAR';
import { caCA } from './locales/caCA';
import { csCS } from './locales/csCS';
import { daDA } from './locales/daDA';
import { elEL } from './locales/elEL';
import { hrHR } from './locales/hrHR';
import { huHU } from './locales/huHU';
import { iwIW } from './locales/iwIW';
import { kkKK } from './locales/kkKK';
import { noNO } from './locales/noNO';
import { roRO } from './locales/roRO';
import { ruRU } from './locales/ruRU';
import { skSK } from './locales/skSK';
import { slSL } from './locales/slSL';
import { thTH } from './locales/thTH';
import { ukUK } from './locales/ukUK';

export const SUPPORTED_LOCALE: string[] = [
  'ar',
  'ca',
  'cs',
  'da',
  'de',
  'el',
  'en',
  'es',
  'fi',
  'fr',
  'hr',
  'hu',
  'it',
  'he',
  'ja',
  'kk',
  'ko',
  'nl',
  'nb',
  'pl',
  'pt',
  'pt-br',
  'ro',
  'ru',
  'sk',
  'sl',
  'sv',
  'th',
  'tr',
  'uk',
  'zh',
  'zh-tw',
];

interface IDayJsLocalePackage {
  // eslint-why dayjs object
  // eslint-disable-next-line no-undef
  [key: string]: Promise<ILocale>;
}

const DAYJS_LOCALE_PACKAGE: IDayJsLocalePackage = {
  ar: import('dayjs/locale/ar'),
  ca: import('dayjs/locale/ca'),
  cs: import('dayjs/locale/cs'),
  da: import('dayjs/locale/da'),
  de: import('dayjs/locale/de'),
  el: import('dayjs/locale/el'),
  en: import('dayjs/locale/en'),
  es: import('dayjs/locale/es'),
  fi: import('dayjs/locale/fi'),
  fr: import('dayjs/locale/fr'),
  hr: import('dayjs/locale/hr'),
  hu: import('dayjs/locale/hu'),
  it: import('dayjs/locale/it'),
  he: import('dayjs/locale/he'),
  ja: import('dayjs/locale/ja'),
  kk: import('dayjs/locale/kk'),
  ko: import('dayjs/locale/ko'),
  nl: import('dayjs/locale/nl'),
  nb: import('dayjs/locale/nb'),
  pl: import('dayjs/locale/pl'),
  pt: import('dayjs/locale/pt'),
  'pt-br': import('dayjs/locale/pt-br'),
  ro: import('dayjs/locale/ro'),
  ru: import('dayjs/locale/ru'),
  sk: import('dayjs/locale/sk'),
  sl: import('dayjs/locale/sl'),
  sv: import('dayjs/locale/sv'),
  th: import('dayjs/locale/th'),
  tr: import('dayjs/locale/tr'),
  uk: import('dayjs/locale/uk'),
  zh: import('dayjs/locale/zh'),
  'zh-tw': import('dayjs/locale/zh-tw'),
};

const getLocaleText = (adapterLocale?: string | object): Partial<PickersLocaleText<unknown>> => {
  if (adapterLocale === 'ar') return arAR.components.MuiLocalizationProvider.defaultProps.localeText;
  if (adapterLocale === 'ca') return caCA.components.MuiLocalizationProvider.defaultProps.localeText;
  if (adapterLocale === 'cs') return csCS.components.MuiLocalizationProvider.defaultProps.localeText;
  if (adapterLocale === 'da') return daDA.components.MuiLocalizationProvider.defaultProps.localeText;
  if (adapterLocale === 'de') return locales.deDE.components.MuiLocalizationProvider.defaultProps.localeText;
  if (adapterLocale === 'el') return elEL.components.MuiLocalizationProvider.defaultProps.localeText;
  if (adapterLocale === 'en') return locales.enUS.components.MuiLocalizationProvider.defaultProps.localeText;
  if (adapterLocale === 'es') return locales.esES.components.MuiLocalizationProvider.defaultProps.localeText;
  if (adapterLocale === 'fi') return locales.fiFI.components.MuiLocalizationProvider.defaultProps.localeText;
  if (adapterLocale === 'fr') return locales.frFR.components.MuiLocalizationProvider.defaultProps.localeText;
  if (adapterLocale === 'hr') return hrHR.components.MuiLocalizationProvider.defaultProps.localeText;
  if (adapterLocale === 'hu') return huHU.components.MuiLocalizationProvider.defaultProps.localeText;
  if (adapterLocale === 'it') return locales.itIT.components.MuiLocalizationProvider.defaultProps.localeText;
  if (adapterLocale === 'he') return iwIW.components.MuiLocalizationProvider.defaultProps.localeText;
  if (adapterLocale === 'ja') return locales.jaJP.components.MuiLocalizationProvider.defaultProps.localeText;
  if (adapterLocale === 'kk') return kkKK.components.MuiLocalizationProvider.defaultProps.localeText;
  if (adapterLocale === 'ko') return locales.koKR.components.MuiLocalizationProvider.defaultProps.localeText;
  if (adapterLocale === 'nl') return locales.nlNL.components.MuiLocalizationProvider.defaultProps.localeText;
  if (adapterLocale === 'nb') return noNO.components.MuiLocalizationProvider.defaultProps.localeText;
  if (adapterLocale === 'pl') return locales.plPL.components.MuiLocalizationProvider.defaultProps.localeText;
  if (adapterLocale === 'pt') return locales.ptBR.components.MuiLocalizationProvider.defaultProps.localeText;
  if (adapterLocale === 'pt-br') return locales.ptBR.components.MuiLocalizationProvider.defaultProps.localeText;
  if (adapterLocale === 'ro') return roRO.components.MuiLocalizationProvider.defaultProps.localeText;
  if (adapterLocale === 'ru') return ruRU.components.MuiLocalizationProvider.defaultProps.localeText;
  if (adapterLocale === 'sk') return skSK.components.MuiLocalizationProvider.defaultProps.localeText;
  if (adapterLocale === 'sl') return slSL.components.MuiLocalizationProvider.defaultProps.localeText;
  if (adapterLocale === 'sv') return locales.svSE.components.MuiLocalizationProvider.defaultProps.localeText;
  if (adapterLocale === 'th') return thTH.components.MuiLocalizationProvider.defaultProps.localeText;
  if (adapterLocale === 'tr') return locales.trTR.components.MuiLocalizationProvider.defaultProps.localeText;
  if (adapterLocale === 'uk') return ukUK.components.MuiLocalizationProvider.defaultProps.localeText;
  if (adapterLocale === 'zh') return locales.zhCN.components.MuiLocalizationProvider.defaultProps.localeText;
  if (adapterLocale === 'zh-tw') return locales.zhCN.components.MuiLocalizationProvider.defaultProps.localeText;
  return locales.enUS.components.MuiLocalizationProvider.defaultProps.localeText;
};

const verfiyAdapterLocale = (adapterLocale?: string | object) => {
  if (adapterLocale === undefined || (typeof adapterLocale === 'string' && !SUPPORTED_LOCALE.includes(adapterLocale))) {
    // eslint-why necessary to verify adapterLocale and inform of supported locales
    // eslint-disable-next-line no-console
    console.log(`The adapterLocale (${adapterLocale}) is not supported, using the fallback 'en' > SUPPORTED_LOCALE: ${SUPPORTED_LOCALE}`);
  }
};

export type PickersLocalizationProviderProps = MuiLocalizationProviderProps & {
}

const PickersLocalizationProvider = ({ ...props }: PickersLocalizationProviderProps) => {
  const [adapterLocale, setAdapterLocale] = useState('en');
  useEffect(() => {
    if (props.adapterLocale !== undefined && typeof props.adapterLocale === 'string') {
      const loadDayJsLocale = async (dayJsLocal: string) => {
        await DAYJS_LOCALE_PACKAGE[dayJsLocal];
        dayjs.locale(dayJsLocal);
        setAdapterLocale(dayJsLocal);
      };
      const locale = (props.adapterLocale !== undefined && !SUPPORTED_LOCALE.includes(props.adapterLocale)) ? 'en' : props.adapterLocale;
      loadDayJsLocale(locale);
    }
  }, [props.adapterLocale]);

  verfiyAdapterLocale(props.adapterLocale);

  // Set Monday as the first day of the week in the calendar
  dayjs.Ls[`${adapterLocale}`].weekStart = 1;
  return <MuiLocalizationProvider {...props} adapterLocale={adapterLocale} localeText={getLocaleText(props.adapterLocale)} />;
};

PickersLocalizationProvider.defaultProps = {
};

export * from '@mui/x-date-pickers/LocalizationProvider';
export default PickersLocalizationProvider;
