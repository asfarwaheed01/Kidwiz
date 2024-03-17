import React from 'react';
import { Box, Typography, InputBase } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { alpha, useTheme } from '@mui/material/styles';

import { tokens } from '../../theme';
import { $ } from '../../utils';

const CustomLabel = ({ label = 'Label', labelStyle = {} }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Typography
      sx={{
        fontSize: $({ size: 18 }),
        fontWeight: '500',
        color: colors.solids.black,
        lineHeight: $({ size: 30 }),
        paddingBottom: $({ size: 8 }),
        ...labelStyle,
      }}>
      {label}
    </Typography>
  );
};

const CustomTextInput = ({
  value = '',
  label = 'Label',
  placeholder = '',
  error = '',
  type = 'text',
  disabled = false,
  showLoading = false,
  multiline = false,
  onChange = () => {},
  onEnter = () => {},
  onKeyUp = () => {},
  onKeyDown=()=>{},
  containerStyle = {},
  labelStyle = {},
  inputContainerStyle = {},
  inputStyle = {},
  errorStyle = {},
  leftIcon = null,
  rightIcon = null,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        userSelect: 'none',
        ...containerStyle,
      }}>
      {label && (
        <Typography
          sx={{
            fontSize: $({ size: 18 }),
            fontWeight: '500',
            color: colors.solids.black,
            lineHeight: $({ size: 30 }),
            paddingBottom: $({ size: 8 }),
            ...labelStyle,
          }}>
          {label}
        </Typography>
      )}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: colors.grey[900],
          boxShadow: `inset 0 0 ${$({ size: 3 })} ${alpha(
            colors.solids.black,
            0.3
          )}`,
          padding: `${$({ size: 9 })} ${$({ size: 24 })}`,
          borderRadius: $({ size: 16 }),
          gap: $({ size: 12 }),
          width: '100%',
          ...inputContainerStyle,
        }}>

          { showLoading && 
            <CircularProgress
              size={50}
              sx={{
                color: colors.solids.green,
                position: 'relative',
                top: '0%',
                left: '50%',
                // marginTop: '-12px',
                // marginLeft: '-12px',
              }}
            />
          }


        {leftIcon}
        <InputBase
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          type={type}
          multiline={multiline}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              onEnter();
              return;
            }
            onKeyUp();
          }}
          onKeyDown={onKeyDown}
          sx={{
            'fontSize': $({ size: 18 }),
            'fontWeight': '400',
            'color': colors.extra.grey1,
            'lineHeight': $({ size: 30 }),
            'width': '100%',
            '&::placeholder': {
              color: colors.extra.grey3,
              opacity: 0.7,
              ...inputStyle?.['&::placeholder'],
            },
            'display': 'flex',
            'alignItems': 'start',
            ...inputStyle,
          }}
        />
        {rightIcon}
      </Box>

      {error && (
        <Typography
          sx={{
            fontSize: $({ size: 16 }),
            fontWeight: '400',
            color: colors.redAccent[500],
            lineHeight: $({ size: 30 }),
            paddingTop: $({ size: 4 }),
            ...errorStyle,
          }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default CustomTextInput;
export { CustomLabel };
