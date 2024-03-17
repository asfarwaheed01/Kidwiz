import React from 'react';
import { Box, Typography, alpha, useTheme } from '@mui/material';

import { NotificationsIcon } from '../../../icons';

import { tokens } from '../../../theme';
import { $ } from '../../../utils';

const NotificationsTopBar = ({
  data = [],
  isToggled = false,
  setIsToggled = () => {},
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        onClick={setIsToggled}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          borderRadius: $({ size: 8 }),
          backgroundColor: isToggled
            ? alpha(colors.extra.grey3, 0.12)
            : 'transparent',
          padding: $({ size: 10 }),
        }}>
        <NotificationsIcon
          size={$({ size: 24, numeric: true })}
          color={colors.extra.grey3}
        />
      </Box>

      {isToggled && (
        <Box
          sx={{
            'boxShadow': `0 0 ${$({ size: 2 })} 0 ${alpha(
              colors.solids.black,
              0.25
            )}`,
            'position': 'absolute',
            'top': $({ size: 56 }),
            'right': 0,
            'zIndex': 10,
            'backgroundColor': colors.white[800],
            'borderRadius': $({ size: 8 }),
            'width': $({ size: 280 }),
            'maxHeight': $({ size: 400 }),
            'overflowY': 'scroll',
            '&::-webkit-scrollbar': {
              width: $({ size: 6 }),
              borderRadius: $({ size: 6 }),
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: colors.extra.grey3,
              borderRadius: $({ size: 6 }),
            },
            'userSelect': 'none',
          }}>
          <Typography
            sx={{
              fontSize: $({ size: 18 }),
              fontWeight: '500',
              color: colors.extra.grey2,
              padding: $({ size: 16 }),
              pb: $({ size: 4 }),
            }}>
            Notifications
          </Typography>

          {data.length === 0 && (
            <Typography
              sx={{
                fontSize: $({ size: 13.5 }),
                fontWeight: '400',
                color: colors.extra.grey2,
                padding: $({ size: 16 }),
                textAlign: 'center',
              }}>
              No Notifications Found!
            </Typography>
          )}

          {data.map((notification, index) => {
            return (
              <Box
                key={`notification-${index}`}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: $({ size: 4 }),
                  padding: `${$({ size: 12 })} ${$({ size: 16 })}`,
                  borderBottom:
                    index !== data.length - 1 &&
                    `${$({ size: 1 })} solid ${colors.extra.grey4}`,
                  backgroundColor: notification.isUnread
                    ? alpha(colors.solids.green, 0.15)
                    : 'transparent',
                  cursor: 'pointer',
                }}>
                <Typography
                  sx={{
                    fontSize: $({ size: 13.5 }),
                    fontWeight: '500',
                    color: colors.solids.black,
                    lineHeight: $({ size: 18 }),
                  }}>
                  {notification.text}
                </Typography>
                <Typography
                  sx={{
                    fontSize: $({ size: 13.5 }),
                    fontWeight: '400',
                    color: colors.extra.grey2,
                    lineHeight: $({ size: 13.5 }),
                  }}>
                  {notification.time}
                </Typography>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default NotificationsTopBar;
