import React, {useState, useEffect} from 'react';
import { Box, Grid, Typography, useTheme, alpha } from '@mui/material';
import axios from 'axios';

import { useAppContext } from '../../../context/appContext';

import { GET_ALL_TIERS, GET_ALL_SUBJECTS, SAVE_NEW_QUIZ, UPDATE_QUIZ } from '../../../config/backend_endpoints';

import {
  CustomButton,
  CustomDropDown,
  CustomModal,
  CustomTextInput,
} from '../../../components';

import { SaveIcon } from '../../../icons';

import { tokens } from '../../../theme';
import { $ } from '../../../utils';

// import { Subjects } from './data';

const QuizManagementModal = ({
  isModalOpen = { isOpen: false, index: -1, mode:'create' },
  setIsModalOpen = () => {},
  currentSelectedQuiz = null,
  setCurrentSelectedQuiz = () => {},
  offset = {
    top: 24,
    left: 48,
    right: 48,
  },
  // quizzesData = [],
  // setQuizzesData = () => {},
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { token, logoutUser } = useAppContext();



  const [quizTitle, setQuizTitle] = React.useState(
    currentSelectedQuiz?.title || ''
  );

  const [prompt, setPrompt] = React.useState(currentSelectedQuiz?.prompt || '');

  const [tierData, setTierData] = useState([]);
  const [tierDropDownOpen, setTierDropDownOpen] = React.useState(false);
  const [tier, setTier] = React.useState({
    id: currentSelectedQuiz?.id || '',
    name: currentSelectedQuiz?.tier?.toLowerCase() || '',
  });

  const [subjectsData, setSubjectsData] = useState([]);
  const [subjectDropDownOpen, setSubjectDropDownOpen] = React.useState(false);
  const [subject, setSubject] = React.useState({
    id: currentSelectedQuiz?.subject?.id || '',
    subjectName: currentSelectedQuiz?.subject || '',
  });

  const [errorsInQuiz, setErrorsInQuiz] = useState({
    quizTitle:"",
    tier:"",
    subject:"",
    prompt:""
  });

  const authorizedAxios = axios.create({
    baseURL: '',
    // timeout: 3000,
    headers: {
      "Authorization" : `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
  }
  });

  // Add a response interceptor
  authorizedAxios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    if (error.response.status === 401) {
      logoutUser();
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

  const [quizUploadRequest, setQuizUploadRequest] = useState({
    loading: false,
    status: "",
    error: "",
  });

  const validateQuizData = () => {
    const _errors = { ...errorsInQuiz };
    if( quizTitle === '' ){ 
      _errors.quizTitle = "Required";
    } else _errors.quizTitle = "";
    if (tier.name === '') {
      _errors.tier = 'Required';
    } else _errors.tier = '';
    if (subject.subjectName === '') {
      _errors.subject = 'Required';
    } else _errors.subject = '';
    if (prompt === '') {
      _errors.prompt = 'Required';
    } else _errors.prompt = '';


    setErrorsInQuiz(_errors);
    for (const key in _errors) if (_errors[key]) return false;
    return true;
  }


  useEffect(()=>{
    if (subjectsData.length === 0) {
      loadSubjects(authorizedAxios, setSubjectsData);
    }
    if (tierData.length === 0) {
      loadTiers(authorizedAxios,setTierData);
    }

    if (!quizUploadRequest.loading && quizUploadRequest.status==="complete" && quizUploadRequest.error === "") {
      setIsModalOpen({ isOpen: false, index: -1, mode: 'create' });
      setCurrentSelectedQuiz(null);
      // resetData();
    }

  },[quizUploadRequest]);

  return (
    <CustomModal
      showBackdrop={true}
      title={currentSelectedQuiz ? 'Edit Quiz' : 'New Quiz'}
      onClose={() => {
        setIsModalOpen({ isOpen: false, index: -1 });
        setCurrentSelectedQuiz(null);
      }}
      offset={{
        top: offset.top,
        left: offset.left,
        right: offset.right,
      }}
      containerStyle={{
        maxWidth: $({ size: 1240 }),
        display: 'flex',
        flexDirection: 'column',
        gap: $({ size: 20 }),
      }}
      wrapperStyle={{
        left: '50%',
        transform: 'translateX(-50%)',
        width: $({ size: 1240 }),
      }}>
      {(tierDropDownOpen || subjectDropDownOpen) && (
        <Box
          onClick={() => {
            setTierDropDownOpen(false);
            setSubjectDropDownOpen(false);
          }}
          sx={{
            background: alpha(colors.extra.grey1, 0.4),
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: $({ size: 20 }),
            borderRadius: $({ size: 12 }),
            zIndex: 80,
          }}
        />
      )}


              <Typography
                sx={{
                  fontSize: $({ size: 16 }),
                  fontWeight: '400',
                  color: colors.redAccent[500],
                  lineHeight: $({ size: 30 }),
                  paddingTop: $({ size: 4 }),
                  
                }}>
                {quizUploadRequest.error}
              </Typography>

      <Grid
        container
        rowGap={$({ size: 16 })}
        columnSpacing={$({ size: 48 })}>
        <Grid
          item
          xs={12}
          md={12}>
          <CustomTextInput
            label='Quiz Title'
            placeholder='Quiz title'
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            error={errorsInQuiz.quizTitle}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}>
          <CustomDropDown
            value={tier?.name || ''}
            placeholder='Choose a tier'
            label='Tier'
            error={errorsInQuiz.tier}
            dropDownOpen={tierDropDownOpen}
            setDropDownOpen={setTierDropDownOpen}
            data={tierData.map((item) => {
              return {
                onClick: () => {
                  // console.log(item);
                  setTier(item);
                },
                component: (
                  <Typography
                    sx={{
                      fontSize: $({ size: 18 }),
                      fontWeight: tier.name === item.name ? '600' : '400',
                      color: colors.extra.grey1,
                      lineHeight: $({ size: 30 }),
                    }}>
                    {item.name}
                  </Typography>
                ),
              };
            })}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}>
          <CustomDropDown
            value={subject?.subjectName || ''}
            placeholder='Choose a Subject'
            label='Subject'
            error={errorsInQuiz.subject}
            itemsContainerStyle = {
              {maxHeight: '400px !important', overflow:"scroll",}
            }
            dropDownOpen={subjectDropDownOpen}
            setDropDownOpen={setSubjectDropDownOpen}
            data={subjectsData.map((item) => {
              return {
                onClick: () => {
                  setSubject(item);
                },
                component: (
                  <Typography
                    sx={{
                      fontSize: $({ size: 18 }),
                      fontWeight: subject.subjectName === item.subjectName ? '600' : '400',
                      color: colors.extra.grey1,
                      lineHeight: $({ size: 30 }),
                    }}>
                    {item.subjectName}
                  </Typography>
                ),
              };
            })}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={12}>
          <CustomTextInput
            label='Prompts'
            placeholder='Write the prompt that generates this quiz'
            value={prompt}
            error={errorsInQuiz.prompt}
            onChange={(e) => setPrompt(e.target.value)}
            multiline={true}
            containerStyle={{
              width: '100%',
              height: $({ size: 240 }),
            }}
            inputContainerStyle={{
              height: `calc(100% - ${$({ size: 40, numeric: true })}px)`,
            }}
            inputStyle={{
              height: `calc(100% - ${$({ size: 8, numeric: true })}px)`,
              overflowY: 'scroll',
            }}
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: $({ size: 24 }),
          marginTop: $({ size: 20 }),
        }}>
        <CustomButton
          label='Cancel'
          isSecondary
          sx={{
            maxWidth: $({ size: 160 }),
            boxShadow: `0 0 ${$({ size: 4 })} 0 ${alpha(
              colors.solids.black,
              0.25
            )}`,
          }}
          onClick={() => {
            setIsModalOpen({ isOpen: false, index: -1 });
            setCurrentSelectedQuiz(null);
          }}
        />
        <CustomButton
          label='Save'
          sx={{
            maxWidth: $({ size: 160 }),
            boxShadow: `0 0 ${$({ size: 4 })} 0 ${alpha(
              colors.solids.black,
              0.25
            )}`,
          }}
          rightIcon={<SaveIcon size={$({ size: 24, numeric: true })} />}
          disabled= {quizUploadRequest.loading}
          loading = {quizUploadRequest.loading}
          onClick={() => {

            if (!validateQuizData()) {
              console.log("Quiz data not validated");
              return;
            }

            if (isModalOpen.mode === 'create') {
              const quizData = {"title":quizTitle,"tier":tier.name, "subject":subject.subjectName,"prompt":prompt,"isActive":true}
              saveNewQuiz(authorizedAxios, quizData, setQuizUploadRequest);
            }else if (isModalOpen.mode === 'update') {
              let quizdata = { quiz_id: currentSelectedQuiz.id}
              if (quizTitle != currentSelectedQuiz.title) {
                quizdata.title = quizTitle;
              }
              if (tier.name != currentSelectedQuiz.tier) {
                quizdata.tier = tier.name;
              }
              if (subject != currentSelectedQuiz.subject) {
                quizdata.subject = subject.subjectName;
              }
              if (prompt != currentSelectedQuiz.prompt) {
                quizdata.prompt = prompt;
              }

              // console.log("Updated data ==  " + JSON.stringify(quizdata));
              UpdateQuiz(authorizedAxios, quizdata, setQuizUploadRequest);
            }
            // setQuizzesData([
            //   ...(currentSelectedQuiz?.id
            //     ? []
            //     : [
            //         {
            //           id: `quiz-${quizzesData.length + 1}`,
            //           title: quizTitle,
            //           prompt: prompt,
            //           tier: tier.label,
            //           subject: subject,
            //         },
            //       ]),
            //   ...quizzesData.map((quiz) => {
            //     if (quiz?.id === currentSelectedQuiz?.id) {
            //       return {
            //         ...quiz,
            //         title: quizTitle,
            //         prompt: prompt,
            //         tier: tier.label,
            //         subject: subject,
            //       };
            //     }
            //     return quiz;
            //   }),
            // ]);

            // setIsModalOpen({ isOpen: false, index: -1 });
            // setCurrentSelectedQuiz(null);
          }}
        />
      </Box>
    </CustomModal>
  );
};

export default QuizManagementModal;


const loadTiers = async (authorizedAxios, setTierData)=>{
  try {
    const response = await authorizedAxios.get(GET_ALL_TIERS);
    // console.log(response);
    setTierData(response.data);
    console.log("Tiers loading for quiz");
  } catch (error) {
    console.error(error);
  }
}

const loadSubjects = async (authorizedAxios, setSubjectsData)=>{
  try {
    const response = await authorizedAxios.get(GET_ALL_SUBJECTS);
    // console.log(response);
    setSubjectsData(response.data);
    console.log("Subjects Loading from Server for Add Quiz");
  } catch (error) {
    
  }
}

const saveNewQuiz = async (authorizedAxios, quizData, setQuizUploadRequest) => {
  setQuizUploadRequest({
    loading: true,
    status: "start",
    error: "",
  });
  try {
    const response = await authorizedAxios.post(SAVE_NEW_QUIZ, {
                        ...quizData
                      });
    // console.log(response);
    setQuizUploadRequest({
      loading: false,
      status: "complete",
      error: "",
    });
    
  } catch (error) {
    console.error(error);
    setQuizUploadRequest({
      loading: false,
      status: "complete",
      error: error.message,
    });
  }
}

const UpdateQuiz = async (authorizedAxios, quizData, setQuizUploadRequest) => {
  setQuizUploadRequest({
    loading: true,
    status: "start",
    error: "",
  });
  try {
    const response = await authorizedAxios.patch(UPDATE_QUIZ, {
                        ...quizData
                      });
    // console.log(response);
    setQuizUploadRequest({
      loading: false,
      status: "complete",
      error: "",
    });
    
  } catch (error) {
    console.error(error);
    setQuizUploadRequest({
      loading: false,
      status: "complete",
      error: error.message,
    });
  }
}

