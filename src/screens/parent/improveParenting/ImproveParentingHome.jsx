import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, alpha, useTheme } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppContext } from '../../../context/appContext';
import { useNavigate } from 'react-router-dom';

import {
  CustomSearchInput,
  DashboardContainer,
  CustomButton,
  CustomBreadcrumbs,
} from '../../../components';

import { ROLE_PLAYING_TOPIC } from '../../../config/backend_endpoints';

import {
  ChevronForwardIcon,
  LeftArrowIcon,
  LockIcon,
  RightArrowIcon,
} from '../../../icons';

import { ROUTES } from '../../../config/routes';
import { tokens } from '../../../theme';
import { $, DarkenHexColor } from '../../../utils';

// import { TopicsData } from './data';


const ImproveParentingHome = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { user, authorizedAxios } = useAppContext();

  const [search, setSearch] = React.useState('');
  const TopicsDataArray = [];
  const [topicsData, setTopicsData] = React.useState([]);

  const [selectedTopic, setSelectedTopic] = React.useState([]);
  const [selectedSubTopic, setSelectedSubTopic] = React.useState({});
  // const [selectedSection, setSelectedSection] = React.useState({});

  // const [renderBreadcrumbs, setRenderBreadcrumbs] = React.useState(false);
  const [topicDetailData, setTopicDetailData] = React.useState([]);
  const [serverRequest, setServerRequest] = useState({
    loading: false,
    status: "", // strat || complete,
    response: "",
    error: "",
  });

  React.useEffect(() => {
    setTopicsData(TopicsDataArray || []);
    setSelectedTopic(TopicsDataArray?.[0] || {});
    setTopicDetailData(TopicsDataArray[0]?.subTopics || []);
  }, []);

  const HandleBeginLearning = () => {
    
    navigate(
      ROUTES.PARENT.IMPROVE_PARENTING.CHAT.replace(
        ':topicId',
        selectedTopic.id
      ).replace(':subTopicId',selectedSubTopic.id),
      {
        state: { rolePlayTopic: selectedTopic, rolePlaySubTopic: selectedSubTopic } ,
      }
    );
    // if (selectedSubTopic?.title && !renderBreadcrumbs) {
      // setTopicDetailData(selectedSubTopic.sections);
      // setRenderBreadcrumbs(true);
      // return;
    // }

    // alert(
    //   `You have selected the following:\n\nTopic: ${selectedTopic.title}\nSub Topic: ${selectedSubTopic.title}`
    // );
  };

  const handleSearch = () => {
    const filteredData = TopicsDataArray.filter((topic) => {
      return topic.title.toLowerCase().includes(search.toLowerCase());
    });
    setTopicsData(filteredData || []);
    setSelectedTopic(filteredData?.[0] || {});
    setTopicDetailData(filteredData[0]?.subTopics || []);
  };

  useEffect(()=>{
    loadImproveParentingTopics(authorizedAxios, setServerRequest, TopicsDataArray, setTopicsData);
  }, []);

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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: $({ size: 8 }),
          flex: '1',
        }}>
        <Box
          sx={{
            mt: `-${$({ size: 12 })}`,
            ml: `-${$({ size: 4 })}`,
          }}>
          <CustomBreadcrumbs
            data={[
              { path: ROUTES.PARENT.IMPROVE_PARENTING.INDEX, title: 'Home' },
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
          <Typography
            sx={{
              fontSize: $({ size: 31.98 }),
              fontWeight: '600',
              lineHeight: $({ size: 40 }),
              color: colors.extra.grey1,
            }}>
            Choose a Topic
          </Typography>

          <CustomSearchInput
            placeholder='Search for your topic'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            containerStyle={{
              maxWidth: {
                xs: '100%',
                sm: $({ size: 352 }),
              },
              minWidth: {
                xs: '100%',
                sm: $({ size: 352 }),
              },
            }}
            handleSearch={handleSearch}
            handleSearchOnEveryKeyStroke={handleSearch}
          />
        </Box>

            { serverRequest.loading && 
              <Box sx={{
                minHeight:"100px",
              }}>
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
        {(!serverRequest.loading && topicsData.length === 0) && (
          <Typography
            sx={{
              fontSize: $({ size: 24 }),
              fontWeight: '400',
              lineHeight: $({ size: 30 }),
              color: colors.extra.grey3,
              mt: `${$({ size: 24 })}`,
            }}>
            No Topic Found...
          </Typography>
        )}

        {topicsData.length > 0 && (
          <>
            <Grid
              container
              sx={{ mt: $({ size: 24 }), maxWidth: $({ size: 1536 }) }}>
              <Grid
                item
                xs={12}
                sm={6}
                md={5.6}>
                <Box
                  sx={{
                    mt: $({ size: 8 }),
                    display: 'flex',
                    flexDirection: 'column',
                    gap: $({ size: 12 }),
                    width: '100%',
                    pr: {
                      xs: 0,
                      sm: $({ size: 24 }),
                      md: $({ size: 36 }),
                    },
                    borderRight: {
                      xs: 'none',
                      sm: `${$({ size: 1 })} solid ${colors.extra.grey4}`,
                      md: `${$({ size: 1 })} solid ${colors.extra.grey4}`,
                    },
                    borderBottom: {
                      xs: `${$({ size: 1 })} solid ${colors.extra.grey4}`,
                      sm: 'none',
                      md: 'none',
                    },
                    pb: {
                      xs: $({ size: 16 }),
                      sm: 0,
                      md: 0,
                    },
                  }}>
                  {topicsData.map((topic, index) => {
                    return (
                      <Box
                        key={topic.id + "topic" + index}
                        onClick={() => {
                          if (user.tier != topic.tier) return;

                          setSelectedTopic(topic);
                          setSelectedSubTopic({});
                          // setSelectedSection({});

                          setTopicDetailData(topic.subroleplays);
                          // setRenderBreadcrumbs(false);
                        }}
                        sx={{
                          'display': 'flex',
                          'justifyContent': user.tier == topic.tier
                            ? 'space-between'
                            : 'flex-start',
                          'alignItems': 'center',
                          'gap': $({ size: 12 }),
                          'borderRadius': $({ size: 8 }),
                          'padding': `${$({ size: 14 })} ${$({ size: 24 })}`,
                          'backgroundColor':
                            topic.id === selectedTopic?.id
                              ? colors.greenAccent[400]
                              : 'transparent',
                          'width': '100%',
                          'cursor': 'pointer',
                          '&:hover': {
                            backgroundColor:
                              topic.id === selectedTopic?.id
                                ? colors.greenAccent[400]
                                : user.tier == topic.tier
                                ? alpha(colors.greenAccent[400], 0.25)
                                : alpha(colors.extra.grey1, 0.05),
                          },
                        }}>
                        <Typography
                          sx={{
                            fontWeight:
                              topic.id === selectedTopic?.id ? '600' : '500',
                            fontSize: $({ size: 18 }),
                            lineHeight: $({ size: 22 }),
                            color: user.tier == topic.tier
                              ? colors.solids.black
                              : colors.extra.grey3,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            mt: `-${$({ size: 3 })}`,
                            mb: `-${$({ size: 3 })}`,
                          }}>
                          {topic.topic_title}
                        </Typography>

                        {user.tier != topic.tier && (
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <LockIcon
                              size={$({ size: 14, numeric: true })}
                              color={colors.extra.grey2}
                            />
                          </Box>
                        )}

                        {topic.id === selectedTopic?.id && (
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <ChevronForwardIcon
                              size={$({ size: 14, numeric: true })}
                              color={colors.extra.grey2}
                            />
                          </Box>
                        )}
                      </Box>
                    );
                  })}
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6.4}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    pl: {
                      xs: 0,
                      sm: $({ size: 24 }),
                      md: $({ size: 36 }),
                    },
                    // width: 'fit-content',
                    width: {
                      xs: '100%',
                      sm: '100%',
                      md: 'fit-content',
                    },
                    gap: $({ size: 16 }),
                  }}>
                  {/* <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      gap: $({ size: 16 }),
                      width: '100%',
                      visibility: renderBreadcrumbs ? 'visible' : 'hidden',
                      margin: {
                        xs: renderBreadcrumbs
                          ? `${$({ size: 24 })} 0 ${$({ size: 16 })} 0`
                          : 0,
                        sm: renderBreadcrumbs ? `0 ${$({ size: 24 })}` : 0,
                        md: 0,
                      },
                    }}>
                    <Box
                      onClick={() => {
                        setTopicDetailData(selectedTopic.subTopics);
                        setSelectedSubTopic({});
                        setSelectedSection({});
                        // setRenderBreadcrumbs(false);
                      }}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}>
                      <LeftArrowIcon size={$({ size: 24, numeric: true })} />
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        cursor: 'pointer',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: $({ size: 8 }),
                        overflow: 'hidden',
                      }}>
                      <Typography
                        onClick={() => {
                          setTopicDetailData(selectedTopic.subTopics);
                          setSelectedSubTopic({});
                          setSelectedSection({});
                          // setRenderBreadcrumbs(false);
                        }}
                        sx={{
                          fontSize: $({ size: 13.5 }),
                          fontWeight: '400',
                          lineHeight: $({ size: 25 }),
                          color: colors.extra.grey2,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}>
                        {selectedTopic?.title || 'N/A'}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: $({ size: 15 }),
                          fontWeight: '400',
                          lineHeight: $({ size: 25 }),
                          color: colors.extra.grey2,
                        }}>
                        {'>'}
                      </Typography>
                    </Box>
                  </Box> */}

                  <Box
                    sx={{
                      'display': 'grid',
                      'gridTemplateColumns': `repeat(auto-fill, minmax(${$({
                        size: 160,
                      })}, 1fr))`,
                      'gridAutoRows': `minmax(${$({ size: 160 })}, auto)`, // to make all the rows the same height
                      'gridGap': $({ size: 24 }),
                      'width': {
                        xs: '100%',
                        lg: $({ size: 160 * 2 + 40 * 2 }),
                        xl: $({ size: 160 * 3 + 40 * 3 }),
                      },
                      'maxHeight': {
                        // xs: 'none',
                        xs: $({ size: 160 * 2 + 24 }),
                        md: $({ size: 160 * 2 + 24 }),
                      },
                      'overflowY': 'scroll',
                      'overflowX': 'hidden',
                      '&::-webkit-scrollbar': {
                        width: $({ size: 12 }),
                        borderRadius: $({ size: 12 }),
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: colors.extra.grey3,
                        borderRadius: $({ size: 12 }),
                      },
                      'pr': {
                        xs: 0,
                        sm: $({ size: 24 }),
                        md: $({ size: 40 }),
                      },
                    }}>
                    {topicDetailData.map((topicDetail, index) => {
                      return (
                        <Box
                          key={topicDetail.id + "sub-role" + index}
                          onClick={() => {
                            // if (renderBreadcrumbs) {
                            //   setSelectedSection(topicDetail);
                            //   return;
                            // }

                            setSelectedSubTopic(topicDetail);
                          }}
                          sx={{
                            padding: $({ size: 16 }),
                            borderRadius: $({ size: 16 }),
                            boxShadow: `0 0 ${$({ size: 2 })} ${alpha(
                              colors.solids.black,
                              0.25
                            )}`,
                            backgroundColor: (
                               topicDetail.id === selectedSubTopic.id
                            )
                              ? DarkenHexColor({
                                  hex: colors.greenAccent[400],
                                  percentage: 20,
                                })
                              : colors.greenAccent[400],
                            gap: $({ size: 8 }),
                            display: 'inline-flex',
                            flexDirection: 'column',
                            cursor: 'pointer',
                            minWidth: $({ size: 160 }),
                            minHeight: $({ size: 160 }),
                          }}>
                          <Typography
                            sx={{
                              fontSize: $({ size: 18 }),
                              fontWeight: '500',
                              lineHeight: $({ size: 25 }),
                              color: colors.solids.black,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              width: '100%',
                              whiteSpace: 'break-spaces',
                              maxWidth: {
                                xs: '100%',
                                lg: $({ size: 160 }),
                              },
                            }}>
                            {topicDetail.topic_title}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ flex: '1' }} />

            {selectedSubTopic?.topic_title && (
              <CustomButton
                onClick={HandleBeginLearning}
                label='Begin Learning'
                sx={{
                  maxWidth: $({ size: 264 }),
                  alignSelf: 'flex-end',
                  mt: $({ size: 16 }),
                }}
                rightIcon={
                  <RightArrowIcon size={$({ size: 24, numeric: true })} />
                }
              />
            )}
          </>
        )}
      </Box>
    </DashboardContainer>
  );
};

export default ImproveParentingHome;

const loadImproveParentingTopics = async (authorizedAxios, setServerRequest, TopicsDataArray, setTopicsData) => {
  setServerRequest({
    loading: true,
    status: "start", // strat || complete,
    response: "",
    error: "",
  });
  try {
    const response = await authorizedAxios.get(ROLE_PLAYING_TOPIC.GET_ALL);
    console.log(response.data);
    TopicsDataArray = response.data;
    setTopicsData(TopicsDataArray);
    setServerRequest({
      loading: false,
      status: "complete", // strat || complete,
      response: "success",
      error: "",
    });
  } catch (error) {
    console.error(error);
    setServerRequest({
      loading: false,
      status: "complete", // strat || complete,
      response: "",
      error: error,
    });
  }
  
}