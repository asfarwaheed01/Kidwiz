import React from 'react';
import { Box, Button } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

import { tokens } from '../../theme';
import { $ } from '../../utils';

const CustomButton = ({
  label = 'Label',
  onClick = () => {},
  sx = {},
  leftIcon = null,
  rightIcon = null,
  leftIconSx = {},
  rightIconSx = {},
  disabled = false,
  isSecondary = false,
  innerRef = null,
  loading = false,
  loadingColor = '#ffffff',
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Button
      ref={innerRef}
      onClick={onClick}
      disabled={disabled}
      sx={{
        'backgroundColor': isSecondary
          ? colors.white[800]
          : colors.greenAccent[500],
        'borderRadius': $({ size: 100 }),
        'color': isSecondary ? colors.solids.black : colors.white[900],
        'lineHeight': $({ size: 30 }),
        'fontSize': $({ size: 18 }),
        'fontWeight': '700',
        'width': '100%',
        'padding': `${$({ size: 12 })} ${$({ size: 32 })}`,
        'boxShadow': `0 0 ${$({ size: 4 })} 0 ${alpha(
          colors.solids.black,
          0.25
        )}`,
        'gap': $({ size: 14 }),
        '&:hover': {
          backgroundColor: alpha(
            isSecondary ? colors.white[800] : colors.greenAccent[500],
            0.8
          ),
        },
        ...sx,
      }}>
      {leftIcon && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...leftIconSx,
          }}>
          {leftIcon}
        </Box>
      )}
      {label}
      {rightIcon && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...rightIconSx,
          }}>
          {rightIcon}
        </Box>
      )}

        {loading && <CircularProgress
            size={24}
            sx={{
              color: {loadingColor},
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />}

    </Button>
  );
};

export default CustomButton;
