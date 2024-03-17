import React, { useEffect, useState } from "react";
import { Box, Typography, alpha, useTheme } from "@mui/material";
import { Pie } from "@nivo/pie";

import { GET_CHILD_GOAL } from "../../../config/backend_endpoints";
import axios from "axios";
import { UPLOAD_CHILD_GOAL } from "../../../config/backend_endpoints";
import { useAppContext } from "../../../context/appContext";

import {
  CustomTextInput,
  CustomButton,
  CustomSubjectFoucsSlider,
} from "../../../components";

import { AlarmIcon } from "../../../icons";
import CircularProgress from '@mui/material/CircularProgress';

import { tokens } from "../../../theme";
import { $ } from "../../../utils";

const GoalSettingTab = ({ topSectionHeight = 0 }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user, token, logoutUser, users_children, selected_Child_index } =
    useAppContext();

  const [hours, setHours] = React.useState({ tens: "", ones: "" });
  const [minutes, setMinutes] = React.useState({ tens: "", ones: "" });
  const date = new Date();
  const [goalGraphData, setGoalGraphData] = React.useState({
    goals: {
      Id: {
        userId: user.id,
        childrenId: users_children[selected_Child_index].id,
      },
      time: {
        hours: 0,
        minutes: 0,
        date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
      },
      focus_percentages: [],
    },
  });
  const [loadingGoalData, setLoadingGoalData] = useState(false);
  const [goalUploadRequest, setGoalUploadRequest] = useState({
    loading: false,
    status: "",
    error: "",
  });
  //   [
  //   {
  //     id: '1',
  //     label: 'Science, biology, & Environment',
  //     color: colors.subjectsFocus[100],
  //     value: Math.floor(Math.random() * 100),
  //   },
  //   {
  //     id: '2',
  //     label: 'Social Study & Languages',
  //     color: colors.subjectsFocus[200],
  //     value: Math.floor(Math.random() * 100),
  //   },
  //   {
  //     id: '3',
  //     label: 'English & Coding',
  //     color: colors.subjectsFocus[300],
  //     value: Math.floor(Math.random() * 100),
  //   },
  //   {
  //     id: '4',
  //     label: 'Logic, Life Skills, Emotions, & Innovation',
  //     color: colors.subjectsFocus[400],
  //     value: Math.floor(Math.random() * 100),
  //   },
  //   {
  //     id: '5',
  //     label: 'Math, Money, & Music',
  //     color: colors.subjectsFocus[500],
  //     value: Math.floor(Math.random() * 100),
  //   },
  // ]

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
    loadGoalDataService(
      authorizedAxios,
      users_children[selected_Child_index].id,
      setGoalGraphData,
      setHours,
      setMinutes,
      setLoadingGoalData
    );
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: $({ size: 20 }),
      }}
    >
      {
        (loadingGoalData || goalUploadRequest.loading) && 
        <Box sx={{
          minHeight:"100px",
        }}>
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
        </Box>
      }

      { (!loadingGoalData && !goalUploadRequest.loading) && <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: {
            xs: $({ size: 8 }),
            md: 0,
          },
          width: "100%",
        }}
      >
        <Typography
          sx={{
            fontSize: $({ size: 18 }),
            fontWeight: "400",
            lineHeight: $({ size: 16 }),
            color: colors.solids.black,
          }}
        >
          {"Set the daily time goal for your child’s learning journey!"}
        </Typography>
      </Box>

      <Box sx={{
        display: "flex",
        justifyContent: "space-between"
      }}>

      

      <Box
        sx={{
          display: "flex",
          gap: $({ size: 18 }),
          alignItems: "center",
        }}
      >
        <Box
          sx={{ display: "flex", gap: $({ size: 4 }), alignItems: "center" }}
        >
          <CustomTextInput
            label={null}
            placeholder={"0"}
            value={hours.tens}
            onChange={(e) => {
              if (e.target.value.length > 1) return;
              if (e.target.value && isNaN(e.target.value)) return;
              if (Number(e.target.value) > 2) return;
              if (e.target.value === "2" && Number(hours.ones) > 3) return;
              setHours({ ...hours, tens: e.target.value });
            }}
            containerStyle={{ width: $({ size: 32 }) }}
            inputContainerStyle={{
              padding: `${$({ size: 3 })} ${$({ size: 6 })}`,
            }}
            inputStyle={{
              fontWeight: "600",
              lineHeight: $({ size: 30 }),
              "& input": { textAlign: "center" },
            }}
          />

          <CustomTextInput
            label={null}
            placeholder={"0"}
            value={hours.ones}
            onChange={(e) => {
              if (e.target.value.length > 1) return;
              if (e.target.value && isNaN(e.target.value)) return;
              if (Number(e.target.value) > 9) return;
              if (hours.tens === "2" && Number(e.target.value) > 3) return;
              setHours({ ...hours, ones: e.target.value });
            }}
            containerStyle={{ width: $({ size: 32 }) }}
            inputContainerStyle={{
              padding: `${$({ size: 3 })} ${$({ size: 6 })}`,
            }}
            inputStyle={{
              fontWeight: "600",
              lineHeight: $({ size: 30 }),
              "& input": { textAlign: "center" },
            }}
          />

          <Typography
            sx={{
              fontSize: $({ size: 18 }),
              fontWeight: "500",
              lineHeight: $({ size: 30 }),
              color: colors.extra.grey2,
              pl: $({ size: 4 }),
            }}
          >
            Hours
          </Typography>
        </Box>

        <Box
          sx={{ display: "flex", gap: $({ size: 4 }), alignItems: "center" }}
        >
          <CustomTextInput
            label={null}
            placeholder={"0"}
            value={minutes.tens}
            onChange={(e) => {
              if (e.target.value.length > 1) return;
              if (e.target.value && isNaN(e.target.value)) return;
              if (Number(e.target.value) > 5) return;
              setMinutes({ ...minutes, tens: e.target.value });
            }}
            containerStyle={{ width: $({ size: 32 }) }}
            inputContainerStyle={{
              padding: `${$({ size: 3 })} ${$({ size: 6 })}`,
            }}
            inputStyle={{
              fontWeight: "600",
              lineHeight: $({ size: 30 }),
              "& input": { textAlign: "center" },
            }}
          />

          <CustomTextInput
            label={null}
            placeholder={"0"}
            value={minutes.ones}
            onChange={(e) => {
              if (e.target.value.length > 1) return;
              if (e.target.value && isNaN(e.target.value)) return;
              if (Number(e.target.value) > 9) return;
              setMinutes({ ...minutes, ones: e.target.value });
            }}
            containerStyle={{ width: $({ size: 32 }) }}
            inputContainerStyle={{
              padding: `${$({ size: 3 })} ${$({ size: 6 })}`,
            }}
            inputStyle={{
              fontWeight: "600",
              lineHeight: $({ size: 30 }),
              "& input": { textAlign: "center" },
            }}
          />

          <Typography
            sx={{
              fontSize: $({ size: 18 }),
              fontWeight: "500",
              lineHeight: $({ size: 30 }),
              color: colors.extra.grey2,
              pl: $({ size: 4 }),
            }}
          >
            Minutes
          </Typography>
        </Box>

        
      </Box>

      <CustomButton
          onClick={() => {
            let tempData = {...goalGraphData};
            tempData.goals.time = {
              "hours": (hours.tens*10) + hours.ones,
            "minutes": (minutes.tens*10) + minutes.ones,
            "date": `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            }
            setGoalGraphData(tempData);
            // console.log(goalGraphData);
            let dataToUpload = {
              childrenId: goalGraphData.goals.Id.childrenId,
              hours: goalGraphData.goals.time.hours,
              minutes: goalGraphData.goals.time.minutes,
              "percentage_green" : goalGraphData.goals.focus_percentages[0].percentage,
              "percentage_orange" : goalGraphData.goals.focus_percentages[1].percentage,
              "percentage_blue" : goalGraphData.goals.focus_percentages[2].percentage,
              "percentage_pink" : goalGraphData.goals.focus_percentages[3].percentage,
              "percentage_purple" : goalGraphData.goals.focus_percentages[4].percentage,
              isActive: true
            }
            console.log(dataToUpload);

            UploadGoalDataService(authorizedAxios,dataToUpload,setGoalUploadRequest);
          }}
          label="Update Daily Goal"
          // rightIcon={
          //   <AlarmIcon
          //     size={$({ size: 15, numeric: true })}
          //     color={colors.white[800]}
          //   />
          // }
          sx={{
            padding: `${$({ size: 4 })} ${$({ size: 16 })}`,
            width: "fit-content",
            gap: $({ size: 8 }),
            alignSelf: "flex-end",
          }}
        />


      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          gap: {
            xs: $({ size: 20 }),
            md: $({ size: 36 }),
          },
          width: "100%",
          alignItems: {
            xs: "flex-start",
            md: "center",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            height: $({ size: 293 }),
            width: $({ size: 293 }),
            userSelect: "none",
            mt: $({ size: 20 }),
          }}
        >
          <Box
            sx={{
              filter: `drop-shadow(0 0 ${$({ size: 5 })} ${alpha(
                colors.solids.black,
                0.1
              )})`,
            }}
          >
            {/* { goalGraphData.focus_percentages.length !== 0 && */}
            <Pie
              data={goalGraphData.goals.focus_percentages.map((item, index) => {
                return {
                  id: index,
                  label: item.label,
                  color: item.color,
                  value: item.percentage,
                };
              })}
              innerRadius={0.65}
              padAngle={0}
              legends={[]}
              enableArcLabels={false}
              enableArcLinkLabels={false}
              isInteractive={false}
              width={$({ size: 293, numeric: true })}
              height={$({ size: 293, numeric: true })}
              animate={false}
              fit={true}
              colors={(d) => d.data.color}
            />
            {/* } */}
          </Box>

          <Box
            sx={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: $({ size: 150 }),
              textAlign: "center",
              position: "absolute",
            }}
          >
            {[
              { text: `${hours.tens}${hours.ones || 0}`, isBold: true },
              { text: "hrs ", isBold: false },
              { text: `${minutes.tens}${minutes.ones || 0}`, isBold: true },
              { text: "mins", isBold: false },
              { text: "daily goal!", isBold: false },
            ].map((item, index, data) => {
              return (
                <Typography
                  key={`goal-setting-tab-total-${index}`}
                  sx={{
                    fontWeight: item.isBold ? "600" : "400",
                    fontSize: $({ size: 18 }),
                    color: colors.solids.black,
                    lineHeight: $({ size: 30 }),
                    display: data.length - 1 === index ? "block" : "inline",
                  }}
                >
                  {item.text}
                </Typography>
              );
            })}
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            maxWidth: $({ size: 440 }),
            display: "flex",
            flexDirection: "column",
            gap: $({ size: 24 }),
            pt: $({ size: 22 }),
            pr: $({ size: 16 }),
          }}
        >
          {goalGraphData.goals.focus_percentages.map((item, index) => {
            return (
              <CustomSubjectFoucsSlider
                key={`goal-setting-tab-subject-focus-slider-${index}`}
                label={item.label}
                color={item.color}
                value={item.percentage}
                onChange={(e) => {
                  const newData = { ...goalGraphData };
                  newData.goals.focus_percentages[index].percentage =
                    e.target.value;
                  // newData[index].value = e.target.value;
                  setGoalGraphData(newData);
                }}
              />
            );
          })}
        </Box>
      </Box>
          </>
        }
    </Box>
  );
};

export default GoalSettingTab;

const loadGoalDataService = async (
  authorizedAxios,
  childId,
  setGoalGraphData,
  setHours,
  setMinutes,
  setLoadingGoalData
) => {
  setLoadingGoalData(true);
  try {
    const response = await authorizedAxios.get(
      GET_CHILD_GOAL.replace("{child_id}", childId)
    );
    console.log(response.data);
    setHours({
      tens: Math.floor(response.data.goals.time.hours / 10),
      ones: response.data.goals.time.hours % 10,
    });
    setMinutes({
      tens: Math.floor(response.data.goals.time.minutes / 10),
      ones: response.data.goals.time.minutes % 10,
    });
    setGoalGraphData(response.data);
  } catch (error) {
    console.error(error);
  }
  setLoadingGoalData(false);
};

const UploadGoalDataService = async (
  authorizedAxios,
  data,
  setGoalUploadRequest
) => {
  setGoalUploadRequest({
    loading: true,
    status: "",
    error: "",
  });
  try {
    const response = await authorizedAxios.post(
      UPLOAD_CHILD_GOAL,
      data
    );
    console.log(response.data);
    setGoalUploadRequest({
      loading: false,
      status: "complete",
      error: "",
    });
  } catch (error) {
    console.error(error);
    setGoalUploadRequest({
      loading: false,
      status: "complete",
      error: error.message,
    });
  }
  
};