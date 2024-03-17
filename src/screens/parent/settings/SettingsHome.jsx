import React from 'react';
import { Box, useTheme, Typography } from '@mui/material';

import { CustomTabs, DashboardContainer } from '../../../components';

import { tokens } from '../../../theme';
import { $ } from '../../../utils';

import ProfileTab from './ProfileTab';
import PasswordTab from './PasswordTab';
import ChildrenTab from './ChildrenTab';
import PlanTab from './PlanTab';
import BillingTab from './BillingTab';
import NotificationsTab from './NotificationsTab';

const SettingsHome = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [tabsData, setTabsData] = React.useState([
    { label: 'Profile', isSelected: true },
    { label: 'Password', isSelected: false },
    { label: 'Children', isSelected: false },
    { label: 'Plan', isSelected: false },
    { label: 'Billing', isSelected: false },
    { label: 'Notifications', isSelected: false },
  ]);

  // TO CALCULATE TOP SECTION HEIGHT
  const topSectionRef = React.useRef(null);
  const [topSectionHeight, setTopSectionHeight] = React.useState(0);

  React.useEffect(() => {
    setTopSectionHeight(topSectionRef.current?.offsetHeight || 0);
  }, [topSectionRef.current?.offsetHeight]);

  return (
    <DashboardContainer
      wrapperStyle={{
        padding: {
          xs: $({ size: 20 }),
          md: $({ size: 48 }),
        },
        pr: {
          xs: $({ size: 20 }),
          md: $({ size: 48 }),
        },
        overflow: 'scroll',
      }}
      containerStyle={{
        gap: {
          xs: $({ size: 20 }),
          md: $({ size: 16 }),
        },
      }}>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: $({ size: 16 }) }}
        ref={topSectionRef}>
        <Typography
          sx={{
            fontSize: $({ size: 31.98 }),
            fontWeight: '600',
            lineHeight: $({ size: 30 }),
            color: colors.extra.grey1,
          }}>
          Settings
        </Typography>
        <CustomTabs
          tabsData={tabsData}
          setTabsData={(tab) => {
            const temp = [...tabsData];
            temp.forEach((item) => {
              item.isSelected = false;
            });
            temp[tab].isSelected = true;
            setTabsData(temp);
          }}
          containerStyle={{
            paddingLeft: {
              xs: $({ size: 16 }),
              md: $({ size: 40 }),
            },
            margin: {
              xs: `0 -${$({ size: 20 })}`,
              md: `0 -${$({ size: 40 })}`,
            },
          }}
          tabContainerStyle={{
            gap: {
              xs: $({ size: 24 }),
              md: $({ size: 40 }),
            },
          }}
        />
      </Box>

      {tabsData.findIndex((item) => item.isSelected) === 0 && (
        <ProfileTab topSectionHeight={topSectionHeight} />
      )}

      {tabsData.findIndex((item) => item.isSelected) === 1 && (
        <PasswordTab topSectionHeight={topSectionHeight} />
      )}

      {tabsData.findIndex((item) => item.isSelected) === 2 && (
        <ChildrenTab topSectionHeight={topSectionHeight} />
      )}

      {tabsData.findIndex((item) => item.isSelected) === 3 && (
        <PlanTab topSectionHeight={topSectionHeight} />
      )}

      {tabsData.findIndex((item) => item.isSelected) === 4 && (
        <BillingTab topSectionHeight={topSectionHeight} />
      )}

      {tabsData.findIndex((item) => item.isSelected) === 5 && (
        <NotificationsTab topSectionHeight={topSectionHeight} />
      )}
    </DashboardContainer>
  );
};

export default SettingsHome;
