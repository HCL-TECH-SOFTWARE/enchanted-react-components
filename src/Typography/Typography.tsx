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
import React from 'react';
import MuiTypography, { TypographyProps } from '@mui/material/Typography';
import { Components, Theme } from '@mui/material';

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body1bold?: true,
    body1italic?: true,
    body2bold?: true,
    body2italic?: true,
  }
}

const Typography = React.forwardRef((props: TypographyProps, ref: React.Ref<HTMLElement>) => {
  return <MuiTypography ref={ref} {...props} />;
}) as React.FC<TypographyProps & { component?: React.ElementType }>;

Typography.defaultProps = {
  align: 'inherit',
  gutterBottom: false,
  noWrap: false,
  paragraph: false,
  variant: 'body1',
};

export const getMuiTypographyThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          body1bold: 'p',
          body1italic: 'p',
          body2bold: 'p',
          body2italic: 'p',
        },
      },
    },
  };
};

export * from '@mui/material/Typography';
export default Typography;
