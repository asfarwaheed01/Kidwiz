import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GET_ALL_TIERS, PROMPTS } from '../../../config/backend_endpoints';

import { Box, Grid, Typography, useTheme, alpha } from '@mui/material';
// import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { ReactSortable } from "react-sortablejs";
// import { arrayMoveImmutable } from 'array-move';

import {
  CustomButton,
  CustomCheckBox,
  CustomDropDown,
  CustomModal,
  CustomTextInput,
} from '../../../components';

import {
  CrossIcon,
  ReorderThreeIcon,
  RightArrowIcon,
  SaveIcon,
} from '../../../icons';

import { tokens } from '../../../theme';
import { $ } from '../../../utils';

import { useAppContext } from '../../../context/appContext';

const SortableItem = (props) => {
  const { prompt, prompts, setPrompts, currentIndex, deletedSelectedIndex, colors } = props;

  return (
    <Box
      sx={{
        mt: '10px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: $({ size: 12 }),
        width: '100%',
      }}>
      <Box
        sx={{
          background: colors.extra.grey5,
          padding: `${$({ size: 9 })} ${$({
            size: 14,
          })}`,
          borderRadius: $({ size: 12 }),
          overflow: 'hidden',
          width: '100%',
          userSelect: 'none',
        }}>
        <Typography
          sx={{
            fontSize: $({ size: 13.5 }),
            fontWeight: '400',
            color: colors.solids.black,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}>
          {prompt}
        </Typography>
      </Box>

      <Box sx={{ cursor: 'pointer' }}>
        <ReorderThreeIcon
          size={$({ size: 16, numeric: true })}
          color={colors.extra.grey3}
        />
      </Box>

      <Box
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          deletedSelectedIndex(currentIndex);
          // let array = [
          //   ...prompts.slice(0, currentIndex),
          //   ...prompts.slice(currentIndex + 1),
          // ]
          // setPrompts(array);
          // updatePromptByPromptsList();
        }}>
        <CrossIcon
          size={$({ size: 16, numeric: true })}
          color={colors.extra.grey3}
        />
      </Box>
    </Box>
  );
}

const SortablePromptContainer = ({ children, colors }) => {
  return (
    <Grid
      item
      xs={12}
      md={5.7}
      sx={{
        'mt': {
          xs: $({ size: 0 }),
          md: $({ size: 36 }),
        },
        'maxHeight': $({ size: 244 }),
        'overflowY': 'scroll',
        'pr': $({ size: 12 }),
        '&::-webkit-scrollbar': {
          width: $({ size: 8 }),
          borderRadius: $({ size: 8 }),
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: colors.extra.grey3,
          borderRadius: $({ size: 8 }),
        },
        'display': 'flex',
        'flexDirection': 'column',
        'gap': $({ size: 10 }),
      }}>
      {children}
    </Grid>
  );
};

const PromptManagementModal = ({
  isModalOpen = { isOpen: false, index: -1 },
  setIsModalOpen = () => {},
  initialPrompt = 'foundational',
  currentSelectedPrompt = null,
  setCurrentSelectedPrompt = () => {},
  offset = {
    top: 24,
    left: 48,
    right: 48,
  },
  promptsData = [],
  setPromptsData = () => {},
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


  const [promptType, setPromptType] = React.useState(
    currentSelectedPrompt?.category || 'foundational'
  );

  const [promptTitle, setPromptTitle] = React.useState(
    currentSelectedPrompt?.title || ''
  );

  const [buttonLabel, setButtonLabel] = React.useState(
    currentSelectedPrompt?.buttonLabel || ''
  );

  const [buttonId, setButtonId] = React.useState(
    currentSelectedPrompt?.buttonId || ''
  );

  const [scoring, setScoring] = React.useState(
    currentSelectedPrompt?.activeScoring || false
  );

  let promptsOnLoad = [];
  if (isModalOpen.mode === 'update') {
    promptsOnLoad = currentSelectedPrompt.prompts.split(",").map((item, index)=>{
      return {id: index, name: item};
    });
  }
  const [prompts, setPrompts] = React.useState(promptsOnLoad);

  const [prompt, setPrompt] = React.useState(
    currentSelectedPrompt?.prompts || ''
    );

  const deletedSelectedIndex = (index)=>{
    let tempArray = [
      ...prompts.slice(0, index),
      ...prompts.slice(index + 1),
    ];
    // console.log("temp array --" + JSON.stringify(tempArray));
    setPrompts(tempArray);
    // console.log("There");
    // console.log(prompts);
    let tempArray2 = tempArray.map((item)=>{return item.name});
              tempArray2 = tempArray2.join(",");
    setPrompt(tempArray2);
  }

  const [tierData, setTierData] = useState([]);
  const [tier, setTier] = React.useState({
    id: currentSelectedPrompt?.tier?.id || '',
    name: currentSelectedPrompt?.tier.toLowerCase() || '',
  });

  const [tierDropDownOpen, setTierDropDownOpen] = React.useState(false);

  const [errorsPrompt, setErrorsPrompt] = useState({
    title: '',
    buttonLabel: '',
    buttonId: '',
    tier: '',
    prompt: '',
  });
  const ValidateInput = () => {
    console.log(promptType);
    let _errors = { ...errorsPrompt };
    if (promptTitle === '') {
      _errors.title = 'Required';
    }else _errors.title = '';
    if (promptType === 'chat-command' || promptType === 'buttons') {
      if (buttonLabel === '') {
        _errors.buttonLabel = 'Required';
      }else _errors.buttonLabel = '';
    }
    if (promptType === 'buttons') {
      if (buttonId === '') {
        _errors.buttonId = 'Required';
      }else _errors.buttonId = '';  
    }
    
    if (prompt === '') {
      _errors.prompt = 'Required';
    }else _errors.prompt = '';
    if (tier.name === '') {
      _errors.tier = 'Required';
    }else _errors.tier = '';

    setErrorsPrompt(_errors);
    for (const key in _errors) if (_errors[key]) return false;
    return true;
  }


  const [promptUploadRequest, setPromptUploadRequest] = useState({
    loading: false,
    status: "",
    error: "",
  });

  useEffect(()=>{
    if (tierData.length === 0) {
      loadTiers(authorizedAxios,setTierData);
    }
    if (!promptUploadRequest.loading && promptUploadRequest.status === "complete" && promptUploadRequest.error === "") {
      setIsModalOpen({ isOpen: false, index: -1, mode: 'create' });
      setCurrentSelectedPrompt(null);
    }
  },[promptUploadRequest]);

  return (
    <CustomModal
      showBackdrop={true}
      title={currentSelectedPrompt ? 'Edit Prompt' : 'New Prompt'}
      onClose={() => {
        setIsModalOpen({ isOpen: false, index: -1 });
        setCurrentSelectedPrompt(null);
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

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: $({ size: 20 }),
          userSelect: 'none',
        }}>
        {['Foundational', 'Buttons', 'Chat-Command'].map((item, index) => {
          return (
            <Box
              key={`prompt-type-${index}`}
              onClick={() => setPromptType(item.toLowerCase())}
              sx={{
                padding: `${$({ size: 14 })} ${$({ size: 20 })}`,
                borderRadius: $({ size: 12 }),
                backgroundColor:
                  promptType === item.toLowerCase()
                    ? colors.solids.mainButton
                    : 'transparent',
              }}>
              <Typography
                sx={{
                  color:
                    promptType === item.toLowerCase()
                      ? colors.solids.white
                      : colors.solids.black,
                  fontSize: $({ size: 18 }),
                  fontWeight: '500',
                }}>
                {item.split('-').join(' ')}
              </Typography>
            </Box>
          );
        })}
      </Box>

              <Typography
                sx={{
                  fontSize: $({ size: 16 }),
                  fontWeight: '400',
                  color: colors.redAccent[500],
                  lineHeight: $({ size: 30 }),
                  paddingTop: $({ size: 4 }),
                  
                }}>
                {promptUploadRequest.error}
              </Typography>



      <Grid
        container
        rowGap={$({ size: 16 })}
        columnSpacing={$({ size: 0 })}>
        <Grid
          item
          xs={12}
          md={5.7}>
          <CustomTextInput
            label='Prompt Title'
            placeholder='Prompt title'
            value={promptTitle}
            onChange={(e) => setPromptTitle(e.target.value)}
            error={errorsPrompt.title}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={0.6}></Grid>
        {(promptType === 'buttons' || promptType === 'chat-command') && (
          <Grid
            item
            xs={12}
            md={5.7}>
            <CustomTextInput
              label='Button Label'
              placeholder='Title'
              value={buttonLabel}
              onChange={(e) => setButtonLabel(e.target.value)}
              error={errorsPrompt.buttonLabel}
            />
          </Grid>
        )}
        {promptType === 'buttons' && (
          <>
            <Grid
              item
              xs={12}
              md={5.7}>
              <CustomTextInput
                label='Button ID'
                placeholder='e.g. 546'
                value={buttonId}
                onChange={(e) => setButtonId(e.target.value)}
                error={errorsPrompt.buttonId}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={0.6}></Grid>
          </>
        )}
        <Grid
          item
          xs={12}
          md={5.7}>
          <CustomDropDown
            value={tier?.name || ''}
            placeholder='Choose a tier'
            label='Tier'
            error={errorsPrompt.tier}
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
        {promptType === 'chat-command' && (
          <>
            <Grid
              item
              xs={12}
              md={0.6}></Grid>
            <Grid
              item
              xs={12}
              md={5.7}></Grid>
          </>
        )}
        <Grid
          item
          xs={12}
          md={5.7}>
          <CustomTextInput
            label='Prompts'
            placeholder='Separate prompts by a comma e.g. Prompt example 1, prompt example 2, prompt example 3, ...'
            value={prompt}
            error={errorsPrompt.prompt}
            onChange={(e) => setPrompt(e.target.value)}
            multiline={true}
            containerStyle={{
              width: '100%',
              height: $({ size: 280 }),
            }}
            inputContainerStyle={{
              height: $({ size: 240 }),
            }}
            inputStyle={{
              height: $({ size: 220 }),
              overflowY: 'scroll',
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={0.6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Box
            onClick={() => {
              if (prompt) {
                let tempArray = prompt.split(",");
                let promptsArray = tempArray.map((item, index)=>{return {id:index, name:item}});
                
                  setPrompts(promptsArray);
                
                // setPrompt('');
              }
            }}
            sx={{
              display: 'flex',
              width: $({ size: 64 }),
              alignItems: 'center',
              justifyContent: 'center',
              mt: $({ size: 32 }),
              cursor: 'pointer',
            }}>
            <RightArrowIcon
              color={colors.solids.mainButton}
              size={$({ size: 32, numeric: true })}
            />
          </Box>
        </Grid>
        {/* <SortablePromptContainer
          colors={colors}
          // distance={1}
          pressDelay={120}
          onSortEnd={({ oldIndex, newIndex }) => {
            setPrompts(arrayMoveImmutable(prompts, oldIndex, newIndex));
          }}>
          {prompts.map((prompt, index) => {
            return (
              <SortablePromptItem
                key={`prompt-${index}`}
                index={index}
                currentIndex={index}
                prompts={prompts}
                setPrompts={setPrompts}
                prompt={prompt}
                colors={colors}
              />
            );
          })}
        </SortablePromptContainer> */}

        <SortablePromptContainer colors={colors}>
          <ReactSortable 
            list={prompts} 
            setList={(newState) => {
              

              if (prompts.length === newState.length) {
                let flag = true;
                for (let index = 0; index < prompts.length; index++) {
                  if (prompts[index].name !== newState[index].name) {
                    flag = flag && false;
                    break;
                  } 
                }
                if (flag) {
                  return;
                }
              }


              console.log(newState);
                setPrompts(newState);
                let tempArray = newState.map((item)=>{return item.name});
                tempArray = tempArray.join(",");
                setPrompt(tempArray);
                // this.setState({ list: newState })
                // updatePromptByPromptsList();
              
            }}
            
            >
            {prompts.map((item, index) => (
              // <Box >
                <SortableItem 
                  key={item.id} 
                  prompt={item.name} 
                  colors={colors}
                  prompts= {prompts}
                  setPrompts={setPrompts} 
                  currentIndex= {index}
                  deletedSelectedIndex={deletedSelectedIndex}
                >

                </SortableItem>
                
              // </Box>
            ))}
          </ReactSortable>
        </SortablePromptContainer>

  

      </Grid>

      {promptType === 'buttons' && (
        <Box
          onClick={() => setScoring(!scoring)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: $({ size: 12 }),
            cursor: 'pointer',
            userSelect: 'none',
          }}>
          <CustomCheckBox
            checkedIconSize={$({ size: 22, numeric: true })}
            uncheckedIconSize={$({ size: 22, numeric: true })}
            isChecked={scoring}
          />
          <Typography
            sx={{
              fontSize: $({ size: 18 }),
              fontWeight: '400',
              color: colors.solids.black,
            }}>
            Activate Scoring
          </Typography>
        </Box>
      )}

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
            setIsModalOpen({ isOpen: false, index: -1 });
            setCurrentSelectedPrompt(null);
          }}
        />
        <CustomButton
          label='Save'
          disabled = {promptUploadRequest.loading}
          loading= {promptUploadRequest.loading}
          sx={{
            maxWidth: $({ size: 160 }),
            boxShadow: `0 0 ${$({ size: 4 })} 0 ${alpha(
              colors.solids.black,
              0.25
            )}`,
          }}
          rightIcon={<SaveIcon size={$({ size: 24, numeric: true })} />}
          onClick={() => {
            
            if (!ValidateInput()) {
              return;
            }

            if (isModalOpen.mode === "create") {

              let tempPrompt = {};
              tempPrompt.title = promptTitle;
              tempPrompt.tier = tier.name;
              tempPrompt.prompts = prompt;
              tempPrompt.buttonLabel = '';
              if (promptType === 'chat-command' || promptType === 'buttons'){
                tempPrompt.buttonLabel = buttonLabel;
              }
              tempPrompt.buttonId = '';
              tempPrompt.activeScoring = false;
              if(promptType === 'buttons'){
                tempPrompt.buttonId = buttonId;
                tempPrompt.activeScoring = scoring;
              }
              tempPrompt.category = promptType;
            
              // console.log("Here --  " + JSON.stringify(tempPrompt));
            saveNewPrompt(authorizedAxios, tempPrompt, setPromptUploadRequest);
              
            }else if (isModalOpen.mode === 'update') {
              let tempPrompt = {id: currentSelectedPrompt.id};
              if (promptTitle !== currentSelectedPrompt.title) {
                tempPrompt.title = promptTitle;
              }
              if (tier.name.toLowerCase() !== currentSelectedPrompt.tier.toLowerCase()) {
                tempPrompt.tier = tier.name;
              }
              if (prompt !== currentSelectedPrompt.prompts) {
                tempPrompt.prompts = prompt;
              }
              // tempPrompt.buttonLabel = currentSelectedPrompt.buttonLabel;
              if (promptType === 'chat-command' || promptType === 'buttons'){
                if (buttonLabel !== currentSelectedPrompt.buttonLabel) {
                  tempPrompt.buttonLabel = buttonLabel;
                }
              }
              // tempPrompt.buttonId = currentSelectedPrompt.buttonId;
              // tempPrompt.activeScoring = currentSelectedPrompt.activeScoring;
              if(promptType === 'buttons'){
                if (buttonId !== currentSelectedPrompt.buttonId) {
                  tempPrompt.buttonId = buttonId;
                }
                if (scoring !== currentSelectedPrompt.activeScoring) {
                  tempPrompt.activeScoring = scoring;
                }
              }
              if (promptType !== currentSelectedPrompt.category) {
                tempPrompt.category = promptType;
              }
              updatePrompt(authorizedAxios, tempPrompt, setPromptUploadRequest);
            }
            
            
          }}
        />
      </Box>
    </CustomModal>
  );
};

export default PromptManagementModal;


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

const saveNewPrompt = async (authorizedAxios, promptData, setPromptUploadRequest)=>{
  setPromptUploadRequest({
    loading: true,
    status: "start",
    error: "",
  });
  try {
    const response = await authorizedAxios.post(PROMPTS.SAVE, {
                        ...promptData
                      });
    // console.log(response);
    setPromptUploadRequest({
      loading: false,
      status: "complete",
      error: "",
    });
    
  } catch (error) {
    console.error(error);
    setPromptUploadRequest({
      loading: false,
      status: "complete",
      error: error.message,
    });
  }
}


const updatePrompt = async (authorizedAxios, promptData, setPromptUploadRequest)=>{
  setPromptUploadRequest({
    loading: true,
    status: "start",
    error: "",
  });
  try {
    const response = await authorizedAxios.patch(PROMPTS.UPDATE, {
                        ...promptData
                      });
    // console.log(response);
    setPromptUploadRequest({
      loading: false,
      status: "complete",
      error: "",
    });
    
  } catch (error) {
    console.error(error);
    setPromptUploadRequest({
      loading: false,
      status: "complete",
      error: error.message,
    });
  }
}