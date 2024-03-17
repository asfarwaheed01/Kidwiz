import React from 'react';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { Pie } from '@nivo/pie';
import { useNavigate } from 'react-router-dom';

import { useAppContext } from '../../../context/appContext';

import SelectChildAndDatePanel from '../../../components/parentDashboard/SelectChildAndDatePanel';
import SelectedChildWithTimeDetails from '../../../components/parentDashboard/SelectedChildWithTimeDetails';
// import SelectChildAndDatePanel from '../../../components/parent/SelectChildAndDatePanel';
// import SelectedChildWithTimeDetails from '../../../components/parent/SelectedChildWithTimeDetails';

import {
  CustomButton,
  // CustomDropDown,
  DashboardContainer,
  // QuestionProgressBar,
} from '../../../components';

import {
  RightArrowIcon,
  ChestIcon,
  ScienceIcon,
  EnglishIcon,
  MathIcon,
  RibbonIcon,
  CompassIcon,
  PersonalityTestIcon,
} from '../../../icons';

import { ASSETS } from '../../../config/assets';
import { ROUTES } from '../../../config/routes';
import { tokens } from '../../../theme';
import { $ } from '../../../utils';

const DashboardHome = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { users_children, selected_Child_index, changeSelectedChild }  = useAppContext();

  const navigate = useNavigate();

  // const childData = [
  //   {
  //     fullname: 'Liam Johnson',
  //     email: 'labanovskiy@gmail.com',
  //     photo: ASSETS.ON_BOARDING.CHILD,
  //   },
  //   {
  //     fullname: 'Alex Johnson',
  //     email: 'samhar25@gmail.com',
  //     photo: ASSETS.ON_BOARDING.CHILD,
  //   },
  //   {
  //     fullname: 'Mike Johnson',
  //     email: 'mikeluther1@gmail.com',
  //     photo: ASSETS.ON_BOARDING.CHILD,
  //   },
  // ];

  // const [childDropDownOpen, setChildDropDownOpen] = React.useState(false);
  // const [selectedChild, setSelectedChild] = React.useState(users_children[selected_Child_index]);

  // const [datesDropDownOpen, setDatesDropDownOpen] = React.useState(false);
  // const [selectedDates, setSelectedDates] = React.useState({});

  // React.useEffect(() => {
  //   setSelectedDates({
  //     startDate: 'April 9, 2023',
  //     endDate: 'May 6, 2023',
  //   });
  // }, []);

  const [isPersonalityTestCompleted, setIsPersonalityTestCompleted] =
    React.useState(false);

  const personalityData = [
    { title: 'Openness', value: 76, color: colors.personality.openness },
    {
      title: 'Conscientious',
      value: 49,
      color: colors.personality.conscientious,
    },
    {
      title: 'Extraversion',
      value: 81,
      color: colors.personality.extraversion,
    },
    {
      title: 'Agreeableness',
      value: 81,
      color: colors.personality.agreeableness,
    },
    { title: 'Neuroticism', value: 94, color: colors.personality.neuroticism },
  ];

  const gradeGraphData = [
    { id: 'A+', label: 'A+', value: 30, color: colors.verticalFiller[400] },
    { id: 'B+', label: 'B+', value: 25, color: colors.verticalFiller[300] },
    { id: 'B-', label: 'B-', value: 15, color: colors.verticalFiller[100] },
    { id: 'C+', label: 'C+', value: 15, color: colors.verticalFiller[200] },
    { id: 'D+', label: 'D+', value: 15, color: colors.verticalFiller[500] },
  ];

  const highestGradeData = [
    {
      subject: 'Science',
      topic: 'Earth & Space',
      grade: 'A+',
      icon: <ScienceIcon />,
    },
    {
      subject: 'Science',
      topic: 'Weather & Climate',
      grade: 'A+',
      icon: <ScienceIcon />,
    },
    { subject: 'English', topic: 'Drama', grade: 'A+', icon: <EnglishIcon /> },
    {
      subject: 'Math',
      topic: 'Problem Solving',
      grade: 'A+',
      icon: <MathIcon />,
    },
    { subject: 'Math', topic: 'Geometry', grade: 'A+', icon: <MathIcon /> },
  ];

  const lowestGradeData = [
    { subject: 'Science', topic: 'Animals', grade: 'D', icon: <ScienceIcon /> },
    {
      subject: 'English',
      topic: 'Dialogue',
      grade: 'D',
      icon: <EnglishIcon />,
    },
    {
      subject: 'Math',
      topic: 'Problem Solving & Login',
      grade: 'D+',
      icon: <MathIcon />,
    },
    {
      subject: 'Money',
      topic: 'Currencies',
      grade: 'C+',
      icon: <EnglishIcon />,
    },
    {
      subject: 'Money',
      topic: 'Management',
      grade: 'C+',
      icon: <EnglishIcon />,
    },
  ];

  return (
    <DashboardContainer
      disableContainer
      wrapperStyle={{ position: 'relative', overflowY: 'scroll' }}>
      <Grid
        container
        sx={{
          height: 'max-content',
          minHeight: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}>
        {/* {(childDropDownOpen || datesDropDownOpen) && (
          <Box
            onClick={() => {
              setChildDropDownOpen(false);
              setDatesDropDownOpen(false);
            }}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              zIndex: 99,
              borderRadius: $({ size: 12 }),
            }}
          />
        )} */}

        <Grid
          item
          xs={12}
          lg={2.8}
          sx={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: $({ size: 24 }),
          }}>
          {/* <Grid
            container
            sx={{
              backgroundColor: colors.white[800],
              boxShadow: `0 0 ${$({ size: 2 })} 0 ${alpha(
                colors.solids.black,
                0.25
              )}`,
              borderRadius: $({ size: 12 }),
              height: '100%',
              minHeight: $({ size: 443 }),
              padding: $({ size: 24 }),
              position: 'relative',
            }}>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={12}
              sx={{
                padding: {
                  xs: `0 0 ${$({ size: 24 })} 0`,
                  sm: `0 ${$({ size: 24 })} 0 0`,
                  md: `0 ${$({ size: 24 })} 0 0`,
                  lg: `0 0 ${$({ size: 24 })} 0`,
                },
              }}>
              <CustomDropDown
                label='Child'
                value='Choose a child'
                placeholder='Choose a child'
                dropDownOpen={childDropDownOpen}
                setDropDownOpen={setChildDropDownOpen}
                labelStyle={{
                  fontWeight: '600',
                  fontSize: $({ size: 13.5 }),
                  lineHeight: $({ size: 8 }),
                }}
                placeholderClosedStyle={{
                  fontSize: $({ size: 13.5 }),
                  lineHeight: $({ size: 20 }),
                }}
                placeholderOpenStyle={{
                  fontSize: $({ size: 13.5 }),
                  lineHeight: $({ size: 25 }),
                }}
                inputClosedStyle={{
                  padding: `${$({ size: 12 })} ${$({ size: 16 })}`,
                }}
                inputOpenStyle={{
                  padding: `${$({ size: 12 })} ${$({ size: 16 })}`,
                }}
                data={users_children.map((item, index) => {
                  return {
                    onClick: () => {
                      setSelectedChild(item); // remove this lately
                      changeSelectedChild(index);
                    },
                    component: (
                      <>
                        <img
                          src={item.img}
                          alt={item.fullname}
                          style={{
                            width: $({ size: 40 }),
                            height: $({ size: 40 }),
                            borderRadius: $({ size: 40 }),
                            border: `${$({ size: 1 })} solid ${
                              colors.extra.grey4
                            }`,
                            objectFit: 'cover',
                          }}
                        />
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            width: '100%',
                            overflow: 'hidden',
                          }}>
                          <Typography
                            sx={{
                              fontSize: $({ size: 13.5 }),
                              fontWeight: '500',
                              color: colors.extra.grey1,
                              lineHeight: $({ size: 22 }),
                              width: '100%',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                            }}>
                            {item.fullname}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: $({ size: 12 }),
                              fontWeight: '400',
                              color: colors.extra.grey2,
                              lineHeight: $({ size: 22 }),
                              width: '100%',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                            }}>
                            {`${item.age} years old ${item.gender === 'female' ? 'girl':'boy'}`}
                          </Typography>
                        </Box>
                      </>
                    ),
                  };
                })}
              />

              <Box height={`${$({ size: 20 })}`} />

              <Typography
                sx={{
                  fontSize: $({ size: 13.5 }),
                  fontWeight: '600',
                  lineHeight: $({ size: 13.5 }),
                  color: colors.extra.grey3,
                  visibility: selectedChild.fullname ? 'visible' : 'hidden',
                }}>
                Currently Selected
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: $({ size: 8 }),
                  marginTop: $({ size: 8 }),
                  visibility: selectedChild.fullname ? 'visible' : 'hidden',
                }}>
                <Avatar
                  src={users_children[selected_Child_index]?.img || ''}
                  sx={{
                    width: $({ size: 40 }),
                    height: $({ size: 40 }),
                    borderRadius: $({ size: 40 }),
                    border: `${$({ size: 2 })} solid ${
                      colors.greenAccent[500]
                    }`,
                  }}
                />

                <Box sx={{ width: '100%', overflow: 'hidden' }}>
                  <Typography
                    sx={{
                      fontSize: $({ size: 13.5 }),
                      fontWeight: '500',
                      lineHeight: $({ size: 13.5 }),
                      color: colors.extra.grey1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                    {users_children[selected_Child_index]?.fullname || ''}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: $({ size: 10 }),
                      fontWeight: '400',
                      color: colors.extra.grey2,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                    {`${users_children[selected_Child_index].age} years old ${users_children[selected_Child_index].gender === 'female' ? 'girl':'boy'}`}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={12}
              sx={{
                mt: $({ size: -64 }),
              }}>
              <CustomDropDown
                label='Dates'
                value='Choose dates'
                placeholder='Choose dates'
                dropDownOpen={datesDropDownOpen}
                setDropDownOpen={setDatesDropDownOpen}
                labelStyle={{
                  fontWeight: '600',
                  fontSize: $({ size: 13.5 }),
                  lineHeight: $({ size: 8 }),
                }}
                placeholderClosedStyle={{
                  fontSize: $({ size: 13.5 }),
                  lineHeight: $({ size: 20 }),
                }}
                placeholderOpenStyle={{
                  fontSize: $({ size: 13.5 }),
                  lineHeight: $({ size: 25 }),
                }}
                inputClosedStyle={{
                  padding: `${$({ size: 12 })} ${$({ size: 16 })}`,
                }}
                inputOpenStyle={{
                  padding: `${$({ size: 12 })} ${$({ size: 16 })}`,
                }}
              />

              <Box height={`${$({ size: 16 })}`} />

              <Typography
                sx={{
                  fontSize: $({ size: 13.5 }),
                  fontWeight: '600',
                  color: colors.extra.grey3,
                  visibility: selectedDates?.startDate ? 'visible' : 'hidden',
                }}>
                Currently Selected
              </Typography>
              <Typography
                sx={{
                  fontSize: $({ size: 13.5 }),
                  fontWeight: '500',
                  color: colors.extra.grey1,
                  visibility: selectedDates?.startDate ? 'visible' : 'hidden',
                }}>{`${selectedDates?.startDate} 🡢 ${selectedDates?.endDate}`}</Typography>
            </Grid>
          </Grid> */}

          <SelectChildAndDatePanel/>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: colors.white[800],
              boxShadow: `0 0 ${$({ size: 2 })} 0 ${alpha(
                colors.solids.black,
                0.25
              )}`,
              width: '100%',
              borderRadius: $({ size: 12 }),
              height: '100%',
              padding: $({ size: 24 }),
              gap: $({ size: 24 }),
              position: 'relative',
            }}>
            <Box
              sx={{
                display: 'flex',
                gap: $({ size: 16 }),
                flexDirection: 'column',
              }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: $({ size: 22 }),
                }}>
                <Box
                  sx={{
                    borderRadius: $({ size: 150 }),
                    backgroundColor: colors.extra.grey5,
                    width: $({ size: 64 }),
                    height: $({ size: 64 }),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <PersonalityTestIcon
                    color={colors.extra.grey1}
                    size={$({ size: 36, numeric: true })}
                  />
                </Box>

                <Typography
                  sx={{
                    fontSize: $({ size: 18 }),
                    fontWeight: '600',
                    color: colors.extra.grey1,
                  }}>
                  Your Personality
                </Typography>
              </Box>

              {isPersonalityTestCompleted ? (
                <Box
                  sx={{
                    display: 'flex',
                    gap: $({ size: 3 }),
                    flexDirection: 'column',
                  }}>
                  {personalityData.map((item, index) => (
                    <Box key={index}>
                      <Typography
                        sx={{
                          fontSize: $({ size: 18 }),
                          fontWeight: '500',
                          color: item.color,
                          display: 'inline',
                          lineHeight: $({ size: 18 }),
                        }}>
                        {`${item.title}: `}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: $({ size: 18 }),
                          fontWeight: '600',
                          color: colors.extra.grey1,
                          display: 'inline',
                          lineHeight: $({ size: 18 }),
                        }}>{`${item.value}%`}</Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box>
                  <Typography
                    sx={{
                      fontSize: $({ size: 18 }),
                      fontWeight: '500',
                      color: colors.extra.grey1,
                      display: 'inline',
                      lineHeight: $({ size: 24 }),
                    }}>
                    Take the
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: $({ size: 18 }),
                      fontWeight: '600',
                      color: colors.extra.grey1,
                      display: 'inline',
                      lineHeight: $({ size: 24 }),
                    }}>
                    {' Big Five personality test '}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: $({ size: 18 }),
                      fontWeight: '500',
                      color: colors.extra.grey1,
                      display: 'inline',
                      lineHeight: $({ size: 24 }),
                    }}>
                    for a more customized experience
                  </Typography>
                </Box>
              )}
            </Box>

            <CustomButton
              label='Tests & Results'
              rightIcon={
                <RightArrowIcon
                  size={$({ size: 15, numeric: true })}
                  color={colors.white[800]}
                />
              }
              sx={{
                'width': 'fit-content',
                'alignSelf': 'flex-end',
                'backgroundColor': colors.extra.grey1,
                '&:hover': { backgroundColor: alpha(colors.extra.grey1, 0.8) },
                'fontSize': $({ size: 13.5 }),
                'padding': `${$({ size: 3 })} ${$({ size: 25 })}`,
                'fontWeight': '600',
              }}
              onClick={() => {
                setIsPersonalityTestCompleted(!isPersonalityTestCompleted);
              }}
            />
          </Box>
        </Grid>

        {users_children[selected_Child_index].fullname && (
          <Grid
            item
            xs={12}
            lg={9.2}
            sx={{
              flex: '1',
              padding: {
                xs: `${$({ size: 24 })} 0 0 0`,
                lg: `0 0 0 ${$({ size: 24 })}`,
              },
              position: 'relative',
            }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: colors.white[800],
                boxShadow: `0 0 ${$({ size: 2 })} 0 ${alpha(
                  colors.solids.black,
                  0.25
                )}`,
                width: '100%',
                borderRadius: $({ size: 12 }),
                height: '100%',
                padding: $({ size: 24 }),
                gap: $({ size: 24 }),
                // backgroundColor:'red',
                // overflowY:'auto',
              }}>
              
              {/* <Box
                sx={{
                  display: 'flex',
                  gap: $({ size: 16 }),
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  flexDirection: { xs: 'column', sm: 'row' },
                }}>
                <Avatar
                  src={users_children[selected_Child_index].img}
                  sx={{
                    width: $({ size: 112 }),
                    height: $({ size: 112 }),
                    borderRadius: $({ size: 112 }),
                    border: `${$({ size: 3 })} solid ${
                      colors.greenAccent[500]
                    }`,
                    objectFit: 'cover',
                  }}
                />

                <Box
                  sx={
                    {
                      // width: { xs: '100%', md: '70%', lg: '50%' },
                      // maxWidth: $({ size: 800 }),
                    }
                  }>
                  <Typography
                    sx={{
                      fontWeight: '600',
                      fontSize: $({ size: 24 }),
                      color: colors.solids.black,
                    }}>
                    {users_children[selected_Child_index].fullname}
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      gap: $({ size: 16 }),
                      alignItems: 'center',
                    }}>
                    <Box sx={{ width: $({ size: 412 }) }}>
                      <Typography
                        sx={{
                          fontWeight: '600',
                          fontSize: $({ size: 13.5 }),
                          color: colors.extra.grey3,
                          mt: $({ size: 4 }),
                        }}>
                        Time spent learning
                      </Typography>
                      <QuestionProgressBar
                        showQuestionNumber={false}
                        currentQuestion={6}
                      />
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginTop: $({ size: 4 }),
                        }}>
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: '600',
                              fontSize: $({ size: 13.5 }),
                              color: colors.extra.grey1,
                              display: 'inline',
                            }}>
                            {'4 hours 20m'}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: '400',
                              fontSize: $({ size: 13.5 }),
                              color: colors.extra.grey1,
                              display: 'inline',
                            }}>
                            {' done!'}
                          </Typography>
                        </Box>

                        <Box>
                          <Typography
                            sx={{
                              fontWeight: '400',
                              fontSize: $({ size: 13.5 }),
                              color: colors.extra.grey1,
                              display: 'inline',
                            }}>
                            {'Goal: '}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: '600',
                              fontSize: $({ size: 13.5 }),
                              color: colors.extra.grey1,
                              display: 'inline',
                            }}>
                            {'8 hours'}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        backgroundColor: colors.parentDashboard[1],
                        borderRadius: $({ size: 20 }),
                        padding: $({ size: 8 }),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <ChestIcon size={$({ size: 18, numeric: true })} />
                    </Box>
                  </Box>
                </Box>
              </Box> */}

              <SelectedChildWithTimeDetails />
              

              <Box
                sx={{
                  backgroundColor: colors.extra.grey5,
                  borderRadius: $({ size: 14 }),
                  padding: $({ size: 24 }),
                  flex: '1',
                  maxHeight: $({ size: 313 }),
                  display: 'flex',
                  flexDirection: 'column',
                  gap: $({ size: 8 }),
                  marginTop: $({ size: 16 }),
                }}>
                <Typography
                  sx={{
                    fontWeight: '600',
                    fontSize: $({ size: 18 }),
                    color: colors.extra.grey1,
                    mb: { xs: $({ size: 8 }), md: 0 },
                    lineHeight: $({ size: 18 }),
                  }}>
                  Overall Grade
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    gap: $({ size: 24 }),
                    flexDirection: { xs: 'column', md: 'row' },
                  }}>
                  <Box
                    sx={{
                      position: 'relative',
                      height: $({ size: 160 }),
                      width: $({ size: 160 }),
                      mt: $({ size: 4 }),
                    }}>
                    <Box
                      sx={{
                        filter: `drop-shadow(0 0 ${$({ size: 5 })} ${alpha(
                          colors.solids.black,
                          0.1
                        )})`,
                      }}>
                      <Pie
                        data={gradeGraphData}
                        innerRadius={0.65}
                        padAngle={0}
                        legends={[]}
                        enableArcLabels={false}
                        enableArcLinkLabels={false}
                        isInteractive={false}
                        width={$({ size: 160, numeric: true })}
                        height={$({ size: 160, numeric: true })}
                        animate={false}
                        fit={true}
                        colors={(d) => d.data.color}
                        sortByValue={true}
                      />
                    </Box>

                    <Typography
                      sx={{
                        fontWeight: '700',
                        fontSize: $({ size: 42 }),
                        color: colors.extra.grey1,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}>
                      B-
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      gap: $({ size: 10 }),
                      flex: '1',
                      width: '100%',
                      flexDirection: { xs: 'column', md: 'row' },
                      mt: $({ size: 14 }),
                    }}>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: $({ size: 8 }),
                        flexDirection: 'column',
                        flex: '1',
                      }}>
                      <Typography
                        sx={{
                          fontWeight: '600',
                          fontSize: $({ size: 13.5 }),
                          lineHeight: $({ size: 14 }),
                          color: colors.extra.grey1,
                        }}>
                        Highest Grades
                      </Typography>
                      {highestGradeData.map((item, index) => (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: $({ size: 8 }),
                          }}
                          key={index}>
                          <Box
                            sx={{
                              flex: `0 0 ${$({ size: 11 })}`,
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            {item.icon}
                          </Box>
                          <Box>
                            <Typography
                              sx={{
                                fontWeight: '500',
                                fontSize: $({ size: 13.5 }),
                                color: colors.extra.grey1,
                                display: 'inline',
                              }}>
                              {`${item.subject} > ${item.topic}: `}
                            </Typography>
                            <Typography
                              sx={{
                                fontWeight: '600',
                                fontSize: $({ size: 13.5 }),
                                color: colors.extra.grey1,
                                display: 'inline',
                              }}>
                              {item.grade}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: $({ size: 8 }),
                        flexDirection: 'column',
                        flex: '1',
                      }}>
                      <Typography
                        sx={{
                          fontWeight: '600',
                          fontSize: $({ size: 13.5 }),
                          lineHeight: $({ size: 14 }),
                          color: colors.extra.grey1,
                        }}>
                        Lowest Grades
                      </Typography>
                      {lowestGradeData.map((item, index) => (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: $({ size: 8 }),
                          }}
                          key={index}>
                          {/* TODO: REPLACE ICON WITH SVG PATH */}
                          <Box
                            sx={{
                              flex: `0 0 ${$({ size: 11 })}`,
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            {item.icon}
                          </Box>
                          <Box>
                            <Typography
                              sx={{
                                fontWeight: '500',
                                fontSize: $({ size: 13.5 }),
                                color: colors.extra.grey1,
                                display: 'inline',
                              }}>
                              {`${item.subject} > ${item.topic}: `}
                            </Typography>
                            <Typography
                              sx={{
                                fontWeight: '600',
                                fontSize: $({ size: 13.5 }),
                                color: colors.extra.grey1,
                                display: 'inline',
                              }}>
                              {item.grade}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ flex: '1' }} />

                <CustomButton
                  label='Full Report'
                  rightIcon={
                    <RightArrowIcon
                      size={$({ size: 15, numeric: true })}
                      color={colors.white[800]}
                    />
                  }
                  sx={{
                    'width': 'fit-content',
                    'alignSelf': 'flex-end',
                    'backgroundColor': colors.extra.grey1,
                    '&:hover': {
                      backgroundColor: alpha(colors.extra.grey1, 0.8),
                    },
                    'textTransform': 'none',
                    'fontSize': $({ size: 13.5 }),
                    'padding': `${$({ size: 3 })} ${$({ size: 25 })}`,
                    'fontWeight': '600',
                  }}
                  onClick={() => {}}
                />
              </Box>

              <Grid
                container
                sx={{ display: 'flex', flex: 1 }}>
                <Grid
                  item
                  xs={12}
                  lg={6}
                  sx={{
                    padding: {
                      xs: `0 0 ${$({ size: 24 })} 0`,
                      lg: `0 ${$({ size: 12 })} 0 0`,
                    },
                    display: 'flex',
                  }}>
                  <Box
                    sx={{
                      backgroundColor: colors.extra.grey5,
                      borderRadius: $({ size: 14 }),
                      padding: $({ size: 24 }),
                      flex: '1',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: $({ size: 20 }),
                    }}>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: $({ size: 16 }),
                        alignItems: 'center',
                      }}>
                      <Box
                        sx={{
                          backgroundColor: colors.white[800],
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: $({ size: 64 }),
                          width: $({ size: 64 }),
                          height: $({ size: 64 }),
                        }}>
                        <RibbonIcon
                          size={$({ size: 32, numeric: true })}
                          color={colors.extra.grey1}
                        />
                      </Box>
                      <Typography
                        sx={{
                          fontWeight: '600',
                          fontSize: $({ size: 18 }),
                          color: colors.extra.grey1,
                        }}>
                        Daily Quiz
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        sx={{
                          fontWeight: '500',
                          fontSize: $({ size: 18 }),
                          color: colors.extra.grey1,
                          display: 'inline',
                        }}>
                        {`Today's daily quiz is about `}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: '600',
                          fontSize: $({ size: 18 }),
                          color: colors.greenAccent[600],
                          display: 'inline',
                        }}>
                        {`Animals and Their Habitats`}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: '500',
                          fontSize: $({ size: 18 }),
                          color: colors.extra.grey1,
                          display: 'inline',
                        }}>
                        {'!'}
                      </Typography>
                    </Box>

                    <Box sx={{ flex: '1' }} />

                    <CustomButton
                      label='Quiz'
                      rightIcon={
                        <RightArrowIcon
                          size={$({ size: 15, numeric: true })}
                          color={colors.white[800]}
                        />
                      }
                      sx={{
                        'width': 'fit-content',
                        'alignSelf': 'flex-end',
                        'backgroundColor': colors.extra.grey1,
                        '&:hover': {
                          backgroundColor: alpha(colors.extra.grey1, 0.8),
                        },
                        'textTransform': 'none',
                        'fontSize': $({ size: 13.5 }),
                        'padding': `${$({ size: 3 })} ${$({ size: 25 })}`,
                        'fontWeight': '600',
                      }}
                      onClick={() => {
                        navigate(ROUTES.PARENT.DAILY_QUIZ.INDEX);
                      }}
                    />
                  </Box>
                </Grid>

                <Grid
                  item
                  xs={12}
                  lg={6}
                  sx={{
                    padding: {
                      xs: '0 0 0 0',
                      lg: `0 0 0 ${$({ size: 12 })}`,
                    },
                    display: 'flex',
                  }}>
                  <Box
                    sx={{
                      backgroundColor: colors.extra.grey5,
                      borderRadius: $({ size: 14 }),
                      padding: $({ size: 24 }),
                      flex: '1',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: $({ size: 16 }),
                    }}>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: $({ size: 16 }),
                        alignItems: 'center',
                      }}>
                      <Box
                        sx={{
                          backgroundColor: colors.white[800],
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: $({ size: 64 }),
                          width: $({ size: 64 }),
                          height: $({ size: 64 }),
                        }}>
                        <CompassIcon
                          size={$({ size: 32, numeric: true })}
                          color={colors.extra.grey1}
                        />
                      </Box>
                      <Typography
                        sx={{
                          fontWeight: '600',
                          fontSize: $({ size: 18 }),
                          color: colors.extra.grey1,
                        }}>
                        Explore Subjects
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        sx={{
                          fontWeight: '500',
                          fontSize: $({ size: 18 }),
                          color: colors.extra.grey1,
                          display: 'inline',
                          lineHeight: $({ size: 30 }),
                        }}>
                        {`Spin the wheel of fortune and try your chance with a `}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: '600',
                          fontSize: $({ size: 18 }),
                          color: colors.extra.grey1,
                          display: 'inline',
                        }}>
                        {`random subject`}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: '500',
                          fontSize: $({ size: 18 }),
                          color: colors.extra.grey1,
                          display: 'inline',
                        }}>
                        {'!'}
                      </Typography>
                    </Box>

                    <Box sx={{ flex: '1' }} />

                    <CustomButton
                      label='Explore'
                      rightIcon={
                        <RightArrowIcon
                          size={$({ size: 15, numeric: true })}
                          color={colors.white[800]}
                        />
                      }
                      sx={{
                        'width': 'fit-content',
                        'alignSelf': 'flex-end',
                        'backgroundColor': colors.extra.grey1,
                        '&:hover': {
                          backgroundColor: alpha(colors.extra.grey1, 0.8),
                        },
                        'textTransform': 'none',
                        'fontSize': $({ size: 13.5 }),
                        'padding': `${$({ size: 3 })} ${$({ size: 25 })}`,
                        'fontWeight': '600',
                      }}
                      onClick={() => {}}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        )}
        
      </Grid>
    </DashboardContainer>
  );
};

export default DashboardHome;
