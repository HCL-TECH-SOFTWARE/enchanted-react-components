import React from 'react';
import { PaperProps } from '@mui/material/Paper';
import { Components, Theme } from '@mui/material';
declare const Paper: React.ForwardRefExoticComponent<Omit<PaperProps<"div", {}>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare module '@mui/material/Paper' {
    interface PaperPropsVariantOverrides {
        nopadding: true;
    }
}
export declare const getMuiPaperThemeOverrides: () => Components<Omit<Theme, 'components'>>;
export default Paper;
