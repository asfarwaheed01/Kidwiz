import React from 'react';
import { Box, Grid } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import { tokens } from '../../theme';
import { $ } from '../../utils';

const DashboardContainer = ({
  children,
  containerStyle = {},
  gridStyle = {},
  wrapperStyle = {},
  disableContainer = false,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        'backgroundColor': colors.grey[900],
        'width': '100%',
        'height': '100%',
        'padding': {
          xs: $({ size: 16 }),
          md: $({ size: 24 }),
        },
        // 'overflowY': 'scroll',
        // '&::-webkit-scrollbar': {
        //   width: $({ size: 12 }),
        //   borderRadius: $({ size: 12 }),
        // },
        // '&::-webkit-scrollbar-thumb': {
        //   backgroundColor: colors.extra.grey3,
        //   borderRadius: $({ size: 12 }),
        // },
        ...wrapperStyle,
      }}>
      {disableContainer && children}

      {!disableContainer && (
        <Grid
          container
          sx={{
            'height': 'max-content',
            'minHeight': '100%',
            'display': 'flex',
            'flexDirection': 'column',
            '&::-webkit-scrollbar': {
              width: $({ size: 12 }),
              borderRadius: $({ size: 12 }),
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: colors.extra.grey3,
              borderRadius: $({ size: 12 }),
            },
            ...gridStyle,
          }}>
          <Box
            sx={{
              'display': 'flex',
              'flexDirection': 'column',
              'backgroundColor': colors.white[800],
              'boxShadow': `0 0 ${$({ size: 2 })} 0 ${alpha(
                colors.solids.black,
                0.25
              )}`,
              'width': '100%',
              'borderRadius': $({ size: 12 }),
              'height': '100%',
              'padding': {
                xs: $({ size: 24 }),
                md: $({ size: 40 }),
              },
              'gap': {
                xs: $({ size: 24 }),
                md: $({ size: 40 }),
              },
              'flex': '1',
              // '&::-webkit-scrollbar': {
              //   width: $({ size: 12 }),
              //   borderRadius: $({ size: 12 }),
              // },
              // '&::-webkit-scrollbar-thumb': {
              //   backgroundColor: colors.extra.grey3,
              //   borderRadius: $({ size: 12 }),
              // },
              // ...containerStyle,
            }}>
            {children}
          </Box>
        </Grid>
      )}
    </Box>
  );
};

export default DashboardContainer;

/**
    <DashboardContainer
    wrapperStyle={{ overflowY: 'hidden' }}
    gridStyle={{ overflowY: 'hidden', height: '100%' }}
    containerStyle={{ height: '100%', overflowY: 'scroll'}}>
    </DashboardContainer>
 */
