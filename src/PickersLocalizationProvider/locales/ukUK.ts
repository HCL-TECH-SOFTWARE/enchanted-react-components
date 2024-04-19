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
import { getPickersLocalization } from '@mui/x-date-pickers/locales/utils/getPickersLocalization';
import * as locales from '@mui/x-date-pickers/locales';

const ukUKPickers = { ...locales.enUS.components.MuiLocalizationProvider.defaultProps.localeText };

// Those attributes were translated by google translate, but I think we should check this with a translation service.
ukUKPickers.todayButtonLabel = 'Сьогодні'; // Today
ukUKPickers.previousMonth = 'Попередній місяць'; // Previous month
ukUKPickers.nextMonth = 'Наступного місяця'; // Next month

export const ukUK = getPickersLocalization(ukUKPickers);
