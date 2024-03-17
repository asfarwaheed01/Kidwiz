import React, { useEffect, useState } from "react";
import { Box, Typography, alpha, useTheme } from "@mui/material";
import { Pie } from "@nivo/pie";

import { InfoIcon } from "../../../icons";

import { tokens } from "../../../theme";
import { $ } from "../../../utils";

// import { OverallScoreData } from './data';

const OverallScoreTab = ({
  topSectionHeight = 0,
  child_grade = "N/A",
  all_groups_grades = {},
  overall_summary = "",
  subjects_with_color = {},
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // console.log(all_groups_grades);
  let circleDataObject = {};
  Object.keys(all_groups_grades).forEach(function (key, index) {
    circleDataObject[key] = {
      id: index,
      label: all_groups_grades[key].overall_grade_key,
      color: key,
      value: all_groups_grades[key].overall_percentage,
    };
  });

  const [subjectsWithColors, setSubjectsWithColors] = useState([]);

  useEffect(() => {
    let keys = Object.keys(subjects_with_color);
    let values = Object.values(subjects_with_color);
    let dataPreprocessing = [];
    for (let index = 0; index < keys.length; index++) {
      let item = {
        color: keys[index],
        label: values[index].join(", "),
      };
      dataPreprocessing.push(item);
    }
    setSubjectsWithColors(dataPreprocessing);
  }, []);

  // console.log(circleDataObject);
  // console.log(Object.values(circleDataObject));

  // console.log(child_grade);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: $({ size: 16 }),
        maxHeight: `calc(100vh - ${topSectionHeight}px - ${$({
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
        })}px)`,
        overflowY: "scroll",
      }}
    >
      {child_grade == "N/A" && (
        <Typography
          sx={{
            fontWeight: "500",
            fontSize: $({ size: 12 }),
            color: colors.extra.grey1,
          }}
        >
          This child has not performed learning/ attempted quiz on this platform
        </Typography>
      )}

      {child_grade !== "N/A" && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              gap: {
                xs: $({ size: 20 }),
                md: $({ size: 24 }),
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
                userSelect: "none",
                position: "relative",
                // height: $({ size: 293 + 2 * (70 / 2.5) + 2 * (2 * 1.5) }),
                // width: $({ size: 293 + 2 * (70 / 2.5) + 2 * (2 * 1.5) }),
                height: $({ size: 338 }),
                width: $({ size: 338 }),
                mt: `-${$({ size: 12 })}`,
                ml: `-${$({ size: 8 })}`,
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
                <Pie
                  data={
                    Object.values(circleDataObject)
                    // OverallScoreData.graph
                  }
                  innerRadius={0.65}
                  padAngle={0}
                  legends={[]}
                  enableArcLabels={true}
                  enableArcLinkLabels={false}
                  isInteractive={false}
                  width={$({
                    size: 293 + 2 * (70 / 2.5),
                    numeric: true,
                  })}
                  height={$({
                    size: 293 + 2 * (70 / 2.5),
                    numeric: true,
                  })}
                  animate={false}
                  fit={true}
                  colors={(d) => d.data.color}
                  margin={{
                    top: $({ size: 70 / 2.5, numeric: true }),
                    left: $({ size: 70 / 2.5, numeric: true }),
                    right: $({ size: 70 / 2.5, numeric: true }),
                    bottom: $({ size: 70 / 2.5, numeric: true }),
                  }}
                  arcLabelsComponent={({ datum }) => {
                    const arc = datum.arc;
                    const radiusOfLabelCircle = $({
                      size: 70 / 2.5,
                      numeric: true,
                    });
                    const x = 110 + radiusOfLabelCircle;
                    const y = 0;
                    const theta =
                      (arc.endAngle - arc.startAngle) / 2 + arc.startAngle;

                    const newX = x * Math.cos(theta) - y * Math.sin(theta);
                    const newY = x * Math.sin(theta) + y * Math.cos(theta);

                    const rotationAngle = -90;

                    const rotatedX =
                      newX * Math.cos(rotationAngle * (Math.PI / 180)) -
                      newY * Math.sin(rotationAngle * (Math.PI / 180));
                    const rotatedY =
                      newX * Math.sin(rotationAngle * (Math.PI / 180)) +
                      newY * Math.cos(rotationAngle * (Math.PI / 180));

                    return (
                      <g>
                        <filter id="shadow">
                          <feDropShadow
                            dx="1.5"
                            dy="1.5"
                            stdDeviation="1.5"
                            floodColor="rgba(0, 0, 0, 0.25)"
                          />
                        </filter>

                        <circle
                          cx={rotatedX}
                          cy={rotatedY}
                          r={radiusOfLabelCircle}
                          fill="white"
                          filter="url(#shadow)"
                        />
                        <text
                          x={rotatedX}
                          y={rotatedY - $({ size: 18 / 2, numeric: true })}
                          textAnchor="middle"
                          dominantBaseline="central"
                          style={{
                            fontSize: $({ size: 18 }),
                            fontWeight: "600",
                            fill: colors.solids.black,
                          }}
                        >{`${datum.value}%`}</text>

                        <text
                          x={rotatedX}
                          y={rotatedY + $({ size: 18 / 2, numeric: true })}
                          textAnchor="middle"
                          dominantBaseline="central"
                          style={{
                            fontSize: $({ size: 18 }),
                            fontWeight: "500",
                            fill: colors.extra.grey2,
                          }}
                        >
                          {datum.label}
                        </text>
                      </g>
                    );
                  }}
                />
              </Box>

              <Typography
                sx={{
                  fontWeight: "700",
                  fontSize: $({ size: 80 }),
                  color: colors.extra.grey1,
                  lineHeight: 0,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  maxWidth: $({ size: 150 }),
                  textAlign: "center",
                  position: "absolute",
                  pl: $({ size: 10 }),
                  pt: $({ size: 10 }),
                }}
              >
                {child_grade}
              </Typography>
            </Box>

            <Box
              sx={{
                width: "100%",
                // maxWidth: {
                //   xs: '100%',
                //   md: $({ size: 440 })
                // },
                display: "flex",
                flexDirection: "column",
                gap: $({ size: 16 }),
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  // mt: { xs: 0, md: $({ size: 24 }) }
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: $({ size: 16 }),
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: $({ size: 18 }),
                      fontWeight: "600",
                      color: colors.extra.grey1,
                    }}
                  >
                    Summary
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <InfoIcon
                      size={$({ size: 16, numeric: true })}
                      color={colors.extra.grey2}
                    />
                  </Box>
                </Box>
                <Typography
                  sx={{
                    fontSize: $({ size: 18 }),
                    fontWeight: "400",
                    lineHeight: $({ size: 28 }),
                    color: colors.solids.black,
                    maxWidth: {
                      xs: "100%",
                      md: $({ size: 525 }),
                    },
                    mt: $({ size: 12 }),
                  }}
                >
                  {overall_summary}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: $({ size: 16 }),
              // mt: $({ size: 16 }),
              pl: { xs: $({ size: 12 }), md: $({ size: 20 }) },
              pt: { xs: $({ size: 12 }), md: $({ size: 20 }) },
            }}
          >
            {subjectsWithColors.map((item, index) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: $({ size: 8 }),
                    alignItems: "center",
                  }}
                  key={index}
                >
                  <Box
                    sx={{
                      borderRadius: $({ size: 4 }),
                      height: $({ size: 24 }),
                      width: $({ size: 24 }),
                      backgroundColor: item.color,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: $({ size: 13.5 }),
                      fontWeight: "500",
                      color: colors.extra.grey1,
                      lineHeight: $({ size: 0 }),
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </>
      )}
    </Box>
  );
};

export default OverallScoreTab;
