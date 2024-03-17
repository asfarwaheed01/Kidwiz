import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { tokens } from '../../theme';
import { $ } from '../../utils';

const MainContainer = ({ children }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        padding: $({ size: 24 }),
        backgroundColor: colors.white[900],
        borderRadius: $({ size: 12 }),
        boxShadow: `0 0 ${$({ size: 4 })} 0 rgba(0,0,0,0.20)`,
      }}>
      {children}
    </Box>
  );
};

export default MainContainer;
