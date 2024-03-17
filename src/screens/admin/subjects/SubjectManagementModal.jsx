import React, { useEffect, useState} from 'react';
import { Box, Grid, Typography, useTheme, alpha } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
// import CircularProgress from '@mui/material/CircularProgress';
// import Backdrop from '@mui/material/Backdrop';
import axios from 'axios';
import { GET_ALL_COLORS, GET_ALL_TIERS, SAVE_NEW_SUBJECT, UPDATE_SUBJECT, GET_SUB_SUBJECTS_BY_SUBJECT, DELETE_SUB_SUBJECT } from '../../../config/backend_endpoints';

import { useAppContext } from '../../../context/appContext';

import {
  CustomButton,
  CustomCheckBox,
  CustomDropDown,
  CustomFileUploader,
  CustomLabel,
  CustomModal,
  CustomTextInput,
} from '../../../components';

import { AddIcon, EditIcon, SaveIcon, TrashIcon } from '../../../icons';

import { tokens } from '../../../theme';
import { $ } from '../../../utils';

// import { Colors } from './data';

import SubSubjectAddUpdateModel from './SubSubjectAddUpdateModel';

const SubjectManagementModal = ({
  isModalOpen = { isOpen: false, index: -1, mode:"create" },
  setIsModalOpen = () => {},
  currentSelectedSubject = null,
  setCurrentSelectedSubject = () => {},
  // setIsSubSubjectModalOpen = () => {},
  // setCurrentSelectedSubSubject = () => {},
  // setSubjectsData = () => {},
  offset = {
    top: 24,
    left: 48,
    right: 48,
  },
  // subSubjects = [],
  // setSubSubjects = () => {},
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

  // Add request interceptor
  // authorizedAxios.interceptors.request.use(function (config) {
  //   // Do something before request is sent
  //   return config;
  // }, function (error) {
  //   // Do something with request error
  //   return Promise.reject(error);
  // });

  

  const [subjectTitle, setSubjectTitle] = React.useState(
    currentSelectedSubject ? currentSelectedSubject.subjectName : ''
  );

  const [subjectDescription, setSubjectDescription] = React.useState(
    currentSelectedSubject ? currentSelectedSubject.subjectDesc : ''
  );

  const [minAge, setMinAge] = React.useState(
    currentSelectedSubject ? currentSelectedSubject.minage : ''
  );

  const [maxAge, setMaxAge] = React.useState(
    currentSelectedSubject ? currentSelectedSubject.maxage : ''
  );

  const [tierDropDownOpen, setTierDropDownOpen] = React.useState(false);

  const [tierData, setTierData] = useState([]);
  let selectedSubjectTier = currentSelectedSubject?.tier || '';
  if (isModalOpen.mode === "update") {
    selectedSubjectTier = selectedSubjectTier[0].toUpperCase() + selectedSubjectTier.slice(1);
  }
  const [tier, setTier] = React.useState({
    id:'',
    name: selectedSubjectTier,
  });

  let tempSubjectIcon = '';
  if (isModalOpen.mode === "update") {
    const stringList = currentSelectedSubject.icon.split("/");
    tempSubjectIcon = stringList[stringList.length - 1];
  }
  const [subjectIcon, setSubjectIcon] = React.useState(
    isModalOpen.mode === "update" ?  {name:tempSubjectIcon} : null);


  const [subjectIconChanged , setSubjectIconChanged] = useState(false);
    
  const [colorDropDownOpen, setColorDropDownOpen] = React.useState(false);
  
  const [colorsData, setColorsData] = useState([]);
  // const [loadingColors, setLoadingColors] = useState(false);

  const [color, setColor] = React.useState({
    id: currentSelectedSubject?.color?.id || '',
    color_name: currentSelectedSubject?.color || '',
    color_code: currentSelectedSubject?.color || '',
  }
  );
  // UPDATE sample color object = {id: 1, color_name: 'Green', color_code: '#BDEE77'}

  // const [loadingSubjectSave, setLoadingSubjectSave] = useState(false);
  // const [subjectUploaded, setSubjectUploaded] = useState(false);

  const [subjectUploadRequest, setSubjectUploadRequest] = useState({
    loading: false,
    status: "",
    error: "",
  });
  // const [overrideDefaultPrompt, setOverrideDefaultPrompt] =
  //   React.useState(false);

  // const [prompt, setPrompt] = React.useState(
  //   currentSelectedSubject ? currentSelectedSubject.prompt : ''
  // );

  const [errorSubject, setErrorSubject] = useState({
    "subjectTitle": "",
    "subjectDescription": "",
    "minAge": "",
    "maxAge": "",
    "tier":"",
    "subjectIcon":"",
    "color": "",
  });


  const [subSubjectTitleInput, setSubSubjectTitleInput] = useState('');
  const [subSubjects, setSubSubjects] = React.useState([]);
  const [subSubjectLoading, setSubSubjectLoading] = useState(false)

  const [isSubSubjectModalOpen, setIsSubSubjectModalOpen] = React.useState({
    isOpen: false,
    index: -1,
    mode: "create",
  });

  const [currentSelectedSubSubject, setCurrentSelectedSubSubject] = useState(null);

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    React.useState(false);

  const [loadingDeleteSubject, setLoadingDeleteSubject] = useState(false);

  // const [subSubjects, setSubSubjects] = React.useState(
  //   currentSelectedSubject?.courses || []
  // );

  
  // const [subSubjects, setSubSubjects] = React.useState(
  //   currentSelectedSubject ? currentSelectedSubject.subSubjects : []
  // );

  const validateInput =  ()=>{
    const _errors = {...errorSubject};
    if (subjectTitle === '') {
      _errors.subjectTitle = 'Required';
    }else _errors.subjectTitle = '';
    if (subjectDescription === "") {
      _errors.subjectDescription = 'Required';
    }else _errors.subjectDescription = '';
    if (minAge === '') {
      _errors.minAge = 'Required';
    }else _errors.minAge = '';
    if (maxAge === '') {
      _errors.maxAge = 'Required';
    }else if (Number(maxAge) < Number(minAge)) {
      _errors.maxAge = 'Greater then Min Age';
    }else _errors.maxAge = '';
    if (tier.value === "") {
      _errors.tier = 'Required';
    }else _errors.tier = '';
    if (!subjectIcon) {
      _errors.subjectIcon = 'Required';
    }else _errors.subjectIcon = '';
    if (color.color_code === "") {
      _errors.color = 'Required';
    } else _errors.color = '';

    setErrorSubject(_errors);
    
    for (const key in _errors) if (_errors[key]) return false;
    return true;
  }

  useEffect(()=>{

    if (tierData.length === 0) {
      
      loadTiers(authorizedAxios, setTierData);
    }
    if (colorsData.length === 0) {
      
      loadColors(authorizedAxios, setColorsData);
    }

    if (!subjectUploadRequest.loading && subjectUploadRequest.status==="complete" && subjectUploadRequest.error === "") {
      setIsModalOpen({ isOpen: false, index: -1, mode: 'create' });
      resetData();
    }

    // Load Sub Subjects Data only If You opened the model to update
    if (isModalOpen.mode === "update" && isSubSubjectModalOpen.isOpen === false) {
      loadSubSubjects(authorizedAxios, currentSelectedSubject.id, setSubSubjects, setSubSubjectLoading);
    }
    if (loadingDeleteSubject) {
      setIsDeleteConfirmationModalOpen(false);
      setCurrentSelectedSubSubject(null);
    }

    
  }, [subjectUploadRequest, loadingDeleteSubject, isSubSubjectModalOpen])

  const resetData = ()=>{
    setSubjectIconChanged(false);
    setCurrentSelectedSubject(null);
    // setCurrentSelectedSubSubject(null);
    setSubSubjects([]);
  }

  return (
    <CustomModal
      showBackdrop={true}
      title={isModalOpen.mode === "update" ? 'Update Subject' : 'New Subject'}
      onClose={() => {
        setIsModalOpen({ isOpen: false, index: -1, mode:"create" });
        resetData();
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
      {(tierDropDownOpen || colorDropDownOpen) && (
        <Box
          onClick={() => {
            setTierDropDownOpen(false);
            setColorDropDownOpen(false);
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

          {/* Back drop when sub subject open */}
          {
            isSubSubjectModalOpen.isOpen && 
            <Box
              // onClick={() => {
              //   setTierDropDownOpen(false);
              //   setColorDropDownOpen(false);
              // }}
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
          }

      
              <Typography
                sx={{
                  fontSize: $({ size: 16 }),
                  fontWeight: '400',
                  color: colors.redAccent[500],
                  lineHeight: $({ size: 30 }),
                  paddingTop: $({ size: 4 }),
                  
                }}>
                {subjectUploadRequest.error}
              </Typography>
        

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
            value={subjectTitle}
            error={errorSubject.subjectTitle}
            onChange={(e) => setSubjectTitle(e.target.value)}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={5}>
          <CustomTextInput
            label='Description'
            placeholder='Short description'
            value={subjectDescription}
            error={errorSubject.subjectDescription}
            onChange={(e) => setSubjectDescription(e.target.value)}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={1.5}>
          <CustomTextInput
            label='Min Age'
            placeholder='e.g. 5'
            value={minAge}
            error={errorSubject.minAge}
            onChange={(e) => setMinAge(e.target.value)}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={1.5}>
          <CustomTextInput
            label='Max Age'
            placeholder='e.g. 10'
            value={maxAge}
            error={errorSubject.maxAge}
            onChange={(e) => setMaxAge(e.target.value)}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}>
          <CustomDropDown
            value={tier?.name || ''}
            placeholder='Choose a tier'
            label='Tier'
            error={errorSubject.tier}
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
                      fontWeight: tier.value === item.name ? '600' : '400',
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
          md={4}>
            
          <CustomFileUploader
            label='Icon'
            placeholder={
              subjectIcon? subjectIcon?.name : 'Upload an icon'
            }
            error={errorSubject.subjectIcon}
            onClick={(file) => {
              setSubjectIcon(file.file);
              setSubjectIconChanged(true);
            }}
          />
        </Grid>

        <Grid
          item
          xs={12}
          md={4}>
          <CustomDropDown
            value={color?.color_code || ''}
            placeholder='Choose a color'
            label='Color'
            error={errorSubject.color}
            dropDownOpen={colorDropDownOpen}
            setDropDownOpen={setColorDropDownOpen}
            data={colorsData.map((item) => {
              return {
                onClick: () => {
                  // console.log(item);
                  setColor(item);
                },
                component: (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: $({ size: 16 }),
                    }}>
                    <Box
                      sx={{
                        backgroundColor: item.color_code,
                        width: $({ size: 48 }),
                        height: $({ size: 24 }),
                        borderRadius: $({ size: 24 }),
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: $({ size: 18 }),
                        fontWeight: color.value === item.color_code ? '600' : '400',
                        color: colors.extra.grey1,
                        lineHeight: $({ size: 30 }),
                      }}>
                      {item.color_code}
                    </Typography>
                  </Box>
                ),
              };
            })}
          />
        </Grid>
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
        <CustomLabel label='Sub-Subjects' />
          { isModalOpen.mode === "create" &&
            <Typography
            sx={{
              fontSize: $({ size: 18 }),
              fontWeight:  '400',
              color: colors.extra.grey3,
              lineHeight: $({ size: 30 }),
            }}>
              To create sub subject you need to save subject first.
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
            placeholder='Enter title of new sub-subject to add...'
            disabled= {isModalOpen.mode === 'create'}
            value={subSubjectTitleInput}
            onChange={(e) => setSubSubjectTitleInput(e.target.value)}
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

                setIsSubSubjectModalOpen({
                  isOpen: true,
                  index: -1,
                  mode: "create",});

                // if (!subSubject) return;
                // setSubSubjects([
                //   ...subSubjects,
                //   {
                //     id: `sub-subject-${subSubjects.length + 1}`,
                //     title: subSubject,
                //     description: '',
                //     prompt: '',
                //   },
                // ]);
                // setSubSubject('');
                
              }
            }
          
          }
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
            subSubjectLoading && 
            <CircularProgress
              size={30}
              sx={{
                color: colors.solids.green,
                // position: 'absolute',
                // top: '50%',
                // left: '50%',
                // marginTop: '-12px',
                // marginLeft: '-12px',
              }}
            />
          }



          { subSubjects.map((subSubject, index) => {
            return (
              <Box
                key={`sub-subject-${index + 1}`}
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
                  {subSubject.courseName}
                </Typography>

                <Box sx={{ display: 'flex', gap: $({ size: 16 }) }}>
                  <Box
                    onClick={() => {
                      
                      setCurrentSelectedSubSubject(subSubject);
                      setIsSubSubjectModalOpen({ isOpen: true, index: -1, mode:"update" });
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
                      setCurrentSelectedSubSubject(subSubject);
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
            setCurrentSelectedSubject(null);
            // setCurrentSelectedSubSubject(null);
            setIsModalOpen({ isOpen: false, index: -1 });
            setSubSubjects([]);
          }}
        />
        <CustomButton
          label='Save'
          sx={{
            maxWidth: $({ size: 160 }),
            boxShadow: `0 0 ${$({ size: 4 })} 0 ${alpha(
              colors.solids.black,
              0.25
            )}`,
          }}
          rightIcon={<SaveIcon size={$({ size: 24, numeric: true })} />}
          loading = {subjectUploadRequest.loading}
          loadingColor='#333333'
          disabled = { subjectUploadRequest.loading}
          onClick={() => {

            //Add check before proceed
            if (!validateInput()) {
              console.log(errorSubject);
              console.log("Please fill your form");
              const tempSubject = {"subjectName":subjectTitle, "subjectDesc":subjectDescription,"minage":minAge,"maxage":maxAge,"tier":tier.name, "color":color.color_code,"isActive":true}
              console.log(tempSubject);
              return;
            }

            if (isModalOpen.mode === "create") {
              const tempSubject = {"subjectName":subjectTitle, "subjectDesc":subjectDescription,"minage":minAge,"maxage":maxAge,"tier":tier.name, "color":color.color_code,"isActive":true}
              // console.log(tempSubject);
              // console.log(subjectIcon.file);
              saveNewSubject(authorizedAxios, tempSubject, subjectIcon, setSubjectUploadRequest);
              
            }else if (isModalOpen.mode === "update") {
              let tempSubject = {subject_id: currentSelectedSubject.id};
              if (subjectTitle != currentSelectedSubject.subjectName) {
                tempSubject = { ...tempSubject , subjectName: subjectTitle};
              }
              if (subjectDescription != currentSelectedSubject.subjectDesc) {
                tempSubject = { ...tempSubject, subjectDesc:subjectDescription};
              }
              if (minAge != currentSelectedSubject.minage) {
                tempSubject = { ...tempSubject, minage:minAge};
              }
              if (maxAge != currentSelectedSubject.maxage) {
                tempSubject = { ...tempSubject, maxage: maxAge};
              }
              if (tier.name.toLowerCase() != currentSelectedSubject.tier ){
                tempSubject = { ...tempSubject, tier:tier.name.toLowerCase()};
              }
              if (color.color_code != currentSelectedSubject.color) {
                tempSubject = { ...tempSubject , color: color.color_code};
              }

              // console.log("Cheched Values in subject -- " + JSON.stringify(tempSubject) +" ICON " + subjectIconChanged);

              UpdateSubject(authorizedAxios, tempSubject, subjectIconChanged ? subjectIcon : null , setSubjectUploadRequest);
            }


            // setSubjectsData((prev) => {
            //   return prev.map((subject) => {
            //     if (subject.id === currentSelectedSubject.id) {
            //       return {
            //         ...subject,
            //         title: subjectTitle,
            //         description: subjectDescription,
            //         minAge: minAge,
            //         maxAge: maxAge,
            //         tier: tier.label,
            //         iconPath: subjectIcon?.src || subject.iconPath,
            //         color: {
            //           label: color.label,
            //           value: color.value,
            //         },
            //         prompt: prompt,
            //         subSubjects: subSubjects,
            //       };
            //     }
            //     return subject;
            //   });
            // });
            
            
          }}
        />
          
      </Box>

          {
            isSubSubjectModalOpen.isOpen && 
            <SubSubjectAddUpdateModel 
              isModalOpen={isSubSubjectModalOpen}
              setIsModalOpen={setIsSubSubjectModalOpen}
              currentSelectedSubject = {currentSelectedSubSubject}
              setCurrentSelectedSubject={setCurrentSelectedSubSubject}
              parentSubject = {currentSelectedSubject}
              subSubjectTitleInput = {subSubjectTitleInput}
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
                  Are you sure you want to delete the subject
                </Typography>
                <Typography
                  sx={{
                    color: colors.solids.black,
                    fontSize: $({ size: 18 }),
                    fontWeight: '600',
                    display: 'inline',
                  }}>
                  {` ${currentSelectedSubSubject?.courseName}`}
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
                    setCurrentSelectedSubSubject(null);
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
                    
                    deleteSubSubject(authorizedAxios, currentSelectedSubSubject, setLoadingDeleteSubject);
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

export default SubjectManagementModal;

const loadColors = async (authorizedAxios, setColorsData)=>{
  try {
    const response = await authorizedAxios.get(GET_ALL_COLORS);
    // console.log(response);
    setColorsData(response.data);
    // console.log("Done");
  } catch (error) {
    
  }
}

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

const saveNewSubject = async (authorizedAxios, subjectData, subjectIcon, setSubjectUploadRequest)=>{
  setSubjectUploadRequest({
    loading: true,
    status: "start",
    error: "",
  });
  try {
    const response = await authorizedAxios.post(SAVE_NEW_SUBJECT, {
                        ...subjectData,
                        "icon":subjectIcon
                      });
    // console.log(response);
    setSubjectUploadRequest({
      loading: false,
      status: "complete",
      error: "",
    });
    
  } catch (error) {
    console.error(error);
    setSubjectUploadRequest({
      loading: false,
      status: "complete",
      error: error.message,
    });
  }
}

const UpdateSubject = async (authorizedAxios, subjectData, subjectIcon, setSubjectUploadRequest)=>{
  setSubjectUploadRequest({
    loading: true,
    status: "start",
    error: "",
  });
  try {

    let dataForPatch = { ...subjectData }
    if (subjectIcon) {
      dataForPatch.icon = subjectIcon;
    }
    const response = await authorizedAxios.patch(UPDATE_SUBJECT, {
                        ...dataForPatch
                      });
    // console.log(response);
    setSubjectUploadRequest({
      loading: false,
      status: "complete",
      error: "",
    });
    
  } catch (error) {
    console.error(error);
    setSubjectUploadRequest({
      loading: false,
      status: "complete",
      error: error.message,
    });
  }
}


const loadSubSubjects = async (authorizedAxios, subjectId, setSubSubjects, setSubSubjectLoading)=>{
  setSubSubjectLoading(true);
  try {
    const response = await authorizedAxios.get(GET_SUB_SUBJECTS_BY_SUBJECT + subjectId + "/");
    // console.log(response);
    setSubSubjects(response.data);
    // console.log("Done");
  } catch (error) {
    
  }
  setSubSubjectLoading(false);
}

const deleteSubSubject = async (authorizedAxios, subject, setLoadingDeleteSubject)=> {
  setLoadingDeleteSubject(true);
  // console.log("-- ID of Subject --" + subject.id);
  try {
    const response = await authorizedAxios.delete(DELETE_SUB_SUBJECT, {
      data:{id : subject.id}
    });
    console.log(response.data);
    
  } catch (error) {
    console.error(error);
  }
  setLoadingDeleteSubject(false);
  
}