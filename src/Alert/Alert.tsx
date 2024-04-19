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
import MuiAlert, { AlertProps as MuiAlertProps } from '@mui/material/Alert';
import WarningIcon from '@hcl-software/enchanted-icons/dist/carbon/es/warning--alt';
import ErrorIcon from '@hcl-software/enchanted-icons/dist/carbon/es/warning';
import InformationIcon from '@hcl-software/enchanted-icons/dist/carbon/es/information';
import SuccessIcon from '@hcl-software/enchanted-icons/dist/carbon/es/checkmark--outline';
import { Components, Theme } from '@mui/material';
import { TYPOGRAPHY } from '../theme';

declare module '@mui/material/Alert' {
  interface AlertPropsVariantOverrides {
    contained: true;
  }
}

export enum AlertVariants {
  CONTAINED = 'contained',
  OUTLINED = 'outlined',
}

export enum AlertSeverity {
  WARNING = 'warning',
  SUCCESS = 'success',
  ERROR = 'error',
  INFORMATION = 'info',
}

export const getMuiAlertThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          return ({
            '&.MuiPaper-root': {
              flexDirection: 'row',
              boxShadow: theme.shadows[0],
              padding: '4px 8px',
              alignItems: 'flex-start',
            },
            borderRadius: '4px',
            border: '1px solid',
            minHeight: '28px',
            '& .MuiAlert-icon': {
              fontSize: '16px',
              width: '20px',
              display: 'flex',
              justifyContent: 'center',
              padding: '2px',
            },
            '& .MuiAlert-message': {
              ...TYPOGRAPHY.body2,
              marginRight: '8px',
              padding: '2px 0px 0px 0px',
            },
            '& .MuiTypography-root .MuiAlertTitle-root': {
              ...TYPOGRAPHY.body2,
            },
            '& .MuiAlert-action': {
              padding: '0',
              marginRight: '3px',
              marginBottom: '-1px',
              marginTop: '-1px',
            },
            '& .MuiButtonBase-root-MuiIconButton-root': {
              fontSize: '16px',
            },
            '& .MuiButtonBase-root-MuiIconButton-root .MuiSvgIcon-root': {
              fontSize: '16px',
            },
            '& .MuiSvgIcon-root': {
              fontSize: '16px',
            },
            ...(ownerState.variant === 'outlined' && {
              backgroundColor: theme.palette.background.paper,
            }),
            ...(ownerState.severity === 'warning' && {
              border: `1px solid ${theme.palette.warning.main}`,
              '&.MuiAlert-root .MuiAlert-message': {
                color: theme.palette.warning.main,
              },
              '&.MuiAlert-root .MuiAlert-icon': {
                marginRight: '8px',
                color: theme.palette.warning.main,
              },
              '&.MuiAlert-containedWarning': {
                color: theme.palette.warning.main,
                ...(ownerState.variant === 'contained' && {
                  backgroundColor: theme.palette.background.warning,
                }),
              },
              '& .MuiAlert-action .MuiButtonBase-root': {
                color: theme.palette.warning.main,
              },
            }),
            ...(ownerState.severity === 'success' && {
              border: `1px solid ${theme.palette.success.main}`,
              '&.MuiAlert-root .MuiAlert-message': {
                color: theme.palette.success.main,
              },
              '&.MuiAlert-root .MuiAlert-icon': {
                marginRight: '8px',
                color: theme.palette.success.main,
              },
              '&.MuiAlert-containedSuccess': {
                color: theme.palette.success.main,
                ...(ownerState.variant === 'contained' && {
                  backgroundColor: theme.palette.background.success,
                }),
              },
              '& .MuiAlert-action .MuiButtonBase-root': {
                color: theme.palette.success.main,
              },
            }),
            ...(ownerState.severity === 'error' && {
              border: `1px solid ${theme.palette.error.main}`,
              '&.MuiAlert-root .MuiAlert-message': {
                color: theme.palette.error.main,
              },
              '&.MuiAlert-root .MuiAlert-icon': {
                marginRight: '8px',
                color: theme.palette.error.main,
              },
              '&.MuiAlert-containedError': {
                color: theme.palette.error.main,
                ...(ownerState.variant === 'contained' && {
                  backgroundColor: theme.palette.background.error,
                }),
              },
              '& .MuiAlert-action .MuiButtonBase-root': {
                color: theme.palette.error.main,
              },
            }),
            ...(ownerState.severity === 'info' && {
              border: `1px solid ${theme.palette.info.main}`,
              '&.MuiAlert-root .MuiAlert-message': {
                color: theme.palette.info.main,
              },
              '&.MuiAlert-root .MuiAlert-icon': {
                marginRight: '8px',
                color: theme.palette.info.main,
              },
              '&.MuiAlert-containedInfo': {
                color: theme.palette.info.main,
                ...(ownerState.variant === 'contained' && {
                  backgroundColor: theme.palette.background.info,
                }),
              },
              '& .MuiAlert-action .MuiButtonBase-root': {
                color: theme.palette.info.main,
              },
            }),
          });
        },
      },
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            background: 'inherit',
          },
        },
      ],
    },
  };
};

export type AlertProps = Omit<MuiAlertProps, 'elevation' | 'square'> & {message: string, width: number};

const Alert = ({ ...props }: AlertProps) => {
  return (
    <MuiAlert
      iconMapping={{
        ...props.iconMapping,
        success: <SuccessIcon />,
        warning: <WarningIcon />,
        info: <ErrorIcon />,
        error: <InformationIcon />,
      }}
      variant={props.variant}
      {...props}
    />
  );
};

const defaultProps: AlertProps = {
  message: 'Alert message',
  width: 240,
};

Alert.defaultProps = defaultProps;

export * from '@mui/material/Alert';
export default Alert;
