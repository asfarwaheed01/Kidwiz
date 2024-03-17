import React from 'react';
import { Switch, useTheme } from '@mui/material';

import { tokens } from '../../theme';
import { $ } from '../../utils';

const CustomToggleSwitch = ({ checked = true, onChange = () => {} }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Switch
      checked={checked}
      onChange={onChange}
      disableRipple
      disableFocusRipple
      disableTouchRipple
      sx={{
        'width': $({ size: 80 }),
        'height': $({ size: 40 }),
        'padding': 0,
        '& .MuiSwitch-switchBase': {
          'padding': `${$({ size: 4 })}`,
          'transitionDuration': '300ms',
          '&.Mui-checked': {
            'width': $({ size: 80 }),
            'height': $({ size: 40 }),
            'color': colors.solids.white,
            'transform': `translateX(${$({ size: 20 })})`,
            '& + .MuiSwitch-track': {
              backgroundColor: colors.solids.mainButton,
              opacity: 1,
              border: 0,
            },
            '.MuiSwitch-thumb': {
              backgroundColor: colors.solids.white,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.5,
            },
          },
        },
        '& .MuiSwitch-thumb': {
          boxSizing: 'border-box',
          width: $({ size: 32 }),
          height: $({ size: 32 }),
          borderRadius: $({ size: 80 }),
          color: colors.extra.grey2,
          boxShadow: 'none',
        },
        '& .MuiSwitch-track': {
          borderRadius: $({ size: 80 }),
          backgroundColor: colors.extra.grey4,
          opacity: 1,
          transition: {
            duration: 500,
          },
        },
      }}
    />
  );
};

export default CustomToggleSwitch;
