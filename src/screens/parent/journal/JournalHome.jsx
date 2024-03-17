import React, { useState, useEffect } from 'react';
import { Box, Grid, useTheme, alpha, Typography, Avatar } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


import {
  CustomButton,
  CustomSearchInput,
  DashboardContainer,
} from '../../../components';

import {SelectChildAndDatePanel, SelectedChildWithTimeDetails} from '../../../components';

// import SelectChildAndDatePanel from '../../../components/parent/SelectChildAndDatePanel';
// import SelectedChildWithTimeDetails from '../../../components/parent/SelectedChildWithTimeDetails';

import { AddIcon, EditIcon, ReorderThreeIcon } from '../../../icons';

import { useAppContext } from '../../../context/appContext';

// import { ASSETS } from '../../../config/assets';
import { tokens } from '../../../theme';
import { $ } from '../../../utils';

import JournalManagementModal from './JournalManagementModal';
import { JOURNAL } from '../../../config/backend_endpoints';

var JournalsData = [];

const JournalHome = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { authorizedAxios, users_children, selected_Child_index }  = useAppContext();

  const [selectedChild, setSelectedChild] = React.useState(users_children[selected_Child_index]);

  // const [datesDropDownOpen, setDatesDropDownOpen] = React.useState(false);
  // const [selectedDates, setSelectedDates] = React.useState({});

  const [isModalOpen, setIsModalOpen] = React.useState({
    isOpen: false,
    index: -1,
    mode: 'create' // create || update
  });

  const [search, setSearch] = React.useState('');
  const handleSearch = () => {
    const filteredData = JournalsData.filter((journal) => {
      return journal.title.toLowerCase().includes(search.toLowerCase());
    });
    setJournals(filteredData);
  };

  const [currentSelectedJournal, setCurrentSelectedJournal] =
    React.useState(null);
  const [journals, setJournals] = React.useState(JournalsData);
  const [loadingAllJournals, setLoadingAllJournals] = useState(false);

  // React.useEffect(() => {
  //   setSelectedDates({
  //     startDate: 'April 9, 2023',
  //     endDate: 'May 6, 2023',
  //   });
  // }, []);

  // TO CALCULATE TOP SECTION HEIGHT
  const topSectionRef = React.useRef(null);
  const [topSectionHeight, setTopSectionHeight] = React.useState(0);

  React.useEffect(() => {
    setTopSectionHeight(topSectionRef.current?.offsetHeight || 0);
  }, [topSectionRef.current?.offsetHeight]);


  useEffect(()=>{
    if (!isModalOpen.isOpen) {
      loadAllJournals(authorizedAxios, users_children[selected_Child_index].id,setLoadingAllJournals,setJournals);
    }
  },[selected_Child_index, isModalOpen]);

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
            backgroundColor: colors.white[800],
            boxShadow: `0 0 ${$({ size: 2 })} 0 ${alpha(
              colors.solids.black,
              0.25
            )}`,
            borderRadius: $({ size: 12 }),
          }}>
          {/* <Grid
            container
            sx={{
              // height: '100%',
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
                data={childData.map((item) => {
                  return {
                    onClick: () => {
                      setSelectedChild(item);
                    },
                    component: (
                      <>
                        <img
                          src={item.photo}
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
                            {item.email}
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
                  src={selectedChild?.photo || ''}
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
                    {selectedChild?.fullname || ''}
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
                    {selectedChild?.email || ''}
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
                mt: $({ size: 24 }),
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
          <SelectChildAndDatePanel />
        </Grid>

        

        {selectedChild.fullname && (
          <Grid
            item
            xs={12}
            lg={9.2}
            sx={{
              flex: '1',
              padding: {
                xs: `${$({ size: 20 })} 0 0 0`,
                lg: `0 0 0 ${$({ size: 24 })}`,
              },
              position: 'relative',
              
            }}>
            <Box
              sx={{
                position: 'relative',
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
                
              }}>
              {isModalOpen.isOpen && (
                <Box
                  onClick={() => {}}
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
              )}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: $({ size: 24 }),
                }}
                ref={topSectionRef}>
                {/* <Box
                  sx={{
                    display: 'flex',
                    gap: $({ size: 16 }),
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    flexDirection: { xs: 'column', sm: 'row' },
                  }}>
                  <Avatar
                    src={selectedChild.photo}
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
                      {selectedChild.fullname}
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
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mt: $({ size: 2 }),
                    
                  }}>
                  <Box
                    onClick={() => {
                      setIsModalOpen({ isOpen: true, index: -1, mode: "create" });
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
                      New Entry
                    </Typography>
                  </Box>

                  <CustomSearchInput
                    placeholder='Search for journal entry'
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
              </Box>

              <Box
                sx={{
                  'maxHeight': `calc(100vh - ${topSectionHeight}px - ${$({
                    numeric: true,
                    // ADJUSTMENT
                    size:
                      60 + // TOP BAR HEIGHT
                      24 + // PARENT CONTAINER TOP PADDING
                      24 + // PARENT  CONTAINER BOTTOM PADDING
                      40 + // WRAPPER CONTAINER TOP PADDING
                      20 + // WRAPPER CONTAINER BOTTOM PADDING
                      20 + // HEADER SECTION GAP
                      70,
                  })}px)`,
                  'overflowY': 'scroll',
                  'pr': $({ size: 16 }),
                  'mr': `${$({ size: 2 })}`,
                  '&::-webkit-scrollbar': {
                    width: $({ size: 13 }),
                    borderRadius: $({ size: 13 }),
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: colors.extra.grey3,
                    borderRadius: $({ size: 13 }),
                  },
                }}>

                { loadingAllJournals && 
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

                

                {
                  (!loadingAllJournals && journals.length === 0) &&
                        (<Typography
                          sx={{
                            fontWeight: '400',
                            fontSize: $({ size: 13.5 }),
                            lineHeight: $({ size: 23 }),
                            color: colors.extra.grey3,
                          }}>
                          No Journal added yet..!
                        </Typography>)
                }

                { !loadingAllJournals &&
                journals.map((journal, index) => {
                  return (
                    <Box
                    key={index}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: $({ size: 4 }),
                        borderBottom: `${$({ size: 1 })} solid ${
                          colors.extra.grey4
                        }`,
                        mb: $({ size: 20 }),
                        pb: $({ size: 20 }),
                      }}>
                      <Typography
                        sx={{
                          fontWeight: '700',
                          fontSize: $({ size: 13.5 }),
                          lineHeight: $({ size: 23 }),
                          color: colors.extra.grey3,
                        }}>
                        {journal.date}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: $({ size: 24 }),
                        }}>
                        <Typography
                          sx={{
                            fontWeight: '600',
                            fontSize: $({ size: 18 }),
                            color: colors.extra.grey1,
                          }}>
                          {journal.title}
                        </Typography>

                        <Box
                          onClick={() => {
                            setCurrentSelectedJournal(journal);
                            setIsModalOpen({ isOpen: true, index: -1, mode:'update' });
                          }}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: $({ size: 12 }),
                            cursor: 'pointer',
                            userSelect: 'none',
                            mr: $({ size: 12 }),
                          }}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mt: `-${$({ size: 4 })}`,
                            }}>
                            <EditIcon
                              size={$({ size: 16, numeric: true })}
                              color={colors.solids.mainButton}
                            />
                          </Box>

                          <Typography
                            sx={{
                              fontWeight: '600',
                              fontSize: $({ size: 16 }),
                              color: colors.extra.grey3,
                              mt: $({ size: 3 }),
                            }}>
                            EDIT
                          </Typography>
                        </Box>
                      </Box>

                      <Typography
                        sx={{
                          fontWeight: '400',
                          fontSize: $({ size: 18 }),
                          color: colors.extra.grey1,
                          lineHeight: $({ size: 28 }),
                          mt: $({ size: 4 }),
                        }}>
                        {journal.content}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>

              <Box
                sx={{
                  flex: 1,
                  mt: `-${$({ size: 100 })}`,
                }}
              />

              <CustomButton
                label='Use AI Magic'
                sx={{
                  // maxWidth: 'fit-content',
                  alignSelf: 'flex-end',
                  width: $({ size: 239 }),
                }}
                onClick={() => {}}
                rightIcon={
                  <ReorderThreeIcon
                    size={$({ size: 18, numeric: true })}
                    color={colors.white[800]}
                  />
                }
              />
            </Box>
            {isModalOpen.isOpen && (
              <JournalManagementModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                currentSelectedJournal={currentSelectedJournal}
                setCurrentSelectedJournal={setCurrentSelectedJournal}
                // jounalsData={journals}
                // setJournalsData={setJournals}
                offset = {
                  {
                    top: 50,
                    left: 48,
                    right: 48,
                }
                }
              />
            )}
          </Grid>
        )}
      </Grid>
    </DashboardContainer>
  );
};

export default JournalHome;


const loadAllJournals = async (authorizedAxios, child_Id, setLoadingAllJournals, setJournals)=> {
  setLoadingAllJournals(true);
  try {
    const response = await authorizedAxios.get(JOURNAL.GET_ALL + child_Id + "/");
    
    console.log(response.data);
    JournalsData = response.data
    setJournals(JournalsData);
  } catch (error) {
    console.error(error);
  }
  setLoadingAllJournals(false);
  
}