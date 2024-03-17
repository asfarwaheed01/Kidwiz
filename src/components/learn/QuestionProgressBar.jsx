import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { tokens } from '../../theme';
import { $ } from '../../utils';

const QuestionProgressBar = ({
  totalQuestions = 10,
  currentQuestion = 1,
  showQuestionNumber = true,
  progressBarStyle = {},
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ width: '100%' }}>
      {showQuestionNumber && (
        <Typography
          sx={{
            color: colors.extra.grey1,
            fontSize: $({ size: 18 }),
            fontWeight: '500',
            lineHeight: $({ size: 30 }),
          }}>
          Question {currentQuestion} of {totalQuestions}
        </Typography>
      )}
      <LinearProgress
        variant='determinate'
        value={(currentQuestion / totalQuestions) * 100}
        sx={{
          'height': $({ size: 8 }),
          'borderRadius': $({ size: 66 }),
          'backgroundColor': colors.extra.grey4,
          '& .MuiLinearProgress-bar': {
            borderRadius: $({ size: 66 }),
            backgroundColor: colors.greenAccent[500],
          },
          ...progressBarStyle,
        }}
      />
    </Box>
  );
};

export default QuestionProgressBar;
