import React from 'react';
import { Box, Breadcrumbs, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import { HomeIcon } from '../../icons';
import { tokens } from '../../theme';
import { $ } from '../../utils';

const Separator = ({ color = '#72B316', content = '>' }) => {
  return (
    <Typography
      sx={{
        fontSize: $({ size: 15 }),
        fontWeight: '400',
        lineHeight: $({ size: 25 }),
        color: color,
      }}>
      {content}
    </Typography>
  );
};

const CustomBreadcrumbs = ({ data = [], sx = {}, showHome = true }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  return (
    <Breadcrumbs
      aria-label='breadcrumb'
      separator={null}
      sx={{ ...sx }}>
      <Box
        sx={{
          display: 'flex',
          cursor: 'pointer',
          flexDirection: 'row',
          alignItems: 'center',
          gap: $({ size: 8 }),
        }}>
        {data.map((item, index) => {
          return (
            <Box
              key={item.path}
              sx={{
                display: 'flex',
                cursor: 'pointer',
                flexDirection: 'row',
                alignItems: 'center',
                gap: $({ size: 8 }),
              }}>
              {showHome && index === 0 && (
                <HomeIcon size={$({ size: 14, numeric: true })} />
              )}
              {index > 0 && <Separator color={colors.extra.grey2} />}
              <Typography
                onClick={() => {
                  if (data.length === 1 || data.length === index + 1) return;
                  navigate(item.path);
                  console.log(item.path);
                }}
                sx={{
                  fontSize: $({ size: 13.5 }),
                  fontWeight: '400',
                  // lineHeight: $({ size: 25 }),
                  color: colors.extra.grey2,
                }}>
                {`${item.title.replace(/\b\w/g, (l) => l.toUpperCase())}`}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;
