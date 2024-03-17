import React from 'react';
import { Box, Typography, alpha, useTheme } from '@mui/material';

import { CustomButton } from '../../../components';

import { CheckIcon, DownArrowIcon, SaveIcon, TickIcon } from '../../../icons';

import { tokens } from '../../../theme';
import { $ } from '../../../utils';

const PlanTab = ({ topSectionHeight = 0 }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedPlan, setSelectedPlan] = React.useState({
    isBasic: false,
    isPro: true,
    isPremium: false,
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: $({ size: 20 }),
        flex: 1,
        mt: $({ size: 20 }),
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          gap: $({ size: 20 }),
        }}>
        {[
          {
            id: 1,
            title: 'Basic Plan',
            price: '$79',
            duration: '/mo.',
            introLine: 'This tier includes access to:',
            details: [
              'Access to our AI-Powered Personalized Learning Companion',
              'Daily personalized lesson plans and activities',
              'Basic progress tracking',
              'Math, Science, Biology, English, Social Studies',
              'Math, Science, Biology, English, Social Studies',
            ],
            primaryColor: colors.solids.orange,
            secondaryColor: colors.solids.orangeBright,
            isSelected: selectedPlan.isBasic,
          },
          {
            id: 2,
            title: 'Pro Plan',
            price: '$109',
            duration: '/mo.',
            introLine: 'Everything in the Basic plan, plus:',
            details: [
              'Comprehensive progress tracking',
              'In-app parent support and resources',
              'Big 5 Personality Test with Specific Niche Parental Training',
              'Music, Languages, Coding, Life Skills, Money',
              '2 Children’s Profiles',
            ],
            primaryColor: colors.solids.green,
            secondaryColor: colors.solids.mainButton,
            isSelected: selectedPlan.isPro,
          },
          {
            id: 3,
            title: 'Premium Plan',
            price: '$249',
            duration: '/mo.',
            introLine: 'Everything in the Pro plan, plus:',
            details: [
              'Monthly one-on-one virtual sessions with a certified educator',
              'Priority access to new features and content',
              'Emotional Intelligence, Critical Thinking, Innovation, and more',
              '3 Children’s Profiles',
            ],
            primaryColor: colors.solids.purple,
            secondaryColor: colors.solids.purpleBright,
            isSelected: selectedPlan.isPremium,
          },
        ].map((item, index) => {
          return (
            <Box
              key={`plan-tab-${index}`}
              sx={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                borderRadius: $({ size: 16 }),
                overflow: 'hidden',
                border: `${$({ size: 2 })} solid ${item.primaryColor}`,
              }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: $({ size: 16 }),
                  justifyContent: 'space-between',
                  backgroundColor: item.primaryColor,
                  padding: `${$({ size: 12 })} ${$({ size: 24 })}`,
                }}>
                <Typography
                  sx={{
                    fontSize: $({ size: 18 }),
                    fontWeight: '600',
                    lineHeight: $({ size: 30 }),
                    color: colors.solids.black,
                  }}>
                  {item.title}
                </Typography>

                <Box
                  onClick={() => {
                    setSelectedPlan({
                      isBasic: item.id === 1,
                      isPro: item.id === 2,
                      isPremium: item.id === 3,
                    });
                  }}
                  sx={{
                    width: $({ size: 30 }),
                    height: $({ size: 30 }),
                    borderRadius: $({ size: 30 }),
                    backgroundColor: item.isSelected
                      ? 'transparent'
                      : item.primaryColor,
                    border: item.isSelected
                      ? 'none'
                      : `${$({ size: 4 })} solid ${item.secondaryColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}>
                  {item.isSelected && (
                    <CheckIcon
                      size={$({ size: 30, numeric: true })}
                      color={item.secondaryColor}
                    />
                  )}
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: $({ size: 16 }),
                  padding: $({ size: 22 }),
                }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <Typography
                    sx={{
                      fontSize: $({ size: 31.98 }),
                      fontWeight: '600',
                      lineHeight: $({ size: 31.98 }),
                      color: colors.solids.black,
                      display: 'inline',
                    }}>
                    {item.price}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: $({ size: 18 }),
                      fontWeight: '400',
                      lineHeight: $({ size: 30 }),
                      color: colors.solids.black,
                      display: 'inline',
                    }}>
                    {item.duration}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontSize: $({ size: 13.5 }),
                    fontWeight: '400',
                    lineHeight: $({ size: 14 }),
                    color: colors.solids.black,
                  }}>
                  {item.introLine}
                </Typography>

                {item.details.map((detail, index) => {
                  return (
                    <Box
                      key={`${item.title}-detail-${index}`}
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: $({ size: 8 }),
                      }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <TickIcon
                          size={$({ size: 13, numeric: true })}
                          color={item.secondaryColor}
                        />
                      </Box>
                      <Typography
                        sx={{
                          fontSize: $({ size: 13.5 }),
                          fontWeight: '400',
                          lineHeight: $({ size: 14 }),
                          color: colors.solids.black,
                        }}>
                        {detail}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          );
        })}
      </Box>

      <Box sx={{ flex: 1 }} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          alignItems: 'center',
          gap: $({ size: 20 }),
          justifyContent: 'space-between',
        }}>
        <CustomButton
          onClick={() => {}}
          label={'Downgrade Plan'}
          sx={{
            'maxWidth': {
              xs: '100%',
              md: $({ size: 288 }),
            },
            'backgroundColor': colors.extra.grey1,
            'color': colors.white[900],
            '&:hover': {
              backgroundColor: alpha(colors.extra.grey1, 0.8),
            },
          }}
          rightIcon={
            <DownArrowIcon
              size={$({ size: 24, numeric: true })}
              color={colors.white[900]}
            />
          }
        />

        <CustomButton
          onClick={() => {}}
          label={'Save Changes'}
          sx={{
            maxWidth: {
              xs: '100%',
              md: $({ size: 288 }),
            },
          }}
          rightIcon={
            <SaveIcon
              size={$({ size: 24, numeric: true })}
              color={colors.white[900]}
            />
          }
        />
      </Box>
    </Box>
  );
};

export default PlanTab;
