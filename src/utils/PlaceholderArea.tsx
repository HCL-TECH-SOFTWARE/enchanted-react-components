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
import * as React from 'react';
import Grid, { GridProps } from '@mui/material/Grid';
import IconRepeat from '@hcl-software/enchanted-icons/dist/carbon/es/repeat';
import { styled } from '@mui/material/styles';
import Typography from '../Typography';

const StyledGrid = styled(Grid)(() => {
  return {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    color: '#7B61FF',
    background: 'rgba(123, 97, 255, 0.1)',
    border: '1px dashed #7B61FF',
    borderRadius: '4px',
  };
});

const PlaceholderArea: React.FC<GridProps> = ({ ...props }: GridProps) => {
  return (
    <StyledGrid {...props}>
      <Grid sx={{ lineHeight: '100%' }}><IconRepeat sx={{ height: '16px', width: '16px' }} /></Grid>
      <Grid sx={{ marginTop: '8px' }}><Typography variant="body2">Replace me</Typography></Grid>
    </StyledGrid>
  );
};

export default PlaceholderArea;
