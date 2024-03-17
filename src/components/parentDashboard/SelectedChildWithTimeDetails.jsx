import React from 'react';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import { useAppContext } from '../../context/appContext';

import { QuestionProgressBar } from "../../components";
import { ChestIcon } from "../../icons";

import { tokens } from '../../theme';
import { $ } from '../../utils';

const SelectedChildWithTimeDetails = () => {
    const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { users_children, selected_Child_index }  = useAppContext();

  if (!users_children[selected_Child_index].fullname) {
    return;
  }
  return (
    
   
          
            <Box
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
            </Box>

      
  )
}

export default SelectedChildWithTimeDetails