import React, { useState } from 'react';
import { Box, Typography, alpha, useTheme } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  CustomSearchInput,
  DashboardContainer,
  CustomBreadcrumbs,
  CustomButton,
} from '../../../components';

import { LeftArrowIcon, RightArrowIcon } from '../../../icons';

import { ASSETS } from '../../../config/assets';
import { ROUTES } from '../../../config/routes';
import { tokens } from '../../../theme';
import { $, DarkenHexColor } from '../../../utils';

var SubjectDetailData = [];

const LearnSubjectTopic = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();
  const { state } = useLocation();
  const [subject, setSubject] = useState(state.subject);
  SubjectDetailData = state.subject.courses;

  const [search, setSearch] = React.useState('');
  const [selection, setSelection] = React.useState({});

  const [subjectDetailData, setSubjectDetailData] = React.useState([]);

  React.useEffect(() => {
    setSubjectDetailData(SubjectDetailData);
  }, [subject]);

  const HandleBeginLearning = () => {
    // navigate(ROUTES.PARENT.LEARN_SUBJECT.CHAT);
    navigate(
      ROUTES.PARENT.LEARN_SUBJECT.CHAT.replace(
        ':subjectId',
        subject.id
      ).replace(':courseId',selection.id),
      {
        state: { subject, course:selection } ,
      }
    );
  };

  const handleSearch = () => {
    const filteredData = SubjectDetailData.filter((subjectDetail) => {
      return subjectDetail.title.toLowerCase().includes(search.toLowerCase());
    });
    setSubjectDetailData(filteredData);
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
      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: $({ size: 8 }) }}>
        <Box
          sx={{
            mt: `-${$({ size: 12 })}`,
            ml: `-${$({ size: 4 })}`,
          }}>
          <CustomBreadcrumbs
            data={[
              { path: ROUTES.PARENT.LEARN_SUBJECT.INDEX, title: 'Home' },
              {
                path: ROUTES.PARENT.LEARN_SUBJECT.DETAIL,
                title: subject?.subjectName || 'N/A',
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
            mt: `-${$({ size: 6 })}`,
          }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: $({ size: 20 }),
              mt: `-${$({ size: 2 })}`,
            }}>
            <Box
              onClick={() => navigate(ROUTES.PARENT.LEARN_SUBJECT.INDEX)}
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
                }}>{` ${subject?.subjectName || 'N/A'} `}</Typography>
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
              minWidth: {
                xs: '100%',
                sm: $({ size: 352 }),
                mt: `-${$({ size: 2 })}`,
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
            md: $({ size: 40 }),
          },
          gridAutoRows: '1fr', // to make all the rows the same height
          mt: $({ size: 24 }),
        }}>
        {subjectDetailData.map((subjectDetail, index) => {
          return (
            <Box
              key={index}
              onClick={() => {
                setSelection({
                  ...subjectDetail,
                  subject: { ...subject },
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
                    ? DarkenHexColor({ hex: subject?.color })
                    : subject?.color,
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
                    alt={subjectDetail.courseName}
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
                {subjectDetail.courseName}
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
          rightIcon={<RightArrowIcon size={$({ size: 24, numeric: true })} />}
        />
      )}
    </DashboardContainer>
  );
};

export default LearnSubjectTopic;
