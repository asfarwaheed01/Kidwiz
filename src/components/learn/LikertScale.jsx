import React from 'react';
import { Box, Typography, Slider } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { tokens } from '../../theme';
import { $ } from '../../utils';

const LikertScale = ({ value, onChange, max = 4, defaultValue = 2 }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: $({ size: 24 }),
      }}>
      <Typography
        sx={{
          fontWeight: '600',
          fontSize: $({ size: 13.5 }),
          lineHeight: $({ size: 25 }),
          color: colors.extra.grey1,
        }}>
        Disagree
      </Typography>

      <Slider
        value={value}
        onChange={onChange}
        sx={{
          'width': '100%',
          'boxShadow': 'none',
          '& .MuiSlider-thumb': {
            'width': $({ size: 16 }),
            'height': $({ size: 24 }),
            'backgroundColor': colors.likertScale.thumb,
            'border': 'none',
            'borderRadius': $({ size: 30 }),
            'boxShadow': 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
          '& .MuiSlider-track': {
            height: $({ size: 16 }),
            borderRadius: $({ size: 66 }),
            border: 'none',
            backgroundColor: colors.likertScale.left,
          },
          '& .MuiSlider-rail': {
            height: $({ size: 16 }),
            borderRadius: $({ size: 66 }),
            border: 'none',
            backgroundColor: colors.likertScale.right,
          },
          ...Array(max + 1)
            .fill()
            .map((_, i) => ({
              [`& .MuiSlider-mark[data-index="${i}"]`]:
                i === 0 || i === max
                  ? { display: 'none' }
                  : {
                      height: $({ size: 16 }),
                      width: $({ size: 1 }),
                      backgroundColor: colors.likertScale.mark,
                      borderRadius: '0',
                    },
            }))
            .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
        }}
        defaultValue={defaultValue}
        step={1}
        min={0}
        max={max}
        marks
      />

      <Typography
        sx={{
          fontWeight: '600',
          fontSize: $({ size: 13.5 }),
          lineHeight: $({ size: 25 }),
          color: colors.extra.grey1,
        }}>
        Agree
      </Typography>
    </Box>
  );
};

export default LikertScale;
