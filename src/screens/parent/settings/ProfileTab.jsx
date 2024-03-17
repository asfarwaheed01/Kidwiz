import React, { useEffect, useState } from 'react';
import { Avatar, Box, Typography, useTheme } from '@mui/material';

import { CustomButton, CustomTextInput } from '../../../components';

import { EditIcon, SaveIcon } from '../../../icons';

import { useAppContext } from '../../../context/appContext';

import { ASSETS } from '../../../config/assets';
import { tokens } from '../../../theme';
import { $ } from '../../../utils';
import { API_BASE_URL, UPDATE_USER_PROFILE } from '../../../config/backend_endpoints';

const ProfileTab = ({ topSectionHeight = 0 }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { user, authorizedAxios, updateUserProfileData } = useAppContext();

  const [firstName, setFirstName] = React.useState(
    user?.first_name || '');
  const [lastName, setLastName] = React.useState(
    user?.last_name || '');
  const [email, setEmail] = React.useState(
    user?.email || '');
  const [phone, setPhone] = React.useState(
    user?.mobile_number || '');

  const [userPicture, setUserPicture] = useState(
    user?.img || null);
  const inputRefForPic = React.useRef(null);
  const [userPictureChanged, setUserPictureChanged] = useState(false);

  const [userUpdateRequest, setUserUpdateRequest] = useState({
    loading: false,
    status: "", // strat || complete
    error: "",
  });
  const [showMessage, setShowMessage] = useState(false);

  const hideMessage = ()=>{
    setShowMessage(false);
  }
  useEffect(()=>{
    if (!userUpdateRequest.loading && userUpdateRequest.status === "complete" && userUpdateRequest.error === "") {
      setShowMessage(true);
      setTimeout(hideMessage, 5000);
    }
  },[userUpdateRequest]);


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: $({ size: 20 }),
        flex: 1,
        mt: $({ size: 20 }),
      }}>


        {showMessage && 
          <Typography
            sx={{
              fontSize: $({ size: 15 }),
              fontWeight: '400',
              lineHeight: $({ size: 40 }),
              paddingLeft: $({size: 10}),
              color: colors.extra.grey1,
              backgroundColor: userUpdateRequest.error === "" ? colors.greenAccent[500] : colors.solids.orange,
            }}>
            { userUpdateRequest.error === "" ? "Profile updated successfully.": userUpdateRequest.error}
          </Typography>
        }
        

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: $({ size: 20 }),
        }}>
        <Box
          sx={{
            position: 'relative',
            width: $({ size: 112 }),
            height: $({ size: 112 }),
          }}>
          <Avatar
            src={ userPictureChanged ? URL.createObjectURL(userPicture) : ( userPicture ? API_BASE_URL + userPicture : ASSETS.ON_BOARDING.CHILD)}
            sx={{
              width: $({ size: 112 }),
              height: $({ size: 112 }),
              objectFit: 'cover',
            }}
          />

          <Box
            onClick={() => {
              inputRefForPic.current.click();
            }}
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              cursor: 'pointer',
            }}>
              <input
                style={{ display: 'none' }}
                ref={inputRefForPic}
                type='file'
                onChange={(e) => {
                  const file = e.target?.files[0];
                  // console.log(file);
                  if (!file) return;
                  setUserPicture(file);
                  setUserPictureChanged(true);
                  // onClick({
                  //   file: file,
                  //   src: URL.createObjectURL(file),
                  // });
                  // inputRef.current.value = null;
                }}
                // accept={accept}
              />
            <EditIcon
              size={$({ size: 24, numeric: true })}
              color={colors.extra.grey2}
            />
          </Box>
        </Box>

        <Typography
          sx={{
            fontSize: $({ size: 31.98 }),
            fontWeight: '600',
            lineHeight: $({ size: 40 }),
            color: colors.extra.grey1,
          }}>
          { user.first_name + " " + user.last_name}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: $({ size: 20 }),
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
            alignItems: 'center',
            gap: $({ size: 20 }),
          }}>
          <CustomTextInput
            label='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            containerStyle={{ flex: 1, width: '100%' }}
            labelStyle={{ pb: 0 }}
          />

          <CustomTextInput
            label='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            containerStyle={{ flex: 1, width: '100%' }}
            labelStyle={{ pb: 0 }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
            alignItems: 'center',
            gap: $({ size: 20 }),
          }}>
          <CustomTextInput
            label='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            containerStyle={{ flex: 1, width: '100%' }}
            labelStyle={{ pb: 0 }}
          />

          <CustomTextInput
            label='Phone'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type='tel'
            containerStyle={{ flex: 1, width: '100%' }}
            labelStyle={{ pb: 0 }}
          />
        </Box>
      </Box>

      <Box sx={{ flex: 1 }} />

      <CustomButton
        onClick={() => {
          let userData = {user_id: user.id};
          if (firstName !== user.first_name) {
            userData.first_name = firstName;
          }
          if (lastName !== user.last_name) {
            userData.last_name = lastName;
          }
          if (email !== user.email) {
            userData.email = email;
          }
          if (phone !== user.mobile_number ) {
            userData.mobile_number = phone;
          }
          if (userPictureChanged) {
            userData.img = userPicture;
          }

          // console.log(userData);
          updateProfileData(authorizedAxios, userData, setUserUpdateRequest, updateUserProfileData);
        }}
        label={'Save Changes'}
        loading={userUpdateRequest.loading}
        sx={{
          maxWidth: $({ size: 256 }),
          alignSelf: 'flex-end',
        }}
        rightIcon={
          <SaveIcon
            size={$({ size: 24, numeric: true })}
            color={colors.white[900]}
          />
        }
      />
    </Box>
  );
};

export default ProfileTab;


const updateProfileData = async (authorizedAxios, userData, setUserUpdateRequest, updateUserProfileData) => {
  setUserUpdateRequest({
    loading: true,
    status: "start",
    error: "",
  });
  try {
    const response = await authorizedAxios.patch(UPDATE_USER_PROFILE, {
              ...userData
                      });
    // console.log(response);
    updateUserProfileData(response.data);
    setUserUpdateRequest({
      loading: false,
      status: "complete",
      error: "",
    });
    
  } catch (error) {
    console.error(error);
    setUserUpdateRequest({
      loading: false,
      status: "complete",
      error: error.message,
    });
  }
}