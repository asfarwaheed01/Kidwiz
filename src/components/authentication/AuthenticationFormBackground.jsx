import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { ASSETS } from './../../config/assets';
import { tokens } from './../../theme';
import { $ } from '../../utils';

const AuthenticationFormBackground = ({ children, title, sx = {} }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const baseStyles = {
    height: '100%',
    width: '99%',
    borderRadius: `0 ${$({ size: 40 })} ${$({ size: 40 })} 0`,
  };

  return (
    <Box
      sx={{
        ...baseStyles,
        backgroundColor: '#F5AEDD',
        width: '100%',
        maxWidth: $({ size: 650 }),
      }}>
      <Box sx={{ ...baseStyles, backgroundColor: '#C0ACF4' }}>
        <Box sx={{ ...baseStyles, backgroundColor: '#82D6EC' }}>
          <Box sx={{ ...baseStyles, backgroundColor: '#CFEB87' }}>
            <Box sx={{ ...baseStyles, backgroundColor: '#F1F182' }}>
              <Box sx={{ ...baseStyles, backgroundColor: '#F5BF82' }}>
                <Box sx={{ ...baseStyles, backgroundColor: '#E89791' }}>
                  <Box
                    sx={{ ...baseStyles, backgroundColor: colors.white[800] }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <img
                        src={ASSETS.LOGO}
                        alt='logo'
                        style={{
                          height: $({ size: 65 }),
                          marginTop: $({ size: 40 }),
                          marginBottom: $({ size: 40 }),
                        }}
                      />
                    </Box>
                    <Typography
                      sx={{
                        fontSize: $({ size: 31.98 }),
                        fontWeight: '600',
                        textAlign: 'center',
                        lineHeight: $({ size: 40 }),
                        color: colors.solids.black,
                        mt: `-${$({ size: 6 })}`,
                      }}>
                      {title}
                    </Typography>
                    <Box
                      sx={{
                        margin: {
                          xs: `0 ${$({ size: 30 })}`,
                          lg: `0 ${$({ size: 64 })}`,
                        },
                        ...sx,
                      }}>
                      {children}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthenticationFormBackground;
