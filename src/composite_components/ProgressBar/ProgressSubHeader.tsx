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
import { Box } from '@mui/material';
import { Literals } from './ProgressBar';
import Typography from '../../Typography';
import Button, { ButtonVariants } from '../../Button';

interface ProgressSubHeaderProps {
  totalSize: string;
  totalTime?: string;
  literals: Literals;
  cancelAll?: Function;
}

/**
 * @component Renders the progress subheader component.
 * @param {ProgressSubHeaderProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
const ProgressSubHeader = (props: ProgressSubHeaderProps) => {
  const {
    totalSize, totalTime, literals, cancelAll,
  } = props;
  return (
    <Box
      sx={(theme) => {
        return ({
          padding: '5px 12px',
          background: theme.palette.background.secondary,
          boxShadow: theme.shadows[6],
        });
      }}
      height="24px"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      boxSizing="border-box"
    >
      <Box display="flex" alignItems="center">
        <Typography variant="caption" color="text.secondary">
          {`${literals.totalSizeLabel}:`}
        </Typography>
        <Typography variant="caption" color="text.primary" style={{ marginLeft: '4px' }}>
          {totalSize}
        </Typography>
        {totalTime && (
          <Typography variant="caption" color="text.primary" style={{ marginLeft: '8px' }}>
            {totalTime}
          </Typography>
        )}
      </Box>
      {cancelAll && (
        <Button
          variant={ButtonVariants.TEXT}
          onClick={() => { if (cancelAll) cancelAll(); }}
          sx={(theme) => {
            return ({
              background: theme.palette.background.secondary,
              height: '14px',
              padding: '0px 3px',
            });
          }}
        >
          <Typography variant="caption" color="primary.main">{literals.cancelAllLabel}</Typography>
        </Button>
      )}
    </Box>
  );
};

export default ProgressSubHeader;
