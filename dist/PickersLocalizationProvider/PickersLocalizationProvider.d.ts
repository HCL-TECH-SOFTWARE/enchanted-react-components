import React from 'react';
import { LocalizationProviderProps as MuiLocalizationProviderProps } from '@mui/x-date-pickers/LocalizationProvider';
export declare const SUPPORTED_LOCALE: string[];
export type PickersLocalizationProviderProps = MuiLocalizationProviderProps & {
    onLocaleLoad?: (locale: string) => void;
    adapterLocale: string | object;
};
declare const PickersLocalizationProvider: ({ adapterLocale: adapterLocaleProp, onLocaleLoad, ...rest }: PickersLocalizationProviderProps) => React.JSX.Element;
export * from '@mui/x-date-pickers/LocalizationProvider';
export default PickersLocalizationProvider;
