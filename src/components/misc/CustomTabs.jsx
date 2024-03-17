import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

import { tokens } from '../../theme';
import { $ } from '../../utils';

const CustomTabs = ({
  tabsData = [],
  setTabsData = () => {},
  containerStyle = {},
  tabContainerStyle = {},
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        paddingLeft: {
          xs: $({ size: 16 }),
          md: $({ size: 24 }),
        },
        margin: `0 -${$({ size: 24 })}`,
        position: 'relative',
        // width: '100%',
        // maxWidth: `calc(100% - ${$({ size: 0 })})`
        ...containerStyle,
      }}>
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: `${$({ size: 1 })}`,
          width: '100%',
          height: `${$({ size: 1 })}`,
          backgroundColor: colors.extra.grey4,
        }}
      />
      <Box
        sx={{
          'display': 'flex',
          'gap': {
            xs: $({ size: 16 }),
            md: $({ size: 24 }),
          },
          'mr': {
            xs: $({ size: 16 }),
            md: $({ size: 24 }),
          },
          'overflowX': 'scroll',
          '&::-webkit-scrollbar': { display: 'none' },
          '&::-webkit-scrollbar-thumb': { display: 'none' },
          ...tabContainerStyle,
        }}>
        {tabsData.map((item, index) => {
          return (
            <Box
              key={`tab-${index}-${item.label}`}
              onClick={() => {
                setTabsData(index);
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: `${$({ size: 12 })} ${$({ size: 0 })}`,
                pt: 0,
                position: 'relative',
              }}>
              <Typography
                sx={{
                  color: item.isSelected
                    ? colors.solids.black
                    : colors.extra.grey2,
                  fontWeight: item.isSelected ? '500' : '400',
                  fontSize: $({ size: 18 }),
                  lineHeight: $({ size: 30 }),
                  whiteSpace: 'nowrap',
                  userSelect: 'none',
                }}>
                {item.label}
              </Typography>
              {item.isSelected && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: `${$({ size: 3 })}`,
                    backgroundColor: colors.greenAccent[500],
                  }}
                />
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default CustomTabs;
