import React from 'react';
import { Box, useTheme, Typography } from '@mui/material';

import { DashboardContainer, CustomTabs } from '../../../components';

import { tokens } from '../../../theme';
import { $ } from '../../../utils';

import TrainByPrompts from './TrainByPromptsTab';
import TrainByFile from './TrainByFileTab';
import TrainByScrapeURL from './TrainByScrapeURLTab';

const AITrainingHome = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [tabsData, setTabsData] = React.useState([
    { label: 'Train by Prompts', isSelected: true },
    { label: 'Train by File', isSelected: false },
    { label: 'Train by Scrape URL', isSelected: false },
  ]);

  // TO CALCULATE TOP SECTION HEIGHT
  const topSectionRef = React.useRef(null);
  const [topSectionHeight, setTopSectionHeight] = React.useState(0);

  React.useEffect(() => {
    setTopSectionHeight(topSectionRef.current?.offsetHeight || 0);
  }, [topSectionRef.current?.offsetHeight]);

  return (
    <DashboardContainer
      wrapperStyle={{ position: 'relative' }}
      containerStyle={{
        pb: $({ size: 20 }),
        gap: {
          xs: $({ size: 16 }),
          md: $({ size: 20 }),
        },
      }}>
      <Box
        ref={topSectionRef}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: $({ size: 12 }),
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            alignItems: {
              xs: 'flex-start',
              sm: 'center',
            },
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: {
              xs: $({ size: 24 }),
              sm: $({ size: 16 }),
            },
          }}>
          <Typography
            sx={{
              fontSize: $({ size: 31.98 }),
              fontWeight: '600',
              color: colors.extra.grey1,
            }}>
            AI Training
          </Typography>
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

      {tabsData[0].isSelected && (
        <TrainByPrompts topSectionHeight={topSectionHeight} />
      )}

      {tabsData[1].isSelected && <TrainByFile />}

      {tabsData[2].isSelected && <TrainByScrapeURL />}
    </DashboardContainer>
  );
};

export default AITrainingHome;
