import React from 'react';
import { Box, Checkbox, Typography, alpha, useTheme } from '@mui/material';

import { CustomButton, CustomCheckBox } from '../../../components';

import { DownloadIcon, VisaIcon, EditIcon, MailIcon } from '../../../icons';

import { tokens } from '../../../theme';
import { $ } from '../../../utils';

import { BillingDetails, BillingHistory } from './data';

const BillingTab = ({ topSectionHeight = 0 }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [billingHistory, setBillingHistory] = React.useState(BillingHistory);

  // TO CALCULATE HEADER HEIGHT
  const headerRef = React.useRef(null);
  const [headerHeight, setHeaderHeight] = React.useState(0);

  React.useEffect(() => {
    setHeaderHeight(headerRef.current?.offsetHeight || 0);
  }, [headerRef.current?.offsetHeight]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: $({ size: 20 }),
        mt: $({ size: 20 }),
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: $({ size: 20 }),
          mt: `-${$({ size: 8 })}`,
        }}
        ref={headerRef}>
        <Box
          sx={{
            borderRadius: $({ size: 16 }),
            padding: $({ size: 24 }),
            backgroundColor: colors.greenAccent[200],
            display: 'flex',
            flexDirection: 'column',
            gap: $({ size: 20 }),
          }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: $({ size: 20 }),
            }}>
            <Typography
              sx={{
                fontSize: $({ size: 18 }),
                fontWeight: '600',
                color: colors.solids.black,
                lineHeight: $({ size: 18 }),
              }}>
              {BillingDetails.title}
            </Typography>
            <Typography
              sx={{
                fontSize: $({ size: 18 }),
                fontWeight: '500',
                color: colors.solids.black,
                lineHeight: $({ size: 18 }),
              }}>
              {BillingDetails.daysRemaining}
            </Typography>
          </Box>

          <Box
            sx={{
              borderRadius: $({ size: 8 }),
              padding: $({ size: 16 }),
              backgroundColor: colors.greenAccent[400],
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
            <Box
              sx={{
                display: 'flex',
                gap: $({ size: 16 }),
                alignItems: 'center',
              }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <VisaIcon size={$({ size: 58, numeric: true })} />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  sx={{
                    fontSize: $({ size: 13.5 }),
                    fontWeight: '500',
                    color: colors.solids.black,
                  }}>
                  {`Visa ending with ${BillingDetails.card.lastFour}`}
                </Typography>
                <Typography
                  sx={{
                    fontSize: $({ size: 13.5 }),
                    fontWeight: '400',
                    color: colors.extra.grey1,
                  }}>
                  {`Expires ${BillingDetails.card.exp}`}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: $({ size: 8 }),
                  }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <MailIcon
                      size={$({ size: 12, numeric: true })}
                      color={colors.extra.grey2}
                    />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: $({ size: 13.5 }),
                      fontWeight: '400',
                      color: colors.extra.grey1,
                    }}>
                    {BillingDetails.billingMail}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box
              onClick={() => {}}
              sx={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: $({ size: 8 }),
              }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <EditIcon
                  size={$({ size: 12, numeric: true })}
                  color={colors.extra.grey1}
                />
              </Box>
              <Typography
                sx={{
                  fontSize: $({ size: 13.5 }),
                  fontWeight: '500',
                  color: colors.solids.black,
                }}>
                Edit
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: $({ size: 20 }),
            mt: $({ size: 12 }),
          }}>
          <Typography
            sx={{
              fontSize: $({ size: 18 }),
              fontWeight: '600',
              color: colors.solids.black,
            }}>
            Billing History
          </Typography>
          <CustomButton
            label='Download All'
            rightIcon={
              <DownloadIcon
                size={$({ size: 21, numeric: true })}
                color={colors.white[900]}
              />
            }
            onClick={() => {}}
            sx={{ maxWidth: $({ size: 260 }), mr: $({ size: 16 }) }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          'display': 'flex',
          'flexDirection': 'column',
          'gap': $({ size: 16 }),
          'maxHeight': {
            xs: 'unset',
            md: `calc(100vh - ${topSectionHeight + headerHeight}px - ${$({
              numeric: true,
              // ADJUSTMENT
              size:
                60 + // TOP BAR HEIGHT
                48 + // PARENT CONTAINER TOP PADDING
                48 + // PARENT  CONTAINER BOTTOM PADDING
                36 + // WRAPPER CONTAINER TOP PADDING
                36 + // WRAPPER CONTAINER BOTTOM PADDING
                40 + // HEADER SECTION TOTAL GAP
                8,
            })}px)`,
          },
          'overflowY': 'scroll',
          '&::-webkit-scrollbar': {
            width: $({ size: 13 }),
            borderRadius: $({ size: 13 }),
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: colors.extra.grey3,
            borderRadius: $({ size: 13 }),
          },
          'pr': {
            xs: 0,
            md: $({ size: 18 }),
          },
          'mr': `-${$({ size: 14 })}`,
        }}>
        {billingHistory.map((item, index) => {
          return (
            <Box
              key={index}
              sx={{
                borderRadius: $({ size: 16 }),
                backgroundColor: colors.extra.grey5,
                padding: $({ size: 16 }),
                display: 'flex',
                justifyContent: 'space-between',
                mt: `-${$({ size: 4 })}`,
              }}>
              <Box
                sx={{
                  display: 'flex',
                  gap: $({ size: 12 }),
                  alignItems: 'flex-start',
                }}>
                <CustomCheckBox
                  isChecked={item.isSelected}
                  checkedIconSize={$({ size: 16, numeric: true })}
                  uncheckedIconSize={$({ size: 16, numeric: true })}
                  onChange={() => {
                    const newBillingHistory = [...billingHistory];
                    newBillingHistory[index].isSelected =
                      !newBillingHistory[index].isSelected;
                    setBillingHistory(newBillingHistory);
                  }}
                  // sx={{
                  //   'color': colors.extra.grey2,
                  //   'padding': '0',
                  //   '&.Mui-checked': { color: colors.extra.grey2 },
                  //   '&:hover': { backgroundColor: 'transparent' },
                  // }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    sx={{
                      fontSize: $({ size: 13.5 }),
                      fontWeight: '600',
                      color: colors.extra.grey1,
                    }}>
                    {`${item.title} - ${item.amount}`}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: $({ size: 13.5 }),
                      fontWeight: '400',
                      color: colors.extra.grey1,
                    }}>
                    {item.date}
                  </Typography>
                </Box>
              </Box>
              <CustomButton
                label='Download'
                rightIcon={
                  <DownloadIcon
                    size={$({ size: 13, numeric: true })}
                    color={colors.white[900]}
                  />
                }
                onClick={() => {}}
                sx={{
                  'backgroundColor': colors.extra.grey1,
                  'color': colors.white[900],
                  'fontSize': $({ size: 13.5 }),
                  'fontWeight': '600',
                  'width': 'fit-content',
                  'padding': `${$({ size: 4 })} ${$({ size: 17 })}`,
                  'gap': $({ size: 12 }),
                  '&:hover': {
                    backgroundColor: alpha(colors.extra.grey1, 0.8),
                  },
                  'height': 'fit-content',
                  'alignSelf': 'center',
                }}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default BillingTab;
