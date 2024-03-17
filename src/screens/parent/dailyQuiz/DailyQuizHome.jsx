import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';


import { useAppContext } from '../../../context/appContext';


import {
  CustomButton,
  DashboardContainer,
  QuestionProgressBar,
} from '../../../components';

import { RightArrowIcon } from '../../../icons';

import { ROUTES } from '../../../config/routes';
import { tokens } from '../../../theme';
import { $ } from '../../../utils';
import { GET_ALL_QUIZ } from '../../../config/backend_endpoints';

const DailyQuizHome = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const { authorizedAxios } = useAppContext();


  const [loadingDailyQuiz, setLoadingDailyQuiz] = useState(false);

  React.useEffect(() => {
  
    loadDailQuiz(authorizedAxios, setQuestions, setLoadingDailyQuiz, setSubjectAndQuiz);
  }, []);

  const [subjectAndQuiz, setSubjectAndQuiz] = useState({
    subject: "",
    quizId: ''
  });
  const [questions, setQuestions] = React.useState([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(1);

  const [answers, setAnswers] = React.useState([]);
  const [currentAnswer, setCurrentAnswer] = React.useState(0);

  const [isChecked, setIsChecked] = React.useState(false);
  const [isCorrect, setIsCorrect] = React.useState(false);

  const CorrectOptionStyles = React.useMemo(() => {
    return {
      'border': `${$({ size: 3 })} solid ${colors.greenAccent[500]}`,
      'backgroundColor': colors.greenAccent[400],
      '&:hover': {
        backgroundColor: colors.greenAccent[400],
      },
    };
  }, [colors.greenAccent]);

  const IncorrectOptionStyles = React.useMemo(() => {
    return {
      'border': `${$({ size: 3 })} solid ${colors.redAccent[300]}`,
      'backgroundColor': colors.redAccent[800],
      '&:hover': {
        backgroundColor: colors.redAccent[800],
      },
    };
  }, [colors.redAccent]);

  const HandleOptionSelection = (option) => {
    if (isChecked) return;
    setCurrentAnswer(option);
    // console.log(questions[currentQuestion-1].options[option - 1]);
    // console.log(questions[currentQuestion-1].answer);
      if (questions[currentQuestion-1].options[option - 1] === questions[currentQuestion-1].answer) {
        setIsCorrect(true);
      }else {
        setIsCorrect(false);
      }
    setIsChecked(true);
  };

  const HandleNext = () => {
    if (currentQuestion === -1) return;
    if (currentAnswer === 0) return;

    setCurrentAnswer(0);
    setAnswers([...answers, currentAnswer]);
    setIsChecked(false);
    setCurrentQuestion(currentQuestion + 1);
  };

  const HandleSubmit = () => {
    if (currentQuestion === -1) return;

    
    // setCurrentAnswer(0);
    setAnswers([...answers, currentAnswer]);
    // setIsChecked(false);
    // setCurrentQuestion(-1);
    navigate(ROUTES.PARENT.DAILY_QUIZ.RESULT, {
      state: {
        questions,
        answers:[...answers, currentAnswer],
        subjectAndQuiz,
      }
    })
  };

  return (
    <DashboardContainer
      wrapperStyle={{
        padding: {
          xs: $({ size: 20 }),
          md: $({ size: 48 }),
        },
        pr: {
          xs: $({ size: 20 }),
          md: $({ size: 48 }),
        },
        overflow: 'hidden',
      }}
      containerStyle={{
        gap: {
          xs: $({ size: 20 }),
          md: $({ size: 16 }),
        },
      }}>

        {loadingDailyQuiz && 

          <Box sx={{
            // position:'relative',
            // height: '100%',
            // display: 'flex',
            // alignContent:'center',
            // alignItems:'center',
            // padding:'20%',
          }}>
            <Typography
              sx={{
                fontSize: $({ size: 18 }),
                fontWeight: '400',
                color: colors.extra.grey1,
              }}>
              Loading your Daily Quiz...!
              </Typography>

              <CircularProgress
                      size={50}
                      sx={{
                        color: colors.solids.green,
                        position: 'relative',
                        top: '50%',
                        left: '50%',
                        // marginTop: '-12px',
                        marginLeft: '-12px',
                      }}
                    />

          </Box>
          
        }

      { !loadingDailyQuiz && (
      
        <>
        <Box
          sx={{
            mt: `-${$({ size: 8 })}`,
          }}>
          <Typography
            sx={{
              fontSize: $({ size: 31.98 }),
              fontWeight: '600',
              color: colors.extra.grey1,
              display: 'inline',
            }}>
            {`Daily Quiz: `}
          </Typography>
          <Typography
            sx={{
              fontSize: $({ size: 31.98 }),
              fontWeight: '600',
              color: colors.greenAccent[600],
              display: 'inline',
            }}>
            {`Animals and Their Habitats`}
          </Typography>
        </Box>

        <QuestionProgressBar
          totalQuestions={questions.length}
          currentQuestion={
            currentQuestion === -1 ? questions.length : currentQuestion
          }
        />
        <Typography
          sx={{
            fontSize: $({ size: 18 }),
            fontWeight: '400',
            color: colors.extra.grey1,
          }}>
          {questions?.[currentQuestion - 1]?.question}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: {
              xs: $({ size: 20 }),
              sm: $({ size: 24 }),
              md: $({ size: 32 }),
            },
            mt: $({ size: 20 }),
          }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                md: 'row',
              },
              gap: {
                xs: $({ size: 20 }),
                sm: $({ size: 30 }),
                md: $({ size: 40 }),
              },
            }}>
            <CustomButton
              onClick={() => HandleOptionSelection(1)}
              label={questions?.[currentQuestion - 1]?.options?.[0]}
              isSecondary={true}
              sx={{
                ...(isChecked &&
                  currentAnswer === 1 &&
                  (isCorrect ? CorrectOptionStyles : IncorrectOptionStyles)),
              }}
            />
            <CustomButton
              onClick={() => HandleOptionSelection(2)}
              label={questions?.[currentQuestion - 1]?.options?.[1]}
              isSecondary={true}
              sx={{
                ...(isChecked &&
                  currentAnswer === 2 &&
                  (isCorrect ? CorrectOptionStyles : IncorrectOptionStyles)),
              }}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                md: 'row',
              },
              gap: {
                xs: $({ size: 20 }),
                sm: $({ size: 30 }),
                md: $({ size: 40 }),
              },
            }}>
            <CustomButton
              onClick={() => HandleOptionSelection(3)}
              label={questions?.[currentQuestion - 1]?.options?.[2]}
              isSecondary={true}
              sx={{
                ...(isChecked &&
                  currentAnswer === 3 &&
                  (isCorrect ? CorrectOptionStyles : IncorrectOptionStyles)),
              }}
            />
            <CustomButton
              onClick={() => HandleOptionSelection(4)}
              label={questions?.[currentQuestion - 1]?.options?.[3]}
              isSecondary={true}
              sx={{
                ...(isChecked &&
                  currentAnswer === 4 &&
                  (isCorrect ? CorrectOptionStyles : IncorrectOptionStyles)),
              }}
            />
          </Box>
        </Box>

        {isChecked && (
          <Box>
            {isCorrect ? (
              <Typography
                sx={{
                  fontSize: $({ size: 18 }),
                  fontWeight: '700',
                  color: colors.greenAccent[500],
                }}>
                Correct!
              </Typography>
            ) : (
              <Typography
                sx={{
                  fontSize: $({ size: 18 }),
                  fontWeight: '700',
                  color: colors.redAccent[500],
                }}>
                False!
              </Typography>
            )}

            <Typography
              sx={{
                fontSize: $({ size: 18 }),
                fontWeight: '400',
                color: colors.extra.grey1,
              }}>
              {isCorrect ? (
                <>Yes, Your Answer Is Correct!</>
              ) : (
                <>No, Your Answer Is Incorrect!</>
              )}
            </Typography>
          </Box>
        )}

        <Box sx={{ flex: 1 }} />

        <CustomButton
          onClick={
            questions.length === currentQuestion ? HandleSubmit : HandleNext
          }
          label={questions.length === currentQuestion ? 'Submit' : 'Next'}
          sx={{
            maxWidth: $({ size: 175 }),
            alignSelf: 'flex-end',
          }}
          rightIcon={<RightArrowIcon size={$({ size: 24, numeric: true })} />}
        />

</>
      )
        }

    </DashboardContainer>
  );
};

export default DailyQuizHome;


const loadDailQuiz = async (authorizedAxios, setQuestions, setLoadingDailyQuiz, setSubjectAndQuiz) => {
  setLoadingDailyQuiz(true);
  try {
    const response = await authorizedAxios.get(GET_ALL_QUIZ);
    
    // console.log(response.data[3].generated_quiz);
    let selectedQuiz = JSON.parse(response.data[3].generated_quiz);
    console.log(selectedQuiz);

    setSubjectAndQuiz({
      subject: response.data[3].subject,
      quizId: response.data[3].id,
    });
    setQuestions(selectedQuiz.quiz)

    // setJournals(JournalsData);
  } catch (error) {
    console.error(error);
  }
  setLoadingDailyQuiz(false);

}