import React from 'react';
import { ExtendedGridColDef } from './DataGrid';
interface Person {
    id: string;
    lastName?: string | null;
    firstName?: string | null;
    age?: number | null;
    'iconStart-id'?: React.ReactNode;
    'avatar-fullName'?: React.ReactNode;
    'endActions-fullName'?: React.ReactNode;
    'iconEnd-lastName'?: React.ReactNode;
    'subTitle-fullName'?: string;
}
export declare const sampleColumns: ExtendedGridColDef[];
export declare const sampleRows: Person[];
export declare const sampleMinimalRows: Person[];
export declare const processRow: (rows: Person[], isMinimal: boolean, subTitle?: boolean) => Person[];
export declare const sampleRowsWithSubTitle: Person[];
export declare const sampleColumnsWithSubTitle: ExtendedGridColDef[];
export declare const sampleRowsWithDisabledRow: Person[];
export {};
