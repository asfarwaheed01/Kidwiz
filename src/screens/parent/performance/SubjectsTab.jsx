import React from 'react';
import { Box, Typography, alpha, useTheme } from '@mui/material';

import { CustomSearchInput } from '../../../components';

import { tokens } from '../../../theme';
import { $, DarkenHexColor } from '../../../utils';
import { API_BASE_URL } from '../../../config/backend_endpoints';

// import { SubjectData } from './data';

const SubjectsTab = ({
  topSectionHeight = 0,
  setRenderSubjectDetails = () => {},
  subject_grades = []
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [search, setSearch] = React.useState('');
  const [subjectData, setSubjectData] = React.useState(subject_grades);

  // React.useEffect(() => {
  //   setSubjectData(SubjectData);
  // }, []);

  const handleSearch = () => {
    const filteredData = subject_grades.filter((subject) => {
      return subject.subject_name.toLowerCase().includes(search.toLowerCase());
    });
    setSubjectData(filteredData);
  };

  // TO CALCULATE TOP SECTION HEIGHT
  const headerSectionRef = React.useRef(null);
  const [headerSectionHeight, setHeaderSectionHeight] = React.useState(0);

  React.useEffect(() => {
    setHeaderSectionHeight(headerSectionRef.current?.offsetHeight || 0);
  }, [headerSectionRef.current?.offsetHeight]);

  return (
    <Box
      sx={{
        display: 'flex',
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
            Choose a Subject
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

      {subjectData.length === 0 && (
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
          'display': 'grid',
          'gridTemplateColumns': `repeat(auto-fill, minmax(${$({
            size: 160,
          })}, 1fr))`,
          'gridGap': {
            xs: $({ size: 0 }),
            md: $({ size: 24 }),
          },
          'gridAutoRows': '1fr', // to make all the rows the same height
          'maxHeight': {
            xs: 'unset',
            md: `calc(100vh - ${topSectionHeight + headerSectionHeight}px - ${$(
              {
                numeric: true,
                // ADJUSTMENT
                size:
                  60 + // TOP BAR HEIGHT
                  24 + // PARENT CONTAINER TOP PADDING
                  24 + // PARENT  CONTAINER BOTTOM PADDING
                  40 + // WRAPPER CONTAINER TOP PADDING
                  40 + // WRAPPER CONTAINER BOTTOM PADDING
                  24 + // HEADER SECTION GAP
                  -8,
              }
            )}px)`,
          },
          'overflowY': 'scroll',
          // 'mr': {
          //   xs: `-${$({ size: 6 })}`,
          //   md: `${$({ size: 24 })}`,
          // },
          'pr': {
            xs: 0,
            md: $({ size: 32 }),
          },
          '&::-webkit-scrollbar': {
            width: $({ size: 13 }),
            borderRadius: $({ size: 13 }),
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: colors.extra.grey3,
            borderRadius: $({ size: 13 }),
          },
        }}>
        {subjectData.map((subject, index) => {
          return (
            <Box
              key={index}
              onClick={() => {
                setRenderSubjectDetails({
                  render: true,
                  details: subject,
                });
              }}
              sx={{
                padding: $({ size: 16 }),
                borderRadius: $({ size: 16 }),
                boxShadow: `0 0 ${$({ size: 2 })} ${alpha(
                  colors.solids.black,
                  0.25
                )}`,
                backgroundColor: subject.subject_icon_color.color,
                gap: $({ size: 8 }),
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                minWidth: $({ size: 160 }),
                minHeight: $({ size: 160 }),
                // mb: $({ size: 24 }),
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
                    src={API_BASE_URL + subject.subject_icon_color.icon}
                    alt={subject.subject_name}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </Box>

                <Typography
                  sx={{
                    fontSize: $({ size: 31.98 }),
                    fontWeight: '700',
                    lineHeight: $({ size: 40 }),
                    color: DarkenHexColor({
                      hex: subject.subject_icon_color.color,
                      percentage: 30,
                    }),
                  }}>
                  {subject.subject_grade_key}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: $({ size: 18 }),
                  fontWeight: '500',
                  lineHeight: $({ size: 20 }),
                  color: colors.solids.black,
                }}>
                {subject.subject_name}
              </Typography>
              <Typography
                sx={{
                  fontSize: $({ size: 13.5 }),
                  fontWeight: '400',
                  lineHeight: $({ size: 16 }),
                  color: colors.extra.grey1,
                }}>
                {/* {subject.description} */}
                Alot can be learnt from this subject
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default SubjectsTab;
