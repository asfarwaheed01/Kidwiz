import React from "react";
import { Box, Typography, alpha, useTheme } from "@mui/material";

import { tokens } from "../../../theme";
import { $, DarkenHexColor } from "../../../utils";
import { API_BASE_URL } from "../../../config/backend_endpoints";

// import { StrengthsData } from './data';

const StrengthsTab = ({ topSectionHeight = 0, subjectsData = [] }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [strengthsData, setStrengthsData] = React.useState([]);

  React.useEffect(() => {
    let dataPreprationForStrength = [];
    subjectsData.forEach((element) => {
      for (let index = 0; index < element.strengths.length; index++) {
        // const element = element[index];
        let oneStrangth = {
          key: index + "Strangth-Item",
          color: element.subject_icon_color.color,
          icon: element.subject_icon_color.icon,
          subject: element.subject_name,
          topic: element.strengths[index].topic,
          grade: element.strengths[index].grade,
        };
        dataPreprationForStrength.push(oneStrangth);
      }
    });
    setStrengthsData(dataPreprationForStrength);
  }, []);

  // TO CALCULATE TOP SECTION HEIGHT
  const headerSectionRef = React.useRef(null);
  const [headerSectionHeight, setHeaderSectionHeight] = React.useState(0);

  React.useEffect(() => {
    setHeaderSectionHeight(headerSectionRef.current?.offsetHeight || 0);
  }, [headerSectionRef.current?.offsetHeight]);

  // console.log("Heeeeeeeeee");
  console.log(subjectsData);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: $({ size: 22 }),
      }}
    >
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
        ref={headerSectionRef}
      >
        <Typography
          sx={{
            fontSize: $({ size: 18 }),
            fontWeight: "400",
            lineHeight: $({ size: 16 }),
            color: colors.solids.black,
          }}
        >
          {"Find out which specific areas your child excels at the most!"}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fill, minmax(${$({
            size: 160,
          })}, 1fr))`,
          gridGap: {
            xs: $({ size: 0 }),
            md: $({ size: 24 }),
          },
          gridAutoRows: "1fr", // to make all the rows the same height
          maxHeight: {
            xs: "unset",
            md: `calc(100vh - ${topSectionHeight + headerSectionHeight}px - ${$(
              {
                numeric: true,
                // ADJUSTMENT
                size:
                  60 + // TOP BAR HEIGHT
                  24 + // PARENT CONTAINER TOP PADDING
                  24 + // PARENT  CONTAINER BOTTOM PADDING
                  40 + // WRAPPER CONTAINER TOP PADDING
                  40 + // WRAPPER CONTAINER BOTTOM PADDING
                  24 + // HEADER SECTION GAP
                  -8,
              }
            )}px)`,
          },
          overflowY: "scroll",
          // 'mr': {
          //   xs: `-${$({ size: 6 })}`,
          //   md: `${$({ size: 24 })}`,
          // },
          pr: {
            xs: 0,
            md: $({ size: 32 }),
          },
          "&::-webkit-scrollbar": {
            width: $({ size: 13 }),
            borderRadius: $({ size: 13 }),
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: colors.extra.grey3,
            borderRadius: $({ size: 13 }),
          },
        }}
      >
        {strengthsData.map((topic, topicIndex) => {
          // console.log(topic);
          return (
            <Box
              key={topic.key}
              sx={{
                padding: $({ size: 16 }),
                borderRadius: $({ size: 16 }),
                boxShadow: `0 0 ${$({ size: 2 })} ${alpha(
                  colors.solids.black,
                  0.25
                )}`,
                backgroundColor: topic.color,
                gap: $({ size: 8 }),
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                minWidth: $({ size: 160 }),
                minHeight: $({ size: 160 }),
                // mb: $({ size: 24 }),
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: colors.white[800],
                    width: $({ size: 40 }),
                    height: $({ size: 40 }),
                    borderRadius: $({ size: 40 }),
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: $({ size: 8 }),
                  }}
                >
                  <img
                    src={API_BASE_URL + topic.icon}
                    alt={topic.subject}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Box>

                <Typography
                  sx={{
                    fontSize: $({ size: 31.98 }),
                    fontWeight: "700",
                    lineHeight: $({ size: 40 }),
                    color: DarkenHexColor({
                      hex: topic.color,
                      percentage: 30,
                    }),
                  }}
                >
                  {topic.grade}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: $({ size: 18 }),
                  fontWeight: "500",
                  lineHeight: $({ size: 24 }),
                  color: colors.solids.black,
                }}
              >{`${topic.subject} > ${topic.topic}`}</Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default StrengthsTab;
