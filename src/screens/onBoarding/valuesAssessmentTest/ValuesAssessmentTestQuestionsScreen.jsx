// import React from 'react';
// import { Box, Typography } from '@mui/material';
// import { alpha, useTheme } from '@mui/material/styles';
// import { useNavigate } from 'react-router-dom';

// import {
//   CustomButton,
//   QuestionProgressBar,
//   LikertScale,
// } from '../../../components';

// import { RightArrowIcon, ShapesIcon } from '../../../icons';

// import { ASSETS } from '../../../config/assets';
// import { ROUTES } from '../../../config/routes';
// import { tokens } from '../../../theme';
// import { $ } from '../../../utils';
// import { GET_VALUES_QUESTIONS,VALUES_USER_RESPONSE } from '../../../config/backend_endpoints';
// import axios from 'axios';

// const ValuesAssessmentTestQuestionsScreen = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   const navigate = useNavigate();

//   React.useEffect(() => {
//     axios.get(GET_VALUES_QUESTIONS)
//       .then(response => {
//         const { questions } = response.data;
//         const formattedQuestions = questions.map(question => `${question.text}`);
//         setQuestions(formattedQuestions);
//       })
//       .catch(error => {
//         console.error('Error fetching questions:', error);
//       });
//   }, []);

//   const [questions, setQuestions] = React.useState([]);
//   const [answers, setAnswers] = React.useState([]);

//   const [currentQuestion, setCurrentQuestion] = React.useState(1);
//   const [likertScaleValue, setLikertScaleValue] = React.useState(2);

//   // const HandleNext = () => {
//   //   setAnswers([...answers, likertScaleValue]);
//   //   setCurrentQuestion(currentQuestion + 1);
//   //   setLikertScaleValue(2);
//   // };


//   const HandleNext = () => {
//     setAnswers([...answers, likertScaleValue]);
//     setCurrentQuestion(currentQuestion + 1);
//     setLikertScaleValue(2);
  
//     // Send the response for the current question to the backend API
//     const accessToken = localStorage.getItem('token');
//     const questionId = `Q${currentQuestion}`;
//     const userResponseData = {
//       [questionId]: likertScaleValue || 1 // Default to 1 if answer is missing
//     };
  
//     try {
//       const formattedData = JSON.stringify(userResponseData);
  
//       const formData = new FormData();
//       formData.append('user_response_data', formattedData);
  
//       axios.post(VALUES_USER_RESPONSE, formData, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           'Content-Type': 'multipart/form-data'
//         }
//       })
//       .catch(error => {
//         console.error('Error submitting user response for question', currentQuestion, ':', error);
//       });
//     } catch (error) {
//       console.error('Error formatting user response for question', currentQuestion, ':', error);
//     }
//   };


//   const HandleSubmit = () => {
//     setAnswers([...answers, likertScaleValue]);
  
//     // Prepare and send the response for the current question to the backend API
//     HandleNext();
  
//     // Navigate to the result page after submitting all responses
//     navigate(ROUTES.ON_BOARDING.VALUES_ASSESSMENT.RESULT);
//   };


//   // const HandleSubmit = () => {
//   //   setAnswers([...answers, likertScaleValue]);
  
//   //   const userResponseData = {};
//   //   questions.forEach((question, index) => {
//   //     const questionId = `Q${index + 1}`;
//   //     userResponseData[questionId] = answers[index] || 1; 
//   //   });

//   //   const accessToken = localStorage.getItem('token');
  
//   //   try {
//   //     const formattedData = JSON.stringify(userResponseData);
  
//   //     const formData = new FormData();
//   //     formData.append('user_response_data', formattedData);
  
//   //     console.log(formData);
//   //     axios.post(VALUES_USER_RESPONSE, formData, {
//   //       headers: {
//   //         Authorization: `Bearer ${accessToken}`,
//   //         'Content-Type': 'multipart/form-data'
//   //       }
//   //     })
//   //       .then(response => {
//   //         navigate(ROUTES.ON_BOARDING.VALUES_ASSESSMENT.RESULT);
//   //       })
//   //       .catch(error => {
//   //         console.error('Error submitting user response:', error);
//   //       });
//   //   } catch (error) {
//   //     console.error('Error formatting user response:', error);
//   //   }
//   // };
  
  

//   return (
//     <Box
//       sx={{
//         backgroundColor: colors.grey[900],
//         height: 'max-content',
//         minHeight: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         padding: {
//           xs: $({ size: 20 }),
//           lg: $({ size: 40 }),
//         },
//       }}>
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'space-between',
//           backgroundColor: colors.white[800],
//           boxShadow: `0 0 ${$({ size: 8 })} 0 ${alpha(
//             colors.solids.black,
//             0.25
//           )}`,
//           width: '100%',
//           borderRadius: $({ size: 12 }),
//           flexGrow: 1,
//           gap: $({ size: 24 }),
//         }}>
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             width: '100%',
//             height: '100%',
//             gap: $({ size: 8 }),
//             marginBottom: $({ size: 40 }),
//           }}>
//           <Box
//             component='img'
//             alt='logo'
//             src={ASSETS.LOGO}
//             sx={{
//               width: {
//                 xs: $({ size: 140 }),
//                 lg: $({ size: 160 }),
//               },
//               alignSelf: 'flex-start',
//               margin: {
//                 xs: `${$({ size: 32 })} 0 0 ${$({ size: 32 })}`,
//                 lg: `${$({ size: 40 })} 0 0 ${$({ size: 40 })}`,
//               },
//             }}
//           />

//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               mt: {
//                 xs: $({ size: 24 }),
//                 lg: 0,
//               },
//               padding: {
//                 xs: `0 ${$({ size: 24 })}`,
//                 lg: 0,
//               },
//             }}>
//             <Box
//               sx={{
//                 borderRadius: $({ size: 160 }),
//                 backgroundColor: colors.extra.iconBackground,
//                 padding: {
//                   xs: $({ size: 24 }),
//                   lg: $({ size: 48 }),
//                 },
//                 width: {
//                   xs: $({ size: 140 }),
//                   lg: $({ size: 160 }),
//                 },
//                 height: {
//                   xs: $({ size: 140 }),
//                   lg: $({ size: 160 }),
//                 },
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}>
//               <ShapesIcon size={$({ size: 64, numeric: true })} />
//             </Box>

//             <Typography
//               sx={{
//                 fontSize: $({ size: 32 }),
//                 fontWeight: '600',
//                 lineHeight: $({ size: 40 }),
//                 textAlign: 'center',
//                 color: colors.grey[200],
//                 margin: `${$({ size: 16 })} 0`,
//               }}>
//               Values Assessment
//             </Typography>
//           </Box>

//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               width: '100%',
//               maxWidth: $({ size: 450 }),
//               gap: {
//                 xs: $({ size: 16 }),
//                 lg: $({ size: 24 }),
//               },
//               padding: {
//                 xs: `0 ${$({ size: 24 })}`,
//                 lg: 0,
//               },
//             }}>
//             <QuestionProgressBar
//               totalQuestions={questions.length}
//               currentQuestion={currentQuestion}
//             />

//             <Typography
//               sx={{
//                 fontSize: $({ size: 18 }),
//                 fontWeight: '400',
//                 lineHeight: $({ size: 30 }),
//                 color: colors.extra.grey1,
//                 alignSelf: 'flex-start',
//               }}>
//               {questions[currentQuestion - 1]}
//             </Typography>

//             <LikertScale
//               max={5}
//               value={likertScaleValue}
//               onChange={(e, value) => setLikertScaleValue(value)}
//             />

//             <CustomButton
//               onClick={
//                 questions.length === currentQuestion ? HandleSubmit : HandleNext
//               }
//               label={questions.length === currentQuestion ? 'Submit' : 'Next'}
//               sx={{
//                 maxWidth: $({ size: 175 }),
//                 alignSelf: 'flex-end',
//                 marginTop: $({ size: 16 }),
//               }}
//               rightIcon={
//                 <RightArrowIcon size={$({ size: 24, numeric: true })} />
//               }
//             />
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default ValuesAssessmentTestQuestionsScreen;







import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import {
  CustomButton,
  QuestionProgressBar,
  LikertScale,
} from '../../../components';

import { RightArrowIcon, ShapesIcon } from '../../../icons';

import { ASSETS } from '../../../config/assets';
import { ROUTES } from '../../../config/routes';
import { tokens } from '../../../theme';
import { $ } from '../../../utils';
import { GET_VALUES_QUESTIONS, VALUES_USER_RESPONSE } from '../../../config/backend_endpoints';
import axios from 'axios';

const ValuesAssessmentTestQuestionsScreen = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [questions, setQuestions] = React.useState([]);
  const [answers, setAnswers] = React.useState([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(1);
  const [likertScaleValue, setLikertScaleValue] = React.useState(2);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const accessToken = localStorage.getItem('token');
  
  //       // Fetch the user response data from VALUES_USER_RESPONSE
  //       const response = await axios.get(VALUES_USER_RESPONSE, {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           'Content-Type': 'multipart/form-data'
  //         }
  //       });
  
  //       // Extract questions count and responses
  //       const { questions_count, responses } = response.data;
  //       console.log(questions_count);
  
  //       // Handle redirection if questions count equals 10
  //       if (questions_count === 10) {
  //         navigate(ROUTES.VALUES_ASSESSMENT.RESULT);
  //         return;
  //       }
  //       console.log(questions_count);
  //       // Calculate the index to start displaying questions
  //       const startIndex = questions_count + 1;
  
  //       // Update answers based on the responses received
  //       const initialAnswers = Array.from({ length: startIndex - 1 }, (_, index) => {
  //         const questionId = `Q${index + 1}`;
  //         return responses[questionId] || 1; // Use response value if available, otherwise default to 1
  //       });
  //       setAnswers(initialAnswers);
  //       console.log(questions.length);
  
  //       // Fetch questions only if startIndex is valid
  //       if (startIndex <= 10) {
  //         setCurrentQuestion(startIndex);
  //         const response = await axios.get(GET_VALUES_QUESTIONS);
  //         const { questions } = response.data;
  //         const formattedQuestions = questions.map(question => `${question.text}`);
  //         setQuestions(formattedQuestions);
  //       }
  
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   }
  
  //   fetchData();
  // }, [navigate]);

  useEffect(() => {
    async function fetchData() {
      try {
        const accessToken = localStorage.getItem('token');
  
        // Fetch the user response data from VALUES_USER_RESPONSE
        const response = await axios.get(VALUES_USER_RESPONSE, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
          }
        });
  
        // Extract questions count and responses
        const { questions_count, responses } = response.data;
        console.log(questions_count);
  
        // Handle redirection if questions count equals 10
        if (questions_count === 10) {
          console.log("Redirecting to summary page...");
          console.log("Navigating to:", ROUTES.ON_BOARDING.VALUES_ASSESSMENT.RESULT);
          navigate(ROUTES.ON_BOARDING.VALUES_ASSESSMENT.RESULT);
          console.log("Navigation complete.");
          return;
        }
  
        // Calculate the index to start displaying questions
        const startIndex = questions_count + 1;
  
        // Update answers based on the responses received
        const initialAnswers = Array.from({ length: startIndex - 1 }, (_, index) => {
          const questionId = `Q${index + 1}`;
          return responses[questionId] || 1; // Use response value if available, otherwise default to 1
        });
        setAnswers(initialAnswers);
        console.log(questions.length);
  
        // Fetch questions only if startIndex is valid
        if (startIndex <= 10) {
          setCurrentQuestion(startIndex);
          const response = await axios.get(GET_VALUES_QUESTIONS);
          const { questions } = response.data;
          const formattedQuestions = questions.map(question => `${question.text}`);
          setQuestions(formattedQuestions);
        }
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    fetchData();
  }, [navigate]);

  
  
  

  const HandleNext = () => {
    setAnswers([...answers, likertScaleValue]);
    setCurrentQuestion(currentQuestion + 1);
    setLikertScaleValue(2);
    
    sendResponseToAPI();
  };

  const HandleSubmit = () => {
    setAnswers([...answers, likertScaleValue]);
  
    sendResponseToAPI();

    navigate(ROUTES.ON_BOARDING.VALUES_ASSESSMENT.RESULT);
  };

  const sendResponseToAPI = () => {
    const accessToken = localStorage.getItem('token');
    const questionId = `Q${currentQuestion}`;
    const userResponseData = {
      [questionId]: likertScaleValue || 1 
    };

    try {
      const formattedData = JSON.stringify(userResponseData);

      const formData = new FormData();
      formData.append('user_response_data', formattedData);

      axios.post(VALUES_USER_RESPONSE, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      .catch(error => {
        console.error('Error submitting user response for question', currentQuestion, ':', error);
      });
    } catch (error) {
      console.error('Error formatting user response for question', currentQuestion, ':', error);
    }
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
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: colors.white[800],
          boxShadow: `0 0 ${$({ size: 8 })} 0 ${alpha(colors.solids.black, 0.25)}`,
          width: '100%',
          borderRadius: $({ size: 12 }),
          flexGrow: 1,
          gap: $({ size: 24 }),
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            gap: $({ size: 8 }),
            marginBottom: $({ size: 40 }),
          }}
        >
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
            }}
          >
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
              }}
            >
              <ShapesIcon size={$({ size: 64, numeric: true })} />
            </Box>

            <Typography
              sx={{
                fontSize: $({ size: 32 }),
                fontWeight: '600',
                lineHeight: $({ size: 40 }),
                textAlign: 'center',
                color: colors.grey[200],
                margin: `${$({ size: 16 })} 0`,
              }}
            >
              Values Assessment
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
            }}
          >
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
              }}
            >
              {questions[currentQuestion - 1]}
            </Typography>

            <LikertScale
              max={5}
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
              rightIcon={<RightArrowIcon size={$({ size: 24, numeric: true })} />}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ValuesAssessmentTestQuestionsScreen;

