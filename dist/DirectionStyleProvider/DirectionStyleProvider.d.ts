import * as React from 'react';
import { ThemeDirectionType } from '../theme';
export interface DirectionStyleProviderProps {
    children: React.ReactNode;
    direction: ThemeDirectionType;
}
declare const DirectionStyleProvider: React.FC<DirectionStyleProviderProps>;
export default DirectionStyleProvider;
