import React from 'react';
import { Box, Typography, useTheme, alpha, Slider } from '@mui/material';
import { Pie } from '@nivo/pie';

import { CustomDropDown, CustomTextInput } from '../../../components';

import { InfoIcon, SearchIcon } from '../../../icons';

import { tokens } from '../../../theme';
import { $, DarkenHexColor } from '../../../utils';

import { API_BASE_URL } from '../../../config/backend_endpoints';

const SubjectDetailsTab = ({
  topSectionHeight = 0,
  subjectDetails = {},
  subjectsData = [],
  searchDropDownOpen = false,
  setSearchDropDownOpen = () => {},
  setRenderSubjectDetails = () => {},
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [search, setSearch] = React.useState('');
  const [filteredSubjectData, setFilteredSubjectData] = React.useState(
    subjectsData || []
  );

  const handleSearch = () => {
    const filteredData = subjectsData.filter((subject) => {
      return subject.subject_name.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredSubjectData(filteredData);
  };

  // TO CALCULATE TOP SECTION HEIGHT
  const headerSectionRef = React.useRef(null);
  // const [headerSectionHeight, setHeaderSectionHeight] = React.useState(0)

  // React.useEffect(() => {
  //   setHeaderSectionHeight(headerSectionRef.current?.offsetHeight || 0)
  // }, [headerSectionRef.current?.offsetHeight])

  return (
    <Box
      sx={{
        display: 'flex',
        overflowY:'scroll',
        flexDirection: 'column',
        gap: $({ size: 24 }),
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: {
            xs: $({ size: 8 }),
            md: 0,
          },
          width: '100%',
        }}
        ref={headerSectionRef}>
        <Box
          sx={{
            display: 'flex',
            cursor: 'pointer',
            flexDirection: 'row',
            alignItems: 'center',
            gap: $({ size: 8 }),
            overflow: 'hidden',
            mt: `-${$({ size: 4 })}`,
            ml: `-${$({ size: 2 })}`,
          }}>
          <Typography
            onClick={() => {
              setRenderSubjectDetails({
                render: false,
                details: {},
              });
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
            {'Subjects'}
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

          <Typography
            onClick={() => {}}
            sx={{
              fontSize: $({ size: 13.5 }),
              fontWeight: '400',
              lineHeight: $({ size: 25 }),
              color: colors.extra.grey2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
            {subjectDetails?.details?.subject_name || 'Subject Title'}
          </Typography>
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
          <Box>
            <Typography
              sx={{
                fontSize: $({ size: 31.98 }),
                fontWeight: '600',
                lineHeight: $({ size: 40 }),
                color: DarkenHexColor({
                  hex: subjectDetails?.subject_icon_color?.color || colors.extra.grey1,
                }),
                display: 'inline',
              }}>{`${subjectDetails?.details?.subject_name || 'Subject Title'} `}</Typography>
            <Typography
              sx={{
                fontSize: $({ size: 31.98 }),
                fontWeight: '600',
                lineHeight: $({ size: 40 }),
                color: colors.extra.grey1,
                display: 'inline',
              }}>
              Performance
            </Typography>
          </Box>

          <Box
            sx={{
              position: 'relative',
              mt: `-${$({ size: 4 })}`,
            }}>
            <CustomDropDown
              preventDefault={true}
              value='Choose subject'
              placeholder='Choose subject'
              dropDownOpen={searchDropDownOpen}
              setDropDownOpen={setSearchDropDownOpen}
              placeholderClosedStyle={{
                fontSize: $({ size: 13.5 }),
                lineHeight: $({ size: 25 }),
                minWidth: $({ size: 156 }),
              }}
              placeholderOpenStyle={{
                fontSize: $({ size: 13.5 }),
                lineHeight: $({ size: 25 }),
                minWidth: $({ size: 156 }),
              }}
              inputClosedStyle={{
                padding: `${$({ size: 12 })} ${$({ size: 16 })}`,
              }}
              inputOpenStyle={{
                padding: `${$({ size: 12 })} ${$({ size: 16 })}`,
              }}
              itemContainerStyle={{
                '&:hover': {
                  backgroundColor: alpha(colors.extra.grey4, 0.5),
                },
              }}
              itemsContainerStyle={{
                'maxHeight': $({ size: 204 }),
                'overflowY': 'scroll',
                '&::-webkit-scrollbar': {
                  width: $({ size: 6 }),
                  borderRadius: $({ size: 6 }),
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: colors.extra.grey3,
                  borderRadius: $({ size: 6 }),
                },
                'userSelect': 'none',
              }}
              header={
                <CustomTextInput
                  placeholder='Search a subject'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  label={null}
                  containerStyle={{
                    mt: $({ size: 16 }),
                    mb: $({ size: 6 }),
                  }}
                  onEnter={handleSearch}
                  onKeyUp={handleSearch}
                  inputContainerStyle={{
                    backgroundColor: colors.extra.grey4,
                    padding: `${$({ size: 4 })} ${$({ size: 20 })}`,
                  }}
                  inputStyle={{
                    fontSize: $({ size: 13.5 }),
                    fontWeight: '400',
                    lineHeight: $({ size: 25 }),
                  }}
                  rightIcon={
                    <Box
                      onClick={() => {}}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}>
                      <SearchIcon
                        size={$({ size: 18, numeric: true })}
                        color={colors.extra.grey2}
                      />
                    </Box>
                  }
                />
              }
              data={filteredSubjectData.map((item) => {
                return {
                  onClick: () => {
                    setRenderSubjectDetails({
                      render: true,
                      details: item,
                    });
                    setSearchDropDownOpen(false);
                  },
                  component: (
                    <>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: $({ size: 12 }),
                          height: $({ size: 12 }),
                          ml: $({ size: 2 }),
                        }}>
                        <img
                          src={API_BASE_URL + item.subject_icon_color.icon}
                          alt={item.subject_name}
                          style={{
                            height: $({ size: 12 }),
                            objectFit: 'cover',
                            filter: 'invert(0.5)',
                          }}
                        />
                      </Box>
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
                            fontWeight: '400',
                            color: colors.extra.grey1,
                            lineHeight: $({ size: 26 }),
                            width: '100%',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                          }}>
                          {item.subject_name}
                        </Typography>
                      </Box>
                    </>
                  ),
                };
              })}
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          // display: 'flex',
          // flexDirection: 'column',
          'mt': {
            xs: $({ size: 16 }),
            md: 0,
          },
          // maxHeight: {
          //   xs: 'unset',
          //   md: `calc(100vh - ${topSectionHeight + headerSectionHeight}px - ${$({
          //     numeric: true,
          //     size: (
          //       60 + // TOP BAR HEIGHT
          //       24 + // PARENT CONTAINER TOP PADDING
          //       24 + // PARENT  CONTAINER BOTTOM PADDING
          //       40 + // WRAPPER CONTAINER TOP PADDING
          //       40 + // WRAPPER CONTAINER BOTTOM PADDING
          //       24 + // HEADER SECTION GAP
          //       -8   // ADJUSTMENT
          //     ),
          //   })}px)`,
          // },
          // overflowY: 'scroll',
          // overflowX: 'hidden',
          'mr': {
            xs: `-${$({ size: 6 })}`,
            md: `-${$({ size: 8 })}`,
          },
          'pr': {
            xs: 0,
            md: $({ size: 16 }),
          },
          '&::-webkit-scrollbar': {
            width: $({ size: 8 }),
            borderRadius: $({ size: 8 }),
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: colors.extra.grey3,
            borderRadius: $({ size: 8 }),
          },
          'gap': $({ size: 24 }),
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
            gap: {
              xs: $({ size: 24 }),
              md: $({ size: 24 }),
            },
          }}>
          <Box
            sx={{
              width: $({ size: 248 }),
              height: $({ size: 248 }),
              position: 'relative',
              mt: `-${$({ size: 16 })}`,
              ml: `${$({ size: 16 })}`,
            }}>
            <Box
              sx={{
                filter: `drop-shadow(0 0 ${$({ size: 5 })} ${alpha(
                  colors.solids.black,
                  0.1
                )})`,
              }}>
              <Pie
                data={[
                  {
                    color: subjectDetails?.details?.subject_icon_color?.color || colors.extra.grey1,
                    value: subjectDetails?.details?.subject_grade || 0,
                  },
                  {
                    color: colors.extra.grey4,
                    value: subjectDetails?.details?.subject_grade  || 0,
                  },
                ]}
                innerRadius={0.725}
                padAngle={0}
                legends={[]}
                enableArcLabels={false}
                enableArcLinkLabels={false}
                isInteractive={false}
                width={$({ size: 248, numeric: true })}
                height={$({ size: 248, numeric: true })}
                animate={false}
                fit={true}
                colors={(d) => d.data.color}
              />
            </Box>

            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}>
              <Typography
                sx={{
                  fontSize: $({ size: 80 }),
                  fontWeight: '700',
                  lineHeight: $({ size: 70 }),
                  color: colors.extra.grey1,
                  textAlign: 'center',
                }}>
                {subjectDetails?.details?.subject_grade_key || 'A'}
              </Typography>
              <Typography
                sx={{
                  fontSize: $({ size: 24 }),
                  fontWeight: '600',
                  lineHeight: $({ size: 35 }),
                  color: colors.extra.grey2,
                  textAlign: 'center',
                }}>
                {(subjectDetails?.details?.subject_grade || 0).toFixed(0)}%
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              mt: $({ size: 18 }),
            }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: $({ size: 16 }),
              }}>
              <Typography
                sx={{
                  fontSize: $({ size: 18 }),
                  fontWeight: '600',
                  color: colors.extra.grey1,
                }}>
                Summary
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <InfoIcon
                  size={$({ size: 16, numeric: true })}
                  color={colors.extra.grey2}
                />
              </Box>
            </Box>
            <Typography
              sx={{
                fontSize: $({ size: 18 }),
                fontWeight: '400',
                lineHeight: $({ size: 28 }),
                color: colors.solids.black,
                maxWidth: {
                  xs: '100%',
                  md: $({ size: 525 }),
                },
                mt: $({ size: 12 }),
              }}>
              {subjectDetails?.details?.subject_summary || 'Subject Summary'}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            'mt': $({ size: 24 }),
            'width': '100%',
            'overflowX': 'scroll',
            'overflowY': 'hidden',
            '&::-webkit-scrollbar': {
              height: $({ size: 8 }),
              borderRadius: $({ size: 8 }),
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: colors.extra.grey3,
              borderRadius: $({ size: 8 }),
            },
            'pb': {
              xs: $({ size: 12 }),
              md: $({ size: 12 }),
            },
            'userSelect': 'none',
          }}>
          <Box
            sx={{
              display: 'flex',
              maxWidth: $({ size: 10 }),
              width: $({ size: 10 }),
              pl: $({ size: 5 }),
            }}>
              {/* Strengths */}
            {subjectDetails?.details?.strengths?.map((topic, index) => {
              const color = subjectDetails?.details?.subject_icon_color.color;
              const value = topic.grade_percentage / 100;
              return (
                <Box
                key={index + "Strength-Topic"}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minWidth: $({ size: 120.25 }),
                    gap: $({ size: 8 }),
                  }}>
                  <Box
                    sx={{
                      width: $({ size: 64 }),
                      height: $({ size: 174 }),
                      borderRadius: $({ size: 100 }),
                      backgroundColor: colors.extra.grey4,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      overflow: 'hidden',
                      position: 'relative',
                    }}>
                    <Slider
                      disabled
                      orientation='vertical'
                      sx={{
                        'overflow': 'hidden',
                        'width': $({ size: 64 }),
                        'height': $({ size: 174 }),
                        'borderRadius': $({ size: 100 }),
                        'backgroundColor': colors.extra.grey4,
                        '& .MuiSlider-track': {
                          backgroundColor: color,
                          border: 'none',
                        },
                        '& .MuiSlider-rail': {
                          backgroundColor: colors.extra.grey4,
                          border: 'none',
                        },
                        '& .MuiSlider-thumb': { display: 'none' },
                        '& .MuiSlider-valueLabel': { display: 'none' },
                        '& .MuiSlider-mark': { display: 'none' },
                        '& .MuiSlider-markLabel': { display: 'none' },
                        '& .MuiSlider-markLabelActive': { display: 'none' },
                      }}
                      max={1}
                      min={0}
                      value={value}
                    />
                    <Typography
                      sx={{
                        fontWeight: '700',
                        fontSize: $({ size: 18 }),
                        lineHeight: $({ size: 30 }),
                        color: colors.extra.grey1,
                        position: 'absolute',
                        bottom: '0',
                        paddingBottom: `${value * 100}%`,
                        ...(!(value * 100 > 0 || value > 0) && { top: '50%' }),
                      }}>
                      {value * 100 > 0 || value > 0
                        ? `${(value * 100).toFixed(0)}%`
                        : 'N/A'}
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      fontWeight: '600',
                      fontSize: $({ size: 13.5 }),
                      lineHeight: $({ size: 16 }),
                      color: colors.extra.grey1,
                      textAlign: 'center',
                      maxWidth: $({ size: 110 }),
                    }}>
                    {topic.topic}
                  </Typography>
                </Box>
              );
            })}

            {/* Improvements */}
            {subjectDetails?.details?.strengths?.map((topic, index) => {
              const color = subjectDetails?.details?.subject_icon_color.color;
              const value = topic.grade_percentage / 100;
              return (
                <Box
                key={index + "Improvement-Topic"}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minWidth: $({ size: 120.25 }),
                    gap: $({ size: 8 }),
                  }}>
                  <Box
                    sx={{
                      width: $({ size: 64 }),
                      height: $({ size: 174 }),
                      borderRadius: $({ size: 100 }),
                      backgroundColor: colors.extra.grey4,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      overflow: 'hidden',
                      position: 'relative',
                    }}>
                    <Slider
                      disabled
                      orientation='vertical'
                      sx={{
                        'overflow': 'hidden',
                        'width': $({ size: 64 }),
                        'height': $({ size: 174 }),
                        'borderRadius': $({ size: 100 }),
                        'backgroundColor': colors.extra.grey4,
                        '& .MuiSlider-track': {
                          backgroundColor: color,
                          border: 'none',
                        },
                        '& .MuiSlider-rail': {
                          backgroundColor: colors.extra.grey4,
                          border: 'none',
                        },
                        '& .MuiSlider-thumb': { display: 'none' },
                        '& .MuiSlider-valueLabel': { display: 'none' },
                        '& .MuiSlider-mark': { display: 'none' },
                        '& .MuiSlider-markLabel': { display: 'none' },
                        '& .MuiSlider-markLabelActive': { display: 'none' },
                      }}
                      max={1}
                      min={0}
                      value={value}
                    />
                    <Typography
                      sx={{
                        fontWeight: '700',
                        fontSize: $({ size: 18 }),
                        lineHeight: $({ size: 30 }),
                        color: colors.extra.grey1,
                        position: 'absolute',
                        bottom: '0',
                        paddingBottom: `${value * 100}%`,
                        ...(!(value * 100 > 0 || value > 0) && { top: '50%' }),
                      }}>
                      {value * 100 > 0 || value > 0
                        ? `${(value * 100).toFixed(0)}%`
                        : 'N/A'}
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      fontWeight: '600',
                      fontSize: $({ size: 13.5 }),
                      lineHeight: $({ size: 16 }),
                      color: colors.extra.grey1,
                      textAlign: 'center',
                      maxWidth: $({ size: 110 }),
                    }}>
                    {topic.topic}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          {/* <VerticalFiller
            sx={{
              padding: 0,
              justifyContent: 'flex-start',
              maxWidth: $({ size: 10 }),
              width: $({ size: 10 }),
              gap: $({ size: 0 }),
            }}
            data={subjectDetails?.details?.topics?.map((topic) => {
              return {
                space: $({ size: 56 }),
                height: $({ size: 174 }),
                label: topic.title,
                value: topic.percentage / 100,
                color: subjectDetails?.color || colors.extra.grey1,
                labelGap: $({ size: 8 }),
                labelStyle: {
                  minWidth: $({ size: 113 }),
                  color: 'red',
                },
              };
            })}
          /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default SubjectDetailsTab;

