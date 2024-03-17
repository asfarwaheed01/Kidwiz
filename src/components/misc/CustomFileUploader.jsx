import React from 'react';
import { Box, Typography, alpha, useTheme } from '@mui/material';

import { CustomLabel } from './CustomTextInput';

import { UploadIcon } from '../../icons';

import { tokens } from '../../theme';
import { $ } from '../../utils';

const CustomFileUploader = ({
  label = 'Label',
  placeholder = 'Placeholder',
  error = '',
  onClick = () => {},
  accept = 'image/*',
  labelStyle = {},
  inputStyle = {},
  placeholderStyle = {},
  errorStyle = {},
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const inputRef = React.useRef(null);

  return (
    <Box>
      <input
        style={{ display: 'none' }}
        ref={inputRef}
        type='file'
        onChange={(e) => {
          const file = e.target?.files[0];
          if (!file) return;
          // console.log(file);
          onClick({
            file: file,
            src: URL.createObjectURL(file),
          });
          inputRef.current.value = null;
        }}
        accept={accept}
      />

      <CustomLabel
        label={label}
        labelStyle={labelStyle}
      />
      <Box
        onClick={() => inputRef.current.click()}
        sx={{
          borderRadius: $({ size: 12 }),
          background: colors.extra.grey5,
          boxShadow: `inset 0 0 ${$({ size: 2 })} ${alpha(
            colors.solids.black,
            0.25
          )}`,
          padding: `${$({ size: 12 })} ${$({ size: 24 })}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          cursor: 'pointer',
          gap: $({ size: 12 }),
          ...placeholderStyle,
        }}>
        <Typography
          sx={{
            fontSize: $({ size: 18 }),
            fontWeight: '400',
            color: colors.extra.grey1,
            lineHeight: $({ size: 30 }),
            width: '100%',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            ...inputStyle,
          }}>
          {placeholder}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <UploadIcon size={$({ size: 24, numeric: true })} />
        </Box>
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

export default CustomFileUploader;
