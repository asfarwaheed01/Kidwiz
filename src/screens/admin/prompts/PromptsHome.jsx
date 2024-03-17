import React, { useEffect, useState } from 'react';



import {
  Box,
  useTheme,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  alpha,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import axios from 'axios';
import { useAppContext } from '../../../context/appContext';
import { PROMPTS } from '../../../config/backend_endpoints';

import {
  DashboardContainer,
  CustomTabs,
  CustomSearchInput,
  CustomModal,
  CustomButton,
} from '../../../components';

import { AddIcon, ChevronDownIcon, EditIcon, TrashIcon } from '../../../icons';

import { tokens } from '../../../theme';
import { $ } from '../../../utils';

import PromptManagementModal from './PromptManagementModal';
var PromptsData = [];

const PromptsHome = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { token, logoutUser } = useAppContext();
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

  const [loadingPrompts, setLoadingPrompts] = useState(false);
  const [loadingDeletePrompt, setLoadingDeletePrompt] = useState(false);


  const [isModalOpen, setIsModalOpen] = React.useState({
    isOpen: false,
    index: -1,
    mode: 'create',
  });

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    React.useState(false);

  const [search, setSearch] = React.useState('');
  const handleSearch = () => {};

  const [promptsData, setPromptsData] = React.useState(PromptsData);
  const [currentSelectedPrompt, setCurrentSelectedPrompt] =
    React.useState(null);

  const [tabsData, setTabsData] = React.useState([
    { label: 'All', isSelected: true },
    { label: 'Foundational', isSelected: false },
    { label: 'Buttons', isSelected: false },
    { label: 'Chat Commands', isSelected: false },
  ]);

  const [expanded, setExpanded] = React.useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // TO CALCULATE TOP SECTION HEIGHT
  const topSectionRef = React.useRef(null);
  const [topSectionHeight, setTopSectionHeight] = React.useState(0);

  React.useEffect(() => {
    setTopSectionHeight(topSectionRef.current?.offsetHeight || 0);
  }, [topSectionRef.current?.offsetHeight]);

  useEffect(()=>{
    if (!loadingDeletePrompt && isDeleteConfirmationModalOpen) {
      setIsDeleteConfirmationModalOpen(false);
      setCurrentSelectedPrompt(null);
    }
    if (!isModalOpen.isOpen) {
      loadPrompts(authorizedAxios, setLoadingPrompts,  setPromptsData);
      
    }
  },[isModalOpen,loadingDeletePrompt]);

  return (
    <DashboardContainer
      wrapperStyle={{ position: 'relative' }}
      containerStyle={{
        pb: $({ size: 24 }),
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
            gap: $({ size: 0 }),
            width: '100%',
          }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              alignItems: 'flex-start',
              // alignItems: {
              //   xs: 'flex-start',
              //   sm: 'center',
              // },
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: $({ size: 24 }),
            }}>
            <Typography
              sx={{
                fontSize: $({ size: 31.98 }),
                fontWeight: '600',
                color: colors.extra.grey1,
                lineHeight: $({ size: 31.98 * 0.8 }),
              }}>
              Prompts
            </Typography>

            <CustomSearchInput
              placeholder='Search for your subject'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              containerStyle={{
                mt: `-${$({ size: 20 })}`,
                // maxWidth: {
                //   xs: '100%',
                //   sm: $({ size: 352 }),
                // },
                // minWidth: {
                //   xs: '100%',
                //   sm: $({ size: 352 }),
                // },
                width: $({ size: 352 }),
              }}
              handleSearch={handleSearch}
              handleSearchOnEveryKeyStroke={handleSearch}
            />
          </Box>

          <Box
            onClick={() => {
              setIsModalOpen({ isOpen: true, index: -1, mode: 'create' });
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
              New Prompt
            </Typography>
          </Box>
        </Box>

        <CustomTabs
          tabsData={tabsData}
          setTabsData={(tab) => {
            const temp = [...tabsData];
            temp.forEach((item) => {
              item.isSelected = false;
            });
            temp[tab].isSelected = true;
            setTabsData(temp);

            if (tab === 0) {
              setPromptsData(PromptsData);
            } else if (tab === 1) {
              setPromptsData(
                PromptsData.filter((item) => item.category === 'foundational')
              );
            } else if (tab === 2) {
              setPromptsData(
                PromptsData.filter((item) => item.category === 'buttons')
              );
            } else if (tab === 3) {
              setPromptsData(
                PromptsData.filter((item) => item.category === 'chat-command')
              );
            }
          }}
          containerStyle={{
            paddingLeft: {
              xs: $({ size: 16 }),
              md: $({ size: 40 }),
            },
            margin: {
              xs: `0 -${$({ size: 24 })}`,
              md: `0 -${$({ size: 40 })}`,
            },
          }}
        />
      </Box>

      <Box
        sx={{
          'marginTop': `-${$({ size: 20 })}`,
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
              24 + // WRAPPER CONTAINER BOTTOM PADDING
              24 + // HEADER SECTION GAP
              16,
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

        { loadingPrompts && 
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


        {promptsData.map((item, index) => {
          return (
            <Accordion
              disableGutters
              key={`accordion-${index}-${item.id}`}
              expanded={expanded === `${item.id}`}
              onChange={handleChange(`${item.id}`)}
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
                aria-controls={`${item.id}-content`}
                id={`${item.id}-content`}
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
                      {item.title}
                    </Typography>

                    <Box
                      sx={{
                        padding: `${$({ size: 4 })} ${$({ size: 12 })}`,
                        borderRadius: $({ size: 100 }),
                        backgroundColor:
                          item.tier.toLowerCase() === 'basic'
                            ? colors.solids.orange
                            : item.tier.toLowerCase() === 'pro'
                            ? colors.solids.green
                            : item.tier.toLowerCase() === 'premium'
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
                        {item.tier}
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
                        setCurrentSelectedPrompt(item);
                        setIsModalOpen({ isOpen: true, index: index, mode : 'update' });
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
                        setCurrentSelectedPrompt(item);
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
                {item.category.toLowerCase() === 'buttons' && (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: $({ size: 4 }),
                    }}>
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
                          lineHeight: $({ size: 25 }),
                        }}>
                        Button Label
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: $({ size: 13.5 }),
                          fontWeight: '500',
                          color: colors.extra.grey1,
                          lineHeight: $({ size: 25 }),
                          textTransform: 'uppercase',
                        }}>
                        {item.buttonLabel}
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
                        Button ID
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: $({ size: 13.5 }),
                          fontWeight: '500',
                          color: colors.extra.grey1,
                          textTransform: 'uppercase',
                        }}>
                        {item.buttonId}
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
                        Scoring
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: $({ size: 13.5 }),
                          fontWeight: '500',
                          color: colors.extra.grey1,
                        }}>
                        {item.activeScoring ? 'Yes' : 'No'}
                      </Typography>
                    </Box>
                  </Box>
                )}

                {item.category.toLowerCase() === 'chat-command' && (
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
                        lineHeight: $({ size: 25 }),
                      }}>
                      Button Label
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: $({ size: 13.5 }),
                        fontWeight: '500',
                        color: colors.extra.grey1,
                        lineHeight: $({ size: 25 }),
                        textTransform: 'uppercase',
                      }}>
                      {item.buttonLabel}
                    </Typography>
                  </Box>
                )}

                <ul
                  style={{
                    margin: 0,
                    padding: 0,
                    marginLeft: $({ size: 18 }),
                  }}>
                  {item.prompts.split(",").map((prompt, index) => {
                    return (
                      <li
                        key={`prompt-${index}-${item.id}`}
                        style={{ margin: 0, padding: 0 }}>
                        <Typography
                          sx={{
                            color: colors.solids.black,
                            fontSize: $({ size: 13.5 }),
                            fontWeight: '400',
                            lineHeight: $({ size: 30 }),
                          }}>
                          {prompt}
                        </Typography>
                      </li>
                    );
                  })}
                </ul>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>

      {isModalOpen.isOpen && (
        <PromptManagementModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          initialPrompt={
            tabsData[0].isSelected || tabsData[1].isSelected
              ? 'foundational'
              : tabsData[2].isSelected
              ? 'buttons'
              : 'chat-command'
          }
          currentSelectedPrompt={currentSelectedPrompt}
          setCurrentSelectedPrompt={setCurrentSelectedPrompt}
          setPromptsData={setPromptsData}
          promptsData={promptsData}
        />
      )}

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
              Are you sure you want to delete the prompt
            </Typography>
            <Typography
              sx={{
                color: colors.solids.black,
                fontSize: $({ size: 18 }),
                fontWeight: '600',
                display: 'inline',
              }}>
              {` ${currentSelectedPrompt?.title}`}
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
          {
            loadingDeletePrompt && 
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
                deletePrompt(authorizedAxios, currentSelectedPrompt, setLoadingDeletePrompt);
                

              }}
            />
          </Box>
        </CustomModal>
      )}
    </DashboardContainer>
  );
};

export default PromptsHome;

const loadPrompts = async (authorizedAxios, setLoadingPrompts, setPromptsData)=>{
  setLoadingPrompts(true);
  try {
    const response = await authorizedAxios.get(PROMPTS.GET_ALL);
    // console.log(response);
    PromptsData = response.data
    setPromptsData(PromptsData);
    // console.log("Done");
  } catch (error) {
    console.error(error);
  }
  setLoadingPrompts(false);
}

const deletePrompt = async (authorizedAxios, prompt, setLoadingDeletePrompt)=> {
  setLoadingDeletePrompt(true);
  // console.log("-- ID of Subject --" + subject.id);
  try {
    const response = await authorizedAxios.delete(PROMPTS.DELETE, {
      data:{id : prompt.id}
    });
    console.log(response.data);
    
  } catch (error) {
    console.error(error);
  }
  setLoadingDeletePrompt(false);
  
}