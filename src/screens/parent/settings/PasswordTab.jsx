import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';

import { CustomButton, CustomTextInput } from '../../../components';

import { SaveIcon } from '../../../icons';

import { useAppContext } from '../../../context/appContext';

import { tokens } from '../../../theme';
import { $ } from '../../../utils';
import { UPDATE_USER_Password } from '../../../config/backend_endpoints';

const PasswordTab = ({ topSectionHeight = 0 }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { authorizedAxios, user } = useAppContext();

  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmNewPassword, setConfirmNewPassword] = React.useState('');
  const [passwordUploadRequest, setPasswordUploadRequest ] = useState({
    loading: false,
    status: "", // strat || complete,
    response: "",
    error: "",
  });


  const [errorPassword, setErrorPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  const [showMessage, setShowMessage] = useState();

  const validateInput = ()=>{
    let _errors = { ...errorPassword };
    if (currentPassword === "") {
      _errors.currentPassword = "Required";
    }else _errors.currentPassword = "";
    if (newPassword === "") {
      _errors.newPassword = 'Required';
    }else _errors.newPassword = '';
    if (confirmNewPassword === "") {
      _errors.confirmNewPassword = 'Required';
    }else _errors.confirmNewPassword = '';

    setErrorPassword(_errors);
    for (const key in _errors) if (_errors[key]) return false;
    return true;
  }
  const hideMessage = ()=>{
    setShowMessage(false);
  }

  useEffect(()=>{
    if (!passwordUploadRequest.loading && passwordUploadRequest.status === 'complete' ) {
        setShowMessage(true);
        setTimeout(hideMessage, 5000);
    }
  },[passwordUploadRequest]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: $({ size: 8 }),
        flex: 1,
        mt: $({ size: 15 }),
      }}>

        {showMessage && 
          <Typography
            sx={{
              fontSize: $({ size: 15 }),
              fontWeight: '400',
              lineHeight: $({ size: 40 }),
              paddingLeft: $({size: 10}),
              color: colors.extra.grey1,
              backgroundColor: passwordUploadRequest.error === "" ? colors.greenAccent[500] : colors.solids.orange,
            }}>
            { passwordUploadRequest.error === "" ? passwordUploadRequest.response: passwordUploadRequest.error}
          </Typography>
        }


      <Typography
        sx={{
          fontSize: $({ size: 18 }),
          fontWeight: '400',
          lineHeight: $({ size: 30 }),
          color: colors.solids.black,
        }}>
        Want to change your password? Enter your current password then enter a
        new one.
      </Typography>

      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: $({ size: 20 }) }}>
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
            label='Current Password'
            value={currentPassword}
            error={errorPassword.currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            containerStyle={{ flex: 1, width: '100%' }}
            labelStyle={{ pb: 0 }}
          />

          <Box
            sx={{
              flex: 1,
              display: {
                xs: 'none',
                md: 'block',
              },
            }}
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
            label='New Password'
            value={newPassword}
            error={errorPassword.newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            containerStyle={{ flex: 1, width: '100%' }}
            labelStyle={{ pb: 0 }}
          />

          <CustomTextInput
            label='Confirm New Password'
            value={confirmNewPassword}
            error={errorPassword.confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            containerStyle={{ flex: 1, width: '100%' }}
            labelStyle={{ pb: 0 }}
          />
        </Box>
      </Box>

      <Box sx={{ flex: 1 }} />

      <CustomButton
        onClick={() => {
          if (validateInput()) {

            let passwordData = {user_id: user.id, current_password: currentPassword, new_password: newPassword, confirm_new_password: confirmNewPassword};
            updatePassword(authorizedAxios, passwordData, setPasswordUploadRequest);
          }
        }}
        label={'Save Changes'}
        loading={passwordUploadRequest.loading}
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

export default PasswordTab;


const updatePassword = async (authorizedAxios, passwordData, setPasswordUploadRequest )=>{
  setPasswordUploadRequest({
    loading: true,
    status: "start",
    response: "",
    error: "",
  });
  try {
    const response = await authorizedAxios.patch(UPDATE_USER_Password, {
              ...passwordData
                      });
    console.log(response.data.message);
    setPasswordUploadRequest({
      loading: false,
      status: "complete",
      response: response.data.message,
      error: "",
    });
    
  } catch (error) {
    console.error(error);
    setPasswordUploadRequest({
      loading: false,
      status: "complete",
      response: "",
      error: error?.response?.data?.error || error.message,
    });
  }
}