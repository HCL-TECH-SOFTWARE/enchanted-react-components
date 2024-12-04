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
import { styled } from '@mui/material/styles';

export enum SnackbarContainerPosition {
  LEFT = 'left',
  RIGHT = 'right',
}

export interface SnackbarContainerProps {
  position?: SnackbarContainerPosition;
}

const SnackbarContainer = styled('div')<SnackbarContainerProps>(({ position = SnackbarContainerPosition.RIGHT }) => {
  return {
    position: 'fixed',
    bottom: '12px',
    right: position === SnackbarContainerPosition.RIGHT ? '12px' : 'unset',
    left: position === SnackbarContainerPosition.LEFT ? '12px' : 'unset',
    zIndex: 2,
  };
});

export default SnackbarContainer;
