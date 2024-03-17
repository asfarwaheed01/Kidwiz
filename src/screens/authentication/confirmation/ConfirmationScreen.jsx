import React from 'react';
import { Box, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import { useAppContext } from '../../../context/appContext';

import { CustomButton } from '../../../components';

import { ASSETS } from '../../../config/assets';
import { ROUTES } from '../../../config/routes';
import { tokens } from '../../../theme';
import { $ } from '../../../utils';

const ConfirmationScreen = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  const { user } = useAppContext();

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
            lg: $({ size: 80 }),
          },
          pt: {
            xs: $({ size: 95 }),
            lg: $({ size: 95 }),
          },
          margin: `${$({ size: 16 })}`,
          minWidth: $({ size: 600 }),
          minHeight: $({ size: 564 }),
          gap: $({ size: 68 }),
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: {
              xs: $({ size: 24 }),
              lg: $({ size: 48 }),
            },
          }}>
          <img
            src={ASSETS.AUTHENTICATION.ICONS.CONFIRMATION_LIKE}
            alt='logo'
            style={{
              height: $({ size: 200 }),
              // marginTop: `-${$({ size: 36 })}`,
            }}
          />
          <Typography
            sx={{
              fontSize: $({ size: 18 }),
              fontWeight: '500',
              lineHeight: $({ size: 30 }),
              textAlign: 'center',
              color: colors.solids.black,
              mt: `-${$({ size: 8 })}`,
              mb: `-${$({ size: 8 })}`,
            }}>
            Your account was successfully created.
          </Typography>
        </Box>

        <CustomButton
          label= {user.no_of_chlid === 0 ? 'Let\'s Complete Onboarding' : 'Go to Home Page'}
          onClick={() => {
            if( user.no_of_chlid === 0){
              navigate(ROUTES.ON_BOARDING.ADD_CHILDREN);
            }else if( user.no_of_chlid > 0){
              navigate(ROUTES.PARENT.DASHBOARD.INDEX);
            }
            
          }}
        />
      </Box>
    </Box>
  );
};

export default ConfirmationScreen;
