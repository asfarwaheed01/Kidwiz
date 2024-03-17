import React from 'react';
import { Box, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import { CustomButton, VerticalFiller } from '../../../components';

import { RightArrowIcon, BigFivePersonalityTestIcon } from '../../../icons';

import { ASSETS } from '../../../config/assets';
import { ROUTES } from '../../../config/routes';
import { tokens } from '../../../theme';
import { $ } from '../../../utils';

const BigFivePersonalityTestResultScreen = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: colors.grey[900],
        height: 'max-content',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: {
          xs: $({ size: 20 }),
          lg: $({ size: 40 }),
        },
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: colors.white[800],
          boxShadow: `0 0 ${$({ size: 8 })} 0 ${alpha(
            colors.solids.black,
            0.25
          )}`,
          width: '100%',
          borderRadius: $({ size: 12 }),
          flexGrow: 1,
          gap: $({ size: 24 }),
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            gap: $({ size: 8 }),
            marginBottom: $({ size: 12 }),
          }}>
          <Box
            component='img'
            alt='logo'
            src={ASSETS.LOGO}
            sx={{
              width: {
                xs: $({ size: 140 }),
                lg: $({ size: 160 }),
              },
              alignSelf: 'flex-start',
              margin: {
                xs: `${$({ size: 32 })} 0 0 ${$({ size: 32 })}`,
                lg: `${$({ size: 40 })} 0 0 ${$({ size: 40 })}`,
              },
            }}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: {
                xs: $({ size: 24 }),
                lg: 0,
              },
              padding: {
                xs: `0 ${$({ size: 24 })}`,
                lg: 0,
              },
            }}>
            <Box
              sx={{
                borderRadius: $({ size: 160 }),
                backgroundColor: colors.extra.iconBackground,
                padding: {
                  xs: $({ size: 24 }),
                  lg: $({ size: 48 }),
                },
                width: {
                  xs: $({ size: 140 }),
                  lg: $({ size: 160 }),
                },
                height: {
                  xs: $({ size: 140 }),
                  lg: $({ size: 160 }),
                },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <BigFivePersonalityTestIcon
                size={$({ size: 64, numeric: true })}
              />
            </Box>

            <Typography
              sx={{
                fontSize: $({ size: 32 }),
                fontWeight: '600',
                lineHeight: $({ size: 40 }),
                textAlign: 'center',
                color: colors.grey[200],
                margin: `${$({ size: 16 })} 0`,
              }}>
              Big Five Personality Test
            </Typography>

            <Typography
              sx={{
                fontSize: $({ size: 32 }),
                fontWeight: '600',
                lineHeight: $({ size: 40 }),
                textAlign: 'center',
                color: colors.grey[200],
                margin: `${$({ size: 16 })} 0`,
              }}>
              Your Result
            </Typography>
          </Box>

          <Box
            sx={{
              'maxWidth': $({ size: 768 }),
              'overflowX': 'scroll',
              'overflowY': 'hidden',
              'width': {
                xs: `calc(100% - ${$({ size: 48 })})`,
                lg: '100%',
              },
              '&::-webkit-scrollbar': {
                height: $({ size: 6 }),
                borderRadius: $({ size: 6 }),
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: colors.extra.grey4,
                borderRadius: $({ size: 6 }),
              },
            }}>
            <VerticalFiller
              data={[
                {
                  label: 'Openness',
                  value: 0.76,
                  color: colors.verticalFiller[100],
                },
                {
                  label: 'Conscientiousness',
                  value: 0.49,
                  color: colors.verticalFiller[200],
                },
                {
                  label: 'Extraversion',
                  value: 0.81,
                  color: colors.verticalFiller[300],
                },
                {
                  label: 'Agreeableness',
                  value: 0.81,
                  color: colors.verticalFiller[400],
                },
                {
                  label: 'Neuroticism',
                  value: 0.94,
                  color: colors.verticalFiller[500],
                },
              ]}
            />
          </Box>
        </Box>

        <CustomButton
          label='Continue'
          rightIcon={<RightArrowIcon size={$({ size: 24, numeric: true })} />}
          sx={{
            width: 'fit-content',
            margin: {
              xs: `0 ${$({ size: 24 })} ${$({ size: 24 })} 0`,
              lg: `0 ${$({ size: 40 })} ${$({ size: 40 })} 0`,
            },
            alignSelf: 'flex-end',
          }}
          onClick={() => {
            navigate(ROUTES.ON_BOARDING.EMOTIONAL_INTELLIGENCE.INTRO);
          }}
        />
      </Box>
    </Box>
  );
};

export default BigFivePersonalityTestResultScreen;
