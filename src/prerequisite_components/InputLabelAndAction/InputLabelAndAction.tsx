/* ======================================================================== *
 * Copyright 2026 HCL America Inc.                                          *
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
import { styled, Theme, SvgIconProps } from '@mui/material';
import Tooltip, { TooltipPlacement } from '../../Tooltip';
import ActionButton from '../../ActionButton';

export interface ActionProps {
  href?: string,
  label: string,
  endIcon?: boolean,
  handleClick?(event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>): void,
  disabled?: boolean,
  tooltip?: string,
}

export interface InputLabelAndActionProps extends MuiInputLabelProps {
  actionProps?: ActionProps[];
  helperIconTooltip?: string;
  tooltipPlacement?: TooltipPlacement;
  hiddenLabel?: boolean;
  label?: ReactNode | string;
  isFocus?: boolean;
  fullWidth?: boolean;
  enableHelpHoverEffect?: boolean;
  customIcon?: React.ComponentType<SvgIconProps>;
}

export const labelFocus = styled('div')((theme) => {
  // if the textbox is focused then the label should get styled with the primary theme color
  return {
    '.MuiAutocomplete--label--focused': {
      color: theme.theme.palette.primary.main,
    },
  };
});

export const MuiInputHelpIcon = styled(HelpIcon, {
  // Prevent `enableHelpHoverEffect` from being passed to the DOM
  shouldForwardProp: (prop) => { return prop !== 'enableHelpHoverEffect'; },
})<{ enableHelpHoverEffect?: boolean }>(({ theme, enableHelpHoverEffect }) => {
  return {
    ...theme.typography.subtitle2,
    marginLeft: '8px',
    marginBottom: '-4px',
    fontSize: '16px',
    ...(enableHelpHoverEffect && {
      ':hover': {
        borderRadius: '10px',
        backgroundColor: theme.palette.grey[200],
      },
    }),
  };
});

const styledCustomIcon = (Icon: React.ComponentType<SvgIconProps>) => {
  return <Icon sx={{ marginLeft: '8px', marginBottom: '-4px', fontSize: '16px' }} color="action" fontSize="small" />;
};

export const StyledInputLabel = styled(MuiInputLabel)((theme) => {
  return {
    ...theme.theme.typography.subtitle2,
    color: theme.theme.palette.text.secondary,
    margin: '0px',
    pointerEvents: 'inherit',
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    transform: 'none',
  };
});

const getMuiInputLabelProps = (props: InputLabelAndActionProps): MuiInputLabelProps => {
  const inputLabelProps: MuiInputLabelProps = {
    color: props.color,
    disabled: props.disabled,
    error: props.error,
    required: props.required,
    sx: props.sx,
    htmlFor: props.htmlFor,
    id: props.id,
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
      {props.helperIconTooltip ? (
        <Tooltip
          title={props.helperIconTooltip}
          placement={props.tooltipPlacement || TooltipPlacement.BOTTOM}
        >
          <span>
            {props.customIcon ? styledCustomIcon(props.customIcon) : <MuiInputHelpIcon color="action" fontSize="small" tabIndex={0} enableHelpHoverEffect={props.enableHelpHoverEffect} />}
          </span>
        </Tooltip>
      ) : (
        ''
      )}
    </>
  );
};

export const MuiGrid = styled(Grid)<MuiGridProps>((theme) => {
  return {
    '&.MuiGrid-container': {
      margin: '0px 0px 4px 0px',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    },
    '&.MuiGrid-item': {
      padding: 0,
    },
  };
});

export const StyledSpan = styled('span')((theme) => {
  return {
    display: 'inline-block',
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
              // eslint-why index is not the sole key definition, it is prefixed by other identifiers
              // eslint-disable-next-line react/no-array-index-key
              <Tooltip title={actionProp.tooltip} tooltipsize="small" placement="bottom" key={`${actionProp.label}-${index}`}>
                <StyledSpan>
                  <ActionButton
                    label={actionProp.label}
                    endIcon={actionProp.endIcon}
                    disabled={actionProp.disabled || props.disabled}
                    href={actionProp.href}
                    handleClick={actionProp.handleClick}
                  />
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
