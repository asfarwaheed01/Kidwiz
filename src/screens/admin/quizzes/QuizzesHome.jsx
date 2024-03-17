import React, {useState, useEffect} from 'react';

import { useAppContext } from '../../../context/appContext';

import {
  Box,
  useTheme,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  alpha,
} from '@mui/material';

import axios from 'axios';
import { DELETE_QUIZ, GET_ALL_QUIZ } from '../../../config/backend_endpoints';
import {
  DashboardContainer,
  CustomSearchInput,
  CustomModal,
  CustomButton,
} from '../../../components';

import { AddIcon, ChevronDownIcon, EditIcon, TrashIcon } from '../../../icons';

import { tokens } from '../../../theme';
import { $ } from '../../../utils';

import QuizManagementModal from './QuizManagementModal';
import { QuizzesData } from './data';

const QuizzesHome = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { token, logoutUser} = useAppContext();

  const [allQuizesData, setAllQuizesData] = useState([]);
  const [loadingAllQuizes, setLoadingAllQuizes] = useState(false);

  const [isModalOpen, setIsModalOpen] = React.useState({
    isOpen: false,
    index: -1,
    mode: 'create',
  });

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    React.useState(false);

  const [loadingDeleteQuiz, setLoadingDeleteQuiz] = useState(false);

  const [search, setSearch] = React.useState('');
  const handleSearch = () => {};

  // const [quizzesData, setQuizzesData] = React.useState(QuizzesData);
  const [currentSelectedQuiz, setCurrentSelectedQuiz] = React.useState(null);

  const [expanded, setExpanded] = React.useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // TO CALCULATE TOP SECTION HEIGHT
  const topSectionRef = React.useRef(null);
  const [topSectionHeight, setTopSectionHeight] = React.useState(0);

  React.useEffect(() => {
    setTopSectionHeight(topSectionRef.current?.offsetHeight || 0);
  }, [topSectionRef.current?.offsetHeight]);

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


  useEffect(()=>{
    
    if (!isModalOpen.isOpen && !loadingDeleteQuiz) {
      loadAllQuizes(authorizedAxios,setLoadingAllQuizes, setAllQuizesData);
    }
    if (!loadingDeleteQuiz && isDeleteConfirmationModalOpen) {
      setIsDeleteConfirmationModalOpen(false);
    }
    
  },[isModalOpen, loadingDeleteQuiz]);


  return (
    <DashboardContainer
      wrapperStyle={{ position: 'relative' }}
      containerStyle={{
        pb: $({ size: 20 }),
      }}>
      <Box
        ref={topSectionRef}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: $({ size: 24 }),
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: $({ size: 8 }),
            width: '100%',
          }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              alignItems: {
                xs: 'flex-start',
                sm: 'center',
              },
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: {
                xs: $({ size: 24 }),
                sm: $({ size: 16 }),
              },
            }}>
            <Typography
              sx={{
                fontSize: $({ size: 31.98 }),
                fontWeight: '600',
                color: colors.extra.grey1,
              }}>
              Quizzes
            </Typography>

            <CustomSearchInput
              placeholder='Search for your quiz'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              containerStyle={{
                maxWidth: {
                  xs: '100%',
                  sm: $({ size: 352 }),
                },
                minWidth: {
                  xs: '100%',
                  sm: $({ size: 300 }),
                },
              }}
              handleSearch={handleSearch}
              handleSearchOnEveryKeyStroke={handleSearch}
            />
          </Box>

          <Box
            onClick={() => {
              setIsModalOpen({ isOpen: true, index: -1, mode: 'create' });
            }}
            sx={{
              display: 'flex',
              gap: $({ size: 16 }),
              alignItems: 'center',
              cursor: 'pointer',
              width: 'fit-content',
            }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AddIcon
                color={colors.solids.mainButton}
                size={$({ size: 32, numeric: true })}
              />
            </Box>

            <Typography
              sx={{
                fontSize: $({ size: 18 }),
                fontWeight: '700',
                color: colors.extra.grey2,
                textTransform: 'uppercase',
              }}>
              New Quiz
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          'marginTop': `-${$({ size: 28 })}`,
          'height': '100%',
          'overflowY': 'scroll',
          'maxHeight': `calc(100vh - ${topSectionHeight}px - ${$({
            numeric: true,
            // ADJUSTMENT
            size:
              60 + // TOP BAR HEIGHT
              24 + // PARENT CONTAINER TOP PADDING
              24 + // PARENT  CONTAINER BOTTOM PADDING
              40 + // WRAPPER CONTAINER TOP PADDING
              20 + // WRAPPER CONTAINER BOTTOM PADDING
              24 + // HEADER SECTION GAP
              4,
          })}px)`,
          'pr': $({ size: 16 }),
          '&::-webkit-scrollbar': {
            width: $({ size: 8 }),
            borderRadius: $({ size: 8 }),
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: colors.extra.grey3,
            borderRadius: $({ size: 8 }),
          },
        }}>

        {allQuizesData.map((item, index) => {
          return (
            <Accordion
              disableGutters
              key={`accordion-${index}-${item.id}`}
              expanded={expanded === `${item.id}`}
              onChange={handleChange(`${item.id}`)}
              sx={{
                'border': 'none',
                'borderBottom': `${$({ size: 1 })} solid ${colors.extra.grey4}`,
                '&:before': {
                  display: 'none',
                },
                'backgroundColor': 'transparent',
                'boxShadow': 'none',
                'width': '100%',
                'cursor': 'default',
                'margin': 0,
                'padding': `${$({ size: 24 })} 0`,
                '& .MuiButtonBase-root.MuiAccordionSummary-root.Mui-expanded': {
                  minHeight: 'fit-content',
                  height: 'fit-content',
                },
                '& .MuiAccordionSummary-root': {
                  minHeight: 'fit-content',
                  height: 'fit-content',
                },
              }}>
              <AccordionSummary
                aria-controls={`${item.id}-content`}
                id={`${item.id}-content`}
                // disableGutters
                elevation={0}
                expandIcon={
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <ChevronDownIcon
                      size={$({ size: 30, numeric: true })}
                      color={colors.extra.grey3}
                    />
                  </Box>
                }
                sx={{
                  'backgroundColor': 'transparent',
                  'flexDirection': 'row-reverse',
                  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                    transform: 'rotate(180deg)',
                  },
                  '& .MuiAccordionSummary-content': {
                    margin: 0,
                    padding: 0,
                  },
                  'width': '100%',
                  'cursor': 'default',
                  'margin': 0,
                  'padding': 0,
                  ':focus': {
                    outline: 'none',
                    backgroundColor: 'transparent',
                  },
                  '& .MuiAccordionSummary-content.Mui-expanded>div>div>p': {
                    fontWeight: '700',
                    color: colors.solids.black,
                  },
                }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    marginLeft: $({ size: 16 }),
                  }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: $({ size: 16 }),
                      alignItems: 'center',
                    }}>
                    <Typography
                      sx={{
                        color: colors.extra.grey1,
                        fontSize: $({ size: 18 }),
                        fontWeight: '600',
                      }}>
                      {item.title}
                    </Typography>

                    <Box
                      sx={{
                        padding: `${$({ size: 4 })} ${$({ size: 12 })}`,
                        borderRadius: $({ size: 100 }),
                        backgroundColor:
                          item.tier.toLowerCase() === 'basic'
                            ? colors.solids.orange
                            : item.tier.toLowerCase() === 'pro'
                            ? colors.solids.green
                            : item.tier.toLowerCase() === 'premium'
                            ? colors.solids.purple
                            : colors.extra.grey3,
                      }}>
                      <Typography
                        sx={{
                          color: colors.solids.black,
                          fontSize: $({ size: 13.5 }),
                          fontWeight: '500',
                          textTransform: 'capitalize',
                        }}>
                        {item.tier}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: $({ size: 24 }),
                    }}>
                    <Box
                      onClick={() => {
                        setCurrentSelectedQuiz(item);
                        setIsModalOpen({ isOpen: true, index: index, mode: 'update' });
                      }}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <EditIcon
                        size={$({ size: 24, numeric: true })}
                        color={colors.extra.grey3}
                      />
                    </Box>

                    <Box
                      onClick={() => {
                        setCurrentSelectedQuiz(item);
                        setIsDeleteConfirmationModalOpen(true);
                      }}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <TrashIcon
                        size={$({ size: 24, numeric: true })}
                        color={colors.extra.grey3}
                      />
                    </Box>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  border: 'none',
                  margin: 0,
                  marginLeft: $({ size: 48 }),
                  marginTop: $({ size: 16 }),
                  padding: 0,
                  gap: $({ size: 16 }),
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: $({ size: 16 }),
                  }}>
                  <Typography
                    sx={{
                      fontSize: $({ size: 13.5 }),
                      fontWeight: '500',
                      color: colors.extra.grey3,
                      lineHeight: $({ size: 25 }),
                    }}>
                    Subject
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: $({ size: 13.5 }),
                      fontWeight: '500',
                      color: colors.extra.grey1,
                      lineHeight: $({ size: 25 }),
                      // textTransform: 'uppercase',
                    }}>
                    {item.subject}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    color: colors.solids.black,
                    fontSize: $({ size: 13.5 }),
                    fontWeight: '400',
                    lineHeight: $({ size: 20 }),
                  }}>
                  {item.prompt}
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>

      {isModalOpen.isOpen && (
        <QuizManagementModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          currentSelectedQuiz={currentSelectedQuiz}
          setCurrentSelectedQuiz={setCurrentSelectedQuiz}
          // quizzesData={quizzesData}
          // setQuizzesData={setQuizzesData}
        />
      )}

      {isDeleteConfirmationModalOpen && (
        <CustomModal
          showBackdrop
          title={null}
          wrapperStyle={{
            maxWidth: $({ size: 540 }),
            width: '100%',
            top: $({ size: 64 }),
            left: '50%',
            transform: 'translate(-50%)',
          }}
          containerStyle={{
            padding: $({ size: 40 }),
            minHeight: $({ size: 280 }),
            display: 'flex',
            flexDirection: 'column',
          }}
          headerContainerStyle={{
            mr: `-${$({ size: 20 })}`,
            mt: `-${$({ size: 20 })}`,
          }}
          onClose={() => {
            setIsDeleteConfirmationModalOpen(false);
          }}>
          <Box sx={{ mt: $({ size: 16 }) }}>
            <Typography
              sx={{
                color: colors.solids.black,
                fontSize: $({ size: 18 }),
                fontWeight: '400',
                display: 'inline',
              }}>
              Are you sure you want to delete the quiz
            </Typography>
            <Typography
              sx={{
                color: colors.solids.black,
                fontSize: $({ size: 18 }),
                fontWeight: '600',
                display: 'inline',
              }}>
              {` ${currentSelectedQuiz?.title}`}
            </Typography>
            <Typography
              sx={{
                color: colors.solids.black,
                fontSize: $({ size: 18 }),
                fontWeight: '400',
                display: 'inline',
              }}>
              ?
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }} />
          <Box
            sx={{
              mt: $({ size: 16 }),
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <CustomButton
              label='No'
              isSecondary
              sx={{ maxWidth: 'fit-content', textTransform: 'capitalize' }}
              onClick={() => {
                setIsDeleteConfirmationModalOpen(false);
              }}
            />
            <CustomButton
              label='Yes'
              sx={{
                'maxWidth': 'fit-content',
                'textTransform': 'capitalize',
                'backgroundColor': colors.redAccent[400],
                '&:hover': {
                  backgroundColor: alpha(colors.redAccent[400], 0.8),
                },
              }}
              onClick={() => {
                

                deleteQuiz(authorizedAxios, currentSelectedQuiz, setLoadingDeleteQuiz);

                // const temp = [...quizzesData];
                // temp.splice(
                //   quizzesData.findIndex(
                //     (item) => item.id === currentSelectedQuiz.id
                //   ),
                //   1
                // );
                // setQuizzesData(temp);
              }}
            />
          </Box>
        </CustomModal>
      )}
    </DashboardContainer>
  );
};

export default QuizzesHome;



const loadAllQuizes = async (authorizedAxios, setLoadingAllQuizes, setAllQuizesData ) => {
  setLoadingAllQuizes(true);
  try {
    const response = await authorizedAxios.get(GET_ALL_QUIZ);
    // console.log(response.data);
    setAllQuizesData(response.data);
  } catch (error) {
    console.error(error);
  }
  setLoadingAllQuizes(false);
} 

const deleteQuiz = async (authorizedAxios, quiz, setLoadingDeleteQuiz)=> {
  setLoadingDeleteQuiz(true);
  // console.log("-- ID of Subject --" + subject.id);
  try {
    const response = await authorizedAxios.delete(DELETE_QUIZ, {
      data:{id : quiz.id}
    });
    console.log(response.data);
    
  } catch (error) {
    console.error(error);
  }
  setLoadingDeleteQuiz(false);
  
}