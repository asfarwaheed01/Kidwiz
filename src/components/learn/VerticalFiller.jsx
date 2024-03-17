import React from 'react';
import { Box, Slider, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { tokens } from '../../theme';
import { $ } from '../../utils';

const VerticalFillerItem = ({
  label = '',
  value = 0,
  color = '',
  labelStyle = {},
  height = $({ size: 200 }),
  space = 0,
  labelGap = $({ size: 20 }),
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: labelGap,
      }}>
      <Box
        sx={{
          width: $({ size: 64 }),
          height: height,
          borderRadius: $({ size: 100 }),
          backgroundColor: colors.extra.grey4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          overflow: 'hidden',
          position: 'relative',
          mr: space,
        }}>
        <Slider
          disabled
          orientation='vertical'
          sx={{
            'overflow': 'hidden',
            'width': $({ size: 70 }),
            'height': height,
            'borderRadius': $({ size: 100 }),
            'backgroundColor': colors.extra.grey4,
            '& .MuiSlider-track': { backgroundColor: color, border: 'none' },
            '& .MuiSlider-rail': {
              backgroundColor: colors.extra.grey4,
              border: 'none',
            },
            '& .MuiSlider-thumb': { display: 'none' },
            '& .MuiSlider-valueLabel': { display: 'none' },
            '& .MuiSlider-mark': { display: 'none' },
            '& .MuiSlider-markLabel': { display: 'none' },
            '& .MuiSlider-markLabelActive': { display: 'none' },
          }}
          max={1}
          min={0}
          value={value}
        />

        <Typography
          sx={{
            fontWeight: '700',
            fontSize: $({ size: 18 }),
            lineHeight: $({ size: 30 }),
            color: colors.extra.grey1,
            position: 'absolute',
            bottom: '0',
            paddingBottom: `${value * 100}%`,
            ...(!(value * 100 > 0 || value > 0) && { top: '50%' }),
          }}>
          {value * 100 > 0 || value > 0
            ? `${(value * 100).toFixed(0)}%`
            : 'N/A'}
        </Typography>
      </Box>

      <Typography
        sx={{
          fontWeight: '600',
          fontSize: $({ size: 13.5 }),
          lineHeight: $({ size: 16 }),
          color: colors.extra.grey1,
          textAlign: 'center',
          maxWidth: $({ size: 90 }),
          ...labelStyle,
        }}>
        {label}
      </Typography>
    </Box>
  );
};

const VerticalFiller = ({ data = [], sx = {} }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        gap: {
          xs: $({ size: 24 }),
          lg: $({ size: 36 }),
        },
        padding: {
          xs: $({ size: 24 }),
          lg: 0,
        },
        cursor: 'pointer',
        ...sx,
      }}>
      {data.map((item, index) => {
        return (
          <VerticalFillerItem
            key={index}
            label={item.label}
            value={item.value}
            color={item.color}
            labelStyle={item.labelStyle}
            height={item.height}
            space={item.space}
            labelGap={item.labelGap}
          />
        );
      })}
    </Box>
  );
};

export default VerticalFiller;
