import React from 'react';
import { Box, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import {
  CustomButton,
  QuestionProgressBar,
  LikertScale,
} from '../../../components';

import { RightArrowIcon, ThunderstormIcon } from '../../../icons';

import { ASSETS } from '../../../config/assets';
import { ROUTES } from '../../../config/routes';
import { tokens } from '../../../theme';
import { $ } from '../../../utils';

const ConflictResolutionStyleTestQuestionsScreen = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  React.useEffect(() => {
    const _ = Array(10)
      .fill('This is a question ')
      .map((question, i) => `${question} ${i + 1}.`);
    setQuestions(_);
  }, []);

  const [questions, setQuestions] = React.useState([]);
  const [answers, setAnswers] = React.useState([]);

  const [currentQuestion, setCurrentQuestion] = React.useState(1);
  const [likertScaleValue, setLikertScaleValue] = React.useState(2);

  const HandleNext = () => {
    setAnswers([...answers, likertScaleValue]);
    setCurrentQuestion(currentQuestion + 1);
    setLikertScaleValue(2);
  };

  const HandleSubmit = () => {
    setAnswers([...answers, likertScaleValue]);
    navigate(ROUTES.ON_BOARDING.CONFLICT_RESOLUTION_STYLE.RESULT);
  };

  return (
    <Box
      sx={{
        backgroundColor: colors.grey[900],
        height: 'max-content',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: {
          xs: $({ size: 20 }),
          lg: $({ size: 40 }),
        },
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: colors.white[800],
          boxShadow: `0 0 ${$({ size: 8 })} 0 ${alpha(
            colors.solids.black,
            0.25
          )}`,
          width: '100%',
          borderRadius: $({ size: 12 }),
          flexGrow: 1,
          gap: $({ size: 24 }),
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            gap: $({ size: 8 }),
            marginBottom: $({ size: 40 }),
          }}>
          <Box
            component='img'
            alt='logo'
            src={ASSETS.LOGO}
            sx={{
              width: {
                xs: $({ size: 140 }),
                lg: $({ size: 160 }),
              },
              alignSelf: 'flex-start',
              margin: {
                xs: `${$({ size: 32 })} 0 0 ${$({ size: 32 })}`,
                lg: `${$({ size: 40 })} 0 0 ${$({ size: 40 })}`,
              },
            }}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: {
                xs: $({ size: 24 }),
                lg: 0,
              },
              padding: {
                xs: `0 ${$({ size: 24 })}`,
                lg: 0,
              },
            }}>
            <Box
              sx={{
                borderRadius: $({ size: 160 }),
                backgroundColor: colors.extra.iconBackground,
                padding: {
                  xs: $({ size: 24 }),
                  lg: $({ size: 48 }),
                },
                width: {
                  xs: $({ size: 140 }),
                  lg: $({ size: 160 }),
                },
                height: {
                  xs: $({ size: 140 }),
                  lg: $({ size: 160 }),
                },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ThunderstormIcon size={$({ size: 64, numeric: true })} />
            </Box>

            <Typography
              sx={{
                fontSize: $({ size: 32 }),
                fontWeight: '600',
                lineHeight: $({ size: 40 }),
                textAlign: 'center',
                color: colors.grey[200],
                margin: `${$({ size: 16 })} 0`,
              }}>
              Conflict Resolution Style
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              maxWidth: $({ size: 450 }),
              gap: {
                xs: $({ size: 16 }),
                lg: $({ size: 24 }),
              },
              padding: {
                xs: `0 ${$({ size: 24 })}`,
                lg: 0,
              },
            }}>
            <QuestionProgressBar
              totalQuestions={questions.length}
              currentQuestion={currentQuestion}
            />

            <Typography
              sx={{
                fontSize: $({ size: 18 }),
                fontWeight: '400',
                lineHeight: $({ size: 30 }),
                color: colors.extra.grey1,
                alignSelf: 'flex-start',
              }}>
              {questions[currentQuestion - 1]}
            </Typography>

            <LikertScale
              max={4}
              value={likertScaleValue}
              onChange={(e, value) => setLikertScaleValue(value)}
            />

            <CustomButton
              onClick={
                questions.length === currentQuestion ? HandleSubmit : HandleNext
              }
              label={questions.length === currentQuestion ? 'Submit' : 'Next'}
              sx={{
                maxWidth: $({ size: 175 }),
                alignSelf: 'flex-end',
                marginTop: $({ size: 16 }),
              }}
              rightIcon={
                <RightArrowIcon size={$({ size: 24, numeric: true })} />
              }
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ConflictResolutionStyleTestQuestionsScreen;
