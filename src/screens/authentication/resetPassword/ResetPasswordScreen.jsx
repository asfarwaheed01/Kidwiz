import React from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import { CustomTextInput, CustomButton } from '../../../components';

import { ASSETS } from '../../../config/assets';
import { tokens } from '../../../theme';
import { $ } from '../../../utils';
import { RESET_USER_PASSWORD } from '../../../config/backend_endpoints';

const ResetPasswordScreen = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [email, setEmail] = React.useState('');

  const sendEmail = async (email) => {
    try {
      const response = await axios.post(RESET_USER_PASSWORD, {
        email: email,
      });
      console.log('Response from API:', response.data);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: colors.grey[900],
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.white[800],
          boxShadow: `0 0 ${$({ size: 8 })} 0 ${alpha(
            colors.solids.black,
            0.25
          )}`,
          borderRadius: $({ size: 24 }),
          padding: {
            xs: `${$({ size: 48 })} ${$({ size: 32 })}`,
            lg: `${$({ size: 80 })}`,
          },
          minWidth: $({ size: 600 }),
          minHeight: $({ size: 564 }),
          gap: $({ size: 48 }),
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: {
              xs: $({ size: 24 }),
              lg: $({ size: 80 }),
            },
          }}>
          <img
            src={ASSETS.LOGO}
            alt='logo'
            style={{
              height: $({ size: 65 }),
              // width: $({ size: 231 }),
              paddingRight: $({ size: 16 }),
              marginTop: `-${$({ size: 4 })}`,
            }}
          />
          <Typography
            sx={{
              fontSize: $({ size: 31.98 }),
              fontWeight: '600',
              lineHeight: $({ size: 40 }),
              textAlign: 'center',
              color: colors.solids.black,
              mt: `-${$({ size: 8 })}`,
              mb: `-${$({ size: 8 })}`,
            }}>
            Recover your password
          </Typography>
        </Box>

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: $({ size: 48 }),
          }}>
          <CustomTextInput
            label='Email address'
            placeholder='you@email.com'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            labelStyle={{ pb: $({ size: 2 }) }}
          />
          <CustomButton
            label='Reset Password'
            onClick={() => sendEmail(email)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPasswordScreen;
