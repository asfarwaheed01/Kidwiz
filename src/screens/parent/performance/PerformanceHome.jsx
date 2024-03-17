import React, { useEffect, useState } from "react";
import { Box, Grid, useTheme, alpha, Typography, Avatar } from "@mui/material";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { useAppContext } from "../../../context/appContext";

import {
  CustomTabs,
  DashboardContainer,
  QuestionProgressBar,
  SelectChildAndDatePanel,
  SelectedChildWithTimeDetails,
} from "../../../components";

import { ChestIcon } from "../../../icons";

import { ASSETS } from "../../../config/assets";
import { tokens } from "../../../theme";
import { $ } from "../../../utils";

import OverallScoreTab from "./OverallScoreTab";
import SubjectsTab from "./SubjectsTab";
import SubjectDetailsTab from "./SubjectDetailsTab";
import StrengthsTab from "./StrengthsTab";
import AreasForImprovementTab from "./AreasForImprovementTab";
import GoalSettingTab from "./GoalSettingTab";

import { SubjectData } from "./data";
import { PERFORMANCE } from "../../../config/backend_endpoints";

const PerformanceHome = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { token, logoutUser, users_children, selected_Child_index } =
    useAppContext();

  const [renderSubjectDetails, setRenderSubjectDetails] = React.useState({
    render: false,
    details: {},
  });
  const [searchDropDownOpen, setSearchDropDownOpen] = React.useState(false);

  const [selectedChild, setSelectedChild] = React.useState(
    users_children[selected_Child_index]
  );

  const [loadingPerformanceData, setLoadingPerformanceData] = useState(false);
  const [performanceData, setPerformanceData] = useState({});

  const [tabsData, setTabsData] = React.useState([
    { label: "Overall Score", isSelected: true },
    { label: "Subjects", isSelected: false },
    { label: "Strengths", isSelected: false },
    { label: "Areas for Improvement", isSelected: false },
    { label: "Goal Setting", isSelected: false },
  ]);

  // TO CALCULATE TOP SECTION HEIGHT
  const topSectionRef = React.useRef(null);
  const [topSectionHeight, setTopSectionHeight] = React.useState(0);

  React.useEffect(() => {
    setTopSectionHeight(topSectionRef.current?.offsetHeight || 0);
  }, [topSectionRef.current?.offsetHeight]);

  // Below Axios is for whole Application
  const authorizedAxios = axios.create({
    baseURL: "",
    // timeout: 3000,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // Add a response interceptor
  authorizedAxios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      if (error.response["status"] !== undefined) {
        if (error.response.status === 401) {
          logoutUser();
        }
      }

      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    let data = { childId: users_children[selected_Child_index].id };
    loadALlSubjectsData(
      authorizedAxios,
      data,
      setLoadingPerformanceData,
      setPerformanceData
    );
  }, [selected_Child_index]);

  return (
    <DashboardContainer
      disableContainer
      wrapperStyle={{ position: "relative", overflowY: "hidden" }}
    >
      <Grid
        container
        sx={{
          height: "max-content",
          minHeight: "100%",
          position: "relative",
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        {searchDropDownOpen && (
          <Box
            onClick={() => {
              setSearchDropDownOpen(false);
            }}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              zIndex: 99,
              borderRadius: $({ size: 12 }),
            }}
          />
        )}

        {/* {(childDropDownOpen || datesDropDownOpen) && (
          <Box
            onClick={() => {
              setChildDropDownOpen(false);
              setDatesDropDownOpen(false);
            }}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              zIndex: 99,
              borderRadius: $({ size: 12 }),
            }}
          />
        )} */}

        <Grid
          item
          xs={12}
          lg={2.8}
          sx={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: $({ size: 24 }),
            backgroundColor: colors.white[800],
            boxShadow: `0 0 ${$({ size: 2 })} 0 ${alpha(
              colors.solids.black,
              0.25
            )}`,
            borderRadius: $({ size: 12 }),
          }}
        >
          <SelectChildAndDatePanel />
        </Grid>

        {selectedChild.fullname && (
          <Grid
            item
            xs={12}
            lg={9.2}
            sx={{
              flex: "1",
              padding: {
                xs: `${$({ size: 20 })} 0 0 0`,
                lg: `0 0 0 ${$({ size: 24 })}`,
              },
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: colors.white[800],
                boxShadow: `0 0 ${$({ size: 2 })} 0 ${alpha(
                  colors.solids.black,
                  0.25
                )}`,
                width: "100%",
                borderRadius: $({ size: 12 }),
                height: "100%",
                padding: $({ size: 24 }),
                gap: $({ size: 24 }),
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: $({ size: 12 }),
                }}
                ref={topSectionRef}
              >
                <SelectedChildWithTimeDetails />

                {loadingPerformanceData && (
                  <Box
                    sx={{
                      minHeight: "100px",
                    }}
                  >
                    <CircularProgress
                      size={50}
                      sx={{
                        color: colors.solids.green,
                        position: "relative",
                        top: "50%",
                        left: "50%",
                        // marginTop: '-12px',
                        marginLeft: "-12px",
                      }}
                    />
                  </Box>
                )}
                {!loadingPerformanceData && (
                  <CustomTabs
                    tabsData={tabsData}
                    setTabsData={(tab) => {
                      const temp = [...tabsData];
                      temp.forEach((item) => {
                        item.isSelected = false;
                      });
                      temp[tab].isSelected = true;
                      setTabsData(temp);
                      setRenderSubjectDetails({ render: false, details: {} });
                    }}
                  />
                )}
              </Box>

              {!loadingPerformanceData &&
                tabsData.findIndex((item) => item.isSelected) === 0 && (
                  <OverallScoreTab
                    child_grade={
                      performanceData.child_overall_performance_grade_key
                    }
                    all_groups_grades={performanceData.grade_same_color_group}
                    overall_summary={performanceData.overall_summary}
                    subjects_with_color={performanceData.subjects_with_color}
                    topSectionHeight={topSectionHeight}
                  />
                )}

              {!loadingPerformanceData &&
                tabsData.findIndex((item) => item.isSelected) === 1 &&
                renderSubjectDetails.render && (
                  <SubjectDetailsTab
                    topSectionHeight={topSectionHeight}
                    subjectDetails={renderSubjectDetails}
                    setRenderSubjectDetails={setRenderSubjectDetails}
                    searchDropDownOpen={searchDropDownOpen}
                    setSearchDropDownOpen={setSearchDropDownOpen}
                    subjectsData={performanceData.SubjectData}
                  />
                )}

              {!loadingPerformanceData &&
                tabsData.findIndex((item) => item.isSelected) === 1 &&
                !renderSubjectDetails.render && (
                  <SubjectsTab
                    topSectionHeight={topSectionHeight}
                    setRenderSubjectDetails={setRenderSubjectDetails}
                    subject_grades={performanceData.subject_grades}
                  />
                )}

              {!loadingPerformanceData &&
                tabsData.findIndex((item) => item.isSelected) === 2 && (
                  <StrengthsTab
                    topSectionHeight={topSectionHeight}
                    subjectsData={performanceData.subject_grades}
                  />
                )}

              {!loadingPerformanceData &&
                tabsData.findIndex((item) => item.isSelected) === 3 && (
                  <AreasForImprovementTab
                    topSectionHeight={topSectionHeight}
                    subjectsData={performanceData.subject_grades}
                  />
                )}

              {!loadingPerformanceData &&
                tabsData.findIndex((item) => item.isSelected) === 4 && (
                  <GoalSettingTab topSectionHeight={topSectionHeight} />
                )}
            </Box>
          </Grid>
        )}
      </Grid>
    </DashboardContainer>
  );
};

const loadALlSubjectsData = async (
  authorizedAxios,
  data,
  setLoadingPerformanceData,
  setPerformanceData
) => {
  setLoadingPerformanceData(true);
  try {
    const response = await authorizedAxios.post(PERFORMANCE, data);
    console.log(response.data);
    setPerformanceData(response.data);
  } catch (error) {
    console.error(error);
  }
  setLoadingPerformanceData(false);
};

export default PerformanceHome;
