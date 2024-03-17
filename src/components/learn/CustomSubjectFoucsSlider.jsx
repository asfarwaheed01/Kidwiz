import React from 'react';
import { Box, Typography, Slider, useTheme } from '@mui/material';

import { tokens } from '../../theme';
import { $, DarkenHexColor } from '../../utils';

const CustomSubjectFoucsSlider = ({
  label = 'Subject Focus',
  color = '#BDEE77',
  value = 50,
  onChange = () => {},
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none',
        gap: $({ size: 8 }),
      }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: $({ size: 8 }) }}>
        <Box
          sx={{
            width: $({ size: 24 }),
            height: $({ size: 24 }),
            borderRadius: $({ size: 4 }),
            backgroundColor: color,
          }}
        />
        <Typography
          sx={{
            fontSize: $({ size: 13.5 }),
            fontWeight: '500',
            color: colors.extra.grey1,
            lineHeight: $({ size: 14 }),
          }}>
          {label}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: $({ size: 12 }),
          height: $({ size: 20 }),
        }}>
        <Slider
          value={value}
          onChange={onChange}
          defaultValue={50}
          step={1}
          min={1}
          max={100}
          sx={{
            'width': '100%',
            'boxShadow': 'none',
            'padding': 6,
            '& .MuiSlider-thumb': {
              'width': $({ size: 20 }),
              'height': $({ size: 20 }),
              'backgroundColor': DarkenHexColor({ hex: color, percentage: 15 }),
              'border': 'none',
              'borderRadius': $({ size: 20 }),
              'boxShadow': 'none',
              'zIndex': 1,
              '&:hover': { boxShadow: 'none' },
              '&:focus': { boxShadow: 'none' },
              '&::before': { boxShadow: 'none' },
            },
            '& .MuiSlider-track': {
              height: $({ size: 8 }),
              borderRadius: $({ size: 66 }),
              border: 'none',
              backgroundColor: color,
            },
            '& .MuiSlider-rail': {
              height: $({ size: 8 }),
              borderRadius: $({ size: 66 }),
              border: 'none',
              backgroundColor: colors.extra.grey4,
            },
          }}
        />
        <Typography
          sx={{
            fontSize: $({ size: 13.5 }),
            fontWeight: '600',
            color: colors.extra.grey1,
            lineHeight: $({ size: 14 }),
            width: '100%',
            maxWidth: $({ size: 28 }),
            textAlign: 'right',
          }}>{`${value.toFixed(0)}%`}</Typography>
      </Box>
    </Box>
  );
};

export default CustomSubjectFoucsSlider;
