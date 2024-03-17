import React from 'react';
import { Box, useTheme, alpha } from '@mui/material';

import { CustomTextInput, CustomButton } from '../../../components';

import { SaveIcon } from '../../../icons';

import { tokens } from '../../../theme';
import { $ } from '../../../utils';

const TrainByScrapeURLTab = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [scrapeURL, setScrapeURL] = React.useState('');

  return (
    <Box
      sx={{
        maxWidth: $({ size: 500 }),
        display: 'flex',
        flexDirection: 'column',
        gap: $({ size: 24 }),
      }}>
      <CustomTextInput
        label='Training Scrape URL'
        placeholder='www.example.com'
        value={scrapeURL}
        onChange={(e) => {
          setScrapeURL(e.target.value);
        }}
      />

      <CustomButton
        label='Save'
        sx={{
          boxShadow: `0 0 ${$({ size: 4 })} 0 ${alpha(
            colors.solids.black,
            0.25
          )}`,
        }}
        rightIcon={<SaveIcon size={$({ size: 24, numeric: true })} />}
        onClick={() => {}}
      />
    </Box>
  );
};

export default TrainByScrapeURLTab;
