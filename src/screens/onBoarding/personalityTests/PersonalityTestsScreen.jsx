import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import { CustomButton } from '../../../components';

import {
  RightArrowIcon,
  BigFivePersonalityTestIcon,
  EmotionalIntelligenceIcon,
  ShapesIcon,
  PersonalityTestIcon,
  ThunderstormIcon,
  CheckIcon,
} from '../../../icons';

import { ASSETS } from '../../../config/assets';
import { ROUTES } from '../../../config/routes';
import { tokens } from '../../../theme';
import { $ } from '../../../utils';

const TestInfoCard = ({
  icon = <></>,
  title = '',
  description = '',
  isCompleted = false,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: $({ size: 8 }),
        borderRadius: $({ size: 16 }),
        backgroundColor: colors.greenAccent[500],
        padding: $({ size: 16 }),
        width: $({ size: 256 }),
        // maxWidth: $({ size: 320 }),
      }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Box
          sx={{
            width: $({ size: 40 }),
            height: $({ size: 40 }),
            borderRadius: $({ size: 40 }),
            backgroundColor: colors.white[800],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {icon}
        </Box>

        {isCompleted && (
          <Box
            sx={{ display: 'flex', gap: $({ size: 8 }), alignItems: 'center' }}>
            <Typography
              sx={{
                fontSize: $({ size: 13.5 }),
                fontWeight: '500',
                lineHeight: $({ size: 25 }),
                color: colors.white[800],
              }}>
              Completed
            </Typography>
            <CheckIcon />
          </Box>
        )}
      </Box>

      <Typography
        sx={{
          fontSize: $({ size: 18 }),
          fontWeight: '500',
          lineHeight: $({ size: 24 }),
          color: colors.white[800],
        }}>
        {title}
      </Typography>

      <Typography
        sx={{
          fontSize: $({ size: 13.5 }),
          fontWeight: '400',
          lineHeight: $({ size: 20 }),
          color: colors.white[800],
        }}>
        {description}
      </Typography>
    </Box>
  );
};

const PersonalityTestsScreen = () => {
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
            mt: $({ size: 8 }),
          }}>
          <Box
            component='img'
            alt='logo'
            src={ASSETS.LOGO}
            sx={{
              width: {
                xs: $({ size: 140 }),
                md: $({ size: 160 }),
              },
              alignSelf: 'flex-start',
              margin: {
                xs: `${$({ size: 32 })} 0 0 ${$({ size: 32 })}`,
                md: `${$({ size: 40 })} 0 0 ${$({ size: 40 })}`,
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
              <PersonalityTestIcon size={$({ size: 64, numeric: true })} />
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
              Personality Tests
            </Typography>

            <Typography
              sx={{
                fontSize: $({ size: 18 }),
                fontWeight: '400',
                lineHeight: $({ size: 24 }),
                textAlign: 'center',
                color: colors.solids.black,
                width: '100%',
                maxWidth: $({ size: 540 }),
                margin: `0 0 ${$({ size: 24 })} 0`,
              }}>
              Taking any of these tests and quizzes is optional and will allow
              us to personalize your experience more.
            </Typography>
          </Box>

          <Grid
            container
            sx={{
              minWidth: $({ size: 256 }),
              width: $({ size: 256 * 3 + 24 * 3 }),
              maxWidth: '100%',
              rowGap: $({ size: 24 }),
            }}>
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              sx={{ display: 'flex', justifyContent: 'center' }}>
              <TestInfoCard
                icon={
                  <BigFivePersonalityTestIcon
                    size={$({ size: 24, numeric: true })}
                  />
                }
                title='Big Five Personality Test'
                description='Assess your personality traits in five dimensions.'
                isCompleted={true}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              sx={{ display: 'flex', justifyContent: 'center' }}>
              <TestInfoCard
                icon={
                  <EmotionalIntelligenceIcon
                    size={$({ size: 24, numeric: true })}
                  />
                }
                title='Emotional Intelligence'
                description='Measure your ability to perceive and manage emotions.'
                isCompleted={false}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              sx={{ display: 'flex', justifyContent: 'center' }}>
              <TestInfoCard
                icon={
                  <ThunderstormIcon size={$({ size: 24, numeric: true })} />
                }
                title='Conflict Resolution Style'
                description='Determine your preferred approach to resolving conflicts.'
                isCompleted={false}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              sx={{ display: 'flex', justifyContent: 'center' }}>
              <TestInfoCard
                icon={<ShapesIcon size={$({ size: 24, numeric: true })} />}
                title='Values Assessment'
                description='Explore and learn about your core values.'
                isCompleted={false}
              />
            </Grid>
          </Grid>
        </Box>

        <CustomButton
          label='Continue'
          rightIcon={<RightArrowIcon />}
          sx={{
            minWidth: 'fit-content',
            width: $({ size: 210 }),
            margin: {
              xs: `0 ${$({ size: 24 })} ${$({ size: 24 })} 0`,
              lg: `0 ${$({ size: 40 })} ${$({ size: 40 })} 0`,
            },
            alignSelf: 'flex-end',
          }}
          onClick={() => {
            navigate(ROUTES.ON_BOARDING.BIG_FIVE_PERSONALITY.INTRO);
          }}
        />
      </Box>
    </Box>
  );
};

export default PersonalityTestsScreen;
