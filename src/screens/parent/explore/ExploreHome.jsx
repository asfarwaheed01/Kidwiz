import React from 'react';
import { Box, Typography, alpha, useTheme } from '@mui/material';
import { Pie } from '@nivo/pie';
import { useNavigate } from 'react-router-dom';

import {
  CustomButton,
  DashboardContainer,
  Spinner,
  SPINNER_POINTS,
} from '../../../components';

import {
  DownArrowSlimIcon,
  LocationIcon,
  RefreshIcon,
  RightArrowIcon,
} from '../../../icons';

import { ROUTES } from '../../../config/routes';
import { tokens } from '../../../theme';
import { $ } from '../../../utils';

import { WheelData as _WheelData, WheelSegmentColors } from './data';

const WrapText = (text) => {
  const MAXIMUM_CHARACTERS = 14;

  if (text.length <= MAXIMUM_CHARACTERS) return [text];

  const words = text.split(' ');
  let lines = [];
  let currentLine = '';

  for (const word of words) {
    if (
      currentLine.length + word.length + (currentLine.length > 0 ? 1 : 0) <=
      MAXIMUM_CHARACTERS
    ) {
      currentLine += (currentLine.length === 0 ? '' : ' ') + word;
    } else {
      if (currentLine.length === 0) {
        lines.push(word.slice(0, MAXIMUM_CHARACTERS - 1) + '-');
        lines.push(word.slice(MAXIMUM_CHARACTERS - 1));
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
  }

  if (currentLine.length > 0) {
    lines.push(currentLine);
  }

  return lines;
};

const ExploreHome = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  const categoryWheelRef = React.useRef(null);
  const subjectWheelRef = React.useRef(null);
  const topicWheelRef = React.useRef(null);

  const [isSpinning, setIsSpinning] = React.useState(false);
  const [isAccelerating, setIsAccelerating] = React.useState(false);

  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [selectedSubject, setSelectedSubject] = React.useState(null);
  const [selectedTopic, setSelectedTopic] = React.useState(null);

  const wheelData = React.useMemo(() => {
    const NUM_OF_SEGMENTS = 5; // 3, 4, 5

    return _WheelData
      .sort(() => Math.random() - Math.random())
      .slice(0, NUM_OF_SEGMENTS)
      .map((category, categoryIndex) => {
        const subjects = category.subjects
          .sort(() => Math.random() - Math.random())
          .slice(0, 4)
          .map((subject, subjectIndex) => {
            const topics = subject.topics.map((topic, topicIndex) => {
              return {
                ...topic,
                color: WheelSegmentColors[topicIndex],
              };
            });

            return {
              ...subject,
              topics: topics,
              color: WheelSegmentColors[subjectIndex],
            };
          });

        return {
          ...category,
          subjects: subjects,
          color: WheelSegmentColors[categoryIndex],
        };
      });
  }, []);

  const wheelPoints = React.useMemo(() => {
    return SPINNER_POINTS({ segments: wheelData.length });
  }, [wheelData.length]);

  const HandleSpinToChooseCategory = () => {
    Spinner({
      targetRef: categoryWheelRef,
      isSpinning,
      setIsSpinning,
      isAccelerating,
      setIsAccelerating,
      setSelectedSegment: setSelectedCategory,
      segments: wheelData,
    });
  };

  const HandleSpinToChooseSubject = () => {
    Spinner({
      targetRef: subjectWheelRef,
      isSpinning,
      setIsSpinning,
      isAccelerating,
      setIsAccelerating,
      setSelectedSegment: setSelectedSubject,
      segments: selectedCategory.subjects,
    });
  };

  const HandleSpinToChooseTopic = () => {
    Spinner({
      targetRef: topicWheelRef,
      isSpinning,
      setIsSpinning,
      isAccelerating,
      setIsAccelerating,
      setSelectedSegment: setSelectedTopic,
      segments: selectedSubject.topics,
    });
  };

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
        overflow: 'hidden',
      }}
      containerStyle={{
        gap: {
          xs: $({ size: 20 }),
          md: $({ size: 16 }),
        },
        overflow: 'hidden',
      }}>
      <Typography
        sx={{
          fontSize: $({ size: 31.98 }),
          fontWeight: '600',
          mt: `-${$({ size: 8 })}`,
          color: colors.extra.grey1,
        }}>
        Explore
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: $({ size: 24 }),
          userSelect: 'none',
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {selectedCategory && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: $({ size: 4 }),
              }}>
              <Typography
                sx={{
                  fontSize: $({ size: 18 }),
                  fontWeight: '600',
                  lineHeight: $({ size: 30 }),
                  color: colors.solids.black,
                  textAlign: 'center',
                }}>
                {selectedCategory?.subjects?.map((subject, index) => {
                  return (
                    <React.Fragment key={subject.id}>
                      {subject.title}
                      {index !== selectedCategory?.subjects?.length - 1 && ', '}
                    </React.Fragment>
                  );
                })}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <DownArrowSlimIcon
                  size={$({ size: 16, numeric: true })}
                  color={colors.extra.grey3}
                />
              </Box>
            </Box>
          )}

          {selectedCategory && selectedSubject && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: $({ size: 4 }),
              }}>
              <Typography
                sx={{
                  fontSize: $({ size: 18 }),
                  fontWeight: '600',
                  lineHeight: $({ size: 30 }),
                  color: colors.solids.black,
                  textAlign: 'center',
                }}>
                {selectedSubject.title}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <DownArrowSlimIcon
                  size={$({ size: 16, numeric: true })}
                  color={colors.extra.grey3}
                />
              </Box>
            </Box>
          )}

          {selectedCategory && selectedSubject && selectedTopic && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: $({ size: 4 }),
              }}>
              <Typography
                sx={{
                  fontSize: $({ size: 18 }),
                  fontWeight: '600',
                  lineHeight: $({ size: 30 }),
                  color: colors.solids.pinkBright,
                  textAlign: 'center',
                }}>
                {selectedTopic.name}
              </Typography>
            </Box>
          )}

          {(!selectedCategory || !selectedSubject || !selectedTopic) && (
            <Typography
              sx={{
                fontSize: $({ size: 18 }),
                fontWeight: '600',
                color: colors.solids.black,
                textAlign: 'center',
              }}>
              ...
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}>
          <Box sx={{ position: 'relative' }}>
            <Box
              sx={{
                position: 'absolute',
                // top: `-${$({ size: 8 })}`,
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1,
              }}>
              <LocationIcon
                size={$({ size: 40, numeric: true })}
                color={colors.extra.grey2}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {!selectedCategory && (
                <Box
                  ref={categoryWheelRef}
                  sx={{
                    position: 'relative',
                    height: $({ size: 400 }),
                    width: $({ size: 400 }),
                    userSelect: 'none',
                    overflow: 'hidden',
                  }}>
                  <Box
                    sx={{
                      filter: `drop-shadow(0 0 ${$({ size: 5 })} ${alpha(
                        colors.solids.black,
                        0.1
                      )})`,
                    }}>
                    <Pie
                      data={wheelData}
                      innerRadius={0}
                      padAngle={0}
                      legends={[]}
                      enableArcLabels={true}
                      enableArcLinkLabels={false}
                      isInteractive={false}
                      width={$({ size: 400, numeric: true })}
                      height={$({ size: 400, numeric: true })}
                      animate={false}
                      fit={true}
                      colors={(d) => d.data.color}
                      value={(d) => 1}
                      arcLabelsComponent={({ datum }) => {
                        const segmentCategories = datum.data.subjects;
                        const points = wheelPoints[segmentCategories.length];

                        const arc = datum.arc;
                        const theta =
                          (arc.endAngle - arc.startAngle) / 2 + arc.startAngle;

                        const SCALE_DOWN_FACTOR = 0.8;

                        return (
                          <g>
                            {segmentCategories.map((subject, index) => {
                              const x = points[index].x;
                              const y = -points[index].y;

                              const newX =
                                x * Math.cos(theta) - y * Math.sin(theta);
                              const newY =
                                x * Math.sin(theta) + y * Math.cos(theta);

                              const rotationAngle =
                                360 / wheelData.length +
                                (360 / wheelData.length) * 2 +
                                (wheelData.length === 4 ? 45 : 0);

                              const rotatedX =
                                newX *
                                  Math.cos(rotationAngle * (Math.PI / 180)) -
                                newY *
                                  Math.sin(rotationAngle * (Math.PI / 180));
                              const rotatedY =
                                newX *
                                  Math.sin(rotationAngle * (Math.PI / 180)) +
                                newY *
                                  Math.cos(rotationAngle * (Math.PI / 180));

                              return (
                                <g key={subject.id}>
                                  <circle
                                    cx={$({
                                      size: rotatedX * SCALE_DOWN_FACTOR,
                                      numeric: true,
                                    })}
                                    cy={$({
                                      size: rotatedY * SCALE_DOWN_FACTOR,
                                      numeric: true,
                                    })}
                                    r={`${$({
                                      size: 30 * SCALE_DOWN_FACTOR,
                                      numeric: true,
                                    })}px`}
                                    fill='white'
                                  />
                                  <image
                                    href={subject?.iconPath}
                                    x={
                                      ($({ size: rotatedX, numeric: true }) -
                                        $({ size: 35 / 2, numeric: true })) *
                                      SCALE_DOWN_FACTOR
                                    }
                                    y={
                                      ($({ size: rotatedY, numeric: true }) -
                                        $({ size: 35 / 2, numeric: true })) *
                                      SCALE_DOWN_FACTOR
                                    }
                                    height={$({
                                      size: 35 * SCALE_DOWN_FACTOR,
                                      numeric: true,
                                    })}
                                    width={$({
                                      size: 35 * SCALE_DOWN_FACTOR,
                                      numeric: true,
                                    })}
                                  />
                                </g>
                              );
                            })}
                          </g>
                        );
                      }}
                    />
                  </Box>
                </Box>
              )}

              {selectedCategory?.subjects && !selectedSubject && (
                <Box
                  ref={subjectWheelRef}
                  sx={{
                    position: 'relative',
                    height: $({ size: 400 }),
                    width: $({ size: 400 }),
                    userSelect: 'none',
                    overflow: 'hidden',
                  }}>
                  <Box
                    sx={{
                      filter: `drop-shadow(0 0 ${$({ size: 5 })} ${alpha(
                        colors.solids.black,
                        0.1
                      )})`,
                    }}>
                    <Pie
                      data={selectedCategory.subjects}
                      innerRadius={0}
                      padAngle={0}
                      legends={[]}
                      enableArcLabels={true}
                      enableArcLinkLabels={false}
                      isInteractive={false}
                      width={$({ size: 400, numeric: true })}
                      height={$({ size: 400, numeric: true })}
                      animate={false}
                      fit={true}
                      colors={(d) => d.data.color}
                      value={(d) => 1}
                      arcLabelsComponent={({ datum }) => {
                        const segmentSubjects = selectedCategory.subjects;

                        const arc = datum.arc;
                        const theta =
                          (arc.endAngle - arc.startAngle) / 2 + arc.startAngle;

                        const SCALE_DOWN_FACTOR = 0.8;

                        const subject = segmentSubjects.find(
                          (subject) => subject.id === datum.data.id
                        );

                        const x = SPINNER_POINTS({
                          segments: segmentSubjects.length,
                        })[1][0].x;
                        const y = -SPINNER_POINTS({
                          segments: segmentSubjects.length,
                        })[1][0].y;

                        const newX = x * Math.cos(theta) - y * Math.sin(theta);
                        const newY = x * Math.sin(theta) + y * Math.cos(theta);

                        const rotationAngle =
                          360 / segmentSubjects.length +
                          (360 / segmentSubjects.length) * 2 +
                          (segmentSubjects.length === 4 ? 45 : 0);

                        const rotatedX =
                          newX * Math.cos(rotationAngle * (Math.PI / 180)) -
                          newY * Math.sin(rotationAngle * (Math.PI / 180));
                        const rotatedY =
                          newX * Math.sin(rotationAngle * (Math.PI / 180)) +
                          newY * Math.cos(rotationAngle * (Math.PI / 180));

                        return (
                          <g key={subject.id}>
                            <circle
                              cx={$({
                                size: rotatedX * SCALE_DOWN_FACTOR,
                                numeric: true,
                              })}
                              cy={$({
                                size: rotatedY * SCALE_DOWN_FACTOR,
                                numeric: true,
                              })}
                              r={`${$({
                                size: 40 * SCALE_DOWN_FACTOR,
                                numeric: true,
                              })}px`}
                              fill='white'
                            />
                            <image
                              href={subject?.iconPath}
                              x={
                                ($({ size: rotatedX, numeric: true }) -
                                  $({ size: 45 / 2, numeric: true })) *
                                SCALE_DOWN_FACTOR
                              }
                              y={
                                ($({ size: rotatedY, numeric: true }) -
                                  $({ size: 45 / 2, numeric: true })) *
                                SCALE_DOWN_FACTOR
                              }
                              height={$({
                                size: 45 * SCALE_DOWN_FACTOR,
                                numeric: true,
                              })}
                              width={$({
                                size: 45 * SCALE_DOWN_FACTOR,
                                numeric: true,
                              })}
                            />
                          </g>
                        );
                      }}
                    />
                  </Box>
                </Box>
              )}

              {selectedSubject?.topics &&
                (!selectedTopic || (selectedCategory && selectedSubject)) && (
                  <Box
                    ref={topicWheelRef}
                    sx={{
                      position: 'relative',
                      height: $({ size: 400 }),
                      width: $({ size: 400 }),
                      userSelect: 'none',
                      overflow: 'hidden',
                    }}>
                    <Box
                      sx={{
                        filter: `drop-shadow(0 0 ${$({ size: 5 })} ${alpha(
                          colors.solids.black,
                          0.1
                        )})`,
                      }}>
                      <Pie
                        data={selectedSubject.topics}
                        innerRadius={0}
                        padAngle={0}
                        legends={[]}
                        enableArcLabels={true}
                        enableArcLinkLabels={false}
                        isInteractive={false}
                        width={$({ size: 400, numeric: true })}
                        height={$({ size: 400, numeric: true })}
                        animate={false}
                        fit={true}
                        colors={(d) => d.data.color}
                        value={(d) => 1}
                        arcLabelsComponent={({ datum }) => {
                          const segmentTopics = selectedSubject.topics;

                          const arc = datum.arc;
                          const theta =
                            (arc.endAngle - arc.startAngle) / 2 +
                            arc.startAngle;

                          const SCALE_DOWN_FACTOR = 0.8;
                          const ADJUSTED_OFFSET = -18;

                          const topic = segmentTopics.find(
                            (subject) => subject.id === datum.data.id
                          );
                          const textSegments = WrapText(topic.name);

                          const x = SPINNER_POINTS({
                            segments: segmentTopics.length,
                          })[1][0].x;
                          const y = -SPINNER_POINTS({
                            segments: segmentTopics.length,
                          })[1][0].y;

                          const newX =
                            x * Math.cos(theta) - y * Math.sin(theta);
                          const newY =
                            x * Math.sin(theta) + y * Math.cos(theta);

                          const rotationAngle =
                            360 / segmentTopics.length +
                            (360 / segmentTopics.length) * 2 +
                            (segmentTopics.length === 4 ? 45 : 0);

                          const rotatedX =
                            newX * Math.cos(rotationAngle * (Math.PI / 180)) -
                            newY * Math.sin(rotationAngle * (Math.PI / 180));
                          const rotatedY =
                            newX * Math.sin(rotationAngle * (Math.PI / 180)) +
                            newY * Math.cos(rotationAngle * (Math.PI / 180));

                          const centerX =
                            $({
                              size: rotatedX * SCALE_DOWN_FACTOR,
                              numeric: true,
                            }) +
                            0 / 2;
                          const centerY =
                            $({
                              size: rotatedY * SCALE_DOWN_FACTOR,
                              numeric: true,
                            }) +
                            0 / 2;
                          const textRotation =
                            360 / segmentTopics.length / 2 +
                            arc.index * (360 / segmentTopics.length);

                          return (
                            <g
                              key={topic.id}
                              x={$({
                                size: rotatedX * SCALE_DOWN_FACTOR,
                                numeric: true,
                              })}
                              y={$({
                                size:
                                  rotatedY * SCALE_DOWN_FACTOR +
                                  ADJUSTED_OFFSET,
                                numeric: true,
                              })}>
                              {textSegments.map((_, index) => {
                                return (
                                  <text
                                    key={index * 1.5}
                                    x={$({
                                      size: rotatedX * SCALE_DOWN_FACTOR,
                                      numeric: true,
                                    })}
                                    y={$({
                                      size:
                                        rotatedY * SCALE_DOWN_FACTOR +
                                        18 * index -
                                        (18 * (textSegments.length - 1)) / 2 +
                                        ADJUSTED_OFFSET,
                                      numeric: true,
                                    })}
                                    textAnchor='middle'
                                    dominantBaseline='central'
                                    style={{
                                      fontSize: $({
                                        size: 18 * SCALE_DOWN_FACTOR,
                                      }),
                                      fontWeight: '500',
                                      fill: colors.extra.grey1,
                                    }}
                                    transform={`rotate(${textRotation}, ${centerX}, ${centerY})`}>
                                    {_}
                                  </text>
                                );
                              })}
                            </g>
                          );
                        }}
                      />
                    </Box>
                  </Box>
                )}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: {
              xs: 'none',
              md: 'flex',
            },
            flexDirection: 'column',
            flex: 1,
          }}></Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: $({ size: 32 }),
        }}>
        <CustomButton
          label={selectedTopic ? 'Begin Learning' : 'Spin The Wheel!'}
          sx={{ maxWidth: 'fit-content', px: $({ size: 40 }) }}
          rightIcon={
            selectedTopic ? (
              <RightArrowIcon
                size={$({ size: 24, numeric: true })}
                color={colors.white[800]}
              />
            ) : (
              <RefreshIcon
                size={$({ size: 24, numeric: true })}
                color={colors.white[800]}
              />
            )
          }
          onClick={() => {
            if (isSpinning) return;

            if (!selectedCategory) {
              HandleSpinToChooseCategory();
            } else if (selectedCategory?.subjects && !selectedSubject) {
              HandleSpinToChooseSubject();
            } else if (
              selectedCategory?.subjects &&
              selectedSubject?.topics &&
              !selectedTopic
            ) {
              HandleSpinToChooseTopic();
            } else if (
              selectedCategory?.subjects &&
              selectedSubject?.topics &&
              selectedTopic
            ) {
              if (window.location.pathname === ROUTES.PARENT.EXPLORE.INDEX) {
                navigate(ROUTES.PARENT.LEARN_SUBJECT.CHAT);
              } else if (
                window.location.pathname === ROUTES.CHILD.EXPLORE.INDEX
              ) {
                navigate(ROUTES.CHILD.LEARN_SUBJECT.CHAT);
              }
            }
          }}
        />
      </Box>
    </DashboardContainer>
  );
};

export default ExploreHome;
