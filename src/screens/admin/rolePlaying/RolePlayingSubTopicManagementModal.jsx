import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, useTheme, alpha } from '@mui/material';

import axios from 'axios';
import { SUB_ROLE_PLAYING_TOPIC } from '../../../config/backend_endpoints';

import { useAppContext } from '../../../context/appContext';

import {
  CustomButton,
  CustomCheckBox,
  CustomLabel,
  CustomModal,
  CustomTextInput,
} from '../../../components';

import { SaveIcon } from '../../../icons';

import { tokens } from '../../../theme';
import { $ } from '../../../utils';

const RolePlayingSubTopicManagementModal = ({
  isModalOpen = { isOpen: false, index: -1 },
  setIsModalOpen = () => {},
  currentSelectedRolePlayingSubTopic = null,
  setCurrentSelectedRolePlayingSubTopic = () => {},
  parentRolePlayTopic = null,
  // setIsRolePlayingTopicModalOpen = () => {},
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

  const [subTopicUploadRequest, setSubTopicUploadRequest] = useState({
    loading: false,
    status: "",
    error: "",
  });


  const [rolePlayingSubTopicTitle, setRolePlayingSubTopicTitle] =
    React.useState(
      currentSelectedRolePlayingSubTopic
        ? currentSelectedRolePlayingSubTopic.topic_title
        : ''
    );

  const [rolePlayingSubTopicDescription, setRolePlayingSubTopicDescription] =
    React.useState(
      currentSelectedRolePlayingSubTopic
        ? currentSelectedRolePlayingSubTopic.desc
        : ''
    );

  const [overrideDefaultPrompt, setOverrideDefaultPrompt] =
    React.useState( currentSelectedRolePlayingSubTopic
      ? currentSelectedRolePlayingSubTopic.override_prompt :  false);

  const [prompt, setPrompt] = React.useState(
    currentSelectedRolePlayingSubTopic
      ? currentSelectedRolePlayingSubTopic.prompt
      : ''
  );

  const [errorSubTopic, setErrorSubTopic] = useState({
    title: '',
    description: '',
  })
  const validateInput = () => {
    let _errors = {...errorSubTopic};
    if (rolePlayingSubTopicTitle === '') {
      _errors.title = 'Required';
    }else _errors.title = '';
    if (rolePlayingSubTopicDescription === '') {
      _errors.description = 'Required';
    }else _errors.description = '';
    setErrorSubTopic(_errors);
    for (const key in _errors) if (_errors[key]) return false;
    return true;
  }

  const closeModel = ()=>{
    setIsModalOpen({ isOpen: false, index: -1, mode: 'create' });
    setCurrentSelectedRolePlayingSubTopic(null);
  }

  useEffect(()=>{

    if (!subTopicUploadRequest.loading && subTopicUploadRequest.status === 'complete' && subTopicUploadRequest.error === '') {
      closeModel();
    }
  },[subTopicUploadRequest])
  return (
    <CustomModal
      showBackdrop={true}
      title={
        currentSelectedRolePlayingSubTopic
          ? 'Edit Roleplaying Sub-Topic'
          : 'New Roleplaying Sub-Topic'
      }
      onClose={() => {
        closeModel();
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
      <Grid
        container
        rowGap={$({ size: 16 })}
        columnSpacing={$({ size: 16 })}>
        <Grid
          item
          xs={12}
          md={4}>
          <CustomTextInput
            label='Subject Title'
            placeholder='Subject title'
            value={rolePlayingSubTopicTitle}
            onChange={(e) => setRolePlayingSubTopicTitle(e.target.value)}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}>
          <CustomTextInput
            label='Description'
            placeholder='Short description'
            value={rolePlayingSubTopicDescription}
            onChange={(e) => setRolePlayingSubTopicDescription(e.target.value)}
          />
        </Grid>

        <Grid
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
        </Grid>
      </Grid>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: $({ size: 24 }),
        }}>
        <CustomButton
          label='Back'
          isSecondary
          sx={{
            maxWidth: $({ size: 160 }),
            boxShadow: `0 0 ${$({ size: 4 })} 0 ${alpha(
              colors.solids.black,
              0.25
            )}`,
          }}
          onClick={() => {
            closeModel();
          }}
        />
        <CustomButton
          label='Save'
          disabled= {subTopicUploadRequest.loading}
          loading = {subTopicUploadRequest.loading}
          loadingColor='#333333'
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
              return;
            }

            if (isModalOpen.mode === 'create') {
              let subRolePlayingTopic = {
                roleplayId: parentRolePlayTopic.id,
                topic_title: rolePlayingSubTopicTitle,
                desc: rolePlayingSubTopicDescription,
                override_prompt: overrideDefaultPrompt,
                prompt: prompt,
                isActive: true
              };
              saveSubRolePlayingTopic(authorizedAxios, subRolePlayingTopic, setSubTopicUploadRequest);
            }else if (isModalOpen.mode === 'update') {
              let subRolePlayingTopic = {
                subroleplay_id: currentSelectedRolePlayingSubTopic.id
              };
              if (rolePlayingSubTopicTitle != currentSelectedRolePlayingSubTopic.topic_title) {
                subRolePlayingTopic.topic_title = rolePlayingSubTopicTitle;
              }
              if (rolePlayingSubTopicDescription != currentSelectedRolePlayingSubTopic.desc) {
                subRolePlayingTopic.desc = rolePlayingSubTopicDescription;
              }
              if (overrideDefaultPrompt != currentSelectedRolePlayingSubTopic.override_prompt) {
                subRolePlayingTopic.override_prompt = overrideDefaultPrompt;
              }
              if (prompt != currentSelectedRolePlayingSubTopic.prompt) {
                subRolePlayingTopic.prompt = prompt;
              }

              // console.log(subRolePlayingTopic);
              if (Object.keys(subRolePlayingTopic).length > 1) {
                updateSubRolePlayingTopic(authorizedAxios, subRolePlayingTopic, setSubTopicUploadRequest);
                
              }else{
                closeModel();
                return;
              }
            }
            
            // setRolePlayingSubTopics(
            //   rolePlayingSubTopics.map((subSubject) => {
            //     if (subSubject.id === currentSelectedRolePlayingSubTopic.id) {
            //       return {
            //         ...subSubject,
            //         title: rolePlayingSubTopicTitle,
            //         description: rolePlayingSubTopicDescription,
            //         prompt: prompt,
            //       };
            //     }
            //     return subSubject;
            //   })
            // );
            // setIsRolePlayingTopicModalOpen({ isOpen: true, index: -1 });
          }}
        />
      </Box>
    </CustomModal>
  );
};

export default RolePlayingSubTopicManagementModal;

const saveSubRolePlayingTopic = async (authorizedAxios, rolePlayingSubTopic, setSubTopicUploadRequest)=>{
  setSubTopicUploadRequest({
    loading: true,
    status: "start",
    error: "",
  });
  try {
    const response = await authorizedAxios.post(SUB_ROLE_PLAYING_TOPIC.SAVE, {
                        ...rolePlayingSubTopic
                      });
    // console.log(response);
    setSubTopicUploadRequest({
      loading: false,
      status: "complete",
      error: "",
    });
    
  } catch (error) {
    console.error(error);
    setSubTopicUploadRequest({
      loading: false,
      status: "complete",
      error: error,
    });
  }
}

const updateSubRolePlayingTopic = async (authorizedAxios, rolePlayingSubTopic, setSubTopicUploadRequest)=>{
  setSubTopicUploadRequest({
    loading: true,
    status: "start",
    error: "",
  });
  try {
    const response = await authorizedAxios.patch(SUB_ROLE_PLAYING_TOPIC.UPDATE, {
                        ...rolePlayingSubTopic
                      });
    // console.log(response);
    setSubTopicUploadRequest({
      loading: false,
      status: "complete",
      error: "",
    });
    
  } catch (error) {
    console.error(error);
    setSubTopicUploadRequest({
      loading: false,
      status: "complete",
      error: error,
    });
  }
}
