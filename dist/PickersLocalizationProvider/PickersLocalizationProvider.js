"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUPPORTED_LOCALE = void 0;
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
const react_1 = __importStar(require("react"));
const LocalizationProvider_1 = require("@mui/x-date-pickers/LocalizationProvider");
const locales = __importStar(require("@mui/x-date-pickers/locales"));
const dayjs = __importStar(require("dayjs"));
const arAR_1 = require("./locales/arAR");
const caCA_1 = require("./locales/caCA");
const csCS_1 = require("./locales/csCS");
const daDA_1 = require("./locales/daDA");
const elEL_1 = require("./locales/elEL");
const hrHR_1 = require("./locales/hrHR");
const huHU_1 = require("./locales/huHU");
const iwIW_1 = require("./locales/iwIW");
const kkKK_1 = require("./locales/kkKK");
const noNO_1 = require("./locales/noNO");
const roRO_1 = require("./locales/roRO");
const ruRU_1 = require("./locales/ruRU");
const skSK_1 = require("./locales/skSK");
const slSL_1 = require("./locales/slSL");
const thTH_1 = require("./locales/thTH");
const ukUK_1 = require("./locales/ukUK");
exports.SUPPORTED_LOCALE = [
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
const DAYJS_LOCALE_PACKAGE = {
    ar: Promise.resolve().then(() => __importStar(require('dayjs/locale/ar'))),
    ca: Promise.resolve().then(() => __importStar(require('dayjs/locale/ca'))),
    cs: Promise.resolve().then(() => __importStar(require('dayjs/locale/cs'))),
    da: Promise.resolve().then(() => __importStar(require('dayjs/locale/da'))),
    de: Promise.resolve().then(() => __importStar(require('dayjs/locale/de'))),
    el: Promise.resolve().then(() => __importStar(require('dayjs/locale/el'))),
    en: Promise.resolve().then(() => __importStar(require('dayjs/locale/en'))),
    es: Promise.resolve().then(() => __importStar(require('dayjs/locale/es'))),
    fi: Promise.resolve().then(() => __importStar(require('dayjs/locale/fi'))),
    fr: Promise.resolve().then(() => __importStar(require('dayjs/locale/fr'))),
    hr: Promise.resolve().then(() => __importStar(require('dayjs/locale/hr'))),
    hu: Promise.resolve().then(() => __importStar(require('dayjs/locale/hu'))),
    it: Promise.resolve().then(() => __importStar(require('dayjs/locale/it'))),
    he: Promise.resolve().then(() => __importStar(require('dayjs/locale/he'))),
    ja: Promise.resolve().then(() => __importStar(require('dayjs/locale/ja'))),
    kk: Promise.resolve().then(() => __importStar(require('dayjs/locale/kk'))),
    ko: Promise.resolve().then(() => __importStar(require('dayjs/locale/ko'))),
    nl: Promise.resolve().then(() => __importStar(require('dayjs/locale/nl'))),
    nb: Promise.resolve().then(() => __importStar(require('dayjs/locale/nb'))),
    pl: Promise.resolve().then(() => __importStar(require('dayjs/locale/pl'))),
    pt: Promise.resolve().then(() => __importStar(require('dayjs/locale/pt'))),
    'pt-br': Promise.resolve().then(() => __importStar(require('dayjs/locale/pt-br'))),
    ro: Promise.resolve().then(() => __importStar(require('dayjs/locale/ro'))),
    ru: Promise.resolve().then(() => __importStar(require('dayjs/locale/ru'))),
    sk: Promise.resolve().then(() => __importStar(require('dayjs/locale/sk'))),
    sl: Promise.resolve().then(() => __importStar(require('dayjs/locale/sl'))),
    sv: Promise.resolve().then(() => __importStar(require('dayjs/locale/sv'))),
    th: Promise.resolve().then(() => __importStar(require('dayjs/locale/th'))),
    tr: Promise.resolve().then(() => __importStar(require('dayjs/locale/tr'))),
    uk: Promise.resolve().then(() => __importStar(require('dayjs/locale/uk'))),
    zh: Promise.resolve().then(() => __importStar(require('dayjs/locale/zh'))),
    'zh-tw': Promise.resolve().then(() => __importStar(require('dayjs/locale/zh-tw'))),
};
const getLocaleText = (adapterLocale) => {
    if (adapterLocale === 'ar')
        return arAR_1.arAR.components.MuiLocalizationProvider.defaultProps.localeText;
    if (adapterLocale === 'ca')
        return caCA_1.caCA.components.MuiLocalizationProvider.defaultProps.localeText;
    if (adapterLocale === 'cs')
        return csCS_1.csCS.components.MuiLocalizationProvider.defaultProps.localeText;
    if (adapterLocale === 'da')
        return daDA_1.daDA.components.MuiLocalizationProvider.defaultProps.localeText;
    if (adapterLocale === 'de')
        return locales.deDE.components.MuiLocalizationProvider.defaultProps.localeText;
    if (adapterLocale === 'el')
        return elEL_1.elEL.components.MuiLocalizationProvider.defaultProps.localeText;
    if (adapterLocale === 'en')
        return locales.enUS.components.MuiLocalizationProvider.defaultProps.localeText;
    if (adapterLocale === 'es')
        return locales.esES.components.MuiLocalizationProvider.defaultProps.localeText;
    if (adapterLocale === 'fi')
        return locales.fiFI.components.MuiLocalizationProvider.defaultProps.localeText;
    if (adapterLocale === 'fr')
        return locales.frFR.components.MuiLocalizationProvider.defaultProps.localeText;
    if (adapterLocale === 'hr')
        return hrHR_1.hrHR.components.MuiLocalizationProvider.defaultProps.localeText;
    if (adapterLocale === 'hu')
        return huHU_1.huHU.components.MuiLocalizationProvider.defaultProps.localeText;
    if (adapterLocale === 'it')
        return locales.itIT.components.MuiLocalizationProvider.defaultProps.localeText;
    if (adapterLocale === 'he')
        return iwIW_1.iwIW.components.MuiLocalizationProvider.defaultProps.localeText;
    if (adapterLocale === 'ja')
        return locales.jaJP.components.MuiLocalizationProvider.defaultProps.localeText;
    if (adapterLocale === 'kk')
        return kkKK_1.kkKK.components.MuiLocalizationProvider.defaultProps.localeText;
    if (adapterLocale === 'ko')
        return locales.koKR.components.MuiLocalizationProvider.defaultProps.localeText;
    if (adapterLocale === 'nl')
        return locales.nlNL.components.MuiLocalizationProvider.defaultProps.localeText;
    if (adapterLocale === 'nb')
        return noNO_1.noNO.components.MuiLocalizationProvider.defaultProps.localeText;
    if (adapterLocale === 'pl')
        return locales.plPL.components.MuiLocalizationProvider.defaultProps.localeText;
    if (adapterLocale === 'pt')
        return locales.ptBR.components.MuiLocalizationProvider.defaultProps.localeText;
    if (adapterLocale === 'pt-br')
        return locales.ptBR.components.MuiLocalizationProvider.defaultProps.localeText;
    if (adapterLocale === 'ro')
        return roRO_1.roRO.components.MuiLocalizationProvider.defaultProps.localeText;
    if (adapterLocale === 'ru')
        return ruRU_1.ruRU.components.MuiLocalizationProvider.defaultProps.localeText;
    if (adapterLocale === 'sk')
        return skSK_1.skSK.components.MuiLocalizationProvider.defaultProps.localeText;
    if (adapterLocale === 'sl')
        return slSL_1.slSL.components.MuiLocalizationProvider.defaultProps.localeText;
    if (adapterLocale === 'sv')
        return locales.svSE.components.MuiLocalizationProvider.defaultProps.localeText;
    if (adapterLocale === 'th')
        return thTH_1.thTH.components.MuiLocalizationProvider.defaultProps.localeText;
    if (adapterLocale === 'tr')
        return locales.trTR.components.MuiLocalizationProvider.defaultProps.localeText;
    if (adapterLocale === 'uk')
        return ukUK_1.ukUK.components.MuiLocalizationProvider.defaultProps.localeText;
    if (adapterLocale === 'zh')
        return locales.zhCN.components.MuiLocalizationProvider.defaultProps.localeText;
    if (adapterLocale === 'zh-tw')
        return locales.zhCN.components.MuiLocalizationProvider.defaultProps.localeText;
    return locales.enUS.components.MuiLocalizationProvider.defaultProps.localeText;
};
const verfiyAdapterLocale = (adapterLocale) => {
    if (adapterLocale === undefined || (typeof adapterLocale === 'string' && !exports.SUPPORTED_LOCALE.includes(adapterLocale))) {
        // eslint-why necessary to verify adapterLocale and inform of supported locales
        // eslint-disable-next-line no-console
        console.log(`The adapterLocale (${adapterLocale}) is not supported, using the fallback 'en' > SUPPORTED_LOCALE: ${exports.SUPPORTED_LOCALE}`);
    }
};
const PickersLocalizationProvider = (_a) => {
    var { adapterLocale: adapterLocaleProp = 'en', onLocaleLoad } = _a, rest = __rest(_a, ["adapterLocale", "onLocaleLoad"]);
    const [adapterLocale, setAdapterLocale] = (0, react_1.useState)('en');
    (0, react_1.useEffect)(() => {
        if (adapterLocaleProp !== undefined && typeof adapterLocaleProp === 'string') {
            const loadDayJsLocale = (dayJsLocale) => __awaiter(void 0, void 0, void 0, function* () {
                yield DAYJS_LOCALE_PACKAGE[dayJsLocale];
                dayjs.locale(dayJsLocale);
                setAdapterLocale(dayJsLocale);
                onLocaleLoad === null || onLocaleLoad === void 0 ? void 0 : onLocaleLoad(dayJsLocale);
            });
            const locale = (!exports.SUPPORTED_LOCALE.includes(adapterLocaleProp)) ? 'en' : adapterLocaleProp;
            loadDayJsLocale(locale);
        }
    }, [adapterLocaleProp, onLocaleLoad]);
    verfiyAdapterLocale(adapterLocaleProp);
    // Set Monday as the first day of the week in the calendar
    dayjs.Ls[`${adapterLocale}`].weekStart = 1;
    return react_1.default.createElement(LocalizationProvider_1.LocalizationProvider, Object.assign({}, rest, { adapterLocale: adapterLocale, localeText: getLocaleText(adapterLocaleProp) }));
};
__exportStar(require("@mui/x-date-pickers/LocalizationProvider"), exports);
exports.default = PickersLocalizationProvider;
