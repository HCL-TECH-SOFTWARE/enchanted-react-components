/* ======================================================================== *
 * Copyright 2025 HCL America Inc.                                          *
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
import IconCaretDown from '@hcl-software/enchanted-icons/dist/carbon/es/caret--down';
import { Box } from '@mui/system';
import { styled } from '@mui/material';
import Typography from '../Typography';

/**
 * Props for the ActionButton component.
 */
export interface ActionButtonProps {
  label: string,
  endIcon?: boolean,
  disabled?: boolean,
  handleClick?(event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>): void,
}

/**
 * `StyledBox` is a styled component based on the `Box` component. It applies various styles to the `Box` component.
 * @param {object} theme - The theme object provided by the styled-components library.
 * @returns {object} - The styles to be applied to the `Box` component.
 */
const StyledBox = styled(Box)(({ theme }) => {
  return {
    display: 'flex',
    width: 'fit-content',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '0px 2px',
    borderRadius: '1px',
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      color: theme.palette.primary.dark,
    },
    '&:focus': {
      outline: `1px solid ${theme.palette.action.focus}`,
      borderRadius: '2px',
    },
    '& .MuiTypography-root': {
      padding: '1px 0px',
    },
    '& .MuiSvgIcon-root': {
      width: '16px',
      height: '16px',
    },
    '&.disabled': {
      pointerEvents: 'none',
      color: theme.palette.action.disabled,
    },
  };
});

/**
 * ActionButton component renders a button with optional end icon and handles click and keydown events.
 * @component
 * @param {ActionButtonProps} props - The properties passed to the ActionButton component.
 * @returns {JSX.Element} The rendered ActionButton component.
 */
const ActionButton: React.FC <ActionButtonProps> = ({ ...props }: ActionButtonProps) => {
  return (
    <StyledBox
      className={props.disabled ? 'disabled' : ''}
      tabIndex={props.disabled ? -1 : 0}
      onClick={props.handleClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter' && props.handleClick) {
          props.handleClick(event);
        }
      }}
      role="button"
      aria-disabled={props.disabled}
    >
      <Typography
        variant="caption"
      >
        {props.label}
      </Typography>
      {props.endIcon
        && (
          <IconCaretDown />
        )}
    </StyledBox>
  );
};

ActionButton.defaultProps = {
  label: 'Action',
  endIcon: false,
  disabled: false,
};

export default ActionButton;
