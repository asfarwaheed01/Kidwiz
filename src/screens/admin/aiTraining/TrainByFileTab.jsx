import React from 'react';
import { Box, useTheme, Typography } from '@mui/material';

import { CustomFileUploader } from '../../../components';

import { tokens } from '../../../theme';
import { $ } from '../../../utils';

const TrainByFileTab = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [trainingFile, setTrainingFile] = React.useState(null);

  return (
    <Box>
      <CustomFileUploader
        label='Training File'
        placeholder={
          trainingFile?.file
            ? trainingFile.file?.name
            : 'Upload a file to train the AI model'
        }
        accept='text/csv, text/plain'
        onClick={(file) => {
          setTrainingFile(file);
        }}
        placeholderStyle={{
          maxWidth: $({ size: 500 }),
        }}
      />

      <Typography
        sx={{
          fontSize: $({ size: 10.5 }),
          color: colors.extra.grey1,
          fontWeight: '400',
          mt: $({ size: 6 }),
        }}>
        File size must be less than 200 MB. Check guidelines for best results.
      </Typography>
    </Box>
  );
};

export default TrainByFileTab;
