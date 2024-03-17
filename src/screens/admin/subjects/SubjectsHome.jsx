import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {
  Box,
  useTheme,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  alpha,
  autocompleteClasses,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


import {
  DashboardContainer,
  CustomSearchInput,
  CustomModal,
  CustomButton,
  CustomTextInput,
  CustomLabel,
} from '../../../components';

import {
  AddIcon,
  ChevronDownIcon,
  ChevronSlimDownIcon,
  EditIcon,
  SaveIcon,
  TrashIcon,
} from '../../../icons';

import { useAppContext } from '../../../context/appContext';

import { API_BASE_URL, 
  GET_ALL_SUBJECTS, 
  GET_ALL_SUBJECTS_WITH_COURSES, 
  DELETE_SUBJECT, 
  SUBJECT_DEFAULT_PROMPT} from '../../../config/backend_endpoints';

import { tokens } from '../../../theme';
import { $ } from '../../../utils';

import SubjectManagementModal from './SubjectManagementModal';
import SubSubjectManagementModal from './SubSubjectManagementModal';
import { SubjectsData } from './data';

// var SubjectsData = [];

const SubjectsHome = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {token, logoutUser} = useAppContext();

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




  const [isSubjectModalOpen, setIsSubjectModalOpen] = React.useState({
    isOpen: false,
    index: -1,
    mode: "create",
  });

  const [isSubSubjectModalOpen, setIsSubSubjectModalOpen] = React.useState({
    isOpen: false,
    index: -1,
    mode: "create",
  });

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    React.useState(false);

  const [search, setSearch] = React.useState('');
  const handleSearch = () => {};

  const [defaultPrompt, setDefaultPrompt] = React.useState('');
  const [loadingDefaultPrompt, setLoadingDefaultPrompt] = useState(false);

  const [subjectsData, setSubjectsData] = React.useState(SubjectsData);
  const [allSubjects, setAllSubjects] = useState([])
  const [loadingAllSubjects, setLoadingAllSubjects] = useState(false);
  const [loadingDeleteSubject, setLoadingDeleteSubject] = useState(false);

  const [currentSelectedSubject, setCurrentSelectedSubject] =
    React.useState(null);

  const [subSubjects, setSubSubjects] = React.useState([]);
  // const [loadingData, setLoadingData] = useState(false); 

  const [currentSelectedSubSubject, setCurrentSelectedSubSubject] =
    React.useState(null);

  const [expandedSubject, setExpandedSubject] = React.useState('');
  const [expandedSubSubject, setExpandedSubSubject] = React.useState('');

  const handleSubjectChange = (panel) => (event, newExpanded) => {
    setExpandedSubject(newExpanded ? panel : false);
    setExpandedSubSubject(false);
  };

  const handleSubSubjectChange = (panel) => (event, newExpanded) => {
    setExpandedSubSubject(newExpanded ? panel : false);
  };

  // TO CALCULATE TOP SECTION HEIGHT
  const topSectionRef = React.useRef(null);
  const [topSectionHeight, setTopSectionHeight] = React.useState(0);

  React.useEffect(() => {
    setTopSectionHeight(topSectionRef.current?.offsetHeight || 0);
  }, [topSectionRef.current?.offsetHeight]);

  useEffect(() => {

    // setSubjectData(SubjectData);
    if (isSubjectModalOpen.isOpen === false && !isDeleteConfirmationModalOpen) {
      console.log("Here we go");
      loadALlSubjectsData(authorizedAxios, setLoadingAllSubjects, setAllSubjects);
    }
    if (loadingDeleteSubject) {
      setIsDeleteConfirmationModalOpen(false);
      setCurrentSelectedSubSubject(null);
    }

    if (defaultPrompt === '') {
      getDefaultPrompt(authorizedAxios,setDefaultPrompt, setLoadingDefaultPrompt )
    }
  }, [isSubjectModalOpen,loadingDeleteSubject]);

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
              Subjects
            </Typography>

            <CustomSearchInput
              placeholder='Search for your subject'
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
              setIsSubjectModalOpen({ isOpen: true, index: -1, mode:'create' });
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
              New Subject
            </Typography>
          </Box>

          <Box sx={{ mb: $({ size: 16 }) }}>
            <Box
              sx={{
                mt: $({ size: 8 }),
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: $({ size: 16 }),
              }}>
              <CustomLabel label='Defualt Prompt' />
              <Box
                onClick={() => {
                  saveDefaultPrompt(authorizedAxios, defaultPrompt, setLoadingDefaultPrompt);
                }}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: $({ size: 8 }),
                  cursor: 'pointer',
                }}>

                {/* {loadingDefaultPrompt && 
                  <CircularProgress
                      size={50}
                      sx={{
                        color: colors.solids.green,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                      }}
                    />
                  } */}

                <SaveIcon
                  color={colors.solids.mainButton}
                  size={$({ size: 16, numeric: true })}
                />
                <Typography
                  sx={{
                    fontSize: $({ size: 18 }),
                    color: colors.solids.mainButton,
                    fontWeight: '500',
                  }}>
                  Save
                </Typography>
              </Box>
            </Box>

            <CustomTextInput
              label={null}
              multiline={true}
              value={defaultPrompt}
              disabled = { loadingDefaultPrompt }
              showLoading= { loadingDefaultPrompt }
              onChange={(e) => setDefaultPrompt(e.target.value)}
              placeholder='Write the default prompt for all subjects unless overwritten'
              containerStyle={{
                width: '100%',
                height: '100%',
              }}
              inputContainerStyle={{
                height: $({ size: 120 }),
              }}
              inputStyle={{
                height: $({ size: 100 }),
                overflowY: 'scroll',
              }}
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          'marginTop': `-${$({ size: 32 })}`,
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

        {loadingAllSubjects && 
          <CircularProgress
              size={50}
              sx={{
                color: colors.solids.green,
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          }
        {allSubjects.map((subject, index) => {
          return (
            <Accordion
              disableGutters
              key={`accordion-${index}-${subject.id}`}
              expanded={expandedSubject === `${subject.id}`}
              onChange={handleSubjectChange(`${subject.id}`)}
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
                aria-controls={`${subject.id}-content`}
                id={`${subject.id}-content`}
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
                      {subject.subjectName}
                    </Typography>

                    <Box
                      sx={{
                        padding: `${$({ size: 4 })} ${$({ size: 12 })}`,
                        borderRadius: $({ size: 100 }),
                        backgroundColor:
                          subject.tier.toLowerCase() === 'basic'
                            ? colors.solids.orange
                            : subject.tier.toLowerCase() === 'pro'
                            ? colors.solids.green
                            : subject.tier.toLowerCase() === 'premium'
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
                        {subject.tier}
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
                        setCurrentSelectedSubject(subject);
                        setIsSubjectModalOpen({ isOpen: true, index: index, mode:"update" });
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
                        setCurrentSelectedSubject(subject);
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
                <Typography
                  sx={{
                    fontSize: $({ size: 14 }),
                    fontWeight: '400',
                    color: colors.solids.black,
                  }}>
                  {subject.subjectDesc}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: $({ size: 4 }),
                    width: '100%',
                  }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                      gap: $({ size: 16 }),
                    }}>
                    <Typography
                      sx={{
                        fontSize: $({ size: 13.5 }),
                        fontWeight: '500',
                        color: colors.extra.grey3,
                      }}>
                      Icon
                    </Typography>
                    <img
                      alt='child'
                      src={ API_BASE_URL + subject.icon}
                      style={{
                        width: $({ size: 16 }),
                        height: $({ size: 16 }),
                        objectFit: 'cover',
                        alignSelf: 'flex-start',
                      }}
                    />
                  </Box>
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
                      }}>
                      Color
                    </Typography>

                    <Box
                      sx={{
                        width: $({ size: 24 }),
                        height: $({ size: 14 }),
                        borderRadius: $({ size: 24 }),
                        backgroundColor: subject.color,
                      }}
                    />
                  </Box>
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
                      }}>
                      Age Range
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: $({ size: 13.5 }),
                        fontWeight: '500',
                        color: colors.extra.grey1,
                        // textTransform: 'uppercase',
                      }}>
                      {`${subject.minage} to ${subject.maxage} years old`}
                    </Typography>
                  </Box>
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
                      }}>
                      Prompt
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: $({ size: 13.5 }),
                        fontWeight: '500',
                        color: colors.extra.grey1,
                        // textTransform: 'uppercase',
                      }}>
                      {`${subject.prompt}`}
                    </Typography>
                  </Box>
                </Box>
{/* On Backend Sub Subjects are Courses */}
                {  subject.courses.map((subSubject, index) => {
                  return (
                    <Accordion
                      disableGutters
                      key={`accordion-${index}-${subSubject.id}`}
                      expanded={expandedSubSubject === `${subSubject.id}`}
                      onChange={handleSubSubjectChange(`${subSubject.id}`)}
                      sx={{
                        'border': 'none',
                        '&:before': {
                          display: 'none',
                        },
                        'backgroundColor': 'transparent',
                        'boxShadow': 'none',
                        'width': '100%',
                        'cursor': 'default',
                        'margin': 0,
                        'padding': 0,
                        '& .MuiButtonBase-root.MuiAccordionSummary-root.Mui-expanded':
                          {
                            minHeight: 'fit-content',
                            height: 'fit-content',
                          },
                        '& .MuiAccordionSummary-root': {
                          minHeight: 'fit-content',
                          height: 'fit-content',
                        },
                      }}>
                      <AccordionSummary
                        aria-controls={`${subSubject.id}-content`}
                        id={`${subSubject.id}-content`}
                        // disableGutters
                        elevation={0}
                        expandIcon={
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <ChevronSlimDownIcon
                              size={$({ size: 10, numeric: true })}
                              color={colors.extra.grey3}
                            />
                          </Box>
                        }
                        sx={{
                          'backgroundColor': 'transparent',
                          'flexDirection': 'row-reverse',
                          '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded':
                            {
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
                          '& .MuiAccordionSummary-content.Mui-expanded>div>div>p':
                            {
                              fontWeight: '700',
                              color: colors.solids.black,
                            },
                        }}>
                        <Typography
                          sx={{
                            color: colors.extra.grey1,
                            fontSize: $({ size: 13.5 }),
                            fontWeight: '600',
                            marginLeft: $({ size: 16 }),
                          }}>
                          {subSubject.courseName}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{
                          border: 'none',
                          margin: 0,
                          padding: 0,
                          ml: $({ size: 7 }),
                          pl: $({ size: 25 }),
                          mt: $({ size: 4 }),
                          pt: $({ size: 4 }),
                          gap: $({ size: 8 }),
                          display: 'flex',
                          flexDirection: 'column',
                          borderLeft: `${$({ size: 2 })} solid ${
                            colors.extra.grey4
                          }`,
                        }}>
                        <Typography
                          sx={{
                            fontSize: $({ size: 14 }),
                            fontWeight: '400',
                            color: colors.solids.black,
                          }}>
                          {subSubject.courseDesc}
                        </Typography>
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
                            }}>
                            Prompt
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: $({ size: 13.5 }),
                              fontWeight: '500',
                              color: colors.extra.grey1,
                              // textTransform: 'uppercase',
                            }}>
                            {`${subSubject.prompt}`}
                          </Typography>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  );
                }
                
                )}
              </AccordionDetails>
            </Accordion>
          );
        })}

{/* ---- Remove below hard coded data */}
        {/* {subjectsData.map((subject, index) => {
          return (
            <Accordion
              disableGutters
              key={`accordion-${index}-${subject.id}`}
              expanded={expandedSubject === `${subject.id}`}
              onChange={handleSubjectChange(`${subject.id}`)}
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
                aria-controls={`${subject.id}-content`}
                id={`${subject.id}-content`}
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
                      {subject.title}
                    </Typography>

                    <Box
                      sx={{
                        padding: `${$({ size: 4 })} ${$({ size: 12 })}`,
                        borderRadius: $({ size: 100 }),
                        backgroundColor:
                          subject.tier.toLowerCase() === 'basic'
                            ? colors.solids.orange
                            : subject.tier.toLowerCase() === 'pro'
                            ? colors.solids.green
                            : subject.tier.toLowerCase() === 'premium'
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
                        {subject.tier}
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
                        setCurrentSelectedSubject(subject);
                        setIsSubjectModalOpen({ isOpen: true, index: index });
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
                        setCurrentSelectedSubject(subject);
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
                <Typography
                  sx={{
                    fontSize: $({ size: 14 }),
                    fontWeight: '400',
                    color: colors.solids.black,
                  }}>
                  {subject.description}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: $({ size: 4 }),
                    width: '100%',
                  }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                      gap: $({ size: 16 }),
                    }}>
                    <Typography
                      sx={{
                        fontSize: $({ size: 13.5 }),
                        fontWeight: '500',
                        color: colors.extra.grey3,
                      }}>
                      Icon
                    </Typography>
                    <img
                      alt='child'
                      src={subject.iconPath}
                      style={{
                        width: $({ size: 16 }),
                        height: $({ size: 16 }),
                        objectFit: 'cover',
                        alignSelf: 'flex-start',
                      }}
                    />
                  </Box>
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
                      }}>
                      Color
                    </Typography>

                    <Box
                      sx={{
                        width: $({ size: 24 }),
                        height: $({ size: 14 }),
                        borderRadius: $({ size: 24 }),
                        backgroundColor: subject.color.value,
                      }}
                    />
                  </Box>
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
                      }}>
                      Age Range
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: $({ size: 13.5 }),
                        fontWeight: '500',
                        color: colors.extra.grey1,
                        // textTransform: 'uppercase',
                      }}>
                      {`${subject.minAge} to ${subject.maxAge} years old`}
                    </Typography>
                  </Box>
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
                      }}>
                      Prompt
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: $({ size: 13.5 }),
                        fontWeight: '500',
                        color: colors.extra.grey1,
                        // textTransform: 'uppercase',
                      }}>
                      {`${subject.prompt}`}
                    </Typography>
                  </Box>
                </Box>

                {subject.subSubjects.map((subSubject, index) => {
                  return (
                    <Accordion
                      disableGutters
                      key={`accordion-${index}-${subSubject.id}`}
                      expanded={expandedSubSubject === `${subSubject.id}`}
                      onChange={handleSubSubjectChange(`${subSubject.id}`)}
                      sx={{
                        'border': 'none',
                        '&:before': {
                          display: 'none',
                        },
                        'backgroundColor': 'transparent',
                        'boxShadow': 'none',
                        'width': '100%',
                        'cursor': 'default',
                        'margin': 0,
                        'padding': 0,
                        '& .MuiButtonBase-root.MuiAccordionSummary-root.Mui-expanded':
                          {
                            minHeight: 'fit-content',
                            height: 'fit-content',
                          },
                        '& .MuiAccordionSummary-root': {
                          minHeight: 'fit-content',
                          height: 'fit-content',
                        },
                      }}>
                      <AccordionSummary
                        aria-controls={`${subSubject.id}-content`}
                        id={`${subSubject.id}-content`}
                        // disableGutters
                        elevation={0}
                        expandIcon={
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <ChevronSlimDownIcon
                              size={$({ size: 10, numeric: true })}
                              color={colors.extra.grey3}
                            />
                          </Box>
                        }
                        sx={{
                          'backgroundColor': 'transparent',
                          'flexDirection': 'row-reverse',
                          '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded':
                            {
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
                          '& .MuiAccordionSummary-content.Mui-expanded>div>div>p':
                            {
                              fontWeight: '700',
                              color: colors.solids.black,
                            },
                        }}>
                        <Typography
                          sx={{
                            color: colors.extra.grey1,
                            fontSize: $({ size: 13.5 }),
                            fontWeight: '600',
                            marginLeft: $({ size: 16 }),
                          }}>
                          {subSubject.title}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{
                          border: 'none',
                          margin: 0,
                          padding: 0,
                          ml: $({ size: 7 }),
                          pl: $({ size: 25 }),
                          mt: $({ size: 4 }),
                          pt: $({ size: 4 }),
                          gap: $({ size: 8 }),
                          display: 'flex',
                          flexDirection: 'column',
                          borderLeft: `${$({ size: 2 })} solid ${
                            colors.extra.grey4
                          }`,
                        }}>
                        <Typography
                          sx={{
                            fontSize: $({ size: 14 }),
                            fontWeight: '400',
                            color: colors.solids.black,
                          }}>
                          {subSubject.description}
                        </Typography>
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
                            }}>
                            Prompt
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: $({ size: 13.5 }),
                              fontWeight: '500',
                              color: colors.extra.grey1,
                              // textTransform: 'uppercase',
                            }}>
                            {`${subSubject.prompt}`}
                          </Typography>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          );
        })} */}
      </Box>

      {isSubjectModalOpen.isOpen && (
        <SubjectManagementModal
          isModalOpen={isSubjectModalOpen}
          setIsModalOpen={setIsSubjectModalOpen}
          currentSelectedSubject={currentSelectedSubject}
          setCurrentSelectedSubject={setCurrentSelectedSubject}
          // setIsSubSubjectModalOpen={setIsSubSubjectModalOpen}
          // setCurrentSelectedSubSubject={setCurrentSelectedSubSubject}
          // setSubjectsData={setSubjectsData}
          // subSubjects={
          //   subSubjects.length > 0
          //     ? subSubjects
          //     : currentSelectedSubject?.subSubjects || []
          // }
          // setSubSubjects={setSubSubjects}
        />
      )}

      {/* {isSubSubjectModalOpen.isOpen && (
        <SubSubjectManagementModal
          isModalOpen={isSubSubjectModalOpen}
          setIsModalOpen={setIsSubSubjectModalOpen}
          currentSelectedSubSubject={currentSelectedSubSubject}
          setCurrentSelectedSubSubject={setCurrentSelectedSubSubject}
          setIsSubjectModalOpen={setIsSubjectModalOpen}
          subSubjects={currentSelectedSubject?.subSubjects || []}
          setSubSubjects={setSubSubjects}
        />
      )} */}

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
              Are you sure you want to delete the subject
            </Typography>
            <Typography
              sx={{
                color: colors.solids.black,
                fontSize: $({ size: 18 }),
                fontWeight: '600',
                display: 'inline',
              }}>
              {` ${currentSelectedSubject?.subjectName}`}
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
                setCurrentSelectedSubject(null);
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
                
                deleteSubject(authorizedAxios, currentSelectedSubject, setLoadingDeleteSubject);
                // setIsDeleteConfirmationModalOpen(false);

                // const temp = [...subjectsData];
                // temp.splice(
                //   subjectsData.findIndex(
                //     (item) => item.id === currentSelectedSubject.id
                //   ),
                //   1
                // );
                // setSubjectsData(temp);

                // setCurrentSelectedSubject(null);
              }}
            />
          </Box>
        </CustomModal>
      )}
    </DashboardContainer>
  );
};

export default SubjectsHome;


const loadALlSubjectsData = async (authorizedAxios, setLoadingAllSubjects, setAllSubjects)=> {
  setLoadingAllSubjects(true);
  try {
    const response = await authorizedAxios.get(GET_ALL_SUBJECTS_WITH_COURSES);
    console.log(response.data);
    setAllSubjects(response.data);
  } catch (error) {
    console.error(error);
  }
  setLoadingAllSubjects(false);
  
}

const deleteSubject = async (authorizedAxios, subject, setLoadingDeleteSubject)=> {
  setLoadingDeleteSubject(true);
  // console.log("-- ID of Subject --" + subject.id);
  try {
    const response = await authorizedAxios.delete(DELETE_SUBJECT, {
      data:{id : subject.id}
    });
    console.log(response.data);
    
  } catch (error) {
    console.error(error);
  }
  setLoadingDeleteSubject(false);
  
}

const saveDefaultPrompt = async (authorizedAxios, defaultPrompt, setLoadingDefaultPrompt) => {
  setLoadingDefaultPrompt(true);
  try {
    const response = await authorizedAxios.post(SUBJECT_DEFAULT_PROMPT.SAVE, {
      defaultprompt : defaultPrompt,
      category : "sub-subject",
      isActive : true
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
  setLoadingDefaultPrompt(false);
}

const getDefaultPrompt = async (authorizedAxios, setDefaultPrompt, setLoadingDefaultPrompt) => {
  setLoadingDefaultPrompt(true);
  try {
    const response = await authorizedAxios.get(SUBJECT_DEFAULT_PROMPT.GET);
    console.log(response.data);
    response.data.forEach(element => {
      if (element.category === 'sub-subject') {
        setDefaultPrompt(element.defaultprompt);
      }
    });
    // setDefaultPrompt(response.data);
  } catch (error) {
    console.error(error);
  }
  setLoadingDefaultPrompt(false);
}