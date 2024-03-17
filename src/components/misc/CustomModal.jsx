import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

import { tokens } from '../../theme';
import { $ } from '../../utils';
import { CloseIcon } from '../../icons';

const CustomModal = ({
  title = 'Modal Title',
  onClose = () => {},
  children,
  offset = {
    top: 20,
    left: 20,
    right: 20,
  },
  containerStyle = {},
  wrapperStyle = {},
  headerContainerStyle = {},
  showBackdrop = false,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      {showBackdrop && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 800,
          }}
        />
      )}

      <Box
        id='modal'
        sx={{
          position: 'absolute',
          top: $({ size: offset.top }),
          left: $({ size: offset.left }),
          right: $({ size: offset.right }),
          bottom: offset.bottom ? $({ size: offset.bottom }) : null,
          maxWidth: `calc(100% - ${$({ size: offset.left })} - ${$({
            size: offset.right,
          })})`,
          zIndex: 1000,
          ...wrapperStyle,
        }}>
        <Box
          sx={{
            borderRadius: $({ size: 12 }),
            backgroundColor: colors.white[800],
            padding: $({ size: 24 }),
            width: '100%',
            ...containerStyle,
          }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              ...headerContainerStyle,
            }}>
            <Typography
              sx={{
                fontSize: $({ size: 31.98 }),
                fontWeight: '600',
                color: colors.extra.grey1,
                lineHeight: $({ size: 40 }),
              }}>
              {title}
            </Typography>
            <Box
              onClick={onClose}
              sx={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <CloseIcon size={$({ size: 32, numeric: true })} />
            </Box>
          </Box>
          {children}
        </Box>

        <Box sx={{ height: $({ size: 20 }) }} />
      </Box>
    </>
  );
};

export default CustomModal;
