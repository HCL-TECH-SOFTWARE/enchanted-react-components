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
import React, { ReactNode } from 'react';
import MuiInputLabel, { InputLabelProps as MuiInputLabelProps } from '@mui/material/InputLabel';
import Grid, { GridProps as MuiGridProps } from '@mui/material/Grid';
import HelpIcon from '@hcl-software/enchanted-icons/dist/carbon/es/help';
import { styled, Theme } from '@mui/material';
import Tooltip from '../../Tooltip';
import Link, { LinkProps } from '../../Link';

export interface ActionProps {
  href: string,
  label: string,
  handleClick?: React.MouseEventHandler<HTMLAnchorElement>,
  disabled?: boolean,
  tooltip?: string,
}

export interface InputLabelAndActionProps extends MuiInputLabelProps {
  actionProps?: ActionProps[];
  helperIconTooltip?: string;
  hiddenLabel?: boolean;
  label?: ReactNode;
  isFocus?: boolean;
  fullWidth?: boolean;
}

export const labelFocus = styled('div')((theme) => {
  // if the textbox is focused then the label should get styled with the primary theme color
  return {
    '.MuiAutocomplete--label--focused': {
      color: theme.theme.palette.primary.main,
    },
  };
});

export const MuiInputHelpIcon = styled(HelpIcon)((theme) => {
  return {
    ...theme.theme.typography.subtitle2,
    marginLeft: '8px',
    marginBottom: '-4px',
    fontSize: '16px',
  };
});

export const StyledInputLabel = styled(MuiInputLabel)((theme) => {
  return {
    ...theme.theme.typography.subtitle2,
    color: theme.theme.palette.text.secondary,
    margin: '0px 0px 4px 0px',
    pointerEvents: 'inherit',
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    transform: 'none',
  };
});

const getMuiInputLabelProps = (props: InputLabelAndActionProps): MuiInputLabelProps => {
  const inputLabelId = props.label && props.id ? `${props.id}-label` : undefined;
  const inputLabelProps: MuiInputLabelProps = {
    color: props.color,
    disabled: props.disabled,
    error: props.error,
    required: props.required,
    sx: props.sx,
    htmlFor: props.id,
    id: inputLabelId,
  };
  return inputLabelProps;
};

const renderInputLabel = (props: InputLabelAndActionProps) => {
  const muiInputLabelProps = getMuiInputLabelProps(props);
  // Below class name attribute is used only label get its color property primary when there is no error state enabled
  if (props.hiddenLabel) {
    return undefined;
  }
  return (
    <>
      <StyledInputLabel
        className={props.isFocus && !props.error ? 'MuiAutocomplete--label--focused' : ' '}
        {...muiInputLabelProps}
        sx={(theme: Theme) => {
          return {
            ...(props.fullWidth !== true && props.actionProps && props.actionProps.length >= 1) && {
              whiteSpace: 'pre-wrap', // takes care of a very long but highly unlikely label - overrides MUI default nowrap
              wordBreak: 'break-word',
              maxWidth: '120px', // half of default 240px
            },
          };
        }}
      >
        {props.label}
      </StyledInputLabel>
      {props.helperIconTooltip ? <Tooltip title={props.helperIconTooltip}><MuiInputHelpIcon color="action" fontSize="small" /></Tooltip> : ''}
    </>
  );
};

export const MuiGrid = styled(Grid)<MuiGridProps>((theme) => {
  return {
    '&.MuiGrid-container': {
      margin: '0px',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    },
    '&.MuiGrid-item': {
      padding: 0,
    },
  };
});

export const MuiInputActionLink = styled(Link)<LinkProps>((theme) => {
  return {
    ...theme.theme.typography.caption,
    textAlign: 'right',
    display: 'block',
    padding: 0,
    border: 'none',
    lineHeight: '11px',
    '&[disabled]': {
      border: 'none',
    },
    ':focus': {
      border: 0,
      fontWeight: 600,
    },
    ':hover': {
      cursor: 'pointer',
    },
    float: 'right',
    ':not(:first-of-type)': {
      borderLeft: `1px solid ${theme.theme.palette.border.secondary}`,
      padding: '0 4px', // 4px padding between action link and border divider for multiple action links
    },
  };
});

export const StyledSpan = styled('span')<LinkProps>((theme) => {
  return {
    display: 'inline-block',
    marginTop: '6px',
    marginBottom: '4px',
    paddingRight: '4px', // 4px padding between action link and border divider for multiple action links
    ':not(:first-of-type)': {
      borderLeft: `1px solid ${theme.theme.palette.border.secondary}`,
      padding: '0 4px', // 4px padding between action link and border divider for multiple action links
    },
  };
});

const renderInputLabelAndAction = (props: InputLabelAndActionProps) => {
  if (props.actionProps) {
    // To-Do: max 2 actions props for now, pending Figma design for many types of Action Links as discussed with UIUX
    const limitedActionProps = props.actionProps.slice(0, 2);

    return (
      <MuiGrid container spacing={2}>
        <MuiGrid
          item
          sx={(theme: Theme) => {
            return {
              [theme.breakpoints.up('md')]: {
                flexBasis: 'auto',
                maxWidth: 'unset',
              },
              [theme.breakpoints.down('md')]: {
                flexBasis: 'auto',
                maxWidth: 'unset',
              },
            };
          }}
        >
          {renderInputLabel(props)}
        </MuiGrid>
        <MuiGrid
          item
          sx={(theme: Theme) => {
            return {
              [theme.breakpoints.up('md')]: {
                flexBasis: 'auto',
                maxWidth: 'unset',
              },
              [theme.breakpoints.down('md')]: {
                flexBasis: 'auto',
                maxWidth: 'unset',
              },
            };
          }}
        >
          { limitedActionProps && limitedActionProps.map((actionProp, index) => {
            return (
              <Tooltip title={actionProp.tooltip} placement="bottom">
                <StyledSpan>
                  <MuiInputActionLink
                    disabled={actionProp.disabled || props.disabled}
                    href={actionProp.href}
                    onClick={actionProp.handleClick}
                    underline="none"
                    sx={{ display: 'inline' }}
                  // eslint-why index is not the sole key definition, it is prefixed by other identifiers
                  // eslint-disable-next-line react/no-array-index-key
                    key={`${actionProp.label}-${index}`}
                  >
                    {actionProp.label}
                  </MuiInputActionLink>
                </StyledSpan>
              </Tooltip>
            );
          })}
        </MuiGrid>
      </MuiGrid>
    );
  }
  return (
    <MuiGrid container>
      <MuiGrid item xs={12}>
        {renderInputLabel(props)}
      </MuiGrid>
    </MuiGrid>
  );
};

const InputLabelAndAction: React.FC <InputLabelAndActionProps> = ({ ...props }: InputLabelAndActionProps) => {
  return (
    <>
      {renderInputLabelAndAction(props)}
    </>
  );
};

InputLabelAndAction.defaultProps = {
};

export default InputLabelAndAction;
