import React from 'react';
import { Box, Typography, alpha, useTheme, Grid } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  CustomSearchInput,
  DashboardContainer,
  CustomBreadcrumbs,
  CustomButton,
} from '../../../components';

import { LeftArrowIcon, RightArrowIcon } from '../../../icons';

import { ROUTES } from '../../../config/routes';
import { ASSETS } from '../../../config/assets';
import { tokens } from '../../../theme';
import { $, DarkenHexColor } from '../../../utils';

import LearnSubjectGoalsOfToday from './LearnSubjectGoalsOfToday';
import { SubjectDetailData } from './data';

const LearnSubjectHome = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();
  const { state } = useLocation();

  const [search, setSearch] = React.useState('');
  const [selection, setSelection] = React.useState({});

  const [subjectDetailData, setSubjectDetailData] = React.useState([]);

  React.useEffect(() => {
    setSubjectDetailData(SubjectDetailData);
  }, [state]);

  const HandleBeginLearning = () => {
    navigate(ROUTES.CHILD.LEARN_SUBJECT.CHAT);
  };

  const handleSearch = () => {
    const filteredData = SubjectDetailData.filter((subjectDetail) => {
      return subjectDetail.title.toLowerCase().includes(search.toLowerCase());
    });
    setSubjectDetailData(filteredData);
  };

  return (
    <DashboardContainer
      disableContainer
      wrapperStyle={{ position: 'relative', overflow: 'hidden' }}>
      <Grid
        container
        sx={{
          height: 'max-content',
          minHeight: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}>
        <Grid
          item
          xs={12}
          lg={2.5}
          sx={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: $({ size: 24 }),
            backgroundColor: colors.white[800],
            boxShadow: `0 0 ${$({ size: 2 })} 0 ${alpha(
              colors.solids.black,
              0.25
            )}`,
            borderRadius: $({ size: 12 }),
          }}>
          <LearnSubjectGoalsOfToday />
        </Grid>

        <Grid
          item
          xs={12}
          lg={9.5}
          sx={{
            flex: '1',
            padding: {
              xs: `${$({ size: 20 })} 0 0 0`,
              lg: `0 0 0 ${$({ size: 20 })}`,
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
              padding: $({ size: 36 }),
              gap: $({ size: 24 }),
            }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: $({ size: 8 }),
              }}>
              <Box
                sx={{
                  mt: `-${$({ size: 12 })}`,
                  ml: `-${$({ size: 4 })}`,
                }}>
                <CustomBreadcrumbs
                  data={[
                    { path: ROUTES.CHILD.LEARN_SUBJECT.INDEX, title: 'Home' },
                    {
                      path: ROUTES.CHILD.LEARN_SUBJECT.DETAIL,
                      title: state?.title || 'N/A',
                    },
                  ]}
                />
              </Box>

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
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: $({ size: 16 }),
                  }}>
                  <Box
                    onClick={() => navigate(ROUTES.CHILD.LEARN_SUBJECT.INDEX)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}>
                    <LeftArrowIcon size={$({ size: 24, numeric: true })} />
                  </Box>

                  <Box sx={{ width: '100%' }}>
                    <Typography
                      sx={{
                        fontSize: $({ size: 31.98 }),
                        fontWeight: '600',
                        lineHeight: $({ size: 40 }),
                        color: colors.extra.grey1,
                        display: 'inline',
                      }}>
                      Choose a
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: $({ size: 31.98 }),
                        fontWeight: '600',
                        lineHeight: $({ size: 40 }),
                        color: colors.greenAccent[500],
                        display: 'inline',
                      }}>{` ${state?.title || 'N/A'} `}</Typography>
                    <Typography
                      sx={{
                        fontSize: $({ size: 31.98 }),
                        fontWeight: '600',
                        lineHeight: $({ size: 40 }),
                        color: colors.extra.grey1,
                        display: 'inline',
                      }}>
                      Subject
                    </Typography>
                  </Box>
                </Box>

                <CustomSearchInput
                  placeholder='Search for your subject'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  containerStyle={{
                    maxWidth: {
                      xs: '100%',
                      sm: $({ size: 352 }),
                    },
                    width: {
                      xs: '100%',
                      sm: $({ size: 352 }),
                    },
                  }}
                  handleSearch={handleSearch}
                  handleSearchOnEveryKeyStroke={handleSearch}
                />
              </Box>
            </Box>

            {subjectDetailData.length === 0 && (
              <Typography
                sx={{
                  fontSize: $({ size: 24 }),
                  fontWeight: '400',
                  lineHeight: $({ size: 30 }),
                  color: colors.extra.grey3,
                  mt: `-${$({ size: 8 })}`,
                }}>
                No Subject Found...
              </Typography>
            )}

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: `repeat(auto-fill, minmax(${$({
                  size: 150,
                })}, 1fr))`,
                gridGap: {
                  xs: $({ size: 24 }),
                  md: $({ size: 36 }),
                },
                gridAutoRows: '1fr', // to make all the rows the same height
              }}>
              {subjectDetailData.map((subjectDetail, index) => {
                return (
                  <Box
                    key={index}
                    onClick={() => {
                      setSelection({
                        ...subjectDetail,
                        subject: { ...state },
                      });
                    }}
                    sx={{
                      padding: $({ size: 16 }),
                      borderRadius: $({ size: 16 }),
                      boxShadow: `0 0 ${$({ size: 2 })} ${alpha(
                        colors.solids.black,
                        0.25
                      )}`,
                      backgroundColor:
                        selection.id === subjectDetail.id
                          ? DarkenHexColor({ hex: state?.color })
                          : state?.color,
                      gap: $({ size: 8 }),
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      width: $({ size: 160 }),
                      height: $({ size: 160 }),
                    }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Box
                        sx={{
                          backgroundColor: colors.white[800],
                          width: $({ size: 40 }),
                          height: $({ size: 40 }),
                          borderRadius: $({ size: 40 }),
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: $({ size: 8 }),
                        }}>
                        <img
                          src={ASSETS.PARENT.ICONS.DAILY_QUIZ}
                          alt={subjectDetail.title}
                          style={{
                            width: '100%',
                            height: '100%',
                          }}
                        />
                      </Box>
                    </Box>
                    <Typography
                      sx={{
                        fontSize: $({ size: 18 }),
                        fontWeight: '500',
                        lineHeight: $({ size: 25 }),
                        color: colors.solids.black,
                      }}>
                      {subjectDetail.title}
                    </Typography>
                  </Box>
                );
              })}
            </Box>

            <Box sx={{ flex: '1' }} />

            {selection.id && (
              <CustomButton
                onClick={HandleBeginLearning}
                label='Begin Learning'
                sx={{ maxWidth: 'max-content', alignSelf: 'flex-end' }}
                rightIcon={
                  <RightArrowIcon size={$({ size: 24, numeric: true })} />
                }
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};

export default LearnSubjectHome;
