import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';

import { CustomButton, CustomCheckBox, CustomToggleSwitch } from '../../../components';
import { SaveIcon } from '../../../icons';

import { useAppContext } from '../../../context/appContext';

import { tokens } from '../../../theme';
import { $ } from '../../../utils';
import { UPDATE_NOTIFICATION } from '../../../config/backend_endpoints';

const NotificationsTab = ({ topSectionHeight = 0 }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { user, authorizedAxios} = useAppContext();
  const [notificationUploadRequest, setNotificationUploadRequest] = useState({
    loading: false,
    status: "", // strat || complete,
    response: "",
    error: "",
  });

  const [emailNotifications, setEmailNotifications] = React.useState([
    {
      label: 'Weekly Newsletter',
      description: 'Receive news and promotions right in your email inbox!',
      isSelected: true,
    },
    {
      label: 'Weekly Summary',
      description:
        'Receive a weekly summary of your activity, right in your email inbox!',
      isSelected: false,
    },
  ]);

  const [websiteNotifications, setWebsiteNotifications] = React.useState([
    { label: 'New daily quiz', isSelected: false },
    { label: 'Grade updated', isSelected: true },
    { label: 'Notification text', isSelected: true },
    { label: 'New weekly quiz', isSelected: false },
    { label: 'Notification text', isSelected: false },
  ]);

  const [showMessage, setShowMessage] = useState();

  const hideMessage = ()=>{
    setShowMessage(false);
  }

  useEffect(()=>{
    if (!notificationUploadRequest.loading && notificationUploadRequest.status === 'complete' ) {
        setShowMessage(true);
        setTimeout(hideMessage, 5000);
    }
  },[notificationUploadRequest]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: $({ size: 20 }),
        mt: $({ size: 20 }),
        flex: 1,
        
      }}>

        {showMessage && 
          <Typography
            sx={{
              fontSize: $({ size: 15 }),
              fontWeight: '400',
              lineHeight: $({ size: 40 }),
              paddingLeft: $({size: 10}),
              color: colors.extra.grey1,
              backgroundColor: notificationUploadRequest.error === "" ? colors.greenAccent[500] : colors.solids.orange,
            }}>
            { notificationUploadRequest.error === "" ? "Notification data is uploaded." : notificationUploadRequest.error}
          </Typography>
        }


      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: $({ size: 16 }) }}>
        <Typography
          sx={{
            fontSize: $({ size: 18 }),
            lineHeight: $({ size: 18 }),
            fontWeight: '600',
            color: colors.solids.black,
          }}>
          Email Notifications
        </Typography>

        {emailNotifications.map((item, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: $({ size: 16 }),
              }}>
              <CustomToggleSwitch
                checked={item.isSelected}
                onChange={() => {
                  let temp = [...emailNotifications];
                  temp[index].isSelected = !temp[index].isSelected;
                  setEmailNotifications(temp);
                }}
              />

              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  sx={{
                    fontSize: $({ size: 18 }),
                    lineHeight: $({ size: 30 }),
                    fontWeight: '500',
                    color: colors.solids.black,
                  }}>
                  {item.label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: $({ size: 13.5 }),
                    fontWeight: '400',
                    color: colors.solids.black,
                  }}>
                  {item.description}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>

      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: $({ size: 22 }) }}>
        <Typography
          sx={{
            mt: $({ size: 8 }),
            fontSize: $({ size: 18 }),
            fontWeight: '600',
            color: colors.solids.black,
          }}>
          Website Notifications
        </Typography>

        {websiteNotifications.map((item, index) => {
          return (
            <Box
              key={ index + "-" +item.label}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: $({ size: 16 }),
              }}>
              <CustomCheckBox
                isChecked={item.isSelected}
                onChange={() => {
                  let temp = [...websiteNotifications];
                  temp[index].isSelected = !temp[index].isSelected;
                  setWebsiteNotifications(temp);
                }}
              />
              <Typography
                sx={{
                  fontSize: $({ size: 18 }),
                  lineHeight: $({ size: 18 }),
                  fontWeight: '500',
                  color: colors.solids.black,
                }}>
                {item.label}
              </Typography>
            </Box>
          );
        })}
      </Box>


      <CustomButton
        onClick={() => {
          const notificationData = {
            weekly_news: emailNotifications[0].isSelected,
            weekly_summary: emailNotifications[1].isSelected,
            daily_quiz: websiteNotifications[0].isSelected,
            grade_update: websiteNotifications[1].isSelected,
            notification_text: websiteNotifications[2].isSelected,
            weekly_quiz : websiteNotifications[3].isSelected,
          };
          updateNotification(authorizedAxios, notificationData, setNotificationUploadRequest);
        }}
        label={'Save Changes'}
        loading={notificationUploadRequest.loading}
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

export default NotificationsTab;

const updateNotification = async (authorizedAxios, notificationData, setNotificationUploadRequest) => {
  setNotificationUploadRequest({
    loading: true,
    status: "strat", // strat || complete,
    response: "",
    error: "",
  });

  try {
    const response = await authorizedAxios.post(UPDATE_NOTIFICATION, {
              ...notificationData
                      });
    console.log(response.data);
    setNotificationUploadRequest({
      loading: false,
      status: "complete",
      response: response.data.message,
      error: "",
    });
    
  } catch (error) {
    console.error(error);
    setNotificationUploadRequest({
      loading: false,
      status: "complete",
      response: "",
      error: error?.response?.data?.error || error.message,
    });
  }
}