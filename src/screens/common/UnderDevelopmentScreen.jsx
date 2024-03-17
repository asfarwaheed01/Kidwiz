import { Box, Typography } from '@mui/material';

import { MainContainer } from '../../components';

const UnderDevelopmentScreen = () => {
  return (
    <MainContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}>
        <Typography variant='h1'>Under Development</Typography>
      </Box>
    </MainContainer>
  );
};

export default UnderDevelopmentScreen;
