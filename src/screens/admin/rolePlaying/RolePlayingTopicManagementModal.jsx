import React, { useState, useEffect} from 'react';
import { Box, Grid, Typography, useTheme, alpha } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { useAppContext } from '../../../context/appContext';
import axios from 'axios';
import { GET_ALL_TIERS, ROLE_PLAYING_TOPIC, SUB_ROLE_PLAYING_TOPIC } from '../../../config/backend_endpoints';

import {
  CustomButton,
  CustomCheckBox,
  CustomDropDown,
  CustomLabel,
  CustomModal,
  CustomTextInput,
} from '../../../components';

import { AddIcon, EditIcon, SaveIcon, TrashIcon } from '../../../icons';

import { tokens } from '../../../theme';
import { $ } from '../../../utils';

import RolePlayingSubTopicManagementModal from './RolePlayingSubTopicManagementModal';



const RolePlayingTopicManagementModal = ({
  isModalOpen = { isOpen: false, index: -1, mode: 'create' },
  setIsModalOpen = () => {},
  currentSelectedRolePlayingTopic = null,
  setCurrentSelectedRolePlayingTopic = () => {},
  // setIsSubRolePlayingSubTopicModalOpen = () => {},
  // setCurrentSelectedRolePlayingSubTopic = () => {},
  // setRolePlayingTopicsData = () => {},
  offset = {
    top: 24,
    left: 48,
    right: 48,
  },
  // rolePlayingSubTopics = [],
  // setRolePlayingSubTopics = () => {},
}) => {
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

  // console.log(currentSelectedRolePlayingTopic);


  const [rolePlayingTopicTitle, setRolePlayingTopicTitle] = React.useState(
    currentSelectedRolePlayingTopic ? currentSelectedRolePlayingTopic.topic_title : ''
  );

  const [rolePlayingTopicDescription, setRolePlayingTopicDescription] =
    React.useState(
      currentSelectedRolePlayingTopic
        ? currentSelectedRolePlayingTopic.desc
        : ''
    );

  const [tierData, setTierData] = useState([]);
  const [tierDropDownOpen, setTierDropDownOpen] = React.useState(false);
  const [tier, setTier] = React.useState({
    id: currentSelectedRolePlayingTopic?.id || '',
    name: currentSelectedRolePlayingTopic?.tier || '',
  });

  const [rolePlayingTopicRequest, setRolePlayingTopicRequest] = useState({
    loading: false,
    status: "",
    error: "",
  });

  // const [overrideDefaultPrompt, setOverrideDefaultPrompt] =
  //   React.useState(false);

  // const [prompt, setPrompt] = React.useState(
  //   currentSelectedRolePlayingTopic
  //     ? currentSelectedRolePlayingTopic.prompt
  //     : ''
  // );

  const [rolePlayingSubTopics, setRolePlayingSubTopics] = React.useState([]);
  const [loadingSubTopics, setLoadingSubTopics] = useState(false);
  const [currentSelectedSubTopic, setCurrentSelectedSubTopic] = useState(null);

  const [errorRolePlayingTopic, setErrorRolePlayingTopic] = useState({
    title: "",
    description: "",
    tier: "",
  });


  const validateInput =  ()=>{
    const _errors = {...errorRolePlayingTopic};
    if (rolePlayingTopicTitle === "") {
      _errors.title = "Required";
    }else _errors.title = "";
    if (rolePlayingTopicDescription === "") {
      _errors.description = 'Required'
    }else _errors.description = '';
    if (tier.name === '') {
      _errors.tier = 'Required';
    }else _errors.tier = '';

    setErrorRolePlayingTopic(_errors);
    for (const key in _errors) if (_errors[key]) return false;
    return true;
  }


  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
  React.useState(false);

  const [loadingDeleteTopic, setLoadingDeleteTopic] = useState(false);

  const [isRolePlayingSubTopicModalOpen, setIsRolePlayingSubTopicModalOpen] = useState({
    isOpen: false,
    index: -1,
    mode: "create",
  });

  const closeModel = () => {
    setCurrentSelectedRolePlayingTopic(null);
    setIsModalOpen({ isOpen: false, index: -1, mode:'create' });
  }
    

    useEffect(()=>{
      if (tierData.length === 0) {
        loadTiers(authorizedAxios,setTierData)
      }
      if (!rolePlayingTopicRequest.loading && rolePlayingTopicRequest.status==="complete" && rolePlayingTopicRequest.error === "") {
        closeModel();
      }

      if (
        isModalOpen.mode === "update" &&  !loadingDeleteTopic && !isRolePlayingSubTopicModalOpen.isOpen ) {
        loadAllSubTopics(authorizedAxios, currentSelectedRolePlayingTopic.id,setRolePlayingSubTopics, setLoadingSubTopics);
      }

      if (!loadingDeleteTopic && isDeleteConfirmationModalOpen) {
        setIsDeleteConfirmationModalOpen(false);
      }
    },[rolePlayingTopicRequest, loadingDeleteTopic, isRolePlayingSubTopicModalOpen]);


  return (
    <CustomModal
      showBackdrop={true}
      title={
        currentSelectedRolePlayingTopic
          ? 'Edit Roleplaying Topic'
          : 'New Roleplaying Topic'
      }
      onClose={() => {
        setIsModalOpen({ isOpen: false, index: -1, mode:'crete' });
        setCurrentSelectedRolePlayingTopic(null);
        // setCurrentSelectedRolePlayingSubTopic(null);
        // setRolePlayingSubTopics([]);
      }}
      offset={{
        top: offset.top,
        left: offset.left,
        right: offset.right,
      }}
      containerStyle={{
        maxWidth: $({ size: 1240 }),
        display: 'flex',
        flexDirection: 'column',
        gap: $({ size: 20 }),
      }}
      wrapperStyle={{
        left: '50%',
        transform: 'translateX(-50%)',
        width: $({ size: 1240 }),
      }}>
      {tierDropDownOpen && (
        <Box
          onClick={() => {
            setTierDropDownOpen(false);
          }}
          sx={{
            background: alpha(colors.extra.grey1, 0.4),
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: $({ size: 20 }),
            borderRadius: $({ size: 12 }),
            zIndex: 80,
          }}
        />
      )}

      <Grid
        container
        rowGap={$({ size: 16 })}
        columnSpacing={$({ size: 16 })}>
        <Grid
          item
          xs={12}
          md={6}>
          <CustomTextInput
            label='Roleplaying Topic Title'
            placeholder='Topic title'
            value={rolePlayingTopicTitle}
            onChange={(e) => setRolePlayingTopicTitle(e.target.value)}
            error={errorRolePlayingTopic.title}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}>
          <CustomTextInput
            label='Description'
            placeholder='Description'
            value={rolePlayingTopicDescription}
            onChange={(e) => setRolePlayingTopicDescription(e.target.value)}
            error={errorRolePlayingTopic.description}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}>
          <CustomDropDown
            value={tier?.name || ''}
            placeholder='Choose a tier'
            label='Tier'
            error={errorRolePlayingTopic.tier}
            dropDownOpen={tierDropDownOpen}
            setDropDownOpen={setTierDropDownOpen}
            data={tierData.map((item) => {
              return {
                onClick: () => {
                  setTier(item);
                },
                component: (
                  <Typography
                    sx={{
                      fontSize: $({ size: 18 }),
                      fontWeight: tier.name === item.name ? '600' : '400',
                      color: colors.extra.grey1,
                      lineHeight: $({ size: 30 }),
                    }}>
                    {item.name}
                  </Typography>
                ),
              };
            })}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}></Grid>
          {/* <Grid
            item
            xs={12}
            md={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: $({ size: 16 }),
              }}>
              <CustomLabel label='Prompt' />

              <Box
                onClick={() => setOverrideDefaultPrompt(!overrideDefaultPrompt)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: $({ size: 8 }),
                  cursor: 'pointer',
                  userSelect: 'none',
                }}>
                <CustomCheckBox
                  isChecked={overrideDefaultPrompt}
                  onChange={() =>
                    setOverrideDefaultPrompt(!overrideDefaultPrompt)
                  }
                  checkedIconSize={$({ size: 16, numeric: true })}
                  uncheckedIconSize={$({ size: 16, numeric: true })}
                />
                <Typography
                  sx={{
                    fontSize: $({ size: 16 }),
                    fontWeight: '400',
                    color: colors.extra.grey1,
                  }}>
                  Override default prompt (write own prompt)
                </Typography>
              </Box>
            </Box>
            <CustomTextInput
              label={null}
              placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum, felis in eleifend tristique, nisi justo facilisis magna, quis fermentum risus ex vel nulla. Fusce tincidunt non massa ut hendrerit. Nunc bibendum urna a turpis facilisis, sit amet congue arcu volutpat.'
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              multiline={true}
              containerStyle={{
                width: '100%',
                height: $({ size: 200 }),
              }}
              inputContainerStyle={{
                height: `100%`,
              }}
              inputStyle={{
                height: `calc(100% - ${$({ size: 8, numeric: true })}px)`,
                overflowY: 'scroll',
              }}
            />
          </Grid> */}
      </Grid>

      <Box>
        <CustomLabel label='Sub-Topic' />

        { isModalOpen.mode === "create" &&
            <Typography
            sx={{
              fontSize: $({ size: 18 }),
              fontWeight:  '400',
              color: colors.extra.grey3,
              lineHeight: $({ size: 30 }),
            }}>
              To create sub Topic you need to save topic first.
          </Typography>}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: $({ size: 16 }),
            maxWidth: $({ size: 500 }),
          }}>
          <CustomTextInput
            label={null}
            placeholder='Enter title of new sub-topic to add...'
            disabled={isModalOpen.mode !== "update"}
            // value={rolePlayingSubTopic}
            // onChange={(e) => setRolePlayingSubTopic(e.target.value)}
            containerStyle={{
              width: '100%',
            }}
            inputContainerStyle={{
              padding: `${$({ size: 6 })} ${$({ size: 20 })}`,
            }}
          />

          <Box
            onClick={() => {
              if (isModalOpen.mode === "update") {

                setIsRolePlayingSubTopicModalOpen({
                    isOpen:true,
                    index: -1,
                    mode:'create'
                  }
                );
                
              }
              
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}>
            <AddIcon
              color={colors.solids.mainButton}
              size={$({ size: 36, numeric: true })}
            />
          </Box>
        </Box>

         <Box
          sx={{
            'display': 'flex',
            'flexDirection': 'row',
            'gap': $({ size: 16 }),
            'marginTop': $({ size: 16 }),
            'overflowX': 'scroll',
            'paddingBottom': $({ size: 16 }),
            '&::-webkit-scrollbar': {
              height: $({ size: 8 }),
              borderRadius: $({ size: 8 }),
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: colors.extra.grey3,
              borderRadius: $({ size: 8 }),
            },
          }}>

          {
          loadingSubTopics && 
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
          }
            
          {rolePlayingSubTopics.map((rolePlayingSubTopic, index) => {
            return (
              <Box
                key={`sub-role-playing-topic-${index + 1}`}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: $({ size: 8 }),
                  alignItems: 'center',
                }}>
                <Typography
                  sx={{
                    fontSize: $({ size: 13.5 }),
                    fontWeight: '500',
                    width: 'max-content',
                  }}>
                  {rolePlayingSubTopic.topic_title}
                </Typography>

                <Box sx={{ display: 'flex', gap: $({ size: 16 }) }}>
                  <Box
                    onClick={() => {

                      setCurrentSelectedSubTopic(rolePlayingSubTopic);
                      setIsRolePlayingSubTopicModalOpen({isOpen:true, index:-1, mode:"update"});
                      
                      // setCurrentSelectedRolePlayingTopic({
                      //   ...currentSelectedRolePlayingTopic,
                      //   title: rolePlayingTopicTitle,
                      //   description: rolePlayingTopicDescription,
                      //   tier: tier.label,
                      //   prompt: prompt,
                      //   subRolePlayingTopics: rolePlayingSubTopics,
                      // });
                      // setIsModalOpen({ isOpen: false, index: -1 });

                      // setCurrentSelectedRolePlayingSubTopic({
                      //   ...rolePlayingSubTopic,
                      // });
                      // setIsSubRolePlayingSubTopicModalOpen({
                      //   isOpen: true,
                      //   index: -1,
                      // });
                    }}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}>
                    <EditIcon
                      size={$({ size: 18, numeric: true })}
                      color={colors.extra.grey3}
                    />
                  </Box>

                  <Box
                    onClick={() => {
                      setCurrentSelectedSubTopic(rolePlayingSubTopic);
                      setIsDeleteConfirmationModalOpen(true);
                    }}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}>
                    <TrashIcon
                      size={$({ size: 18, numeric: true })}
                      color={colors.extra.grey3}
                    />
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box> 
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: $({ size: 24 }),
        }}>
        <CustomButton
          label='Cancel'
          isSecondary
          sx={{
            maxWidth: $({ size: 160 }),
            boxShadow: `0 0 ${$({ size: 4 })} 0 ${alpha(
              colors.solids.black,
              0.25
            )}`,
          }}
          onClick={() => {
            setCurrentSelectedRolePlayingTopic(null);
            // setCurrentSelectedRolePlayingSubTopic(null);
            setIsModalOpen({ isOpen: false, index: -1, mode:'create' });
            // setRolePlayingSubTopics([]);
          }}
        />
        <CustomButton
          label='Save'
          disabled= {rolePlayingTopicRequest.loading}
          loading={rolePlayingTopicRequest.loading}
          sx={{
            maxWidth: $({ size: 160 }),
            boxShadow: `0 0 ${$({ size: 4 })} 0 ${alpha(
              colors.solids.black,
              0.25
            )}`,
          }}
          rightIcon={<SaveIcon size={$({ size: 24, numeric: true })} />}
          onClick={() => {

            if (!validateInput()) {
              console.log("RoleplayingTopic Form filling error");
              return;
            }

            // console.log("Here I am --- " + isModalOpen.mode);
            if (isModalOpen.mode === 'create') {
              let rolePlayingTopic = {
                topic_title: rolePlayingTopicTitle,
                desc: rolePlayingTopicDescription,
                tier: tier.name.toLowerCase(),
                isActive: true
              };
                // console.log(rolePlayingTopic);
              saveNewRolePlayingTopic(authorizedAxios, rolePlayingTopic, setRolePlayingTopicRequest);
            }else if (isModalOpen.mode === 'update') {
              let rolePlayingTopic = {
                Roleplay_id : currentSelectedRolePlayingTopic.id,
              };
              if (rolePlayingTopicTitle !== currentSelectedRolePlayingTopic.topic_title) {
                rolePlayingTopic.topic_title = rolePlayingTopicTitle;                 
              }
              if (rolePlayingTopicDescription !== currentSelectedRolePlayingTopic.desc) {
                rolePlayingTopic.desc = rolePlayingTopicDescription;
              }
              if (tier.name !== currentSelectedRolePlayingTopic.tier) {
                rolePlayingTopic.tier = tier.name;
              }

              // console.log("Topic updates = "  + JSON.stringify(rolePlayingTopic));

              if (Object.keys(rolePlayingTopic).length > 1) {
                UpdateRolePlayingTopic(authorizedAxios, rolePlayingTopic, setRolePlayingTopicRequest);
                
              }else{
                closeModel();
                return;
              }
              
            }


            // setRolePlayingTopicsData((prev) => {
            //   return prev.map((subject) => {
            //     if (subject.id === currentSelectedRolePlayingTopic.id) {
            //       return {
            //         ...subject,
            //         title: rolePlayingTopicTitle,
            //         description: rolePlayingTopicDescription,
            //         tier: tier.label,
            //         prompt: prompt,
            //         subRolePlayingTopics: rolePlayingSubTopics,
            //       };
            //     }
            //     return subject;
            //   });
            // });
            
            // setCurrentSelectedRolePlayingSubTopic(null);
            // setRolePlayingSubTopics([]);
          }}
        />
      </Box>

      {
        isRolePlayingSubTopicModalOpen.isOpen && 
        <RolePlayingSubTopicManagementModal
          isModalOpen={isRolePlayingSubTopicModalOpen}
          setIsModalOpen={setIsRolePlayingSubTopicModalOpen}
          parentRolePlayTopic= {currentSelectedRolePlayingTopic}
          currentSelectedRolePlayingSubTopic={
            currentSelectedSubTopic
          }
          setCurrentSelectedRolePlayingSubTopic={
            setCurrentSelectedSubTopic
          }
          // setIsRolePlayingTopicModalOpen={setIsRolePlayingTopicModalOpen}
          // rolePlayingSubTopics={
          //   currentSelectedRolePlayingTopic?.subRolePlayingTopics || []
          // }
          // setRolePlayingSubTopics={setRolePlayingSubTopics}
          offset={{top: 0,
            left: 0,
            right: 0,}}
        />
        }


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
                  Are you sure you want to delete the Sub Roleplaying Topic
                </Typography>
                <Typography
                  sx={{
                    color: colors.solids.black,
                    fontSize: $({ size: 18 }),
                    fontWeight: '600',
                    display: 'inline',
                  }}>
                  {` ${currentSelectedSubTopic?.topic_title}`}
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
                loadingDeleteTopic && 
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
                    setCurrentSelectedSubTopic(null);
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
                    
                    deleteSubTopic(authorizedAxios, currentSelectedSubTopic, setLoadingDeleteTopic);
                    // setIsDeleteConfirmationModalOpen(false);

                    // const temp = [...subjectsData];
                    // temp.splice(
                    //   subjectsData.findIndex(
                    //     (item) => item.id === currentSelectedSubject.id
                    //   ),
                    //   1
                    // );
                    // setSubjectsData(temp);

                    // setCurrentSelectedSubject(null);
                  }}
                />
              </Box>
            </CustomModal>
          )}
          


    </CustomModal>
  );
};

export default RolePlayingTopicManagementModal;


const loadTiers = async (authorizedAxios, setTierData)=>{
  try {
    const response = await authorizedAxios.get(GET_ALL_TIERS);
    // console.log(response);
    setTierData(response.data);
    // console.log("Done");
  } catch (error) {
    console.error(error);
  }
}

const saveNewRolePlayingTopic = async (authorizedAxios, rolePlayingTopic,  setRolePlayingTopicRequest)=>{
  setRolePlayingTopicRequest({
    loading: true,
    status: "start",
    error: "",
  });
  try {
    const response = await authorizedAxios.post(ROLE_PLAYING_TOPIC.SAVE, rolePlayingTopic);
    // console.log(response);
    setRolePlayingTopicRequest({
      loading: false,
      status: "complete",
      error: "",
    });
    
  } catch (error) {
    console.error(error);
    setRolePlayingTopicRequest({
      loading: false,
      status: "complete",
      error: error.message,
    });
  }
}

const UpdateRolePlayingTopic = async (authorizedAxios, rolePlayingTopic,  setRolePlayingTopicRequest)=>{
  setRolePlayingTopicRequest({
    loading: true,
    status: "start",
    error: "",
  });
  try {
    const response = await authorizedAxios.patch(ROLE_PLAYING_TOPIC.UPDATE, rolePlayingTopic);
    // console.log(response);
    setRolePlayingTopicRequest({
      loading: false,
      status: "complete",
      error: "",
    });
    
  } catch (error) {
    console.error(error);
    setRolePlayingTopicRequest({
      loading: false,
      status: "complete",
      error: error.message,
    });
  }
}


const loadAllSubTopics = async (authorizedAxios, rolePlayID, setRolePlayingSubTopic, setLoadingSubTopics) => {
  setLoadingSubTopics(true);
  try {
    const response = await authorizedAxios.get(ROLE_PLAYING_TOPIC.GET_SUB_TOPICS + rolePlayID + "/");
    // console.log(response);
    setRolePlayingSubTopic(response.data);
    // console.log("Done");
  } catch (error) {
    
  }
  setLoadingSubTopics(false);
}

const deleteSubTopic = async (authorizedAxios, subTopic, setLoadingDeleteSubTopic)=> {
  setLoadingDeleteSubTopic(true);
  // console.log("-- ID of Subject --" + subject.id);
  try {
    const response = await authorizedAxios.delete(SUB_ROLE_PLAYING_TOPIC.DELETE, {
      data:{id : subTopic.id}
    });
    console.log(response.data);
    
  } catch (error) {
    console.error(error);
  }
  setLoadingDeleteSubTopic(false);
  
}