import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, alpha, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAppContext } from '../../../context/appContext';

import {
  CustomSearchInput,
  DashboardContainer,
  CustomBreadcrumbs,
} from '../../../components';

import { LockIcon } from '../../../icons';

import { ASSETS } from '../../../config/assets';
import { ROUTES } from '../../../config/routes';
import { tokens } from '../../../theme';
import { $ } from '../../../utils';

import { API_BASE_URL, GET_ALL_SUBJECTS, GET_ALL_SUBJECTS_WITH_COURSES } from '../../../config/backend_endpoints';

// import { SubjectData } from './data';
var SubjectData = [];



const LearnSubjectHome = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  const { user, token } = useAppContext();

  const [search, setSearch] = useState('');
  const [subjectData, setSubjectData] = useState([]);

  const [loadingData, setLoadingData] = useState(false); 

  useEffect(() => {
    // setSubjectData(SubjectData);
    loadALlSubjectsData(token, setLoadingData, setSubjectData);
  }, []);

  const handleSearch = () => {
    const filteredData = SubjectData.filter((subject) => {
      return subject.subjectName.toLowerCase().includes(search.toLowerCase());
    });
    setSubjectData(filteredData);
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
        // overflow: 'hidden',
        'overflowY': 'auto',
        '&::-webkit-scrollbar': {'display': 'none'},
        'MsOverflowStyle': 'none',
        'scrollbarWidth': 'none',
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
          width: '100%',
        }}>
        <Box
          sx={{
            mt: `-${$({ size: 12 })}`,
            ml: `-${$({ size: 4 })}`,
          }}>
          <CustomBreadcrumbs
            data={[{ path: ROUTES.PARENT.LEARN_SUBJECT.INDEX, title: 'Home' }]}
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
              mt: `-${$({ size: 2 })}`,
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
              minWidth: {
                xs: '100%',
                sm: $({ size: 352 }),
              },
              mt: `-${$({ size: 2 })}`,
            }}
            handleSearch={handleSearch}
            handleSearchOnEveryKeyStroke={handleSearch}
          />
        </Box>
      </Box>


            {!loadingData && (
              <Typography
              sx={{
                fontSize: $({ size: 24 }),
                fontWeight: '400',
                lineHeight: $({ size: 30 }),
                color: colors.extra.grey3,
                mt: `-${$({ size: 8 })}`,
              }}>
              Loading Subjects from server....!
            </Typography>
            )}

      {(loadingData && subjectData.length === 0 )&& (
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
        {subjectData.map((subject, index) => {
          
          let decisionFlag = subject.tier.toLowerCase() === user.tier.toLowerCase();
          if (user.tier.toLowerCase() === 'pro' && subject.tier.toLowerCase() === 'basic') {
            decisionFlag = true;
          }else if (user.tier.toLowerCase() === 'premium' && subject.tier.toLowerCase() === 'pro' && subject.tier.toLowerCase() === 'basic') {
            decisionFlag = true;
          }
          subject.isUnlocked = decisionFlag;

          return (
            <Box
              key={index}
              onClick={() => {
                if (subject.isUnlocked) {
                  navigate(
                    ROUTES.PARENT.LEARN_SUBJECT.DETAIL.replace(
                      ':subjectId',
                      subject.id
                    ),
                    {
                      state: { subject } ,
                    }
                  );
                }
              }}
              sx={{
                padding: $({ size: 16 }),
                borderRadius: $({ size: 16 }),
                boxShadow: `0 0 ${$({ size: 2 })} ${alpha(
                  colors.solids.black,
                  0.25
                )}`,
                backgroundColor: subject.isActive
                  ? subject.color
                  : colors.extra.grey4,
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
                    overflow: 'hidden'
                    // padding: $({ size: 8 }),
                  }}>
                  <img
                    src={ subject.icon ? API_BASE_URL + subject.icon :  ASSETS.PARENT.ICONS.DAILY_QUIZ}
                    alt={subject.subjectName}
                    style={{
                      filter: `invert(${subject.isUnlocked ? 0 : 1})`,
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </Box>
                {!subject.isUnlocked && (
                  <LockIcon size={$({ size: 24, numeric: true })} />
                )}
              </Box>
              <Typography
                sx={{
                  fontSize: $({ size: 18 }),
                  fontWeight: '500',
                  lineHeight: $({ size: 20 }),
                  color: subject.isActive
                    ? colors.solids.black
                    : colors.extra.grey2,
                }}>
                {subject.subjectName}
              </Typography>
              <Typography
                sx={{
                  fontSize: $({ size: 13.5 }),
                  fontWeight: '400',
                  lineHeight: $({ size: 16 }),
                  color: subject.isActive
                    ? colors.extra.grey1
                    : colors.extra.grey2,
                }}>
                {subject.subjectDesc}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </DashboardContainer>
  );




  
};


const loadALlSubjectsData = async (token, setLoading, setSubjectData)=> {
  await axios.get(GET_ALL_SUBJECTS_WITH_COURSES, {
    headers: {
      "Authorization" : `Bearer ${token}`,
      'Content-Type': 'text/plain'
    }
  })
  .then((response) => {
    setLoading(true);
    // console.log(response.data);
    SubjectData = response.data;
    console.log(SubjectData);
    setSubjectData(SubjectData);
  
  })
  .catch((error) => {
    // console.log(error);
    setLoading(true);
    console.error(error);

  })
}

export default LearnSubjectHome;
