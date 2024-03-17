import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { CheckBoxCheckedIcon, CheckBoxOutlineIcon } from '../../icons';

import { tokens } from '../../theme';
import { $ } from '../../utils';

const CustomCheckBox = ({
  isChecked = false,
  onChange = () => {},
  checkedIconSize = $({ size: 32, numeric: true }),
  checkedIconColor = null,
  uncheckedIconSize = $({ size: 32, numeric: true }),
  uncheckedIconColor = null,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      onClick={() => onChange(!isChecked)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {isChecked && (
        <CheckBoxCheckedIcon
          size={checkedIconSize}
          color={checkedIconColor || colors.solids.mainButton}
        />
      )}

      {!isChecked && (
        <CheckBoxOutlineIcon
          size={uncheckedIconSize}
          color={uncheckedIconColor || colors.extra.grey3}
        />
      )}
    </Box>
  );
};

export default CustomCheckBox;
